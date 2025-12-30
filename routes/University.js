var express = require("express");
var router = express.Router();

var University = require("../models/University");
const upload = require("../helpers/multer-helper");

router.post("/Save_University/", function (req, res, next) {
  try {
    University.Save_University(req.body, function (err, rows) {
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

router.get("/Search_University_Typeahead/", function (req, res, next) {
  try {
    University.Search_University_Typeahead(
      req.query.University_Name,
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




router.get("/Search_University_Typeahead_Country/", function (req, res, next) {
  try {
    console.log(',req.query.Country_Id: ', req.query.Country_Id);
    University.Search_University_Typeahead_Country(
      req.query.University_Name,req.query.Country_Id,
     
      function (err, rows) {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log(rows);
          res.json(rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  } finally {
  }
});



router.get("/update_commission/:University_Id_?", function (req, res, next) {
  try {
    University.update_commission(req.params.University_Id_, function (err, rows) {
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

router.get("/Search_Status_Typeahead_check/", function (req, res, next) {
  try {
    const Department_Status_Name = req.query.Department_Status_Name;
    const universityIds = req.query.University_Ids;

    // Ensure University_Ids is an array
    const parsedUniversityIds = Array.isArray(universityIds) 
      ? universityIds 
      : universityIds ? [universityIds] : [];

      University.Search_Status_Typeahead_check(
      Department_Status_Name,
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


router.get("/Search_Status_Typeahead/", function (req, res, next) {
  try {
    console.log('req.query.University_Id: ', req.query.universityId);
    University.Search_Status_Typeahead(
      req.query.Department_Status_Name,req.query.universityId,
      
      function (err, rows) {
        if (err) {
          res.json(err);
          console.log('err: ', err);
        } else {
          res.json(rows);
          console.log('rows: ', rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
    
  } finally {
  }
});

router.get("/Search_Status_Typeahead1/", function (req, res, next) {
  try {
    University.Search_Status_Typeahead1(
      req.query.Department_Status_Name,
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
router.get("/Search_University/", function (req, res, next) {
  try {
    University.Search_University(
      req.query.University_Name,req.query.Country_Id,
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
router.get("/Get_University/:University_Id_?", function (req, res, next) {
  try {
    University.Get_University(req.params.University_Id_, function (err, rows) {
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
router.get("/Delete_University/:University_Id_?", function (req, res, next) {
  try {
    University.Delete_University(
      req.params.University_Id_,
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
router.get("/University_Typeahead/", function (req, res, next) {
  try {
    University.University_Typeahead(
      req.query.University_Name,
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

// router.post('/Save_University', upload.array('myFile'), (req, res, next) => {
//   try {
//     const file = req.files
//     var Photo_=[];
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//     }
//     else
//     {
//       for(var i=0;i<file.length;i++)
//       {
//         Photo_.push({File_name:file[i].filename})
//       }
//     }
//     var Image_Detail=''
// if(Photo_.length>0)
// {
//   Image_Detail=Photo_[0].File_name;
// }
//     {
//       var Photo_json = JSON.stringify(Photo_)
//       var University_ =
//       {
//         "University_Id":req.body.University_Id,
//         "University_Name":req.body.University_Name,
//         "About":req.body.About,
//         "About1":req.body.About1,
//         "About2":req.body.About2,
//         "Location":req.body.Location,
//         "Address":req.body.Address,
//         "Founded_In":req.body.Founded_In,
//         "Institution_Type":req.body.Institution_Type,
//         "Cost_Of_Living":req.body.Cost_Of_Living,
//         "Tution_Fee":req.body.Tution_Fee,
//         "Application_Fee":req.body.Application_Fee,
//         "Type_Of_Accomodation":req.body.Type_Of_Accomodation,
//         "Contact_Number":req.body.Contact_Number,
//         "Email":req.body.Email,
//         "Web":req.body.Web,
//         "Fb":req.body.Fb,
//         "Linkedin":req.body.Linkedin,
//         "Twitter":req.body.Twitter,
//         "Googlemap":req.body.Googlemap,
//         "Status":req.body.Status,
//         "University_Id":req.body.University_Id,
//         "Sub_Heading1":req.body.Sub_Heading1,
//         "Sub_Heading2":req.body.Sub_Heading2,
//         "Sub_Heading3":req.body.Sub_Heading3,
//         "School_Rank":req.body.School_Rank,
//         "Video_Link":req.body.Video_Link,
//         "Sub_Heading_Colored":req.body.Sub_Heading_Colored,
//       "Banner_Image":Image_Detail
//    };

//    University.Save_University(University_, function (err, rows) {
//         if (err) {
//           return 1;
//         }
//         else {
//           return res.json(rows);
//         }
//       });
//     }
//   }
//   catch (err) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
// });
// router.post('/Save_University_Photos', upload.array('myFile'), (req, res, next) => {
//   try {
//     const file = req.files
//     var Photo_=[];
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//     }
//     else
//     {
//       for(var i=0;i<file.length;i++)
//       {
//         Photo_.push({File_name:file[i].filename})
//       }

//     }

//     {
//       var Photo_json = JSON.stringify(Photo_)
//       var University_ =
//       {
//         "University_Id":req.body.University_Id,
//       "Photo":Photo_json
//    };
//    University.Save_University_Photos(University_, function (err, rows) {
//         if (err) {
//           return 1;
//         }
//         else {
//           return res.json(rows);
//         }
//       });
//     }
//   }
//   catch (err) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
// });
// router.get('/University_Typeahead/',function(req,res,next)
//   {
//   try
//   {
//   University.University_Typeahead(req.query.University_Name,function (err, rows)
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
  router.get('/University_Typeahead_with_Country/',function(req,res,next)
  {
  try
  {
  University.University_Typeahead_with_Country(req.query.University_Name,req.query.Country_Id,function (err, rows)
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

// router.get('/Load_Status/',function(req,res,next)
//   {
//   try
//   {
//   University.Load_Status(function (err, rows)
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
// router.get('/Load_University/',function(req,res,next)
//   {
//   try
//   {
//   University.Load_University(function (err, rows)
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
// router.get('/Search_University/',function(req,res,next)
//   {
//   try
//   {
//   University.Search_University(req.query.University_Name, req.query.University_,req.query.Status_,function (err, rows)
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
// router.get('/Get_University_Photos/:University_Id_?',function(req,res,next)
//   {
//   try
//   {
//   University.Get_University_Photos(req.params.University_Id_, function (err, rows)
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
// router.get('/Delete_University/:University_Id_?',function(req,res,next)
//   {
//   try
//   {
//   University.Delete_University(req.params.University_Id_, function (err, rows)
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
//   router.get('/Search_University_Typeahead/',function(req,res,next)
//   {
//   try
//   {

//    University.Search_University_Typeahead(req.query.University_Name,function (err, rows)
//   {
//   if (err)
//   {
//
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
