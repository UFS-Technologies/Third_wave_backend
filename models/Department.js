 var db=require('../dbconnection');
 const Querycaller = require('../helpers/Querycaller');
 const storedProcedure=require('../helpers/stored-procedure');
 var fs = require('fs');
 var Department=
 { 
 
  // Save_Department: async function (Department_) {
  //   return new Promise(async (rs,rej)=>{
  //     const pool = db.promise();
  //     let result1;
  //     var connection = await pool.getConnection();
  //     await connection.beginTransaction();
  //     var Department_Status_ = Department_.Department_Status_Data;
  //     try {
  //       const result1 = await(new storedProcedure('Save_Department', [Department_.Department_Id,
  //       Department_.Department_Name,
  //       Department_.FollowUp,
  //       Department_.Status,
  //       Department_.Department_Order,
  //       Department_.Color,Department_.Department_Status_Id,Department_Status_], connection)).result();
  //    await connection.commit();
  //       connection.release();
  //       rs( result1);
  //     }
  //     catch (err) {
  //       await connection.rollback();
  //       rej(err);
  //     }
    
  //   })
    
      
  //   },
  Save_Department: async function (Department_) {
    return new Promise(async (rs,rej)=>{
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      var Department_Status_ = Department_.Department_Status_Data;
      try {
        console.log(Department_)
        const result1 = await(new storedProcedure('Save_Department', [Department_.Department_Id,
        Department_.Department_Name,
        Department_.FollowUp,
        Department_.Status,
        Department_.Department_Order,
        Department_.Color,
        Department_.Department_Status_Id,
        Department_.Transfer_Method_Id,
        Department_.Color_Type_Id,
        Department_.Color_Type_Name,
        Department_Status_, Department_.Department_management_view,
        Department_.Round_Robin_Check,
        Department_.Agent_View_Check,
       ], connection)).result();
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
  Delete_Department:function(Department_Id_,callback)
 { 
return db.query("CALL Delete_Department(@Department_Id_ :=?)",[Department_Id_],callback);
 }
 ,
 Get_Department:function(Department_Id_,callback)
 { 
return db.query("CALL Get_Department(@Department_Id_ :=?)",[Department_Id_],callback);
 }
 ,
 Get_Department_InUser:function(callback)
 { 
return db.query("CALL Get_Department_InUser()",[],callback);
 }
 ,
 Search_Department:function(Department_Name_,callback)
 { 
    if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
    Department_Name_='';
return db.query("CALL Search_Department(@Department_Name_ :=?)",[Department_Name_],callback);
 }
,
Search_Branch_Department_Typeahead:function(Department_Id_,Department_Name_,callback)
{ 
  if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  Department_Name_='';
return db.query("CALL Search_Branch_Department_Typeahead(@Department_Id_ :=?,@Department_Name_ :=?)",[Department_Id_,Department_Name_],callback);
}
,



Search_Department_Typeahead:function(Student_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_Department_Typeahead(@Student_Id_ :=?)",[Student_Id_],callback);
}
,


Search_Department_Typeahead_Tasknew:function(Student_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_Department_Typeahead_Tasknew(@Student_Id_ :=?)",[Student_Id_],callback);
}
,


Search_DefaultDepartment_User_Typeahead:function(Department_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_DefaultDepartment_User_Typeahead(@Department_Id_ :=?)",[Department_Id_],callback);
}
,



Search_Branch_User_Typeahead:function(Branch_Id_,User_Details_Name_,callback)
{ 
  if(User_Details_Name_==='undefined'||User_Details_Name_===''||User_Details_Name_===undefined )
  User_Details_Name_='';
return db.query("CALL Search_Branch_User_Typeahead(@Branch_Id_ :=?,@User_Details_Name_ :=?)",[Branch_Id_,User_Details_Name_],callback);
},
Search_Department_User_Typeahead:function(Branch_Id_,Department_Id_,Users_Name_,callback)
{ 
  if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead(@Branch_Id_ :=?,@Department_Id_ :=?,@Users_Name_ :=?)",
[Branch_Id_,Department_Id_,Users_Name_],callback);
}
,
Search_Department_User_Typeahead_changestaff:function(Branch_Id_,Department_Id_,Users_Name_,callback)
{ 
  if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_changestaff(@Branch_Id_ :=?,@Department_Id_ :=?,@Users_Name_ :=?)",
[Branch_Id_,Department_Id_,Users_Name_],callback);
},


Search_Department_User_Typeahead_Task:function(Department_Id_,callback)
{ 
  // if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  // Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_Task(@Department_Id_ :=?)",
[Department_Id_],callback);
}
,

Search_Department_User_Typeahead_Tasknew:function(Department_Id_,Student_Id_,callback)
{ 
  // if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  // Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_Tasknew(@Department_Id_ :=?,@Student_Id_ :=?)",
[Department_Id_,Student_Id_],callback);
}
,



Search_Department_User_Typeahead_New:function(Branch_Id_,Department_Id_,Users_Name_,Usertype_,callback)
{ 
  if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_New(@Branch_Id_ :=?,@Department_Id_ :=?,@Users_Name_ :=?,@Usertype_ :=?)",
[Branch_Id_,Department_Id_,Users_Name_,Usertype_],callback);
}
,

Search_Branch_Department_TypeaheadNew:function(Department_Name_,callback)
{ 
  if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  Department_Name_='';
return db.query("CALL Search_Branch_Department_TypeaheadNew(@Department_Name_ :=?)",[Department_Name_],callback);
}
,


Search_Department_User_Typeahead_Latest:function(Department_Id_,Users_Name_,callback)
{ 
  if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_Latest(@Department_Id_ :=?,@Users_Name_ :=?)",
[Department_Id_,Users_Name_],callback);
}
,


Search_Department_User_Typeahead_Change_User:function(Branch_Id_,Department_Id_,Users_Name_,Usertype_,callback)
{ 
  if(Users_Name_==='undefined'||Users_Name_===''||Users_Name_===undefined )
  Users_Name_='';
return db.query("CALL Search_Department_User_Typeahead_Change_User(@Branch_Id_ :=?,@Department_Id_ :=?,@Users_Name_ :=?,@Usertype_ :=?)",
[Branch_Id_,Department_Id_,Users_Name_,Usertype_],callback);
}
,

Search_Department_Status_Typeahead:function(Department_Id_,Department_Status_Name_,callback)
{ 
  if(Department_Status_Name_==='undefined'||Department_Status_Name_===''||Department_Status_Name_===undefined )
  Department_Status_Name_='';
return db.query("CALL Search_Department_Status_Typeahead(@Department_Id_ :=?,@Department_Status_Name_ :=?)",
[Department_Id_,Department_Status_Name_],callback);
}
,





Search_Department_Transfer_Status_Typeahead:function(Department_Id_,Department_Status_Name_,callback)
{ 
  if(Department_Status_Name_==='undefined'||Department_Status_Name_===''||Department_Status_Name_===undefined )
  Department_Status_Name_='';
return db.query("CALL Search_Department_Transfer_Status_Typeahead(@Department_Id_ :=?,@Department_Status_Name_ :=?)",
[Department_Id_,Department_Status_Name_],callback);
}
,

Search_Substatus_Typeahead:function(Status_Id_,Sub_Status_Name_,callback)
{ 
  if(Sub_Status_Name_==='undefined'||Sub_Status_Name_===''||Sub_Status_Name_===undefined )
  Sub_Status_Name_='';
return db.query("CALL Search_Substatus_Typeahead(@Status_Id_ :=?,@Sub_Status_Name_ :=?)",
[Status_Id_,Sub_Status_Name_],callback);
}
,

Load_Status_Dropdown: function (callback) {
  return db.query("CALL Load_Status_Dropdown()", [], callback);
},

Get_Status_Selection_Edit:function(Department_Id_,callback)
{ 
return db.query("CALL Get_Status_Selection_Edit(@Department_Id_ :=?)",[Department_Id_],callback);
},
Search_Department_Status:function(Department_Status_Name_,callback)
 { 
    if(Department_Status_Name_==='undefined'||Department_Status_Name_===''||Department_Status_Name_===undefined )
    Department_Status_Name_='';
return db.query("CALL Search_Department_Status(@Department_Status_Name_ :=?)",[Department_Status_Name_],callback);
 },
//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,


Load_StatusType:function(callback)
{ 
    return db.query("CALL Load_StatusType()", [],callback);
},

Load_DefaultDepartment:function(callback)
{ 
    return db.query("CALL Load_DefaultDepartment()", [],callback);
},


Search_DefultUser_Typeahead:function(Branch_Id_,Department_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_DefultUser_Typeahead(@Branch_Id_ :=?,@Department_Id_ :=?)",[Branch_Id_,Department_Id_],callback);
}
,


Search_BranchDefaultDepartment_Typeahead:function(Branch_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_BranchDefaultDepartment_Typeahead(@Branch_Id_ :=?)",[Branch_Id_],callback);
}
,

Search_DefaultDepartmentStatus_Typeahead:function(Branch_Id_,Department_Id_,callback)
{ 
  // if(Department_Name_==='undefined'||Department_Name_===''||Department_Name_===undefined )
  // Department_Name_='';
return db.query("CALL Search_DefaultDepartmentStatus_Typeahead(@Branch_Id_ :=?,@Department_Id_ :=?)",[Branch_Id_,Department_Id_],callback);
}
,






  };




  module.exports=Department;

