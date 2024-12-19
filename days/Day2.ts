import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day2.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

// Day 2

type Line = number[];

const values: Line[] = fileContent
  .trim()
  .split("\n")
  .map((level) => level.split(" ").map(Number));

const isSafe = (line: Line): boolean => {
  const differences: number[] = line
    .slice(1)
    .map((value: number, index: number) => Math.abs(value - line[index]));

  const validDifferences: boolean = differences.every(
    (diff: number) => diff >= 1 && diff <= 3
  );

  const increasing: boolean = line.every(
    (value: number, index: number) => index === 0 || value > line[index - 1]
  );
  const decreasing: boolean = line.every(
    (value: number, index: number) => index === 0 || value < line[index - 1]
  );

  return validDifferences && (increasing || decreasing);
};

const canBecomeSafe = (line: Line): boolean => {
  for (let i = 0; i < line.length; i++) {
    const modifiedLine: Line = [...line.slice(0, i), ...line.slice(i + 1)];
    if (isSafe(modifiedLine)) {
      return true;
    }
  }
  return false;
};


const safetyReport = (values: Line[]): { safe: number; unsafe: number } => {
  return values.reduce(
    (acc: { safe: number; unsafe: number }, line: Line) => {
      if (isSafe(line)) {
        acc.safe += 1;
      } else if (canBecomeSafe(line)) {
        acc.safe += 1;
      } else {
        acc.unsafe += 1;
      }
      return acc;
    },
    { safe: 0, unsafe: 0 }
  );
};

const result = safetyReport(values);
console.log(result);