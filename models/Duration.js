 var db=require('../dbconnection');
 var fs = require('fs');
 var Duration=
 { 
 Save_Duration:function(Duration_,callback)
 { 
return db.query("CALL Save_Duration("+
"@Duration_Id_ :=?,"+
"@Duration_Name_ :=?"+")"
 ,[Duration_.Duration_Id,
Duration_.Duration_Name
],callback);
 }
 ,
 Delete_Duration:function(Duration_Id_,callback)
 { 
return db.query("CALL Delete_Duration(@Duration_Id_ :=?)",[Duration_Id_],callback);
 }
 ,
 Get_Duration:function(Duration_Id_,callback)
 { 
return db.query("CALL Get_Duration(@Duration_Id_ :=?)",[Duration_Id_],callback);
 }
 ,
 Search_Duration:function(Duration_Name_,callback)
 { 
 if (Duration_Name_===undefined || Duration_Name_==="undefined" )
Duration_Name_='';
return db.query("CALL Search_Duration(@Duration_Name_ :=?)",[Duration_Name_],callback);
 }
  };
  module.exports=Duration;

