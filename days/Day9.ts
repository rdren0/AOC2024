import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day9.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const sort = (data: string[]) => {
  let newString: any = [];
  let currentId = 0;
  while (data.length > 0) {
    const files = Number(data.shift());
    const freeSpace = Number(data.shift());

    for (let i = 0; i < files; i++) {
      newString.push(currentId.toString());
    }

    for (let i = 0; i < freeSpace; i++) {
      newString.push(".");
    }

    currentId++;
  }
  return newString;
};

export const partOne = (fileContent: any) => {
  const data = fileContent.trim().split("");

  const newData = sort(data);

  const popUntilNotEmpty = (arr: any[]) => {
    while (arr.length) {
      const value = arr.pop();
      if (value !== ".") {
        return value;
      }
    }
    return Error;
  };

  for (let i = 0; i < newData.length; i++) {
    if (newData[i] === ".") {
      const nextValue = popUntilNotEmpty(newData);
      newData[i] = nextValue;
    }
  }

  const value = newData.reduce(
    (acc: any, value: string | number, index: number) => {
      acc += index * Number(value);
      return acc;
    },
    0
  );
  return value;
};

partOne(fileContent);

export const partTwo = (fileContent: any) => {
  const data = fileContent.trim().split("");
  /(\d)\1*/g;
  const newData = sort(data);
  let dataByString = newData.join("");
  const groups = dataByString.match(/(\d)\1*/g);

  let newestString = dataByString;
  groups.reverse().forEach((group: any) => {
    const regex = new RegExp(`(\\.){${group.length}}`);
    const matches = dataByString.match(regex);
    if (matches) {
      newestString = newestString.replace(regex, group);
      newestString = newestString
        .split("")
        .reverse()
        .join("")
        .replace(group, ".".repeat(group.length))
        .split("")
        .reverse()
        .join("");
    }
  });

  const value = newestString.replace(/\./g, "").split("");

  const result = value.reduce(
    (acc: any, value: string | number, index: number) => {
      acc += index * Number(value);
      return acc;
    },
    0
  );

  return result;
};

partTwo(fileContent);
