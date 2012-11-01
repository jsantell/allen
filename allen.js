(function() {
  var Allen;

  Allen = {
    makeAudioContext: function() {
      var ctx;
      ctx = root.AudioContext || root.webkitAudioContext;
      return new ctx();
    },
    isAudioContext: function(node) {
      var _ref, _ref1;
      return ((_ref = Object.getPrototypeOf(node)) != null ? (_ref1 = _ref.constructor) != null ? _ref1.name : void 0 : void 0) === 'AudioContext';
    },
    isAudioSource: function(node) {
      return checkProtoChainFor(node, 'AudioSourceNode');
    },
    isAudioNode: function(node) {
      return checkProtoChainFor(node, 'AudioNode');
    },
    isAudioDestination: function(node) {
      return checkProtoChainFor(node, 'AudioDestinationNode');
    },
    isRegularAudioNode: function(node) {
      return this.isAudioNode(node) && !this.isAudioDestination(node) && !this.isAudioSource(node);
    },
    isAudioParam: function(node) {
      return checkProtoChainFor(node, 'AudioParam');
    }
  };

  checkProtoChainFor(node, protoName)(function() {
    var proto, _ref, _ref1;
    if (typeof node !== 'object') {
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
  });

}).call(this);
