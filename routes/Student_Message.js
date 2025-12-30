 var express = require('express');
 var router = express.Router();
 var Student_Message=require('../models/Student_Message');



 router.post('/Save_Student_Message/',function(req,res,next)
 { 
 try 
 {
Student_Message.Save_Student_Message(req.body, function (err, rows) 
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

 router.get('/Search_Student_Message/',function(req,res,next)
 { 
 try 
 {
Student_Message.Search_Student_Message(req.query.Student_Id_, function (err, rows) 
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
 router.get('/Get_Student_Message/:Student_Message_Id_?',function(req,res,next)
 { 
 try 
 {
Student_Message.Get_Student_Message(req.params.Student_Message_Id_, function (err, rows) 
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
    router.get('/Delete_Student_Message/:Student_Message_Id_?',function(req,res,next)
    { 
    try 
    { 
    Student_Message.Delete_Student_Message(req.params.Student_Message_Id_, function (err, rows) 
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

