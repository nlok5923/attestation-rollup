# Setting up rollup rpc

To run/install dependencies you need to install bun as we are using `bun` here as a runtime

- Install bun by this command `curl -fsSL https://bun.sh/install | bash`
- Install dependencies using `bun install`
- Start the rollup rpc server using `bun run src/index.ts`

Now you need to tunnel this local server to a global server route using `ngork`

- You can follow the steps [here](https://ngrok.com/docs/getting-started/) to forward your local port to global port using `ngork`.
- Update the url received from `ngork` inside the react native project for the Pixel Police application so that the application can start sending all the state transitions request to the rollup rpc.


PS: Please run all this command under `/rollup` directory
