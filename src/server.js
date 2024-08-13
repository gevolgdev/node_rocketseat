import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes/index.js";

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find(
    (item) => item.method === method && item.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups };

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000);
