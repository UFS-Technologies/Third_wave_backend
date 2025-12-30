 var express = require('express');
 var router = express.Router();
 var Enquiry_Source=require('../models/Enquiry_Source');
 router.post('/Save_Enquiry_Source/',function(req,res,next)
 { 
 try 
 {
  Enquiry_Source.Save_Enquiry_Source(req.body, function (err, rows) 
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
 router.get('/Search_Enquiry_Source/',function(req,res,next)
 { 
 try 
 {
  Enquiry_Source.Search_Enquiry_Source(req.query.Enquiry_Source_Name, function (err, rows) 
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
 router.get('/Get_Enquiry_Source/:Enquiry_Source_Id_?',function(req,res,next)
 { 
 try 
 {
  Enquiry_Source.Get_Enquiry_Source(req.params.Enquiry_Source_Id_, function (err, rows) 
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
 router.get('/Delete_Enquiry_Source/:Enquiry_Source_Id_?',function(req,res,next)
 { 
 try 
 {
  Enquiry_Source.Delete_Enquiry_Source(req.params.Enquiry_Source_Id_, function (err, rows) 
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


  // router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
  //   { 
  //   try 
  //   {
  //     Enquiry_Source.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
  //   {
  //   if (err) 
  //   {
  ;
  //   res.json(err);
  //   }
  //   else 
  //   {
  //   res.json(rows);
  //   }
  //   });
  //   }
  //   catch (e) 
  //   {
  
  //   }
  //   finally 
  //   {
  //   }
  //   });

  module.exports = router;

