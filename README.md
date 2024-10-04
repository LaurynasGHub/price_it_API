# PRICE IT API

## ROUTES:

### GET /scrapers/results?searchTerm=XX

Calls all scrapers using searchTerm value (XX) and returns JSON format file with results.

### GET /topSearches/results

Gets search frequencies from server, sorts the result and returns top 5 searches.

## TODO

### Add key to API request so the user could be validated

Need some security for API requests so it would be more secure and not anyone could make the request.

Add login? If user is logged in then the request is possible?

### (Possible future update):

Make search size as parameter and adjustable. Right now Barbora scraper returns 5 results, Rimi scraper returns about 15. This should be if not changeable, atleast identical. ✅ Completed!
