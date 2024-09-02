
# open the folder
# iterate through the files and add to the new file

with open('temp-hymns.json', 'w') as combined_file:
    combined_file.write('[\n')
    for i in range(1, 226):
        with open(f'hymns-json/{i}.json', 'r') as file:
            combined_file.write(file.read())
            combined_file.write('\n' if i == 225 else ',\n')
    combined_file.write(']')
