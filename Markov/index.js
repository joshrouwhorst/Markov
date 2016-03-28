module.exports = MarkovPackage = {};

function Path() {
    this.percent = 0;
    this.state = null;
}

function State() {
    var opts = {
    };
    var _this = this;
    var newValue = 0;

    this._markov = null;
    this.value = 0;
    this.paths = {
        incoming: [],
        outgoing: []
    }

    this.createPath = function () {
        var path = new Path();
        _this.paths.outgoing.push(path);
        return path;
    }

    this.removePath = function (path) {
        var index = _this.paths.outgoing.indexOf(path);
        if (index > -1) {
            _this.paths.outgoing.splice(index, 1);
        }
    }

    this._setOptions = function (options) {
        for (var opt in opts) {
            if (options.hasOwnProperty(opt)) {
                opts[opt] = options[opt];
            }
        }
    };

    this._run = function () {
        if (!_this._markov.simulation) {
            var val = 0;
            for (var i = 0; i < _this.paths.incoming.length; i++) {
                var path =  _this.paths.incoming[i]
                val += path.state.value * path.percent;
            }
            newValue = val;
        }
        else {
            var randomNumber = Math.random();
            var percent = 0;
            for (var i = 0; i < _this.paths.outgoing.length; i++) {
                var path =  _this.paths.outgoing[i];
                percent += path.percent;
                if (randomNumber <= percent) {
                    _this._markov.currentState = path.state;
                    break;
                }
            }
        }
    }

    this._update = function () {
        _this.value = newValue;
    }

    this._resetPaths = function () {
        _this.paths.incoming.splice(0, _this.paths.incoming.length);
    }

    this._digest = function () {
        if (!_this._markov.simulation) {
            for (var i = 0; i < _this.paths.outgoing.length; i++) {
                var path = _this.paths.outgoing[i];
                var newPath = new Path();
                newPath.percent = path.percent;
                newPath.state = _this;
                _this.paths.outgoing[i].state.paths.incoming.push(newPath);
            }
        }
        else {
            _this.paths.outgoing.sort(function (a, b) {
                if (a.percent < b.percent) return -1;
                else if (a.percent > b.percent) return 1;
                else return 0;
            });
        }
    }
}

function Markov() {
    var states = [];
    var _this = this;

    this.simulation = false;
    this.currentState = null;

    this.createState = function () {
        var state = new State();
        state._markov = _this;
        states.push(state);
        return state;
    };

    this.removeState = function (state) {
        var index = states.indexOf(state);
        if (index > -1) {
            states.splice(index, 1);
        }
    };

    this.setOptions = function (options) {
        for (var opt in opts) {
            if (options.hasOwnProperty(opt)) {
                opts[opt] = options[opt];
            }
        }
    };

    this.digest = function () {
        for (var i = 0; i < states.length; i++) {
            states[i]._resetPaths();
        }
        for (i = 0; i < states.length; i++) {
            states[i]._digest();
        }
    };

    this.run = function () {
        if (_this.simulation) {
            _this.currentState._run();
        }
        else {
            for (var i = 0; i < states.length; i++) {
                states[i]._run();
            }

            for (i = 0; i < states.length; i++) {
                states[i]._update();
            }
        }
    };
}

MarkovPackage.createMarkov = function () {
    return new Markov();
};
