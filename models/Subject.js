 var db=require('../dbconnection');
 var fs = require('fs');
 var Subject=
 { 
 Save_Subject:function(Subject_,callback)
 { 
return db.query("CALL Save_Subject("+
"@Subject_Id_ :=?,"+
"@Subject_Name_ :=?"+")"
 ,[Subject_.Subject_Id,
Subject_.Subject_Name
],callback);
 }
 ,
 Delete_Subject:function(Subject_Id_,callback)
 { 
return db.query("CALL Delete_Subject(@Subject_Id_ :=?)",[Subject_Id_],callback);
 }
 ,
 Get_Subject:function(Subject_Id_,callback)
 { 
return db.query("CALL Get_Subject(@Subject_Id_ :=?)",[Subject_Id_],callback);
 }
 ,

 Subject_Typeahead:function(Subject_Name,callback)
 { 
    if (Subject_Name===undefined || Subject_Name==="undefined" )
    Subject_Name='';
    return db.query("CALL Subject_Typeahead(@Subject_Name :=?)",[Subject_Name],callback);
 },




 
 Search_Subject:function(Subject_Name_,callback)
 { 
 if (Subject_Name_===undefined || Subject_Name_==="undefined" )
Subject_Name_='';
return db.query("CALL Search_Subject(@Subject_Name_ :=?)",[Subject_Name_],callback);
 }
  };
  module.exports=Subject;

