const fs = require("node:fs");

/**
 * @param {number[]} nums
 * @returns {number}
 */
function part1Recursion(nums) {
  if (nums.every((n) => n === 0)) {
    return 0;
  }

  /**
   * @param {number[]} acc
   * @param {number} _current
   * @param {number} i
   * @param {number[]} arr
   * @returns
   */
  const reducer = (acc, _current, i, arr) => {
    if (i === 0) {
      return acc;
    }

    return [...acc, arr[i] - arr[i - 1]];
  };

  const diffs = nums.reduce(reducer, []);

  const last = nums.at(-1);
  if (last === undefined) {
    throw new Error(`nums is empty: ${nums}`);
  }

  return last + part1Recursion(diffs);
}

function part1() {
  const lines = fs.readFileSync("input.txt", "utf8").split("\n");
  let result = 0;

  for (const line of lines) {
    const nums = line.split(" ").map(Number);
    result += part1Recursion(nums);
  }

  console.log(`part 1 = ${result}`);
}

/**
 * @param {number[]} nums
 * @returns {number}
 */
function part2Recursion(nums) {
  if (nums.every((n) => n === 0)) {
    return 0;
  }

  /**
   * @param {number[]} acc
   * @param {number} _current
   * @param {number} i
   * @param {number[]} arr
   * @returns
   */
  const reducer = (acc, _current, i, arr) => {
    if (i === 0) {
      return acc;
    }

    return [...acc, arr[i] - arr[i - 1]];
  };

  const diffs = nums.reduce(reducer, []);

  const first = nums.at(0);
  if (first === undefined) {
    throw new Error(`nums is empty: ${nums}`);
  }

  return first - part2Recursion(diffs);
}

function part2() {
  const lines = fs.readFileSync("input.txt", "utf8").split("\n");
  let result = 0;

  for (const line of lines) {
    const nums = line.split(" ").map(Number);
    result += part2Recursion(nums);
  }

  console.log(`part 2 = ${result}`);
}

part1();
part2();
