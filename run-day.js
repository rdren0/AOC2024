const { exec } = require("child_process");

const day = process.argv[2]; // Get the day number from arguments
if (!day) {
  console.error("Usage: npm run day <X>");
  process.exit(1);
}

const filePath = `./days/Day${day}.ts`;
console.log(`Running file: ${filePath}`);

exec(`npx ts-node ${filePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running Day${day}:`, error.message);
    return;
  }
  if (stderr) {
    console.error(`Error Output: ${stderr}`);
  }
  console.log(stdout);
});