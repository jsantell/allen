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
    checkCurrentType node, 'AudioContext'

  isAudioSource: ( node ) ->
    checkProtoChainFor node, 'AudioSourceNode'

  isAudioNode: ( node ) ->
    checkProtoChainFor node, 'AudioNode'

  isAudioDestination: ( node ) ->
    checkCurrentType node, 'AudioDestinationNode'

  isRegularAudioNode: ( node ) ->
    @isAudioNode( node ) and
      not @isAudioDestination( node ) and
      not @isAudioSource node

  isAudioParam: ( param ) ->
    checkProtoChainFor param, 'AudioParam'

checkCurrentType = ( node, goalName ) ->
  return false if typeof node isnt 'object' or not node
  node?.constructor?.name is goalName or toStringMatch( node, goalName )

checkProtoChainFor = ( node, goalName ) ->
  return false if typeof node isnt 'object' or not node
  pType = Object.getPrototypeOf( node )

  until pType is Object.getPrototypeOf {}
    if pType?.constructor?.name is goalName or toStringMatch( pType, "#{goalName}Prototype" )
      return true
    pType = Object.getPrototypeOf( pType )
  return false

toStringMatch = ( object, name ) ->
  !!toString.call( object ).match new RegExp "^\\[object #{name}\\]$"

# Export with Node, AMD, browser
if typeof exports is 'object'
  module.exports = allen
else if typeof define is 'function' and define.amd
  define( () -> allen )
else
  root.allen = allen
