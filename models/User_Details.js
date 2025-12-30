var db=require('../dbconnection');
var fs = require('fs');
const storedProcedure=require('../helpers/stored-procedure');
const { Console } = require('console');
var User_Details=
{ 
 Save_User_Details: async function (User_Details_) {
  console.log(User_Details_)
    return new Promise(async (rs, rej) => {
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      var Application_Group_Value_ =0;var Application_Status_Value_ =0,All_time_Department_Value_ = 0,Country_Value_ = 0;
      var User_Menu_Selection_ = User_Details_.User_Menu_Selection_Data;
      var User_Department_ = User_Details_.User_Department_Data;
      var Subordinates_ = User_Details_.UserName_Details_Data;

      let User_Application_Status_ = User_Details_.User_Application_Status;
      let User_Application_Group_ = User_Details_.User_Application_Group;
      let All_Time_Departments_ = User_Details_.All_Time_Departments
      let Country_Data = User_Details_.Countries
     let User_University =User_Details_.university
      if (User_Application_Group_ != undefined && User_Application_Group_ != "" && User_Application_Group_ != null) Application_Group_Value_ =1;      
      if (User_Application_Status_ != undefined && User_Application_Status_ != "" && User_Application_Status_ != null ) Application_Status_Value_ =1;
      if (All_Time_Departments_ != undefined && All_Time_Departments_ != "" && All_Time_Departments_ != null ) All_time_Department_Value_ =1;
      if (Country_Data != undefined && Country_Data != "" && Country_Data != null ) Country_Value_ =1;
      
      try {
        console.log(User_University)
       //  console.log(All_time_Department_Value_)
        const result1 = await (new storedProcedure('Save_User_Details', [User_Details_.User_Details_Id, User_Details_.User_Details_Name,
        User_Details_.Password,User_Details_.Working_Status, User_Details_.User_Type, User_Details_.Role_Id, User_Details_.Branch_Id, 
        User_Details_.Commision_Mode_Id,User_Details_.Address1,User_Details_.Address2, User_Details_.Address3, User_Details_.Address4, 
        User_Details_.Pincode,User_Details_.Mobile, User_Details_.Email, 0, User_Details_.Registration_Target, User_Details_.FollowUp_Target,
        User_Details_.Influencer_Count,User_Details_.Department_Id, User_Details_.Department_Name,User_Details_.UserCombination_Id, 
        User_Details_.UserCombination_Name,User_Details_.AgentManagement_Id,User_Details_.AgentManagement_Name, User_Details_.Backup_User_Id,
        User_Details_.Backup_User_Name,User_Details_.Default_Application_Status_Id, User_Details_.Default_Application_Status_Name,
       User_Menu_Selection_, User_Department_,JSON.stringify(User_Application_Group_),JSON.stringify(User_Application_Status_),
       User_Details_.Application_View,Application_Group_Value_,Application_Status_Value_,User_Details_.All_Time_Department_View,
       User_Details_.Deparment_management_view,User_Details_.All_Time_Country_View,All_time_Department_Value_,
       JSON.stringify(All_Time_Departments_),Country_Value_,JSON.stringify(Country_Data),User_Details_.Region,JSON.stringify(User_University),
       Subordinates_,User_Details_.subordinaters_length,User_Details_.Ather_User_Id], connection)).result();
       if (result1[0].User_Details_Id_>0)
       {
        var Roles = await (new storedProcedure('Search_User_Role', [''])).result();
           var userRoleId  = await (new storedProcedure('Get_User_Role_Id', [result1[0].User_Details_Id_])).result();
           console.log(userRoleId)
           var SelectdRoles=[];
           SelectdRoles.push({ 'User_Role_Id': userRoleId[0].Role_Id});
           var UserRoleString='';
           var i = 0, j = 0;
           userRoleId = SelectdRoles[i].User_Role_Id;
           UserRoleString = userRoleId + ",";
           while (SelectdRoles.length > i) 
           {
             userRoleId = SelectdRoles[i].User_Role_Id;
             var foundRows=[];
             foundRows = Roles.filter(role_ => role_.Role_Under_Id === userRoleId);
             j = 0;
             RoleExist: boolean = false;
             while (foundRows.length > j)
               {
                 RoleExist = false;
                 for ( var p = 0; p < SelectdRoles.length; p++)
                   {
                   if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id)
                     {
                       RoleExist = true;
                       p = SelectdRoles.length;
                     }
                   }
                 if (RoleExist === false)  
                 {
                   SelectdRoles.push(foundRows[j]);
                   UserRoleString = UserRoleString.concat(foundRows[j].User_Role_Id , ",");
                 }
               j++;
             }
             i++;
           }
         UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);            
           //Department selection
           
           var BranchId = await (new storedProcedure('Get_User_Branch', [result1[0].User_Details_Id_])).result();
           BranchId = BranchId[0].Branch_Id;  
           var userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser', [result1[0].User_Details_Id_, result1[0].Branch_Id_])).result();
           var SelectdDepartments = [];
           var foundRows = [];
           var Department_selection="",Alltime_Dept_selection = '0,';
           var Department_Entry="";
           var Department_String ='',All_dept_Entry='';
           Department_String= Department_String.concat("and((student.Followup_Branch_Id=" + BranchId + " and student.To_User_Id=" + result1[0].User_Details_Id_ ," and  Followup_Department_Id in(");
           foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId); 
           i=0;
           Department_selection='0,'
           Alltime_Dept_selection = '0,'
           while (foundRows.length > i) 
           {
             Department_Entry = foundRows[i].Department_Id;
             Department_selection = Department_selection.concat( Department_Entry + ",");
             i++;
           }
           Department_selection = Department_selection.substring(0, Department_selection.length - 1);
           Department_String = Department_String.concat( Department_selection,"))");    
           userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser_current_Branch', [result1[0].User_Details_Id_, BranchId])).result();
           var userBranches = await (new storedProcedure('Get_User_Branches', [result1[0].User_Details_Id_, BranchId])).result();
           var alltime_dept = await (new storedProcedure('Get_AllTime_Dept', [result1[0].User_Details_Id_])).result();
           i=0;
           //console.log(userBranches)
           while (userBranches.length > i) 
           {
             Department_selection = '0,';
             BranchId=userBranches[i].Branch_Id
             foundRows = userDepartments
             //userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId);
             console.log(foundRows)
             j = 0;
             while (foundRows.length > j)
              {
               RoleExist = false;
               Department_Entry = foundRows[j].Department_Id;
               Department_selection = Department_selection.concat( Department_Entry + ",");
               j++;
              }
             Department_selection = Department_selection.substring(0, Department_selection.length - 1);
             Department_String = Department_String.concat(" or (student.Followup_Branch_Id=", BranchId, " and  student.Followup_Department_Id in(", Department_selection, "))");
             i++;
           }
           k=0;
       while(alltime_dept.length > k){
         All_dept_Entry = alltime_dept[k].Department_Id;
         Alltime_Dept_selection = Alltime_Dept_selection.concat( All_dept_Entry + ",");
         k++  
       }
       Alltime_Dept_selection = Alltime_Dept_selection.substring(0, Alltime_Dept_selection.length - 1);
      // console.log(Alltime_Dept_selection)
       Department_String = Department_String.concat( " or ( student.User_List like ","'%*",result1[0].User_Details_Id_,"*%' and  Followup_Department_Id in (",Alltime_Dept_selection,")))");
           const Role_Department = await (new storedProcedure('Save_Role_Department', [UserRoleString,Department_String,result1[0].User_Details_Id_])).result();
         }
        await connection.commit();
        connection.release();
        rs(result1);
      }
      catch (err) {
        console.log(err)
        await connection.rollback();
        rej(err);
      }
    })
  },
  // if (result1[0].User_Details_Id_>0)
  // {
  //  var Roles = await (new storedProcedure('Search_User_Role', [''])).result();
  //     var userRoleId  = await (new storedProcedure('Get_User_Role_Id', [result1[0].User_Details_Id_])).result();
  //     //console.log(userRoleId)
  //     var SelectdRoles=[];
  //     SelectdRoles.push({ 'User_Role_Id': userRoleId[0].Role_Id});
  //     var UserRoleString='';
  //     var i = 0, j = 0,k=0;
  //     userRoleId = SelectdRoles[i].User_Role_Id;
  //     UserRoleString = userRoleId + ",";
  //     while (SelectdRoles.length > i) 
  //     {
  //       userRoleId = SelectdRoles[i].User_Role_Id;
  //       var foundRows=[];
  //       foundRows = Roles.filter(role_ => role_.Role_Under_Id === userRoleId);
  //       j = 0;
  //       RoleExist: boolean = false;
  //       while (foundRows.length > j)
  //         {
  //           RoleExist = false;
  //           for ( var p = 0; p < SelectdRoles.length; p++)
  //             {
  //             if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id)
  //               {
  //                 RoleExist = true;
  //                 p = SelectdRoles.length;
  //               }
  //             }
  //           if (RoleExist === false)  
  //           {
  //             SelectdRoles.push(foundRows[j]);
  //             UserRoleString = UserRoleString.concat(foundRows[j].User_Role_Id , ",");
  //           }
  //         j++;
  //       }
  //       i++;
  //     }
  //   UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);            
  //     //Department selection
      
  //     var BranchId = await (new storedProcedure('Get_User_Branch', [result1[0].User_Details_Id_])).result();
  //     BranchId = BranchId[0].Branch_Id;  
  //     var userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser', [result1[0].User_Details_Id_, result1[0].Branch_Id_])).result();
  //     var SelectdDepartments = [];
  //     var foundRows = [];
  //     var Department_selection="",Alltime_Dept_selection = "";
  //     var Department_Entry="",All_dept_Entry='';
  //     var Department_String ='';
  //     Department_String= Department_String.concat("and((student.Followup_Branch_Id=" + BranchId + " and student.To_User_Id=" + result1[0].User_Details_Id_ ," and  Followup_Department_Id in(");
  //     foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId); 
  //     i=0;
  //     Department_selection='0,'
  //     Alltime_Dept_selection = '0,'
  //     while (foundRows.length > i) 
  //     {
  //       Department_Entry = foundRows[i].Department_Id;
  //       Department_selection = Department_selection.concat( Department_Entry + ",");
  //       i++;
  //     }
  //     Department_selection = Department_selection.substring(0, Department_selection.length - 1);
  //     Department_String = Department_String.concat( Department_selection,"))");    
  //     userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser_current_Branch', [result1[0].User_Details_Id_, BranchId])).result();
  //     var userBranches = await (new storedProcedure('Get_User_Branches', [result1[0].User_Details_Id_, BranchId])).result();
  //     var alltime_dept = await (new storedProcedure('Get_AllTime_Dept', [result1[0].User_Details_Id_])).result();
  //     console.log(alltime_dept)
  //     i=0;
  //     // console.log(userBranches)
  //     // console.log(userDepartments)
  //     while (userBranches.length > i) 
  //     {
  //       Department_selection = '0,';
  //       BranchId=userBranches[i].Branch_Id
  //       foundRows = userDepartments.filter(Departments_ => Departments_.Department_Id === BranchId);
  //       console.log(foundRows)
  //       j = 0;
  //       while (foundRows.length > j)
  //        {
  //         RoleExist = false;
  //         Department_Entry = foundRows[j].Department_Id;
  //         Department_selection = Department_selection.concat( Department_Entry + ",");
  //         j++;
  //        }
  //       Department_selection = Department_selection.substring(0, Department_selection.length - 1);
  //       Department_String = Department_String.concat(" or (student.Followup_Branch_Id=", BranchId, " and  student.Followup_Department_Id in(", Department_selection, "))");
  //       i++;
  //     }
  //     k=0;
  //     while(alltime_dept.length > k){
  //       All_dept_Entry = alltime_dept[k].Department_Id;
  //       Alltime_Dept_selection = Alltime_Dept_selection.concat( All_dept_Entry + ",");
  //       k++  
  //     }
  //     Alltime_Dept_selection = Alltime_Dept_selection.substring(0, Alltime_Dept_selection.length - 1);
  //    // console.log(Alltime_Dept_selection)
  //     Department_String = Department_String.concat( " or ( student.User_List like ","'%*",result1[0].User_Details_Id_,"*%' and  Followup_Department_Id in (",Alltime_Dept_selection,")))");
  //   //   console.log(result1[0].Branch_Id_)
  //   //   console.log(Department_selection)
  //    console.log(Department_String)
  //     const Role_Department = await (new storedProcedure('Save_Role_Department', [UserRoleString,Department_String,result1[0].User_Details_Id_])).result();
  //   }
Delete_User_Details:function(User_Details_Id_,callback)
  { 
  return db.query("CALL Delete_User_Details(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
  } ,
  Search_User_Typeahead:function(User_Details_Name_,callback)
       { 
       if (User_Details_Name_==='undefined'||User_Details_Name_===''||User_Details_Name_===undefined )
       User_Details_Name_='';
       return db.query("CALL Search_User_Typeahead(@User_Details_Name_ :=?)",[User_Details_Name_],callback);
       },
Load_User_Working_Status_Report: function (callback) {
        return db.query("CALL Load_User_Working_Status_Report()", [], callback);
    },
    Load_User_Status: function (callback) {
        return db.query("CALL Load_User_Status()", [], callback);
    },
    Load_Department: function (callback) {
        return db.query("CALL Load_Department()", [], callback);
    },
       Search_User_Typeahead_ByUser:function(Login_Id_,User_Details_Name_,callback)
       { 
       if (User_Details_Name_==='undefined'||User_Details_Name_===''||User_Details_Name_===undefined )
       User_Details_Name_='';
       return db.query("CALL Search_User_Typeahead_ByUser(@Login_Id_ :=?,@User_Details_Name_ :=?)",[Login_Id_,User_Details_Name_],callback);
       },
      Change_User_Status: function (User_Id, New_Status_Id, callback) {
    return db.query(
        "CALL Change_User_Status(@User_Id :=?, @New_Status_Id :=?)", 
        [User_Id, New_Status_Id], 
        callback
    );
},
Get_User_Details:function(User_Details_Id_,callback)
  { 
  return db.query("CALL Get_User_Details(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
  } ,
  Search_User_Details: async function (User_Details_Name_,Branch_Id_,Department_Id_,User_Status_Id_,UserCombination_Id_)
  {
    var Leads = [];
    try {
     if(Branch_Id_=='undefined')
      Branch_Id_=0;
     if(Department_Id_=='undefined')
      Department_Id_=0;
     if(User_Status_Id_=='undefined')
      User_Status_Id_=0;
     if(UserCombination_Id_=='undefined')
      UserCombination_Id_=0;

      //Department_String = Department_String.concat(" )");
    Leads = await (new storedProcedure('Search_User_Details', [User_Details_Name_,Branch_Id_,Department_Id_,User_Status_Id_,UserCombination_Id_])).result();
    }
    catch (e) {
      
    }
  
    return {
      returnvalue: {
        Leads
  
      }
    };
  },
 
Get_Menu_Permission:function(User_Id_,callback)
  { 
  return db.query("CALL Get_Menu_Permission(@User_Id_ :=?)",[User_Id_],callback);
  },
User_Employee:function(User_Details_Id_,callback)
  { 
  return db.query("CALL User_Employee(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
  },
Get_User_Type:function(callback)
  { 
  return db.query("CALL Get_User_Type()",[],callback);
  },

  Search_Backup_User_Typeahead:function(User_Details_Name,Department_Id_,callback)
  { 
    //console.log(User_Details_Name)
      if (User_Details_Name === undefined || User_Details_Name==="undefined" )
      User_Details_Name='';
      return db.query("CALL Search_Backup_User_Typeahead(@User_Details_Name_ :=?,@Department_Id_ :=?)", [User_Details_Name,Department_Id_],callback);
  },
  Get_Users_Load_Data: async function () {
   const User_Type = await (new storedProcedure('Get_User_Type', [])).result();
   const User_Menu_Selection = await (new storedProcedure('Search_User_Menu_Selection', [])).result();
   const User_Status = await (new storedProcedure('Get_User_Status', [])).result();
   const User_Commision = await (new storedProcedure('Get_User_Commission', [])).result();
   const User_Combination = await (new storedProcedure('Get_User_Combination', [])).result();
   const agent_management = await (new storedProcedure('Get_agent_managements', [])).result();
   const Branch = await (new storedProcedure('Dropdown_Branch', [])).result();
   const User_Department = await (new storedProcedure('Get_Department_InUser', [])).result();
   const Profile_Department = await (new storedProcedure('Get_Department', [])).result();
   const Application_Groups = await (new storedProcedure('Get_Application_Group', [])).result();
   const Application_Statuses = await (new storedProcedure('Get_Application_Status', [])).result();
   const Call_Status = await (new storedProcedure('Enable_Call', [])).result();
   const User_Details_Name = await (new storedProcedure('Get_UserName_Details', [])).result();

   return { User_Type, User_Menu_Selection, User_Status,User_Commision, User_Combination,agent_management,Branch, User_Department, Profile_Department, Application_Groups, Application_Statuses ,Call_Status,User_Details_Name};
 },
// Get_User_Details_Edit:function(User_Details_Id_,callback)
//    { 
//    return db.query("CALL Get_User_Details_Edit(@User_Details_Id_ :=?)",[User_Details_Id_],callback);
//    },
Get_User_Details_Edit: async function (User_Id_) {
 const Menu = await (new storedProcedure('Get_User_Details_Edit', [User_Id_])).result();
 const Department = await (new storedProcedure('Get_User_Department_Edit', [User_Id_])).result();
 const Applic_Group = await (new storedProcedure('Get_Application_Group_Edit', [User_Id_])).result();
 const Applic_Status = await (new storedProcedure('Get_Application_Status_Edit', [User_Id_])).result();
 const All_time_dept = await (new storedProcedure('Get_All_Time_department_Edit', [User_Id_])).result();
 const User_Countries = await (new storedProcedure('Get_User_Countries', [User_Id_])).result();
 const User_University = await (new storedProcedure('Get_User_University', [User_Id_])).result();
 const User_Name = await (new storedProcedure('Get_User_Name_Edit', [User_Id_])).result();

 return { [0]: { Menu, Department,Applic_Group,Applic_Status,All_time_dept,User_Countries,User_University,User_Name } };
},


Get_User_Role_Edit: async function (User_Id_) {
  const Menu = await (new storedProcedure('Get_User_Role_Edit', [User_Id_])).result();

  return { [0]: { Menu } };
 },

       Search_User_Role:function(User_Role_Name_,callback)
       { 
          if(User_Role_Name_==='undefined'||User_Role_Name_===''||User_Role_Name_===undefined )
          User_Role_Name_='';
      return db.query("CALL Search_User_Role(@User_Role_Name_ :=?)",[User_Role_Name_],callback);
       }

// Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
// { 
//   return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
// } 

};

 module.exports=User_Details;

