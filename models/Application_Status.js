 var db=require('../dbconnection');
 var fs = require('fs');
 var Application_Status=
 { 
   Save_Application_Status:function(Application_Status_,callback)
 { 
  console.log(Application_Status_)
return db.query("CALL Save_Application_Status("+
"@Application_status_Id_ :=?,"+
"@Application_Status_Name_ :=?,"+
"@Application_Group_Id_ :=?,"+
"@Application_Group_Name_ :=?,"+
"@Transfer_Status_ :=?,"+
"@Notification_Status_ :=?,"+
"@Notification_Department_Id_ :=?,"+
"@Notification_Department_Name_ :=?,"+
"@Transfer_Department_Id_ :=?,"+
"@Transfer_Department_Name_ :=?,"+
"@Group_Restriction_ :=?"+")"

 ,[Application_Status_.Application_status_Id,
   Application_Status_.Application_Status_Name,
   Application_Status_.Application_Group_Id,
   Application_Status_.Application_Group_Name,

   Application_Status_.Transfer_Status,
   Application_Status_.Notification_Status,
   Application_Status_.Notification_Department_Id,
   Application_Status_.Notification_Department_Name,
   Application_Status_.Transfer_Department_Id,
   Application_Status_.Transfer_Department_Name,
   Application_Status_.Group_Restriction,


],callback);
 }
 ,

 
 Save_Task_Item:function(Task_Item_,callback)
 { 
  console.log(Task_Item_)
return db.query("CALL Save_Task_Item("+
"@Task_Item_Id_ :=?,"+
"@Task_Item_Name_ :=?,"+"@Task_Type_Id_ :=?,"+"@Duration_ :=?,"+"@Task_Item_Group_Id_ :=?,"+"@Document_Upload_ :=?,"+"@Rating_ :=?,"+"@Notification_Department_Id_ :=?,"+"@Notification_Department_Name_ :=?"+")"
 ,[Task_Item_.Task_Item_Id,
  Task_Item_.Task_Item_Name,Task_Item_.Task_Type_Id,Task_Item_.Duration,Task_Item_.Task_Item_Group,Task_Item_.Document_Upload,Task_Item_.Rating,Task_Item_.Notification_Department_Id,Task_Item_.Notification_Department_Name
],callback);
 }
 ,



 Delete_Application_Status:function(Application_status_Id_,callback)
 { 
return db.query("CALL Delete_Application_Status(@Application_status_Id_ :=?)",[Application_status_Id_],callback);
 }
 ,


 Delete_Task_Item:function(Task_Item_Id_,callback)
 { 
return db.query("CALL Delete_Task_Item(@Task_Item_Id_ :=?)",[Task_Item_Id_],callback);
 }
 ,
 Get_Enquiry_Source:function(Enquiry_Source_Id_,callback)
 { 
return db.query("CALL Get_Enquiry_Source(@Enquiry_Source_Id_ :=?)",[Enquiry_Source_Id_],callback);
 }
 ,
 Search_Application_Status:function(Application_Status_Name_,callback)
 { 
 if (Application_Status_Name_===undefined || Application_Status_Name_==="undefined" )
 Application_Status_Name_='';
return db.query("CALL Search_Application_Status(@Application_Status_Name_ :=?)",[Application_Status_Name_],callback);
 }

,
Search_Task_Item:function(Task_Item_Search_,callback)
 { 
 if (Task_Item_Search_===undefined || Task_Item_Search_==="undefined" )
 Task_Item_Search_='';
return db.query("CALL Search_Task_Item(@Task_Item_Search_ :=?)",[Task_Item_Search_],callback);
 }

//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } 


  };
  module.exports=Application_Status;

