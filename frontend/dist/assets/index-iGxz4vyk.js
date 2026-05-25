import { k as u, x, l as k, U as UIPlugin } from "./UppyPluginManager-AHtBg_Vv.js";
import { g as getFileTypeExtension } from "./getFileTypeExtension-BReVzuN7.js";
import "./index-BQxzU9F1.js";
import "./storageConfigsStore-DUFoycii.js";
const version = "4.4.2";
const packageJson = {
  version
};
const locale = {
  strings: {
    pluginNameScreenCapture: "Screencast",
    startCapturing: "Begin screen capturing",
    stopCapturing: "Stop screen capturing",
    submitRecordedFile: "Submit recorded file",
    streamActive: "Stream active",
    streamPassive: "Stream passive",
    micDisabled: "Microphone access denied by user",
    recording: "Recording",
    takeScreenshot: "Take Screenshot",
    discardMediaFile: "Discard Media"
  }
};
function DiscardButton({ onDiscard, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--discard", type: "button", title: i18n("discardMediaFile"), "aria-label": i18n("discardMediaFile"), onClick: onDiscard, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [u("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), u("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) });
}
function RecordButton({ recording, onStartRecording, onStopRecording, i18n }) {
  if (recording) {
    return u("button", { className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec", type: "button", title: i18n("stopCapturing"), "aria-label": i18n("stopCapturing"), onClick: onStopRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "100", height: "100", viewBox: "0 0 100 100", children: u("rect", { x: "15", y: "15", width: "70", height: "70" }) }) });
  }
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video", type: "button", title: i18n("startCapturing"), "aria-label": i18n("startCapturing"), onClick: onStartRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: u("path", { d: "M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" }) }) });
}
function ScreenshotButton({ onScreenshot, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--screenshot", type: "button", title: i18n("takeScreenshot"), "aria-label": i18n("takeScreenshot"), onClick: onScreenshot, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: [u("path", { d: "M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" }), u("path", { "fill-rule": "evenodd", d: "M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", "clip-rule": "evenodd" })] }) });
}
function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (s > 9 ? ":" : ":0") + s;
}
class StopWatch extends x {
  wrapperStyle = {
    width: "100%",
    height: "100%",
    display: "flex"
  };
  overlayStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "black",
    opacity: 0.7
  };
  infoContainerStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    zIndex: 1,
    color: "white"
  };
  infotextStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1rem",
    fontSize: "1.5rem"
  };
  timeStyle = {
    display: "block",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "3rem",
    fontFamily: "Courier New"
  };
  timerRunning = false;
  timer;
  constructor(props) {
    super(props);
    this.state = { elapsedTime: 0 };
  }
  startTimer() {
    this.timerTick();
    this.timerRunning = true;
  }
  resetTimer() {
    clearTimeout(this.timer);
    this.setState({ elapsedTime: 0 });
    this.timerRunning = false;
  }
  timerTick() {
    this.timer = setTimeout(() => {
      this.setState((state) => ({
        elapsedTime: state.elapsedTime + 1
      }));
      this.timerTick();
    }, 1e3);
  }
  render() {
    const { recording, i18n } = { ...this.props };
    const { elapsedTime } = this.state;
    const minAndSec = fmtMSS(elapsedTime);
    if (recording && !this.timerRunning) {
      this.startTimer();
    }
    if (!recording && this.timerRunning) {
      this.resetTimer();
    }
    if (recording) {
      return u("div", { style: this.wrapperStyle, children: [u("div", { style: this.overlayStyle }), u("div", { style: this.infoContainerStyle, children: [u("div", { style: this.infotextStyle, children: i18n("recording") }), u("div", { style: this.timeStyle, children: minAndSec })] })] });
    }
    return null;
  }
}
function StreamStatus({ streamActive, i18n }) {
  if (streamActive) {
    return u("div", { title: i18n("streamActive"), className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive", children: u("svg", { "aria-hidden": "true", focusable: "false", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0z", opacity: ".1", fill: "none" }), u("path", { d: "M0 0h24v24H0z", fill: "none" }), u("path", { d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })] }) });
  }
  return u("div", { title: i18n("streamPassive"), className: "uppy-ScreenCapture-icon--stream", children: u("svg", { "aria-hidden": "true", focusable: "false", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0z", opacity: ".1", fill: "none" }), u("path", { d: "M0 0h24v24H0z", fill: "none" }), u("path", { d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z" })] }) });
}
function SubmitButton({ recording, recordedVideo, onSubmit, capturedScreenshotUrl, i18n }) {
  if ((recordedVideo || capturedScreenshotUrl) && !recording) {
    return u("button", { className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit", type: "button", title: i18n("submitRecordedFile"), "aria-label": i18n("submitRecordedFile"), onClick: onSubmit, "data-uppy-super-focusable": true, children: u("svg", { width: "12", height: "9", viewBox: "0 0 12 9", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", children: u("path", { fill: "#fff", fillRule: "nonzero", d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z" }) }) });
  }
  return null;
}
class RecorderScreen extends x {
  videoElement = null;
  componentWillUnmount() {
    const { onStop } = this.props;
    onStop();
  }
  render() {
    const { recording, stream: videoStream, recordedVideo, enableScreenshots, capturedScreenshotUrl } = this.props;
    const videoProps = {
      playsinline: true
    };
    if (recording || !recordedVideo && !recording) {
      videoProps.muted = true;
      videoProps.autoplay = true;
      videoProps.srcObject = videoStream;
    }
    if (recordedVideo && !recording) {
      videoProps.muted = false;
      videoProps.controls = true;
      videoProps.src = recordedVideo;
      if (this.videoElement) {
        this.videoElement.srcObject = null;
      }
    }
    return u("div", { className: "uppy uppy-ScreenCapture-container", children: [u("div", { className: "uppy-ScreenCapture-mediaContainer", children: [u(StreamStatus, { ...this.props }), capturedScreenshotUrl && !recording && !recordedVideo ? u("div", { className: "uppy-ScreenCapture-imageContainer", children: u("img", { src: capturedScreenshotUrl, className: "uppy-ScreenCapture-media", alt: "screenshotPreview" }) }) : u("video", { ref: (videoElement) => {
      this.videoElement = videoElement;
    }, className: "uppy-ScreenCapture-media", ...videoProps }), u("div", { children: u(StopWatch, { ...this.props }) })] }), u("div", { className: "uppy-ScreenCapture-buttonContainer", children: recordedVideo || capturedScreenshotUrl ? u(k, { children: [u(SubmitButton, { ...this.props }), u(DiscardButton, { ...this.props })] }) : u(k, { children: [enableScreenshots && !recording && u(ScreenshotButton, { ...this.props }), u(RecordButton, { ...this.props })] }) })] });
  }
}
function ScreenRecIcon() {
  return u("svg", { className: "uppy-DashboardTab-iconScreenRec", "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u("g", { fill: "currentcolor", fillRule: "evenodd", children: [u("path", { d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z" }), u("circle", { cx: "16", cy: "16", r: "2" })] }) });
}
function isScreenRecordingSupported() {
  return window.MediaRecorder && navigator.mediaDevices?.getDisplayMedia;
}
function getMediaDevices() {
  return window.MediaRecorder && navigator.mediaDevices;
}
const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const defaultOptions = {
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#Properties_of_shared_screen_tracks
  displayMediaConstraints: {
    video: {
      width: 1280,
      height: 720,
      frameRate: {
        ideal: 3,
        max: 5
      },
      cursor: "motion",
      displaySurface: "monitor"
    }
  },
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/audio
  userMediaConstraints: {
    audio: true
  },
  preferredVideoMimeType: "video/webm",
  preferredImageMimeType: "image/png",
  enableScreenshots: true
};
class ScreenCapture extends UIPlugin {
  static VERSION = packageJson.version;
  mediaDevices;
  protocol;
  icon;
  streamInterrupted;
  captureActive;
  capturedMediaFile;
  videoStream = null;
  audioStream = null;
  userDenied = false;
  recorder = null;
  outputStream = null;
  recordingChunks = null;
  constructor(uppy, opts) {
    super(uppy, { ...defaultOptions, ...opts });
    this.mediaDevices = getMediaDevices();
    this.protocol = location.protocol === "https:" ? "https" : "http";
    this.id = this.opts.id || "ScreenCapture";
    this.type = "acquirer";
    this.icon = ScreenRecIcon;
    this.defaultLocale = locale;
    this.i18nInit();
    this.title = this.i18n("pluginNameScreenCapture");
    this.install = this.install.bind(this);
    this.setPluginState = this.setPluginState.bind(this);
    this.render = this.render.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.submit = this.submit.bind(this);
    this.streamInterrupted = this.streamInactivated.bind(this);
    this.captureScreenshot = this.captureScreenshot.bind(this);
    this.discardRecordedMedia = this.discardRecordedMedia.bind(this);
    this.captureActive = false;
    this.capturedMediaFile = null;
    this.setPluginState({
      streamActive: false,
      audioStreamActive: false,
      recording: false,
      recordedVideo: null,
      screenRecError: null,
      capturedScreenshotUrl: null,
      status: "init"
    });
  }
  install() {
    if (!isScreenRecordingSupported()) {
      this.uppy.log("Screen recorder access is not supported", "warning");
      return null;
    }
    this.setPluginState({
      streamActive: false,
      audioStreamActive: false,
      status: "init"
    });
    const { target } = this.opts;
    if (target) {
      this.mount(target, this);
    }
    return void 0;
  }
  uninstall() {
    if (this.videoStream) {
      this.stop();
    }
    this.unmount();
  }
  start() {
    if (!this.mediaDevices) {
      return Promise.reject(new Error("Screen recorder access not supported"));
    }
    this.captureActive = true;
    this.selectAudioStreamSource();
    return this.selectVideoStreamSource().then((res) => {
      if (res === false) {
        if (this.parent?.hideAllPanels) {
          this.parent.hideAllPanels();
          this.captureActive = false;
        }
      }
    });
  }
  selectVideoStreamSource() {
    if (this.videoStream) {
      return new Promise((resolve) => resolve(this.videoStream));
    }
    return this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((videoStream) => {
      this.videoStream = videoStream;
      this.videoStream.addEventListener("inactive", () => {
        this.streamInactivated();
      });
      this.setPluginState({
        streamActive: true,
        status: "ready",
        screenRecError: null
      });
      return videoStream;
    }).catch((err) => {
      this.setPluginState({
        screenRecError: err,
        status: "error"
      });
      this.userDenied = true;
      setTimeout(() => {
        this.userDenied = false;
      }, 1e3);
      return false;
    });
  }
  selectAudioStreamSource() {
    if (this.audioStream) {
      return new Promise((resolve) => resolve(this.audioStream));
    }
    return this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((audioStream) => {
      this.audioStream = audioStream;
      this.setPluginState({
        audioStreamActive: true
      });
      return audioStream;
    }).catch((err) => {
      if (err.name === "NotAllowedError") {
        this.uppy.info(this.i18n("micDisabled"), "error", 5e3);
        this.uppy.log(this.i18n("micDisabled"), "warning");
      }
      return false;
    });
  }
  startRecording() {
    const options = {};
    this.capturedMediaFile = null;
    this.recordingChunks = [];
    const { preferredVideoMimeType } = this.opts;
    this.selectVideoStreamSource().then((videoStream) => {
      if (videoStream === false) {
        throw new Error("No video stream available");
      }
      if (preferredVideoMimeType && MediaRecorder.isTypeSupported(preferredVideoMimeType) && getFileTypeExtension(preferredVideoMimeType)) {
        options.mimeType = preferredVideoMimeType;
      }
      const tracks = [videoStream.getVideoTracks()[0]];
      if (this.audioStream) {
        tracks.push(this.audioStream.getAudioTracks()[0]);
      }
      this.outputStream = new MediaStream(tracks);
      this.recorder = new MediaRecorder(this.outputStream, options);
      this.recorder.addEventListener("dataavailable", (event) => {
        this.recordingChunks.push(event.data);
      });
      this.recorder.start();
      this.setPluginState({
        recording: true,
        status: "recording"
      });
    }).catch((err) => {
      this.uppy.log(err, "error");
      this.setPluginState({ screenRecError: err, status: "error" });
    });
  }
  streamInactivated() {
    const { recordedVideo, recording } = { ...this.getPluginState() };
    if (!recordedVideo && !recording) {
      if (this.parent?.hideAllPanels) {
        this.parent.hideAllPanels();
      }
      this.setPluginState({ status: "init" });
    } else if (recording) {
      this.uppy.log("Capture stream inactive — stop recording");
      this.stopRecording();
    }
    this.videoStream = null;
    this.audioStream = null;
    this.setPluginState({
      streamActive: false,
      audioStreamActive: false
    });
  }
  stopRecording() {
    const stopped = new Promise((resolve) => {
      this.recorder.addEventListener("stop", () => {
        resolve();
      });
      this.recorder.stop();
    });
    return stopped.then(() => {
      this.setPluginState({
        recording: false
      });
      return this.getVideo();
    }).then((file) => {
      this.capturedMediaFile = file;
      this.setPluginState({
        recordedVideo: URL.createObjectURL(file.data),
        status: "captured"
      });
    }).then(() => {
      this.recordingChunks = null;
      this.recorder = null;
    }, (error) => {
      this.recordingChunks = null;
      this.recorder = null;
      throw error;
    });
  }
  discardRecordedMedia() {
    const { capturedScreenshotUrl, recordedVideo } = this.getPluginState();
    if (capturedScreenshotUrl) {
      URL.revokeObjectURL(capturedScreenshotUrl);
    }
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    this.capturedMediaFile = null;
    this.setPluginState({
      recordedVideo: null,
      capturedScreenshotUrl: null,
      status: this.getPluginState().streamActive ? "ready" : "init"
    });
  }
  submit() {
    try {
      if (this.capturedMediaFile) {
        this.uppy.addFile(this.capturedMediaFile);
      }
    } catch (err) {
      if (!err.isRestriction) {
        this.uppy.log(err, "warning");
      }
    }
  }
  stop() {
    if (this.videoStream) {
      this.videoStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.videoStream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      this.videoStream = null;
    }
    if (this.audioStream) {
      this.audioStream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      this.audioStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.audioStream = null;
    }
    if (this.outputStream) {
      this.outputStream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      this.outputStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.outputStream = null;
    }
    const { capturedScreenshotUrl, recordedVideo } = this.getPluginState();
    if (capturedScreenshotUrl) {
      URL.revokeObjectURL(capturedScreenshotUrl);
    }
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    this.setPluginState({
      recording: false,
      streamActive: false,
      audioStreamActive: false,
      recordedVideo: null,
      capturedScreenshotUrl: null,
      status: "init"
    });
    this.captureActive = false;
  }
  getVideo() {
    const mimeType = this.recordingChunks[0].type;
    const fileExtension = getFileTypeExtension(mimeType);
    if (!fileExtension) {
      return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
    }
    const name = `screencap-${Date.now()}.${fileExtension}`;
    const blob = new Blob(this.recordingChunks, { type: mimeType });
    const file = {
      source: this.id,
      name,
      data: new Blob([blob], { type: mimeType }),
      type: mimeType
    };
    return Promise.resolve(file);
  }
  async captureScreenshot() {
    if (!this.mediaDevices?.getDisplayMedia) {
      throw new Error("Screen capture is not supported");
    }
    try {
      let stream = this.videoStream;
      if (!stream) {
        const newStream = await this.selectVideoStreamSource();
        if (!newStream) {
          throw new Error("Failed to get screen capture stream");
        }
        stream = newStream;
      }
      const video = document.createElement("video");
      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve(null);
        };
      });
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let mimeType = this.opts.preferredImageMimeType;
      if (!mimeType || !SUPPORTED_IMAGE_TYPES.includes(mimeType)) {
        this.uppy.log(`Unsupported image type "${mimeType}", falling back to image/png`, "warning");
        mimeType = "image/png";
      }
      const quality = 1;
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Failed to create screenshot blob"));
            return;
          }
          const fileExtension = getFileTypeExtension(mimeType) || "png";
          const file = {
            source: this.id,
            name: `Screenshot ${(/* @__PURE__ */ new Date()).toISOString()}.${fileExtension}`,
            type: mimeType,
            data: blob
          };
          try {
            this.capturedMediaFile = file;
            const screenshotUrl = URL.createObjectURL(blob);
            this.setPluginState({
              capturedScreenshotUrl: screenshotUrl,
              status: "captured"
            });
            resolve();
          } catch (err) {
            if (this.getPluginState().capturedScreenshotUrl) {
              this.setPluginState({ capturedScreenshotUrl: null });
            }
            if (!err.isRestriction) {
              this.uppy.log(err, "error");
            }
            reject(err);
          } finally {
            video.srcObject = null;
            canvas.remove();
            video.remove();
          }
        }, mimeType, quality);
      });
    } catch (err) {
      this.uppy.log(err, "error");
      throw err;
    }
  }
  render() {
    const recorderState = this.getPluginState();
    if (!recorderState.streamActive && !this.captureActive && !this.userDenied) {
      this.start();
    }
    return u(RecorderScreen, { ...recorderState, onStartRecording: this.startRecording, onStopRecording: this.stopRecording, enableScreenshots: this.opts.enableScreenshots, onScreenshot: this.captureScreenshot, onStop: this.stop, onSubmit: this.submit, i18n: this.i18n, stream: this.videoStream, onDiscard: this.discardRecordedMedia });
  }
}
export {
  ScreenCapture as default
};
