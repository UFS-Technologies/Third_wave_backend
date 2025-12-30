var express = require('express');
var router = express.Router();
var Remarks=require('../models/Remarks');
router.post('/Save_Remarks/',function(req,res,next)
{ 
try 
{
Remarks.Save_Remarks(req.body, function (err, rows) 
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


 router.post('/Save_Document_Type/',function(req,res,next)
{ 
try 
{
Remarks.Save_Document_Type(req.body, function (err, rows) 
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

 router.post('/Save_Task_Type/',function(req,res,next)
{ 
try 
{
Remarks.Save_Task_Type(req.body, function (err, rows) 
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

 router.post('/Save_Username/',function(req,res,next)
{ 
try 
{
Remarks.Save_Username(req.body, function (err, rows) 
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

 router.get('/Remarks_Typeahead/',function(req,res,next)
 { 
 try 
 {
  // 
   Remarks.Remarks_Typeahead(req.query.Remarks_Name,function (err, rows) 
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







router.get('/Search_Remarks/',function(req,res,next)
{ 
try 
{
Remarks.Search_Remarks(req.query.Remarks_Name, function (err, rows) 
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

 router.get('/Search_Document_Type/',function(req,res,next)
{ 
try 
{
Remarks.Search_Document_Type(req.query.Task_Type_Name, function (err, rows) 
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

 router.get('/Search_Task_Type/',function(req,res,next)
{ 
try 
{
Remarks.Search_Task_Type(req.query.Document_Type_Name, function (err, rows) 
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

 router.get('/Search_Username/',function(req,res,next)
 { 
 try 
 {
 Remarks.Search_Username(req.query.Login_User, function (err, rows) 
 {
  if (err) 
  {
    console.log(err)
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
  console.log(e)
 }
 finally 
 {
 }
  });



router.get('/Delete_Remarks/:Remarks_Id_?',function(req,res,next)
{ 
try 
{
Remarks.Delete_Remarks(req.params.Remarks_Id_, function (err, rows) 
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



 router.get('/Delete_Document_Type/:Document_Type_Id_?',function(req,res,next)
{ 
try 
{
Remarks.Delete_Document_Type(req.params.Document_Type_Id_, function (err, rows) 
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


//  router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
//  { 
//  try 
//  {
//   Remarks.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
//  {
//  if (err) 
//  {
;
//  res.json(err);
//  }
//  else 
//  {
//  res.json(rows);
//  }
//  });
//  }
//  catch (e) 
//  {

//  }
//  finally 
//  {
//  }
//  });





router.get('/Delete_Task_Type/:Task_Type_Id_?',function(req,res,next)
{ 
try 
{
Remarks.Delete_Task_Type(req.params.Task_Type_Id_, function (err, rows) 
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

