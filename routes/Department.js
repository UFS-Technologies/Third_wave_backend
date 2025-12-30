 var express = require('express');
 var router = express.Router();
 var Department=require('../models/Department');
 router.post('/Save_Department/',async function(req,res,next)
 { 
 try 
 {
 const resp=await Department.Save_Department(req.body);
 return res.send(resp);
 }
 catch(e){
   return res.send(e);
 }
  });

 router.get('/Search_Department/:Department_Name_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department(req.params.Department_Name_, function (err, rows) 
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
 
 router.get('/Get_Department/:Department_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Get_Department(req.params.Department_Id_, function (err, rows) 
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



  router.get("/Load_Status_Dropdown/", function (req, res, next) {
    try {
      Department.Load_Status_Dropdown(function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    } catch (e) {
    } finally {
    }
  });


  router.get('/Get_Department_InUser/',function(req,res,next)
  { 
  try 
  {
 Department.Get_Department_InUser( function (err, rows) 
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
   router.get('/Search_Department_Status/:Department_Status_Name_?',function(req,res,next)
   { 
     
   try 
   {
    Department.Search_Department_Status(req.params.Department_Status_Name_, function (err, rows) 
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
 router.get('/Delete_Department/:Department_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Delete_Department(req.params.Department_Id_, function (err, rows) 
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
  router.get('/Search_Branch_Department_Typeahead/:Branch_Id_?/:Department_Name_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Branch_Department_Typeahead(req.params.Branch_Id_,req.params.Department_Name_, function (err, rows) 
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




  router.get('/Search_Department_Typeahead/:Student_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_Typeahead(req.params.Student_Id_,function (err, rows) 
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




  router.get('/Search_DefaultDepartment_User_Typeahead/:Department_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Search_DefaultDepartment_User_Typeahead(req.params.Department_Id_,function (err, rows) 
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















  router.get('/Search_Department_Typeahead_Tasknew/:Student_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_Typeahead_Tasknew(req.params.Student_Id_,function (err, rows) 
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





  router.get('/Search_Branch_User_Typeahead/:Branch_Id_?/:User_Details_Name_?',function(req,res,next)
  { 
  try 
  {
 Department.Search_Branch_User_Typeahead(req.params.Branch_Id_,req.params.User_Details_Name_, function (err, rows) 
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
  // router.get("/Load_User_Status_By_Department/:Department_Id_?/:Branch_Id_?",async (req, res, next) =>{
  //   try {
     
  //     const result = await Department.Load_User_Status_By_Department(req.params.Department_Id_,req.params.Branch_Id_);
      
  //     res.json(result);
  
  //   } catch (e) {
  //     res.send(e);
  //   } finally {
  //   }
  // });
  router.get('/Search_Department_User_Typeahead/:Branch_Id_?/:Department_Id_?/:Users_Name_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_User_Typeahead(req.params.Branch_Id_,req.params.Department_Id_,req.params.Users_Name_, function (err, rows) 
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
  router.get('/Search_Department_User_Typeahead_changestaff/:Branch_Id_?/:Department_Id_?/:Users_Name_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_User_Typeahead_changestaff(req.params.Branch_Id_,req.params.Department_Id_,req.params.Users_Name_, function (err, rows) 
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

  


  router.get('/Search_Department_User_Typeahead_Task/:Department_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_User_Typeahead_Task(req.params.Department_Id_, function (err, rows) 
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



  
  router.get('/Search_Department_User_Typeahead_Tasknew/:Department_Id_?/:Student_Id_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_User_Typeahead_Tasknew(req.params.Department_Id_,req.params.Student_Id_, function (err, rows) 
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



  
router.get('/Search_Branch_Department_TypeaheadNew/:Department_Name_?',function(req,res,next)
{ 
try 
{
Department.Search_Branch_Department_TypeaheadNew(req.params.Department_Name_, function (err, rows) 
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


 router.get('/Search_Department_User_Typeahead_Latest/:Department_Id_?/:Users_Name_?',function(req,res,next)
 { 
 try 
 {
Department.Search_Department_User_Typeahead_Latest(req.params.Department_Id_,req.params.Users_Name_, function (err, rows) 
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





  router.get('/Search_Department_User_Typeahead_New/:Branch_Id_?/:Department_Id_?/:Users_Name_?/:Usertype_?',function(req,res,next)
  { 
  try 
  {
 Department.Search_Department_User_Typeahead_New(req.params.Branch_Id_,req.params.Department_Id_,req.params.Users_Name_,req.params.Usertype_, function (err, rows) 
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


   router.get('/Search_Department_User_Typeahead_Change_User/:Branch_Id_?/:Department_Id_?/:Users_Name_?/:Usertype_?',function(req,res,next)
   { 
   try 
   {
  Department.Search_Department_User_Typeahead_Change_User(req.params.Branch_Id_,req.params.Department_Id_,req.params.Users_Name_,req.params.Usertype_, function (err, rows) 
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



  router.get('/Search_Department_Status_Typeahead/:Department_Id_?/:Department_Status_Name_?',function(req,res,next)
  { 
  try 
  {
 Department.Search_Department_Status_Typeahead(req.params.Department_Id_,req.params.Department_Status_Name_, function (err, rows) 
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


   router.get('/Search_Department_Transfer_Status_Typeahead/:Department_Id_?/:Department_Status_Name_?',function(req,res,next)
   { 
   try 
   {
  Department.Search_Department_Transfer_Status_Typeahead(req.params.Department_Id_,req.params.Department_Status_Name_, function (err, rows) 
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

   router.get('/Search_Substatus_Typeahead/:Status_Id_?/:Sub_Status_Name_?',function(req,res,next)
   { 
   try 
   {
  Department.Search_Substatus_Typeahead(req.params.Status_Id_,req.params.Sub_Status_Name_, function (err, rows) 
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

   router.get('/Get_Status_Selection_Edit/:Department_Id_?',function(req,res,next)
   { 
   try 
   {
    Department.Get_Status_Selection_Edit(req.params.Department_Id_, function (err, rows) 
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
    //   Department.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
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
    router.get('/Load_StatusType/',function(req,res,next)
    { 
    try 
    {
      Department.Load_StatusType(function (err, rows) 
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







    router.get('/Load_DefaultDepartment/',function(req,res,next)
    { 
    try 
    {
      Department.Load_DefaultDepartment(function (err, rows) 
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





     router.get('/Search_DefultUser_Typeahead/:Branch_Id_?/:Department_Id_?',function(req,res,next)
     { 
     try 
     {
    Department.Search_DefultUser_Typeahead(req.params.Branch_Id_,req.params.Department_Id_,function (err, rows) 
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




      router.get('/Search_BranchDefaultDepartment_Typeahead/:Branch_Id_?',function(req,res,next)
      { 
      try 
      {
     Department.Search_BranchDefaultDepartment_Typeahead(req.params.Branch_Id_,function (err, rows) 
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







       router.get('/Search_DefaultDepartmentStatus_Typeahead/:Branch_Id_?/:Department_Id_?',function(req,res,next)
       { 
       try 
       {
      Department.Search_DefaultDepartmentStatus_Typeahead(req.params.Branch_Id_,req.params.Department_Id_,function (err, rows) 
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

