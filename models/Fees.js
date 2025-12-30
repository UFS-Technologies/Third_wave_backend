 var db=require('../dbconnection');
 var fs = require('fs');
 var Fees=
 { 
    Save_Fees:function(Fees_,callback)
 { 
return db.query("CALL Save_Fees("+
"@Fees_Id_ :=?,"+
"@Fees_Name_ :=?"+")"
 ,[Fees_.Fees_Id,
    Fees_.Fees_Name
],callback);
 }
 ,
 Delete_Fees:function(Fees_Id_,callback)
 { 
return db.query("CALL Delete_Fees(@Fees_Id_ :=?)",[Fees_Id_],callback);
 }
 ,
 Get_Fees:function(Fees_Id_,callback)
 { 
return db.query("CALL Get_Fees(@Fees_Id_ :=?)",[Fees_Id_],callback);
 }
 ,

 Search_Fees_Typeahead:function(Fees_Id_,Fees_Name_,callback)
{ 
  if(Fees_Name_==='undefined'||Fees_Name_===''||Fees_Name_===undefined )
  Fees_Name_='';
return db.query("CALL Search_Fees_Typeahead(@Fees_Id_ :=?,@Fees_Name_ :=?)",
[Fees_Id_,Fees_Name_],callback);
}
,
 Search_Fees_Data:function(Fees_Name_,callback)
 { 
 if (Fees_Name_===undefined || Fees_Name_==="undefined" )
 Fees_Name_='';
return db.query("CALL Search_Fees_Data(@Fees_Name_:=?)",[Fees_Name_],callback);
 },

//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,

Search_Fees:function(Fees_Name_,callback)
{ 
if (Fees_Name_===undefined || Fees_Name_==="undefined" )
Fees_Name_='';
return db.query("CALL Search_Fees(@Fees_Name_ :=?)",[Fees_Name_],callback);
},

Save_DataField:function(Data_Field_,callback)
{ 
return db.query("CALL Save_DataField("+
"@Fields_Id_ :=?,"+
"@Fields_Name_ :=?,"+
"@Data_Type_ :=?"+")"
,[Data_Field_.Fields_Id,
  Data_Field_.Fields_Name,
  Data_Field_.Data_Type
],callback);
},

Search_DataFields:function(Fields_Name_,callback)
{ 
if (Fields_Name_===undefined || Fields_Name_==="undefined" )
Fields_Name_='';
return db.query("CALL Search_DataFields(@Fields_Name_ :=?)",[Fields_Name_],callback);
},

Delete_DataFields:function(Fields_Id_,callback)
{ 
return db.query("CALL Delete_DataFields(@Fields_Id_ :=?)",[Fields_Id_],callback);
}
,
  };
  module.exports=Fees;

