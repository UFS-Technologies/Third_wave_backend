 var db=require('../dbconnection');
 var fs = require('fs');
 var Level_Detail=
 { 
 Save_Level_Detail:function(Level_Detail_,callback)
 { 
return db.query("CALL Save_Level_Detail("+
"@Level_Detail_Id_ :=?,"+
"@Level_Detail_Name_ :=?"+")"
 ,[Level_Detail_.Level_Detail_Id,
Level_Detail_.Level_Detail_Name
],callback);
 }
 ,
 Delete_Level_Detail:function(Level_Detail_Id_,callback)
 { 
return db.query("CALL Delete_Level_Detail(@Level_Detail_Id_ :=?)",[Level_Detail_Id_],callback);
 }
 ,
 Get_Level_Detail:function(Level_Detail_Id_,callback)
 { 
return db.query("CALL Get_Level_Detail(@Level_Detail_Id_ :=?)",[Level_Detail_Id_],callback);
 }
 ,
 Search_Level_Detail:function(Level_Detail_Name_,callback)
 { 
 if (Level_Detail_Name_===undefined || Level_Detail_Name_==="undefined" )
Level_Detail_Name_='';
return db.query("CALL Search_Level_Detail(@Level_Detail_Name_ :=?)",[Level_Detail_Name_],callback);
 }
  };
  module.exports=Level_Detail;

