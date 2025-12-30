 var express = require('express');
 var router = express.Router();
 var Course_Details=require('../models/Course_Details');
//  router.post('/Save_Course_Details/',function(req,res,next)
//  { 
//  try 
//  {
//   Course_Details.Save_Course_Details(req.body, function (err, rows) 
//  {
//   if (err) 
//   {
//   res.json(err);

//   }
//   else 
//   {
//     res.json(rows);
//   }
//   });
//   }
//  catch (e) 
//  {
//  }
//  finally 
//  {
//  }
//   });

  router.post('/Save_Course_Details/',function(req,res,next)
  { 
  try 
  {
    Course_Details.Save_Course_Details(req.body, function (err, rows) 
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
 router.get('/Search_Course_Details/:StatusName_?',function(req,res,next)
 { 
   
 try 
 {
  Course_Details.Search_Course_Details(req.params.StatusName_, function (err, rows) 
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
 router.get('/Get_Course_Details/:Course_Details_Id_?',function(req,res,next)
 { 
 try 
 {
  Course_Details.Get_Course_Details(req.params.Course_Details_Id_, function (err, rows) 
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
 router.get('/Delete_Course_Details/:Course_Details_Id_?',function(req,res,next)
 { 
 try 
 {
  Course_Details.Delete_Course_Details(req.params.Course_Details_Id_, function (err, rows) 
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

