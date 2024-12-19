const { exec } = require("child_process");

const day = process.argv[2];
if (!day) {
  console.error("Usage: npm run test <day>");
  process.exit(1);
}

const testFile = `tests/Day${day}.test.ts`;

exec(`npx jest ${testFile}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running tests for Day ${day}:`, error.message);
    return;
  }
  if (stderr) {
    console.error(`Error Output:`, stderr);
  }
  console.log(stdout);
});