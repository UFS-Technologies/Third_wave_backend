var db=require('../dbconnection');
// const { SESClient, SendEmailCommand  } = require("@aws-sdk/client-ses");

//import { SESClient, CloneReceiptRuleSetCommand } from "@aws-sdk/client-ses";
//var base64Img = require('base64-img');
var fs = require('fs');
//const AWS = require('aws-sdk');
// const AWS = require("@aws-sdk/client-ses");//require('aws-sdk');
const storedProcedure=require('../helpers/stored-procedure');
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var base64str = base64_encode("companylogo.PNG");

// process.env.AWS_SES_REGION='us-east-2';
// process.env.AWS_SECRET_ACCESS_KEY='WyyQ8pRH6y6fpCcrT7XTS7MfeBr8Sa04U/2D9Nwb';
// process.env.AWS_ACCESS_KEY_ID='AKIAX37YDYI4OSIHXSED';
// Amazon SES configuration
// const sesClient = new SESClient({ region: process.env.AWS_SES_REGION });

// const ses = new AWS.SES({
//   apiVersion: "2010-12-01",
//   region: process.env.AWS_SES_REGION,
// });
// const SESConfig = {
//   apiVersion: '2010-12-01',
//   accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
//   region: process.env.AWS_SES_REGION
// };

// let aws = require("@aws-sdk/client-ses");
// configure AWS SDK
// process.env.AWS_ACCESS_KEY_ID = "....";
// process.env.AWS_SECRET_ACCESS_KEY = "....";
// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "us-east-1",
// });

// create Nodemailer SES transporter
// let transporter = nodemailer.createTransport({
//   SES: { ses, aws },
// });

function base64_encode(file) {
 
 var bitmap = fs.readFileSync(file);
 return new Buffer.from(bitmap).toString("base64");
}
var Public_Data=
{ 

  Save_Student_Course: async function (Student_Course_Apply_) {
    return new Promise(async (rs, rej) => {
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      var Course_Apply = Student_Course_Apply_.Course_Apply;
      try {
        const result1 = await (new storedProcedure('Save_Student_Course', [0, Student_Course_Apply_.Student_Id,
          Course_Apply,Student_Course_Apply_.Login_Id], connection)).result();

        const result2 = await (new storedProcedure('Load_Company', [], connection)).result();
        const result3 = await (new storedProcedure('Load_User', [Student_Course_Apply_.Login_Id], connection)).result();
        // sgMail.setApiKey(result3[0].FollowUp_Target)
        // console.log(result3[0].FollowUp_Target);
        var a = "<table style='border-collapse: collapse;  border-spacing: 0; vertical-align: top;  width:100%; ' >"
        var b = ""
        for (var i = 0; i < result1.length; i++) 
        {
          b = b 
          +"<tr  style = 'background:#1d5ea0;color:#eef0f0; font-weight:bold; width:100%; '><td style='padding:5px; '> Course </td>"

          +"<td style='padding:5px' >" + result1[i].Course_Name + "</td></tr>"
           + "<tr><td style='padding:5px'> Country </td><td style='padding:5px'>" +result1[i].Country_Name + "</td></tr>" 
           + "<tr><td style='padding:5px'> University </td><td style='padding:5px'>"+ result1[i].University_Name + "</td><td>" 
          
          //  + "<tr><td style='padding:5px'> Subject </td><td>"+ result1[i].Subject_Name + "</td><td>" 
           + "<tr><td style='padding:5px'> Application Fees </td><td style='padding:5px'>"+ result1[i].Application_Fees + "</td><td>"
           + "<tr><td style='padding:5px'> Tuition Fees </td><td style='padding:5px'>"+ result1[i].Tution_Fees + "</td><td>" 
           + "<tr><td style='padding:5px'> Entry Requirements </td><td style='padding:5px'>"+ result1[i].Entry_Requirement + "</td><td>" 
          //  + "<tr><td style='padding:5px'> Work Experience </td><td>"+ result1[i].Work_Experience + "</td><td>" 
           + "<tr><td style='padding:5px'> Level </td><td style='padding:5px'>"+ result1[i].Level_Detail_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Duration </td><td style='padding:5px'>"+ result1[i].Duration_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Intake </td><td style='padding:5px'>"+ result1[i].intake_Name + "</td><td>" 
           + "<tr><td style='padding:5px'> IELTS </td><td style='padding:5px'>"+ result1[i].Ielts_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Course link </td><td style='padding:5px'>"+ result1[i].Notes + "</td></tr>"
          
           if(Student_Course_Apply_.expense_include==true){
            b=b + "<tr><td style='padding:5px;font-weight:bold;'> Expense Details </td><td style='padding:5px'></td></tr>"
            if(result1[i].Registration_Fees!=undefined)
            b=b + "<tr><td style='padding:5px'> Registration Fees  </td><td style='padding:5px'>"+ result1[i].Registration_Fees + "</td></tr>"
            if(result1[i].Date_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Date Charges </td><td style='padding:5px'>"+ result1[i].Date_Charges + "</td></tr>"
            if(result1[i].Bank_Statements!=undefined)
            b=b + "<tr><td style='padding:5px'> Bank Statements</td><td style='padding:5px'>"+ result1[i].Bank_Statements + "</td></tr>"
            if(result1[i].Insurance!=undefined)
            b=b + "<tr><td style='padding:5px'> Insurance </td><td style='padding:5px'>"+ result1[i].Insurance + "</td></tr>"
            if(result1[i].VFS_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> VFS Charges </td><td style='padding:5px'>"+ result1[i].VFS_Charges + "</td></tr>"
            if(result1[i].Apostille!=undefined)
            b=b + "<tr><td style='padding:5px'> Apostille </td><td style='padding:5px'>"+ result1[i].Apostille + "</td></tr>"
            if(result1[i].Other_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Other Charges </td><td style='padding:5px'>"+ result1[i].Other_Charges + "</td></tr>"
           }            
           if(result1[i].Details!=null)           
           b=b+ "<tr><td style='padding:5px'>Details </td><td> "+ result1[i].Details.replace(/(?:\r\n|\r|\n)/g, '<br>') + "</td><td>" 
             
          //  + "<tr><td style='padding:5px'> Expense Details </td><td style='padding:5px'>"+ result1[i].Living_Expense+ "</td><td>" 

             + "<tr><td style='padding:5px'>  </td><td style='padding:5px'>"+  "</td></tr>"
             console.log(result1[i].Details )
        }
        a = a + b + "</table>"
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: 
          {
            user: 'teena@ufstechnologies.com',
            pass: 'teena1225'
          }
        });
        console.log(result1[0].Email);


        // <div style='padding-left:10px'> Dear <span style = 'color:#2f3293; font-weight:bold;'>" + result1[0].Student_Name + ",</span>"
        //     + "<br/><br/>"   
        //     + "  Greetings from "+ result2[0].companyname+""
        //     + "<br/><br/>"   
        //     + "Thank you for your enquiry with us."
        //     + "<br/><br/>" + "<p style = 'background:#1d5ea0;color:#eef0f0;font-family:Roboto !important; padding:12px;'>COURSE DETAILS </p>"
        //     + "<br/><br/>" + a + ""
        //     + "<br/><br/>" + ""  
        //     + "<br/><br/>" + "Thanks & Regards" 

        const msg = 
        {
          to: result1[0].Email,
          from: 'hr@ufstechnologies.com', // Change to your verified sender
          subject: 'Course details',
          attachments: [
           {
             filename:     'companylogo.PNG',          
             type:  'image/PNG',
             content_id:   'myimagecid',
             content:      base64str ,
             disposition : "inline"
           }], 
          html: 

            "<table><tr><td><div class='gmail_quote'>"
  + "<br>" 
  + "<u></u>"
  + "<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> "
    + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> "
      + "<tbody> "
        + "<tr style='vertical-align: top;'> "
          + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> "
            + "<div style='padding: 10px 0px 0px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='width: 100%!important;'>"
                      + "<div style='padding: 0px; border: 0px solid transparent;'>"
                        + "<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr>"
                              + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                  + "<tbody>"
                                    + "<tr>"
                                      + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
                                        + "<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>"
                                        +"<img src='cid:myimagecid' alt=''/>  "
                                        //+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
                                        + "</a>"
                                      + "</td>"
                                    + "</tr>"
                                  + "</tbody>"
                                + "</table>"
                              + "</td>"
                            + "</tr>"
                          + "</tbody>"
                        + "</table>"
                      + "</div>"
                    + "</div>"
                  + "</div>"
                + "</div>"
              + "</div>"
            + "</div>"
            + "<div style='padding: 0px 0px 10px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='background-color: #ffffff; width: 100%!important;'>"
                      + "<div style='padding: 25px; border-top: 5px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>"
                        + "<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr style='height: 451px;'>"
                              + "<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>"
                                + "<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>"
                                  + "<p style='font-size: 14px; line-height: 170%;'>"
                                    + "<span >"
                                      + "<strong>"
                                        + "<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Hi "+ result1[0].Student_Name +",<br/></span>"
                                          + "</strong>"
                                          // + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
                                          + "<span style='font-size: 16px; line-height: 27.2px;'>Greetings from "+ result2[0].companyname+", Thank you for your enquiry with us. Please find the program details below</span>"
                                            + "</span>"


                                            + "</p>"
                                         
                                            + "</p>"
                                            // + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
                                            + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
                                            + "<strong>Course Details</strong>"
                                            + "<hr>"
                                    
                                    
                                           +a
                                  
                                           + "<p style='font-size: 11px; line-height: 160%;'>"
                                          //  #024c70
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> "
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> "
                                           + result3[0].User_Details_Name + "<br/>" +result3[0].Mobile
                                           +" </span> "

                                           + "</p>"
                                  
                                            // + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
                                            + "</p>"

                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                          
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
                        
                        
                                            + "<br>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>"
                                            // + "<p style='font-size: 14px; line-height: 160%;'>"
                                            // + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
                                            //  + " </span>"
                                            // + "</p>"
                                            + "<p style='font-size: 14px; line-height: 50%;'>"
                                            + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "
                                           + result2[0].companyname  + "<br/>"  + result2[0].Address1 + "<br/>" +result2[0].Address2 + "<br/>" +result2[0].Address3
                                            
                                            + "</span>"
                                            + "</p>"
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
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div align='center'>"
                                            + "<div style='display: table; max-width: 244px;'>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                            + "<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>"
                                 
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div></td></tr></table>"



          //  + result3[0].User_Details_Name + "<br/>" +
          //   result2[0].Mobile + "<br/>" + " <img src='cid:myimagecid' alt='no image found'/><br/><br/>" +
          //   result2[0].Email + ""
          //   + "<br/><br/>" +  ""
          //    + result2[0].Address1 + "<br/>" +
          //   result2[0].Address2 + "<br/>" + 
          //   result2[0].Address3 + "<br/>" +
          //    result2[0].Mobile + "</div>"        
        }
        sgMail
        var d = await sgMail.send(msg);
        console.log(d);
        await connection.commit();
        connection.release();
        rs(result1);
      }
        catch (err) {
        ;
        await connection.rollback();
        rej(err);
      }
    })
  },

  // forgetPassword: function(email_, callback) {
  //   console.log(email_,)
  //   return db.query(
  //     "CALL Update_User_OTP(@email_ :=?)",
  //     [email_],
  //     callback
  //   );
  // },


  forgetPassword: async function (Email_, OTP) { 
    // Log the received email and OTP
    console.log(Email_, OTP);
  
    // Execute the stored procedure to save the OTP associated with the email
    const Data = await (new storedProcedure('Update_User_OTP', [Email_, OTP])).result();
  
    if (Data.length > 0) {
      console.log(Data);
      const email = Data[0].Email_; // Assume Email is returned by the stored procedure
  
      // Configure the email transporter
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: 'satheesh.mt@ufstechnologies.com', // Your email address
          pass: 'satheesh12345' // Your email password (consider using environment variables for security)
        }
      });
  
      // Prepare the email content
      const msg = {
        to: Email_,
        from: 'satheesh.mt@ufstechnologies.com', // Your email address
        subject: 'Password Recovery OTP',
        html: `
          <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 20px auto;">
            <h2 style="text-align: center; color: #333;">Password Recovery</h2>
            <p>Hello,</p>
            <p>Your OTP for password recovery is:</p>
            <p><strong>OTP:</strong> ${OTP}</p>
            <p>If you did not initiate this request, please ignore this email or contact support.</p>
            <p>Thank you for choosing our service.</p>
            <p>Best regards,<br>Your Company</p>
          </div>
        `,
      };
  
      // Send the email
      try {
        const info = await transporter.sendMail(msg);
        console.log('Email sent successfully:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
    }
  
    // Return the result
    return { Data };    
  },




  
	Check_OTP: function (

		OTP,
		Email,
		callback
	) {
    console.log(OTP,
      Email);
		return db.query(
			"CALL Check_OTP(@OTP :=?,@Email_ :=?)",
			[OTP, Email],
			callback
		);
	},



//   Update_User_OTP: async function(Email,otp,token) {
    
//     return executeTransaction('Update_User_OTP', [
//         Email,otp,token
//     ]);
// },

  // Save_Front_Student: async function (Student_) {
	// 	console.log(Student_)
	// 	return new Promise(async (rs, rej) => {
	// 	  const pool = db.promise();
	// 	  let result1;
	// 	  var connection = await pool.getConnection();
	// 	  await connection.beginTransaction();
		  
	
	// 	  try {
	// 		const result1 = await new storedProcedure(
	// 		  "Save_Front_Student",
	// 		  [
				

  //       Student_.Student_Name,
  //       Student_.Phone_Number,
  //       Student_.Email: 'bcv',
  //       Student_.Country_Name: '',
  //       Student_.Noof_Children: '',
  //       Student_.Instagram: '',
  //       Student_.Noof_Arrears: '',
  //       Student_.Visa_Status: '',
  //       Student_.Professional_Qualification_Name: '',
  //       Student_.Reference_Name: '',
  //       Student_.other_year: '',
  //       Student_.other_instituation: '',
  //       Student_.other_markoverall: '',
  //       Student_.Whatsapp: '',
  //       Student_.Address1: 'fdgdfg',
  //       Student_.IELTS_Listening: '',
  //       Student_.IELTS_Overall: '',
  //       Student_.IELTS_Reading: '',
  //       Student_.IELTS_Speaking: '',
  //       Student_.IELTS_Writting: '',
  //       Student_.Passport_No: '',
  //       Student_.Dob: '2022-08-13',
  //       Student_.IELTS: '',
  //       Passport_Todate: '2022-08-26',
  //       Date_of_Exam: '2022-08-26',
  //       Telephone: 'dfg',
  //       Guardian_telephone: 'bv',
  //       Any_Previous_Visa: 'gfdg',
  //       Sslc_Field: 'dfg',
  //       Plustwo_Field: 'dfg',
  //       Degree_Field: 'gdf',
  //       Masters_Field: 'fdg',
  //       Phd_Field: 'dfg',
  //       Masters_University: 'fg',
  //       Degree_University: 'dfg',
  //       Plustwo_University: 'dfg',
  //       Masters_Percentage: 'dfg',
  //       First_Preference_Country: 'fdg',
  //       Second_Preference_Country: 'dfg',
  //       Second_Preference_Course: 'dfg',
  //       Second_Preference_Intake: 'df',
  //       Second_Preference_Coursefee: 'dfg',
  //       Taken_Date 'dfg',
  //       Listening,
  //       Reading ,
  //       Writing ,
  //       Speaking ,
  //       Overall,
        
  //       Phd_University,
  //       Phd_Percentage,
  //       Degree_Percentage,
  //       Plustwo_Percentage,
  //       Sslc_Percentage,
  //       Sslc_Backlog_History,
  //       Plustwo_Backlog_History,
  //       degree_Backlog_History,
  //       Degree_Year,
  //       Masters_Backlog_History,
  //       Phd_Backlog_History,
  //       Phd_Year,
  //       Sslc_Year,
  //       Plustwo_Year,
  //       Sslc_University,
  //       First_Preference,
  //       Second_Preference,
  //       Third_Preference,
  //       Second_Preference_University,
  //       First_Preference_University,
  //       Third_Preference_University,
  //       Third_Preference_Country,
  //       Third_Preference_Course,
  //       First_Preference_Course,
  //       First_Preference_Intake,
  //       First_Preference_Coursefee,
  //       Third_Preference_Coursefee,
  //       Third_Preference_Intake,
  //       Second_Preference_Expense,
  //       First_Preference_Expense,
  //       Third_Preference_Expense,


  //       Student_.Student_Experience_Data,




  
          // Student_.Noof_Children,
          // Student_.Instagram ,
          // Student_.Visa_Status ,
          // Student_.Noof_Arrears ,
          // Student_.Country_Opted_Id ,
          // Student_.Professional_Qualification_Name,
          // Student_.Date_of_Exam ,
          // Student_.Reference_Name,
          // Student_.Student_Registration_Id,
          
          // Student_.Sslc_Field,
          // Student_.Sslc_University,
          // Student_.Sslc_Percentage,
          // Student_.Sslc_Backlog_History,
          // Student_.Sslc_Year,
          // Student_.Plustwo_Field,
          // Student_.Plustwo_University,
          // Student_.Plustwo_Percentage,
          // Student_.Plustwo_Backlog_History,
          // Student_.Plustwo_Year,
          // Student_.Degree_Field,
          // Student_.Degree_University,
          // Student_.Degree_Percentage,
          // Student_.degree_Backlog_History,
          // Student_.Degree_Year,
          // Student_.Masters_Field,
          // Student_.Masters_University,
          // Student_.Masters_Percentage,
          // Student_.Masters_Backlog_History,
          // Student_.Masters_Year,
          // Student_.Phd_Field,
          // Student_.Phd_University,
          // Student_.Phd_Percentage,
          // Student_.Phd_Backlog_History,
          // Student_.Phd_Year,
          // Student_.First_Preference,
          // Student_.First_Preference_Country,
          // Student_.First_Preference_University,
          // Student_.First_Preference_Course,
          // Student_.First_Preference_Intake,
          // Student_.First_Preference_Coursefee,
          // Student_.First_Preference_Expense,
          // Student_.Second_Preference,
          // Student_.Second_Preference_Country,
          // Student_.Second_Preference_University,
          // Student_.Second_Preference_Course,
          // Student_.Second_Preference_Intake,
          // Student_.Second_Preference_Coursefee,
          // Student_.Second_Preference_Expense,
          // Student_.Third_Preference,
          // Student_.Third_Preference_Country,
          // Student_.Third_Preference_University,
          // Student_.Third_Preference_Course,
          // Student_.Third_Preference_Intake,
          // Student_.Third_Preference_Coursefee,
          // Student_.Third_Preference_Expense,
         



	// 		  ],
	// 		  connection
	// 		).result();
	// 		await connection.commit();
	// 		connection.release();
	// 		rs(result1);
	// 	  } catch (err) {
	// 		await connection.rollback();
	// 		rej(err);
	// 	  }
	// 	});
	//   },


  // Save_Front_Student: async function (Student_) {
	// 	console.log(Student_)
	// 	return new Promise(async (rs, rej) => {
	// 	  const pool = db.promise();
	// 	  let result1;
	// 	  var connection = await pool.getConnection();
	// 	  await connection.beginTransaction();
		  
	
	// 	  try {
	// 		const result1 = await new storedProcedure(
	// 		  "Save_Front_Student1",
	// 		  [
				
  //         Student_.Student_Id,
  //         Student_.Student_Name,
  //         Student_.Dob,
  //         Student_.Address1,
  //         Student_.Telephone,
  //         Student_.Guardian_telephone,
  //         Student_.Email,
  //         Student_.Marital_Status_Id ,
  //         Student_.Marital_Status_Name,
  //         Student_.Spouse_Name,
  //         Student_.No_Of_Kids_And_Age,
  //         Student_.Date_Of_Marriage,
  //         Student_.Spouse_Occupation,
  //         Student_.Spouse_Qualification,
  //         Student_.Any_Previous_Visa,
  //         Student_.Ielts,
  //         Student_.Taken_Date,
  //         Student_.Listening,
  //         Student_.Reading,
  //         Student_.Writing,
  //         Student_.Speaking,
  //         Student_.Overall,
  //         Student_.Student_Experience_Data,
  //         Student_.Qualification_Data,
  //         Student_.Application_Details_Data,

	// 		  ],
	// 		  connection
	// 		).result();
	// 		await connection.commit();
	// 		connection.release();
	// 		rs(result1);
	// 	  } catch (err) {
  //       ;
	// 		await connection.rollback();
	// 		rej(err);
	// 	  }
	// 	});
	//   },

  Update_Password_Mobile: function(User_Details_Id_, Password_, callback) {
    console.log('User_Details_Id_: ', User_Details_Id_);
    // Call the stored procedure using query parameters
    return db.query(
      "CALL Update_Password_Mobile(?, ?)", 
      [User_Details_Id_, Password_], 
      callback
    );
  },

  Save_Front_Student: async function (Student_) {
      console.log(Student_.Application_Details_Data)
      console.log(Student_)
      return new Promise(async (rs, rej) => {
       const pool = db.promise();
       let result1;
       var connection = await pool.getConnection();
       await connection.beginTransaction();
       
     
       try {
       const result1 = await new storedProcedure(
     "Save_Front_Student1",
     [
     
      Student_.Unique_Id,
      Student_.Student_Name,
      Student_.Dob,
      Student_.Address1,
      Student_.Telephone,
      Student_.Guardian_telephone,
      Student_.Email,
      Student_.Marital_Status_Id ,
      Student_.Marital_Status_Name,
      Student_.Spouse_Name,
      Student_.No_Of_Kids_And_Age,
      Student_.Date_Of_Marriage,
      Student_.Spouse_Occupation,
      Student_.Spouse_Qualification,
      Student_.Any_Previous_Visa,
      Student_.Ielts,
      Student_.Ielts_Type_Id,
      Student_.Taken_Date,
      Student_.Exam_Check,
      Student_.Listening,
      Student_.Reading,
      Student_.Writing,
      Student_.Speaking,
      Student_.Overall,
      Student_.Description,
      JSON.stringify(Student_.Student_Experience_Data),
      JSON.stringify(Student_.Qualification_Data),
      JSON.stringify(Student_.Application_Details_Data),
      
    
     ],
     connection
       ).result();
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
    Get_Fornt_Student_Dropdowns:function(callback)
      { 
      return db.query("CALL Get_Fornt_Student_Dropdowns()",[],callback);
      },

      Get_Student_Fill_Check:function(rstring_,callback)
      { 
     return db.query("CALL Get_Student_Fill_Check(@rstring_ :=?)",[rstring_],callback);
      }
      ,

      Fetch_Student_Details:function(Unique_Id_,callback)
    { 
        console.log(Unique_Id_)
   return db.query("CALL Fetch_Student_Details(@Unique_Id_ :=?)",[Unique_Id_],callback);
    }
    ,
    


Save_Student_Course_ed: async function (Student_Course_Apply_) {
    return new Promise(async (rs, rej) => {
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      var Course_Apply = Student_Course_Apply_.Course_Apply;
      try {
        const result1 = await (new storedProcedure('Save_Student_Course', [0, Student_Course_Apply_.Student_Id,
          Course_Apply,Student_Course_Apply_.Login_Id], connection)).result();

        const result2 = await (new storedProcedure('Load_Company', [], connection)).result();
        const result3 = await (new storedProcedure('Load_User', [Student_Course_Apply_.Login_Id], connection)).result();
        sgMail.setApiKey(result3[0].FollowUp_Target)
        console.log(result3[0].FollowUp_Target);
        var a = "<table style='border-collapse: collapse;  border-spacing: 0; vertical-align: top;  width:100%; ' >"
        var b = ""
        for (var i = 0; i < result1.length; i++) 
        {
          b = b 
          +"<tr  style = 'background:#1d5ea0;color:#eef0f0; font-weight:bold; width:100%; '><td style='padding:5px; '> Course </td>"

          +"<td style='padding:5px' >" + result1[i].Course_Name + "</td></tr>"
           + "<tr><td style='padding:5px'> Country </td><td style='padding:5px'>" +result1[i].Country_Name + "</td></tr>" 
           + "<tr><td style='padding:5px'> University </td><td style='padding:5px'>"+ result1[i].University_Name + "</td><td>" 
          
          //  + "<tr><td style='padding:5px'> Subject </td><td>"+ result1[i].Subject_Name + "</td><td>" 
           + "<tr><td style='padding:5px'> Application Fees </td><td style='padding:5px'>"+ result1[i].Application_Fees + "</td><td>"
           + "<tr><td style='padding:5px'> Tuition Fees </td><td style='padding:5px'>"+ result1[i].Tution_Fees + "</td><td>" 
           + "<tr><td style='padding:5px'> Entry Requirements </td><td style='padding:5px'>"+ result1[i].Entry_Requirement + "</td><td>" 
          //  + "<tr><td style='padding:5px'> Work Experience </td><td>"+ result1[i].Work_Experience + "</td><td>" 
           + "<tr><td style='padding:5px'> Level </td><td style='padding:5px'>"+ result1[i].Level_Detail_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Duration </td><td style='padding:5px'>"+ result1[i].Duration_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Intake </td><td style='padding:5px'>"+ result1[i].intake_Name + "</td><td>" 
           + "<tr><td style='padding:5px'> IELTS </td><td style='padding:5px'>"+ result1[i].Ielts_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Course link </td><td style='padding:5px'>"+ result1[i].Notes + "</td></tr>"
          
           if(Student_Course_Apply_.expense_include==true){
            b=b + "<tr><td style='padding:5px;font-weight:bold;'> Expense Details </td><td style='padding:5px'></td></tr>"
            if(result1[i].Registration_Fees!=undefined)
            b=b + "<tr><td style='padding:5px'> Registration Fees  </td><td style='padding:5px'>"+ result1[i].Registration_Fees + "</td></tr>"
            if(result1[i].Date_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Date Charges </td><td style='padding:5px'>"+ result1[i].Date_Charges + "</td></tr>"
            if(result1[i].Bank_Statements!=undefined)
            b=b + "<tr><td style='padding:5px'> Bank Statements</td><td style='padding:5px'>"+ result1[i].Bank_Statements + "</td></tr>"
            if(result1[i].Insurance!=undefined)
            b=b + "<tr><td style='padding:5px'> Insurance </td><td style='padding:5px'>"+ result1[i].Insurance + "</td></tr>"
            if(result1[i].VFS_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> VFS Charges </td><td style='padding:5px'>"+ result1[i].VFS_Charges + "</td></tr>"
            if(result1[i].Apostille!=undefined)
            b=b + "<tr><td style='padding:5px'> Apostille </td><td style='padding:5px'>"+ result1[i].Apostille + "</td></tr>"
            if(result1[i].Other_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Other Charges </td><td style='padding:5px'>"+ result1[i].Other_Charges + "</td></tr>"
           }            
           if(result1[i].Details!=null)           
           b=b+ "<tr><td style='padding:5px'>Details </td><td> "+ result1[i].Details.replace(/(?:\r\n|\r|\n)/g, '<br>') + "</td><td>" 
             
          //  + "<tr><td style='padding:5px'> Expense Details </td><td style='padding:5px'>"+ result1[i].Living_Expense+ "</td><td>" 

             + "<tr><td style='padding:5px'>  </td><td style='padding:5px'>"+  "</td></tr>"
             console.log(result1[i].Details )
        }
        a = a + b + "</table>"
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: 
          {
            user: result3[0].Email,
            pass: '@infedabroad10'
          }
        });
        console.log(result1[0].Email);


        // <div style='padding-left:10px'> Dear <span style = 'color:#2f3293; font-weight:bold;'>" + result1[0].Student_Name + ",</span>"
        //     + "<br/><br/>"   
        //     + "  Greetings from "+ result2[0].companyname+""
        //     + "<br/><br/>"   
        //     + "Thank you for your enquiry with us."
        //     + "<br/><br/>" + "<p style = 'background:#1d5ea0;color:#eef0f0;font-family:Roboto !important; padding:12px;'>COURSE DETAILS </p>"
        //     + "<br/><br/>" + a + ""
        //     + "<br/><br/>" + ""  
        //     + "<br/><br/>" + "Thanks & Regards" 


        const msg = 
        {
          to: result1[0].Email,
          from: result3[0].Email, // Change to your verified sender
          subject: 'Course details',
          attachments: [
           {
             filename:     'companylogo.PNG',          
             type:  'image/PNG',
             content_id:   'myimagecid',
             content:      base64str ,
             disposition : "inline"
           }], 
          html: 

            "<table><tr><td><div class='gmail_quote'>"
  + "<br>" 
  + "<u></u>"
  + "<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> "
    + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> "
      + "<tbody> "
        + "<tr style='vertical-align: top;'> "
          + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> "
            + "<div style='padding: 10px 0px 0px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='width: 100%!important;'>"
                      + "<div style='padding: 0px; border: 0px solid transparent;'>"
                        + "<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr>"
                              + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                  + "<tbody>"
                                    + "<tr>"
                                      + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
                                        + "<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>"
                                        +"<img src='cid:myimagecid' alt=''/>  "
                                        //+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
                                        + "</a>"
                                      + "</td>"
                                    + "</tr>"
                                  + "</tbody>"
                                + "</table>"
                              + "</td>"
                            + "</tr>"
                          + "</tbody>"
                        + "</table>"
                      + "</div>"
                    + "</div>"
                  + "</div>"
                + "</div>"
              + "</div>"
            + "</div>"
            + "<div style='padding: 0px 0px 10px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='background-color: #ffffff; width: 100%!important;'>"
                      + "<div style='padding: 25px; border-top: 5px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>"
                        + "<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr style='height: 451px;'>"
                              + "<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>"
                                + "<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>"
                                  + "<p style='font-size: 14px; line-height: 170%;'>"
                                    + "<span >"
                                      + "<strong>"
                                        + "<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Hi "+ result1[0].Student_Name +",<br/></span>"
                                          + "</strong>"
                                          // + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
                                          + "<span style='font-size: 16px; line-height: 27.2px;'>Greetings from "+ result2[0].companyname+", Thank you for your enquiry with us. Please find the program details below</span>"
                                            + "</span>"


                                            + "</p>"
                                         
                                            + "</p>"
                                            // + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
                                            + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
                                            + "<strong>Course Details</strong>"
                                            + "<hr>"
                                    
                                    
                                           +a
                                  
                                           + "<p style='font-size: 11px; line-height: 160%;'>"
                                          //  #024c70
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> "
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> "
                                           + result3[0].User_Details_Name + "<br/>" +result3[0].Mobile
                                           +" </span> "

                                           + "</p>"
                                  
                                            // + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
                                            + "</p>"

                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                          
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
                        
                        
                                            + "<br>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>"
                                            // + "<p style='font-size: 14px; line-height: 160%;'>"
                                            // + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
                                            //  + " </span>"
                                            // + "</p>"
                                            + "<p style='font-size: 14px; line-height: 50%;'>"
                                            + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "
                                           + result2[0].companyname  + "<br/>"  + result2[0].Address1 + "<br/>" +result2[0].Address2 + "<br/>" +result2[0].Address3
                                            
                                            + "</span>"
                                            + "</p>"
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
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div align='center'>"
                                            + "<div style='display: table; max-width: 244px;'>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                            + "<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>"
                                 
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div></td></tr></table>"



          //  + result3[0].User_Details_Name + "<br/>" +
          //   result2[0].Mobile + "<br/>" + " <img src='cid:myimagecid' alt='no image found'/><br/><br/>" +
          //   result2[0].Email + ""
          //   + "<br/><br/>" +  ""
          //    + result2[0].Address1 + "<br/>" +
          //   result2[0].Address2 + "<br/>" + 
          //   result2[0].Address3 + "<br/>" +
          //    result2[0].Mobile + "</div>"        
        }
        sgMail
        var d = await sgMail.send(msg);
        console.log(d);
        await connection.commit();
        connection.release();
        rs(result1);
      }
        catch (err) {
        ;
        await connection.rollback();
        rej(err);
      }
    })
  },


  Post_FB_Lead: function (Lead_, callback) {    
    return db.query(
      "CALL Post_FB_Lead(@Student_Name_ :=?,@Phone_Number_ :=?)",
      [Lead_.Student_Name,Lead_.Phone_Number],
      callback
    );
  }, 
  Save_Student_Coursetest: async function (Student_Course_Apply_) {
   // let testAccount = await nodemailer.createTestAccount();
   
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
      SES: { ses, AWS },
    });

      // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'sudheesh@ufstechnologies.com', // sender address
    to: "sudheesh@ufstechnologies.com" ,// list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });


  },
  Save_Student_Course33: async function (Student_Course_Apply_) {
    return new Promise(async (rs, rej) => {
      const pool = db.promise();
      let result1;
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      var Course_Apply = Student_Course_Apply_.Course_Apply;
      try {
        const result1 = await (new storedProcedure('Save_Student_Course', [0, Student_Course_Apply_.Student_Id,
          Course_Apply,Student_Course_Apply_.Login_Id], connection)).result();

        const result2 = await (new storedProcedure('Load_Company', [], connection)).result();
        const result3 = await (new storedProcedure('Load_User', [Student_Course_Apply_.Login_Id], connection)).result();
       var a = "<table style='border-collapse: collapse;  border-spacing: 0; vertical-align: top;  width:100%; ' >"
        var b = ""
        for (var i = 0; i < result1.length; i++) 
        {
          b = b 
          +"<tr  style = 'background:#1d5ea0;color:#eef0f0; font-weight:bold; width:100%; '><td style='padding:5px; '> Course </td>"

          +"<td style='padding:5px' >" + result1[i].Course_Name + "</td></tr>"
           + "<tr><td style='padding:5px'> Country </td><td style='padding:5px'>" +result1[i].Country_Name + "</td></tr>" 
           + "<tr><td style='padding:5px'> University </td><td style='padding:5px'>"+ result1[i].University_Name + "</td><td>" 
          
          //  + "<tr><td style='padding:5px'> Subject </td><td>"+ result1[i].Subject_Name + "</td><td>" 
          + "<tr><td style='padding:5px'> Application Fees </td><td style='padding:5px'>"+ result1[i].Application_Fees + "</td><td>"
           + "<tr><td style='padding:5px'> Tuition Fees </td><td style='padding:5px'>"+ result1[i].Tution_Fees + "</td><td>" 
           + "<tr><td style='padding:5px'> Entry Requirements </td><td style='padding:5px'>"+ result1[i].Entry_Requirement + "</td><td>" 
          //  + "<tr><td style='padding:5px'> Work Experience </td><td>"+ result1[i].Work_Experience + "</td><td>" 
           + "<tr><td style='padding:5px'> Level </td><td style='padding:5px'>"+ result1[i].Level_Detail_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Duration </td><td style='padding:5px'>"+ result1[i].Duration_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Intake </td><td style='padding:5px'>"+ result1[i].intake_Name + "</td><td>" 
           + "<tr><td style='padding:5px'> IELTS </td><td style='padding:5px'>"+ result1[i].Ielts_Name + "</td><td>"
           + "<tr><td style='padding:5px'> Course link </td><td style='padding:5px'>"+ result1[i].Notes + "</td></tr>"
          
           if(Student_Course_Apply_.expense_include==true){
            b=b + "<tr><td style='padding:5px;font-weight:bold;'> Expense Details </td><td style='padding:5px'></td></tr>"
            if(result1[i].Registration_Fees!=undefined)
            b=b + "<tr><td style='padding:5px'> Registration Fees  </td><td style='padding:5px'>"+ result1[i].Registration_Fees + "</td></tr>"
            if(result1[i].Date_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Date Charges </td><td style='padding:5px'>"+ result1[i].Date_Charges + "</td></tr>"
            if(result1[i].Bank_Statements!=undefined)
            b=b + "<tr><td style='padding:5px'> Bank Statements</td><td style='padding:5px'>"+ result1[i].Bank_Statements + "</td></tr>"
            if(result1[i].Insurance!=undefined)
            b=b + "<tr><td style='padding:5px'> Insurance </td><td style='padding:5px'>"+ result1[i].Insurance + "</td></tr>"
            if(result1[i].VFS_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> VFS Charges </td><td style='padding:5px'>"+ result1[i].VFS_Charges + "</td></tr>"
            if(result1[i].Apostille!=undefined)
            b=b + "<tr><td style='padding:5px'> Apostille </td><td style='padding:5px'>"+ result1[i].Apostille + "</td></tr>"
            if(result1[i].Other_Charges!=undefined)
            b=b + "<tr><td style='padding:5px'> Other Charges </td><td style='padding:5px'>"+ result1[i].Other_Charges + "</td></tr>"
           }            
           if(result1[i].Details!=null)           
           b=b+ "<tr><td style='padding:5px'>Details </td><td> "+ result1[i].Details.replace(/(?:\r\n|\r|\n)/g, '<br>') + "</td><td>" 
             
          //  + "<tr><td style='padding:5px'> Expense Details </td><td style='padding:5px'>"+ result1[i].Living_Expense+ "</td><td>" 

             + "<tr><td style='padding:5px'>  </td><td style='padding:5px'>"+  "</td></tr>"
             console.log(result1[i].Details )
        }
        a = a + b + "</table>"
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: 
          {
            user: 'teena@ufstechnologies.com',
            pass: 'teena1225'
          }
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


        const msg = 
        {
          to: result1[0].Email,
          from: 'hr@ufstechnologies.com', // Change to your verified sender
          subject: 'Course details',
          attachments: [
           {
             filename:     'companylogo.PNG',          
             type:  'image/PNG',
             content_id:   'myimagecid',
             content:      base64str ,
             disposition : "inline"
           }], 
          html: ''
          }
           var html= "<table><tr><td><div class='gmail_quote'>"
  + "<br>" 
  + "<u></u>"
  + "<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> "
    + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> "
      + "<tbody> "
        + "<tr style='vertical-align: top;'> "
          + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> "
            + "<div style='padding: 10px 0px 0px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='width: 100%!important;'>"
                      + "<div style='padding: 0px; border: 0px solid transparent;'>"
                        + "<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr>"
                              + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                  + "<tbody>"
                                    + "<tr>"
                                      + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
                                        + "<a href='' rel='noopener' target='_blank' data-saferedirecturl=''>"
                                        +"<img src='cid:myimagecid' alt=''/>  "
                                        //+ "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
                                        + "</a>"
                                      + "</td>"
                                    + "</tr>"
                                  + "</tbody>"
                                + "</table>"
                              + "</td>"
                            + "</tr>"
                          + "</tbody>"
                        + "</table>"
                      + "</div>"
                    + "</div>"
                  + "</div>"
                + "</div>"
              + "</div>"
            + "</div>"
            + "<div style='padding: 0px 0px 10px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='background-color: #ffffff; width: 100%!important;'>"
                      + "<div style='padding: 25px; border-top: 5px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>"
                        + "<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr style='height: 451px;'>"
                              + "<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>"
                                + "<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>"
                                  + "<p style='font-size: 14px; line-height: 170%;'>"
                                    + "<span >"
                                      + "<strong>"
                                        + "<span style='font-size: 16px; color: #003399; line-height: 27.2px;'>Hi "+ result1[0].Student_Name +",<br/></span>"
                                          + "</strong>"
                                          // + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
                                          + "<span style='font-size: 16px; line-height: 27.2px;'>Greetings from "+ result2[0].companyname+", Thank you for your enquiry with us. Please find the program details below</span>"
                                            + "</span>"


                                            + "</p>"
                                         
                                            + "</p>"
                                            // + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
                                            + "<p style='color: #003399; font-size: 14px; line-height: 170%;'>"
                                            + "<strong>Course Details</strong>"
                                            + "<hr>"
                                    
                                    
                                           +a
                                  
                                           + "<p style='font-size: 11px; line-height: 160%;'>"
                                          //  #024c70
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361; font-weight:bold;'> Thanks and regards,<br/></span> "
                                           + "<span style='font-size: 14px; line-height: 25.6px; color: #072361;  '> "
                                           + result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
                                           +" </span> "

                                           + "</p>"
                                  
                                            // + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
                                            + "</p>"

                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                          
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
                        
                        
                                            + "<br>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>"
                                            // + "<p style='font-size: 14px; line-height: 160%;'>"
                                            // + "<span style='font-size: 20px; line-height: 32px;'> Thanks and regards,  "+ result3[0].User_Details_Name + "<br/>" +result2[0].Mobile
                                            //  + " </span>"
                                            // + "</p>"
                                            + "<p style='font-size: 14px; line-height: 50%;'>"
                                            + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'> "
                                           + result2[0].companyname  + "<br/>"  + result2[0].Address1 + "<br/>" +result2[0].Address2 + "<br/>" +result2[0].Address3
                                            
                                            + "</span>"
                                            + "</p>"
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
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div align='center'>"
                                            + "<div style='display: table; max-width: 244px;'>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.facebook.com/edabroad.in/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.facebook.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.linkedin.com/company/edabroad/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.linkedin.com/company/edabroad/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.instagram.com/edabroad.in/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.instagram.com/edabroad.in/'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.youtube.com/channel/UCPrMkkrHS-RQ74N7AwgJ2ug/featured'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            // + "<a href='info@edabroad.in' title='Email' rel='noopener' target='_blank' data-saferedirecturl='info@edabroad.in'>"
                                            // + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
                                            // + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                            + "<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>"
                                 
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div></td></tr></table>"



          //  + result3[0].User_Details_Name + "<br/>" +
          //   result2[0].Mobile + "<br/>" + " <img src='cid:myimagecid' alt='no image found'/><br/><br/>" +
          //   result2[0].Email + ""
          //   + "<br/><br/>" +  ""
          //    + result2[0].Address1 + "<br/>" +
          //   result2[0].Address2 + "<br/>" + 
          //   result2[0].Address3 + "<br/>" +
          //    result2[0].Mobile + "</div>"        
       // }
        sgMail
        //var d = await sgMail.send(msg);

        var params = {
          Source: 'sudheesh@ufstechnologies.com',
          Destination: {
            ToAddresses: [
              result1[0].Email
            ]
          },
          ReplyToAddresses: [
            'sudheesh@ufstechnologies.com',
          ],
          Message: {
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: html
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: 'Course details'
            },
            attachments: [
              {
                filename:     'companylogo.PNG',          
                // type:  'image/PNG',                       
                path:  _dirname+'/companylogo.PNG',
                cid:   'myimagecid',
                // content:      base64str ,
                // disposition : "inline"
              }], 
          }
        };
        
        const data = await sesClient.send (new SendEmailCommand(params));
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


savetest()
{

var a="<div class='gmail_quote'>"
  + "<br>" 
  + "<u></u>"
  + "<div style='margin: 0; padding: 0; background-color: #f2f2f2;'> "
    + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f2f2f2; width: 100%;' cellspacing='0' cellpadding='0'> "
      + "<tbody> "
        + "<tr style='vertical-align: top;'> "
          + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;'> "
            + "<div style='padding: 10px 0px 0px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='width: 100%!important;'>"
                      + "<div style='padding: 0px; border: 0px solid transparent;'>"
                        + "<table id='u_content_image_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr>"
                              + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                + "<table border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                  + "<tbody>"
                                    + "<tr>"
                                      + "<td style='padding-right: 0px; padding-left: 0px;' align='left'>"
                                        + "<a href='https://unlayer.com' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNEr0p4hV7LvBHWvd2OhBcaTpo3Stw'>"
                                          + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; width: 25%; max-width: 132.5px;' title='Unlayer' src='https://ci5.googleusercontent.com/proxy/FXBvMBOXqAq3ihb8-kOoyYhuqeQ8eX5gdd5ALDYwEXECjZ2uQiNdsEy2nvfkuCTP95dVTf8sqdDaY1T7qU8vcHuUFVTZpbomsGz-ovEiQYl--FC3QemF=s0-d-e1-ft#https://cdn.templates.unlayer.com/assets/1600676683824-dark_logo.png' alt='Unlayer' width='132.5' align='left' border='0'>"
                                        + "</a>"
                                      + "</td>"
                                    + "</tr>"
                                  + "</tbody>"
                                + "</table>"
                              + "</td>"
                            + "</tr>"
                          + "</tbody>"
                        + "</table>"
                      + "</div>"
                    + "</div>"
                  + "</div>"
                + "</div>"
              + "</div>"
            + "</div>"
            + "<div style='padding: 0px 0px 10px; background-color: transparent;'>"
              + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                  + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                    + "<div style='background-color: #ffffff; width: 100%!important;'>"
                      + "<div style='padding: 25px; border-top: 5px solid #000000; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;'>"
                        + "<table id='u_content_text_3' style='font-family: arial, helvetica, sans-serif; height: 451px; width: 100%;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                          + "<tbody>"
                            + "<tr style='height: 451px;'>"
                              + "<td style='word-break: break-word; padding: 10px 10px 20px; font-family: arial, helvetica, sans-serif; height: 451px;' align='left'>"
                                + "<div style='color: #000000; line-height: 170%; text-align: left; word-wrap: break-word;'>"
                                  + "<p style='font-size: 14px; line-height: 170%;'>"
                                    + "<span style='color: #339966;'>"
                                      + "<strong>"
                                        + "<span style='font-size: 16px; line-height: 27.2px;'>Hi Midhula,</span>"
                                          + "</strong>"
                                            + "</span>"
                                            + "</p>"
                                            + "<p style='font-size: 14px; line-height: 10%;'>&nbsp;</p>"
                                            + "<p style='font-size: 14px; line-height: 100%;'>"
                                            + "<span style='font-size: 16px; line-height: 27.2px;'>Thank you for signing up for your free trial with Unlayer! A world of beautiful, mobile-ready emails and landing pages await you.</span>"
                                            + "</p>"
                                  
                                            + "</p>"
                                            + "<p style='font-size: 14px; line-height: 170%;'>&nbsp;</p>"
                                            + "<p style='font-size: 14px; line-height: 170%;'>"
                                            + "Course Details"
                                            + "<hr>"
                                    
                                    
                                            + "<table>"
                                              + "<tr>"
                                                + "<td>test1</td>"
                                                + "<td>ts</td>"
                                              + "</tr>"
                                            + "</table>"
                                  
                                  
                                            + "<span style='font-size: 16px; line-height: 27.2px;'>We tried to make Unlayer the most intuitive, easy and flexible drag-and-drop email builder on the planet. But, if you have questions or need help, you can reach our <a href='https://unlayer.com/contact' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://unlayer.com/contact&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNH6qXyS_qrM_ZKJMDjya3pGs71wGA'>support team here</a> or by clicking the gray chat icon in the bottom right of your screen.</span>"
                                            + "</p>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                          
                                            + "<table id='u_content_button_1' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                            + "<div align='left'>"
                                            + "<a href='https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source=automation&amp;utm_medium=email&amp;utm_campaign=studio-d0-welcome' style='box-sizing: border-box; display: inline-block; font-family: arial,helvetica,sans-serif; text-decoration: none; text-align: center; color: #ffffff; background-color: #0aab13; border-radius: 30px; width: auto; max-width: 100%; word-break: break-word; word-wrap: break-word;' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://dashboard.unlayer.com/projects/27535/design/campaigns/new?utm_source%3Dautomation%26utm_medium%3Demail%26utm_campaign%3Dstudio-d0-welcome&amp;source=gmail&amp;ust=1626172295961000&amp;usg=AFQjCNFPlOHx9CTUObj0RyoCAi1nvmP-wA'>"
                                            + "<span style='display: block; padding: 15px 25px; line-height: 120%;'>"
                                            + "<strong>"
                                            + "<span style='font-size: 20px; line-height: 24px;'>Start Designing</span>"
                                            + "</strong>"
                                            + "</span>"
                                            + "</a>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                        
                        
                                            + "<br>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 41px 55px 18px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div style='color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;'>"
                                            + "<p style='font-size: 14px; line-height: 160%;'>"
                                            + "<span style='font-size: 20px; line-height: 32px;'>"
                                            + "<strong>Get in touch</strong>"
                                            + "</span>"
                                            + "</p>"
                                            + "<p style='font-size: 14px; line-height: 160%;'>"
                                            + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'>+11 111 333 4444</span>"
                                            + "</p>"
                                            + "<p style='font-size: 14px; line-height: 160%;'>"
                                            + "<span style='font-size: 16px; line-height: 25.6px; color: #000000;'>Info@YourCompany.com</span>"
                                            + "</p>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='font-family: 'Cabin',sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 10px 10px 33px; font-family: 'Cabin',sans-serif;' align='left'>"
                                            + "<div align='center'>"
                                            + "<div style='display: table; max-width: 244px;'>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            + "<a href='https://facebook.com/' title='Facebook' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://facebook.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNFtvJKw3XnCaUSv8RdvoP9vy-0ZvA'>"
                                            + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Facebook' src='https://ci5.googleusercontent.com/proxy/U89pYXD46FMVVngFcy3k2zsTBamg7YOGP0WjBRS5h30tZixftmDCdIicNSggTpHkZCHVupSPYouD-oYpM5cJAV51r88Vyrapbkib6PRQ46EJ9fzlSN_B=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png' alt='Facebook' width='32'>"
                                            + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            + "<a href='https://linkedin.com/' title='LinkedIn' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://linkedin.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNEacgKW37ivJQFMNB-7eIoITYVZqA'>"
                                            + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='LinkedIn' src='https://ci4.googleusercontent.com/proxy/17XFcaMIW-RvcN4x6-5J-qSfHgr94ydQmz0QXjLq_gL5tHQ3ryLcJubcfhf04fxkJN6k7VVTPYfnRG5x6oX3LMjHbjO3Xxoql9YEVpL54NnBs5cr8ff5=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png' alt='LinkedIn' width='32'>"
                                            + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            + "<a href='https://instagram.com/' title='Instagram' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://instagram.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNE7A29d6myChbFrKbjmgQNirRj_jA'>"
                                            + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Instagram' src='https://ci4.googleusercontent.com/proxy/UfyJpVcccZD3hgPZqRQbq28YwgzlR1IXn-__CtkVbpJW3yVArZ1lKbPuyuSN6ojoOwPFhaDXaBQQBEtV9ACm8DT4fMnBAjXTdBxzION0sDv2iagjp8MHPA=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png' alt='Instagram' width='32'>"
                                            + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 17px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            + "<a href='https://youtube.com/' title='YouTube' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://youtube.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNFcbGo2qjbXfaJFkTFd8Y4i-7jIYA'>"
                                            + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='YouTube' src='https://ci3.googleusercontent.com/proxy/mPcIHyJdZhWWXM2C59iorpToez6bZpBDovq4BAx5RCVLCPcJFZm_vltlHectWxgMDDiZe-4rQOIOhTzYg2PugMnJe836gJx_z04QEKWWnD7Xrf6qOuo=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png' alt='YouTube' width='32'>"
                                            + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "<table style='border-collapse: collapse; table-layout: fixed; border-spacing: 0; vertical-align: top; margin-right: 0px;' border='0' width='32' cellspacing='0' cellpadding='0' align='left'>"
                                            + "<tbody>"
                                            + "<tr style='vertical-align: top;'>"
                                            + "<td style='word-break: break-word; border-collapse: collapse!important; vertical-align: top;' align='left' valign='middle'>"
                                            + "<a href='https://email.com/' title='Email' rel='noopener' target='_blank' data-saferedirecturl='https://www.google.com/url?q=https://email.com/&amp;source=gmail&amp;ust=1626171745829000&amp;usg=AFQjCNEHtm9pytuxDKyYHWhGgz4JVmC6FQ'>"
                                            + "<img style='outline: none; text-decoration: none; clear: both; display: block!important; border: none; height: auto; float: none; max-width: 32px!important;' title='Email' src='https://ci3.googleusercontent.com/proxy/aB3qIicdyVC3mIlvvjARxi7uohsatvRqLz6yBk2kUtBgBkjbzM6lCWkW6GZR9WCFe_pdQGMpn6SB558qnJj1meAD2o9CgVRH_SNQM-zb27RopcU7=s0-d-e1-ft#https://cdn.tools.unlayer.com/social/icons/circle-black/email.png' alt='Email' width='32'>"
                                            + "</a>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "<div style='padding: 0px; background-color: transparent;'>"
                                            + "<div style='margin: 0 auto; min-width: 320px; max-width: 550px; word-wrap: break-word; word-break: break-word; background-color: transparent;'>"
                                            + "<div style='border-collapse: collapse; display: table; width: 100%; background-color: transparent;'>"
                                            + "<div style='max-width: 320px; min-width: 550px; display: table-cell; vertical-align: top;'>"
                                            + "<div style='width: 100%!important;'>"
                                            + "<div style='padding: 0px; border: 0px solid transparent;'>"
                                            + "<table id='u_content_text_2' style='font-family: arial,helvetica,sans-serif;' role='presentation' border='0' width='100%' cellspacing='0' cellpadding='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td style='word-break: break-word; padding: 20px; font-family: arial,helvetica,sans-serif;' align='left'>"
                                            + "<div style='color: #9c9a9a; line-height: 120%; text-align: center; word-wrap: break-word;'>"
                                 
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</div>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "</div>"



},


 Save_Student_Course1: async function (Student_Course_Apply_) 
 {
    return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    await connection.beginTransaction();
    var Course_Apply = Student_Course_Apply_.Course_Apply;
    try
    {
      const msg = {
        to: 'teena@ufstechnologies.com', // Change to your recipient
        from: 'hr@ufstechnologies.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
      }
       const n=await sgMail.send(msg)
       //  .then(() => {
       //    return 1;
         
       //  })
       //  .catch((error) => {
       //    console.error(error)
       //    return 1;
         
       // })
     //  const result1 = await(new storedProcedure('Save_Student_Course',[0, Student_Course_Apply_.Student_Id,
     //     Course_Apply], connection)).result(); 
     //   var a ="<table><tr><td>Country</td><td>University</td><td>Course</td>"
     //   var b=""
     //   for(var i=0;i<result1.length;i++)
     //   {
     //     b = b + "<tr><td>" + result1[i].Country_Name + "</td><td>" + result1[i].University_Name + "</td><td>" + result1[i].Course_Name +"</td></tr>"
     //   }
     // a =a +b +"</tr></table>"
     //      let transporter = nodemailer.createTransport({
     //         host: 'smtp.gmail.com',
     //          port: 587,
     //          secure: false,
     //          requireTLS: true,
     //           auth: {
     //             user: 'teena@ufstechnologies.com', 
     //             pass: 'teena1225'
     //           }
     //         });
     //        const mailOptions = {
     //          from: 'teena@ufstechnologies.com', 
     //          to: result1[0].Email, 
     //          subject: 'Subject of your email', 
     //          html:"Dear "+result1[0].Student_Name+""
     //          +"<br/><br/>"
     //          +"  Greetings from Study Visa Finder!"  
     //          +"<br/><br/>"+a+""
              
     //        };
          
     //         transporter.sendMail(mailOptions, function (err, info) {
     //          if(err)
     //            return false;
     //          else
     //            return true;
     //       });
 
          
     //   await connection.commit();
     //   connection.release();
     //   rs( result1);
    }
    catch (err) {
       await connection.rollback();
       rej(err);
    }   
    })
 },
Get_site_Pageload:function(callback)
{ 
return db.query("CALL Get_site_Pageload()",[],callback);
},
// 
Public_Search_Course:function(Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1,callback)
{ 
  if (Course_Name===undefined || Course_Name==="undefined" )
  Course_Name='';
  if (Branch_Search===undefined || Branch_Search==="undefined" )
  Branch_Search='';
  if (Duration_Search===undefined || Duration_Search==="undefined" )
  Duration_Search='';
  return db.query("CALL Public_Search_Course(@Level_Detail_Id :=?,@Country_Id :=?,@Intake_Id :=?,@Sub_Section_Id :=?,@Course_Name :=?,@Branch_Search :=?,@Duration_Search :=?,@Ielts_ :=?,@Page_Start :=?,@Page_End :=?,@Page_Length :=?,@University :=?,@Subject_1 :=?)",
  [Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1],callback);
} ,

Public_Search_Course_Typeahead:function(Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1,callback)
{ 
  if (Course_Name===undefined || Course_Name==="undefined" )
  Course_Name='';
  if (Branch_Search===undefined || Branch_Search==="undefined" )
  Branch_Search='';
  if (Duration_Search===undefined || Duration_Search==="undefined" )
  Duration_Search='';
  return db.query("CALL Public_Search_Course_Typeahead(@Level_Detail_Id :=?,@Country_Id :=?,@Intake_Id :=?,,@Sub_Section_Id :=?,@Course_Name :=?,@Branch_Search :=?,@Duration_Search :=?,@Ielts_ :=?,@Page_Start :=?,@Page_End :=?,@Page_Length :=?,@University :=?,@Subject_1 :=?)",
  [Level_Detail_Id,Country_Id,Intake_Id,Sub_Section_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,University,Subject_1],callback);
} ,
 
// Public_Search_Course:function(Level_Detail_Id,Country_Id,Intake_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,callback)
// { 
//  if (Course_Name===undefined || Course_Name==="undefined" )
//  Course_Name='';
//  if (Branch_Search===undefined || Branch_Search==="undefined" )
//  Branch_Search='';
//  if (Duration_Search===undefined || Duration_Search==="undefined" )
//  Duration_Search='';
//  return db.query("CALL Public_Search_Course(@Level_Detail_Id :=?,@Country_Id :=?,@Intake_Id :=?,@Course_Name :=?,@Branch_Search :=?,@Duration_Search :=?,@Ielts_ :=?,@Page_Start :=?,@Page_End :=?,@Page_Length :=?)",
//  [Level_Detail_Id,Country_Id,Intake_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,],callback);
// } ,

// Public_Search_Course_Typeahead:function(Level_Detail_Id,Country_Id,Intake_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,callback)
// { 
//  if (Course_Name===undefined || Course_Name==="undefined" )
//  Course_Name='';
//  if (Branch_Search===undefined || Branch_Search==="undefined" )
//  Branch_Search='';
//  if (Duration_Search===undefined || Duration_Search==="undefined" )
//  Duration_Search='';
//  return db.query("CALL Public_Search_Course_Typeahead(@Level_Detail_Id :=?,@Country_Id :=?,@Intake_Id :=?,@Course_Name :=?,@Branch_Search :=?,@Duration_Search :=?,@Ielts_ :=?,@Page_Start :=?,@Page_End :=?,@Page_Length :=?)",
//  [Level_Detail_Id,Country_Id,Intake_Id,Course_Name,Branch_Search,Duration_Search,Ielts_,Page_Start,Page_End,Page_Length,],callback);
// } ,
Get_More_Information:function(Course_Id_,callback)
{ 
  db.query("CALL Get_More_Information(@Course_Id_ :=?)",[Course_Id_],callback);
},


Post_FB_Lead: function (Lead_, callback) {    
  return db.query(
    "CALL Post_FB_Lead(@Student_Name_ :=?,@Phone_Number_ :=?,@Whatsapp_ :=?,@Email_ :=?,@Address_ :=?,@Remark_ :=?)",
    [Lead_.Student_Name,Lead_.Phone_Number,Lead_.Whatsapp,Lead_.Email,Lead_.Address,Lead_.Remark],
    callback
  );
},


  Update_Student_Public: function (Student_, callback) {
    return db.query("CALL Update_Student(" + "@Student_Id_ :=?," + "@Agent_Id_ :=?," + "@Student_Name_ :=?," + "@Last_Name_ :=?,"
      + "@Address1_ :=?," + "@Address2_ :=?," + "@Pincode_ :=?," + "@Email_ :=?," + "@Phone_Number_ :=?," +
      "@Promotional_Code_ :=?," + "@Student_Status_Id_ :=?," + "@Password_ :=?" + ")"
      , [Student_.Student_Id, Student_.Agent_Id, Student_.Student_Name, Student_.Last_Name, Student_.Address1, Student_.Address2,
      Student_.Pincode, Student_.Email, Student_.Phone_Number, Student_.Promotional_Code,
      Student_.Student_Status_Id, Student_.Password], callback);
  },

// Get_Student_Details:function(Student_Id_,callback)
// {
 
//    db.query("CALL Get_Student_Details(@Student_Id_ :=?)",[Student_Id_],callback);
// },
// Get_Student_Course_Apply:function(Student_Id_,callback)
// { 
//    db.query("CALL Get_Student_Course_Apply(@Student_Id_ :=?)",[Student_Id_],callback);
// },

// Get_Message_Details:function(Student_Id_,callback)
// { 
//    db.query("CALL Get_Message_Details(@Student_Id_ :=?)",[Student_Id_],callback);
// },

// Get_Student_Course_Selection:function(Student_Course_Apply_Id_,callback)
// { 
//    db.query("CALL Get_Student_Course_Selection(@Student_Course_Apply_Id_ :=?)",[Student_Course_Apply_Id_],callback);
// },

Forgot_Password_Student: async function (Data) 
{
   var Email_=Data.Email;

        return new Promise(async (rs,rej)=>{
       const pool = db.promise();
        let result1;
         var connection = await pool.getConnection();
        await connection.beginTransaction();
        
         try
          {
           const result1 = await(new storedProcedure('Check_Student_Mail',[Email_], connection)).result();
           if (result1[0].Student_Id>=0){
     
                         let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                             port: 587,
                             secure: false,
                             requireTLS: true,
                              auth: {
                                user: 'annu@ufstechnologies.com', 
                                pass: 'annu@ufs2896'
                              }
                            });
                           const mailOptions = {
                             from: 'annu@ufstechnologies.com', 
                             to: Email_, 
                             subject: 'Forgot Password Studyvisafinder', 
                             html:"Dear "+result1[0].Student_Name+""
                             +"<br/>We have received your Forgot password request. Following is your password to login on Studyvisafinder Console.<br/>"
                             +"<br></br>"
                             +"<br/> Password : "+result1[0].Password+" <br/>"
                             +"<br></br>"
                             +"<br/> Once logged in successfully, you will need to change the above password. <br/>"
                             +"<br></br>"
                             +"<br/> Best regards, <br/>"
                             +"<br/> Studyvisafinder<br/>"
                             +"<br></br>"
                             +"<br/> Replies to this message are undeliverable and will not reach Studyvisafinder <br/>"
                             +"<br/> Please do not reply. <br/>"               
                             +"<br/><br/>"
                             
                           };
                         
                            transporter.sendMail(mailOptions, function (err, info) {
                            
                             if(err)

                               return 0;
                             else
                               return 1;
                          });
                       }
                         else
                         {
                            return 0;
                         }


           await connection.commit();
             connection.release();
             rs( {'Student_Id':1});
           }
           catch (err) {
             
           await connection.rollback();
           rej(err);
           }   
})
},




Forgot_Password_Agent: async function (Data) 
{
   var Email_=Data.Email;

        return new Promise(async (rs,rej)=>{
       const pool = db.promise();
        let result1;
         var connection = await pool.getConnection();
        await connection.beginTransaction();
        
         try
          {
           const result1 = await(new storedProcedure('Check_Agent_Mail',[Email_], connection)).result();
  if (result1[0].Client_Accounts_Id>=0){
     
                         let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                             port: 587,
                             secure: false,
                             requireTLS: true,
                              auth: {
                                user: 'annu@ufstechnologies.com', 
                                pass: 'annu@ufs2896'
                              }
                            });
                           const mailOptions = {
                             from: 'annu@ufstechnologies.com', 
                             to: Email_, 
                             subject: 'Forgot Password Studyvisafinder', 
                             html:"Dear "+result1[0].Client_Accounts_Name+""
                             +"<br/>We have received your Forgot password request. Following is your password to login on Studyvisafinder Console.<br/>"
                             +"<br></br>"
                             +"<br/> Password : "+result1[0].Password+" <br/>"
                             +"<br></br>"
                             +"<br/> Once logged in successfully, you will need to change the above password. <br/>"
                             +"<br></br>"
                             +"<br/> Best regards, <br/>"
                             +"<br/> Studyvisafinder<br/>"
                             +"<br></br>"
                             +"<br/> Replies to this message are undeliverable and will not reach Studyvisafinder <br/>"
                             +"<br/> Please do not reply. <br/>"               
                             +"<br/><br/>"
                             
                           };
                         
                            transporter.sendMail(mailOptions, function (err, info) {
                            
                             if(err)

                               return 0;
                             else
                               return 1;
                          });
                       }
                         else
                         {
                            return 0;
                         }


           await connection.commit();
             connection.release();
           
             rs( {'Client_Accounts_Id':1});
           }
           catch (err) {
             
           await connection.rollback();
           rej(err);
           }   
})
},



// Get_Student_Document:function(Student_Id_,callback)
// { 
// return db.query("CALL Get_Student_Document(@Student_Id_ :=?)",[Student_Id_],callback);
// },
// Search_Document:function(Document_Name_,callback)
// { 
// if (Document_Name_===undefined || Document_Name_==="undefined" )
// Document_Name_='';
// return db.query("CALL Search_Document(@Document_Name_ :=?)",[Document_Name_],callback);
// },
// Save_Student_Document:function(Post_,callback)
// {  
//  return db.query("CALL Save_Student_Document(@Student_Id_ :=?,@Document_Id_ :=?,@Image_Detail_ :=?)",[Post_.Student_Id,Post_.Document_Id,Post_.Image_Detail],callback);
// },

// Search_Student_Agent:function(From_Date_,To_Date_ ,Is_Date_Check_ ,Student_Name_ ,Phone_Number_ ,Agent_Id_,Student_Status_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_,callback)
// {
// if (Student_Name_===undefined || Student_Name_==="undefined" )
// Student_Name_='';

// if (Phone_Number_===undefined || Phone_Number_==="undefined" )
// Phone_Number_='';

// if (Agent_Id_===undefined || Agent_Id_==="undefined" )
// Agent_Id_=0;

// if (Pointer_Start_===undefined || Pointer_Start_==="undefined" )
// Pointer_Start_='';

// if (Pointer_Stop_===undefined || Pointer_Stop_==="undefined" )
// Pointer_Stop_='';

// return db.query("CALL Search_Student_Agent(@From_Date_ :=?,@To_Date_ :=?,@Is_Date_Check_ :=?,@Student_Name_ :=?,@Phone_Number_ :=?,@Agent_Id_ :=?,@Student_Status_Id_ :=?,@Pointer_Start_ :=?,@Pointer_Stop_ :=?,@Page_Length_ :=?)",
// [From_Date_,To_Date_ ,Is_Date_Check_ ,Student_Name_,Phone_Number_,Agent_Id_,Student_Status_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_],callback);
// },


};
 module.exports=Public_Data;
