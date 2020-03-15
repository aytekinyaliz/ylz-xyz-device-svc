const deviceDomainInstance = require('../../domains/DeviceDomain');

class DeviceController {
  async getAll(req, res, next) {
    try {
      const devices = await deviceDomainInstance.getAll();

      res.json(devices);
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const device = req.body;

      const id = await deviceDomainInstance.create(device);

      res.status(201).json({ id });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new DeviceController();