let db = require("../dbconnection");

// Create a promise based connection and get it from connection pool
const pool = db.promise();

// Object of all process related models
let Process = {

  // Function to create new process
  Save_Process: async function (obj) {
    return new Promise(async (rs, rej) => {
      try {
        const { Process_Name, Order_IN, Color, departmentStatus } = obj;

        const result = await pool.query("CALL Save_Process(" + 
            "@ProcessId :=?," +
            "@Process_Name :=?," +
            "@Order_IN :=?," +
            "@Color :=?," +
            "@departmentStatus :=?" +
          ")",
          [
            0,
            Process_Name,
            Order_IN,
            Color,
            JSON.stringify(departmentStatus)
          ]
        )

        // Resolve with new data
        rs(result[0]);
      } catch (err) {
        // Recject with occured error
        rej(err);
      }
    });
  },

  // Function to retrive all processes
  get_All: function () {
    return pool.query(
      `
      SELECT * FROM process where DeleteStatus=0
      `
    )
  },

//   get_All:function()
//   { 

//  return db.query("CALL Get_Process()");
//   }
//   ,

  // Function to get process by id
  Get_Process: function (Process_Id) {
    // Retrive process by provided id
    return pool.query(
      `
      SELECT * FROM process WHERE Process_Id = ?
      `,
      [Process_Id],
    );
  },




  // Function to update process
  Update_Process: async function (Process_Id, newData) {
    return new Promise(async (rs, rej) => {
      try {
        const result = await pool.query("CALL Save_Process(" + 
            "@ProcessId :=?," +
            "@Process_Name :=?," +
            "@Order_IN :=?," +
            "@Color :=?," +
            "@departmentStatus :=?" +
          ")",
          [
            newData.Process_Id,
            newData.Process_Name,
            newData.Order_IN,
            newData.Color,
            JSON.stringify(newData.departmentStatus)
          ]
        )

        // Resolve with new data
        rs(result[0]);
      } catch (err) {
        // Recject with occured error
        rej(err);
      }
    });
  },

  // Function to delete process
  // Delete_Process: function (Process_Id) {
  //   return pool.query(
  //     `
  //     DELETE from process
  //     WHERE
  //       Process_Id = ?
  //     `,
  //     [
  //       Process_Id
  //     ]
  //   )
  // },

  Delete_Process:function(Process_Id,callback)
    { 
      console.log(Process_Id,'delete_id')
   return db.query("CALL Delete_Process(@Process_Id :=?)",[Process_Id],callback);
    }
    ,

  // Function to search process
  Search_Process: function (string) {
    return pool.query(
      'SELECT * FROM process WHERE Process_Name LIKE ? AND DeleteStatus = false',
      [`%${string}%`]
    )
  },

  // Function to get process status by process id
  Get_Process_Statustask: function (processId) {
    return pool.query(
      'SELECT * FROM process_status WHERE processId = ?',
      [processId]
    )
  },

  // Function to get process status list by process id
  getProcessStatusListById: async function (processId) {
    return pool.query("CALL GetProcessStatus(" + 
            "@ProcessId :=?" +
          ")",
          [
            Number(processId)
          ]
        )
  },
  getProcessStatusFlowChartById: async function (processId) {
    return pool.query("CALL GetProcessStatusFlowChart(" + 
            "@ProcessId :=?" +
          ")",
          [
            Number(processId)
          ]
        )
  },
  // Function to update process status
  updateProceasStatus: async function (obj) {
    // Retrive all required variables from request object
    const {departmentStatusId, id} = obj;

    // Return updating query to route
    return pool.query(
    `
    UPDATE process_status
    SET
      departmentStatusId = ?
    WHERE id = ?
    `,
    [
      departmentStatusId,
      id
    ]
    )
  },

  Search_Process_status:function(Department_Status_Name_,callback)
  { 
  if (Department_Status_Name_===undefined || Department_Status_Name_==="undefined" )
 Department_Status_Name_='';
 return db.query("CALL Search_Process_status(@Department_Status_Name_ :=?)",[Department_Status_Name_],callback);
  },


  Duplicate_process:function(Process_Id_,callback)
    { 
        console.log(Process_Id_,'process_idd')
   return db.query("CALL Duplicate_process(@Process_Id_ :=?)",[Process_Id_],callback);
    }
    ,



  
};

module.exports = Process;
