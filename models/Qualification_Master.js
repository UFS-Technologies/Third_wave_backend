 var db=require('../dbconnection');
 var fs = require('fs');
 var Qualification_Master=
 { 
    Save_Qualification_Master:function(Qualification_Master_,callback)
 { 
   console.log("Qualification_Master_:",Qualification_Master_);
return db.query("CALL Save_Qualification_Master(@Qualification_Master_Id_ :=?,@Qualification_Name_ :=?)",
   [Qualification_Master_.Qualification_Master_Id,Qualification_Master_.Qualification_Name],callback);
 }
 ,
 Delete_Qualification_Master:function(Qualification_Master_Id_,callback)
 { 
return db.query("CALL Delete_Qualification_Master(@Qualification_Master_Id_ :=?)",[Qualification_Master_Id_],callback);
 }
 ,
 Get_Qualification_Master:function(Qualification_Master_Id_,callback)
 { 
return db.query("CALL Get_Qualification_Master(@Qualification_Master_Id_ :=?)",[Qualification_Master_Id_],callback);
 }
 ,
 Search_Qualification_Master:function(Qualification_Master_Name_,callback)
 { 
 if (Qualification_Master_Name_===undefined || Qualification_Master_Name_==="undefined" )
 Qualification_Master_Name_='';
return db.query("CALL Search_Qualification_Master(@Qualification_Master_Name_ :=?)",[Qualification_Master_Name_],callback);
 }


  };
  module.exports=Qualification_Master;

