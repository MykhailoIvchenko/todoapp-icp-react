import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Time "mo:base/Time";
import Bool "mo:base/Bool";
import Types "./Types";
import Debug "mo:base/Debug";

shared({ caller }) actor class() {
  stable var usernames : AssocList.AssocList<Principal, Text> = List.nil();

  stable var last_id: Nat = 0;
  
  stable var tasks: AssocList.AssocList<Principal, AssocList.AssocList<Nat, Types.Task>> = List.nil();

  func is_authenticated() : async Bool {
    return Principal.isAnonymous(caller) == false;
  };
  
  func has_permission(caller : Principal, task : Types.Task) : async Bool {
    return caller == task.userPrincipalId;
  };

  func principal_eq(first_principal: Principal, second_principal: Principal): Bool {
    return first_principal == second_principal;
  };

  func tasks_id_eq(first_task_id: Nat, second_task_id: Nat): Bool {
    return first_task_id == second_task_id;
  };

  public query func get_username() : async ?Text {
    let result = AssocList.find<Principal, Text>(usernames, caller, principal_eq);

    return result;
  };

  public func set_username(new_username: Text) : () {
    usernames := AssocList.replace(usernames, caller, principal_eq, ?new_username).0;
  };

  func get_user_tasks_assoc_list() : async AssocList.AssocList<Nat, Types.Task> {
    let is_auth = await is_authenticated();
    
    if (is_auth == false) {
      throw Error.reject("User is not authenticated.");
    };

    var existing_tasks : AssocList.AssocList<Nat, Types.Task> = 
      switch (AssocList.find<Principal, AssocList.AssocList<Nat, Types.Task>>(tasks, caller, principal_eq)) {
        case (?tasks_list) tasks_list;
        case null List.nil();
      };

    return existing_tasks;
  };

  public func get_user_tasks(): async[Types.Task] {
    let user_tasks : AssocList.AssocList<Nat, Types.Task> = await get_user_tasks_assoc_list();

    let mapped_tasks = List.map<(Nat, Types.Task), Types.Task>(
        user_tasks,
        func(task_pair) : Types.Task { task_pair.1 }
    );

    return List.toArray(mapped_tasks);
  };

  public func create_task(
    title: Text, 
    description: Text
  ) : async Types.Task {
    let is_auth = await is_authenticated();

    if (is_auth == false) {
      throw Error.reject("User is not authenticated.");
    };

    last_id += 1;
    let task_id = last_id;

    let user_name = await get_username();

    let new_task = {
      title = title;
      description = description;
      createdAt = Time.now();
      userPrincipalId = caller;
      username = switch(user_name) {
        case (?name) { name };
        case null { "Unknown" };
      };
      taskId = task_id;
      status = #notCompleted;
    };

    var user_tasks : AssocList.AssocList<Nat, Types.Task> = await get_user_tasks_assoc_list();

    user_tasks := AssocList.replace(user_tasks, task_id, tasks_id_eq, ?new_task).0;

    tasks := AssocList.replace(tasks, caller, principal_eq, ?user_tasks).0;

    return new_task;
  };

  public func delete_task(task_id: Nat) : async Bool {
    let user_tasks : AssocList.AssocList<Nat, Types.Task> = await get_user_tasks_assoc_list();

    switch (AssocList.find<Nat, Types.Task>(user_tasks, task_id, tasks_id_eq)) {
        case (?task) {
            let can_delete = await has_permission(caller, task);

            if (can_delete) {
                let updated_tasks = AssocList.replace(user_tasks, task_id, tasks_id_eq, null).0;
                tasks := AssocList.replace(tasks, caller, principal_eq, ?updated_tasks).0;
                
                return true;
            } else {
                throw Error.reject("User does not have permission to delete this task.");
            }
        };
        case null {
            throw Error.reject("Task was not found.");
        };
    };
  };
};
