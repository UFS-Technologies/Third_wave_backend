var db = require("../dbconnection");
var fs = require("fs");
var Chat_Window = {
	Save_Chat: function (Msg_Data, callback) {
		var Data_value_ = 0,
			user_value_ = 0;
		let taggedId;
		let Chats_ = Msg_Data.Msg;
		let tagged_users = Msg_Data.tagged;
		console.log(Chats_);
		if (Chats_ != undefined && Chats_ != "" && Chats_ != null) Data_value_ = 1;
		console.log(Object.keys(Msg_Data.tagged).length);
		console.log(Msg_Data.tagged.length);
		if (
			tagged_users !== undefined &&
			tagged_users !== "" &&
			tagged_users !== null
		) {
			user_value_ = 1;
			const taggedObj = JSON.parse(tagged_users);
			if (taggedObj.User_Id !== undefined)
				taggedId = taggedObj.User_Id.split(",");
		}

		return db.query(
			"CALL Save_Chat(" +
				"@Chats_ :=?," +
				"@Data_value_ :=?," +
				"@tagged_users :=?," +
				"@user_value_ :=?," +
				"@taggedId_ :=?)",
			[
				Chats_,
				Data_value_,
				tagged_users,
				user_value_,
				JSON.stringify(taggedId),
			],
			callback
		);
	},


	Save_Comments: function (Msg_Data, callback) {
		var Data_value_ = 0,
			user_value_ = 0;
		let taggedId;
		let Chats_ = Msg_Data.Msg;
		let tagged_users = Msg_Data.tagged;
		console.log(Chats_);
		if (Chats_ != undefined && Chats_ != "" && Chats_ != null) Data_value_ = 1;
		console.log(Object.keys(Msg_Data.tagged).length);
		console.log(Msg_Data.tagged.length);
		if (
			tagged_users !== undefined &&
			tagged_users !== "" &&
			tagged_users !== null
		) {
			user_value_ = 1;
			const taggedObj = JSON.parse(tagged_users);
			if (taggedObj.User_Id !== undefined)
				taggedId = taggedObj.User_Id.split(",");
		}

		return db.query(
			"CALL Save_Comments(" +
				"@Chats_ :=?," +
				"@Data_value_ :=?," +
				"@tagged_users :=?," +
				"@user_value_ :=?," +
				"@taggedId_ :=?)",
			[
				Chats_,
				Data_value_,
				tagged_users,
				user_value_,
				JSON.stringify(taggedId),
			],
			callback
		);
	},


	Delete_Chat_Window: function (Chat_Window_Id_, callback) {
		return db.query(
			"CALL Delete_Chat_Window(@Chat_Window_Id_ :=?)",
			[Chat_Window_Id_],
			callback
		);
	},
	Get_Chat_Window: function (Chat_Window_Id_, callback) {
		return db.query(
			"CALL Get_Chat_Window(@Chat_Window_Id_ :=?)",
			[Chat_Window_Id_],
			callback
		);
	},
	Load_ChatUser_Details: function (Value_, Login_User_, callback) {
		if (Value_ === "undefined" || Value_ === undefined) Value_ = "";
		return db.query(
			"CALL Load_ChatUser_Details(@Value_ :=?,@Login_User_ :=?)",
			[Value_, Login_User_],
			callback
		);
	},
	Get_Chats: function (Channel_Id_, Login_User_, callback) {
		return db.query(
			"CALL Get_Chats(@Channel_Id_ :=?,@Login_User_ :=?)",
			[Channel_Id_, Login_User_],
			callback
		);
	},

	Load_Exist_Channels: function (Selected_User_, Login_User_, callback) {
		return db.query(
			"CALL Load_Exist_Channels(@Selected_User_ :=?,@Login_User_ :=?)",
			[Selected_User_, Login_User_],
			callback
		);
	},
	// Load_old_messages: function (callback) {
	// 	return db.query("CALL Load_old_messages()", [], callback);
	// },
	Load_old_messages: function (Channel_Id_Temp_, Offset_Count_, callback) {
    return db.query(
        "CALL Load_old_messages(@Channel_Id_Temp_ :=?, @Offset_Count_ :=?)", 
        [Channel_Id_Temp_, Offset_Count_], 
        callback
    );
},
	// Load_old_messages: function (Channel_Id_Temp_,callback) {
	// 	return db.query("CALL Load_old_messages(@Channel_Id_Temp_ :=?)", [Channel_Id_Temp_], callback);
	// },
	Group_Save: function (Group_, callback) {
		console.log(Group_);
		var Value_ = 0;
		let Users_ = Group_.Group_Users;
		if (Users_ != undefined && Users_ != "" && Users_ != null) Value_ = 1;
		console.log(Group_);
		return db.query(
			"CALL Group_Save(" +
				"@Group_Users_ :=?," +
				"@Group_Name_ :=?," +
				"@From_User_ :=?," +
				"@From_UserName_ :=?," +
				"@Channel_Type_ :=?)",
			[
				JSON.stringify(Users_),
				Group_.Group_Name,
				Group_.From_User,
				Group_.From_UserName,
				Group_.Channel_Type,
			],
			callback
		);
	},

	Load_Channels: function (Login_User_Id_, callback) {
		return db.query(
			"CALL Load_Channels(@Login_User_Id_ :=?)",
			[Login_User_Id_],
			callback
		);
	},
	Reset_CurrentChannel_Count: function (
		Channel_Id_Temp_,
		Login_User_,
		callback
	) {
		return db.query(
			"CALL Reset_CurrentChannel_Count(@Channel_Id_Temp_:=?,@Login_User_ :=?)",
			[Channel_Id_Temp_, Login_User_],
			callback
		);
	},
	Delete_Channel: function (Channel_Id_, callback) {
		console.log(Channel_Id_);
		return db.query(
			"CALL Delete_Channel(@Channel_Id_ :=?)",
			[Channel_Id_],
			callback
		);
	},

	Edit_Group: function (Channel_Id_, Edited_Name_, callback) {
		console.log(Channel_Id_);
		return db.query(
			"CALL Edit_Group(@Channel_Id_ :=?,@Edited_Name_:=?)",
			[Channel_Id_, Edited_Name_],
			callback
		);
	},
};
module.exports = Chat_Window;
