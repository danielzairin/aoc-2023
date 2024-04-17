file = open("input.txt")
lines = file.readlines()

def part1(lines):
    result = 0

    for line in lines:
        _, body = line.split(': ')
        strWinners, strNums = body.split('|')
        winners = set(strWinners.split())

        points = 0
        for num in strNums.split():
            if num in winners:
                if points == 0:
                    points = 1
                else:
                    points *= 2
        
        result += points
    
    print(f"part 1 = {result}")

def part2(lines):
    result = len(lines)
    memo = {}

    for i in range(len(lines) - 1, -1, -1):
        _, body = lines[i].split(': ')
        strWinners, strNums = body.split('|')
        winners = set(strWinners.split())

        count = 0
        for num in strNums.split():
            if num in winners:
                count += 1
        
        for j in range(count):
            count += memo[i + j + 1]
        
        memo[i] = count
        result += count
    
    print(f"part 2 = {result}")

part1(lines)
part2(lines)