 var express = require('express');
 var router = express.Router();
 var Level_Detail=require('../models/Level_Detail');
 router.post('/Save_Level_Detail/',function(req,res,next)
 { 
 try 
 {
Level_Detail.Save_Level_Detail(req.body, function (err, rows) 
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
 router.get('/Search_Level_Detail/',function(req,res,next)
 { 
 try 
 {
Level_Detail.Search_Level_Detail(req.query.Level_Detail_Name, function (err, rows) 
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
 router.get('/Get_Level_Detail/:Level_Detail_Id_?',function(req,res,next)
 { 
 try 
 {
Level_Detail.Get_Level_Detail(req.params.Level_Detail_Id_, function (err, rows) 
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
 router.get('/Delete_Level_Detail/:Level_Detail_Id_?',function(req,res,next)
 { 
 try 
 {
Level_Detail.Delete_Level_Detail(req.params.Level_Detail_Id_, function (err, rows) 
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

