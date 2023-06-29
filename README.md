
![logo](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/634e6024-2e30-4c7d-974b-012f5b1eb32f)


# Student Guard

![WhatsApp Image 2023-06-20 at 11 00 28 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/2bfa0f2f-0246-4672-b8e1-e61e6487f167)
![WhatsApp Image 2023-06-20 at 11 00 28 AM (1)](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/20423a73-237b-4e88-aa25-31900527396c)
![WhatsApp Image 2023-06-20 at 11 00 26 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/f4544d45-851e-492d-a83c-1a38c4b5c2e8)
![WhatsApp Image 2023-06-20 at 11 00 26 AM (1)](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/4b8b8e13-011b-4abf-84f8-14d4df9aa3d5)
![WhatsApp Image 2023-06-20 at 11 00 25 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/432ae420-6de7-4a90-a333-c299636d5202)
![WhatsApp Image 2023-06-20 at 10 57 15 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/86cf5bec-44c2-49cc-839f-f9348624a035)
![WhatsApp Image 2023-06-20 at 10 57 12 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/61d395ae-8984-42f0-911c-2839a31ab5a5)
![WhatsApp Image 2023-06-20 at 10 57 10 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/4985f7e6-e183-471a-9602-880f7f305d94)
![WhatsApp Image 2023-06-20 at 10 57 07 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/1e56fa22-201c-4cc5-8764-51abad62371c)
![WhatsApp Image 2023-06-20 at 10 57 05 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/0ec779da-1c62-462d-b272-575e3f4dcc9b)
![WhatsApp Image 2023-06-20 at 10 52 04 AM](https://github.com/mohammedfarisofficial/student-guard/assets/68058442/cbfcd1e4-1dd5-4b98-a473-cca23d977a95)


*Note:* this app is using [non-trivial babel/metro configs](https://github.com/rnmapbox/maps/pull/778), so we can consume the `maps` library from parent directory directly. Regular apps don't need this complicated setup.

<br>

## What is Mapbox?

[Mapbox](https://www.mapbox.com/) is the location data platform for mobile and web applications.

<br>

## Sign up for Mapbox

Not a Mapbox user yet? [Sign up for an account here](https://www.mapbox.com/signup/). Once you’re signed in, all you need to start building is a Mapbox access token. Use this same short code with all of our interactive mapping libraries, Python and JavaScript SDKs, and directly against our REST APIs. You can create and manage your access tokens on your [Mapbox Account page](https://www.mapbox.com/account/).

<br>

## Installation

* Make sure you are in the example directory
```
cd example
```
* Create a file called `accesstoken` in the root of the example project and just paste in your [Mapbox access token](https://www.mapbox.com/studio/account/tokens/). (The `accesstoken` file is processed in postinstall, so you need to run `yarn install` after adding/changing accesstoken.)

* Install our dependencies using `yarn install`.

* Android: Set up your Mapbox developer keys as described in https://github.com/rnmapbox/maps/blob/main/android/install.md#adding-mapbox-maven-repo (no need to change build.gradle, just set up gradle.properties)

* iOS: Set up your Mapbox developer keys as described in [https://github.com/rnmapbox/maps/blob/main/ios/install.md#adding-mapbox-maven-repo](https://github.com/rnmapbox/maps/blob/main/ios/install.md#mapbox-maps-sdk-v10) (add your cerdentials to .netrc as described)


<br>


## Start React Native Packager (or not, it starts automatically 🤷‍♀️)

Open up another tab in your Terminal and run
```
yarn start
```

*Note*: if modules were added to base lib you might need to run `yarn start --reset-cache` because we're using `babel` to [rewrite imports](https://github.com/rnmapbox/maps/pull/778)

<br>

## Run Android Emulator

* Start Android emulator
* Run `yarn android` from `example` directory

### Common Issues

If the build fails make sure gradle has permission to build from cli
```
cd android
chmod +x gradlew
```

<br>

## Run iOS Simulator

You can run this with the react-native cli or Xcode

* Run `yarn ios` from `example` directory

### Common Issues

If you are using [`nvm`](https://github.com/nvm-sh/nvm), make sure you copy [ios/.xcode.env](./ios/.xcode.env) as `ios/.xcode.env.local` and modify as described inside the file.

If you run into

```
Command failed: /usr/libexec/PlistBuddy -c Print:CFBundleIdentifier build/Build/Products/Debug-iphonesimulator/RNMapboxGLExample.app/Info.plist
Print: Entry, ":CFBundleIdentifier", Does Not Exist
```

Just run the example from Xcode, it seems to be an [issue](https://github.com/facebook/react-native/issues/14423) with RN.
# student-guard
