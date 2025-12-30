const express = require("express");
const router = express.Router();
const CallDetails = require("../models/call_Details");
const axios = require("axios");
// Base URL for FastAPI
const FASTAPI_BASE_URL = "https://fastapiserver-0owu.onrender.com/api/v1";

// Endpoints
const FASTAPI_LOGIN_URL = `${FASTAPI_BASE_URL}/auth/login`;
const FASTAPI_CALLS_URL = `${FASTAPI_BASE_URL}/calls/optimized`;
const FASTAPI_RECORDING_URL = `${FASTAPI_BASE_URL}/calls/recordings`;
const FASTAPI_USER_URL=`${FASTAPI_BASE_URL}/users`;
const FASTAPI_USER_DASHBOARD=`${FASTAPI_BASE_URL}/dashboard`; 

// --- LOGIN API ---
router.post("/login", async (req, res) => {
  try {
    const response = await performLogin();
    console.log("Login successful, tokens received.");

    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    });
  } catch (err) {
    console.error("Error fetching token:", err.response?.data || err.message);
    res.status(401).json({ error: "Unable to fetch token" });
  }
});

async function getToken() {
  // You can take these from req.body, or hardcode for testing
  const loginPayload = {
    client_type: "console",
    client_key: "your_console_key_here", // 🔑 replace with real key
    device_id: "1234", // could come from frontend
    device_rom: "unknown",
    phone_number: "9496127629",
    otp_jwt: "", // empty or actual OTP JWT
    password: "Lalitha@42",
  };

  const response = await axios.post(
    FASTAPI_LOGIN_URL,
    new URLSearchParams(loginPayload), // 🔑 must send as form-data (x-www-form-urlencoded)
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("Login successful:", response.data);
  return response.data.access_token;
}

// --- CALLS API ---
router.get("/Search_Call_Aether_History", async (req, res) => {
  try {
    // Take token from client request header
    // const token = req.headers.authorization?.replace("Bearer ", "") ;
    // const token = await getToken();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NzY4NDg0NSwiaWF0IjoxNzY3MDgwMDQ1LCJ0eXBlIjoiYWNjZXNzIn0.sSZwMyCUMqaXokTzyz72ZuKJRyzI5AYhngqBiqVf2Sc";

    if (!token) {
        const response = await performLogin();
     token = response.data.access_token;
      console.log("Performed login, new token:", token);
    }

    // Build filters
    const fromDate = req.query.startDate
      ? `${req.query.startDate}T00:00:00+05:30`
      : null;
    const toDate = req.query.endDate
      ? `${req.query.endDate}T23:59:59.999999+05:30`
      : null;

    let callTypes;
    if (!req.query.direction || req.query.direction === "All") {
      // default to all call types
      callTypes = ["incoming", "outgoing", "missed", "not_connected"];
    } else {
      callTypes = [req.query.direction];
    }

    const queryParams = {
      offset: req.query.offset || 0,
      limit: req.query.limit || 1000,
      filter_min_start_datetime: fromDate,
      filter_max_start_datetime: toDate,
      filter_frontend_call_types: callTypes,
      filter_other_numbers:
        req.query.callerIdNumber && req.query.callerIdNumber !== "null"
          ? req.query.callerIdNumber
          : null,
      filter_agent_name:
        req.query.agentName && req.query.agentName !== "null"
          ? req.query.agentName
          : null,
      filter_student_name:
        req.query.studentName && req.query.studentName !== "undefined"
          ? req.query.studentName
          : null,
    };

    // Remove null values
    Object.keys(queryParams).forEach(
      (k) => queryParams[k] === null && delete queryParams[k]
    );

    // ✅ Call FastAPI with proper serializer
    const response = await axios.get(FASTAPI_CALLS_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: queryParams,
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
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching calls:", err.response?.data || err.message);
    res.status(500).json({ error: "Unable to fetch calls" });
  }
});

//user loading
// router.get("/Get_UsersListfromAther", async (req, res) => {
//   try {

//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NTYyMjUwOCwiaWF0IjoxNzY1NjIxOTA4LCJ0eXBlIjoiYWNjZXNzIn0.f0x0r3Rs733xf-1us3bqrAcjQFPIBuMH-OIAhPIxLRE";
  
//     if (!token) {
//         const response = await performLogin();
//      token = response.data.access_token;
//       console.log("Performed login, new token:", token);
//     }

   
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
    
//       const resp=await CallDetails.Update_User_Details(response.data);
//        console.log(resp);
//       return res.send(resp);
//   } catch (err) {
//     console.error("Error fetching calls:", err.response?.data || err.message);
//     res.status(500).json({ error: "Unable to fetch calls" });
//   }
// });

       router.get('/Get_UsersListfromAther/', async function (req, res, next) {
      try {
          console.log(req.body);   
        const resp = await CallDetails.Get_UsersListfromAther(req.body);
         console.log(resp);   
        return res.send(resp);
      }
      catch (e) {   
        console.log(e);     
        return res.send(e);
      }
    });

// --- CALLS DASHBOARD API ---
router.post("/Search_Call_Aether_Dashboard", async (req, res) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NzY4NDg0NSwiaWF0IjoxNzY3MDgwMDQ1LCJ0eXBlIjoiYWNjZXNzIn0.sSZwMyCUMqaXokTzyz72ZuKJRyzI5AYhngqBiqVf2Sc";

    if (!token) {
        const response = await performLogin();
     token = response.data.access_token;
     //console.log("Performed login, new token:", token);
    }
    // const fromDate = req.query.startDate
    //   ? `${req.query.startDate}T00:00:00+05:30`
    //   : null;
    // const toDate = req.query.endDate
    //   ? `${req.query.endDate}T23:59:59.999999+05:30`
    //   : null;

    // let callTypes;
// const queryParams =
// {
//   "time_filter": "today",
//   "start_date": "2025-12-13T01:00:52.920Z",
//   "end_date": "2025-12-13T01:00:52.920Z",
//   "user_ids": [
//     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   ],
//   "user_group_ids": [
//     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   ],
//   "employee_ids": [
//     "string"
//   ],
//   "branch_ids": [
//     "string"
//   ]
// }


    // const queryParams = {
    //   offset: req.query.offset || 0,
    //   limit: req.query.limit || 1000,
    //   filter_min_start_datetime: fromDate,
    //   filter_max_start_datetime: toDate,
    //   filter_user_ids:
    //     req.query.user_ids && req.query.user_ids !== "null"
    //       ? req.query.user_ids
    //       : null,
    //   filter_user_group_ids:
    //     req.query.user_group_ids && req.query.user_group_ids !== "null"
    //       ? req.query.user_group_ids
    //       : null,
    //   filter_employee_ids:
    //     req.query.employee_ids && req.query.employee_ids !== "undefined"
    //       ? req.query.employee_ids
    //       : null,
    //        filter_branch_ids:
    //     req.query.branch_ids && req.query.branch_ids !== "undefined"
    //       ? req.query.branch_ids
    //       : null,          
    // };
    // Remove null values
    // Object.keys(queryParams).forEach(
    //   (k) => queryParams[k] === null && delete queryParams[k]
    // );
    //console.log('2', JSON.stringify(queryParams));
    // ✅ Call FastAPI with proper serializer
    // console.log('2', queryParams);

// try {
    // const response1 = await axios.post(
    //   FASTAPI_USER_DASHBOARD,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //     params: (queryParams)
    //   }
    // );

// const response = await axios.post(
//   FASTAPI_USER_DASHBOARD,
//   null,   // body must be null
//   {
//     params: queryParams,   // ✅ correct place
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// );   "string"  "string"
// console.log("time_filter",req.params)"3fa85f64-5717-4562-b3fc-2c963f66afa6","3fa85f64-5717-4562-b3fc-2c963f66afa6"
/*
    "time_filter":"today",
  "start_date":  "2025-01-13T01:00:52.920Z",
  "end_date":  "2025-12-13T01:00:52.920Z",
  "user_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"  
  ],
  "user_group_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"  
  ],
  "employee_ids": ["string"
  ],
  "branch_ids": [ "string"
  ]
*/

const response = await axios.post(
  FASTAPI_USER_DASHBOARD,
  {
  "time_filter":req.body.time_filter,
  "start_date":req.body.start_date,
  "end_date": req.body.end_date,
  "user_ids": req.body.user_ids,
  "user_group_ids": req.body.user_group_ids,
  "employee_ids": req.body.employee_ids,
  "branch_ids": req.body.branch_ids
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);



   
  // } catch (error) {
  //   console.error(error.message);
  // }




//     const response = await axios.get(FASTAPI_USER_DASHBOARD, {
//       headers: { Authorization: `Bearer ${token}` },
//       params:(queryParams),
//       paramsSerializer: (params) => {
//   return Object.entries(params)
//     .map(([key, value]) => {
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
// },
//     });
//     console.log("Calls fetched:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching calls:", err.response?.data || err.message);
    res.status(500).json({ error: "Unable to fetch calls" });
  }
});

// --- GET RECORDING API ---
router.get("/Get_Recording_URL/:id", async (req, res) => {
  try {
    // Extract recording_id from params
    const recordingId = req.params.id;

    // Extract token from headers
    // const token = req.headers.authorization?.replace("Bearer ", "");
    // const token = await getToken();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjE1NjM3MS1jODFlLTRlNWQtOTA1ZC04YjcxZjY3OTA0MDkiLCJwaG9uZV9udW1iZXIiOiI5NDk2MTI3NjI5IiwiY2xpZW50X3R5cGUiOiJjb25zb2xlIiwiZGV2aWNlX2lkIjoiMTIzNCIsImRldmljZV9yb20iOiJ1bmtub3duIiwic2NvcGVzIjpbImNvbnNvbGU6YWxsIl0sImV4cCI6MTc2NzY4NDg0NSwiaWF0IjoxNzY3MDgwMDQ1LCJ0eXBlIjoiYWNjZXNzIn0.sSZwMyCUMqaXokTzyz72ZuKJRyzI5AYhngqBiqVf2Sc";

    if (!token) {
      return res.status(401).json({ error: "Missing access token" });
    }

    if (!recordingId) {
      return res.status(404).json({ error: "Missing recording ID" });
    }

    // Call FastAPI with Bearer token
    const response = await axios.get(
      `${FASTAPI_RECORDING_URL}/${recordingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    // Return the recording info (usually has download_url)
    res.json(response.data.download_url);
  } catch (err) {
    console.error(
      "Error fetching recording:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Unable to fetch recording" });
  }
});

async function performLogin() {
const loginPayload = {
      client_type: "console",
      client_key: "your_console_key_here", // 🔑 replace with real key
      device_id: "1234",       // could come from frontend
      device_rom: "unknown",
      phone_number: "9496127629",
      otp_jwt: "",                         // empty or actual OTP JWT
      password: "Lalitha@42"
    };

  const response = await axios.post(
    FASTAPI_LOGIN_URL,
    new URLSearchParams(loginPayload), // 🔑 must send as form-data (x-www-form-urlencoded)
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  return response.data;
}

module.exports = router;
