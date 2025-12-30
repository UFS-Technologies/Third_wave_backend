var express = require('express');
var router = express.Router();
var Holiday=require('../models/Holiday');
router.post('/Save_Holiday/',function(req,res,next)
  { 
  try 
  {
  Holiday.Save_Holiday(req.body, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  
  }
  else 
  {
  res.json(rows[0]);

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
router.get('/Search_Holiday/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  Holiday.Search_Holiday(req.params.Group_Name_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  
  }
  else 
  {
  res.json(rows[0]);
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
 
router.get('/Get_Holiday/:Holiday_Id_?',function(req,res,next)
  { 
  try 
  {
  Holiday.Get_Holiday(req.params.Holiday_Id_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows[0]);
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
router.get('/Get_Holiday_Region/:Holiday_Id_?',function(req,res,next)
  { 
  try 
  {
  Holiday.Get_Holiday_Region(req.params.Holiday_Id_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows[0]);
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
router.get('/Delete_Holiday/:Holiday_Id_?',function(req,res,next)
  { 
  try 
  {
  Holiday.Delete_Holiday(req.params.Holiday_Id_, function (err, rows) 
  {
  if (err) 
  {
  res.json(err);
  }
  else 
  {
  res.json(rows[0]);
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

