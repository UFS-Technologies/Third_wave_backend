 var db=require('../dbconnection');
 var fs = require('fs');
 var Intake=
 { 
 Save_Intake:function(Intake_,callback)
 { 
return db.query("CALL Save_Intake("+
"@Intake_Id_ :=?,"+
"@Intake_Name_ :=?"+")"
 ,[Intake_.Intake_Id,
Intake_.Intake_Name
],callback);
 }
 ,
 Delete_Intake:function(Intake_Id_,callback)
 { 
return db.query("CALL Delete_Intake(@Intake_Id_ :=?)",[Intake_Id_],callback);
 }
 ,
 Get_Intake:function(Intake_Id_,callback)
 { 
return db.query("CALL Get_Intake(@Intake_Id_ :=?)",[Intake_Id_],callback);
 }
 ,

 Get_Intake_Year:function(Intake_Year_Id_,callback)
 { 
return db.query("CALL Get_Intake_Year(@Intake_Year_Id_ :=?)",[Intake_Year_Id_],callback);
 }
 ,

 Search_Intake:function(Intake_Name_,callback)
 { 
 if (Intake_Name_===undefined || Intake_Name_==="undefined" )
Intake_Name_='';
return db.query("CALL Search_Intake(@Intake_Name_ :=?)",[Intake_Name_],callback);
 },


 Get_Intakes_InCourse:function(callback)
 { 

return db.query("CALL  Get_Intakes_InCourse()",[],callback);
 },


 Get_Intakes_InCourse_Edit:function(Course_Id_,callback)
 { 
return db.query("CALL Get_Intakes_InCourse_Edit(@Course_Id_ :=?)",[Course_Id_],callback);
 },

 Load_Intake:function(callback)
  { 
      return db.query("CALL Load_Intake()", [],callback);
  },
  Load_Intake_year:function(callback)
  { 
      return db.query("CALL Load_Intake_year()", [],callback);
  },



  };
  module.exports=Intake;

