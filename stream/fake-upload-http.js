import { Readable } from "node:stream";

class OnToHundredStream extends Readable {
  index = 1;

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

fetch("http://localhost:3334", {
  method: "POST",
  body: new OnToHundredStream(),
  duplex: "half",
})
  .then((response) => {
    return response.text();
  })
  .then((data) => console.log("Data: ", data))
  .catch((error) => console.log("error: ", error));
