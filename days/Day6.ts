import * as fs from "fs";
import * as path from "path";
import { start } from "repl";

const filePath = path.resolve(__dirname, "../data/Day6.txt");
const fileContent = fs.readFileSync(filePath, "utf8");
const data = fileContent
  .trim()
  .split("\n")
  .map((row) => row.split("").map((item) => (item === "." ? null : item)));

const startingPosition = data.reduce(
  (acc, row, rowIndex) => {
    row.filter((item, index) => {
      if (item === "^") {
        acc = { row: rowIndex, index };
      }
    });

    return acc;
  },
  { row: 0, index: 0 }
);
let counter = 1;

const goUp = () => {
  while (!data[startingPosition.row - 1][startingPosition.index]) {
    console.log(
      "infront",
      data[startingPosition.row - 2][startingPosition.index]
    );
    console.log("row", startingPosition);
    startingPosition.row = startingPosition.row - 1;
    counter++;
  }
};

const goRight = () => {
  while (!data[startingPosition.row][startingPosition.index + 1]) {
    console.log(
      "infront",
      data[startingPosition.row][startingPosition.index + 2]
    );
    console.log("column", startingPosition);
    startingPosition.index = startingPosition.index + 1;
    counter++;
  }
};

const goDown = () => {
  while (!data[startingPosition.row + 1][startingPosition.index]) {
    console.log(
      "infront",
      data[startingPosition.row + 2][startingPosition.index]
    );
    console.log("row", startingPosition);
    startingPosition.row = startingPosition.row + 1;
    counter++;
  }
};

const goLeft = () => {
  while (!data[startingPosition.row][startingPosition.index - 1]) {
    console.log(
      "infront",
      data[startingPosition.row][startingPosition.index - 2]
    );
    console.log("column", startingPosition);
    startingPosition.index = startingPosition.index - 1;
    counter++;
  }
};
const movementFns = [() => goUp, () => goRight, () => goDown, () => goLeft];
let total = 0;
let index = 0;
while (
  startingPosition.index < data[0].length &&
  startingPosition.row < data.length
) {
  const result = movementFns[index]();
  console.log(
    `Function ${index + 1} returned ${result}, total is now ${total}`
  );

  index = (index + 1) % movementFns.length;
}

console.log(counter);
