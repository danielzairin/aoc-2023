def getNumWays(time, distanceToBeat):
    lo = float("inf")   # the minimum amount of time to press the button
    hi = float("-inf")  # the max amount of time to press the button

    l = 0
    r = time
    while l <= r:
        m = (l + r) // 2
        distanceTravelled = m * (time - m)
        if distanceTravelled > distanceToBeat:
            lo = min(lo, m)
            r = m - 1
        else:
            l = m + 1

    l = 0
    r = time
    while l <= r:
        m = (l + r) // 2
        distanceTravelled = m * (time - m)
        if distanceTravelled > distanceToBeat:
            hi = max(hi, m)
            l = m + 1
        else:
            r = m - 1
    
    return hi - lo + 1

def part1(lines):
    time = lines[0].split()[1:]
    distanceToBeat = lines[1].split()[1:]

    result = 1

    for i in range(len(time)):
        result *= getNumWays(int(time[i]), int(distanceToBeat[i]))

    print(f"part 1 = {result}")

def part2(lines):
    time = ''.join(lines[0].split()[1:])
    distanceToBeat = ''.join(lines[1].split()[1:])

    result = getNumWays(int(time), int(distanceToBeat))

    print(f"part 2 = {result}")

file = open("input.txt")
lines = file.readlines()

part1(lines)
part2(lines)