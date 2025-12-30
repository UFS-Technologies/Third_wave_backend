// src/routes/campaign.js
var express = require('express');
var router = express.Router();
var campaign = require('../models/campaign');

router.post('/save_campaign', function(req, res, next) {
  try {
    //console.log(req.body);
    campaign.Save_Campaign(req.body, function(err, rows) {
      console.log(req.body);
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  } catch (e) {
     console.log(e);
    res.status(500).json({ error: e.message });
  } finally {
  }
});

router.get('/search_campaign', function(req, res, next) {
  try {
    campaign.Search_Campaign(req.query.campaign_name, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
  }
});
router.post('/Delete_Campaign', function(req, res, next) {
  try {
    campaign.Delete_Campaign(req.body.campaign_details_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
  }
});

router.get('/get_campaigne_department_details/:campaign_details_id', function(req, res, next) {
  try {
    const campaign_details_id_ = parseInt(req.params.campaign_details_id) || 0;
    campaign.get_campaigne_department_details(campaign_details_id_, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = router;