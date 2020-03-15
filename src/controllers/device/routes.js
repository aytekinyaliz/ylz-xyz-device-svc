const { Router } = require('express');

const deviceControllerInstance = require('./DeviceController');


const router = Router();


router.route('/').get(
  // auth,
  deviceControllerInstance.getAll
);

router.route('/').post(
  // auth,
  deviceControllerInstance.create
);

module.exports = router;