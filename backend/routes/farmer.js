const express = require('express');
const { handleListings } = require('../controllers/farmer');
const router = express.Router();

//add auth middleware here 
router.post('/listing', handleListings);


module.exports = router;