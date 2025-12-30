var express = require("express");
var router = express.Router();
var Department_Status = require("../models/Department_Status");
router.post("/Save_Department_Status/", function (req, res, next) {
  try {
    console.log("The datas that is coming is",req.body)
    Department_Status.Save_Department_Status(req.body, function (err, rows) {
      if (err) {
        res.json(err);
        console.log(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
  } finally {
  }
});



router.post("/Save_process_Status_details/", function (req, res, next) {
  try {
    Department_Status.Save_process_Status_details(req.body, function (err, rows) {
      if (err) {
        res.json(err);
        console.log(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
  }
});

router.get("/Search_Department_Status/", function (req, res, next) {
  try {
    Department_Status.Search_Department_Status(
      req.query.Department_Status_Name_,
      req.query.dept_id_,
      req.query.transfer_dept_id_,req.query.Order_,
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
  "/Get_Department_Status/:Department_Status_Id_?",
  function (req, res, next) {
    try {
      Department_Status.Get_Department_Status(
        req.params.Department_Status_Id_,
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
  }
);
router.get(
  "/Delete_Department_Status/:Department_Status_Id_?",
  function (req, res, next) {
    try {
      Department_Status.Delete_Department_Status(
        req.params.Department_Status_Id_,
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
  }
);

// router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
//   {
//   try
//   {

//     Department_Status.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
//   {
//   if (err)
//   {
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

router.get(
  "/Get_Sub_Status/:Department_Status_Id_?",
  function (req, res, next) {
    try {
      Department_Status.Get_Sub_Status(
        req.params.Department_Status_Id_,
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
  }
);

router.post("/Save_Sub_Status/", function (req, res, next) {
  try {
    Department_Status.Save_Sub_Status(req.body, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  } catch (e) {
  } finally {
  }
});

router.get("/Delete_Sub_Status/:Sub_Status_Id_?", function (req, res, next) {
  try {
    Department_Status.Delete_Sub_Status(
      req.params.Sub_Status_Id_,
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


router.get("/Search_Document_new/", function (req, res, next) {
  try {
    Department_Status.Search_Document_new(
      req.query.Document_Name_,
     
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


router.get("/Search_Check_list_new/", function (req, res, next) {
  try {
    Department_Status.Search_Check_list_new(
      req.query.Check_List_Name_,
     
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



router.get("/Search_Notification_new/", function (req, res, next) {
  try {
    Department_Status.Search_Notification_new(
      req.query.Department_Name_,
     
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



router.get("/Search_Department_Status_new/", function (req, res, next) {
  try {
    Department_Status.Search_Department_Status_new(
      req.query.Department_Status_Name_,
     
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


router.get("/Search_Process_department_Details/", function (req, res, next) {
  try {
    Department_Status.Search_Process_department_Details(
      req.query.Department_Status_Id_,
      req.query.Process_id_,
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
    console.log(e)
  } finally {
  }
});



router.get("/Search_Process_department_Details_contain/", function (req, res, next) {
  try {
    Department_Status.Search_Process_department_Details_contain(
      req.query.Department_Status_Id_,
      req.query.Process_id_,
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
    console.log(e)
  } finally {
  }
});




router.get("/Search_Process_NextStatus_Details_contain/", function (req, res, next) {
  try {
    Department_Status.Search_Process_NextStatus_Details_contain(
      req.query.Department_Status_Id_,
      req.query.Process_id_,
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
    console.log(e)
  } finally {
  }
});
module.exports = router;
