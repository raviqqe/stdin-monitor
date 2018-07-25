import { Transform } from "stream";

export default class extends Transform {
  constructor() {
    super({ readableObjectMode: true });

    this.lastFragment = "";
    this.elapsedMilliseconds = 0;
    this.totalBytes = 0;
    this.totalLines = 0;

    setInterval(() => {
      this.elapsedMilliseconds++;
    }, 1);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString();
    }

    const lines = (this.lastFragment + chunk).split("\n");

    this.lastFragment = lines.pop();

    for (const line of lines) {
      if (!this.push(this.createReport(line + "\n"))) break;
    }

    callback();
  }

  _flush(callback) {
    if (this.lastFragment) {
      this.push(this.createReport(this.lastFragment));
    }

    callback();
  }

  createReport(line) {
    this.totalBytes += Buffer.byteLength(line);
    this.totalLines++;

    return {
      elapsedMilliseconds: this.elapsedMilliseconds,
      totalBytes: this.totalBytes,
      totalLines: this.totalLines
    };
  }
}
