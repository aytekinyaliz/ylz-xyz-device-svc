const deviceRepositoryInstance = require('../repositories/DeviceRepository');


class DeviceDomain {
  async getAll() {
    return await deviceRepositoryInstance.getAll();
  }

  async get(id) {
    return await deviceRepositoryInstance.get(id);
  }

  async create({ serialNumber, name, userId }) {
    let device = await deviceRepositoryInstance.getBySerialNumber({ serialNumber });

    if(device) {
      const err = new Error('Device already exists!');
      err.code = 'duplicate';

      throw err;
    }

    return await deviceRepositoryInstance.create({ serialNumber, name, createdBy: userId});
  }
}

module.exports = new DeviceDomain();
