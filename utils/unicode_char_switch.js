//
// Function replaces all written unicode elements to normal letters.
//
function unicodeCharSwitch(text) {
  const unicodeMap = {
    '\\u0104': 'Ą',
    '\\u0105': 'ą',
    '\\u0116': 'Ė',
    '\\u0117': 'ė',
    '\\u0118': 'Ę',
    '\\u0119': 'ę',
    '\\u012E': 'Į',
    '\\u012F': 'į',
    '\\u0172': 'Ų',
    '\\u0173': 'ų',
    '\\u016A': 'Ū',
    '\\u016B': 'ū',
    '\\u010C': 'Č',
    '\\u010D': 'č',
    '\\u0160': 'Š',
    '\\u0161': 'š',
    '\\u017D': 'Ž',
    '\\u017E': 'ž',
  };

  return text.replace(
    /\\u[0-9a-fA-F]{4}/g,
    (match) => unicodeMap[match] || match
  );
}

module.exports = unicodeCharSwitch;
