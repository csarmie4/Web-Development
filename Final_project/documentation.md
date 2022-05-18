Heroku link: https://sarmiento-finalproject.herokuapp.com/
1. Data Storage

Data fields:
    movie_name: DataTypes.STRING,
    movie_year: DataTypes.INTEGER,
    movie_rating: DataTypes.FLOAT,
    movie_review: DataTypes.TEXT,
    movie_director: DataTypes.STRING

2. Add New Data

HTML form route `/post`

POST endpoint route `/api/posts`

example request body:
```javascript
{
    movie_name: 'Titanic',
    movie_year: 1997,
    movie_rating: 7,
    movie_review: 'Alright',
    director: 'James Cameron'
}
```

3. View Data

GET endpoint route: `/api/posts`

4. Search Data

Search Field: `movie_name`

5. Navigation Pages

Navigation Filters
1. Best Movies -> `/page1`
2. Worst Movies -> `/page2`
3. Movie Reviews -> `/page3`
4. Directors -> `/page4`
5. Movie Ratings -> `/page5`
