import fs from "node:fs/promises";

const databasePath = new URL("../../db.json", import.meta.url);

export class Database {
  #collection = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#collection = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#collection));
  }

  select(table) {
    const data = this.#collection[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#collection[table])) {
      this.#collection[table].push(data);
    } else {
      this.#collection[table] = [data];
    }

    this.#persist();
  }

  delete(table, id) {
    const rowIndex = this.#collection[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#collection[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, { id, name, email }) {
    const updateData = this.#collection[table].map((item) => {
      if (item.id === id) {
        item.name = name || item.name;
        item.email = email || item.email;

        return item;
      }

      return item;
    });

    this.#collection[table] = updateData;
    this.#persist();
  }
}
