 
 var db=require('../dbconnection');
  // const storedProcedure=require('../helpers/stored-procedure');
 var fs = require('fs');
 var Course_Details= 
 { 
Save_Course_Details:function(Course_Details_,callback)
 { 
return db.query("CALL Save_Course_Details("+
"@Course_Details_Id_ :=?,"+
"@StatusName_ :=?,"+
"@Course_ :=?,"+
"@CourseFee_ :=?,"+
"@Department_ :=?,"+
"@Branch_ :=?,"+
"@Dob_ :=?,"+
"@Enquiry_Source_ :=?"+
")" 
,[
  Course_Details_.Course_Details_Id,
  Course_Details_.StatusName,
  Course_Details_.Course,
  Course_Details_.CourseFee,
  Course_Details_.Department,
  Course_Details_.Branch,
  Course_Details_.Dob,
  Course_Details_.Enquiry_Source


],callback);
 }
 ,
 
 Delete_Course_Details:function(Course_Details_Id_,callback)
 {

return db.query("CALL Delete_Course_Details(@Course_Details_Id_ :=?)",[Course_Details_Id_],callback);
 }
 ,
 Get_Course_Details:function(Course_Details_Id_,callback)
 { 
return db.query("CALL Get_Course_Details(@Course_Details_Id_ :=?)",[Course_Details_Id_],callback);
 }
 ,
 Search_Course_Details:function(StatusName_,callback)
 { 

  if(StatusName_==='undefined'||StatusName_===''||StatusName_===undefined )
    StatusName_='';
return db.query("CALL Search_Course_Details(@StatusName_ :=?)",[StatusName_],callback);
 },

 
  };
  module.exports=Course_Details;

