const deviceRepositoryInstance = require('../repositories/DeviceRepository');


class DeviceDomain {
  async getAll() {
    return await deviceRepositoryInstance.getAll();
  }

  async create({ serialNumber, name, userId }) {
    return await deviceRepositoryInstance.create({ serialNumber, name, owner: userId, createdBy: userId});
  }
}

module.exports = new DeviceDomain();
