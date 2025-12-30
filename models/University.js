var db = require("../dbconnection");
var fs = require("fs");
var University = {
  Save_University: function (University_, callback) {

    const Document_View_Data_JSON = JSON.stringify(University_.Document_View_Data);
    console.log(University_)
    return db.query(
      "CALL Save_University(" +
        "@University_Id_ :=?," +
        "@University_Name_ :=?," +
        "@Country_Id :=?," +
        "@processId :=?," +
        "@University_Name_ :=?," +
        "@Country_Id :=?," +
        "@processId :=?," +
        "@Document_View_Data :=?" +
        ")",
      [University_.University_Id, University_.University_Name, University_.Country_Id, University_.processId, University_.Gold, University_.Silver, University_.Platinum, Document_View_Data_JSON],
      callback
    );
  },
  Delete_University: function (University_Id_, callback) {
    return db.query(
      "CALL Delete_University(@University_Id_ :=?)",
      [University_Id_],
      callback
    );
  },

  

  Get_University: function (University_Id_, callback) {
    return db.query(
      "CALL Get_University(@University_Id_ :=?)",
      [University_Id_],
      callback
    );
  },

  update_commission: function (University_Id_, callback) {
    return db.query(
      "CALL update_commission(@University_Id_ :=?)",
      [University_Id_],
      callback
    );
  },
  University_Typeahead: function (University_Name, callback) {
    if (University_Name === undefined || University_Name === "undefined")
      University_Name = "";
    return db.query(
      "CALL University_Typeahead(@University_Name :=?)",
      [University_Name],
      callback
    );
  },




  
  Search_University_Typeahead: function (University_Name, callback) {
    if (University_Name === undefined || University_Name === "undefined")
      University_Name = "";
    return db.query(
      "CALL Search_University_Typeahead(@University_Name :=?)",
      [University_Name],
      callback
    );
  },


    
  Search_University_Typeahead_Country: function (University_Name,Country_Id, callback) {
    console.log('Country_Id: ', Country_Id);
    if (University_Name === undefined || University_Name === "undefined")
      University_Name = "";
    return db.query(
      "CALL Search_University_Typeahead_Country(@University_Name :=?,"+"@Country_Id :=?)",
      [University_Name,Country_Id],
      callback
    );
  },


  Search_Status_Typeahead: function (Department_Status_Name,universityId, callback) {
    console.log('universityId: ', universityId);
    if (Department_Status_Name === undefined || Department_Status_Name === "undefined")
      Department_Status_Name = "";
    return db.query(
      "CALL Search_Status_Typeahead(@Department_Status_Name :=?,"+"@universityId :=?)",
      [Department_Status_Name,universityId],
      callback
    );
  },

  Search_Status_Typeahead_check: function (Department_Status_Name,University_Ids, callback) {
    if (Department_Status_Name === undefined || Department_Status_Name === "undefined")
      Department_Status_Name = "";

    const universityIdsParam = Array.isArray(University_Ids) ? University_Ids.join(',') : '';
    return db.query(
      "CALL Search_Status_Typeahead_check(@Department_Status_Name :=?,@universityIdsParam :=?)",
      [Department_Status_Name,universityIdsParam],
      callback
    );
  },
  Search_Status_Typeahead1: function (Department_Status_Name, callback) {
    if (Department_Status_Name === undefined || Department_Status_Name === "undefined")
      Department_Status_Name = "";
    return db.query(
      "CALL Search_Status_Typeahead1(@Department_Status_Name :=?)",
      [Department_Status_Name],
      callback
    );
  },
  Search_University: function (University_Name_, Country_Id_, callback) {
    if (University_Name_ === undefined || University_Name_ === "undefined")
      University_Name_ = "";
  
    if (Country_Id_ === undefined || Country_Id_ === "undefined")
      Country_Id_ = 0;
  
    return db.query(
     "CALL Search_University(@University_Name_ :=?,"+"@Country_Id_ :=?)",  // Modify the SQL query to accept two parameters
      [University_Name_, Country_Id_], // Pass both University_Name_ and Country_Id_ to the stored procedure
      callback
    );
  },



  // Search_University: function (University_Name_, callback) {
  //   if (University_Name_ === undefined || University_Name_ === "undefined")
  //     University_Name_ = "";
  //   return db.query(
  //     "CALL Search_University(@University_Name_ :=?)",
  //     [University_Name_],
  //     callback
  //   );
  // },
  University_Typeahead_with_Country:function(University_Name,Country_Id,callback)
 {
    if (University_Name===undefined || University_Name==="undefined" )
    University_Name='';
  if (Country_Id===undefined || Country_Id==null )
  Country_Id=0;

console.log('University_Name: ', University_Name);
  console.log('University_Id: ', Country_Id);
    return db.query("CALL University_Typeahead_with_Country(@Country_Id :=?,@University_Name :=?)",[Country_Id,University_Name],callback);
 },
};


//  Save_University:function(University_,callback)
//  {
// return db.query("CALL Save_University("+"@University_Id_ :=?,"+"@University_Name_ :=?,"+"@About_ :=?,"+
// "@About1_ :=?,"+"@About2_ :=?,"+"@Location_ :=?,"+"@Address_ :=?,"+"@Founded_In_ :=?,"+
// "@Institution_Type_ :=?,"+"@Cost_Of_Living_ :=?,"+"@Tution_Fee_ :=?,"+"@Application_Fee_ :=?,"+"@Type_Of_Accomodation_ :=?,"+
// "@Contact_Number_ :=?,"+"@Email_ :=?,"+"@Web_ :=?,"+"@Fb_ :=?,"+"@Linkedin_ :=?,"+"@Twitter_ :=?,"+
// "@Googlemap_ :=?,"+"@Status_ :=?,"+"@University_Id_ :=?,"+"@Sub_Heading1_ :=?,"+"@Sub_Heading2_ :=?,"+"@Sub_Heading3_ :=?,"+
// "@School_Rank_ :=?,"+"@Video_Link_ :=?,"+"@Sub_Heading_Colored_ :=?,"+
// "@Banner_Image_ :=?"+")"
//  ,[University_.University_Id,University_.University_Name,University_.About,University_.About1,
//    University_.About2,University_.Location,University_.Address,University_.Founded_In,
//    University_.Institution_Type,University_.Cost_Of_Living,University_.Tution_Fee,University_.Application_Fee,
//    University_.Type_Of_Accomodation,University_.Contact_Number,University_.Email,University_.Web,
//    University_.Fb,University_.Linkedin,University_.Twitter,University_.Googlemap,University_.Status,
//    University_.University_Id,University_.Sub_Heading1,University_.Sub_Heading2,University_.Sub_Heading3,
//    University_.School_Rank,University_.Video_Link,University_.Sub_Heading_Colored,University_.Banner_Image,
// ],callback);
//  } ,
//  Save_University_Photos: function (University_, callback)
//   {

//         return db.query("CALL Save_University_Photos(" +"@University_Id_ :=?,"  +"@Photo :=?"+")"
//         ,[University_.University_Id,University_.Photo],callback);
//   },
//  Delete_University:function(University_Id_,callback)
//  {
// return db.query("CALL Delete_University(@University_Id_ :=?)",[University_Id_],callback);
//  } ,
//  Load_Status:function(callback)
//  {
// return db.query("CALL Load_Status()",[],callback);
//  } ,
//  Load_University:function(callback)
//  {
// return db.query("CALL Load_University()",[],callback);
//  } ,
//  Get_University_Photos:function(University_Id_,callback)
//  {
// return db.query("CALL Get_University_Photos(@University_Id_ :=?)",[University_Id_],callback);
//  } ,

//  Search_University:function(University_Name_,University_,Status_,callback)
//  {
//  if (University_Name_===undefined || University_Name_==="undefined" )
// University_Name_='';
// return db.query("CALL Search_University(@University_Name_ :=?,@University_ :=?,@Status_ :=?)",[University_Name_,University_,Status_,],callback);
//  },
//  Search_University_Typeahead:function(University_Name,callback)
//  {
//     if (University_Name===undefined || University_Name==="undefined" )
//     University_Name='';
//     return db.query("CALL Search_University_Typeahead(@University_Name :=?)",[University_Name],callback);
//  }

//   };
module.exports = University;
