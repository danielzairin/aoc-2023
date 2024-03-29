package main

import (
	"fmt"
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
				panic(err)
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

	fmt.Printf("Result for day 2 part 1 is: %d\n", result)
}
