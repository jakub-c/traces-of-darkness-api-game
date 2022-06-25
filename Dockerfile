FROM denoland/deno:1.23.1

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app
# WORKDIR .

COPY ./src /app

# Prefer not to run as root.
USER deno

# CMD "ls"

CMD ["run", "--allow-net", "server.ts"]