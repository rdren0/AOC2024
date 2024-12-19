import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day4.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

console.log(fileContent);

let counter = 0;
const rows: string[] = fileContent.trim().split("\n");
const numColumns = rows[0].length;
export type Puzzle = string[];
type Match = { lineIndex: number; letterIndex: number };

export const findMatches = (puzzle: Puzzle): Match[] => {
  const regex = /(MAS)|(SAM)/g;

  const values: Match[] = puzzle.reduce<Match[]>((acc, line, lineIndex) => {
    let letterIndex = 0;

    while (letterIndex < line.length) {
      regex.lastIndex = letterIndex;
      const match = regex.exec(line);

      if (match) {
        acc.push({ lineIndex, letterIndex: match.index }); 
        counter++;
        letterIndex = match.index + 1;
      } else {
        break;
      }
    }
    return acc;
  }, []);
  return values;
};

const diagonalRight: string[] = rows
  .reduce<string[][]>(
    (acc, line, lineIndex) => {
      line.split("").forEach((letter, letterIndex) => {
        const diagonalIndex = letterIndex + lineIndex;
        if (!acc[diagonalIndex]) acc[diagonalIndex] = [];
        acc[diagonalIndex].push(letter); 
      });
      return acc;
    },
    Array.from({ length: numColumns + rows.length - 1 }, () => [])
  )
  .map((line) => line.join(""));

const diagonalLeft: string[] = rows
  .reverse()
  .reduce<string[][]>(
    (acc, line, lineIndex) => {
      line.split("").forEach((letter, letterIndex) => {
        const diagonalIndex = lineIndex + (numColumns - 1 - letterIndex);
        if (!acc[diagonalIndex]) acc[diagonalIndex] = [];
        acc[diagonalIndex].push(letter);
      });
      return acc;
    },
    Array.from({ length: numColumns + rows.length - 1 }, () => [])
  )
  .map((line) => line.join(""));

findMatches(diagonalLeft);

findMatches(diagonalRight);


export const findXMatches = (puzzle: Puzzle): Match[] => {
    const regex = /(A)/g;
  
    const values: Match[] = puzzle.reduce<Match[]>((acc, line, lineIndex) => {
      let letterIndex = 0;
  
      while (letterIndex < line.length) {
        regex.lastIndex = letterIndex;
        const match = regex.exec(line);
  
        if (match) {
          const matchIndex = match.index;
  
          const topLeft = puzzle[lineIndex - 1]?.[matchIndex - 1];
          const bottomRight = puzzle[lineIndex + 1]?.[matchIndex + 1];
          const bottomLeft = puzzle[lineIndex + 1]?.[matchIndex - 1];
          const topRight = puzzle[lineIndex - 1]?.[matchIndex + 1];
  
          if ((topLeft === "M" && bottomRight === "S") || (topLeft === "S" && bottomRight === "M")) {
            if (bottomLeft === "M" && topRight === "S") {
              acc.push({ lineIndex, letterIndex: matchIndex }); 
            } else if (bottomLeft === "S" && topRight === "M") {

              acc.push({ lineIndex, letterIndex: matchIndex }); 
            }
          }
  
          counter++; 
          letterIndex = matchIndex + 1; 
        } else {
          break;
        }
      }
      return acc;
    }, []);
  
    return values;
  };

console.log("Total Matches:", findXMatches(fileContent.trim().split("\n")).length);