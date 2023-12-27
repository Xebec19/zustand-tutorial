#!/bin/bash

# Get the commit message from the user
read -p "Enter the commit message: " commit_message

# Check if there are any changes to commit
if [[ -n $(git status -s) ]]; then
    # Add all changes and commit with the provided message
    git add .
    git commit -m "$commit_message"

    # Push changes to the remote repository
    git push   # Change 'master' to your branch if needed
    echo "Changes committed and pushed successfully!"
else
    echo "No changes to commit. Exiting without pushing."
fi
