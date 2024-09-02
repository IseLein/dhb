
import json

data = []
with open('temp-hymns.json', 'r') as file:
    data = json.load(file)

for i in range(len(data)):
    n_verses = list(map(lambda verse: verse.split('='), data[i]['verses']))
    n_chorus = [] if data[i]['chorus'] == "" else data[i]['chorus'].split('=')

    data[i]['verses'] = n_verses
    data[i]['chorus'] = n_chorus

with open('hymns.json', 'w') as file:
    json.dump(data, file, indent=2)
