 var db=require('../dbconnection');
 var fs = require('fs');
 var Accounts=
 { 
    Save_Accounts:function(Accounts_,callback)
 { 
  console.log(Accounts_)
return db.query("CALL Save_Accounts("+
"@Client_Accounts_Id_ :=?,"+
"@Client_Accounts_Name_ :=?,"+
"@Account_Group_Id_ :=?"+")"
 ,[Accounts_.Client_Accounts_Id,
    Accounts_.Client_Accounts_Name,
    Accounts_.Account_Group_Id
],callback);
 }
 ,
 Delete_Accounts:function(Client_Accounts_Id_,callback)
 { 
return db.query("CALL Delete_Accounts(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
 }
 ,
 Get_Accounts:function(Client_Accounts_Id_,callback)
 { 
return db.query("CALL Get_Accounts(@Client_Accounts_Id_ :=?)",[Client_Accounts_Id_],callback);
 }
 ,

 Search_Accounts_Typeahead:function(Client_Accounts_Id_,Client_Accounts_Name_,callback)
{ 
  if(Client_Accounts_Name_==='undefined'||Client_Accounts_Name_===''||Client_Accounts_Name_===undefined )
  Client_Accounts_Name_='';
return db.query("CALL Search_Accounts_Typeahead(@Client_Accounts_Id_ :=?,@Client_Accounts_Name_ :=?)",
[Client_Accounts_Id_,Client_Accounts_Name_],callback);
}
,
Search_Client_Accounts_Data:function(Client_Accounts_Name_,callback)
 { 
 if (Client_Accounts_Name_===undefined || Client_Accounts_Name_==="undefined" )
 Client_Accounts_Name_='';
return db.query("CALL Search_Client_Accounts_Data(@Client_Accounts_Name_:=?)",[Client_Accounts_Name_],callback);
 },

//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,

Search_Accounts:function(Client_Accounts_Name_,Account_Group_Id_,callback)
{ 
if (Client_Accounts_Name_===undefined || Client_Accounts_Name_==="undefined" )
Client_Accounts_Name_='';
if(Account_Group_Id_=='undefined')
Account_Group_Id_=0;
return db.query("CALL Search_Accounts(@Client_Accounts_Name_ :=?,@Account_Group_Id_ :=?)",[Client_Accounts_Name_,Account_Group_Id_],callback);
}
,





Load_AccountGroup:function(callback)
{ 
    return db.query("CALL Load_AccountGroup()", [],callback);
},
  };
  module.exports=Accounts;

