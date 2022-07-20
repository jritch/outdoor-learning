#!/bin/bash


# Set script to stop if any command fails or an undefined variable is accessed
set -euo pipefail

printf "\n"
echo "🤖 This script will create and push new branch using your git credentials that can be imported into an Expo Snack."

read -p "Ready to proceed? (y/N) " -n 1 -r PROCEED

printf "\n"

if [[ ! $PROCEED =~ ^[Yy]$ ]]; then
  echo "Alright then. Exiting..."
  exit 0
fi 

# Exit if there are uncommitted changes
if [[ `git status --porcelain` ]]; then
  echo "There are currently uncommitted changes. Please commit/stash all work in progress before proceeding"
  [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi

printf "\n"

# Create the new branch
BRANCH=export-to-snack-$(date +%Y-%m-%d--%H-%M-%S)
git checkout -b $BRANCH
echo "Created branch $BRANCH"

# Remove android and ios folders
echo "Removing android and ios folders..."
rm -rf android ios 

echo "Committing the files and pushing to remote..."

# Only proceed if files have been changed
if [[ `git status --porcelain` ]]; then
  TODAY=$(date +%Y-%m-%d)

  git add -A
  git commit -m "[AUTO GENERATED] Remove android & ios folders for snack export $TODAY"

  git push --set-upstream origin $BRANCH 

  # Return to parent branch where we started
  git checkout -

  REMOTE_URL=$(git config --get remote.origin.url)

  printf "\n"
  printf "\n"
  echo "✅ Pushed to remote branch: $REMOTE_URL/tree/$BRANCH"

  printf "\n"

  echo "🍫 Now go to https://snack.expo.dev, select the three dots next to Project on the left, and select \"Import git repository\" and use the link above."

else
  echo "ERROR: No changes to add to git commit"
  exit 2
fi

printf "\n"
printf "\n"