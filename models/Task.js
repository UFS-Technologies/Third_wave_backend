 var db=require('../dbconnection');
 var fs = require('fs');
 var Task=
 { 
 Save_Task:function(Task_,callback)
 { 
return db.query("CALL Save_Task("+
"@Task_Id_ :=?,"+
"@Task_Details_ :=?,"+
// "@Entry_Date_ :=?,"+
// "@By_User_Id_ :=?,"+
"@By_User_Id_ :=?"+")"
 ,[Task_.Task_Id,
Task_.Task_Details,
Task_.By_User_Id,
// Task_.Editable,
// Task_.Color
],callback);

 }
 ,
 Delete_Task:function(Task_Id_,callback)
 { 
return db.query("CALL Delete_Task(@Task_Id_ :=?)",[Task_Id_],callback);
 }
 ,
 Get_Task:function(Task_Id_,callback)
 { 
return db.query("CALL Get_Task(@Task_Id_ :=?)",[Task_Id_],callback);
 }
 ,
 Load_User_Details:function(callback)
 { 
     return db.query("CALL Load_User_Details()", [],callback);
 },
 Search_Task:function(Task_Details_,Fromdate_,ToDate_,Is_Date_Check_,Usersearch_,callback)
 { 
     console.log(Task_Details_)
    if(Task_Details_==='undefined'||Task_Details_===''||Task_Details_===undefined )
    Task_Details_='';
return db.query("CALL Search_Task(@Task_Details_ :=?,@Fromdate_ :=?,@ToDate_ :=?,@Is_Date_Check_ :=?,@Usersearch_ :=?)",
[Task_Details_,Fromdate_,ToDate_,Is_Date_Check_,Usersearch_],callback);
 },
 Search_Task_front_view:function(Usersearch_,callback)
 { 
    // if(Task_Details_==='undefined'||Task_Details_===''||Task_Details_===undefined )
    // Task_Details_='';
return db.query("CALL Search_Task_front_view(@Usersearch_ :=?)",[Usersearch_],callback);
 }
//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,
  };
  module.exports=Task;

