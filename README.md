# Redis Server Implementation in Node.js

A lightweight implementation of a Redis-like server using Node.js. This project creates a TCP server that handles basic Redis commands and supports key-value storage with optional expiration.

## Features

- Basic Redis command implementation (PING, ECHO, GET, SET)
- In-memory key-value storage
- Support for key expiration using `PX` argument
- Configuration management with directory and filename settings
- TCP server running on port 6379

## Getting Started

### Prerequisites

- Node.js (version 12.0.0 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
```bash
git clone https://github.com/mansoorkhateeb/redis-clone-js.git
```

2. Navigate to the project directory
```bash
cd redis-clone-js
```

3. Install dependencies
```bash
npm install
```

### Running the Server

Start the server with:
```bash
node main.js
```

For configuration options:
```bash
node main.js --dir [directory] --dbfilename [filename]
```

## Supported Commands

### PING
Returns "PONG" - used to test server connectivity.

### ECHO
Echoes back the sent message.
```
ECHO message
```

### SET
Stores a key-value pair, with optional expiration.
```
SET key value [PX milliseconds]
```

### GET
Retrieves the value for a given key.
```
GET key
```

### CONFIG
Retrieves configuration values.
```
CONFIG GET parameter
```

## Implementation Details

The server uses Node.js's built-in `net` module to create a TCP server that listens on localhost (127.0.0.1) port 6379. Data is stored in memory using a JavaScript object (`STORAGE`), and configuration settings are managed through a `Map`.

### Key Features

- **In-memory Storage**: Uses a JavaScript object to store key-value pairs
- **Command Parsing**: Handles Redis protocol format (RESP)
- **Expiration Management**: Implements key expiration using `setTimeout`
- **Configuration Management**: Supports basic configuration options for directory and filename

## Protocol

The implementation follows the Redis protocol format for communication:

- Simple Strings: `+<string>\r\n`
- Bulk Strings: `$<length>\r\n<string>\r\n`
- Arrays: `*<length>\r\n<elements>`
- Null: `$-1\r\n`

## Contributing

Feel free to submit issues and pull requests to improve the implementation.

## Acknowledgments

This project is a simplified implementation of Redis for learning purposes and is not intended for production use.
