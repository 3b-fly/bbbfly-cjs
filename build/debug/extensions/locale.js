/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.locale = {
  _lang: null,
  _defs: {},
  _ascii: {
    'à': 'a', 'À': 'A',
    'á': 'a', 'Á': 'A',
    'â': 'a', 'Â': 'A',
    'ã': 'a', 'Ã': 'A',
    'ä': 'a', 'Ä': 'A',
    'å': 'a', 'Å': 'A',
    'æ': 'a', 'Æ': 'A',
    'þ': 'b', 'Þ': 'B',
    'ç': 'c', 'Ç': 'C',
    'ð': 'dj','Ð': 'Dj',
    'è': 'e', 'È': 'E',
    'é': 'e', 'É': 'E',
    'ê': 'e', 'Ê': 'E',
    'ë': 'e', 'Ë': 'E',
    'ì': 'i', 'Ì': 'I',
    'í': 'i', 'Í': 'I',
    'î': 'i', 'Î': 'I',
    'ñ': 'n', 'Ñ': 'N',
    'ò': 'o', 'Ò': 'O',
    'ó': 'o', 'Ó': 'O',
    'ô': 'o', 'Ô': 'O',
    'õ': 'o', 'Õ': 'O',
    'ö': 'o', 'Ö': 'O',
    'ø': 'o', 'Ø': 'O',
    'ß': 'ss','ẞ': 'Ss',
    'ù': 'u', 'Ù': 'U',
    'ú': 'u', 'Ú': 'U',
    'û': 'u', 'Û': 'U',
    'ü': 'u', 'Ü': 'U',
    'ý': 'y', 'Ý': 'Y',
    'ā': 'a', 'Ā': 'A',
    'ă': 'a', 'Ă': 'A',
    'ą': 'a', 'Ą': 'A',
    'ć': 'c', 'Ć': 'C',
    'ĉ': 'c', 'Ĉ': 'C',
    'ċ': 'c', 'Ċ': 'C',
    'č': 'c', 'Č': 'C',
    'ď': 'd', 'Ď': 'D',
    'đ': 'd', 'Đ': 'D',
    'ē': 'e', 'Ē': 'E',
    'ĕ': 'e', 'Ĕ': 'E',
    'ė': 'e', 'Ė': 'E',
    'ę': 'e', 'Ę': 'E',
    'ě': 'e', 'Ě': 'E',
    'ĝ': 'g', 'Ĝ': 'G',
    'ğ': 'g', 'Ğ': 'G',
    'ġ': 'g', 'Ġ': 'G',
    'ģ': 'g', 'Ģ': 'G',
    'ĥ': 'h', 'Ĥ': 'H',
    'ħ': 'h', 'Ħ': 'H',
    'ĩ': 'i', 'Ĩ': 'I',
    'ī': 'i', 'Ī': 'I',
    'ĭ': 'i', 'Ĭ': 'I',
    'į': 'i', 'Į': 'I',
    'ı': 'i', 'İ': 'I',
    'ĳ': 'ij', 'Ĳ': 'Ij',
    'ĵ': 'j', 'Ĵ': 'J',
    'ķ': 'k', 'Ķ': 'K',
    'ĸ': 'k',
    'ĺ': 'l', 'Ĺ': 'L',
    'ļ': 'l', 'Ļ': 'L',
    'ľ': 'l', 'Ľ': 'L',
    'ŀ': 'l', 'Ŀ': 'L',
    'ł': 'l', 'Ł': 'L',
    'ń': 'n', 'Ń': 'N',
    'ņ': 'n', 'Ņ': 'N',
    'ň': 'n', 'Ň': 'N',
    'ŉ': 'n',
    'ŋ': 'n', 'Ŋ': 'N',
    'ō': 'o', 'Ō': 'O',
    'ŏ': 'o', 'Ŏ': 'O',
    'ő': 'o', 'Ő': 'O',
    'œ': 'oi', 'Œ': 'Oi',
    'ŕ': 'r', 'Ŕ': 'R',
    'ŗ': 'r', 'Ŗ': 'R',
    'ř': 'r', 'Ř': 'R',
    'ś': 's', 'Ś': 'S',
    'ŝ': 's', 'Ŝ': 'S',
    'ş': 's', 'Ş': 'S',
    'š': 's', 'Š': 'S',
    'ſ': 's',
    'ţ': 't', 'Ţ': 'T',
    'ť': 't', 'Ť': 'T',
    'ŧ': 't', 'Ŧ': 'T',
    'ũ': 'u', 'Ũ': 'U',
    'ū': 'u', 'Ū': 'U',
    'ŭ': 'u', 'Ŭ': 'U',
    'ů': 'u', 'Ů': 'U',
    'ű': 'u', 'Ű': 'U',
    'ų': 'u', 'Ų': 'U',
    'ŵ': 'w', 'Ŵ': 'W',
    'ŷ': 'y', 'Ŷ': 'Y',
    'ÿ': 'y', 'Ÿ': 'Y',
    'ź': 'z', 'Ź': 'Z',
    'ż': 'z', 'Ż': 'Z',
    'ž': 'z', 'Ž': 'Z',
    'ȁ': 'a', 'Ȁ': 'A',
    'ǣ': 'a', 'Ǣ': 'A',
    'ǎ': 'a', 'Ǎ': 'A',
    'ǟ': 'a', 'Ǟ': 'A',
    'ǡ': 'a', 'Ǡ': 'A',
    'ǻ': 'a', 'Ǻ': 'A',
    'ǽ': 'a', 'Ǽ': 'A',
    'ȃ': 'a', 'Ȃ': 'A',
    'ȧ': 'a', 'Ȧ': 'A',
    'ə': 'a', 'Ə': 'A',
    'ⱥ': 'a', 'Ⱥ': 'A',
    'ƀ': 'b', 'Ƀ': 'B',
    'ɓ': 'b', 'Ɓ': 'B',
    'ƃ': 'b', 'Ƃ': 'B',
    'ƅ': 'b', 'Ƅ': 'B',
    'ƈ': 'c', 'Ƈ': 'C',
    'ȼ': 'c', 'Ȼ': 'C',
    'ƍ': 'd','Ɖ': 'D',
    'ɗ': 'd','Ɗ': 'D',
    'ƌ': 'd','Ƌ': 'D',
    'ȡ': 'd',
    'ǳ': 'dz','Ǳ': 'Dz', 'ǲ': 'Dz',
    'ǆ': 'dz','Ǆ': 'Dz', 'ǅ': 'Dz',
    'ƻ': 'dz',
    'Ǝ': 'E',
    'ȅ': 'e', 'Ȅ': 'E',
    'ȇ': 'e', 'Ȇ': 'E',
    'ȩ': 'e', 'Ȩ': 'E',
    'ɇ': 'e', 'Ɇ': 'E',
    'ɛ': 'e', 'Ɛ': 'E',
    'ǝ': 'e', 'ⱻ': 'E',
    'ƒ': 'f', 'Ƒ': 'F',
    'ƣ': 'g', 'Ƣ': 'G',
    'ǥ': 'g', 'Ǥ': 'G',
    'ǧ': 'g', 'Ǧ': 'G',
    'ǵ': 'g', 'Ǵ': 'G',
    'ɠ': 'g', 'Ɠ': 'G',
    'ɣ': 'g', 'Ɣ': 'G',
    'ȟ': 'h', 'Ȟ': 'H',
    'ƕ': 'h', 'Ƕ': 'H',
    'ǐ': 'i', 'Ǐ': 'I',
    'ȉ': 'i', 'Ȉ': 'I',
    'ȋ': 'i', 'Ȋ': 'I',
    'ɩ': 'i', 'Ɩ': 'I',
    'ɨ': 'i', 'Ɨ': 'I',
    'ɉ': 'j', 'Ɉ': 'J',
    'ǰ': 'j', 'ȷ': 'j',
    'ƙ': 'k', 'Ƙ': 'K',
    'ǩ': 'k', 'Ǩ': 'K',
    'ƚ': 'l', 'Ƚ': 'L',
    'ƛ': 'l',
    'ȴ': 'l',
    'ǉ': 'lj', 'Ǉ': 'Lj','ǈ': 'Lj',
    'ɯ': 'm', 'Ɯ': 'M',
    'ƞ': 'n', 'Ƞ': 'N',
    'ǹ': 'n', 'Ǹ': 'N',
    'ɲ': 'n', 'Ɲ': 'N',
    'ȵ': 'n',
    'ǌ': 'nj', 'Ǌ': 'Nj', 'ǋ': 'Nj',
    'ɔ': 'o', 'Ɔ': 'O',
    'ǿ': 'o', 'Ǿ': 'O',
    'ȍ': 'o', 'Ȍ': 'O',
    'ȏ': 'o', 'Ȏ': 'O',
    'ȫ': 'o', 'Ȫ': 'O',
    'ȭ': 'o', 'Ȭ': 'O',
    'ȯ': 'o', 'Ȯ': 'O',
    'ȱ': 'o', 'Ȱ': 'O',
    'ǒ': 'o', 'Ǒ': 'O',
    'ơ': 'o', 'Ơ': 'O',
    'ǫ': 'o', 'Ǫ': 'O',
    'ǭ': 'o', 'Ǭ': 'O',
    'ɵ': 'o', 'Ɵ': 'O',
    'ȣ': 'ou', 'Ȣ': 'Ou',
    'ƥ': 'p', 'Ƥ': 'P',
    'ɋ': 'q', 'Ɋ': 'Q',
    'ƽ': 'q', 'Ƽ': 'Q',
    'ȑ': 'r', 'Ȑ': 'R',
    'ȓ': 'r', 'Ȓ': 'R',
    'ɍ': 'r', 'Ɍ': 'R',
    'ʀ': 'r', 'Ʀ': 'R',
    'ș': 's', 'Ș': 'S',
    'ƨ': 's', 'Ƨ': 'S',
    'ʃ': 'S', 'Ʃ': 'S',
    'ȿ': 's', 'Ȿ': 'S',
    'ƪ': 's',
    'ț': 't', 'Ț': 'T',
    'ƭ': 't', 'Ƭ': 'T',
    'ʈ': 't', 'Ʈ': 'T',
    'ⱦ': 't', 'Ⱦ': 'T',
    'ᶵ': 't',
    'ȶ': 't',
    'ƾ': 'ts',
    'ǔ': 'u', 'Ǔ': 'U',
    'ǖ': 'u', 'Ǖ': 'U',
    'ǘ': 'u', 'Ǘ': 'U',
    'ǚ': 'u', 'Ǚ': 'U',
    'ǜ': 'u', 'Ǜ': 'U',
    'ư': 'u', 'Ư': 'U',
    'ȕ': 'u', 'Ȕ': 'U',
    'ȗ': 'u', 'Ȗ': 'U',
    'ʊ': 'u', 'Ʊ': 'U',
    'ʉ': 'u', 'Ʉ': 'U',
    'ʋ': 'v', 'Ʋ': 'V',
    'ʌ': 'V', 'Ʌ': 'V',
    'ȳ': 'y', 'Ȳ': 'Y',
    'ƴ': 'y', 'Ƴ': 'Y',
    'ɏ': 'y', 'Ɏ': 'Y',
    'ȝ': 'y', 'Ȝ': 'Y',
    'ƶ': 'z', 'Ƶ': 'Z',
    'ȥ': 'z', 'Ȥ': 'Z',
    'ǯ': 'z', 'Ǯ': 'Z',
    'ƹ': 'z', 'Ƹ': 'Z',
    'ʒ': 'z', 'Ʒ': 'Z',
    'ɀ': 'z', 'Ɀ': 'Z',
    'ƺ': 'z',
    'ȸ': 'db', 'ȹ': 'qp',
    'ɂ': '', 'Ɂ': '',
    'α': 'a', 'Α': 'A',
    'ά': 'a', 'Ά': 'A',
    'β': 'b', 'Β': 'B', 'ϐ': 'B',
    'ϭ': 'c', 'Ϭ': 'C',
    'δ': 'd', 'Δ': 'D',
    'ε': 'e', 'Ε': 'E',
    'έ': 'e', 'Έ': 'E',
    'ϵ': 'e', '϶': 'e',
    'φ': 'f', 'Φ': 'F', 'ϕ': 'F',
    'ϥ': 'f', 'Ϥ': 'F',
    'γ': 'g', 'Γ': 'G',
    'ͱ': 'h', 'Ͱ': 'H',
    'η': 'h', 'Η': 'H',
    'ή': 'h', 'Ή': 'H',
    'ϩ': 'h', 'Ϩ': 'H',
    'ι': 'i', 'Ι': 'I',
    'ί': 'i', 'Ί': 'I',
    'ϊ': 'i', 'Ϊ': 'I', 'ΐ': 'i',
    'ϫ': 'j', 'Ϫ': 'J', 'ϳ': 'j',
    'κ': 'k', 'Κ': 'K', 'ϰ': 'k', 'ϗ': 'k', 'Ϗ': 'K',
    'ϙ': 'k', 'Ϙ': 'K',
    'ϟ': 'k', 'Ϟ': 'K',
    'λ': 'l', 'Λ': 'L',
    'μ': 'm', 'Μ': 'M',
    'ν': 'n', 'Ν': 'N',
    'ο': 'o', 'Ο': 'O',
    'ό': 'o', 'Ό': 'O',
    'ω': 'o', 'Ω': 'O',
    'ώ': 'o', 'Ώ': 'O',
    'π': 'p', 'Π': 'P', 'ϖ': 'P',
    'ψ': 'ps', 'Ψ': 'Ps',
    'ρ': 'r', 'Ρ': 'R', 'ϱ': 'R', 'ϼ': 'R',
    'ͳ': 's', 'Ͳ': 'S',
    'σ': 's', 'ς': 's', 'Σ': 'S', 'ϲ': 's', 'Ϲ': 'S',
    'ͻ': 's', 'Ͻ': 'S',
    'ͼ': 's', 'Ͼ': 'S',
    'ͽ': 's', 'Ͽ': 'S',
    'ϣ': 's', 'Ϣ': 'S',
    'ϻ': 's', 'Ϻ': 'S',
    'ϸ': 's', 'Ϸ': 'S',
    'ϛ': 'st', 'Ϛ': 'St',
    'ͷ': 't', 'Ͷ': 'T',
    'τ': 't', 'Τ': 'T',
    'ϯ': 'ti', 'Ϯ': 'Ti',
    'θ': 'th', 'Θ': 'Th', 'ϑ': 'th', 'ϴ': 'Th',
    'υ': 'u', 'Υ': 'U','ϒ': 'u',
    'ύ': 'u', 'Ύ': 'U', 'ϓ': 'U',
    'ϋ': 'u', 'Ϋ': 'U', 'ϔ': 'U',
    'ϝ': 'w', 'Ϝ': 'W',
    'ξ': 'x', 'Ξ': 'X',
    'χ': 'x', 'Χ': 'X',
    'ϧ': 'x', 'Ϧ': 'X',
    'ζ': 'z', 'Ζ': 'Z',
    'ϡ': '', 'Ϡ': '',
    'а': 'a', 'А': 'A',
    'ӑ': 'a', 'Ӑ': 'A',
    'ӓ': 'a', 'Ӓ': 'A',
    'ӕ': 'a', 'Ӕ': 'A',
    'б': 'b', 'Б': 'B',
    'ћ': 'c', 'Ћ': 'C',
    'ц': 'c', 'Ц': 'C',
    'ҵ': 'c', 'Ҵ': 'C',
    'ч': 'c', 'Ч': 'C',
    'ӵ': 'c', 'Ӵ': 'C',
    'ҷ': 'c', 'Ҷ': 'C',
    'ҹ': 'c', 'Ҹ': 'C',
    'ӌ': 'c', 'Ӌ': 'C',
    'ҁ': 'c', 'Ҁ': 'C',
    'д': 'd', 'Д': 'D',
    'ђ': 'd', 'Ђ': 'D',
    'ѓ': 'd', 'Ѓ': 'D',
    'ѕ': 'dz', 'Ѕ': 'Dz',
    'џ': 'dz', 'Џ': 'Dz',
    'е': 'e', 'Е': 'E',
    'ѐ': 'e', 'Ѐ': 'E',
    'ӗ': 'e', 'Ӗ': 'E',
    'є': 'e', 'Є': 'E',
    'ё': 'e', 'Ё': 'E',
    'э': 'e', 'Э': 'E',
    'ӭ': 'e', 'Ӭ': 'E',
    'ѣ': 'e', 'Ѣ': 'E',
    'ѧ': 'e', 'Ѧ': 'E',
    'ҽ': 'e', 'Ҽ': 'E',
    'ҿ': 'e', 'Ҿ': 'E',
    'ә': 'e', 'Ә': 'E',
    'ӛ': 'e', 'Ӛ': 'E',
    'ф': 'f', 'Ф': 'F',
    'г': 'g', 'Г': 'G',
    'ґ': 'g', 'Ґ': 'G',
    'ӷ': 'g', 'Ӷ': 'G',
    'ӻ': 'g', 'Ӻ': 'G',
    'ғ': 'g', 'Ғ': 'G',
    'ҕ': 'g', 'Ҕ': 'G',
    'һ': 'h', 'Һ': 'H',
    'ҳ': 'h', 'Ҳ': 'H',
    'ӽ': 'h', 'Ӽ': 'H',
    'ӿ': 'h', 'Ӿ': 'H',
    'х': 'ch', 'Х': 'Ch',
    'и': 'i', 'И': 'I',
    'й': 'i', 'Й': 'I',
    'ӣ': 'i', 'Ӣ': 'I',
    'ӥ': 'i', 'Ӥ': 'I',
    'ѝ': 'i', 'Ѝ': 'I',
    'ҋ': 'i', 'Ҋ': 'I',
    'і': 'i', 'І': 'I',
    'ї': 'i', 'Ї': 'I',
    'ј': 'j', 'Ј': 'J',
    'ю': 'ju', 'Ю': 'Ju',
    'я': 'ja', 'Я': 'Ja',
    'ѥ': 'je', 'Ѥ': 'Je',
    'ѩ': 'je', 'Ѩ': 'Je',
    'ѭ': 'jo', 'Ѭ': 'Jo',
    'ќ': 'k', 'Ќ': 'K',
    'қ': 'k', 'Қ': 'K',
    'ҝ': 'k', 'Ҝ': 'K',
    'ҟ': 'k', 'Ҟ': 'K',
    'ҡ': 'k', 'Ҡ': 'K',
    'ѯ': 'ks', 'Ѯ': 'Ks',
    'л': 'l', 'Л': 'L',
    'ӆ': 'l', 'Ӆ': 'L',
    'ў': 'l', 'Ў': 'L',
    'љ': 'lj', 'Љ': 'Lj',
    'м': 'm', 'М': 'M',
    'ӎ': 'm', 'Ӎ': 'M',
    'н': 'n', 'Н': 'N',
    'ң': 'n', 'Ң': 'N',
    'ҥ': 'n', 'Ҥ': 'N',
    'њ': 'n', 'Њ': 'N',
    'ӈ': 'n', 'Ӈ': 'N',
    'ӊ': 'n', 'Ӊ': 'N',
    'о': 'o', 'О': 'O',
    'ѻ': 'o', 'Ѻ': 'O',
    'ọ': 'o', 'Ọ': 'O',
    'ӧ': 'o', 'Ӧ': 'O',
    'ө': 'o', 'Ө': 'O',
    'ӫ': 'o', 'Ӫ': 'O',
    'ҩ': 'o', 'Ҩ': 'O',
    'ѫ': 'o', 'Ѫ': 'O',
    'ѡ': 'o', 'Ѡ': 'O',
    'ѽ': 'ot', 'Ѽ': 'Ot',
    'ѿ': 'ot', 'Ѿ': 'Ot',
    'п': 'p', 'П': 'P',
    'ҧ': 'p', 'Ҧ': 'P',
    'ѱ': 'ps', 'Ѱ': 'Ps',
    'ӄ': 'Q', 'Ӄ': 'Q',
    'р': 'r', 'Р': 'R',
    'ҏ': 'r', 'Ҏ': 'R',
    'с': 's', 'С': 'S',
    'ҫ': 's', 'Ҫ': 'S',
    'ш': 's', 'Ш': 'S',
    'щ': 'sc', 'Щ': 'Sc',
    'т': 't', 'Т': 'T',
    'ҭ': 't', 'Ҭ': 'T',
    'ѳ': 'th', 'Ѳ': 'Th',
    'у': 'u', 'У': 'U',
    'ү': 'u', 'Ү': 'U',
    'ұ': 'u', 'Ұ': 'U',
    'ӯ': 'u', 'Ӯ': 'U',
    'ӱ': 'u', 'Ӱ': 'U',
    'ӳ': 'u', 'Ӳ': 'U',
    'ѹ': 'u', 'Ѹ': 'U',
    'в': 'v', 'В': 'V',
    'ѵ': 'v', 'Ѵ': 'V',
    'ѷ': 'v', 'Ѷ': 'V',
    'ы': 'y', 'Ы': 'Y',
    'ӹ': 'y', 'Ӹ': 'Y',
    'ж': 'z', 'Ж': 'Z',
    'җ': 'z', 'Җ': 'Z',
    'ӂ': 'z', 'Ӂ': 'Z',
    'ӝ': 'z', 'Ӝ': 'Z',
    'з': 'z', 'З': 'Z',
    'ҙ': 'z', 'Ҙ': 'Z',
    'ӟ': 'z', 'Ӟ': 'Z',
    'ӡ': 'z', 'Ӡ': 'Z',
    'ъ': '', 'Ъ': '',
    'ҍ': '', 'Ҍ': '',
    'ь': '', 'Ь': '',
    'ӏ': '', 'Ӏ': ''
  }
};
bbbfly.locale.SetLang = function(lang){
  if(
    !Object.isObject(lang)
    ||!(lang instanceof bbbfly.locale.Lang)
  ){return false;}

  this._lang = lang;
  return true;
};
bbbfly.locale.GetLang = function(){
  if(this._lang){return this._lang;}
  return new bbbfly.locale.Lang();
};
bbbfly.locale.Register = function(loc){
  if(!Object.isObject(loc)){return false;}

  var defs = this._defs;

  var langId = loc.Lang;
  var hasLang = String.isString(langId);

  var defLangId = bbbfly.locale.id.default;
  if(!Object.isObject(defs[defLangId])){defs[defLangId] = loc;}

  if(hasLang){
    var regId = loc.Region;
    var hasReg = String.isString(regId);
    if(!hasReg){regId = bbbfly.locale.id.none;}

    var defRegId = (langId+'-'+bbbfly.locale.id.default);
    if(!Object.isObject(defs[defRegId])){defs[defRegId] = loc;}

    var fullRegId = (langId+'-'+regId);
    if(!Object.isObject(defs[fullRegId])){defs[fullRegId] = loc;}
  }
  else{
    var noneLangId = bbbfly.locale.id.none;
    if(!Object.isObject(defs[noneLangId])){defs[noneLangId] = loc;}
  }

  return true;
};
bbbfly.locale.GetLocalRules = function(lang){
  if(
    !Object.isObject(lang)
    ||!(lang instanceof bbbfly.locale.Lang)
  ){lang = this.GetLang();}

  var langId = lang.Lang;
  var regId = lang.Region;

  var hasLang = String.isString(langId);
  var hasReg = String.isString(regId);

  var defs = this._defs;

  if(hasLang){
    if(hasReg){
      var fullRegId = (langId+'-'+regId);
      if(Object.isObject(defs[fullRegId])){return defs[fullRegId];}
    }

    var noneRegId = (langId+'-'+bbbfly.locale.id.none);
    if(Object.isObject(defs[noneRegId])){return defs[noneRegId];}

    var defRegId = (langId+'-'+bbbfly.locale.id.default);
    if(Object.isObject(defs[defRegId])){return defs[defRegId];}
  }

  var noneLangId = bbbfly.locale.id.none;
  if(Object.isObject(defs[noneLangId])){return defs[noneLangId];}

  var defLangId = bbbfly.locale.id.default;
  if(Object.isObject(defs[defLangId])){return defs[defLangId];}

  return null;
};
bbbfly.locale.RemoveDiacritics = function(text,lang){
  if(!String.isString(text)){return text;}

  var def = this.GetLocalRules(lang);
  if(def && Object.isObject(def.Diacritics)){

    var map = def.Diacritics;

    for(var key in map){
      if(map.hasOwnProperty(key)){
        text = text.replace(new RegExp(key,'gu'),map[key]);
      }
    }
  }

  return text;
};
bbbfly.locale.Compare = function(valueA,valueB,lang){
  if(String.isString(valueA) && String.isString(valueA)){

    var def = this.GetLocalRules(lang);
    if(def && String.isString(def.CharOrder)){

      var map = def.CharOrder;
      var minLng = Math.min(valueA.length,valueB.length);

      for(var i=0;i<(minLng+1);i++){
        var charA = valueA.charAt(i);
        var charB = valueB.charAt(i);

        var emptyA = (charA === '');
        var emptyB = (charB === '');

        if(emptyA || emptyB){
          valueA = charA;
          valueB = charB;
          break;
        }

        var idxA = map.indexOf(charA);
        var idxB = map.indexOf(charB);

        if(idxA !== idxB){
          valueA = idxA;
          valueB = idxB;
          break;
        }
      }
    }
  }

  if(valueA < valueB){return -1;}
  else if(valueA > valueB){return 1;}
  return 0;
};
bbbfly.locale.TextToAscii = function(text){
  if(!String.isString(text)){return text;}

  var map = this._ascii;

  for(var key in map){
    if(map.hasOwnProperty(key)){
      text = text.replace(new RegExp(key,'gu'),map[key]);
    }
  }

  return text.replace(new RegExp('[^\x00-\x7F]','gu'),'');
};
bbbfly.locale.FormatNumber = function(num,lang,type){
  if(!Number.isNumber(num)){return '';}

  var rules = bbbfly.locale.GetLocalRules(lang);
  if(rules && String.isString(rules.Locale)){

    var options = null;
    switch(type){
      case bbbfly.locale.number.percent:
        options = {
          style:'percent'
        };
      break;
      case bbbfly.locale.number.currency_code:
        if(String.isString(rules.CurrencyCode)){
          options = {
            style:'currency',
            currencyDisplay:'code',
            currency: rules.CurrencyCode
          };
        }
      break;
      case bbbfly.locale.number.currency_symbol:
        if(String.isString(rules.CurrencyCode)){
          options = {
            style:'currency',
            currencyDisplay:'symbol',
            currency: rules.CurrencyCode
          };
        }
      break;
    }

    if(options){
      return num.toLocaleString(rules.Locale,options);
    }
  }

  return num.toString();
};
bbbfly.locale.FormatDate = function(date,lang,type){
  if(!Date.isDate(date)){return '';}

  var options = null;
  switch(type){
    case bbbfly.locale.date.datetime_short:
      options = { dateStyle:'short', timeStyle:'short' };
    break;
    case bbbfly.locale.date.datetime_long:
      options = { dateStyle:'medium', timeStyle:'medium' };
    break;
    case bbbfly.locale.date.date_short:
      options = { dateStyle:'short' };
    break;
    case bbbfly.locale.date.date_long:
      options = { dateStyle:'medium' };
    break;
    case bbbfly.locale.date.time_short:
      options = { timeStyle:'short' };
    break;
    case bbbfly.locale.date.time_long:
      options = { timeStyle:'medium' };
    break;
  }

  if(options){
    var rules = bbbfly.locale.GetLocalRules(lang);
    if(rules && String.isString(rules.Locale)){
      return date.toLocaleString(rules.Locale,options);
    }
  }

  return date.toString();
};
bbbfly.locale.ValidateAddress = function(text,lang,type){
  if(!String.isString(text)){return false;}

  var rules = bbbfly.locale.GetLocalRules(lang);
  if(rules && Object.isObject(rules.Format)){

    var patterns = null;

    switch(type){
      case bbbfly.locale.address.houseno:
        patterns = rules.Format.HouseNumber;
      break;
      case bbbfly.locale.address.zip:
        patterns = rules.Format.Zip;
      break;
    }

    if(Array.isArray(patterns)){
      for(var i in patterns){
        var pattern = new RegExp(patterns[i]);
        if(pattern.test(text)){return true;}
      }
    }
  }

  return false;
};
bbbfly.locale.Lang = function(lang,region){
  this.Lang = null;
  this.Region = null;

  if(String.isString(lang)){
    lang = lang.split('-');

    if(lang[0]){this.Lang = lang[0];}
    if(lang[1]){this.Region = lang[1];}
  }

  if(String.isString(region)){
    this.Region = region;
  }
};
bbbfly.locale.id = {
  none: '-',
  default: '~'
};
bbbfly.locale.number = {
  decimal: 0,
  percent: 1,
  currency_code: 2,
  currency_symbol: 3
};
bbbfly.locale.date = {
  datetime_short: 0,
  datetime_long: 1,
  date_short: 2,
  date_long: 3,
  time_short: 4,
  time_long: 5
};
bbbfly.locale.address = {
  none: 0,
  houseno: 1,
  zip: 2
};

/**
 * @interface
 * @name Rules
 * @memberof bbbfly.locale
 * @description Locale rules definition
 *
 * @property {string} Lang - 'en'
 * @property {string} [Region=undefined] - 'GB'
 * @property {string} [Locale=undefined] - 'an-GB'
 *
 * @property {string} CharOrder - 'abc...'
 * @property {object} Diacritics - { 'á': 'a', ... }
 *
 * @property {object} Format
 */