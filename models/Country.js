var db = require("../dbconnection");
var fs = require("fs");
var Country = {
  Save_Country: function (Country_, callback) {
    console.log(Country_)
    return db.query(
      "CALL Save_Country(" + "@Country_Id_ :=?," + "@Country_Name_ :=?," + "@ProcessId :=?," + "@Gold_ :=?," + "@Silver_ :=?," + "@Platinum_ :=?," + "@Image_Photo_ :=?," + "@File_Key_ :=?" + ")",
      [Country_.Country_Id, Country_.Country_Name, Country_.ProcessId , Country_.Gold , Country_.Silver ,Country_.Platinum,Country_.Image_Photo,Country_.File_Key],
      callback
    );
  },
  Delete_Country: function (Country_Id_, callback) {
    return db.query(
      "CALL Delete_Country(@Country_Id_ :=?)",
      [Country_Id_],
      callback
    );
  },
  Get_Country: function (Country_Id_, callback) {
    return db.query(
      "CALL Get_Country(@Country_Id_ :=?)",
      [Country_Id_],
      callback
    );
  },

  update_commission_Country: function (Country_Id_, callback) {
    return db.query(
      "CALL update_commission_Country(@Country_Id_ :=?)",
      [Country_Id_],
      callback
    );
  },
  Search_Country_Typeahead: function (Country_Name, callback) {
    if (Country_Name === undefined || Country_Name === "undefined")
      Country_Name = "";
    return db.query(
      "CALL Search_Country_Typeahead(@Country_Name :=?)",
      [Country_Name],
      callback
    );
  },

  Search_Application_StatusforChangeStatus_Typeahead: function (
    Status_Name,
    Login_User,
    callback
  ) {
    if (Status_Name === undefined || Status_Name === "undefined")
      Status_Name = "";
    return db.query(
      "CALL Search_Application_StatusforChangeStatus_Typeahead1(@Status_Name :=?," +"@Login_User :=?)",
      [Status_Name, Login_User],
      callback
    );
  },

  Search_Country: function (Country_Name_, callback) {
    if (Country_Name_ === undefined || Country_Name_ === "undefined")
      Country_Name_ = "";
    return db.query(
      "CALL Search_Country(@Country_Name_ :=?)",
      [Country_Name_],
      callback
    );
  },






  Search_Application_StatusFor_Process_Document: function (
    Process_id,
    Department_Status_Id,
    Application_details_Id,
    Student_Id,
    callback
  ) {
   
    return db.query(
      "CALL Search_Application_StatusFor_Process_Document(@Process_id:=?," + 
      "@Department_Status_Id:=?," + 
      "@Application_details_Id:=?," + 
      "@Student_Id :=?)",
      [Process_id, Department_Status_Id,Application_details_Id,Student_Id],
      callback
    );
  },

  
 Save_Country_Intake:function(Country_Intake_,callback)
 { 
   console.log(Country_Intake_);
   console.log(Country_Intake_.Intake_Data);
   console.log('   Country_Intake_.Intake_Year_Name: ',    Country_Intake_.Intake_Year_Name);

return db.query("CALL Save_Country_Intake("+
"@Country_Intake_Id_ :=?,"+
"@Country_Id_ :=?,"+
"@Year_Id_ :=?,"+
"@Intake_Year_Name_ :=?,"+
"@Intake_Data_ :=?"+")"
 ,[Country_Intake_.Country_Intake_Id,
   Country_Intake_.Country_Id,
   Country_Intake_.Year_Id,
   Country_Intake_.Intake_Year_Name,

JSON.stringify(Country_Intake_.Intake_Data),
],callback);
 }
 ,



 Delete_Country_Intake:function(Country_Intake_Id_,callback)
 { 
return db.query("CALL Delete_Country_Intake(@Country_Intake_Id_ :=?)",[Country_Intake_Id_],callback);
 }
 ,

 Search_Country_Intake:function(Country_Id_,Intake_Id_,Year_Id_,Status_Id_,callback)
 { 

return db.query("CALL Search_Country_Intake(@Country_Id_ :=?,@Intake_Id_ :=?,@Year_Id_ :=?,@Status_Id_ :=?)",[Country_Id_,Intake_Id_,Year_Id_,Status_Id_],callback);
 },

 Get_Country_Intake:function(Country_Intake_Id_,callback)
 { 
return db.query("CALL Get_Country_Intake(@Country_Intake_Id_ :=?)",[Country_Intake_Id_],callback);
 },

};
module.exports = Country;
