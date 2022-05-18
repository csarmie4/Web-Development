# Fullstack Application Project

## Overview

In this project, you will build a "crowdsourced data application". You will use all of the technologies you have learned (HTML, CSS, JS, Node.js, Express, Handlebars, and MySQL) to create an API and front-end website.

First, select a topic for your project to be on. Example topics include:
- Movie Reviews
- Local Restaurants
- Clubs and Activities

Topics should ideally be people/places/things that can be crowdsources by users of your application. This project is largely open ended. The breakdown of grading is in the `Specifications` below. Outside of that, you are free to be creative with your app.

## Specifications

Create a new npm project from scratch (using `npm init`) and create an express full-stack application, similar to the one we made in class, that meets the following specifications.

In addition to these specifications, you will also need to fill out a file called `documentation.md` that documents the parts of your project. follow the `document_example.md` file (uploaded to canvas) to create your documentation.


1. Data Storage
- Data should be stored in a MySQL database using the Sequelize library. Your table(s) should be generated from a sequelize model like how the `Post` model was in class. You should not have to manually write SQL to set up your table, other than creating your database.
- (5) At least one table should be created this way.
- (5) Your table(s) should have at least 5 columns (excluding the id, created_at, and updated_at columns)
- In `documentation.md`, specify each of the fields in your data.

2. Adding new data
- Users should be able to add data to your database in two ways:
- (10) Submitting an HTML form.
- (10) Send a POST request to an API endpoint.
- In `documentation.md`, you will document the endpoints and request body to add new data.

3. Viewing data
- The HTML pages should be generated using Handlebars.
- (10) The home '/' route should display every data record in an HTML page.
- (10) A GET endpoints should return all data records as JSON.
- In `documentation.md` you will need to include the route for the API endpoint that returns all data.

4. Search Data
- (10) On the home page, there should be a search bar that searches an appropriate field. It should check that the search query is a substring of the field it is searching.
- (5) Make the field "auto-updating". meaning that the results update every keystroke, rather than using a search button.
- (5) If there is no match, display some text indicating there are no matches.
- In `documentation.md` you will need to include which field you chose to conduct the search on.

5. Navigation Pages
- On the home page, you should also have a navigation bar. This navigation bar should have 5 links. As an example, for a movie reviews app, we could have:
    - Best movies: Lists all movies rated 5 stars
    - Worst movies: Lists all movies rated 1 star
    - Alphabetical: Lists all movies alphabetically
    - Select a director: Displays a list of directors that you can use to filter results
    - Random movie: Showcases a random movie.
- (15) 5 pages linked to from the navigation bar that display the appropriately filtered data.
- (5) the navigation bar is visible on each page.
- In `documentation.md` you will need to include each of the 5 navigation filters and the routes for each of the additional pages.

6. Other
- (5) The website should look "somewhat aesthetic".
- (5) `documentation.md` is created and completely documents your project as specified above. Check `documentation_example.md` for an example.

## Submission

1. Submit a .zip file of your entire directory
    - Delete your `node_modules` folder before submitting
    - Make sure to include your `documentation.md` file
