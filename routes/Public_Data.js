var express = require('express');
var router = express.Router();
var Public_Data=require('../models/Public_Data');
const upload = require('../helpers/multer-helper');
const nodemailer = require("nodemailer");

const sgMail = require('@sendgrid/mail')

router.post('/Save_Student_Course/',async function(req,res,next)
{ 
try 
{
const resp=await Public_Data.Save_Student_Course(req.body);
return res.send(resp);
}
catch(e){
  ;
return res.send(e);
}
});

 router.get('/Get_site_Pageload/',function(req,res,next)
 { 
 try 
 {
 Public_Data.Get_site_Pageload( function (err, rows) 
 {
 if (err) 
 {
 res.json(err);
 }
 else 
 {
 res.json(rows);
 }
 });
 }
 catch (e) 
 {
 }
 finally 
 {
 }
 });

//  router.post("/Save_Front_Student/", async function (req, res, next) {
// 	try {
// 	  const resp = await Public_Data.Save_Front_Student(req.body);
// 	  return res.send(resp);
// 	} catch (e) {
// 	  return res.send(e);
// 	}
//   });


// router.get('/Update_Password_Mobile/:User_Details_Id_?/:Password_?',function(req,res,next)
// { 
// try 
// {
//   console.log('req.params.User_Details_Id_: ', req.params.User_Details_Id_);
//   Public_Data.Update_Password_Mobile(req.params.User_Details_Id_,req.params.Password_, function (err, rows) 

// {
//  if (err) 
//  {
//  res.json(err);
//  console.log('err: ', err);
//  }
//  else 
//  {
//  res.json(rows);
//  console.log('rows: ', rows);
//  }
//  });
//  }
// catch (e) 
// {
//   console.log(e);
  
// }
// finally 
// {
// }
//  });
router.get('/Update_Password_Mobile', function(req, res, next) {
  try {
    const userDetailsId = req.query.User_Details_Id_;
    const password = req.query.Password_;
    
    console.log('req.query.User_Details_Id_: ', userDetailsId);
    
    Public_Data.Update_Password_Mobile(userDetailsId, password, function(err, rows) {
      if (err) {
        res.json(err);
        console.log('err: ', err);
      } else {
        res.json(rows);
        console.log('rows: ', rows);
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
  }
});
router.get("/Check_OTP/", function (req, res, next) {
  try {
    console.log(req.query.OTP,
      req.query.Email);
    Public_Data.Check_OTP(
      req.query.OTP,
      req.query.Email,
      function (err, rows) {
        if (err) {
          console.log(err);

          res.json(err);
        } else {
          console.log(rows);
          res.json(rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  } finally {
  }
});

router.get("/forgetPassword", async (req, res, next) => {
  try {
    // Retrieve the email from the query parameters
    const email = req.query.email;

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate a 4-digit OTP
    const OTP = Math.floor(1000 + Math.random() * 9000); // Ensures the OTP is always 4 digits
console.log(email,OTP);
    // Call the forgetPassword method to handle the OTP saving and email sending
    const result = await Public_Data.forgetPassword(email, OTP);

    // Log and return the result
    console.log('result', result);
    res.json({ message: 'OTP generated and saved successfully', result });
  } catch (e) {
    // Handle errors
    console.error('Error:', e);
    res.status(500).json({ message: 'An error occurred', error: e });
  }
});


// ------------------working mail----------------
// router.get("/forgetPassword", function(req, res, next) {
//   try {
//     const email = req.query.email;

//     if (!email) {
//       return res.status(400).json({ message: 'Email parameter is required' });
//     }
//     var OTP=Math.floor(Math.random()*Math.floor(10000))

//     const rows =  Public_Data.Update_User_OTP(req.query.email, OTP);
//     Public_Data.forgetPassword(email, async function(err, rows) {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: 'Internal server error' });
//       } else {
//         if (rows[0] && rows[0][0] && rows[0][0]['Password']) {
//           let transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             requireTLS: true,
//             auth: {
//               user: 'satheesh.mt@ufstechnologies.com',
//               pass: 'satheesh12345'
//             }
//           });

//           const msg = {
//             to: rows[0][0]['Email'],
//             from: 'satheesh.mt@ufstechnologies.com',
//             subject: 'Password Recovery',
//             html: `
//               <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 20px auto;">
//                 <h2 style="text-align: center; color: #333;">Password Recovery</h2>
//                 <p>Hello,</p>
//                 <p>We received a request to recover your password. Here are your password recovery details:</p>
//                 <p><strong>Password:</strong> ${rows[0][0]['Password']}</p>
//                 <p>If you did not initiate this request, please ignore this email or contact support.</p>
//                 <p>Thank you for choosing Empire.</p>
//                 <p>Best regards,<br>Empire</p>
//               </div>
//             `,
//           };

//           transporter.sendMail(msg, function(err, info) {
//             if (err) {
//               console.error('Error sending email:', err);
//               return res.status(500).json({ message: 'Failed to send email' });
//             } else {
//               console.log('Email sent successfully:', info.response);
//               return res.status(200).json({ message: 'Email sent successfully' });
//             }
//           });
//         } else {
//           return res.status(404).json({ message: `Sorry, we couldn't find an account with the entered Email ID` });
//         }
//       }
//     });
//   } catch (e) {
//     console.error('An unexpected error occurred:', e);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

//     Public_Data.forgetPassword1(email, async function(err, rows) {
//       if (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       } else {
//         console.log(rows[0][0]);

//         if (rows[0][0]['Password'] != null) {
//           let transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             requireTLS: true,
//             auth: {
//               user: 'satheesh.mt@ufstechnologies.com',
//               pass: 'satheesh12345'
//             }
//           });

//           console.log(rows[0][0]['Email']);
//           console.log('rows[0][0]1', rows[0][0]['Email']);

//           const msg = {
//             to: rows[0][0]['Email'],
//             from: 'work@ufstechnologies.com',
//             subject: 'Password Recovery',
//             html: `
//               <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 20px auto;">
//                 <h2 style="text-align: center; color: #333;">Password Recovery</h2>
//                 <p>Hello,</p>
//                 <p>We received a request to recover your password. Here are your password recovery details:</p>
//                 <p><strong>Password:</strong> ${rows[0][0]['Password']}</p>
//                 <p>If you did not initiate this request, please ignore this email or contact support.</p>
//                 <p>Thank you for choosing Empire.</p>
//                 <p>Best regards,<br>Empire</p>
//               </div>
//             `,
//           };

//           sgMail.send(msg)
//             .then(() => {
//               console.log('Email sent successfully');
//               res.status(200).json({ message: 'Email sent successfully' });
//             })
//             .catch((error) => {
//               console.error(error.toString());
//               res.status(500).json({ message: 'Failed to send email' });
//             });
//         } else {
//           res.status(404).json({ message: `Sorry, we couldn't find an account with the entered Email ID` });
//         }
//       }
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

router.post("/Save_Front_Student/", async function (req, res, next) {
	try {
	  const resp = await Public_Data.Save_Front_Student(req.body);
	  return res.send(resp);
	} catch (e) {
    
	  return res.send(e);
	}
  });


  router.get('/Fetch_Student_Details/:Unique_Id_?',function(req,res,next)
{ 
try 
{
       
  Public_Data.Fetch_Student_Details(req.params.Unique_Id_, function (err, rows) 
{
 if (err) 
 {
  console.log(err)
 res.json(err);
 }
 else 
 {
   res.json(rows);
 }
 });
 }
catch (e) 
{
  console.log(e)
}
finally 
{
}
 });

  router.get('/Get_Fornt_Student_Dropdowns/',function(req,res,next)
  { 
  try 
  {
    Public_Data.Get_Fornt_Student_Dropdowns(function (err, rows)  
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows);
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });



  router.post("/Post_FB_Lead/", function (req, res, next) {
    try {
      Public_Data.Post_FB_Lead(
        req.body,
        function (err, rows) {
          if (err) {
          ;
            res.json(err);
          } else {
            res.json(rows);
          }
        }
      );
    } catch (e) {
      ;
    } finally {
    }
  }); 

  router.get('/Get_Student_Fill_Check/:rstring_?',function(req,res,next)
{ 
try 
{
       
    Public_Data.Get_Student_Fill_Check(req.params.rstring_, function (err, rows) 
{
 if (err) 
 {
    
 res.json(err);
 }
 else 
 {
   res.json(rows);
 }
 });
 }
catch (e) 
{
}
finally 
{
}
 });
//  

 router.get('/Public_Search_Course/',function(req,res,next) 
  { 
  try 
  {
  Public_Data.Public_Search_Course(req.query.Level_Detail_Id,req.query.Country_Id,req.query.Intake_Id,req.query.Sub_Section_Id, req.query.Course_Name,req.query.Branch_Search,
  req.query.Duration_Search,req.query.Ielts_,req.query.Page_Start,req.query.Page_End,req.query.Page_Length,req.query.University,req.query.Subject_1, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
 
  }
  else 
  {

  res.json(rows);
  
  }
  });
  }
  catch (e) 
  {
  
  }
  finally 
  {
  }
  });

  router.get('/Public_Search_Course_Typeahead/',function(req,res,next)
  { 
  try 
  {
  Public_Data.Public_Search_Course_Typeahead(req.query.Level_Detail_Id,req.query.Country_Id,req.query.Intake_Id,req.query.Sub_Section_Id, req.query.Course_Name,req.query.Branch_Search,
  req.query.Duration_Search,req.query.Ielts_,req.query.Page_Start,req.query.Page_End,req.query.Page_Length,req.query.University,req.query.Subject_1,  function (err, rows) 
  {
  if (err) 
  {
    
  res.json(err);
 
  }
  else 
  {

  res.json(rows);
  
  }
  });
  }
  catch (e) 
  {
  
  }
  finally 
  {
  }
  });


//  router.get('/Public_Search_Course/',function(req,res,next)
//  { 
//  try 
//  {
//  Public_Data.Public_Search_Course(req.query.Level_Detail_Id,req.query.Country_Id,req.query.Intake_Id, req.query.Course_Name,req.query.Branch_Search,
//  req.query.Duration_Search,req.query.Ielts_,req.query.Page_Start,req.query.Page_End,req.query.Page_Length, function (err, rows) 
//  {
//  if (err) 
//  {
//  res.json(err);

//  }
//  else 
//  {

//  res.json(rows);
//  }
//  });
//  }
//  catch (e) 
//  {
 
//  }
//  finally 
//  {
//  }
//  });

//  router.get('/Public_Search_Course_Typeahead/',function(req,res,next)
//  { 
//  try 
//  {
//  Public_Data.Public_Search_Course_Typeahead(req.query.Level_Detail_Id,req.query.Country_Id,req.query.Intake_Id, req.query.Course_Name,req.query.Branch_Search,
//  req.query.Duration_Search,req.query.Ielts_,req.query.Page_Start,req.query.Page_End,req.query.Page_Length, function (err, rows) 
//  {
//  if (err) 
//  {
//  res.json(err);

//  }
//  else 
//  {

//  res.json(rows);
//  }
//  });
//  }
//  catch (e) 
//  {
 
//  }
//  finally 
//  {
//  }
//  });

 router.get('/Get_More_Information/:Course_Id_?',function(req,res,next)
 { 
 try 
 {
 Public_Data.Get_More_Information(req.params.Course_Id_, function (err, rows) 
 {
 if (err) 
 {
 res.json(err);
 }
 else 
 {
 res.json(rows);
 }
 });
 }
 catch (e) 
 {
 }
 finally 
 {
 }
 });


 
router.post('/Update_Student_Public/',function(req,res,next)
 { 
 try 
 {
   Public_Data.Update_Student_Public(req.body, function (err, rows) 
 {
 if (err) 
 {
 res.json(err);
 
 }
 else 
 {
 res.json(rows);
 }
 });
 }
 catch (e) 
 {
 
 }
 finally 
 {
 }
 });


 // router.get('/Get_Student_Details/:Student_Id_?',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Get_Student_Details(req.params.Student_Id_, function (err, rows) 
 // {
 // if (err) 
 // {
 
 // res.json(err);
 // }
 // else 
 // {
 //
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // 
 // }
 // finally 
 // {
 // }
 // });

 // router.get('/Get_Student_Course_Apply/:Student_Id_?',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Get_Student_Course_Apply(req.params.Student_Id_, function (err, rows) 
 // {
 // if (err) 
 // {
 // res.json(err);
 // }
 // else 
 // {
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // }
 // finally 
 // {
 // }
 // // });
 // router.get('/Get_Message_Details/:Student_Id_?',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Get_Message_Details(req.params.Student_Id_, function (err, rows) 
 // {
 // if (err) 
 // {
 // res.json(err);
 // }
 // else 
 // {
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // }
 // finally 
 // {
 // }
 // });
 // router.get('/Get_Student_Course_Selection/:Student_Course_Apply_Id_?',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Get_Student_Course_Selection(req.params.Student_Course_Apply_Id_, function (err, rows) 
 // {
 // if (err) 
 // {
 // res.json(err);
 // }
 // else 
 // {
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // }
 // finally 
 // {
 // }
 // });


 router.post('/Forgot_Password_Student/',async function(req,res,next)
 { 
 try 
 {
 
 const resp=await Public_Data.Forgot_Password_Student(req.body);
 
 return res.send(resp);
 }
 catch(e){
 
 return res.send(e);
 }
 });




 router.post('/Forgot_Password_Agent/',async function(req,res,next)
 { 
 try 
 {
 
 const resp=await Public_Data.Forgot_Password_Agent(req.body);
 
 return res.send(resp);
 }
 catch(e){
 
 return res.send(e);
 }
 });





 // router.get('/Get_Student_Document/:Student_Id_?',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Get_Student_Document(req.params.Student_Id_, function (err, rows) 
 // {
 // if (err) 
 // {
 
 // res.json(err);
 // }
 // else 
 // {
 //
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // 
 // }
 // finally 
 // {
 // }
 // });


 // router.get('/Search_Document/',function(req,res,next)
 // { 
 // try 
 // {
 // Public_Data.Search_Document(req.query.Document_Name, function (err, rows) 
 // {
 // if (err) 
 // {
 // res.json(err);
 // }
 // else 
 // {
 // res.json(rows);
 // }
 // });
 // }
 // catch (e) 
 // {
 // }
 // finally 
 // {
 // }
 // });




 // router.post('/Save_Student_Document', upload.array('myFile'), (req, res, next) => 
 // {

 //   try
 //   {
 //     const file = req.files
 //     var Photo_ = [];
 //     if (!file) 
 //     {
 //     }
 //     else
 //     {
 //       for (var i = 0; i < file.length; i++) 
 //       {
 //         Photo_.push({ File_name: file[i].filename })
 //       }
 //       //Photo_ = file[0].filename;
 //     }
   
 //       var Image_Detail="";
 //       if (Photo_.length>0)
 //         {
 //           Image_Detail=Photo_[0].File_name;
 //         }
 //       var Photo_json = JSON.stringify(Photo_)
 
 //       var Post_ =
 //       {
 //         "Student_Id": req.body.Student_Id,
 //         "Document_Id": req.body.Document_Id,
 //         "Image_Detail": Image_Detail

 
 //       };
 //       Public_Data.Save_Student_Document(Post_, function (err, rows) 
 //         {
 
 //         if (err) 
 //         {
 //           return 1;
 //         }
 //         else
 //         {
 //           // cb(null, FileUploaded.toString(10));
 //           return res.json(rows);
 //         }
 //       });
     
 //   }
 
 //   catch (err) 
 //   {
 //     const error = new Error('Please upload a file')
 //     error.httpStatusCode = 400
 //     return next(error)
 //   }
 //     finally 
 //     {
 //     }
 //   }
 // );
 

//   router.get('/ Search_Student_Agent/',function(req,res,next)
//   { 
//   try 
//   {
//     
//   Public_Data. Search_Student_Agent(req.query.From_Date_,req.query.To_Date_,req.query.Is_Date_Check_,req.query.Student_Name_,req.query.Phone_Number_,
//     req.query.Agent_Id_,req.query.Student_Status_Id_,req.query.Pointer_Start_,req.query.Pointer_Stop_,req.query.Page_Length_, function (err, rows) 
//   {
//   if (err) 
//   {
//   res.json(err);
//  
//   }
//   else 
//   {
//    
//     res.json(rows);
//   }
//   });
//   }
//   catch (e) 
//   {
//     
//   }
//   finally 
//   {
//   }
// });


 module.exports = router;

