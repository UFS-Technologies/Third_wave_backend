var express = require('express');
var router = express.Router();
var Region=require('../models/Region');
router.post('/Save_Region/',function(req,res,next)
  { 
  try 
  {
  Region.Save_Region(req.body, function (err, rows) 
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
router.get('/Search_Region/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  Region.Search_Region(req.params.Group_Name_, function (err, rows) 
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

router.get('/Get_Region/:Region_Id_?',function(req,res,next)
  { 
  try 
  {
  Region.Get_Region(req.params.Region_Id_, function (err, rows) 
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
router.get('/Delete_Region/:Region_Id_?',function(req,res,next)
  { 
  try 
  {
  Region.Delete_Region(req.params.Region_Id_, function (err, rows) 
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

