import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day11.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

const blink = (data: string[]) => {
  return data.reduce<string[]>((acc, value) => {
    if (/^0+$/.test(value)) {
      acc.push("1");
    } else if (value.length % 2 === 0) {
      const n = value.length / 2;
      const regex = new RegExp(`^(.{${n}})(.{${n}})$`);
      const match = regex.exec(value);

      if (match) {
        acc.push(Number(match[1]).toString());
        acc.push(Number(match[2]).toString());
      }
    } else {
      acc.push((Number(value) * 2024).toString());
    }

    return acc;
  }, []);
};

export const partOne = (fileContent: string) => {
  const data = fileContent.trim().split(/\s+/);
  let newData = data;
  for (let i = 0; i < 25; i++) {
    newData = blink(newData);
  }

  return newData.length;
};

const blinkOptimized = (
  stones: Record<string, bigint>
): Record<string, bigint> => {
  const nextStones: Record<string, bigint> = {};

  for (const [value, count] of Object.entries(stones)) {
    if (value === "0") {
      nextStones["1"] = (nextStones["1"] || BigInt(0)) + count;
    } else if (value.length % 2 === 0) {
      const n = value.length / 2;
      const left = value.slice(0, n).replace(/^0+/, "") || "0";
      const right = value.slice(n).replace(/^0+/, "") || "0";

      nextStones[left] = (nextStones[left] || BigInt(0)) + count;
      nextStones[right] = (nextStones[right] || BigInt(0)) + count;
    } else {
      const newValue = (BigInt(value) * BigInt(2024)).toString();
      nextStones[newValue] = (nextStones[newValue] || BigInt(0)) + count;
    }
  }

  return nextStones;
};

const partTwo = (fileContent: string): bigint => {
  const initialStones = fileContent.trim().split(/\s+/);
  let stoneCounts: Record<string, bigint> = {};

  for (const stone of initialStones) {
    stoneCounts[stone] = (stoneCounts[stone] || BigInt(0)) + BigInt(1);
  }

  for (let i = 0; i < 75; i++) {
    stoneCounts = blinkOptimized(stoneCounts);
  }

  return Object.values(stoneCounts).reduce(
    (sum, count) => sum + count,
    BigInt(0)
  );
};

console.log(partOne(fileContent).toString());

console.log(partTwo(fileContent).toString());
