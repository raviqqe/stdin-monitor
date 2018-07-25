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

test("Read from a monitor stream", done => {
  const stream = new MonitorStream();

  stream.write("foo\nfoo");
  stream.write("bar\n");
  stream.write("baz\n");

  stream.on("readable", () => {
    let chunk = stream.read();

    while (chunk !== null) {
      const { elapsedMilliseconds, totalBytes, totalLines } = chunk;

      expect(typeof elapsedMilliseconds).toBe("number");
      expect(typeof totalBytes).toBe("number");
      expect(typeof totalLines).toBe("number");

      chunk = stream.read();
    }

    done();
  });
});
