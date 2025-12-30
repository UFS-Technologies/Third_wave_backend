 var db=require('../dbconnection');
 var fs = require('fs');
 var User_Role=
 { 
// Save_User_Role:function(User_Role_,callback)
// { 


//        var User_Menu_Selection_ = User_Role_.User_Menu_Selection_Data;

//     return db.query("CALL Save_User_Role("+
//     "@User_Role_Id_ :=?,"+"@User_Role_Name_ :=?,"+"@Role_Under_Id_ :=?,"+"@User_Menu_Selection_ :=?"+")"
//     ,[User_Role_.User_Role_Id, User_Role_.User_Role_Name,User_Role_.Role_Under_Id,User_Menu_Selection_],callback);
// } ,


Save_User_Role: function(User_Role_, callback) {
       // var User_Menu_Selection_ = User_Role_.User_Menu_Selection_Data;
       var User_Menu_Selection_ = JSON.stringify(User_Role_.User_Menu_Selection_Data);
   
       return db.query("CALL Save_User_Role("+
       "@User_Role_Id_ :=?,"+"@User_Role_Name_ :=?,"+"@Role_Under_Id_ :=?,"+"@User_Menu_Selection_ :=?"+")", [
           User_Role_.User_Role_Id,
           User_Role_.User_Role_Name,
           User_Role_.Role_Under_Id,
           User_Menu_Selection_
       ], callback);
   },

 Delete_User_Role:function(User_Role_Id_,callback)
        { 
        return db.query("CALL Delete_User_Role(@User_Role_Id_ :=?)",[User_Role_Id_],callback);
        } ,

 Get_User_Role:function(User_Role_Id_,callback)
        { 
        return db.query("CALL Get_User_Role(@User_Role_Id_ :=?)",[User_Role_Id_],callback);
        } ,

 Search_User_Role:function(User_Role_Name_,callback)
        { 
        if (User_Role_Name_==='undefined'||User_Role_Name_===''||User_Role_Name_===undefined )
        User_Role_Name_='';
        
        return db.query("CALL Search_User_Role(@User_Role_Name_ :=?)",[User_Role_Name_],callback);
        },

 Search_User_Role_Typeahead:function(User_Role_Name_,callback)
        { 
        if (User_Role_Name_==='undefined'||User_Role_Name_===''||User_Role_Name_===undefined )
        User_Role_Name_='';
        return db.query("CALL Search_User_Role_Typeahead(@User_Role_Name_ :=?)",[User_Role_Name_],callback);
        },

Load_User_Role:function(User_Role_Name_,callback)
       { 
              if (User_Role_Name_==='undefined'||User_Role_Name_===''||User_Role_Name_===undefined)
              User_Role_Name_='';
       return db.query("CALL Load_User_Role(@User_Role_Name_ :=?)",[User_Role_Name_],callback);
       },
  };
module.exports=User_Role;