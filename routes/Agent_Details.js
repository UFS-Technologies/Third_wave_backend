 var express = require('express');
 var router = express.Router();
 var Agent_Details=require('../models/Agent_Details');

 router.post('/Save_Agent_Details/',function(req,res,next)
 { 
 try 
 {
Agent_Details.Save_Agent_Details(req.body, function (err, rows) 
 {
  if (err) 
  {
    console.log(err);
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
   console.log(e);
 }
 finally 
 {
 }
  });


  router.post('/Save_Manage_User/',function(req,res,next)
  { 
  try 
  {
 Agent_Details.Save_Manage_User(req.body, function (err, rows) 
  {
   if (err) 
   {
     console.log(err);
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
    console.log(e);
  }
  finally 
  {
  }
   });
 

  router.post('/Save_Freelancer_Details/',function(req,res,next)
  { 
  try 
  {
 Agent_Details.Save_Freelancer_Details(req.body, function (err, rows) 
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
    console.log(e)
  }
  finally 
  {
  }
   });

   router.post('/Save_Freelancer_Payment/',function(req,res,next)
  { 
  try 
  {
 Agent_Details.Save_Freelancer_Payment(req.body, function (err, rows) 
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
    console.log(e)
  }
  finally 
  {
  }
   });

  
 router.get('/Search_Agent_Details/:Agent_Name_?/:Login_User_?/:User_Type_?',function(req,res,next)
 { 
   
 try 
 {
Agent_Details.Search_Agent_Details(req.params.Agent_Name_,req.params.Login_User_,req.params.User_Type_, function (err, rows) 
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
 router.get('/Get_Agent_Details/:Agent_Id_?',function(req,res,next)
 { 
 try 
 {
Agent_Details.Get_Agent_Details(req.params.Agent_Id_, function (err, rows) 
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

  router.get('/Get_Agent_Department_Data/:Agent_Id_?',function(req,res,next)
  { 
  try 
  {
 Agent_Details.Get_Agent_Department_Data(req.params.Agent_Id_, function (err, rows) 
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
   


 router.get('/Delete_Agent_Details/:Agent_Id_?',function(req,res,next)
 { 
 try 
 {
Agent_Details.Delete_Agent_Details(req.params.Agent_Id_, function (err, rows) 
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


  router.get('/Delete_Agent_Payment/:Agent_Id_?',function(req,res,next)
 { 
 try 
 {
Agent_Details.Delete_Agent_Payment(req.params.Agent_Id_, function (err, rows) 
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


  router.get('/Search_Freelancer_Details/:Agent_Name_?/:Login_User_?/:User_Type_?',function(req,res,next)
  { 
    
  try 
  {
 Agent_Details.Search_Freelancer_Details(req.params.Agent_Name_,req.params.Login_User_,req.params.User_Type_, function (err, rows) 
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

   router.get('/Search_Freelancer_Payment/:FromDate?/:ToDate?/:Name?',function(req,res,next)
  { 
    
  try 
  {
 Agent_Details.Search_Freelancer_Payment(req.params.FromDate,req.params.ToDate,req.params.Name, function (err, rows) 
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


   router.get("/Search_Name_Typeahead/", function (req, res, next) {
    try {
      Agent_Details.Search_Name_Typeahead(
        req.query.Agent_Name,
        function (err, rows) {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            res.json(rows);
          }
        }
      );
    } catch (e) {
    } finally {
    }
  });

  
  // router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
  //   { 
  //   try 
  //   {
     
  //     Agent_Details.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
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

