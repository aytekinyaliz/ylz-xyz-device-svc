const firestore = require('../services/firestore');

class DeviceRepository {
  constructor() {
    this.collectionName = 'device-svc-devices';
    this.devicesCollection = firestore.collection(this.collectionName);
  }
  
  async get(id) {
    const device = await this.devicesCollection.doc(id).get();
  
    return device.data();
  }

  async getAll() {
    const devicesRef = await this.devicesCollection.get();

    const devices = [];
    devicesRef.forEach(device => {
      devices.push({ id: device.id, ...device.data() });
    });
  
    return devices;
  }

  async getBySerialNumber({ serialNumber }) {
    const devices = await this.devicesCollection.where('serialNumber', '==', serialNumber).get();

    if(devices.empty) {
      return null;
    }

    for (const device of devices.docs) {
      return {
        id: device.id, 
        ...device.data()
      };
    }
  }
  
  async create({ serialNumber, name, createdBy }) {
    const device = await this.devicesCollection.add({
      serialNumber,
      name,
      createdAt: new Date(),
      createdBy
    });
  
    return device.id;
  }
}

module.exports = new DeviceRepository();
