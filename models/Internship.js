 var db=require('../dbconnection');
 var fs = require('fs');
 var Internship=
 { 
 Save_Internship:function(Internship_,callback)
 { 
return db.query("CALL Save_Internship("+
"@Internship_Id_ :=?,"+
"@Internship_Name_ :=?"+")"
 ,[Internship_.Internship_Id,
Internship_.Internship_Name
],callback);
 }
 ,
 Delete_Internship:function(Internship_Id_,callback)
 { 
return db.query("CALL Delete_Internship(@Internship_Id_ :=?)",[Internship_Id_],callback);
 }
 ,
 Get_Internship:function(Internship_Id_,callback)
 { 
return db.query("CALL Get_Internship(@Internship_Id_ :=?)",[Internship_Id_],callback);
 }
 ,
 Search_Internship:function(Internship_Name_,callback)
 { 
 if (Internship_Name_===undefined || Internship_Name_==="undefined" )
Internship_Name_='';
return db.query("CALL Search_Internship(@Internship_Name_ :=?)",[Internship_Name_],callback);
 },

 

 Get_Course_Load_Data:function(callback)
 {  
 return db.query("CALL Get_Course_Load_Data()",[],callback);
 },



  };
  module.exports=Internship;

