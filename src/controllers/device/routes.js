const { Router } = require('express');
const { authLevel, authMiddleware } = require('ylz-xyz-auth-mdw');

const deviceControllerInstance = require('./DeviceController');

const router = Router();

router.route('/').get(
  authMiddleware(authLevel.private),
  deviceControllerInstance.getAll
);

router.route('/:id').get(
  authMiddleware(authLevel.private),
  deviceControllerInstance.getOne
);

router.route('/').post(
  authMiddleware(authLevel.private),
  deviceControllerInstance.create
);

module.exports = router;