var db=require('../dbconnection');
var fs = require('fs');

var Application=
{
Search_Application_Group_Typeahead:function(Application_Group_Name,callback)
{ 
   if (Application_Group_Name===undefined || Application_Group_Name==="undefined" )
   Application_Group_Name='';
   return db.query("CALL Search_Application_Group_Typeahead(@Application_Group_Name :=?)",[Application_Group_Name],callback);
},
Get_Application_Group:function(Application_Group_Id_,callback)
{ 
return db.query("CALL Get_Application_Group(@Application_Group_Id_ :=?)",[Application_Group_Id_],callback);
}
}
module.exports=Application;