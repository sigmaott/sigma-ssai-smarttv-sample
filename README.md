# SSAI SDK For SmartTV Integration Guide

**Version** : 1.0.0

**Organization** : Thủ Đô Multimedia

## Table of Contents

1. [Introduction](#1-introduction)
2. [Scope](#2-scope)
3. [System Requirements](#3-system-requirements)
4. [SDK Installation](#4-sdk-installation)
5. [SDK Integration](#5-sdk-integration)
   - [5.1 HLS Player](#51-hls-player)
   - [5.2 Event Listener](#52-event-listener)
   - [5.3 Destroy](#53-destroy)
6. [Conclusion](#6-conclusion)

## 1. Introduction

This document serves as a guide for integrating and using the SSAI SDK for SmartTV applications. It includes detailed information on installation, SDK initialization, and handling necessary callbacks.

## 2. Scope

This document is intended for developers who want to integrate the SSAI SDK into their SmartTV applications, focusing on ad tracking and video streaming functionalities.

## 3. System Requirements

| Platform      | Support version                       |
| ------------- | ------------------------------------- |
| Samsung Tizen | Tizen 3.0 (2017 Models) or above      |
| LG WebOS      | WebOS 3.0 (2016-2017 Models) or above |

## 4. SDK Installation

To install the SSAI SDK, follow these steps:

- Import script

```javascript
<script src='sigma-dai.obs.min.js'></script>
```

## 5. SDK Integration

### 5.1 HLS player

- Install Hls

```javascript
<script src='https://cdn.jsdelivr.net/npm/hls.js@1'></script>
```

- Initialize hls instance

```javascript
const hls = new Hls();
hls.attachMedia(document.getElementById(VIDEO_ELEMENT_ID));
```

- **Initialize SSAI SDK instance** :

```javascript
const smDaiManager = new SmDaiManager();
smDaiManager.setManifestUrl(MANIFEST_URL);
smDaiManager.setAdsServerUrl(ADS_SERVER_URL); // set URL of the ads server
smDaiManager.setAdsParams(ADS_PARAMS); // append query params
```

- **Attach hls instance into SSAI SDK instance** :

```javascript
smDaiManager.attachHls(hls, Hls);
```

- **Call loadSource method** :

```javascript
hls.loadSource(MANIFEST_URL);
```

## 5.2 Event listener

```javascript
smDaiManager.on(SmDaiManager.Events.TRACKING, (event, data) => {
  console.log('TRACKING ', event, data);
});
```

## 5.3 Destroy

When the SDK instance is no longer needed, call destroy to release resources:

```javascript
smDaiManager.destroy();
```

### NOTE: Please replace the following placeholders in the code:

| Props            | Type   | Description                                                                                   |
| ---------------- | ------ | --------------------------------------------------------------------------------------------- |
| MANIFEST_URL     | String | The URL to the HLS Multivariant Playlist (M3U8) file.                                         |
| VIDEO_ELEMENT_ID | String | The ID of the HTML5 video element where the video stream will be displayed.                   |
| ADS_SERVER_URL   | String | The URL of the ads server                                                                     |
| ADS_PARAMS       | Object | An object containing key-value pairs to be added as query parameters for the `ADS_SERVER_URL` |

## 6. Conclusion

By following the steps outlined in this guide, you can effectively integrate and utilize the SSAI SDK within your SmartTV application.
