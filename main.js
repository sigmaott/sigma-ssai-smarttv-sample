/* eslint-disable no-undef */
/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars

var smDaiManager;
var hls;

var manifestUrl = MANIFEST_URL;

async function stop() {
  if (smDaiManager) {
    smDaiManager.destroy();
    smDaiManager = null;
  }
  if (hls) {
    hls.destroy();
    hls = null;
  }
}

async function play() {
  stop();
  try {
    smDaiManager = new SmDaiManager();
    smDaiManager.setManifestUrl(manifestUrl);

    hls = new Hls();
    hls.attachMedia(document.getElementById(VIDEO_ELEMENT_ID));

    smDaiManager.attachHls(hls, Hls);

    hls.loadSource(manifestUrl);

    smDaiManager.on(SmDaiManager.Events.TRACKING, (event, data) => {
      console.log('*** Tracking', event, data);
    });
  } catch (error) {
    console.error('Load manifest error:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  play();
});
