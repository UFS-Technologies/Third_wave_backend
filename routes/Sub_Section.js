 var express = require('express');
 var router = express.Router();
 var Sub_Section=require('../models/Sub_Section');


 router.post('/Save_Sub_Section/',function(req,res,next)
 { 
 try 
 {
Subject.Save_Sub_Section(req.body, function (err, rows) 
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


  router.get('/Sub_Section_Typeahead/',function(req,res,next)
  { 
  try 
  {
   // 
   Sub_Section.Sub_Section_Typeahead(req.query.Sub_Section_Name,function (err, rows) 
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







 router.get('/Search_Sub_Section/',function(req,res,next)
 { 
 try 
 {
  Sub_Section.Search_Sub_Section(req.query.Sub_Section_Name, function (err, rows) 
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
 router.get('/Get_Sub_Section_From_Course/:Subject_Id?',function(req,res,next)
 { 
 try 
 {
  Sub_Section.Get_Sub_Section_From_Course(req.params.Subject_Id, function (err, rows) 
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
 router.get('/Delete_Sub_Section/:Sub_Section_Id_?',function(req,res,next)
 { 
 try 
 {
  Sub_Section.Delete_Sub_Section(req.params.Sub_Section_Id_, function (err, rows) 
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

