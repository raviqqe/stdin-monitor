import SummaryStream from "../summary-stream";

test("Create a summary stream", () => {
  const _ = new SummaryStream();
});

test("Write to a summary stream", () => {
  const stream = new SummaryStream();

  stream.write({ elapsedMilliseconds: 10, totalBytes: 1000 });
});

test("Read from a summary stream", done => {
  const stream = new SummaryStream();

  stream.write({ elapsedMilliseconds: 1000, totalBytes: 1000 });

  stream.on("readable", () => {
    expect(stream.read()).toBe("Throughput rate: 1000 bytes / sec");

    done();
  });
});
