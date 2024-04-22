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

    def searchMap(currentValue, currentMapIndex):
        if currentMapIndex == len(mapEntries):
            return currentValue
        
        nextValue = currentValue
        nextMapIndex = currentMapIndex + 1
        
        for entry in mapEntries[currentMapIndex]:
            destinationStart, sourceStart, length = entry
            if currentValue >= sourceStart and currentValue < sourceStart + length:
                offset = currentValue - sourceStart
                nextValue = destinationStart + offset
                break
        
        return searchMap(nextValue, nextMapIndex)

    result = float("inf")

    for seed in seeds:
        result = min(searchMap(seed, 0), result)
    
    print(f"part 1 = {result}")
        
def part2(lines):
    firstLineNums = [int(val) for val in lines[0].split(": ")[1].split()]
    mapEntries = {}
    mapIndex = 0
    seeds = []

    for i in range(0, len(firstLineNums), 2):
        seeds.append((firstLineNums[i], firstLineNums[i + 1]))

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

    def searchMap(start, length, mapIndex):
        if mapIndex == len(mapEntries):
            nonlocal result
            result = min(start, result)
            return 
        
        end = start + length
        last = start + length - 1
        found = False
        i = 0

        while not found and i < len(mapEntries[mapIndex]):
            destStart, sourceStart, mapLength = mapEntries[mapIndex][i]
            sourceEnd = sourceStart + mapLength
            offset = start - sourceStart

            # Case 1: Completely consume all the values
            if start >= sourceStart and last < sourceEnd:
                found = True
                searchMap(destStart + offset, length, mapIndex + 1)
            # Case 2: The start value falls within range, the last value is out of range
            elif start >= sourceStart and start < sourceEnd:
                found = True
                searchMap(destStart + offset, sourceEnd - start, mapIndex + 1)
                searchMap(sourceEnd, end - sourceEnd, mapIndex)
            # Case 3: The last value falls within range, the start value is out of range
            elif last >= sourceStart and last < sourceEnd:
                found = True
                searchMap(destStart, end - sourceStart, mapIndex + 1)
                searchMap(start, sourceStart - start, mapIndex)
            
            i += 1
        
        # No mapping found, use the current values as the next values
        if not found:
            searchMap(start, length, mapIndex + 1)

    for seedStart, seedLength in seeds:
        searchMap(seedStart, seedLength, 0)
    
    print(f"part 2 = {result}")


part1(lines)
part2(lines)