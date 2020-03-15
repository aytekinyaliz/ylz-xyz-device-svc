const deviceRepositoryInstance = require('../repositories/DeviceRepository');


class DeviceDomain {

  async getAll() {
    return await deviceRepositoryInstance.getAll();
  }

  async create(project) {
    return await deviceRepositoryInstance.create(project);
  }
}

module.exports = new DeviceDomain();
