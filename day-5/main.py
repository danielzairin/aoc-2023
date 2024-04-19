"""
seeds: 1 2 3 4

x-to-y map:
destinationStart sourceStart length
"""

file = open("input.txt")
lines = file.readlines()

def part1(lines):
    seeds = [int(val) for val in lines[0].split(": ")[1].split()]
    mapEntries = {}
    mapIndex = 0

    i = 1
    while i < len(lines):
        # skip blank line
        if lines[i] == "\n":
            i += 1
            continue

        # found a map header
        if "map" in lines[i]:
            i += 1
            mapEntries[mapIndex] = []
            while i < len(lines) and lines[i] != "\n":
                mapEntries[mapIndex].append([int(val) for val in lines[i].split()])
                i += 1
            mapIndex += 1

    result = float("inf")

    for seed in seeds:
        currentValue = seed

        for mapIndex in range(len(mapEntries)):
            for entry in mapEntries[mapIndex]:
                destinationStart, sourceStart, length = entry
                if currentValue >= sourceStart and currentValue < sourceStart + length:
                    offset = currentValue - sourceStart
                    currentValue = destinationStart + offset
                    break
        
        result = min(currentValue, result)
    
    print(f"part 1 = {result}")
        

part1(lines)