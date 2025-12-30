 var db=require('../dbconnection');
 var fs = require('fs');
 var Course_Search=
 { 
  Country_Change_Dropdowns: function (Country_Id_, callback) {
    return db.query(
      "CALL Country_Change_Dropdowns(@Country_Id_ :=?)",
      [Country_Id_],
      callback
    );
  },

  

Public_Search_Course:function(Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1,Intake_Year_Id,callback)
{ 
  
  if (Course_Name===undefined || Course_Name==="undefined" )
  Course_Name='';
  if (Branch_Search===undefined || Branch_Search==="undefined" )
  Branch_Search='';
  if (Duration_Search===undefined || Duration_Search==="undefined" )
  Duration_Search='';
  //console.log(Course_Name);
//console.log(decodeURIComponent(Course_Name));
return db.query("CALL Public_Search_Course(@Level_Detail_Id :=?,@Country_Id :=?,@Intake_Id :=?,@Sub_Section_Id :=?,@Course_Name :=?,@Branch_Search :=?,@Duration_Search :=?,@Ielts_ :=?,@Page_Start :=?,@Page_End :=?,@Page_Length :=?,@University :=?,@Subject_1 :=?,@Intake_Year_Id :=?)",
  [Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,decodeURIComponent(Course_Name),Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1,Intake_Year_Id,],callback);
} ,


Get_Intake_Year_InCourse:function(callback)
{ 

return db.query("CALL  Get_Intake_Year_InCourse()",[],callback);
},

  };
  module.exports=Course_Search;

