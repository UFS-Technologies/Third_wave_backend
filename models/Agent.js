var db=require('../dbconnection');
var fs = require('fs');
var Agent=
{ 
    Save_Agent:function(Client_Accounts_,callback)
    { 
    return db.query("CALL Save_Agent("+"@Client_Accounts_Id_ :=?,"+"@Account_Group_Id_ :=?,"+
    "@Client_Accounts_Code_ :=?,"+"@Client_Accounts_Name_ :=?,"+"@Client_Accounts_No_ :=?,"+"@Address1_ :=?,"+
    "@Address2_ :=?,"+"@Address3_ :=?,"+"@Address4_ :=?,"+"@PinCode_ :=?,"+"@StateCode_ :=?,"+"@GSTNo_ :=?,"+
    "@PanNo_ :=?,"+"@State_ :=?,"+"@Country_ :=?,"+"@Phone_ :=?,"+"@Mobile_ :=?,"+"@Email_ :=?,"+
    "@Opening_Balance_ :=?,"+"@Description1_ :=?,"+"@UserId_ :=?,"+"@LedgerInclude_ :=?,"+"@CanDelete_ :=?,"+
    "@Commision_ :=?,"+"@Opening_Type_ :=?,"+"@Employee_Id_ :=?)"
    ,[Client_Accounts_.Client_Accounts_Id,Client_Accounts_.Account_Group_Id,Client_Accounts_.Client_Accounts_Code,
    Client_Accounts_.Client_Accounts_Name,Client_Accounts_.Client_Accounts_No,Client_Accounts_.Address1,
    Client_Accounts_.Address2,Client_Accounts_.Address3,Client_Accounts_.Address4,Client_Accounts_.PinCode,
    Client_Accounts_.StateCode,Client_Accounts_.GSTNo,Client_Accounts_.PanNo,Client_Accounts_.State,
    Client_Accounts_.Country,Client_Accounts_.Phone,Client_Accounts_.Mobile,Client_Accounts_.Email,
    Client_Accounts_.Opening_Balance,Client_Accounts_.Description1,Client_Accounts_.UserId,
    Client_Accounts_.LedgerInclude,Client_Accounts_.CanDelete,Client_Accounts_.Commision,
    Client_Accounts_.Opening_Type, Client_Accounts_.Employee_Id],callback);
    },
    Delete_Agent:function(Client_Accounts_Id_,callback)
    { 
    return db.query("CALL Delete_Agent(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
    },
    Get_Agent:function(Client_Accounts_Id_,callback)
    { 
    return db.query("CALL Get_Agent(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
    } ,

    Search_Agent:function(Client_Accounts_Name_,Account_Group_,Pointer_Start_,Pointer_Stop_,Page_Length_,callback)
    {
       
    if (Client_Accounts_Name_===undefined || Client_Accounts_Name_==="undefined" )
    Client_Accounts_Name_='';   
    
    if (Account_Group_===undefined || Account_Group_==="undefined" )
    Account_Group_=0;
    return db.query("CALL Search_Agent(@Client_Accounts_Name_ :=?,@Account_Group_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)"
    ,[Client_Accounts_Name_,Account_Group_,Pointer_Start_,Pointer_Stop_,Page_Length_],callback);
    },
    Load_Agents:function(callback)
    { 
        return db.query("CALL Load_Agents()", [],callback);
    },
  

};
module.exports=Agent;

