var express = require('express');
var router = express.Router();
var Application=require('../models/Application_Group');

router.get('/Search_Application_Group_Typeahead/',function(req,res,next)
{ 
try 
{
 
  Application.Search_Application_Group_Typeahead(req.query.Application_Group_Name,function (err, rows) 
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
router.get('/Get_Application_Group/:Application_Group_Id_?',function(req,res,next)
 { 
 try 
 {
Application.Get_Application_Group(req.params.Application_Group_Id_, function (err, rows) 
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