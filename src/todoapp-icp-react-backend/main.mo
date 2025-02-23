import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Types "./Types";

shared({ caller }) actor class() {
  stable var user_names : AssocList.AssocList<Principal, Text> = List.nil();

  stable var tasks: AssocList.AssocList<Principal, [Types.Task]> = List.nil();

  
};
