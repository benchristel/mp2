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
            if (event.keyCode === 32) {
              event.preventDefault()
              if (playerState === YT.PlayerState.PLAYING) {
                player.pauseVideo()
              } else if (playerState === YT.PlayerState.PAUSED) {
                player.playVideo()
              }
            }
          })

          ready = true
          notifyUpdateListeners()
        },
        'onStateChange': function(event) {
          if (playerState !== event.data) {
            playerState = event.data
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
