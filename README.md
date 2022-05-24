# downStream Documentation

This project was created by -- link names here

## Installation

To run this app you can install all necessary packages by running in the terminal:

### `npm install`

## Usage Reccomendations

When using the search feature it suggested that you only select one streaming platform for your results. This is due to some inconsistencies in the external api and complications in returning the correct watch link. Due to the limited amout of time, we didn't have the chance to experiment more with data validation.

---

## Process Flow

### Home Page

**Home.js**

_image here_

- The first page that the user will see, consisting of the app logo and 3 options: Sign up, Start/Play, and Log In
- Sign Up - Navigates the user to a page to create a user account.
- Play Icon - The play icon is a link to the main feature of the app which is a search page. This can be used without signing up or logging in.
- Log In - Navigates the user to a page where they can log in to their account.

### Sign Up Page

**SignUp.js**

_image here_

- Consists of a form for the user to enter their details and create an account.
- An error is raised if the user’s enters a date of birth that makes them under 16 years old.
- An error is also raised if the user enters an email that is linked to an existing user account.
- As the free version of the external WatchMode api is limited to the USA, we only have that option in the “Country” dropdown.
- When the user enters valid details and clicks the “Sign Up” button, they will be navigated to the Log In page.

### Log In Page

**LogIn.js**

_image here_

- Has a form to log into the app with the user’s account details.
- An error is raised if the email and password combination entered doesn’t match any user accounts saved in the database.
- The “Log In” button will navigate to the Search page.
- There is a link to the Sin Up page, if the user hasn’t signed up yet.

### Search Page

**Search.js**

_image here_

- The page heading has a personalised greeting for the user. Otherwise it will display “Hello Stranger”, if no one is logged in.
- The user can select multiple options for: streaming platforms, genres and whether they want a tv show or film.
- The Submit button takes the user's selections to run an api call to the WatchMode api. Then navigates to the Results page.

**Error Message**
The "Submit" click function has to be called on the initial page render because for some reason the global states set on this page won't set on the first click. This means that our user would have to click "Submit" twice which isn't ideal.

To get around this, an initial click function call happens on first render, which has no effect as no selection have been made. Then when the user clicks to submit their selections, the global states will set first time.

Unfortunately this means that the error message below the "Submit" button is always on display, but is a minor detail in exchange of avoiding the user from having to click "Submit" twice.

This is something that we would’ve worked to figure out by learning more about Redux and/or the useReducer Hook. However, getting 2 global states to set on such a complex page already took up quite a lot of time.

### Results Page

**Results.js** with child components: **MainResult.js** and **MoreSuggestions.js**

###### MainResult.js

_image here_

- Has a heading that includes the platforms that the user selected and the show or film returned from their search.
- There is a card that includes an image of the show result and some key details.
- - The details of the main result include:
    - The title
    - A plot overview
    - A watch link
    - A link to the result’s IMDb page
    - A heart icon to save the result to their favourites
    - A brief breakdown of the the result's platform, genre, type and content rating.
- The heart icon will save the show to the user’s favourites when clicked, and remove from the favourites when un-clicked.

###### MoreSuggestions.js

_image here_

- Below the main result section, there are 4 more suggestions of shows to watch.
- - Each suggestion includes:
    - The show/film title
    - A link to the IMDb page for more information
    - A link to watch by clicking on the title or image
    - A heart icon to add or remove from the users favourites
- The suggestion are not supposed to be similar to the main result, as the Search page picks random shows or films based on the chosen platform, genre and media type. This ensures that the user receives 5 random options based on their search requirements, and not 4 options simialar to the 1st option.

### Error Page

**Error.js**

_image here_

- The error page would display when the search returns 0 results. However, from testing this out 0 results is difficult to achieve.
- There is an “if, else” block in the Search page that states if the api returns back less than 5 title ids, then the user should be navigated to the Error page. This is as on the Results page, we display 5 results.

---

## External API Endpoints

For all of our external api calls, to retrieve show and movie data we used [WatchMode API](https://api.watchmode.com).

### Search.js

_src/pages/Search.js_

Endpoint: https://api.watchmode.com/v1/list-titles/

This page uses WatchMode’s “list-titles” endpoint to make an external api call.

The endpoint allows you to search for titles based on multiple parameters such as media type, region, platform, genre and more. For our app we focused on media type, genre and platform.

![List-titles endpoint example](/src/assets/list-titles-endpoint-example.png)

The data from this endpoint is limited and excludes important information that we needed such as an image, a watch link, and a plot overview. To get further information, this endpoint was used to return the ids from 5 random show/film titles. We then used these title ids in another endpoint that includes more data.

### MainResult.js and MoreSugestions.js

_src/components/MoreSuggestions.js_
_src/components/MoreSuggestions.js_

**Endpoint:** [https://api.watchmode.com/v1/title](https://api.watchmode.com/v1/title)

In the Results.js page, there are two components: MainResult & MoreSuggestions.

These two components used Watchmode’s “title” endpoint, which takes a title id as a parameter and return in depth data.

![List-titles endpoint example](/src/assets/title-endpoint-example.png)

The “title” endpoint included the data we needed to fill our results page. This included: the title, genres, backdrop and poster images, plot overview, IMDb id, rating, and watch link.

The MainResult component returns one title from the endpoint using the first element in an array of 5 random title ids, returned from the Search page api call. The MoreSuggestions component maps through the remaining 4 elements in the random title ids array, and uses the “title” endpoint to return the necessary data to fill the component.

### Profile.js

src/pages/profile.js

**Endpoint:** [https://api.watchmode.com/v1/title](https://api.watchmode.com/v1/title)

## Internal API Endpoints

### Post /results

The app.post(”/results”) endpoint is used to save a show/film to the user’s favourites when they click the favourite “heart” icon. In the frontend, the heart icon onClick takes the id of the show/film and sends it to a function that passes the id through to app.post(”/results”, addToFavourites) function in the backend. The endpoint then makes a query to check to see if the user already has the show/film saved to the Favourites table in the db under their unique user id. If the query doesn’t find anything, then the title_id is inserted into the Favourites table along with the user’s id.

### Delete /results

The app.delete(”/results”) endpoint is supposed to delete a show/film from the Favourites table in the db, when a user unfavourites it. It works by checking for the show/film in the table using the unique title id and user id, then deleting the row that is returned in the search.

We couldn’t get this endpoint to successfully work as for some reason the axios.delete() method in the frontend could not find the [localhost:3000](http://localhost:3000) server. If the project was longer, this is something that we would’ve looked into further.\*

Endpoint: https://api.watchmode.com/v1/title/

In the Results page, there are two components: MainResult & MoreSuggestions.

These two components used Watchmode’s “title” endpoint, which takes a title id as a parameter and returns in-depth data.

![Title endpoint example](/src/assets/title-endpoint-example.png)

The “title” endpoint contains the data we need to fill our results page. This includes:

- The show/film title
- Genres
- "Backdrop" and "poster" images
- A plot overview
- IMDb id
- Content rating
- Watch link

The MainResult component returns one title from the endpoint using the first element in an array of 5 random title ids. The MoreSuggestions component maps through the remaining 4 elements in the array, and uses the “v1/title” endpoint to return the necessary data to fill the component.

### Profile.js

_src/pages/Profile.js_

Endpoint: https://api.watchmode.com/v1/title

The Profile pasge also used the "title" endpoint and...

---

## Internal API Endpoints

### Post /results

The app.post(”/results”) endpoint is used to save a show/film to the user’s favourites when they click the favourite “heart” icon.

In the frontend, the heart icon onClick takes the id of the show/film. Then sends the id to a function that passes it through to the app.post(”/results”, addToFavourites) function in the backend.

The endpoint then makes a query to check to see if the user already has the show/film saved to the db Favourites table under their unique user id. If the query doesn’t find anything, then the title_id is inserted into the Favourites table along with the user’s id.

### Delete /results

The app.delete(”/results”) endpoint is supposed to delete a show/film from the Favourites table in the db, when a user un-clicks the heart icon. It works by checking for the show/film in the table using the unique title id and user id, then deleting the row that is returned in the search.

We couldn’t get this endpoint to successfully work as for some reason the axios.delete() method in the frontend could not find the localhost:3000 server. If the project was longer, this is something that we would’ve looked further into, however we had to move on to prioritise our most important tasks.
