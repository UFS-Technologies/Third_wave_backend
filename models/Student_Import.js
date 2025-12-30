 var db=require('../dbconnection');
 var fs = require('fs');
const { Console } = require('console');
 var Course=
 { 
 Save_Course:function(Course_,callback)
 { 
return db.query("CALL Save_Course("+
"@Course_Id_ :=?,"+
"@Course_Name_ :=?,"+
"@Course_Code_ :=?,"+
"@Subject_Id_ :=?,"+
"@Duration_Id_ :=?,"+
"@Level_Id_ :=?,"+
"@Ielts_Minimum_Score_ :=?,"+
"@Internship_Id_ :=?,"+
"@Notes_ :=?,"+
"@Details_ :=?,"+
"@Application_Fees_ :=?,"+
"@University_Id_ :=?,"+
"@Country_Id_ :=?,"+
"@Tag_ :=?,"+
"@Intake_Data_ :=?"+")"
 ,[Course_.Course_Id,
Course_.Course_Name,
Course_.Course_Code,
Course_.Subject_Id,
Course_.Duration_Id,
Course_.Level_Id,
Course_.Ielts_Minimum_Score,
Course_.Internship_Id,
Course_.Notes,
Course_.Details,
Course_.Application_Fees,
Course_.University_Id,
Course_.Country_Id,
Course_.Tag,
JSON.stringify(Course_.Intake_Data)
],callback);
 }
 ,


 Delete_Course:function(Course_Id_,callback)
 { 
return db.query("CALL Delete_Course(@Course_Id_ :=?)",[Course_Id_],callback);
 },


 Get_Course:function(Course_Id_,callback)
 { 
return db.query("CALL Get_Course(@Course_Id_ :=?)",[Course_Id_],callback);
 },
 
 Get_Course_Import:function(Import_Master_Id_,callback)
 { 
return db.query("CALL Get_Course_Import(@Import_Master_Id_ :=?)",[Import_Master_Id_],callback);
 },

 Save_Course_Import:function(Course_Details,callback)
 {  

return db.query("CALL Save_Course_Import("+"@Course_Details :=?"+")",[JSON.stringify(Course_Details.Course_Import_Details)],callback);
 },

  Search_Course_Import:function(From_Date_,To_Date_,Is_Date_Check_,callback)
 { 
 
return db.query("CALL Search_Course_Import(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?)",[From_Date_,To_Date_,Is_Date_Check_],callback);
 },


//  Search_Course:function(Course_Name_,callback)
//  { 
//  if (Course_Name_===undefined || Course_Name_==="undefined" )
// Course_Name_='';
// return db.query("CALL Search_Course(@Course_Name_ :=?)",[Course_Name_],callback);
//  },



 Search_Course:function(Course_Name_,Level_Id_,Country_Id_,Internship_Id_,Duration_Id_,University_Id_,Subject_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_,callback)
 { 
 if (Course_Name_===undefined || Course_Name_==="undefined" )
Course_Name_='';

if (Level_Id_===undefined || Level_Id_==="undefined" )
Level_Id_=0;

if (Country_Id_===undefined || Country_Id_==="undefined" )
Country_Id_=0;

if (Internship_Id_===undefined || Internship_Id_==="undefined" )
Internship_Id_=0;

if (Duration_Id_===undefined || Duration_Id_==="undefined" )
Duration_Id_=0;

if (University_Id_===undefined || University_Id_==="undefined" )
University_Id_=0;

if (Subject_Id_===undefined || Subject_Id_==="undefined" )
Subject_Id_=0;

if (Pointer_Start_===undefined || Pointer_Start_==="undefined" )
Pointer_Start_=0;

if (Pointer_Stop_===undefined || Pointer_Stop_==="undefined" )
Pointer_Stop_=0;

return db.query("CALL Search_Course(@Course_Name_ :=?,@Level_Id_ :=?,@Country_Id_ :=?,@Internship_Id_ :=?,@Duration_Id_ :=?,@University_Id_ :=?,@Subject_Id_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)",
[Course_Name_,Level_Id_,Country_Id_,Internship_Id_,Duration_Id_,University_Id_,Subject_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_],callback);
 },

 Search_Course_Typeahead:function(Country_Id_,Subject_Id_,Level_Id_ ,Course_Name_ ,Duration_Id_ ,Ielts_Minimum_Score_ ,Intake_Id_,Internship_Id_,callback)
 { 
     if (Delivery_Point_Name_=== undefined || Delivery_Point_Name_==="undefined")
     Delivery_Point_Name_='';

return db.query("CALL Search_Course_Typeahead(@Country_Id_ :=?,@Subject_Id_ :=?,@Level_Id_ :=?,@Course_Name_ :=?,@Duration_Id_ :=?,@Ielts_Minimum_Score_ :=?,@Intake_Id_ :=?,@Internship_Id_ :=?)",
[Country_Id_,Subject_Id_,Level_Id_ ,Course_Name_ ,Duration_Id_ ,Ielts_Minimum_Score_ ,Intake_Id_,Internship_Id_],callback);
 },


  };
  module.exports=Course;

