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
