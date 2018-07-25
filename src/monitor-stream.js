import { Duplex } from "stream";

export default class extends Duplex {
  constructor() {
    super({ readableObjectMode: true });

    this.lastFragment = "";
    this.lines = [];

    this.elapsedMilliseconds = 0;
    this.totalBytes = 0;
    this.totalLines = 0;

    this.interval = setInterval(() => {
      this.elapsedMilliseconds++;
    }, 1);
  }

  _write(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString();
    }

    const lines = chunk.split("\n");

    this.lastFragment += lines.pop();
    this.lines.push(...lines);

    callback();
  }

  _read(size) {
    while (this.lines.length) {
      const line = this.lines.shift();

      this.totalBytes += Buffer.from(line).length;
      this.totalLines++;

      this.push(this.createReport());
    }
  }

  createReport() {
    return {
      elapsedMilliseconds: this.elapsedMilliseconds,
      totalBytes: this.totalBytes,
      totalLines: this.totalLines
    };
  }
}
