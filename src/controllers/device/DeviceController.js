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
      const { id: userId } = res.locals.user;
      const { serialNumber, name } = req.body;

      const id = await deviceDomainInstance.create({ serialNumber, name, userId });

      res.status(201).json({ id });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new DeviceController();