import http from "node:http";
import { Transform } from "node:stream";

class IsEvenStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) % 2 === 0;

    transformed && console.log(Number(chunk));

    callback(null, transformed ? chunk : null);
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamBuffer = Buffer.concat(String(buffers));
  console.log("Buffers: ", fullStreamBuffer);

  return res.end(fullStreamBuffer);
  // return req.pipe(new IsEvenStream()).pipe(res);
});

server.listen(3334);
