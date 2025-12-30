 var db=require('../dbconnection');
 var fs = require('fs');
const { Console } = require('console');
 var Student_Message=
 { 

    Save_Student_Message:function(Student_Message_,callback)
    { 
   return db.query("CALL Save_Student_Message("+
   "@Student_Message_Id_ :=?,"+
   "@Student_Id_ :=?,"+
   "@Message_Detail_ :=?"+")"
    ,[Student_Message_.Student_Message_Id,
   Student_Message_.Student_Id,
   Student_Message_.Message_Detail
   ],callback);
    }
    ,

    
 
 Delete_Student_Message:function(Student_Message_Id_,callback)
 {
return db.query("CALL Delete_Student_Message(@Student_Message_Id_ :=?)",[Student_Message_Id_],callback);
 }
 ,
 Get_Student_Message:function(Student_Message_Id_,callback)
 { 
return db.query("CALL Get_Student_Message(@Student_Message_Id_ :=?)",[Student_Message_Id_],callback);
 },
 
 Search_Student_Message:function(Student_Id_,callback)
 { 
//  if (Student_Message_Name_===undefined || Student_Message_Name_==="undefined" )
// Student_Message_Name_='';
return db.query("CALL Search_Student_Message(@Student_Id_ :=?)",[Student_Id_],callback);
 }
  };
  module.exports=Student_Message;

