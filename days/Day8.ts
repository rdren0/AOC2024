import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day8.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const data = fileContent
  .trim()
  .split("\n")
  .map((row) => row.split(""));
