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

  stream.write({ elapsedMilliseconds: 333, totalBytes: 100 });

  stream.on("readable", () => {
    expect(stream.read()).toBe("Throughput rate: 300 bytes / sec");

    done();
  });
});

test("Set verbose option", done => {
  const stream = new SummaryStream(true);

  stream.write({ elapsedMilliseconds: 333, totalBytes: 100 });

  stream.on("readable", () => {
    expect(stream.read()).toBe(
      "I'm VERBOSE!!! - Throughput rate: 300 bytes / sec"
    );

    done();
  });
});
