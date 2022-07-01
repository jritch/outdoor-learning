# Flora

## Contributing: Getting Started

1. Clone this repo to your machine
2. Run `npm install` in the root directory
3. If you're using a physical device (instead of a simulator) make sure your android or iOS device is connected via USB and you've [enabled Developer Mode](https://pytorch.org/live/docs/next/tutorials/get-started/#run-your-project) on android, or clicked "trust this computer" on your iOS device
4. Run `npm run android:device` or `npm run ios:device` to compile the app and load it onto your test device/simulator

If you haven't made any changes to the project's native dependencies since your last build then you can skip the build step (`npm run [android/ios]:device`) and simply do these steps:

1. Run `npm run start` to start the expo metro dev server
2. Press `a` to open on android or `i` to open on iOS once the expo dev server has started. This will reopen the app that was built in the initial steps above.
3. If pressing `a` or `i` doesn't work, open the app yourself on your device. It will show the expo dev client landing screen. Select "Enter URL manually" and enter the url and port shown by the metro server running on your computer, usually something like `http://192.168.1.120:8081`. Press "Connect".

## Creating builds for distribution

### Using Expo EAS

The easiest way to build the app for distribution is to use Expo's EAS service.

1. Install the expo cli ([docs](https://docs.expo.dev/workflow/expo-cli/))
2. From the root of the project run:

```
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

3. Install the app using the links provided in the terminal

_Specific notes for iOS:_

1. In order to distribute the app on iOS you'll need to have an Apple developer account with an active subscription. Android does not have a similar limitation.
2. In order to install the app on a _new_ iOS device you'll have to generate a provisioning profile and have the user install it on their device (which registers their device UDID with expo), and then build a new version of the app. See [the docs](https://docs.expo.dev/build/internal-distribution/#2-configure-app-signing) for more info.

### Building locally

See the [expo development build](https://docs.expo.dev/development/build/#locally-with-xcode-and-android-studio) docs for instructions.

## Sharing the app as an Expo Snack

_Note: this requires the PyTorch Live app, which is slated to launch in July 2022_

1. Create a new branch with the date `YYYY-MM-DD-to-snack`
2. Delete the ios and android folders, which can cause the app to not work correctly when loaded as a snack:

```
rm -rf ios android
```

3. Commit the changes and push the branch to github
4. Go to [https://snack.expo.dev/](https://snack.expo.dev/) and click the three dots next to "Project" in the left side panel. Select "Import git repository" and paste the link to directly your github **branch** (ex `https://github.com/jritch/outdoor-learning/tree/2022-06-30-to-snack`)
5. Share the new url that's generated (ex `https://snack.expo.dev/@git/github.com/jritch/outdoor-learning@2022-06-30-to-snack`)
