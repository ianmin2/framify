#/bin/bash

# dir to copy to    
DESTINATION= "$PWD/dist"

# dir to copy from
SOURCE="$PWD" 

# list of dirs to copy
myArray=('assets' 'config' 'forms' 'node_modules' 'php' 'sample' 'schema' 'server' 'views' 'application.js' 'index.html' 'login.html' 'main.js' 'package.json' 'favicon.ico')

# for each directory in myArray ...
for d in "${myArray[@]}"
do
    if [ -f "$d" ]; then # it this is a regular file

        # create base directory
        mkdir -p $DESTINATION/$(dirname "$d")

        # copy the file
        cp "$SOURCE/$d" $DESTINATION/$(dirname "$d")
        
        echo "File copied successfully"

    elif [ -d "$d" ]; then # it is a directory

        # create directory (including parent) if it doesn't exist
        # - this does nothing if directory exists
        mkdir -p "$DESTINATION/$d"

        # recursive copy
        cp -r "$SOURCE/$d/"* "$DESTINATION/$d/."
        
        echo "Directory copied successfully"

    else 

        # write warning to stderr. do nothing with this entry
        echo "WARNING: invalid entry $d." >&2

    fi
done
