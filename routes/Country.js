var express = require("express");
var router = express.Router();
var Country = require("../models/Country");
const ApplicationGroup = require("../models/Course");

router.post("/Save_Country/", function (req, res, next) {
  try {
    Country.Save_Country(req.body, function (err, rows) {
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

router.get("/Search_Country_Typeahead/", function (req, res, next) {
  try {
    Country.Search_Country_Typeahead(
      req.query.Country_Name,
      function (err, rows) {
        if (err) {
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

router.get(
  "/Search_Application_StatusforChangeStatus_Typeahead/",
  async function (req, res, next) {
    try {
      const departmentStatusList = await ApplicationGroup.Search_Application_StatusforChangeStatus_Typeahead(
        req.query.University_Id > 0 ?  req.query.University_Id : 0,
        req.query.Application_status_Id > 0 ?  req.query.Application_status_Id : 0,
        req.query.Student_Id > 0 ? req.query.Student_Id : 0  // Add this line

      )

      res.json([departmentStatusList]);

      // Previous code commented
      // if(!departmentStatusList || !departmentStatusList.length) {
      //   Country.Search_Application_StatusforChangeStatus_Typeahead(
      //     req.query.Status_Name,
      //     req.query.Login_User,
      //     function (err, rows) {
      //       if (err) {
      //         res.json(err);
      //       } else {
      //         res.json(rows);
      //       }
      //     }
      //   );
      // }
    } catch (e) {
      console.log(e);
      res.json()[[]]
    } finally {
    }
  }
);
router.get(
    "/Search_All_Application_Statuses/",
    async function (req, res, next) {
        try {
            const allStatusList = await ApplicationGroup.Search_All_Application_Statuses(
                req.query.University_Id > 0 ? req.query.University_Id : 0,
                req.query.Student_Id > 0 ? req.query.Student_Id : 0
            );
            res.json([allStatusList]);
        } catch (e) {
            console.log(e);
            res.json([[]]);
        }
    }
);
router.get("/Search_Country/", function (req, res, next) {
  try {
    Country.Search_Country(req.query.Country_Name, function (err, rows) {
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
router.get("/Get_Country/:Country_Id_?", function (req, res, next) {
  try {
    Country.Get_Country(req.params.Country_Id_, function (err, rows) {
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


router.get("/update_commission_Country/:Country_Id_?", function (req, res, next) {
  try {
    Country.update_commission_Country(req.params.Country_Id_, function (err, rows) {
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
router.get("/Delete_Country/:Country_Id_?", function (req, res, next) {
  try {
    Country.Delete_Country(req.params.Country_Id_, function (err, rows) {
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




router.get("/Search_Application_StatusFor_Process_Document/", function (req, res, next) {
  try {
    Country.Search_Application_StatusFor_Process_Document(
      req.query.Process_id,
      req.query.Department_Status_Id,
      req.query.Application_details_Id,
      req.query.Student_Id,


      function (err, rows) {
        if (err) {
          res.json(err);
          console.log(err);
        } else {
          res.json(rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  } finally {
  }
});



router.post('/Save_Country_Intake/',function(req,res,next)
{ 
try 
{
Country.Save_Country_Intake(req.body, function (err, rows) 
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

 router.get('/Delete_Country_Intake/:Country_Intake_Id_?',function(req,res,next)
 { 
 try 
 {
Country.Delete_Country_Intake(req.params.Country_Intake_Id_, function (err, rows) 
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


  router.get('/Search_Country_Intake/',function(req,res,next)
  { 
  try 
  {
 Country.Search_Country_Intake(req.query.Country_Id_,req.query.Intake_Id_,req.query.Year_Id_,req.query.Status_Id_, function (err, rows) 
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

   
   router.get('/Get_Country_Intake/:Country_Intake_Id_?',function(req,res,next)
   { 
   try 
   {
    Country.Get_Country_Intake(req.params.Country_Intake_Id_, function (err, rows) 
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
