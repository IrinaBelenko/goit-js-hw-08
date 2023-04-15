import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const timeMemorization = ({ seconds }) => {
  if (window.localStorage) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }
  console.log(seconds);
};

const throttleFunc = throttle(timeMemorization, 1000);

player.on('timeupdate', throttleFunc);

player
  .setCurrentTime(localStorage['videoplayer-current-time'])
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
