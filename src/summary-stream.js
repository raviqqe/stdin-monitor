import { Transform } from "stream";

export default class extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform({ elapsedMilliseconds, totalBytes }, encoding, callback) {
    const rate = totalBytes / (elapsedMilliseconds / 1000);

    this.push(`Throughput rate: ${rate} bytes / sec`);

    callback();
  }
}
