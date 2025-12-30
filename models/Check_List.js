 var db=require('../dbconnection');
 var fs = require('fs');
 var Check_List=
 { 
Save_Check_List:function(Check_List_,callback)
 { 
   console.log(Check_List_)
return db.query("CALL Save_Check_List("+
"@Check_List_Id_ :=?,"+
"@Check_List_Name_ :=?"+")"

 ,[Check_List_.Check_List_Id,
Check_List_.Check_List_Name
],callback);
 }
 ,
 Delete_Check_List:function(Check_List_Id_,callback)
 { 
return db.query("CALL Delete_Check_List(@Check_List_Id_ :=?)",[Check_List_Id_],callback);
 }
 ,
 Get_Check_List:function(Check_List_Id_,callback)
 { 
return db.query("CALL Get_Check_List(@Check_List_Id_ :=?)",[Check_List_Id_],callback);
 }
 ,
 Search_Check_List:function(Check_List_Name_,callback)
 { 
    if(Check_List_Name_==='undefined'||Check_List_Name_===''||Check_List_Name_===undefined )
    Check_List_Name_='';
return db.query("CALL Search_Check_List(@Check_List_Name_ :=?)",[Check_List_Name_],callback);
 },



//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,
  };
  module.exports=Check_List;

