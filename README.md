# Flora

# Contributing

First clone the repository and then install the dependencies:

```
git clone <url for this repo>
cd outdoor-learning
npm install
```

Even if you are not going to build/run the app it's important to run `npm install` so that the relevant typescript types are installed, code formatting by prettier is enabled, and the commit hooks are installed that check for type errors on commit.

## Adding assets to the project

To add new image assets to the project first upload them as part of this github repos ["Pre Release" release](https://github.com/jritch/outdoor-learning/releases/tag/v0.0.1-alpha) by clicking the 'pencil' edit icon and adding the new jpg/png/etc file at the bottom.

Then copy the url to the file you just uploaded (right click > Copy Link Address) into the relevant field in this project's typescript code.
