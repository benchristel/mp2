"use strict";

function Grouping(spec) {
  let songs = spec.tracks

	let queue = copyArray(songs)
    , shuffle = false

	let self = {
	  dequeue: function() {
      if (queue.length === 0) {
        refillQueue()
      }
      return queue.splice(indexToDequeue(), 1)[0]
	  },

    setShuffle: function(_shuffle) {
      shuffle = _shuffle
    },

    imageUrl: spec.imageUrl,
    name: spec.name
	}

  function indexToDequeue() {
    if (shuffle) {
      return Math.floor(Math.random() * queue.length)
    } else {
      return 0
    }
  }

  function refillQueue() {
    queue = copyArray(songs)
  }

  return self
}

function copyArray(a) {
  var out = []
  for (var i = 0; i < a.length; i++) {
    out[i] = a[i]
  }
  return out
}