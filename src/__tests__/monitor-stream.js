import { Duplex } from "stream";

import MonitorStream from "../monitor-stream";

test("Create a monitor stream", () => {
  const _ = new MonitorStream();
});

test("Check if a monitor stream is a duplex stream", () => {
  expect(new MonitorStream()).toBeInstanceOf(Duplex);
});

test("Write to a monitor stream", () => {
  const stream = new MonitorStream();

  stream.write("foo");
  stream.write("bar");
});
