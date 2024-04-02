package main

import (
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	partOne(string(file))
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
			findAdjacentSymbol:
				for i := y - 1; i <= y+1; i++ {
					for j := start - 1; j < x+1; j++ {
						_, ok := symbols[position{j, i}]
						if ok {
							parsed, err := strconv.Atoi(line[start:x])
							if err != nil {
								return 0, err
							}
							result += parsed
							break findAdjacentSymbol
						}
					}
				}
			}
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
