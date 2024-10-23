/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/



bbbfly.locale.Register({
  Lang: 'cs',
  Region: 'CZ',

  Locale: 'cs-CZ',
  CurrencyCode: 'CZK',

  CharOrder: '0123456789'
    +'aAáÁ'
    +'bB'
    +'cCčČ'
    +'dDďĎ'
    +'eEéÉěĚ'
    +'fF'
    +'gG'
    +'hH'
    +'iIíÍ'
    +'jJ'
    +'kK'
    +'lL'
    +'mM'
    +'nNňŇ'
    +'oOóÓ'
    +'pP'
    +'qQ'
    +'rRřŘ'
    +'sSšŠ'
    +'tTťŤ'
    +'uUúÚůŮ'
    +'vV'
    +'wW'
    +'xX'
    +'yYýÝ'
    +'zZžŽ',

  Diacritics: {
    'á': 'a', 'Á': 'A',
    'č': 'c', 'Č': 'C',
    'ď': 'd', 'Ď': 'D',
    'é': 'e', 'É': 'E',
    'ě': 'e', 'Ě': 'E',
    'í': 'i', 'Í': 'I',
    'ň': 'n', 'Ň': 'N',
    'ó': 'o', 'Ó': 'O',
    'ř': 'r', 'Ř': 'R',
    'š': 's', 'Š': 'S',
    'ť': 't', 'Ť': 'T',
    'ú': 'u', 'Ú': 'U',
    'ů': 'u', 'Ů': 'U',
    'ý': 'y', 'Ý': 'Y',
    'ž': 'z', 'Ž': 'Z'
  },

  Format: {
    HouseNumber: [
      '^[1-9][0-9]{0,3}$',
      '^[1-9][0-9]{0,2}[a-z]?$',
      '^[1-9][0-9]{0,3}\/[1-9][0-9]{0,2}[a-z]?$'
    ],
    Zip: [
      '^[1-9][0-9]{4}$',
      '^[1-9][0-9]{2} [0-9]{2}$',
    ]
  }
});