import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Types "./Types";

shared({ caller }) actor class() {
  stable var usernames : AssocList.AssocList<Principal, Text> = List.nil();

  stable var tasks: AssocList.AssocList<Principal, [Types.Task]> = List.nil();

  func is_authenticated() : async Bool {
    return Principal.isAnonymous(caller) == false;
  };
  
  func has_permission(caller : Principal, task : Types.Task) : async Bool {
    return caller == task.userPrincipalId;
  };

  func principal_eq(first_principal: Principal, second_principal: Principal): Bool {
    return first_principal == second_principal;
  };

  public func get_username(user: Principal) : async ?Text {
    AssocList.find<Principal, Text>(usernames, user, principal_eq);
  };

  public func set_username(new_username: Text) : () {
    usernames := AssocList.replace(usernames, caller, principal_eq, ?new_username).0;
  }
};
