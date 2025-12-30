 var express = require('express');
 var router = express.Router();
 var Document=require('../models/Document');
//  router.post('/Save_Document/',function(req,res,next)
//  { 
//  try 
//  {
// Document.Save_Document(req.body, function (err, rows) 
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




router.post('/Save_Document/',function(req,res,next)
 { 
 try 
 {
Document.Save_Document(req.body, function (err, rows) 
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

  router.get("/Load_Document_Data", async (req, res, next) => {
    try {

      const result = await Document.Load_Document_Data();
      console.log(result);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.send(e); // Not recommended to send error details in production
    } finally {
      // Optional cleanup code
    }
  }); 

  router.get("/Load_File_Type", async (req, res, next) => {
    try {

      const result = await Document.Load_File_Type();
      console.log(result);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.send(e); 
    } finally {
      // Optional cleanup code
    }
  }); 


  router.get("/Load_Country_Type", async (req, res, next) => {
    try {

      const result = await Document.Load_Country_Type();
      console.log(result);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.send(e); // Not recommended to send error details in production
    } finally {
      // Optional cleanup code
    }
  });



  router.get("/Load_University_Type", async (req, res, next) => {
    try {

      const result = await Document.Load_University_Type();
      console.log(result);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.send(e); // Not recommended to send error details in production
    } finally {
      // Optional cleanup code
    }
  });




  router.post('/Save_Process_view/',function(req,res,next)
  { 
  try 
  {
 Document.Save_Process_view(req.body, function (err, rows) 
  {
   if (err) 
   {
     console.log(err);
   res.json(err);
     
   }
   else 
   {
     console.log(rows);
     res.json(rows);
   }
   });
   }
  catch (e) 
  {
   console.log(e);
   console.log(e);
  }
  finally 
  {
  }
   });
  
  router.get("/Load_Process_Data", async (req, res, next) => {
    try {

      const result = await Document.Load_Process_Data();
      console.log(result);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.send(e); // Not recommended to send error details in production
    } finally {
      // Optional cleanup code
    }
  });
  router.get('/Get_Mandatory_Document_Edit/:University_Id_?',function(req,res,next)
  { 
  try 
  {
    Document.Get_Mandatory_Document_Edit(req.params.University_Id_, function (err, rows) 
  {
   if (err) 
   {
   res.json(err);
   }
   else 
   {
     console.log('rows: ', rows);
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
  
 router.get('/Search_Document/',function(req,res,next)
 { 
 try 
 {
Document.Search_Document(req.query.Student_Id_, function (err, rows) 
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
 router.get('/Get_Document/:Document_Id_?',function(req,res,next)
 { 
 try 
 {
Document.Get_Document(req.params.Document_Id_, function (err, rows) 
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

router.get('/Get_File_Type/:Document_Id_?', function (req, res, next) {
  try {
    Document.Get_File_Type(req.params.Document_Id_, function (err, rows) {
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



router.get('/Get_Process_Status_by_process/:selectedProcess?', function (req, res, next) {
  try {
    Document.Get_Process_Status_by_process(req.params.selectedProcess, function (err, rows) {
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

 router.get('/Delete_Document/:Document_Id_?',function(req,res,next)
 { 
 try 
 {
Document.Delete_Document(req.params.Document_Id_, function (err, rows) 
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


  

 router.get('/Document_Search/',function(req,res,next)
 { 
 try 
 {
  console.log(req.query.Document_Type);
  console.log('req.query.Document_Name_: ', req.query.Document_Name_);
Document.Document_Search(req.query.Document_Name_,req.query.Document_Type, function (err, rows) 

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
   console.log(e);
 }
 finally 
 {
 }
  });


  router.get('/getDocumentTypeByDocumentId/:Document_Id_', async (req, res) => {
    try {
      const result = await Document.getDocumentTypeByDocumentId(req.params.Document_Id_);
      res.json({ result });
    } catch (e) {
      console.error(e);
      res.send(e);
    }
    finally 
  {
  }
  });




  
  module.exports = router;

