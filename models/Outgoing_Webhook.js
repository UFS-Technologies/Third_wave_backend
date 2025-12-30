 var db=require('../dbconnection');
 var fs = require('fs');
 const storedProcedure = require('../helpers/stored-procedure');
 var Outgoing_Webhook=
 { 
   
Load_Webhook_Dropdowns: function (callback) {
  return db.query("CALL Load_Webhook_Dropdowns()", [], callback);
},


  Save_Outgoing_Webhook: async function (outgoing_webhook_) {
     
    return new Promise(async (rs,rej)=>{
    const pool = db.promise();
    let result1;
    var connection = await pool.getConnection();
    try 
    {
        //console.log(outgoing_webhook_)
        const result1 = await (new storedProcedure('Save_Outgoing_Webhook', 
           [outgoing_webhook_.Webhook_Id, outgoing_webhook_.Webhook_Name,
            outgoing_webhook_.Webhook_Link, outgoing_webhook_.Description,
            outgoing_webhook_.system_webhook_fields_Data_length,
            outgoing_webhook_.custom_webhook_fields_Data_length,
            outgoing_webhook_.system_webhook_fields,outgoing_webhook_.custom_webhook_fields], connection)).result();
        
        await connection.commit();
        connection.release();
        rs( result1);
        }
    catch (err) {
        
    await connection.rollback();
    rej(err);
        var result2 = [{'Webhook_Id_':0}]
    rs(result2);
    }
    finally 
    {
    connection.release();
    }
    })
    },

    Search_Outgoing_Webhook:function(Webhook_Name_Search,callback)
 { 
 if (Webhook_Name_Search===undefined || Webhook_Name_Search==="undefined" )
 {Webhook_Name_Search='';}

return db.query("CALL Search_Outgoing_Webhook(@Webhook_Name_Search :=?)",[Webhook_Name_Search],callback);
 },


 Delete_Outgoing_Webhook:function(Webhook_Id_,callback)
 { 
return db.query("CALL Delete_Outgoing_Webhook(@Webhook_Id_ :=?)",[Webhook_Id_],callback);
 }
 ,
 Get_Outgoing_Webhook:function(Webhook_Id_,callback)
 { 
return db.query("CALL Get_Outgoing_Webhook(@Webhook_Id_ :=?)",[Webhook_Id_],callback);
 }
 ,


  };
  module.exports=Outgoing_Webhook;

