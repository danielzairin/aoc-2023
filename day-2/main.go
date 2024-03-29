package main

import (
	"fmt"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var MAX_RED = 12
var MAX_GREEN = 13
var MAX_BLUE = 14

var MAX = map[string]int{
	"red":   12,
	"green": 13,
	"blue":  14,
}

func main() {
	file, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	result, err := partOne(string(file))
	if err != nil {
		panic(err)
	}

	fmt.Printf("Day 2 Part 1 Result = %d\n", result)

	result, err = partTwo(string(file))
	if err != nil {
		panic(err)
	}

	fmt.Printf("Day 2 Part 2 Result = %d\n", result)
}

func partOne(file string) (int, error) {
	re := regexp.MustCompile(`\d+\s+(red|blue|green)`)
	result := 0

	for lineNumber, line := range strings.Split(string(file), "\n") {
		gameID := lineNumber + 1
		valid := true

		matches := re.FindAllString(line, -1)
		for _, match := range matches {
			split := strings.Split(match, " ")
			num, err := strconv.Atoi(split[0])
			if err != nil {
				return 0, err
			}

			color := split[1]
			if num > MAX[color] {
				valid = false
				break
			}
		}

		if valid {
			result += gameID
		}
	}

	return result, nil
}

func partTwo(file string) (int, error) {
	re := regexp.MustCompile(`\d+\s+(red|blue|green)`)
	result := 0

	for _, line := range strings.Split(string(file), "\n") {
		min := make(map[string]int)

		matches := re.FindAllString(line, -1)
		for _, match := range matches {
			split := strings.Split(match, " ")
			num, err := strconv.Atoi(split[0])
			if err != nil {
				return 0, err
			}

			color := split[1]
			min[color] = int(math.Max(float64(min[color]), float64(num)))
		}

		power := 1
		for _, v := range min {
			power *= v
		}

		result += power
	}

	return result, nil
}
