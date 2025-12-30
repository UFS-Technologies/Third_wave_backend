 var db=require('../dbconnection');
 const storedProcedure=require('../helpers/stored-procedure');
 var fs = require('fs');
 var Document=
 { 
//  Save_Document:function(Document_,callback)
//  { 
// return db.query("CALL Save_Document("+
// "@Document_Id_ :=?,"+
// "@Document_Name_ :=?"+")"
//  ,[Document_.Document_Id,
// Document_.Document_Name
// ],callback);
//  }
//  ,
Get_Mandatory_Document_Edit:function(University_Id_,callback)
{ 
return db.query("CALL Get_Mandatory_Document_Edit(@University_Id_ :=?)",[University_Id_],callback);
},

Load_Country_Type: async function () {
  const Job_Sector_type = await (new storedProcedure('Load_Country_Type', [])).result();
console.log(Job_Sector_type);
  return { Job_Sector_type };
},


Load_University_Type: async function () {
  const Job_Specialisation_type = await (new storedProcedure('Load_University_Type', [])).result();
console.log(Job_Specialisation_type);
  return { Job_Specialisation_type };
},




Save_Process_view:function(body,callback)
{ 
 const Process_Status_Details_=body.Process_Status_Details_
 const Login_User_=body.Login_User_
 console.log(Process_Status_Details_)
//  console.log('Document_.In_country_view: ', Document_.In_country_view);
 var Country_Selection_Data = Process_Status_Details_.Country_Data;
 var University_Selection_Type = Process_Status_Details_.University_Filer_Data;
 var Process_Selection_Type = Process_Status_Details_.Process_Filer_Data;
 
//  var Job_Specialisation_Type = Process_Status_Details_.Job_Specialisation_Data;
return db.query("CALL Save_Process_view("+
"@Country_Selection_Type :=?,"+"@University_Selection_Type :=?,"+"@Process_Selection_Type :=?,"+"@Login_User_ :=?,"+"@Process_Status_Details_id_ :=?"+
")"
,[JSON.stringify(Country_Selection_Type),JSON.stringify(University_Selection_Type),JSON.stringify(Process_Selection_Type),Login_User_,Document_.mandatory_master_details_id,Document_.In_country_view,Document_.Out_country_view

],callback);
}

,


Load_Process_Data: async function () {
  const Process_Datatype = await (new storedProcedure('Load_Process_Data', [])).result();
console.log(Process_Datatype);
  return { Process_Datatype };
},
Save_Document:function(Document_,callback)
{ 
return db.query("CALL Save_Document("+
"@Document_Id_ :=?,"+
"@Document_Name_ :=?,"+
"@Document_Name_ :=?,"+
"@Document_Order_ :=?,"+
"@agency_documents_id_ :=?,"+
"@agency_documents_name_ :=?,"+
"@File_Type_Data_ :=?"
+")"
,[Document_.Document_Id,
Document_.Document_Name,Document_.Document_Type,Document_.Document_Order,Document_.agency_documents_id,Document_.agency_documents_name,JSON.stringify(Document_.File_Type_Data)
],callback);
}
,


 Delete_Document:function(Document_Id_,callback)
 { 
return db.query("CALL Delete_Document(@Document_Id_ :=?)",[Document_Id_],callback);
 }
 ,
 Get_Document:function(Document_Id_,callback)
 { 
return db.query("CALL Get_Document(@Document_Id_ :=?)",[Document_Id_],callback);
 }
 ,

 Get_File_Type: function (Document_Id_, callback) {
     return db.query("CALL Get_File_Type(@Document_Id_ :=?)", [Document_Id_], callback);
   }
 ,

 Get_Process_Status_by_process: function (selectedProcess, callback) {
  return db.query("CALL Get_Process_Status_by_process(@selectedProcess :=?)", [selectedProcess], callback);
}
,

 getDocumentTypeByDocumentId:async function (Document_Id_) {
  // Implement your logic to fetch document type by document ID
  // Use your stored procedure or database query here
  const Document_type = await (new storedProcedure('getDocumentTypeByDocumentId', [Document_Id_])).result();
  return {Document_type};
}
, 

 Load_Document_Data: async function () {
  const Document_Datatype = await (new storedProcedure('Load_Document_Data', [])).result();
console.log(Document_Datatype);
  return { Document_Datatype };
},

Load_File_Type: async function () {
     const FileType = await (new storedProcedure('Load_File_Type', [])).result();
     
     return { FileType };
   },


 Search_Document:function(Student_Id_,callback)
 { 
//  if (Document_Name_===undefined || Document_Name_==="undefined" )
// Document_Name_='';
return db.query("CALL Search_Document(@Student_Id_ :=?)",[Student_Id_],callback);
 },


 Document_Search:function(Document_Name_,Document_Type,callback)

{  console.log('Document_Name_: ', Document_Name_);
    console.log(Document_Type);
if( Document_Name_===undefined || Document_Name_==="undefined" )
Document_Name_='';
return db.query("CALL Document_Search(@Document_Name_ :=?," +
"@Document_Type :=?)",[Document_Name_,Document_Type],callback);
}
  };
  module.exports=Document;

