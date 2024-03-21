package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	fileBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	partOneResult, err := PartOne(string(fileBytes))
	if err != nil {
		panic(err)
	}

	fmt.Printf("part1 = %d\n", partOneResult)
}

func PartOne(input string) (int, error) {
	lines := strings.Split(input, "\n")

	var result int

	for _, line := range lines {
		var first rune
		for i := 0; i < len(line); i++ {
			if unicode.IsNumber(rune(line[i])) {
				first = rune(line[i])
				break
			}
		}

		var second rune
		for i := len(line) - 1; i >= 0; i-- {
			if unicode.IsNumber(rune(line[i])) {
				second = rune(line[i])
				break
			}
		}

		value, err := strconv.Atoi(string(first) + string(second))
		if err != nil {
			return 0, err
		}

		result += value
	}

	return result, nil
}
