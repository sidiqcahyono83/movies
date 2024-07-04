# MOVIES REST API

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## Endpoint

| Endpoint        | HTTP     | Description                |
| --------------- | -------- | -------------------------- |
| `/movies`       | `GET`    | Get all movies             |
| `/movies/:id`   | `GET`    | Get movie by id            |
| `/movies/seeds` | `POST`   | Seedes data initial movies |
| `/movies`       | `POST`   | Add new movie              |
| `/movies`       | `DELETE` | Delete all movies          |
| `/movies/:id`   | `DELETE` | Delete movie by id         |
| `/movies/:id`   | `PUT`    | Update movie by id         |

## Diagram Database movies

![image](/images/dbdiagram.svg)
