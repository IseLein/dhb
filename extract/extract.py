
# assumption: all (hymn and verse) numbers are followed by a period

def get_starting_digit(line):
    line1 = line.strip()
    i = 0
    num = ''
    while i < len(line1) and line1[i].isdigit():
        num += line1[i]
        i += 1
    return (int(num), line1[i+1:].strip())

def print_hymn(hymn, title, bible_ref, key, verses, chorus, meta_text, meta_music, meta_up, meta_down):
    print("===========  ", hymn, ". ", title, '\n')
    print(bible_ref)
    print("Key: ", key, '\n')
    for i in range(len(verses)):
        print(i+1, ".\n", verses[i])
    print('')
    print("Chorus.\n", chorus, '\n')
    print("Text: ", meta_text)
    print("Music: ", meta_music)
    print("Up: ", meta_up)
    print("Down: ", meta_down)

hymns = []
with open('hymn-book.txt', 'r') as file:
    hymns = file.read().split('\n')

# parsing
# first hymn starts at line 328
i = 327

# variables to keep state
hymn = 0
title = ''
bible_ref = ''
key = ''
verse = 0
verses = []
text = ''
chorus = ''
meta_text = ''
meta_music = ''
meta_up = ''
meta_down = ''
in_title = False
in_chorus = 0  # 0: before, 1: during, 2: after

while i < len(hymns):
    line = hymns[i].strip()
    i += 1
    # TODO: remove this
    # print(line)
    if hymn > 5:
        break

    if line == '':
        if in_chorus == 0 and verse == 1:
            in_chorus = 1
        elif in_chorus == 1:
            in_chorus = 2
        continue

    if in_title:
        if line.startswith('KEY'):
            key = line[4:].strip()
            in_title = False
            continue
        else:
            bible_ref += line
            continue

    if line[0].isdigit():
        num, line_content = get_starting_digit(line)
        if line_content.isupper():  # new hymn
            if hymn > 0:
                verses.append(text)
                print_hymn(hymn, title, bible_ref, key, verses, chorus, meta_text, meta_music, meta_up, meta_down)
            assert hymn == num - 1
            hymn = num
            verse = 0
            verses = []
            in_chorus = 0
            in_title = True
            meta_music = ''
            meta_text = ''
            meta_up = ''
            meta_down = ''
            title = line_content
            in_title = True
            continue
        else:  # new verse
            if verse > 0:
                verses.append(text)
            text = ''
            assert verse == num - 1
            verse = num
            text = line_content + '\n'
            if verse > 1:
                in_chorus = 2
            continue

    if in_chorus == 1:
        chorus += line
        continue

    if line[:5].lower() == 'text:':
        # parse metadata
        sp = line.split(';')
        meta_text = sp[0][5:].strip()
        meta_up = sp[1].strip() if len(sp) > 1 else ''

        line = hymns[i].strip()
        i += 1
        sp = line.split(';')
        if sp[0][:6].lower() == 'music:':
            meta_music = sp[0][6:].strip()
            meta_down = sp[1].strip() if len(sp) > 1 else ''
        else:
            meta_down = sp[0].strip()
            meta_music = ''
        continue


    text += (line + '\n')