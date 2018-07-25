import { Duplex } from "stream";

export default class extends Duplex {
  constructor(options) {
    super(options);

    this.lastFragment = "";
    this.lines = [];
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
}
