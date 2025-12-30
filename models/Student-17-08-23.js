var db = require("../dbconnection");
var fs = require("fs");
const { Console } = require("console");
const storedProcedure=require('../helpers/stored-procedure');
const { parse } = require("path");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// process.env.AWS_SES_REGION='us-east-2';
// process.env.AWS_SECRET_ACCESS_KEY='WyyQ8pRH6y6fpCcrT7XTS7MfeBr8Sa04U/2D9Nwb';
// process.env.AWS_ACCESS_KEY_ID='AKIAX37YDYI4OSIHXSED';

var base64str = base64_encode("companylogo.PNG");

function base64_encode(file) {
	var bitmap = fs.readFileSync(file);
	return new Buffer.from(bitmap).toString("base64");
}
var Student = {
	//  Save_Student:function(Student_,callback)
	//  {
	//    return db.query("CALL Save_Student("+"@Student_Id_ :=?,"+"@Client_Accounts_Id_ :=?,"+
	//    "@Student_Name_ :=?,"+"@Last_Name_ :=?,"+"@Gender_ :=?,"+"@Address1_ :=?,"+"@Address2_ :=?,"+
	//    "@Pincode_ :=?,"+"@Email_ :=?,"+"@Phone_Number_ :=?,"+"@Dob_ :=?,"+"@Country_ :=?,"+"@Promotional_Code_ :=?,"+
	//    "@Student_Status_Id_ :=?,"+"@Password_ :=?"+")"
	//    ,[Student_.Student_Id,    Student_.Agent_Id,Student_.Student_Name,Student_.Last_Name,Student_.Gender,
	//    Student_.Address1,Student_.Address2,Student_.Pincode,Student_.Email,Student_.Phone_Number,
	//    Student_.Dob,Student_.Country,Student_.Promotional_Code,Student_.Student_Status_Id,Student_.Password],callback);
	//  } ,
	Save_Student: function (Student_Data, callback) {
		//console.log(Student_Data);
		var Student_Value_ = 0;
		var student_document_Value_ = 0;
		var Student_Checklist_Value_ = 0;
		let Student_ = Student_Data.Student;
		// console.log(Student_);
		if (Student_ != undefined && Student_ != "" && Student_ != null)
			Student_Value_ = 1;
		var FollowUp_Value_ = 0;
		let FollowUp_ = Student_Data.Followup;
		//console.log(FollowUp_)
		if (FollowUp_ != undefined && FollowUp_ != "" && FollowUp_ != null)
			FollowUp_Value_ = 1;
		// console.log(FollowUp_Value_)
		let student_document_ = Student_Data.student_document;
		if (
			student_document_ != undefined &&
			student_document_ != "" &&
			student_document_ != null
		)
			student_document_Value_ = 1;

		let student_List_ = Student_Data.student_checklist;
		if (
			student_List_ != undefined &&
			student_List_ != "" &&
			student_List_ != null
		)
			Student_Checklist_Value_ = 1;

		return db.query(
			"CALL Save_Student(" +
				"@Student_:=?," +
				"@FollowUp_ :=?," +
				"@Student_Value_ :=?," +
				"@FollowUp_Value_ :=?," +
				"@student_document_ :=?," +
				"@student_document_Value_ :=?," +
				"@student_List_ :=?," +
				"@Student_Checklist_Value_ :=? )",
			[
				Student_,
				FollowUp_,
				Student_Value_,
				FollowUp_Value_,
				student_document_,
				student_document_Value_,
				student_List_,
				Student_Checklist_Value_,
			],
			callback
		);
	},

	Save_ApplicationDetails_Datas: function (Application_Data, callback) {
		console.log(Application_Data)
		var Applicationdetails_Value_ = 0;
		var application_document_Value_ = 0;

		let Applicationdetails_ = Application_Data.Application;
		// console.log(Application_);
		if (
			Applicationdetails_ != undefined &&
			Applicationdetails_ != "" &&
			Applicationdetails_ != null
		)
			Applicationdetails_Value_ = 1;

		let application_document_ = Application_Data.application_document;
		if (
			application_document_ != undefined &&
			application_document_ != "" &&
			application_document_ != null
		)
			application_document_Value_ = 1;

		console.log(application_document_);
		console.log(application_document_Value_);

		return db.query(
			"CALL Save_ApplicationDetails_Datas(" +
				"@Applicationdetails_:=?," +
				"@Applicationdetails_Value_ :=?," +
				"@application_document_ :=?," +
				"@application_document_Value_ :=? )",
			[
				Applicationdetails_,
				Applicationdetails_Value_,
				application_document_,
				application_document_Value_,
			],
			callback
		);
	},

	Save_FeesReceipt: function (Fees_Data, callback) {
		console.log(Fees_Data);
		var FeesReceiptdetails_Value_ = 0;
		var feesreceipt_document_Value_ = 0;

		let FeesReceiptdetails_ = Fees_Data.Fees;
		// console.log(Application_);
		if (
			FeesReceiptdetails_ != undefined &&
			FeesReceiptdetails_ != "" &&
			FeesReceiptdetails_ != null
		)
			FeesReceiptdetails_Value_ = 1;

		let feesreceipt_document_ = Fees_Data.feesreceipt_document;
		if (
			feesreceipt_document_ != undefined &&
			feesreceipt_document_ != "" &&
			feesreceipt_document_ != null
		)
			feesreceipt_document_Value_ = 1;

		return db.query(
			"CALL Save_FeesReceipt(" +
				"@FeesReceiptdetails_:=?," +
				"@FeesReceiptdetails_Value_ :=?," +
				"@feesreceipt_document_ :=?," +
				"@feesreceipt_document_Value_ :=? )",
			[
				FeesReceiptdetails_,
				FeesReceiptdetails_Value_,
				feesreceipt_document_,
				feesreceipt_document_Value_,
			],
			callback
		);
	},

	Save_Receipt: function (Fees_Receipt_, callback) {
		return db.query(
			"CALL Save_Receipt(" +
				"@Fees_Receipt_Id_ :=?," +
				"@Fees_Id_ :=?," +
				"@Entry_Date_ :=?," +
				"@Amount_ :=?," +
				"@Description_ :=?," +
				"@Student_Id_ :=?," +
				"@User_Id_ :=?" +
				")",
			[
				Fees_Receipt_.Fees_Receipt_Id,
				Fees_Receipt_.Fees_Id,
				Fees_Receipt_.Entry_Date,
				Fees_Receipt_.Amount,
				Fees_Receipt_.Description,
				Fees_Receipt_.Student_Id,
				Fees_Receipt_.User_Id,
			],
			callback
		);
	},

	Get_Student_PageLoadData_Dropdowns:function(callback)
    {  
    return db.query("CALL Get_Student_PageLoadData_Dropdowns()",[],callback);
    },

	Save_Qualification:function(Qualification_,callback)
    { 
        console.log(Qualification_)
    return db.query("CALL Save_Qualification("+"@Qualification_Id_ :=?,"+"@slno_ :=?,"+"@Student_id_ :=?,"+"@Credential_ :=?,"+"@MarkPer_ :=?,"+"@school_ :=?,"+"@Fromyear_ :=?,"+"@Toyear_ :=?,"+"@result_ :=?,"+"@Field_ :=?,"+"@Backlog_History_ :=?,"+"@Year_of_passing_ :=?)"
    ,[Qualification_.Qualification_Id,Qualification_.slno,Qualification_.Student_id,
        Qualification_.Credential,Qualification_.MarkPer,Qualification_.school,
        Qualification_.Fromyear,Qualification_.Toyear,Qualification_.result,
        Qualification_.Field,Qualification_.Backlog_History,Qualification_.Year_of_passing],callback);
    },

	Get_QualificationDetails:function(Student_Id_,callback)
    { 
		console.log(Student_Id_)
   return db.query("CALL Get_QualificationDetails(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,


	Load_Conditions_Subdata_Edit:function(Application_details_Id_,callback)
    { 
		console.log(Application_details_Id_)
   return db.query("CALL Load_Conditions_Subdata_Edit(@Application_details_Id_ :=?)",[Application_details_Id_],callback);
    }
    ,


	Get_Previsa_Details:function(Student_Id_,callback)
    { 
		console.log(Student_Id_)
   return db.query("CALL Get_Previsa_Details(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,

	Get_Preadmission_Details:function(Student_Id_,callback)
    { 
		console.log(Student_Id_)
   return db.query("CALL Get_Preadmission_Details(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,
	Get_ReviewDetails:function(Student_Id_,callback)
    { 
		console.log(Student_Id_)
   return db.query("CALL Get_ReviewDetails(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,

	Delete_Qualificationdetails:function(Qualification_Id_,callback)
    { 
   return db.query("CALL Delete_Qualificationdetails(@Qualification_Id_ :=?)",[Qualification_Id_],callback);
    }
    ,

	
	Delete_Pre_Visa:function(Student_Checklist_Master_Id_,callback)
    { 
   return db.query("CALL Delete_Pre_Visa(@Student_Checklist_Master_Id_ :=?)",[Student_Checklist_Master_Id_],callback);
    }
    ,

	Delete_Pre_Admission:function(Student_Preadmission_Checklist_Master_Id_,callback)
    { 
   return db.query("CALL Delete_Pre_Admission(@Student_Preadmission_Checklist_Master_Id_ :=?)",[Student_Preadmission_Checklist_Master_Id_],callback);
    }
    ,

	Delete_Review:function(Review_Id_,callback)
    { 
   return db.query("CALL Delete_Review(@Review_Id_ :=?)",[Review_Id_],callback);
    }
    ,

	Save_work_experience:function(Work_experience_,callback)
    { 
        console.log(Work_experience_)
    return db.query("CALL Save_work_experience("+"@Work_Experience_Id_ :=?,"+"@Slno_ :=?,"+"@Student_Id_ :=?,"+"@Ex_From_ :=?,"+"@Ex_To_ :=?,"+"@Years_ :=?,"+"@Company_ :=?,"+"@Designation_ :=?,"+"@Salary_ :=?,"+"@Salary_Mode_ :=?)"
    ,[Work_experience_.Work_Experience_Id,Work_experience_.Slno,Work_experience_.Student_Id,
        Work_experience_.Ex_From,Work_experience_.Ex_To,Work_experience_.Years,
        Work_experience_.Company,Work_experience_.Designation,Work_experience_.Salary,
        Work_experience_.Salary_Mode],callback);
    },

	Save_Cas_Followup:function(Cas_Followup_,callback)
    { 
        console.log(Cas_Followup_)
    return db.query("CALL Save_Cas_Followup("+"@Student_Task_Id_ :=?,"+"@Task_Status_ :=?,"+"@Student_Id_ :=?,"+"@Status_Name_ :=?,"+"@Remark_ :=?,"+"@Followup_Date_ :=?,"+"@To_User_ :=?,"+"@To_User_Name_ :=?,"+"@Task_Item_Id_ :=?,"+"@Task_Group_Id_ :=?)"
    ,[Cas_Followup_.Student_Task_Id,Cas_Followup_.Task_Status,Cas_Followup_.Student_Id,Cas_Followup_.Status_Name
	,Cas_Followup_.Remark,Cas_Followup_.Followup_Date,Cas_Followup_.To_User,Cas_Followup_.To_User_Name,Cas_Followup_.Task_Item_Id,Cas_Followup_.Task_Group_Id],callback);
    },


	Save_Profile_Agent:function (Profile_, callback) { 
		var Unique_Id_;
		if (Profile_.Student_Id == 0) {
			var uuid = require('uuid');
			Unique_Id_ = uuid.v1();
		}
	
		return db.query("CALL Save_Profile_Agent(@Student_Id_ :=?, @Student_Name_ :=?, @Phone_Number_ :=?, @Unique_Id_ :=?)", 
			[Profile_.Student_Id, Profile_.Student_Name, Profile_.Phone_Number, Unique_Id_],
			callback
		);
	},
	Save_Profile:function(Profile_,callback)
    { 
		var Unique_Id_;
		if(Profile_.Student_Id==0)
		{
			var uuid = require('uuid');
			var Unique_Id_=uuid.v1();
		
		}
		var FollowUp_=Profile_.Student_FollowUp_;
		const remark_=encodeURIComponent(FollowUp_.Remark)
		//  console.log(remark_)
		// console.log(FollowUp_)
    return db.query("CALL Save_Profile("+"@Student_Id_ :=?,"+"@Enquiry_Source_Id_ :=?,"+"@Enquiry_Source_Name_ :=?,"+"@Enquiryfor_Id_ :=?,"+
	"@Enquirfor_Name_ :=?,"+"@Shore_Id_ :=?,"+"@Shore_Name_ :=?,"+"@Enquiry_Mode_Id_ :=?,"+"@Enquiry_Mode_Name_ :=?,"+"@Program_Course_Id_ :=?,"+
	"@Program_Course_Name_ :=?,"+"@Country_Id_ :=?,"+"@Country_Name_ :=?,"+"@Marital_Status_Id_ :=?,"+"@Marital_Status_Name_ :=?,"+"@Passport_Id_ :=?,"+
	"@Address1_ :=?,"+"@Address2_ :=?,"+"@Alternative_Email_ :=?,"+"@Alternative_Phone_Number_ :=?,"+"@Date_of_Marriage_ :=?,"+"@Dob_ :=?,"+"@Dropbox_Link_ :=?,"+
	"@Email_ :=?,"+"@No_of_Kids_and_Age_ :=?,"+"@Passport_No_ :=?,"+"@Passport_Todate_ :=?,"+"@Passport_fromdate_ :=?,"+"@Phone_Number_ :=?,"+"@Previous_Visa_Rejection_ :=?,"+
	"@Reference_ :=?,"+"@Spouse_Name_ :=?,"+"@Spouse_Occupation_ :=?,"+"@Spouse_Qualification_ :=?,"+"@Student_Name_ :=?,"+"@Whatsapp_ :=?,"+
	"@Branch_ :=?,"+"@Branch_Name_ :=?,"+"@By_User_Id_ :=?,"+"@By_User_Name_ :=?,"+"@Department_ :=?,"+"@Department_FollowUp_ :=?,"+"@Department_Name_ :=?,"+"@Department_Status_Name_ :=?,"+"@Next_FollowUp_Date_ :=?,"+
	"@Remark_ :=?,"+"@Remark_id_ :=?,"+"@Status_ :=?,"+"@To_User_Name_ :=?,"+"@To_User_Id_ :=?,"+"@Student_Status_Id_ :=?,"+"@Agent_Id_ :=?,"+"@Flag_Student_ :=?,"+"@Flag_Followup_ :=?,"+
	"@Phone_Change_ :=?,"+"@Email_Change_ :=?,"+"@Alternative_Email_Change_ :=?,"+"@Alternative_Phone_Number_Change_ :=?,"+"@Whatsapp_Change_ :=?,"+"@Department_Id_ :=?,"+"@Branch_Id_ :=?,"+"@Unique_Id_ :=?,"+"@Class_Id_ :=?,"+"@Class_Name_ :=?," +"@Guardian_telephone_ :=?," +
	"@Counsilor_Note_ :=?," +"@BPH_Note_ :=?," +"@Pre_Visa_Note_ :=?," +"@Sub_Status_Id_ :=?," +"@Sub_Status_Name_ :=?,"+"@Status_Type_Id_ :=?," +"@Status_Type_Name_ :=?," +"@Class_Order_ :=?,"  +"@Refund_Amount_ :=?," +"@Refund_Description_ :=?"  +
	")"
    ,[Profile_.Student_Id,Profile_.Enquiry_Source_Id,Profile_.Enquiry_Source_Name,Profile_.Enquiryfor_Id,
		Profile_.Enquirfor_Name,Profile_.Shore_Id,Profile_.Shore_Name,Profile_.Enquiry_Mode_Id,Profile_.Enquiry_Mode_Name,Profile_.Program_Course_Id,
		Profile_.Program_Course_Name,Profile_.Country_Id,Profile_.Country_Name,Profile_.Marital_Status_Id,Profile_.Marital_Status_Name,Profile_.Passport_Id,
       Profile_.Address1,Profile_.Address2,Profile_.Alternative_Email,Profile_.Alternative_Phone_Number,Profile_.Date_of_Marriage,Profile_.Dob,Profile_.Dropbox_Link,
		Profile_.Email,Profile_.No_of_Kids_and_Age,Profile_.Passport_No,Profile_.Passport_Todate,Profile_.Passport_fromdate,Profile_.Phone_Number,Profile_.Previous_Visa_Rejection,		
        Profile_.Reference,Profile_.Spouse_Name,Profile_.Spouse_Occupation,Profile_.Spouse_Qualification,Profile_.Student_Name,Profile_.Whatsapp,
		FollowUp_.Branch,FollowUp_.Branch_Name,FollowUp_.By_User_Id,FollowUp_.By_User_Name,FollowUp_.Department,FollowUp_.Department_FollowUp,FollowUp_.Department_Name,FollowUp_.Department_Status_Name,FollowUp_.Next_FollowUp_Date,
		remark_,FollowUp_.Remark_id,FollowUp_.Status_Id,FollowUp_.To_User_Name,FollowUp_.To_User_Id,Profile_.Student_Status_Id,Profile_.Agent_Id,Profile_.Flag_Student,Profile_.Flag_Followup,
		Profile_.Phone_Change,Profile_.Email_Change,Profile_.Alternative_Email_Change,Profile_.Alternative_Phone_Number_Change,Profile_.Whatsapp_Change,Profile_.Department_Id,Profile_.Branch_Id,Unique_Id_,FollowUp_.Class_Id,FollowUp_.Class_Name,Profile_.Guardian_telephone,
		Profile_.Counsilor_Note,Profile_.BPH_Note,Profile_.Pre_Visa_Note,FollowUp_.Sub_Status_Id,FollowUp_.Sub_Status_Name,FollowUp_.Status_Type_Id,FollowUp_.Status_Type_Name,FollowUp_.Class_Order,Profile_.Refund_Amount,Profile_.Refund_Description
	],callback);
    },



	// Transfer_Cofirmation:function(Transfer_,callback)
    // { 
		
	// 	 console.log(Transfer_)
    // return db.query("CALL Save_Profile("+"@Student_Id_ :=?,"+"@Transfer_Source_ :=?,"+"@Login_User_Id_ :=?,"+"@Department_Id_ :=?,"+
	// "@Remark_ :=?,"+"@Transfer_Status_Id_ :=?,"+"@Transfer_Status_Name_ :=?,"+"@Sub_Status_Id_ :=?,"+"@Sub_Status_Name_ :=?,"+"@Application_Id_Ref_ :=?,"+
	// "@Followup_Branch_Id_ :=?,"+"@Followup_Branch_Name_ :=?,"+"@Followup_Department_Id_ :=?,"+"@Followup_Department_Name_ :=?,"+"@Followup_Status_Id_ :=?,"+"@Followup_Status_Name_ :=?,"+
	// "@Followup_To_User_Id_ :=?,"+"@Followup_To_User_Name_ :=?,"+"@Next_FollowUp_Date_ :=?"+
	// ")"
    // ,[Transfer_.Student_Id,Transfer_.transfer_source,Transfer_.Login_User,Transfer_.Transfer_department_Id,
	// 	Transfer_.Transfer_Remark,Transfer_.Transfer_Status_Id,Transfer_.Transfer_Status_Name,Transfer_.Substatus_Id,Transfer_.Substatus_Name,Transfer_.Application_Id_Ref,
	// 	Transfer_.Followup_Branch_Id,Transfer_.Followup_Branch_Name,Transfer_.Followup_Department_Id,Transfer_.Followup_Department_Name,Transfer_.Followup_Status_Id,Transfer_.Followup_Status_Name,
	// 	Transfer_.Followup_To_User_Id,Transfer_.Followup_To_User_Name,Transfer_.Next_FollowUp_Date
	// ],callback);
    // },



	Save_Ielts_Details:function(Ielts_Details_,callback)
    { 
        console.log(Ielts_Details_)
    return db.query("CALL Save_Ielts_Details("+"@Ielts_Details_Id_ :=?,"+"@Slno_ :=?,"+"@Student_Id_ :=?,"+"@Ielts_Type_ :=?,"+"@Ielts_Type_Name_ :=?,"+"@Exam_Check_ :=?,"+"@Exam_Date_ :=?,"+"@Description_ :=?,"+"@Listening_ :=?,"+"@Reading_ :=?,"+"@Writing_ :=?,"+"@Speaking_ :=?,"+"@Overall_ :=?)"
    ,[Ielts_Details_.Ielts_Details_Id,Ielts_Details_.Slno,Ielts_Details_.Student_Id,
        Ielts_Details_.Ielts_Type,Ielts_Details_.Ielts_Type_Name,Ielts_Details_.Exam_Check,
        Ielts_Details_.Exam_Date,Ielts_Details_.Description,Ielts_Details_.Listening,
        Ielts_Details_.Reading,Ielts_Details_.Writing,Ielts_Details_.Speaking,Ielts_Details_.Overall],callback);
    },

	Delete_Workexperiencedetails:function(Work_Experience_Id_,callback)
    { 
   return db.query("CALL Delete_Workexperiencedetails(@Work_Experience_Id_ :=?)",[Work_Experience_Id_],callback);
    }
    ,


Delete_Visa_Task:function(Student_Task_Id_,callback)
    { 
   return db.query("CALL Delete_Visa_Task(@Student_Task_Id_ :=?)",[Student_Task_Id_],callback);
    }
    ,

Delete_Ielts_Details:function(Ielts_Details_Id_,callback)
    { 
   return db.query("CALL Delete_Ielts_Details(@Ielts_Details_Id_ :=?)",[Ielts_Details_Id_],callback);
    }
    ,

Get_WorkexperienceDetails:function(Student_Id_,callback)
    { 
        console.log(Student_Id_)
   return db.query("CALL Get_WorkexperienceDetails(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,


	Get_Visa_Task:function(Student_Id_,Task_Group_Id_,callback)
    { 
   
   return db.query("CALL Get_Visa_Task(@Student_Id_ :=?,"+"@Task_Group_Id_ :=?)",[Student_Id_,Task_Group_Id_],callback);
    }
    ,

	Get_Previsa_Task:function(Student_Id_,Task_Group_Id_,callback)
    { 
   
   return db.query("CALL Get_Previsa_Task(@Student_Id_ :=?,"+"@Task_Group_Id_ :=?)",[Student_Id_,Task_Group_Id_],callback);
    }
    ,


	Get_Preadmission_Task:function(Student_Id_,Task_Group_Id_,callback)
    { 
   
   return db.query("CALL Get_Preadmission_Task(@Student_Id_ :=?,"+"@Task_Group_Id_ :=?)",[Student_Id_,Task_Group_Id_],callback);
    }
    ,
	Refund_Approve: function (
        Fees_Receipt_Id_,
        Student_Id_temp_,
        Login_User_,
        callback
    ) {
        return db.query(
            "CALL Refund_Approve(@Fees_Receipt_Id_ :=?,@Student_Id_temp_ :=?,@Login_User_ :=?)",
            [Fees_Receipt_Id_, Student_Id_temp_, Login_User_],
            callback
        );
    },

	Reset_Notification_Count: function (User_Id_, callback) {
        return db.query(
            "CALL Reset_Notification_Count(@User_Id_ :=?)",
            [User_Id_],
            callback
        );
    },
    Get_All_Notification: function (Date_, User_Id_, login_Id_, callback) {
        return db.query(
            "CALL Get_All_Notification(@Date_ :=?,@User_Id_ :=?,@login_Id_ :=?)",
            [Date_, User_Id_, login_Id_],
            callback
        );
    },
	Get_Task_History:function(Student_Task_Id_,callback)
    { 
        
   return db.query("CALL Get_Task_History(@Student_Task_Id_ :=?)",[Student_Task_Id_],callback);
    }
    ,



// Search_Notification:function(Login_User_,Page_Index1_,Page_Index2_,callback)
//     { 
//         console.log(Login_User_,Page_Index1_,Page_Index2_)
//    return db.query("CALL Search_Notification(@Login_User_ :=?,"+"@Page_Index1_ :=?,"+"@Page_Index2_ :=?)",[Login_User_,Page_Index1_,Page_Index2_],callback);
//     }
//     ,

Search_Notification: function (
	Login_User_,
	notification_type_,
	Sort_By_,
	Page_Index1_,
	Page_Index2_,
	callback
) {
	//console.log(Login_User_, Page_Index1_, Page_Index2_);
	return db.query(
		"CALL Search_Notification(@Login_User_ :=?," +
			"@notification_type_ :=?," +
			"@Sort_By_ :=?," +
			"@Page_Index1_ :=?," +
			"@Page_Index2_ :=?)",
		[Login_User_, notification_type_,Sort_By_, Page_Index1_, Page_Index2_],
		callback
	);
},


	SendLInk:function(Student_Id_,Login_User_Id_,callback)
    { 
        console.log(Student_Id_,Login_User_Id_)
   return db.query("CALL SendLInk(@Student_Id_ :=?,"+"@Login_User_Id_ :=?)",[Student_Id_,Login_User_Id_],callback);
    }
    ,




	// Load_Application_Fees_Dropdown: function (Student_Id_,callback) {
	// 	return db.query("CALL Load_Application_Fees_Dropdown(@Student_Id_ :=?)", [Student_Id_], callback);
	// },


	Load_Application_Fees_Dropdown:function(Student_Id_,callback)
{ 
    return db.query("CALL Load_Application_Fees_Dropdown(@Student_Id_ :=?)", [Student_Id_],callback);
},

	Get_Proceeding_Details:function(Student_Id_,callback)
    { 
        console.log(Student_Id_)
   return db.query("CALL Get_Proceeding_Details(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,


	Get_Ielts_Details:function(Student_Id_,callback)
    { 
        console.log(Student_Id_)
   return db.query("CALL Get_Ielts_Details(@Student_Id_ :=?)",[Student_Id_],callback);
    }
    ,






	Save_pre_visa:function(Previsa_,callback)
    { 
        console.log(Previsa_)
    return db.query("CALL Save_pre_visa("+"@Student_Checklist_Master_Id_ :=?,"+"@Student_Id_ :=?,"+"@User_Id_ :=?,"+"@Country_Id_ :=?,"+"@Checklist_Details :=?)"
    ,[Previsa_.Student_Checklist_Master_Id,Previsa_.Student_Id,Previsa_.User_Id,Previsa_.Country_Id,JSON.stringify(Previsa_.Checklist_Details)
        ],callback);
    },

	Save_Pre_Admission:function(Preadmission_,callback)
    { 
        console.log(Preadmission_)
    return db.query("CALL Save_Pre_Admission("+"@Student_Preadmission_Checklist_Master_Id_ :=?,"+"@Student_Id_ :=?,"+"@User_Id_ :=?,"+"@Country_Id_ :=?,"+"@Checklist_Details :=?)"
    ,[Preadmission_.Student_Preadmission_Checklist_Master_Id,Preadmission_.Student_Id,Preadmission_.User_Id,Preadmission_.Country_Id,JSON.stringify(Preadmission_.Checklist_Details)
        ],callback);
    },

	Save_Refund_Request:function(Refund_Request_,callback)
    { 
   return db.query("CALL Save_Refund_Request("+
   "@Refund_Request_Id_ :=?,"+
   "@Student_Id_ :=?,"+
   "@User_Id_ :=?,"+
   "@Fees_Receipt_Id_ :=?,"+
   "@Reason_ :=?,"+
   "@Remark_ :=?"+")"
    ,[Refund_Request_.Refund_Request_Id,
        Refund_Request_.Student_Id,Refund_Request_.User_Id,Refund_Request_.Fees_Receipt_Id,
        Refund_Request_.Reason,Refund_Request_.Remark
   ],callback);
    }
    ,

	Save_Review:function(Review_,callback)
    { 
        console.log(Review_)
    return db.query("CALL Save_Review("+"@Review_Id_ :=?,"+"@Facebook_ :=?,"+"@Instagram_ :=?,"+"@Gmail_ :=?,"+"@User_Id_ :=?,"+"@Student_Id_ :=?,"+"@Facebook_Date_ :=?,"+"@Instagram_Date_ :=?,"+"@Google_Date_ :=?,"+"@Checklist_ :=?,"+"@Kit_ :=?,"+"@Ticket_ :=?,"+"@Accomodation_ :=?,"+"@Airport_Pickup_ :=?,"+"@Checklist_Date_ :=?,"+"@Kit_Date_ :=?,"+"@Ticket_Date_ :=?,"+"@Accomodation_Date_ :=?,"+"@Airport_Pickup_Date_ :=?)"
    ,[Review_.Review_Id,Review_.Facebook,Review_.Instagram,
        Review_.Gmail,Review_.User_Id,Review_.Student_Id,
		Review_.Facebook_Date,Review_.Instagram_Date,Review_.Google_Date,
		Review_.Checklist,Review_.Kit,Review_.Ticket,Review_.Accomodation,Review_.Airport_Pickup,
		Review_.Checklist_Date,Review_.Kit_Date,Review_.Ticket_Date,Review_.Accomodation_Date,Review_.Airport_Pickup_Date
        ],callback);
    },

	Delete_Refund_Request:function(Refund_Request_Id_,callback)
    { 
   return db.query("CALL Delete_Refund_Request(@Refund_Request_Id_ :=?)",[Refund_Request_Id_],callback);
    }
    ,

	Get_Refundrequestdetails: function (Student_Id_,Fees_Receipt_Id_, callback) {
        return db.query(
            "CALL Get_Refundrequestdetails(@Student_Id_ :=?,"+"@Fees_Receipt_Id_ :=?)",
            [Student_Id_,Fees_Receipt_Id_],
            callback
        );
    },

	Save_Student1: async function (Student_Data_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var Student_Value_ = 0;
			let Student_ = Student_Data_.Student;
			if (Student_ != undefined && Student_ != "" && Student_ != null)
				Student_Value_ = 1;
			var FollowUp_Value_ = 0;
			let FollowUp_ = Student_Data_.Followup;
			if (FollowUp_ != undefined && FollowUp_ != "" && FollowUp_ != null)
				FollowUp_Value_ = 1;
			var Student_Id_ = 0;
			var connection = await pool.getConnection();
			try {
				const result1 = await new storedProcedure(
					"Save_Student",
					[Student_, FollowUp_, Student_Value_, FollowUp_Value_],
					connection
				).result();

				connection.release();
				Student_Id_ = result1[0].Student_Id_;

				var result11 = [{ Student_Id_: Student_Id_ }];
				rs(result11);
			} catch (err) {
				await connection.rollback();
				rej(err);
				var result13 = [{ Student_Id_: 0 }];
				rs(result13);
			} finally {
				connection.release();
				var result13 = { Student_Id_: Student_Id_ };
			}
		});
	},
	Search_Receipt: function (Student_Id_, callback) {
		return db.query(
			"CALL Search_Receipt(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Last_FollowUp: async function (User_Id_) {
		const FollowUp = await new storedProcedure("Get_Last_FollowUp", [
			User_Id_,
		]).result();
		return { returnvalue: { FollowUp } };
	},
	Get_Lead_Load_Data: async function () {
		const Department = await new storedProcedure(
			"Dropdown_Department",
			[]
		).result();
		const Users = await new storedProcedure("Dropdown_Users", []).result();
		const Department_Status = await new storedProcedure(
			"Search_Department_Status",
			[""]
		).result();
		const Branch = await new storedProcedure("Search_Branch", [""]).result();
		const Fees = await new storedProcedure("Search_Fees", [""]).result();
		const Remark = await new storedProcedure("Search_Remarks", [""]).result();
		return {
			returnvalue: {
				Department,
				Users,
				Department_Status,
				Branch,
				Fees,
				Remark,
			},
		};
	},

	// Get_Lead_Load_Data_ByUser: async function (Login_User)
	// {

	// const Department=await (new storedProcedure('Dropdown_Department',  [])).result();
	// const Users = await (new storedProcedure('Dropdown_Users', [])).result();
	// const Department_Status = await (new storedProcedure('Search_Department_Status', [''])).result();
	// const Branch = await (new storedProcedure('Search_Branch', [''])).result();
	// const Fees = await (new storedProcedure('Search_Fees', [''])).result();
	// const Remark= await (new storedProcedure('Search_Remarks', [''])).result();
	// return {returnvalue:{Department,Users,Department_Status,Branch,Fees,Remark,Login_User}};
	// },

	Get_Lead_Load_Data_ByUser: function (Login_User, callback) {
		return db.query(
			"CALL Get_Lead_Load_Data_ByUser(@Login_User :=?)",
			[Login_User],
			callback
		);
	},

	// Search_User_Typeahead_ByUser:function(Login_Id_,User_Details_Name_,callback)
	// {
	// if (User_Details_Name_==='undefined'||User_Details_Name_===''||User_Details_Name_===undefined )
	// User_Details_Name_='';
	// return db.query("CALL Search_User_Typeahead_ByUser(@Login_Id_ :=?,@User_Details_Name_ :=?)",[Login_Id_,User_Details_Name_],callback);
	// },

	//  Search_Student: function (From_Date_, To_Date_, Is_Date_Check_, Student_Name_, Phone_Number_, Subject_Id_, University_Id_, Internship_Id_, Country_Id_, Duration_Id_, Level_Detail_Id_, Agent_Id_, Student_Status_Id_, Pointer_Start_, Pointer_Stop_, Page_Length_, callback) {
	//        return db.query("CALL Search_Student(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?,@Student_Name_ :=?,@Phone_Number_ :=?,@Subject_Id_ :=?,@University_Id_ :=?,@Internship_Id_ :=?,@Country_Id_ :=?,@Duration_Id_ :=?,@Level_Detail_Id_ :=?,@Agent_Id_ :=?,@Student_Status_Id_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)",
	//      [From_Date_, To_Date_, Is_Date_Check_, Student_Name_, Phone_Number_, Subject_Id_, University_Id_, Internship_Id_, Country_Id_, Duration_Id_, Level_Detail_Id_, Agent_Id_, Student_Status_Id_, Pointer_Start_, Pointer_Stop_, Page_Length_], callback);
	//  },
	// Search_Student: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	Enquiry_For_,
	// 	Class_,
	// 	By_User_,
	// 	Status_Id_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2,
	// 	Register_Value
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		Leads = await new storedProcedure("Search_Student", [
	// 			Fromdate_,
	// 			Todate_,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			Enquiry_For_,
	// 			Class_,
	// 			By_User_,
	// 			Status_Id_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 			Register_Value,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Search_Student: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		Enquiry_For_,
		Class_,
		Sort_By_,
		Intake_,
		Intake_Year_,
		Agent_,
		By_User_,
		By_User_Id_,
		Status_Id_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
		Register_Value
	) {
		var Leads = [];
		try {
			Leads = await new storedProcedure("Search_Student", [
				Fromdate_,
				Todate_,
				Search_By_,
				SearchbyName_,
				Department_,
				Branch_,
				Enquiry_For_,
				Class_,
				Sort_By_,
				Intake_,
				Intake_Year_,
				Agent_,
				By_User_,
				By_User_Id_,
				Status_Id_,
				Is_Date_Check_,
				Page_Index1_,
				Page_Index2_,
				Login_User_Id_,
				RowCount,
				RowCount2,
				Register_Value,
			]).result();
		} catch (e) {
			
		}

		return {
			returnvalue: {
				Leads,
			},
		};
	},

	// Search_Application_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Login_User_Id_,
	// 	Status_Value_,
	// 	Agent_Id_,
	// 	Application_status_Id_,
	// 	Intake_Id_,
	// 	Country_Id_,
	// 	University_Id_,
	// 	Is_Active_Check_,
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		//  console.log(Fromdate_, Todate_, Branch_, By_User_, Is_Date_Check_, Login_User_Id_,Status_Value_)
	// 		Leads = await new storedProcedure("Search_Application_Report", [
	// 			Fromdate_,
	// 			Todate_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Login_User_Id_,
	// 			Status_Value_,
	// 			Agent_Id_,
	// 			Application_status_Id_,
	// 			Intake_Id_,
	// 			Country_Id_,
	// 			University_Id_,
	// 			Is_Active_Check_,
	// 		]).result();
	// 	} catch (e) {
	// 		;
	// 	}

	// 	return {
	// 		returnvalue: { Leads },
	// 	};
	// },


	// Search_Notification: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Login_User_Id_,
	// 	Status_Value_,
	// 	Agent_Id_,
	// 	Application_status_Id_,
	// 	Intake_Id_,
	// 	Country_Id_,
	// 	University_Id_,
	// 	Is_Active_Check_,
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		//  console.log(Fromdate_, Todate_, Branch_, By_User_, Is_Date_Check_, Login_User_Id_,Status_Value_)
	// 		Leads = await new storedProcedure("Search_Notification", [
	// 			Fromdate_,
	// 			Todate_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Login_User_Id_,
	// 			Status_Value_,
	// 			Agent_Id_,
	// 			Application_status_Id_,
	// 			Intake_Id_,
	// 			Country_Id_,
	// 			University_Id_,
	// 			Is_Active_Check_,
	// 		]).result();
	// 	} catch (e) {
	// 		;
	// 	}

	// 	return {
	// 		returnvalue: { Leads },
	// 	};
	// },
	Load_Enquiryfor:function(callback)
	{ 
		return db.query("CALL Load_Enquiryfor()", [],callback);
	},

	Load_Shore:function(callback)
	{ 
		return db.query("CALL Load_Shore()", [],callback);
	},

	// Search_Enquiry_Conversion: async function (
	// 	Fromdate_,
	// 	ToDate_,
	// 	Login_User_Id_,
	// 	Is_Date_Check_,
	// 	Branch_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		 console.log(UserRoleString, Department_String)
	// 		Leads = await new storedProcedure("Search_Enquiry_Conversion", [
	// 			UserRoleString,
	// 			Department_String,
	// 			Fromdate_,
	// 			ToDate_,
	// 			Login_User_Id_,
	// 			Is_Date_Check_,
	// 			Branch_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },



	Search_Enquiry_Conversion: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Enquiry_Conversion", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Search_Receipt_Confirmation: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Receipt_Confirmation", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Search_Refund_Confirmation: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Refund_Confirmation", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Search_Refund_Approval: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Refund_Approval", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
		Fees_Receipt_Status_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },


	Search_Task_Data: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Status_,
		Task_,
		Pointer_Start_,
		Pointer_Stop_,
		Page_Length_
		
    ) {
		
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Task_Data", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Status_,
		Task_,
		Pointer_Start_,
		Pointer_Stop_,
		Page_Length_
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	// Search_Student_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Enquiry_Source_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2,
	// 	remarks_,
	// 	To_User_,
	// 	Status_Id_,
	// 	Register_Value_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Student_Report", [
	// 			Fromdate_,
	// 			Todate_,
	// 			UserRoleString,
	// 			Department_String,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Enquiry_Source_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 			remarks_,
	// 			To_User_,
	// 			Status_Id_,
	// 			Register_Value_,
	// 		]).result();
	// 	} catch (e) {
	// 		;
	// 	}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	// Search_Student_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Enquiry_Source_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2,
	// 	remarks_,
	// 	To_User_,
	// 	Status_Id_,
	// 	Register_Value_
    // ) {
    //     var Leads = [];
    //     try {
    //     Leads = await new storedProcedure("Search_Student_Report", [
	// 		Fromdate_,
	// 		Todate_,
	// 		Search_By_,
	// 		SearchbyName_,
	// 		Department_,
	// 		Enquiry_Source_,
	// 		Branch_,
	// 		By_User_,
	// 		Is_Date_Check_,
	// 		Page_Index1_,
	// 		Page_Index2_,
	// 		Login_User_Id_,
	// 		RowCount,
	// 		RowCount2,
	// 		remarks_,
	// 		To_User_,
	// 		Status_Id_,
	// 		Register_Value_,
    //         ]).result();
    //     } catch (e) {}

    //     return {
    //         returnvalue: {
    //             Leads,
    //         },
    //     };
    // },
	// Search_Userwise_Summary: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Userwise_Summary", [
	// 			Fromdate_,
	// 			Todate_,
	// 			UserRoleString,
	// 			Department_String,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },



	Search_Userwise_Summary: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Userwise_Summary", [
			Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	// Student_Registration_Summary: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Branch_,
	// 	Is_Date_Check_,
	// 	Login_User_Id_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		//      Department_String = Department_String.concat(" )");UserRoleString,
	// 		Leads = await new storedProcedure("Student_Registration_Summary", [
				
	// 			Fromdate_,
	// 			Todate_,
	// 			Branch_,
	// 			Is_Date_Check_,
	// 			Login_User_Id_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },


	Student_Registration_Summary: async function (
        Fromdate_,
        Todate_,
        Branch_,
        Is_Date_Check_,
        Login_User_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Student_Registration_Summary", [
            Fromdate_,
                Todate_,
                Branch_,
                Is_Date_Check_,
                Login_User_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	

	Search_Branchwise_Summary: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
	) {
		var Leads = [];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			//Department selection
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Branch=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Department in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Branch=",
					BranchId,
					" and  student.Department in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");
			Leads = await new storedProcedure("Search_Branchwise_Summary", [
				Fromdate_,
				Todate_,
				UserRoleString,
				Department_String,
				Search_By_,
				SearchbyName_,
				Department_,
				Branch_,
				By_User_,
				Is_Date_Check_,
				Page_Index1_,
				Page_Index2_,
				Login_User_Id_,
				RowCount,
				RowCount2,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	// Search_Student_Summary_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Student_Summary_Report", [
	// 			Fromdate_,
	// 			Todate_,
	// 			UserRoleString,
	// 			Department_String,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Search_Student_Summary_Report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Student_Summary_Report", [
			Fromdate_,
			Todate_,
			Search_By_,
			SearchbyName_,
			Department_,
			Branch_,
			By_User_,
			Is_Date_Check_,
			Page_Index1_,
			Page_Index2_,
			Login_User_Id_,
			RowCount,
			RowCount2,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	// Search_Work_Summary: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	By_User_,
	// 	Login_User_Id_,
	// 	look_In_Date_Value,
	// 	Branch_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		//     Department_String = Department_String.concat(" )");
	// 		console.log(UserRoleString)
	// 		Leads = await new storedProcedure("Search_Work_Summary", [
	// 			UserRoleString,
	// 			Fromdate_,
	// 			Todate_,
	// 			By_User_,
	// 			Login_User_Id_,
	// 			look_In_Date_Value,
	// 			Branch_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Search_Work_Summary: async function (
		Fromdate_,
		Todate_,
		By_User_,
		Login_User_Id_,
		look_In_Date_Value,
		Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Work_Summary", [
			Fromdate_,
			Todate_,
			By_User_,
			Login_User_Id_,
			look_In_Date_Value,
			Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	// Search_Work_Summary: async function (Fromdate_, Todate_, By_User_,Login_User_Id_)
	// {
	//   var Leads = [];
	//   try {
	//     var Roles = await (new storedProcedure('Search_User_Role', [''])).result();
	//     var userRoleId = await (new storedProcedure('Get_User_Role_Id', [Login_User_Id_])).result();
	//     var SelectdRoles = [];
	//     SelectdRoles.push({ 'User_Role_Id': userRoleId[0].Role_Id });
	//     var UserRoleString = '';
	//     var i = 0, j = 0;
	//     userRoleId = SelectdRoles[i].User_Role_Id;
	//     UserRoleString = userRoleId + ",";
	//     while (SelectdRoles.length > i) {
	//       userRoleId =parseInt( SelectdRoles[i].User_Role_Id);
	//       var foundRows = [];
	//       foundRows = Roles.filter(role_ => role_.Role_Under_Id === userRoleId);
	//       j = 0;
	//       RoleExist: boolean = false;
	//       while (foundRows.length > j) {
	//         RoleExist = false;
	//         for (var p = 0; p < SelectdRoles.length; p++) {
	//           if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	//             RoleExist = true;
	//             p = SelectdRoles.length;
	//           }
	//         }
	//         if (RoleExist === false) {
	//           SelectdRoles.push(foundRows[j]);
	//           UserRoleString = UserRoleString.concat(foundRows[j].User_Role_Id, ",");
	//         }
	//         j++;
	//       }
	//       i++;
	//     }
	//     UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	//     //Department selection
	//     var BranchId = await (new storedProcedure('Get_User_Branch', [Login_User_Id_])).result();
	// BranchId = BranchId[0].Branch_Id;
	//     var userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser', [Login_User_Id_, BranchId])).result();

	//     var SelectdDepartments = [];
	//     var foundRows = [];
	//     var Department_selection = "";
	//     var Department_Entry = "";
	//     var Department_String = '';
	//     Department_String = Department_String.concat("and((student.Branch=" + BranchId + " and student.By_User_Id=" + Login_User_Id_, " and  Department in(");
	//     foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId);
	//     i = 0;
	//     Department_selection = '0,'
	//     while (foundRows.length > i) {
	//       Department_Entry = foundRows[i].Department_Id;
	//       Department_selection = Department_selection.concat(Department_Entry + ",");
	//       i++;
	//     }
	//     Department_selection = Department_selection.substring(0, Department_selection.length - 1);
	//     Department_String = Department_String.concat(Department_selection, "))");
	//     userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser_current_Branch', [Login_User_Id_, BranchId])).result();
	//     var userBranches = await (new storedProcedure('Get_User_Branches', [Login_User_Id_, BranchId])).result();
	//     i = 0;
	//     while (userBranches.length > i) {
	//       Department_selection = '0,'
	//       BranchId = userBranches[i].Branch_Id
	//       foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId);
	//       j = 0;
	//       while (foundRows.length > j) {
	//         RoleExist = false;
	//         Department_Entry = foundRows[j].Department_Id;
	//         Department_selection = Department_selection.concat(Department_Entry + ",");
	//         j++;
	//       }
	//       Department_selection = Department_selection.substring(0, Department_selection.length - 1);
	//       Department_String = Department_String.concat(" or (student.Branch=", BranchId, " and  student.Department in(", Department_selection, "))");
	//       i++;
	//     }
	//     Department_String = Department_String.concat(" )");

	//   Leads = await (new storedProcedure('Search_Work_Summary', [UserRoleString, Department_String,Fromdate_, Todate_,By_User_,Login_User_Id_])).result();

	//   }
	//   catch (e) {
	//   }

	//   return {
	//     returnvalue: {
	//       Leads

	//     }
	//   };
	// },

	Search_Enquiry_Source_Report: async function (
		Search_FromDate_,
		To_Date_,
		Is_Date_Check_,
		Branch_,
		Login_User_Id_
	) {
		var Leads = [];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			//Department selection
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Branch=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Department in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Branch=",
					BranchId,
					" and  student.Department in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");

			Leads = await new storedProcedure("Search_Enquiry_Source_Report", [
				UserRoleString,
				Department_String,
				Search_FromDate_,
				To_Date_,
				Is_Date_Check_,
				Branch_,
				Login_User_Id_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	// Search_Registration_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Registration_Report", [
	// 			Fromdate_,
	// 			Todate_,
	// 			UserRoleString,
	// 			Department_String,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },



	// Search_Registration_Report: async function (
    //     Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
    // ) {
    //     var Leads = [];
    //     try {
    //     Leads = await new storedProcedure("Search_Registration_Report", [
	// 		Fromdate_,
	// 		Todate_,
	// 		Search_By_,
	// 		SearchbyName_,
	// 		Department_,
	// 		Branch_,
	// 		By_User_,
	// 		Is_Date_Check_,
	// 		Page_Index1_,
	// 		Page_Index2_,
	// 		Login_User_Id_,
	// 		RowCount,
	// 		RowCount2,
    //         ]).result();
    //     } catch (e) {}

    //     return {
    //         returnvalue: {
    //             Leads,
    //         },
    //     };
    // },

	Search_Registration_Report: async function (
        Fromdate_,
        Todate_,
        Search_By_,
        SearchbyName_,
        Department_,
        Branch_,
        By_User_,
        Is_Date_Check_,
        Page_Index1_,
        Page_Index2_,
        Login_User_Id_,
        RowCount,
        RowCount2,
        View_Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Registration_Report", [
            Fromdate_,
            Todate_,
            Search_By_,
            SearchbyName_,
            Department_,
            Branch_,
            By_User_,
            Is_Date_Check_,
            Page_Index1_,
            Page_Index2_,
            Login_User_Id_,
            RowCount,
            RowCount2,
            View_Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Search_Counselor_Registration_Report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
	) {
		var Leads = [];
		try {
			Leads = await new storedProcedure(
				"Search_Counselor_Registration_Report",
				[
					Fromdate_,
					Todate_,
					Search_By_,
					SearchbyName_,
					Department_,
					Branch_,
					By_User_,
					Is_Date_Check_,
					Page_Index1_,
					Page_Index2_,
					Login_User_Id_,
					RowCount,
					RowCount2,
				]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	// Search_Fees_Receipt_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2,
	// 	Fees_Id_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Fees_Receipt_Report", [
	// 			Fromdate_,
	// 			Todate_,
	// 			UserRoleString,
	// 			Department_String,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 			Fees_Id_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },
	Search_Fees_Receipt_Report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		To_Account_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
		Fees_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Fees_Receipt_Report", [
			Fromdate_,
			Todate_,
			Search_By_,
			SearchbyName_,
			Department_,
			To_Account_,
			Branch_,
			By_User_,
			Is_Date_Check_,
			Page_Index1_,
			Page_Index2_,
			Login_User_Id_,
			RowCount,
			RowCount2,
			Fees_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },


	Search_Counselor_Fees_Receipt_Report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
		Fees_Id_
	) {
		var Leads = [];
		try {
			Leads = await new storedProcedure(
				"Search_Counselor_Fees_Receipt_Report",
				[
					Fromdate_,
					Todate_,
					Search_By_,
					SearchbyName_,
					Department_,
					Branch_,
					By_User_,
					Is_Date_Check_,
					Page_Index1_,
					Page_Index2_,
					Login_User_Id_,
					RowCount,
					RowCount2,
					Fees_Id_,
				]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Search_Student_With_PhoneNumber: async function (Phone_Number_) {
		var Leads = [];
		try {
			Leads = await new storedProcedure("Search_Student_With_PhoneNumber", [
				Phone_Number_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Check_Duplicate_Student: async function (Phone_Number_, Branch_Id_) {
		var Leads = [];
		try {
			Leads = await new storedProcedure("Check_Duplicate_Student", [
				Phone_Number_,
				Branch_Id_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Search_Documentation_Report: async function (Phone_Number_, User_id_) {
		var Leads = [];
		try {
			Leads = await new storedProcedure("Search_Documentation_Report", [
				Phone_Number_,
				User_id_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Pending_FollowUp: async function (
		Department_,
		Branch_,
		By_User_,
		Login_User_Id_
	) {
		var Leads = [];
		var Leads1=[];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			//Department selection
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Followup_Branch_Id=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Followup_Department_Id in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Followup_Branch_Id=",
					BranchId,
					" and  student.Followup_Department_Id in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");
			console.log(UserRoleString, Department_String);
			Leads = await new storedProcedure("Pending_FollowUp", [
				UserRoleString,
				Department_String,
				Department_,
				Branch_,
				By_User_,
				Login_User_Id_,
			]).result();


		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},

	Pending_FollowUp: async function (
		Department_,
		Branch_,
		By_User_,
		Login_User_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Pending_FollowUp", [
			Department_,
		Branch_,
		By_User_,
		Login_User_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },


	Class_Details_Report: async function (
		Department_,
		Branch_,
		By_User_,
		Login_User_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Class_Details_Report", [
			Department_,
		Branch_,
		By_User_,
		Login_User_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	// FollowUp_Summary: async function (By_User_, Login_User_Id_) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		  console.log(UserRoleString,Department_String)
	// 		Leads = await new storedProcedure("FollowUp_Summary", [
	// 			Department_String,
	// 			UserRoleString,
	// 			By_User_,
	// 			Login_User_Id_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Class_Summary: async function (
		
				By_User_,
				Login_User_Id_,
				Branch_Id_,
				Department_Id_
    ) {
		console.log(By_User_,
			Login_User_Id_,
			Branch_Id_,
			Department_Id_)
        var Leads = [];
        try {
        Leads = await new storedProcedure("Class_Summary", [
			
			By_User_,
			Login_User_Id_,
			Branch_Id_,
			Department_Id_
            ]).result();
        } catch (e) {}
		console.log(Leads)
        return {
			
            returnvalue: {
                Leads,
				
            },
			
        };
    },

	FollowUp_Summary: async function (
        
		By_User_,
		Login_User_Id_
) {
var Leads = [];
try {
Leads = await new storedProcedure("FollowUp_Summary", [
	
	By_User_,
	Login_User_Id_,
	]).result();
} catch (e) {}

return {
	returnvalue: {
		Leads,
	},
};
},

	Delete_Receipt: function (Fees_Receipt_Id,Application_details_Id, callback) {
		return db.query(
			"CALL Delete_Receipt(@Fees_Receipt_Id :=?,@Application_details_Id :=?)",
			[Fees_Receipt_Id,Application_details_Id],
			callback
		);
	},
	Get_Dashboard_Count: async function (Login_User_Id_) {
		var Leads = [];
		var Enquiry_Source_data = [];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,User_Id_
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			//Department selection
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Followup_Branch_Id=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Followup_Department_Id in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Followup_Branch_Id=",
					BranchId,
					" and  student.Followup_Department_Id in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");
			console.log(Department_String,UserRoleString)
			Leads = await new storedProcedure("Get_Dashboard_Count", [
				UserRoleString,
				Department_String,
				Login_User_Id_,
			]).result();
			Enquiry_Source_data = await new storedProcedure(
				"Get_Enquiry_Source_data_Count",
				[UserRoleString, Department_String]
			).result();
			
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
				Enquiry_Source_data,
			},
		};
	},

	Get_Application_Dashboard_Count: async function (Login_User_Id_) {
		var Leads = [];
		var Enquiry_Source_data = [];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			//Department selection
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Followup_Branch_Id=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Followup_Department_Id in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Followup_Branch_Id=",
					BranchId,
					" and  student.Followup_Department_Id in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");
			console.log(Department_String,UserRoleString)
			Leads = await new storedProcedure("Get_Application_Dashboard_Count", [
				UserRoleString,
				Department_String,
				Login_User_Id_,
			]).result();
			Enquiry_Source_data = await new storedProcedure(
				"Get_Enquiry_Source_data_Count",
				[UserRoleString, Department_String]
			).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
				Enquiry_Source_data,
			},
		};
	},

	// Search_Employee_Summary: async function (
	// 	Fromdate_,
	// 	ToDate_,
	// 	Login_User_Id_,
	// 	Is_Date_Check_,
	// 	Branch_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		console.log(UserRoleString,Department_String)
	// 		Leads = await new storedProcedure("Search_Employee_Summary", [
	// 			UserRoleString,
	// 			Department_String,
	// 			Fromdate_,
	// 			ToDate_,
	// 			Login_User_Id_,
	// 			Is_Date_Check_,
	// 			Branch_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Search_Employee_Summary: async function (
		Fromdate_,
		ToDate_,
		Login_User_Id_,
		Is_Date_Check_,
		Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Employee_Summary", [
			Fromdate_,
		ToDate_,
		Login_User_Id_,
		Is_Date_Check_,
		Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Work_History_Send_Mail: async function (Report_Data_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			//  var Course_Apply = Student_Course_Apply_.Course_Apply;
			try {
				// const result2 = await (new storedProcedure('Load_Company', [], connection)).result();
				const result3 = await new storedProcedure(
					"Load_MailAddress_for_Report",
					[Report_Data_.Login_Id],
					connection
				).result();
				sgMail.setApiKey(result3[0].FollowUp_Target);
				// console.log(result3[0].FollowUp_Target);
				var a =
					"<table style='border-collapse: collapse;  border-spacing: 0; vertical-align: top;  width:100%; ' >";
				var b = "";
				for (var i = 0; i < Report_Data_.Report_Array.length; i++) {
					b =
						b +
						"<tr  style = ' font-weight:bold; width:100%; '><td style='padding:5px; '> " +
						Report_Data_.Report_Array[i].User_Details_Name +
						" </td>" +
						"<td style='padding:5px' >" +
						Report_Data_.Report_Array[i].Remarks_Name +
						"</td>" +
						"<td style='padding:5px'>" +
						Report_Data_.Report_Array[i].Data_Count +
						"</td></tr>";
				}
				a = a + b + "</table>";
				// let transporter = nodemailer.createTransport({
				//   host: 'smtp.gmail.com',
				//   port: 587,
				//   secure: false,
				//   requireTLS: true,
				//   auth:
				//   {
				//     user: result3[0].Email,
				//     pass: '@infedabroad10'
				//   }
				// });
				// <div style='padding-left:10px'> Dear <span style = 'color:#2f3293; font-weight:bold;'>" + result1[0].Student_Name + ",</span>"
				//     + "<br/><br/>"
				//     + "  Greetings from "+ result2[0].companyname+""
				//     + "<br/><br/>"
				//     + "Thank you for your enquiry with us."
				//     + "<br/><br/>" + "<p style = 'background:#1d5ea0;color:#eef0f0;font-family:Roboto !important; padding:12px;'>COURSE DETAILS </p>"
				//     + "<br/><br/>" + a + ""
				//     + "<br/><br/>" + ""
				//     + "<br/><br/>" + "Thanks & Regards"

				const msg = {
					to: result3[1].Email,
					from: result3[0].Email, // Change to your verified sender
					subject: "Work History",
					html:
						"<table><tr><td><div class='gmail_quote'>" +
						"<br>" +
						"<u></u>" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
						"<tbody> " +
						"<tr style='vertical-align: top;'> " +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
						"<div style='padding: 0px 0px 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						// + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
						//   + "<tbody>"
						//     + "<tr>"
						//       + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
						//         + "<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>"
						//         +"<img src='cid:myimagecid' alt='no image found'/>  "
						//         + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
						//         + "</a>"
						//       + "</td>"
						//     + "</tr>"
						//   + "</tbody>"
						// + "</table>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='background-color: #ffffff; width: 100%!important;'>" +
						"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
						"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr style='height: 451px;'>" +
						"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
						"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 170%;'>"
						"<span >" +
						"<strong>" +
						"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>  Work History -" +
						Report_Data_.Login_User +
						" <br/></span>" +
						"</strong>" +
						// + "<p style='font-size: 14px; line-height: 10%;'></p>"
						// + "<span style='font-size: 16px; line-height: 27.2px;'></span>"
						"</span>" +
						// + "</p>"

						"</p>" +
						// + "<p style='font-size: 14px; line-height: 170%;'></p>"
						"<p style='color: #003399; font-size: 14px; line-height: 170%;'>" +
						"<strong></strong>" +
						"<hr>" +
						a +
						"<p style='font-size: 11px; line-height: 160%;'>" +
						//  #024c70
						//  + "<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> "
						//  + "<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> "
						//  + result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  +" </span> "

						"</p>" +
						// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
						"</p>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
						// + "<tbody>"
						// + "<tr>"
						// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
						// + "<div align='left'>"
						// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
						// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
						// + "<strong>"
						// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
						// + "</strong>"
						// + "</span>"
						// + "</a>"
						// + "</div>"
						// + "</td>"
						// + "</tr>"
						// + "</tbody>"
						// + "</table>"

						"<br>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 160%;'>"
						// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  + " </span>"
						// + "</p>"
						"<p style='font-size: 14px; line-height: 50%;'>" +
						//   + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "
						//  + result2[0].companyname  + "<br/>"  + result2[0].Address1 + "<br/>" +result2[0].Address2 + "<br/>" +result2[0].Address3

						//   + "</span>"
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
						// + "</p>"
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div align='center'>" +
						"<div style='display: table; max-width: 244px;'>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div></td></tr></table>",

					//  + result3[0].User_Details_Name + "<br/>" +
					//   result2[0].Mobile + "<br/>" + " <img src='cid:myimagecid' alt='no image found'/><br/><br/>" +
					//   result2[0].Email + ""
					//   + "<br/><br/>" +  ""
					//    + result2[0].Address1 + "<br/>" +
					//   result2[0].Address2 + "<br/>" +
					//   result2[0].Address3 + "<br/>" +
					//    result2[0].Mobile + "</div>"
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},
	Work_History_Send_Mail_ed: async function (Report_Data_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			//  var Course_Apply = Student_Course_Apply_.Course_Apply;
			try {
				// const result2 = await (new storedProcedure('Load_Company', [], connection)).result();
				const result3 = await new storedProcedure(
					"Load_MailAddress_for_Report",
					[Report_Data_.Login_Id],
					connection
				).result();
				sgMail.setApiKey(result3[0].FollowUp_Target);
				// console.log(result3[0].FollowUp_Target);
				var a =
					"<table style='border-collapse: collapse;  border-spacing: 0; vertical-align: top;  width:100%; ' >";
				var b = "";
				for (var i = 0; i < Report_Data_.Report_Array.length; i++) {
					b =
						b +
						"<tr  style = ' font-weight:bold; width:100%; '><td style='padding:5px; '> " +
						Report_Data_.Report_Array[i].User_Details_Name +
						" </td>" +
						"<td style='padding:5px' >" +
						Report_Data_.Report_Array[i].Remarks_Name +
						"</td>" +
						"<td style='padding:5px'>" +
						Report_Data_.Report_Array[i].Data_Count +
						"</td></tr>";
				}
				a = a + b + "</table>";
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: {
						user: result3[0].Email,
						pass: "@infedabroad10",
					},
				});
				// <div style='padding-left:10px'> Dear <span style = 'color:#2f3293; font-weight:bold;'>" + result1[0].Student_Name + ",</span>"
				//     + "<br/><br/>"
				//     + "  Greetings from "+ result2[0].companyname+""
				//     + "<br/><br/>"
				//     + "Thank you for your enquiry with us."
				//     + "<br/><br/>" + "<p style = 'background:#1d5ea0;color:#eef0f0;font-family:Roboto !important; padding:12px;'>COURSE DETAILS </p>"
				//     + "<br/><br/>" + a + ""
				//     + "<br/><br/>" + ""
				//     + "<br/><br/>" + "Thanks & Regards"

				const msg = {
					to: result3[1].Email,
					from: result3[0].Email, // Change to your verified sender
					subject: "Work History",
					html:
						"<table><tr><td><div class='gmail_quote'>" +
						"<br>" +
						"<u></u>" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
						"<tbody> " +
						"<tr style='vertical-align: top;'> " +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
						"<div style='padding: 0px 0px 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						// + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
						//   + "<tbody>"
						//     + "<tr>"
						//       + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
						//         + "<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>"
						//         +"<img src='cid:myimagecid' alt='no image found'/>  "
						//         + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
						//         + "</a>"
						//       + "</td>"
						//     + "</tr>"
						//   + "</tbody>"
						// + "</table>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='background-color: #ffffff; width: 100%!important;'>" +
						"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
						"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr style='height: 451px;'>" +
						"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
						"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 170%;'>"
						"<span >" +
						"<strong>" +
						"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>  Work History -" +
						Report_Data_.Login_User +
						" <br/></span>" +
						"</strong>" +
						// + "<p style='font-size: 14px; line-height: 10%;'></p>"
						// + "<span style='font-size: 16px; line-height: 27.2px;'></span>"
						"</span>" +
						// + "</p>"

						"</p>" +
						// + "<p style='font-size: 14px; line-height: 170%;'></p>"
						"<p style='color: #003399; font-size: 14px; line-height: 170%;'>" +
						"<strong></strong>" +
						"<hr>" +
						a +
						"<p style='font-size: 11px; line-height: 160%;'>" +
						//  #024c70
						//  + "<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> "
						//  + "<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> "
						//  + result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  +" </span> "

						"</p>" +
						// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
						"</p>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
						// + "<tbody>"
						// + "<tr>"
						// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
						// + "<div align='left'>"
						// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
						// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
						// + "<strong>"
						// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
						// + "</strong>"
						// + "</span>"
						// + "</a>"
						// + "</div>"
						// + "</td>"
						// + "</tr>"
						// + "</tbody>"
						// + "</table>"

						"<br>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 160%;'>"
						// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  + " </span>"
						// + "</p>"
						"<p style='font-size: 14px; line-height: 50%;'>" +
						//   + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "
						//  + result2[0].companyname  + "<br/>"  + result2[0].Address1 + "<br/>" +result2[0].Address2 + "<br/>" +result2[0].Address3

						//   + "</span>"
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
						// + "</p>"
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div align='center'>" +
						"<div style='display: table; max-width: 244px;'>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div></td></tr></table>",

					//  + result3[0].User_Details_Name + "<br/>" +
					//   result2[0].Mobile + "<br/>" + " <img src='cid:myimagecid' alt='no image found'/><br/><br/>" +
					//   result2[0].Email + ""
					//   + "<br/><br/>" +  ""
					//    + result2[0].Address1 + "<br/>" +
					//   result2[0].Address2 + "<br/>" +
					//   result2[0].Address3 + "<br/>" +
					//    result2[0].Mobile + "</div>"
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},

	savetest() {
		var a =
			"<div class='gmail_quote'>" +
			"<br>" +
			"<u></u>" +
			"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
			"<tbody> " +
			"<tr style='vertical-align: top;'> " +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
			"<div style='padding: 10px 0px 0px; background-color: transparent;'>" +
			"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
			"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
			"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
			"<div style='width: 100%!important;'>" +
			"<div style='padding: 0px; border: 0px solid transparent;'>" +
			"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
			"<table border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='padding-right: 0px; padding-left: 0px;' align='left'>" +
			"<a href='https://unlayer.com' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNEr0p4hV7LvBHWvd2OhBcaTpo3Stw'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
			"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
			"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
			"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
			"<div style='background-color: #ffffff; width: 100%!important;'>" +
			"<div style='padding: 25px; border-top: 5px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
			"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr style='height: 451px;'>" +
			"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
			"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>" +
			"<p style='font-size: 14px; line-height: 170%;'>" +
			"<span style='color: #339966;'>" +
			"<strong>" +
			"<span style='font-size: 16px; line-height: 27.2px;'>Hi Midhula,</span>" +
			"</strong>" +
			"</span>" +
			"</p>" +
			"<p style='font-size: 14px; line-height: 10%;'></p>" +
			"<p style='font-size: 14px; line-height: 100%;'>" +
			"<span style='font-size: 16px; line-height: 27.2px;'>Thank you for signing up for your free trial with Unlayer! A world of beautiful, mobile-ready emails and landing pages await you.</span>" +
			"</p>" +
			"</p>" +
			"<p style='font-size: 14px; line-height: 170%;'></p>" +
			"<p style='font-size: 14px; line-height: 170%;'>" +
			"Course Details" +
			"<hr>" +
			"<table>" +
			"<tr>" +
			"<td>test1</td>" +
			"<td>ts</td>" +
			"</tr>" +
			"</table>" +
			"<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>" +
			"</p>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
			"<div align='left'>" +
			"<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>" +
			"<span style='display: block; padding: 15px 25px; line-height: 120%;'>" +
			"<strong>" +
			"<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>" +
			"</strong>" +
			"</span>" +
			"</a>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<br>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"<div style='padding: 0px; background-color: transparent;'>" +
			"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
			"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
			"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
			"<div style='width: 100%!important;'>" +
			"<div style='padding: 0px; border: 0px solid transparent;'>" +
			"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
			"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
			"<p style='font-size: 14px; line-height: 160%;'>" +
			"<span style='font-size: 20px; line-height: 32px;'>" +
			"<strong>Get in touch</strong>" +
			"</span>" +
			"</p>" +
			"<p style='font-size: 14px; line-height: 160%;'>" +
			"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'>+11 111 333 4444</span>" +
			"</p>" +
			"<p style='font-size: 14px; line-height: 160%;'>" +
			"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'>Info@YourCompany.com</span>" +
			"</p>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
			"<div align='center'>" +
			"<div style='display: table; max-width: 244px;'>" +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
			"<tbody>" +
			"<tr style='vertical-align: top;'>" +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
			"<a href='https://facebook.com/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://facebook.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNFtvJKw3XnCaUSv8RdvoP9vy-0ZvA'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
			"<tbody>" +
			"<tr style='vertical-align: top;'>" +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
			"<a href='https://linkedin.com/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://linkedin.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNEacgKW37ivJQFMNB-7eIoITYVZqA'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
			"<tbody>" +
			"<tr style='vertical-align: top;'>" +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
			"<a href='https://instagram.com/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://instagram.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNE7A29d6myChbFrKbjmgQNirRj_jA'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
			"<tbody>" +
			"<tr style='vertical-align: top;'>" +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
			"<a href='https://youtube.com/' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://youtube.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNFcbGo2qjbXfaJFkTFd8Y4i-7jIYA'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
			"<tbody>" +
			"<tr style='vertical-align: top;'>" +
			"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
			"<a href='https://email.com/' title='Email' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://email.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNEHtm9pytuxDKyYHWhGgz4JVmC6FQ'>" +
			"<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>" +
			"</a>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"<div style='padding: 0px; background-color: transparent;'>" +
			"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
			"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
			"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
			"<div style='width: 100%!important;'>" +
			"<div style='padding: 0px; border: 0px solid transparent;'>" +
			"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
			"<tbody>" +
			"<tr>" +
			"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
			"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</td>" +
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>" +
			"</div>";
	},
	// Search_Work_History: async function (
	// 	Fromdate_,
	// 	ToDate_,
	// 	Login_User_Id_,
	// 	Is_Date_Check_,
	// 	Branch_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student_followup.Branch=" +
	// 				BranchId +
	// 				" and student_followup.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Department in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student_followup.Branch=",
	// 				BranchId,
	// 				" and  student_followup.Department in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Work_History", [
	// 			UserRoleString,
	// 			Department_String,
	// 			Fromdate_,
	// 			ToDate_,
	// 			Login_User_Id_,
	// 			Is_Date_Check_,
	// 			Branch_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },


	Search_Work_History: async function (
		Fromdate_,
		ToDate_,
		Login_User_Id_,
		Is_Date_Check_,
		Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Work_History", [
			Fromdate_,
		ToDate_,
		Login_User_Id_,
		Is_Date_Check_,
		Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },


	Send_Welcome_Mail: async function (Send_Welcome_Mail_Data_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			try {
				// const result1 = await (new storedProcedure('Send_Welcome_Mail', [Send_Welcome_Mail_Data_.Student_Id,Send_Welcome_Mail_Data_.Login_Id], connection)).result();

				const result2 = await new storedProcedure(
					"Load_Company",
					[],
					connection
				).result();
				const result3 = await new storedProcedure(
					"Send_Welcome_Mail",
					[
						Send_Welcome_Mail_Data_.Student_Id,
						Send_Welcome_Mail_Data_.Login_Id,
					],
					connection
				).result();
				const result4 = await new storedProcedure(
					"Load_User",
					[Send_Welcome_Mail_Data_.Login_Id],
					connection
				).result();
				//  sgMail.setApiKey(result4[0].FollowUp_Target)
				//  console.log(result4[0].FollowUp_Target);
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: {
						user: "teena@ufstechnologies.com",
						pass: "teena1225",
					},
				});
				const msg = {
					to: Send_Welcome_Mail_Data_.Student_Email,
					from: result4[0].Email, // Change to your verified sender
					subject: "Welcome",
					attachments: [
						{
							filename: "companylogo1.PNG",
							type: "image/PNG",
							content_id: "myimagecid",
							content: base64str,
							disposition: "inline",
						},
					],
					html:
						"<table><tr><td><div class='gmail_quote'>" +
						"<br>" +
						"<u></u>" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
						"<tbody> " +
						"<tr style='vertical-align: top;'> " +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
						"<div style='padding: 10px 0px 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<table border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='padding-right: 0px; padding-left: 0px;' align='left'>" +
						"<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>" +
						"<img src='cid:myimagecid' alt=''/>  " +
						//+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
						"</a>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='background-color: #ffffff; width: 100%!important;'>" +
						"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
						"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr style='height: 451px;'>" +
						"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
						"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;border:none;'>" +
						"<p style='font-size: 14px; line-height: 170%;'>" +
						"<span >" +
						"<strong>" +
						"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Dear " +
						Send_Welcome_Mail_Data_.Student_Name +
						",<br/></span>" +
						"</strong>" +
						// + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
						"<span style='font-size: 16px; line-height: 27.2px;'> Hi....</span>" +
						// + result4[0].User_Details_Name + "<br/>" +result4[0].Mobile
						"</span>" +
						"</p>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
						// + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
						// + "<strong>Course Details</strong>"
						// + "<hr>"

						//  +a

						"<p style='font-size: 11px; line-height: 160%;'>" +
						//  #024c70
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> " +
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> " +
						result4[0].User_Details_Name +
						"<br/>" +
						result4[0].Mobile +
						" </span> " +
						"</p>" +
						// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
						"</p>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
						// + "<tbody>"
						// + "<tr>"
						// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
						// + "<div align='left'>"
						// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
						// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
						// + "<strong>"
						// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
						// + "</strong>"
						// + "</span>"
						// + "</a>"
						// + "</div>"
						// + "</td>"
						// + "</tr>"
						// + "</tbody>"
						// + "</table>"

						"<br>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 160%;'>"
						// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  + " </span>"
						// + "</p>"
						"<p style='font-size: 14px; line-height: 50%;'>" +
						"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " +
						result2[0].companyname +
						"<br/>" +
						result2[0].Address1 +
						"<br/>" +
						result2[0].Address2 +
						"<br/>" +
						result2[0].Address3 +
						"</span>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
						// + "</p>"
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div align='center'>" +
						"<div style='display: table; max-width: 244px;'>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div></td></tr></table>",
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},
	Send_Welcome_Mail_ed: async function (Send_Welcome_Mail_Data_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			try {
				// const result1 = await (new storedProcedure('Send_Welcome_Mail', [Send_Welcome_Mail_Data_.Student_Id,Send_Welcome_Mail_Data_.Login_Id], connection)).result();

				const result2 = await new storedProcedure(
					"Load_Company",
					[],
					connection
				).result();
				const result3 = await new storedProcedure(
					"Send_Welcome_Mail",
					[
						Send_Welcome_Mail_Data_.Student_Id,
						Send_Welcome_Mail_Data_.Login_Id,
					],
					connection
				).result();
				const result4 = await new storedProcedure(
					"Load_User",
					[Send_Welcome_Mail_Data_.Login_Id],
					connection
				).result();
				sgMail.setApiKey(result4[0].FollowUp_Target);
				console.log(result4[0].FollowUp_Target);
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: {
						user: "teena@ufstechnologies.com",
						pass: "teena1225",
					},
				});
				const msg = {
					to: Send_Welcome_Mail_Data_.Student_Email,
					from: result4[0].Email, // Change to your verified sender
					subject: "Welcome",
					attachments: [
						{
							filename: "companylogo1.PNG",
							type: "image/PNG",
							content_id: "myimagecid",
							content: base64str,
							disposition: "inline",
						},
					],
					html:
						"<table><tr><td><div class='gmail_quote'>" +
						"<br>" +
						"<u></u>" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
						"<tbody> " +
						"<tr style='vertical-align: top;'> " +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
						"<div style='padding: 10px 0px 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<table border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='padding-right: 0px; padding-left: 0px;' align='left'>" +
						"<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>" +
						"<img src='cid:myimagecid' alt=''/>  " +
						//+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
						"</a>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='background-color: #ffffff; width: 100%!important;'>" +
						"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
						"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr style='height: 451px;'>" +
						"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
						"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;border:none;'>" +
						"<p style='font-size: 14px; line-height: 170%;'>" +
						"<span >" +
						"<strong>" +
						"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Dear " +
						Send_Welcome_Mail_Data_.Student_Name +
						",<br/></span>" +
						"</strong>" +
						// + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
						"<span style='font-size: 16px; line-height: 27.2px;'> Hi....</span>" +
						// + result4[0].User_Details_Name + "<br/>" +result4[0].Mobile
						"</span>" +
						"</p>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
						// + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
						// + "<strong>Course Details</strong>"
						// + "<hr>"

						//  +a

						"<p style='font-size: 11px; line-height: 160%;'>" +
						//  #024c70
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> " +
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> " +
						result4[0].User_Details_Name +
						"<br/>" +
						result4[0].Mobile +
						" </span> " +
						"</p>" +
						// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
						"</p>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
						// + "<tbody>"
						// + "<tr>"
						// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
						// + "<div align='left'>"
						// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
						// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
						// + "<strong>"
						// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
						// + "</strong>"
						// + "</span>"
						// + "</a>"
						// + "</div>"
						// + "</td>"
						// + "</tr>"
						// + "</tbody>"
						// + "</table>"

						"<br>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 160%;'>"
						// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  + " </span>"
						// + "</p>"
						"<p style='font-size: 14px; line-height: 50%;'>" +
						"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " +
						result2[0].companyname +
						"<br/>" +
						result2[0].Address1 +
						"<br/>" +
						result2[0].Address2 +
						"<br/>" +
						result2[0].Address3 +
						"</span>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
						// + "</p>"
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div align='center'>" +
						"<div style='display: table; max-width: 244px;'>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div></td></tr></table>",
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},

	Fees_Receipt_Mail: async function (Receipt_Details_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();

			try {
				var Receipt_Array = Receipt_Details_.Receipt_Array;
				console.log(Receipt_Array);

				const result2 = await new storedProcedure(
					"Load_Company",
					[],
					connection
				).result();
				const result3 = await new storedProcedure(
					"Load_Receipt_Data_For_Mail",
					[Receipt_Details_.Login_Id],
					connection
				).result();
				// sgMail.setApiKey(result3[0].FollowUp_Target)
				// console.log(result3[0].FollowUp_Target);
				// let transporter = nodemailer.createTransport({
				//   host: 'smtp.gmail.com',
				//   port: 587,
				//   secure: false,
				//   requireTLS: true,
				//   auth:
				//   {
				//     user: result3[0].Email,
				//     pass: '@infedabroad10'
				//   }
				// });
				// console.log(result1[0].Email);
				function numberToEnglish(n, custom_join_character) {
					var string = n.toString(),
						units,
						tens,
						scales,
						start,
						end,
						chunks,
						chunksLen,
						chunk,
						ints,
						i,
						word,
						words;

					var and = custom_join_character || "and";

					/* Is number zero? */
					if (parseInt(string) === 0) {
						return "zero";
					}

					/* Array of units as words */
					units = [
						"",
						"One",
						"Two",
						"Three",
						"Four",
						"Five",
						"Six",
						"Seven",
						"Eight",
						"Nine",
						"Ten",
						"Eleven",
						"Twelve",
						"Thirteen",
						"Fourteen",
						"Fifteen",
						"Sixteen",
						"Seventeen",
						"Eighteen",
						"Nineteen",
					];

					/* Array of tens as words */
					tens = [
						"",
						"",
						"Twenty",
						"Thirty",
						"Forty",
						"Fifty",
						"Sixty",
						"Seventy",
						"Eighty",
						"Ninety",
					];

					/* Array of scales as words */
					scales = ["", "Thousand", "Lakh", "Billion"];

					/* Split user arguemnt into 3 digit chunks from right to left */
					start = string.length;
					chunks = [];
					while (start > 0) {
						end = start;
						chunks.push(string.slice((start = Math.max(0, start - 3)), end));
					}

					/* Check if function has enough scale words to be able to stringify the user argument */
					chunksLen = chunks.length;
					if (chunksLen > scales.length) {
						return "";
					}

					/* Stringify each integer in each chunk */
					words = [];
					for (i = 0; i < chunksLen; i++) {
						chunk = parseInt(chunks[i]);

						if (chunk) {
							/* Split chunk into array of individual integers */
							ints = chunks[i].split("").reverse().map(parseFloat);

							/* If tens integer is 1, i.e. 10, then add 10 to units integer */
							if (ints[1] === 1) {
								ints[0] += 10;
							}

							/* Add scale word if chunk is not zero and array item exists */
							if ((word = scales[i])) {
								words.push(word);
							}

							/* Add unit word if array item exists */
							if ((word = units[ints[0]])) {
								words.push(word);
							}

							/* Add tens word if array item exists */
							if ((word = tens[ints[1]])) {
								words.push(word);
							}

							/* Add 'and' string after units or tens integer if: */
							if (ints[0] || ints[1]) {
								/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
								if (ints[2] || (!i && chunksLen)) {
									words.push(and);
								}
							}

							/* Add hundreds word if array item exists */
							if ((word = units[ints[2]])) {
								words.push(word + " hundred");
							}
						}
					}

					return words.reverse().join(" ");
				}

				var Amount_Paid = numberToEnglish(Receipt_Array.Amount);
				var blankrow = "";
				for (var i = 0; i < 10; i++) {
					blankrow =
						blankrow +
						"<tr style='height: 18px;' >" +
						"<td style='width: 42.0124%; height: 18px;' >" +
						"<strong > </strong >" +
						"</td >" +
						"<td style='width: 32.8839%; height: 18px;' >" +
						"<strong ></strong >" +
						"</td >" +
						"</tr >";
				}
				const msg = {
					to: Receipt_Details_.Student_Email,
					from: result3[0].Email, // Change to your verified sender
					subject: "Receipt",

					html:
						"<div class='gmail_quote'>" +
						"<br>" +
						"<br>" +
						"<div class='gmail_quote'>" +
						"<br>" +
						"<br>" +
						"<table >" +
						"<tbody >" +
						"<tr >" +
						"<td >" +
						"<div class='gmail_quote' >" +
						"<br >" +
						"<u >" +
						"</u >" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;' >" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0px; vertical-align: top; min-width: 320px; margin: 0px auto; background-color: #f2f2f2; width: 100.917%; height: 492px;' cellspacing='0' cellpadding='0' >" +
						"<tbody >" +
						"<tr style='vertical-align: top;' >" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' >" +
						"<div style='padding: 10px 0px 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >&nbsp; </div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='background-color: #ffffff; width: 100%!important; color: black;' >" +
						"<br >" +
						"<div style='text-align: center;' >" +
						"<strong >RECEIPT </strong >" +
						"<br >" +
						"<span dir='auto' >" +
						"<span dir='auto' >" +
						result2[0].companyname +
						"<br >" +
						result2[0].Address1 +
						"<br >" +
						result2[0].Address2 +
						"<br >" +
						result2[0].Address3 +
						"<br >" +
						"</span >" +
						"</span >" +
						"<br >" +
						"<hr >" +
						"<br >" +
						"<table style='height: 51px; width: 98.9088%; border-collapse: collapse;' border='0' >" +
						"<tbody >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >To </td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >Date:" +
						Receipt_Array.RecepitEntry_Date +
						"</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >&nbsp;" +
						Receipt_Details_.Student_Name +
						"&nbsp;" +
						"<br >" +
						"</td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >&nbsp;Voucher No:" +
						Receipt_Array.Voucher_No +
						"&nbsp; &nbsp; &nbsp; </td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<br >" +
						"<table style='height: 145px; width: 100%; border-collapse: collapse;' border='0' >" +
						"<tbody >" +
						"<tr style='height: 145px;' >" +
						"<td style='width: 6%;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 88.0909%;' >" +
						"<table style='border-collapse: collapse; width: 100%; height: 144px;' border='1' >" +
						"<tbody >" +
						"<tr style='height: 460px;' >" +
						"<td style='width: 42.0124%; height: 126px; vertical-align: top;text-align: left;padding-left: 2%;' >" +
						"<br >" +
						Receipt_Array.Fees_Name +
						"</td >" +
						"<td style='width: 32.8839%; height: 126px; vertical-align: top;' >" +
						"<br >" +
						Receipt_Array.Amount +
						"</td >" +
						"</tr >" +
						"<tr style='height: 18px;' >" +
						"<td style='width: 42.0124%; height: 18px;text-align: left;padding-left: 2%;' >" +
						"<strong >Total </strong >" +
						"</td >" +
						"<td style='width: 32.8839%; height: 18px;' >" +
						"<strong >" +
						Receipt_Array.Amount +
						"</strong >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"</td >" +
						"<td style='width: 5.90909%; height: 145px;' >&nbsp; </td >" +
						"</tr >" +
						"<tr >" +
						"<td style='width: 6%;'>" +
						"<br >" +
						"</td >" +
						"<td style='width: 83.0909%;text-align: left;' >Amount in Words:<strong>" +
						Amount_Paid +
						"</strong>&nbsp;Only<td >" +
						"<td style='width: 5.90909%;' >" +
						"<br >" +
						"</td >" +
						"<br >" +
						"</tr >" +
						"<tr >" +
						"<td style='width: 6%;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 88.0909%;text-align: left;' >" +
						Receipt_Array.Description +
						"</td >" +
						"<td style='width: 5.90909%;' >" +
						"<br >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<table >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 2.6293%; text-align: right; height: 17px;' ></td >" +
						"<td style='width: 38%; text-align:center; height: 17px;font-family: Garamond, serif;' >This is a Computer generated Invoice and therefore does not require any signature.</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"</table >" +
						"<br >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >&nbsp; </div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >" +
						"<table id='u_content_text_2' style='font-family: arial, helvetica, sans-serif; height: 16px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0' >" +
						"<tbody >" +
						"<tr style='height: 16px;' >" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial, helvetica, sans-serif; height: 16px;' align='left' >" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;' >&nbsp;</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<br >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"</div >" +
						"</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<img style='height: 1px!important; width: 1px!important; border-width: 0!important; padding: 0!important; margin: 0!important;' src='https://ci3.googleusercontent.com/proxy/glOP-Zf5yKQ7FrB7j8aJYEz76tsEHHFqElZFVI_X18O4l15xSqilhsaUc52jZEvDOdFrt2YdVtdSak6d5ATZnub6I6KH-IoLU11AorWGE4lXoj8Ua7Ibt2TBxRa4WDrSes_xZS9xjUmHxMl74qw-m5lRxWr57piZw4MYfaeBLR1K-rzIBIBRmrieVJQAFY-AXYd0o0jEq8NXO3FHYtxPYYgjlS6y0escJB_DWYx6ygsEglrZiqiCHDS99BIXDHICSgcWm5nv1dMZnwivvgN3EWW-jhzAX2rjb92E_nQXJfKPtg0gwIrs6sYjKEUXUGwFdp2XCg_t9T-wEcXc5RrQhZ9Telzh0jInuv3f3iBEgdahylyMIpu8XBvKYSbvTOD-Jpa3ZxPw40BsceNXy2kZ3Xp9iD8-38qKV8wayFldrbA=s0-d-e1-ft#https://u22484855.ct.sendgrid.net/wf/open?upn=H7DxbHzSLIgNMbLOOtKBl7ddSD-2BG7QWg6S8fUNNgjImojUEdm5Or-2F-2BvWEpmTF1-2F604zPTIW7z8sCDZK2FzOIdRRIRiZ1BigtM2Qx6u-2B1eRFDHqvSWvq9XhslFXjIWTZVGiWD-2FvLQgsaGrUJOagCuNR4xRdSWxyvW-2F6lW5gL3tkCx3ZWK22HaijzZEAumqayxa3dWkJg-2FKVcVcZl7mIU0BGLYuO4JPKCXeL60fp6ZzDA-3D' alt='' width='1' height='1' border='0'>" +
						"</div>" +
						"<img style='height: 1px!important; width: 1px!important; border-width: 0!important; padding: 0!important; margin: 0!important;' src='https://ci3.googleusercontent.com/proxy/glOP-Zf5yKQ7FrB7j8aJYEz76tsEHHFqElZFVI_X18O4l15xSqilhsaUc52jZEvDOdFrt2YdVtdSak6d5ATZnub6I6KH-IoLU11AorWGE4lXoj8Ua7Ibt2TBxRa4WDrSes_xZS9xjUmHxMl74qw-m5lRxWr57piZw4MYfaeBLR1K-rzIBIBRmrieVJQAFY-AXYd0o0jEq8NXO3FHYtxPYYgjlS6y0escJB_DWYx6ygsEglrZiqiCHDS99BIXDHICSgcWm5nv1dMZnwivvgN3EWW-jhzAX2rjb92E_nQXJfKPtg0gwIrs6sYjKEUXUGwFdp2XCg_t9T-wEcXc5RrQhZ9Telzh0jInuv3f3iBEgdahylyMIpu8XBvKYSbvTOD-Jpa3ZxPw40BsceNXy2kZ3Xp9iD8-38qKV8wayFldrbA=s0-d-e1-ft#https://u22484855.ct.sendgrid.net/wf/open?upn=H7DxbHzSLIgNMbLOOtKBl7ddSD-2BG7QWg6S8fUNNgjImojUEdm5Or-2F-2BvWEpmTF1-2F604zPTIW7z8sCDZK2FzOIdRRIRiZ1BigtM2Qx6u-2B1eRFDHqvSWvq9XhslFXjIWTZVGiWD-2FvLQgsaGrUJOagCuNR4xRdSWxyvW-2F6lW5gL3tkCx3ZWK22HaijzZEAumqayxa3dWkJg-2FKVcVcZl7mIU0BGLYuO4JPKCXeL60fp6ZzDA-3D' alt='' width='1' height='1' border='0'>" +
						"</div>",
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},
	Fees_Receipt_Mail_ed: async function (Receipt_Details_) {
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();

			try {
				var Receipt_Array = Receipt_Details_.Receipt_Array;

				const result2 = await new storedProcedure(
					"Load_Company",
					[],
					connection
				).result();
				const result3 = await new storedProcedure(
					"Load_Receipt_Data_For_Mail",
					[Receipt_Details_.Login_Id],
					connection
				).result();
				sgMail.setApiKey(result3[0].FollowUp_Target);
				// console.log(result3[0].FollowUp_Target);
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: {
						user: result3[0].Email,
						pass: "@infedabroad10",
					},
				});
				// console.log(result1[0].Email);
				function numberToEnglish(n, custom_join_character) {
					var string = n.toString(),
						units,
						tens,
						scales,
						start,
						end,
						chunks,
						chunksLen,
						chunk,
						ints,
						i,
						word,
						words;

					var and = custom_join_character || "and";

					/* Is number zero? */
					if (parseInt(string) === 0) {
						return "zero";
					}

					/* Array of units as words */
					units = [
						"",
						"One",
						"Two",
						"Three",
						"Four",
						"Five",
						"Six",
						"Seven",
						"Eight",
						"Nine",
						"Ten",
						"Eleven",
						"Twelve",
						"Thirteen",
						"Fourteen",
						"Fifteen",
						"Sixteen",
						"Seventeen",
						"Eighteen",
						"Nineteen",
					];

					/* Array of tens as words */
					tens = [
						"",
						"",
						"Twenty",
						"Thirty",
						"Forty",
						"Fifty",
						"Sixty",
						"Seventy",
						"Eighty",
						"Ninety",
					];

					/* Array of scales as words */
					scales = ["", "Thousand", "Million", "Billion"];

					/* Split user arguemnt into 3 digit chunks from right to left */
					start = string.length;
					chunks = [];
					while (start > 0) {
						end = start;
						chunks.push(string.slice((start = Math.max(0, start - 3)), end));
					}

					/* Check if function has enough scale words to be able to stringify the user argument */
					chunksLen = chunks.length;
					if (chunksLen > scales.length) {
						return "";
					}

					/* Stringify each integer in each chunk */
					words = [];
					for (i = 0; i < chunksLen; i++) {
						chunk = parseInt(chunks[i]);

						if (chunk) {
							/* Split chunk into array of individual integers */
							ints = chunks[i].split("").reverse().map(parseFloat);

							/* If tens integer is 1, i.e. 10, then add 10 to units integer */
							if (ints[1] === 1) {
								ints[0] += 10;
							}

							/* Add scale word if chunk is not zero and array item exists */
							if ((word = scales[i])) {
								words.push(word);
							}

							/* Add unit word if array item exists */
							if ((word = units[ints[0]])) {
								words.push(word);
							}

							/* Add tens word if array item exists */
							if ((word = tens[ints[1]])) {
								words.push(word);
							}

							/* Add 'and' string after units or tens integer if: */
							if (ints[0] || ints[1]) {
								/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
								if (ints[2] || (!i && chunksLen)) {
									words.push(and);
								}
							}

							/* Add hundreds word if array item exists */
							if ((word = units[ints[2]])) {
								words.push(word + " hundred");
							}
						}
					}

					return words.reverse().join(" ");
				}

				var Amount_Paid = numberToEnglish(Receipt_Array.Amount);
				var blankrow = "";
				for (var i = 0; i < 10; i++) {
					blankrow =
						blankrow +
						"<tr style='height: 18px;' >" +
						"<td style='width: 42.0124%; height: 18px;' >" +
						"<strong > </strong >" +
						"</td >" +
						"<td style='width: 32.8839%; height: 18px;' >" +
						"<strong ></strong >" +
						"</td >" +
						"</tr >";
				}
				const msg = {
					to: Receipt_Details_.Student_Email,
					from: result3[0].Email, // Change to your verified sender
					subject: "Receipt",

					html:
						"<div class='gmail_quote'>" +
						"<br>" +
						"<br>" +
						"<div class='gmail_quote'>" +
						"<br>" +
						"<br>" +
						"<table >" +
						"<tbody >" +
						"<tr >" +
						"<td >" +
						"<div class='gmail_quote' >" +
						"<br >" +
						"<u >" +
						"</u >" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;' >" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0px; vertical-align: top; min-width: 320px; margin: 0px auto; background-color: #f2f2f2; width: 100.917%; height: 492px;' cellspacing='0' cellpadding='0' >" +
						"<tbody >" +
						"<tr style='vertical-align: top;' >" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' >" +
						"<div style='padding: 10px 0px 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >&nbsp; </div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='background-color: #ffffff; width: 100%!important; color: black;' >" +
						"<br >" +
						"<div style='text-align: center;' >" +
						"<strong >RECEIPT </strong >" +
						"<br >" +
						"<span dir='auto' >" +
						"<span dir='auto' >" +
						result2[0].companyname +
						"<br >" +
						result2[0].Address1 +
						"<br >" +
						result2[0].Address2 +
						"<br >" +
						result2[0].Address3 +
						"<br >" +
						"</span >" +
						"</span >" +
						"<br >" +
						"<hr >" +
						"<br >" +
						"<table style='height: 51px; width: 98.9088%; border-collapse: collapse;' border='0' >" +
						"<tbody >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >To </td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >Date:" +
						Receipt_Array.Entry_Date +
						"</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >&nbsp;" +
						Receipt_Details_.Student_Name +
						"&nbsp;" +
						"<br >" +
						"</td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >&nbsp;Voucher No:" +
						Receipt_Array.Voucher_No +
						"&nbsp; &nbsp; &nbsp; </td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 43%; text-align: left; height: 17px;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 44.6293%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<br >" +
						"<table style='height: 145px; width: 100%; border-collapse: collapse;' border='0' >" +
						"<tbody >" +
						"<tr style='height: 145px;' >" +
						"<td style='width: 6%;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 88.0909%;' >" +
						"<table style='border-collapse: collapse; width: 100%; height: 144px;' border='1' >" +
						"<tbody >" +
						"<tr style='height: 460px;' >" +
						"<td style='width: 42.0124%; height: 126px; vertical-align: top;text-align: left;padding-left: 2%;' >" +
						"<br >" +
						Receipt_Array.Fees_Name +
						"</td >" +
						"<td style='width: 32.8839%; height: 126px; vertical-align: top;' >" +
						"<br >" +
						Receipt_Array.Amount +
						"</td >" +
						"</tr >" +
						"<tr style='height: 18px;' >" +
						"<td style='width: 42.0124%; height: 18px;text-align: left;padding-left: 2%;' >" +
						"<strong >Total </strong >" +
						"</td >" +
						"<td style='width: 32.8839%; height: 18px;' >" +
						"<strong >" +
						Receipt_Array.Amount +
						"</strong >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"</td >" +
						"<td style='width: 5.90909%; height: 145px;' >&nbsp; </td >" +
						"</tr >" +
						"<tr >" +
						"<td style='width: 6%;'>" +
						"<br >" +
						"</td >" +
						"<td style='width: 83.0909%;text-align: left;' >Amount in Words:<strong>" +
						Amount_Paid +
						"</strong>&nbsp;Only<td >" +
						"<td style='width: 5.90909%;' >" +
						"<br >" +
						"</td >" +
						"<br >" +
						"</tr >" +
						"<tr >" +
						"<td style='width: 6%;' >" +
						"<br >" +
						"</td >" +
						"<td style='width: 88.0909%;text-align: left;' >" +
						Receipt_Array.Description +
						"</td >" +
						"<td style='width: 5.90909%;' >" +
						"<br >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<table >" +
						"<tr style='height: 17px;' >" +
						"<td style='width: 6.81816%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"<td style='width: 2.6293%; text-align: right; height: 17px;' ></td >" +
						"<td style='width: 38%; text-align:center; height: 17px;font-family: Garamond, serif;' >This is a Computer generated Invoice and therefore does not require any signature.</td >" +
						"<td style='width: 6.32735%; text-align: right; height: 17px;' >&nbsp;" +
						"</td >" +
						"</tr >" +
						"</table >" +
						"<br >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >&nbsp; </div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"<div style='padding: 0px; background-color: transparent;' >" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;' >" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;' >" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;' >" +
						"<div style='width: 100%!important;' >" +
						"<div style='padding: 0px; border: 0px solid transparent;' >" +
						"<table id='u_content_text_2' style='font-family: arial, helvetica, sans-serif; height: 16px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0' >" +
						"<tbody >" +
						"<tr style='height: 16px;' >" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial, helvetica, sans-serif; height: 16px;' align='left' >" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;' >&nbsp;</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<br >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"</div >" +
						"</div >" +
						"</td >" +
						"</tr >" +
						"</tbody >" +
						"</table >" +
						"<img style='height: 1px!important; width: 1px!important; border-width: 0!important; padding: 0!important; margin: 0!important;' src='https://ci3.googleusercontent.com/proxy/glOP-Zf5yKQ7FrB7j8aJYEz76tsEHHFqElZFVI_X18O4l15xSqilhsaUc52jZEvDOdFrt2YdVtdSak6d5ATZnub6I6KH-IoLU11AorWGE4lXoj8Ua7Ibt2TBxRa4WDrSes_xZS9xjUmHxMl74qw-m5lRxWr57piZw4MYfaeBLR1K-rzIBIBRmrieVJQAFY-AXYd0o0jEq8NXO3FHYtxPYYgjlS6y0escJB_DWYx6ygsEglrZiqiCHDS99BIXDHICSgcWm5nv1dMZnwivvgN3EWW-jhzAX2rjb92E_nQXJfKPtg0gwIrs6sYjKEUXUGwFdp2XCg_t9T-wEcXc5RrQhZ9Telzh0jInuv3f3iBEgdahylyMIpu8XBvKYSbvTOD-Jpa3ZxPw40BsceNXy2kZ3Xp9iD8-38qKV8wayFldrbA=s0-d-e1-ft#https://u22484855.ct.sendgrid.net/wf/open?upn=H7DxbHzSLIgNMbLOOtKBl7ddSD-2BG7QWg6S8fUNNgjImojUEdm5Or-2F-2BvWEpmTF1-2F604zPTIW7z8sCDZK2FzOIdRRIRiZ1BigtM2Qx6u-2B1eRFDHqvSWvq9XhslFXjIWTZVGiWD-2FvLQgsaGrUJOagCuNR4xRdSWxyvW-2F6lW5gL3tkCx3ZWK22HaijzZEAumqayxa3dWkJg-2FKVcVcZl7mIU0BGLYuO4JPKCXeL60fp6ZzDA-3D' alt='' width='1' height='1' border='0'>" +
						"</div>" +
						"<img style='height: 1px!important; width: 1px!important; border-width: 0!important; padding: 0!important; margin: 0!important;' src='https://ci3.googleusercontent.com/proxy/glOP-Zf5yKQ7FrB7j8aJYEz76tsEHHFqElZFVI_X18O4l15xSqilhsaUc52jZEvDOdFrt2YdVtdSak6d5ATZnub6I6KH-IoLU11AorWGE4lXoj8Ua7Ibt2TBxRa4WDrSes_xZS9xjUmHxMl74qw-m5lRxWr57piZw4MYfaeBLR1K-rzIBIBRmrieVJQAFY-AXYd0o0jEq8NXO3FHYtxPYYgjlS6y0escJB_DWYx6ygsEglrZiqiCHDS99BIXDHICSgcWm5nv1dMZnwivvgN3EWW-jhzAX2rjb92E_nQXJfKPtg0gwIrs6sYjKEUXUGwFdp2XCg_t9T-wEcXc5RrQhZ9Telzh0jInuv3f3iBEgdahylyMIpu8XBvKYSbvTOD-Jpa3ZxPw40BsceNXy2kZ3Xp9iD8-38qKV8wayFldrbA=s0-d-e1-ft#https://u22484855.ct.sendgrid.net/wf/open?upn=H7DxbHzSLIgNMbLOOtKBl7ddSD-2BG7QWg6S8fUNNgjImojUEdm5Or-2F-2BvWEpmTF1-2F604zPTIW7z8sCDZK2FzOIdRRIRiZ1BigtM2Qx6u-2B1eRFDHqvSWvq9XhslFXjIWTZVGiWD-2FvLQgsaGrUJOagCuNR4xRdSWxyvW-2F6lW5gL3tkCx3ZWK22HaijzZEAumqayxa3dWkJg-2FKVcVcZl7mIU0BGLYuO4JPKCXeL60fp6ZzDA-3D' alt='' width='1' height='1' border='0'>" +
						"</div>",
				};
				sgMail;
				var d = await sgMail.send(msg);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},
	// Search_Work_report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	By_User_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = SelectdRoles[i].User_Role_Id;
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student_followup.Branch=" +
	// 				BranchId +
	// 				" and student_followup.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  student_followup.Department in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student_followup.Branch=",
	// 				BranchId,
	// 				" and  student_followup.Department in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		//     Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure("Search_Work_report", [
	// 			UserRoleString,
	// 			Fromdate_,
	// 			Todate_,
	// 			Search_By_,
	// 			SearchbyName_,
	// 			Department_,
	// 			Branch_,
	// 			By_User_,
	// 			Is_Date_Check_,
	// 			Page_Index1_,
	// 			Page_Index2_,
	// 			Login_User_Id_,
	// 			RowCount,
	// 			RowCount2,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },

	Search_Work_report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Work_report", [
			Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Search_Student_Count: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
	) {
		var Leads = [];
		try {
			var Roles = await new storedProcedure("Search_User_Role", [""]).result();
			var userRoleId = await new storedProcedure("Get_User_Role_Id", [
				Login_User_Id_,
			]).result();
			var SelectdRoles = [];
			SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
			var UserRoleString = "";
			var i = 0,
				j = 0;
			userRoleId = SelectdRoles[i].User_Role_Id;
			UserRoleString = userRoleId + ",";
			while (SelectdRoles.length > i) {
				userRoleId = SelectdRoles[i].User_Role_Id;
				var foundRows = [];
				foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
				j = 0;
				RoleExist: boolean = false;
				while (foundRows.length > j) {
					RoleExist = false;
					for (var p = 0; p < SelectdRoles.length; p++) {
						if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
							RoleExist = true;
							p = SelectdRoles.length;
						}
					}
					if (RoleExist === false) {
						SelectdRoles.push(foundRows[j]);
						UserRoleString = UserRoleString.concat(
							foundRows[j].User_Role_Id,
							","
						);
					}
					j++;
				}
				i++;
			}
			UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);
			var BranchId = await new storedProcedure("Get_User_Branch", [
				Login_User_Id_,
			]).result();
			BranchId = BranchId[0].Branch_Id;
			var userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser",
				[Login_User_Id_, BranchId]
			).result();

			var SelectdDepartments = [];
			var foundRows = [];
			var Department_selection = "";
			var Department_Entry = "";
			var Department_String = "";
			Department_String = Department_String.concat(
				"and((student.Branch=" +
					BranchId +
					" and student.By_User_Id=" +
					Login_User_Id_,
				" and  Department in("
			);
			foundRows = userDepartments.filter(
				(Departments_) => Departments_.Branch_Id === BranchId
			);
			i = 0;
			Department_selection = "0,";
			while (foundRows.length > i) {
				Department_Entry = foundRows[i].Department_Id;
				Department_selection = Department_selection.concat(
					Department_Entry + ","
				);
				i++;
			}
			Department_selection = Department_selection.substring(
				0,
				Department_selection.length - 1
			);
			Department_String = Department_String.concat(Department_selection, "))");
			userDepartments = await new storedProcedure(
				"Get_Department_Permission_Byuser_current_Branch",
				[Login_User_Id_, BranchId]
			).result();
			var userBranches = await new storedProcedure("Get_User_Branches", [
				Login_User_Id_,
				BranchId,
			]).result();
			i = 0;
			while (userBranches.length > i) {
				Department_selection = "0,";
				BranchId = userBranches[i].Branch_Id;
				foundRows = userDepartments.filter(
					(Departments_) => Departments_.Branch_Id === BranchId
				);
				j = 0;
				while (foundRows.length > j) {
					RoleExist = false;
					Department_Entry = foundRows[j].Department_Id;
					Department_selection = Department_selection.concat(
						Department_Entry + ","
					);
					j++;
				}
				Department_selection = Department_selection.substring(
					0,
					Department_selection.length - 1
				);
				Department_String = Department_String.concat(
					" or (student.Branch=",
					BranchId,
					" and  student.Department in(",
					Department_selection,
					"))"
				);
				i++;
			}
			Department_String = Department_String.concat(" )");
			Leads = await new storedProcedure("Search_Student_Count", [
				Fromdate_,
				Todate_,
				UserRoleString,
				Department_String,
				Search_By_,
				SearchbyName_,
				Department_,
				Branch_,
				By_User_,
				Is_Date_Check_,
				Page_Index1_,
				Page_Index2_,
				Login_User_Id_,
				RowCount,
				RowCount2,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Search_Efficiency_Count_Report: async function (
		Fromdate_,
		Todate_,
		Branch_,
		By_User_
	) {
		var Leads = [];
		try {
			// var Roles = await (new storedProcedure('Search_User_Role', [''])).result();
			// var userRoleId = await (new storedProcedure('Get_User_Role_Id', [Login_User_Id_])).result();
			// var SelectdRoles = [];
			// SelectdRoles.push({ 'User_Role_Id': userRoleId[0].Role_Id });
			// var UserRoleString = '';
			// var i = 0, j = 0;
			// userRoleId = SelectdRoles[i].User_Role_Id;
			// UserRoleString = userRoleId + ",";
			// while (SelectdRoles.length > i) {
			//   userRoleId = SelectdRoles[i].User_Role_Id;
			//   var foundRows = [];
			//   foundRows = Roles.filter(role_ => role_.Role_Under_Id === userRoleId);
			//   j = 0;
			//   RoleExist: boolean = false;
			//   while (foundRows.length > j) {
			//     RoleExist = false;
			//     for (var p = 0; p < SelectdRoles.length; p++) {
			//       if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
			//         RoleExist = true;
			//         p = SelectdRoles.length;
			//       }
			//     }
			//     if (RoleExist === false) {
			//       SelectdRoles.push(foundRows[j]);
			//       UserRoleString = UserRoleString.concat(foundRows[j].User_Role_Id, ",");
			//     }
			//     j++;
			//   }
			//   i++;
			// }
			// UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);
			// var BranchId = await (new storedProcedure('Get_User_Branch', [Login_User_Id_])).result();
			// BranchId = BranchId[0].Branch_Id;
			// var userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser', [Login_User_Id_, BranchId])).result();

			// var SelectdDepartments = [];
			// var foundRows = [];
			// var Department_selection = "";
			// var Department_Entry = "";
			// var Department_String = '';
			// Department_String = Department_String.concat("and((student.Branch=" + BranchId + " and student.By_User_Id=" + Login_User_Id_, " and  Department in(");
			// foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId);
			// i = 0;
			// Department_selection = '0,'
			// while (foundRows.length > i) {
			//   Department_Entry = foundRows[i].Department_Id;
			//   Department_selection = Department_selection.concat(Department_Entry + ",");
			//   i++;
			// }
			// Department_selection = Department_selection.substring(0, Department_selection.length - 1);
			// Department_String = Department_String.concat(Department_selection, "))");
			// userDepartments = await (new storedProcedure('Get_Department_Permission_Byuser_current_Branch', [Login_User_Id_, BranchId])).result();
			// var userBranches = await (new storedProcedure('Get_User_Branches', [Login_User_Id_, BranchId])).result();
			// i = 0;
			// while (userBranches.length > i) {
			//   Department_selection = '0,'
			//   BranchId = userBranches[i].Branch_Id
			//   foundRows = userDepartments.filter(Departments_ => Departments_.Branch_Id === BranchId);
			//   j = 0;
			//   while (foundRows.length > j) {
			//     RoleExist = false;
			//     Department_Entry = foundRows[j].Department_Id;
			//     Department_selection = Department_selection.concat(Department_Entry + ",");
			//     j++;
			//   }
			//   Department_selection = Department_selection.substring(0, Department_selection.length - 1);
			//   Department_String = Department_String.concat(" or (student.Branch=", BranchId, " and  student.Department in(", Department_selection, "))");
			//   i++;
			// }
			//Department_String = Department_String.concat(" )");
			Leads = await new storedProcedure("Search_Efficiency_Count_Report", [
				Fromdate_,
				Todate_,
				Branch_,
				By_User_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},

	Search_Student_Count_Track_Report: async function (Fromdate_, By_User_) {
		var Leads = [];
		try {
			// var Roles = await (new storedProcedure('Search_User_Role', [''])).result();
			// var userRoleId = await (new storedProcedure('Get_User_Role_Id', [Login_User_Id_])).result();
			// var SelectdRoles = [];
			// SelectdRoles.push({ 'User_Role_Id': userRoleId[0].Role_Id });
			// var UserRoleString = '';
			// var i = 0, j = 0;
			// userRoleId = SelectdRoles[i].User_Role_Id;
			// UserRoleString = userRoleId + ",";
			// while (SelectdRoles.length > i) {
			//   userRoleId = SelectdRoles[i].User_Role_Id;
			//   var foundRows = [];
			//   foundRows = Roles.filter(role_ => role_.Role_Under_Id === userRoleId);
			//   j = 0;
			//   RoleExist: boolean = false;
			//   while (foundRows.length > j) {
			//     RoleExist = false;
			//     for (var p = 0; p < SelectdRoles.length; p++) {
			//       if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
			//         RoleExist = true;
			//         p = SelectdRoles.length;
			//       }
			//     }
			//     if (RoleExist === false) {
			//       SelectdRoles.push(foundRows[j]);
			//       UserRoleString = UserRoleString.concat(foundRows[j].User_Role_Id, ",");
			//     }
			//     j++;
			//   }
			//   i++;
			// }
			// UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

			Leads = await new storedProcedure("Search_Student_Count_Track_Report", [
				Fromdate_,
				By_User_,
			]).result();
		} catch (e) {}

		return {
			returnvalue: {
				Leads,
			},
		};
	},
	Delete_Data: function (callback) {
		return db.query("CALL Delete_Data()", callback);
	},
	// Search_Enquiry_Source_Summary_Track: async function (
	// 	Fromdate_,
	// 	ToDate_,
	// 	Login_User_Id_,
	// 	Is_Date_Check_,
	// 	Branch_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		console.log(UserRoleString,Department_String)
	// 		Leads = await new storedProcedure("Search_Enquiry_Source_Summary_Track", [
	// 			UserRoleString,
	// 			Department_String,
	// 			Fromdate_,
	// 			ToDate_,
	// 			Login_User_Id_,
	// 			Is_Date_Check_,
	// 			Branch_,
	// 		]).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },
	Search_Enquiry_Source_Summary_Track: async function (
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Enquiry_Source_Summary_Track", [
        Fromdate_,
        ToDate_,
        Login_User_Id_,
        Is_Date_Check_,
        Branch_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	
	
	
	Get_FollowUp_Details: async function (Student_Id_) {
		const FollowUp = await new storedProcedure("Get_FollowUp_Details", [
			Student_Id_,
		]).result();
		return { returnvalue: { FollowUp } };
	},
	Update_Student: function (Student_, callback) {
		return db.query(
			"CALL Update_Student(" +
				"@Student_Id_ :=?," +
				"@Agent_Id_ :=?," +
				"@Student_Name_ :=?," +
				"@Last_Name_ :=?," +
				"@Address1_ :=?," +
				"@Address2_ :=?," +
				"@Pincode_ :=?," +
				"@Email_ :=?," +
				"@Phone_Number_ :=?," +
				"@Promotional_Code_ :=?," +
				"@Student_Status_Id_ :=?," +
				"@Password_ :=?" +
				"@Enquiry_Source_Id_ :=?" +
				")",
			[
				Student_.Student_Id,
				Student_.Agent_Id,
				Student_.Student_Name,
				Student_.Last_Name,
				Student_.Address1,
				Student_.Address2,
				Student_.Pincode,
				Student_.Email,
				Student_.Phone_Number,
				Student_.Promotional_Code,
				Student_.Student_Status_Id,
				Student_.Enquiry_Source_Id,
				Student_.Password,
			],
			callback
		);
	},

	Delete_Student: function (Student_Id_, callback) {
		return db.query(
			"CALL Delete_Student(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	// Transfer_Cofirmation: function (Student_Id_,Transfer_Source_,Login_User_Id_,Department_Id_,Remark_,Transfer_Status_Id_,Transfer_Status_Name_,Sub_Status_Id_,Sub_Status_Name_,Application_Id_Ref_,Followup_Branch_Id_,Followup_Branch_Name_,Followup_Department_Id_,Followup_Department_Name_,Followup_Status_Id_,Followup_Status_Name_,Followup_To_User_Id_,Followup_To_User_Name_, callback) {

	// 	console.log(Followup_Branch_Id_,Followup_Branch_Name_,Followup_Department_Id_,Followup_Department_Name_,Followup_Status_Id_,Followup_Status_Name_,Followup_To_User_Id_,Followup_To_User_Name_)
	// 	if(Remark_==="undefined"|| Remark_===undefined)
	// 		Remark_ =""
	// 	if(Transfer_Source_==="undefined"|| Transfer_Source_===undefined)
	// 	Transfer_Source_ =""

	// 	if(Sub_Status_Name_==="undefined"|| Sub_Status_Name_===undefined)
	// 	Sub_Status_Name_ =""

	// 	return db.query(
	// 		"CALL Transfer_Cofirmation(@Student_Id_ :=?,@Transfer_Source_ :=?,@Login_User_Id_ :=?,@Department_Id_ :=?,@Remark_ :=?,@Transfer_Status_Id_ :=?,@Transfer_Status_Name_ :=?,@Sub_Status_Id_ :=?,@Sub_Status_Name_ :=?,@Application_Id_Ref_ :=?,@Followup_Branch_Id_ :=?,@Followup_Branch_Name_ :=?,@Followup_Department_Id_ :=?,@Followup_Department_Name_ :=?,@Followup_Status_Id_ :=?,@Followup_Status_Name_ :=?,@Followup_To_User_Id_ :=?,@Followup_To_User_Name_ :=?)",
	// 		[Student_Id_,Transfer_Source_,Login_User_Id_,Department_Id_,Remark_,Transfer_Status_Id_,Transfer_Status_Name_,Sub_Status_Id_,Sub_Status_Name_,Application_Id_Ref_,Followup_Branch_Id_,Followup_Branch_Name_,Followup_Department_Id_,Followup_Department_Name_,Followup_Status_Id_,Followup_Status_Name_,Followup_To_User_Id_,Followup_To_User_Name_],
	// 		callback
	// 	);
	// },


	Transfer_Cofirmation: function (Student_Id_,Transfer_Source_,Login_User_Id_,Department_Id_,Remark_,Transfer_Status_Id_,Transfer_Status_Name_,Sub_Status_Id_,Sub_Status_Name_,Application_Id_Ref_, callback) {
        if(Remark_==="undefined"|| Remark_===undefined)
            Remark_ =""
        if(Transfer_Source_==="undefined"|| Transfer_Source_===undefined)
        Transfer_Source_ =""

        if(Sub_Status_Name_==="undefined"|| Sub_Status_Name_===undefined)
        Sub_Status_Name_ =""

        return db.query(
            "CALL Transfer_Cofirmation(@Student_Id_ :=?,@Transfer_Source_ :=?,@Login_User_Id_ :=?,@Department_Id_ :=?,@Remark_ :=?,@Transfer_Status_Id_ :=?,@Transfer_Status_Name_ :=?,@Sub_Status_Id_ :=?,@Sub_Status_Name_ :=?,@Application_Id_Ref_ :=?)",
            [Student_Id_,Transfer_Source_,Login_User_Id_,Department_Id_,Remark_,Transfer_Status_Id_,Transfer_Status_Name_,Sub_Status_Id_,Sub_Status_Name_,Application_Id_Ref_],
            callback
        );
    },

	Transfer_With_Application: async function (Application_Transfer_) {
		console.log(Application_Transfer_)
		return new Promise(async (rs,rej)=>{
		  const pool = db.promise();
		  let result1;
		  var connection = await pool.getConnection();
		  await connection.beginTransaction();
		  var Application_List_ = Application_Transfer_.Application_List_Data;
		  try {
			const result1 = await(new storedProcedure('Transfer_With_Application', [Application_Transfer_.Student_Id,
				Application_Transfer_.Transfer_Source,
				Application_Transfer_.Login_User,
				Application_Transfer_.Login_Department,
				Application_List_], connection)).result();
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


	Delete_Student_File: function (Student_Id_, File_Name, callback) {
		return db.query(
			"CALL Delete_Student_File(@Student_Id_ :=?,@File_Name_ :=?)",
			[Student_Id_, File_Name],
			callback
		);
	},
	Remove_Registration: function (Student_Id_, callback) {
		return db.query(
			"CALL Remove_Registration(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Student: function (Student_Id_,To_User_, callback) {
		return db.query(
			"CALL Get_Student(@Student_Id_ :=?,@To_User_ :=?)",
			[Student_Id_,To_User_],
			callback
		);
	},
	Get_Fees_Receipt: function (Fees_Receipt_Id_, callback) {
		return db.query(
			"CALL Get_Fees_Receipt(@Fees_Receipt_Id_ :=?)",
			[Fees_Receipt_Id_],
			callback
		);
	},

	Get_Student_Agent: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Student_Agent(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_FollowUp_History: async function (Student_Id_) {
		const FollowUp = await new storedProcedure("Get_FollowUp_History", [
			Student_Id_,
		]).result();
		return { returnvalue: { FollowUp } };
	},

	Search_Student_Agent: function (
		From_Date_,
		To_Date_,
		Is_Date_Check_,
		Student_Name_,
		Phone_Number_,
		Agent_Id_,
		Student_Status_Id_,
		Enquiry_Source_Id,
		Pointer_Start_,
		Pointer_Stop_,
		Page_Length_,
		callback
	) {
		if (Student_Name_ === undefined || Student_Name_ === "undefined")
			Student_Name_ = "";

		if (Phone_Number_ === undefined || Phone_Number_ === "undefined")
			Phone_Number_ = "";

		if (Agent_Id_ === undefined || Agent_Id_ === "undefined") Agent_Id_ = 0;

		if (Pointer_Start_ === undefined || Pointer_Start_ === "undefined")
			Pointer_Start_ = "";

		if (Pointer_Stop_ === undefined || Pointer_Stop_ === "undefined")
			Pointer_Stop_ = "";
		return db.query(
			"CALL Search_Student_Agent(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?,@Student_Name_ :=?,@Phone_Number_ :=?,@Agent_Id_ :=?,@Student_Status_Id_ :=?,@Enquiry_Source_Id_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)",
			[
				From_Date_,
				To_Date_,
				Is_Date_Check_,
				Student_Name_,
				Phone_Number_,
				Agent_Id_,
				Student_Status_Id_,
				Enquiry_Source_Id_,
				Pointer_Start_,
				Pointer_Stop_,
				Page_Length_,
			],
			callback
		);
	},

	Agent_Typeahead: function (Client_Accounts_Name_, callback) {
		if (
			Client_Accounts_Name_ === undefined ||
			Client_Accounts_Name_ === "undefined"
		)
			Client_Accounts_Name_ = "";
		return db.query(
			"CALL  Agent_Typeahead(@Client_Accounts_Name_ :=?)",
			[Client_Accounts_Name_],
			callback
		);
	},

	Get_Message_Details: function (Student_Id_, callback) {
		db.query(
			"CALL Get_Message_Details(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	// Save_Student_Document: function (Post_, callback) {
	// 	return db.query(
	// 		"CALL Save_Student_Document(@Student_Id_ :=?,@Document_Id_ :=?,@Image_Detail_ :=?)",
	// 		[Post_.Student_Id, Post_.Document_Id, Post_.Image_Detail],
	// 		callback
	// 	);
	// },

	Register_Candidate: async function (Registration_Data_) {
		// return db.query("CALL Register_Candidate("+
		// "@Student_Id_ :=?,"+
		// "@User_Id_ :=?"+")"
		//  ,[Student_Id_,
		//   User_Id_
		// ],callback);
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			try {
				const result1 = await new storedProcedure(
					"Register_Candidate",
					[Registration_Data_.Student_Id, Registration_Data_.Login_Id],
					connection
				).result();

				// const result2 = await new storedProcedure(
				// 	"Load_Company",
				// 	[],
				// 	connection
				// ).result();
				// const result3 = await new storedProcedure(
				// 	"Load_MailAddress_for_Registration",
				// 	[Registration_Data_.Login_Id, Registration_Data_.Student_Id],
				// 	connection
				// ).result();
				// const result4 = await new storedProcedure(
				// 	"Load_User",
				// 	[Registration_Data_.Login_Id],
				// 	connection
				// ).result();
				// //  sgMail.setApiKey(result4[0].FollowUp_Target)
				// //  console.log(result4[0].FollowUp_Target);
				// let transporter = nodemailer.createTransport({
				// 	host: "smtp.gmail.com",
				// 	port: 587,
				// 	secure: false,
				// 	requireTLS: true,
				// 	auth: {
				// 		user: "teena@ufstechnologies.com",
				// 		pass: "teena1225",
				// 	},
				// });
				// console.log(result3[1].Email, result3[0].Email);
				// const msg = {
				// 	to: result3[1].Email,
				// 	from: result3[0].Email, // Change to your verified sender
				// 	subject: "Registration Details",
				// 	attachments: [
				// 		{
				// 			filename: "companylogo1.PNG",
				// 			type: "image/PNG",
				// 			content_id: "myimagecid",
				// 			content: base64str,
				// 			disposition: "inline",
				// 		},
				// 	],
				// 	html:
				// 		"<table><tr><td><div class='gmail_quote'>" +
				// 		"<br>" +
				// 		"<u></u>" +
				// 		"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
				// 		"<tbody> " +
				// 		"<tr style='vertical-align: top;'> " +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
				// 		"<div style='padding: 10px 0px 0px; background-color: transparent;'>" +
				// 		"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
				// 		"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
				// 		"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
				// 		"<div style='width: 100%!important;'>" +
				// 		"<div style='padding: 0px; border: 0px solid transparent;'>" +
				// 		"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr>" +
				// 		"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
				// 		"<table border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr>" +
				// 		"<td style='padding-right: 0px; padding-left: 0px;' align='left'>" +
				// 		"<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>" +
				// 		"<img src='cid:myimagecid' alt=''/>  " +
				// 		//+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
				// 		"</a>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
				// 		"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
				// 		"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
				// 		"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
				// 		"<div style='background-color: #ffffff; width: 100%!important;'>" +
				// 		"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
				// 		"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr style='height: 451px;'>" +
				// 		"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
				// 		"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;border:none;'>" +
				// 		"<p style='font-size: 14px; line-height: 170%;'>" +
				// 		"<span >" +
				// 		"<strong>" +
				// 		"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Dear " +
				// 		Registration_Data_.Student_Name +
				// 		",<br/></span>" +
				// 		"</strong>" +
				// 		// + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
				// 		"<span style='font-size: 16px; line-height: 27.2px;'>Your Registration with our company has done Successfully.</span>" +
				// 		// + result4[0].User_Details_Name + "<br/>" +result4[0].Mobile
				// 		"</span>" +
				// 		"</p>" +
				// 		"</p>" +
				// 		// + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
				// 		// + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
				// 		// + "<strong>Course Details</strong>"
				// 		// + "<hr>"

				// 		//  +a

				// 		"<p style='font-size: 11px; line-height: 160%;'>" +
				// 		//  #024c70
				// 		"<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> " +
				// 		"<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> " +
				// 		result4[0].User_Details_Name +
				// 		"<br/>" +
				// 		result4[0].Mobile +
				// 		" </span> " +
				// 		"</p>" +
				// 		// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
				// 		"</p>" +
				// 		"</div>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
				// 		// + "<tbody>"
				// 		// + "<tr>"
				// 		// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
				// 		// + "<div align='left'>"
				// 		// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
				// 		// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
				// 		// + "<strong>"
				// 		// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
				// 		// + "</strong>"
				// 		// + "</span>"
				// 		// + "</a>"
				// 		// + "</div>"
				// 		// + "</td>"
				// 		// + "</tr>"
				// 		// + "</tbody>"
				// 		// + "</table>"

				// 		"<br>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"<div style='padding: 0px; background-color: transparent;'>" +
				// 		"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
				// 		"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
				// 		"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
				// 		"<div style='width: 100%!important;'>" +
				// 		"<div style='padding: 0px; border: 0px solid transparent;'>" +
				// 		"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr>" +
				// 		"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
				// 		"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
				// 		// + "<p style='font-size: 14px; line-height: 160%;'>"
				// 		// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
				// 		//  + " </span>"
				// 		// + "</p>"
				// 		"<p style='font-size: 14px; line-height: 50%;'>" +
				// 		"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " +
				// 		result2[0].companyname +
				// 		"<br/>" +
				// 		result2[0].Address1 +
				// 		"<br/>" +
				// 		result2[0].Address2 +
				// 		"<br/>" +
				// 		result2[0].Address3 +
				// 		"</span>" +
				// 		"</p>" +
				// 		// + "<p style='font-size: 14px; line-height: 50%;'>"
				// 		// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
				// 		// + "</p>"
				// 		// + "<p style='font-size: 14px; line-height: 50%;'>"
				// 		// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
				// 		// + "</p>"
				// 		// + "<p style='font-size: 14px; line-height: 50%;'>"
				// 		// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
				// 		// + "</p>"
				// 		// + "<p style='font-size: 14px; line-height: 50%;'>"
				// 		// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
				// 		// + "</p>"
				// 		"</div>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr>" +
				// 		"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
				// 		"<div align='center'>" +
				// 		"<div style='display: table; max-width: 244px;'>" +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
				// 		"<tbody>" +
				// 		"<tr style='vertical-align: top;'>" +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
				// 		// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
				// 		// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
				// 		// + "</a>"
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
				// 		"<tbody>" +
				// 		"<tr style='vertical-align: top;'>" +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
				// 		// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
				// 		// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
				// 		// + "</a>"
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
				// 		"<tbody>" +
				// 		"<tr style='vertical-align: top;'>" +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
				// 		// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
				// 		// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
				// 		// + "</a>"
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
				// 		"<tbody>" +
				// 		"<tr style='vertical-align: top;'>" +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
				// 		// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
				// 		// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
				// 		// + "</a>"
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
				// 		"<tbody>" +
				// 		"<tr style='vertical-align: top;'>" +
				// 		"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
				// 		// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
				// 		// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
				// 		// + "</a>"
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"<div style='padding: 0px; background-color: transparent;'>" +
				// 		"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
				// 		"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
				// 		"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
				// 		"<div style='width: 100%!important;'>" +
				// 		"<div style='padding: 0px; border: 0px solid transparent;'>" +
				// 		"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
				// 		"<tbody>" +
				// 		"<tr>" +
				// 		"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
				// 		"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
				// 		"</div>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</div>" +
				// 		"</td>" +
				// 		"</tr>" +
				// 		"</tbody>" +
				// 		"</table>" +
				// 		"</div>" +
				// 		"</div></td></tr></table>",
				// };
				// sgMail;
				// var d = await sgMail.send(msg);
				// console.log(d);
				// await connection.commit();
				// connection.release();
				rs(result1);
			} catch (err) {
				;
				await connection.rollback();
				rej(err);
			}
		});
	},
	Register_Candidate_ed: async function (Registration_Data_) {
		// return db.query("CALL Register_Candidate("+
		// "@Student_Id_ :=?,"+
		// "@User_Id_ :=?"+")"
		//  ,[Student_Id_,
		//   User_Id_
		// ],callback);
		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();
			try {
				const result1 = await new storedProcedure(
					"Register_Candidate",
					[Registration_Data_.Student_Id, Registration_Data_.Login_Id],
					connection
				).result();

				const result2 = await new storedProcedure(
					"Load_Company",
					[],
					connection
				).result();
				const result3 = await new storedProcedure(
					"Load_MailAddress_for_Registration",
					[Registration_Data_.Login_Id, Registration_Data_.Student_Id],
					connection
				).result();
				const result4 = await new storedProcedure(
					"Load_User",
					[Registration_Data_.Login_Id],
					connection
				).result();
				sgMail.setApiKey(result4[0].FollowUp_Target);
				console.log(result4[0].FollowUp_Target);
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: {
						user: result4[0].Email,
						pass: "@infedabroad10",
					},
				});
				const msg = {
					to: result3[1].Email,
					from: result3[0].Email, // Change to your verified sender
					subject: "Registration Details",
					attachments: [
						{
							filename: "companylogo1.PNG",
							type: "image/PNG",
							content_id: "myimagecid",
							content: base64str,
							disposition: "inline",
						},
					],
					html:
						"<table><tr><td><div class='gmail_quote'>" +
						"<br>" +
						"<u></u>" +
						"<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> " +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> " +
						"<tbody> " +
						"<tr style='vertical-align: top;'> " +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> " +
						"<div style='padding: 10px 0px 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<table border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='padding-right: 0px; padding-left: 0px;' align='left'>" +
						"<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>" +
						"<img src='cid:myimagecid' alt=''/>  " +
						//+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
						"</a>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px 0px 10px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='background-color: #ffffff; width: 100%!important;'>" +
						"<div style='padding: 25px; border-top: 0px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>" +
						"<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr style='height: 451px;'>" +
						"<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>" +
						"<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;border:none;'>" +
						"<p style='font-size: 14px; line-height: 170%;'>" +
						"<span >" +
						"<strong>" +
						"<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Dear " +
						Registration_Data_.Student_Name +
						",<br/></span>" +
						"</strong>" +
						// + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
						"<span style='font-size: 16px; line-height: 27.2px;'>Your Registration with our company has done Successfully.</span>" +
						// + result4[0].User_Details_Name + "<br/>" +result4[0].Mobile
						"</span>" +
						"</p>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
						// + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
						// + "<strong>Course Details</strong>"
						// + "<hr>"

						//  +a

						"<p style='font-size: 11px; line-height: 160%;'>" +
						//  #024c70
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> " +
						"<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> " +
						result4[0].User_Details_Name +
						"<br/>" +
						result4[0].Mobile +
						" </span> " +
						"</p>" +
						// + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
						"</p>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						// + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
						// + "<tbody>"
						// + "<tr>"
						// + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
						// + "<div align='left'>"
						// + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
						// + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
						// + "<strong>"
						// + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
						// + "</strong>"
						// + "</span>"
						// + "</a>"
						// + "</div>"
						// + "</td>"
						// + "</tr>"
						// + "</tbody>"
						// + "</table>"

						"<br>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>" +
						// + "<p style='font-size: 14px; line-height: 160%;'>"
						// + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
						//  + " </span>"
						// + "</p>"
						"<p style='font-size: 14px; line-height: 50%;'>" +
						"<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " +
						result2[0].companyname +
						"<br/>" +
						result2[0].Address1 +
						"<br/>" +
						result2[0].Address2 +
						"<br/>" +
						result2[0].Address3 +
						"</span>" +
						"</p>" +
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'><strong>"+ result2[0].companyname+"</strong></span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> " + result2[0].Address1 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address2 + "<br/> </span>"
						// + "</p>"
						// + "<p style='font-size: 14px; line-height: 50%;'>"
						// + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "+result2[0].Address3 + "<br/> </span>"
						// + "</p>"
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>" +
						"<div align='center'>" +
						"<div style='display: table; max-width: 244px;'>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>" +
						"<tbody>" +
						"<tr style='vertical-align: top;'>" +
						"<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>" +
						// + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
						// + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
						// + "</a>"
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"<div style='padding: 0px; background-color: transparent;'>" +
						"<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>" +
						"<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>" +
						"<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>" +
						"<div style='width: 100%!important;'>" +
						"<div style='padding: 0px; border: 0px solid transparent;'>" +
						"<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>" +
						"<tbody>" +
						"<tr>" +
						"<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>" +
						"<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</td>" +
						"</tr>" +
						"</tbody>" +
						"</table>" +
						"</div>" +
						"</div></td></tr></table>",
				};
				sgMail;
				var d = await sgMail.send(msg);
				console.log(d);
				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				;
				await connection.rollback();
				rej(err);
			}
		});
	},
	Get_Student_Course_Apply: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Student_Course_Apply(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Student_Details: function (Student_Id_, callback) {
		db.query(
			"CALL Get_Student_Details(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	Get_Student_Course_Selection: function (Student_Course_Apply_Id_, callback) {
		db.query(
			"CALL Get_Student_Course_Selection(@Student_Course_Apply_Id_ :=?)",
			[Student_Course_Apply_Id_],
			callback
		);
	},

	Forgot_Password_Student: async function (Data) {
		var Email_ = Data.Email;

		return new Promise(async (rs, rej) => {
			const pool = db.promise();
			let result1;
			var connection = await pool.getConnection();
			await connection.beginTransaction();

			try {
				const result1 = await new storedProcedure(
					"Check_Student_Mail",
					[Email_],
					connection
				).result();
				if (result1[0].Student_Id >= 0) {
					let transporter = nodemailer.createTransport({
						host: "smtp.gmail.com",
						port: 587,
						secure: false,
						requireTLS: true,
						auth: {
							user: "annu@ufstechnologies.com",
							pass: "annu@ufs2896",
						},
					});
					const mailOptions = {
						from: "annu@ufstechnologies.com",
						to: Email_,
						subject: "Forgot Password Studyvisafinder",
						html:
							"Dear " +
							result1[0].Student_Name +
							"" +
							"<br/>We have received your Forgot password request. Following is your password to login on Studyvisafinder Console.<br/>" +
							"<br></br>" +
							"<br/> Password : " +
							result1[0].Password +
							" <br/>" +
							"<br></br>" +
							"<br/> Once logged in successfully, you will need to change the above password. <br/>" +
							"<br></br>" +
							"<br/> Best regards, <br/>" +
							"<br/> Studyvisafinder<br/>" +
							"<br></br>" +
							"<br/> Replies to this message are undeliverable and will not reach Studyvisafinder <br/>" +
							"<br/> Please do not reply. <br/>" +
							"<br/><br/>",
					};

					transporter.sendMail(mailOptions, function (err, info) {
						if (err) return 0;
						else return 1;
					});
				} else {
					return 0;
				}

				await connection.commit();
				connection.release();
				rs(result1);
			} catch (err) {
				await connection.rollback();
				rej(err);
			}
		});
	},
	Save_Student_Import: function (Student_Details, callback) {
		return db.query(
			"CALL Save_Student_Import(@Student_Import_Details_ :=?,@By_User_Id_ :=?,@Branch_ :=?,@Department_ :=?,@Status_ :=?,@Enquiry_Source_ :=?,@Next_FollowUp_Date_ :=?,@Login_Branch_ :=?)",
			[
				JSON.stringify(Student_Details.Student_Import_Details),
				Student_Details.By_User_Id,
				Student_Details.Branch,
				Student_Details.Department,
				Student_Details.Status,
				Student_Details.Enquiry_Source,
				Student_Details.Next_FollowUp_Date,
				Student_Details.Login_Branch,
			],
			callback
		);
	},


	Search_Users_Import: function (callback) {
		
		return db.query(
			"CALL Search_Users_Import()",
			[],
			callback
		);
	},

	Save_Data_Migration: function (Student_Details, callback) {

		//console.log(Student_Details.Student_Import_Details);
				return db.query(
					"CALL Save_Data_Migration(@Student_Import_Details_ :=?,@By_User_Id_ :=?,@Branch_ :=?,@Department_ :=?,@Status_ :=?,@To_User_ :=?,@Enquiry_Source_ :=?,@Next_FollowUp_Date_ :=?,@Login_Branch_ :=?,@User_Sub_Data_ :=?)",
					[
						JSON.stringify(Student_Details.Student_Import_Details),
						Student_Details.By_User_Id,
						Student_Details.Branch,
						Student_Details.Department,
						Student_Details.Status,
						Student_Details.To_User,
						Student_Details.Enquiry_Source,
						Student_Details.Next_FollowUp_Date,
						Student_Details.Login_Branch,
						JSON.stringify(Student_Details.User_Sub_Data),
					],
					callback
				);
			},
		

	Get_FollowUp_History_Withdate: async function (Student_Id_) {
				const FollowUp = await new storedProcedure("Get_FollowUp_History_Withdate", [
				  Student_Id_,
				]).result();
				return { returnvalue: { FollowUp } };
			  },


	Save_Student_Report_FollowUp: function (Student_Details, callback) {
		console.log(Student_Details);
	
		return db.query(
			"CALL Save_Student_Report_FollowUp(@Student_Selected_Details_ :=?,@By_User_Id_ :=?,@Branch_ :=?,@Branch_Name_ :=?,@By_User_Name_ :=?)",
			[
				JSON.stringify(Student_Details.Student_Selected_Details),
				Student_Details.By_User_Id,
				Student_Details.Branch,
				// Student_Details.User_Id,
				Student_Details.Branch_Name,
				// Student_Details.User_Name,
				Student_Details.By_User_Name,
			],
			callback
		);
	},

	Delete_Student_Report: function (Student_, callback) {
		return db.query(
			"CALL Delete_Student_Report(@Student_ :=?)",
			[JSON.stringify(Student_.Delete_Data_Details)],
			callback
		);
	},

	Save_FollowUp: function (Student_Details, callback) {
		return db.query(
			"CALL Save_FollowUp(@Student_Id_ :=?,@By_User_Id_ :=?,@Branch_ :=?,@Department_ :=?,@Status_ :=?,@User_Id_ :=?,@Next_FollowUp_Date_ :=?,@Remark_:=?,@Remark_Id_:=?,@Class_Id_:=?,@Class_Name_:=?,@Sub_Status_Id_:=?,@Sub_Status_Name_:=?,@Department_Status_Name_:=?,@Branch_Name_:=?,@Department_Name_:=?,@By_User_Name_:=?,@To_User_Name_:=?,@Department_FollowUp_:=?)",
			[
				Student_Details.Student_Id,
				Student_Details.By_User_Id,
				Student_Details.Branch,
				Student_Details.Department,
				Student_Details.Status,
				Student_Details.User_Id,
				Student_Details.Next_FollowUp_Date,
				Student_Details.Remark,
				Student_Details.Remark_Id,
				Student_Details.Class_Id,
			    Student_Details.Class_Name,
				Student_Details.Sub_Status_Id,
			    Student_Details.Sub_Status_Name,
				Student_Details.Department_Status_Name,
				Student_Details.Branch_Name,
				Student_Details.Department_Name,
				Student_Details.By_User_Name,
				Student_Details.To_User_Name,
				Student_Details.Department_FollowUp,

			],
			callback
		);
	},
	Search_Student_Import: function (
		From_Date_,
		To_Date_,
		Is_Date_Check_,
		callback
	) {
		return db.query(
			"CALL Search_Student_Import(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?)",
			[From_Date_, To_Date_, Is_Date_Check_],
			callback
		);
	},

	Get_Menu_Status: function (Menu_Id_, Login_User_, callback) {
		return db.query(
			"CALL Get_Menu_Status(@Menu_Id_ :=?,@Login_User_:=?)",
			[Menu_Id_, Login_User_],
			callback
		);
	},

	Get_Menu_Status_Multiple: function (Menu_Id_, Login_User_, callback) {
		return db.query(
			"CALL Get_Menu_Status_Multiple(@Menu_Id_ :=?,@Login_User_:=?)",
			[Menu_Id_, Login_User_],
			callback
		);
	},
	// Student_Registration_By_Enquirysource: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Branch_,
	// 	Is_Date_Check_,
	// 	Login_User_Id_
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		//      Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure(
	// 			"Student_Registration_By_Enquirysource",
	// 			[
	// 				UserRoleString,
	// 				Fromdate_,
	// 				Todate_,
	// 				Branch_,
	// 				Is_Date_Check_,
	// 				Login_User_Id_,
	// 			]
	// 		).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },


	Student_Registration_By_Enquirysource: async function (
		Fromdate_,
		Todate_,
		Branch_,
		Is_Date_Check_,
		Login_User_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Student_Registration_By_Enquirysource", [
			Fromdate_,
		Todate_,
		Branch_,
		Is_Date_Check_,
		Login_User_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	// Student_Registration_By_Enquirysource_Report: async function (
	// 	Fromdate_,
	// 	Todate_,
	// 	Search_By_,
	// 	SearchbyName_,
	// 	Department_,
	// 	Branch_,
	// 	Enquiry_Source_,
	// 	Is_Date_Check_,
	// 	Page_Index1_,
	// 	Page_Index2_,
	// 	Login_User_Id_,
	// 	RowCount,
	// 	RowCount2
	// ) {
	// 	var Leads = [];
	// 	try {
	// 		var Roles = await new storedProcedure("Search_User_Role", [""]).result();
	// 		var userRoleId = await new storedProcedure("Get_User_Role_Id", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		var SelectdRoles = [];
	// 		SelectdRoles.push({ User_Role_Id: userRoleId[0].Role_Id });
	// 		var UserRoleString = "";
	// 		var i = 0,
	// 			j = 0;
	// 		userRoleId = SelectdRoles[i].User_Role_Id;
	// 		UserRoleString = userRoleId + ",";
	// 		while (SelectdRoles.length > i) {
	// 			userRoleId = parseInt(SelectdRoles[i].User_Role_Id);
	// 			var foundRows = [];
	// 			foundRows = Roles.filter((role_) => role_.Role_Under_Id === userRoleId);
	// 			j = 0;
	// 			RoleExist: boolean = false;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				for (var p = 0; p < SelectdRoles.length; p++) {
	// 					if (SelectdRoles[p].User_Role_Id === foundRows[j].User_Role_Id) {
	// 						RoleExist = true;
	// 						p = SelectdRoles.length;
	// 					}
	// 				}
	// 				if (RoleExist === false) {
	// 					SelectdRoles.push(foundRows[j]);
	// 					UserRoleString = UserRoleString.concat(
	// 						foundRows[j].User_Role_Id,
	// 						","
	// 					);
	// 				}
	// 				j++;
	// 			}
	// 			i++;
	// 		}
	// 		UserRoleString = UserRoleString.substring(0, UserRoleString.length - 1);

	// 		//Department selection
	// 		var BranchId = await new storedProcedure("Get_User_Branch", [
	// 			Login_User_Id_,
	// 		]).result();
	// 		BranchId = BranchId[0].Branch_Id;
	// 		var userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser",
	// 			[Login_User_Id_, BranchId]
	// 		).result();

	// 		var SelectdDepartments = [];
	// 		var foundRows = [];
	// 		var Department_selection = "";
	// 		var Department_Entry = "";
	// 		var Department_String = "";
	// 		Department_String = Department_String.concat(
	// 			"and((student.Followup_Branch_Id=" +
	// 				BranchId +
	// 				" and student.By_User_Id=" +
	// 				Login_User_Id_,
	// 			" and  Followup_Department_Id in("
	// 		);
	// 		foundRows = userDepartments.filter(
	// 			(Departments_) => Departments_.Branch_Id === BranchId
	// 		);
	// 		i = 0;
	// 		Department_selection = "0,";
	// 		while (foundRows.length > i) {
	// 			Department_Entry = foundRows[i].Department_Id;
	// 			Department_selection = Department_selection.concat(
	// 				Department_Entry + ","
	// 			);
	// 			i++;
	// 		}
	// 		Department_selection = Department_selection.substring(
	// 			0,
	// 			Department_selection.length - 1
	// 		);
	// 		Department_String = Department_String.concat(Department_selection, "))");
	// 		userDepartments = await new storedProcedure(
	// 			"Get_Department_Permission_Byuser_current_Branch",
	// 			[Login_User_Id_, BranchId]
	// 		).result();
	// 		var userBranches = await new storedProcedure("Get_User_Branches", [
	// 			Login_User_Id_,
	// 			BranchId,
	// 		]).result();
	// 		i = 0;
	// 		while (userBranches.length > i) {
	// 			Department_selection = "0,";
	// 			BranchId = userBranches[i].Branch_Id;
	// 			foundRows = userDepartments.filter(
	// 				(Departments_) => Departments_.Branch_Id === BranchId
	// 			);
	// 			j = 0;
	// 			while (foundRows.length > j) {
	// 				RoleExist = false;
	// 				Department_Entry = foundRows[j].Department_Id;
	// 				Department_selection = Department_selection.concat(
	// 					Department_Entry + ","
	// 				);
	// 				j++;
	// 			}
	// 			Department_selection = Department_selection.substring(
	// 				0,
	// 				Department_selection.length - 1
	// 			);
	// 			Department_String = Department_String.concat(
	// 				" or (student.Followup_Branch_Id=",
	// 				BranchId,
	// 				" and  student.Followup_Department_Id in(",
	// 				Department_selection,
	// 				"))"
	// 			);
	// 			i++;
	// 		}
	// 		Department_String = Department_String.concat(" )");
	// 		Leads = await new storedProcedure(
	// 			"Student_Registration_By_Enquirysource_Report",
	// 			[
	// 				Fromdate_,
	// 				Todate_,
	// 				UserRoleString,
	// 				Department_String,
	// 				Search_By_,
	// 				SearchbyName_,
	// 				Department_,
	// 				Branch_,
	// 				Enquiry_Source_,
	// 				Is_Date_Check_,
	// 				Page_Index1_,
	// 				Page_Index2_,
	// 				Login_User_Id_,
	// 				RowCount,
	// 				RowCount2,
	// 			]
	// 		).result();
	// 	} catch (e) {}

	// 	return {
	// 		returnvalue: {
	// 			Leads,
	// 		},
	// 	};
	// },
	
	Student_Registration_By_Enquirysource_Report: async function (
		Fromdate_,
			Todate_,
			Search_By_,
			SearchbyName_,
			Department_,
			Branch_,
			Enquiry_Source_,
			Is_Date_Check_,
			Page_Index1_,
			Page_Index2_,
			Login_User_Id_,
			RowCount,
			RowCount2
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Student_Registration_By_Enquirysource_Report", [
			Fromdate_,
			Todate_,
			Search_By_,
			SearchbyName_,
			Department_,
			Branch_,
			Enquiry_Source_,
			Is_Date_Check_,
			Page_Index1_,
			Page_Index2_,
			Login_User_Id_,
			RowCount,
			RowCount2,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },

	Get_Resume_Photo: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Resume_Photo(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_MOI_Photo: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_MOI_Photo(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	Get_SOP_Photo: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_SOP_Photo(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_IELTS_Photo: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_IELTS_Photo(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Resume_Mode_Dropdown: function (callback) {
		return db.query("CALL Resume_Mode_Dropdown()", [], callback);
	},
	Passport_Mode_Dropdown: function (callback) {
		return db.query("CALL Passport_Mode_Dropdown()", [], callback);
	},
	LOR1_Mode_Dropdown: function (callback) {
		return db.query("CALL LOR1_Mode_Dropdown()", [], callback);
	},
	Task_Status_Dropdown: function (callback) {
		return db.query("CALL Task_Status_Dropdown()", [], callback);
	},

	Task_Item_Dropdown: function (Task_Group_Id_,callback) {
		console.log(Task_Group_Id_)
		return db.query("CALL Task_Item_Dropdown(@Task_Group_Id_ :=?)", [Task_Group_Id_], callback);
	},

	Task_Item_Dropdown_All: function (callback) {
		
		return db.query("CALL Task_Item_Dropdown_All()", [], callback);
	},

	LOR2_Mode_Dropdown: function (callback) {
		return db.query("CALL LOR2_Mode_Dropdown()", [], callback);
	},
	MOI_Mode_Dropdown: function (callback) {
		return db.query("CALL MOI_Mode_Dropdown()", [], callback);
	},
	SOP_Mode_Dropdown: function (callback) {
		return db.query("CALL SOP_Mode_Dropdown()", [], callback);
	},
	IELTS_Mode_Dropdown: function (callback) {
		return db.query("CALL IELTS_Mode_Dropdown()", [], callback);
	},
	Load_application_status: function (callback) {
		return db.query("CALL Load_application_status()", [], callback);
	},
	Save_ApplicationDetails: function (ApplicationDetails_, callback) {
		console.log(ApplicationDetails_);
		return db.query(
			"CALL Save_ApplicationDetails(" +
				"@Application_details_Id_ :=?," +
				"@Student_Id_ :=?," +
				"@Country_Id_ :=?," +
				"@Country_Name_ :=?," +
				"@University_Id_ :=?," +
				"@University_Name_ :=?," +
				"@Course_Id_ :=?," +
				"@Course_Name_ :=?," +
				"@intake_Id_ :=?," +
				"@intake_Name_ :=?," +
				"@Intake_Year_Id_ :=?," +
				"@Intake_Year_Name_ :=?," +
				"@Date_Of_Applying_ :=?," +
				"@Remark_ :=?," +
				"@Application_status_Id_ :=?," +
				"@Application_Status_Name_ :=?," +
				"@Agent_Id_ :=?," +
				"@Agent_Name_ :=?" +
				")",
			[
				ApplicationDetails_.Application_details_Id,
				ApplicationDetails_.Student_Id,
				ApplicationDetails_.Country_Id,
				ApplicationDetails_.Country_Name,
				ApplicationDetails_.University_Id,
				ApplicationDetails_.University_Name,
				ApplicationDetails_.Course_Id,
				ApplicationDetails_.Course_Name,
				ApplicationDetails_.intake_Id,
				ApplicationDetails_.intake_Name,
				ApplicationDetails_.Intake_Year_Id,
				ApplicationDetails_.Intake_Year_Name,
				ApplicationDetails_.Date_Of_Applying,
				ApplicationDetails_.Remark,
				ApplicationDetails_.Application_status_Id,
				ApplicationDetails_.Application_Status_Name,
				ApplicationDetails_.Agent_Id,
				ApplicationDetails_.Agent_Name,
			],
			callback
		);
	},
	Get_ApplicationDetails: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_ApplicationDetails(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	Get_Bph_ApplicationDetails: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Bph_ApplicationDetails(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},



	Get_Feesrecepitdetails: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Feesrecepitdetails(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Application_DocumentList: function (Application_details_Id_, callback) {
		return db.query(
			"CALL Get_Application_DocumentList(@Application_details_Id_ :=?)",
			[Application_details_Id_],
			callback
		);
	},
	Get_Feesrecepit_DocumentList: function (Fees_Receipt_Id_, callback) {
		return db.query(
			"CALL Get_Feesrecepit_DocumentList(@Fees_Receipt_Id_ :=?)",
			[Fees_Receipt_Id_],
			callback
		);
	},
	Get_ApplicationDetails_History: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_ApplicationDetails_History(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_ApplicationDetailswise_History: function (
		Application_details_Id_,Feesdetails_Id_,
		callback
	) {
		return db.query(
			"CALL Get_ApplicationDetailswise_History(@Application_details_Id_ :=?,@Feesdetails_Id_ :=?)",
			[Application_details_Id_,Feesdetails_Id_],
			callback
		);
	},
	Delete_Application_Details: function (Application_details_Id_, callback) {
		return db.query(
			"CALL Delete_Application_Details(@Application_details_Id_ :=?)",
			[Application_details_Id_],
			callback
		);
	},
	Search_ApplicationDetails: function (Application_details_Id_, callback) {
		if (
			Application_details_Id_ === "undefined" ||
			Application_details_Id_ === "" ||
			Application_details_Id_ === undefined
		)
			Application_details_Id_ = 0;
		return db.query(
			"CALL Search_ApplicationDetails(@Application_details_Id_ :=?)",
			[Application_details_Id_],
			callback
		);
	},
	Get_Checklist: function (callback) {
		return db.query("CALL Get_Checklist()", callback);
	},
	Get_Student_Edit: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Student_Edit(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	// Activate_Application: function (
	// 	Application_details_Id_,
	// 	Student_Id_,
	// 	callback
	// ) {
	// 	return db.query(
	// 		"CALL Activate_Application(@Application_details_Id_ :=?,@Student_Id_ :=?)",
	// 		[Application_details_Id_, Student_Id_],
	// 		callback
	// 	);
	// },

	Activate_Application:function(Application_details_,callback)
    { 
        console.log(Application_details_)
    return db.query("CALL Activate_Application("+"@Application_details_Id_ :=?,"+"@Student_Id_ :=?,"+"@intake_Id_ :=?,"+"@intake_Name_ :=?,"+"@Intake_Year_Id_ :=?,"+"@Intake_Year_Name_ :=?,"+"@Agent_Id_ :=?,"+"@Agent_Name_ :=?,"+"@Login_User_ :=?)"
    ,[Application_details_.Application_details_Id,Application_details_.Student_Id,Application_details_.intake_Id,
        Application_details_.intake_Name,Application_details_.Intake_Year_Id,Application_details_.Intake_Year_Name,
        Application_details_.Agent_Id,Application_details_.Agent_Name,Application_details_.LoginUser],callback);
    },



	Student_Approve: function (
		Application_details_Id_,
		Login_User_,
		callback
	) {
		return db.query(
			"CALL Student_Approve(@Application_details_Id_ :=?,@Login_User_ :=?)",
			[Application_details_Id_, Login_User_],
			callback
		);
	},

	Receipt_Approve: function (
		Fees_Receipt_Id_,
		Login_User_,
		applicationdetails_Id_,
		Receiptamount_,
		callback
	) {
		return db.query(
			"CALL Receipt_Approve(@Fees_Receipt_Id_ :=?,@Login_User_ :=?,@applicationdetails_Id_ :=?,@Receiptamount_ :=?)",
			[Fees_Receipt_Id_, Login_User_,applicationdetails_Id_,Receiptamount_],
			callback
		);
	},


	// Refund_Approve: function (
	// 	Fees_Receipt_Id_,
	// 	Login_User_,
	// 	callback
	// ) {
	// 	return db.query(
	// 		"CALL Refund_Approve(@Fees_Receipt_Id_ :=?,@Login_User_ :=?)",
	// 		[Fees_Receipt_Id_, Login_User_],
	// 		callback
	// 	);
	// },

	Lead_Refund_Approve_Reject: function (
		Fees_Receipt_Id_,
		Status_,
		Comment_,
		Login_User_,
		callback
	) {
		return db.query(
			"CALL Lead_Refund_Approve_Reject(@Fees_Receipt_Id_ :=?,@Status_ :=?,@Comment_ :=?,@Login_User_ :=?)",
			[Fees_Receipt_Id_,Status_,Comment_, Login_User_],
			callback
		);
	},



	Save_Bph_Status: function (
		Application_details_Id_,
		Login_User_,
		Bph_Status_,
		Bph_Remark_,
		callback
	) {
		return db.query(
			"CALL Save_Bph_Status(@Application_details_Id_ :=?,@Login_User_ :=?,@Bph_Status_ :=?,@Bph_Remark_ :=?)",
			[Application_details_Id_, Login_User_,Bph_Status_,Bph_Remark_],
			callback
		);
	},

	Remove_Activity: function (Application_details_Id_, callback) {
		return db.query(
			"CALL Remove_Activity(@Application_details_Id_ :=?)",
			[Application_details_Id_],
			callback
		);
	},

	Remove_Student_Approval: function (Application_details_Id_, callback) {
		return db.query(
			"CALL Remove_Student_Approval(@Application_details_Id_ :=?)",
			[Application_details_Id_],
			callback
		);
	},

	Remove_Receipt_Approval: function (Fees_Receipt_Id_, callback) {
		return db.query(
			"CALL Remove_Receipt_Approval(@Fees_Receipt_Id_ :=?)",
			[Fees_Receipt_Id_],
			callback
		);
	},

	Remove_Refund_Approval: function (Fees_Receipt_Id_, Login_User_, callback) {
		return db.query(
			"CALL Remove_Refund_Approval(@Fees_Receipt_Id_ :=?,@Login_User_ :=?)",
			[Fees_Receipt_Id_, Login_User_],
			callback
		);
	},

	Lead_Refund_Reject: function (Fees_Receipt_Id_, callback) {
		return db.query(
			"CALL Lead_Refund_Reject(@Fees_Receipt_Id_ :=?)",
			[Fees_Receipt_Id_],
			callback
		);
	},


	Save_Visa: function (Visa_Data, callback) {
		console.log(Visa_Data.Visa_document);
		var Visa_Details_Value_ = 0;
		var Visa_Document_Value_ = 0;

		let Visa_Details_ = Visa_Data.Visa;
		console.log(Visa_Details_);
		if (
			Visa_Details_ != undefined &&
			Visa_Details_ != "" &&
			Visa_Details_ != null
		)
			Visa_Details_Value_ = 1;

		let Visa_document_ = Visa_Data.Visa_document;
		if (
			Visa_document_ != undefined &&
			Visa_document_ != "" &&
			Visa_document_ != null
		)
			Visa_Document_Value_ = 1;

		return db.query(
			"CALL Save_Visa(" +
				"@Visa_Details_:=?," +
				"@Visa_Details_Value_ :=?," +
				"@Visa_document_ :=?," +
				"@Visa_Document_Value_ :=? )",
			[
				Visa_Details_,
				Visa_Details_Value_,
				Visa_document_,
				Visa_Document_Value_,
			],
			callback
		);
	},
	Get_Visa_Details: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Visa_Details(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Visa_Documents: function (Visa_Id_, callback) {
		return db.query(
			"CALL Get_Visa_Documents(@Visa_Id_ :=?)",
			[Visa_Id_],
			callback
		);
	},
	Delete_Visa: function (Visa_Id_, callback) {
		return db.query("CALL Delete_Visa(@Visa_Id_ :=?)", [Visa_Id_], callback);
	},
	Delete_Visa_Document: function (Visa_Document_Id_, callback) {
		return db.query(
			"CALL Delete_Visa_Document(@Visa_Document_Id_ :=?)",
			[Visa_Document_Id_],
			callback
		);
	},
	Save_Invoice: function (Invoice_Data, callback) {
		console.log(Invoice_Data);
		var Invoice_Details_Value_ = 0;
		var Invoice_Document_Value_ = 0;

		let Invoice_Details_ = Invoice_Data.Invoice;
		// console.log(Application_);
		if (
			Invoice_Details_ != undefined &&
			Invoice_Details_ != "" &&
			Invoice_Details_ != null
		)
			Invoice_Details_Value_ = 1;

		let Invoice_document_ = Invoice_Data.Invoice_document;
		if (
			Invoice_document_ != undefined &&
			Invoice_document_ != "" &&
			Invoice_document_ != null
		)
			Invoice_Document_Value_ = 1;

		return db.query(
			"CALL Save_Invoice(" +
				"@Invoice_Details_:=?," +
				"@Invoice_Details_Value_ :=?," +
				"@Invoice_document_ :=?," +
				"@Invoice_Document_Value_ :=? )",
			[
				Invoice_Details_,
				Invoice_Details_Value_,
				Invoice_document_,
				Invoice_Document_Value_,
			],
			callback
		);
	},
	Get_Invoice_Details: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Invoice_Details(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},
	Get_Invoice_Documents: function (Invoice_Id_, callback) {
		return db.query(
			"CALL Get_Invoice_Documents(@Invoice_Id_ :=?)",
			[Invoice_Id_],
			callback
		);
	},
	Delete_Invoice: function (Invoice_Id_, callback) {
		return db.query(
			"CALL Delete_Invoice(@Invoice_Id_ :=?)",
			[Invoice_Id_],
			callback
		);
	},
	Delete_Invoice_Document: function (Invoice_Document_Id_, callback) {
		return db.query(
			"CALL Delete_Invoice_Document(@Invoice_Document_Id_ :=?)",
			[Invoice_Document_Id_],
			callback
		);
	},

	Get_Receipt_Sum: function (Student_Id_, callback) {
		return db.query(
			"CALL Get_Receipt_Sum(@Student_Id_ :=?)",
			[Student_Id_],
			callback
		);
	},

	Load_Marital_Status: function (callback) {
		return db.query("CALL Load_Marital_Status()", [], callback);
	},

	Load_Visa_Type: function (callback) {
		return db.query("CALL Load_Visa_Type()", [], callback);
	},
	Delete_Application_History: function (
		Application_details_history_Id_,
		callback
	) {
		return db.query(
			"CALL Delete_Application_History(@Application_details_history_Id_ :=?)",
			[Application_details_history_Id_],
			callback
		);
	},


	Save_Front_Student: async function (Student_) {
		console.log(Student_)
		return new Promise(async (rs, rej) => {
		  const pool = db.promise();
		  let result1;
		  var connection = await pool.getConnection();
		  await connection.beginTransaction();
		  
	
		  try {
			const result1 = await new storedProcedure(
			  "Save_Front_Student",
			  [
				Student_.Item_Id,
				Student_.Item_Name,
				Student_.Group_Id,
				Student_.Group_Name,
				Student_.Unit_Id,
				Student_.Unit_Name,
				Student_.HSN_Id,
				Student_.Hsn_Code,
				Student_.CGST,
				Student_.SGST,
				Student_.IGST,
				Student_.GST,
				Student_.CESS,
				Student_.Re_Order_Level,

				Student_.Student_Experience_Data

			  ],
			  connection
			).result();
			await connection.commit();
			connection.release();
			rs(result1);
		  } catch (err) {
			await connection.rollback();
			rej(err);
		  }
		});
	  },

	  


	  Search_Application_Report: async function (
        Fromdate_,
        Todate_,
        Branch_,
        By_User_,
        Is_Date_Check_,
        Login_User_Id_,
        Status_Value_,
        Agent_Id_,
        Application_status_Id_,
        Intake_Id_,
        Intake_Year_Id_,
        Country_Id_,
        University_Id_,
        Is_Active_Check_,
		To_User_Id_,
    ) {
        var Leads = [];
        try {
            //  console.log(Fromdate_, Todate_, Branch_, By_User_, Is_Date_Check_, Login_User_Id_,Status_Value_)
            Leads = await new storedProcedure("Search_Application_Report", [
                Fromdate_,
                Todate_,
                Branch_,
                By_User_,
                Is_Date_Check_,
                Login_User_Id_,
                Status_Value_,
                Agent_Id_,
                Application_status_Id_,
                Intake_Id_,
                Intake_Year_Id_,
                Country_Id_,
                University_Id_,
                Is_Active_Check_,
				To_User_Id_,
            ]).result();
        } catch (e) {
            ;
        }

        return {
            returnvalue: { Leads },
        };
    },




Search_Student_Report: async function (
        Fromdate_,
        Todate_,
        Search_By_,
        SearchbyName_,
        Department_,
        Enquiry_Source_,
        Branch_,
        By_User_,
        Is_Date_Check_,
        Is_Old_Datas_,
        Page_Index1_,
        Page_Index2_,
        Login_User_Id_,
        RowCount,
        RowCount2,
        remarks_,
        To_User_,
        Status_Id_,
        Register_Value_,UserType_Value
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Student_Report", [
            Fromdate_,
            Todate_,
            Search_By_,
            SearchbyName_,
            Department_,
            Enquiry_Source_,
            Branch_,
            By_User_,
            Is_Date_Check_,
            Is_Old_Datas_,
            Page_Index1_,
            Page_Index2_,
            Login_User_Id_,
            RowCount,
            RowCount2,
            remarks_,
            To_User_,
            Status_Id_,
            Register_Value_,UserType_Value,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },








    Search_Passport_Expiry_Report: async function (
        Fromdate_,
        Todate_,
        By_User_,
        Login_User_Id_,
        look_In_Date_Value
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_Passport_Expiry_Report", [
            Fromdate_,
            Todate_,
            By_User_,
            Login_User_Id_,
            look_In_Date_Value,
            
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },



	Notification_Read_Status: function (Notification_Count_,User_Id_, callback) {
        console.log(Notification_Count_,User_Id_)
        return db.query(
            "CALL Notification_Read_Status(@Notification_Count_ :=?,@User_Id_ :=?)",
            [Notification_Count_,User_Id_],
            callback
        );
    },


	Save_Checklist:function(Checklist_,callback)
{ 
    console.log(Checklist_)
    return db.query("CALL Save_Checklist("+"@Checklist_Id_ :=?,"+"@Checklist_Name_ :=?,"+"@Country_Id_ :=?,"+"@Checklist_Type_ :=?,"+"@Checklist_Type_Name_ :=?"+")"
    ,[Checklist_.Checklist_Id,Checklist_.Checklist_Name,Checklist_.Country_Id,Checklist_.Checklist_Type,Checklist_.Checklist_Type_Name],callback);
},



Get_Checklist_Country:function(Country_Id_,callback)
{ 
return db.query("CALL Get_Checklist_Country(@Country_Id_ :=?)",[Country_Id_],callback);
},


Delete_Checklist:function(Checklist_Id_,callback)
{ 
//   console.log(Checklist_Id_)
return db.query("CALL Delete_Checklist(@Checklist_Id_ :=?)",[Checklist_Id_],callback);
},

get_student_checklist:function(Student_Id_,Checklist_Type_,callback)
    { 
        console.log(Student_Id_)
   return db.query("CALL get_student_checklist(@Student_Id_ :=?,@Checklist_Type_ :=?)",[Student_Id_,Checklist_Type_],callback);
    }
    ,

	Get_Previsa_Details_Edit:function(Student_Checklist_Master_Id_,callback)
    { 
        console.log(Student_Checklist_Master_Id_)
   return db.query("CALL Get_Previsa_Details_Edit(@Student_Checklist_Master_Id_ :=?)",[Student_Checklist_Master_Id_],callback);
    }
    ,


	Get_Preadmission_Details_Edit:function(Student_Preadmission_Checklist_Master_Id_,callback)
    { 
        console.log(Student_Preadmission_Checklist_Master_Id_)
   return db.query("CALL Get_Preadmission_Details_Edit(@Student_Preadmission_Checklist_Master_Id_ :=?)",[Student_Preadmission_Checklist_Master_Id_],callback);
    }
    ,
	update_Read_Status: function (login_user_, Notification_Id_, callback) {
		return db.query(
			"CALL update_Read_Status(@login_user_ :=?,@Notification_Id_ :=?)",
			[login_user_, Notification_Id_],
			callback
		);
	},
	
	Save_CAS_NewTask_Followup:function(Cas_Followup_,callback)
    { 
        console.log(Cas_Followup_)
    return db.query("CALL Save_CAS_NewTask_Followup("+"@Student_Task_Id_ :=?,"+"@Student_Id_ :=?,"+"@Department_Id_ :=?,"+"@Department_Name_ :=?,"+"@To_User_ :=?,"+"@To_User_Name_ :=?,"+"@Task_Group_Id_ :=?,"+"@Task_Details_ :=?,"+"@Followup_Date_ :=?,"+"@End_Date_ :=?,"+"@Remark_ :=?,"+"@Task_Status_ :=?,"+"@Status_Name_ :=?,"+"@Task_Item_Id_ :=?,"+"@By_User_Id_ :=?,"+"@By_User_Name_ :=?,"+"@Branch_Id_ :=?,"+"@Branch_Name_ :=?)"
    ,[Cas_Followup_.Student_Task_Id,Cas_Followup_.Student_Id,Cas_Followup_.Department_Id
	,Cas_Followup_.Department_Name,Cas_Followup_.To_User,Cas_Followup_.To_User_Name,Cas_Followup_.Task_Group_Id,Cas_Followup_.Task_Details,
	Cas_Followup_.Followup_Date,Cas_Followup_.End_Date,Cas_Followup_.Remark,Cas_Followup_.Task_Status,Cas_Followup_.Status_Name,Cas_Followup_.Task_Item_Id,Cas_Followup_.By_User_Id,Cas_Followup_.By_User_Name,Cas_Followup_.Branch_Id,Cas_Followup_.Branch_Name],callback);
    },

	Save_CAS_NewTask_Followup:function(Cas_Followup_,callback)
    { 
        console.log(Cas_Followup_)
    return db.query("CALL Save_CAS_NewTask_Followup("+"@Student_Task_Id_ :=?,"+"@Student_Id_ :=?,"+"@Department_Id_ :=?,"+"@Department_Name_ :=?,"+"@To_User_ :=?,"+"@To_User_Name_ :=?,"+"@Task_Group_Id_ :=?,"+"@Task_Details_ :=?,"+"@Followup_Date_ :=?,"+"@Remark_ :=?,"+"@Task_Status_ :=?,"+"@Status_Name_ :=?,"+"@Task_Item_Id_ :=?,"+"@By_User_Id_ :=?,"+"@By_User_Name_ :=?,"+"@Branch_Id_ :=?,"+"@Branch_Name_ :=?)"
    ,[Cas_Followup_.Student_Task_Id,Cas_Followup_.Student_Id,Cas_Followup_.Department_Id
	,Cas_Followup_.Department_Name,Cas_Followup_.To_User,Cas_Followup_.To_User_Name,Cas_Followup_.Task_Group_Id,Cas_Followup_.Task_Details,
	Cas_Followup_.Followup_Date,Cas_Followup_.Remark,Cas_Followup_.Task_Status,Cas_Followup_.Status_Name,Cas_Followup_.Task_Item_Id,Cas_Followup_.By_User_Id,Cas_Followup_.By_User_Name,Cas_Followup_.Branch_Id,Cas_Followup_.Branch_Name],callback);
    },



	Save_CAS_NewTask_Followup_Navbar:function(Cas_Followup_,callback)
    { 
        console.log(Cas_Followup_)
    return db.query("CALL Save_CAS_NewTask_Followup_Navbar("+"@Student_Task_Id_ :=?,"+"@Student_Id_ :=?,"+"@Department_Id_ :=?,"+"@Department_Name_ :=?,"+"@To_User_ :=?,"+"@To_User_Name_ :=?,"+"@Task_Group_Id_ :=?,"+"@Task_Details_ :=?,"+"@Followup_Date_ :=?,"+"@Remark_ :=?,"+"@Task_Status_ :=?,"+"@Status_Name_ :=?,"+"@Task_Item_Id_ :=?,"+"@By_User_Id_ :=?,"+"@By_User_Name_ :=?,"+"@Branch_Id_ :=?,"+"@Branch_Name_ :=?)"
    ,[Cas_Followup_.Student_Task_Id,Cas_Followup_.Student_Id,Cas_Followup_.Department_Id
	,Cas_Followup_.Department_Name,Cas_Followup_.To_User,Cas_Followup_.To_User_Name,Cas_Followup_.Task_Group_Id,Cas_Followup_.Task_Details,
	Cas_Followup_.Followup_Date,Cas_Followup_.Remark,Cas_Followup_.Task_Status,Cas_Followup_.Status_Name,Cas_Followup_.Task_Item_Id,Cas_Followup_.By_User_Id,Cas_Followup_.By_User_Name,Cas_Followup_.Branch_Id,Cas_Followup_.Branch_Name],callback);
    },


	

	Get_Tasknew_Task:function(Student_Id_,Task_Group_Id_,Login_User_,callback)
    { 
   
   return db.query("CALL Get_Tasknew_Task(@Student_Id_ :=?,"+"@Task_Group_Id_ :=?,"+"@Login_User_ :=?)",[Student_Id_,Task_Group_Id_,Login_User_],callback);
    }
    ,

Delete_Tasknew:function(Student_Task_Id_,callback)
{ 
return db.query("CALL Delete_Tasknew(@Student_Task_Id_ :=?)",[Student_Task_Id_],callback);
}
,
Search_Application_List: function (LoginUser_Id_,Enrolled_Application_Only_View_Permission_,Pointer_Start_,Pointer_Stop_,Page_Length_,Is_View_,Department_Id_,search_name_, callback) {
	return db.query(
		"CALL Search_Application_List(@LoginUser_Id_ :=?,@Enrolled_Application_Only_View_Permission_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?,@Is_View_ :=?,@Department_Id_ :=?,@search_name_ :=?)",
		[LoginUser_Id_,Enrolled_Application_Only_View_Permission_,Pointer_Start_,Pointer_Stop_,Page_Length_,Is_View_,Department_Id_,search_name_],
		callback
	);
},

Load_Application_status_for_user: function (Login_User_Id_,callback) {
	return db.query("CALL Load_Application_status_for_user(@Login_User_Id_ :=?)", [Login_User_Id_], callback);
},

Save_Application_Status: function (
	Application_details_Id_,
	Login_User_,
	Application_Status_,
	Bph_Remark_,
	callback
) {
	return db.query(
		"CALL Save_Application_Status(@Application_details_Id_ :=?,@Login_User_ :=?,@Application_Status_ :=?,@Bph_Remark_ :=?)",
		[Application_details_Id_, Login_User_,Application_Status_,Bph_Remark_],
		callback
	);
},
Load_Color:function(callback)
{ 
	return db.query("CALL Load_Color()", [],callback);
},
Load_Automatic_Departments: function (callback) {
	return db.query("CALL Load_Automatic_Departments()", [], callback);
},

Get_ToStaff_Student_DataCount:function(Branch_,Followup_Date_,callback)
    { console.log(Branch_,Followup_Date_)
        
   return db.query("CALL Get_ToStaff_Student_DataCount(@Branch_ :=?,"+"@Followup_Date_ :=?)",[Branch_,Followup_Date_],callback);
    }
    ,

	
	Load_Application_status_forchangestatus: function (Login_Id_,callback) {
		return db.query("CALL Load_Application_status_forchangestatus(@Login_Id_ :=?)", [Login_Id_], callback);
	},

	// Save_Lodgemet: function (Status_Change_Data_, callback) {
	// 	var Conditions_Value_ = 0;

	// 	let Conditions_Data = Status_Change_Data_.Conditions_Array;
	// 	if (Conditions_Data != undefined && Conditions_Data != "" && Conditions_Data != null)
	// 		Conditions_Value_ = 1;
	// 	console.log(Conditions_Data)
	// 	console.log(Status_Change_Data_)

	// 	return db.query(
	// 		"CALL Save_Lodgemet(" +
	// 			"@Application_details_Id_:=?," +
	// 			"@Login_User_ :=?," +
	// 			"@Application_Status_Id_ :=?," +
	// 			"@Application_Status_Name_ :=?," +
	// 			"@Application_No_ :=?," +
	// 			"@Agent_Id_ :=?,"+
	// 			"@Agent_Name_ :=?,"+
	// 			"@Offerletter_Type_Id_ :=?,"+
	// 			"@Offerletter_Type_Name_ :=?,"+				
	// 			"@Conditions_Value_ :=?,"+
	// 			"@Conditions_Data : =? )",
	// 		[				
	// 			Status_Change_Data_.Application_details_Id,
	// 			Status_Change_Data_.LoginUser,
	// 			Status_Change_Data_.Application_status_Id,
	// 			Status_Change_Data_.Application_Status_Name,
	// 			Status_Change_Data_.Application_No,
	// 			Status_Change_Data_.Agent_Id,
	// 			Status_Change_Data_.Agent_Name,
	// 			Status_Change_Data_.Offerletter_Type_Id,
	// 			Status_Change_Data_.Offerletter_Type_Name,				
	// 			Conditions_Value_,
	// 			JSON.stringify(Status_Change_Data_.Conditions_Array)
	// 		],
	// 		callback
	// 	);
	// },
	Save_Lodgemet: async function (Status_Change_Data_) {
		 console.log(Status_Change_Data_)
		   return new Promise(async (rs, rej) => {
			 const pool = db.promise();
			 let result1;
			 var connection = await pool.getConnection();
			 await connection.beginTransaction();
			 var Conditions_Value_ = 0;

			 let Conditions_Data = Status_Change_Data_.Conditions_Array;
			 if (Conditions_Data != undefined && Conditions_Data != "" && Conditions_Data != null)
				 Conditions_Value_ = 1;
			 try {
			   const result1 = await (new storedProcedure('Save_Lodgemet',[				
				Status_Change_Data_.Application_details_Id,
				Status_Change_Data_.LoginUser,
				Status_Change_Data_.Application_status_Id,
				Status_Change_Data_.Application_Status_Name,
				Status_Change_Data_.Application_No,
				Status_Change_Data_.Agent_Id,
				Status_Change_Data_.Agent_Name,
				Status_Change_Data_.Offerletter_Type_Id,
				Status_Change_Data_.Offerletter_Type_Name,	
				Status_Change_Data_.Remark,		
				Status_Change_Data_.Class_Id,			
				Status_Change_Data_.Class_Name,	
				Status_Change_Data_.Class_Order,
				Status_Change_Data_.Process_status_details_Id,
				Conditions_Value_,
				JSON.stringify(Status_Change_Data_.Conditions_Array)
			], connection)).result();
			 
			   await connection.commit();
			   connection.release();
			   rs(result1);
			 }
			 catch (err) {
			   await connection.rollback();
			   rej(err);
			 }
		   })
		 },





	// Save_Lodgemet: function (
	// 	Application_details_Id_,
	// 	Login_User_,
	// 	Application_Status_Id_,
	// 	Application_Status_Name_,
	// 	Application_No_,
	// 	Agent_Id_,
	// 	Agent_Name_,
	// 	callback
	// ) {
	// 	console.log(Application_details_Id_, Login_User_,Application_Status_Id_,Application_Status_Name_,Application_No_,Agent_Id_,Agent_Name_)
	// 	return db.query(
	// 		"CALL Save_Lodgemet(@Application_details_Id_ :=?,@Login_User_ :=?,@Application_Status_Id_ :=?,@Application_Status_Name_ :=?,@Application_No_ :=?,@Agent_Id_ :=?,@Agent_Name_ :=?)",
	// 		[Application_details_Id_, Login_User_,Application_Status_Id_,Application_Status_Name_,Application_No_,Agent_Id_,Agent_Name_],
	// 		callback
	// 	);
	// },




	Load_Restriction_Status: function (callback) {
		return db.query("CALL Load_Restriction_Status()", [], callback);
	},

	Load_OfferLetter_Type:function(callback)
	{ 
		return db.query("CALL Load_OfferLetter_Type()", [],callback);
	},
	Load_Agents:function(callback)
    { 
        return db.query("CALL Load_Agents()", [],callback);
    },





	Save_Offerchasingdetails: function (Offerchasing_Data, callback) {
		console.log(Offerchasing_Data)
		var Conditions_Value_ = 0;

		let Conditions_ = Offerchasing_Data.Conditions;
		if (Conditions_ != undefined && Conditions_ != "" && Conditions_ != null)
		Conditions_Value_ = 1;

		return db.query(
			"CALL Save_Offerchasingdetails(" +
				"@Application_details_Id_:=?," +
				"@Login_User_ :=?," +
				"@Offerletter_Type_Id_ :=?," +
				"@Offerletter_Type_Name_ :=?," +
				"@Conditions_ :=?," +
				"@Conditions_Value_ :=? )",
			[
				Offerchasing_Data.Application_details_Id,
				Offerchasing_Data.User_Id,
				Offerchasing_Data.Offerletter_Type_Id,
				Offerchasing_Data.Offerletter_Type_Name,
				JSON.stringify(Conditions_),
				Conditions_Value_,
			],
			callback
		);
	},
	Save_Student_Document: function (Docs_Data, callback)
	{
		console.log(Docs_Data)
		 var Document_value_ = 0; 
		 let Docs_ = Docs_Data.Docs_D;
	
		 if (Docs_ != undefined && Docs_ != '' && Docs_ != null)
			Document_value_ = 1;  
			console.log(Docs_);
		 return db.query("CALL Save_Student_Document(" + "@Docs_:=?," + "@Document_value_ :=? )"
	  , [Docs_, Document_value_],callback);
	},

	Search_Conditions:function(Application_details_Id_,callback)
	{ 
	
	return db.query("CALL Search_Conditions(@Application_details_Id_ :=?)",[Application_details_Id_],callback);
	},

// 	Save_Viewconditions:function(Conditions_Search_Data,callback)
//  { 
// return db.query("CALL Save_Viewconditions(Conditions_Search_Data)",[Conditions_Search_Data],callback);
//  }
//  ,
 


Save_Viewconditions: function (Conditions_Search_Data, callback) {
	console.log(Conditions_Search_Data)
	var Conditions_Value_ = 0;

	let Conditions_ = Conditions_Search_Data;
	if (Conditions_ != undefined && Conditions_ != "" && Conditions_ != null)
	Conditions_Value_ = 1;

	return db.query(
		"CALL Save_Viewconditions(" +
			"@Conditions_ :=?," +
			"@Conditions_Value_ :=? )",
		[
			JSON.stringify(Conditions_),
			Conditions_Value_,
		],
		callback
	);
},





Load_Application_status_forchangestatus_restriction: function (Group_Restriction_,callback) {
	return db.query("CALL Load_Application_status_forchangestatus_restriction(@Group_Restriction_ :=?)", [Group_Restriction_], callback);
},



Save_DocumentName:function(Document_,callback)
{ 
return db.query("CALL Save_DocumentName("+
"@Document_Id_ :=?,"+
"@Document_Name_ :=?"+")"
,[Document_.Document_Id,
	Document_.Document_Name
],callback);
}
,
Search_DocumentName:function(Document_Name_,callback)
{ 
if (Document_Name_===undefined || Document_Name_==="undefined" )
Document_Name_='';
return db.query("CALL Search_DocumentName(@Document_Name_ :=?)",[Document_Name_],callback);
},


Delete_DocumentName:function(Document_Id_,callback)
{ 
return db.query("CALL Delete_DocumentName(@Document_Id_ :=?)",[Document_Id_],callback);
}
,
Student_duplicate_Import_Check: function (Student_Details, callback) {
	return db.query(
		"CALL Student_duplicate_Import_Check(@Student_Import_Details_ :=?,@By_User_Id_ :=?,@Branch_ :=?,@Department_ :=?,@Status_ :=?,@Enquiry_Source_ :=?,@Next_FollowUp_Date_ :=?,@Login_Branch_ :=?)",
		[
			JSON.stringify(Student_Details.Student_Import_Details),
			Student_Details.By_User_Id,
			Student_Details.Branch,
			Student_Details.Department,
			Student_Details.Status,
			
			Student_Details.Enquiry_Source,
			Student_Details.Next_FollowUp_Date,
			Student_Details.Login_Branch,
		],
		callback
	);
},

Get_ToStaff_Student_DataCount_Excel:function(Branch_,Followup_Date_,Department_,callback)
    { console.log(Branch_,Followup_Date_,Department_)
        
   return db.query("CALL Get_ToStaff_Student_DataCount_Excel(@Branch_ :=?,"+"@Followup_Date_ :=?,"+"@Department_ :=?)",[Branch_,Followup_Date_,Department_],callback);
    }
    ,
	Search_EnquirywiseStatus_Summary: async function (
		Fromdate_,
		Todate_,
		By_User_,
		Login_User_Id_,
		look_In_Date_Value,
		Status_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_EnquirywiseStatus_Summary", [
			Fromdate_,
			Todate_,
			By_User_,
			Login_User_Id_,
			look_In_Date_Value,
			Status_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	Search_EnquirywiseStatus_report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Status_Id_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_EnquirywiseStatus_report", [
			Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Status_Id_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	Search_DepartmentStatus_Summary: async function (
		Fromdate_,
		Todate_,
		By_User_,
		Login_User_Id_,
		look_In_Date_Value,
		Department_Id_
    ) {
        var Leads = [];
        try {
        Leads = await new storedProcedure("Search_DepartmentStatus_Summary", [
			Fromdate_,
			Todate_,
			By_User_,
			Login_User_Id_,
			look_In_Date_Value,
			Department_Id_,
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
	Search_DepartmentStatus_report: async function (
		Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_Id_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
		Status_Id_
    ) {
        var Leads = [];
        try {
			
        Leads = await new storedProcedure("Search_DepartmentStatus_report", [
			Fromdate_,
		Todate_,
		Search_By_,
		SearchbyName_,
		Department_,
		Branch_Id_,
		By_User_,
		Is_Date_Check_,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount,
		RowCount2,
		Status_Id_
            ]).result();
        } catch (e) {}

        return {
            returnvalue: {
                Leads,
            },
        };
    },
};

module.exports = Student;
