# Price It API documentation

## This API provides endpoints for getting scraper results, products and managing users for Price It webapp.

## Endpoints

### Register user

_Endpoint registers a new user, if it doesn't already exist._

**POST /user/register**

request- { username, password }

returns- {<br>
<space><space><space><space>username<br>
<space><space><space><space>password<br>
}
