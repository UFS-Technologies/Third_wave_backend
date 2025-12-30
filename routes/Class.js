var express = require('express');
var router = express.Router();
var Class = require('../models/Class');
router.post('/Save_Class/', function (req, res, next) {
  try {
    Class.Save_Class(req.body, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {
  }
  finally {
  }
});



router.get('/Search_Class_Typeahead/', function (req, res, next) {
  try {

    Class.Search_Class_Typeahead(req.query.Class_Name, function (err, rows) {
      if (err) {

        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {

  }
  finally {
  }
});


router.get('/Search_Application_StatusforChangeStatus_Typeahead/', function (req, res, next) {
  try {

    Class.Search_Application_StatusforChangeStatus_Typeahead(req.query.Status_Name, req.query.Login_User, function (err, rows) {
      if (err) {

        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {

  }
  finally {
  }
});

router.get('/Search_Class_Typeahead/:Class_Id_?/:Class_Name_?',function(req,res,next)
  { 
  try 
  {
 Class.Search_Class_Typeahead(req.params.Class_Id_,req.params.Class_Name_, function (err, rows) 
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

 
router.get('/Get_Class/:Class_Id_?', function (req, res, next) {
  try {
    Class.Get_Class(req.params.Class_Id_, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {
  }
  finally {
  }
});
router.get('/Delete_Class/:Class_Id_?', function (req, res, next) {
  try {
    Class.Delete_Class(req.params.Class_Id_, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  catch (e) {
  }
  finally {
  }
});
router.get('/Search_Class_Data/:Class_Name_?',function(req,res,next)
{ 
try 
{
 Class.Search_Class_Data(req.params.Class_Name_, function (err, rows) 
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
 router.get('/Search_Class/',function(req,res,next)
 { 
 try 
 {
   Class.Search_Class(req.query.Class_Name, function (err, rows) 
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

