import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Time "mo:base/Time";
import Bool "mo:base/Bool";
import Types "./Types";

actor {
  stable var usernames : AssocList.AssocList<Text, Text> = List.nil();

  stable var last_id: Nat = 0;
  
  stable var tasks: AssocList.AssocList<Text, AssocList.AssocList<Nat, Types.Task>> = List.nil();
  
  public func clear_data() : () {
    last_id := 0;
    usernames := null;
    tasks := null;
  };

  func is_authenticated(caller: Principal) : Bool {
    return Principal.isAnonymous(caller) == false;
  };
  
  func has_permission(caller : Principal, task : Types.Task) : Bool {
    return Principal.toText(caller) == task.userPrincipalId;
  };

  func principal_eq(first_principal: Text, second_principal: Text): Bool {
    return first_principal == second_principal;
  };

  func tasks_id_eq(first_task_id: Nat, second_task_id: Nat): Bool {
    return first_task_id == second_task_id;
  };

  public query (msg) func get_username() : async ?Text {
    let caller = msg.caller;

    let result = AssocList.find<Text, Text>(usernames, Principal.toText(caller), principal_eq);

    return result;
  };

  public shared (msg) func set_username(new_username: Text) : () {
    let caller = msg.caller;

    usernames := AssocList.replace(usernames, Principal.toText(caller), principal_eq, ?new_username).0;
  };


  public query func get_all_tasks() : async AssocList.AssocList<Text, AssocList.AssocList<Nat, Types.Task>> {
    return tasks;
  };

  private func get_user_tasks_assoc_list(caller: Principal) : AssocList.AssocList<Nat, Types.Task> {
    let is_auth = is_authenticated(caller);
    
    if (is_auth == false) {
      return List.nil();
    };

    var existing_tasks : AssocList.AssocList<Nat, Types.Task> = 
      switch (AssocList.find<Text, AssocList.AssocList<Nat, Types.Task>>(tasks, Principal.toText(caller), principal_eq)) {
        case (?tasks_list) tasks_list;
        case null List.nil();
      };

    return existing_tasks;
  };

  public shared query (msg) func get_user_tasks(): async[Types.Task] {
    let caller = msg.caller;

    let user_tasks : AssocList.AssocList<Nat, Types.Task> = get_user_tasks_assoc_list(caller);

    let mapped_tasks = List.map<(Nat, Types.Task), Types.Task>(
        user_tasks,
        func(task_pair) : Types.Task { task_pair.1 }
    );

    return List.toArray(mapped_tasks);
  };

  public shared (msg) func create_task(
    title: Text, 
    description: Text,
    username: Text,
  ) : async Types.Task {
    let caller = msg.caller;

    let is_auth = is_authenticated(caller);

    if (is_auth == false) {
      throw Error.reject("User is not authenticated.");
    };

    last_id += 1;
    let task_id = last_id;

    let principal_id = Principal.toText(caller);

    let new_task = {
      title = title;
      description = description;
      createdAt = Time.now();
      userPrincipalId = principal_id;
      username = username;
      taskId = task_id;
      status = #notCompleted;
    };

    var user_tasks : AssocList.AssocList<Nat, Types.Task> = get_user_tasks_assoc_list(caller);

    user_tasks := AssocList.replace(user_tasks, task_id, tasks_id_eq, ?new_task).0;

    tasks := AssocList.replace(tasks, principal_id, principal_eq, ?user_tasks).0;

    return new_task;
  };

  public shared (msg) func delete_task(task_id: Nat) : async Bool {
    let caller = msg.caller;

    let user_tasks : AssocList.AssocList<Nat, Types.Task> = get_user_tasks_assoc_list(caller);

    switch (AssocList.find<Nat, Types.Task>(user_tasks, task_id, tasks_id_eq)) {
        case (?task) {
            let can_delete = has_permission(caller, task);

            let principal_id = Principal.toText(caller);

            if (can_delete) {
                let updated_tasks = AssocList.replace(user_tasks, task_id, tasks_id_eq, null).0;
                tasks := AssocList.replace(tasks, principal_id, principal_eq, ?updated_tasks).0;
                
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
