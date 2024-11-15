/* eslint-disable no-undef */
/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars

var smDaiManager;
var hls;

var manifestUrl = MANIFEST_URL;
var adsEndpoint = ADS_ENDPOINT;
var adsParams = ADS_PARAMS;

async function stop() {
  if (hls) {
    await hls.destroy();
    hls = null;
  }
  if (smDaiManager) {
    smDaiManager.destroy();
    smDaiManager = null;
  }
}

async function play() {
  await stop();
  try {
    smDaiManager = new SmDaiManager();
    smDaiManager.setManifestUrl(manifestUrl);
    smDaiManager.setAdsEndpoint(adsEndpoint);
    smDaiManager.setAdsParams(adsParams);

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
