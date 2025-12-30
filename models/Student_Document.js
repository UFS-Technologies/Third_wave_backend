 var db=require('../dbconnection');
 var fs = require('fs');
 var Student_Document=
 { 
 Save_Student_Document1:function(Student_Document_,callback)
 { 
return db.query("CALL Save_Student_Document1("+
"@Student_Document_Id_ :=?,"+
"@Student_Id_ :=?,"+
"@Document_Id_ :=?"+")"
 ,[Student_Document_.Student_Document_Id,
Student_Document_.Student_Id,
Student_Document_.Document_Id
],callback);
 }
 ,
 Delete_Student_Document:function(Student_Document_Id_,callback)
 { 
return db.query("CALL Delete_Student_Document(@Student_Document_Id_ :=?)",[Student_Document_Id_],callback);
 }
 ,
 Delete_Application_Document:function(Application_Document_Id_,callback)
 { 
return db.query("CALL Delete_Application_Document(@Application_Document_Id_ :=?)",[Application_Document_Id_],callback);
 }
 ,
 Delete_FeesRecepit_Document:function(Feesreceipt_document_Id_,callback)
 { 
return db.query("CALL Delete_FeesRecepit_Document(@Feesreceipt_document_Id_ :=?)",[Feesreceipt_document_Id_],callback);
 }
 ,
 Get_Student_Document:function(Student_Id_,callback)
 { 
return db.query("CALL Get_Student_Document(@Student_Id_ :=?)",[Student_Id_],callback);
 }
 ,
 Search_Student_Document:function(Student_Document_Name_,callback)
 { 
 if (Student_Document_Name_===undefined || Student_Document_Name_==="undefined" )
Student_Document_Name_='';
return db.query("CALL Search_Student_Document(@Student_Document_Name_ :=?)",[Student_Document_Name_],callback);
 }
  };
  module.exports=Student_Document;

