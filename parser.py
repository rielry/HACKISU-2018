import json

data = json.load(open('categories.json', 'r'))
output = open('categories_parsed.json', 'w')
arr = list()

for i in range(0, len(data)):
    tokens = str(data[i]['parents']).split(',')
    for j in range (0, len(tokens)):
        t = tokens[j]
        z = 0
        begin = 0
        end = 0
        flag = False
        for c in t:

            if c == "'":
                if not flag:
                    begin = z + 1
                    flag = True
                else:
                    end = z
            z += 1

        t = t[begin:end]
        if t not in arr:
            arr.append(t)
            output.write(t + ',')

output.close()