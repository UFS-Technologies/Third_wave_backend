 var db=require('../dbconnection');
 var fs = require('fs');
 var Student_Status=
 { 
 Save_Student_Status:function(Student_Status_,callback)
 { 
return db.query("CALL Save_Student_Status("+
"@Student_Status_Id_ :=?,"+
"@Student_Status_Name_ :=?"+")"
 ,[Student_Status_.Student_Status_Id,
Student_Status_.Student_Status_Name
],callback);
 }
 ,
 Delete_Student_Status:function(Student_Status_Id_,callback)
 { 
return db.query("CALL Delete_Student_Status(@Student_Status_Id_ :=?)",[Student_Status_Id_],callback);
 }
 ,
 Get_Student_Status:function(Student_Status_Id_,callback)
 { 
return db.query("CALL Get_Student_Status(@Student_Status_Id_ :=?)",[Student_Status_Id_],callback);
 }
 ,
 Search_Student_Status:function(Student_Status_Name_,callback)
 { 
 if (Student_Status_Name_===undefined || Student_Status_Name_==="undefined" )
Student_Status_Name_='';
return db.query("CALL Search_Student_Status(@Student_Status_Name_ :=?)",[Student_Status_Name_],callback);
 }
  };
  module.exports=Student_Status;

