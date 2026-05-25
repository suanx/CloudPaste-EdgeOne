import { k as u, x, U as UIPlugin, m as mimeTypes } from "./UppyPluginManager-AHtBg_Vv.js";
import { g as getFileTypeExtension } from "./getFileTypeExtension-BReVzuN7.js";
import "./index-BQxzU9F1.js";
import "./storageConfigsStore-DUFoycii.js";
function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}
var isMobile$1 = { exports: {} };
isMobile$1.exports = isMobile;
var isMobile_2 = isMobile$1.exports.isMobile = isMobile;
isMobile$1.exports.default = isMobile;
const mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
const notMobileRE = /CrOS/;
const tabletRE = /android|ipad|playbook|silk/i;
function isMobile(opts) {
  if (!opts) opts = {};
  let ua = opts.ua;
  if (!ua && typeof navigator !== "undefined") ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers["user-agent"] === "string") {
    ua = ua.headers["user-agent"];
  }
  if (typeof ua !== "string") return false;
  let result = mobileRE.test(ua) && !notMobileRE.test(ua) || !!opts.tablet && tabletRE.test(ua);
  if (!result && opts.tablet && opts.featureDetect && navigator && navigator.maxTouchPoints > 1 && ua.indexOf("Macintosh") !== -1 && ua.indexOf("Safari") !== -1) {
    result = true;
  }
  return result;
}
const version = "4.3.2";
const packageJson = {
  version
};
function CameraIcon() {
  return u("svg", { "aria-hidden": "true", focusable: "false", fill: "#0097DC", width: "66", height: "55", viewBox: "0 0 66 55", children: u("path", { d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z", fillRule: "evenodd" }) });
}
function DiscardButton({ onDiscard, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard", type: "button", title: i18n("discardRecordedFile"), "aria-label": i18n("discardRecordedFile"), onClick: onDiscard, "data-uppy-super-focusable": true, children: u("svg", { width: "13", height: "13", viewBox: "0 0 13 13", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", children: u("g", { fill: "#FFF", fillRule: "evenodd", children: [u("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), u("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })] }) }) });
}
function RecordButton({ recording, onStartRecording, onStopRecording, i18n }) {
  if (recording) {
    return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Webcam-button", type: "button", title: i18n("stopRecording"), "aria-label": i18n("stopRecording"), onClick: onStopRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "100", height: "100", viewBox: "0 0 100 100", children: u("rect", { x: "15", y: "15", width: "70", height: "70" }) }) });
  }
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Webcam-button", type: "button", title: i18n("startRecording"), "aria-label": i18n("startRecording"), onClick: onStartRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "100", height: "100", viewBox: "0 0 100 100", children: u("circle", { cx: "50", cy: "50", r: "40" }) }) });
}
function formatSeconds(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function RecordingLength({ recordingLengthSeconds }) {
  const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
  return u("span", { children: formattedRecordingLengthSeconds });
}
function SnapshotButton({ onSnapshot, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture", type: "button", title: i18n("takePicture"), "aria-label": i18n("takePicture"), onClick: onSnapshot, "data-uppy-super-focusable": true, children: CameraIcon() });
}
function SubmitButton({ onSubmit, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit", type: "button", title: i18n("submitRecordedFile"), "aria-label": i18n("submitRecordedFile"), onClick: onSubmit, "data-uppy-super-focusable": true, children: u("svg", { width: "12", height: "9", viewBox: "0 0 12 9", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", children: u("path", { fill: "#fff", fillRule: "nonzero", d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z" }) }) });
}
function VideoSourceSelect({ currentDeviceId, videoSources, onChangeVideoSource }) {
  return u("div", { className: "uppy-Webcam-videoSource", children: u("select", { className: "uppy-u-reset uppy-Webcam-videoSource-select", onChange: (event) => {
    onChangeVideoSource(event.target.value);
  }, children: videoSources.map((videoSource) => u("option", { value: videoSource.deviceId, selected: videoSource.deviceId === currentDeviceId, children: videoSource.label }, videoSource.deviceId)) }) });
}
function isModeAvailable$1(modes, mode) {
  return modes.includes(mode);
}
class CameraScreen extends x {
  videoElement;
  refs;
  componentDidMount() {
    const { onFocus } = this.props;
    onFocus();
  }
  componentWillUnmount() {
    const { onStop } = this.props;
    onStop();
  }
  render() {
    const { src, recordedVideo, capturedSnapshot, recording, modes, supportsRecording, videoSources, showVideoSourceDropdown, showRecordingLength, onSubmit, i18n, mirror, onSnapshot, onStartRecording, onStopRecording, onDiscardRecordedMedia, recordingLengthSeconds } = this.props;
    const hasRecordedVideo = !!recordedVideo;
    const hasCapturedSnapshot = !!capturedSnapshot;
    const hasRecordedMedia = hasRecordedVideo || hasCapturedSnapshot;
    const shouldShowRecordButton = !hasRecordedMedia && supportsRecording && (isModeAvailable$1(modes, "video-only") || isModeAvailable$1(modes, "audio-only") || isModeAvailable$1(modes, "video-audio"));
    const shouldShowSnapshotButton = !hasRecordedMedia && isModeAvailable$1(modes, "picture");
    const shouldShowRecordingLength = supportsRecording && showRecordingLength && !hasRecordedVideo;
    const shouldShowVideoSourceDropdown = showVideoSourceDropdown && videoSources && videoSources.length > 1;
    const videoProps = {
      playsInline: true
    };
    if (recordedVideo) {
      videoProps.muted = false;
      videoProps.controls = true;
      videoProps.src = recordedVideo;
      if (this.videoElement) {
        this.videoElement.srcObject = null;
      }
    } else {
      videoProps.muted = true;
      videoProps.autoPlay = true;
      videoProps.srcObject = src;
    }
    return u("div", { className: "uppy uppy-Webcam-container", children: [u("div", { className: "uppy-Webcam-videoContainer", children: capturedSnapshot && !recording && !recordedVideo ? u("div", { className: "uppy-Webcam-imageContainer", children: u("img", { src: capturedSnapshot, className: "uppy-Webcam-video", alt: "capturedSnapshot" }) }) : (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      u("video", {
        /* eslint-disable-next-line no-return-assign */
        ref: (videoElement) => this.videoElement = videoElement,
        className: `uppy-Webcam-video  ${mirror ? "uppy-Webcam-video--mirrored" : ""}`,
        ...videoProps
      })
    ) }), u("div", { className: "uppy-Webcam-footer", children: [u("div", { className: "uppy-Webcam-videoSourceContainer", children: shouldShowVideoSourceDropdown ? VideoSourceSelect(this.props) : null }), u("div", { className: "uppy-Webcam-buttonContainer", children: [shouldShowSnapshotButton && u(SnapshotButton, { onSnapshot, i18n }), shouldShowRecordButton && u(RecordButton, { recording, onStartRecording, onStopRecording, i18n }), (hasRecordedVideo || hasCapturedSnapshot) && u(SubmitButton, { onSubmit, i18n }), (hasRecordedVideo || hasCapturedSnapshot) && u(DiscardButton, { onDiscard: onDiscardRecordedMedia, i18n })] }), u("div", { className: "uppy-Webcam-recordingLength", children: shouldShowRecordingLength && u(RecordingLength, { recordingLengthSeconds }) })] })] });
  }
}
const locale = {
  strings: {
    pluginNameCamera: "Camera",
    noCameraTitle: "Camera Not Available",
    noCameraDescription: "In order to take pictures or record video, please connect a camera device",
    recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
    submitRecordedFile: "Submit recorded file",
    discardRecordedFile: "Discard recorded file",
    // Shown before a picture is taken when the `countdown` option is set.
    smile: "Smile!",
    // Used as the label for the button that takes a picture.
    // This is not visibly rendered but is picked up by screen readers.
    takePicture: "Take a picture",
    // Used as the label for the button that starts a video recording.
    // This is not visibly rendered but is picked up by screen readers.
    startRecording: "Begin video recording",
    // Used as the label for the button that stops a video recording.
    // This is not visibly rendered but is picked up by screen readers.
    stopRecording: "Stop video recording",
    // Used as the label for the recording length counter. See the showRecordingLength option.
    // This is not visibly rendered but is picked up by screen readers.
    recordingLength: "Recording length %{recording_length}",
    // Title on the “allow access” screen
    allowAccessTitle: "Please allow access to your camera",
    // Description on the “allow access” screen
    allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
  }
};
function PermissionsScreen({ icon, i18n, hasCamera }) {
  return u("div", { className: "uppy-Webcam-permissons", children: [u("div", { className: "uppy-Webcam-permissonsIcon", children: icon() }), u("div", { className: "uppy-Webcam-title", children: hasCamera ? i18n("allowAccessTitle") : i18n("noCameraTitle") }), u("p", { children: hasCamera ? i18n("allowAccessDescription") : i18n("noCameraDescription") })] });
}
function supportsMediaRecorder() {
  return typeof MediaRecorder === "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start === "function";
}
function toMimeType(fileType) {
  if (fileType[0] === ".") {
    return mimeTypes[fileType.slice(1)];
  }
  return fileType;
}
function isVideoMimeType(mimeType) {
  return /^video\/[^*]+$/.test(mimeType);
}
function isImageMimeType(mimeType) {
  return /^image\/[^*]+$/.test(mimeType);
}
function getMediaDevices() {
  return navigator.mediaDevices;
}
function isModeAvailable(modes, mode) {
  return modes.includes(mode);
}
const defaultOptions = {
  onBeforeSnapshot: () => Promise.resolve(),
  countdown: false,
  modes: ["video-audio", "video-only", "audio-only", "picture"],
  mirror: true,
  showVideoSourceDropdown: false,
  preferredImageMimeType: null,
  preferredVideoMimeType: null,
  showRecordingLength: false,
  mobileNativeCamera: isMobile_2({ tablet: true })
};
class Webcam extends UIPlugin {
  static VERSION = packageJson.version;
  // enableMirror is used to toggle mirroring, for instance when discarding the video,
  // while `opts.mirror` is used to remember the initial user setting
  #enableMirror;
  mediaDevices;
  supportsUserMedia;
  protocol;
  capturedMediaFile;
  icon;
  webcamActive;
  stream = null;
  recorder = null;
  recordingChunks = null;
  recordingLengthTimer;
  captureInProgress = false;
  constructor(uppy, opts) {
    super(uppy, { ...defaultOptions, ...opts });
    this.mediaDevices = getMediaDevices();
    this.supportsUserMedia = !!this.mediaDevices;
    this.protocol = location.protocol.match(/https/i) ? "https" : "http";
    this.id = this.opts.id || "Webcam";
    this.type = "acquirer";
    this.capturedMediaFile = null;
    this.icon = () => u("svg", { "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u("path", { d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z", fill: "#02B383", fillRule: "nonzero" }) });
    this.defaultLocale = locale;
    this.i18nInit();
    this.title = this.i18n("pluginNameCamera");
    this.#enableMirror = this.opts.mirror;
    this.install = this.install.bind(this);
    this.setPluginState = this.setPluginState.bind(this);
    this.render = this.render.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.takeSnapshot = this.takeSnapshot.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.discardRecordedMedia = this.discardRecordedMedia.bind(this);
    this.submit = this.submit.bind(this);
    this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this);
    this.focus = this.focus.bind(this);
    this.changeVideoSource = this.changeVideoSource.bind(this);
    this.webcamActive = false;
    if (this.opts.countdown) {
      this.opts.onBeforeSnapshot = this.oneTwoThreeSmile;
    }
    this.setPluginState({
      hasCamera: false,
      cameraReady: false,
      cameraError: null,
      recordingLengthSeconds: 0,
      videoSources: [],
      currentDeviceId: null,
      capturedSnapshot: null
    });
  }
  getStatus() {
    const { recordedVideo, capturedSnapshot, isRecording, cameraReady, cameraError } = this.getPluginState();
    if (isRecording)
      return "recording";
    if (recordedVideo != null || capturedSnapshot != null)
      return "captured";
    if (cameraReady)
      return "ready";
    if (cameraError)
      return "error";
    return "init";
  }
  setOptions(newOpts) {
    super.setOptions({
      ...newOpts,
      videoConstraints: {
        // May be undefined but ... handles that
        ...this.opts.videoConstraints,
        ...newOpts?.videoConstraints
      }
    });
  }
  hasCameraCheck() {
    if (!this.mediaDevices) {
      return Promise.resolve(false);
    }
    return this.mediaDevices.enumerateDevices().then((devices) => {
      return devices.some((device) => device.kind === "videoinput");
    });
  }
  isAudioOnly() {
    return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
  }
  getConstraints(deviceId = null) {
    const acceptsAudio = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1;
    const acceptsVideo = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1);
    const videoConstraints = {
      ...this.opts.videoConstraints || {},
      ...deviceId != null && { deviceId }
    };
    return {
      audio: acceptsAudio,
      video: acceptsVideo ? videoConstraints : false
    };
  }
  start(options = null) {
    if (!this.supportsUserMedia) {
      return Promise.reject(new Error("Webcam access not supported"));
    }
    this.webcamActive = true;
    if (this.opts.mirror) {
      this.#enableMirror = true;
    }
    const constraints = this.getConstraints(options?.deviceId);
    this.hasCameraCheck().then((hasCamera) => {
      this.setPluginState({
        hasCamera
      });
      return this.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.stream = stream;
        let currentDeviceId = null;
        const tracks = this.isAudioOnly() ? stream.getAudioTracks() : stream.getVideoTracks();
        if (!options || !options.deviceId) {
          currentDeviceId = tracks[0].getSettings().deviceId;
        } else {
          tracks.forEach((track) => {
            if (track.getSettings().deviceId === options.deviceId) {
              currentDeviceId = track.getSettings().deviceId;
            }
          });
        }
        this.updateVideoSources();
        this.setPluginState({
          currentDeviceId,
          cameraReady: true
        });
      }).catch((err) => {
        this.setPluginState({
          cameraReady: false,
          cameraError: err
        });
        this.uppy.info(err.message, "error");
      });
    });
  }
  getMediaRecorderOptions() {
    const options = {};
    if (MediaRecorder.isTypeSupported) {
      const { restrictions } = this.uppy.opts;
      let preferredVideoMimeTypes = [];
      if (this.opts.preferredVideoMimeType) {
        preferredVideoMimeTypes = [this.opts.preferredVideoMimeType];
      } else if (restrictions.allowedFileTypes) {
        preferredVideoMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isVideoMimeType);
      }
      const filterSupportedTypes = (candidateType) => MediaRecorder.isTypeSupported(candidateType) && getFileTypeExtension(candidateType);
      const acceptableMimeTypes = preferredVideoMimeTypes.filter(filterSupportedTypes);
      if (acceptableMimeTypes.length > 0) {
        options.mimeType = acceptableMimeTypes[0];
      }
    }
    return options;
  }
  startRecording() {
    this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions());
    this.recordingChunks = [];
    let stoppingBecauseOfMaxSize = false;
    this.recorder.addEventListener("dataavailable", (event) => {
      this.recordingChunks.push(event.data);
      const { restrictions } = this.uppy.opts;
      if (this.recordingChunks.length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
        const totalSize = this.recordingChunks.reduce((acc, chunk) => acc + chunk.size, 0);
        const averageChunkSize = (totalSize - this.recordingChunks[0].size) / (this.recordingChunks.length - 1);
        const expectedEndChunkSize = averageChunkSize * 3;
        const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
        if (totalSize > maxSize) {
          stoppingBecauseOfMaxSize = true;
          this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
          this.stopRecording();
        }
      }
    });
    this.recorder.start(500);
    if (this.opts.showRecordingLength) {
      this.recordingLengthTimer = setInterval(() => {
        const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
        this.setPluginState({
          recordingLengthSeconds: currentRecordingLength + 1
        });
      }, 1e3);
    }
    this.setPluginState({
      isRecording: true
    });
  }
  stopRecording() {
    const stopped = new Promise((resolve) => {
      this.recorder.addEventListener("stop", () => {
        resolve();
      });
      this.recorder.stop();
      if (this.opts.showRecordingLength) {
        clearInterval(this.recordingLengthTimer);
        this.setPluginState({ recordingLengthSeconds: 0 });
      }
    });
    return stopped.then(() => {
      this.setPluginState({
        isRecording: false
      });
      return this.getVideo();
    }).then((file) => {
      try {
        this.capturedMediaFile = file;
        this.setPluginState({
          recordedVideo: URL.createObjectURL(file.data)
        });
        this.#enableMirror = false;
      } catch (err) {
        if (!err.isRestriction) {
          this.uppy.log(err);
        }
      }
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
    const { recordedVideo, capturedSnapshot } = this.getPluginState();
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    if (capturedSnapshot) {
      URL.revokeObjectURL(capturedSnapshot);
    }
    this.setPluginState({
      recordedVideo: null,
      capturedSnapshot: null
    });
    if (this.opts.mirror) {
      this.#enableMirror = true;
    }
    this.capturedMediaFile = null;
  }
  submit() {
    try {
      if (this.capturedMediaFile) {
        this.uppy.addFile(this.capturedMediaFile);
      }
    } catch (err) {
      if (!err.isRestriction) {
        this.uppy.log(err, "error");
      }
    }
  }
  async stop() {
    if (this.stream) {
      const audioTracks = this.stream.getAudioTracks();
      const videoTracks = this.stream.getVideoTracks();
      audioTracks.concat(videoTracks).forEach((track) => track.stop());
    }
    if (this.recorder) {
      await new Promise((resolve) => {
        this.recorder.addEventListener("stop", resolve, { once: true });
        this.recorder.stop();
        if (this.opts.showRecordingLength) {
          clearInterval(this.recordingLengthTimer);
        }
      });
    }
    this.recordingChunks = null;
    this.recorder = null;
    this.webcamActive = false;
    this.stream = null;
    this.setPluginState({
      recordedVideo: null,
      capturedSnapshot: null,
      isRecording: false,
      recordingLengthSeconds: 0
    });
  }
  getVideoElement() {
    return this.el.querySelector(".uppy-Webcam-video");
  }
  oneTwoThreeSmile() {
    return new Promise((resolve, reject) => {
      let count = this.opts.countdown;
      const countDown = setInterval(() => {
        if (!this.webcamActive) {
          clearInterval(countDown);
          this.captureInProgress = false;
          return reject(new Error("Webcam is not active"));
        }
        if (count) {
          this.uppy.info(`${count}...`, "warning", 800);
          count--;
        } else {
          clearInterval(countDown);
          this.uppy.info(this.i18n("smile"), "success", 1500);
          setTimeout(() => resolve(), 1500);
        }
      }, 1e3);
    });
  }
  async takeSnapshot() {
    if (this.captureInProgress)
      return;
    this.captureInProgress = true;
    try {
      await this.opts.onBeforeSnapshot();
    } catch (err) {
      const message = typeof err === "object" ? err.message : err;
      this.uppy.info(message, "error", 5e3);
      throw new Error(`onBeforeSnapshot: ${message}`);
    }
    try {
      const tagFile = await this.getImage();
      this.capturedMediaFile = tagFile;
      const capturedSnapshotUrl = URL.createObjectURL(tagFile.data);
      this.setPluginState({ capturedSnapshot: capturedSnapshotUrl });
      this.captureInProgress = false;
    } catch (error) {
      this.captureInProgress = false;
      if (!error.isRestriction) {
        this.uppy.log(error);
      }
    }
  }
  getImage() {
    const video = this.getVideoElement();
    if (!video) {
      return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
    }
    const width = video.videoWidth;
    const height = video.videoHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const { restrictions } = this.uppy.opts;
    let preferredImageMimeTypes = [];
    if (this.opts.preferredImageMimeType) {
      preferredImageMimeTypes = [this.opts.preferredImageMimeType];
    } else if (restrictions.allowedFileTypes) {
      preferredImageMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isImageMimeType);
    }
    const mimeType = preferredImageMimeTypes[0] || "image/jpeg";
    const ext = getFileTypeExtension(mimeType) || "jpg";
    const name = `cam-${Date.now()}.${ext}`;
    return canvasToBlob(canvas, mimeType).then((blob) => {
      return {
        source: this.id,
        name,
        data: new Blob([blob], { type: mimeType }),
        type: mimeType
      };
    });
  }
  getVideo() {
    const mimeType = this.recordingChunks.find((blob2) => blob2.type?.length > 0).type;
    const fileExtension = getFileTypeExtension(mimeType);
    if (!fileExtension) {
      return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
    }
    const name = `webcam-${Date.now()}.${fileExtension}`;
    const blob = new Blob(this.recordingChunks, { type: mimeType });
    const file = {
      source: this.id,
      name,
      data: new Blob([blob], { type: mimeType }),
      type: mimeType
    };
    return Promise.resolve(file);
  }
  focus() {
    if (!this.opts.countdown)
      return;
    setTimeout(() => {
      this.uppy.info(this.i18n("smile"), "success", 1500);
    }, 1e3);
  }
  changeVideoSource(deviceId) {
    this.stop();
    this.start({ deviceId });
  }
  updateVideoSources() {
    this.mediaDevices.enumerateDevices().then((devices) => {
      this.setPluginState({
        videoSources: devices.filter((device) => device.kind === "videoinput")
      });
    });
  }
  render() {
    if (!this.webcamActive) {
      this.start();
    }
    const webcamState = this.getPluginState();
    if (!webcamState.cameraReady || !webcamState.hasCamera) {
      return u(PermissionsScreen, { icon: CameraIcon, i18n: this.i18n, hasCamera: webcamState.hasCamera });
    }
    return u(CameraScreen, { ...webcamState, onChangeVideoSource: this.changeVideoSource, onSnapshot: this.takeSnapshot, onStartRecording: this.startRecording, onStopRecording: this.stopRecording, onDiscardRecordedMedia: this.discardRecordedMedia, onSubmit: this.submit, onFocus: this.focus, onStop: this.stop, i18n: this.i18n, modes: this.opts.modes, showRecordingLength: this.opts.showRecordingLength, showVideoSourceDropdown: this.opts.showVideoSourceDropdown, supportsRecording: supportsMediaRecorder(), recording: webcamState.isRecording, mirror: this.#enableMirror, src: this.stream });
  }
  install() {
    const { mobileNativeCamera, modes, videoConstraints } = this.opts;
    const { target } = this.opts;
    if (mobileNativeCamera && target) {
      this.getTargetPlugin(target)?.setOptions({
        showNativeVideoCameraButton: isModeAvailable(modes, "video-only") || isModeAvailable(modes, "video-audio"),
        showNativePhotoCameraButton: isModeAvailable(modes, "picture"),
        nativeCameraFacingMode: videoConstraints?.facingMode
      });
      return;
    }
    this.setPluginState({
      cameraReady: false,
      recordingLengthSeconds: 0
    });
    if (target) {
      this.mount(target, this);
    }
    if (this.mediaDevices) {
      this.updateVideoSources();
      this.mediaDevices.ondevicechange = () => {
        this.updateVideoSources();
        if (this.stream) {
          let restartStream = true;
          const { videoSources, currentDeviceId } = this.getPluginState();
          videoSources.forEach((videoSource) => {
            if (currentDeviceId === videoSource.deviceId) {
              restartStream = false;
            }
          });
          if (restartStream) {
            this.stop();
            this.start();
          }
        }
      };
    }
  }
  uninstall() {
    this.stop();
    this.unmount();
  }
  onUnmount() {
    this.stop();
  }
}
export {
  Webcam as default,
  defaultOptions
};
