(function() {
  var allen, checkCurrentProtoFor, checkProtoChainFor, root;

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
      return checkCurrentProtoFor(node, 'AudioContext');
    },
    isAudioSource: function(node) {
      return checkProtoChainFor(node, 'AudioSourceNode');
    },
    isAudioNode: function(node) {
      return checkProtoChainFor(node, 'AudioNode');
    },
    isAudioDestination: function(node) {
      return checkCurrentProtoFor(node, 'AudioDestinationNode');
    },
    isRegularAudioNode: function(node) {
      return this.isAudioNode(node) && !this.isAudioDestination(node) && !this.isAudioSource(node);
    },
    isAudioParam: function(param) {
      return checkProtoChainFor(param, 'AudioParam');
    }
  };

  checkCurrentProtoFor = function(node, protoName) {
    var _ref, _ref1;
    if (typeof node !== 'object' || !node) {
      return false;
    }
    return ((_ref = Object.getPrototypeOf(node)) != null ? (_ref1 = _ref.constructor) != null ? _ref1.name : void 0 : void 0) === protoName;
  };

  checkProtoChainFor = function(node, protoName) {
    var proto, _ref, _ref1;
    if (typeof node !== 'object' || !node) {
      return false;
    }
    proto = Object.getPrototypeOf(node);
    while ((proto != null ? (_ref1 = proto.constructor) != null ? _ref1.name : void 0 : void 0) !== 'Object') {
      proto = Object.getPrototypeOf(proto);
      if ((proto != null ? (_ref = proto.constructor) != null ? _ref.name : void 0 : void 0) === protoName) {
        return true;
      }
    }
    return false;
  };

  root.allen = allen;

}).call(this);
