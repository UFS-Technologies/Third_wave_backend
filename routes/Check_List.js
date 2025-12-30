 var express = require('express');
 var router = express.Router();
 var Check_List=require('../models/Check_List');
 router.post('/Save_Check_List/',function(req,res,next)
 { 
 try 
 {
Check_List.Save_Check_List(req.body, function (err, rows) 
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

  
 router.get('/Search_Check_List/:Check_List_Name_?',function(req,res,next)
 { 
   
 try 
 {
Check_List.Search_Check_List(req.params.Check_List_Name_, function (err, rows) 
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
 router.get('/Get_Check_List/:Check_List_Id_?',function(req,res,next)
 { 
 try 
 {
Check_List.Get_Check_List(req.params.Check_List_Id_, function (err, rows) 
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
 router.get('/Delete_Check_List/:Check_List_Id_?',function(req,res,next)
 { 
 try 
 {
Check_List.Delete_Check_List(req.params.Check_List_Id_, function (err, rows) 
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
  //   { 
  //   try 
  //   {
     
  //     Check_List.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
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

