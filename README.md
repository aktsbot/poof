# poof

A simple one-time-view-only text sharing service.

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
