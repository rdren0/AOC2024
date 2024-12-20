import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day5.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const data = fileContent.trim().split("\n\n");
const order = data[0].split("\n").map((line) => line.split("|"));
const updatedPages = data[1].split("\n").map((line) => line.split(","));

const isValid = (instructions: string[], pageIndex: number) => {
  return instructions.reverse().every((page, index) => {
    const precedingPages = instructions.slice(index + 1);

    const hasInvalid = order.some((pair) => {
      if (pair[0] === page && precedingPages.includes(pair[1])) {
        console.log(
          `Invalid: ${page} depends on ${pair[1]} but it appears later`
        );
        return true;
      }
      return false;
    });

    return !hasInvalid;
  });
};

const validChanges = updatedPages.filter((line, index) => isValid(line, index));

const result = validChanges.reduce((acc: number, info) => {
  const middle = Math.floor(info.length / 2);

  if (info.length % 2 === 0) {
    const midValues = [info[middle - 1], info[middle]].map(Number);
    return acc + midValues.reduce((sum, value) => sum + value, 0);
  }

  acc += Number(info[middle]);

  return acc;
}, 0);

// Part 2

const isInvalid = (instructions: string[], pageIndex: number) => {
  return instructions.reverse().every((page, index) => {
    const precedingPages = instructions.slice(index + 1);

    const hasInvalid = order.some((pair) => {
      if (pair[0] === page && precedingPages.includes(pair[1])) {
        console.log(
          `Invalid: ${page} depends on ${pair[1]} but it appears later`
        );
        return true;
      }
      return false;
    });

    return !hasInvalid;
  });
};

const inValidChanges = updatedPages.filter((line, index) =>
  isInvalid(line, index)
);

const badResult = validChanges.reduce((acc: number, info) => {
  const middle = Math.floor(info.length / 2);
  const corrected = info.sort();
  if (corrected.length % 2 === 0) {
    const midValues = [corrected[middle - 1], corrected[middle]].map(Number);
    return acc + midValues.reduce((sum, value) => sum + value, 0);
  }

  acc += Number(corrected[middle]);

  return acc;
}, 0);

console.log("Bad", badResult);
