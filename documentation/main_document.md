# Main Website Document
### Design Document

Describes each of the files in MarinePlastics pertaining to the 
website development of the website.
  
* client/src/_helpers/ChartHelpers.js:
Helper functions for client/src/Location/Charts.jsx and
client/src/SurveyEntry/SurveyCharts.jsx

* client/src/_helpers/SortHelper.js:
Helper functions for client/src/Home/Home.jsx

* client/src/About/About.js:
Code for the about page. The about page explains the Marine Plastics Monitor and
Clean Oceans International.

* client/src/About/bottle.jpg:
Image of an empty plastic water bottle that appears on the about page

* client/src/About/COI.png:
Logo for Clean Oceans International that appears on the about page

* client/src/admin/AdminListChild.jsx:
Shows on the admin page one entry in a list of current admins. Admins can remove
admin privileges.

* client/src/admin/adminPage.css:
Style sheet for the admin page

* client/src/admin/AdminPage.jsx:
Code for the admin page. The admin page can only be viewed by users with admin
privileges. It allows for admins to edit user privileges.

* client/src/admin/ProfileViewer.jsx:
Shows the profile for a user when an admin searches for a user by their email

* client/src/Footer/Footer.js:
The footer for all pages except the landing page. It is a link to the website
for Clean Oceans International.

* client/src/Header/Header.css:
Style sheet for header for pages

* client/src/Header/Header.jsx:
The header for all pages except the landing page. Includes links to each of the
pages the user is allowed to go to. These links include the link to the home
page, the survey add survey page if the user is logged in, the protocol page,
the about page, the admin page if the user is an admin, the profile page if the
user is logged in, and either a link to log in or log out.

* client/src/Home/home.css:
Style sheet for the home page

* client/src/Home/Home.jsx:
Code for the home page. The home page has a list on the left side of the beaches
where surveys have been conducted and submitted. On the right side is a map that
shows the location of the different beaches. Users can search beaches, change
how the beaches are ordered, or choose to only view the list of beaches or the
map.

* client/src/Home/LocationBar.jsx:
Displays one item in the list of beaches displayed on the home page. Shows the
coordinates of the beach. If the user clicks on the box of a beach, it shows a
list of dates of the surveys that have been submitted, and a link to the
location page for the beach.

* client/src/Landing/beach-edit.jpg:
The background picture that displays on the landing page. It is an image of
waves on a beach.

* client/src/Landing/landing.css:
Style sheet for the landing page

* client/src/Landing/Landing.js:
Code for the landing page, which is the first page a user arrives to. It has a
link for the user to either log in or continue as a guest, or just continue if
the user is already logged in.

* client/src/Location/Charts.jsx:
Histogram and pie chart describing the total amount of trash per type of survey
found on a specific beach and the percentage of each type of debris,
respectively. On the location page.

* client/src/Location/Location.jsx:
Code for the location page. Includes histogram, pie chart, and list of surveys
made on the beach, given by the survey date. Also shows map of the beach
location.

* client/src/Map/Map.css:
Style sheet for map

* client/src/Map/Map.js:
Code for Google Map used on home page and location page. Has markers displaying
the locations of the beaches.

* client/src/NewSurveyForm/SurveySubsections/AccumulationSurvey.jsx:
Code for the accumulation survey subsection of the add survey page

* client/src/NewSurveyForm/SurveySubsections/MicroDebrisSurvey.jsx:
Code for the micro debris survey subsection of the add survey page

* client/src/NewSurveyForm/SurveySubsections/Review.jsx:
Code for the review page. Allows users to review
the information entered in the survey before submitting it.

* client/src/NewSurveyForm/SurveySubsections/SurfaceRibScan.jsx:
Code for the surface rib scan subsection of the add survey page

* client/src/NewSurveyForm/SurveySubsections/SurveyArea.jsx:
Code for the survey area subsection of the add survey page

* client/src/NewSurveyForm/SurveySubsections/TeamInformation.jsx:
Code for the team information subsection of the add survey page

* client/src/NewSurveyForm/SurveySubsections/Totals.jsx:
Code for the totals subsection of the add survey page

* client/src/NewSurveyForm/TableRows/AccumulationSurveyRow.jsx:
One row for the accumulation survey subsection

* client/src/NewSurveyForm/TableRows/ASRowReview.js:
One row for the data entered from the accumulation survey, in the review page

* client/src/NewSurveyForm/TableRows/MDSRowReview.js:
One row for the data entered from the micro debris survey, in the review page

* client/src/NewSurveyForm/TableRows/ReviewTable.js:
One row for the data entered from the surface rib scan, in the review page

* client/src/NewSurveyForm/TableRows/RibScanRow.jsx:
One row for the surface rib scan subsection

* client/src/NewSurveyForm/accordion-styles.css:
Style sheet for the accordion of survey subsections on the add survey page

* client/src/NewSurveyForm/BeachSearch.jsx:
The dropdown box of a list of beaches that have surveys submitted for
autofilling information in the survey area subsection

* client/src/NewSurveyForm/debrisInfo.js:
List of the different types of debris for the surface rib scan and accumulation
survey subsections

* client/src/NewSurveyForm/SurveyForm.jsx:
Code for the add survey page. It first shows an accordion of the different
survey subsections and a review button. When the user clicks on the review
button, if the data entered is invalid, a message at the top of the page
explains what errors the user needs to fix. If the data entered is valid, the
page then displays all of the information entered on a review page, along with
a submit button at the bottom and a button at the top to go back to the input
page to change the information entered. When the user clicks on the submit
button, the survey is submitted to the database, a confirmation is displayed,
along with a link to the home page and a button to add another survey.

* client/src/PageNotFound/notFound.css:
Style sheet for the page not found page

* client/src/PageNotFound/PageNotFound.js:
Code for the page not found page that explains that the user tried to access a
page that doesn't exist. Also includes a link back to the home page.

* client/src/Protocol/COI.png:
Logo for Clean Oceans International on the protocol page

* client/src/Protocol/Protocol.js:
Code for the protocol page. Explains the importance of the project and why it is
important to follow the protocol found in the link to the shoreline plastic
monitoring field guide. Also has a link to the most current data sheet to
conduct a survey.

* client/src/SurveyEntry/editableTable.jsx:
Creates table for data on surface rib scan or accumulation survey, where user
can edit the data. Used in surveyEntryEdit.jsx.

* client/src/SurveyEntry/SurveyCharts.jsx:
Creates bar chart and pie chart to display on survey page. Uses 
../_helpers/ChartHelpers.js. Used in SurveyEntry.jsx.

* client/src/SurveyEntry/surveyEdit.css:
Style sheet for the survey edit page

* client/src/SurveyEntry/surveyEntry.css:
Style sheet for the survey edit page and the survey page

* client/src/SurveyEntry/SurveyEntry.jsx:
Code for the survey page that displays all of the data on a survey, including a
pie chart showing the percentages of each type of data for the surface rib scan
or the accumulation survey. Uses SurveyCharts.jsx and SurveyTableRow.jsx.

* client/src/SurveyEntry/surveyEntryEdit.jsx:
Code for survey edit page, that allows users to edit the survey. Accessible by
clicking on the edit survey button in the survey page. Uses editableTable.jsx
and SurveyTableRow.jsx. 

* client/src/SurveyEntry/SurveyTableRow.jsx:
Code to create a row for the surface rib scan or accumulation survey data. Used
by SurveyEntry.jsx and surveyEntryEdit.jsx.

* client/src/Tests/__snapshots__/Review.test.js.snap:
Snapshot for testing rendering the Review component at
client/src/NewSurveyForm/SurveySubsections/Review.jsx using
client/src/Tests/Review.test.js

* client/src/Tests/Review.test.js:
Tests the Review component at
client/src/NewSurveyForm/SurveySubsections/Review.jsx using
client/src/Tests/Review-test-data.js

* client/src/Tests/Review-test-data.js:
Test variables for client/src/Tests/Review.test.js

* client/src/Tests/SurveyForm.test.js:
Tests the methods in the SurveyForm component at
client/src/NewSurveyForm/SurveyForm.jsx using
client/src/Tests/SurveyForm-test-data.js

* client/src/Tests/SurveyForm-test-data.js:
Test variables for client/src/Tests/SurveyForm.test.js

* client/src/UserProfile/UserProfile.jsx:
Code for the profile page. Shows image for user, user's email, and a button to
log out

* client/src/App.css:
Main style sheet for the website

* client/src/App.jsx:
The main component from which the website is rendered, and handles all of the
client-side routing

* client/src/Auth.js:
Contains the configuration code for implementing to auth0's WebAuth class, and
handles authentification as well as authorization and role checking, and
obtaining profile information

* client/src/index.js:
First file that is run, which calls the App component from client/src/App.jsx.
Controls whether or not the app allows user to work on it offline. Currently
that option is disabled.

* client/src/serviceWorker.js:
Code that controls how the website runs in production

* pdfs/COIDataSheet_2020.pdf:
Most recent data sheet linked on the protocol page

* pdfs/ShorelinePlasticMonitoringFieldGuide.pdf:
Instructions on how to conduct a survey linked on the protocol page

* routes/auth0.js:
Handles user permission calls, role changes, and profile searches for admins

* routes/dataEntry.js:
Handles all endpoints that are related to beach and survey queries, as well as
any updates to any survey data

* server_modules/joi-validation.js:
Handles all of the form validation functions to ensure that the data is
sanitized and within proper constraints. Adding new debris categories may need
to be reflected here by adjusting the maximum size of the SRSDebris and ASDebris
categories.

* server_modules/mongoose.js:
Exports functions used in /routes/dataEntry.js to create, read, update, and
delete form and beach data

* server_modules/mongooseSchemas.js:
Defines the schemas used to store survey and beach data. If any changes need to
be made to the form (excluding the debris types), it would need to be made here.

* server.js:
Sets up the different software parts of the app, including the database and
linking

### How to : Add Download Link
The following is a list of instructions that is used to add a new downloadable
link to the website:
1. Upload new file as a PDF to pdfs/
2. In server.js, add the following line along with the rest of the lines
   starting with app.get:
   app.get('/pdfs/<new-file-name>',
   (req, res) => res.sendFile(path.join(__dirname, '/pdfs/<new-file-name>')));
   where <new-file-name> is the name of the file for which you are creating a
   link.
3. In the file for the page where you want the link to be, add the following
   line:
   <a href="pdfs/<new-file-name>.pdf" download><description-of-document></a>
   where <description-of-document> is the clickable text to download the link.
4. Redeploy. Unfortunately, although you can download the datasheet in
   development mode, the PDF file becomes corrupted and cannot be open. You
   have to fully test this in deployment mode.

### How to : Update Datasheet
The following is a list of instructions that is used to replace downloadable
link with another file.
1. Upload new datasheet file as a PDF to pdfs/
2. In server.js, replace both instances of the previous datasheet path with the
   new datasheet path. 
3. In client/src/Protocol/Protocol.js, replace the previous datasheet path with
   the new datasheet path.
4. Redeploy. Unfortunately, although you can download the datasheet in
   development mode, the PDF file becomes corrupted and cannot be open. You
   have to fully test this in deployment mode.
   
Note: updating training field guide is almost identical to the above
instructions.

### How to : Update Survey
The following is a list of instructions that is used to make an update to
the survey form page.
1. Add new updates in appropriate subsection file of the survey found in
   MarinePlastics/client/src/NewSurveyForm/SurveySubsections.
2. If you are adding an entire new field, add variable in validate() in
   MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx.
3. If you are adding an option to an existing field, add the possibility of it
   being checked in its corresponding if-statement in validate() in
   MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx.
4. If you are adding an option to an existing field, add the option in
   updateDisplayStrings() in
   MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx.
5. If you are adding/changing the options in the rib scan/accumulation sweep,
   make the changes in MarinePlastics/client/src/NewSurveyForm/debrisInfo.js.
5. Update MarinePlastics/client/src/NewSurveyForm/SurveySubsections/Review.jsx.
6. Update prepareForm() in
   MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx.
7. Update schemas in MarinePlastics/server_modules/mongooseSchemas.js. If you
   created a new section for checkboxes, you should create a new schema for it,
   and add it to surveySchema.
8. Update joi-validation.js to accept the new changes.

### Micro Debris Changes
The following is a list of changes made to allow surveys to submit micro debris data:
* First:
  * Deleted MarinePlastics/client/src/SurveyForm/. This was an older folder that is no longer in use.
  * Removed the import of MarinePlastics/client/src/SurveyForm/ChooseForm.jsx, in MarinePlastics/client/src/App.jsx. 
  * Removed ‘/chooseform’ from headerRoutes in MarinePlastics/client/src/App.jsx.
  * Removed path creation using ChooseForm in MarinePlastics/client/src/App.jsx.
* Added the following in MarinePlastics/mongooseSchemas.js:
  * getMDSTotal
* Edited the following in MarinePlastics/mongooseSchemas.js:
  * surveySchema
  * surveySchema.methods.getAllDebris
  * surveySchema.methods.getAllDebrisNeg
  * dayTotalsSchema
* Edited the following in MarinePlastics/mongoose.js:
  * surveys.update
  * surveys.addToBeach
  * editedSurvey
  * createdSurvey
* Edited the following in MarinePlastics/joi-validation.js:
  * surveyDataSchema
* Added the following in MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx:
  * calcTotalsMDS()
  * updateMDS(e)
* Edited the following in MarinePlastics/client/src/NewSurveyForm/SurveyForm.jsx:
  * constructor(props)
  * prepareForm()
  * showInputPage()
  * showReviewPage()
* Edited the following in MarinePlastics/client/src/NewSurveyForm/SurveySubsections/MicroDebrisSurvey.jsx:
  * render()
* Edited the following in MarinePlastics/client/src/NewSurveyForm/SurveySubsections/Review.jsx:
  * render()
  
### Changes for user to view and edit surveys
This lists the changes made to fix the location, survey, and survey edit pages.

1. Edited sumTotals(surveys, type) in client/src/_helpers/ChartHelpers.js to be
   able to calculate total micro debris.
2. Edited all methods in client/src/Location/Charts.jsx and added new method
   showBarData() to show a bar chart for micro debris data.
3. Edited all methods in client/src/SurveyEntry/SurveyCharts.jsx and added new
   method showBarData() to show a bar chart for micro debris data.
4. Added information on micro debris to display on survey page by modifying
   render() in client/src/SurveyEntry/SurveyEntry.jsx.
5. Added information on micro debris to display but not yet edit on survey edit
   page by modifying constructor(props), save(), and render().
6. Added allDebrisInfo, allDebrisInfoID, allDebrisNames,
   getAllDebrisNameById(), getAllDebrisID(debrisName), and getAllDebrisMap() to
   client/src/NewSurveyForm/debrisInfo.js, and import getAllDebrisMap into
   client/src/SurveyEntry/SurveyEntry.jsx and
   client/src/SurveyEntry/surveyEntryEdit.jsx to display categories of debris
   for old surveys that have been renamed.
