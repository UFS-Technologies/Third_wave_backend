const express = require("express");
const router = express.Router();
const statusTaskModel = require("../models/Status_Task");

router.post("/create_status_task", async (req, res, next) => {
  try {
    const obj = req.body;

    // Make sure all required fields are provided
    if (
      !obj.status_id ||
      !obj.department_id ||
      !obj.description ||
      !obj.task_id
    ) {
    }

    // Save new data
    const [result] = await statusTaskModel.createStatusTask(obj);

    // Send success response
    res.send({
      succes: true,
      message: "successfully created",
      data: result,
    });
  } catch (err) {
    // Return errror response
    res.json({
      succes: false,
      message: err.message,
      data: [],
    });
  }
});

router.get("/Get_All_Status_Tasks", async (req, res, next) => {
  try {
    const [statusTasks] = await statusTaskModel.getAll();

    res.json({
      succes: true,
      message: "successfully retrived",
      data: statusTasks,
    });
  } catch (err) {
    // Return error response
    res.json({
      succes: false,
      message: err.message,
      data: [],
    });
  }
});

router.get("/Get_By_Status_Id/:StatusId", async (req, res, next) => {
  try {
    const [statusTasks] = await statusTaskModel.getByStatusId(req.params.StatusId);

    res.json({
      succes: true,
      message: "successfully retrived",
      data: statusTasks,
    });
  } catch (err) {
    // Return error response
    res.json({
      succes: false,
      message: err.message,
      data: [],
    });
  }
});

router.post("/Update_Status_task/:statusTaskId", async (req, res, next) => {
  try {
    // Ensure process id exists in params


    const [status] = await statusTaskModel.upateStatusTask(
      req.params.statusTaskId,
      req.body
    );

    res.json({
      succes: true,
      message: "updates successfully",
      data: status,
    });
  } catch (err) {
    // Return error response
    res.json({
      succes: false,
      message: err.message,
      data: {},
    });
  }
});

router.get("/Delete_task/:statusTaskId", async (req, res, next) => {
  try {
    // Ensure process id exists in params
  

    const [status] = await statusTaskModel.deleteStatusTask(
      req.params.statusTaskId
    );

    res.json({
      succes: true,
      message: "deleted successfully",
      data: status,
    });
  } catch (err) {
    // Return error response
    res.json({
      succes: false,
      message: err.message,
      data: {},
    });
  }
});

module.exports = router;
