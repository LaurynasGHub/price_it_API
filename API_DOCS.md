# Price It API documentation

## This API provides endpoints for getting scraper results, products and managing users for Price It webapp.

## Endpoints

### <ins>Register user</ins>

_Endpoint registers a new user, if it doesn't already exist._

**<ins>POST /user/register</ins>**

- Request- { username, password };

If user with the same username already exists, returns an error:
'user already exists'.

- Returns- { username: username , password: password } (JSON);

### <ins>Log in user</ins>

_Endpoint logs user in._

**<ins>POST /user/login</ins>**

- Request- { username, password };

If one of the parameters is wrong (username or password) returns a generic error: 'username or password is incorrect'.

If credentials are correct returns user id.

- Returns- userID (string);

### <ins>Get username</ins>

_Endpoint gets username._<br>

**_This endpoint needs checking, doesn't seem it is used anywhere_**

**<ins>GET /user/username?id=</ins>**

- id - user id from the database;

If user with the specified id is not found returns an error: 'Can't find user with ID: id.

- Returns- username (string);

---

### <ins>Get results from scrapers</ins>

_Endpoint logs user in._

**<ins>POST /scrapers/shops/results?searchTerm=</ins>**

- searchTerm - product to search for in shops;

If searchTerm is empty returns status 400 with error: 'Search term is required'.

- Returns- data (JSON) with a structure of:<br>
  {
  ``````````"barbora": {
  ``````"products": [
  ``````{
  `````````"name": "ŽEMAITIJOS pienas, 3,2 % rieb., 1 l",
  `````````"price": 1.59
  ``````}
  ````]
  ```},
  "rimi": {
  "products": [
  {
  "name": "Natūralus DVARO pienas, 3,5 % rieb., 1 l",
  "price": 1.65
  }
  ]
  },
  "lastMile": {
  "products": [
  {
  "name": "Natūralus DVARO pienas, 3,5% rieb., 2 l",
  "price": 3.09,
  "priceWithDiscount": null
  }
  ]
  }
  }
  ``````````
