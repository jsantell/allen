(function() {
  var allen, checkCurrentType, checkProtoChainFor, root, toStringMatch;

  root = this;

  allen = {
    getAudioContext: function() {
      var ctx;
      if (this.context != null) {
        return this.context;
      }
      ctx = root.AudioContext || root.webkitAudioContext;
      if (ctx) {
        return this.context = new ctx();
      } else {
        return null;
      }
    },
    setAudioContext: function(context) {
      if (this.isAudioContext(context)) {
        return this.context = context;
      } else {
        throw new Error('setAudioContext only accepts an AudioContext object');
      }
    },
    isAudioContext: function(node) {
      return checkCurrentType(node, 'AudioContext');
    },
    isAudioSource: function(node) {
      return checkProtoChainFor(node, 'AudioSourceNode');
    },
    isAudioNode: function(node) {
      return checkProtoChainFor(node, 'AudioNode');
    },
    isAudioDestination: function(node) {
      return checkCurrentType(node, 'AudioDestinationNode');
    },
    isRegularAudioNode: function(node) {
      return this.isAudioNode(node) && !this.isAudioDestination(node) && !this.isAudioSource(node);
    },
    isAudioParam: function(param) {
      return checkProtoChainFor(param, 'AudioParam');
    }
  };

  checkCurrentType = function(node, goalName) {
    var _ref;
    if (typeof node !== 'object' || !node) {
      return false;
    }
    return (node != null ? (_ref = node.constructor) != null ? _ref.name : void 0 : void 0) === goalName || toStringMatch(node, goalName);
  };

  checkProtoChainFor = function(node, goalName) {
    var pType, _ref;
    if (typeof node !== 'object' || !node) {
      return false;
    }
    pType = Object.getPrototypeOf(node);
    while (pType !== Object.getPrototypeOf({})) {
      if ((pType != null ? (_ref = pType.constructor) != null ? _ref.name : void 0 : void 0) === goalName || toStringMatch(pType, "" + goalName + "Prototype")) {
        return true;
      }
      pType = Object.getPrototypeOf(pType);
    }
    return false;
  };

  toStringMatch = function(object, name) {
    return !!toString.call(object).match(new RegExp("^\\[object " + name + "\\]$"));
  };

  if (typeof exports === 'object') {
    module.exports = allen;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return allen;
    });
  } else {
    root.allen = allen;
  }

}).call(this);
