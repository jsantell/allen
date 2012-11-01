(function() {
  var AnalyserNode, AudioBuffer, AudioBufferSourceNode, AudioContext, AudioDestinationNode, AudioListener, AudioNode, AudioParam, AudioSourceNode, BiquadFilterNode, ChannelMergerNode, ChannelSplitterNode, ConvolverNode, DelayNode, DynamicsCompressorNode, GainNode, JavaScriptNode, MediaElementAudioSourceNode, MediaStreamAudioSourceNode, OscillatorNode, PannerNode, ScriptProcessorNode, WaveShaperNode, WaveTable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AudioNode = (function() {

    function AudioNode() {}

    AudioNode.prototype.connect = function() {};

    AudioNode.prototype.disconnect = function() {};

    AudioNode.prototype.AudioContext = void 0;

    AudioNode.prototype.numberOfInputs = 1;

    AudioNode.prototype.numberOfOutputs = 1;

    return AudioNode;

  })();

  AudioSourceNode = (function(_super) {

    __extends(AudioSourceNode, _super);

    function AudioSourceNode() {
      return AudioSourceNode.__super__.constructor.apply(this, arguments);
    }

    AudioSourceNode.prototype.numberOfInputs = 0;

    return AudioSourceNode;

  })(AudioNode);

  AudioDestinationNode = (function(_super) {

    __extends(AudioDestinationNode, _super);

    function AudioDestinationNode() {
      return AudioDestinationNode.__super__.constructor.apply(this, arguments);
    }

    AudioDestinationNode.prototype.numberOfOutputs = 0;

    return AudioDestinationNode;

  })(AudioNode);

  AudioParam = (function() {

    function AudioParam() {}

    AudioParam.prototype.cancelScheduledValues = function() {};

    AudioParam.prototype.exponentialRampToValueAtTime = function() {};

    AudioParam.prototype.linearRampToValueAtTime = function() {};

    AudioParam.prototype.setTargetValueAtTime = function() {};

    AudioParam.prototype.setValueAtTime = function() {};

    AudioParam.prototype.setValueCurveAtTime = function() {};

    return AudioParam;

  })();

  AudioBufferSourceNode = (function(_super) {

    __extends(AudioBufferSourceNode, _super);

    function AudioBufferSourceNode() {
      return AudioBufferSourceNode.__super__.constructor.apply(this, arguments);
    }

    return AudioBufferSourceNode;

  })(AudioSourceNode);

  MediaElementAudioSourceNode = (function(_super) {

    __extends(MediaElementAudioSourceNode, _super);

    function MediaElementAudioSourceNode(mediaElement) {
      var type, _ref, _ref1;
      this.mediaElement = mediaElement;
      type = (_ref = this.mediaElement) != null ? (_ref1 = _ref.constructor) != null ? _ref1.name : void 0 : void 0;
      if (type !== 'HTMLAudioElement' || type !== 'HTMLVideoElement' || type !== 'HTMLMediaElement') {
        console.log('error');
      }
    }

    return MediaElementAudioSourceNode;

  })(AudioSourceNode);

  MediaStreamAudioSourceNode = (function(_super) {

    __extends(MediaStreamAudioSourceNode, _super);

    function MediaStreamAudioSourceNode(mediaStream) {
      var type, _ref, _ref1;
      this.mediaStream = mediaStream;
      type = (_ref = this.mediaStream) != null ? (_ref1 = _ref.constructor) != null ? _ref1.name : void 0 : void 0;
      if (type !== 'LocalMediaStream') {
        throw new Error('INVALID_STATE_ERR: DOM Exception 11');
      }
    }

    return MediaStreamAudioSourceNode;

  })(AudioSourceNode);

  OscillatorNode = (function(_super) {

    __extends(OscillatorNode, _super);

    function OscillatorNode() {
      return OscillatorNode.__super__.constructor.apply(this, arguments);
    }

    return OscillatorNode;

  })(AudioSourceNode);

  ScriptProcessorNode = (function(_super) {

    __extends(ScriptProcessorNode, _super);

    function ScriptProcessorNode(bufferSize) {
      this.bufferSize = bufferSize;
      if (this.bufferSize == null) {
        throw new Error('Not enough arguments');
      }
    }

    return ScriptProcessorNode;

  })(AudioNode);

  JavaScriptNode = (function(_super) {

    __extends(JavaScriptNode, _super);

    function JavaScriptNode(bufferSize) {
      this.bufferSize = bufferSize;
      if (this.bufferSize == null) {
        throw new Error('Not enough arguments');
      }
    }

    return JavaScriptNode;

  })(AudioNode);

  AnalyserNode = (function(_super) {

    __extends(AnalyserNode, _super);

    function AnalyserNode() {
      return AnalyserNode.__super__.constructor.apply(this, arguments);
    }

    return AnalyserNode;

  })(AudioNode);

  GainNode = (function(_super) {

    __extends(GainNode, _super);

    function GainNode() {
      var AudioGain;
      this.gain = new (AudioGain = (function(_super1) {

        __extends(AudioGain, _super1);

        function AudioGain() {
          return AudioGain.__super__.constructor.apply(this, arguments);
        }

        return AudioGain;

      })(AudioParam))();
    }

    return GainNode;

  })(AudioNode);

  DelayNode = (function(_super) {

    __extends(DelayNode, _super);

    function DelayNode() {
      return DelayNode.__super__.constructor.apply(this, arguments);
    }

    return DelayNode;

  })(AudioNode);

  BiquadFilterNode = (function(_super) {

    __extends(BiquadFilterNode, _super);

    function BiquadFilterNode() {
      return BiquadFilterNode.__super__.constructor.apply(this, arguments);
    }

    return BiquadFilterNode;

  })(AudioNode);

  WaveShaperNode = (function(_super) {

    __extends(WaveShaperNode, _super);

    function WaveShaperNode() {
      return WaveShaperNode.__super__.constructor.apply(this, arguments);
    }

    return WaveShaperNode;

  })(AudioNode);

  PannerNode = (function(_super) {

    __extends(PannerNode, _super);

    function PannerNode() {
      return PannerNode.__super__.constructor.apply(this, arguments);
    }

    return PannerNode;

  })(AudioNode);

  ConvolverNode = (function(_super) {

    __extends(ConvolverNode, _super);

    function ConvolverNode() {
      return ConvolverNode.__super__.constructor.apply(this, arguments);
    }

    return ConvolverNode;

  })(AudioNode);

  ChannelSplitterNode = (function(_super) {

    __extends(ChannelSplitterNode, _super);

    function ChannelSplitterNode() {
      return ChannelSplitterNode.__super__.constructor.apply(this, arguments);
    }

    return ChannelSplitterNode;

  })(AudioNode);

  ChannelMergerNode = (function(_super) {

    __extends(ChannelMergerNode, _super);

    function ChannelMergerNode() {
      return ChannelMergerNode.__super__.constructor.apply(this, arguments);
    }

    return ChannelMergerNode;

  })(AudioNode);

  DynamicsCompressorNode = (function(_super) {

    __extends(DynamicsCompressorNode, _super);

    function DynamicsCompressorNode() {
      return DynamicsCompressorNode.__super__.constructor.apply(this, arguments);
    }

    return DynamicsCompressorNode;

  })(AudioNode);

  WaveTable = (function() {

    function WaveTable() {}

    return WaveTable;

  })();

  AudioListener = (function() {

    function AudioListener() {}

    AudioListener.prototype.dopplerFactor = 1;

    AudioListener.prototype.speedOfSound = 343.3;

    return AudioListener;

  })();

  AudioBuffer = (function() {

    function AudioBuffer(numberOfChannels, length, sampleRate) {
      this.numberOfChannels = numberOfChannels;
      this.length = length;
      this.sampleRate = sampleRate;
    }

    AudioBuffer.prototype.gain = 1;

    AudioBuffer.prototype.duration = 0;

    return AudioBuffer;

  })();

  AudioContext = (function() {

    function AudioContext() {
      this.destination = new AudioDestinationNode();
      this.listener = new AudioListener();
    }

    AudioContext.prototype.activeSourceCount = 0;

    AudioContext.prototype.sampleRate = 44100;

    AudioContext.prototype.currentTime = 0;

    AudioContext.prototype.createBuffer = function(channels, length, rate) {
      return new AudioBuffer(channels, length, rate);
    };

    AudioContext.prototype.decodeAudioData = function() {};

    AudioContext.prototype.createBufferSource = function() {
      return new AudioBufferSourceNode();
    };

    AudioContext.prototype.createMediaElementSource = function(mediaElement) {
      return new MediaElementAudioSourceNode(mediaElement);
    };

    AudioContext.prototype.createMediaStreamSource = function() {
      return new MediaStreamAudioSourceNode();
    };

    AudioContext.prototype.createOscillator = function() {
      return new OscillatorNode();
    };

    AudioContext.prototype.createScriptProcessor = function(bufferSize) {
      return new ScriptProcessorNode(bufferSize);
    };

    AudioContext.prototype.createAnalyser = function() {
      return new AnalyserNode();
    };

    AudioContext.prototype.createGain = function() {
      return new GainNode();
    };

    AudioContext.prototype.createDelay = function() {
      return new DelayNode();
    };

    AudioContext.prototype.createBiquadFilter = function() {
      return new BiquadFilterNode();
    };

    AudioContext.prototype.createWaveShaper = function() {
      return new WaveShaperNode();
    };

    AudioContext.prototype.createPanner = function() {
      return new PannerNode();
    };

    AudioContext.prototype.createConvolver = function() {
      return new ConvolverNode();
    };

    AudioContext.prototype.createChannelSplitter = function() {
      return new ChannelSplitterNode();
    };

    AudioContext.prototype.createChannelMerger = function() {
      return new ChannelMergerNode();
    };

    AudioContext.prototype.createDynamicsCompressor = function() {
      return new DynamicsCompressorNode();
    };

    AudioContext.prototype.createWaveTable = function() {
      return new WaveTable();
    };

    AudioContext.prototype.createJavaScriptNode = function(bufferSize) {
      return new JavaScriptNode(bufferSize);
    };

    AudioContext.prototype.createGainNode = function() {
      return this.createGain();
    };

    AudioContext.prototype.createDelayNode = function() {
      return this.createDelay();
    };

    return AudioContext;

  })();

  this.AudioContext = AudioContext;

}).call(this);
