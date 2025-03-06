# Price It API documentation

## This API provides endpoints for getting scraper results, products and managing users for Price It webapp.

## Endpoints

### Register user

_Endpoint registers a new user, if it doesn't already exist._

**<ins>POST /user/register</ins>**

- Request- { username, password };

If user with the same username already exists, returns an error:
'user already exists'.

- Returns- { username: username , password: password } (JSON);

### Log in user

_Endpoint logs user in_

**<ins>POST /user/login</ins>**

- Request- { username, password };

If one of the parameters is wrong (username or password) returns a generic error: 'username or password is incorrect'.

If credentials are correct returns user id.

- Returns- userID (string);

### Get username

_Endpoint gets username._
**_This endpoint needs checking, doesn't seem it is used anywhere_**

**<ins>GET /user/username?id=</ins>**

- id - user id;

If user with the specified id is not found returns an error: 'Can't find user with ID: id.

- Returns- username (string);
