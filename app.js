var http = require('http');
var db=require('./dbconnection.js');
var storedProcedure=require('./helpers/stored-procedure');
var server = http.Server(app);
var socketIO = require('socket.io');
const axios = require('axios'); 
const port = process.env.PORT || 4000;
process.env.SENDGRID_API_KEY = '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';
process.env.socketUrl='https://thirdwavenotificationapi.trackbox.in/' ;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var multer = require('multer');
var multerupload = multer({ dest: 'fileprint/' })
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const jwt = require('./helpers//jwt');
var routes = require("./routes/index");
const errorHandler = require('./helpers/error-handler');

var Outgoing_Webhook= require('./routes//Outgoing_Webhook');
var Login = require("./routes/Login");
var User_Details = require('./routes/User_Details');
var Country = require('./routes//Country');
var Course = require('./routes//Course');
var Course_Intake = require('./routes//Course_Intake');
var Document = require('./routes//Document');
var Duration = require('./routes//Duration');
var Course_Search= require('./routes//Course_Search');
var Intake = require('./routes//Intake');
var Internship = require('./routes//Internship');
var Level_Detail = require('./routes//Level_Detail');
var Student = require('./routes//Student');
var Student_Document = require('./routes//Student_Document');
var Student_Message = require('./routes//Student_Message');
var Student_Status = require('./routes//Student_Status');
var Subject = require('./routes//Subject');
var Remarks= require('./routes//Remarks');
var Region= require('./routes//Region');
var Holiday= require('./routes//Holiday');
var University = require('./routes//University');
var Public_Data = require('./routes//Public_Data');
var Account_Group = require('./routes//Account_Group');
var Client_Accounts = require('./routes//Client_Accounts');
var Agent = require('./routes//Agent');
var Department = require('./routes//Department');
var Department_Status = require('./routes//Department_Status');
var Branch = require('./routes//Branch');
var Enquiry_Source = require('./routes//Enquiry_Source');
var Fees = require('./routes//Fees');
var User_Role=require('./routes//User_Role');
var Company=require('./routes//Company');
var Sub_Section=require('./routes//Sub_Section');
var Check_List=require('./routes//Check_List');
var Agent_Details=require('./routes//Agent_Details');
var Task=require('./routes//Task');
var Application_Status=require('./routes//Application_Status');
var Application_Group=require('./routes//Application_Group');
var Accounts = require('./routes//Accounts');
var Class = require('./routes//Class');
var Chat_Window=require('./routes//Chat_Window');
var Process = require('./routes/Process.js');
var Status_Task = require('./routes/Status_Task.js');
var Qualification_Master=require('./routes//Qualification_Master.js');
const CallDetails = require("./routes/call_Details.js");
var campaign = require("./routes//campaign");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.use("/Login", Login);
app.use('/Public_Data',Public_Data);
app.use('/Account_Group',Account_Group);
app.use('/Client_Accounts',Client_Accounts);
app.use('/Agent',Agent);
app.use("/Call_Details", CallDetails);
app.use("/campaign", campaign);

var io = socketIO(server);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("new-message", async (message) => {
    var connection ;
    try {
      io.emit("new-message", message);
      const pool = db.promise();
      connection = await pool.getConnection();
      console.log("new-message socket values", message);
      const branchId = message.Branch;
      const data = message;
      if (branchId > 0) {
        const [deptStaffRows] = await connection.query(
          `SELECT * FROM user_details
        WHERE Branch_Id = ? AND DeleteStatus = FALSE AND Department_Id = 427
        ORDER BY User_Details_Id DESC LIMIT 1`,
          [branchId]
        );

        const deptStaffData =
          deptStaffRows.length > 0 ? deptStaffRows[0] : null;
        console.log("deptStaffData111", deptStaffData);

        if (deptStaffData) {
          const deptStaffId = deptStaffData.User_Details_Id;
          const From_User = data.To_User;
          const From_User_Name = data.To_User_Name || "System";
          const To_User = deptStaffData.User_Details_Id;
          const To_User_Name_ = deptStaffData.User_Details_Name;
          const Status_Id = data.Status_Id;
          const Student_Id = data.Student_Id;
          const Remark = data.Remark || "";
          const Student_Name = data.Student_Name;
          const Notification_Type_Name_ = "Student Assigned";
          const Entry_Type = 3;

          // 1️⃣ Get next Notification_Id
          const [notificationIdResult] = await connection.query(
            `SELECT COALESCE(MAX(Notification_Id), 0) + 1 AS NextId FROM Notification`
          );
          const Notification_Id_ = notificationIdResult[0].NextId;

          // 2️⃣ Insert new Notification
          await connection.query(
            `INSERT INTO Notification (
                Notification_Id,
                From_User,
                From_User_Name,
                To_User,
                To_User_Name,
                Status_Id,
                View_Status,
                Remark,
                Entry_Date,
                Student_Id,
                Student_Name,
                DeleteStatus,
                Description,
                Entry_Type
              )
              VALUES (?, ?, ?, ?, ?, ?, 1, ?, NOW(), ?, ?, FALSE, ?, ?)`,
            [
              Notification_Id_, // 1. Notification_Id
              From_User, // 2. From_User
              From_User_Name, // 3. From_User_Name
              To_User, // 4. To_User
              To_User_Name_, // 5. To_User_Name
              Status_Id, // 6. Status_Id
              Remark, // 7. Remark (after View_Status = 1)
              Student_Id, // 8. Student_Id
              Student_Name, // 9. Student_Name
              Notification_Type_Name_, // 10. Description
              Entry_Type, // 11. Entry_Type
            ]
          );

          // 3️⃣ Get updated Notification_Count
          const [countResult] = await connection.query(
            `SELECT COALESCE(MAX(Notification_Count), 0) + 1 AS Count FROM User_Details WHERE User_Details_Id = ?`,
            [To_User]
          );
          const Notification_Count_ = countResult[0].Count;

          // 4️⃣ Update User_Details with new count
          await connection.query(
            `UPDATE User_Details SET Notification_Count = ? WHERE User_Details_Id = ?`,
            [Notification_Count_, To_User]
          );

          // 5️⃣ Emit real-time notification
          const message = {
            Student_Name: Student_Name,
            To_User: To_User,
            Student_Id: Student_Id,
          };

          io.emit("new-message", message); // Emit to all — use .to(To_User) if socket rooms used
        }
      }

      try {
        const [bdmuser] = await connection.query(
          `SELECT * FROM user_details
              WHERE DeleteStatus = FALSE AND Department_Id = 434
              order by User_Details_Id desc limit 1`
        );
        console.log("bdmuser", bdmuser);
        const bdmData = bdmuser.length > 0 ? bdmuser[0] : null;
        const From_User = data.To_User;
        const To_User = bdmData.User_Details_Id;
        const Student_Id = data.Student_Id;
        const Student_Name = data.Student_Name;
        const From_User_Name = data.To_User_Name || "System";
        const To_User_Name_ = bdmData.User_Details_Name;
        const Status_Id = data.Status_Id;
        const Remark = data.Remark || "";
        const Notification_Type_Name_ = "Student Assigned";
        const Entry_Type = 3;

        // 1️⃣ Get next Notification_Id
        const [notificationIdResult] = await connection.query(
          `SELECT COALESCE(MAX(Notification_Id), 0) + 1 AS NextId FROM Notification`
        );
        const Notification_Id_ = notificationIdResult[0].NextId;
        console.log("Notification_Id_", Notification_Id_);

        // 2️⃣ Insert new Notification
        await connection.query(
          `INSERT INTO Notification (
                Notification_Id,
                From_User,
                From_User_Name,
                To_User,
                To_User_Name,
                Status_Id,
                View_Status,
                Remark,
                Entry_Date,
                Student_Id,
                Student_Name,
                DeleteStatus,
                Description,
                Entry_Type
              )
              VALUES (?, ?, ?, ?, ?, ?, 1, ?, NOW(), ?, ?, FALSE, ?, ?)`,
          [
            Notification_Id_, // 1. Notification_Id
            From_User, // 2. From_User
            From_User_Name, // 3. From_User_Name
            To_User, // 4. To_User
            To_User_Name_, // 5. To_User_Name
            Status_Id, // 6. Status_Id
            Remark, // 7. Remark (after View_Status = 1)
            Student_Id, // 8. Student_Id
            Student_Name, // 9. Student_Name
            Notification_Type_Name_, // 10. Description
            Entry_Type, // 11. Entry_Type
          ]
        );

        // 3️⃣ Get updated Notification_Count
        const [countResult] = await connection.query(
          `SELECT COALESCE(MAX(Notification_Count), 0) + 1 AS Count FROM User_Details WHERE User_Details_Id = ?`,
          [To_User]
        );
        const Notification_Count_ = countResult[0].Count;

        // 4️⃣ Update User_Details with new count
        await connection.query(
          `UPDATE User_Details SET Notification_Count = ? WHERE User_Details_Id = ?`,
          [Notification_Count_, To_User]
        );
        const bdmmessage = {
          Student_Name: Student_Name,
          To_User: To_User,
          Student_Id: Student_Id,
        };

        io.emit("new-message", bdmmessage);
      } catch (err) {
        console.log("Error in fetching BDM user:", err);

        console.error("Error in fetching BDM user:", err);
      }
    } catch (err) {
      console.error("Error in new-message socket:", err);
    } finally {
      if (connection) connection.release();
    }
  });
});
server.listen(port, () => {
  console.log(`started on port: ${port}`);
});

app.post("/Post_GoogleSheet_Campaign_Lead/", async function (req, res) {
   var connection;
  try {
    const lead = req.body.data;
    const pool = db.promise();
     connection = await pool.getConnection();
    console.log("Sheet Name:", req.body.name);

    const payload = {
      // Existing fields
      Student_Name_: lead["full name"]
        ? lead["full name"].toString().trim()
        : "",

      Phone_Number_: lead["phone\r\n"]
        ? lead["phone\r\n"].toString().trim()
        : lead["phone"]
        ? lead["phone"].toString().trim()
        : "",

      location_: lead["city"] ? lead["city"].toString().trim() : "",

      qualification_:lead["education_level"] ? lead["education_level"].toString().trim() : "",

        country_:lead["which_country_are_you_interested_in?"]
        ? lead["which_country_are_you_interested_in?"].toString().trim()
        : null,

        planstudyswednen_2026intake_ :lead["are_you_planning_to_study_in_sweden_for_the_2026_intake?"]
        ? lead["are_you_planning_to_study_in_sweden_for_the_2026_intake?"].toString().trim()
        : null,

            planstudy_budget_swednen_2026intake_ :lead["what_is_your_expected_budget_for_studying_in_sweden?"]
        ? lead["what_is_your_expected_budget_for_studying_in_sweden?"].toString().trim()
        : null,
        

      ad_id: lead["ad_id"] ? lead["ad_id"].toString().trim() : null,

      ad_name: lead["ad_name"] ? lead["ad_name"].toString().trim() : null,

      adset_id: lead["adset_id"] ? lead["adset_id"].toString().trim() : null,

      adset_name: lead["adset_name"]
        ? lead["adset_name"].toString().trim()
        : null,

      campaign_id: lead["campaign_id"]
        ? lead["campaign_id"].toString().trim()
        : null,

      campaign_name: lead["campaign_name"]
        ? lead["campaign_name"].toString().trim()
        : null,

      form_id: lead["form_id"] ? lead["form_id"].toString().trim() : null,

      form_name: lead["form_name"] ? lead["form_name"].toString().trim() : null,

      is_organic: lead["is_organic"]
        ? lead["is_organic"].toString().toLowerCase() === "true"
          ? 1
          : 0
        : 0,

      platform: lead["platform"] ? lead["platform"].toString().trim() : null,
    };
   console.log(payload);
    let lt = await new storedProcedure(
      "Post_GoogleSheet_Campaign_Lead",
      [
        payload.Student_Name_,
        payload.Phone_Number_,
        payload.location_,
        payload.qualification_,
        payload.country_,
        payload.planstudyswednen_2026intake_,
        payload.planstudy_budget_swednen_2026intake_,
        payload.ad_id,
        payload.ad_name,
        payload.adset_id,
        payload.adset_name,
        payload.campaign_id,
        payload.campaign_name,
        payload.form_id,
        payload.form_name,
        payload.is_organic,
        payload.platform
      ],
      connection
    ).result();

    console.log("lt: ", lt);
    res.json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false });
  } finally {
    if (connection) connection.release();
  }
});

app.use(jwt());

app.use('/User_Details',User_Details);
app.use('/Country',Country);
app.use('/Course',Course);
app.use('/Course_Intake',Course_Intake);
app.use('/Document',Document);
app.use('/Duration',Duration);
app.use('/Intake',Intake);
app.use('/Internship',Internship);
app.use('/Level_Detail',Level_Detail);
app.use('/Student',Student);
app.use('/Student_Document',Student_Document);
app.use('/Student_Message',Student_Message);
app.use('/Student_Status',Student_Status);
app.use('/Subject',Subject);
app.use('/Remarks',Remarks);
app.use('/Enquiry_Source',Enquiry_Source);
app.use('/University',University);
app.use('/Department',Department);
app.use('/Department_Status',Department_Status);
app.use('/Branch',Branch);
app.use('/Fees',Fees);
app.use('/User_Role',User_Role);
app.use('/Region',Region);
app.use('/Holiday',Holiday);
app.use('/Company',Company);
app.use('/Sub_Section',Sub_Section);
app.use('/Check_List',Check_List);
app.use('/Agent_Details',Agent_Details);
app.use('/Task',Task);
app.use('/Course_Search',Course_Search);
app.use('/Application_Status',Application_Status);
app.use('/Application_Group',Application_Group);
app.use('/Accounts',Accounts);
app.use('/Class',Class);
app.use('/Chat_Window',Chat_Window);
app.use('/Process', Process); // Routes of Process
app.use('/Status_Task', Status_Task); // Routes of status task
app.use('/Qualification_Master',Qualification_Master);
app.use('/Outgoing_Webhook',Outgoing_Webhook);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err); 
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
module.exports = app;
