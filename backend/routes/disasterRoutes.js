const express = require('express');
const router = express.Router();
const { reportDisaster, getAllDisasters } = require('../controllers/disasterController');

router.post('/report', reportDisaster);


router.get('/all', getAllDisasters);

module.exports = router;
