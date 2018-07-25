import { stdin } from "process";
import { pipeline, Writable } from "stream";

import MonitorStream from "./monitor-stream";
import SummaryStream from "./summary-stream";

pipeline(
  stdin,
  new MonitorStream(),
  new SummaryStream(),
  new Writable({
    decodeStrings: false,
    write(chunk, encoding, callback) {
      console.log(chunk);
      callback();
    }
  })
);
