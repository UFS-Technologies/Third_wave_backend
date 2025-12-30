 var express = require('express');
 var router = express.Router();
 var Accounts=require('../models/Accounts');
 router.post('/Save_Accounts/',function(req,res,next)
 { 
 try 
 {
  Accounts.Save_Accounts(req.body, function (err, rows) 
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
 router.get('/Search_Client_Accounts_Data/:Client_Accounts_Name_?',function(req,res,next)
 { 
 try 
 {
  Accounts.Search_Accounts_Data(req.params.Client_Accounts_Name_, function (err, rows) 
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
 router.get('/Get_Accounts/:Client_Accounts_Id_?',function(req,res,next)
 { 
 try 
 {
  Accounts.Get_Accounts(req.params.Client_Accounts_Id_, function (err, rows) 
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

  router.get('/Search_Accounts_Typeahead/:Client_Accounts_Id_?/:Client_Accounts_Name_?',function(req,res,next)
  { 
  try 
  {
 Accounts.Search_Accounts_Typeahead(req.params.Client_Accounts_Id_,req.params.Client_Accounts_Name_, function (err, rows) 
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
   //res.json('rows');
  }
   });
 router.get('/Delete_Accounts/:Client_Accounts_Id_?',function(req,res,next)
 { 
 try 
 {
  Accounts.Delete_Accounts(req.params.Client_Accounts_Id_, function (err, rows) 
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
  router.get('/Search_Accounts/',function(req,res,next)
{ 
try 
{
  Accounts.Search_Accounts(req.query.Client_Accounts_Name,req.query.Account_Group_Id_ ,function (err, rows) 
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


 router.get('/Load_AccountGroup/',function(req,res,next)
    { 
    try 
    {
      Accounts.Load_AccountGroup(function (err, rows) 
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


  // router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
  // { 
  // try 
  // {
  //   Accounts.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
  // {
  // if (err) 
  // {
  ;
  // res.json(err);
  // }
  // else 
  // {
  // res.json(rows);
  // }
  // });
  // }
  // catch (e) 
  // {
  
  // }
  // finally 
  // {
  // }
  // });
  module.exports = router;

