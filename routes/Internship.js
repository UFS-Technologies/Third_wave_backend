 var express = require('express');
 var router = express.Router();
 var Internship=require('../models/Internship');
 router.post('/Save_Internship/',function(req,res,next)
 { 
 try 
 {
Internship.Save_Internship(req.body, function (err, rows) 
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
 router.get('/Search_Internship/',function(req,res,next)
 { 
 try 
 {
Internship.Search_Internship(req.query.Internship_Name, function (err, rows) 
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
 router.get('/Get_Internship/:Internship_Id_?',function(req,res,next)
 { 
 try 
 {
Internship.Get_Internship(req.params.Internship_Id_, function (err, rows) 
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
 router.get('/Delete_Internship/:Internship_Id_?',function(req,res,next)
 { 
 try 
 {
Internship.Delete_Internship(req.params.Internship_Id_, function (err, rows) 
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


  router.get('/Get_Course_Load_Data/',function(req,res,next)
    { 
    try 
    {
    Internship.Get_Course_Load_Data(function (err, rows)  
    {
    if (err) 
    {
    res.json(err);
    }
    else 
    {
      console.log("rows:",rows);
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

