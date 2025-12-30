 var db=require('../dbconnection');
 var fs = require('fs');
 var Course_Intake=
 { 
 Save_Course_Intake:function(Course_Intake_,callback)
 { 
return db.query("CALL Save_Course_Intake("+
"@Course_Id_ :=?,"+
"@Intake_Id_ :=?"+")"
 ,[Course_Intake_.Course_Id,
Course_Intake_.Intake_Id
],callback);
 }
 ,
 Delete_Course_Intake:function(Course_Intake_Id_,callback)
 { 
return db.query("CALL Delete_Course_Intake(@Course_Intake_Id_ :=?)",[Course_Intake_Id_],callback);
 }
 ,
 Get_Course_Intake:function(Course_Intake_Id_,callback)
 { 
return db.query("CALL Get_Course_Intake(@Course_Intake_Id_ :=?)",[Course_Intake_Id_],callback);
 }
 ,
 Search_Course_Intake:function(Course_Intake_Name_,callback)
 { 
 if (Course_Intake_Name_===undefined || Course_Intake_Name_==="undefined" )
Course_Intake_Name_='';
return db.query("CALL Search_Course_Intake(@Course_Intake_Name_ :=?)",[Course_Intake_Name_],callback);
 }
  };
  module.exports=Course_Intake;

