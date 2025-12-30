 var express = require('express');
 var router = express.Router();
 var Qualification_Master=require('../models/Qualification_Master');
 
 router.post('/Save_Qualification_Master/',function(req,res,next)
 { 
 try 
 {
  Qualification_Master.Save_Qualification_Master(req.body, function (err, rows) 
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
 router.get('/Search_Qualification_Master/',function(req,res,next)
 { 
 try 
 {
  Qualification_Master.Search_Qualification_Master(req.query.Qualification_Master_Name, function (err, rows) 
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
 router.get('/Get_Qualification_Master/:Qualification_Master_Id_?',function(req,res,next)
 { 
 try 
 {
  Qualification_Master.Get_Qualification_Master(req.params.Qualification_Master_Id_, function (err, rows) 
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
 router.get('/Delete_Qualification_Master/:Qualification_Master_Id_?',function(req,res,next)
 { 
 try 
 {
  Qualification_Master.Delete_Qualification_Master(req.params.Qualification_Master_Id_, function (err, rows) 
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

