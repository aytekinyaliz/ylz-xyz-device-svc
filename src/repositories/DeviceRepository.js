const firestore = require('../services/firestore');

class DeviceRepository {
  constructor() {
    this.collectionName = 'device-svc-devices';
    this.devicesCollection = firestore.collection(this.collectionName);
  }
  
  async getAll() {
    const devicesRef = await this.devicesCollection.get();

    const devices = [];
    devicesRef.forEach(user => {
      devices.push({ id: user.id, ...user.data() });
    });
  
    return devices;
  }
  
  async create({ serialNumber, name, userId }) {
    const device = await this.devicesCollection.add({
      serialNumber,
      name,
      owner: userId,
      createdAt: new Date(),
      createdBy: userId
    });
  
    return device.id;
  }
}

module.exports = new DeviceRepository();
