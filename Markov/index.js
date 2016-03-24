exports.create = function(phraseList, prefixLength) {
    var fixes = {};

    function getPrefix(phrase) {
        var splitPhrase = phrase.split(' ');
        var prefix = '';
        for (var i = 1; i <= prefixLength; i++) {
            var index = splitPhrase.length - i;
            if (index < 0) {
                break;
            }
            prefix = splitPhrase[index] + ' ' + prefix;
        }
        return prefix.trim();
    }

    function generateSuffix(phrase, prefix) {
        if (prefix === '') {
            prefix = '_';
        }

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

    function digest() {
        for (var i = 0; i < phraseList.length; i++) {
            var splitPhrase = phraseList[i].split(' ');

            for (var j = 0; j < splitPhrase.length; j++) {
                var prefix = '';
                for (var k = 1; k <= prefixLength; k++) {
                    if (j - k < 0) {
                        break;
                    }
                    prefix = splitPhrase[j - k] + ' ' + prefix;
                }
                prefix = prefix.trim();

                if (prefix === '') {
                    prefix = '_';
                }

                if (!fixes[prefix]) {
                    fixes[prefix] = [];
                }

                fixes[prefix].push(splitPhrase[j]);
            }
        }
    }

    digest(phraseList);
    return generate();
};
