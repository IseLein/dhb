
import os
import shutil

src_dir = 'hymns-audio-raw'
dst_dir = 'hymns-audio'


def get_new_name(old_name):
    if old_name[0].isdigit():
        new_name = ''
        i = 0
        while old_name[i].isdigit():
            new_name += old_name[i]
            i += 1
        return new_name
    else:
        return old_name


raw_file_names = os.listdir(src_dir)

for raw_file_name in raw_file_names:
    new_name = get_new_name(raw_file_name) + '.mp3'

    src_path = os.path.join(src_dir, raw_file_name)
    dst_path = os.path.join(dst_dir, raw_file_name)

    shutil.copy2(src_path, dst_path)
