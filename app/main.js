const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
const STORAGE = {}
const config = new Map();
const arguments = process.argv.slice(2);
const [fileDir, fileName] = [arguments[1] ?? null, arguments[3] ?? null];
if (fileDir && fileName) {
	config.set('dir', fileDir);
	config.set('dbfilename', fileName);
}
function formatMessage(text = null) {
	if (text) return `+${text}\r\n`;
	return `$-1\r\n`;
}
function formatConfigMessage(key = '', value = '') {
	return `*2\r\n$${key.length}\r\n${key}\r\n$${value.length}\r\n${value}\r\n`;
}

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  // Handle connection
  connection.on('data', (data) => {
    const commands = Buffer.from(data).toString().split("\r\n");
    // *2\r\n $5 \r\n ECHO \r\n $3 \r\n hey \r\n
    if (commands[2] == "ECHO") {
      return formatMessage(commands[4]);
    }
    else if(commands[2] === 'SET') {
        STORAGE[commands[4]] = commands[6]
        if(commands[8])
        {
          if(commands[8].toLowerCase() === 'px') {
           setTimeout(() => {delete STORAGE[commands[4]]}, Number(commands[10]))
        }
      }
        connection.write(`$2\r\nOK\r\n`)
    }
    else if(commands[2] === 'GET') {
      if(STORAGE[commands[4]]) return connection.write(`$${STORAGE[commands[4]].length}\r\n${STORAGE[commands[4]]}\r\n`)
      connection.write(`$-1\r\n`)
    }
    else if(commands[2] === 'CONFIG') {
        connection.write(formatConfigMessage(commands[6], config.get(commands[6])))
    }
    else connection.write("+PONG\r\n");
  
})});

server.listen(6379, "127.0.0.1");
