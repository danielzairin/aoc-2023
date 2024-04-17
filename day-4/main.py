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

part1(lines)