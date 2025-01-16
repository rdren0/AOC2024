import { partOne, partTwo } from "../days/Day9";

import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "./data/Day9Test.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

describe("Day 9", () => {
  it("returns the correct value for partOne", () => {
    const result = partOne(fileContent);
    expect(result).toEqual(1928);
  });

  it("returns the correct value for partTwo", () => {
    const result = partTwo(fileContent);
    expect(result).toEqual(2858);
  });
});
