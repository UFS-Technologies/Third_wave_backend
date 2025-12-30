 var db=require('../dbconnection');
 var fs = require('fs');
 var Remarks=
 { 
 Save_Remarks:function(Remarks_,callback)
 { 
return db.query("CALL Save_Remarks("+
"@Remarks_Id_ :=?,"+
"@Remarks_Name_ :=?"+")"
 ,[Remarks_.Remarks_Id,
Remarks_.Remarks_Name
],callback);
 },


 Save_Document_Type:function(Document_Type_,callback)
 { 
return db.query("CALL Save_Document_Type("+
"@Document_Type_Id_ :=?,"+
"@Document_Type_Name_ :=?"+")"
 ,[Document_Type_.Document_Type_Id,
   Document_Type_.Document_Type_Name
],callback);
 },


 Save_Username:function(Remarks_,callback)
 { 
return db.query("CALL Save_Username("+
"@User_Details_Id_ :=?,"+
"@User_Details_Name_ :=?"+")"
 ,[Remarks_.User_Details_Id,
Remarks_.User_Details_Name
],callback);
 }


 ,
 Delete_Remarks:function(Remarks_Id_,callback)
 { 
return db.query("CALL Delete_Remarks(@Remarks_Id_ :=?)",[Remarks_Id_],callback);
 },


 Delete_Document_Type:function(Document_Type_Id_,callback)
 { 
return db.query("CALL Delete_Document_Type(@Document_Type_Id_ :=?)",[Document_Type_Id_],callback);
 },
 Remarks_Typeahead:function(Remarks_Name,callback)
 { 
    if (Remarks_Name===undefined || Remarks_Name==="undefined" )
    Remarks_Name='';
    return db.query("CALL Remarks_Typeahead(@Remarks_Name :=?)",[Remarks_Name],callback);
 }, 
 Search_Remarks:function(Remarks_Name_,callback)
 { 
 if (Remarks_Name_===undefined || Remarks_Name_==="undefined" )
Remarks_Name_='';
return db.query("CALL Search_Remarks(@Remarks_Name_ :=?)",[Remarks_Name_],callback);
 },


 Search_Document_Type:function(Document_Type_Name_,callback)
 { 
 if (Document_Type_Name_===undefined || Document_Type_Name_==="undefined" )
Document_Type_Name_='';
return db.query("CALL Search_Document_Type(@Document_Type_Name_ :=?)",[Document_Type_Name_],callback);
 },

 Search_Username:function(Login_User_,callback)
 { 
   console.log(Login_User_ ,'login userid')
return db.query("CALL Search_Username(@Login_User_ :=?)",[Login_User_],callback);
 },

//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,


Save_Task_Type:function(Task_Type_,callback)
 { 
return db.query("CALL Save_Task_Type("+
"@Task_Type_Id_ :=?,"+
"@Task_Type_Name_ :=?"+")"
 ,[Task_Type_.Task_Type_Id,
   Task_Type_.Task_Type_Name
],callback);
 },

 
 Search_Task_Type:function(Task_Type_Name_,callback)
 { 
 if (Task_Type_Name_===undefined || Task_Type_Name_==="undefined" )
Task_Type_Name_='';
return db.query("CALL Search_Task_Type(@Task_Type_Name_ :=?)",[Task_Type_Name_],callback);
 },
 Delete_Task_Type:function(Task_Type_Id_,callback)
 { 
return db.query("CALL Delete_Task_Type(@Task_Type_Id_ :=?)",[Task_Type_Id_],callback);
 },
  };
  module.exports=Remarks;

