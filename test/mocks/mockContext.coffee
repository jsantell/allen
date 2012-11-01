# Web Audio API Mocks
#
# For use with unit testing parts of the Web Audio API
# Very basic, could use more love

class AudioNode
  connect: () ->
  disconnect: () ->
  AudioContext: undefined
  numberOfInputs: 1
  numberOfOutputs: 1

class AudioSourceNode extends AudioNode
  numberOfInputs: 0

class AudioDestinationNode extends AudioNode
  numberOfOutputs: 0

class AudioParam
  cancelScheduledValues: () ->
  exponentialRampToValueAtTime: () ->
  linearRampToValueAtTime: () ->
  setTargetValueAtTime: () ->
  setValueAtTime: () ->
  setValueCurveAtTime: () ->

class AudioBufferSourceNode extends AudioSourceNode
class MediaElementAudioSourceNode extends AudioSourceNode
  constructor: ( @mediaElement ) ->
    type = @mediaElement?.constructor?.name
    if type isnt 'HTMLAudioElement' or
    type isnt 'HTMLVideoElement' or
    type isnt 'HTMLMediaElement'
      console.log 'error'
      # throw new Error 'INVALID_STATE_ERR: DOM Exception 11'
class MediaStreamAudioSourceNode extends AudioSourceNode
  constructor: ( @mediaStream ) ->
    type = @mediaStream?.constructor?.name
    if type isnt 'LocalMediaStream'
      throw new Error 'INVALID_STATE_ERR: DOM Exception 11'
class OscillatorNode extends AudioSourceNode

class ScriptProcessorNode extends AudioNode
  constructor: ( @bufferSize ) ->
    throw new Error 'Not enough arguments' unless @bufferSize?
class JavaScriptNode extends AudioNode
  constructor: ( @bufferSize ) ->
    throw new Error 'Not enough arguments' unless @bufferSize?
class AnalyserNode extends AudioNode
class GainNode extends AudioNode
  constructor: () ->
    @gain = new (class AudioGain extends AudioParam)()
class DelayNode extends AudioNode
class BiquadFilterNode extends AudioNode
class WaveShaperNode extends AudioNode
class PannerNode extends AudioNode
class ConvolverNode extends AudioNode
class ChannelSplitterNode extends AudioNode
class ChannelMergerNode extends AudioNode
class DynamicsCompressorNode extends AudioNode
class WaveTable

  
class AudioListener
  dopplerFactor: 1
  speedOfSound: 343.3

class AudioBuffer
  constructor: (@numberOfChannels, @length, @sampleRate) ->
  gain: 1
  duration: 0

class AudioContext
  constructor: () ->
    @destination = new AudioDestinationNode()
    @listener = new AudioListener()
  activeSourceCount: 0
  sampleRate: 44100
  currentTime: 0
  createBuffer: ( channels, length, rate ) ->
    new AudioBuffer( channels, length, rate )
  decodeAudioData: () ->
  createBufferSource: () -> new AudioBufferSourceNode()
  createMediaElementSource: ( mediaElement ) ->
    new MediaElementAudioSourceNode( mediaElement )
  createMediaStreamSource: () -> new MediaStreamAudioSourceNode()
  createOscillator: () -> new OscillatorNode()
  createScriptProcessor: (bufferSize) ->
    new ScriptProcessorNode(bufferSize)
  createAnalyser: () -> new AnalyserNode()
  createGain: () -> new GainNode()
  createDelay: () -> new DelayNode()
  createBiquadFilter: () -> new BiquadFilterNode()
  createWaveShaper: () -> new WaveShaperNode()
  createPanner: () -> new PannerNode()
  createConvolver: () -> new ConvolverNode()
  createChannelSplitter: () -> new ChannelSplitterNode()
  createChannelMerger: () -> new ChannelMergerNode()
  createDynamicsCompressor: () -> new DynamicsCompressorNode()
  createWaveTable: () -> new WaveTable()

  # Deprecated methods
  createJavaScriptNode: (bufferSize) ->
    new JavaScriptNode(bufferSize)
  createGainNode: () -> @createGain()
  createDelayNode: () -> @createDelay()

@AudioContext = AudioContext
