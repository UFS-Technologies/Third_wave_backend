 var express = require('express');
 var router = express.Router();
 var Course_Intake=require('../models/Course_Intake');
 router.post('/Save_Course_Intake/',function(req,res,next)
 { 
 try 
 {
Course_Intake.Save_Course_Intake(req.body, function (err, rows) 
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
 router.get('/Search_Course_Intake/',function(req,res,next)
 { 
 try 
 {
Course_Intake.Search_Course_Intake(req.query.Course_Intake_Name, function (err, rows) 
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
 router.get('/Get_Course_Intake/:Course_Intake_Id_?',function(req,res,next)
 { 
 try 
 {
Course_Intake.Get_Course_Intake(req.params.Course_Intake_Id_, function (err, rows) 
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
 router.get('/Delete_Course_Intake/:Course_Intake_Id_?',function(req,res,next)
 { 
 try 
 {
Course_Intake.Delete_Course_Intake(req.params.Course_Intake_Id_, function (err, rows) 
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

