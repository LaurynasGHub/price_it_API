# PRICE IT API

## ROUTES:

### GET /scrapers/results?searchTerm=XX

Calls all scrapers using searchTerm value (XX) and returns JSON format file with results.

### GET /topSearches/results

Gets search frequencies from server, sorts the result and returns top 5 searches. Returns array.

### GET /mainItems/products/results

Gets main items prices from each of the shops. Returns JSON with each shops products prices.

### GET /mainItems/cart/results

Gets main items cart prices results from each of the shops. Returns JSON with each shops cart price.

## TODO

### createProfileOptions

Add validation for creating user options - if the option already exists prevent it's creation

### Add key to API request so the user could be validated

Need some security for API requests so it would be more secure and not anyone could make the request.

Add login? If user is logged in then the request is possible?

### Work on documentation

Create new and good documentation for API - paths, returns etc.

### (Possible future update):

Right now Barbora scraper returns 5 results, Rimi scraper returns about 15. This should be if not changeable, atleast identical. ✅ Completed!

Make search size as parameter and adjustable.
