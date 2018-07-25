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
  expect.assertions(3 * 4 + 2);

  const stream = new MonitorStream();
  let count = 0;

  stream.on("data", ({ elapsedMilliseconds, totalBytes, totalLines }) => {
    count++;

    expect(typeof elapsedMilliseconds).toBe("number");
    expect(typeof totalBytes).toBe("number");
    expect(typeof totalLines).toBe("number");

    if (count === 4) {
      expect(totalBytes).toBe(18);
      expect(totalLines).toBe(4);
    }

    done();
  });

  stream.write("foo\nfoo");
  stream.write("bar\n");
  stream.end("baz\nbaz");
});
