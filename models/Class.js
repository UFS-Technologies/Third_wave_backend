var db=require('../dbconnection');
var fs = require('fs');
var Class=
{ 
Save_Class:function(Class_,callback)
{ 
return db.query("CALL Save_Class("+" @Class_Id_ :=?,"+" @Class_Name_ :=?,"+"@Class_Order_ :=?)"
,[Class_.Class_Id, Class_.Class_Name, Class_.Class_Order ],callback);
}
,
Delete_Class:function(Class_Id_,callback)
{ 
return db.query("CALL Delete_Class(@Class_Id_ :=?)",[Class_Id_],callback);
}
,
Get_Class:function(Class_Id_,callback)
{ 
return db.query("CALL Get_Class(@Class_Id_ :=?)",[Class_Id_],callback);
}
,



Search_Class_Typeahead:function(Class_Name,callback)
{ 
   if (Class_Name===undefined ||Class_Name==="undefined" )
   Class_Name='';
   return db.query("CALL Search_Class_Typeahead(@Class_Name :=?)",[Class_Name],callback);
},


Search_Application_StatusforChangeStatus_Typeahead:function(Status_Name,Login_User,callback)
{ 
   if (Status_Name===undefined || Status_Name==="undefined" )
   Status_Name='';
   return db.query("CALL Search_Application_StatusforChangeStatus_Typeahead(@Status_Name :=?,"+"@Login_User :=?)",[Status_Name,Login_User],callback);
},



Search_Class:function(Class_Name_,callback)
{ 
if( Class_Name_===undefined || Class_Name_==="undefined" )
Class_Name_='';
return db.query("CALL Search_Class(@Class_Name_ :=?)",[Class_Name_],callback);
}
};
 module.exports=Class;

