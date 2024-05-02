const HAND_SIZE = 5;

const CARD_VALUE: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: -1,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

export const HAND_TYPE = {
  FIVE_OF_A_KIND: 6,
  FOUR_OF_A_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  HIGH_CARD: 0,
} as const;

type HandTypeValue = (typeof HAND_TYPE)[keyof typeof HAND_TYPE];

export function getHandTypeP2(hand: string): HandTypeValue {
  if (hand.includes("J")) {
    const cards = hand.split("");
    const map = new Map<string, number>();
    const reverseMap = new Map<number, string[]>();

    for (const card of cards) {
      if (card !== "J") {
        map.set(card, (map.get(card) || 0) + 1);
      }
    }

    for (const [card, count] of map) {
      if (reverseMap.has(count)) {
        reverseMap.get(count)!.push(card);
      } else {
        reverseMap.set(count, [card]);
      }
    }

    let mostFreq = "J";

    if (reverseMap.has(5)) {
      mostFreq = reverseMap.get(5)![0];
    } else if (reverseMap.has(4)) {
      mostFreq = reverseMap.get(4)![0];
    } else if (reverseMap.has(3)) {
      mostFreq = reverseMap.get(3)![0];
    } else if (reverseMap.has(2)) {
      mostFreq = reverseMap
        .get(2)!
        .sort((a, b) => CARD_VALUE[b] - CARD_VALUE[a])[0];
    } else if (reverseMap.has(1)) {
      mostFreq = reverseMap
        .get(1)!
        .sort((a, b) => CARD_VALUE[b] - CARD_VALUE[a])[0];
    }

    return getHandType(hand.replaceAll("J", mostFreq));
  }

  return getHandType(hand);
}

export function getHandType(hand: string): HandTypeValue {
  const cards = hand.split("");
  const map = new Map<string, number>();
  const reverseMap = new Map<number, string[]>();

  for (const card of cards) {
    map.set(card, (map.get(card) || 0) + 1);
  }

  for (const [card, count] of map) {
    if (reverseMap.has(count)) {
      reverseMap.get(count)!.push(card);
    } else {
      reverseMap.set(count, [card]);
    }
  }

  if (reverseMap.has(5)) {
    return HAND_TYPE.FIVE_OF_A_KIND;
  }

  if (reverseMap.has(4)) {
    return HAND_TYPE.FOUR_OF_A_KIND;
  }

  if (reverseMap.has(3) && reverseMap.has(2)) {
    return HAND_TYPE.FULL_HOUSE;
  }

  if (reverseMap.has(3)) {
    return HAND_TYPE.THREE_OF_A_KIND;
  }

  if (reverseMap.has(2) && reverseMap.get(2)!.length === 2) {
    return HAND_TYPE.TWO_PAIR;
  }

  if (reverseMap.has(2)) {
    return HAND_TYPE.ONE_PAIR;
  }

  return HAND_TYPE.HIGH_CARD;
}

export function compareHandsP2(hand1: string, hand2: string): number {
  const hand1Type = getHandTypeP2(hand1);
  const hand2Type = getHandTypeP2(hand2);

  if (hand1Type !== hand2Type) {
    if (hand1Type > hand2Type) {
      return -1;
    } else {
      return 1;
    }
  }

  for (let i = 0; i < HAND_SIZE; i++) {
    if (CARD_VALUE[hand1[i]] === CARD_VALUE[hand2[i]]) {
      continue;
    }
    if (CARD_VALUE[hand1[i]] > CARD_VALUE[hand2[i]]) {
      return -1;
    } else {
      return 1;
    }
  }

  return -1;
}
