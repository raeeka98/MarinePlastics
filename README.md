  # Marine Plastics Monitor
  ### Sponsored by [Clean Oceans International](https://cleanoceansinternational.org/)
  ### Live site: https://marineplastics.herokuapp.com/

  A web application for people to view and input data collected at beach clean-ups around the world. 

  ## Getting Started

  ### Prerequesites
  Need access to our accounts on (need to contact one of the developers)
  * Heroku
  * MLab
  * Auth0

If want to update the data sheet, need to contact a developer or COI for a Word doc version.

### Installing
1. Clone the repo: `git clone https://github.com/noll115/MarinePlastics.git`
2. Install the dependencies: `npm install` then `cd client && npm install`
3. Run the development environment in marineplastics folder: `npm run dev`

### Deploying
To deploy to the live site: https://devcenter.heroku.com/articles/git
  1. Sign into Heroku in terminal
  2. Add a remote to the existing Heroku site
  4. Deploy with `git push heroku master`
If the site breaks, view the logs on Heroku for an error

***

In `./src/Auth.js`, authentication is set up with environment variables pulled from a hidden .env file. Contact one of 
the developers for details.

## Built With
* [ReactJS](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Auth0](https://auth0.com/)
* [MLab](https://www.mlab.com/)
* [React Google Maps](https://github.com/tomchentw/react-google-maps)
* [React Chart Kick](https://github.com/ankane/react-chartkick)
* [Mongoose](http://mongoosejs.com/) - for setting up our database schemas
* [Axios](https://github.com/axios/axios) - for interacting with our API
* [Heroku](http://heroku.com/)

## General Repository Structure
* /client
  * Contains all source files for client-side code, mainly under /src
  * Each page and major component of the website has its own folder attributed to it, and within each folder there are .jsx (React) files that implement such components.
  * App.jsx is the main component from which the website is rendered, and handles all of the client-side routing
  * Auth.js contains the configuration code for implementing to auth0's WebAuth class, and handles authentification as well as authorization and role checking, and obtaining profile information
  * Note: If you want to edit or create new trash definitions on the form, then those changes must be reflected in the NewSurveyForm/debrisInfo.js file, which contains all of the debris listed in the current data sheet.
* /routes
  * auth0.js Handles user permission calls, role changes, and profile searches for admins
  * dataEntry.js handles all endpoints that are related to beach and survey queries, as well as any updates to any survey data.
* /server_modules
  * joi-validation.js Handles all of the form validation functions to ensure that the data is sanitized and within proper constaints. Adding new debris categories may need to be reflected here by adjusting the maximum size of the SRSDebris and ASDebris categories
  * mongoose.js Exports functions used in /routes/dataEntry.js to create, read, update, and delete form and beach data.
  * mongooseSchemas.js Defines the schemas used to store survey and beach data. If any changes need to be made to the form (excluding the debris types), it would need to be made here.

## Product Backlog
There is a lot that we would still love to see happen:
  * Add in backend support for Micro Debris data
  * Add diagrams and pictures to the protocol segment of the about page
    * Could definitely use the diagrams from the final presentation (export them as SVGs so they look nice and are scalable)
  * Add video demonstration of the protocol process
    * Currently collaborating with COI to obtain the video, contact them for more updates.
  * More complicated, refined data visualizations
    * Would need to talk to COI about what they want
    * Possibly change color of location icon on the map based on how much plastic was picked up at that beach
  * Make the survey form mobile responsive
    * Form should collapse to a single column if viewport is under certain width
  * Pages for organizations
    * Include users/cleanups attached to the organization
  * CSV Support
    * Export CSV of all the data (could use either axios or mongoose)
      * Might be helpful: https://github.com/axios/axios/issues/448
      * Might be helpful: https://www.npmjs.com/package/mongoose-to-csv
    * Potential - accept CSV file of clean-up data (so could import multiple at once)
    
## Developers (Contact for recent information):
* Cassia Artanegara: cartaneg@ucsc.edu
* Frank Kohn: fkohn@ucsc.edu
* Justin Law: jllaw@ucsc.edu
* Nelson Perez: neeperez@ucsc.edu
* Noel Gomez: nogomez@ucsc.edu
* William Koch: wckoch@ucsc.edu


## Previous Developers:
* Guita Vahdatinia - gvahdati@ucsc.edu
* Kianna Mark - kjmark@ucsc.edu
* Michael Pluguez - mpluguez@ucsc.edu
* Megan Sharp - mesharp@ucsc.edu
* Lee White - lnwhite@ucsc.edu
* Vincent Wu - vwu5@ucsc.edu
