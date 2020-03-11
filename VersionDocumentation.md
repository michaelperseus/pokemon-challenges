# Pokemon Challenges Alpha Build 0.5.3.1

Version numbers are created using the following system
a.b.c.d

- a = Major Number (1 would be final release)
- b = Minor Number (Significant changes or updates have been made)
- c = Build Number (Smaller changes to the site, nothing ground breaking)
- d = Revision Number (bug fixes or very minor changes)


#### March 11, 2020 - 0.5.3.1
- All punctuation marks should now be allowed in text inputs, except alphanumber only fields (ie: usernames)

#### March 8, 2020 - 0.5.3.0
- Added censorship filter to input fields
- Increased 'Notes' character limit to 2000
- Added 1000 character limit to Comments
- Fixed issue with line breaks not being usable in comments and run notes
- Added 'Show More' option for comments and notes that go beyond a certain height

#### March 7, 2020 - 0.5.1.0
- Added Badge display to User Page
- Added warning to 'Add/Edit Pokemon' page about Gen 8 Pokemon not being supported yet
- Added Shinylocke and Eliminationlocke as run variations

#### March 6, 2020 - 0.5.0.1
- Fixed error with 'Save' button staying disabled after misspelling a Pokemon name or going over nickname limit
- Changed text on 'My Profile' from 'x runs completed' to 'x runs submitted'
- Changed 'Game List' page design to center the column when only one option is selected

### Beta Begins - March 5th, 2020

#### March 5, 2020 - 0.5.0.0
- Added 'Badges' to the model of the User

#### March 4, 2020 - 0.4.9.5
- Finished remaining tables
- Changed page reload location from home page to user page after adding a new run
- Added a confirmation prompt when deleteing a Pokemon from a run
- Added a confirmation prompt when deleting a Run
- Fixed error where user could not add a Pokemon without adding a nickname
- Moved 'Feedback' link to Navbar
- Adjusted Feedback page styling
- Changed Pokemon Nickname limit to 12 characters and added better error handling
- Fixed error where button stayed disabled after entering an invalid pokemon species
- Fixed issues with buttons being clickable outside of visible boundary

#### March 3, 2020 - 0.4.7.1
- Updates Table for Community Page

#### March 2, 2020 - 0.4.7.0
- Style updates to 'My Profile' and Community pages
- Removed old code from 'Home' page
- Added 'Most Completed' and 'Most Failed' to Home page
- Fixed issue with avatar images not updating

#### February 28, 2020 - 0.4.6.2
- Style updates to Add Pokemon and Edit Pokemon pages
- Updates to user feedback when making changes on pages mentioned above

#### February 27, 2020 - 0.4.6.1
- Additional Style Updates to News, Forgot Password and Reset Password pages

#### February 26, 2020 - 0.4.6.0
- Added Nodemailer to backend
- Completed Password Reset option

#### February 25, 2020 - 0.4.4.2
- Added 'Randomized' option for Runs
- Added Feedback Page which connects to Database
- Added additional feedback to various pages after user input (Ie: changing button text to say 'saving' after pressed')
- Added remaining 'Drayano' Hacks

#### February 21, 2020 - 0.4.4.0
- Fixed issue with console errors regarding white space
- Fixed issue with the site saying the user is still logged in after logging out on a seperate device
- Added front-end for password resetting, currently doesn't work on backend

#### February 18, 2020 - 0.4.2.9
- Added function to check for password before deleting a profile
- Additional CSS Updates

#### February 15, 2020 - 0.4.2.8
- Fixed visual bug with filter on game list page
- Updated CSS for Game List page

#### February 12, 2020 - 0.4.2.7
- Added remaining main series games

#### February 11, 2020 - 0.4.2.6
- Rewrote the CSS for the Home Page design
- Added the most recent news post to homepage for Landscape Tablet and Higher resolutions

#### February 10, 2020 - 0.4.2.5
- Fixed issue with game filter not working properly

#### February 4, 2020 - 0.4.2.4
- Fixed issue with being able to select multiple pokemon as a starter

#### February 3, 2020 - 0.4.2.3
- 'Fixed' issue with horizontal scrollbar. It's only a temporary fix as the entire table system will need to be created at a later point as proper data isnt showing on the page it should.

#### February 2, 2020 - 0.4.2.2
- Fixed issue with Nickname and Status not appearing for Pokemon on Run page
- Fixed issue with viewport not always going to top of screen when going to new page

#### January 31, 2020 - 0.4.2.0
- Updated mobile nav button
- Fixed issue with some buttons and images being clickable outside of visual border
- Fixed issue with users being logged out after uploading new avatar
- Fixed issue with the status of some Pokemon being blank when added
- Fixed issue with Pokemon being added multiple times when clicking 'save'
- Fixed issue with some games appearing out of release order
- Fixed issue with User images not having a size restriction

#### January 29, 2020 - 0.4.1.3
- Fixed issue with 'Add Pokemon' button not working
- Added more security to usernames and passwords that can be submitted
- Fixed exploit where users could enter illegal characters into text fields

#### January 29, 2020 - 0.4.1.0
- Added a 'User Notes' section to runs

#### January 28, 2020 - 0.4.0.0
- Added a new Edit Pokemon / Add Pokemon Page
- You can now set nicknames, statuses for Pokemon and choose a starter

#### January 27, 2020 - 0.3.5.7
 - Continued development of the "Edit Pokemon" page. Should be fully functional in the next update

#### January 25, 2020 - 0.3.5.6
- Added new components for Editing a Pokemon to Main App

#### January 24, 2020 - 0.3.5.5
- Added additional games

#### January 23, 2020 - 0.3.5.4
- Added additional stats to each game page as well as the community page
- Removed common functions and placed into a seperate 'common.js' file
- Minor style updates
- Fixed News Page not showing all posts

#### January 23, 2020 - 0.3.4.4
- Styling updates for tablet view

#### January 22, 2020 - 0.3.4.3
- Added react-markdown package to client
- Continued development of the News page. It should be live in the next update
- Updated various npm packages with issues
- Minor styling changes for tablet view

#### January 20, 2020 - 0.3.4.2
- Fixed issue with mobile menu not closing when clicking outside of box or moving to new page
- Added template for news page

#### January 19, 2020 - 0.3.4.1
- Added link to user in comment
- Added minor styling to comments
- Fixed issue with comments sharing the same key

#### January 18, 2020 - 0.3.4.0
- Added the ability to leave comments on runs when logged in

#### January 17, 2020 - 0.3.3.2
- Added additional security features to the server

#### January 15, 2020 - 0.3.3.1
- Added Gen 5 Games to Database
- Added 'Delete Profile' button feature
- Added Placeholder data to front page for 'Highest Rated Game'

#### January 13, 2020 - 0.3.3.0
- Added ability to upload new profile picture
- Minor changes to styling on 'My Profile' page
- Added Sinnoh Games

#### January 12, 2020 - 0.3.2.3
- Added default profile picture to accounts

#### January 11, 2020 - 0.3.2.2
- Fixed error with images uploading to the wrong server folder
- Rewrote code on the backend to prepare for profile picture feature to be added

#### January 8, 2020 - 0.3.2.1
- Added ability to filter games on search page by Original or Hack as well as generation

#### January 7, 2020 - 0.3.1.1
- Added Generation 3 Games
- Added several new run variations

#### January 6, 2020 - 0.3.1.0
- Added Renegade Platinum as a game option
- Added Most Recent Game to front page
- Updated Pokemon model on server to allow for nickname, starter and status. Will be added to the front end soon so Pokemon can be updated by user

#### January 3, 2020 - 0.3.0.0
- Updated mobile styling for remaining pages

#### January 2, 2020 - 0.2.3.3
- Added the ability to Sign Up
- Updated styling of Signup Page and Run Page

#### December 30, 2019 - 0.1.3.2
- Added runs to User Profile page
- Updated styling of Game Page, Run Table and Login Page

#### December 29, 2019 - 0.1.2.1
- Added Wedlocke and Egglocke as variations

#### December 28, 2019 - 0.1.1.1
 - Pre-Alpha Version published. Beginning of update documentation
