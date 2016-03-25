module.exports = function Markov(phraseList, options) {
    var fixes = {};
    var defaultOptions = {
        prefixLength: 1,
        caseSensitive: false
    };

    function setup() {
        if (!options) options = {};

        for (var opt in defaultOptions) {
            if (!options.hasOwnProperty(opt)) {
                options[opt] = defaultOptions[opt];
            }
        }
    }

    function getPrefix(phrase) {
        var splitPhrase = phrase.split(' ');
        var prefix = '';
		var length = options.prefixLength;
        for (var i = 1; i <= length; i++) {
            var index = splitPhrase.length - i;
            if (index < 0) {
                break;
            }
			if (splitPhrase[index].trim() === '') {
				length++;
				continue;
			}
            prefix = splitPhrase[index] + ' ' + prefix;
        }
        return formatPrefix(prefix);
    }

    function generateSuffix(phrase, prefix) {
        var suffixes = fixes[prefix];

        if (!suffixes || suffixes.length === 0) {
            return phrase;
        }

        var choiceGaps = 1 / suffixes.length;
        var random = Math.random();
        var index = Math.floor(random / choiceGaps);
        var suffix = suffixes.splice(index, 1)[0];
        return phrase + ' ' + suffix;
    }

    function generate() {
        var currentPrefix;
        var phrase = '';
        var phraseLength;

        do {
            phraseLength = phrase.length;
            currentPrefix = getPrefix(phrase);
            phrase = generateSuffix(phrase, currentPrefix);
        } while (phrase.length > phraseLength)

        return phrase.trim();
    }

    function formatPrefix(prefix) {
        prefix = prefix.trim();
        if (!options.caseSensitive) prefix = prefix.toLowerCase();
        prefix = prefix.replace(/[^0-9a-zA-Z ]/g, '');
        if (prefix === '') prefix = '_';
        return prefix;
    }

    function digest() {
        for (var i = 0; i < phraseList.length; i++) {
			var phrase = phraseList[i].replace(/\n/g, '\n ');
            var splitPhrase = phrase.split(' ');

            for (var j = 0; j < splitPhrase.length; j++) {
                if (splitPhrase[j] === '') {
                    splitPhrase.splice(j--, 1);
                    continue;
                }

                var prefix = '';
				var length = options.prefixLength;
                for (var k = 1; k <= length; k++) {
                    if (j - k < 0) {
                        break;
                    }
					if (splitPhrase[j - k].trim() === '') {
						length++;
						continue;
					}
                    prefix = splitPhrase[j - k] + ' ' + prefix;
                }
                prefix = formatPrefix(prefix);
                if (!fixes[prefix]) fixes[prefix] = [];
                fixes[prefix].push(splitPhrase[j]);
            }
        }
    }

    setup();
    digest(phraseList);
    return generate();
};
