(function() {
  var AudioNodePrototype, context, makeNode;

  context = new window.webkitAudioContext();

  AudioNodePrototype = AudioPlus.AudioNodePrototype;

  makeNode = function() {
    if (context.createGain) {
      return context.createGain();
    } else {
      return context.createGainNode();
    }
  };

  describe('AudioNodePrototype', function() {
    return describe('constructor', function() {
      it('assigns node argument to both input and output', function() {
        var instance, node;
        node = makeNode();
        instance = new AudioNodePrototype(node);
        instance.input.should.equal(node);
        return instance.output.should.equal(node);
      });
      it('creates an instance of AudioNodePrototype', function() {
        var node;
        node = makeNode();
        return (new AudioNodePrototype(node)).should.be["instanceof"](AudioNodePrototype);
      });
      return it('throws an error when no node is passed', function() {
        var fn;
        fn = function() {
          return new AudioNodePrototype();
        };
        return expect(fn).to["throw"](Error);
      });
    });
  });

}).call(this);
