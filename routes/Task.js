 var express = require('express');
 var router = express.Router();
 var Task=require('../models/Task');
 router.post('/Save_Task/',function(req,res,next)
 { 
 try 
 {
Task.Save_Task(req.body, function (err, rows) 
 {
  if (err) 
  {
    
  res.json(err);
  }
  else 
  {
    console.log(rows)
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
 router.get('/Search_Task/:Task_Details_?/:Fromdate_?/:ToDate_?/:Is_Date_Check_?/:Usersearch_?',function(req,res,next)
 { 
   
 try 
 {
Task.Search_Task(req.params.Task_Details_,req.params.Fromdate_,req.params.ToDate_,req.params.Is_Date_Check_,req.params.Usersearch_,
   function (err, rows) 
 {
  if (err) 
  {
    
  res.json(err);
  }
  else 
  {
    // console.log(rows)
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
  router.get('/Search_Task_front_view/:Usersearch_?',function(req,res,next)
  { 
    
  try 
  {
 Task.Search_Task_front_view(req.params.Usersearch_,function (err, rows) 
  {
   if (err) 
   {
     
   res.json(err);
   }
   else 
   {
     console.log(rows)
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
 router.get('/Get_Task/:Task_Id_?',function(req,res,next)
 { 
 try 
 {
Task.Get_Task(req.params.Task_Id_, function (err, rows) 
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

  router.get('/Load_User_Details/',function(req,res,next)
  { 
  try 
  {
    Task.Load_User_Details(function (err, rows) 
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

 router.get('/Delete_Task/:Task_Id_?',function(req,res,next)
 { 
 try 
 {
Task.Delete_Task(req.params.Task_Id_, function (err, rows) 
 {
  if (err) 
  {
    
  res.json(err);
  }
  else 
  {
    console.log(rows)
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
  //   { 
  //   try 
  //   {
     
  //     Task.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
  //   {
  //   if (err) 
  //   {
  ;
  //   res.json(err);
  //   }
  //   else 
  //   {
  //   res.json(rows);
  //   }
  //   });
  //   }
  //   catch (e) 
  //   {
  
  //   }
  //   finally 
  //   {
  //   }
  //   });
  module.exports = router;

