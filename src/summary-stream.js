import { Transform } from "stream";

export default class extends Transform {
  constructor(verbose = false) {
    super({ objectMode: true });

    this.verbose = verbose;
  }

  _transform({ elapsedMilliseconds, totalBytes }, encoding, callback) {
    const rate = totalBytes / (elapsedMilliseconds / 1000);
    let message = `Throughput rate: ${rate.toFixed()} bytes / sec`;

    if (this.verbose) {
      message = "I'm VERBOSE!!! - " + message;
    }

    this.push(message);

    callback();
  }
}
