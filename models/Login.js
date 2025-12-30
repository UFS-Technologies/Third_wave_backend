var db = require("../dbconnection");

var Login = {
  Login_Check: function(User_Name_, Password_, callback) {
    console.log(User_Name_, Password_)
    return db.query(
      "CALL Login_Check (@User_Name_ :=?,@Password_ :=?)",
      [User_Name_, Password_],
      callback
    );
  },

  Agent_Login: function(User_Name_, Password_, callback) {
    return db.query(
      "CALL Agent_Login (@User_Name_ :=?,@Password_ :=?)",
      [User_Name_, Password_],
      callback
    );
  },



  Student_Login_Check: function(Email_, Password_, callback) {
    return db.query("CALL Student_Login_Check (@Email_ :=?,@Password_ :=?)",
      [Email_, Password_],
      callback
    );
  },
  // check_Agent_Login: function(User_Name_, Password_, callback) {
  //   return db.query(
  //     "CALL check_Agent_Login (@User_Name_ :=?,@Password_ :=?)",
  //     [User_Name_, Password_],
  //     callback
  //   );
  // },

	Save_Agent_Profile:function (Profile_, callback) { 
		var Unique_Id_;
		if (Profile_.Student_Id == 0) {
			var uuid = require('uuid');
			Unique_Id_ = uuid.v1();
		}
	
		return db.query("CALL Save_Agent_Profile(@Student_Id_ :=?, @Student_Name_ :=?,@Email_ :=?,@Country_Code_ :=?,  @Phone_Number_ :=?,@User_Name_ :=?, @Password_ :=?,  @Unique_Id_ :=?)", 
			[Profile_.Student_Id, Profile_.Student_Name,Profile_.Email_,Profile_.Country_Code, Profile_.Phone_Number, Profile_.User_Name, Profile_.Password, Unique_Id_],
			callback
		);
	},
  Login_Check_Agent: function(User_Name_, Password_, callback) {
    console.log(User_Name_, Password_)
    return db.query(
      "CALL Login_Check_Agent (@User_Name_ :=?,@Password_ :=?)",
      [User_Name_, Password_],
      callback
    );
  },


  check_Agent_Login: function (Lead_, callback) {    
    console.log(Lead_);
    return db.query(
      "CALL check_Agent_Login(@Email_ :=?,@Password_ :=?)",
      [Lead_.Email,Lead_.password],
      callback
    );
  },
};
module.exports = Login;
