 var express = require('express');
 var router = express.Router();
 var Duration=require('../models/Duration');
 router.post('/Save_Duration/',function(req,res,next)
 { 
 try 
 {
Duration.Save_Duration(req.body, function (err, rows) 
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
 router.get('/Search_Duration/',function(req,res,next)
 { 
 try 
 {
Duration.Search_Duration(req.query.Duration_Name, function (err, rows) 
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
 router.get('/Get_Duration/:Duration_Id_?',function(req,res,next)
 { 
 try 
 {
Duration.Get_Duration(req.params.Duration_Id_, function (err, rows) 
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
 router.get('/Delete_Duration/:Duration_Id_?',function(req,res,next)
 { 
 try 
 {
Duration.Delete_Duration(req.params.Duration_Id_, function (err, rows) 
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

