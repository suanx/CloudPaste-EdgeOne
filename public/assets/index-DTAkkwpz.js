import { k as u, A, y, U as UIPlugin } from "./UppyPluginManager-AHtBg_Vv.js";
import { g as getFileTypeExtension } from "./getFileTypeExtension-BReVzuN7.js";
import "./index-BQxzU9F1.js";
import "./storageConfigsStore-DUFoycii.js";
const version = "2.2.2";
const packageJson = {
  version
};
const locale = {
  strings: {
    pluginNameAudio: "Audio",
    // Used as the label for the button that starts an audio recording.
    // This is not visibly rendered but is picked up by screen readers.
    startAudioRecording: "Begin audio recording",
    // Used as the label for the button that stops an audio recording.
    // This is not visibly rendered but is picked up by screen readers.
    stopAudioRecording: "Stop audio recording",
    // Title on the “allow access” screen
    allowAudioAccessTitle: "Please allow access to your microphone",
    // Description on the “allow access” screen
    allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
    // Title on the “device not available” screen
    noAudioTitle: "Microphone Not Available",
    // Description on the “device not available” screen
    noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
    // Message about file size will be shown in an Informer bubble
    recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
    // Used as the label for the counter that shows recording length (`1:25`).
    // This is not visibly rendered but is picked up by screen readers.
    recordingLength: "Recording length %{recording_length}",
    // Used as the label for the submit checkmark button.
    // This is not visibly rendered but is picked up by screen readers.
    submitRecordedFile: "Submit recorded file",
    // Used as the label for the discard cross button.
    // This is not visibly rendered but is picked up by screen readers.
    discardRecordedFile: "Discard recorded file"
  }
};
const PermissionsScreen = (props) => {
  const { icon, hasAudio, i18n } = props;
  return u("div", { className: "uppy-Audio-permissons", children: [u("div", { className: "uppy-Audio-permissonsIcon", children: icon() }), u("div", { className: "uppy-Audio-title", children: hasAudio ? i18n("allowAudioAccessTitle") : i18n("noAudioTitle") }), u("p", { children: hasAudio ? i18n("allowAudioAccessDescription") : i18n("noAudioDescription") })] });
};
const AudioSourceSelect = ({ currentDeviceId, audioSources, onChangeSource }) => {
  return u("div", { className: "uppy-Audio-videoSource", children: u("select", { className: "uppy-u-reset uppy-Audio-audioSource-select", onChange: (event) => {
    onChangeSource(event.target.value);
  }, children: audioSources.map((audioSource) => u("option", { value: audioSource.deviceId, selected: audioSource.deviceId === currentDeviceId, children: audioSource.label }, audioSource.deviceId)) }) });
};
function isFunction(v) {
  return typeof v === "function";
}
function result(v) {
  return isFunction(v) ? v() : v;
}
class AudioOscilloscope {
  canvas;
  canvasContext;
  width;
  height;
  analyser;
  bufferLength;
  dataArray;
  onDrawFrame;
  streamSource;
  audioContext;
  source;
  constructor(canvas, options = {}) {
    const canvasOptions = options.canvas || {};
    const canvasContextOptions = options.canvasContext || {};
    this.analyser = null;
    this.bufferLength = 0;
    this.canvas = canvas;
    this.width = result(canvasOptions.width) || this.canvas.width;
    this.height = result(canvasOptions.height) || this.canvas.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvasContext = this.canvas.getContext("2d");
    this.canvasContext.fillStyle = result(canvasContextOptions.fillStyle) || "rgb(255, 255, 255)";
    this.canvasContext.strokeStyle = result(canvasContextOptions.strokeStyle) || "rgb(0, 0, 0)";
    this.canvasContext.lineWidth = result(canvasContextOptions.lineWidth) || 1;
    this.onDrawFrame = isFunction(options.onDrawFrame) ? options.onDrawFrame : () => {
    };
  }
  addSource(streamSource) {
    this.streamSource = streamSource;
    this.audioContext = this.streamSource.context;
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.source = this.audioContext.createBufferSource();
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.streamSource.connect(this.analyser);
  }
  draw() {
    const { analyser, dataArray, bufferLength } = this;
    const ctx = this.canvasContext;
    const w = this.width;
    const h = this.height;
    if (analyser) {
      analyser.getByteTimeDomainData(dataArray);
    }
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    const sliceWidth = w * 1 / bufferLength;
    let x = 0;
    if (!bufferLength) {
      ctx.moveTo(0, this.height / 2);
    }
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128;
      const y2 = v * (h / 2);
      if (i === 0) {
        ctx.moveTo(x, y2);
      } else {
        ctx.lineTo(x, y2);
      }
      x += sliceWidth;
    }
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    this.onDrawFrame(this);
    requestAnimationFrame(this.#draw);
  }
  #draw = () => this.draw();
}
function DiscardButton({ onDiscard, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Audio-button", type: "button", title: i18n("discardRecordedFile"), "aria-label": i18n("discardRecordedFile"), onClick: onDiscard, "data-uppy-super-focusable": true, children: u("svg", { width: "13", height: "13", viewBox: "0 0 13 13", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", className: "uppy-c-icon", children: u("g", { fill: "#FFF", fillRule: "evenodd", children: [u("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), u("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })] }) }) });
}
function RecordButton({ recording, onStartRecording, onStopRecording, i18n }) {
  if (recording) {
    return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Audio-button", type: "button", title: i18n("stopAudioRecording"), "aria-label": i18n("stopAudioRecording"), onClick: onStopRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "100", height: "100", viewBox: "0 0 100 100", children: u("rect", { x: "15", y: "15", width: "70", height: "70" }) }) });
  }
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Audio-button", type: "button", title: i18n("startAudioRecording"), "aria-label": i18n("startAudioRecording"), onClick: onStartRecording, "data-uppy-super-focusable": true, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "14px", height: "20px", viewBox: "0 0 14 20", children: u("path", { d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z", fill: "#FFF", "fill-rule": "nonzero" }) }) });
}
function formatSeconds(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function RecordingLength({ recordingLengthSeconds }) {
  const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
  return u("span", { children: formattedRecordingLengthSeconds });
}
function SubmitButton({ onSubmit, i18n }) {
  return u("button", { className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit", type: "button", title: i18n("submitRecordedFile"), "aria-label": i18n("submitRecordedFile"), onClick: onSubmit, "data-uppy-super-focusable": true, children: u("svg", { width: "12", height: "9", viewBox: "0 0 12 9", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", children: u("path", { fill: "#fff", fillRule: "nonzero", d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z" }) }) });
}
function RecordingScreen(props) {
  const { stream, recordedAudio, onStop, recording, supportsRecording, audioSources, showAudioSourceDropdown, onSubmit, i18n, onStartRecording, onStopRecording, onDiscardRecordedAudio, recordingLengthSeconds } = props;
  const canvasEl = A(null);
  const oscilloscope = A();
  y(() => {
    return () => {
      oscilloscope.current = null;
      onStop();
    };
  }, [onStop]);
  y(() => {
    if (!recordedAudio) {
      oscilloscope.current = new AudioOscilloscope(canvasEl.current, {
        canvas: {
          width: 600,
          height: 600
        },
        canvasContext: {
          lineWidth: 2,
          fillStyle: "rgb(0,0,0)",
          strokeStyle: "green"
        }
      });
      oscilloscope.current.draw();
      if (stream) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        oscilloscope.current.addSource(source);
      }
    }
  }, [recordedAudio, stream]);
  const hasRecordedAudio = recordedAudio != null;
  const shouldShowRecordButton = !hasRecordedAudio && supportsRecording;
  const shouldShowAudioSourceDropdown = showAudioSourceDropdown && !hasRecordedAudio && audioSources && audioSources.length > 1;
  return u("div", { className: "uppy-Audio-container", children: [u("div", { className: "uppy-Audio-audioContainer", children: hasRecordedAudio ? (
    // biome-ignore lint/a11y/useMediaCaption: ...
    u("audio", { className: "uppy-Audio-player", controls: true, src: recordedAudio })
  ) : u("canvas", { ref: canvasEl, className: "uppy-Audio-canvas" }) }), u("div", { className: "uppy-Audio-footer", children: [u("div", { className: "uppy-Audio-audioSourceContainer", children: shouldShowAudioSourceDropdown ? AudioSourceSelect(props) : null }), u("div", { className: "uppy-Audio-buttonContainer", children: [shouldShowRecordButton && u(RecordButton, { recording, onStartRecording, onStopRecording, i18n }), hasRecordedAudio && u(SubmitButton, { onSubmit, i18n }), hasRecordedAudio && u(DiscardButton, { onDiscard: onDiscardRecordedAudio, i18n })] }), u("div", { className: "uppy-Audio-recordingLength", children: !hasRecordedAudio && u(RecordingLength, { recordingLengthSeconds }) })] })] });
}
function supportsMediaRecorder() {
  return typeof MediaRecorder === "function" && typeof MediaRecorder.prototype?.start === "function";
}
class Audio extends UIPlugin {
  static VERSION = packageJson.version;
  #recordingLengthTimer;
  icon;
  #stream = null;
  #audioActive = false;
  #recordingChunks = null;
  #recorder = null;
  #capturedMediaFile = null;
  #mediaDevices;
  #supportsUserMedia;
  constructor(uppy, opts) {
    super(uppy, opts);
    this.#mediaDevices = navigator.mediaDevices;
    this.#supportsUserMedia = this.#mediaDevices != null;
    this.id = this.opts.id || "Audio";
    this.type = "acquirer";
    this.icon = () => u("svg", { className: "uppy-DashboardTab-iconAudio", "aria-hidden": "true", focusable: "false", width: "32px", height: "32px", viewBox: "0 0 32 32", children: u("path", { d: "M21.143 12.297c.473 0 .857.383.857.857v2.572c0 3.016-2.24 5.513-5.143 5.931v2.64h2.572a.857.857 0 110 1.714H12.57a.857.857 0 110-1.714h2.572v-2.64C12.24 21.24 10 18.742 10 15.726v-2.572a.857.857 0 111.714 0v2.572A4.29 4.29 0 0016 20.01a4.29 4.29 0 004.286-4.285v-2.572c0-.474.384-.857.857-.857zM16 6.5a3 3 0 013 3v6a3 3 0 01-6 0v-6a3 3 0 013-3z", fill: "currentcolor", "fill-rule": "nonzero" }) });
    this.defaultLocale = locale;
    this.opts = { ...opts };
    this.i18nInit();
    this.title = this.i18n("pluginNameAudio");
    this.setPluginState({
      hasAudio: false,
      audioReady: false,
      cameraError: null,
      recordingLengthSeconds: 0,
      audioSources: [],
      currentDeviceId: null
    });
  }
  #hasAudioCheck() {
    if (!this.#mediaDevices) {
      return Promise.resolve(false);
    }
    return this.#mediaDevices.enumerateDevices().then((devices) => {
      return devices.some((device) => device.kind === "audioinput");
    });
  }
  #start = (options) => {
    if (!this.#supportsUserMedia) {
      return Promise.reject(new Error("Microphone access not supported"));
    }
    this.#audioActive = true;
    this.#hasAudioCheck().then((hasAudio) => {
      this.setPluginState({
        hasAudio
      });
      return this.#mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.#stream = stream;
        let currentDeviceId = null;
        const tracks = stream.getAudioTracks();
        if (!options?.deviceId) {
          currentDeviceId = tracks[0].getSettings().deviceId;
        } else {
          currentDeviceId = tracks.findLast((track) => {
            return track.getSettings().deviceId === options.deviceId;
          });
        }
        this.#updateSources();
        this.setPluginState({
          currentDeviceId,
          audioReady: true
        });
      }).catch((err) => {
        this.setPluginState({
          audioReady: false,
          cameraError: err
        });
        this.uppy.info(err.message, "error");
      });
    });
  };
  #startRecording = () => {
    this.#recorder = new MediaRecorder(this.#stream);
    this.#recordingChunks = [];
    let stoppingBecauseOfMaxSize = false;
    this.#recorder.addEventListener("dataavailable", (event) => {
      this.#recordingChunks.push(event.data);
      const { restrictions } = this.uppy.opts;
      if (this.#recordingChunks.length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
        const totalSize = this.#recordingChunks.reduce((acc, chunk) => acc + chunk.size, 0);
        const averageChunkSize = (totalSize - this.#recordingChunks[0].size) / (this.#recordingChunks.length - 1);
        const expectedEndChunkSize = averageChunkSize * 3;
        const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
        if (totalSize > maxSize) {
          stoppingBecauseOfMaxSize = true;
          this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
          this.#stopRecording();
        }
      }
    });
    this.#recorder.start(500);
    this.#recordingLengthTimer = setInterval(() => {
      const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
      this.setPluginState({
        recordingLengthSeconds: currentRecordingLength + 1
      });
    }, 1e3);
    this.setPluginState({
      isRecording: true
    });
  };
  #stopRecording = () => {
    const stopped = new Promise((resolve) => {
      this.#recorder.addEventListener("stop", () => {
        resolve();
      });
      this.#recorder.stop();
      clearInterval(this.#recordingLengthTimer);
      this.setPluginState({ recordingLengthSeconds: 0 });
    });
    return stopped.then(() => {
      this.setPluginState({
        isRecording: false
      });
      return this.#getAudio();
    }).then((file) => {
      try {
        this.#capturedMediaFile = file;
        this.setPluginState({
          recordedAudio: URL.createObjectURL(file.data)
        });
      } catch (err) {
        if (!err.isRestriction) {
          this.uppy.log(err);
        }
      }
    }).then(() => {
      this.#recordingChunks = null;
      this.#recorder = null;
    }, (error) => {
      this.#recordingChunks = null;
      this.#recorder = null;
      throw error;
    });
  };
  #discardRecordedAudio = () => {
    this.setPluginState({ recordedAudio: null });
    this.#capturedMediaFile = null;
  };
  #submit = () => {
    try {
      if (this.#capturedMediaFile) {
        this.uppy.addFile(this.#capturedMediaFile);
      }
    } catch (err) {
      if (!err.isRestriction) {
        this.uppy.log(err, "warning");
      }
    }
  };
  #stop = async () => {
    if (this.#stream) {
      const audioTracks = this.#stream.getAudioTracks();
      audioTracks.forEach((track) => track.stop());
    }
    if (this.#recorder) {
      await new Promise((resolve) => {
        this.#recorder.addEventListener("stop", resolve, { once: true });
        this.#recorder.stop();
        clearInterval(this.#recordingLengthTimer);
      });
    }
    this.#recordingChunks = null;
    this.#recorder = null;
    this.#audioActive = false;
    this.#stream = null;
    this.setPluginState({
      recordedAudio: null,
      isRecording: false,
      recordingLengthSeconds: 0
    });
  };
  #getAudio() {
    const mimeType = this.#recordingChunks.find((blob2) => blob2.type?.length > 0).type;
    const fileExtension = getFileTypeExtension(mimeType);
    if (!fileExtension) {
      return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
    }
    const name = `audio-${Date.now()}.${fileExtension}`;
    const blob = new Blob(this.#recordingChunks, { type: mimeType });
    const file = {
      source: this.id,
      name,
      data: new Blob([blob], { type: mimeType }),
      type: mimeType
    };
    return Promise.resolve(file);
  }
  #changeSource = (deviceId) => {
    this.#stop();
    this.#start({ deviceId });
  };
  #updateSources = () => {
    this.#mediaDevices.enumerateDevices().then((devices) => {
      this.setPluginState({
        audioSources: devices.filter((device) => device.kind === "audioinput")
      });
    });
  };
  render() {
    if (!this.#audioActive) {
      this.#start();
    }
    const audioState = this.getPluginState();
    if (!audioState.audioReady || !audioState.hasAudio) {
      return u(PermissionsScreen, { icon: this.icon, i18n: this.i18n, hasAudio: audioState.hasAudio });
    }
    return u(RecordingScreen, { ...audioState, onChangeSource: this.#changeSource, onStartRecording: this.#startRecording, onStopRecording: this.#stopRecording, onDiscardRecordedAudio: this.#discardRecordedAudio, onSubmit: this.#submit, onStop: this.#stop, i18n: this.i18n, showAudioSourceDropdown: this.opts.showAudioSourceDropdown, supportsRecording: supportsMediaRecorder(), recording: audioState.isRecording, stream: this.#stream });
  }
  install() {
    this.setPluginState({
      audioReady: false,
      recordingLengthSeconds: 0
    });
    const { target } = this.opts;
    if (target) {
      this.mount(target, this);
    }
    if (this.#mediaDevices) {
      this.#updateSources();
      this.#mediaDevices.ondevicechange = () => {
        this.#updateSources();
        if (this.#stream) {
          let restartStream = true;
          const { audioSources, currentDeviceId } = this.getPluginState();
          audioSources.forEach((audioSource) => {
            if (currentDeviceId === audioSource.deviceId) {
              restartStream = false;
            }
          });
          if (restartStream) {
            this.#stop();
            this.#start();
          }
        }
      };
    }
  }
  uninstall() {
    if (this.#stream) {
      this.#stop();
    }
    this.unmount();
  }
}
export {
  Audio as default
};
