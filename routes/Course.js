var express = require("express");
var router = express.Router();
var Course = require("../models/Course");
router.post("/Save_Course/", function (req, res, next) {
  try {
    Course.Save_Course(req.body, async function (err, rows) {;
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

router.get("/Load_Subjects_By_Stream/:streamId?", function (req, res, next) {
  try {
    Course.Load_Subjects_By_Stream(req.params.streamId, function (err, rows) {
      if (err) {
        res.json(err);
        console.log('err: ', err);
      } else {
        res.json(rows);
        console.log('rows: ', rows);
      }
    });
  } catch (e) {
    console.log('e: ', e);
  } finally {
  }
});


router.get("/Delete_Course_Subjects/:Id?", function (req, res, next) {
  try {
    console.log('req.params.Id: ', req.params.Id);
    Course.Delete_Course_Subjects(req.params.Id, function (err, rows) {
      if (err) {
        res.json(err);
        console.log('err: ', err);
      } else {
        res.json(rows);
        console.log('rows: ', rows);
      }
    });
  } catch (e) {
    console.log('e: ', e);
  } finally {
  }
});

router.get("/Load_Course_Subjects_By_Course/:courseId?", function (req, res, next) {
  try {
    Course.Load_Course_Subjects_By_Course(req.params.courseId, function (err, rows) {
      if (err) {
        res.json(err);
        console.log('err: ', err);
      } else {
        res.json(rows);
        console.log('rows: ', rows);
      }
    });
  } catch (e) {
    console.log('e: ', e);
  } finally {
  }
});

router.post("/Save_Course_Subjects/", function (req, res, next) {
  try {
    Course.Save_Course_Subjects(req.body, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});


// router.post('/Save_Course_Subjects', (req, res) => {
//   const courseSubjects = req.body;
//   const query = `CALL Save_Course_Subjects(?)`;
  
//   connection.query(query, [JSON.stringify(courseSubjects)], (error, results) => {
//     if (error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.json(results);
//     }
//   });
// });
router.get("/Load_Qualifications", function (req, res, next) {
    try {
        Course.Load_Qualifications(function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.get("/Load_Universities", function (req, res, next) {
    try {
        Course.Load_Universities(function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});
router.get("/Load_States", function (req, res, next) {
    try {
        Course.Load_States(function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.get("/Load_Streams", function (req, res, next) {
    try {
        Course.Load_Streams(function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});

// Function to get course qualification
router.post("/Get_Course_Qualification", async (req, res) => {
  try {
    const [data] = await Course.Get_Course_Qualification(req.body.id);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.post("/Save_Course_Import/", function (req, res) {
  try {
    Course.Save_Course_Import(req.body, function (err, rows) {
      if (err) {
        res.json(err);
        console.log('err: ', err);
      } else {
        res.json(rows);
        console.log('rows: ', rows);
      }
    });
  } catch (e) {
    console.log('e: ', e);
  } finally {
  }
});

router.get(
  "/Search_Course_Import/:From_Date_?/:To_Date_?/:Is_Date_Check_?/",
  function (req, res, next) {
    try {
      Course.Search_Course_Import(
        req.query.From_Date_,
        req.query.To_Date_,
        req.query.Is_Date_Check_,
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

router.get("/Search_Course/", function (req, res, next) {
  try {
   
    Course.Search_Course(
      req.query.Course_Name_,
      req.query.Level_Id_,
      req.query.Country_Id_,
      req.query.Internship_Id_,
      req.query.Duration_Id_,
      req.query.University_Id_,
      req.query.Subject_Id_,
      req.query.Intake_Id,
      req.query.Sub_Section_Id_,
      req.query.Pointer_Start_,
      req.query.Pointer_Stop_,
      req.query.Page_Length_,
      function (err, rows) {
        if (err) {
          res.json(err);
          console.log('err: ', err);
        } else {
          //
          res.json(rows);
           console.log('rows: ', rows);
        }
      }
    );
  } catch (e) {
  } finally {
  }
});

router.get("/Get_Course/:Course_Id_?", function (req, res, next) {
  try {
    Course.Get_Course(req.params.Course_Id_, function (err, rows) {
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

router.get("/Get_Course_Import/:Import_Master_Id_?", function (req, res, next) {
  try {
    Course.Get_Course_Import(
      req.params.Import_Master_Id_,
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

router.get("/Delete_Course/:Course_Id_?", function (req, res, next) {
  try {
    Course.Delete_Course(req.params.Course_Id_, function (err, rows) {
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

router.get(
  "/Search_Course_Typeahead/:Country_Id_?/:Subject_Id_?/:Sub_Section_Id_?/:Level_Id_?/:Course_Name_?/:Duration_Id_?/:Ielts_Minimum_Score_?/:Intake_Id_?/:Internship_Id_?/",
  function (req, res, next) {
    try {
      Course.Search_Course_Typeahead(
        req.query.Country_Id_,
        req.query.Subject_Id_,
        req.query.Sub_Section_Id_,
        req.query.Level_Id_,
        req.query.Course_Name_,
        req.query.Duration_Id_,
        req.query.Ielts_Minimum_Score_,
        req.query.Intake_Id_,
        req.query.Internship_Id_,
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

//  router.get('/Get_Menu_Status/:Menu_Id_?/:Login_User_?',function(req,res,next)
//  {
//  try
//  {
//   Course.Get_Menu_Status(req.params.Menu_Id_,req.params.Login_User_, function (err, rows)
//  {
//  if (err)
//  {
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

router.get("/Search_Courses_Typeahead/", function (req, res, next) {
  try {
    Course.Search_Courses_Typeahead(
      req.query.Course_Name,
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

router.get("/Search_Courses_Typeahead_tempp/", function (req, res, next) {
  try {
    Course.Search_Courses_Typeahead_tempp(
      req.query.Course_Name,req.query.University_Id,
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

// router.get("/Search_Courses_Typeahead_Check/", function (req, res, next) {
//   try {
//     Course.Search_Courses_Typeahead_Check(
//       req.query.Course_Name,req.query.University_Id,
//       function (err, rows) {
//         if (err) {
//           console.log(err);
//           res.json(err);
//         } else {
//           res.json(rows);
//         }
//       }
//     );
//   } catch (e) {
//   } finally {
//   }
// });

router.get("/Search_Courses_Typeahead_Check/", function (req, res, next) {
  try {
    const courseName = req.query.Course_Name;
    const universityIds = req.query.University_Ids;

    // Ensure University_Ids is an array
    const parsedUniversityIds = Array.isArray(universityIds) 
      ? universityIds 
      : universityIds ? [universityIds] : [];

    Course.Search_Courses_Typeahead_Check(
      courseName,
      parsedUniversityIds,
      function (err, rows) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.json(rows);
        }
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/Search_Courses_Fees_Typeahead/", function (req, res, next) {
  try {
    Course.Search_Courses_Fees_Typeahead(
      req.query.Course_Name,
      req.query.Student_Id,
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

module.exports = router;
