root = @
allen =

  getAudioContext: () ->
    return @context if @context?
    ctx = root.AudioContext or root.webkitAudioContext
    if ctx
      @context = new ctx()
    else
      null

  setAudioContext: ( context ) ->
    if @isAudioContext( context )
      @context = context
    else
      throw new Error('setAudioContext only accepts an AudioContext object')

  isAudioContext: ( node ) ->
    checkCurrentProtoFor node, 'AudioContext'

  isAudioSource: ( node ) ->
    checkProtoChainFor node, 'AudioSourceNode'

  isAudioNode: ( node ) ->
    checkProtoChainFor node, 'AudioNode'

  isAudioDestination: ( node ) ->
    checkCurrentProtoFor node, 'AudioDestinationNode'

  isRegularAudioNode: ( node ) ->
    @isAudioNode( node ) and
      not @isAudioDestination( node ) and
      not @isAudioSource node

  isAudioParam: ( param ) ->
    checkProtoChainFor param, 'AudioParam'

checkCurrentProtoFor = ( node, protoName ) ->
  return false if typeof node isnt 'object' or not node
  Object.getPrototypeOf( node )?.constructor?.name is protoName

checkProtoChainFor = ( node, protoName ) ->
  return false if typeof node isnt 'object' or not node
  proto = Object.getPrototypeOf( node )
  while proto?.constructor?.name isnt 'Object'
    proto = Object.getPrototypeOf( proto )
    return true if proto?.constructor?.name is protoName
  return false

root.allen = allen
