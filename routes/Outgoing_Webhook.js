 var express = require('express');
 var router = express.Router();
 var Outgoing_Webhook=require('../models/Outgoing_Webhook');
 
 

router.get("/Load_Webhook_Dropdowns/", function (req, res, next) {
	try {
		Outgoing_Webhook.Load_Webhook_Dropdowns(function (err, rows) {
			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} catch (e) {
	} finally {
	}
});

router.post('/Save_Outgoing_Webhook/',async function(req,res,next)
      { 
      try 
      {
        const resp = await Outgoing_Webhook.Save_Outgoing_Webhook(req.body);
         
         return res.send(resp);     
      }
      catch(e){
        //console.log(e)
        
      return res.send(e);
      }
      }); 


      router.get('/Search_Outgoing_Webhook/',function(req,res,next)
      { 
      try 
      {
        Outgoing_Webhook.Search_Outgoing_Webhook(req.query.Webhook_Name_Search, function (err, rows) 
      {
       if (err) 
       {
        //console.log(e)
       res.json(err);
       }
       else 
       {
         res.json(rows);
       }
       });
       }
      catch (e) 
      {
        //console.log(e)
      }
      finally 
      {
      }
       });
      


       router.get('/Get_Outgoing_Webhook/:Webhook_Id_?',function(req,res,next)
       { 
       try 
       {
        Outgoing_Webhook.Get_Outgoing_Webhook(req.params.Webhook_Id_, function (err, rows) 
       {
        if (err) 
        {
        res.json(err);
        }
        else 
        {
          res.json(rows);
        }
        });
        }
       catch (e) 
       {   
       }
       finally 
       {
       }
        });
      
        router.get('/Delete_Outgoing_Webhook/:Webhook_Id_?',function(req,res,next)
        { 
        try 
        {
         Outgoing_Webhook.Delete_Outgoing_Webhook(req.params.Webhook_Id_, function (err, rows) 
        {
         if (err) 
         {
         res.json(err);
         }
         else 
         {
           res.json(rows);
         }
         });
         }
        catch (e) 
        {
        }
        finally 
        {
        }
         });


  module.exports = router;

