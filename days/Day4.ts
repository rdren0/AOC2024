import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day4.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

console.log(fileContent);

let counter = 0;
const rows: string[] = fileContent.trim().split("\n");
const numColumns = rows[0].length;
type Puzzle = string[];
type Match = { lineIndex: number; letterIndex: number };

const findMatches = (puzzle: Puzzle): Match[] => {
  const regex = /(MAS)|(SAM)/g;

  const values: Match[] = puzzle.reduce<Match[]>((acc, line, lineIndex) => {
    let letterIndex = 0;

    while (letterIndex < line.length) {
      regex.lastIndex = letterIndex;
      const match = regex.exec(line);

      if (match) {
        acc.push({ lineIndex, letterIndex: match.index }); // Explicitly typed
        counter++;
        letterIndex = match.index + 1;
      } else {
        break;
      }
    }
    return acc;
  }, []); // Explicitly typed accumulator
  return values;
};

const diagonalRight: string[] = rows
  .reduce<string[][]>(
    (acc, line, lineIndex) => {
      line.split("").forEach((letter, letterIndex) => {
        const diagonalIndex = letterIndex + lineIndex;
        if (!acc[diagonalIndex]) acc[diagonalIndex] = [];
        acc[diagonalIndex].push(letter); // Ensure this line matches the type
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

const leftMatches = findMatches(diagonalLeft);
console.log("Left Diagonal Matches:", leftMatches);

const rightMatches = findMatches(diagonalRight);
console.log("Right Diagonal Matches:", rightMatches);
console.log("Total Matches:", counter);