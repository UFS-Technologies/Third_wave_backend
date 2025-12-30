var express = require('express');
var router = express.Router();
var Company=require('../models/Company');
const upload = require('../helpers/multer-helper');


 router.post('/Save_Company/',upload.array('myFile'), (req, res, next) =>
 { 
 try 
 {
  const file = req.files
  var Photo_ = [];
  if (!file)
  {

  }
  else
  {
    for (var i = 0; i < file.length; i++)
    {
      Photo_.push({  File_name: file[i].filename })
    }
  }

  var Logo="";
  if (Photo_.length>0)
  {
    Logo=Photo_[0].File_name;
  }

  var Photo_json = JSON.stringify(Photo_)
  var Company_ = 
  {
    "Company_Id": req.body.Company_Id,
    "companyname": req.body.companyname,
    "Phone1": req.body.Phone1,
    "Phone2": req.body.Phone2,
    "Mobile": req.body.Mobile,
    "Email": req.body.Email,
    "Website": req.body.Website,
    "Address1": req.body.Address1,
    "Address2": req.body.Address2,
    "Address3": req.body.Address3,
    "Logo": Logo
  };
  Company.Save_Company(Company_, function(err, rows)
  {
    if (err)
    {
      return 1;
    }
    else
    {
      return res.json(rows);
    }
  });

}
 catch (err) 
 {
   
   const error = new Error('Please upload a file')
   error.httpStatusCode = 400
   return next(error)
 }
 finally 
 {
   
 }
  });

  

   router.get("/Get_Company",async (req, res, next) =>
   {
   try
   {
   const result = await Company.Get_Company();
   res.json(result);
   } 
   catch (e) 
   {
  
   res.send(e);
   

   } 
   finally 
   {
   }
   });

   router.get('/Delete_Company/:Company_Id_?',function(req,res,next)
   { 
   try 
   {
    Company.Delete_Company(req.params.Company_Id_, function (err, rows) 
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


    router.post('/Save_Application_Settings/', async function (req, res, next) {
      try {
        
        const resp = await Company.Save_Application_Settings(req.body);
        return res.send(resp);
      }
      catch (e) {
        
        return res.send(e);
      }
    });


    //     router.get('/Get_UsersListfromAther/', async function (req, res, next) {
    //   try {
    //       console.log(req.body);   
    //     const resp = await Company.Get_UsersListfromAther(req.body);
    //      console.log(resp);   
    //     return res.send(resp);
    //   }
    //   catch (e) {   
    //     console.log(e);     
    //     return res.send(e);
    //   }
    // });




     router.get("/Get_Application_Settings",async (req, res, next) =>
     {
      console.log(req)
     try
     {
     const result = await Company.Get_Application_Settings();
     res.json(result);
     } 
     catch (e) 
     {
    
     res.send(e);
     
  
     } 
     finally 
     {
     }
     });

     router.post('/Save_User_Resignation_Management/', async function (req, res, next) {
      try {
        
        const resp = await Company.Save_User_Resignation_Management(req.body);
        return res.send(resp);
      }
      catch (e) {
        console.log(e)
        return res.send(e);
      }
    });

 module.exports = router;





































// var express = require('express');
// var router = express.Router();
// var Company=require('../models/Company');
// const upload = require('../helpers/multer-helper');


//  router.post('/Save_Company/',upload.array('myFile'), (req, res, next) =>
//  { 
//  try 
//  {
//   const file = req.files
//   var Photo_ = [];
//   if (file)
//   {

//   }
//   else
//   {
//     for (var i = 0; i < file.length; i++)
//     {
//       Photo_.push({  File_name: file[i].filename })
//     }
//   }

//   var Logo="";
//   if (Photo_.length>0)
//   {
//     Logo=Photo_[0].File_name;
//   }

//   var Photo_json = JSON.stringify(Photo_)
//   var Company_ = 
//   {
//     "Company_Id": req.body.Company_Id,
//     "companyname": req.body.companyname,
//     "Phone1": req.body.Phone1,
//     "Phone2": req.body.Phone2,
//     "Mobile": req.body.Mobile,
//     "Email": req.body.Email,
//     "Website": req.body.Website,
//     "Address1": req.body.Address1,
//     "Address2": req.body.Address2,
//     "Address3": req.body.Address3,
//     "Logo": Logo,


//   };
//   Company.Save_Company(Company_, function(err, rows)
//   {
//     if (err)
//     {
//       return 1;
//     }
//     else
//     {
//       return res.json(rows);
//     }
//   });

// }
//  catch (err) 
//  {

//    const error = new Error('Please upload a file')
//    error.httpStatusCode = 400
//    return next(error)
//  }
//  finally 
//  {
   
//  }
//   });

  

//    router.get("/Get_Company",async (req, res, next) =>
//    {
//    try
//    {
//    const result = await Company.Get_Company();
//    res.json(result);
//    } 
//    catch (e) 
//    {
  
//    res.send(e);


//    } 
//    finally 
//    {
//    }
//    });

//    router.get('/Delete_Company/:Company_Id_?',function(req,res,next)
//    { 
//    try 
//    {
//     Company.Delete_Company(req.params.Company_Id_, function (err, rows) 
//    {
//     if (err) 
//     {
//     res.json(err);
//     }
//     else 
//     {
//       res.json(rows);
//     }
//     });
//     }
//    catch (e) 
//    {
//    }
//    finally 
//    {
//    }
//     });

    



//  module.exports = router;


