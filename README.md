# REST API MOVIES

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## End point

| Endpoint       | HTTP     | Description             |
| -------------- | -------- | ----------------------- |
| `/movies`      | `GET`    | Get all movies          |
| `/movies/:id`  | `GET`    | Get movie by id         |
| `/movies/seed` | `POST`   | Seed all initial movies |
| `/movies`      | `POST`   | Add new movie           |
| `/movies`      | `DELETE` | Delete all movies       |
| `/movies/:id`  | `DELETE` | Delete movie by id      |
| `/movies/:id`  | `PUT`    | Update movie by id      |
