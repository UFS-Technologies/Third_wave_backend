 var express = require('express');
 var router = express.Router();
 var Application_Status=require('../models/Application_Status');
 router.post('/Save_Application_Status/',function(req,res,next)
 { 
 try 
 {
  Application_Status.Save_Application_Status(req.body, function (err, rows) 
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


  router.post('/Save_ApplicationStatusforstatuschange/',function(req,res,next)
  { 
  try 
  {
   Application_Status.Save_ApplicationStatusforstatuschange(req.body, function (err, rows) 
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
 












  router.post('/Save_Task_Item/',function(req,res,next)
  { 
  try 
  {
   Application_Status.Save_Task_Item(req.body, function (err, rows) 
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



 router.get('/Search_Application_Status/',function(req,res,next)
 { 
 try 
 {
  Application_Status.Search_Application_Status(req.query.Application_Status_Name, function (err, rows) 
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

  router.get('/Search_Task_Item/',function(req,res,next)
  { 
  try 
  {
   Application_Status.Search_Task_Item(req.query.Task_Item_Search, function (err, rows) 
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
  Application_Status.Get_Enquiry_Source(req.params.Enquiry_Source_Id_, function (err, rows) 
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
 router.get('/Delete_Application_Status/:Application_status_Id_?',function(req,res,next)
 { 
 try 
 {
  Application_Status.Delete_Application_Status(req.params.Application_status_Id_, function (err, rows) 
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


  router.get('/Delete_Task_Item/:Task_Item_Id_?',function(req,res,next)
  { 
  try 
  {
   Application_Status.Delete_Task_Item(req.params.Task_Item_Id_, function (err, rows) 
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

