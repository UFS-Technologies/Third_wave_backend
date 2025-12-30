var express = require("express");
var router = express.Router();
var Process = require("../models/Process");

// Route to create new process
router.post("/Save_Process/", async function (req, res, next) {
  try {
    const reqObj = req.body;

    // Ensure that all required data provided by user
    if (!reqObj.Process_Name || !reqObj.Order_IN || !reqObj.Color)
      throw new Object.assign(
        Error(
          "make sure you provided all the fields required to create a process!",
          { statusCode: 422 }
        )
      );

    // pass new data to model
    const resp = await Process.Save_Process(reqObj);

    return res.send({
      data: resp[0],
      succes: true,
      message: 'success'
    });
  } catch (e) {
    return res.send(e);
  }
});

// Route to get process by id
router.get("/Get_Process/:Process_Id", async function (req, res, next) {
  try {
    // Ensure process id exists in params

    // Get process detrails by id
    const [processDetails] = await Process.Get_Process(req.params.Process_Id);

    res.send(processDetails);
    // console.log(res)
    // console.log('11')
  } catch (e) {
    console.log(e)
    // Send an error response bacck
    res.json({
      succes: false,
      message: e.message,
      data: [],
    });
  }
});

// Route to edit Process
router.post("/Update_Process/:Process_Id", async (req, res, next) => {
  try {
    // Ensure process id exists in params
 

    const obj = req.body;

    // Get process detrails by id
    let [processDetails] = await Process.Get_Process(req.params.Process_Id);
    console.log('processDetails: ', processDetails);
 

    // Create updated data object
    processDetails = {
      ...processDetails[0],
      ...req.body,
    };

    console.log('  processDetails: ',   processDetails);
    // Update process
    const [updatedDetails] = await Process.Update_Process(
      req.params.Process_Id,
      processDetails
    );

    res.send(updatedDetails);
  } catch (err) {
    // Send error response
    res.json({
      succes: false,
      message: err.message,
      data: [],
    });
  }
});


router.get("/Get_Process", async (req, res, next) => {
  try {
    const [process] = await Process.get_All();

    res.json({
      succes: true,
      message: 'success',
      data: process,
    })
  } catch (err) {

    console.log(err)
    res.json({
      succes: false,
      message: err.message,
      data: [],
    })
  }
})


// router.get('/Get_Process/',function(req,res,next)
// { 
// try 
// {
       
//   Process.get_All( function (err, rows) 
// {
//  if (err) 
//  {
    
//  res.json(err);
//  }
//  else 
//  {
//    res.json(rows);
//  }
//  });
//  }
// catch (e) 
// {
//   console.log(e)
// }
// finally 
// {
// }
//  });



router.get('/Duplicate_process/:Process_Id_?',function(req,res,next)
{ 
try 
{
       
  Process.Duplicate_process(req.params.Process_Id_, function (err, rows) 
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

router.get("/Delete_process/:Process_Id", async (req, res, next) => {
  try {
    // Ensure process id exists in params

    const status = await Process.Delete_Process(req.params.Process_Id);
    
    res.send(status);
  } catch (err) {
    // Send error response
    res.send({
      succes: false,
      message: err.message,
      data: [],
    });
  }
});

// Route to search process by id
router.get("/Search_process/:processName", async (req, res, next) => {
  try {
     // Ensure process id exists in params

     const [searchData] = await Process.Search_Process(req.params.processName);

     res.send({
      succes: true,
      message: 'success',
      data: searchData,
     })
  } catch (err) {
    // Send error response
    res.send({
      succes: false,
      message: err.message,
      data: [],
    });
  }
})

// Route to search process status by id
router.get("/get_process_status_task/:processId", async (req, res, next) => {
  try {
     // Ensure process id exists in params


     const [searchData] = await Process.Get_Process_Statustask(req.params.processId);

     res.send({
      succes: true,
      message: 'success',
      data: searchData,
     })
  } catch (err) {
    // Send error response
    res.send({
      succes: false,
      message: err.message,
      data: [],
    });
  }
})


// Route to get all processes status list
router.get("/getProcessStatusFlowChartById/:processId", async (req, res, next) => {
  try {
    const processId = req.params.processId;
    const [process] = await Process.getProcessStatusFlowChartById(processId);

    console.log(process);
    res.json({
      succes: true,
      message: 'success',
      data: process[0],
    })
  } catch (err) {
    // Send error response
    console.log(err);
    res.json({
      succes: false,
      message: err.message,
      data: [],
    })
  }
})

router.get("/getProcessStautusByProcessId/:processId", async (req, res, next) => {
  try {
    const processId = req.params.processId;
    const [process] = await Process.getProcessStatusListById(processId);

    console.log(process);
    res.json({
      succes: true,
      message: 'success',
      data: process[0],
    })
  } catch (err) {
    // Send error response
    console.log(err);
    res.json({
      succes: false,
      message: err.message,
      data: [],
    })
  }
})

// Route to create new process
router.post("/updateProcessStatusbyId/", async function (req, res, next) {
  try {
    const reqObj = req.body;

    // Ensure that all required data provided by user
    if (!reqObj.id || !reqObj.departmentStatusId)
      throw new Object.assign(
        Error(
          "make sure you provided all the fields required to update a process status!",
          { statusCode: 422 }
        )
      );

    // pass new data to model
    const resp = await Process.updateProceasStatus(reqObj);

    return res.send({
      data: resp[0],
      succes: true,
      message: 'success'
    });
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
});


router.get('/Search_Process_status/',function(req,res,next)
{ 
try 
{
  Process.Search_Process_status(req.query.Department_Status_Name, function (err, rows) 
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
  console.log(e);
}
finally 
{
}
 });


module.exports = router;
