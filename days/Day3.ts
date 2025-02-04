import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day3.txt");
const fileContent = fs.readFileSync(filePath, "utf8");


const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

let shouldMulti = true;
let sum = 0;
let match: RegExpExecArray | null; 


while ((match = regex.exec(fileContent)) !== null) {
  if (match[0].startsWith("mul") && shouldMulti) {
    sum += Number(match[1]) * Number(match[2]);
  } else if (match[0] === "do()") {
    shouldMulti = true;
  } else if (match[0] === "don't()") {
    shouldMulti = false;
  }
}

console.log("Sum:", sum);