# mp<sup>2</sup>

Music player, personalized

## What

MP<sup>2</sup> lets you organize music from Youtube into easily accessible **groupings**. Groupings can be played in order (like a playlist) or shuffled together (like a radio station).

Check out the live demo [here](https://benchristel.github.io/mp2).

## Why

The main use cases for MP<sup>2</sup> are:

- You want to play random songs from a bunch of different artists, but you want slightly more fine-grained control than something like Pandora affords.
- You want to listen to an entire album or playlist, in order.

## How

To customize MP2's music selection, you'll need a Github account and a tiny bit of `git` and JavaScript savvy.

1. Fork and clone this repo.
2. Edit the structure in `songs.js` to include the music you want. To find a video's `youtubeId`, look for `v=` in the URL—the 11-character string following it is the `youtubeId`.
3. To ensure that you don't have syntax errors, you can copy-paste the content of `songs.js` into [JSLint](http://www.jslint.com/) or similar (I always forget a comma or two).
4. Commit your changes to the `gh-pages` branch and push.
5. Your player should now be accessible at `[yourgithubusername].github.io/mp2`.