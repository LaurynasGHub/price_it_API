# Price It API documentation

## This API provides endpoints for getting scraper results, products and managing users for Price It webapp.

## Endpoints

### Register user

_Endpoint registers a new user, if it doesn't already exist._

- **<ins>POST /user/register</ins>**

- Request- { username, password };

If user with the same username already exists, returns an error:
'user already exists'

- Returns- { username: username , password: password };
