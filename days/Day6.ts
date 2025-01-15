import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day6.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const data = fileContent
  .trim()
  .split("\n")
  .map((row) => row.split("").map((item) => (item === "." ? null : item)));

const patrolValues: any = {
  steps: 0,
  direction: "N",
  rLength: data[0].length,
  cLength: data.length,
};

data.forEach((row, rowIndex) => {
  row.forEach((value, columnIndex) => {
    if (value === "^") {
      patrolValues["row"] = rowIndex;
      patrolValues["column"] = columnIndex;
    }
  });
});

const patrol = () => {
  while (
    patrolValues.row < patrolValues.rLength - 1 &&
    patrolValues.row >= 0 &&
    patrolValues.column < patrolValues.cLength - 1 &&
    patrolValues.column >= 0
  ) {
    switch (patrolValues.direction) {
      case "N":
        if (data[patrolValues.row - 1][patrolValues.column] === "#") {
          console.log("hit", [patrolValues.row], [patrolValues.column]);
          data[patrolValues.row][patrolValues.column] = "X";
          patrolValues.direction = "E";
        } else {
          if (data[patrolValues.row][patrolValues.column] !== "X")
            patrolValues.steps++;
          patrolValues.row--;
        }
        break;
      case "S":
        if (data[patrolValues.row + 1][patrolValues.column] === "#") {
          console.log("hit", [patrolValues.row], [patrolValues.column]);
          data[patrolValues.row][patrolValues.column] = "X";
          patrolValues.direction = "W";
        } else {
          if (data[patrolValues.row][patrolValues.column] !== "X")
            patrolValues.steps++;
          patrolValues.row++;
        }
        break;
      case "E":
        if (data[patrolValues.row][patrolValues.column + 1] === "#") {
          console.log("hit", [patrolValues.row], [patrolValues.column]);
          data[patrolValues.row][patrolValues.column] = "X";
          patrolValues.direction = "S";
        } else {
          if (data[patrolValues.row][patrolValues.column] !== "X")
            patrolValues.steps++;
          patrolValues.column++;
        }
        break;
      case "W":
        if (data[patrolValues.row][patrolValues.column - 1] === "#") {
          console.log("hit", [patrolValues.row], [patrolValues.column]);
          data[patrolValues.row][patrolValues.column] = "X";
          patrolValues.direction = "N";
        } else {
          if (data[patrolValues.row][patrolValues.column] !== "X")
            patrolValues.steps++;
          patrolValues.column--;
        }
        break;
    }
  }
  console.log(patrolValues);
};
patrol();
