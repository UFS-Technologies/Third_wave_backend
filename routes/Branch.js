 var express = require('express');
 var router = express.Router();
 var Branch=require('../models/Branch');
 router.post('/Save_Branch/', async function (req, res, next) {
  try {
    const resp = await Branch.Save_Branch(req.body);
    return res.send(resp);
  }
  catch (e) {
    
    return res.send(e);
  }
});
 router.get('/Search_Branch/:Branch_Name_?',function(req,res,next)
 { 
 try 
 {
Branch.Search_Branch(req.params.Branch_Name_, function (err, rows) 

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
  router.get('/Search_Branch_Typeahead/:Branch_Name_?',function(req,res,next)
 { 
 try 
 {
Branch.Search_Branch_Typeahead(req.params.Branch_Name_, function (err, rows) 

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



  router.get('/Search_Document_Typeahead/:Document_Name_?',function(req,res,next)
  { 
  try 
  {
 Branch.Search_Document_Typeahead(req.params.Document_Name_, function (err, rows) 
 
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


   router.get('/Search_Enquiry_Source_Typeahead/:Enquiry_Source_Name_?',function(req,res,next)
   { 
   try 
   {
  Branch.Search_Enquiry_Source_Typeahead(req.params.Enquiry_Source_Name_, function (err, rows) 
  
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

  router.get("/Get_Branch/:Branch_Id_?",async (req, res, next) =>{
    try 
    {
      const result = await Branch.Get_Branch(req.params.Branch_Id_);
      res.json(result);
    } catch (e) {
      res.send(e);
    } finally {
    }
  });

 router.get('/Get_Branch_Department_Edit/:Branch_Id_?',function(req,res,next)
 { 
 try 
 {
Branch.Get_Branch_Department_Edit(req.params.Branch_Id_, function (err, rows) 
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
 router.get('/Delete_Branch/:Branch_Id_?',function(req,res,next)
 { 
 try 
 {
Branch.Delete_Branch(req.params.Branch_Id_, function (err, rows) 
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
  router.get('/Search_Company/',function(req,res,next)
  { 
  try 
  {
    Branch.Search_Company( function (err, rows) 
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

