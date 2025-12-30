var express = require('express');
var router = express.Router();
var Course_Search=require('../models/Course_Search');

router.get(
	"/Country_Change_Dropdowns/:Country_Id_?",
	function (req, res, next) {
		try {
			Course_Search.Country_Change_Dropdowns(
				req.params.Country_Id_,
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


router.get('/Public_Search_Course/',function(req,res,next)
{ 
  try 
  {
  //console.log('req: ', req.query);
  //console.log('req: ', req.params);
  //console.log('req: ', req.body);

  Course_Search.Public_Search_Course(req.query.Level_Detail_Id,req.query.Country_Id,req.query.Intake_Id,req.query.Sub_Section_Id, req.query.Course_Name,req.query.Branch_Search,
req.query.Duration_Search,req.query.Ielts_,req.query.Page_Start,req.query.Page_End,req.query.Page_Length,req.query.University,req.query.Subject_1,req.query.Intake_Year_Id,function (err, rows) 
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



  
router.get('/Get_Intake_Year_InCourse/',function(req,res,next)
{ 
try 
{
  Course_Search.Get_Intake_Year_InCourse( function (err, rows) 
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

