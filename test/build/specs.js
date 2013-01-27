(function() {
  var ctx, mediaElement;

  ctx = null;

  mediaElement = document.createElement('audio');

  describe('Audio Context', function() {
    before(function() {
      return ctx = allen.getAudioContext();
    });
    describe('getAudioContext', function() {
      it('creates an appropriate AudioContext node if doesn\'t exist', function() {
        return allen.isAudioContext(ctx).should.be["true"];
      });
      return it('returns the previous ctx if already exists', function() {
        return allen.getAudioContext().should.equal(ctx);
      });
    });
    return describe('setAudioContext', function() {
      it('throws an error when passing in a non-AudioContext', function() {
        var fn;
        fn = function() {
          return allen.setAudioContext({});
        };
        return expect(fn).to["throw"].Error;
      });
      return it('sets the AudioContext to be returned from getAudioContext', function() {
        var c;
        delete allen.context;
        c = window.AudioContext || window.webkitAudioContext;
        c = new c();
        allen.setAudioContext(c);
        allen.context.should.equal(c);
        allen.getAudioContext().should.equal(c);
        return ctx = c;
      });
    });
  });

  describe('Type checking', function() {
    var audioNodes, nonAudio, sourceNodes;
    sourceNodes = audioNodes = nonAudio = [];
    before(function() {
      sourceNodes = [ctx.createBufferSource(), ctx.createMediaElementSource(mediaElement), ctx.createOscillator()];
      audioNodes = [ctx[ctx.createScriptProcessor != null ? 'createScriptProcessor' : 'createJavaScriptNode'](1024), ctx.createAnalyser(), ctx.createGainNode(), ctx.createDelayNode(), ctx.createBiquadFilter(), ctx.createWaveShaper(), ctx.createPanner(), ctx.createConvolver(), ctx.createChannelSplitter(), ctx.createChannelMerger(), ctx.createDynamicsCompressor()];
      return nonAudio = [void 0, {}, 'test', 1, null, true, false];
    });
    describe('isAudioContext', function() {
      it('returns false for objects, strings, numbers, falsy values', function() {
        var i, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nonAudio.length; _i < _len; _i++) {
          i = nonAudio[_i];
          _results.push(allen.isAudioContext(i).should.be["false"]);
        }
        return _results;
      });
      it('returns false for audio nodes, buffers', function() {
        allen.isAudioContext(ctx.createGainNode()).should.be["false"];
        return allen.isAudioContext(ctx.createBuffer(2, 1024, 44100)).should.be["false"];
      });
      return it('returns true for AudioContext', function() {
        allen.isAudioContext(allen.context).should.be["true"];
        return allen.isAudioContext(ctx).should.be["true"];
      });
    });
    describe('isAudioSource', function() {
      it('returns true for buffer, element, stream and oscillator sources', function() {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = sourceNodes.length; _i < _len; _i++) {
          node = sourceNodes[_i];
          _results.push(allen.isAudioSource(node).should.be.equal(true));
        }
        return _results;
      });
      it('returns false for normal audio nodes and destination nodes and contexts', function() {
        var node, _i, _len;
        for (_i = 0, _len = audioNodes.length; _i < _len; _i++) {
          node = audioNodes[_i];
          allen.isAudioSource(node).should.be.equal(false);
        }
        allen.isAudioSource(ctx.destination).should.be["false"];
        return allen.isAudioSource(ctx).should.be["false"];
      });
      return it('returns false for non audio objects', function() {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nonAudio.length; _i < _len; _i++) {
          node = nonAudio[_i];
          _results.push(allen.isAudioSource(node).should.be.equal(false));
        }
        return _results;
      });
    });
    describe('isAudioNode', function() {
      it('returns true for all nodes', function() {
        var node, _i, _j, _len, _len1;
        for (_i = 0, _len = sourceNodes.length; _i < _len; _i++) {
          node = sourceNodes[_i];
          allen.isAudioNode(node).should.be["true"];
        }
        for (_j = 0, _len1 = audioNodes.length; _j < _len1; _j++) {
          node = audioNodes[_j];
          allen.isAudioNode(node).should.be["true"];
        }
        return allen.isAudioNode(ctx.destination).should.be["true"];
      });
      return it('returns false for non audio, contexts', function() {
        var node, _i, _len;
        for (_i = 0, _len = nonAudio.length; _i < _len; _i++) {
          node = nonAudio[_i];
          allen.isAudioNode(node).should.be["false"];
        }
        return allen.isAudioNode(ctx).should.be["false"];
      });
    });
    describe('isAudioDestination', function() {
      it('returns true for destination node', function() {
        return allen.isAudioDestination(ctx.destination).should.be["true"];
      });
      return it('returns false for all other audio nodes, non-audio', function() {
        var node, _i, _j, _k, _len, _len1, _len2;
        for (_i = 0, _len = sourceNodes.length; _i < _len; _i++) {
          node = sourceNodes[_i];
          allen.isAudioDestination(node).should.be["false"];
        }
        for (_j = 0, _len1 = audioNodes.length; _j < _len1; _j++) {
          node = audioNodes[_j];
          allen.isAudioDestination(node).should.be["false"];
        }
        for (_k = 0, _len2 = nonAudio.length; _k < _len2; _k++) {
          node = nonAudio[_k];
          allen.isAudioDestination(node).should.be["false"];
        }
        return allen.isAudioDestination(ctx).should.be["false"];
      });
    });
    describe('isRegularAudioNode', function() {
      it('returns true for all non-destination, non-source nodes', function() {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = audioNodes.length; _i < _len; _i++) {
          node = audioNodes[_i];
          _results.push(allen.isRegularAudioNode(node).should.be["true"]);
        }
        return _results;
      });
      return it('returns false for non audio, contexts, source and destination nodes', function() {
        var node, _i, _j, _len, _len1;
        for (_i = 0, _len = sourceNodes.length; _i < _len; _i++) {
          node = sourceNodes[_i];
          allen.isRegularAudioNode(node).should.be["false"];
        }
        for (_j = 0, _len1 = nonAudio.length; _j < _len1; _j++) {
          node = nonAudio[_j];
          allen.isRegularAudioNode(node).should.be["false"];
        }
        allen.isRegularAudioNode(ctx).should.be["false"];
        return allen.isRegularAudioNode(ctx.destination).should.be["false"];
      });
    });
    return describe('isAudioParam', function() {
      it('returns true for AudioParam instances', function() {
        return allen.isAudioParam(ctx.createGainNode().gain).should.be["true"];
      });
      return it('returns false for non audio and all nodes, contexts', function() {
        var node, _i, _j, _k, _len, _len1, _len2;
        for (_i = 0, _len = audioNodes.length; _i < _len; _i++) {
          node = audioNodes[_i];
          allen.isAudioParam(node).should.be["false"];
        }
        for (_j = 0, _len1 = sourceNodes.length; _j < _len1; _j++) {
          node = sourceNodes[_j];
          allen.isAudioParam(node).should.be["false"];
        }
        for (_k = 0, _len2 = nonAudio.length; _k < _len2; _k++) {
          node = nonAudio[_k];
          allen.isAudioParam(node).should.be["false"];
        }
        allen.isAudioParam(ctx).should.be["false"];
        return allen.isAudioParam(ctx.destination).should.be["false"];
      });
    });
  });

  describe('canPlayType', function() {
    it('matches the browser\'s mp3 capability', function() {
      return allen.canPlayType('mp3').should.equal(!!(mediaElement.canPlayType && mediaElement.canPlayType('audio/mpeg;')));
    });
    it('matches the browser\'s ogg capability', function() {
      return allen.canPlayType('ogg').should.equal(!!(mediaElement.canPlayType && mediaElement.canPlayType('audio/ogg; codecs="vorbis"')));
    });
    it('matches the browser\'s wav capability', function() {
      return allen.canPlayType('wav').should.equal(!!(mediaElement.canPlayType && mediaElement.canPlayType('audio/wav; codecs="1"')));
    });
    return it('matches the browser\'s aac capability', function() {
      return allen.canPlayType('m4a').should.equal(!!(mediaElement.canPlayType && mediaElement.canPlayType('audio/aac;')) || !!(mediaElement.canPlayType && mediaElement.canPlayType('audio/x-m4a;')));
    });
  });

}).call(this);
