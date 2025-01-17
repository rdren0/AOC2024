import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day10.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

export const partOne = (fileContent: string) => {
  const data = fileContent.split("\n");
  let HW = [data.length, data[0].length];
  let trails = 0;

  const findPath = (trailHeadCoords: number[]) => {
    let incline = 0;
    for(let i =0; i <HW[0]; i++){
      for(let j =0; j < HW[1]; j++){
        
      }
    }
    console.log(trailHeadCoords);
  };

  data.forEach((row, rowIndex) => {
    const regex = /0/g;
    let trailHead: RegExpExecArray | null;

    while ((trailHead = regex.exec(row)) !== null) {
      const result = findPath([rowIndex, trailHead.index]);
    }
  });
};
partOne(fileContent);

export const partTwo = (fileContent: string) => {};
partTwo(fileContent);
