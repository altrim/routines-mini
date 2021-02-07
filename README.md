# Routines Mini

A Mac Menu Bar application for organizing your routines.

![Routines Mini](https://altrim.io/images/routines-mini-scheduler.gif)


I wrote a bit about the app on my blog 
- [Building a Mac Menu Bar application with React, TypeScript and Electron](https://altrim.io/posts/building-mac-menu-bar-app-with-react-typescript-electron)
- [Schedule recurring reminders with native notifications](https://altrim.io/posts/schedule-recurring-reminders-with-native-notifications)

The app is built using

- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Electron](https://www.electronjs.org/) - used to package it as Menu Bar application
- [Dexie](https://dexie.org/) - used to store the data in IndexedDB
- [Chakra](https://chakra-ui.com/) - used to build the UI

## Available Scripts

In the project directory, you can run:

### `yarn electron:dev`

Runs the app in the development mode.\
Starts the server on [http://localhost:3000](http://localhost:3000) and launches the app in the Menu Bar

### `yarn make`

Packages the app and generates platform specific distributables to the `out` folder. Uses [Electron Forge](https://www.electronforge.io/) for packaging.
