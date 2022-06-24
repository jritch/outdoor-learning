# Flora

# Getting started

1. Clone this repo to your machine
2. Run `npm install` in the root directory
3. Run `npm run android:device` or `npm run ios:device` to compile the app and load it onto your test device/simulator

If you haven't made any changes to the project's native dependencies since your last build then you can skip the build step and simply do these steps:

1. Run `npm run start` to start the expo metro dev server
2. Press `a` once the expo dev server has started to reopen the hackathon app that was built in the previous steps.
3. If pressing `a` doesn't work, open the hackathon app yourself on your device. It will show the expo dev client landing screen. Select "Enter URL manually" and enter the url and port shown by the metro server, usually something like `http://192.168.1.120:8081`. Press "Connect".
