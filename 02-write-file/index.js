//imports
const fs = require('fs');
const path = require('path');
const readline = require('readline');

//reading interface
const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath);
let closing = false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

//message
console.log('Type text into file, "exit" for quit text mode:');

// input handler
const handleInput = (input) => {
  if (input.trim() === 'exit') {
    console.log('Record finished. Have a nice day!');
    closing = true;
    rl.close();
  } else {
    writeStream.write(input + '\n');
    console.log('Text added. Add more text or type "exit" for quit:');
  }
};

// listeners
rl.on('line', handleInput);
rl.on('close', () => {
  writeStream.end();
  if (!closing) {
    console.log('Process terminated. Goodbye!');
  }
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('Process interrupted. Goodbye!');
  rl.close();
});
