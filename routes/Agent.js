var express = require('express');
var router = express.Router();
var Agent=require('../models/Agent');
router.post('/Save_Agent/',function(req,res,next)
{ 
  try 
  {
    Agent.Save_Agent(req.body, function (err, rows) 
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
router.get('/Search_Agent/',function(req,res,next)
  { 
  try 
  {
    Agent.Search_Agent(req.query.Client_Accounts_Name_,req.query.Account_Group_,req.query.Pointer_Start_,req.query.Pointer_Stop_,req.query.Page_Length_, function (err, rows) 
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

  
router.get('/Get_Agent/:Client_Accounts_Id_?',function(req,res,next)
  { 
  try 
  {
    Agent.Get_Agent(req.params.Client_Accounts_Id_,function (err, rows) 
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
router.get('/Delete_Agent/:Client_Accounts_Id_?',function(req,res,next)
  { 
  try 
  {
    Agent.Delete_Agent(req.params.Client_Accounts_Id_, function (err, rows) 
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

  router.get('/Load_Agents/',function(req,res,next)
  { 
  try 
  {
    Agent.Load_Agents(function (err, rows) 
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

