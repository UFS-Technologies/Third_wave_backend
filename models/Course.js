var db = require("../dbconnection");

const pool = db.promise();

var fs = require("fs");
const { Console } = require("console");
var Course = {
  
  Save_Course: function (Course_, callback) {
            console.log('Course_.English_Test_Data: ', Course_.English_Test_Data);
    return db.query(
      "CALL Save_Course(" +
        "@Course_Id_ :=?," +
        "@Course_Name_ :=?," +
        "@Subject_Id_ :=?," +
        "@Sub_Section_Id_ :=?," +
        "@Duration_Id_ :=?," +
        "@Level_Id_ :=?," +
        "@Ielts_Minimum_Score_ :=?," +
        "@Internship_Id_ :=?," +
        "@Notes_ :=?," +
        "@Details_ :=?," +
        "@Application_Fees_ :=?," +
        "@Tution_Fees_ :=?," +
        "@Entry_Requirement_ :=?," +
        "@Living_Expense_ :=?," +
        "@Work_Experience_ :=?," +
        "@Registration_Fees_ :=?," +
        "@Date_Charges_ :=?," +
        "@Bank_Statements_ :=?," +
        "@Insurance_ :=?," +
        "@VFS_Charges_ :=?," +
        "@Apostille_ :=?," +
        "@Other_Charges_ :=?," +
        "@IELTS_Name_ :=?," +
        "@Intake_Name_ :=?," +
        "@University_Id_ :=?," +
        "@Country_Id_ :=?," +
        "@Tag_ :=?," +
        // "@Course_Link_ :=?,"+
        "@processId :=?," +
        "@Intake_Data_ :=?," +
        "@Qualification_Data :=?," +
         "@English_Test_Data_ :=?," + 
        "@Gold_ :=?," +
        "@Silver_ :=?," +
        "@Platinum_ :=?" +
        ")",
      [
        Course_.Course_Id,
        Course_.Course_Name,
        Course_.Subject_Id,
        Course_.Sub_Section_Id,
        Course_.Duration_Id,
        Course_.Level_Id,
        Course_.Ielts_Minimum_Score,
        Course_.Internship_Id,
        Course_.Notes,
        Course_.Details,
        Course_.Application_Fees,
        Course_.Tution_Fees,
        Course_.Entry_Requirement,
        Course_.Living_Expense,
        Course_.Work_Experience,
        Course_.Registration_Fees,
        Course_.Date_Charges,
        Course_.Bank_Statements,
        Course_.Insurance,
        Course_.VFS_Charges,
        Course_.Apostille,
        Course_.Other_Charges,
        Course_.IELTS_Name,
        Course_.Intake_Name,
        Course_.University_Id,
        Course_.Country_Id,
        Course_.Tag,
        // Course_.Course_Link,
        Course_.ProcessId,
        JSON.stringify(Course_.Intake_Data),
        JSON.stringify(Course_.qualification),
      JSON.stringify(Course_.English_Test_Data || []),

        Course_.Gold,
        Course_.Silver,
        Course_.Platinum,
      ],
      callback
    );
  },

  // Function to save course qualification
  createCourseQualification: function (data, courseId) {
    // Create a promise based connection and get it from connection pool
    const pool = db.promise();
    return new Promise(async (rs, rej) => {
      try {
        const { Qualification_Master_Id, mark } = data;

        // Insert new data to db
        const [result] = await pool.query(
          "INSERT INTO course_qualification (course_id, mark, qualification_id) VALUES (?, ?, ?)",
          [courseId, mark, Qualification_Master_Id]
        );

        // Resolve with new data
        rs(result);
      } catch (err) {
        // Recject with occured error
        console.log(err);
        rej(err);
      }
    });
  },

  // Functon to get course qualification
  Get_Course_Qualification: (course_id) => {
    // Create a promise based connection and get it from connection pool
    const pool = db.promise();
    return pool.query(
      `
      SELECT * FROM course_qualification WHERE course_id = ?
      `,
      [course_id]
    );
  },

  // Function to update course qualification
  updateCourseQualification: (data) => {
    // Create a promise based connection and get it from connection pool
    const pool = db.promise();
    let course_id = data.course_id;
    let mark = data.mark;
    let Qualification_Master_Id = data.Qualification_Master_Id;
    let id = data.id

    return pool.query(
      `
      UPDATE course_qualification
      SET
        course_id = ?,
        mark = ?,
        qualification_id = ?
      WHERE id = ?
      `,
      [
        course_id,
        parseInt(mark),
        Qualification_Master_Id,
        id
      ]
    )
  },
Load_Qualifications: function (callback) {
    return db.query("CALL Load_Qualifications()", [], callback);
},
  Load_Subjects_By_Stream: function (streamId, callback) {
    return db.query("CALL Load_Subjects_By_Stream(@streamId :=?)", [streamId], callback);
  },

    Delete_Course_Subjects: function (courseId, callback) {
    return db.query("CALL Delete_Course_Subjects(@courseId :=?)", [courseId], callback);
  },

 Load_Course_Subjects_By_Course: function (courseId, callback) {
    return db.query("CALL Load_Course_Subjects_By_Course(@courseId :=?)", [courseId], callback);
  },

Load_Universities: function (callback) {
    return db.query("CALL Load_Universities()", [], callback);
},
Save_Course_Subjects: function (data, callback) {
  console.log('data: ', data);
  return db.query(
    "CALL Save_Course_Subjects(?, ?, ?, ?, ?, ?)",
    [
      data.Course_Id,
      data.Qualification_Id,
      data.State_Id,
      data.University_Id,
      data.Stream_Id,
      JSON.stringify(data.Subjects)
    ],
    callback
  );
},

Load_Streams: function (callback) {
    return db.query("CALL Load_Streams()", [], callback);
},
Load_States: function (callback) {
    return db.query("CALL Load_States()", [], callback);
},

  // Function to check a courses process id
  Search_Application_StatusforChangeStatus_Typeahead: async (Course_Id,Application_status_Id,Student_Id) => {
    
    return new Promise(async (res, rej) => {
      try {
        console.log('Application_status_Id: ', Application_status_Id);
        console.log('Course_Id: ', Course_Id);
        console.log('Student_Id: ', Student_Id);
        const value = await pool.query(
          "CALL Search_Application_StatusforChangeStatus_Typeahead(" +
            "@courseId_ :=?," +
            "@Application_status_Id_ :=?," +
            "@Student_Id_ :=?" +

            ")",
          [
            Course_Id,Application_status_Id,Student_Id
          ]
        );
        res(value[0][0])
      } catch (err) {
        rej(err);
      }
    })
  },
Search_All_Application_Statuses: async (Course_Id, Student_Id) => {
    return new Promise(async (res, rej) => {
        try {
            console.log('Loading all statuses for Course_Id: ', Course_Id);
            console.log('Student_Id: ', Student_Id);
            const value = await pool.query(
                "CALL Search_All_Application_Statuses(" +
                "@courseId_ :=?," +
                "@Student_Id_ :=?" +
                ")",
                [Course_Id, Student_Id]
            );
            res(value[0][0]);
        } catch (err) {
            rej(err);
        }
    });
},

  Delete_Course: function (Course_Id_, callback) {
    return db.query(
      "CALL Delete_Course(@Course_Id_ :=?)",
      [Course_Id_],
      callback
    );
  },

  Get_Course: function (Course_Id_, callback) {
    return db.query("CALL Get_Course(@Course_Id_ :=?)", [Course_Id_], callback);
  },

  Get_Course_Import: function (Import_Master_Id_, callback) {
    return db.query(
      "CALL Get_Course_Import(@Import_Master_Id_ :=?)",
      [Import_Master_Id_],
      callback
    );
  },

  Save_Course_Import: function (Course_Details, callback) {
    console.log("Course_Details",Course_Details);
    
    return db.query(
      "CALL Save_Course_Import(" + "@Course_Details :=?," + "@Process_Id :=?" + ")",
      [JSON.stringify(Course_Details.Course_Import_Details),Course_Details.Process_Id],
      callback
    );
  },
  Search_Course_Import: function (
    From_Date_,
    To_Date_,
    Is_Date_Check_,
    callback
  ) {
    return db.query(
      "CALL Search_Course_Import(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?)",
      [From_Date_, To_Date_, Is_Date_Check_],
      callback
    );
  },

  //  Search_Course:function(Course_Name_,callback)
  //  {
  //  if (Course_Name_===undefined || Course_Name_==="undefined" )
  // Course_Name_='';
  // return db.query("CALL Search_Course(@Course_Name_ :=?)",[Course_Name_],callback);
  //  },

  Search_Course: function (
    Course_Name_,
    Level_Id_,
    Country_Id_,
    Internship_Id_,
    Duration_Id_,
    University_Id_,
    Subject_Id_,
    Intake_Id_,
    Sub_Section_Id_,
    Pointer_Start_,
    Pointer_Stop_,
    Page_Length_,
    callback
  ) {
    
    if (Course_Name_ === undefined || Course_Name_ === "undefined")
      Course_Name_ = "";

    if (Level_Id_ === undefined || Level_Id_ === "undefined") Level_Id_ = 0;

    if (Country_Id_ === undefined || Country_Id_ === "undefined")
      Country_Id_ = 0;

    if (Internship_Id_ === undefined || Internship_Id_ === "undefined")
      Internship_Id_ = 0;

    if (Duration_Id_ === undefined || Duration_Id_ === "undefined")
      Duration_Id_ = 0;

    if (University_Id_ === undefined || University_Id_ === "undefined")
      University_Id_ = 0;

    if (Subject_Id_ === undefined || Subject_Id_ === "undefined")
      Subject_Id_ = 0;
    if (Intake_Id_ === undefined || Intake_Id_ === "undefined")
      Intake_Id_ = 0;

    if (Sub_Section_Id_ === undefined || Sub_Section_Id_ === "undefined")
      Sub_Section_Id_ = 0;

    if (Pointer_Start_ === undefined || Pointer_Start_ === "undefined")
      Pointer_Start_ = 0;

    if (Pointer_Stop_ === undefined || Pointer_Stop_ === "undefined")
      Pointer_Stop_ = 0;

    return db.query(
      "CALL Search_Course(@Course_Name_ :=?,@Level_Id_ :=?,@Country_Id_ :=?,@Internship_Id_ :=?,@Duration_Id_ :=?,@University_Id_ :=?,@Subject_Id_ :=?,@Intake_Id_ :=?,@Sub_Section_Id_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)",
      [
        Course_Name_,
        Level_Id_,
        Country_Id_,
        Internship_Id_,
        Duration_Id_,
        University_Id_,
        Subject_Id_,
        Intake_Id_,
        Sub_Section_Id_,
        Pointer_Start_,
        Pointer_Stop_,
        Page_Length_,
      ],
      callback
    );
  },

  Search_Course_Typeahead: function (
    Country_Id_,
    Subject_Id_,
    Sub_Section_Id_,
    Level_Id_,
    Course_Name_,
    Duration_Id_,
    Ielts_Minimum_Score_,
    Intake_Id_,
    Internship_Id_,
    callback
  ) {
    if (
      Delivery_Point_Name_ === undefined ||
      Delivery_Point_Name_ === "undefined"
    )
      Delivery_Point_Name_ = "";

    return db.query(
      "CALL Search_Course_Typeahead(@Country_Id_ :=?,@Subject_Id_ :=?,@Sub_Section_Id_ :=?,@Level_Id_ :=?,@Course_Name_ :=?,@Duration_Id_ :=?,@Ielts_Minimum_Score_ :=?,@Intake_Id_ :=?,@Internship_Id_ :=?)",
      [
        Country_Id_,
        Subject_Id_,
        Sub_Section_Id_,
        Level_Id_,
        Course_Name_,
        Duration_Id_,
        Ielts_Minimum_Score_,
        Intake_Id_,
        Internship_Id_,
      ],
      callback
    );
  },

  //  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
  //  {
  //    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
  //  }

  Search_Courses_Typeahead: function (Course_Name, callback) {
    if (Course_Name === undefined || Course_Name === "undefined")
      Course_Name = "";
    return db.query(
      "CALL Search_Courses_Typeahead(@Course_Name :=?)",
      [Course_Name],
      callback
    );
  },


  Search_Courses_Typeahead_tempp: function (Course_Name,University_Id, callback) {
    if (Course_Name === undefined || Course_Name === "undefined")
      Course_Name = "";
    return db.query(
      "CALL Search_Courses_Typeahead_tempp(@Course_Name :=?,@University_Id :=?)",
      [Course_Name,University_Id],
      callback
    );
  },

  Search_Courses_Typeahead_Check: function (Course_Name,University_Ids, callback) {
    if (Course_Name === undefined || Course_Name === "undefined")
      Course_Name = "";

    const universityIdsParam = Array.isArray(University_Ids) ? University_Ids.join(',') : '';
    return db.query(
      "CALL Search_Courses_Typeahead_Check(@Course_Name :=?,@universityIdsParam :=?)",
      [Course_Name,universityIdsParam],
      callback
    );
  },
  Search_Courses_Fees_Typeahead: function (Course_Name, Student_Id, callback) {
    if (Course_Name === undefined || Course_Name === "undefined")
      Course_Name = "";
    return db.query(
      "CALL Search_Courses_Fees_Typeahead(@Course_Name :=?,@Student_Id :=?)",
      [Course_Name, Student_Id],
      callback
    );
  },
};
module.exports = Course;
