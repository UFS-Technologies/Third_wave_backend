const db = require("../dbconnection");

const pool = db.promise();

const statusTasks = {
  // Function to create new status task
  createStatusTask: (obj) => {
    return pool.query(
      `
        INSERT INTO status_task (status_id, department_id, description, notification_ids,  task_id) 
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        obj.status_id,
        obj.department_id,
        obj.description ? obj.description : null,
        obj.notification_ids ? obj.notification_ids : null,
        obj.task_id,
      ]
    );
  },

  // Function to get all status tasks
  getAll: () => {
    return pool.query(
      `
          SELECT * FROM status_task
        `
    );
  },

  // Function to get all status tasks
  getByStatusId: (statusId) => {
    return pool.query(
      `
        SELECT *
        FROM status_task
        INNER JOIN department ON status_task.department_id = department.Department_Id
        INNER JOIN task_item ON status_task.task_id = task_item.Task_Item_Id
        WHERE status_task.status_id = ?
        `,
      [statusId]
    );
  },

  // Function to update Status task
  upateStatusTask: function (statusId, newData) {
    return pool.query(
      `
      UPDATE status_task
      SET
        department_id = ?,
        description = ?,
        task_id = ?,
        notification_ids = ?
      WHERE status_task_id = ?
      `,
      [
        newData.department_id,
        newData.description,
        newData.task_id,
        newData.notification_ids,
        statusId,
      ]
    );
  },

  // Function to delete status task
  deleteStatusTask: (taskId) => {
    return pool.query(
      `
        DELETE from status_task
        WHERE status_task_id = ?
      `,
      [taskId]
    );
  },
};

module.exports = statusTasks;
