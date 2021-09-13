import { createServer, Factory, Model, Response } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList("user", 200);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) { // Lógica para fazer a paginação
        const { page = 1, per_page = 10 } = request.queryParams;
        // page = qual pagina estou querendo exibir no momento
        // per_page = quantos registro  quero mostrar por pagina

        const total = schema.all("user").length;
        // é preciso converter para numero pois o queryParams por padrão retorna string

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        return new Response(
          200, // status Code
          {'x-total-count': String(total)}, // Headers
          {
            users // nosso registro 
          }
        )
      });

      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
