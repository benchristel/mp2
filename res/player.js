"use strict";

(function() {
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let updateCallbacks = []
    , player = null
    , playerState = null
    , ready = false

  function notifyUpdateListeners() {
    for (let cb of updateCallbacks) {
      cb()
    }
  }

  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
      height: '200',
      width: '200',
      videoId: null,
      events: {
        'onReady': function() {
          playerState = YT.PlayerState.UNSTARTED

          window.addEventListener('keydown', function(event) {
            if (event.keyCode === 32) { // spacebar
              event.preventDefault()
              if (playerState === YT.PlayerState.PLAYING) {
                player.pauseVideo()
              } else if (playerState === YT.PlayerState.PAUSED) {
                player.playVideo()
              }
            }
            if (event.keyCode === 39) { // right arrow
              event.preventDefault()
              player.seekTo(99999, true)
            }
          })

          ready = true
          notifyUpdateListeners()
        },
        'onStateChange': function(event) {
          console.debug("Player state changed to " + event.data)
          if (playerState !== event.data) {
            playerState = event.data

            if (playerState === YT.PlayerState.UNSTARTED) {
              // If the song is still unstarted after 5 seconds,
              // assume playback failed and notify the listeners
              // to play the next song.
              // Note that this relies on an assumption that
              // songs last longer than 5 seconds.
              setTimeout(function() {
                if (playerState === YT.PlayerState.UNSTARTED) {
                  notifyUpdateListeners()
                }
              }, 5000)
            }

            if (playerState === YT.PlayerState.ENDED) {
              notifyUpdateListeners()
            }
          }
        }
      }
    })
  }

  window.Player = {}

  Player.onUpdate = function(cb) {
    updateCallbacks.push(cb)
  }

  Player.play = function() {
    player.playVideo()
  }

  Player.load = function(youtubeId) {
    let startAt = 0
    player.loadVideoById(youtubeId, startAt, 'small')
  }

  Player.nothingIsPlaying = function() {
    return ready && (playerState === YT.PlayerState.UNSTARTED || playerState === YT.PlayerState.ENDED)
  }
})();
