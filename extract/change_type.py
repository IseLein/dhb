
import json

data = []
with open('temp-hymns.json', 'r') as file:
    data = json.load(file)

dd = [[1, 2, 3], [4, 5, 6]]

for i in range(len(data)):
    n_verses = []
    for verse in data[i]['verses']:
        n_verse = ''
        for line in verse:
            n_verse += line + '\n'
        n_verse = n_verse.strip()
        n_verses.append(n_verse)

    data[i]['verses'] = n_verses

with open('hymns.json', 'w') as file:
    json.dump(data, file, indent=2)
