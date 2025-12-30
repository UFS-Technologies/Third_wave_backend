const db=require('../dbconnection');
const fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
const axios = require("axios");
// Base URL for FastAPI
const FASTAPI_BASE_URL = "https://fastapiserver-0owu.onrender.com/api/v1";

// Endpoints
const FASTAPI_LOGIN_URL = `${FASTAPI_BASE_URL}/auth/login`;
const FASTAPI_CALLS_URL = `${FASTAPI_BASE_URL}/calls/optimized`;
const FASTAPI_RECORDING_URL = `${FASTAPI_BASE_URL}/calls/recordings`;
const FASTAPI_USER_URL=`${FASTAPI_BASE_URL}/users`;
const FASTAPI_USER_DASHBOARD=`${FASTAPI_BASE_URL}/dashboard`; 
const { Console } = require('console');

const CallDetails = {
  Get_UsersListfromAther: async function () {
  return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();

  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NjM4MDkyMiwiaWF0IjoxNzY1Nzc2MTIyLCJ0eXBlIjoiYWNjZXNzIn0.fC2gLd59V8mlLmP-x3QsnUJzGDl7BjbCHqnAx9F_m9A";
  
    if (!token) {
        const response = await performLogin();
     token = response.data.access_token;
      console.log("Performed login, new token:", token);
    }
    const response = await axios.get(FASTAPI_USER_URL, {
      headers: { Authorization: `Bearer ${token}` },

      paramsSerializer: (params) => {
        return Object.entries(params)
        .map(([key, value]) => {
      if (Array.isArray(value)) {        
        return value
          .map(
            (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
    },
    });
    console.log("Calls fetched:", response.data);
    //req=response.data;
 var CallDetails_Value_ = 0;     
    let CallDetails_ = JSON.stringify(response.data.users);
    if (CallDetails_ != undefined && CallDetails_ != "" && CallDetails_ != null)
      CallDetails_Value_ = 1;   
       const result1 = await(new storedProcedure('Update_User_Details', [CallDetails_,CallDetails_Value_], 
        connection)).result();
       console.log(result1);
     await connection.commit();
      connection.release();
      rs( result1);
  } catch (err) {
   await connection.rollback();
      rej(err);
  }  
  })   
  },
}

module.exports = CallDetails;