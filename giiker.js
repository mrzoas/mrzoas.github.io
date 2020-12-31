class GiikerCube {
  listeners = [];

  UUIDs = {
    cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
    cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
  };

  async connect() {
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{
        namePrefix: "Gi"
      }],
      optionalServices: [
        "00001530-1212-efde-1523-785feabcd123",
        "0000aaaa-0000-1000-8000-00805f9b34fb",
        "0000aadb-0000-1000-8000-00805f9b34fb",
        "0000180f-0000-1000-8000-00805f9b34fb",  // org.bluetooth.service.battery_service
        "0000180a-0000-1000-8000-00805f9b34fb"   // org.bluetooth.service.device_information
      ]
    });
    this.server = await this.device.gatt.connect();
    this.cubeService = await this.server.getPrimaryService(this.UUIDs.cubeService);
    this.cubeCharacteristic = await this.cubeService.getCharacteristic(this.UUIDs.cubeCharacteristic);
    await this.cubeCharacteristic.startNotifications();
    this._originalValue = await this.cubeCharacteristic.readValue();
    this.cubeCharacteristic.addEventListener(
      "characteristicvaluechanged",
      this.onCubeCharacteristicChanged.bind(this)
    );
  }

  giikerMoveToAlgMove(face, amount) {
    if (amount == 9) {
      amount = 2;
    }

    return {
      type: "move",
      base: ["?", "B", "D", "L", "U", "R", "F"][face],
      amount: [0, 1, 2, -1][amount]
    }
  }

  onCubeCharacteristicChanged(event) {
    var val = event.target.value;

    if (this._originalValue) {
      var same = true;
      for (var i = 0; i < 20; i++) {
         if (this._originalValue.getUint8(i) != val.getUint8(i)) {
          same = false;
          break;
         }
      }
      this._originalValue = null;
      if (same) {
        return;
      }
    }

    var giikerState = [];
    for (var i = 0; i < 20; i++) {
      giikerState.push(Math.floor(val.getUint8(i) / 16));
      giikerState.push(val.getUint8(i) % 16);
    }

    for (var l of this.listeners) {
      l({
        latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
        timeStamp: event.timeStamp
      });
    }
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }
}