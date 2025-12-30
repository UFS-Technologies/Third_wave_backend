 var express = require('express');
 var router = express.Router();
 var Student_Status=require('../models/Student_Status');
 router.post('/Save_Student_Status/',function(req,res,next)
 { 
 try 
 {
Student_Status.Save_Student_Status(req.body, function (err, rows) 
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
 router.get('/Search_Student_Status/',function(req,res,next)
 { 
 try 
 {
Student_Status.Search_Student_Status(req.query.Student_Status_Name, function (err, rows) 
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
 router.get('/Get_Student_Status/:Student_Status_Id_?',function(req,res,next)
 { 
 try 
 {
Student_Status.Get_Student_Status(req.params.Student_Status_Id_, function (err, rows) 
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
 router.get('/Delete_Student_Status/:Student_Status_Id_?',function(req,res,next)
 { 
 try 
 {
Student_Status.Delete_Student_Status(req.params.Student_Status_Id_, function (err, rows) 
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

