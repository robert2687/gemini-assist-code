# Genkit Express Project

A sample project using Google's Genkit framework with Express server.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your Google AI API key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

The server will start on port 3400 (or the port specified in the PORT environment variable).

### Available Endpoints

- `POST /helloFlow` - A sample flow that generates a greeting
  
  Example request:
  ```bash
  curl -X POST http://localhost:3400/helloFlow \
    -H "Content-Type: application/json" \
    -d '{"name": "World"}'
  ```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server

## Configuration

The `startFlowServer` function accepts these optional parameters:

- `port`: Network port to listen on (default: PORT env var or 3400)
- `cors`: CORS policy configuration
- `pathPrefix`: Optional path prefix for flow endpoints
- `jsonParserOptions`: Options for Express JSON body parser