 var db=require('../dbconnection');
 var fs = require('fs');
 var Holiday=
 { 
Save_Holiday:function(Holiday_,callback)
{ 
       console.log('Holiday_.Holiday_Id: ', Holiday_.Holiday_Id);
       console.log('Holiday_.Region_Ids: ', Holiday_.Region_Ids);
       console.log('Holiday_.Holiday_Name: ', Holiday_.Holiday_Name);
       return db.query("CALL Save_Holiday(@Holiday_Id_ := ?, @Holiday_Name_ := ?, @Holiday_Date := ?, @Region_Ids_ := ?)",
       [Holiday_.Holiday_Id, Holiday_.Holiday_Name, Holiday_.Holiday_Date,JSON.stringify( Holiday_.Region_Ids)],
       callback
   );
   
} ,

 Delete_Holiday:function(Holiday_Id_,callback)
        { 
        return db.query("CALL Delete_Holiday(@Holiday_Id_ :=?)",[Holiday_Id_],callback);
        } ,

 Get_Holiday:function(Holiday_Id_,callback)
        { 
        return db.query("CALL Get_Holiday(@Holiday_Id_ :=?)",[Holiday_Id_],callback);
        } ,
        Get_Holiday_Region:function(Holiday_Id_,callback)
        { 
        return db.query("CALL Get_Holiday_Region(@Holiday_Id_ :=?)",[Holiday_Id_],callback);
        } ,

 Search_Holiday:function(Holiday_Name_,callback)
        { 
        if (Holiday_Name_==='undefined'||Holiday_Name_===''||Holiday_Name_===undefined )
        Holiday_Name_='';
        
        return db.query("CALL Search_Holiday(@Holiday_Name_ :=?)",[Holiday_Name_],callback);
        },

       }
module.exports=Holiday;