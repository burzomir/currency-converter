## Getting Started

### System Requirements (Next.js):

Node.js 18.17 or later.
macOS, Windows (including WSL), and Linux are supported.

### Installation

Run `npm install`

### Configuration

Create .env.local file in the root directory to store your configuration variables.
.env file contains a template for all supported env variables.

If you want to use the CurrencyBeacon with this project add the following to the .env.local file:

```
CURRENCY_BEACON_API_KEY=<YOUR_API_TOKEN>
CURRENCY_SERVICE=beacon
```

If you want to use a mock server then add the following to the .env.local file. It makes it easier to develop as you can simulate delays and failures with it. You also won't use your CurrencyBeacon quota.

```
CURRENCY_SERVICE=development
```

### Development server

Run `npm run dev` to start the development server.

You can also try `npm run dev:https` if you want to serve the app on your local network and access it from mobile devices. On the first run it will configure certificates with mkcert so that it can serve the app over https.

Open http://localhost:3000 or https://localhost:3000
