FROM denoland/deno:1.23.1

WORKDIR /app

COPY ./src /app

# Prefer not to run as root.
USER deno

# Pass port argument if running on remote host (Heroku)
CMD deno run --allow-net --allow-read --allow-env server.ts --port=$PORT
