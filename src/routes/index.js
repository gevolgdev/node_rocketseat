import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { BuildRoutePath } from "../utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: BuildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: BuildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email, password } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
        password,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: BuildRoutePath("/users/update/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      database.update("users", { id, name, email });

      return res.writeHead(204).end("Usuário editado!");
    },
  },
  {
    method: "DELETE",
    path: BuildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
];
