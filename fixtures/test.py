#!/bin/python

import os, shutil

def remove_content(folder):
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        if os.path.isfile(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)

d = os.path.dirname(os.path.realpath(__file__))
d = os.path.join(d, "../public/")

thumb_folder = os.path.join(d, "thumbnails")
remove_content(thumb_folder)

