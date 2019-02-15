# FireRPS
An online multiplayer Rock-Paper-Scissors game built with Firebase, React.js, and Redux.js
## Table of Contents
* [View Live Site](#view-live-site)
* [Developer](#developer)
* [About this project](#about-this-project)

## View Live Site
[https://semlak.github.io/rock-paper-scissors-firebase-react-redux/](https://semlak.github.io/rock-paper-scissors-firebase-react-redux/)
<!-- ![ScreenShot](readme_img/Landing.png) -->

## Developer
FireRPS was solely developed by [Joseph Semlak](https://github.com/semlak).

## About this project
You can play an online Rock-Paper-Scissors match against another real online player. You can sign in, view available players, choose another online user to play against, and actually play the match (first to win 3 games).

* [Technologies Used](#technologies-used)
* [How It Works](#how-it-works)
<!-- * [Structure of Project](#structure) -->
* [Start Locally](#start-locally)

## Technologies Used
* **Frontend**
    * React.js/Redux.js
    * JavaScript
    * Bootstrap/react-strap 
    * HTML
    * CSS

* **Backend**
    * Firebase Real-time database
        * Google and Github OAuth authentication via Firebase
* **Testing**
    * Jest/Mocha
        
## How It Works
<!-- ![ScreenShot](readme_img/Landing.png) -->
1. Create Profile
  * Click the "Log In/Sign Up" button in far right of the top Navbar  A modal should open that allows login/registration via email/password or Github/Google Sign In.
    * Register by selecting the registration tab and providing displayName/email/password details.
    * Register/Sign in with Github or Google OAuth service.

    * #### For the registration form:
      * This is just a demonstration app, and you do not have to provide real information
      * Password: 6 characters or greater
      * Email: must be a valid-looking address, but does not have to be real.
    * #### For the Google/Github OAuth
      * These services are implemented through Firebase and are reasonably secure.
      * Some of your personal information is provided from the providers, such as display name, photo, email, whether the email is verified, etc ...
        * Only your display name and phote image is used in the App.
        * The information received is not used for any purposes other than authentication and displaying your name and profile image in this application.

<!-- ![ScreenShot](readme_img/Login.png) -->
<!-- Create a user profile with details of your home location and internship locations such as city, country and currency code.  -->

2. Opponent Selection: Select another online player to play game
<!-- ![ScreenShot](readme_img/Journal.png) -->
 You are shown a list of players currently online. Note that since this is just a demo application, you might be the only one available.
  * You can create a second user to try out the game, using another fake email in a separate browsing session (such as incognito in Chrome).
 Only the online players who are not currently in a game should be selectable. Select an available player to start a game.
  * The game is automatically started; the other player is not asked whether to accept the match, but they can chose to end the match rather than play.

3. Begin Game Play
  * You and the other player are both provided with the options of playing Rock, Paper, or Scissors.
    * If you play first, your opponent will be notified that you are waiting, but does not see what you played.
    * If your opponent plays first, you will be notified but will not see what your opponent played.
  * Once both of you make your play, the application determines the round winner, and the scores and round number are updated on screen.
  * You just continue the match with the same procedures until one of the players wins 3 rounds.

4. End Game
  * Right now, the match ends fairly unceremoniously. You are just told whether you won or lost.
  * The match screen will remain visible until one of the players hits the "End Match" button, at which point the application will return to the opponent selection screen.

5. In-Game Chat (to be implemented)

<!-- ## Structure of Project                                                                                                                                                                                                                  -->
<!-- After you clone the repository, navigate to the root directory (project-three). The project directory structure is set up as follows:                                                                                                      -->

<!-- * Server.js: This file:                                                                                                                                                                                                                  -->
<!--     * Defines and requires the dependencies, including axios, express, body-parser, morgan logger, mongoose, passport                                                                                                                    -->
<!--     * Sets up the Express server                                                                                                                                                                                                         -->
<!--     * Sets up the Express server to handle data parsing use body-parser                                                                                                                                                                  -->
<!--     * Sets up the logger                                                                                                                                                                                                                 -->
<!--     * Sets up passport                                                                                                                                                                                                                   -->
<!--     * Points the server to the API routes                                                                                                                                                                                                -->
<!--     * Defines the port the server is listening on                                                                                                                                                                                        -->
<!--     * Starts the server                                                                                                                                                                                                                  -->
<!--     * Allows the app to serve static content from the public directory                                                                                                                                                                    -->

<!-- * models: Contains chapter.js, expense.js, index.js, needs.js and user.js files which contain the information for the application to set up the database                                                                                 -->

<!-- * controllers: Contains chaptersController.js, countryConroller.js, expenseController.js, needsController.js and usersController.js which contain the information fo the various pages for the application to interact with the database -->

<!-- * routes: Contains API folder and index.js file                                                                                                                                                                                          -->
<!--     * API folder contains chapters.js, country.js, expense.js, index.js, needs.js and user.js files that sets up routers for each page                                                                                                   -->
<!--     * index.js file compiles all the routes for the app to use                                                                                                                                                                           -->

<!-- * scripts: Contains the build.js, seedDB.js and start-client.js generated by create-react-app                                                                                                                                            -->

<!-- * client: Contains public and src folders                                                                                                                                                                                               -->
<!--     * public: Contains generated documents from create-react-app                                                                                                                                                                         -->
<!--     * src: Contains components file, pages file, utils file, App.js, index.js, index.css, country_codes.json, currencycodes.json, city-list.json                                                                                         -->
<!--         * Components : Contains folders for each React component including, Forms, Sidebar, Login, TopNav and Users                                                                                                                      -->
<!--         * Pages: Contains folders with files for each page of the application including Journal, Expenses, Location, Requirements and NoMatch                                                                                            -->
<!--         * Utils: Contains API.js, util.js                                                                                                                                                                                                -->
<!--             * API.js: Contains API calls the database for each page, API calls for images and NYTimes search                                                                                                                             -->
<!--             * util.js: Contains API calls for OpenWeather API                                                                                                                                                                            -->
<!--             * App.js: This is where the application components are imported and rendered                                                                                                                                                 -->
<!--             * index.js: This is where the App.js file is imported; making this the highest-level file in the react app                                                                                                                   -->
<!--             * index.css: external stylesheet                                                                                                                                                                                             -->
<!--             * currencycodes.json: Contains currency codes in json format for expenses page                                                                                                                                               -->
<!--             * 3166-1-alpha2.json and country_codes.json: Contain country codes for user registration and use throughout the app                                                                                                          -->

<!-- * package.json: Contains a list the project dependencies and contains scripts to start the server, create builds and seed the database                                                                                                   -->

<!-- * nodemon.json: Contains language that tells the server to ignore the client folder when starting                                                                                                                                        -->

<!-- * eslintrc.json: Contains rules for running and using eslint                                                                                                                                                                             -->

<!-- * yarn.lock: Contains the dependency tree for this project.                                                                                                                                                                              -->

<!-- * .gitignore: Contains the files to be ignored by GitHub when committing                                                                                                                                                                  -->

## Start Locally
This section will walk you through some of the steps to set up this application to run locally on your computer.

If you just want to try out the game, you have to set up this project locally; you can just [View the Live Site](#view-live-site).

 
1. Clone the repository
Start by cloning this project to a local directory on your computer. Run the following commands
```
git clone git@github.com:semlak/rock-paper-scissors-firebase-react-redux.git
#  or via HTTPS
git clone https://github.com/semlak/rock-paper-scissors-firebase-react-redux.git
```
Change into the directory
```
cd rock-paper-scissors-firebase-react-redux
# or whatever project directory you picked
```

        
2. If not already installed, install Node.js.  
If you don't already have node installed you can install the latest version [here](https://nodejs.org/en/)


3. Install yarn  
Yarn is a package manager used to install the dependencies and start the application locally. 
It is recommended that you install using your operating package manager. However, you can install `yarn` with `npm` run the following command:
```
npm install -g yarn
```

4. (Optional) Install firebase-tools globally. Used if you want to deploy to a firebase-hosted site.
```
yarn global add firebase-tools
# OR
npm i -g firebase-tools
```
 
5. Install dependencies
```
yarn install # or npm install
# since project was developed with yarn, the yarn.lock controls the versions of all dependencies,
# and so is more likely to result in a stable installation than npm install.
```


6. Start your development server  
During development, you have a React Development Server that watches your files for changes and automatically reloads the application in the browser.
To Run:
```
yarn start
```
Your browser should automatically open and run on http://localhost:3000.
