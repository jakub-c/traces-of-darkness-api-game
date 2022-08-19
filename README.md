# Traces of darkness ^(;·⁏)^

![Github Actions CI status](https://github.com/jakub-c/traces-of-darkness-api-game/actions/workflows/build.yml//badge.svg)

This is an attempt to use RESTful API as a game engine. Two main goals behind this project are:

* see if it's possible to create an adventure game with a REST based interface
* explore features and possibilities of RESTful APIs that might be overlooked in commercial projects

## Running the game

### Locally

Build and run Docker image with the game:

```bash
docker build . -t traces-of-darkness
docker run -it -p 8000:8000 traces-of-darkness
```

The game will be available at `localhost:8000`

### Development mode

If you want to add new features:

`deno task server` and `deno task server:watch` run the server locally

`deno task t` and `deno task t:watch` run the tests with `--allow-net` flag

### Credits

Media used in this project come from the archives of [Library of Congress](https://www.loc.gov)