var express = require('express');
var router = express.Router();
var User_Role=require('../models/User_Role');
router.post('/Save_User_Role/',function(req,res,next)
  { 
  try 
  {
  User_Role.Save_User_Role(req.body, function (err, rows) 
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
router.get('/Search_User_Role/:Group_Name_?',function(req,res,next)
  { 
  try 
  {
  User_Role.Search_User_Role(req.params.Group_Name_, function (err, rows) 
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
  router.get('/Search_User_Role_Typeahead/:User_Role_Name_?',function(req,res,next)
    { 
    try 
    {
    User_Role.Search_User_Role_Typeahead(req.params.User_Role_Name_, function (err, rows) 
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
router.get('/Get_User_Role/:User_Role_Id_?',function(req,res,next)
  { 
  try 
  {
  User_Role.Get_User_Role(req.params.User_Role_Id_, function (err, rows) 
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
router.get('/Delete_User_Role/:User_Role_Id_?',function(req,res,next)
  { 
  try 
  {
  User_Role.Delete_User_Role(req.params.User_Role_Id_, function (err, rows) 
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

router.get('/Load_User_Role/:User_Role_Name_?',function(req,res,next)
  { 
  try 
  {
  User_Role.Load_User_Role(req.params.User_Role_Name_, function (err, rows) 
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

