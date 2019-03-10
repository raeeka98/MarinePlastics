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
3. Run the development environment in marineplastics folder: `npm run start`

### Deploying
To deploy to the live site: https://devcenter.heroku.com/articles/git
  1. Sign into Heroku in terminal
  2. Add a remote to the existing Heroku site
  4. Deploy with `git push heroku master`
If the site breaks, view the logs on Heroku for an error


In `./src/About/About.js` there is a link to our data sheet. Instead of hosting the pdf on our site, we host it [on scribd](https://www.scribd.com/document/380752641/COIDataSheet). This was because we use `React Router`, when we tried to add a link that to download like this:
```
  <a href="./src/About/About" download>Data Sheet</a>
```
it would link to a blank page on our site instead. There has to be a way around this, we just didn't have time to figure it out.

***

In `./src/Auth.js`, authentication is set up with:
```
  auth0 = new auth0.WebAuth({
    domain: 'marine-plastics.auth0.com',
    clientID: 'MeGxwCE1JVNy9jsRYPWzqebekosCVRDN',
    redirectUri: 'http://localhost:3000',
    audience: 'https://marine-plastics.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email profile'
  });
```

## Built With
* [ReactJS](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Auth0](https://auth0.com/)
* [MLab](https://www.mlab.com/)
* [React Google Maps](https://github.com/tomchentw/react-google-maps)
* [React Easy Chart](https://github.com/rma-consulting/react-easy-chart)
* [Mongoose](http://mongoosejs.com/) - for setting up our database schemas
* [Axios](https://github.com/axios/axios) - for interacting with our API
* [Heroku](http://heroku.com/)

## Product Backlog
There is a lot that we would still love to see happen:
  * Add on hover to pie charts that display the percentage
    * Might be helpful: https://rma-consulting.github.io/react-easy-chart/pie-chart/index.html#mouseHandlers
  * Add diagrams and pictures to the protocol segment of the about page
    * Could definitely use the diagrams from the final presentation (export them as SVGs so they look nice and are scalable)
  * Ability to update existing entries belonging to user
    * Might be nice if it was a table that had each entry as a row and the columns be the different form fields
  * Admin user role
    * Should be able to edit all entries
    * Might be helpful: https://auth0.com/rules/roles-creation
  * More complicated, refined data visualizations
    * Would need to talk to COI about what they want
  * Add search bar to map, could be on home page too instead of its own page
  * Pages for organizations
    * Include users/cleanups attached to the organization
  * CSV Support
    * Export CSV of all the data (could use either axios or mongoose)
      * Might be helpful: https://github.com/axios/axios/issues/448
      * Might be helpful: https://www.npmjs.com/package/mongoose-to-csv
    * Potential - accept CSV file of clean-up data (so could import multiple at once)
## Developers:
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
