 var db=require('../dbconnection');
 var fs = require('fs');
 var Enquiry_Source=
 { 
    Save_Enquiry_Source:function(Enquiry_Source_,callback)
 { 
return db.query("CALL Save_Enquiry_Source("+
"@Enquiry_Source_Id_ :=?,"+
"@Enquiry_Source_Name_ :=?,"+
"@Enquiry_Source_Under_Id_ :=?"+")"
 ,[Enquiry_Source_.Enquiry_Source_Id,
    Enquiry_Source_.Enquiry_Source_Name,
    Enquiry_Source_.Enquiry_Source_Under_Id
],callback);
 }
 ,
 Delete_Enquiry_Source:function(Enquiry_Source_Id_,callback)
 { 
return db.query("CALL Delete_Enquiry_Source(@Enquiry_Source_Id_ :=?)",[Enquiry_Source_Id_],callback);
 }
 ,
 Get_Enquiry_Source:function(Enquiry_Source_Id_,callback)
 { 
return db.query("CALL Get_Enquiry_Source(@Enquiry_Source_Id_ :=?)",[Enquiry_Source_Id_],callback);
 }
 ,
 Search_Enquiry_Source:function(Enquiry_Source_Name_,callback)
 { 
 if (Enquiry_Source_Name_===undefined || Enquiry_Source_Name_==="undefined" )
 Enquiry_Source_Name_='';
return db.query("CALL Search_Enquiry_Source(@Enquiry_Source_Name_ :=?)",[Enquiry_Source_Name_],callback);
 }

//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } 


  };
  module.exports=Enquiry_Source;

