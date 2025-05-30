# SSAI SDK For SmartTV Integration Guide

**Version** : 1.0.6

**Organization** : Thủ Đô Multimedia

## Table of Contents

1. [Introduction](#1-introduction)
2. [Scope](#2-scope)
3. [System Requirements](#3-system-requirements)
4. [SDK Installation](#4-sdk-installation)
5. [SDK Integration](#5-sdk-integration)
   - [5.1 Definition of `sigma.dai` parameters](#51-definition-of-sigmadai-parameters)
   - [5.2 Integrate SSAI with HLS Player](#52-integrate-ssai-with-hls-player)
   - [5.3 Event Listener](#53-event-listener)
   - [5.4 Destroy](#54-destroy)
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

### 5.1 Definition of `sigma.dai` parameters

The `sigma.dai` parameters are used to send information to the **ads server** via the **query string** of the `MANIFEST_URL`. These parameters help customize and enable server-side ad insertion (SSAI) features.

#### Syntax:

```javascript
sigma.dai.<param>=<value>
```

Parameters are appended to the `MANIFEST_URL` as key-value pairs prefixed with `sigma.dai`.

#### Required Parameters

- **`sigma.dai.adsEndpoint`**  
  This parameter specifies the adsEndpoint of the **ads server**. It is mandatory to include this parameter for the SSAI functionality.

  **Example**: MANIFEST_URL=https://stream.example.com/master.m3u8?sigma.dai.adsEndpoint=ADS_ENDPOINT

#### Optional Parameters

Additional parameters can be included to personalize the request or provide extra context to the ads server.

- **Examples**: https://stream.example.com/master.m3u8?sigma.dai.adsEndpoint=ADS_ENDPOINT&sigma.dai.param1=12345&sigma.dai.param2=abcde

### 5.2 Integrate SSAI with HLS Player

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
smDaiManager.setManifestUrl(MANIFEST_URL); // Set the URL with SSAI-related query parameters
```

- **Attach hls instance into SSAI SDK instance** :

```javascript
smDaiManager.attachHls(hls, Hls);
```

- **Call loadSource method** :

```javascript
hls.loadSource(MANIFEST_URL);
```

## 5.3 Event listener

- The `TRACKING` event provides information about ad playback progress and tracking-related data.

```javascript
smDaiManager.on(SmDaiManager.Events.TRACKING, (event, data) => {
  console.log('TRACKING ', event, data);
});
```

## 5.4 Destroy

When the SDK instance is no longer needed, call destroy to release resources:

```javascript
smDaiManager.destroy();
```

### NOTE: Please replace the following placeholders in the code:

| Props            | Type   | Description                                                                                |
| ---------------- | ------ | ------------------------------------------------------------------------------------------ |
| MANIFEST_URL     | String | The URL to the HLS Multivariant Playlist (M3U8) file, including query parameters for SSAI. |
| VIDEO_ELEMENT_ID | String | The ID of the HTML5 video element where the video stream will be displayed.                |
| ADS_ENDPOINT     | String | The end point of the ads                                                                   |

## 6. Conclusion

By following the steps outlined in this guide, you can effectively integrate and utilize the SSAI SDK within your SmartTV application.
