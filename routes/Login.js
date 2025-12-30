var express = require("express");
var router = express.Router();
var Login = require("../models/Login");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const config=require('../config.json');
const sgMail = require('@sendgrid/mail')
router.get("/Login_Check/:userName?/:password?", function(req, res, next) {
  try {
    Login.Login_Check(req.params.userName, req.params.password, function(
      err,
      rows

    ) 
    {
     
      if (err) {

        // 
        res.json(err);
        console.log('err: ', err);
      } else {
        const token = jwt.sign({ sub: rows[0][0] }, config.secret);
        console.log('rows[0][0]: ', rows[0][0]);

      // 
        res.json({...rows,token});


      }
    });
  } catch (e) {
    console.log('e: ', e);
    // 
  } finally {
  }
});


// router.get("/forgetPassword/:email?", function(req, res, next) {
//   try {
//     Login.forgetPassword(req.params.email, async function(
//       err,
//       rows

//     ) 
//     {
     
//       if (err) {

//         // 
//         console.log(err)
//         res.json(err);
//       } else {

//         console.log(rows[0][0])

// if(rows[0][0]['Password']!=null){
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: 
//     {
//       user: 'work@ufstechnologies.com',
//       pass: 'ufswork@56'
//     }
//   });
//   console.log(rows[0][0]['Email']);




//   const msg = 
//   {
//     to: rows[0][0]['Email'],
//     from: 'work@ufstechnologies.com',
//     subject: 'Password Recovery -',
  


//     html: `
//     <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 20px auto;">
    
//       <h2 style="text-align: center; color: #333;">Password Recovery</h2>
//       <p>Hello,</p>
//       <p>We received a request to recover your password. Here are your password recovery details:</p>
//       <p><strong>Password:</strong> ${rows[0][0]['Password']}</p>
//       <p>If you did not initiate this request, please ignore this email or contact support.</p>
//       <p>Thank you for choosing DARLSCO.</p>
//       <p>Best regards,<br>DARLSCO</p>
//     </div>
//   `,


    
//   }
//   sgMail
//   sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent successfully');
//     // Send success response to the frontend
//     res.status(200).json({ message: 'Email sent successfully' });
//   })
//   .catch((error) => {
//     console.error(error.toString());
//     // Send error response to the frontend
//     res.status(500).json({ message: 'Failed to send email' });
//   });
// }else{
//   res.status(500).json({ message: `Sorry, we couldn't find an account with the entered Email ID` });

// }


//       // 
     


//       }
//     });
//   } catch (e) {
//     // 
//   } finally {
//   }
// });

router.post('/Save_Agent_Profile/',function(req,res,next)
{ 
try 
{
	console.log(req.query)
  Login.Save_Agent_Profile(req.query, function (err, rows) 
{
if (err) 
{
console.log(err);
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
console.log(e);
}
finally 
{
}
});
router.get("/Login_Check_Agent/:userName?/:password?", function(req, res, next) {
  try {
    Login.Login_Check_Agent(req.params.userName, req.params.password, function(
      err,
      rows

    ) 
    {
     
      if (err) {

        // 
        res.json(err);
      } else {
        const token = jwt.sign({ sub: rows[0][0] }, config.secret);

      // 
        res.json({...rows,token});


      }
    });
  } catch (e) {
    // 
  } finally {
  }
});

router.post("/check_Agent_Login/", function (req, res, next) {
  try {
   console.log(req.query)
    Login.check_Agent_Login(
      req.query,
      function (err, rows) {
        if (err) {
       console.log(err);
          res.json(err);
        } else {
          console.log(rows);
          const token = jwt.sign({ sub: rows[0][0] }, config.secret);

        // 
          res.json({...rows,token});
  
  
        }
      }
    );
  } catch (e) {
  console.log(e);  ;
  } finally {
  }
}); 

// router.get("/check_Agent_Login/:userName?/:password?", function(req, res, next) {
//   try {
   
//     Login.check_Agent_Login(req.params.userName, req.params.password, function(
//       err,
//       rows

//     ) 
//     {
     
//       if (err) {
       
//         res.json(err);
//       } else {
//         const token = jwt.sign({ sub: rows[0][0] }, config.secret);

//       // 
//         res.json({...rows,token});


//       }
//     });
//   } catch (e) {
//   } finally {
//   }
// });



router.get("/Agent_Login/:userName?/:password?", function(req, res, next) {
  try {
   
    Login.Agent_Login(req.params.userName, req.params.password, function(
      err,
      rows

    ) 
    {
     
      if (err) {
       
        res.json(err);
      } else {
        const token = jwt.sign({ sub: rows[0][0] }, config.secret);

      // 
        res.json({...rows,token});


      }
    });
  } catch (e) {
  } finally {
  }
});


router.get("/Student_Login_Check/:Email?/:Password?", function(req, res, next) {
  try {
    Login.Student_Login_Check(req.params.Email, req.params.Password, function(err,rows) 
    {
      if (err) {
        res.json(err);
      }
       else {
        const token = jwt.sign({ sub: rows[0][0] }, config.secret);
        res.json({...rows,token}); }
    });
  } 
  catch (e) {
  } 
  finally {
  }
});

module.exports = router;
