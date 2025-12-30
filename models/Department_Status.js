var db = require("../dbconnection");
var fs = require("fs");
var Department_Status = {

  Save_Department_Status: function (Department_Status_, callback) {
    console.log('Department_Status_: ', Department_Status_);
    
    // Sanitize and validate input values
    const params = [
        Department_Status_.Department_Status_Id || 0,
        Department_Status_.Department_Status_Name || '',
        Department_Status_.Status_Order || 0,
        Department_Status_.Editable || 0,
        Department_Status_.Color || '',
        Department_Status_.Status_Type_Id || 0,
        Department_Status_.Transfer_Status || 0,
        Department_Status_.Notification_Status || 0,
        JSON.stringify(Department_Status_.Notification_Department_Id || null),
        Department_Status_.Notification_Department_Name || '',
        Department_Status_.Transfer_Department_Id || 0,
        Department_Status_.Transfer_Department_Name || '',
        Department_Status_.Status_Type_Name || '',
       
        Department_Status_.FollowUp || 0,
        Department_Status_.Registration || 0,
        Department_Status_.Display_In || 0,
        Department_Status_.Class_Id || 0,
        Department_Status_.Class_Name || '',
        Department_Status_.Class_Order || 0,
        Department_Status_.Registration_Mandatory || 0,
        Department_Status_.Dept_Status_Type_Id || 0,
        Department_Status_.Dept_Status_Type_Name || '',
        Department_Status_.Update_in_Profile || 0,
        Department_Status_.Color_Type_Name || '',
        Department_Status_.Intake_Date_Year || 0,
        Department_Status_.Public_Status || 0,
        Department_Status_.Pictorial_Representation_Order || 0,
        Department_Status_.Sub_Order || 0,
        Department_Status_.Insert_Not_Found || false,
        JSON.stringify(Department_Status_.Process_Filer_Data || []),
        Department_Status_.Process_Filer_Data_length || 0,
        JSON.stringify(Department_Status_.Process_Status_Data || []),
        Department_Status_.Process_Status_Data_length || 0,
        JSON.stringify(Department_Status_.Country_Data || []),
        Department_Status_.Country_Data_length || 0,
        JSON.stringify(Department_Status_.University_Data || []),
        Department_Status_.University_Data_length || 0,
        Department_Status_.Application_FollowUp || 0
    ];
    
    console.log('    Department_Status_.Dept_Status_Type_Id: ',     Department_Status_.Dept_Status_Type_Id);
    console.log('  Department_Status_.Status_Type_Name: ',   Department_Status_.Status_Type_Name);
    // Create the query with proper escaping
    const query = `
        CALL Save_Department_Status(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?  
        )
    `;

    // Execute query with error handling
    return db.query(query, params, (error, results) => {
        if (error) {
            console.error('Error executing Save_Department_Status:', error);
            return callback(error);
        }
        callback(null, results);
    });
},


  // Save_Department_Status: function (Department_Status_, callback) {
  //   console.log('Department_Status_: ', Department_Status_);
  //   return db.query(
  //     "CALL Save_Department_Status(" +
  //       "@Department_Status_Id_ :=?," +
  //       "@Department_Status_Name_ :=?," +
  //       "@Status_Order_ :=?," +
  //       "@Editable_ :=?," +
  //       "@Color_ :=?," +
  //       "@Status_Type_Id_ :=?," +
  //       "@Transfer_Status_ :=?," +
  //       "@Notification_Status_ :=?," +
  //       "@Notification_Department_Id_ :=?," +
  //       "@Notification_Department_Name_ :=?," +
  //       "@Transfer_Department_Id_ :=?," +
  //       "@Transfer_Department_Name_ :=?," +
  //       "@Status_Type_Name_ :=?," +
  //       "@FollowUp_ :=?," +
  //       "@Registration_ :=?," +
  //       "@Display_In_ :=?," +
  //       "@Class_Id_ :=?," +
  //       "@Class_Name_ :=?," +
  //       "@Class_Order_ :=?," +
  //       "@Registration_Mandatory_ :=?," +
  //       "@Dept_Status_Type_Id_ :=?," +
  //       "@Dept_Status_Type_Name_ :=?," +  
  //       "@Update_in_Profile_ :=?," +
  //       "@Color_Type_Name_ :=?," +
  //       "@Intake_Date_Year_ :=?," +
  //     "@Public_Status_ :=?," +   
  //     "@Pictorial_Representation_Order_ :=?," +  // New field
  //     "@Sub_Order_ :=?," + 
  //     "@Insert_Not_Found_ :=?," + 
  //     "@Process_Filer_Data_ :=?," + 
  //     "@Process_Filer_Data_length_ :=?," + 
  //     "@Process_Status_Data_ :=?," + 
  //     "@Process_Status_Data_length_ :=?," + 
  //     "@Country_Data_ :=?," + 
  //     "@Country_Data_length_ :=?," + 
  //     "@University_Data_ :=?," + 
  //     // "@University_Data_length_ :=?," + 
  //     "@University_Data_length_ :=?" +  
  //     ")"
  //     ,
  //     [
  //       Department_Status_.Department_Status_Id,
  //       Department_Status_.Department_Status_Name,
  //       Department_Status_.Status_Order,
  //       Department_Status_.Editable,
  //       Department_Status_.Color,
  //       Department_Status_.Status_Type_Id,
  //       Department_Status_.Transfer_Status,
  //       Department_Status_.Notification_Status,
  //       Department_Status_.Notification_Department_Id,
  //       Department_Status_.Notification_Department_Name,
  //       Department_Status_.Transfer_Department_Id,
  //       Department_Status_.Transfer_Department_Name,
  //       Department_Status_.Status_Type_Name,
  //       Department_Status_.FollowUp,
  //       Department_Status_.Registration,
  //       Department_Status_.Display_In,
  //       Department_Status_.Class_Id,
  //       Department_Status_.Class_Name,
  //       Department_Status_.Class_Order,
  //       Department_Status_.Registration_Mandatory,
  //       Department_Status_.Dept_Status_Type_Id,  // Updated name
  //       Department_Status_.Dept_Status_Type_Name,  // Updated name
  //       Department_Status_.Update_in_Profile,
  //       Department_Status_.Color_Type_Name,
  //       Department_Status_.Intake_Date_Year,
  //       Department_Status_.Public_Status, 
  //       Department_Status_.Pictorial_Representation_Order, // New field value
  //       Department_Status_.Sub_Order ,
  //       Department_Status_.Insert_Not_Found ,
  //       JSON.stringify(Department_Status_.Process_Filer_Data),
  //       Department_Status_.Process_Filer_Data_length ,
  //       JSON.stringify(Department_Status_.Process_Status_Data),
  //       Department_Status_.Process_Status_Data_length ,
  //       JSON.stringify(Department_Status_.Country_Data),
  //       Department_Status_.Country_Data_length ,
  //       JSON.stringify(Department_Status_.University_Data),
  //       Department_Status_.University_Data_length 
  //       // ,Department_Status_.Process_Department_Status_Id 
        

  //     ],
  //     callback
  //   );
  // },



  Save_process_Status_details: function (Process_Status_Details_, callback) {
    console.log(Process_Status_Details_);

    var Sub_Status_Value_ = 0,Process_Department_Data_Value_ =0,
    Task_Details_Sub_Data_value_ = 0,
    Process_Notification_Data_value_ = 0,
    Process_Check_List_Data_value_ = 0,
    Process_Fields_Data_value_ =0,
    MTask_Details_Sub_Data_value_ =0,newCheckedProcess_sub_status_Data_Value_ =0,
    newCheckedItems_Document_Data_Value_ =0,
    newCheckedItems_Department_Data_Value_ =0,
    newCheckedItems_Fields_Data_Value_ =0,
    // Country_Data_value_ = 0,
    // University_Filer_Data_value_ = 0,
    Process_Filer_Data_value_ = 0;
    let processIdsJson = '[]';

    let Process_sub_status_Sub_Data_ = Process_Status_Details_.Process_sub_status_Sub_Data ;
    if (Process_sub_status_Sub_Data_ != undefined && Process_sub_status_Sub_Data_ != "" && Process_sub_status_Sub_Data_ != null ) Sub_Status_Value_ = 1;
    console.log(Process_sub_status_Sub_Data_);
    
   let Process_Department_Data_ = Process_Status_Details_.Process_Department_Data ;
    if (Process_Department_Data_ != undefined && Process_Department_Data_ != "" && Process_Department_Data_ != null ) Process_Department_Data_Value_ = 1;
    console.log(Process_Department_Data_);

    let Task_Details_Sub_Data_ = Process_Status_Details_.Task_Details_Sub_Data ;
    if (Task_Details_Sub_Data_ != undefined && Task_Details_Sub_Data_ != "" && Task_Details_Sub_Data_ != null ) Task_Details_Sub_Data_value_ = 1;
    console.log(Task_Details_Sub_Data_);


    let Process_Notification_Data_ = Process_Status_Details_.Process_Notification_Data ;
    if (Process_Notification_Data_ != undefined && Process_Notification_Data_ != "" && Process_Notification_Data_ != null ) Process_Notification_Data_value_ = 1;
    console.log(Process_Notification_Data_);


    let Process_Check_List_Data_ = Process_Status_Details_.Process_Check_List_Data ;
    if (Process_Check_List_Data_ != undefined && Process_Check_List_Data_ != "" && Process_Check_List_Data_ != null ) Process_Check_List_Data_value_ = 1;
    console.log(Process_Check_List_Data_);

    let Process_Fields_Data_ = Process_Status_Details_.Process_Fields_Data ;
    if (Process_Fields_Data_ != undefined && Process_Fields_Data_ != "" && Process_Fields_Data_ != null ) Process_Fields_Data_value_ = 1;

     

    let MTask_Details_Sub_Data_ = Process_Status_Details_.MTask_Details_Sub_Data ;
    if (MTask_Details_Sub_Data_ != undefined && MTask_Details_Sub_Data_ != "" && MTask_Details_Sub_Data_ != null ) 
    MTask_Details_Sub_Data_value_ = 1;
    console.log(MTask_Details_Sub_Data_);
    console.log(MTask_Details_Sub_Data_value_);


    // let Country_Data_ = Process_Status_Details_.Country_Data;
    // if (Country_Data_ != undefined && Country_Data_ != "" && Country_Data_ != null) Country_Data_value_ = 1;
    // console.log('Country_Data_value_: ', Country_Data_value_);
    // console.log('Country_Data_: ',Country_Data_);

    // // Handle University_Filer_Data
    // let University_Filer_Data_ = Process_Status_Details_.University_Filer_Data;
    // if (University_Filer_Data_ != undefined && University_Filer_Data_ != "" && University_Filer_Data_ != null) University_Filer_Data_value_ = 1;
    // console.log('University_Filer_Data_value_: ', University_Filer_Data_value_);
    // console.log('University_Filer_Data_: ',University_Filer_Data_);

    // Handle Process_Filer_Data

    let Process_Filer_Data_ = Process_Status_Details_.Process_Filer_Data;
    if (Process_Filer_Data_ && Array.isArray(Process_Filer_Data_) && Process_Filer_Data_.length > 0) 
      Process_Filer_Data_value_ = 1;


    let newCheckedProcess_sub_status_Data_ = Process_Status_Details_.newCheckedProcess_sub_status_Data ;
    if (newCheckedProcess_sub_status_Data_ != undefined && newCheckedProcess_sub_status_Data_ != "" && newCheckedProcess_sub_status_Data_ != null ) newCheckedProcess_sub_status_Data_Value_ = 1;
    console.log('newCheckedProcess_sub_status_Data_: ',newCheckedProcess_sub_status_Data_);


    let newCheckedItems_Department_Data_ = Process_Status_Details_.newCheckedItems_Document_Data ;
    if (newCheckedItems_Department_Data_ != undefined && newCheckedItems_Department_Data_ != "" && newCheckedItems_Department_Data_ != null ) newCheckedItems_Department_Data_Value_ = 1;
    console.log('newCheckedItems_Department_Data_: ',newCheckedItems_Department_Data_);


    let newCheckedItems_Document_Data_ = Process_Status_Details_.newCheckedItems_Notification_Data ;
    if (newCheckedItems_Document_Data_ != undefined && newCheckedItems_Document_Data_ != "" && newCheckedItems_Document_Data_ != null ) newCheckedItems_Document_Data_Value_ = 1;
    console.log('newCheckedItems_Document_Data_: ',newCheckedItems_Document_Data_);


    let newCheckedItems_Fields_Data_ = Process_Status_Details_.newCheckedItems_Fields_Data ;
    if (newCheckedItems_Fields_Data_ != undefined && newCheckedItems_Fields_Data_ != "" && newCheckedItems_Fields_Data_ != null ) newCheckedItems_Fields_Data_Value_ = 1;
    console.log('newCheckedItems_Fields_Data_: ',newCheckedItems_Fields_Data_);


      
  //     // Extract and combine all process_ids into a single array
  //     const allProcessIds = Process_Filer_Data_.reduce((acc, item) => {
  //         if (item.process_ids && Array.isArray(item.process_ids)) {
  //             return [...acc, ...item.process_ids];
  //         }
  //         return acc;
  //     }, []);

  //     // Remove duplicates and sort the array
  //     const uniqueProcessIds = [...new Set(allProcessIds)].sort((a, b) => a - b);
      
  //     processIdsJson = JSON.stringify(uniqueProcessIds);
  // }

  console.log('Process_Filer_Data_value_: ', Process_Filer_Data_value_);
  // console.log('Extracted process_ids JSON: ', processIdsJson);
  console.log('Process_Filer_Data_: ', Process_Filer_Data_);
  
    clearTimeout
    // console.log('Process_Filer_Data_: ', Process_Filer_Data_);
    console.log(' Process_Status_Details_.Country_Data: ',  Process_Status_Details_.Country_Data);
    console.log('  Process_Status_Details_.Department_Status_Id,: ',   Process_Status_Details_.Department_Status_Id);
    console.log('Process_Status_Details_.Process_Filer_Data: ', Process_Status_Details_.Process_Filer_Data);

    console.log('Process_Status_Details_.Insert_Not_Found: ', Process_Status_Details_.Insert_Not_Found);

    return db.query(
      "CALL Save_process_Status_details(" +
      "@Process_Status_Details_id_ :=?," +

        "@Department_Status_Id_ :=?," +
        "@Department_Status_Name_ :=?," +
        "@Status_Order_ :=?," +
        "@Editable_ :=?," +
        "@Color_ :=?," +
        "@Status_Type_Id_ :=?," +
        "@Transfer_Status_ :=?," +
        "@Notification_Status_ :=?," +
        "@Notification_Department_Id_ :=?," +
        "@Notification_Department_Name_ :=?," +
        "@Transfer_Department_Id_ :=?," +
        "@Transfer_Department_Name_ :=?," +
        "@Status_Type_Name_ :=?," +
        "@FollowUp_ :=?," +
        "@Registration_ :=?," +
        "@Display_In_ :=?," +
        "@Class_Id_ :=?," +
        "@Class_Name_ :=?," +
        "@Class_Order_ :=?," +
        "@Registration_Mandatory_ :=?," +
        "@Activation_Status_ :=?," +
        "@Fees_Mandatory_ :=?," +
        "@Update_in_Profile_ :=?," +
        "@process_id_ :=?," +

        "@Sub_Status_ :=?," +
        "@Notification_ :=?," +
        "@Task_new_ :=?," +
        "@Document_view_ :=?," +
        "@CheckList_ :=?," +
        "@Data_Fields_ :=?," +
        "@Mandatory_Task_ :=?," +
        "@Insert_Not_Found_ := ?," +          


        
        "@Process_sub_status_Sub_Data_ :=?," +
        "@Sub_Status_Value_ :=?," +

        "@Process_Department_Data_ :=?," +
        "@Process_Department_Data_Value_ :=?," +

        "@Task_Details_Sub_Data_ :=?," +
        "@Task_Details_Sub_Data_value_ :=?," +

        "@Process_Notification_Data_ :=?," +
        "@Process_Notification_Data_value_ :=?," +

        "@Process_Check_List_Data_ :=?," +
        "@Process_Check_List_Data_value_ :=?," +

        "@Process_Fields_Data_ :=?," +
        "@Process_Fields_Data_value_ :=?," +


        "@MTask_Details_Sub_Data_ :=?," +
        "@MTask_Details_Sub_Data_value_ :=?," +
    
        // "@Country_Data_ := ?," +
        // "@Country_Data_value_ := ?," +
        
        // "@University_Filer_Data_ := ?," +
        // "@University_Filer_Data_value_ := ?," +

        "@Process_Filer_Data_ := ?," +
        "@Process_Filer_Data_value_ := ?," +
        "@Fees_Id_ := ?," +
        "@Fees_Name_ := ?," +

        "@newCheckedProcess_sub_status_Data_ := ?," +
        "@newCheckedProcess_sub_status_Data_Value_ := ?," +


        "@newCheckedItems_Document_Data_ := ?," +
        "@newCheckedItems_Document_Data_Value_ := ?," +
        "@newCheckedItems_Department_Data_ := ?," +
        "@newCheckedItems_Department_Data_Value_ := ?," +

        "@newCheckedItems_Fields_Data_ := ?," +
        "@newCheckedItems_Fields_Data_Value_ := ?" +
        
        ")",

      [
        Process_Status_Details_.Process_Status_Details_id,
   

        Process_Status_Details_.Department_Status_Id,

        Process_Status_Details_.Department_Status_Name,
        Process_Status_Details_.Status_Order,
        Process_Status_Details_.Editable,
        Process_Status_Details_.Color,
        Process_Status_Details_.Status_Type_Id,
        Process_Status_Details_.Transfer_Status,
        Process_Status_Details_.Notification_Status,
        Process_Status_Details_.Notification_Department_Id,
        Process_Status_Details_.Notification_Department_Name,
        Process_Status_Details_.Transfer_Department_Id,
        Process_Status_Details_.Transfer_Department_Name,
        Process_Status_Details_.Status_Type_Name,
        Process_Status_Details_.FollowUp,
        Process_Status_Details_.Registration,
        Process_Status_Details_.Display_In,
        Process_Status_Details_.Class_Id,
        Process_Status_Details_.Class_Name,
        Process_Status_Details_.Class_Order,
        Process_Status_Details_.Registration_Mandatory,
        Process_Status_Details_.Activation_Status,
        Process_Status_Details_.Fees_Mandatory,
        Process_Status_Details_.Update_in_Profile,
        Process_Status_Details_.process_id,
        Process_Status_Details_.Sub_Status,
        Process_Status_Details_.Notification,
        Process_Status_Details_.Task_new,
        Process_Status_Details_.Document_view,
        Process_Status_Details_.CheckList,
        Process_Status_Details_.Data_Fields,
        Process_Status_Details_.Mandatory_Task,
        Process_Status_Details_.Insert_Not_Found, 


        JSON.stringify(Process_Status_Details_.Process_sub_status_Sub_Data),
        Sub_Status_Value_,
        JSON.stringify(Process_Status_Details_.Process_Department_Data),
        Process_Department_Data_Value_,
        JSON.stringify(Process_Status_Details_.Task_Details_Sub_Data),
        Task_Details_Sub_Data_value_,
        JSON.stringify(Process_Status_Details_.Process_Notification_Data),
        Process_Notification_Data_value_,
        JSON.stringify(Process_Status_Details_.Process_Check_List_Data),
        Process_Check_List_Data_value_,
        JSON.stringify(Process_Status_Details_.Process_Fields_Data),
        Process_Fields_Data_value_,
        JSON.stringify(Process_Status_Details_.MTask_Details_Sub_Data),
        MTask_Details_Sub_Data_value_,

    //     JSON.stringify(Process_Status_Details_.Country_Data),       // Country Data as JSON
    //     Country_Data_value_,
       
    // JSON.stringify(Process_Status_Details_.University_Filer_Data), // University Data as JSON
    // University_Filer_Data_value_,      // Country Data as JSON
    JSON.stringify(Process_Status_Details_.Process_Filer_Data), // Process Data as JSON
  

    // processIdsJson,   // Pass only the extracted process_ids as a JSON string
    Process_Filer_Data_value_,
    Process_Status_Details_.Fees_Id,
        Process_Status_Details_.Fees_Name,
      
        JSON.stringify(newCheckedProcess_sub_status_Data_),
        newCheckedProcess_sub_status_Data_Value_,

        JSON.stringify(newCheckedItems_Document_Data_),
        newCheckedItems_Document_Data_Value_,
        JSON.stringify(newCheckedItems_Department_Data_),
        newCheckedItems_Department_Data_Value_,

        JSON.stringify(newCheckedItems_Fields_Data_),
        newCheckedItems_Fields_Data_Value_,
      ],


      callback
    );
  },
  Delete_Department_Status: function (Department_Status_Id_, callback) {
    return db.query(
      "CALL Delete_Department_Status(@Department_Status_Id_ :=?)",
      [Department_Status_Id_],
      callback
    );
  },
  Get_Department_Status: function (Department_Status_Id_, callback) {
    return db.query(
      "CALL Get_Department_Status(@Department_Status_Id_ :=?)",
      [Department_Status_Id_],
      callback
    );
  },
  Search_Department_Status: function (
    Department_Status_Name_,
    dept_id_,
    transfer_dept_id_,Order_,
    callback
  ) {
    if (
      Department_Status_Name_ === "undefined" ||
      Department_Status_Name_ === "" ||
      Department_Status_Name_ === undefined
    )
      Department_Status_Name_ = "";
    return db.query(
      "CALL Search_Department_Status(@Department_Status_Name_ :=?," +
        "@dept_id_ :=?," +
        "@transfer_dept_id_ :=?," +
        "@Order_ :=?)",
      [Department_Status_Name_, dept_id_, transfer_dept_id_,Order_],
      callback
    );
  },
  Get_Sub_Status: function (Department_Status_Id_, callback) {
    return db.query(
      "CALL Get_Sub_Status(@Department_Status_Id_ :=?)",
      [Department_Status_Id_],
      callback
    );
  },

  Save_Sub_Status: function (Sub_Status_, callback) {
    console.log(Sub_Status_);
    return db.query(
      "CALL Save_Sub_Status(" +
        "@Sub_Status_Id_ :=?," +
        "@Sub_Status_Name_ :=?," +
        "@Status_Id_ :=?," +
        "@FollowUp_ :=?," +
        "@Duration_ :=?" +
        ")",
      [
        Sub_Status_.Sub_Status_Id,
        Sub_Status_.Sub_Status_Name,
        Sub_Status_.Status_Id,
        Sub_Status_.FollowUp,
        Sub_Status_.Duration,
      ],
      callback
    );
  },

  Delete_Sub_Status: function (Sub_Status_Id_, callback) {
    console.log(Sub_Status_Id_);
    return db.query(
      "CALL Delete_Sub_Status(@Sub_Status_Id_ :=?)",
      [Sub_Status_Id_],
      callback
    );
  },



  Search_Document_new: function (
    Document_Name_,
    callback
  ) {
    if (
      Document_Name_ === "undefined" ||
      Document_Name_ === "" ||
      Document_Name_ === undefined
    )
      Document_Name_ = "";
    return db.query(
      "CALL Search_Document_new(@Document_Name_ :=?)",
      [Document_Name_],
      callback
    );
  },


  Search_Check_list_new: function (
    Check_List_Name_,
    callback
  ) {
    if (
      Check_List_Name_ === "undefined" ||
      Check_List_Name_ === "" ||
      Check_List_Name_ === undefined
    )
      Check_List_Name_ = "";
    return db.query(
      "CALL Search_Check_list_new(@Check_List_Name_ :=?)",
      [Check_List_Name_],
      callback
    );
  },




  Search_Notification_new: function (
    Department_Name_,
    callback
  ) {
    if (
      Department_Name_ === "undefined" ||
      Department_Name_ === "" ||
      Department_Name_ === undefined
    )
      Department_Name_ = "";
    return db.query(
      "CALL Search_Notification_new(@Department_Name_ :=?)",
      [Department_Name_],
      callback
    );
  },


  Search_Department_Status_new: function (
    Department_Status_Name_,
    callback
  ) {
    if (
      Department_Status_Name_ === "undefined" ||
      Department_Status_Name_ === "" ||
      Department_Status_Name_ === undefined
    )
      Department_Status_Name_ = "";
    return db.query(
      "CALL Search_Department_Status_new(@Department_Status_Name_ :=?)",
      [Department_Status_Name_],
      callback
    );
  },


  Search_Process_department_Details: function (Department_Status_Id_,Process_id_,callback) {
    return db.query(
      "CALL Search_Process_department_Details(@Department_Status_Id_ :=?," +
      "@Process_id_ :=?)",
      [Department_Status_Id_,Process_id_],
      callback
    );
  },


  Search_Process_department_Details_contain: function (Department_Status_Id_,Process_id_,callback) {
    return db.query(
      "CALL Search_Process_department_Details_contain(@Department_Status_Id_ :=?," +
      "@Process_id_ :=?)",
      [Department_Status_Id_,Process_id_],
      callback
    );
  },


  
  Search_Process_NextStatus_Details_contain: function (Department_Status_Id_,Process_id_,callback) {
    return db.query(
      "CALL Search_Process_NextStatus_Details_contain(@Department_Status_Id_ :=?," +
      "@Process_id_ :=?)",
      [Department_Status_Id_,Process_id_],
      callback
    );
  },



};
module.exports = Department_Status;
