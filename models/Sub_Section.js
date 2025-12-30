 var db=require('../dbconnection');
 var fs = require('fs');
 var Sub_Section=
 { 
 Save_Sub_Section:function(Sub_Section_,callback)
 { 
return db.query("CALL Save_Sub_Section("+
"@Subject_Id_ :=?,"+
"@Subject_Name_ :=?"+")"
 ,[Sub_Section_.Sub_Section_Id,
   Sub_Section_.Sub_Section_Name
],callback);
 }
 ,
 Delete_Sub_Section:function(Sub_Section_Id_,callback)
 { 
return db.query("CALL Delete_Sub_Section(@Sub_Section_Id_ :=?)",[Sub_Section_Id_],callback);
 }
 ,
 Get_Sub_Section_From_Course:function(Subject_Id,callback)
 { 
return db.query("CALL Get_Sub_Section_From_Course(@Subject_Id_ :=?)",[Subject_Id],callback);
 }
 ,

Sub_Section_Typeahead:function(Sub_Section_Name,callback)
 { 
    if (Sub_Section_Name===undefined || Sub_Section_Name==="undefined" )
    Sub_Section_Name='';
    return db.query("CALL Sub_Section_Typeahead(@Sub_Section_Name :=?)",[Sub_Section_Name],callback);
 },




 
 Search_Sub_Section:function(Sub_Section_Name_,callback)
 { 
 if (Sub_Section_Name_===undefined || Sub_Section_Name_==="undefined" )
 Sub_Section_Name_='';
return db.query("CALL Search_Sub_Section(@Sub_Section_Name_ :=?)",[Sub_Section_Name_],callback);
 }
  };
  module.exports=Sub_Section;

