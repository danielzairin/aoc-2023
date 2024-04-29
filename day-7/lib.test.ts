import assert from "node:assert";
import test, { describe } from "node:test";
import { HAND_TYPE, compareHands, getHandType } from "./lib";

describe("hand types", () => {
  test("five of a kind", () => {
    assert.strictEqual(getHandType("AAAAA"), HAND_TYPE.FIVE_OF_A_KIND);
  });
  test("four of a kind", () => {
    assert.strictEqual(getHandType("JAAAA"), HAND_TYPE.FOUR_OF_A_KIND);
  });
  test("full house", () => {
    assert.strictEqual(getHandType("JJAAA"), HAND_TYPE.FULL_HOUSE);
  });
  test("three of a kind", () => {
    assert.strictEqual(getHandType("JAAKA"), HAND_TYPE.THREE_OF_A_KIND);
  });
  test("two pair", () => {
    assert.strictEqual(getHandType("JJAKA"), HAND_TYPE.TWO_PAIR);
  });
  test("one pair", () => {
    assert.strictEqual(getHandType("JJ456"), HAND_TYPE.ONE_PAIR);
  });
  test("high card", () => {
    assert.strictEqual(getHandType("KAJQT"), HAND_TYPE.HIGH_CARD);
  });
});

describe("compare hands", () => {
  test("five of a kind vs full house", () => {
    assert.strictEqual(compareHands("22222", "AAAKK"), -1);
  });
  test("both are three of a kind", () => {
    assert.strictEqual(compareHands("T55J5", "QQQJA"), 1);
  });
});
