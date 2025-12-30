 var db=require('../dbconnection');
 var fs = require('fs');
 var Region=
 { 
Save_Region:function(Region_,callback)
{ 
       console.log('Region_.Region_Id: ', Region_.Region_Id);
       console.log('Region_.Region_Name: ', Region_.Region_Name);
    return db.query("CALL Save_Region("+
    "@Region_Id_ :=?,"+"@Region_Name_ :=?"+")"
    ,[Region_.Region_Id, Region_.Region_Name],callback);
} ,

 Delete_Region:function(Region_Id_,callback)
        { 
        return db.query("CALL Delete_Region(@Region_Id_ :=?)",[Region_Id_],callback);
        } ,

 Get_Region:function(Region_Id_,callback)
        { 
        return db.query("CALL Get_Region(@Region_Id_ :=?)",[Region_Id_],callback);
        } ,

 Search_Region:function(Region_Name_,callback)
        { 
        if (Region_Name_==='undefined'||Region_Name_===''||Region_Name_===undefined )
        Region_Name_='';
        
        return db.query("CALL Search_Region(@Region_Name_ :=?)",[Region_Name_],callback);
        },

       }
module.exports=Region;