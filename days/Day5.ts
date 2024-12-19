import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day5.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

console.log(fileContent);