 var express = require('express');
 var router = express.Router();
 var Intake=require('../models/Intake');
 router.post('/Save_Intake/',function(req,res,next)
 { 
 try 
 {
Intake.Save_Intake(req.body, function (err, rows) 
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
 router.get('/Search_Intake/',function(req,res,next)
 { 
 try 
 {
Intake.Search_Intake(req.query.Intake_Name, function (err, rows) 
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


  router.get('/Get_Intakes_InCourse/',function(req,res,next)
 { 
 try 
 {
Intake.Get_Intakes_InCourse( function (err, rows) 
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


  router.get('/Get_Intakes_InCourse_Edit/',function(req,res,next)
  { 
  try 
  {
 Intake.Get_Intakes_InCourse_Edit(req.query.Course_Id_, function (err, rows) 
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
 


 router.get('/Get_Intake/:Intake_Id_?',function(req,res,next)
 { 
 try 
 {
Intake.Get_Intake(req.params.Intake_Id_, function (err, rows) 
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

  router.get('/Get_Intake_Year/:Intake_Year_Id_?',function(req,res,next)
 { 
 try 
 {
Intake.Get_Intake_Year(req.params.Intake_Year_Id_, function (err, rows) 
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

 router.get('/Delete_Intake/:Intake_Id_?',function(req,res,next)
 { 
 try 
 {
Intake.Delete_Intake(req.params.Intake_Id_, function (err, rows) 
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


  router.get('/Load_Intake/',function(req,res,next)
  { 
  try 
  {
    Intake.Load_Intake(function (err, rows) 
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
  router.get('/Load_Intake_year/',function(req,res,next)
  { 
  try 
  {
    Intake.Load_Intake_year(function (err, rows) 
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
  module.exports = router;

