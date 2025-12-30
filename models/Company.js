var db=require('../dbconnection');
 // const storedProcedure=require('../helpers/stored-procedure');
var fs = require('fs');
const StoredProcedure = require('../helpers/stored-procedure');
// const axios = require("axios");
// Base URL for FastAPI
// const FASTAPI_BASE_URL = "https://fastapiserver-0owu.onrender.com/api/v1";

// Endpoints
// const FASTAPI_LOGIN_URL = `${FASTAPI_BASE_URL}/auth/login`;
// const FASTAPI_CALLS_URL = `${FASTAPI_BASE_URL}/calls/optimized`;
// const FASTAPI_RECORDING_URL = `${FASTAPI_BASE_URL}/calls/recordings`;
// const FASTAPI_USER_URL=`${FASTAPI_BASE_URL}/users`;
// const FASTAPI_USER_DASHBOARD=`${FASTAPI_BASE_URL}/dashboard`; 

var Company= 
{ 
  Save_Company:function(Company_,callback)
{ 
 var Company_value_=1;
return db.query("CALL Save_Company("+"@Company_ :=?,"+"@Company_value_ :=?)" ,[JSON.stringify(Company_),Company_value_],callback); 
}
,
Get_Company: async function () 
{
// const Company_Data=await (new storedProcedure('Get_Company',  [])).result();
const Company_Data=await (new StoredProcedure('Get_Company',  [])).result();
return {Company_Data};    

},

// Delete_Company:function(Company_Id_,callback)
// { 
// return db.query("CALL Delete_Company(@Company_Id_ :=?)",[Company_Id_],callback);
// }
Save_Application_Settings: async function (Application_Settings_) {
  return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      console.log(Application_Settings_)
      const result1 = await(new StoredProcedure('Save_Application_Settings', [Application_Settings_.Application_Settings_Id,Application_Settings_.Settings_Value,Application_Settings_.Department_Id,Application_Settings_.Register_Transfer_Status,Application_Settings_.Registration_By,Application_Settings_.Branch,Application_Settings_.Department,Application_Settings_.Tostaff,Application_Settings_.Receipt_Notification_User,Application_Settings_.Round_Robin,Application_Settings_.Import_with_Status,Application_Settings_.Import_with_Enquiry_Source,Application_Settings_.Highest_Department_Profile,Application_Settings_.Class_Profile,Application_Settings_.Highest_Status_Profile,Application_Settings_.Department_Status_Id,Application_Settings_.Department_Status_Name], connection)).result();
   await connection.commit();
      connection.release();
      rs( result1);
    }
    catch (err) {
      await connection.rollback();
      rej(err);
    }
  
  })   
  },

//   Get_UsersListfromAther: async function () {
//   return new Promise(async (rs,rej)=>{
//     const pool = db.promise();
//     let result1;
//     var connection = await pool.getConnection();
//     await connection.beginTransaction();

//   try {

//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NTYyMzg3OCwiaWF0IjoxNzY1NjIzMjc4LCJ0eXBlIjoiYWNjZXNzIn0.JwVVAKB1hDKGqGh1MukGMraPnOy2cpP23CPZiYT64ro";
  
//     if (!token) {
//         const response = await performLogin();
//      token = response.data.access_token;
//       console.log("Performed login, new token:", token);
//     }

//     // ✅ Call FastAPI with proper serializer
//     const response = await axios.get(FASTAPI_USER_URL, {
//       headers: { Authorization: `Bearer ${token}` },

//       paramsSerializer: (params) => {
//         return Object.entries(params)
//         .map(([key, value]) => {
//       if (Array.isArray(value)) {        
//         return value
//           .map(
//             (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
//           )
//           .join("&");
//       }
//       return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
//     })
//     .join("&");
//     },
//     });
//     console.log("Calls fetched:", response.data);
//     //req=response.data;
//  var CallDetails_Value_ = 0;     
//     let CallDetails_ = JSON.stringify(response.data);
//     if (CallDetails_ != undefined && CallDetails_ != "" && CallDetails_ != null)
//       CallDetails_Value_ = 1;
//     //  try 
//     //   {
//       //const result1=await(new StoredProcedure(Update_User_Details(response.data);

//        const result1 = await(new StoredProcedure('Update_User_Details', [CallDetails_,CallDetails_Value_], 
//         connection)).result();
//        console.log(result1);
//      await connection.commit();
//       connection.release();
//       rs( result1);
//       //}
//       // catch(e){
//       //    console.log(e);
//       // return res.send(e);      
//       // }
//   } catch (err) {
//    await connection.rollback();
//       rej(err);
//   }

//   //   try {
//   //     console.log(Application_Settings_)
//   //     const result1 = await(new StoredProcedure('Save_Application_Settings', [Application_Settings_.Application_Settings_Id,
//   // Application_Settings_.Settings_Value,Application_Settings_.Department_Id,Application_Settings_.Register_Transfer_Status,
//   // Application_Settings_.Registration_By,Application_Settings_.Branch,Application_Settings_.Department,Application_Settings_.
//   // Tostaff,Application_Settings_.Receipt_Notification_User,Application_Settings_.Round_Robin,Application_Settings_.Import_with_Status,
//   // Application_Settings_.Import_with_Enquiry_Source,Application_Settings_.Highest_Department_Profile,Application_Settings_.Class_Profile,
//   // Application_Settings_.Highest_Status_Profile,Application_Settings_.Department_Status_Id,Application_Settings_.Department_Status_Name], 
//   // connection)).result();
//   //  await connection.commit();
//   //     connection.release();
//   //     rs( result1);
//   //   }
//   //   catch (err) {
//   //     await connection.rollback();
//   //     rej(err);
//   //   }
  
//   })   
//   },


  Get_Application_Settings: async function () 
  {
  const Settings_Data=await (new StoredProcedure('Get_Application_Settings',  [])).result();
  return {Settings_Data};    
  },


  Save_User_Resignation_Management: async function (User_Resignation_Management_) {
    return new Promise(async (rs,rej)=>{
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      try {
        console.log(User_Resignation_Management_)
        const result1 = await(new StoredProcedure('Save_User_Resignation_Management', [User_Resignation_Management_.Resigned_User_Id,User_Resignation_Management_.Resigned_User_Name,User_Resignation_Management_.New_asigned_User_Id,
          User_Resignation_Management_.New_asigned_User_Name,User_Resignation_Management_.Created_By], connection)).result();
     await connection.commit();
        connection.release();
        rs( result1);
      }
      catch (err) {
        await connection.rollback();
        rej(err);
      }
    
    })   
    },

 };
 module.exports=Company;









































//  var db=require('../dbconnection');
//  var fs = require('fs');
//  const storedProcedure=require('../helpers/stored-procedure');
//  var Company_Source=
//  { 
//  Save_Company_Source: async function (Company_Source_) 
//  {
//          return new Promise(async (rs,rej)=>{
//         const pool = db.promise();
//         //  let result1;
//           var connection = await pool.getConnection();
//          await connection.beginTransaction();
   
//           try
//            {
            
//             const result1 = await(new storedProcedure('Save_Company_Source',[Company_Source_.Company_Source_Id,Company_Source_.companyname,Company_Source_.Phone1,
//               Company_Source_.Phone2,Company_Source_.Mobile,Company_Source_.Website,Company_Source_.Email,Company_Source_.Address1,Company_Source_.Address2,Company_Source_.Address3], connection)).result();
//             await connection.commit();
//               connection.release();
//               rs( result1);
//             }
//             catch (err) {
//             await connection.rollback();
//             rej(err);
//             }   
// })
// },

// };
  // module.exports=Company_Source;





























































//  var db=require('../dbconnection');
//  // const storedProcedure=require('../helpers/stored-procedure');
// var fs = require('fs');
// const StoredProcedure = require('../helpers/stored-procedure');
// var Company= 
// { 
//   Save_Company:function(Company_,callback)
// { 
//  var Company_value_=1;



// return db.query("CALL Save_Company("+
// "@Company_ :=?,"+
// "@Company_value_ :=?"+



// ")" 
// ,[
//   JSON.stringify(Company_),
//   Company_value_
// ],callback); 
// }
// ,



// Get_Company: async function () 
// {
// // const Company_Data=await (new storedProcedure('Get_Company',  [])).result();
// const Company_Data=await (new StoredProcedure('Get_Company',  [])).result();
// return {Company_Data};    

// }

// // Delete_Company:function(Company_Id_,callback)
// // { 
// // return db.query("CALL Delete_Company(@Company_Id_ :=?)",[Company_Id_],callback);
// // }


// // Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
// // { 
// //   return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
// // } ,

//  };
//  module.exports=Company;









































// //  var db=require('../dbconnection');
// //  var fs = require('fs');
// //  const storedProcedure=require('../helpers/stored-procedure');
// //  var Company_Source=
// //  { 
// //  Save_Company_Source: async function (Company_Source_) 
// //  {
// //          return new Promise(async (rs,rej)=>{
// //         const pool = db.promise();
// //         //  let result1;
// //           var connection = await pool.getConnection();
// //          await connection.beginTransaction();
   
// //           try
// //            {
            
// //             const result1 = await(new storedProcedure('Save_Company_Source',[Company_Source_.Company_Source_Id,Company_Source_.companyname,Company_Source_.Phone1,
// //               Company_Source_.Phone2,Company_Source_.Mobile,Company_Source_.Website,Company_Source_.Email,Company_Source_.Address1,Company_Source_.Address2,Company_Source_.Address3], connection)).result();
// //             await connection.commit();
// //               connection.release();
// //               rs( result1);
// //             }
// //             catch (err) {
// //             await connection.rollback();
// //             rej(err);
// //             }   
// // })
// // },

// // };
//   // module.exports=Company_Source;

