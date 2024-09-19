# poof

A simple one-time-view-only text sharing service powered by node.js and sqlite.

The application has 2 dependencies - express and better-sqlite3

There is an instance of it running at [https://www.aktsbot.in/poof](https://www.aktsbot.in/poof).

## Starting up

1. Run the sql scripts to setup the tables.

```sh
sqlite3 poof.db < sql/000-poofs.sql
```

2. Setup and run the server

```
npm i
npm start
```

The application can be accessed at [http://localhost:3027/poof/](http://localhost:3027/poof).

## Deployment

- There is an nginx config block in the `extras` folder.

_Happy hacking!_
