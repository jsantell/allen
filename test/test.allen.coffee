ctx = null
mediaElement = document.createElement('audio')
describe 'Audio Context', () ->

  before () ->
    ctx = allen.getAudioContext()

  describe 'getAudioContext', () ->
    it 'creates an appropriate AudioContext node if doesn\'t exist', () ->
      allen.isAudioContext(ctx).should.be.true
    it 'returns the previous ctx if already exists', () ->
      allen.getAudioContext().should.equal(ctx)

  describe 'setAudioContext', () ->
    it 'throws an error when passing in a non-AudioContext', () ->
      fn = () -> allen.setAudioContext({})
      expect(fn).to.throw.Error
    it 'sets the AudioContext to be returned from getAudioContext', () ->
      delete allen.context
      c = window.AudioContext || window.webkitAudioContext
      c = new c()
      allen.setAudioContext c
      allen.context.should.equal c
      allen.getAudioContext().should.equal c
      ctx = c

describe 'Type checking', () ->
  sourceNodes = audioNodes = nonAudio = []
  before () ->
    sourceNodes = [
      ctx.createBufferSource()
      ctx.createMediaElementSource mediaElement
      # ctx.createMediaStreamSource
      ctx.createOscillator()
    ]
    
    audioNodes = [
      ctx[ if ctx.createScriptProcessor? then 'createScriptProcessor' else 'createJavaScriptNode' ](1024)
      ctx.createAnalyser()
      ctx.createGainNode()
      ctx.createDelayNode()
      ctx.createBiquadFilter()
      ctx.createWaveShaper()
      ctx.createPanner()
      ctx.createConvolver()
      ctx.createChannelSplitter()
      ctx.createChannelMerger()
      ctx.createDynamicsCompressor()
    ]

    nonAudio = [
      undefined
      {}
      'test'
      1
      null
      true
      false
    ]

  describe 'isAudioContext', () ->
    it 'returns false for objects, strings, numbers, falsy values', () ->
      for i in nonAudio
        allen.isAudioContext(i).should.be.false
    it 'returns false for audio nodes, buffers', () ->
      allen.isAudioContext(ctx.createGainNode()).should.be.false
      allen.isAudioContext(ctx.createBuffer(2,1024,44100)).should.be.false
    it 'returns true for AudioContext', () ->
      allen.isAudioContext(allen.context).should.be.true
      allen.isAudioContext(ctx).should.be.true

  describe 'isAudioSource', () ->
    it 'returns true for buffer, element, stream and oscillator sources', () ->
      for node in sourceNodes
        allen.isAudioSource( node ).should.be.equal true
    it 'returns false for normal audio nodes and destination nodes and contexts', () ->
      for node in audioNodes
        allen.isAudioSource( node ).should.be.equal false
      allen.isAudioSource( ctx.destination ).should.be.false
      allen.isAudioSource( ctx ).should.be.false
    it 'returns false for non audio objects', () ->
      for node in nonAudio
        allen.isAudioSource( node ).should.be.equal false

  describe 'isAudioNode', () ->
    it 'returns true for all nodes', () ->
      for node in sourceNodes
        allen.isAudioNode( node ).should.be.true
      for node in audioNodes
        allen.isAudioNode( node ).should.be.true
      allen.isAudioNode( ctx.destination ).should.be.true
    it 'returns false for non audio, contexts', () ->
      for node in nonAudio
        allen.isAudioNode( node ).should.be.false
      allen.isAudioNode( ctx ).should.be.false
  
  describe 'isAudioDestination', () ->
    it 'returns true for destination node', () ->
      allen.isAudioDestination( ctx.destination ).should.be.true
    it 'returns false for all other audio nodes, non-audio', () ->
      for node in sourceNodes
        allen.isAudioDestination( node ).should.be.false
      for node in audioNodes
        allen.isAudioDestination( node ).should.be.false
      for node in nonAudio
        allen.isAudioDestination( node ).should.be.false
      allen.isAudioDestination( ctx ).should.be.false
  
  describe 'isRegularAudioNode', () ->
    it 'returns true for all non-destination, non-source nodes', () ->
      for node in audioNodes
        allen.isRegularAudioNode( node ).should.be.true
    it 'returns false for non audio, contexts, source and destination nodes', () ->
      for node in sourceNodes
        allen.isRegularAudioNode( node ).should.be.false
      for node in nonAudio
        allen.isRegularAudioNode( node ).should.be.false
      allen.isRegularAudioNode( ctx ).should.be.false
      allen.isRegularAudioNode( ctx.destination ).should.be.false

  describe 'isAudioParam', () ->
    it 'returns true for AudioParam instances', () ->
      allen.isAudioParam( ctx.createGainNode().gain ).should.be.true
    it 'returns false for non audio and all nodes, contexts', () ->
      for node in audioNodes
        allen.isAudioParam( node ).should.be.false
      for node in sourceNodes
        allen.isAudioParam( node ).should.be.false
      for node in nonAudio
        allen.isAudioParam( node ).should.be.false
      allen.isAudioParam( ctx ).should.be.false
      allen.isAudioParam( ctx.destination ).should.be.false

describe 'canPlayType', () ->
  it 'matches the browser\'s mp3 capability', () ->
    allen.canPlayType( 'mp3' ).should.equal( !!(mediaElement.canPlayType and
      mediaElement.canPlayType('audio/mpeg;')) )
  it 'matches the browser\'s ogg capability', () ->
    allen.canPlayType( 'ogg' ).should.equal( !!(mediaElement.canPlayType and
      mediaElement.canPlayType('audio/ogg; codecs="vorbis"')) )
  it 'matches the browser\'s wav capability', () ->
    allen.canPlayType( 'wav' ).should.equal( !!(mediaElement.canPlayType and
      mediaElement.canPlayType('audio/wav; codecs="1"')) )
  it 'matches the browser\'s aac capability', () ->
    allen.canPlayType( 'm4a' ).should.equal( !!(mediaElement.canPlayType and
      mediaElement.canPlayType('audio/aac;')) or !!(mediaElement.canPlayType and
      mediaElement.canPlayType('audio/x-m4a;')) )
