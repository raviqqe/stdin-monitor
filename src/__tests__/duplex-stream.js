import {
	Duplex
} from "stream";

import DuplexStream from "../duplex-stream";

test("Create a duplex stream", () => {
	const _ = new DuplexStream();
});

test("Check if a stream is a duplex stream", () => {
	expect(new DuplexStream()).toBeInstanceOf(Duplex);
});
