module Types {
    public type Status = { #completed; #notCompleted };
    
    public type Task = {
        title : Text;
        description : Text;
        createdAt : Int;
        userPrincipalId : Text;
        username : Text;
        taskId : Nat;
        status : Status;
    };
}