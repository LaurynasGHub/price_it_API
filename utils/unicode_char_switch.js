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
    '\\u012e': 'Į',
    '\\u012f': 'į',
    '\\u0172': 'Ų',
    '\\u0173': 'ų',
    '\\u016a': 'Ū',
    '\\u016b': 'ū',
    '\\u010c': 'Č',
    '\\u010d': 'č',
    '\\u0160': 'Š',
    '\\u0161': 'š',
    '\\u017d': 'Ž',
    '\\u017e': 'ž',
    '\\u00c4': 'Ä',
    '\\u00e4': 'ä',
    '\\u00d6': 'Ö',
    '\\u00f6': 'ö',
    '\\u00dc': 'Ü',
    '\\u00fc': 'ü',
    '\\u00df': 'ß',
    '\\u1e9e': 'ẞ',
  };

  return text.replace(
    /\\u[0-9a-fA-F]{4}/g,
    (match) => unicodeMap[match] || match
  );
}

module.exports = unicodeCharSwitch;
