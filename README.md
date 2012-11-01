allen
=====

**allen** is a collection of utilities for the Web Audio API. As of right now, mostly type checking different objects to determine what kind of type of node an object is, but if you find yourself reusing the same methods when developing with the Web Audio API, please add them!

## Installation



## Methods

### getAudioContext()

Creates and returns an available `AudioContext` for the environment. If this method was called previously, or an `AudioContext` was set via `setAudioContext()`, then the same instance will be returned.

### setAudioContext( context )

Sets the `AudioContext` to be returned from `getAudioContext()`.

### isAudioContext( node )

Returns `true` if `node` is an `AudioContext`; `false` otherwise.

### isAudioSource( node )

Returns `true` if `node` inherits from an `AudioSourceNode`, like `BufferSourceNode`, `MediaElementAudioSourceNode`, `MediaStreamAudioSourceNode` or `OscillatorNode`; `false` otherwise.

### isAudioDestination( node )

Returns `true` if `node` is an `AudioDestinationNode`; `false` otherwise.

### isAudioNode( node )

Returns `true` if `node` inherits from `AudioNode`; `false` otherwise.

### isRegularAudioNode( node )

Returns `true` if `node` inherits from `AudioNode`, and is not a source or destination node; `false` otherwise.

### isAudioParam( param )

Returns `true` if `param` inherits from `AudioParam`; `false` otherwise.

## Example

```
  var
    ctx = allen.getAudioContext(),
    src = ctx.createMediaElementSource( new Audio() ),
    gain = ctx.createGainNode();

  allen.isAudioNode( gain );  // true
  allen.isAudioNode( src );   // true
  allen.isAudioSource( src ); // true
  allen.isAudioSource( gain ); // false
  allen.isAudioParam( gain.gain ); // true

```

## Development

You must have [grunt](https://github.com/gruntjs/grunt) installed globally -- build `src` and specs and run tests with `grunt`, or fire off the watcher with `grunt watch` to build and test changes.

Run tests with `grunt mocha`. In `test/mocks/mockContext.coffee`, there is a mock AudioContext object for running tests headlessly -- tests should pass in PhantomJS, as well as browsers.
