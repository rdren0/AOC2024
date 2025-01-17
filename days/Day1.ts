import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day1.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const data = fileContent;

type Accumulator = [number[], number[]];

const values = data
  .trim()
  .split("\n")
  .map((line) => line.split("   ").map(Number)) 
  .reduce<Accumulator>(
    (acc, [val1, val2]) => {
      acc[0].push(val1);
      acc[1].push(val2);
      return acc;
    },
    [[], []]
  )
  .map((list) => list.sort((a, b) => a - b));

const frequencyMap: Record<number, number> = values[1].reduce((freq, num) => {
  freq[num] = (freq[num] || 0) + 1;
  return freq;
}, {} as Record<number, number>);

const similarityScore = values[0].reduce((score, num) => {
  const count = frequencyMap[num] || 0;
  return score + num * count;
}, 0);

console.log("Similarity Score:", similarityScore);