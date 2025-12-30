 var db=require('../dbconnection');
 var fs = require('fs');
 var Agent_Details=
 { 
// Save_Agent_Details:function(Agent_Details_,callback)
//  { 
//    console.log(Agent_Details_)
// return db.query("CALL Save_Agent_Details("+
// "@Agent_Id_ :=?,"+
// "@Agent_Name_ :=?,"+
// "@Phone_ :=?,"+
// "@Email_ :=?,"+
// "@Address_ :=?,"+
// "@Description_ :=?"+")"

//  ,[Agent_Details_.Agent_Id,
//   Agent_Details_.Agent_Name,
//   Agent_Details_.Phone,
//   Agent_Details_.Email,
//   Agent_Details_.Address,
//   Agent_Details_.Description
// ],callback);
//  }
//  ,
Save_Agent_Details:function(Agent_Details_,callback)
 { 
   console.log('Agent Details: ',Agent_Details_)

 
     var Agent_Data_Value_ = 0;
     
     let Agent_Department_Data_ =  JSON.stringify(Agent_Details_.Agent_Department_Data)
   
     if (Agent_Department_Data_ != undefined && Agent_Department_Data_ != '' && Agent_Department_Data_ != null)
      Agent_Data_Value_ = 1
   
     
       Purchase_Value_document_Value_ = 1;
return db.query("CALL Save_Agent_Details("+
"@Agent_Id_ :=?,"+
"@Agent_Name_ :=?,"+
"@Phone_ :=?,"+
"@Email_ :=?,"+
"@Address_ :=?,"+
"@Description_ :=?,"+
"@User_Name_ :=?,"+
"@Password_ :=?,"+
"@Enquiry_Source_Id_ :=?,"+
"@Under_User_ :=?,"+
"@Branch_Id_ :=?,"+
"@Department_ :=?,"+
"@Agent_Details_Id_:=?,"+
"@Department_name_ :=?,"+
"@To_staff_name_ :=?,"+
"@Login_user_id_ :=?,"+
"@Agent_Department_Data_ :=?,"+

"@Agent_Data_Value_ :=?"+
")"


 ,[Agent_Details_.Agent_Id,
  Agent_Details_.Agent_Name,
  Agent_Details_.Phone,
  Agent_Details_.Email,
  Agent_Details_.Address,
  Agent_Details_.Description,
  Agent_Details_.User_Name,
  Agent_Details_.Password,
  Agent_Details_.Enquiry_Source_Id,
  Agent_Details_.Under_User,
  Agent_Details_.Branch_Id,
  // Agent_Details_.Department,
  // Agent_Details_.To_User_Id,
  // Agent_Details_.Department_Name,
  // Agent_Details_.To_User_Name,
  Agent_Details_.Department_mentor,
  Agent_Details_.To_User_Id_mentor,
  Agent_Details_.Department_Name_mentor,
  Agent_Details_.To_User_Name_mentor,
  Agent_Details_.Login_user_id,
   Agent_Department_Data_,
   Agent_Data_Value_,

 
],callback);
 }
 ,
 Save_Manage_User:function(Agent_Details_,callback)
 { 
   console.log('Agent Details: ',Agent_Details_)

 
return db.query("CALL Save_Manage_User("+
 " @AgentUser_Id_ := ?,"+
"@Agent_Id_ :=?,"+
"@username_subagent_ :=?,"+
"@password_Subagent_ :=?,"+
"@Login_user_id_ :=?"+

")"


 ,[ Agent_Details_.AgentUser_Id,
  Agent_Details_.Agent_Id,
  Agent_Details_.username_subagent,
  Agent_Details_.password_Subagent,
  Agent_Details_.Login_user_id
 

 
],callback);
 }
 ,
  
 Save_Freelancer_Details:function(Agent_Details_,callback)
 { 
   console.log(Agent_Details_)
return db.query("CALL Save_Freelancer_Details("+
"@Agent_Id_ :=?,"+
"@Agent_Name_ :=?,"+
"@Phone_ :=?,"+
"@Email_ :=?,"+
"@Address_ :=?,"+
"@Description_ :=?,"+
"@User_Name_ :=?,"+
"@Password_ :=?,"+
"@Enquiry_Source_Id_ :=?,"+
"@Under_User_ :=?,"+
"@Branch_Id_ :=?,"+
"@Department_ :=?,"+
"@Agent_Details_Id_:=?,"+
"@Department_name_ :=?,"+
"@To_staff_name_ :=?,"+
"@Login_user_id_ :=?,"+
"@Commission_ :=?"+

")"


 ,[Agent_Details_.Agent_Id,
  Agent_Details_.Agent_Name,
  Agent_Details_.Phone,
  Agent_Details_.Email,
  Agent_Details_.Address,
  Agent_Details_.Description,
  Agent_Details_.User_Name,
  Agent_Details_.Password,
  Agent_Details_.Enquiry_Source_Id,
  Agent_Details_.Under_User,
  Agent_Details_.Branch_Id,
  Agent_Details_.Department,
  Agent_Details_.To_User_Id,
  Agent_Details_.Department_Name,
  Agent_Details_.To_User_Name,
  Agent_Details_.Login_user_id,
  Agent_Details_.Commission,

  
],callback);
 }
 ,

 Save_Freelancer_Payment:function(Agent_Details_,callback)
 { 
   console.log(Agent_Details_)
return db.query("CALL Save_Freelancer_Payment("+
"@influencer_payment_id_ :=?,"+
"@Agent_Id_ :=?,"+
"@Agent_Name_ :=?,"+
"@Amount_ :=?"+


")"


 ,[Agent_Details_.influencer_payment_id,Agent_Details_.Agent_Id,
  Agent_Details_.Agent_Name,
  Agent_Details_.Amount

  
],callback);
 }
 ,



 Delete_Agent_Details:function(Agent_Id_,callback)
 { 
return db.query("CALL Delete_Agent_Details(@Agent_Id_ :=?)",[Agent_Id_],callback);
 }
 ,
 Delete_Agent_Payment:function(Agent_Id_,callback)
 { 
return db.query("CALL Delete_Agent_Payment(@influencer_payment_id_ :=?)",[Agent_Id_],callback);
 }
 ,
 Get_Agent_Details:function(Agent_Id_,callback)
 { 
return db.query("CALL Get_Agent_Details(@Agent_Id_ :=?)",[Agent_Id_],callback);
 },
 Get_Agent_Department_Data:function(Agent_Id_,callback)
 { 
return db.query("CALL Get_Agent_Department_Data(@Agent_Id_ :=?)",[Agent_Id_],callback);
 },
  
 
 Search_Agent_Details:function(Agent_Name_,Login_User_,User_Type_,callback)
 { 
    if(Agent_Name_==='undefined'||Agent_Name_===''||Agent_Name_===undefined )
    Agent_Name_='';
return db.query("CALL Search_Agent_Details(@Agent_Name_ :=?,@Login_User_:=?,@User_Type_:=?)",[Agent_Name_,Login_User_,User_Type_],callback);
 },

 Search_Freelancer_Details:function(Agent_Name_,Login_User_,User_Type_,callback)
 { 
    if(Agent_Name_=='undefined'||Agent_Name_==''||Agent_Name_==undefined )
    Agent_Name_='';
return db.query("CALL Search_Freelancer_Details(@Agent_Name_ :=?,@Login_User_:=?,@User_Type_:=?)",[Agent_Name_,Login_User_,User_Type_],callback);
 },

 Search_Freelancer_Payment:function(FromDate,ToDate,Agent_Name_,callback)
 { 
    if(Agent_Name_==='undefined'||Agent_Name_===''||Agent_Name_===undefined )
    Agent_Name_='';
return db.query("CALL Search_Freelancer_Payment(@Fromdate_ :=?,@Todate_:=?,@Is_Date_Check_:=?,@Agent_Name_:=?)",[FromDate,ToDate,1,Agent_Name_],callback);
 },

 Search_Name_Typeahead: function (Agent_Name, callback) {
  if (Agent_Name === undefined || Agent_Name === "undefined")
    Agent_Name = "";
  return db.query(
    "CALL Search_Name_Typeahead(@Agent_Name_ :=?)",
    [Agent_Name],
    callback
  );
},


//  Get_Menu_Status:function(Menu_Id_,Login_User_,callback)
//  { 
//    return db.query("CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)", [Menu_Id_,Login_User_],callback);
//  } ,
  };
  module.exports=Agent_Details;

