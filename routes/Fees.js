 var express = require('express');
 var router = express.Router();
 var Fees=require('../models/Fees');
 router.post('/Save_Fees/',function(req,res,next)
 { 
 try 
 {
  Fees.Save_Fees(req.body, function (err, rows) 
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
 router.get('/Search_Fees_Data/:Fees_Name_?',function(req,res,next)
 { 
 try 
 {
  Fees.Search_Fees_Data(req.params.Fees_Name_, function (err, rows) 
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
 router.get('/Get_Fees/:Fees_Id_?',function(req,res,next)
 { 
 try 
 {
  Fees.Get_Fees(req.params.Fees_Id_, function (err, rows) 
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

  router.get('/Search_Fees_Typeahead/:Fees_Id_?/:Fees_Name_?',function(req,res,next)
  { 
  try 
  {
 Fees.Search_Fees_Typeahead(req.params.Fees_Id_,req.params.Fees_Name_, function (err, rows) 
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
 router.get('/Delete_Fees/:Fees_Id_?',function(req,res,next)
 { 
 try 
 {
  Fees.Delete_Fees(req.params.Fees_Id_, function (err, rows) 
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
  router.get('/Search_Fees/',function(req,res,next)
{ 
try 
{
  Fees.Search_Fees(req.query.Fees_Name, function (err, rows) 
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
  //   Fees.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
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



  router.post('/Save_DataField/',function(req,res,next)
  { 
  try 
  {
   Fees.Save_DataField(req.body, function (err, rows) 
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


   router.get('/Search_DataFields/',function(req,res,next)
   { 
   try 
   {
     Fees.Search_DataFields(req.query.Fields_Name, function (err, rows) 
   {
    if (err) 
    {
     
    res.json(err);
    console.log(err);
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

    router.get('/Delete_DataFields/:Fields_Id_?',function(req,res,next)
    { 
    try 
    {
     Fees.Delete_DataFields(req.params.Fields_Id_, function (err, rows) 
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

