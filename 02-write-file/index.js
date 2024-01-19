//imports
const fs = require('fs');
const path = require('path');
const readline = require('readline');

//reading interface
const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//message
// eslint-disable-next-line no-console
console.log('Type text into file, "exit" for quit text mode:');

// input handler
const handleInput = (input) => {
  if (input.trim() === 'exit') {
    console.log('Record finished. Have a nice day!');
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(input + '\n');
    console.log('Text added. Add more text or type "exit" for quit:');
  }
};

// listeners
rl.on('line', handleInput);
rl.on('close', () => {
  process.exit(0);
});
