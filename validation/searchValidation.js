function searchValidation(props) {
  if (!props.searchTerm?.trim()) {
    throw new Error('Search term is required');
  }

  if (!props.searchFrequency === null) {
    throw new Error('Search frequency is required');
  }
}

module.exports = searchValidation;
