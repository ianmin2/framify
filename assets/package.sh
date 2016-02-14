#/bin/bash

# dir to copy to    
DESTINATION='/nodejs/bix/mobile/printSnapp/www/'
DESTINATION2='/nodejs/bix/mobile/bixbyte/www/'

# dir to copy from
SOURCE='.' 

# list of dirs to copy
myArray=('index.html' 'application.js' 'views')

# for each directory in myArray ...
for d in "${myArray[@]}"
do
    if [ -f "$d" ]; then # it this is a regular file

        # create base directory
        mkdir -p $DESTINATION/$(dirname "$d")
        mkdir -p $DESTINATION2/$(dirname "$d")

        # copy the file
        cp "$SOURCE/$d" $DESTINATION/$(dirname "$d")
        cp "$SOURCE/$d" $DESTINATION2/$(dirname "$d")
        
        echo "File copied successfully"

    elif [ -d "$d" ]; then # it is a directory

        # create directory (including parent) if it doesn't exist
        # - this does nothing if directory exists
        mkdir -p "$DESTINATION/$d"
        mkdir -p "$DESTINATION2/$d"

        # recursive copy
        cp -r "$SOURCE/$d/"* "$DESTINATION/$d/."
        cp -r "$SOURCE/$d/"* "$DESTINATION2/$d/."
        
        echo "Directory copied successfully"

    else 

        # write warning to stderr. do nothing with this entry
        echo "WARNING: invalid entry $d." >&2

    fi
done