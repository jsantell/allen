Allen =

  makeAudioContext: () ->
    ctx = root.AudioContext or root.webkitAudioContext
    new ctx()

  isAudioContext: ( node ) ->
    Object.getPrototypeOf( node )?.constructor?.name is 'AudioContext'

  isAudioSource: ( node ) ->
    checkProtoChainFor node, 'AudioSourceNode'

  isAudioNode: ( node ) ->
    checkProtoChainFor node, 'AudioNode'

  isAudioDestination: ( node ) ->
    checkProtoChainFor node, 'AudioDestinationNode'

  isRegularAudioNode: ( node ) ->
    @isAudioNode( node ) and
      not @isAudioDestination( node ) and
      not @isAudioSource node

  isAudioParam: ( node ) ->
    checkProtoChainFor node, 'AudioParam'

checkProtoChainFor( node, protoName ) ->
  return false if typeof node isnt 'object'
  proto = Object.getPrototypeOf( node )
  while proto?.constructor?.name isnt 'Object'
    proto = Object.getPrototypeOf( proto )
    return true if proto?.constructor?.name is protoName
  return false
