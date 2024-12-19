import * as fs from "fs";
import * as path from "path";

// Resolve the file path
const filePath = path.resolve(__dirname, "../data/Day1.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

// Process the file content
const data = fileContent;

// Define the types for the accumulator
type Accumulator = [number[], number[]];

const values = data
  .trim()
  .split("\n")
  .map((line) => line.split("   ").map(Number)) // Produces number[][]
  .reduce<Accumulator>(
    (acc, [val1, val2]) => {
      acc[0].push(val1);
      acc[1].push(val2);
      return acc;
    },
    [[], []]
  )
  .map((list) => list.sort((a, b) => a - b)); // Sort numerically

// Calculate frequency map
const frequencyMap: Record<number, number> = values[1].reduce((freq, num) => {
  freq[num] = (freq[num] || 0) + 1;
  return freq;
}, {} as Record<number, number>);

// Calculate similarity score
const similarityScore = values[0].reduce((score, num) => {
  const count = frequencyMap[num] || 0;
  return score + num * count;
}, 0);

console.log("Similarity Score:", similarityScore);