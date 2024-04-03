package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	result, err := partOne(string(file))
	if err != nil {
		panic(err)
	}

	fmt.Printf("part 1 = %d\n", result)

	result, err = partTwo(string(file))
	if err != nil {
		panic(err)
	}

	fmt.Printf("part 2 = %d\n", result)
}

type position [2]int

func partOne(file string) (int, error) {
	lines := strings.Split(file, "\n")
	symbols := make(map[position]rune)

	for y, line := range lines {
		for x, char := range line {
			if isSymbol(char) {
				symbols[position{x, y}] = char
			}
		}
	}

	result := 0

	for y, line := range lines {
		for x := 0; x < len(line); x++ {
			var s string
			start := x
			for x < len(line) && isDigit(rune(line[x])) {
				s += string(line[x])
				x++
			}
			if s != "" {
				num, err := strconv.Atoi(line[start:x])
				if err != nil {
					return 0, err
				}

			findAdjacentSymbol:
				for i := y - 1; i <= y+1; i++ {
					for j := start - 1; j < x+1; j++ {
						_, ok := symbols[position{j, i}]
						if ok {
							result += num
							break findAdjacentSymbol
						}
					}
				}
			}
		}
	}

	return result, nil
}

func partTwo(file string) (int, error) {
	lines := strings.Split(file, "\n")
	hashmap := make(map[position][]int)

	for y, line := range lines {
		for x, char := range line {
			if char == '*' {
				hashmap[position{x, y}] = make([]int, 0)
			}
		}
	}

	for y, line := range lines {
		for x := 0; x < len(line); x++ {
			var s string
			start := x
			for x < len(line) && isDigit(rune(line[x])) {
				s += string(line[x])
				x++
			}
			if s != "" {
				num, err := strconv.Atoi(line[start:x])
				if err != nil {
					return 0, err
				}

				for i := y - 1; i <= y+1; i++ {
					for j := start - 1; j < x+1; j++ {
						_, ok := hashmap[position{j, i}]
						if ok {
							hashmap[position{j, i}] = append(hashmap[position{j, i}], num)
						}
					}
				}
			}
		}
	}

	result := 0

	for _, nums := range hashmap {
		if len(nums) == 2 {
			result += nums[0] * nums[1]
		}
	}

	return result, nil
}

func isSymbol(char rune) bool {
	return char != '.' && !(char >= '0' && char <= '9')
}

func isDigit(char rune) bool {
	return (char >= '0' && char <= '9')
}
