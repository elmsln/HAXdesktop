# About 
This is an Electron platform that integrates with HAX editor. It includes the [unbundled-webcomponents](https://github.com/elmsln/unbundled-webcomponents) repository.
## Installation
Before running the application. You have to install the appropriate modules in different folders first.
1) Run `npm install` at the root folder of this repo (HAXdesktop)
2) Run `cd app/unbundled-webcomponents`, the "unbundled-webcomponents" is the folder that has the build tools that will build the HAXeditor
3) Run `yarn install`
4) Run `yarn run build`, this will initialize the HAXeditor. The build for the HAXeditor is located in app/unbundled-webcomponents/app/dist

## Running the application
At this point, the necessary boilet plate assets should be initialized. You can go back to the HAXdesktop folder to start the app

1) Run `cd ../../` to get back to the root folder
2) Run `npm start` to start the electron app


## Packaging and Distribution
This Electron project uses [electron-forge](https://www.electronforge.io/) for packaging and distributions. Check out their documentation for more configuration options. All packaged distributions will be located in the `out` folder at the root directory
### Packaging
1) Run `npm run package` at the root folder, a packaged application that's specific to your current platform will be in the `out` folder

### Distributions
1) Run `npm run make` at the root folder, this will created different distributions of the application for different platforms in the `out/make` folder. This is configurable, check out [electron-forge](https://www.electronforge.io/) for further details.
