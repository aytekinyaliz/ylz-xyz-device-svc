const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

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

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const device = await deviceDomainInstance.get(id);

      res.json(device);
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { id: userId } = res.locals.user;
      const { serialNumber, name } = req.body;

      if(!serialNumber || !name || serialNumber.length !== 5) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid format!' });
      }

      const id = await deviceDomainInstance.create({ serialNumber, name, userId });

      res.status(HttpStatusCode.CREATED).json({ id });
    } catch(err) {
      if(err.code === 'duplicate') {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: err.message });
      }
      next(err);
    }
  }
}

module.exports = new DeviceController();