#!/bin/bash


# Set script to stop if any command fails or an undefined variable is accessed
set -euo pipefail

# Set defaults
BASE_ON_CURRENT_BRANCH=0
COMMIT_AND_PULL_REQUEST=0

while getopts "bcak:v:" OPTION; do
    case $OPTION in
    c)
        COMMIT_AND_PULL_REQUEST=1
        ;;
    *)
        ;;
    esac
done


# if ! command -v gh &> /dev/null; then
#   echo "GitHub CLI could not be found, please install from https://cli.github.com/"
#   exit
# fi

# Create the new branch
BRANCH=export-to-snack-$(date +%Y-%m-%d--%H-%M-%S)
git checkout -b $BRANCH
git push --set-upstream origin $BRANCH
echo "Created branch $BRANCH"

# Remove android and ios folders
rm -rf android ios 

# exit early if commit isn't needed
if [[ $COMMIT_AND_PULL_REQUEST == 0 ]]; then
  exit 0
fi

echo "Committing the files and pushing to remote"

# Only proceed if files have been changed
if [[ `git status --porcelain` ]]; then
  TODAY=$(date +%Y-%m-%d)

  # git config --global user.name "microCOVID Automation[bot]"
  # git config --global user.email "89503524+microcovid-automation[bot]@users.noreply.github.com"

  git add -Av
  git commit -am "[Automatic] Remove android & ios folders for snack export $TODAY"

  git push --set-upstream origin $BRANCH 

  
  # # Use the GitHub CLI to create a pull request and save the url
  # PR_URL=$(gh pr create --fill --label auto-prevalence-update)
  # echo "Pull request URL: $PR_URL"
  # if [[ ! $PR_URL = "" ]]; then
  #   if [[ $AUTOMERGE == 1 ]]; then
  #     # Set the pull request to auto merge
  #     echo "Setting auto merge"
  #     gh pr merge --auto --delete-branch --squash "$PR_URL"
  #   else 
  #     echo "Not doing any kind of a merge"
  #   fi
  # else
  #   echo "ERROR: No pull request URL generated"
  #   exit 2
  # fi
else
  echo "ERROR: No changes to add to git commit, earlier script must have failed"
  exit 2
fi

echo "✅ Successfully completed prevalence update"