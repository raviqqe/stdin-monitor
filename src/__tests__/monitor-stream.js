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
  stream.write(Buffer.from("baz"));
});

test("Read from a monitor stream", done => {
  expect.assertions(3);

  const stream = new MonitorStream();

  stream.on("data", ({ elapsedMilliseconds, totalBytes, totalLines }) => {
    expect(elapsedMilliseconds).toBeGreaterThan(0);
    expect(totalBytes).toBe(18);
    expect(totalLines).toBe(3);

    done();
  });

  stream.write("foo\nfoo");
  stream.write("bar\n");
  stream.end("baz\nbaz");
});
