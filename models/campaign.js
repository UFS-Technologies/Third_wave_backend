// src/models/campaign.js
var db = require('../dbconnection');

var Campaign = {
  Save_Campaign: function(campaign_, callback) {
    console.log(campaign_);
  //   let campaign_department_users_=campaign_.Campaign_Department_Users_Data;
  //   var campaign_department_value_ = 0;
  //   if (campaign_department_users_!= undefined && campaign_department_users_ != "" && campaign_department_users_ != null){
  //      campaign_department_value_ = 1;
  //   }
  //    campaign_department_users_=JSON.stringify(campaign_.Campaign_Department_Users_Data)
  //   console.log('campaign_department_users_: ', campaign_department_users_);
  //  console.log(campaign_department_value_);

    return db.query("CALL Save_Campaign(" +
      "@campaign_details_id_ :=?," +
      "@campaign_id_ :=?," +
      "@campaign_name_ :=?," +
      "@Branch_Id_ :=?," +
      "@Branch_Name_ :=?,"+
      "@Enquiry_Source_Id_ :=?,"+
      "@Enquiry_Source_Name_ :=?," +
      "@Department_Id_ :=?," +      
      "@Department_Name_ :=?,"+
      "@to_user_id_ :=?,"+
      "@Department_Status_Id_ :=?,"+
      "@Enquiry_Source_Name_ :=?"+
      ")",
      [
        campaign_.campaign_details_id ,
        campaign_.campaign_id,
        campaign_.campaign_name,
        campaign_.Branch_Id,
        campaign_.Branch_Name,
        campaign_.Enquiry_Source_Id,
        campaign_.Enquiry_Source_Name,
        campaign_.Department_Id,
        campaign_.Department_Name,
        campaign_.to_user_id,
        campaign_.Department_Status_Id,
        campaign_.Enquiry_Source_Name
      ],
      callback
    );
  },

  Search_Campaign: function(campaign_name, callback) {
    return db.query("CALL Search_Campaign(@campaign_name_search :=?)",
      [campaign_name || ''],
      callback
    );
  },

  Delete_Campaign: function(campaign_id, callback) {
    return db.query("CALL Delete_Campaign(@campaign_id_ :=?)",
      [campaign_id],
      callback
    );
  },
  get_campaigne_department_details: function(campaign_details_id_, callback) {
    return db.query(
      "CALL get_campaigne_department_details(?)",
      [campaign_details_id_],
      callback
    );
  },

};

module.exports = Campaign;