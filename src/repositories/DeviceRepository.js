const firestore = require('../services/firestore');

class DeviceRepository {
  constructor() {
    this.collectionName = 'devices';
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
  
  async create({ name, owner }) {
    const device = await this.devicesCollection.add({
      name,
      owner,
      createdAt: new Date()
    });
  
    return device.id;
  }
}

module.exports = new DeviceRepository();
