import AssocList "mo:base/AssocList";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Types "./Types";

shared({ caller }) actor class() {
  stable var user_names : AssocList.AssocList<Principal, Text> = List.nil();

  stable var tasks: AssocList.AssocList<Principal, [Types.Task]> = List.nil();

  public func is_authenticated() : async Bool {
    return Principal.isAnonymous(caller) == false;
  };
  
  public func has_permission(caller : Principal, task : Types.Task) : async Bool {
    return caller == task.userPrincipalId;
  }

  
};
