import * as fs from "fs";
import * as path from "path";

const filePath = path.resolve(__dirname, "../data/Day7.txt");
const fileContent = fs.readFileSync(filePath, "utf8");

type Problem = [number, number[]];

const problems: Problem[] = fileContent
  .trim()
  .split("\n")
  .map((row) => {
    const [result, equation] = row.split(":");
    return [Number(result.trim()), equation.trim().split(" ").map(Number)];
  });

const test = (result: number, numbers: number[]): boolean => {
  const addition = numbers[0] + numbers[1];
  const multiply = numbers[0] * numbers[1];
  const concat = numbers[0].toString() + numbers[1].toString();

  if (numbers.length < 2) {
    return result === numbers[0] ? true : false;
  }

  if (numbers.length === 2) {
    return (
      addition === result || multiply === result || Number(concat) === result
    );
  }

  const remaining = numbers.slice(2);

  return (
    test(result, [addition, ...remaining]) ||
    test(result, [multiply, ...remaining]) ||
    test(result, [Number(concat), ...remaining])
  );
};

const solve = (problems: Problem[]) => {
  const result = problems.filter((dataSet) => {
    const [result, numbers] = dataSet;
    return test(result, numbers);
  });
  return result;
};

console.log(
  solve(problems).reduce((acc, values) => {
    acc += values[0];
    return acc;
  }, 0)
);
