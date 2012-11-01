context = new window.webkitAudioContext()
AudioNodePrototype = AudioPlus.AudioNodePrototype

makeNode = () ->
  if context.createGain then context.createGain() else context.createGainNode()

describe 'AudioNodePrototype', () ->

  describe 'constructor', () ->
    
    it 'assigns node argument to both input and output', () ->
      node = makeNode()
      instance = new AudioNodePrototype node
      instance.input.should.equal node
      instance.output.should.equal node

    it 'creates an instance of AudioNodePrototype', () ->
      node = makeNode()
      (new AudioNodePrototype node).should.be.instanceof AudioNodePrototype

    it 'throws an error when no node is passed', () ->
      fn = () -> new AudioNodePrototype()
      expect( fn ).to.throw Error
