 var express = require('express');
 var router = express.Router();
 var Student_Document=require('../models/Student_Document');
 
 router.post('/Save_Student_Document/',function(req,res,next)
 { 
 try 
 {
Student_Document.Save_Student_Document(req.body, function (err, rows) 
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
 router.get('/Search_Student_Document/',function(req,res,next)
 { 
 try 
 {
Student_Document.Search_Student_Document(req.query.Student_Document_Name, function (err, rows) 
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
  router.get('/Get_Student_Document/:Student_Id_?',function(req,res,next)
    { 
    try 
    {
    Student_Document.Get_Student_Document(req.params.Student_Id_, function (err, rows) 
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
 router.get('/Delete_Student_Document/:Student_Document_Id_?',function(req,res,next)
 { 
 try 
 {
Student_Document.Delete_Student_Document(req.params.Student_Document_Id_, function (err, rows) 
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
 
  router.get('/Delete_Application_Document/:Application_Document_Id_?',function(req,res,next)
 { 
 try 
 {
Student_Document.Delete_Application_Document(req.params.Application_Document_Id_, function (err, rows) 
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

  router.get('/Delete_FeesRecepit_Document/:Feesreceipt_document_Id_?',function(req,res,next)
  { 
  try 
  {
 Student_Document.Delete_FeesRecepit_Document(req.params.Feesreceipt_document_Id_, function (err, rows) 
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

