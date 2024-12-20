import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day5.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const data = fileContent.trim().split("\n\n");
const order = data[0].split("\n").map((line) => line.split("|"));
const updatedPages = data[1].split("\n").map((line) => line.split(","));
let badData: string[][] = [];

// const isValid = (instructions: string[]) => {
//   return instructions.reverse().every((page, index) => {
//     const precedingPages = instructions.slice(index + 1);

//     const hasInvalid = order.some((pair) => {
//       if (pair[0] === page && precedingPages.includes(pair[1])) {
//         console.log(
//           `Invalid: ${page} depends on ${pair[1]} but it appears later`
//         );
//         return true;
//       }
//       return false;
//     });

//     return !hasInvalid;
//   });
// };

// const validChanges = updatedPages.filter((line) => isValid(line));

// const result = validChanges.reduce((acc: number, info) => {
//   const middle = Math.floor(info.length / 2);

//   if (info.length % 2 === 0) {
//     const midValues = [info[middle - 1], info[middle]].map(Number);
//     return acc + midValues.reduce((sum, value) => sum + value, 0);
//   }

//   acc += Number(info[middle]);

//   return acc;
// }, 0);
// console.log(result);
// -------------------
// Part 2

const isValid = (instructions: string[]) => {
  return instructions.every((page, pageIndex) => {
    const precedingPages = instructions.slice(0, pageIndex);

    const hasInvalid = order.some((pair) => {
      if (pair[0] === page && precedingPages.includes(pair[1])) {
        badData.push([...instructions]);
        return true;
      }
      return false;
    });

    return !hasInvalid;
  });
};

const reorderInstructions = (instructions: string[]) => {
  const reordered = [...instructions];
  let moved = true;

  while (moved) {
    moved = false;

    for (const [page, dependsOn] of order) {
      const pageIndex = reordered.indexOf(page);
      const dependsOnIndex = reordered.indexOf(dependsOn);

      if (
        pageIndex !== -1 &&
        dependsOnIndex !== -1 &&
        pageIndex < dependsOnIndex
      ) {
        reordered.splice(pageIndex, 1);
        reordered.splice(dependsOnIndex + 1, 0, page);
        moved = true;
      }
    }
  }

  return reordered;
};

updatedPages.forEach((line) => isValid(line));

const correctedData = badData.map(reorderInstructions);

const result = correctedData.reduce((acc, info) => {
  const middle = Math.floor(info.length / 2);

  if (info.length % 2 === 0) {
    const midValues = [info[middle - 1], info[middle]].map(Number);
    return acc + midValues.reduce((sum, value) => sum + value, 0);
  }

  return acc + Number(info[middle]);
}, 0);

console.log("Result:", result);
