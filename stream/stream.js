import { Readable, Writable, Transform } from "node:stream";

class OnToHundredStream extends Readable {
  index = 0;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i < 100) {
        const chunk = Buffer.from(String(i));
        this.push(chunk);
      } else {
        this.push(null);
      }
    }, 1000);
  }
}

class IsEvenStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) % 2 === 0;
    callback(null, transformed ? chunk : null);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OnToHundredStream()
  .pipe(new IsEvenStream())
  .pipe(new MultiplyByTenStream());
