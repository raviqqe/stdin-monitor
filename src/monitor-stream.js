import { Duplex } from "stream";

export default class extends Duplex {
  constructor() {
    super({ readableObjectMode: true });

    this.totalBytes = 0;
    this.totalLines = 0;
    this.startTime = this.getTime();
  }

  _write(chunk, encoding, callback) {
    this.totalBytes += chunk.length;
    this.totalLines += (chunk.toString().match(/\n/g) || []).length;

    callback();
  }

  _read() {
    if (!this.timer) {
      this.timer = setInterval(() => this.report(), 1000);
    }
  }

  _final(callback) {
    this.report();

    if (this.timer) {
      clearInterval(this.timer);
    }

    callback();
  }

  report() {
    this.push({
      elapsedMilliseconds: this.getTime() - this.startTime,
      totalBytes: this.totalBytes,
      totalLines: this.totalLines
    });
  }

  getTime() {
    return new Date().getTime();
  }
}
