import { F as FileType, a as getExtension } from "./fileTypes-C4-giE9O.js";
import { aX as getDefaultExportFromCjs, aW as commonjsGlobal, aK as _export_sfc, g as ref, F as computed, eS as useResizeObserver, o as onMounted, w as watch, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, p as createCommentVNode, l as createBaseVNode, z as createVNode, y as unref, an as IconPlus, m as withModifiers, eo as IconMinus, t as toDisplayString, aD as normalizeStyle, n as normalizeClass } from "./index-BQxzU9F1.js";
let DataView$1 = class DataView2 {
  constructor(buffer) {
    if (bufferTypeIsUnsupported(buffer)) {
      throw new Error("DataView: Passed buffer type is unsupported.");
    }
    this.buffer = buffer;
    this.byteLength = this.buffer.length;
  }
  getUint8(offset) {
    return this.buffer.readUInt8(offset);
  }
  getUint16(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readUInt16LE(offset);
    }
    return this.buffer.readUInt16BE(offset);
  }
  getUint32(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readUInt32LE(offset);
    }
    return this.buffer.readUInt32BE(offset);
  }
  getInt32(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readInt32LE(offset);
    }
    return this.buffer.readInt32BE(offset);
  }
};
function bufferTypeIsUnsupported(buffer) {
  return typeof buffer !== "object" || buffer.length === void 0 || buffer.readUInt8 === void 0 || buffer.readUInt16LE === void 0 || buffer.readUInt16BE === void 0 || buffer.readUInt32LE === void 0 || buffer.readUInt32BE === void 0 || buffer.readInt32LE === void 0 || buffer.readInt32BE === void 0;
}
function getDataView$1(data, byteOffset, byteLength) {
  try {
    return new DataView(data, byteOffset, byteLength);
  } catch (error) {
    return new DataView$1(data, byteOffset, byteLength);
  }
}
function getStringFromDataView(dataView, offset, length) {
  const chars = [];
  for (let i = 0; i < length && offset + i < dataView.byteLength; i++) {
    chars.push(dataView.getUint8(offset + i));
  }
  return getStringValueFromArray(chars);
}
function getNullTerminatedStringFromDataView(dataView, offset) {
  const chars = [];
  let i = 0;
  while (offset + i < dataView.byteLength) {
    const char = dataView.getUint8(offset + i);
    if (char === 0) {
      break;
    }
    chars.push(char);
    i++;
  }
  return getStringValueFromArray(chars);
}
function getUnicodeStringFromDataView(dataView, offset, length) {
  const chars = [];
  for (let i = 0; i < length && offset + i < dataView.byteLength; i += 2) {
    chars.push(dataView.getUint16(offset + i));
  }
  if (chars[chars.length - 1] === 0) {
    chars.pop();
  }
  return getStringValueFromArray(chars);
}
function getPascalStringFromDataView(dataView, offset) {
  const size = dataView.getUint8(offset);
  const string = getStringFromDataView(dataView, offset + 1, size);
  return [size, string];
}
function getStringValueFromArray(charArray) {
  return charArray.map((charCode) => String.fromCharCode(charCode)).join("");
}
function objectAssign() {
  for (let i = 1; i < arguments.length; i++) {
    for (const property in arguments[i]) {
      arguments[0][property] = arguments[i][property];
    }
  }
  return arguments[0];
}
function deferInit(object, key, initializer) {
  let initialized = false;
  Object.defineProperty(object, key, {
    get() {
      if (!initialized) {
        initialized = true;
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          value: initializer.apply(object),
          writable: true
        });
      }
      return object[key];
    },
    configurable: true,
    enumerable: true
  });
}
function getBase64Image(image) {
  if (typeof btoa !== "undefined") {
    if (typeof image === "string") {
      return btoa(image);
    }
    return btoa(Array.prototype.reduce.call(new Uint8Array(image), (data, byte) => data + String.fromCharCode(byte), ""));
  }
  if (typeof Buffer === "undefined") {
    return void 0;
  }
  if (typeof Buffer.from !== "undefined") {
    return Buffer.from(image).toString("base64");
  }
  return new Buffer(image).toString("base64");
}
function dataUriToBuffer(dataUri) {
  const data = dataUri.substring(dataUri.indexOf(",") + 1);
  if (dataUri.indexOf(";base64") !== -1) {
    if (typeof atob !== "undefined") {
      return Uint8Array.from(atob(data), (char) => char.charCodeAt(0)).buffer;
    }
    if (typeof Buffer === "undefined") {
      return void 0;
    }
    if (typeof Buffer.from !== "undefined") {
      return Buffer.from(data, "base64");
    }
    return new Buffer(data, "base64");
  }
  const decodedData = decodeURIComponent(data);
  if (typeof Buffer !== "undefined") {
    if (typeof Buffer.from !== "undefined") {
      return Buffer.from(decodedData);
    }
    return new Buffer(decodedData);
  }
  return Uint8Array.from(decodedData, (char) => char.charCodeAt(0)).buffer;
}
function padStart(string, length, character) {
  const padding = strRepeat(character, length - string.length);
  return padding + string;
}
function parseFloatRadix(string, radix) {
  return parseInt(string.replace(".", ""), radix) / Math.pow(radix, (string.split(".")[1] || "").length);
}
function strRepeat(string, num) {
  return new Array(num + 1).join(string);
}
const COMPRESSION_METHOD_NONE = void 0;
const COMPRESSION_METHOD_DEFLATE = 0;
function decompress(dataView, compressionMethod, encoding, returnType = "string") {
  if (compressionMethod === COMPRESSION_METHOD_DEFLATE) {
    if (typeof DecompressionStream === "function") {
      const decompressionStream = new DecompressionStream("deflate");
      const decompressedStream = new Blob([dataView]).stream().pipeThrough(decompressionStream);
      if (returnType === "dataview") {
        return new Response(decompressedStream).arrayBuffer().then((arrayBuffer) => new DataView(arrayBuffer));
      }
      return new Response(decompressedStream).arrayBuffer().then((buffer) => new TextDecoder(encoding).decode(buffer));
    }
  }
  if (compressionMethod !== void 0) {
    return Promise.reject(`Unknown compression method ${compressionMethod}.`);
  }
  return dataView;
}
const Constants = {
  USE_FILE: true,
  USE_JFIF: true,
  USE_PNG_FILE: true,
  USE_EXIF: true,
  USE_IPTC: true,
  USE_XMP: true,
  USE_ICC: true,
  USE_MPF: true,
  USE_PHOTOSHOP: true,
  USE_THUMBNAIL: true,
  USE_TIFF: true,
  USE_JPEG: true,
  USE_PNG: true,
  USE_HEIC: true,
  USE_AVIF: true,
  USE_WEBP: true,
  USE_GIF: true,
  USE_MAKER_NOTES: true
};
function getStringValue(value) {
  return value.map((charCode) => String.fromCharCode(charCode)).join("");
}
function getEncodedString(value) {
  if (value.length >= 8) {
    const encoding = getStringValue(value.slice(0, 8));
    if (encoding === "ASCII\0\0\0") {
      return getStringValue(value.slice(8));
    } else if (encoding === "JIS\0\0\0\0\0") {
      return "[JIS encoded text]";
    } else if (encoding === "UNICODE\0") {
      return "[Unicode encoded text]";
    } else if (encoding === "\0\0\0\0\0\0\0\0") {
      return "[Undefined encoding]";
    }
  }
  return "Undefined";
}
function getCalculatedGpsValue(value) {
  return value[0][0] / value[0][1] + value[1][0] / value[1][1] / 60 + value[2][0] / value[2][1] / 3600;
}
const LITTLE_ENDIAN = 18761;
const BIG_ENDIAN = 19789;
const ByteOrder = {
  BIG_ENDIAN,
  LITTLE_ENDIAN,
  getByteOrder
};
function getByteOrder(dataView, tiffHeaderOffset) {
  if (dataView.getUint16(tiffHeaderOffset) === LITTLE_ENDIAN) {
    return LITTLE_ENDIAN;
  } else if (dataView.getUint16(tiffHeaderOffset) === BIG_ENDIAN) {
    return BIG_ENDIAN;
  }
  throw new Error("Illegal byte order value. Faulty image.");
}
const Tiff = {
  isTiffFile,
  findTiffOffsets
};
function isTiffFile(dataView) {
  const MIN_TIFF_DATA_BUFFER_LENGTH = 4;
  return !!dataView && dataView.byteLength >= MIN_TIFF_DATA_BUFFER_LENGTH && hasTiffMarker(dataView);
}
function hasTiffMarker(dataView) {
  const TIFF_ID = 42;
  const TIFF_ID_OFFSET = 2;
  const littleEndian = dataView.getUint16(0) === ByteOrder.LITTLE_ENDIAN;
  return dataView.getUint16(TIFF_ID_OFFSET, littleEndian) === TIFF_ID;
}
function findTiffOffsets() {
  const TIFF_FILE_HEADER_OFFSET = 0;
  {
    return {
      hasAppMarkers: true,
      tiffHeaderOffset: TIFF_FILE_HEADER_OFFSET
    };
  }
}
const Jpeg = {
  isJpegFile,
  findJpegOffsets
};
const MIN_JPEG_DATA_BUFFER_LENGTH = 2;
const JPEG_ID = 65496;
const JPEG_ID_SIZE = 2;
const APP_ID_OFFSET = 4;
const APP_MARKER_SIZE = 2;
const JFIF_DATA_OFFSET = 2;
const TIFF_HEADER_OFFSET = 10;
const IPTC_DATA_OFFSET = 18;
const XMP_DATA_OFFSET = 33;
const XMP_EXTENDED_DATA_OFFSET = 79;
const APP2_ICC_DATA_OFFSET = 18;
const MPF_DATA_OFFSET = 8;
const APP2_ICC_IDENTIFIER = "ICC_PROFILE\0";
const ICC_CHUNK_NUMBER_OFFSET = APP_ID_OFFSET + APP2_ICC_IDENTIFIER.length;
const ICC_TOTAL_CHUNKS_OFFSET = ICC_CHUNK_NUMBER_OFFSET + 1;
const APP2_MPF_IDENTIFIER = "MPF\0";
const SOF0_MARKER = 65472;
const SOF2_MARKER = 65474;
const DHT_MARKER = 65476;
const DQT_MARKER = 65499;
const DRI_MARKER = 65501;
const SOS_MARKER = 65498;
const APP0_MARKER = 65504;
const APP1_MARKER = 65505;
const APP2_MARKER = 65506;
const APP13_MARKER = 65517;
const APP15_MARKER = 65519;
const COMMENT_MARKER = 65534;
const FILL_BYTE = 65535;
const APP0_JFIF_IDENTIFIER = "JFIF";
const APP1_EXIF_IDENTIFIER = "Exif";
const APP1_XMP_IDENTIFIER = "http://ns.adobe.com/xap/1.0/\0";
const APP1_XMP_EXTENDED_IDENTIFIER = "http://ns.adobe.com/xmp/extension/\0";
const APP13_IPTC_IDENTIFIER = "Photoshop 3.0";
function isJpegFile(dataView) {
  return !!dataView && dataView.byteLength >= MIN_JPEG_DATA_BUFFER_LENGTH && dataView.getUint16(0) === JPEG_ID;
}
function findJpegOffsets(dataView) {
  let appMarkerPosition = JPEG_ID_SIZE;
  let fieldLength;
  let sof0DataOffset;
  let sof2DataOffset;
  let jfifDataOffset;
  let tiffHeaderOffset;
  let iptcDataOffset;
  let xmpChunks;
  let iccChunks;
  let mpfDataOffset;
  while (appMarkerPosition + APP_ID_OFFSET + 5 <= dataView.byteLength) {
    if (isSOF0Marker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      sof0DataOffset = appMarkerPosition + APP_MARKER_SIZE;
    } else if (isSOF2Marker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      sof2DataOffset = appMarkerPosition + APP_MARKER_SIZE;
    } else if (isApp0JfifMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      jfifDataOffset = appMarkerPosition + JFIF_DATA_OFFSET;
    } else if (isApp1ExifMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      tiffHeaderOffset = appMarkerPosition + TIFF_HEADER_OFFSET;
    } else if (isApp1XmpMarker(dataView, appMarkerPosition)) {
      if (!xmpChunks) {
        xmpChunks = [];
      }
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      xmpChunks.push(getXmpChunkDetails(appMarkerPosition, fieldLength));
    } else if (isApp1ExtendedXmpMarker(dataView, appMarkerPosition)) {
      if (!xmpChunks) {
        xmpChunks = [];
      }
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      xmpChunks.push(getExtendedXmpChunkDetails(appMarkerPosition, fieldLength));
    } else if (isApp13PhotoshopMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      iptcDataOffset = appMarkerPosition + IPTC_DATA_OFFSET;
    } else if (isApp2ICCMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      const iccDataOffset = appMarkerPosition + APP2_ICC_DATA_OFFSET;
      const iccDataLength = fieldLength - (APP2_ICC_DATA_OFFSET - APP_MARKER_SIZE);
      const iccChunkNumber = dataView.getUint8(appMarkerPosition + ICC_CHUNK_NUMBER_OFFSET);
      const iccChunksTotal = dataView.getUint8(appMarkerPosition + ICC_TOTAL_CHUNKS_OFFSET);
      if (!iccChunks) {
        iccChunks = [];
      }
      iccChunks.push({ offset: iccDataOffset, length: iccDataLength, chunkNumber: iccChunkNumber, chunksTotal: iccChunksTotal });
    } else if (isApp2MPFMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
      mpfDataOffset = appMarkerPosition + MPF_DATA_OFFSET;
    } else if (isAppMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
    } else if (isFillByte(dataView, appMarkerPosition)) {
      appMarkerPosition++;
      continue;
    } else {
      break;
    }
    appMarkerPosition += APP_MARKER_SIZE + fieldLength;
  }
  return {
    hasAppMarkers: appMarkerPosition > JPEG_ID_SIZE,
    fileDataOffset: sof0DataOffset || sof2DataOffset,
    jfifDataOffset,
    tiffHeaderOffset,
    iptcDataOffset,
    xmpChunks,
    iccChunks,
    mpfDataOffset
  };
}
function isSOF0Marker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition) === SOF0_MARKER;
}
function isSOF2Marker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition) === SOF2_MARKER;
}
function isApp2ICCMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP2_ICC_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition) === APP2_MARKER && getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP2_ICC_IDENTIFIER;
}
function isApp2MPFMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP2_MPF_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition) === APP2_MARKER && getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP2_MPF_IDENTIFIER;
}
function isApp0JfifMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP0_JFIF_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition) === APP0_MARKER && getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP0_JFIF_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength) === 0;
}
function isApp1ExifMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP1_EXIF_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition) === APP1_MARKER && getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_EXIF_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength) === 0;
}
function isApp1XmpMarker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition) === APP1_MARKER && isXmpIdentifier(dataView, appMarkerPosition);
}
function isXmpIdentifier(dataView, appMarkerPosition) {
  const markerIdLength = APP1_XMP_IDENTIFIER.length;
  return getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_XMP_IDENTIFIER;
}
function isApp1ExtendedXmpMarker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition) === APP1_MARKER && isExtendedXmpIdentifier(dataView, appMarkerPosition);
}
function isExtendedXmpIdentifier(dataView, appMarkerPosition) {
  const markerIdLength = APP1_XMP_EXTENDED_IDENTIFIER.length;
  return getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_XMP_EXTENDED_IDENTIFIER;
}
function getXmpChunkDetails(appMarkerPosition, fieldLength) {
  return {
    dataOffset: appMarkerPosition + XMP_DATA_OFFSET,
    length: fieldLength - (XMP_DATA_OFFSET - APP_MARKER_SIZE)
  };
}
function getExtendedXmpChunkDetails(appMarkerPosition, fieldLength) {
  return {
    dataOffset: appMarkerPosition + XMP_EXTENDED_DATA_OFFSET,
    length: fieldLength - (XMP_EXTENDED_DATA_OFFSET - APP_MARKER_SIZE)
  };
}
function isApp13PhotoshopMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP13_IPTC_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition) === APP13_MARKER && getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP13_IPTC_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength) === 0;
}
function isAppMarker(dataView, appMarkerPosition) {
  const appMarker = dataView.getUint16(appMarkerPosition);
  return appMarker >= APP0_MARKER && appMarker <= APP15_MARKER || appMarker === COMMENT_MARKER || appMarker === SOF0_MARKER || appMarker === SOF2_MARKER || appMarker === DHT_MARKER || appMarker === DQT_MARKER || appMarker === DRI_MARKER || appMarker === SOS_MARKER;
}
function isFillByte(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition) === FILL_BYTE;
}
const Png = {
  isPngFile,
  findPngOffsets
};
const PNG_ID = "PNG\r\n\n";
const PNG_CHUNK_LENGTH_SIZE = 4;
const PNG_CHUNK_TYPE_SIZE = 4;
const PNG_CHUNK_LENGTH_OFFSET = 0;
const PNG_CHUNK_TYPE_OFFSET = PNG_CHUNK_LENGTH_SIZE;
const PNG_CHUNK_DATA_OFFSET = PNG_CHUNK_LENGTH_SIZE + PNG_CHUNK_TYPE_SIZE;
const PNG_XMP_PREFIX = "XML:com.adobe.xmp\0";
const TYPE_TEXT = "tEXt";
const TYPE_ITXT = "iTXt";
const TYPE_ZTXT = "zTXt";
const TYPE_PHYS = "pHYs";
const TYPE_TIME = "tIME";
const TYPE_EXIF = "eXIf";
const TYPE_ICCP = "iCCP";
function isPngFile(dataView) {
  return !!dataView && getStringFromDataView(dataView, 0, PNG_ID.length) === PNG_ID;
}
function findPngOffsets(dataView, async) {
  const PNG_CRC_SIZE = 4;
  const offsets = {
    hasAppMarkers: false
  };
  let offset = PNG_ID.length;
  while (offset + PNG_CHUNK_LENGTH_SIZE + PNG_CHUNK_TYPE_SIZE <= dataView.byteLength) {
    if (isPngImageHeaderChunk(dataView, offset)) {
      offsets.hasAppMarkers = true;
      offsets.pngHeaderOffset = offset + PNG_CHUNK_DATA_OFFSET;
    } else if (isPngXmpChunk(dataView, offset)) {
      const dataOffset = getPngXmpDataOffset(dataView, offset);
      if (dataOffset !== void 0) {
        offsets.hasAppMarkers = true;
        offsets.xmpChunks = [{
          dataOffset,
          length: dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET) - (dataOffset - (offset + PNG_CHUNK_DATA_OFFSET))
        }];
      }
    } else if (isPngTextChunk(dataView, offset, async)) {
      offsets.hasAppMarkers = true;
      const chunkType = getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE);
      if (!offsets.pngTextChunks) {
        offsets.pngTextChunks = [];
      }
      offsets.pngTextChunks.push({
        length: dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET),
        type: chunkType,
        offset: offset + PNG_CHUNK_DATA_OFFSET
      });
    } else if (isPngExifChunk(dataView, offset)) {
      offsets.hasAppMarkers = true;
      offsets.tiffHeaderOffset = offset + PNG_CHUNK_DATA_OFFSET;
    } else if (async && isPngIccpChunk(dataView, offset)) {
      offsets.hasAppMarkers = true;
      const chunkDataLength = dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET);
      const iccHeaderOffset = offset + PNG_CHUNK_DATA_OFFSET;
      const { profileName, compressionMethod, compressedProfileOffset } = parseIccHeader(dataView, iccHeaderOffset);
      if (!offsets.iccChunks) {
        offsets.iccChunks = [];
      }
      offsets.iccChunks.push({
        offset: compressedProfileOffset,
        length: chunkDataLength - (compressedProfileOffset - iccHeaderOffset),
        chunkNumber: 1,
        chunksTotal: 1,
        profileName,
        compressionMethod
      });
    } else if (isPngChunk(dataView, offset)) {
      offsets.hasAppMarkers = true;
      if (!offsets.pngChunkOffsets) {
        offsets.pngChunkOffsets = [];
      }
      offsets.pngChunkOffsets.push(offset + PNG_CHUNK_LENGTH_OFFSET);
    }
    offset += dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET) + PNG_CHUNK_LENGTH_SIZE + PNG_CHUNK_TYPE_SIZE + PNG_CRC_SIZE;
  }
  return offsets;
}
function isPngImageHeaderChunk(dataView, offset) {
  const PNG_CHUNK_TYPE_IMAGE_HEADER = "IHDR";
  return getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === PNG_CHUNK_TYPE_IMAGE_HEADER;
}
function isPngXmpChunk(dataView, offset) {
  return getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === TYPE_ITXT && getStringFromDataView(dataView, offset + PNG_CHUNK_DATA_OFFSET, PNG_XMP_PREFIX.length) === PNG_XMP_PREFIX;
}
function isPngTextChunk(dataView, offset, async) {
  const chunkType = getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE);
  return chunkType === TYPE_TEXT || chunkType === TYPE_ITXT || chunkType === TYPE_ZTXT && async;
}
function isPngExifChunk(dataView, offset) {
  return getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === TYPE_EXIF;
}
function isPngIccpChunk(dataView, offset) {
  return getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === TYPE_ICCP;
}
function isPngChunk(dataView, offset) {
  const SUPPORTED_PNG_CHUNK_TYPES = [TYPE_PHYS, TYPE_TIME];
  const chunkType = getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE);
  return SUPPORTED_PNG_CHUNK_TYPES.includes(chunkType);
}
function getPngXmpDataOffset(dataView, offset) {
  const COMPRESSION_FLAG_SIZE = 1;
  const COMPRESSION_METHOD_SIZE = 1;
  offset += PNG_CHUNK_DATA_OFFSET + PNG_XMP_PREFIX.length + COMPRESSION_FLAG_SIZE + COMPRESSION_METHOD_SIZE;
  let numberOfNullSeparators = 0;
  while (numberOfNullSeparators < 2 && offset < dataView.byteLength) {
    if (dataView.getUint8(offset) === 0) {
      numberOfNullSeparators++;
    }
    offset++;
  }
  if (numberOfNullSeparators < 2) {
    return void 0;
  }
  return offset;
}
function parseIccHeader(dataView, offset) {
  const NULL_SEPARATOR_SIZE = 1;
  const COMPRESSION_METHOD_SIZE = 1;
  const profileName = getNullTerminatedStringFromDataView(dataView, offset);
  offset += profileName.length + NULL_SEPARATOR_SIZE;
  const compressionMethod = dataView.getUint8(offset);
  offset += COMPRESSION_METHOD_SIZE;
  return {
    profileName,
    compressionMethod,
    compressedProfileOffset: offset
  };
}
function get64BitValue(dataView, offset) {
  return dataView.getUint32(offset + 4);
}
function parseItemLocationBox(dataView, version, contentOffset, boxLength) {
  const FLAGS_SIZE = 3;
  const { offsets, sizes } = getItemLocationBoxOffsetsAndSizes(version, contentOffset + FLAGS_SIZE);
  const offsetSize = dataView.getUint8(offsets.offsetSize) >> 4;
  sizes.item.extent.extentOffset = offsetSize;
  const lengthSize = dataView.getUint8(offsets.lengthSize) & 15;
  sizes.item.extent.extentLength = lengthSize;
  const baseOffsetSize = dataView.getUint8(offsets.baseOffsetSize) >> 4;
  sizes.item.baseOffset = baseOffsetSize;
  const indexSize = getIndexSize(dataView, offsets.indexSize, version);
  sizes.item.extent.extentIndex = indexSize !== void 0 ? indexSize : 0;
  const itemCount = getItemCount(dataView, offsets.itemCount, version);
  return {
    type: "iloc",
    items: getItems(dataView, version, offsets, sizes, offsetSize, lengthSize, indexSize, itemCount),
    length: boxLength
  };
}
function getItemLocationBoxOffsetsAndSizes(version, contentOffset) {
  const sizes = {
    item: {
      dataReferenceIndex: 2,
      extentCount: 2,
      extent: {}
    }
  };
  if (version < 2) {
    sizes.itemCount = 2;
    sizes.item.itemId = 2;
  } else if (version === 2) {
    sizes.itemCount = 4;
    sizes.item.itemId = 4;
  }
  if (version === 1 || version === 2) {
    sizes.item.constructionMethod = 2;
  } else {
    sizes.item.constructionMethod = 0;
  }
  const offsets = {
    offsetSize: contentOffset,
    lengthSize: contentOffset,
    baseOffsetSize: contentOffset + 1,
    indexSize: contentOffset + 1
  };
  offsets.itemCount = contentOffset + 2;
  offsets.items = offsets.itemCount + sizes.itemCount;
  offsets.item = {
    itemId: 0
  };
  offsets.item.constructionMethod = offsets.item.itemId + sizes.item.itemId;
  offsets.item.dataReferenceIndex = offsets.item.constructionMethod + sizes.item.constructionMethod;
  return { offsets, sizes };
}
function getIndexSize(dataView, offset, version) {
  if (version === 1 || version === 2) {
    return dataView.getUint8(offset) & 15;
  }
  return void 0;
}
function getItemCount(dataView, offset, version) {
  if (version < 2) {
    return dataView.getUint16(offset);
  } else if (version === 2) {
    return dataView.getUint32(offset);
  }
  return void 0;
}
function getItems(dataView, version, offsets, sizes, offsetSize, lengthSize, indexSize, itemCount) {
  if (itemCount === void 0) {
    return [];
  }
  const items = [];
  let offset = offsets.items;
  for (let i = 0; i < itemCount; i++) {
    const item = { extents: [] };
    item.itemId = getItemId(dataView, offset, version);
    offset += sizes.item.itemId;
    item.constructionMethod = version === 1 || version === 2 ? dataView.getUint16(offset) & 15 : void 0;
    offset += sizes.item.constructionMethod;
    item.dataReferenceIndex = dataView.getUint16(offset);
    offset += sizes.item.dataReferenceIndex;
    item.baseOffset = getVariableSizedValue(dataView, offset, sizes.item.baseOffset);
    offset += sizes.item.baseOffset;
    item.extentCount = dataView.getUint16(offset);
    offset += sizes.item.extentCount;
    for (let j = 0; j < item.extentCount; j++) {
      const extent = {};
      extent.extentIndex = getExtentIndex(dataView, version, offset, indexSize);
      offset += sizes.item.extent.extentIndex;
      extent.extentOffset = getVariableSizedValue(dataView, offset, offsetSize);
      offset += sizes.item.extent.extentOffset;
      extent.extentLength = getVariableSizedValue(dataView, offset, lengthSize);
      offset += sizes.item.extent.extentLength;
      item.extents.push(extent);
    }
    items.push(item);
  }
  return items;
}
function getItemId(dataView, offset, version) {
  if (version < 2) {
    return dataView.getUint16(offset);
  } else if (version === 2) {
    return dataView.getUint32(offset);
  }
  return void 0;
}
function getExtentIndex(dataView, version, offset, indexSize) {
  if ((version === 1 || version === 2) && indexSize > 0) {
    return getVariableSizedValue(dataView, offset, indexSize);
  }
  return void 0;
}
function getVariableSizedValue(dataView, offset, size) {
  if (size === 4) {
    return dataView.getUint32(offset);
  }
  if (size === 8) {
    console.warn("This file uses an 8-bit offset which is currently not supported by ExifReader. Contact the maintainer to get it fixed.");
    return get64BitValue(dataView, offset);
  }
  return 0;
}
const TYPE_FTYP = 1718909296;
const TYPE_IPRP = 1768977008;
const TYPE_META = 1835365473;
const TYPE_ILOC = 1768714083;
const TYPE_IINF = 1768517222;
const TYPE_INFE = 1768842853;
const TYPE_IPCO = 1768973167;
const TYPE_COLR = 1668246642;
const ITEM_INFO_TYPE_EXIF = 1165519206;
const ITEM_INFO_TYPE_MIME = 1835625829;
const ITEM_INFO_TYPE_URI = 1970432288;
function parseBox(dataView, offset) {
  const BOX_TYPE_OFFSET = 4;
  const BOX_MIN_LENGTH = 8;
  const VERSION_SIZE = 1;
  const { length, contentOffset } = getBoxLength(dataView, offset);
  if (length < BOX_MIN_LENGTH) {
    return void 0;
  }
  const type = dataView.getUint32(offset + BOX_TYPE_OFFSET);
  if (type === TYPE_FTYP) {
    return parseFileTypeBox(dataView, contentOffset, length);
  }
  if (type === TYPE_IPRP) {
    return parseItemPropertiesBox(dataView, offset, contentOffset, length);
  }
  if (type === TYPE_IPCO) {
    return parseItemPropertyContainerBox(dataView, offset, contentOffset, length);
  }
  if (type === TYPE_COLR) {
    return parseColorInformationBox(dataView, contentOffset, length);
  }
  const version = dataView.getUint8(contentOffset);
  if (type === TYPE_META) {
    return parseMetadataBox(dataView, offset, contentOffset + VERSION_SIZE, length);
  }
  if (type === TYPE_ILOC) {
    return parseItemLocationBox(dataView, version, contentOffset + VERSION_SIZE, length);
  }
  if (type === TYPE_IINF) {
    return parseItemInformationBox(dataView, offset, version, contentOffset + VERSION_SIZE, length);
  }
  if (type === TYPE_INFE) {
    return parseItemInformationEntryBox(dataView, offset, version, contentOffset + VERSION_SIZE, length);
  }
  return {
    // type: getStringFromDataView(dataView, offset + BOX_TYPE_OFFSET, 4),
    type: void 0,
    length
  };
}
function getBoxLength(dataView, offset) {
  const BOX_LENGTH_SIZE = 4;
  const BOX_TYPE_SIZE = 4;
  const BOX_EXTENDED_SIZE = 8;
  const BOX_EXTENDED_SIZE_LOW_OFFSET = 12;
  const boxLength = dataView.getUint32(offset);
  if (extendsToEndOfFile(boxLength)) {
    return {
      length: dataView.byteLength - offset,
      contentOffset: offset + BOX_LENGTH_SIZE + BOX_TYPE_SIZE
    };
  }
  if (hasExtendedSize(boxLength)) {
    if (hasEmptyHighBits(dataView, offset)) {
      return {
        length: dataView.getUint32(offset + BOX_EXTENDED_SIZE_LOW_OFFSET),
        contentOffset: offset + BOX_LENGTH_SIZE + BOX_TYPE_SIZE + BOX_EXTENDED_SIZE
      };
    }
  }
  return {
    length: boxLength,
    contentOffset: offset + BOX_LENGTH_SIZE + BOX_TYPE_SIZE
  };
}
function extendsToEndOfFile(boxLength) {
  return boxLength === 0;
}
function hasExtendedSize(boxLength) {
  return boxLength === 1;
}
function hasEmptyHighBits(dataView, offset) {
  const BOX_EXTENDED_SIZE_OFFSET = 8;
  return dataView.getUint32(offset + BOX_EXTENDED_SIZE_OFFSET) === 0;
}
function findOffsets$3(dataView) {
  {
    const offsets = {};
    const metaBox = findMetaBox(dataView);
    if (!metaBox) {
      return { hasAppMarkers: false };
    }
    {
      offsets.tiffHeaderOffset = findExifOffset(dataView, metaBox);
    }
    {
      offsets.xmpChunks = findXmpChunks(metaBox);
    }
    {
      offsets.iccChunks = findIccChunks(metaBox);
    }
    offsets.hasAppMarkers = offsets.tiffHeaderOffset !== void 0 || offsets.xmpChunks !== void 0 || offsets.iccChunks !== void 0;
    return offsets;
  }
}
function findMetaBox(dataView) {
  const BOX_LENGTH_SIZE = 4;
  const BOX_TYPE_SIZE = 4;
  let offset = 0;
  while (offset + BOX_LENGTH_SIZE + BOX_TYPE_SIZE <= dataView.byteLength) {
    const box = parseBox(dataView, offset);
    if (box === void 0) {
      break;
    }
    if (box.type === "meta") {
      return box;
    }
    offset += box.length;
  }
  return void 0;
}
function findExifOffset(dataView, metaBox) {
  try {
    const exifItemId = findIinfExifItemId(metaBox).itemId;
    const ilocItem = findIlocItem(metaBox, exifItemId);
    const exifOffset = ilocItem.baseOffset + ilocItem.extents[0].extentOffset;
    return getTiffHeaderOffset(dataView, exifOffset);
  } catch (error) {
    return void 0;
  }
}
function findIinfExifItemId(metaBox) {
  return metaBox.subBoxes.find((box) => box.type === "iinf").itemInfos.find((itemInfo) => itemInfo.itemType === ITEM_INFO_TYPE_EXIF);
}
function findIlocItem(metaBox, itemId) {
  return metaBox.subBoxes.find((box) => box.type === "iloc").items.find((item) => item.itemId === itemId);
}
function getTiffHeaderOffset(dataView, exifOffset) {
  const TIFF_HEADER_OFFSET_SIZE = 4;
  return exifOffset + TIFF_HEADER_OFFSET_SIZE + dataView.getUint32(exifOffset);
}
function findXmpChunks(metaBox) {
  try {
    const xmpItemId = findIinfXmpItemId(metaBox).itemId;
    const ilocItem = findIlocItem(metaBox, xmpItemId);
    const ilocItemExtent = findIlocItem(metaBox, xmpItemId).extents[0];
    return [
      {
        dataOffset: ilocItem.baseOffset + ilocItemExtent.extentOffset,
        length: ilocItemExtent.extentLength
      }
    ];
  } catch (error) {
    return void 0;
  }
}
function findIinfXmpItemId(metaBox) {
  return metaBox.subBoxes.find((box) => box.type === "iinf").itemInfos.find((itemInfo) => itemInfo.itemType === ITEM_INFO_TYPE_MIME && itemInfo.contentType === "application/rdf+xml");
}
function findIccChunks(metaBox) {
  try {
    const icc = metaBox.subBoxes.find((box) => box.type === "iprp").subBoxes.find((box) => box.type === "ipco").properties.find((box) => box.type === "colr").icc;
    if (icc) {
      return [icc];
    }
  } catch (error) {
  }
  return void 0;
}
function parseFileTypeBox(dataView, contentOffset, boxLength) {
  const MAJOR_BRAND_SIZE = 4;
  const majorBrand = getStringFromDataView(dataView, contentOffset, MAJOR_BRAND_SIZE);
  return {
    type: "ftyp",
    majorBrand,
    length: boxLength
  };
}
function parseItemPropertiesBox(dataView, startOffset, contentOffset, length) {
  return {
    type: "iprp",
    subBoxes: parseSubBoxes(dataView, contentOffset, length - (contentOffset - startOffset)),
    length
  };
}
function parseItemPropertyContainerBox(dataView, startOffset, contentOffset, length) {
  return {
    type: "ipco",
    properties: parseSubBoxes(dataView, contentOffset, length - (contentOffset - startOffset)),
    length
  };
}
function parseColorInformationBox(dataView, contentOffset, length) {
  return {
    type: "colr",
    icc: parseIcc(dataView, contentOffset),
    length
  };
}
function parseIcc(dataView, contentOffset) {
  const COLOR_TYPE_SIZE = 4;
  const colorType = getStringFromDataView(dataView, contentOffset, COLOR_TYPE_SIZE);
  if (colorType !== "prof" && colorType !== "rICC") {
    return void 0;
  }
  return {
    offset: contentOffset + COLOR_TYPE_SIZE,
    length: dataView.getUint32(contentOffset + COLOR_TYPE_SIZE),
    chunkNumber: 1,
    chunksTotal: 1
  };
}
function parseMetadataBox(dataView, startOffset, contentOffset, length) {
  const FLAGS_SIZE = 3;
  return {
    type: "meta",
    subBoxes: parseSubBoxes(dataView, contentOffset + FLAGS_SIZE, length - (contentOffset + FLAGS_SIZE - startOffset)),
    length
  };
}
function parseSubBoxes(dataView, offset, length) {
  const ACCEPTED_ITEM_INFO_TYPES = [
    ITEM_INFO_TYPE_EXIF,
    ITEM_INFO_TYPE_MIME
  ];
  const subBoxes = [];
  let currentOffset = offset;
  while (currentOffset < offset + length) {
    const box = parseBox(dataView, currentOffset);
    if (box === void 0) {
      break;
    }
    if (box.type !== void 0 && (box.itemType === void 0 || ACCEPTED_ITEM_INFO_TYPES.indexOf(box.itemType) !== -1)) {
      subBoxes.push(box);
    }
    currentOffset += box.length;
  }
  return subBoxes;
}
function parseItemInformationBox(dataView, startOffset, version, contentOffset, length) {
  const { offsets } = getItemInformationBoxOffsetsAndSizes(version, contentOffset);
  return {
    type: "iinf",
    itemInfos: parseSubBoxes(dataView, offsets.itemInfos, length - (offsets.itemInfos - startOffset)),
    length
  };
}
function getItemInformationBoxOffsetsAndSizes(version, contentOffset) {
  const FLAGS_SIZE = 3;
  const offsets = { entryCount: contentOffset + FLAGS_SIZE };
  const sizes = {};
  if (version === 0) {
    sizes.entryCount = 2;
  } else {
    sizes.entryCount = 4;
  }
  offsets.itemInfos = offsets.entryCount + sizes.entryCount;
  return { offsets };
}
function parseItemInformationEntryBox(dataView, startOffset, version, contentOffset, length) {
  const FLAGS_SIZE = 3;
  contentOffset += FLAGS_SIZE;
  const entry = { type: "infe", length };
  if (version === 0 || version === 1) {
    entry.itemId = dataView.getUint16(contentOffset);
    contentOffset += 2;
    entry.itemProtectionIndex = dataView.getUint16(contentOffset);
    contentOffset += 2;
    entry.itemName = getNullTerminatedStringFromDataView(dataView, contentOffset);
    contentOffset += entry.itemName.length + 1;
  }
  if (version >= 2) {
    if (version === 2) {
      entry.itemId = dataView.getUint16(contentOffset);
      contentOffset += 2;
    } else if (version === 3) {
      entry.itemId = dataView.getUint32(contentOffset);
      contentOffset += 4;
    }
    entry.itemProtectionIndex = dataView.getUint16(contentOffset);
    contentOffset += 2;
    entry.itemType = dataView.getUint32(contentOffset);
    contentOffset += 4;
    entry.itemName = getNullTerminatedStringFromDataView(dataView, contentOffset);
    contentOffset += entry.itemName.length + 1;
    if (entry.itemType === ITEM_INFO_TYPE_MIME) {
      entry.contentType = getNullTerminatedStringFromDataView(dataView, contentOffset);
      contentOffset += entry.contentType.length + 1;
      if (startOffset + length > contentOffset) {
        entry.contentEncoding = getNullTerminatedStringFromDataView(dataView, contentOffset);
        contentOffset += entry.contentEncoding.length + 1;
      }
    } else if (entry.itemType === ITEM_INFO_TYPE_URI) {
      entry.itemUri = getNullTerminatedStringFromDataView(dataView, contentOffset);
      contentOffset += entry.itemUri.length + 1;
    }
  }
  return entry;
}
const Heic = {
  isHeicFile,
  findHeicOffsets
};
function isHeicFile(dataView) {
  if (!dataView) {
    return false;
  }
  const HEIC_MAJOR_BRANDS = ["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1"];
  try {
    const headerBox = parseBox(dataView, 0);
    return headerBox && HEIC_MAJOR_BRANDS.indexOf(headerBox.majorBrand) !== -1;
  } catch (error) {
    return false;
  }
}
function findHeicOffsets(dataView) {
  return findOffsets$3(dataView);
}
const Avif = {
  isAvifFile,
  findAvifOffsets
};
function isAvifFile(dataView) {
  if (!dataView) {
    return false;
  }
  try {
    const headerBox = parseBox(dataView, 0);
    return headerBox && headerBox.majorBrand === "avif";
  } catch (error) {
    return false;
  }
}
function findAvifOffsets(dataView) {
  return findOffsets$3(dataView);
}
const Webp = {
  isWebpFile,
  findOffsets: findOffsets$2
};
function isWebpFile(dataView) {
  const RIFF_ID_OFFSET = 0;
  const RIFF_ID = "RIFF";
  const WEBP_MARKER_OFFSET = 8;
  const WEBP_MARKER = "WEBP";
  return !!dataView && getStringFromDataView(dataView, RIFF_ID_OFFSET, RIFF_ID.length) === RIFF_ID && getStringFromDataView(dataView, WEBP_MARKER_OFFSET, WEBP_MARKER.length) === WEBP_MARKER;
}
function findOffsets$2(dataView) {
  const SUB_CHUNK_START_OFFSET = 12;
  const CHUNK_SIZE_OFFSET = 4;
  const EXIF_IDENTIFIER = "Exif\0\0";
  const CHUNK_HEADER_SIZE = 8;
  let offset = SUB_CHUNK_START_OFFSET;
  let hasAppMarkers = false;
  let tiffHeaderOffset;
  let xmpChunks;
  let iccChunks;
  let vp8xChunkOffset;
  while (offset + CHUNK_HEADER_SIZE < dataView.byteLength) {
    const chunkId = getStringFromDataView(dataView, offset, 4);
    const chunkSize = dataView.getUint32(offset + CHUNK_SIZE_OFFSET, true);
    if (chunkId === "EXIF") {
      hasAppMarkers = true;
      if (getStringFromDataView(dataView, offset + CHUNK_HEADER_SIZE, EXIF_IDENTIFIER.length) === EXIF_IDENTIFIER) {
        tiffHeaderOffset = offset + CHUNK_HEADER_SIZE + EXIF_IDENTIFIER.length;
      } else {
        tiffHeaderOffset = offset + CHUNK_HEADER_SIZE;
      }
    } else if (chunkId === "XMP ") {
      hasAppMarkers = true;
      xmpChunks = [{
        dataOffset: offset + CHUNK_HEADER_SIZE,
        length: chunkSize
      }];
    } else if (chunkId === "ICCP") {
      hasAppMarkers = true;
      iccChunks = [{
        offset: offset + CHUNK_HEADER_SIZE,
        length: chunkSize,
        chunkNumber: 1,
        chunksTotal: 1
      }];
    } else if (chunkId === "VP8X") {
      hasAppMarkers = true;
      vp8xChunkOffset = offset + CHUNK_HEADER_SIZE;
    }
    offset += CHUNK_HEADER_SIZE + (chunkSize % 2 === 0 ? chunkSize : chunkSize + 1);
  }
  return {
    hasAppMarkers,
    tiffHeaderOffset,
    xmpChunks,
    iccChunks,
    vp8xChunkOffset
  };
}
const Gif = {
  isGifFile,
  findOffsets: findOffsets$1
};
const GIF_SIGNATURE_SIZE = 6;
const GIF_SIGNATURES = ["GIF87a", "GIF89a"];
function isGifFile(dataView) {
  return !!dataView && GIF_SIGNATURES.includes(getStringFromDataView(dataView, 0, GIF_SIGNATURE_SIZE));
}
function findOffsets$1() {
  return {
    gifHeaderOffset: 0
  };
}
const Xml = {
  isXMLFile,
  findOffsets
};
const XML_MARKER_OFFSET = 0;
const XML_MARKER = "<?xpacket begin";
function isXMLFile(dataView) {
  return !!dataView && getStringFromDataView(dataView, XML_MARKER_OFFSET, XML_MARKER.length) === XML_MARKER;
}
function findOffsets(dataView) {
  const xmpChunks = [];
  xmpChunks.push({ dataOffset: XML_MARKER_OFFSET, length: dataView.byteLength });
  return {
    xmpChunks
  };
}
const ImageHeader = {
  parseAppMarkers
};
function parseAppMarkers(dataView, async) {
  if (Tiff.isTiffFile(dataView)) {
    return addFileType(Tiff.findTiffOffsets(), "tiff", "TIFF");
  }
  if (Jpeg.isJpegFile(dataView)) {
    return addFileType(Jpeg.findJpegOffsets(dataView), "jpeg", "JPEG");
  }
  if (Png.isPngFile(dataView)) {
    return addFileType(Png.findPngOffsets(dataView, async), "png", "PNG");
  }
  if (Heic.isHeicFile(dataView)) {
    return addFileType(Heic.findHeicOffsets(dataView), "heic", "HEIC");
  }
  if (Avif.isAvifFile(dataView)) {
    return addFileType(Avif.findAvifOffsets(dataView), "avif", "AVIF");
  }
  if (Webp.isWebpFile(dataView)) {
    return addFileType(Webp.findOffsets(dataView), "webp", "WebP");
  }
  if (Gif.isGifFile(dataView)) {
    return addFileType(Gif.findOffsets(dataView), "gif", "GIF");
  }
  if (Xml.isXMLFile(dataView)) {
    return addFileType(Xml.findOffsets(dataView), "xml", "XML");
  }
  throw new Error("Invalid image format");
}
function addFileType(offsets, fileType, fileTypeDescription) {
  return objectAssign({}, offsets, { fileType: { value: fileType, description: fileTypeDescription } });
}
const TagNamesCommon = {
  ApertureValue: (value) => Math.pow(Math.sqrt(2), value[0] / value[1]).toFixed(2),
  ColorSpace(value) {
    if (value === 1) {
      return "sRGB";
    } else if (value === 65535) {
      return "Uncalibrated";
    }
    return "Unknown";
  },
  ComponentsConfiguration(value) {
    return value.map((character) => {
      if (character === 49) {
        return "Y";
      } else if (character === 50) {
        return "Cb";
      } else if (character === 51) {
        return "Cr";
      } else if (character === 52) {
        return "R";
      } else if (character === 53) {
        return "G";
      } else if (character === 54) {
        return "B";
      }
    }).join("");
  },
  Contrast(value) {
    if (value === 0) {
      return "Normal";
    } else if (value === 1) {
      return "Soft";
    } else if (value === 2) {
      return "Hard";
    }
    return "Unknown";
  },
  CustomRendered(value) {
    if (value === 0) {
      return "Normal process";
    } else if (value === 1) {
      return "Custom process";
    }
    return "Unknown";
  },
  ExposureMode(value) {
    if (value === 0) {
      return "Auto exposure";
    } else if (value === 1) {
      return "Manual exposure";
    } else if (value === 2) {
      return "Auto bracket";
    }
    return "Unknown";
  },
  ExposureProgram(value) {
    if (value === 0) {
      return "Undefined";
    } else if (value === 1) {
      return "Manual";
    } else if (value === 2) {
      return "Normal program";
    } else if (value === 3) {
      return "Aperture priority";
    } else if (value === 4) {
      return "Shutter priority";
    } else if (value === 5) {
      return "Creative program";
    } else if (value === 6) {
      return "Action program";
    } else if (value === 7) {
      return "Portrait mode";
    } else if (value === 8) {
      return "Landscape mode";
    } else if (value === 9) {
      return "Bulb";
    }
    return "Unknown";
  },
  ExposureTime(value) {
    if (value[0] / value[1] > 0.25) {
      const decimal = value[0] / value[1];
      if (Number.isInteger(decimal)) {
        return "" + decimal;
      }
      return decimal.toFixed(1);
    }
    if (value[0] !== 0) {
      return `1/${Math.round(value[1] / value[0])}`;
    }
    return `0/${value[1]}`;
  },
  FNumber: (value) => `f/${Number(value[0] / value[1]).toFixed(1)}`,
  FocalLength: (value) => value[0] / value[1] + " mm",
  FocalPlaneResolutionUnit(value) {
    if (value === 2) {
      return "inches";
    } else if (value === 3) {
      return "centimeters";
    } else if (value === 4) {
      return "millimeters";
    }
    return "Unknown";
  },
  LightSource: (value) => {
    if (value === 1) {
      return "Daylight";
    } else if (value === 2) {
      return "Fluorescent";
    } else if (value === 3) {
      return "Tungsten (incandescent light)";
    } else if (value === 4) {
      return "Flash";
    } else if (value === 9) {
      return "Fine weather";
    } else if (value === 10) {
      return "Cloudy weather";
    } else if (value === 11) {
      return "Shade";
    } else if (value === 12) {
      return "Daylight fluorescent (D 5700 – 7100K)";
    } else if (value === 13) {
      return "Day white fluorescent (N 4600 – 5400K)";
    } else if (value === 14) {
      return "Cool white fluorescent (W 3900 – 4500K)";
    } else if (value === 15) {
      return "White fluorescent (WW 3200 – 3700K)";
    } else if (value === 17) {
      return "Standard light A";
    } else if (value === 18) {
      return "Standard light B";
    } else if (value === 19) {
      return "Standard light C";
    } else if (value === 20) {
      return "D55";
    } else if (value === 21) {
      return "D65";
    } else if (value === 22) {
      return "D75";
    } else if (value === 23) {
      return "D50";
    } else if (value === 24) {
      return "ISO studio tungsten";
    } else if (value === 255) {
      return "Other light source";
    }
    return "Unknown";
  },
  MeteringMode(value) {
    if (value === 1) {
      return "Average";
    } else if (value === 2) {
      return "CenterWeightedAverage";
    } else if (value === 3) {
      return "Spot";
    } else if (value === 4) {
      return "MultiSpot";
    } else if (value === 5) {
      return "Pattern";
    } else if (value === 6) {
      return "Partial";
    } else if (value === 255) {
      return "Other";
    }
    return "Unknown";
  },
  ResolutionUnit(value) {
    if (value === 2) {
      return "inches";
    }
    if (value === 3) {
      return "centimeters";
    }
    return "Unknown";
  },
  Saturation(value) {
    if (value === 0) {
      return "Normal";
    } else if (value === 1) {
      return "Low saturation";
    } else if (value === 2) {
      return "High saturation";
    }
    return "Unknown";
  },
  FocalLengthIn35mmFilm(value) {
    if (value === 0) {
      return "Unknown";
    }
    return value + " mm";
  },
  SceneCaptureType(value) {
    if (value === 0) {
      return "Standard";
    } else if (value === 1) {
      return "Landscape";
    } else if (value === 2) {
      return "Portrait";
    } else if (value === 3) {
      return "Night scene";
    }
    return "Unknown";
  },
  Sharpness(value) {
    if (value === 0) {
      return "Normal";
    } else if (value === 1) {
      return "Soft";
    } else if (value === 2) {
      return "Hard";
    }
    return "Unknown";
  },
  ShutterSpeedValue(value) {
    const denominator = Math.pow(2, value[0] / value[1]);
    if (denominator <= 1) {
      return `${Math.round(1 / denominator)}`;
    }
    return `1/${Math.round(denominator)}`;
  },
  WhiteBalance(value) {
    if (value === 0) {
      return "Auto white balance";
    } else if (value === 1) {
      return "Manual white balance";
    }
    return "Unknown";
  },
  XResolution: (value) => "" + Math.round(value[0] / value[1]),
  YResolution: (value) => "" + Math.round(value[0] / value[1])
};
const TagNames0thIfd = {
  11: "ProcessingSoftware",
  254: {
    name: "SubfileType",
    description: (value) => ({
      0: "Full-resolution image",
      1: "Reduced-resolution image",
      2: "Single page of multi-page image",
      3: "Single page of multi-page reduced-resolution image",
      4: "Transparency mask",
      5: "Transparency mask of reduced-resolution image",
      6: "Transparency mask of multi-page image",
      7: "Transparency mask of reduced-resolution multi-page image",
      65537: "Alternate reduced-resolution image",
      4294967295: "Invalid"
    })[value] || "Unknown"
  },
  255: {
    name: "OldSubfileType",
    description: (value) => ({
      0: "Full-resolution image",
      1: "Reduced-resolution image",
      2: "Single page of multi-page image"
    })[value] || "Unknown"
  },
  256: "ImageWidth",
  257: "ImageLength",
  258: "BitsPerSample",
  259: "Compression",
  262: "PhotometricInterpretation",
  263: {
    name: "Thresholding",
    description: (value) => ({
      1: "No dithering or halftoning",
      2: "Ordered dither or halfton",
      3: "Randomized dither"
    })[value] || "Unknown"
  },
  264: "CellWidth",
  265: "CellLength",
  266: {
    name: "FillOrder",
    description: (value) => ({
      1: "Normal",
      2: "Reversed"
    })[value] || "Unknown"
  },
  269: "DocumentName",
  270: "ImageDescription",
  271: "Make",
  272: "Model",
  273: "StripOffsets",
  274: {
    name: "Orientation",
    description: (value) => {
      if (value === 1) {
        return "top-left";
      }
      if (value === 2) {
        return "top-right";
      }
      if (value === 3) {
        return "bottom-right";
      }
      if (value === 4) {
        return "bottom-left";
      }
      if (value === 5) {
        return "left-top";
      }
      if (value === 6) {
        return "right-top";
      }
      if (value === 7) {
        return "right-bottom";
      }
      if (value === 8) {
        return "left-bottom";
      }
      return "Undefined";
    }
  },
  277: "SamplesPerPixel",
  278: "RowsPerStrip",
  279: "StripByteCounts",
  280: "MinSampleValue",
  281: "MaxSampleValue",
  282: {
    "name": "XResolution",
    "description": TagNamesCommon.XResolution
  },
  283: {
    "name": "YResolution",
    "description": TagNamesCommon.YResolution
  },
  284: "PlanarConfiguration",
  285: "PageName",
  286: {
    "name": "XPosition",
    "description": (value) => {
      return "" + Math.round(value[0] / value[1]);
    }
  },
  287: {
    "name": "YPosition",
    "description": (value) => {
      return "" + Math.round(value[0] / value[1]);
    }
  },
  290: {
    name: "GrayResponseUnit",
    description: (value) => ({
      1: "0.1",
      2: "0.001",
      3: "0.0001",
      4: "1e-05",
      5: "1e-06"
    })[value] || "Unknown"
  },
  296: {
    name: "ResolutionUnit",
    description: TagNamesCommon.ResolutionUnit
  },
  297: "PageNumber",
  301: "TransferFunction",
  305: "Software",
  306: "DateTime",
  315: "Artist",
  316: "HostComputer",
  317: "Predictor",
  318: {
    "name": "WhitePoint",
    "description": (values) => {
      return values.map((value) => `${value[0]}/${value[1]}`).join(", ");
    }
  },
  319: {
    "name": "PrimaryChromaticities",
    "description": (values) => {
      return values.map((value) => `${value[0]}/${value[1]}`).join(", ");
    }
  },
  321: "HalftoneHints",
  322: "TileWidth",
  323: "TileLength",
  330: "A100DataOffset",
  332: {
    name: "InkSet",
    description: (value) => ({
      1: "CMYK",
      2: "Not CMYK"
    })[value] || "Unknown"
  },
  337: "TargetPrinter",
  338: {
    name: "ExtraSamples",
    description: (value) => ({
      0: "Unspecified",
      1: "Associated Alpha",
      2: "Unassociated Alpha"
    })[value] || "Unknown"
  },
  339: {
    name: "SampleFormat",
    description: (value) => {
      const formats = {
        1: "Unsigned",
        2: "Signed",
        3: "Float",
        4: "Undefined",
        5: "Complex int",
        6: "Complex float"
      };
      if (!Array.isArray(value)) {
        return "Unknown";
      }
      return value.map((sample) => formats[sample] || "Unknown").join(", ");
    }
  },
  513: "JPEGInterchangeFormat",
  514: "JPEGInterchangeFormatLength",
  529: {
    "name": "YCbCrCoefficients",
    "description": (values) => {
      return values.map((value) => "" + value[0] / value[1]).join("/");
    }
  },
  530: "YCbCrSubSampling",
  531: {
    name: "YCbCrPositioning",
    description: (value) => {
      if (value === 1) {
        return "centered";
      }
      if (value === 2) {
        return "co-sited";
      }
      return "undefined " + value;
    }
  },
  532: {
    "name": "ReferenceBlackWhite",
    "description": (values) => {
      return values.map((value) => "" + value[0] / value[1]).join(", ");
    }
  },
  700: "ApplicationNotes",
  18246: "Rating",
  18249: "RatingPercent",
  33432: {
    name: "Copyright",
    description: (value) => value.join("; ")
  },
  33550: "PixelScale",
  33723: "IPTC-NAA",
  33920: "IntergraphMatrix",
  33922: "ModelTiePoint",
  34118: "SEMInfo",
  34264: "ModelTransform",
  34377: "PhotoshopSettings",
  34665: "Exif IFD Pointer",
  34675: "ICC_Profile",
  34735: "GeoTiffDirectory",
  34736: "GeoTiffDoubleParams",
  34737: "GeoTiffAsciiParams",
  34853: "GPS Info IFD Pointer",
  40091: {
    name: "XPTitle",
    description: decodeXPValue
  },
  40092: {
    name: "XPComment",
    description: decodeXPValue
  },
  40093: {
    name: "XPAuthor",
    description: decodeXPValue
  },
  40094: {
    name: "XPKeywords",
    description: decodeXPValue
  },
  40095: {
    name: "XPSubject",
    description: decodeXPValue
  },
  42112: "GDALMetadata",
  42113: "GDALNoData",
  50341: "PrintIM",
  50707: "DNGBackwardVersion",
  50708: "UniqueCameraModel",
  50709: "LocalizedCameraModel",
  50721: "ColorMatrix1",
  50722: "ColorMatrix2",
  50723: "CameraCalibration1",
  50724: "CameraCalibration2",
  50725: "ReductionMatrix1",
  50726: "ReductionMatrix2",
  50727: "AnalogBalance",
  50728: "AsShotNeutral",
  50729: "AsShotWhiteXY",
  50730: "BaselineExposure",
  50731: "BaselineNoise",
  50732: "BaselineSharpness",
  50734: "LinearResponseLimit",
  50735: "CameraSerialNumber",
  50736: "DNGLensInfo",
  50739: "ShadowScale",
  50741: {
    name: "MakerNoteSafety",
    description: (value) => ({
      0: "Unsafe",
      1: "Safe"
    })[value] || "Unknown"
  },
  50778: {
    name: "CalibrationIlluminant1",
    description: TagNamesCommon["LightSource"]
  },
  50779: {
    name: "CalibrationIlluminant2",
    description: TagNamesCommon["LightSource"]
  },
  50781: "RawDataUniqueID",
  50827: "OriginalRawFileName",
  50828: "OriginalRawFileData",
  50831: "AsShotICCProfile",
  50832: "AsShotPreProfileMatrix",
  50833: "CurrentICCProfile",
  50834: "CurrentPreProfileMatrix",
  50879: "ColorimetricReference",
  50885: "SRawType",
  50898: "PanasonicTitle",
  50899: "PanasonicTitle2",
  50931: "CameraCalibrationSig",
  50932: "ProfileCalibrationSig",
  50933: "ProfileIFD",
  50934: "AsShotProfileName",
  50936: "ProfileName",
  50937: "ProfileHueSatMapDims",
  50938: "ProfileHueSatMapData1",
  50939: "ProfileHueSatMapData2",
  50940: "ProfileToneCurve",
  50941: {
    name: "ProfileEmbedPolicy",
    description: (value) => ({
      0: "Allow Copying",
      1: "Embed if Used",
      2: "Never Embed",
      3: "No Restrictions"
    })[value] || "Unknown"
  },
  50942: "ProfileCopyright",
  50964: "ForwardMatrix1",
  50965: "ForwardMatrix2",
  50966: "PreviewApplicationName",
  50967: "PreviewApplicationVersion",
  50968: "PreviewSettingsName",
  50969: "PreviewSettingsDigest",
  50970: {
    name: "PreviewColorSpace",
    description: (value) => ({
      1: "Gray Gamma 2.2",
      2: "sRGB",
      3: "Adobe RGB",
      4: "ProPhoto RGB"
    })[value] || "Unknown"
  },
  50971: "PreviewDateTime",
  50972: "RawImageDigest",
  50973: "OriginalRawFileDigest",
  50981: "ProfileLookTableDims",
  50982: "ProfileLookTableData",
  51043: "TimeCodes",
  51044: "FrameRate",
  51058: "TStop",
  51081: "ReelName",
  51089: "OriginalDefaultFinalSize",
  51090: "OriginalBestQualitySize",
  51091: "OriginalDefaultCropSize",
  51105: "CameraLabel",
  51107: {
    name: "ProfileHueSatMapEncoding",
    description: (value) => ({
      0: "Linear",
      1: "sRGB"
    })[value] || "Unknown"
  },
  51108: {
    name: "ProfileLookTableEncoding",
    description: (value) => ({
      0: "Linear",
      1: "sRGB"
    })[value] || "Unknown"
  },
  51109: "BaselineExposureOffset",
  51110: {
    name: "DefaultBlackRender",
    description: (value) => ({
      0: "Auto",
      1: "None"
    })[value] || "Unknown"
  },
  51111: "NewRawImageDigest",
  51112: "RawToPreviewGain"
};
function decodeXPValue(value) {
  const decodedValue = new TextDecoder("utf-16").decode(new Uint8Array(value));
  return decodedValue.replace(/\u0000+$/, "");
}
const TagNamesExifIfd = {
  33434: {
    "name": "ExposureTime",
    "description": TagNamesCommon.ExposureTime
  },
  33437: {
    "name": "FNumber",
    "description": TagNamesCommon.FNumber
  },
  34850: {
    "name": "ExposureProgram",
    "description": TagNamesCommon.ExposureProgram
  },
  34852: "SpectralSensitivity",
  34855: "ISOSpeedRatings",
  34856: {
    "name": "OECF",
    "description": () => "[Raw OECF table data]"
  },
  34858: "TimeZoneOffset",
  34859: "SelfTimerMode",
  34864: {
    name: "SensitivityType",
    description: (value) => ({
      1: "Standard Output Sensitivity",
      2: "Recommended Exposure Index",
      3: "ISO Speed",
      4: "Standard Output Sensitivity and Recommended Exposure Index",
      5: "Standard Output Sensitivity and ISO Speed",
      6: "Recommended Exposure Index and ISO Speed",
      7: "Standard Output Sensitivity, Recommended Exposure Index and ISO Speed"
    })[value] || "Unknown"
  },
  34865: "StandardOutputSensitivity",
  34866: "RecommendedExposureIndex",
  34867: "ISOSpeed",
  34868: "ISOSpeedLatitudeyyy",
  34869: "ISOSpeedLatitudezzz",
  36864: {
    "name": "ExifVersion",
    "description": (value) => getStringValue(value)
  },
  36867: "DateTimeOriginal",
  36868: "DateTimeDigitized",
  36873: "GooglePlusUploadCode",
  36880: "OffsetTime",
  36881: "OffsetTimeOriginal",
  36882: "OffsetTimeDigitized",
  37121: {
    "name": "ComponentsConfiguration",
    "description": TagNamesCommon.ComponentsConfiguration
  },
  37122: "CompressedBitsPerPixel",
  37377: {
    "name": "ShutterSpeedValue",
    "description": TagNamesCommon.ShutterSpeedValue
  },
  37378: {
    "name": "ApertureValue",
    "description": TagNamesCommon.ApertureValue
  },
  37379: "BrightnessValue",
  37380: "ExposureBiasValue",
  37381: {
    "name": "MaxApertureValue",
    "description": (value) => {
      return Math.pow(Math.sqrt(2), value[0] / value[1]).toFixed(2);
    }
  },
  37382: {
    "name": "SubjectDistance",
    "description": (value) => value[0] / value[1] + " m"
  },
  37383: {
    "name": "MeteringMode",
    "description": TagNamesCommon.MeteringMode
  },
  37384: {
    "name": "LightSource",
    description: TagNamesCommon.LightSource
  },
  37385: {
    "name": "Flash",
    "description": (value) => {
      if (value === 0) {
        return "Flash did not fire";
      } else if (value === 1) {
        return "Flash fired";
      } else if (value === 5) {
        return "Strobe return light not detected";
      } else if (value === 7) {
        return "Strobe return light detected";
      } else if (value === 9) {
        return "Flash fired, compulsory flash mode";
      } else if (value === 13) {
        return "Flash fired, compulsory flash mode, return light not detected";
      } else if (value === 15) {
        return "Flash fired, compulsory flash mode, return light detected";
      } else if (value === 16) {
        return "Flash did not fire, compulsory flash mode";
      } else if (value === 24) {
        return "Flash did not fire, auto mode";
      } else if (value === 25) {
        return "Flash fired, auto mode";
      } else if (value === 29) {
        return "Flash fired, auto mode, return light not detected";
      } else if (value === 31) {
        return "Flash fired, auto mode, return light detected";
      } else if (value === 32) {
        return "No flash function";
      } else if (value === 65) {
        return "Flash fired, red-eye reduction mode";
      } else if (value === 69) {
        return "Flash fired, red-eye reduction mode, return light not detected";
      } else if (value === 71) {
        return "Flash fired, red-eye reduction mode, return light detected";
      } else if (value === 73) {
        return "Flash fired, compulsory flash mode, red-eye reduction mode";
      } else if (value === 77) {
        return "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected";
      } else if (value === 79) {
        return "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected";
      } else if (value === 89) {
        return "Flash fired, auto mode, red-eye reduction mode";
      } else if (value === 93) {
        return "Flash fired, auto mode, return light not detected, red-eye reduction mode";
      } else if (value === 95) {
        return "Flash fired, auto mode, return light detected, red-eye reduction mode";
      }
      return "Unknown";
    }
  },
  37386: {
    "name": "FocalLength",
    "description": TagNamesCommon.FocalLength
  },
  37393: "ImageNumber",
  37394: {
    name: "SecurityClassification",
    description: (value) => ({
      "C": "Confidential",
      "R": "Restricted",
      "S": "Secret",
      "T": "Top Secret",
      "U": "Unclassified"
    })[value] || "Unknown"
  },
  37395: "ImageHistory",
  37396: {
    "name": "SubjectArea",
    "description": (value) => {
      if (value.length === 2) {
        return `Location; X: ${value[0]}, Y: ${value[1]}`;
      } else if (value.length === 3) {
        return `Circle; X: ${value[0]}, Y: ${value[1]}, diameter: ${value[2]}`;
      } else if (value.length === 4) {
        return `Rectangle; X: ${value[0]}, Y: ${value[1]}, width: ${value[2]}, height: ${value[3]}`;
      }
      return "Unknown";
    }
  },
  37500: {
    "name": "MakerNote",
    "description": () => "[Raw maker note data]"
  },
  37510: {
    "name": "UserComment",
    "description": getEncodedString
  },
  37520: "SubSecTime",
  37521: "SubSecTimeOriginal",
  37522: "SubSecTimeDigitized",
  37724: "ImageSourceData",
  37888: {
    "name": "AmbientTemperature",
    "description": (value) => value[0] / value[1] + " °C"
  },
  37889: {
    "name": "Humidity",
    "description": (value) => value[0] / value[1] + " %"
  },
  37890: {
    "name": "Pressure",
    "description": (value) => value[0] / value[1] + " hPa"
  },
  37891: {
    "name": "WaterDepth",
    "description": (value) => value[0] / value[1] + " m"
  },
  37892: {
    "name": "Acceleration",
    "description": (value) => value[0] / value[1] + " mGal"
  },
  37893: {
    "name": "CameraElevationAngle",
    "description": (value) => value[0] / value[1] + " °"
  },
  40960: {
    "name": "FlashpixVersion",
    "description": (value) => value.map((charCode) => String.fromCharCode(charCode)).join("")
  },
  40961: {
    "name": "ColorSpace",
    "description": TagNamesCommon.ColorSpace
  },
  40962: "PixelXDimension",
  40963: "PixelYDimension",
  40964: "RelatedSoundFile",
  40965: "Interoperability IFD Pointer",
  41483: "FlashEnergy",
  41484: {
    "name": "SpatialFrequencyResponse",
    "description": () => "[Raw SFR table data]"
  },
  41486: "FocalPlaneXResolution",
  41487: "FocalPlaneYResolution",
  41488: {
    "name": "FocalPlaneResolutionUnit",
    "description": TagNamesCommon.FocalPlaneResolutionUnit
  },
  41492: {
    "name": "SubjectLocation",
    "description": ([x, y]) => `X: ${x}, Y: ${y}`
  },
  41493: "ExposureIndex",
  41495: {
    "name": "SensingMethod",
    "description": (value) => {
      if (value === 1) {
        return "Undefined";
      } else if (value === 2) {
        return "One-chip color area sensor";
      } else if (value === 3) {
        return "Two-chip color area sensor";
      } else if (value === 4) {
        return "Three-chip color area sensor";
      } else if (value === 5) {
        return "Color sequential area sensor";
      } else if (value === 7) {
        return "Trilinear sensor";
      } else if (value === 8) {
        return "Color sequential linear sensor";
      }
      return "Unknown";
    }
  },
  41728: {
    "name": "FileSource",
    "description": (value) => {
      if (value === 3) {
        return "DSC";
      }
      return "Unknown";
    }
  },
  41729: {
    "name": "SceneType",
    "description": (value) => {
      if (value === 1) {
        return "A directly photographed image";
      }
      return "Unknown";
    }
  },
  41730: {
    "name": "CFAPattern",
    "description": () => "[Raw CFA pattern table data]"
  },
  41985: {
    "name": "CustomRendered",
    "description": TagNamesCommon.CustomRendered
  },
  41986: {
    "name": "ExposureMode",
    "description": TagNamesCommon.ExposureMode
  },
  41987: {
    "name": "WhiteBalance",
    "description": TagNamesCommon.WhiteBalance
  },
  41988: {
    "name": "DigitalZoomRatio",
    "description": (value) => {
      if (value[0] === 0) {
        return "Digital zoom was not used";
      }
      return "" + value[0] / value[1];
    }
  },
  41989: {
    "name": "FocalLengthIn35mmFilm",
    // Sometimes called FocalLengthIn35mmFormat.
    "description": TagNamesCommon.FocalLengthIn35mmFilm
  },
  41990: {
    "name": "SceneCaptureType",
    "description": TagNamesCommon.SceneCaptureType
  },
  41991: {
    "name": "GainControl",
    "description": (value) => {
      if (value === 0) {
        return "None";
      } else if (value === 1) {
        return "Low gain up";
      } else if (value === 2) {
        return "High gain up";
      } else if (value === 3) {
        return "Low gain down";
      } else if (value === 4) {
        return "High gain down";
      }
      return "Unknown";
    }
  },
  41992: {
    "name": "Contrast",
    "description": TagNamesCommon.Contrast
  },
  41993: {
    "name": "Saturation",
    "description": TagNamesCommon.Saturation
  },
  41994: {
    "name": "Sharpness",
    "description": TagNamesCommon.Sharpness
  },
  41995: {
    "name": "DeviceSettingDescription",
    "description": () => "[Raw device settings table data]"
  },
  41996: {
    "name": "SubjectDistanceRange",
    "description": (value) => {
      if (value === 1) {
        return "Macro";
      } else if (value === 2) {
        return "Close view";
      } else if (value === 3) {
        return "Distant view";
      }
      return "Unknown";
    }
  },
  42016: "ImageUniqueID",
  42032: "CameraOwnerName",
  42033: "BodySerialNumber",
  42034: {
    "name": "LensSpecification",
    "description": (value) => {
      const focalLengthFrom = parseFloat((value[0][0] / value[0][1]).toFixed(5));
      const focalLengthTo = parseFloat((value[1][0] / value[1][1]).toFixed(5));
      const focalLengths = `${focalLengthFrom}-${focalLengthTo} mm`;
      if (value[3][1] === 0) {
        return `${focalLengths} f/?`;
      }
      const maxAperture = 1 / (value[2][1] / value[2][1] / (value[3][0] / value[3][1]));
      return `${focalLengths} f/${parseFloat(maxAperture.toFixed(5))}`;
    }
  },
  42035: "LensMake",
  42036: "LensModel",
  42037: "LensSerialNumber",
  42080: {
    name: "CompositeImage",
    description: (value) => ({
      1: "Not a Composite Image",
      2: "General Composite Image",
      3: "Composite Image Captured While Shooting"
    })[value] || "Unknown"
  },
  42081: "SourceImageNumberOfCompositeImage",
  42082: "SourceExposureTimesOfCompositeImage",
  42240: "Gamma",
  59932: "Padding",
  59933: "OffsetSchema",
  65e3: "OwnerName",
  65001: "SerialNumber",
  65002: "Lens",
  65100: "RawFile",
  65101: "Converter",
  65102: "WhiteBalance",
  65105: "Exposure",
  65106: "Shadows",
  65107: "Brightness",
  65108: "Contrast",
  65109: "Saturation",
  65110: "Sharpness",
  65111: "Smoothness",
  65112: "MoireFilter"
};
const TagNamesGpsIfd = {
  0: {
    "name": "GPSVersionID",
    "description": (value) => {
      if (value[0] === 2 && value[1] === 2 && value[2] === 0 && value[3] === 0) {
        return "Version 2.2";
      }
      return "Unknown";
    }
  },
  1: {
    "name": "GPSLatitudeRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "N") {
        return "North latitude";
      } else if (ref2 === "S") {
        return "South latitude";
      }
      return "Unknown";
    }
  },
  2: {
    "name": "GPSLatitude",
    "description": getCalculatedGpsValue
  },
  3: {
    "name": "GPSLongitudeRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "E") {
        return "East longitude";
      } else if (ref2 === "W") {
        return "West longitude";
      }
      return "Unknown";
    }
  },
  4: {
    "name": "GPSLongitude",
    "description": getCalculatedGpsValue
  },
  5: {
    "name": "GPSAltitudeRef",
    "description": (value) => {
      if (value === 0) {
        return "Sea level";
      } else if (value === 1) {
        return "Sea level reference (negative value)";
      }
      return "Unknown";
    }
  },
  6: {
    "name": "GPSAltitude",
    "description": (value) => {
      return value[0] / value[1] + " m";
    }
  },
  7: {
    "name": "GPSTimeStamp",
    "description": (values) => {
      return values.map(([numerator, denominator]) => {
        const num = numerator / denominator;
        if (/^\d(\.|$)/.test(`${num}`)) {
          return `0${num}`;
        }
        return num;
      }).join(":");
    }
  },
  8: "GPSSatellites",
  9: {
    "name": "GPSStatus",
    "description": (value) => {
      const status = value.join("");
      if (status === "A") {
        return "Measurement in progress";
      } else if (status === "V") {
        return "Measurement Interoperability";
      }
      return "Unknown";
    }
  },
  10: {
    "name": "GPSMeasureMode",
    "description": (value) => {
      const mode = value.join("");
      if (mode === "2") {
        return "2-dimensional measurement";
      } else if (mode === "3") {
        return "3-dimensional measurement";
      }
      return "Unknown";
    }
  },
  11: "GPSDOP",
  12: {
    "name": "GPSSpeedRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "K") {
        return "Kilometers per hour";
      } else if (ref2 === "M") {
        return "Miles per hour";
      } else if (ref2 === "N") {
        return "Knots";
      }
      return "Unknown";
    }
  },
  13: "GPSSpeed",
  14: {
    "name": "GPSTrackRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "T") {
        return "True direction";
      } else if (ref2 === "M") {
        return "Magnetic direction";
      }
      return "Unknown";
    }
  },
  15: "GPSTrack",
  16: {
    "name": "GPSImgDirectionRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "T") {
        return "True direction";
      } else if (ref2 === "M") {
        return "Magnetic direction";
      }
      return "Unknown";
    }
  },
  17: "GPSImgDirection",
  18: "GPSMapDatum",
  19: {
    "name": "GPSDestLatitudeRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "N") {
        return "North latitude";
      } else if (ref2 === "S") {
        return "South latitude";
      }
      return "Unknown";
    }
  },
  20: {
    "name": "GPSDestLatitude",
    "description": (value) => {
      return value[0][0] / value[0][1] + value[1][0] / value[1][1] / 60 + value[2][0] / value[2][1] / 3600;
    }
  },
  21: {
    "name": "GPSDestLongitudeRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "E") {
        return "East longitude";
      } else if (ref2 === "W") {
        return "West longitude";
      }
      return "Unknown";
    }
  },
  22: {
    "name": "GPSDestLongitude",
    "description": (value) => {
      return value[0][0] / value[0][1] + value[1][0] / value[1][1] / 60 + value[2][0] / value[2][1] / 3600;
    }
  },
  23: {
    "name": "GPSDestBearingRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "T") {
        return "True direction";
      } else if (ref2 === "M") {
        return "Magnetic direction";
      }
      return "Unknown";
    }
  },
  24: "GPSDestBearing",
  25: {
    "name": "GPSDestDistanceRef",
    "description": (value) => {
      const ref2 = value.join("");
      if (ref2 === "K") {
        return "Kilometers";
      } else if (ref2 === "M") {
        return "Miles";
      } else if (ref2 === "N") {
        return "Knots";
      }
      return "Unknown";
    }
  },
  26: "GPSDestDistance",
  27: {
    "name": "GPSProcessingMethod",
    "description": getEncodedString
  },
  28: {
    "name": "GPSAreaInformation",
    "description": getEncodedString
  },
  29: "GPSDateStamp",
  30: {
    "name": "GPSDifferential",
    "description": (value) => {
      if (value === 0) {
        return "Measurement without differential correction";
      } else if (value === 1) {
        return "Differential correction applied";
      }
      return "Unknown";
    }
  },
  31: "GPSHPositioningError"
};
const TagNamesInteroperabilityIfd = {
  1: "InteroperabilityIndex",
  2: {
    name: "InteroperabilityVersion",
    description: (value) => getStringValue(value)
  },
  4096: "RelatedImageFileFormat",
  4097: "RelatedImageWidth",
  4098: "RelatedImageHeight"
};
const TagNamesMpfIfd = {
  45056: {
    "name": "MPFVersion",
    "description": (value) => getStringValue(value)
  },
  45057: "NumberOfImages",
  45058: "MPEntry",
  45059: "ImageUIDList",
  45060: "TotalFrames"
};
const TagNamesCanonIfd = {
  4: {
    "name": "ShotInfo",
    "description": (value) => value
  }
};
const TagNamesPentaxIfd = {
  0: {
    "name": "PentaxVersion",
    "description": (value) => value.join(".")
  },
  5: "PentaxModelID",
  555: "LevelInfo"
};
const tagNames0thExifIfds = objectAssign({}, TagNames0thIfd, TagNamesExifIfd);
const IFD_TYPE_0TH = "0th";
const IFD_TYPE_1ST = "1st";
const IFD_TYPE_EXIF = "exif";
const IFD_TYPE_GPS = "gps";
const IFD_TYPE_INTEROPERABILITY = "interoperability";
const IFD_TYPE_MPF = "mpf";
const IFD_TYPE_CANON = "canon";
const IFD_TYPE_PENTAX = "pentax";
const TagNames$1 = {
  [IFD_TYPE_0TH]: tagNames0thExifIfds,
  [IFD_TYPE_1ST]: TagNames0thIfd,
  [IFD_TYPE_EXIF]: tagNames0thExifIfds,
  [IFD_TYPE_GPS]: TagNamesGpsIfd,
  [IFD_TYPE_INTEROPERABILITY]: TagNamesInteroperabilityIfd,
  [IFD_TYPE_MPF]: TagNamesMpfIfd,
  [IFD_TYPE_CANON]: TagNamesCanonIfd,
  [IFD_TYPE_PENTAX]: TagNamesPentaxIfd
};
const typeSizes = {
  1: 1,
  // BYTE
  2: 1,
  // ASCII
  3: 2,
  // SHORT
  4: 4,
  // LONG
  5: 8,
  // RATIONAL
  7: 1,
  // UNDEFINED
  9: 4,
  // SLONG
  10: 8,
  // SRATIONAL
  13: 4
  // IFD
};
const tagTypes = {
  "BYTE": 1,
  "ASCII": 2,
  "SHORT": 3,
  "LONG": 4,
  "RATIONAL": 5,
  "UNDEFINED": 7,
  "SLONG": 9,
  "SRATIONAL": 10,
  "IFD": 13
};
const Types = {
  getAsciiValue,
  getByteAt,
  getAsciiAt,
  getShortAt,
  getLongAt,
  getRationalAt,
  getUndefinedAt,
  getSlongAt,
  getSrationalAt,
  getIfdPointerAt,
  typeSizes,
  tagTypes,
  getTypeSize
};
function getAsciiValue(charArray) {
  return charArray.map((charCode) => String.fromCharCode(charCode));
}
function getByteAt(dataView, offset) {
  return dataView.getUint8(offset);
}
function getAsciiAt(dataView, offset) {
  return dataView.getUint8(offset);
}
function getShortAt(dataView, offset, byteOrder) {
  return dataView.getUint16(offset, byteOrder === ByteOrder.LITTLE_ENDIAN);
}
function getLongAt(dataView, offset, byteOrder) {
  return dataView.getUint32(offset, byteOrder === ByteOrder.LITTLE_ENDIAN);
}
function getRationalAt(dataView, offset, byteOrder) {
  return [getLongAt(dataView, offset, byteOrder), getLongAt(dataView, offset + 4, byteOrder)];
}
function getUndefinedAt(dataView, offset) {
  return getByteAt(dataView, offset);
}
function getSlongAt(dataView, offset, byteOrder) {
  return dataView.getInt32(offset, byteOrder === ByteOrder.LITTLE_ENDIAN);
}
function getSrationalAt(dataView, offset, byteOrder) {
  return [getSlongAt(dataView, offset, byteOrder), getSlongAt(dataView, offset + 4, byteOrder)];
}
function getIfdPointerAt(dataView, offset, byteOrder) {
  return getLongAt(dataView, offset, byteOrder);
}
function getTypeSize(typeName) {
  if (tagTypes[typeName] === void 0) {
    throw new Error("No such type found.");
  }
  return typeSizes[tagTypes[typeName]];
}
const getTagValueAt = {
  1: Types.getByteAt,
  2: Types.getAsciiAt,
  3: Types.getShortAt,
  4: Types.getLongAt,
  5: Types.getRationalAt,
  7: Types.getUndefinedAt,
  9: Types.getSlongAt,
  10: Types.getSrationalAt,
  13: Types.getIfdPointerAt
};
function get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder) {
  return tiffHeaderOffset + Types.getLongAt(dataView, tiffHeaderOffset + 4, byteOrder);
}
function readIfd(dataView, ifdType, offsetOrigin, offset, byteOrder, includeUnknown) {
  const FIELD_COUNT_SIZE = Types.getTypeSize("SHORT");
  const FIELD_SIZE = 12;
  const tags = {};
  const numberOfFields = getNumberOfFields(dataView, offset, byteOrder);
  offset += FIELD_COUNT_SIZE;
  for (let fieldIndex = 0; fieldIndex < numberOfFields; fieldIndex++) {
    if (offset + FIELD_SIZE > dataView.byteLength) {
      break;
    }
    const tag = readTag$1(dataView, ifdType, offsetOrigin, offset, byteOrder, includeUnknown);
    if (tag !== void 0) {
      tags[tag.name] = {
        "id": tag.id,
        "value": tag.value,
        "description": tag.description
      };
      if (tag.name === "MakerNote" || ifdType === IFD_TYPE_PENTAX && tag.name === "LevelInfo") {
        tags[tag.name].__offset = tag.__offset;
      }
    }
    offset += FIELD_SIZE;
  }
  if (offset < dataView.byteLength - Types.getTypeSize("LONG")) {
    const nextIfdOffset = Types.getLongAt(dataView, offset, byteOrder);
    if (nextIfdOffset !== 0 && ifdType === IFD_TYPE_0TH) {
      tags["Thumbnail"] = readIfd(dataView, IFD_TYPE_1ST, offsetOrigin, offsetOrigin + nextIfdOffset, byteOrder, includeUnknown);
    }
  }
  return tags;
}
function getNumberOfFields(dataView, offset, byteOrder) {
  if (offset + Types.getTypeSize("SHORT") <= dataView.byteLength) {
    return Types.getShortAt(dataView, offset, byteOrder);
  }
  return 0;
}
function readTag$1(dataView, ifdType, offsetOrigin, offset, byteOrder, includeUnknown) {
  const TAG_CODE_IPTC_NAA = 33723;
  const TAG_TYPE_OFFSET = Types.getTypeSize("SHORT");
  const TAG_COUNT_OFFSET = TAG_TYPE_OFFSET + Types.getTypeSize("SHORT");
  const TAG_VALUE_OFFSET = TAG_COUNT_OFFSET + Types.getTypeSize("LONG");
  const tagCode = Types.getShortAt(dataView, offset, byteOrder);
  const tagType = Types.getShortAt(dataView, offset + TAG_TYPE_OFFSET, byteOrder);
  const tagCount = Types.getLongAt(dataView, offset + TAG_COUNT_OFFSET, byteOrder);
  let tagValue;
  let tagValueOffset;
  if (Types.typeSizes[tagType] === void 0 || !includeUnknown && TagNames$1[ifdType][tagCode] === void 0) {
    return void 0;
  }
  if (tagValueFitsInOffsetSlot(tagType, tagCount)) {
    tagValueOffset = offset + TAG_VALUE_OFFSET;
    tagValue = getTagValue$2(dataView, tagValueOffset, tagType, tagCount, byteOrder);
  } else {
    tagValueOffset = Types.getLongAt(dataView, offset + TAG_VALUE_OFFSET, byteOrder);
    if (tagValueFitsInDataView(dataView, offsetOrigin, tagValueOffset, tagType, tagCount)) {
      const forceByteType = tagCode === TAG_CODE_IPTC_NAA;
      tagValue = getTagValue$2(dataView, offsetOrigin + tagValueOffset, tagType, tagCount, byteOrder, forceByteType);
    } else {
      tagValue = "<faulty value>";
    }
  }
  if (tagType === Types.tagTypes["ASCII"]) {
    tagValue = splitNullSeparatedAsciiString(tagValue);
    tagValue = decodeAsciiValue$1(tagValue);
  }
  let tagName = `undefined-${tagCode}`;
  let tagDescription = tagValue;
  if (TagNames$1[ifdType][tagCode] !== void 0) {
    if (TagNames$1[ifdType][tagCode]["name"] !== void 0 && TagNames$1[ifdType][tagCode]["description"] !== void 0) {
      tagName = TagNames$1[ifdType][tagCode]["name"];
      try {
        tagDescription = TagNames$1[ifdType][tagCode]["description"](tagValue);
      } catch (error) {
        tagDescription = getDescriptionFromTagValue(tagValue);
      }
    } else if (tagType === Types.tagTypes["RATIONAL"] || tagType === Types.tagTypes["SRATIONAL"]) {
      tagName = TagNames$1[ifdType][tagCode];
      tagDescription = "" + tagValue[0] / tagValue[1];
    } else {
      tagName = TagNames$1[ifdType][tagCode];
      tagDescription = getDescriptionFromTagValue(tagValue);
    }
  }
  return {
    id: tagCode,
    name: tagName,
    value: tagValue,
    description: tagDescription,
    __offset: tagValueOffset
  };
}
function tagValueFitsInOffsetSlot(tagType, tagCount) {
  return Types.typeSizes[tagType] * tagCount <= Types.getTypeSize("LONG");
}
function getTagValue$2(dataView, offset, type, count, byteOrder, forceByteType = false) {
  let value = [];
  if (forceByteType) {
    count = count * Types.typeSizes[type];
    type = Types.tagTypes["BYTE"];
  }
  for (let valueIndex = 0; valueIndex < count; valueIndex++) {
    value.push(getTagValueAt[type](dataView, offset, byteOrder));
    offset += Types.typeSizes[type];
  }
  if (type === Types.tagTypes["ASCII"]) {
    value = Types.getAsciiValue(value);
  } else if (value.length === 1) {
    value = value[0];
  }
  return value;
}
function tagValueFitsInDataView(dataView, offsetOrigin, tagValueOffset, tagType, tagCount) {
  return offsetOrigin + tagValueOffset + Types.typeSizes[tagType] * tagCount <= dataView.byteLength;
}
function splitNullSeparatedAsciiString(string) {
  const tagValue = [];
  let i = 0;
  for (let j = 0; j < string.length; j++) {
    if (string[j] === "\0") {
      i++;
      continue;
    }
    if (tagValue[i] === void 0) {
      tagValue[i] = "";
    }
    tagValue[i] += string[j];
  }
  return tagValue;
}
function decodeAsciiValue$1(asciiValue) {
  try {
    return asciiValue.map((value) => decodeURIComponent(escape(value)));
  } catch (error) {
    return asciiValue;
  }
}
function getDescriptionFromTagValue(tagValue) {
  if (tagValue instanceof Array) {
    return tagValue.join(", ");
  }
  return tagValue;
}
const EXIF_IFD_POINTER_KEY = "Exif IFD Pointer";
const GPS_INFO_IFD_POINTER_KEY = "GPS Info IFD Pointer";
const INTEROPERABILITY_IFD_POINTER_KEY = "Interoperability IFD Pointer";
const Tags = {
  read: read$e
};
function read$e(dataView, tiffHeaderOffset, includeUnknown) {
  const byteOrder = ByteOrder.getByteOrder(dataView, tiffHeaderOffset);
  let tags = read0thIfd(dataView, tiffHeaderOffset, byteOrder, includeUnknown);
  tags = readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown);
  tags = readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown);
  tags = readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown);
  return { tags, byteOrder };
}
function read0thIfd(dataView, tiffHeaderOffset, byteOrder, includeUnknown) {
  return readIfd(dataView, IFD_TYPE_0TH, tiffHeaderOffset, get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder), byteOrder, includeUnknown);
}
function readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown) {
  if (tags[EXIF_IFD_POINTER_KEY] !== void 0) {
    return objectAssign(tags, readIfd(dataView, IFD_TYPE_EXIF, tiffHeaderOffset, tiffHeaderOffset + tags[EXIF_IFD_POINTER_KEY].value, byteOrder, includeUnknown));
  }
  return tags;
}
function readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown) {
  if (tags[GPS_INFO_IFD_POINTER_KEY] !== void 0) {
    return objectAssign(tags, readIfd(dataView, IFD_TYPE_GPS, tiffHeaderOffset, tiffHeaderOffset + tags[GPS_INFO_IFD_POINTER_KEY].value, byteOrder, includeUnknown));
  }
  return tags;
}
function readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder, includeUnknown) {
  if (tags[INTEROPERABILITY_IFD_POINTER_KEY] !== void 0) {
    return objectAssign(tags, readIfd(dataView, IFD_TYPE_INTEROPERABILITY, tiffHeaderOffset, tiffHeaderOffset + tags[INTEROPERABILITY_IFD_POINTER_KEY].value, byteOrder, includeUnknown));
  }
  return tags;
}
const MpfTags = {
  read: read$d
};
const ENTRY_SIZE = 16;
function read$d(dataView, dataOffset, includeUnknown) {
  const byteOrder = ByteOrder.getByteOrder(dataView, dataOffset);
  const tags = readIfd(dataView, IFD_TYPE_MPF, dataOffset, get0thIfdOffset(dataView, dataOffset, byteOrder), byteOrder, includeUnknown);
  return addMpfImages(dataView, dataOffset, tags, byteOrder);
}
function addMpfImages(dataView, dataOffset, tags, byteOrder) {
  if (!tags["MPEntry"]) {
    return tags;
  }
  const images = [];
  for (let i = 0; i < Math.ceil(tags["MPEntry"].value.length / ENTRY_SIZE); i++) {
    images[i] = {};
    const attributes = getImageNumberValue(tags["MPEntry"].value, i * ENTRY_SIZE, Types.getTypeSize("LONG"), byteOrder);
    images[i]["ImageFlags"] = getImageFlags(attributes);
    images[i]["ImageFormat"] = getImageFormat(attributes);
    images[i]["ImageType"] = getImageType(attributes);
    const imageSize = getImageNumberValue(tags["MPEntry"].value, i * ENTRY_SIZE + 4, Types.getTypeSize("LONG"), byteOrder);
    images[i]["ImageSize"] = {
      value: imageSize,
      description: "" + imageSize
    };
    const imageOffset = getImageOffset(i, tags["MPEntry"], byteOrder, dataOffset);
    images[i]["ImageOffset"] = {
      value: imageOffset,
      description: "" + imageOffset
    };
    const dependentImage1EntryNumber = getImageNumberValue(tags["MPEntry"].value, i * ENTRY_SIZE + 12, Types.getTypeSize("SHORT"), byteOrder);
    images[i]["DependentImage1EntryNumber"] = {
      value: dependentImage1EntryNumber,
      description: "" + dependentImage1EntryNumber
    };
    const dependentImage2EntryNumber = getImageNumberValue(tags["MPEntry"].value, i * ENTRY_SIZE + 14, Types.getTypeSize("SHORT"), byteOrder);
    images[i]["DependentImage2EntryNumber"] = {
      value: dependentImage2EntryNumber,
      description: "" + dependentImage2EntryNumber
    };
    images[i].image = dataView.buffer.slice(imageOffset, imageOffset + imageSize);
    deferInit(images[i], "base64", function() {
      return getBase64Image(this.image);
    });
  }
  tags["Images"] = images;
  return tags;
}
function getImageNumberValue(entries, offset, size, byteOrder) {
  if (byteOrder === ByteOrder.LITTLE_ENDIAN) {
    let value2 = 0;
    for (let i = 0; i < size; i++) {
      value2 += entries[offset + i] << 8 * i;
    }
    return value2;
  }
  let value = 0;
  for (let i = 0; i < size; i++) {
    value += entries[offset + i] << 8 * (size - 1 - i);
  }
  return value;
}
function getImageFlags(attributes) {
  const flags = [
    attributes >> 31 & 1,
    attributes >> 30 & 1,
    attributes >> 29 & 1
  ];
  const flagsDescription = [];
  if (flags[0]) {
    flagsDescription.push("Dependent Parent Image");
  }
  if (flags[1]) {
    flagsDescription.push("Dependent Child Image");
  }
  if (flags[2]) {
    flagsDescription.push("Representative Image");
  }
  return {
    value: flags,
    description: flagsDescription.join(", ") || "None"
  };
}
function getImageFormat(attributes) {
  const imageFormat = attributes >> 24 & 7;
  return {
    value: imageFormat,
    description: imageFormat === 0 ? "JPEG" : "Unknown"
  };
}
function getImageType(attributes) {
  const type = attributes & 16777215;
  const descriptions = {
    196608: "Baseline MP Primary Image",
    65537: "Large Thumbnail (VGA equivalent)",
    65538: "Large Thumbnail (Full HD equivalent)",
    131073: "Multi-Frame Image (Panorama)",
    131074: "Multi-Frame Image (Disparity)",
    131075: "Multi-Frame Image (Multi-Angle)",
    0: "Undefined"
  };
  return {
    value: type,
    description: descriptions[type] || "Unknown"
  };
}
function getImageOffset(imageIndex, mpEntry, byteOrder, dataOffset) {
  if (isFirstIndividualImage(imageIndex)) {
    return 0;
  }
  return getImageNumberValue(mpEntry.value, imageIndex * ENTRY_SIZE + 8, Types.getTypeSize("LONG"), byteOrder) + dataOffset;
}
function isFirstIndividualImage(imageIndex) {
  return imageIndex === 0;
}
const FileTags = {
  read: read$c
};
function read$c(dataView, fileDataOffset) {
  const length = getLength$1(dataView, fileDataOffset);
  const numberOfColorComponents = getNumberOfColorComponents(dataView, fileDataOffset, length);
  return {
    "Bits Per Sample": getDataPrecision(dataView, fileDataOffset, length),
    "Image Height": getImageHeight$2(dataView, fileDataOffset, length),
    "Image Width": getImageWidth$2(dataView, fileDataOffset, length),
    "Color Components": numberOfColorComponents,
    "Subsampling": numberOfColorComponents && getSubsampling(dataView, fileDataOffset, numberOfColorComponents.value, length)
  };
}
function getLength$1(dataView, fileDataOffset) {
  return Types.getShortAt(dataView, fileDataOffset);
}
function getDataPrecision(dataView, fileDataOffset, length) {
  const OFFSET = 2;
  const SIZE = 1;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getImageHeight$2(dataView, fileDataOffset, length) {
  const OFFSET = 3;
  const SIZE = 2;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getShortAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: `${value}px`
  };
}
function getImageWidth$2(dataView, fileDataOffset, length) {
  const OFFSET = 5;
  const SIZE = 2;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getShortAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: `${value}px`
  };
}
function getNumberOfColorComponents(dataView, fileDataOffset, length) {
  const OFFSET = 7;
  const SIZE = 1;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getSubsampling(dataView, fileDataOffset, numberOfColorComponents, length) {
  const OFFSET = 8;
  const SIZE = 3 * numberOfColorComponents;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const components = [];
  for (let i = 0; i < numberOfColorComponents; i++) {
    const componentOffset = fileDataOffset + OFFSET + i * 3;
    components.push([
      Types.getByteAt(dataView, componentOffset),
      Types.getByteAt(dataView, componentOffset + 1),
      Types.getByteAt(dataView, componentOffset + 2)
    ]);
  }
  return {
    value: components,
    description: components.length > 1 ? getComponentIds(components) + getSamplingType(components) : ""
  };
}
function getComponentIds(components) {
  const ids = {
    1: "Y",
    2: "Cb",
    3: "Cr",
    4: "I",
    5: "Q"
  };
  return components.map((compontent) => ids[compontent[0]]).join("");
}
function getSamplingType(components) {
  const types = {
    17: "4:4:4 (1 1)",
    18: "4:4:0 (1 2)",
    20: "4:4:1 (1 4)",
    33: "4:2:2 (2 1)",
    34: "4:2:0 (2 2)",
    36: "4:2:1 (2 4)",
    65: "4:1:1 (4 1)",
    66: "4:1:0 (4 2)"
  };
  if (components.length === 0 || components[0][1] === void 0 || types[components[0][1]] === void 0) {
    return "";
  }
  return types[components[0][1]];
}
const JfifTags = {
  read: read$b
};
function read$b(dataView, jfifDataOffset) {
  const length = getLength(dataView, jfifDataOffset);
  const thumbnailWidth = getThumbnailWidth(dataView, jfifDataOffset, length);
  const thumbnailHeight = getThumbnailHeight(dataView, jfifDataOffset, length);
  const tags = {
    "JFIF Version": getVersion(dataView, jfifDataOffset, length),
    "Resolution Unit": getResolutionUnit(dataView, jfifDataOffset, length),
    "XResolution": getXResolution(dataView, jfifDataOffset, length),
    "YResolution": getYResolution(dataView, jfifDataOffset, length),
    "JFIF Thumbnail Width": thumbnailWidth,
    "JFIF Thumbnail Height": thumbnailHeight
  };
  if (thumbnailWidth !== void 0 && thumbnailHeight !== void 0) {
    const thumbnail = getThumbnail(dataView, jfifDataOffset, 3 * thumbnailWidth.value * thumbnailHeight.value, length);
    if (thumbnail) {
      tags["JFIF Thumbnail"] = thumbnail;
    }
  }
  for (const tagName in tags) {
    if (tags[tagName] === void 0) {
      delete tags[tagName];
    }
  }
  return tags;
}
function getLength(dataView, jfifDataOffset) {
  return Types.getShortAt(dataView, jfifDataOffset);
}
function getVersion(dataView, jfifDataOffset, length) {
  const OFFSET = 7;
  const SIZE = 2;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const majorVersion = Types.getByteAt(dataView, jfifDataOffset + OFFSET);
  const minorVersion = Types.getByteAt(dataView, jfifDataOffset + OFFSET + 1);
  return {
    value: majorVersion * 256 + minorVersion,
    description: majorVersion + "." + minorVersion
  };
}
function getResolutionUnit(dataView, jfifDataOffset, length) {
  const OFFSET = 9;
  const SIZE = 1;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, jfifDataOffset + OFFSET);
  return {
    value,
    description: getResolutionUnitDescription(value)
  };
}
function getResolutionUnitDescription(value) {
  if (value === 0) {
    return "None";
  }
  if (value === 1) {
    return "inches";
  }
  if (value === 2) {
    return "cm";
  }
  return "Unknown";
}
function getXResolution(dataView, jfifDataOffset, length) {
  const OFFSET = 10;
  const SIZE = 2;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getShortAt(dataView, jfifDataOffset + OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getYResolution(dataView, jfifDataOffset, length) {
  const OFFSET = 12;
  const SIZE = 2;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getShortAt(dataView, jfifDataOffset + OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getThumbnailWidth(dataView, jfifDataOffset, length) {
  const OFFSET = 14;
  const SIZE = 1;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, jfifDataOffset + OFFSET);
  return {
    value,
    description: `${value}px`
  };
}
function getThumbnailHeight(dataView, jfifDataOffset, length) {
  const OFFSET = 15;
  const SIZE = 1;
  if (OFFSET + SIZE > length) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, jfifDataOffset + OFFSET);
  return {
    value,
    description: `${value}px`
  };
}
function getThumbnail(dataView, jfifDataOffset, thumbnailLength, length) {
  const OFFSET = 16;
  if (thumbnailLength === 0 || OFFSET + thumbnailLength > length) {
    return void 0;
  }
  const value = dataView.buffer.slice(jfifDataOffset + OFFSET, jfifDataOffset + OFFSET + thumbnailLength);
  return {
    value,
    description: "<24-bit RGB pixel data>"
  };
}
const IptcTagNames = {
  "iptc": {
    256: {
      "name": "Model Version",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    261: {
      "name": "Destination",
      "repeatable": true
    },
    276: {
      "name": "File Format",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    278: {
      "name": "File Format Version",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    286: "Service Identifier",
    296: "Envelope Number",
    306: "Product ID",
    316: "Envelope Priority",
    326: {
      "name": "Date Sent",
      "description": getCreationDate
    },
    336: {
      "name": "Time Sent",
      "description": getCreationTime
    },
    346: {
      "name": "Coded Character Set",
      "description": getEncodingName,
      "encoding_name": getEncodingName
    },
    356: "UNO",
    376: {
      "name": "ARM Identifier",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    378: {
      "name": "ARM Version",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    512: {
      "name": "Record Version",
      "description": (value) => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    515: "Object Type Reference",
    516: "Object Attribute Reference",
    517: "Object Name",
    519: "Edit Status",
    520: {
      "name": "Editorial Update",
      "description": (value) => {
        if (getStringValue(value) === "01") {
          return "Additional Language";
        }
        return "Unknown";
      }
    },
    522: "Urgency",
    524: {
      "name": "Subject Reference",
      "repeatable": true,
      "description": (value) => {
        const parts = getStringValue(value).split(":");
        return parts[2] + (parts[3] ? "/" + parts[3] : "") + (parts[4] ? "/" + parts[4] : "");
      }
    },
    527: "Category",
    532: {
      "name": "Supplemental Category",
      "repeatable": true
    },
    534: "Fixture Identifier",
    537: {
      "name": "Keywords",
      "repeatable": true
    },
    538: {
      "name": "Content Location Code",
      "repeatable": true
    },
    539: {
      "name": "Content Location Name",
      "repeatable": true
    },
    542: "Release Date",
    547: "Release Time",
    549: "Expiration Date",
    550: "Expiration Time",
    552: "Special Instructions",
    554: {
      "name": "Action Advised",
      "description": (value) => {
        const string = getStringValue(value);
        if (string === "01") {
          return "Object Kill";
        } else if (string === "02") {
          return "Object Replace";
        } else if (string === "03") {
          return "Object Append";
        } else if (string === "04") {
          return "Object Reference";
        }
        return "Unknown";
      }
    },
    557: {
      "name": "Reference Service",
      "repeatable": true
    },
    559: {
      "name": "Reference Date",
      "repeatable": true
    },
    562: {
      "name": "Reference Number",
      "repeatable": true
    },
    567: {
      "name": "Date Created",
      "description": getCreationDate
    },
    572: {
      "name": "Time Created",
      "description": getCreationTime
    },
    574: {
      "name": "Digital Creation Date",
      "description": getCreationDate
    },
    575: {
      "name": "Digital Creation Time",
      "description": getCreationTime
    },
    577: "Originating Program",
    582: "Program Version",
    587: {
      "name": "Object Cycle",
      "description": (value) => {
        const string = getStringValue(value);
        if (string === "a") {
          return "morning";
        } else if (string === "p") {
          return "evening";
        } else if (string === "b") {
          return "both";
        }
        return "Unknown";
      }
    },
    592: {
      "name": "By-line",
      "repeatable": true
    },
    597: {
      "name": "By-line Title",
      "repeatable": true
    },
    602: "City",
    604: "Sub-location",
    607: "Province/State",
    612: "Country/Primary Location Code",
    613: "Country/Primary Location Name",
    615: "Original Transmission Reference",
    617: "Headline",
    622: "Credit",
    627: "Source",
    628: "Copyright Notice",
    630: {
      "name": "Contact",
      "repeatable": true
    },
    632: "Caption/Abstract",
    634: {
      "name": "Writer/Editor",
      "repeatable": true
    },
    637: {
      "name": "Rasterized Caption",
      "description": (value) => value
    },
    642: "Image Type",
    643: {
      "name": "Image Orientation",
      "description": (value) => {
        const string = getStringValue(value);
        if (string === "P") {
          return "Portrait";
        } else if (string === "L") {
          return "Landscape";
        } else if (string === "S") {
          return "Square";
        }
        return "Unknown";
      }
    },
    647: "Language Identifier",
    662: {
      "name": "Audio Type",
      "description": (value) => {
        const stringValue = getStringValue(value);
        const character0 = stringValue.charAt(0);
        const character1 = stringValue.charAt(1);
        let description = "";
        if (character0 === "1") {
          description += "Mono";
        } else if (character0 === "2") {
          description += "Stereo";
        }
        if (character1 === "A") {
          description += ", actuality";
        } else if (character1 === "C") {
          description += ", question and answer session";
        } else if (character1 === "M") {
          description += ", music, transmitted by itself";
        } else if (character1 === "Q") {
          description += ", response to a question";
        } else if (character1 === "R") {
          description += ", raw sound";
        } else if (character1 === "S") {
          description += ", scener";
        } else if (character1 === "V") {
          description += ", voicer";
        } else if (character1 === "W") {
          description += ", wrap";
        }
        if (description !== "") {
          return description;
        }
        return stringValue;
      }
    },
    663: {
      "name": "Audio Sampling Rate",
      "description": (value) => parseInt(getStringValue(value), 10) + " Hz"
    },
    664: {
      "name": "Audio Sampling Resolution",
      "description": (value) => {
        const bits = parseInt(getStringValue(value), 10);
        return bits + (bits === 1 ? " bit" : " bits");
      }
    },
    665: {
      "name": "Audio Duration",
      "description": (value) => {
        const duration = getStringValue(value);
        if (duration.length >= 6) {
          return duration.substr(0, 2) + ":" + duration.substr(2, 2) + ":" + duration.substr(4, 2);
        }
        return duration;
      }
    },
    666: "Audio Outcue",
    698: "Short Document ID",
    699: "Unique Document ID",
    700: "Owner ID",
    712: {
      "name": (value) => {
        if (value.length === 2) {
          return "ObjectData Preview File Format";
        }
        return "Record 2 destination";
      },
      "description": (value) => {
        if (value.length === 2) {
          const intValue = (value[0] << 8) + value[1];
          if (intValue === 0) {
            return "No ObjectData";
          } else if (intValue === 1) {
            return "IPTC-NAA Digital Newsphoto Parameter Record";
          } else if (intValue === 2) {
            return "IPTC7901 Recommended Message Format";
          } else if (intValue === 3) {
            return "Tagged Image File Format (Adobe/Aldus Image data)";
          } else if (intValue === 4) {
            return "Illustrator (Adobe Graphics data)";
          } else if (intValue === 5) {
            return "AppleSingle (Apple Computer Inc)";
          } else if (intValue === 6) {
            return "NAA 89-3 (ANPA 1312)";
          } else if (intValue === 7) {
            return "MacBinary II";
          } else if (intValue === 8) {
            return "IPTC Unstructured Character Oriented File Format (UCOFF)";
          } else if (intValue === 9) {
            return "United Press International ANPA 1312 variant";
          } else if (intValue === 10) {
            return "United Press International Down-Load Message";
          } else if (intValue === 11) {
            return "JPEG File Interchange (JFIF)";
          } else if (intValue === 12) {
            return "Photo-CD Image-Pac (Eastman Kodak)";
          } else if (intValue === 13) {
            return "Microsoft Bit Mapped Graphics File [*.BMP]";
          } else if (intValue === 14) {
            return "Digital Audio File [*.WAV] (Microsoft & Creative Labs)";
          } else if (intValue === 15) {
            return "Audio plus Moving Video [*.AVI] (Microsoft)";
          } else if (intValue === 16) {
            return "PC DOS/Windows Executable Files [*.COM][*.EXE]";
          } else if (intValue === 17) {
            return "Compressed Binary File [*.ZIP] (PKWare Inc)";
          } else if (intValue === 18) {
            return "Audio Interchange File Format AIFF (Apple Computer Inc)";
          } else if (intValue === 19) {
            return "RIFF Wave (Microsoft Corporation)";
          } else if (intValue === 20) {
            return "Freehand (Macromedia/Aldus)";
          } else if (intValue === 21) {
            return 'Hypertext Markup Language "HTML" (The Internet Society)';
          } else if (intValue === 22) {
            return "MPEG 2 Audio Layer 2 (Musicom), ISO/IEC";
          } else if (intValue === 23) {
            return "MPEG 2 Audio Layer 3, ISO/IEC";
          } else if (intValue === 24) {
            return "Portable Document File (*.PDF) Adobe";
          } else if (intValue === 25) {
            return "News Industry Text Format (NITF)";
          } else if (intValue === 26) {
            return "Tape Archive (*.TAR)";
          } else if (intValue === 27) {
            return "Tidningarnas Telegrambyrå NITF version (TTNITF DTD)";
          } else if (intValue === 28) {
            return "Ritzaus Bureau NITF version (RBNITF DTD)";
          } else if (intValue === 29) {
            return "Corel Draw [*.CDR]";
          }
          return `Unknown format ${intValue}`;
        }
        return getStringValue(value);
      }
    },
    713: {
      "name": "ObjectData Preview File Format Version",
      "description": (value, tags) => {
        const formatVersions = {
          "00": { "00": "1" },
          "01": { "01": "1", "02": "2", "03": "3", "04": "4" },
          "02": { "04": "4" },
          "03": { "01": "5.0", "02": "6.0" },
          "04": { "01": "1.40" },
          "05": { "01": "2" },
          "06": { "01": "1" },
          "11": { "01": "1.02" },
          "20": { "01": "3.1", "02": "4.0", "03": "5.0", "04": "5.5" },
          "21": { "02": "2.0" }
        };
        const stringValue = getStringValue(value);
        if (tags["ObjectData Preview File Format"]) {
          const objectDataPreviewFileFormat = getStringValue(tags["ObjectData Preview File Format"].value);
          if (formatVersions[objectDataPreviewFileFormat] && formatVersions[objectDataPreviewFileFormat][stringValue]) {
            return formatVersions[objectDataPreviewFileFormat][stringValue];
          }
        }
        return stringValue;
      }
    },
    714: "ObjectData Preview Data",
    1802: {
      "name": "Size Mode",
      "description": (value) => {
        return value[0].toString();
      }
    },
    1812: {
      "name": "Max Subfile Size",
      "description": (value) => {
        let n = 0;
        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }
        return n.toString();
      }
    },
    1882: {
      "name": "ObjectData Size Announced",
      "description": (value) => {
        let n = 0;
        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }
        return n.toString();
      }
    },
    1887: {
      "name": "Maximum ObjectData Size",
      "description": (value) => {
        let n = 0;
        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }
        return n.toString();
      }
    }
  }
};
function getCreationDate(value) {
  const date = getStringValue(value);
  if (date.length >= 8) {
    return date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
  }
  return date;
}
function getCreationTime(value) {
  const time = getStringValue(value);
  let parsedTime = time;
  if (time.length >= 6) {
    parsedTime = time.substr(0, 2) + ":" + time.substr(2, 2) + ":" + time.substr(4, 2);
    if (time.length === 11) {
      parsedTime += time.substr(6, 1) + time.substr(7, 2) + ":" + time.substr(9, 2);
    }
  }
  return parsedTime;
}
function getEncodingName(value) {
  const string = getStringValue(value);
  if (string === "\x1B%G") {
    return "UTF-8";
  } else if (string === "\x1B%5") {
    return "Windows-1252";
  } else if (string === "\x1B%/G") {
    return "UTF-8 Level 1";
  } else if (string === "\x1B%/H") {
    return "UTF-8 Level 2";
  } else if (string === "\x1B%/I") {
    return "UTF-8 Level 3";
  } else if (string === "\x1B/A") {
    return "ISO-8859-1";
  } else if (string === "\x1B/B") {
    return "ISO-8859-2";
  } else if (string === "\x1B/C") {
    return "ISO-8859-3";
  } else if (string === "\x1B/D") {
    return "ISO-8859-4";
  } else if (string === "\x1B/@") {
    return "ISO-8859-5";
  } else if (string === "\x1B/G") {
    return "ISO-8859-6";
  } else if (string === "\x1B/F") {
    return "ISO-8859-7";
  } else if (string === "\x1B/H") {
    return "ISO-8859-8";
  }
  return "Unknown";
}
const TextDecoder$1 = {
  get: get$3
};
function get$3() {
  if (typeof TextDecoder !== "undefined") {
    return TextDecoder;
  }
  return void 0;
}
const TAG_HEADER_SIZE$1 = 5;
const TagDecoder = {
  decode,
  TAG_HEADER_SIZE: TAG_HEADER_SIZE$1
};
function decode(encoding, tagValue) {
  const Decoder = TextDecoder$1.get();
  if (typeof Decoder !== "undefined" && encoding !== void 0) {
    try {
      return new Decoder(encoding).decode(tagValue instanceof DataView ? tagValue.buffer : Uint8Array.from(tagValue));
    } catch (error) {
    }
  }
  const stringValue = tagValue.map((charCode) => String.fromCharCode(charCode)).join("");
  return decodeAsciiValue(stringValue);
}
function decodeAsciiValue(asciiValue) {
  try {
    return decodeURIComponent(escape(asciiValue));
  } catch (error) {
    return asciiValue;
  }
}
const BYTES_8BIM = 943868237;
const BYTES_8BIM_SIZE = 4;
const RESOURCE_ID_SIZE = 2;
const RESOURCE_NAME_SIZE_SIZE = 1;
const RESOURCE_NAME_MIN_SIZE = 2;
const RESOURCE_SIZE_SIZE = 4;
const RESOURCE_BLOCK_MIN_HEADER_SIZE = BYTES_8BIM_SIZE + RESOURCE_ID_SIZE + RESOURCE_NAME_MIN_SIZE + RESOURCE_SIZE_SIZE;
const NAA_RESOURCE_BLOCK_TYPE = 1028;
const TAG_HEADER_SIZE = 5;
const IptcTags = {
  read: read$a
};
function read$a(dataView, dataOffset, includeUnknown) {
  try {
    if (Array.isArray(dataView)) {
      return parseTags$1(new DataView(Uint8Array.from(dataView).buffer), { size: dataView.length }, 0, includeUnknown);
    }
    const { naaBlock, dataOffset: newDataOffset } = getNaaResourceBlock(dataView, dataOffset);
    return parseTags$1(dataView, naaBlock, newDataOffset, includeUnknown);
  } catch (error) {
    return {};
  }
}
function getNaaResourceBlock(dataView, dataOffset) {
  while (dataOffset + RESOURCE_BLOCK_MIN_HEADER_SIZE <= dataView.byteLength) {
    const resourceBlock = getResourceBlock(dataView, dataOffset);
    if (isNaaResourceBlock(resourceBlock)) {
      return { naaBlock: resourceBlock, dataOffset: dataOffset + resourceBlock.headerSize };
    }
    dataOffset += resourceBlock.headerSize + resourceBlock.size + getBlockPadding(resourceBlock);
  }
  throw new Error("No IPTC NAA resource block.");
}
function getResourceBlock(dataView, dataOffset) {
  if (dataView.getUint32(dataOffset, false) !== BYTES_8BIM) {
    throw new Error("Not an IPTC resource block.");
  }
  const resourceNameSize = dataView.getUint8(dataOffset + BYTES_8BIM_SIZE + RESOURCE_ID_SIZE);
  const resourceNameTotalSize = (resourceNameSize % 2 === 0 ? resourceNameSize + 1 : resourceNameSize) + RESOURCE_NAME_SIZE_SIZE;
  return {
    headerSize: BYTES_8BIM_SIZE + RESOURCE_ID_SIZE + resourceNameTotalSize + RESOURCE_SIZE_SIZE,
    type: dataView.getUint16(dataOffset + BYTES_8BIM_SIZE),
    size: dataView.getUint32(dataOffset + BYTES_8BIM_SIZE + RESOURCE_ID_SIZE + resourceNameTotalSize)
  };
}
function isNaaResourceBlock(resourceBlock) {
  return resourceBlock.type === NAA_RESOURCE_BLOCK_TYPE;
}
function getBlockPadding(resourceBlock) {
  if (resourceBlock.size % 2 !== 0) {
    return 1;
  }
  return 0;
}
function parseTags$1(dataView, naaBlock, dataOffset, includeUnknown) {
  const tags = {};
  let encoding = void 0;
  const endOfBlockOffset = dataOffset + naaBlock["size"];
  while (dataOffset < endOfBlockOffset && dataOffset < dataView.byteLength) {
    const { tag, tagSize } = readTag(dataView, dataOffset, tags, encoding, includeUnknown);
    if (tag === null) {
      break;
    }
    if (tag) {
      if ("encoding" in tag) {
        encoding = tag.encoding;
      }
      if (tags[tag.name] === void 0 || tag["repeatable"] === void 0) {
        tags[tag.name] = {
          id: tag.id,
          value: tag.value,
          description: tag.description
        };
      } else {
        if (!(tags[tag.name] instanceof Array)) {
          tags[tag.name] = [{
            id: tags[tag.name].id,
            value: tags[tag.name].value,
            description: tags[tag.name].description
          }];
        }
        tags[tag.name].push({
          id: tag.id,
          value: tag.value,
          description: tag.description
        });
      }
    }
    dataOffset += TAG_HEADER_SIZE + tagSize;
  }
  return tags;
}
function readTag(dataView, dataOffset, tags, encoding, includeUnknown) {
  const TAG_CODE_OFFSET = 1;
  const TAG_SIZE_OFFSET = 3;
  if (leadByteIsMissing(dataView, dataOffset)) {
    return { tag: null, tagSize: 0 };
  }
  const tagCode = dataView.getUint16(dataOffset + TAG_CODE_OFFSET);
  const tagSize = dataView.getUint16(dataOffset + TAG_SIZE_OFFSET);
  if (!includeUnknown && !IptcTagNames["iptc"][tagCode]) {
    return { tag: void 0, tagSize };
  }
  const tagValue = getTagValue$1(dataView, dataOffset + TAG_HEADER_SIZE, tagSize);
  const tag = {
    id: tagCode,
    name: getTagName$1(IptcTagNames["iptc"][tagCode], tagCode, tagValue),
    value: tagValue,
    description: getTagDescription(IptcTagNames["iptc"][tagCode], tagValue, tags, encoding)
  };
  if (tagIsRepeatable(tagCode)) {
    tag["repeatable"] = true;
  }
  if (tagContainsEncoding(tagCode)) {
    tag["encoding"] = IptcTagNames["iptc"][tagCode]["encoding_name"](tagValue);
  }
  return { tag, tagSize };
}
function leadByteIsMissing(dataView, dataOffset) {
  const TAG_LEAD_BYTE = 28;
  return dataView.getUint8(dataOffset) !== TAG_LEAD_BYTE;
}
function getTagValue$1(dataView, offset, size) {
  const value = [];
  for (let valueIndex = 0; valueIndex < size; valueIndex++) {
    value.push(dataView.getUint8(offset + valueIndex));
  }
  return value;
}
function getTagName$1(tag, tagCode, tagValue) {
  if (!tag) {
    return `undefined-${tagCode}`;
  }
  if (tagIsName(tag)) {
    return tag;
  }
  if (hasDynamicName(tag)) {
    return tag["name"](tagValue);
  }
  return tag["name"];
}
function tagIsName(tag) {
  return typeof tag === "string";
}
function hasDynamicName(tag) {
  return typeof tag["name"] === "function";
}
function getTagDescription(tag, tagValue, tags, encoding) {
  if (hasDescriptionProperty(tag)) {
    try {
      return tag["description"](tagValue, tags);
    } catch (error) {
    }
  }
  if (tagValueIsText(tag, tagValue)) {
    return TagDecoder.decode(encoding, tagValue);
  }
  return tagValue;
}
function tagValueIsText(tag, tagValue) {
  return tag && tagValue instanceof Array;
}
function hasDescriptionProperty(tag) {
  return tag && tag["description"] !== void 0;
}
function tagIsRepeatable(tagCode) {
  return IptcTagNames["iptc"][tagCode] && IptcTagNames["iptc"][tagCode]["repeatable"];
}
function tagContainsEncoding(tagCode) {
  return IptcTagNames["iptc"][tagCode] && IptcTagNames["iptc"][tagCode]["encoding_name"] !== void 0;
}
const XmpTagNames = {
  "tiff:Orientation"(value) {
    if (value === "1") {
      return "Horizontal (normal)";
    }
    if (value === "2") {
      return "Mirror horizontal";
    }
    if (value === "3") {
      return "Rotate 180";
    }
    if (value === "4") {
      return "Mirror vertical";
    }
    if (value === "5") {
      return "Mirror horizontal and rotate 270 CW";
    }
    if (value === "6") {
      return "Rotate 90 CW";
    }
    if (value === "7") {
      return "Mirror horizontal and rotate 90 CW";
    }
    if (value === "8") {
      return "Rotate 270 CW";
    }
    return value;
  },
  "tiff:ResolutionUnit": (value) => TagNamesCommon.ResolutionUnit(parseInt(value, 10)),
  "tiff:XResolution": (value) => fraction(TagNamesCommon.XResolution, value),
  "tiff:YResolution": (value) => fraction(TagNamesCommon.YResolution, value),
  "exif:ApertureValue": (value) => fraction(TagNamesCommon.ApertureValue, value),
  "exif:GPSLatitude": calculateGPSValue,
  "exif:GPSLongitude": calculateGPSValue,
  "exif:FNumber": (value) => fraction(TagNamesCommon.FNumber, value),
  "exif:FocalLength": (value) => fraction(TagNamesCommon.FocalLength, value),
  "exif:FocalPlaneResolutionUnit": (value) => TagNamesCommon.FocalPlaneResolutionUnit(parseInt(value, 10)),
  "exif:ColorSpace": (value) => TagNamesCommon.ColorSpace(parseNumber(value)),
  "exif:ComponentsConfiguration"(value, description) {
    if (/^\d, \d, \d, \d$/.test(description)) {
      const numbers = description.split(", ").map((number) => number.charCodeAt(0));
      return TagNamesCommon.ComponentsConfiguration(numbers);
    }
    return description;
  },
  "exif:Contrast": (value) => TagNamesCommon.Contrast(parseInt(value, 10)),
  "exif:CustomRendered": (value) => TagNamesCommon.CustomRendered(parseInt(value, 10)),
  "exif:ExposureMode": (value) => TagNamesCommon.ExposureMode(parseInt(value, 10)),
  "exif:ExposureProgram": (value) => TagNamesCommon.ExposureProgram(parseInt(value, 10)),
  "exif:ExposureTime"(value) {
    if (isFraction(value)) {
      return TagNamesCommon.ExposureTime(value.split("/").map((number) => parseInt(number, 10)));
    }
    return value;
  },
  "exif:MeteringMode": (value) => TagNamesCommon.MeteringMode(parseInt(value, 10)),
  "exif:Saturation": (value) => TagNamesCommon.Saturation(parseInt(value, 10)),
  "exif:SceneCaptureType": (value) => TagNamesCommon.SceneCaptureType(parseInt(value, 10)),
  "exif:Sharpness": (value) => TagNamesCommon.Sharpness(parseInt(value, 10)),
  "exif:ShutterSpeedValue": (value) => fraction(TagNamesCommon.ShutterSpeedValue, value),
  "exif:WhiteBalance": (value) => TagNamesCommon.WhiteBalance(parseInt(value, 10))
};
function fraction(func, value) {
  if (isFraction(value)) {
    return func(value.split("/"));
  }
  return value;
}
function parseNumber(value) {
  if (value.substring(0, 2) === "0x") {
    return parseInt(value.substring(2), 16);
  }
  return parseInt(value, 10);
}
function isFraction(value) {
  return /^-?\d+\/-?\d+$/.test(value);
}
function calculateGPSValue(value) {
  const [degreesString, minutesString] = value.split(",");
  if (degreesString !== void 0 && minutesString !== void 0) {
    const degrees = parseFloat(degreesString);
    const minutes = parseFloat(minutesString);
    const ref2 = minutesString.charAt(minutesString.length - 1);
    if (!Number.isNaN(degrees) && !Number.isNaN(minutes)) {
      return "" + (degrees + minutes / 60) + ref2;
    }
  }
  return value;
}
const DOMParser$1 = {
  get: get$2
};
function get$2(domParser) {
  if (domParser) {
    return domParser;
  }
  if (typeof DOMParser !== "undefined") {
    return new DOMParser();
  }
  try {
    const { DOMParser: DOMParser2, onErrorStopParsing } = __non_webpack_require__("@xmldom/xmldom");
    return new DOMParser2({ onError: onErrorStopParsing });
  } catch (error) {
    return void 0;
  }
}
function isMissingNamespaceError(error) {
  const missingNamespaceStrings = [
    // @xmldom/xmldom
    "prefix is non-null and namespace is null",
    // Firefox
    "prefix not bound to a namespace",
    // en
    "prefix inte bundet till en namnrymd",
    // sv
    // Chrome
    /Namespace prefix .+ is not defined/
  ];
  for (let i = 0; i < missingNamespaceStrings.length; i++) {
    const regexp = new RegExp(missingNamespaceStrings[i]);
    if (regexp.test(error.message)) {
      return true;
    }
  }
  return false;
}
function addMissingNamespaces(xmlString) {
  const rootTagMatch = xmlString.match(/<([A-Za-z_][A-Za-z0-9._-]*)([^>]*)>/);
  if (!rootTagMatch) {
    return xmlString;
  }
  const rootTagName = rootTagMatch[1];
  const declaredPrefixes = getAllDeclaredNamespacePrefixes(xmlString);
  const usedPrefixes = getUsedNamespacePrefixes(xmlString);
  const missingPrefixes = usedPrefixes.filter((prefix) => declaredPrefixes.indexOf(prefix) === -1);
  if (missingPrefixes.length === 0) {
    return xmlString;
  }
  const namespaceDeclarations = createNamespaceDeclarations(missingPrefixes);
  return insertDeclarationsIntoRoot(xmlString, rootTagName, namespaceDeclarations);
}
function getAllDeclaredNamespacePrefixes(xmlContent) {
  const prefixes = [];
  const namespaceDeclarationRegex = /xmlns:([\w-]+)=["'][^"']+["']/g;
  let match;
  while ((match = namespaceDeclarationRegex.exec(xmlContent)) !== null) {
    if (prefixes.indexOf(match[1]) === -1) {
      prefixes.push(match[1]);
    }
  }
  return prefixes;
}
function getUsedNamespacePrefixes(xmlContent) {
  const prefixes = [];
  const prefixUsageRegex = /\b([A-Za-z_][A-Za-z0-9._-]*):[A-Za-z_][A-Za-z0-9._-]*\b/g;
  let match;
  while ((match = prefixUsageRegex.exec(xmlContent)) !== null) {
    const prefix = match[1];
    if (prefix === "xmlns" || prefix === "xml") {
      continue;
    }
    if (prefixes.indexOf(prefix) === -1) {
      prefixes.push(prefix);
    }
  }
  return prefixes;
}
const KNOWN_NAMESPACE_URIS = {
  xmp: "http://ns.adobe.com/xap/1.0/",
  tiff: "http://ns.adobe.com/tiff/1.0/",
  exif: "http://ns.adobe.com/exif/1.0/",
  dc: "http://purl.org/dc/elements/1.1/",
  xmpMM: "http://ns.adobe.com/xap/1.0/mm/",
  stEvt: "http://ns.adobe.com/xap/1.0/sType/ResourceEvent#",
  stRef: "http://ns.adobe.com/xap/1.0/sType/ResourceRef#",
  photoshop: "http://ns.adobe.com/photoshop/1.0/"
};
function createNamespaceDeclarations(prefixes) {
  const declarations = [];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const uri = KNOWN_NAMESPACE_URIS[prefix] || "http://fallback.namespace/" + prefix;
    declarations.push(" xmlns:" + prefix + '="' + uri + '"');
  }
  return declarations.join("");
}
function insertDeclarationsIntoRoot(xmlString, rootTagName, declarations) {
  const rootTagPattern = new RegExp("<" + rootTagName + "([^>]*)>");
  return xmlString.replace(rootTagPattern, "<" + rootTagName + "$1" + declarations + ">");
}
const XmpTags = {
  read: read$9
};
class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParseError";
  }
}
function read$9(dataView, chunks, domParser) {
  const tags = {};
  if (typeof dataView === "string") {
    readTags(tags, dataView, domParser);
    return tags;
  }
  const [standardXmp, extendedXmp] = extractCompleteChunks(dataView, chunks);
  const hasStandardTags = readTags(tags, standardXmp, domParser);
  if (extendedXmp) {
    const hasExtendedTags = readTags(tags, extendedXmp, domParser);
    if (!hasStandardTags && !hasExtendedTags) {
      delete tags._raw;
      readTags(tags, combineChunks(dataView, chunks), domParser);
    }
  }
  return tags;
}
function extractCompleteChunks(dataView, chunks) {
  if (chunks.length === 0) {
    return [];
  }
  const completeChunks = [combineChunks(dataView, chunks.slice(0, 1))];
  if (chunks.length > 1) {
    completeChunks.push(combineChunks(dataView, chunks.slice(1)));
  }
  return completeChunks;
}
function combineChunks(dataView, chunks) {
  const totalLength = chunks.reduce((size, chunk) => size + chunk.length, 0);
  const combinedChunks = new Uint8Array(totalLength);
  let offset = 0;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const slice = dataView.buffer.slice(chunk.dataOffset, chunk.dataOffset + chunk.length);
    combinedChunks.set(new Uint8Array(slice), offset);
    offset += chunk.length;
  }
  return new DataView(combinedChunks.buffer);
}
function readTags(tags, chunkDataView, domParser) {
  try {
    const { doc, raw } = getDocument(chunkDataView, domParser);
    tags._raw = (tags._raw || "") + raw;
    const rdf = getRDF(doc);
    objectAssign(tags, parseXMPObject(convertToObject(rdf, true)));
    return true;
  } catch (error) {
    return false;
  }
}
function getDocument(chunkDataView, _domParser) {
  const domParser = DOMParser$1.get(_domParser);
  if (!domParser) {
    console.warn("Warning: DOMParser is not available. It is needed to be able to parse XMP tags.");
    throw new Error();
  }
  const xmlString = typeof chunkDataView === "string" ? chunkDataView : getStringFromDataView(chunkDataView, 0, chunkDataView.byteLength);
  const doc = parseFromString(domParser, trimXmlSource(xmlString));
  return {
    doc,
    raw: xmlString
  };
}
function trimXmlSource(xmlSource) {
  return xmlSource.replace(/^.+(<\?xpacket begin)/, "$1").replace(/(<\?xpacket end=".*"\?>).+$/, "$1");
}
function parseFromString(domParser, xmlString, isRetry = false) {
  try {
    const doc = domParser.parseFromString(xmlString, "application/xml");
    const errors2 = doc.getElementsByTagName("parsererror");
    if (errors2.length > 0) {
      throw new ParseError(errors2[0].textContent);
    }
    return doc;
  } catch (error) {
    if (error.name === "ParseError" && isMissingNamespaceError(error) && !isRetry) {
      return parseFromString(domParser, addMissingNamespaces(xmlString), true);
    }
    throw error;
  }
}
function getRDF(node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].tagName === "x:xmpmeta") {
      return getRDF(node.childNodes[i]);
    }
    if (node.childNodes[i].tagName === "rdf:RDF") {
      return node.childNodes[i];
    }
  }
  throw new Error();
}
function convertToObject(node, isTopNode = false) {
  const childNodes = getChildNodes(node);
  if (hasTextOnlyContent(childNodes)) {
    if (isTopNode) {
      return {};
    }
    return getTextValue(childNodes[0]);
  }
  return getElementsFromNodes(childNodes);
}
function getChildNodes(node) {
  const elements = [];
  for (let i = 0; i < node.childNodes.length; i++) {
    elements.push(node.childNodes[i]);
  }
  return elements;
}
function hasTextOnlyContent(nodes) {
  return nodes.length === 1 && nodes[0].nodeName === "#text";
}
function getTextValue(node) {
  return node.nodeValue;
}
function getElementsFromNodes(nodes) {
  const elements = {};
  nodes.forEach((node) => {
    if (isElement(node)) {
      const nodeElement = getElementFromNode(node);
      if (elements[node.nodeName] !== void 0) {
        if (!Array.isArray(elements[node.nodeName])) {
          elements[node.nodeName] = [elements[node.nodeName]];
        }
        elements[node.nodeName].push(nodeElement);
      } else {
        elements[node.nodeName] = nodeElement;
      }
    }
  });
  return elements;
}
function isElement(node) {
  return node.nodeName && node.nodeName !== "#text";
}
function getElementFromNode(node) {
  return {
    attributes: getAttributes(node),
    value: convertToObject(node)
  };
}
function getAttributes(element) {
  const attributes = {};
  for (let i = 0; i < element.attributes.length; i++) {
    attributes[element.attributes[i].nodeName] = decodeURIComponent(escape(element.attributes[i].value));
  }
  return attributes;
}
function parseXMPObject(xmpObject) {
  const tags = {};
  if (typeof xmpObject === "string") {
    return xmpObject;
  }
  for (const nodeName in xmpObject) {
    let nodes = xmpObject[nodeName];
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }
    nodes.forEach((node) => {
      objectAssign(tags, parseNodeAttributesAsTags(node.attributes));
      if (typeof node.value === "object") {
        objectAssign(tags, parseNodeChildrenAsTags(node.value));
      }
    });
  }
  return tags;
}
function parseNodeAttributesAsTags(attributes) {
  const tags = {};
  for (const name in attributes) {
    try {
      if (isTagAttribute(name)) {
        tags[getLocalName(name)] = {
          value: attributes[name],
          attributes: {},
          description: getDescription$1(attributes[name], name)
        };
      }
    } catch (error) {
    }
  }
  return tags;
}
function isTagAttribute(name) {
  return name !== "rdf:parseType" && !isNamespaceDefinition(name);
}
function isNamespaceDefinition(name) {
  return name.split(":")[0] === "xmlns";
}
function getLocalName(name) {
  if (/^MicrosoftPhoto(_\d+_)?:Rating$/i.test(name)) {
    return "RatingPercent";
  }
  return name.split(":")[1];
}
function getDescription$1(value, name = void 0) {
  if (Array.isArray(value)) {
    const arrayDescription = getDescriptionOfArray(value);
    if (name && typeof XmpTagNames[name] === "function") {
      return XmpTagNames[name](value, arrayDescription);
    }
    return arrayDescription;
  }
  if (typeof value === "object") {
    return getDescriptionOfObject(value);
  }
  try {
    if (name && typeof XmpTagNames[name] === "function") {
      return XmpTagNames[name](value);
    }
    return decodeURIComponent(escape(value));
  } catch (error) {
    return value;
  }
}
function getDescriptionOfArray(value) {
  return value.map((item) => {
    if (item.value !== void 0) {
      return getDescription$1(item.value);
    }
    return getDescription$1(item);
  }).join(", ");
}
function getDescriptionOfObject(value) {
  const descriptions = [];
  for (const key in value) {
    descriptions.push(`${getClearTextKey(key)}: ${getDescription$1(value[key].value)}`);
  }
  return descriptions.join("; ");
}
function getClearTextKey(key) {
  if (key === "CiAdrCity") {
    return "CreatorCity";
  }
  if (key === "CiAdrCtry") {
    return "CreatorCountry";
  }
  if (key === "CiAdrExtadr") {
    return "CreatorAddress";
  }
  if (key === "CiAdrPcode") {
    return "CreatorPostalCode";
  }
  if (key === "CiAdrRegion") {
    return "CreatorRegion";
  }
  if (key === "CiEmailWork") {
    return "CreatorWorkEmail";
  }
  if (key === "CiTelWork") {
    return "CreatorWorkPhone";
  }
  if (key === "CiUrlWork") {
    return "CreatorWorkUrl";
  }
  return key;
}
function parseNodeChildrenAsTags(children) {
  const tags = {};
  for (const name in children) {
    try {
      if (!isNamespaceDefinition(name)) {
        tags[getLocalName(name)] = parseNodeAsTag(children[name], name);
      }
    } catch (error) {
    }
  }
  return tags;
}
function parseNodeAsTag(node, name) {
  if (isDuplicateTag(node)) {
    return parseNodeAsDuplicateTag(node, name);
  }
  if (isEmptyResourceTag(node)) {
    return { value: "", attributes: {}, description: "" };
  }
  if (hasNestedSimpleRdfDescription(node)) {
    return parseNodeAsSimpleRdfDescription(node, name);
  }
  if (hasNestedStructureRdfDescription(node)) {
    return parseNodeAsStructureRdfDescription(node, name);
  }
  if (isCompactStructure(node)) {
    return parseNodeAsCompactStructure(node, name);
  }
  if (isArray(node)) {
    return parseNodeAsArray(node, name);
  }
  return parseNodeAsSimpleValue(node, name);
}
function isEmptyResourceTag(node) {
  return node.attributes["rdf:parseType"] === "Resource" && typeof node.value === "string" && node.value.trim() === "";
}
function isDuplicateTag(node) {
  return Array.isArray(node);
}
function parseNodeAsDuplicateTag(node, name) {
  return parseNodeAsSimpleValue(node[node.length - 1], name);
}
function hasNestedSimpleRdfDescription(node) {
  return node.attributes["rdf:parseType"] === "Resource" && node.value["rdf:value"] !== void 0 || node.value["rdf:Description"] !== void 0 && node.value["rdf:Description"].value["rdf:value"] !== void 0;
}
function parseNodeAsSimpleRdfDescription(node, name) {
  const attributes = parseNodeAttributes(node);
  if (node.value["rdf:Description"] !== void 0) {
    node = node.value["rdf:Description"];
  }
  objectAssign(attributes, parseNodeAttributes(node), parseNodeChildrenAsAttributes(node));
  const value = parseRdfValue(node);
  return {
    value,
    attributes,
    description: getDescription$1(value, name)
  };
}
function parseNodeAttributes(node) {
  const attributes = {};
  for (const name in node.attributes) {
    if (name !== "rdf:parseType" && name !== "rdf:resource" && !isNamespaceDefinition(name)) {
      attributes[getLocalName(name)] = node.attributes[name];
    }
  }
  return attributes;
}
function parseNodeChildrenAsAttributes(node) {
  const attributes = {};
  for (const name in node.value) {
    if (name !== "rdf:value" && !isNamespaceDefinition(name)) {
      attributes[getLocalName(name)] = node.value[name].value;
    }
  }
  return attributes;
}
function parseRdfValue(node) {
  return getURIValue(node.value["rdf:value"]) || node.value["rdf:value"].value;
}
function hasNestedStructureRdfDescription(node) {
  return node.attributes["rdf:parseType"] === "Resource" || node.value["rdf:Description"] !== void 0 && node.value["rdf:Description"].value["rdf:value"] === void 0;
}
function parseNodeAsStructureRdfDescription(node, name) {
  const tag = {
    value: {},
    attributes: {}
  };
  if (node.value["rdf:Description"] !== void 0) {
    objectAssign(tag.value, parseNodeAttributesAsTags(node.value["rdf:Description"].attributes));
    objectAssign(tag.attributes, parseNodeAttributes(node));
    node = node.value["rdf:Description"];
  }
  objectAssign(tag.value, parseNodeChildrenAsTags(node.value));
  tag.description = getDescription$1(tag.value, name);
  return tag;
}
function isCompactStructure(node) {
  return Object.keys(node.value).length === 0 && node.attributes["xml:lang"] === void 0 && node.attributes["rdf:resource"] === void 0;
}
function parseNodeAsCompactStructure(node, name) {
  const value = parseNodeAttributesAsTags(node.attributes);
  return {
    value,
    attributes: {},
    description: getDescription$1(value, name)
  };
}
function isArray(node) {
  return getArrayChild(node.value) !== void 0;
}
function getArrayChild(value) {
  return value["rdf:Bag"] || value["rdf:Seq"] || value["rdf:Alt"];
}
function parseNodeAsArray(node, name) {
  let items = getArrayChild(node.value).value["rdf:li"];
  const attributes = parseNodeAttributes(node);
  const value = [];
  if (items === void 0) {
    items = [];
  } else if (!Array.isArray(items)) {
    items = [items];
  }
  items.forEach((item) => {
    value.push(parseArrayValue(item));
  });
  return {
    value,
    attributes,
    description: getDescription$1(value, name)
  };
}
function parseArrayValue(item) {
  if (hasNestedSimpleRdfDescription(item)) {
    return parseNodeAsSimpleRdfDescription(item);
  }
  if (hasNestedStructureRdfDescription(item)) {
    return parseNodeAsStructureRdfDescription(item).value;
  }
  if (isCompactStructure(item)) {
    return parseNodeAsCompactStructure(item).value;
  }
  return parseNodeAsSimpleValue(item);
}
function parseNodeAsSimpleValue(node, name) {
  const value = getURIValue(node) || parseXMPObject(node.value);
  return {
    value,
    attributes: parseNodeAttributes(node),
    description: getDescription$1(value, name)
  };
}
function getURIValue(node) {
  return node.attributes && node.attributes["rdf:resource"];
}
const PathRecordTypes = {
  CLOSED_SUBPATH_LENGTH: 0,
  CLOSED_SUBPATH_BEZIER_LINKED: 1,
  CLOSED_SUBPATH_BEZIER_UNLINKED: 2,
  OPEN_SUBPATH_LENGTH: 3,
  OPEN_SUBPATH_BEZIER_LINKED: 4,
  OPEN_SUBPATH_BEZIER_UNLINKED: 5,
  FILL_RULE: 6,
  CLIPBOARD: 7,
  INITIAL_FILL_RULE: 8
};
const PATH_RECORD_SIZE = 24;
const TagNames = {
  // 0x0425: {
  //     name: 'CaptionDigest',
  //     description(dataView) {
  //         let description = '';
  //         for (let i = 0; i < dataView.byteLength; i++) {
  //             const byte = dataView.getUint8(i);
  //             description += padStart(byte.toString(16), 2, '0');
  //         }
  //         return description;
  //     }
  // },
  // Commented out for now to lower bundle size until someone asks for it.
  // 0x043a: {
  //     name: 'PrintInformation',
  //     description: parseDescriptor
  // },
  // 0x043b: {
  //     name: 'PrintStyle',
  //     description: parseDescriptor
  // },
  2e3: {
    name: "PathInformation",
    description: pathResource
  },
  2999: {
    name: "ClippingPathName",
    description(dataView) {
      const [, string] = getPascalStringFromDataView(dataView, 0);
      return string;
    }
  }
};
function pathResource(dataView) {
  const TYPE_SIZE = 2;
  const types = {};
  const paths = [];
  for (let offset = 0; offset < dataView.byteLength; offset += TYPE_SIZE + PATH_RECORD_SIZE) {
    const type = Types.getShortAt(dataView, offset);
    if (PATH_RECORD_TYPES[type]) {
      if (!types[type]) {
        types[type] = PATH_RECORD_TYPES[type].description;
      }
      paths.push({
        type,
        path: PATH_RECORD_TYPES[type].path(dataView, offset + TYPE_SIZE)
      });
    }
  }
  return JSON.stringify({ types, paths });
}
const PATH_RECORD_TYPES = {
  [PathRecordTypes.CLOSED_SUBPATH_LENGTH]: {
    description: "Closed subpath length",
    path: (dataView, offset) => [Types.getShortAt(dataView, offset)]
  },
  [PathRecordTypes.CLOSED_SUBPATH_BEZIER_LINKED]: {
    description: "Closed subpath Bezier knot, linked",
    path: parseBezierKnot
  },
  [PathRecordTypes.CLOSED_SUBPATH_BEZIER_UNLINKED]: {
    description: "Closed subpath Bezier knot, unlinked",
    path: parseBezierKnot
  },
  [PathRecordTypes.OPEN_SUBPATH_LENGTH]: {
    description: "Open subpath length",
    path: (dataView, offset) => [Types.getShortAt(dataView, offset)]
  },
  [PathRecordTypes.OPEN_SUBPATH_BEZIER_LINKED]: {
    description: "Open subpath Bezier knot, linked",
    path: parseBezierKnot
  },
  [PathRecordTypes.OPEN_SUBPATH_BEZIER_UNLINKED]: {
    description: "Open subpath Bezier knot, unlinked",
    path: parseBezierKnot
  },
  [PathRecordTypes.FILL_RULE]: {
    description: "Path fill rule",
    path: () => []
  },
  [PathRecordTypes.INITIAL_FILL_RULE]: {
    description: "Initial fill rule",
    path: (dataView, offset) => [Types.getShortAt(dataView, offset)]
  },
  [PathRecordTypes.CLIPBOARD]: {
    description: "Clipboard",
    path: parseClipboard
  }
};
function parseBezierKnot(dataView, offset) {
  const PATH_POINT_SIZE = 8;
  const path = [];
  for (let i = 0; i < PATH_RECORD_SIZE; i += PATH_POINT_SIZE) {
    path.push(parsePathPoint(dataView, offset + i));
  }
  return path;
}
function parsePathPoint(dataView, offset) {
  const vertical = getFixedPointNumber(dataView, offset, 8);
  const horizontal = getFixedPointNumber(dataView, offset + 4, 8);
  return [horizontal, vertical];
}
function parseClipboard(dataView, offset) {
  return [
    [
      getFixedPointNumber(dataView, offset, 8),
      // Top
      getFixedPointNumber(dataView, offset + 4, 8),
      // Left
      getFixedPointNumber(dataView, offset + 8, 8),
      // Botton
      getFixedPointNumber(dataView, offset + 12, 8)
      // Right
    ],
    getFixedPointNumber(dataView, offset + 16, 8)
    // Resolution
  ];
}
function getFixedPointNumber(dataView, offset, binaryPoint) {
  const number = Types.getLongAt(dataView, offset);
  const sign = number >>> 31 === 0 ? 1 : -1;
  const integer = (number & 2130706432) >>> 32 - binaryPoint;
  const fraction2 = number & parseInt(strRepeat("1", 32 - binaryPoint), 2);
  return sign * parseFloatRadix(integer.toString(2) + "." + padStart(fraction2.toString(2), 32 - binaryPoint, "0"), 2);
}
const PhotoshopTags = {
  read: read$8
};
const SIGNATURE = "8BIM";
const TAG_ID_SIZE = 2;
const RESOURCE_LENGTH_SIZE = 4;
const SIGNATURE_SIZE = SIGNATURE.length;
function read$8(bytes, includeUnknown) {
  const dataView = getDataView$1(new Uint8Array(bytes).buffer);
  const tags = {};
  let offset = 0;
  while (offset < bytes.length) {
    const signature = getStringFromDataView(dataView, offset, SIGNATURE_SIZE);
    offset += SIGNATURE_SIZE;
    const tagId = Types.getShortAt(dataView, offset);
    offset += TAG_ID_SIZE;
    const { tagName, tagNameSize } = getTagName(dataView, offset);
    offset += tagNameSize;
    const resourceSize = Types.getLongAt(dataView, offset);
    offset += RESOURCE_LENGTH_SIZE;
    if (signature === SIGNATURE) {
      const valueDataView = getDataView$1(dataView.buffer, offset, resourceSize);
      const tag = {
        id: tagId,
        value: getStringFromDataView(valueDataView, 0, resourceSize)
      };
      if (TagNames[tagId]) {
        try {
          tag.description = TagNames[tagId].description(valueDataView);
        } catch (error) {
          tag.description = "<no description formatter>";
        }
        tags[tagName ? tagName : TagNames[tagId].name] = tag;
      } else if (includeUnknown) {
        tags[`undefined-${tagId}`] = tag;
      }
    }
    offset += resourceSize + resourceSize % 2;
  }
  return tags;
}
function getTagName(dataView, offset) {
  const [stringSize, string] = getPascalStringFromDataView(dataView, offset);
  return {
    tagName: string,
    tagNameSize: 1 + stringSize + (stringSize % 2 === 0 ? 1 : 0)
  };
}
const iccTags = {
  "desc": {
    "name": "ICC Description"
  },
  "cprt": {
    "name": "ICC Copyright"
  },
  "dmdd": {
    "name": "ICC Device Model Description"
  },
  "vued": {
    "name": "ICC Viewing Conditions Description"
  },
  "dmnd": {
    "name": "ICC Device Manufacturer for Display"
  },
  "tech": {
    "name": "Technology"
  }
};
const iccProfile = {
  4: {
    "name": "Preferred CMM type",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4),
    "description": (value) => value !== null ? toCompany(value) : ""
  },
  8: {
    "name": "Profile Version",
    "value": (dataView, offset) => {
      return dataView.getUint8(offset).toString(10) + "." + (dataView.getUint8(offset + 1) >> 4).toString(10) + "." + (dataView.getUint8(offset + 1) % 16).toString(10);
    }
  },
  12: {
    "name": "Profile/Device class",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4),
    "description": (value) => {
      switch (value.toLowerCase()) {
        case "scnr":
          return "Input Device profile";
        case "mntr":
          return "Display Device profile";
        case "prtr":
          return "Output Device profile";
        case "link":
          return "DeviceLink profile";
        case "abst":
          return "Abstract profile";
        case "spac":
          return "ColorSpace profile";
        case "nmcl":
          return "NamedColor profile";
        case "cenc":
          return "ColorEncodingSpace profile";
        case "mid ":
          return "MultiplexIdentification profile";
        case "mlnk":
          return "MultiplexLink profile";
        case "mvis":
          return "MultiplexVisualization profile";
        default:
          return value;
      }
    }
  },
  16: {
    "name": "Color Space",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4)
  },
  20: {
    "name": "Connection Space",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4)
  },
  24: {
    "name": "ICC Profile Date",
    "value": (dataView, offset) => parseDate(dataView, offset).toISOString()
  },
  36: {
    "name": "ICC Signature",
    "value": (dataView, offset) => sliceToString$1(dataView.buffer.slice(offset, offset + 4))
  },
  40: {
    "name": "Primary Platform",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4),
    "description": (value) => toCompany(value)
  },
  48: {
    "name": "Device Manufacturer",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4),
    "description": (value) => toCompany(value)
  },
  52: {
    "name": "Device Model Number",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4)
  },
  64: {
    "name": "Rendering Intent",
    "value": (dataView, offset) => dataView.getUint32(offset),
    "description": (value) => {
      switch (value) {
        case 0:
          return "Perceptual";
        case 1:
          return "Relative Colorimetric";
        case 2:
          return "Saturation";
        case 3:
          return "Absolute Colorimetric";
        default:
          return value;
      }
    }
  },
  80: {
    "name": "Profile Creator",
    "value": (dataView, offset) => getStringFromDataView(dataView, offset, 4)
  }
};
function parseDate(dataView, offset) {
  const year = dataView.getUint16(offset);
  const month = dataView.getUint16(offset + 2) - 1;
  const day = dataView.getUint16(offset + 4);
  const hours = dataView.getUint16(offset + 6);
  const minutes = dataView.getUint16(offset + 8);
  const seconds = dataView.getUint16(offset + 10);
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}
function sliceToString$1(slice) {
  return String.fromCharCode.apply(null, new Uint8Array(slice));
}
function toCompany(value) {
  switch (value.toLowerCase()) {
    case "appl":
      return "Apple";
    case "adbe":
      return "Adobe";
    case "msft":
      return "Microsoft";
    case "sunw":
      return "Sun Microsystems";
    case "sgi":
      return "Silicon Graphics";
    case "tgnt":
      return "Taligent";
    default:
      return value;
  }
}
const IccTags = {
  read: read$7
};
const PROFILE_HEADER_LENGTH = 84;
const ICC_TAG_COUNT_OFFSET = 128;
const ICC_SIGNATURE = "acsp";
const TAG_TYPE_DESC = "desc";
const TAG_TYPE_MULTI_LOCALIZED_UNICODE_TYPE = "mluc";
const TAG_TYPE_TEXT = "text";
const TAG_TYPE_SIGNATURE = "sig ";
const TAG_TABLE_SINGLE_TAG_DATA = 12;
function read$7(dataView, iccData, async) {
  if (async && iccData[0].compressionMethod !== COMPRESSION_METHOD_NONE) {
    return readCompressedIcc(dataView, iccData);
  }
  return readIcc(dataView, iccData);
}
function readCompressedIcc(dataView, iccData) {
  if (!compressionMethodIsSupported(iccData[0].compressionMethod)) {
    return {};
  }
  const compressedDataView = new DataView(dataView.buffer.slice(iccData[0].offset, iccData[0].offset + iccData[0].length));
  return decompress(compressedDataView, iccData[0].compressionMethod, "utf-8", "dataview").then(parseTags).catch(() => ({}));
}
function compressionMethodIsSupported(compressionMethod) {
  return compressionMethod === COMPRESSION_METHOD_DEFLATE;
}
function readIcc(dataView, iccData) {
  try {
    const totalIccProfileLength = iccData.reduce((sum, icc) => sum + icc.length, 0);
    const iccBinaryData = new Uint8Array(totalIccProfileLength);
    let offset = 0;
    const buffer = getBuffer(dataView);
    for (let chunkNumber = 1; chunkNumber <= iccData.length; chunkNumber++) {
      const iccDataChunk = iccData.find((x) => x.chunkNumber === chunkNumber);
      if (!iccDataChunk) {
        throw new Error(`ICC chunk ${chunkNumber} not found`);
      }
      const data = buffer.slice(iccDataChunk.offset, iccDataChunk.offset + iccDataChunk.length);
      const chunkData = new Uint8Array(data);
      iccBinaryData.set(chunkData, offset);
      offset += chunkData.length;
    }
    return parseTags(new DataView(iccBinaryData.buffer));
  } catch (error) {
    return {};
  }
}
function getBuffer(dataView) {
  if (Array.isArray(dataView)) {
    return new DataView(Uint8Array.from(dataView).buffer).buffer;
  }
  return dataView.buffer;
}
function iccDoesNotHaveTagCount(buffer) {
  return buffer.length < ICC_TAG_COUNT_OFFSET + 4;
}
function hasTagsData(buffer, tagHeaderOffset) {
  return buffer.length < tagHeaderOffset + TAG_TABLE_SINGLE_TAG_DATA;
}
function parseTags(dataView) {
  const buffer = dataView.buffer;
  const length = dataView.getUint32();
  if (dataView.byteLength !== length) {
    throw new Error("ICC profile length not matching");
  }
  if (dataView.byteLength < PROFILE_HEADER_LENGTH) {
    throw new Error("ICC profile too short");
  }
  const tags = {};
  const iccProfileKeys = Object.keys(iccProfile);
  for (let i = 0; i < iccProfileKeys.length; i++) {
    const offset = iccProfileKeys[i];
    const profileEntry = iccProfile[offset];
    const value = profileEntry.value(dataView, parseInt(offset, 10));
    let description = value;
    if (profileEntry.description) {
      description = profileEntry.description(value);
    }
    tags[profileEntry.name] = {
      value,
      description
    };
  }
  const signature = sliceToString(buffer.slice(36, 40));
  if (signature !== ICC_SIGNATURE) {
    throw new Error("ICC profile: missing signature");
  }
  if (iccDoesNotHaveTagCount(buffer)) {
    return tags;
  }
  const tagCount = dataView.getUint32(128);
  let tagHeaderOffset = 132;
  for (let i = 0; i < tagCount; i++) {
    if (hasTagsData(buffer, tagHeaderOffset)) {
      return tags;
    }
    const tagSignature = getStringFromDataView(dataView, tagHeaderOffset, 4);
    const tagOffset = dataView.getUint32(tagHeaderOffset + 4);
    const tagSize = dataView.getUint32(tagHeaderOffset + 8);
    if (tagOffset > buffer.length) {
      return tags;
    }
    const tagType = getStringFromDataView(dataView, tagOffset, 4);
    if (tagType === TAG_TYPE_DESC) {
      const tagValueSize = dataView.getUint32(tagOffset + 8);
      if (tagValueSize > tagSize) {
        return tags;
      }
      const val = sliceToString(buffer.slice(tagOffset + 12, tagOffset + tagValueSize + 11));
      addTag(tags, tagSignature, val);
    } else if (tagType === TAG_TYPE_MULTI_LOCALIZED_UNICODE_TYPE) {
      const numRecords = dataView.getUint32(tagOffset + 8);
      const recordSize = dataView.getUint32(tagOffset + 12);
      let offset = tagOffset + 16;
      const val = [];
      for (let recordNum = 0; recordNum < numRecords; recordNum++) {
        const languageCode = getStringFromDataView(dataView, offset + 0, 2);
        const countryCode = getStringFromDataView(dataView, offset + 2, 2);
        const textLength = dataView.getUint32(offset + 4);
        const textOffset = dataView.getUint32(offset + 8);
        const text = getUnicodeStringFromDataView(dataView, tagOffset + textOffset, textLength);
        val.push({ languageCode, countryCode, text });
        offset += recordSize;
      }
      if (numRecords === 1) {
        addTag(tags, tagSignature, val[0].text);
      } else {
        const valObj = {};
        for (let valIndex = 0; valIndex < val.length; valIndex++) {
          valObj[`${val[valIndex].languageCode}-${val[valIndex].countryCode}`] = val[valIndex].text;
        }
        addTag(tags, tagSignature, valObj);
      }
    } else if (tagType === TAG_TYPE_TEXT) {
      const val = sliceToString(buffer.slice(tagOffset + 8, tagOffset + tagSize - 7));
      addTag(tags, tagSignature, val);
    } else if (tagType === TAG_TYPE_SIGNATURE) {
      const val = sliceToString(buffer.slice(tagOffset + 8, tagOffset + 12));
      addTag(tags, tagSignature, val);
    }
    tagHeaderOffset = tagHeaderOffset + 12;
  }
  return tags;
}
function sliceToString(slice) {
  return String.fromCharCode.apply(null, new Uint8Array(slice));
}
function addTag(tags, tagSignature, value) {
  if (iccTags[tagSignature]) {
    tags[iccTags[tagSignature].name] = { value, description: value };
  } else {
    tags[tagSignature] = { value, description: value };
  }
}
const SHOT_INFO_AUTO_ROTATE = 27;
const CanonTags = {
  read: read$6,
  SHOT_INFO_AUTO_ROTATE
};
function read$6(dataView, tiffHeaderOffset, offset, byteOrder, includeUnknown) {
  let tags = readIfd(dataView, IFD_TYPE_CANON, tiffHeaderOffset, tiffHeaderOffset + offset, byteOrder, includeUnknown);
  if (tags["ShotInfo"]) {
    tags = objectAssign({}, tags, parseShotInfo(tags["ShotInfo"].value));
    delete tags["ShotInfo"];
  }
  return tags;
}
function parseShotInfo(shotInfoData) {
  const tags = {};
  if (shotInfoData[SHOT_INFO_AUTO_ROTATE] !== void 0) {
    tags["AutoRotate"] = {
      value: shotInfoData[SHOT_INFO_AUTO_ROTATE],
      description: getAutoRotateDescription(shotInfoData[SHOT_INFO_AUTO_ROTATE])
    };
  }
  return tags;
}
function getAutoRotateDescription(autoRotate) {
  if (autoRotate === 0) {
    return "None";
  }
  if (autoRotate === 1) {
    return "Rotate 90 CW";
  }
  if (autoRotate === 2) {
    return "Rotate 180";
  }
  if (autoRotate === 3) {
    return "Rotate 270 CW";
  }
  return "Unknown";
}
const BYTE_ORDER_OFFSET = 8;
const PENTAX_IFD_OFFSET = BYTE_ORDER_OFFSET + 2;
const MODEL_ID = {
  K3_III: 78420
};
const LIK3III = {
  CAMERA_ORIENTATION: 1,
  ROLL_ANGLE: 3,
  PITCH_ANGLE: 5
};
const PentaxTags = {
  read: read$5,
  PENTAX_IFD_OFFSET,
  MODEL_ID,
  LIK3III
};
function read$5(dataView, tiffHeaderOffset, offset, includeUnknown) {
  const byteOrder = ByteOrder.getByteOrder(dataView, tiffHeaderOffset + offset + BYTE_ORDER_OFFSET);
  const originOffset = tiffHeaderOffset + offset;
  let tags = readIfd(dataView, IFD_TYPE_PENTAX, originOffset, originOffset + PENTAX_IFD_OFFSET, byteOrder, includeUnknown);
  if (hasLevelInfoK3III(tags)) {
    tags = objectAssign({}, tags, parseLevelInfoK3III(dataView, originOffset + tags["LevelInfo"].__offset, byteOrder));
    delete tags["LevelInfo"];
  }
  return tags;
}
function hasLevelInfoK3III(tags) {
  return tags["PentaxModelID"] && tags["PentaxModelID"].value === MODEL_ID.K3_III && tags["LevelInfo"];
}
function parseLevelInfoK3III(dataView, levelInfoOffset, byteOrder) {
  const tags = {};
  if (levelInfoOffset + 7 > dataView.byteLength) {
    return tags;
  }
  const cameraOrientation = dataView.getInt8(levelInfoOffset + LIK3III.CAMERA_ORIENTATION);
  tags["CameraOrientation"] = {
    value: cameraOrientation,
    description: getOrientationDescription(cameraOrientation)
  };
  const rollAngle = dataView.getInt16(levelInfoOffset + LIK3III.ROLL_ANGLE, byteOrder === ByteOrder.LITTLE_ENDIAN);
  tags["RollAngle"] = {
    value: rollAngle,
    description: getRollAngleDescription(rollAngle)
  };
  const pitchAngle = dataView.getInt16(levelInfoOffset + LIK3III.PITCH_ANGLE, byteOrder === ByteOrder.LITTLE_ENDIAN);
  tags["PitchAngle"] = {
    value: pitchAngle,
    description: getPitchAngleDescription(pitchAngle)
  };
  return tags;
}
function getOrientationDescription(orientation2) {
  if (orientation2 === 0) {
    return "Horizontal (normal)";
  }
  if (orientation2 === 1) {
    return "Rotate 270 CW";
  }
  if (orientation2 === 2) {
    return "Rotate 180";
  }
  if (orientation2 === 3) {
    return "Rotate 90 CW";
  }
  if (orientation2 === 4) {
    return "Upwards";
  }
  if (orientation2 === 5) {
    return "Downwards";
  }
  return "Unknown";
}
function getRollAngleDescription(rollAngle) {
  return "" + rollAngle * -0.5;
}
function getPitchAngleDescription(pitchAngle) {
  return "" + pitchAngle * -0.5;
}
const PngFileTags = {
  read: read$4
};
function read$4(dataView, fileDataOffset) {
  return {
    "Image Width": getImageWidth$1(dataView, fileDataOffset),
    "Image Height": getImageHeight$1(dataView, fileDataOffset),
    "Bit Depth": getBitDepth$1(dataView, fileDataOffset),
    "Color Type": getColorType(dataView, fileDataOffset),
    "Compression": getCompression(dataView, fileDataOffset),
    "Filter": getFilter(dataView, fileDataOffset),
    "Interlace": getInterlace(dataView, fileDataOffset)
  };
}
function getImageWidth$1(dataView, fileDataOffset) {
  const OFFSET = 0;
  const SIZE = 4;
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getLongAt(dataView, fileDataOffset);
  return {
    value,
    description: `${value}px`
  };
}
function getImageHeight$1(dataView, fileDataOffset) {
  const OFFSET = 4;
  const SIZE = 4;
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getLongAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: `${value}px`
  };
}
function getBitDepth$1(dataView, fileDataOffset) {
  const OFFSET = 8;
  const SIZE = 1;
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: `${value}`
  };
}
function getColorType(dataView, fileDataOffset) {
  const OFFSET = 9;
  const SIZE = 1;
  const COLOR_TYPES = {
    0: "Grayscale",
    2: "RGB",
    3: "Palette",
    4: "Grayscale with Alpha",
    6: "RGB with Alpha"
  };
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: COLOR_TYPES[value] || "Unknown"
  };
}
function getCompression(dataView, fileDataOffset) {
  const OFFSET = 10;
  const SIZE = 1;
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: value === 0 ? "Deflate/Inflate" : "Unknown"
  };
}
function getFilter(dataView, fileDataOffset) {
  const OFFSET = 11;
  const SIZE = 1;
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: value === 0 ? "Adaptive" : "Unknown"
  };
}
function getInterlace(dataView, fileDataOffset) {
  const OFFSET = 12;
  const SIZE = 1;
  const INTERLACE_TYPES = {
    0: "Noninterlaced",
    1: "Adam7 Interlace"
  };
  if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, fileDataOffset + OFFSET);
  return {
    value,
    description: INTERLACE_TYPES[value] || "Unknown"
  };
}
const PngTextTags = {
  read: read$3
};
const STATE_KEYWORD = "STATE_KEYWORD";
const STATE_COMPRESSION = "STATE_COMPRESSION";
const STATE_LANG = "STATE_LANG";
const STATE_TRANSLATED_KEYWORD = "STATE_TRANSLATED_KEYWORD";
const STATE_TEXT = "STATE_TEXT";
const COMPRESSION_SECTION_ITXT_EXTRA_BYTE = 1;
const COMPRESSION_FLAG_COMPRESSED = 1;
const EXIF_OFFSET = 6;
function read$3(dataView, pngTextChunks, async, includeUnknown) {
  const tags = {};
  const tagsPromises = [];
  for (let i = 0; i < pngTextChunks.length; i++) {
    const { offset, length, type } = pngTextChunks[i];
    const nameAndValue = getNameAndValue(dataView, offset, length, type, async);
    if (nameAndValue instanceof Promise) {
      tagsPromises.push(nameAndValue.then(({ name, value, description }) => {
        try {
          if (Constants.USE_EXIF && isExifGroupTag(name, value)) {
            return {
              __exif: Tags.read(decodeRawData(value), EXIF_OFFSET, includeUnknown).tags
            };
          } else if (Constants.USE_IPTC && isIptcGroupTag(name, value)) {
            return {
              __iptc: IptcTags.read(decodeRawData(value), 0, includeUnknown)
            };
          } else if (name && !isExifGroupTag(name, value) && !isIptcGroupTag(name, value)) {
            return {
              [name]: {
                value,
                description
              }
            };
          }
        } catch (error) {
        }
        return {};
      }));
    } else {
      const { name, value, description } = nameAndValue;
      if (name) {
        tags[name] = {
          value,
          description
        };
      }
    }
  }
  return {
    readTags: tags,
    readTagsPromise: tagsPromises.length > 0 ? Promise.all(tagsPromises) : void 0
  };
}
function getNameAndValue(dataView, offset, length, type, async) {
  const keywordChars = [];
  const langChars = [];
  let valueChars;
  let parsingState = STATE_KEYWORD;
  let compressionMethod = COMPRESSION_METHOD_NONE;
  for (let i = 0; i < length && offset + i < dataView.byteLength; i++) {
    if (parsingState === STATE_COMPRESSION) {
      compressionMethod = getCompressionMethod({ type, dataView, offset: offset + i });
      if (type === TYPE_ITXT) {
        i += COMPRESSION_SECTION_ITXT_EXTRA_BYTE;
      }
      parsingState = moveToNextState(type, parsingState);
      continue;
    } else if (parsingState === STATE_TEXT) {
      valueChars = new DataView(dataView.buffer.slice(offset + i, offset + length));
      break;
    }
    const byte = dataView.getUint8(offset + i);
    if (byte === 0) {
      parsingState = moveToNextState(type, parsingState);
    } else if (parsingState === STATE_KEYWORD) {
      keywordChars.push(byte);
    } else if (parsingState === STATE_LANG) {
      langChars.push(byte);
    } else ;
  }
  if (compressionMethod !== COMPRESSION_METHOD_NONE && !async) {
    return {};
  }
  const decompressedValueChars = decompress(valueChars, compressionMethod, getEncodingFromType(type));
  if (decompressedValueChars instanceof Promise) {
    return decompressedValueChars.then((_decompressedValueChars) => constructTag(_decompressedValueChars, type, langChars, keywordChars)).catch(() => constructTag("<text using unknown compression>".split(""), type, langChars, keywordChars));
  }
  return constructTag(decompressedValueChars, type, langChars, keywordChars);
}
function getCompressionMethod({ type, dataView, offset }) {
  if (type === TYPE_ITXT) {
    if (dataView.getUint8(offset) === COMPRESSION_FLAG_COMPRESSED) {
      return dataView.getUint8(offset + 1);
    }
  } else if (type === TYPE_ZTXT) {
    return dataView.getUint8(offset);
  }
  return COMPRESSION_METHOD_NONE;
}
function moveToNextState(type, parsingState) {
  if (parsingState === STATE_KEYWORD && [TYPE_ITXT, TYPE_ZTXT].includes(type)) {
    return STATE_COMPRESSION;
  }
  if (parsingState === STATE_COMPRESSION) {
    if (type === TYPE_ITXT) {
      return STATE_LANG;
    }
    return STATE_TEXT;
  }
  if (parsingState === STATE_LANG) {
    return STATE_TRANSLATED_KEYWORD;
  }
  return STATE_TEXT;
}
function getEncodingFromType(type) {
  if (type === TYPE_TEXT || type === TYPE_ZTXT) {
    return "latin1";
  }
  return "utf-8";
}
function constructTag(valueChars, type, langChars, keywordChars) {
  const value = getValue(valueChars);
  return {
    name: getName(type, langChars, keywordChars),
    value,
    description: type === TYPE_ITXT ? getDescription(valueChars) : value
  };
}
function getName(type, langChars, keywordChars) {
  const name = getStringValueFromArray(keywordChars);
  if (type === TYPE_TEXT || langChars.length === 0) {
    return name;
  }
  const lang = getStringValueFromArray(langChars);
  return `${name} (${lang})`;
}
function getValue(valueChars) {
  if (valueChars instanceof DataView) {
    return getStringFromDataView(valueChars, 0, valueChars.byteLength);
  }
  return valueChars;
}
function getDescription(valueChars) {
  return TagDecoder.decode("UTF-8", valueChars);
}
function isExifGroupTag(name, value) {
  return name.toLowerCase() === "raw profile type exif" && value.substring(1, 5) === "exif";
}
function isIptcGroupTag(name, value) {
  return name.toLowerCase() === "raw profile type iptc" && value.substring(1, 5) === "iptc";
}
function decodeRawData(value) {
  const parts = value.match(/\n(exif|iptc)\n\s*\d+\n([\s\S]*)$/);
  return hexToDataView(parts[2].replace(/\n/g, ""));
}
function hexToDataView(hex) {
  const dataView = new DataView(new ArrayBuffer(hex.length / 2));
  for (let i = 0; i < hex.length; i += 2) {
    dataView.setUint8(i / 2, parseInt(hex.substring(i, i + 2), 16));
  }
  return dataView;
}
const PngTags = {
  read: read$2
};
function read$2(dataView, chunkOffsets) {
  const tags = {};
  for (let i = 0; i < chunkOffsets.length; i++) {
    const chunkLength = Types.getLongAt(dataView, chunkOffsets[i] + PNG_CHUNK_LENGTH_OFFSET);
    const chunkType = getStringFromDataView(dataView, chunkOffsets[i] + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE);
    if (chunkType === TYPE_PHYS) {
      tags["Pixels Per Unit X"] = getPixelsPerUnitX(dataView, chunkOffsets[i], chunkLength);
      tags["Pixels Per Unit Y"] = getPixelsPerUnitY(dataView, chunkOffsets[i], chunkLength);
      tags["Pixel Units"] = getPixelUnits(dataView, chunkOffsets[i], chunkLength);
    } else if (chunkType === TYPE_TIME) {
      tags["Modify Date"] = getModifyDate(dataView, chunkOffsets[i], chunkLength);
    }
  }
  return tags;
}
function getPixelsPerUnitX(dataView, chunkOffset, chunkLength) {
  const TAG_OFFSET = 0;
  const TAG_SIZE = 4;
  if (!tagFitsInBuffer(dataView, chunkOffset, chunkLength, TAG_OFFSET, TAG_SIZE)) {
    return void 0;
  }
  const value = Types.getLongAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + TAG_OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getPixelsPerUnitY(dataView, chunkOffset, chunkLength) {
  const TAG_OFFSET = 4;
  const TAG_SIZE = 4;
  if (!tagFitsInBuffer(dataView, chunkOffset, chunkLength, TAG_OFFSET, TAG_SIZE)) {
    return void 0;
  }
  const value = Types.getLongAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + TAG_OFFSET);
  return {
    value,
    description: "" + value
  };
}
function getPixelUnits(dataView, chunkOffset, chunkLength) {
  const TAG_OFFSET = 8;
  const TAG_SIZE = 1;
  if (!tagFitsInBuffer(dataView, chunkOffset, chunkLength, TAG_OFFSET, TAG_SIZE)) {
    return void 0;
  }
  const value = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + TAG_OFFSET);
  return {
    value,
    description: value === 1 ? "meters" : "Unknown"
  };
}
function getModifyDate(dataView, chunkOffset, chunkLength) {
  const TIME_TAG_SIZE = 7;
  if (!tagFitsInBuffer(dataView, chunkOffset, chunkLength, 0, TIME_TAG_SIZE)) {
    return void 0;
  }
  const year = Types.getShortAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET);
  const month = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + 2);
  const day = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + 3);
  const hours = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + 4);
  const minutes = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + 5);
  const seconds = Types.getByteAt(dataView, chunkOffset + PNG_CHUNK_DATA_OFFSET + 6);
  return {
    value: [year, month, day, hours, minutes, seconds],
    description: `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)} ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`
  };
}
function tagFitsInBuffer(dataView, chunkOffset, chunkLength, tagOffset, tagSize) {
  return tagOffset + tagSize <= chunkLength && chunkOffset + PNG_CHUNK_DATA_OFFSET + tagOffset + tagSize <= dataView.byteLength;
}
function pad(number, size) {
  return `${"0".repeat(size - ("" + number).length)}${number}`;
}
const Vp8xTags = {
  read: read$1
};
const IMAGE_WIDTH_OFFSET = 4;
const IMAGE_HEIGHT_OFFSET = 7;
function read$1(dataView, chunkOffset) {
  const tags = {};
  const flags = Types.getByteAt(dataView, chunkOffset);
  tags["Alpha"] = getAlpha(flags);
  tags["Animation"] = getAnimation(flags);
  tags["ImageWidth"] = getThreeByteValue(dataView, chunkOffset + IMAGE_WIDTH_OFFSET);
  tags["ImageHeight"] = getThreeByteValue(dataView, chunkOffset + IMAGE_HEIGHT_OFFSET);
  return tags;
}
function getAlpha(flags) {
  const value = flags & 16;
  return {
    value: value ? 1 : 0,
    description: value ? "Yes" : "No"
  };
}
function getAnimation(flags) {
  const value = flags & 2;
  return {
    value: value ? 1 : 0,
    description: value ? "Yes" : "No"
  };
}
function getThreeByteValue(dataView, offset) {
  const value = Types.getByteAt(dataView, offset) + 256 * Types.getByteAt(dataView, offset + 1) + 256 * 256 * Types.getByteAt(dataView, offset + 2) + 1;
  return {
    value,
    description: value + "px"
  };
}
const GifFileTags = {
  read
};
function read(dataView) {
  return {
    "GIF Version": getGifVersion(dataView),
    "Image Width": getImageWidth(dataView),
    "Image Height": getImageHeight(dataView),
    "Global Color Map": getGlobalColorMap(dataView),
    "Bits Per Pixel": getBitDepth(dataView),
    "Color Resolution Depth": getColorResolution(dataView)
  };
}
function getGifVersion(dataView) {
  const OFFSET = 3;
  const SIZE = 3;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = getStringFromDataView(dataView, OFFSET, SIZE);
  return {
    value,
    description: value
  };
}
function getImageWidth(dataView) {
  const OFFSET = 6;
  const SIZE = 2;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = dataView.getUint16(OFFSET, true);
  return {
    value,
    description: `${value}px`
  };
}
function getImageHeight(dataView) {
  const OFFSET = 8;
  const SIZE = 2;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const value = dataView.getUint16(OFFSET, true);
  return {
    value,
    description: `${value}px`
  };
}
function getGlobalColorMap(dataView) {
  const OFFSET = 10;
  const SIZE = 1;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const byteValue = dataView.getUint8(OFFSET);
  const value = (byteValue & 128) >>> 7;
  return {
    value,
    description: value === 1 ? "Yes" : "No"
  };
}
function getColorResolution(dataView) {
  const OFFSET = 10;
  const SIZE = 1;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const byteValue = dataView.getUint8(OFFSET);
  const value = ((byteValue & 112) >>> 4) + 1;
  return {
    value,
    description: `${value} ${value === 1 ? "bit" : "bits"}`
  };
}
function getBitDepth(dataView) {
  const OFFSET = 10;
  const SIZE = 1;
  if (OFFSET + SIZE > dataView.byteLength) {
    return void 0;
  }
  const byteValue = dataView.getUint8(OFFSET);
  const value = (byteValue & 7) + 1;
  return {
    value,
    description: `${value} ${value === 1 ? "bit" : "bits"}`
  };
}
const COMPRESSION_JPEG = [6, 7, 99];
const Thumbnail = {
  get: get$1
};
function get$1(dataView, thumbnailTags, tiffHeaderOffset) {
  if (hasJpegThumbnail(thumbnailTags)) {
    thumbnailTags.type = "image/jpeg";
    const offset = tiffHeaderOffset + thumbnailTags.JPEGInterchangeFormat.value;
    thumbnailTags.image = dataView.buffer.slice(offset, offset + thumbnailTags.JPEGInterchangeFormatLength.value);
    deferInit(thumbnailTags, "base64", function() {
      return getBase64Image(this.image);
    });
  }
  return thumbnailTags;
}
function hasJpegThumbnail(tags) {
  return tags && (tags.Compression === void 0 || COMPRESSION_JPEG.includes(tags.Compression.value)) && tags.JPEGInterchangeFormat && tags.JPEGInterchangeFormat.value && tags.JPEGInterchangeFormatLength && tags.JPEGInterchangeFormatLength.value;
}
const FOCAL_PLANE_RESOLUTION_UNIT = {
  INCHES: 2,
  CENTIMETERS: 3,
  MILLIMETERS: 4
};
const UNIT_FACTORS = {
  INCHES_TO_MM: 25.4,
  // 1 inch = 25.4 mm
  CM_TO_MM: 10,
  // 1 cm = 10 mm
  MM_TO_MM: 1
  // Already in mm
};
const Composite = {
  get
};
function get(tags, expanded) {
  const compositeTags = {};
  let hasCompositeTags = false;
  const focalLength = getTagValue(tags, "exif", "FocalLength", expanded);
  const focalPlaneXResolution = getTagValue(tags, "exif", "FocalPlaneXResolution", expanded);
  const focalPlaneYResolution = getTagValue(tags, "exif", "FocalPlaneYResolution", expanded);
  const focalPlaneResolutionUnit = getTagValue(tags, "exif", "FocalPlaneResolutionUnit", expanded);
  const imageWidth = getTagValue(tags, "file", "Image Width", expanded);
  const imageHeight = getTagValue(tags, "file", "Image Height", expanded);
  const focalLengthIn35mmFilm = getTagValue(tags, "exif", "FocalLengthIn35mmFilm", expanded) || getFocalLengthIn35mmFilmValue(focalPlaneXResolution, focalPlaneYResolution, focalPlaneResolutionUnit, imageWidth, imageHeight, focalLength);
  if (focalLengthIn35mmFilm) {
    compositeTags.FocalLength35efl = {
      value: focalLengthIn35mmFilm,
      description: TagNamesCommon.FocalLengthIn35mmFilm(focalLengthIn35mmFilm)
    };
    hasCompositeTags = true;
  }
  const scaleFactorTo35mmEquivalent = getScaleFactorTo35mmEquivalent(focalLength, focalLengthIn35mmFilm);
  if (scaleFactorTo35mmEquivalent) {
    compositeTags.ScaleFactorTo35mmEquivalent = scaleFactorTo35mmEquivalent;
    hasCompositeTags = true;
  }
  const fieldOfView = getFieldOfView(focalLengthIn35mmFilm);
  if (fieldOfView) {
    compositeTags.FieldOfView = fieldOfView;
    hasCompositeTags = true;
  }
  if (hasCompositeTags) {
    return compositeTags;
  }
  return void 0;
}
function getTagValue(tags, group, tagName, expanded) {
  if (expanded && tags[group] && tags[group][tagName]) {
    return tags[group][tagName].value;
  }
  if (!expanded && tags[tagName]) {
    return tags[tagName].value;
  }
  return void 0;
}
function getFocalLengthIn35mmFilmValue(focalPlaneXResolution, focalPlaneYResolution, focalPlaneResolutionUnit, imageWidth, imageHeight, focalLength) {
  const DIAGONAL_35mm = 43.27;
  if (focalPlaneXResolution && focalPlaneYResolution && focalPlaneResolutionUnit && imageWidth && imageHeight && focalLength) {
    try {
      let resolutionUnitFactor;
      switch (focalPlaneResolutionUnit) {
        case FOCAL_PLANE_RESOLUTION_UNIT.INCHES:
          resolutionUnitFactor = UNIT_FACTORS.INCHES_TO_MM;
          break;
        case FOCAL_PLANE_RESOLUTION_UNIT.CENTIMETERS:
          resolutionUnitFactor = UNIT_FACTORS.CM_TO_MM;
          break;
        case FOCAL_PLANE_RESOLUTION_UNIT.MILLIMETERS:
          resolutionUnitFactor = UNIT_FACTORS.MM_TO_MM;
          break;
        default:
          return void 0;
      }
      const focalPlaneXResolutionMm = focalPlaneXResolution[0] / focalPlaneXResolution[1] * resolutionUnitFactor;
      const focalPlaneYResolutionMm = focalPlaneYResolution[0] / focalPlaneYResolution[1] * resolutionUnitFactor;
      const sensorWidthMm = imageWidth / focalPlaneXResolutionMm;
      const sensorHeightMm = imageHeight / focalPlaneYResolutionMm;
      const sensorDiagonal = Math.sqrt(sensorWidthMm ** 2 + sensorHeightMm ** 2);
      const focalLength35mm = focalLength[0] / focalLength[1] * (DIAGONAL_35mm / sensorDiagonal);
      return focalLength35mm;
    } catch (error) {
    }
  }
  return void 0;
}
function getScaleFactorTo35mmEquivalent(focalLength, focalLengthIn35mmFilm) {
  if (focalLength && focalLengthIn35mmFilm) {
    try {
      const value = focalLengthIn35mmFilm / (focalLength[0] / focalLength[1]);
      return {
        value,
        description: value.toFixed(1)
      };
    } catch (error) {
    }
  }
  return void 0;
}
function getFieldOfView(focalLengthIn35mmFilm) {
  const FULL_FRAME_SENSOR_WIDTH_MM = 36;
  if (focalLengthIn35mmFilm) {
    try {
      const value = 2 * Math.atan(FULL_FRAME_SENSOR_WIDTH_MM / (2 * focalLengthIn35mmFilm)) * (180 / Math.PI);
      return {
        value,
        description: value.toFixed(1) + " deg"
      };
    } catch (error) {
    }
  }
  return void 0;
}
function MetadataMissingError(message) {
  this.name = "MetadataMissingError";
  this.message = message || "No Exif data";
  this.stack = new Error().stack;
}
MetadataMissingError.prototype = new Error();
const exifErrors = {
  MetadataMissingError
};
const exifReader = {
  load,
  loadView,
  errors: exifErrors
};
const errors = exifErrors;
function load(data, options = {}) {
  if (isFilePathOrURL(data)) {
    options.async = true;
    return loadFile(data, options).then((fileContents) => loadFromData(fileContents, options));
  }
  if (isBrowserFileObject(data)) {
    options.async = true;
    return loadFileObject(data, options).then((fileContents) => loadFromData(fileContents, options));
  }
  return loadFromData(data, options);
}
function isFilePathOrURL(data) {
  return typeof data === "string";
}
function loadFile(filename, options) {
  if (/^\w+:\/\//.test(filename)) {
    if (typeof fetch !== "undefined") {
      return fetchRemoteFile(filename, options);
    }
    return nodeGetRemoteFile(filename, options);
  }
  if (isDataUri(filename)) {
    return Promise.resolve(dataUriToBuffer(filename));
  }
  return loadLocalFile(filename, options);
}
function fetchRemoteFile(url, { length } = {}) {
  const options = { method: "GET" };
  if (Number.isInteger(length) && length >= 0) {
    options.headers = {
      range: `bytes=0-${length - 1}`
    };
  }
  return fetch(url, options).then((response) => response.arrayBuffer());
}
function nodeGetRemoteFile(url, { length } = {}) {
  return new Promise((resolve, reject) => {
    const options = {};
    if (Number.isInteger(length) && length >= 0) {
      options.headers = {
        range: `bytes=0-${length - 1}`
      };
    }
    const get2 = requireNodeGet(url);
    get2(url, options, (response) => {
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        const data = [];
        response.on("data", (chunk) => data.push(Buffer.from(chunk)));
        response.on("error", (error) => reject(error));
        response.on("end", () => resolve(Buffer.concat(data)));
      } else {
        reject(`Could not fetch file: ${response.statusCode} ${response.statusMessage}`);
        response.resume();
      }
    }).on("error", (error) => reject(error));
  });
}
function requireNodeGet(url) {
  if (/^https:\/\//.test(url)) {
    return __non_webpack_require__("https").get;
  }
  return __non_webpack_require__("http").get;
}
function isDataUri(filename) {
  return /^data:[^;,]*(;base64)?,/.test(filename);
}
function loadLocalFile(filename, { length } = {}) {
  return new Promise((resolve, reject) => {
    const fs = requireNodeFs();
    fs.open(filename, (error, fd) => {
      if (error) {
        reject(error);
      } else {
        fs.stat(filename, (error2, stat) => {
          if (error2) {
            reject(error2);
          } else {
            const size = Math.min(stat.size, length !== void 0 ? length : stat.size);
            const buffer = Buffer.alloc(size);
            const options = {
              buffer,
              length: size
            };
            fs.read(fd, options, (error3) => {
              if (error3) {
                reject(error3);
              } else {
                fs.close(fd, (error4) => {
                  if (error4) {
                    console.warn(`Could not close file ${filename}:`, error4);
                  }
                  resolve(buffer);
                });
              }
            });
          }
        });
      }
    });
  });
}
function requireNodeFs() {
  try {
    return __non_webpack_require__("fs");
  } catch (error) {
    return void 0;
  }
}
function isBrowserFileObject(data) {
  return typeof File !== "undefined" && data instanceof File;
}
function loadFileObject(file, { length }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => resolve(readerEvent.target.result);
    reader.onerror = () => reject(reader.error);
    if (Number.isInteger(length) && length >= 0 && file.slice !== void 0) {
      reader.readAsArrayBuffer(file.slice(0, length));
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}
function loadFromData(data, options) {
  if (isNodeBuffer(data)) {
    data = new Uint8Array(data).buffer;
  }
  return loadView(getDataView(data), options);
}
function isNodeBuffer(data) {
  try {
    return Buffer.isBuffer(data);
  } catch (error) {
    return false;
  }
}
function getDataView(data) {
  try {
    return new DataView(data);
  } catch (error) {
    return new DataView$1(data);
  }
}
function loadView(dataView, {
  expanded = false,
  async = false,
  includeUnknown = false,
  domParser = void 0
} = {
  expanded: false,
  async: false,
  includeUnknown: false,
  domParser: void 0
}) {
  let foundMetaData = false;
  let tags = {};
  const tagsPromises = [];
  const {
    fileType,
    fileDataOffset,
    jfifDataOffset,
    tiffHeaderOffset,
    iptcDataOffset,
    xmpChunks,
    iccChunks,
    mpfDataOffset,
    pngHeaderOffset,
    pngTextChunks,
    pngChunkOffsets,
    vp8xChunkOffset,
    gifHeaderOffset
  } = ImageHeader.parseAppMarkers(dataView, async);
  if (hasFileData(fileDataOffset)) {
    foundMetaData = true;
    const readTags2 = FileTags.read(dataView, fileDataOffset);
    if (expanded) {
      tags.file = readTags2;
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasJfifData(jfifDataOffset)) {
    foundMetaData = true;
    const readTags2 = JfifTags.read(dataView, jfifDataOffset);
    if (expanded) {
      tags.jfif = readTags2;
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasExifData(tiffHeaderOffset)) {
    foundMetaData = true;
    const { tags: readTags2, byteOrder } = Tags.read(dataView, tiffHeaderOffset, includeUnknown);
    if (readTags2.Thumbnail) {
      tags.Thumbnail = readTags2.Thumbnail;
      delete readTags2.Thumbnail;
    }
    if (expanded) {
      tags.exif = readTags2;
      addGpsGroup(tags);
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
    if (readTags2["IPTC-NAA"] && !hasIptcData(iptcDataOffset)) {
      const readIptcTags = IptcTags.read(readTags2["IPTC-NAA"].value, 0, includeUnknown);
      if (expanded) {
        tags.iptc = readIptcTags;
      } else {
        tags = objectAssign({}, tags, readIptcTags);
      }
    }
    if (readTags2["ApplicationNotes"] && !hasXmpData(xmpChunks)) {
      const readXmpTags = XmpTags.read(getStringValueFromArray(readTags2["ApplicationNotes"].value), void 0, domParser);
      if (expanded) {
        tags.xmp = readXmpTags;
      } else {
        delete readXmpTags._raw;
        tags = objectAssign({}, tags, readXmpTags);
      }
    }
    if (readTags2["ImageSourceData"] && readTags2["PhotoshopSettings"]) {
      const readPhotoshopTags = PhotoshopTags.read(readTags2["PhotoshopSettings"].value, includeUnknown);
      if (expanded) {
        tags.photoshop = readPhotoshopTags;
      } else {
        tags = objectAssign({}, tags, readPhotoshopTags);
      }
    }
    if (readTags2["ICC_Profile"] && !hasIccData(iccChunks)) {
      const readIccTags = IccTags.read(
        readTags2["ICC_Profile"].value,
        [{
          offset: 0,
          length: readTags2["ICC_Profile"].value.length,
          chunkNumber: 1,
          chunksTotal: 1
        }]
      );
      if (expanded) {
        tags.icc = readIccTags;
      } else {
        tags = objectAssign({}, tags, readIccTags);
      }
    }
    if (readTags2["MakerNote"]) {
      if (hasCanonData(readTags2)) {
        const readCanonTags = CanonTags.read(dataView, tiffHeaderOffset, readTags2["MakerNote"].__offset, byteOrder, includeUnknown);
        if (expanded) {
          tags.makerNotes = readCanonTags;
        } else {
          tags = objectAssign({}, tags, readCanonTags);
        }
      } else if (hasPentaxType1Data(readTags2)) {
        const readPentaxTags = PentaxTags.read(dataView, tiffHeaderOffset, readTags2["MakerNote"].__offset, includeUnknown);
        if (expanded) {
          tags.makerNotes = readPentaxTags;
        } else {
          tags = objectAssign({}, tags, readPentaxTags);
        }
      }
    }
    if (readTags2["MakerNote"]) {
      delete readTags2["MakerNote"].__offset;
    }
  }
  if (hasIptcData(iptcDataOffset)) {
    foundMetaData = true;
    const readTags2 = IptcTags.read(dataView, iptcDataOffset, includeUnknown);
    if (expanded) {
      tags.iptc = readTags2;
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasXmpData(xmpChunks)) {
    foundMetaData = true;
    const readTags2 = XmpTags.read(dataView, xmpChunks, domParser);
    if (expanded) {
      tags.xmp = readTags2;
    } else {
      delete readTags2._raw;
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasIccData(iccChunks)) {
    foundMetaData = true;
    const readTags2 = IccTags.read(dataView, iccChunks, async);
    if (readTags2 instanceof Promise) {
      tagsPromises.push(readTags2.then(addIccTags));
    } else {
      addIccTags(readTags2);
    }
  }
  if (hasMpfData(mpfDataOffset)) {
    foundMetaData = true;
    const readMpfTags = MpfTags.read(dataView, mpfDataOffset, includeUnknown);
    if (expanded) {
      tags.mpf = readMpfTags;
    } else {
      tags = objectAssign({}, tags, readMpfTags);
    }
  }
  if (hasPngFileData(pngHeaderOffset)) {
    foundMetaData = true;
    const readTags2 = PngFileTags.read(dataView, pngHeaderOffset);
    if (expanded) {
      tags.png = !tags.png ? readTags2 : objectAssign({}, tags.png, readTags2);
      tags.pngFile = readTags2;
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasPngTextData(pngTextChunks)) {
    foundMetaData = true;
    const { readTags: readTags2, readTagsPromise } = PngTextTags.read(dataView, pngTextChunks, async, includeUnknown);
    addPngTextTags(readTags2);
    if (readTagsPromise) {
      tagsPromises.push(readTagsPromise.then((tagList) => tagList.forEach(addPngTextTags)));
    }
  }
  if (hasPngData(pngChunkOffsets)) {
    foundMetaData = true;
    const readTags2 = PngTags.read(dataView, pngChunkOffsets);
    if (expanded) {
      tags.png = !tags.png ? readTags2 : objectAssign({}, tags.png, readTags2);
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasVp8xData(vp8xChunkOffset)) {
    foundMetaData = true;
    const readTags2 = Vp8xTags.read(dataView, vp8xChunkOffset);
    if (expanded) {
      tags.riff = !tags.riff ? readTags2 : objectAssign({}, tags.riff, readTags2);
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  if (hasGifFileData(gifHeaderOffset)) {
    foundMetaData = true;
    const readTags2 = GifFileTags.read(dataView, gifHeaderOffset);
    if (expanded) {
      tags.gif = !tags.gif ? readTags2 : objectAssign({}, tags.gif, readTags2);
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  const composite = Composite.get(tags, expanded);
  if (composite) {
    if (expanded) {
      tags.composite = composite;
    } else {
      tags = objectAssign({}, tags, composite);
    }
  }
  const thumbnail = Thumbnail.get(dataView, tags.Thumbnail, tiffHeaderOffset);
  if (thumbnail) {
    foundMetaData = true;
    tags.Thumbnail = thumbnail;
  } else {
    delete tags.Thumbnail;
  }
  if (fileType) {
    if (expanded) {
      if (!tags.file) {
        tags.file = {};
      }
      tags.file.FileType = fileType;
    } else {
      tags.FileType = fileType;
    }
    foundMetaData = true;
  }
  if (!foundMetaData) {
    throw new exifErrors.MetadataMissingError();
  }
  if (async) {
    return Promise.all(tagsPromises).then(() => tags);
  }
  return tags;
  function addIccTags(readTags2) {
    if (expanded) {
      tags.icc = readTags2;
    } else {
      tags = objectAssign({}, tags, readTags2);
    }
  }
  function addPngTextTags(readTags2) {
    if (expanded) {
      for (const group of ["exif", "iptc"]) {
        const groupKey = `__${group}`;
        if (readTags2[groupKey]) {
          tags[group] = !tags[group] ? readTags2[groupKey] : objectAssign({}, tags.exif, readTags2[groupKey]);
          delete readTags2[groupKey];
        }
      }
      tags.png = !tags.png ? readTags2 : objectAssign({}, tags.png, readTags2);
      tags.pngText = !tags.pngText ? readTags2 : objectAssign({}, tags.png, readTags2);
    } else {
      tags = objectAssign(
        {},
        tags,
        readTags2.__exif ? readTags2.__exif : {},
        readTags2.__iptc ? readTags2.__iptc : {},
        readTags2
      );
      delete tags.__exif;
      delete tags.__iptc;
    }
  }
}
function hasFileData(fileDataOffset) {
  return fileDataOffset !== void 0;
}
function hasJfifData(jfifDataOffset) {
  return jfifDataOffset !== void 0;
}
function hasExifData(tiffHeaderOffset) {
  return tiffHeaderOffset !== void 0;
}
function addGpsGroup(tags) {
  if (tags.exif) {
    if (tags.exif.GPSLatitude && tags.exif.GPSLatitudeRef) {
      try {
        tags.gps = tags.gps || {};
        tags.gps.Latitude = getCalculatedGpsValue(tags.exif.GPSLatitude.value);
        if (tags.exif.GPSLatitudeRef.value.join("") === "S") {
          tags.gps.Latitude = -tags.gps.Latitude;
        }
      } catch (error) {
      }
    }
    if (tags.exif.GPSLongitude && tags.exif.GPSLongitudeRef) {
      try {
        tags.gps = tags.gps || {};
        tags.gps.Longitude = getCalculatedGpsValue(tags.exif.GPSLongitude.value);
        if (tags.exif.GPSLongitudeRef.value.join("") === "W") {
          tags.gps.Longitude = -tags.gps.Longitude;
        }
      } catch (error) {
      }
    }
    if (tags.exif.GPSAltitude && tags.exif.GPSAltitudeRef) {
      try {
        tags.gps = tags.gps || {};
        tags.gps.Altitude = tags.exif.GPSAltitude.value[0] / tags.exif.GPSAltitude.value[1];
        if (tags.exif.GPSAltitudeRef.value === 1) {
          tags.gps.Altitude = -tags.gps.Altitude;
        }
      } catch (error) {
      }
    }
  }
}
function hasIptcData(iptcDataOffset) {
  return iptcDataOffset !== void 0;
}
function hasXmpData(xmpChunks) {
  return Array.isArray(xmpChunks) && xmpChunks.length > 0;
}
function hasIccData(iccDataOffsets) {
  return Array.isArray(iccDataOffsets) && iccDataOffsets.length > 0;
}
function hasCanonData(tags) {
  return tags["Make"] && tags["Make"].value && Array.isArray(tags["Make"].value) && tags["Make"].value[0] === "Canon" && tags["MakerNote"] && tags["MakerNote"].__offset;
}
function hasPentaxType1Data(tags) {
  const PENTAX_ID_STRING = "PENTAX ";
  return tags["MakerNote"].value.length > PENTAX_ID_STRING.length && getStringValueFromArray(tags["MakerNote"].value.slice(0, PENTAX_ID_STRING.length)) === PENTAX_ID_STRING && tags["MakerNote"].__offset;
}
function hasMpfData(mpfDataOffset) {
  return mpfDataOffset !== void 0;
}
function hasPngFileData(pngFileDataOffset) {
  return pngFileDataOffset !== void 0;
}
function hasPngTextData(pngTextChunks) {
  return pngTextChunks !== void 0;
}
function hasPngData(pngChunkOffsets) {
  return pngChunkOffsets !== void 0;
}
function hasVp8xData(vp8xChunkOffset) {
  return vp8xChunkOffset !== void 0;
}
function hasGifFileData(gifHeaderOffset) {
  return gifHeaderOffset !== void 0;
}
const ExifReaderNamespace = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: exifReader,
  errors,
  load,
  loadView
}, Symbol.toStringTag, { value: "Module" }));
const ExifReader = exifReader || ExifReaderNamespace;
const DEFAULT_IMAGE_EXTS = /* @__PURE__ */ new Set([
  "jpg",
  "jpeg",
  "tif",
  "tiff",
  "heic",
  "heif",
  "avif",
  "webp",
  "png",
  "gif",
  "bmp",
  "ico"
]);
const DEFAULT_EXIF_FIELDS = [
  {
    key: "dateTimeOriginal",
    label: "拍摄时间",
    tags: ["DateTimeOriginal", "DateTimeDigitized", "DateTime"]
  },
  {
    key: "camera",
    label: "相机",
    tags: ["Make", "Model"],
    combine: (values) => values.filter(Boolean).join(" ").trim()
  },
  {
    key: "lensModel",
    label: "镜头",
    tags: ["LensModel"]
  },
  {
    key: "focalLength",
    label: "焦距",
    tags: ["FocalLength"],
    format: (v) => formatFocalLength(v)
  },
  {
    key: "aperture",
    label: "光圈",
    tags: ["FNumber"],
    format: (v) => formatAperture(v)
  },
  {
    key: "shutter",
    label: "快门",
    tags: ["ExposureTime"],
    format: (v) => formatExposure(v)
  },
  {
    key: "iso",
    label: "ISO",
    tags: ["ISOSpeedRatings", "PhotographicSensitivity", "ISO"],
    format: (v) => formatISO(v)
  },
  {
    key: "location",
    label: "位置",
    resolve: (tags) => resolveGpsLocation(tags),
    always: true,
    placeholder: "None"
  }
];
function isImageLikeForExif(item) {
  if (!item) return false;
  if (item?.isDirectory) return false;
  if (item?.type === FileType.IMAGE) return true;
  const mimetype = String(item?.mimetype || "").toLowerCase();
  if (mimetype.startsWith("image/")) {
    if (mimetype === "image/svg+xml") return false;
    return true;
  }
  const filename = item?.filename || item?.name || item?.path || "";
  const ext = getExtension(filename);
  if (!ext) return false;
  if (ext === "svg") return false;
  return DEFAULT_IMAGE_EXTS.has(ext);
}
async function loadExifTagsFromArrayBufferAsync(arrayBuffer) {
  if (!arrayBuffer) return {};
  if (typeof ExifReader?.load !== "function") return {};
  try {
    const maybePromise = ExifReader.load(arrayBuffer, { async: true, expanded: true });
    const tags = typeof maybePromise?.then === "function" ? await maybePromise : maybePromise;
    return tags || {};
  } catch {
    try {
      return ExifReader.load(arrayBuffer, { expanded: true }) || {};
    } catch {
      return {};
    }
  }
}
function buildExifRows(tags, fields = DEFAULT_EXIF_FIELDS) {
  const rows = [];
  const safeFields = Array.isArray(fields) ? fields : [];
  const rawTags = tags || {};
  const exifGroup = rawTags?.exif && typeof rawTags.exif === "object" ? rawTags.exif : null;
  const flatTags = exifGroup ? { ...exifGroup, ...rawTags } : rawTags;
  const tagCount = Object.keys(flatTags || {}).length;
  for (const field of safeFields) {
    if (!field?.key || !field?.label) continue;
    const hasResolver = typeof field.resolve === "function";
    const tagNames = Array.isArray(field?.tags) ? field.tags : [];
    if (!hasResolver && tagNames.length === 0) continue;
    if (hasResolver) {
      const resolved = String(field.resolve(flatTags) || "").trim();
      if (resolved) rows.push({ key: field.key, label: field.label, value: resolved });
      else if (field.always && tagCount > 0) rows.push({ key: field.key, label: field.label, value: field.placeholder || "未知" });
      continue;
    }
    const values = tagNames.map((name) => tagToText(flatTags?.[name])).filter(Boolean);
    if (values.length === 0) {
      if (field.always && tagCount > 0) rows.push({ key: field.key, label: field.label, value: field.placeholder || "未知" });
      continue;
    }
    let valueText = values[0];
    if (typeof field.combine === "function") {
      valueText = String(field.combine(values) || "").trim();
    }
    if (typeof field.format === "function") {
      valueText = String(field.format(valueText) || "").trim();
    }
    if (!valueText) continue;
    rows.push({ key: field.key, label: field.label, value: valueText });
  }
  return rows;
}
function tagToText(tag) {
  if (!tag) return "";
  if (typeof tag === "string") return tag;
  if (typeof tag?.description === "string" && tag.description) return tag.description;
  const value = tag?.value;
  if (value == null) return "";
  if (value instanceof Date) return value.toISOString().replace("T", " ").replace(".000Z", "Z");
  if (Array.isArray(value)) return value.filter((v) => v != null && String(v).trim() !== "").join(", ");
  return String(value);
}
function formatAperture(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return "";
  if (txt.startsWith("f/") || txt.startsWith("F/")) return `ƒ/${txt.slice(2)}`;
  if (txt.startsWith("ƒ/")) return txt;
  return `ƒ/${txt}`;
}
function formatExposure(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return "";
  if (txt.includes("/")) return `${txt}s`;
  if (txt.endsWith("s")) return txt;
  const n = Number(txt);
  if (Number.isFinite(n)) {
    if (n >= 1) return `${n}s`;
    const denom = Math.round(1 / n);
    if (denom > 0) return `1/${denom}s`;
  }
  return txt;
}
function formatFocalLength(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return "";
  if (txt.toLowerCase().includes("mm")) return txt;
  return `${txt}mm`;
}
function formatISO(raw) {
  const txt = String(raw || "").trim();
  if (!txt) return "";
  if (txt.toUpperCase().startsWith("ISO")) return txt;
  return `ISO ${txt}`;
}
function resolveGpsCoordinates(tags) {
  if (!tags || Object.keys(tags).length === 0) return null;
  const expandedLat = normalizeGpsCoordinateValue(tags?.gps?.Latitude ?? tags?.gps?.latitude);
  const expandedLng = normalizeGpsCoordinateValue(tags?.gps?.Longitude ?? tags?.gps?.longitude);
  if (expandedLat != null && expandedLng != null) return { lat: expandedLat, lng: expandedLng };
  const lat = parseGpsCoordinate(tags?.GPSLatitude, tags?.GPSLatitudeRef, { min: -90, max: 90 });
  const lng = parseGpsCoordinate(tags?.GPSLongitude, tags?.GPSLongitudeRef, { min: -180, max: 180 });
  if (lat != null && lng != null) return { lat, lng };
  const xmpLat = parseGpsCoordinate(tags?.["Xmp.exif.GPSLatitude"], tags?.["Xmp.exif.GPSLatitudeRef"], { min: -90, max: 90 });
  const xmpLng = parseGpsCoordinate(tags?.["Xmp.exif.GPSLongitude"], tags?.["Xmp.exif.GPSLongitudeRef"], { min: -180, max: 180 });
  if (xmpLat != null && xmpLng != null) return { lat: xmpLat, lng: xmpLng };
  return null;
}
function resolveGpsLocation(tags) {
  const coords = resolveGpsCoordinates(tags);
  if (!coords) return "";
  return formatLatLng(coords.lat, coords.lng);
}
function formatLatLng(lat, lng) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  const absLat = Math.abs(lat);
  const absLng = Math.abs(lng);
  return `${absLat.toFixed(5)}°${latDir} ${absLng.toFixed(5)}°${lngDir}`;
}
function parseGpsCoordinate(valueTag, refTag, { min, max }) {
  const value = normalizeGpsCoordinateValue(valueTag);
  if (value == null) return null;
  let signed = value;
  const ref2 = normalizeGpsRef(refTag);
  if (ref2 === "S" || ref2 === "W") signed = -Math.abs(value);
  else if (ref2 === "N" || ref2 === "E") signed = Math.abs(value);
  if (!Number.isFinite(signed)) return null;
  if (typeof min === "number" && signed < min) return null;
  if (typeof max === "number" && signed > max) return null;
  return signed;
}
function normalizeGpsRef(tag) {
  if (!tag) return "";
  const raw = tag?.value ?? tag?.description ?? tag;
  const txt = String(raw || "").trim().toUpperCase();
  if (!txt) return "";
  if (txt.startsWith("N")) return "N";
  if (txt.startsWith("S")) return "S";
  if (txt.startsWith("E")) return "E";
  if (txt.startsWith("W")) return "W";
  if (txt.includes("NORTH")) return "N";
  if (txt.includes("SOUTH")) return "S";
  if (txt.includes("EAST")) return "E";
  if (txt.includes("WEST")) return "W";
  return "";
}
function normalizeGpsCoordinateValue(tag) {
  if (!tag) return null;
  const raw = tag?.value ?? tag?.description ?? tag;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const cleaned = raw.replace(/[^\d.,/\-\s]/g, " ").trim();
    if (!cleaned) return null;
    const n = Number(cleaned.split(/\s+/)[0]);
    return Number.isFinite(n) ? n : null;
  }
  if (Array.isArray(raw)) {
    const parts = raw.map((v) => normalizeRational(v)).filter((v) => typeof v === "number");
    if (parts.length === 0) return null;
    if (parts.length === 1) return parts[0];
    const deg = parts[0] || 0;
    const min = parts[1] || 0;
    const sec = parts[2] || 0;
    return deg + min / 60 + sec / 3600;
  }
  const rational = normalizeRational(raw);
  return typeof rational === "number" ? rational : null;
}
function normalizeRational(v) {
  if (v == null) return null;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  if (Array.isArray(v) && v.length >= 2) {
    const num = Number(v[0]);
    const den = Number(v[1]);
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) return num / den;
    return null;
  }
  if (typeof v === "object") {
    const num = v?.numerator ?? v?.num ?? v?.n ?? v?.[0];
    const den = v?.denominator ?? v?.den ?? v?.d ?? v?.[1];
    if (typeof num === "number" && typeof den === "number" && den !== 0) return num / den;
  }
  return null;
}
var leafletSrc = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(module, exports) {
  (function(global, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    var version = "1.9.4";
    function extend(dest) {
      var i, j, len, src;
      for (j = 1, len = arguments.length; j < len; j++) {
        src = arguments[j];
        for (i in src) {
          dest[i] = src[i];
        }
      }
      return dest;
    }
    var create$2 = Object.create || /* @__PURE__ */ function() {
      function F() {
      }
      return function(proto) {
        F.prototype = proto;
        return new F();
      };
    }();
    function bind(fn, obj) {
      var slice = Array.prototype.slice;
      if (fn.bind) {
        return fn.bind.apply(fn, slice.call(arguments, 1));
      }
      var args = slice.call(arguments, 2);
      return function() {
        return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
      };
    }
    var lastId = 0;
    function stamp(obj) {
      if (!("_leaflet_id" in obj)) {
        obj["_leaflet_id"] = ++lastId;
      }
      return obj._leaflet_id;
    }
    function throttle(fn, time, context) {
      var lock, args, wrapperFn, later;
      later = function() {
        lock = false;
        if (args) {
          wrapperFn.apply(context, args);
          args = false;
        }
      };
      wrapperFn = function() {
        if (lock) {
          args = arguments;
        } else {
          fn.apply(context, arguments);
          setTimeout(later, time);
          lock = true;
        }
      };
      return wrapperFn;
    }
    function wrapNum(x, range, includeMax) {
      var max = range[1], min = range[0], d = max - min;
      return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
    }
    function falseFn() {
      return false;
    }
    function formatNum(num, precision) {
      if (precision === false) {
        return num;
      }
      var pow = Math.pow(10, precision === void 0 ? 6 : precision);
      return Math.round(num * pow) / pow;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function splitWords(str) {
      return trim(str).split(/\s+/);
    }
    function setOptions(obj, options) {
      if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
        obj.options = obj.options ? create$2(obj.options) : {};
      }
      for (var i in options) {
        obj.options[i] = options[i];
      }
      return obj.options;
    }
    function getParamString(obj, existingUrl, uppercase) {
      var params = [];
      for (var i in obj) {
        params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
      }
      return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
    }
    var templateRe = /\{ *([\w_ -]+) *\}/g;
    function template(str, data) {
      return str.replace(templateRe, function(str2, key) {
        var value = data[key];
        if (value === void 0) {
          throw new Error("No value provided for variable " + str2);
        } else if (typeof value === "function") {
          value = value(data);
        }
        return value;
      });
    }
    var isArray2 = Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    function indexOf(array, el) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === el) {
          return i;
        }
      }
      return -1;
    }
    var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function getPrefixed(name) {
      return window["webkit" + name] || window["moz" + name] || window["ms" + name];
    }
    var lastTime = 0;
    function timeoutDefer(fn) {
      var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
      lastTime = time + timeToCall;
      return window.setTimeout(fn, timeToCall);
    }
    var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
    var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
      window.clearTimeout(id);
    };
    function requestAnimFrame(fn, context, immediate) {
      if (immediate && requestFn === timeoutDefer) {
        fn.call(context);
      } else {
        return requestFn.call(window, bind(fn, context));
      }
    }
    function cancelAnimFrame(id) {
      if (id) {
        cancelFn.call(window, id);
      }
    }
    var Util = {
      __proto__: null,
      extend,
      create: create$2,
      bind,
      get lastId() {
        return lastId;
      },
      stamp,
      throttle,
      wrapNum,
      falseFn,
      formatNum,
      trim,
      splitWords,
      setOptions,
      getParamString,
      template,
      isArray: isArray2,
      indexOf,
      emptyImageUrl,
      requestFn,
      cancelFn,
      requestAnimFrame,
      cancelAnimFrame
    };
    function Class() {
    }
    Class.extend = function(props) {
      var NewClass = function() {
        setOptions(this);
        if (this.initialize) {
          this.initialize.apply(this, arguments);
        }
        this.callInitHooks();
      };
      var parentProto = NewClass.__super__ = this.prototype;
      var proto = create$2(parentProto);
      proto.constructor = NewClass;
      NewClass.prototype = proto;
      for (var i in this) {
        if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
          NewClass[i] = this[i];
        }
      }
      if (props.statics) {
        extend(NewClass, props.statics);
      }
      if (props.includes) {
        checkDeprecatedMixinEvents(props.includes);
        extend.apply(null, [proto].concat(props.includes));
      }
      extend(proto, props);
      delete proto.statics;
      delete proto.includes;
      if (proto.options) {
        proto.options = parentProto.options ? create$2(parentProto.options) : {};
        extend(proto.options, props.options);
      }
      proto._initHooks = [];
      proto.callInitHooks = function() {
        if (this._initHooksCalled) {
          return;
        }
        if (parentProto.callInitHooks) {
          parentProto.callInitHooks.call(this);
        }
        this._initHooksCalled = true;
        for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
          proto._initHooks[i2].call(this);
        }
      };
      return NewClass;
    };
    Class.include = function(props) {
      var parentOptions = this.prototype.options;
      extend(this.prototype, props);
      if (props.options) {
        this.prototype.options = parentOptions;
        this.mergeOptions(props.options);
      }
      return this;
    };
    Class.mergeOptions = function(options) {
      extend(this.prototype.options, options);
      return this;
    };
    Class.addInitHook = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      var init = typeof fn === "function" ? fn : function() {
        this[fn].apply(this, args);
      };
      this.prototype._initHooks = this.prototype._initHooks || [];
      this.prototype._initHooks.push(init);
      return this;
    };
    function checkDeprecatedMixinEvents(includes) {
      if (typeof L === "undefined" || !L || !L.Mixin) {
        return;
      }
      includes = isArray2(includes) ? includes : [includes];
      for (var i = 0; i < includes.length; i++) {
        if (includes[i] === L.Mixin.Events) {
          console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
    }
    var Events = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(types, fn, context) {
        if (typeof types === "object") {
          for (var type in types) {
            this._on(type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          for (var i = 0, len = types.length; i < len; i++) {
            this._on(types[i], fn, context);
          }
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(types, fn, context) {
        if (!arguments.length) {
          delete this._events;
        } else if (typeof types === "object") {
          for (var type in types) {
            this._off(type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          var removeAll = arguments.length === 1;
          for (var i = 0, len = types.length; i < len; i++) {
            if (removeAll) {
              this._off(types[i]);
            } else {
              this._off(types[i], fn, context);
            }
          }
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(type, fn, context, _once) {
        if (typeof fn !== "function") {
          console.warn("wrong listener type: " + typeof fn);
          return;
        }
        if (this._listens(type, fn, context) !== false) {
          return;
        }
        if (context === this) {
          context = void 0;
        }
        var newListener = { fn, ctx: context };
        if (_once) {
          newListener.once = true;
        }
        this._events = this._events || {};
        this._events[type] = this._events[type] || [];
        this._events[type].push(newListener);
      },
      _off: function(type, fn, context) {
        var listeners, i, len;
        if (!this._events) {
          return;
        }
        listeners = this._events[type];
        if (!listeners) {
          return;
        }
        if (arguments.length === 1) {
          if (this._firingCount) {
            for (i = 0, len = listeners.length; i < len; i++) {
              listeners[i].fn = falseFn;
            }
          }
          delete this._events[type];
          return;
        }
        if (typeof fn !== "function") {
          console.warn("wrong listener type: " + typeof fn);
          return;
        }
        var index2 = this._listens(type, fn, context);
        if (index2 !== false) {
          var listener = listeners[index2];
          if (this._firingCount) {
            listener.fn = falseFn;
            this._events[type] = listeners = listeners.slice();
          }
          listeners.splice(index2, 1);
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(type, data, propagate) {
        if (!this.listens(type, propagate)) {
          return this;
        }
        var event = extend({}, data, {
          type,
          target: this,
          sourceTarget: data && data.sourceTarget || this
        });
        if (this._events) {
          var listeners = this._events[type];
          if (listeners) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var i = 0, len = listeners.length; i < len; i++) {
              var l = listeners[i];
              var fn = l.fn;
              if (l.once) {
                this.off(type, fn, l.ctx);
              }
              fn.call(l.ctx || this, event);
            }
            this._firingCount--;
          }
        }
        if (propagate) {
          this._propagateEvent(event);
        }
        return this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(type, fn, context, propagate) {
        if (typeof type !== "string") {
          console.warn('"string" type argument expected');
        }
        var _fn = fn;
        if (typeof fn !== "function") {
          propagate = !!fn;
          _fn = void 0;
          context = void 0;
        }
        var listeners = this._events && this._events[type];
        if (listeners && listeners.length) {
          if (this._listens(type, _fn, context) !== false) {
            return true;
          }
        }
        if (propagate) {
          for (var id in this._eventParents) {
            if (this._eventParents[id].listens(type, fn, context, propagate)) {
              return true;
            }
          }
        }
        return false;
      },
      // returns the index (number) or false
      _listens: function(type, fn, context) {
        if (!this._events) {
          return false;
        }
        var listeners = this._events[type] || [];
        if (!fn) {
          return !!listeners.length;
        }
        if (context === this) {
          context = void 0;
        }
        for (var i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i].fn === fn && listeners[i].ctx === context) {
            return i;
          }
        }
        return false;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(types, fn, context) {
        if (typeof types === "object") {
          for (var type in types) {
            this._on(type, types[type], fn, true);
          }
        } else {
          types = splitWords(types);
          for (var i = 0, len = types.length; i < len; i++) {
            this._on(types[i], fn, context, true);
          }
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(obj) {
        this._eventParents = this._eventParents || {};
        this._eventParents[stamp(obj)] = obj;
        return this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(obj) {
        if (this._eventParents) {
          delete this._eventParents[stamp(obj)];
        }
        return this;
      },
      _propagateEvent: function(e) {
        for (var id in this._eventParents) {
          this._eventParents[id].fire(e.type, extend({
            layer: e.target,
            propagatedFrom: e.target
          }, e), true);
        }
      }
    };
    Events.addEventListener = Events.on;
    Events.removeEventListener = Events.clearAllEventListeners = Events.off;
    Events.addOneTimeEventListener = Events.once;
    Events.fireEvent = Events.fire;
    Events.hasEventListeners = Events.listens;
    var Evented = Class.extend(Events);
    function Point(x, y, round) {
      this.x = round ? Math.round(x) : x;
      this.y = round ? Math.round(y) : y;
    }
    var trunc = Math.trunc || function(v) {
      return v > 0 ? Math.floor(v) : Math.ceil(v);
    };
    Point.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new Point(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(point) {
        return this.clone()._add(toPoint(point));
      },
      _add: function(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(point) {
        return this.clone()._subtract(toPoint(point));
      },
      _subtract: function(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(num) {
        return this.clone()._divideBy(num);
      },
      _divideBy: function(num) {
        this.x /= num;
        this.y /= num;
        return this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(num) {
        return this.clone()._multiplyBy(num);
      },
      _multiplyBy: function(num) {
        this.x *= num;
        this.y *= num;
        return this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(point) {
        return new Point(this.x * point.x, this.y * point.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(point) {
        return new Point(this.x / point.x, this.y / point.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        this.x = trunc(this.x);
        this.y = trunc(this.y);
        return this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(point) {
        point = toPoint(point);
        var x = point.x - this.x, y = point.y - this.y;
        return Math.sqrt(x * x + y * y);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(point) {
        point = toPoint(point);
        return point.x === this.x && point.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(point) {
        point = toPoint(point);
        return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
      }
    };
    function toPoint(x, y, round) {
      if (x instanceof Point) {
        return x;
      }
      if (isArray2(x)) {
        return new Point(x[0], x[1]);
      }
      if (x === void 0 || x === null) {
        return x;
      }
      if (typeof x === "object" && "x" in x && "y" in x) {
        return new Point(x.x, x.y);
      }
      return new Point(x, y, round);
    }
    function Bounds(a, b) {
      if (!a) {
        return;
      }
      var points = b ? [a, b] : a;
      for (var i = 0, len = points.length; i < len; i++) {
        this.extend(points[i]);
      }
    }
    Bounds.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(obj) {
        var min2, max2;
        if (!obj) {
          return this;
        }
        if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
          min2 = max2 = toPoint(obj);
        } else {
          obj = toBounds(obj);
          min2 = obj.min;
          max2 = obj.max;
          if (!min2 || !max2) {
            return this;
          }
        }
        if (!this.min && !this.max) {
          this.min = min2.clone();
          this.max = max2.clone();
        } else {
          this.min.x = Math.min(min2.x, this.min.x);
          this.max.x = Math.max(max2.x, this.max.x);
          this.min.y = Math.min(min2.y, this.min.y);
          this.max.y = Math.max(max2.y, this.max.y);
        }
        return this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(round) {
        return toPoint(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          round
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return toPoint(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return toPoint(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(obj) {
        var min, max;
        if (typeof obj[0] === "number" || obj instanceof Point) {
          obj = toPoint(obj);
        } else {
          obj = toBounds(obj);
        }
        if (obj instanceof Bounds) {
          min = obj.min;
          max = obj.max;
        } else {
          min = max = obj;
        }
        return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(bounds) {
        bounds = toBounds(bounds);
        var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
        return xIntersects && yIntersects;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(bounds) {
        bounds = toBounds(bounds);
        var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
        return xOverlaps && yOverlaps;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(bufferRatio) {
        var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
        return toBounds(
          toPoint(min.x - heightBuffer, min.y - widthBuffer),
          toPoint(max.x + heightBuffer, max.y + widthBuffer)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(bounds) {
        if (!bounds) {
          return false;
        }
        bounds = toBounds(bounds);
        return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
      }
    };
    function toBounds(a, b) {
      if (!a || a instanceof Bounds) {
        return a;
      }
      return new Bounds(a, b);
    }
    function LatLngBounds(corner1, corner2) {
      if (!corner1) {
        return;
      }
      var latlngs = corner2 ? [corner1, corner2] : corner1;
      for (var i = 0, len = latlngs.length; i < len; i++) {
        this.extend(latlngs[i]);
      }
    }
    LatLngBounds.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(obj) {
        var sw = this._southWest, ne = this._northEast, sw2, ne2;
        if (obj instanceof LatLng) {
          sw2 = obj;
          ne2 = obj;
        } else if (obj instanceof LatLngBounds) {
          sw2 = obj._southWest;
          ne2 = obj._northEast;
          if (!sw2 || !ne2) {
            return this;
          }
        } else {
          return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
        }
        if (!sw && !ne) {
          this._southWest = new LatLng(sw2.lat, sw2.lng);
          this._northEast = new LatLng(ne2.lat, ne2.lng);
        } else {
          sw.lat = Math.min(sw2.lat, sw.lat);
          sw.lng = Math.min(sw2.lng, sw.lng);
          ne.lat = Math.max(ne2.lat, ne.lat);
          ne.lng = Math.max(ne2.lng, ne.lng);
        }
        return this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(bufferRatio) {
        var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
        return new LatLngBounds(
          new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
          new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new LatLng(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new LatLng(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new LatLng(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(obj) {
        if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
          obj = toLatLng(obj);
        } else {
          obj = toLatLngBounds(obj);
        }
        var sw = this._southWest, ne = this._northEast, sw2, ne2;
        if (obj instanceof LatLngBounds) {
          sw2 = obj.getSouthWest();
          ne2 = obj.getNorthEast();
        } else {
          sw2 = ne2 = obj;
        }
        return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(bounds) {
        bounds = toLatLngBounds(bounds);
        var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
        return latIntersects && lngIntersects;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(bounds) {
        bounds = toLatLngBounds(bounds);
        var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
        return latOverlaps && lngOverlaps;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(bounds, maxMargin) {
        if (!bounds) {
          return false;
        }
        bounds = toLatLngBounds(bounds);
        return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function toLatLngBounds(a, b) {
      if (a instanceof LatLngBounds) {
        return a;
      }
      return new LatLngBounds(a, b);
    }
    function LatLng(lat, lng, alt) {
      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
      }
      this.lat = +lat;
      this.lng = +lng;
      if (alt !== void 0) {
        this.alt = +alt;
      }
    }
    LatLng.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(obj, maxMargin) {
        if (!obj) {
          return false;
        }
        obj = toLatLng(obj);
        var margin = Math.max(
          Math.abs(this.lat - obj.lat),
          Math.abs(this.lng - obj.lng)
        );
        return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(precision) {
        return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(other) {
        return Earth.distance(this, toLatLng(other));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return Earth.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(sizeInMeters) {
        var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
        return toLatLngBounds(
          [this.lat - latAccuracy, this.lng - lngAccuracy],
          [this.lat + latAccuracy, this.lng + lngAccuracy]
        );
      },
      clone: function() {
        return new LatLng(this.lat, this.lng, this.alt);
      }
    };
    function toLatLng(a, b, c) {
      if (a instanceof LatLng) {
        return a;
      }
      if (isArray2(a) && typeof a[0] !== "object") {
        if (a.length === 3) {
          return new LatLng(a[0], a[1], a[2]);
        }
        if (a.length === 2) {
          return new LatLng(a[0], a[1]);
        }
        return null;
      }
      if (a === void 0 || a === null) {
        return a;
      }
      if (typeof a === "object" && "lat" in a) {
        return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
      }
      if (b === void 0) {
        return null;
      }
      return new LatLng(a, b, c);
    }
    var CRS = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(latlng, zoom2) {
        var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
        return this.transformation._transform(projectedPoint, scale2);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(point, zoom2) {
        var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
        return this.projection.unproject(untransformedPoint);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(latlng) {
        return this.projection.project(latlng);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(point) {
        return this.projection.unproject(point);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(zoom2) {
        return 256 * Math.pow(2, zoom2);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(scale2) {
        return Math.log(scale2 / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(zoom2) {
        if (this.infinite) {
          return null;
        }
        var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
        return new Bounds(min, max);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: false,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(latlng) {
        var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
        return new LatLng(lat, lng, alt);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(bounds) {
        var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
        if (latShift === 0 && lngShift === 0) {
          return bounds;
        }
        var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
        return new LatLngBounds(newSw, newNe);
      }
    };
    var Earth = extend({}, CRS, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(latlng1, latlng2) {
        var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return this.R * c;
      }
    });
    var earthRadius = 6378137;
    var SphericalMercator = {
      R: earthRadius,
      MAX_LATITUDE: 85.0511287798,
      project: function(latlng) {
        var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
        return new Point(
          this.R * latlng.lng * d,
          this.R * Math.log((1 + sin) / (1 - sin)) / 2
        );
      },
      unproject: function(point) {
        var d = 180 / Math.PI;
        return new LatLng(
          (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
          point.x * d / this.R
        );
      },
      bounds: function() {
        var d = earthRadius * Math.PI;
        return new Bounds([-d, -d], [d, d]);
      }()
    };
    function Transformation(a, b, c, d) {
      if (isArray2(a)) {
        this._a = a[0];
        this._b = a[1];
        this._c = a[2];
        this._d = a[3];
        return;
      }
      this._a = a;
      this._b = b;
      this._c = c;
      this._d = d;
    }
    Transformation.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(point, scale2) {
        return this._transform(point.clone(), scale2);
      },
      // destructive transform (faster)
      _transform: function(point, scale2) {
        scale2 = scale2 || 1;
        point.x = scale2 * (this._a * point.x + this._b);
        point.y = scale2 * (this._c * point.y + this._d);
        return point;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(point, scale2) {
        scale2 = scale2 || 1;
        return new Point(
          (point.x / scale2 - this._b) / this._a,
          (point.y / scale2 - this._d) / this._c
        );
      }
    };
    function toTransformation(a, b, c, d) {
      return new Transformation(a, b, c, d);
    }
    var EPSG3857 = extend({}, Earth, {
      code: "EPSG:3857",
      projection: SphericalMercator,
      transformation: function() {
        var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
        return toTransformation(scale2, 0.5, -scale2, 0.5);
      }()
    });
    var EPSG900913 = extend({}, EPSG3857, {
      code: "EPSG:900913"
    });
    function svgCreate(name) {
      return document.createElementNS("http://www.w3.org/2000/svg", name);
    }
    function pointsToPath(rings, closed) {
      var str = "", i, j, len, len2, points, p;
      for (i = 0, len = rings.length; i < len; i++) {
        points = rings[i];
        for (j = 0, len2 = points.length; j < len2; j++) {
          p = points[j];
          str += (j ? "L" : "M") + p.x + " " + p.y;
        }
        str += closed ? Browser.svg ? "z" : "x" : "";
      }
      return str || "M0 0";
    }
    var style = document.documentElement.style;
    var ie = "ActiveXObject" in window;
    var ielt9 = ie && !document.addEventListener;
    var edge = "msLaunchUri" in navigator && !("documentMode" in document);
    var webkit = userAgentContains("webkit");
    var android = userAgentContains("android");
    var android23 = userAgentContains("android 2") || userAgentContains("android 3");
    var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
    var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
    var opera = !!window.opera;
    var chrome = !edge && userAgentContains("chrome");
    var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
    var safari = !chrome && userAgentContains("safari");
    var phantom = userAgentContains("phantom");
    var opera12 = "OTransition" in style;
    var win = navigator.platform.indexOf("Win") === 0;
    var ie3d = ie && "transition" in style;
    var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
    var gecko3d = "MozPerspective" in style;
    var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
    var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
    var mobileWebkit = mobile && webkit;
    var mobileWebkit3d = mobile && webkit3d;
    var msPointer = !window.PointerEvent && window.MSPointerEvent;
    var pointer = !!(window.PointerEvent || msPointer);
    var touchNative = "ontouchstart" in window || !!window.TouchEvent;
    var touch = !window.L_NO_TOUCH && (touchNative || pointer);
    var mobileOpera = mobile && opera;
    var mobileGecko = mobile && gecko;
    var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
    var passiveEvents = function() {
      var supportsPassiveOption = false;
      try {
        var opts = Object.defineProperty({}, "passive", {
          get: function() {
            supportsPassiveOption = true;
          }
        });
        window.addEventListener("testPassiveEventSupport", falseFn, opts);
        window.removeEventListener("testPassiveEventSupport", falseFn, opts);
      } catch (e) {
      }
      return supportsPassiveOption;
    }();
    var canvas$1 = function() {
      return !!document.createElement("canvas").getContext;
    }();
    var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
    var inlineSvg = !!svg$1 && function() {
      var div = document.createElement("div");
      div.innerHTML = "<svg/>";
      return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }();
    var vml = !svg$1 && function() {
      try {
        var div = document.createElement("div");
        div.innerHTML = '<v:shape adj="1"/>';
        var shape = div.firstChild;
        shape.style.behavior = "url(#default#VML)";
        return shape && typeof shape.adj === "object";
      } catch (e) {
        return false;
      }
    }();
    var mac = navigator.platform.indexOf("Mac") === 0;
    var linux = navigator.platform.indexOf("Linux") === 0;
    function userAgentContains(str) {
      return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
    }
    var Browser = {
      ie,
      ielt9,
      edge,
      webkit,
      android,
      android23,
      androidStock,
      opera,
      chrome,
      gecko,
      safari,
      phantom,
      opera12,
      win,
      ie3d,
      webkit3d,
      gecko3d,
      any3d,
      mobile,
      mobileWebkit,
      mobileWebkit3d,
      msPointer,
      pointer,
      touch,
      touchNative,
      mobileOpera,
      mobileGecko,
      retina,
      passiveEvents,
      canvas: canvas$1,
      svg: svg$1,
      vml,
      inlineSvg,
      mac,
      linux
    };
    var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
    var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
    var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
    var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
    var pEvent = {
      touchstart: POINTER_DOWN,
      touchmove: POINTER_MOVE,
      touchend: POINTER_UP,
      touchcancel: POINTER_CANCEL
    };
    var handle = {
      touchstart: _onPointerStart,
      touchmove: _handlePointer,
      touchend: _handlePointer,
      touchcancel: _handlePointer
    };
    var _pointers = {};
    var _pointerDocListener = false;
    function addPointerListener(obj, type, handler) {
      if (type === "touchstart") {
        _addPointerDocListener();
      }
      if (!handle[type]) {
        console.warn("wrong event specified:", type);
        return falseFn;
      }
      handler = handle[type].bind(this, handler);
      obj.addEventListener(pEvent[type], handler, false);
      return handler;
    }
    function removePointerListener(obj, type, handler) {
      if (!pEvent[type]) {
        console.warn("wrong event specified:", type);
        return;
      }
      obj.removeEventListener(pEvent[type], handler, false);
    }
    function _globalPointerDown(e) {
      _pointers[e.pointerId] = e;
    }
    function _globalPointerMove(e) {
      if (_pointers[e.pointerId]) {
        _pointers[e.pointerId] = e;
      }
    }
    function _globalPointerUp(e) {
      delete _pointers[e.pointerId];
    }
    function _addPointerDocListener() {
      if (!_pointerDocListener) {
        document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
        document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
        document.addEventListener(POINTER_UP, _globalPointerUp, true);
        document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
        _pointerDocListener = true;
      }
    }
    function _handlePointer(handler, e) {
      if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
        return;
      }
      e.touches = [];
      for (var i in _pointers) {
        e.touches.push(_pointers[i]);
      }
      e.changedTouches = [e];
      handler(e);
    }
    function _onPointerStart(handler, e) {
      if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
        preventDefault(e);
      }
      _handlePointer(handler, e);
    }
    function makeDblclick(event) {
      var newEvent = {}, prop, i;
      for (i in event) {
        prop = event[i];
        newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
      }
      event = newEvent;
      newEvent.type = "dblclick";
      newEvent.detail = 2;
      newEvent.isTrusted = false;
      newEvent._simulated = true;
      return newEvent;
    }
    var delay = 200;
    function addDoubleTapListener(obj, handler) {
      obj.addEventListener("dblclick", handler);
      var last = 0, detail;
      function simDblclick(e) {
        if (e.detail !== 1) {
          detail = e.detail;
          return;
        }
        if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
          return;
        }
        var path = getPropagationPath(e);
        if (path.some(function(el) {
          return el instanceof HTMLLabelElement && el.attributes.for;
        }) && !path.some(function(el) {
          return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
        })) {
          return;
        }
        var now = Date.now();
        if (now - last <= delay) {
          detail++;
          if (detail === 2) {
            handler(makeDblclick(e));
          }
        } else {
          detail = 1;
        }
        last = now;
      }
      obj.addEventListener("click", simDblclick);
      return {
        dblclick: handler,
        simDblclick
      };
    }
    function removeDoubleTapListener(obj, handlers) {
      obj.removeEventListener("dblclick", handlers.dblclick);
      obj.removeEventListener("click", handlers.simDblclick);
    }
    var TRANSFORM = testProp(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    );
    var TRANSITION = testProp(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    );
    var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
    function get2(id) {
      return typeof id === "string" ? document.getElementById(id) : id;
    }
    function getStyle(el, style2) {
      var value = el.style[style2] || el.currentStyle && el.currentStyle[style2];
      if ((!value || value === "auto") && document.defaultView) {
        var css = document.defaultView.getComputedStyle(el, null);
        value = css ? css[style2] : null;
      }
      return value === "auto" ? null : value;
    }
    function create$1(tagName, className, container) {
      var el = document.createElement(tagName);
      el.className = className || "";
      if (container) {
        container.appendChild(el);
      }
      return el;
    }
    function remove(el) {
      var parent = el.parentNode;
      if (parent) {
        parent.removeChild(el);
      }
    }
    function empty(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
    function toFront(el) {
      var parent = el.parentNode;
      if (parent && parent.lastChild !== el) {
        parent.appendChild(el);
      }
    }
    function toBack(el) {
      var parent = el.parentNode;
      if (parent && parent.firstChild !== el) {
        parent.insertBefore(el, parent.firstChild);
      }
    }
    function hasClass(el, name) {
      if (el.classList !== void 0) {
        return el.classList.contains(name);
      }
      var className = getClass(el);
      return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
    }
    function addClass(el, name) {
      if (el.classList !== void 0) {
        var classes = splitWords(name);
        for (var i = 0, len = classes.length; i < len; i++) {
          el.classList.add(classes[i]);
        }
      } else if (!hasClass(el, name)) {
        var className = getClass(el);
        setClass(el, (className ? className + " " : "") + name);
      }
    }
    function removeClass(el, name) {
      if (el.classList !== void 0) {
        el.classList.remove(name);
      } else {
        setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
      }
    }
    function setClass(el, name) {
      if (el.className.baseVal === void 0) {
        el.className = name;
      } else {
        el.className.baseVal = name;
      }
    }
    function getClass(el) {
      if (el.correspondingElement) {
        el = el.correspondingElement;
      }
      return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
    }
    function setOpacity(el, value) {
      if ("opacity" in el.style) {
        el.style.opacity = value;
      } else if ("filter" in el.style) {
        _setOpacityIE(el, value);
      }
    }
    function _setOpacityIE(el, value) {
      var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
      try {
        filter = el.filters.item(filterName);
      } catch (e) {
        if (value === 1) {
          return;
        }
      }
      value = Math.round(value * 100);
      if (filter) {
        filter.Enabled = value !== 100;
        filter.Opacity = value;
      } else {
        el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
      }
    }
    function testProp(props) {
      var style2 = document.documentElement.style;
      for (var i = 0; i < props.length; i++) {
        if (props[i] in style2) {
          return props[i];
        }
      }
      return false;
    }
    function setTransform(el, offset, scale2) {
      var pos = offset || new Point(0, 0);
      el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
    }
    function setPosition(el, point) {
      el._leaflet_pos = point;
      if (Browser.any3d) {
        setTransform(el, point);
      } else {
        el.style.left = point.x + "px";
        el.style.top = point.y + "px";
      }
    }
    function getPosition(el) {
      return el._leaflet_pos || new Point(0, 0);
    }
    var disableTextSelection;
    var enableTextSelection;
    var _userSelect;
    if ("onselectstart" in document) {
      disableTextSelection = function() {
        on(window, "selectstart", preventDefault);
      };
      enableTextSelection = function() {
        off(window, "selectstart", preventDefault);
      };
    } else {
      var userSelectProperty = testProp(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      disableTextSelection = function() {
        if (userSelectProperty) {
          var style2 = document.documentElement.style;
          _userSelect = style2[userSelectProperty];
          style2[userSelectProperty] = "none";
        }
      };
      enableTextSelection = function() {
        if (userSelectProperty) {
          document.documentElement.style[userSelectProperty] = _userSelect;
          _userSelect = void 0;
        }
      };
    }
    function disableImageDrag() {
      on(window, "dragstart", preventDefault);
    }
    function enableImageDrag() {
      off(window, "dragstart", preventDefault);
    }
    var _outlineElement, _outlineStyle;
    function preventOutline(element) {
      while (element.tabIndex === -1) {
        element = element.parentNode;
      }
      if (!element.style) {
        return;
      }
      restoreOutline();
      _outlineElement = element;
      _outlineStyle = element.style.outlineStyle;
      element.style.outlineStyle = "none";
      on(window, "keydown", restoreOutline);
    }
    function restoreOutline() {
      if (!_outlineElement) {
        return;
      }
      _outlineElement.style.outlineStyle = _outlineStyle;
      _outlineElement = void 0;
      _outlineStyle = void 0;
      off(window, "keydown", restoreOutline);
    }
    function getSizedParentNode(element) {
      do {
        element = element.parentNode;
      } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
      return element;
    }
    function getScale(element) {
      var rect = element.getBoundingClientRect();
      return {
        x: rect.width / element.offsetWidth || 1,
        y: rect.height / element.offsetHeight || 1,
        boundingClientRect: rect
      };
    }
    var DomUtil = {
      __proto__: null,
      TRANSFORM,
      TRANSITION,
      TRANSITION_END,
      get: get2,
      getStyle,
      create: create$1,
      remove,
      empty,
      toFront,
      toBack,
      hasClass,
      addClass,
      removeClass,
      setClass,
      getClass,
      setOpacity,
      testProp,
      setTransform,
      setPosition,
      getPosition,
      get disableTextSelection() {
        return disableTextSelection;
      },
      get enableTextSelection() {
        return enableTextSelection;
      },
      disableImageDrag,
      enableImageDrag,
      preventOutline,
      restoreOutline,
      getSizedParentNode,
      getScale
    };
    function on(obj, types, fn, context) {
      if (types && typeof types === "object") {
        for (var type in types) {
          addOne(obj, type, types[type], fn);
        }
      } else {
        types = splitWords(types);
        for (var i = 0, len = types.length; i < len; i++) {
          addOne(obj, types[i], fn, context);
        }
      }
      return this;
    }
    var eventsKey = "_leaflet_events";
    function off(obj, types, fn, context) {
      if (arguments.length === 1) {
        batchRemove(obj);
        delete obj[eventsKey];
      } else if (types && typeof types === "object") {
        for (var type in types) {
          removeOne(obj, type, types[type], fn);
        }
      } else {
        types = splitWords(types);
        if (arguments.length === 2) {
          batchRemove(obj, function(type2) {
            return indexOf(types, type2) !== -1;
          });
        } else {
          for (var i = 0, len = types.length; i < len; i++) {
            removeOne(obj, types[i], fn, context);
          }
        }
      }
      return this;
    }
    function batchRemove(obj, filterFn) {
      for (var id in obj[eventsKey]) {
        var type = id.split(/\d/)[0];
        if (!filterFn || filterFn(type)) {
          removeOne(obj, type, null, null, id);
        }
      }
    }
    var mouseSubst = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function addOne(obj, type, fn, context) {
      var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
      if (obj[eventsKey] && obj[eventsKey][id]) {
        return this;
      }
      var handler = function(e) {
        return fn.call(context || obj, e || window.event);
      };
      var originalHandler = handler;
      if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
        handler = addPointerListener(obj, type, handler);
      } else if (Browser.touch && type === "dblclick") {
        handler = addDoubleTapListener(obj, handler);
      } else if ("addEventListener" in obj) {
        if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
          obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
        } else if (type === "mouseenter" || type === "mouseleave") {
          handler = function(e) {
            e = e || window.event;
            if (isExternalTarget(obj, e)) {
              originalHandler(e);
            }
          };
          obj.addEventListener(mouseSubst[type], handler, false);
        } else {
          obj.addEventListener(type, originalHandler, false);
        }
      } else {
        obj.attachEvent("on" + type, handler);
      }
      obj[eventsKey] = obj[eventsKey] || {};
      obj[eventsKey][id] = handler;
    }
    function removeOne(obj, type, fn, context, id) {
      id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
      var handler = obj[eventsKey] && obj[eventsKey][id];
      if (!handler) {
        return this;
      }
      if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
        removePointerListener(obj, type, handler);
      } else if (Browser.touch && type === "dblclick") {
        removeDoubleTapListener(obj, handler);
      } else if ("removeEventListener" in obj) {
        obj.removeEventListener(mouseSubst[type] || type, handler, false);
      } else {
        obj.detachEvent("on" + type, handler);
      }
      obj[eventsKey][id] = null;
    }
    function stopPropagation(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (e.originalEvent) {
        e.originalEvent._stopped = true;
      } else {
        e.cancelBubble = true;
      }
      return this;
    }
    function disableScrollPropagation(el) {
      addOne(el, "wheel", stopPropagation);
      return this;
    }
    function disableClickPropagation(el) {
      on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
      el["_leaflet_disable_click"] = true;
      return this;
    }
    function preventDefault(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      return this;
    }
    function stop(e) {
      preventDefault(e);
      stopPropagation(e);
      return this;
    }
    function getPropagationPath(ev) {
      if (ev.composedPath) {
        return ev.composedPath();
      }
      var path = [];
      var el = ev.target;
      while (el) {
        path.push(el);
        el = el.parentNode;
      }
      return path;
    }
    function getMousePosition(e, container) {
      if (!container) {
        return new Point(e.clientX, e.clientY);
      }
      var scale2 = getScale(container), offset = scale2.boundingClientRect;
      return new Point(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (e.clientX - offset.left) / scale2.x - container.clientLeft,
        (e.clientY - offset.top) / scale2.y - container.clientTop
      );
    }
    var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function getWheelDelta(e) {
      return Browser.edge ? e.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : (
          // Pixels
          e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
            // Lines
            e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
              // Pages
              e.deltaX || e.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                    // Legacy Moz lines
                    e.detail ? e.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function isExternalTarget(el, e) {
      var related = e.relatedTarget;
      if (!related) {
        return true;
      }
      try {
        while (related && related !== el) {
          related = related.parentNode;
        }
      } catch (err) {
        return false;
      }
      return related !== el;
    }
    var DomEvent = {
      __proto__: null,
      on,
      off,
      stopPropagation,
      disableScrollPropagation,
      disableClickPropagation,
      preventDefault,
      stop,
      getPropagationPath,
      getMousePosition,
      getWheelDelta,
      isExternalTarget,
      addListener: on,
      removeListener: off
    };
    var PosAnimation = Evented.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(el, newPos, duration, easeLinearity) {
        this.stop();
        this._el = el;
        this._inProgress = true;
        this._duration = duration || 0.25;
        this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
        this._startPos = getPosition(el);
        this._offset = newPos.subtract(this._startPos);
        this._startTime = +/* @__PURE__ */ new Date();
        this.fire("start");
        this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        if (!this._inProgress) {
          return;
        }
        this._step(true);
        this._complete();
      },
      _animate: function() {
        this._animId = requestAnimFrame(this._animate, this);
        this._step();
      },
      _step: function(round) {
        var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
        if (elapsed < duration) {
          this._runFrame(this._easeOut(elapsed / duration), round);
        } else {
          this._runFrame(1);
          this._complete();
        }
      },
      _runFrame: function(progress, round) {
        var pos = this._startPos.add(this._offset.multiplyBy(progress));
        if (round) {
          pos._round();
        }
        setPosition(this._el, pos);
        this.fire("step");
      },
      _complete: function() {
        cancelAnimFrame(this._animId);
        this._inProgress = false;
        this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    });
    var Map = Evented.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: EPSG3857,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: true,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: true,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: true,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: true
      },
      initialize: function(id, options) {
        options = setOptions(this, options);
        this._handlers = [];
        this._layers = {};
        this._zoomBoundLayers = {};
        this._sizeChanged = true;
        this._initContainer(id);
        this._initLayout();
        this._onResize = bind(this._onResize, this);
        this._initEvents();
        if (options.maxBounds) {
          this.setMaxBounds(options.maxBounds);
        }
        if (options.zoom !== void 0) {
          this._zoom = this._limitZoom(options.zoom);
        }
        if (options.center && options.zoom !== void 0) {
          this.setView(toLatLng(options.center), options.zoom, { reset: true });
        }
        this.callInitHooks();
        this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
        if (this._zoomAnimated) {
          this._createAnimProxy();
          on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
        }
        this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(center, zoom2, options) {
        zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
        center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
        options = options || {};
        this._stop();
        if (this._loaded && !options.reset && options !== true) {
          if (options.animate !== void 0) {
            options.zoom = extend({ animate: options.animate }, options.zoom);
            options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
          }
          var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
          if (moved) {
            clearTimeout(this._sizeTimer);
            return this;
          }
        }
        this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
        return this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(zoom2, options) {
        if (!this._loaded) {
          this._zoom = zoom2;
          return this;
        }
        return this.setView(this.getCenter(), zoom2, { zoom: options });
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(delta, options) {
        delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
        return this.setZoom(this._zoom + delta, options);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(delta, options) {
        delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
        return this.setZoom(this._zoom - delta, options);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(latlng, zoom2, options) {
        var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
        return this.setView(newCenter, zoom2, { zoom: options });
      },
      _getBoundsCenterZoom: function(bounds, options) {
        options = options || {};
        bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
        var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
        zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
        if (zoom2 === Infinity) {
          return {
            center: bounds.getCenter(),
            zoom: zoom2
          };
        }
        var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
        return {
          center,
          zoom: zoom2
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(bounds, options) {
        bounds = toLatLngBounds(bounds);
        if (!bounds.isValid()) {
          throw new Error("Bounds are not valid.");
        }
        var target = this._getBoundsCenterZoom(bounds, options);
        return this.setView(target.center, target.zoom, options);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(options) {
        return this.fitBounds([[-90, -180], [90, 180]], options);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(center, options) {
        return this.setView(center, this._zoom, { pan: options });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(offset, options) {
        offset = toPoint(offset).round();
        options = options || {};
        if (!offset.x && !offset.y) {
          return this.fire("moveend");
        }
        if (options.animate !== true && !this.getSize().contains(offset)) {
          this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
          return this;
        }
        if (!this._panAnim) {
          this._panAnim = new PosAnimation();
          this._panAnim.on({
            "step": this._onPanTransitionStep,
            "end": this._onPanTransitionEnd
          }, this);
        }
        if (!options.noMoveStart) {
          this.fire("movestart");
        }
        if (options.animate !== false) {
          addClass(this._mapPane, "leaflet-pan-anim");
          var newPos = this._getMapPanePos().subtract(offset).round();
          this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
        } else {
          this._rawPanBy(offset);
          this.fire("move").fire("moveend");
        }
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(targetCenter, targetZoom, options) {
        options = options || {};
        if (options.animate === false || !Browser.any3d) {
          return this.setView(targetCenter, targetZoom, options);
        }
        this._stop();
        var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
        targetCenter = toLatLng(targetCenter);
        targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
        var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
        function r(i) {
          var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
          var log = sq < 1e-9 ? -18 : Math.log(sq);
          return log;
        }
        function sinh(n) {
          return (Math.exp(n) - Math.exp(-n)) / 2;
        }
        function cosh(n) {
          return (Math.exp(n) + Math.exp(-n)) / 2;
        }
        function tanh(n) {
          return sinh(n) / cosh(n);
        }
        var r0 = r(0);
        function w(s) {
          return w0 * (cosh(r0) / cosh(r0 + rho * s));
        }
        function u(s) {
          return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
        }
        function easeOut(t) {
          return 1 - Math.pow(1 - t, 1.5);
        }
        var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
        function frame() {
          var t = (Date.now() - start) / duration, s = easeOut(t) * S;
          if (t <= 1) {
            this._flyToFrame = requestAnimFrame(frame, this);
            this._move(
              this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
              this.getScaleZoom(w0 / w(s), startZoom),
              { flyTo: true }
            );
          } else {
            this._move(targetCenter, targetZoom)._moveEnd(true);
          }
        }
        this._moveStart(true, options.noMoveStart);
        frame.call(this);
        return this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(bounds, options) {
        var target = this._getBoundsCenterZoom(bounds, options);
        return this.flyTo(target.center, target.zoom, options);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(bounds) {
        bounds = toLatLngBounds(bounds);
        if (this.listens("moveend", this._panInsideMaxBounds)) {
          this.off("moveend", this._panInsideMaxBounds);
        }
        if (!bounds.isValid()) {
          this.options.maxBounds = null;
          return this;
        }
        this.options.maxBounds = bounds;
        if (this._loaded) {
          this._panInsideMaxBounds();
        }
        return this.on("moveend", this._panInsideMaxBounds);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(zoom2) {
        var oldZoom = this.options.minZoom;
        this.options.minZoom = zoom2;
        if (this._loaded && oldZoom !== zoom2) {
          this.fire("zoomlevelschange");
          if (this.getZoom() < this.options.minZoom) {
            return this.setZoom(zoom2);
          }
        }
        return this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(zoom2) {
        var oldZoom = this.options.maxZoom;
        this.options.maxZoom = zoom2;
        if (this._loaded && oldZoom !== zoom2) {
          this.fire("zoomlevelschange");
          if (this.getZoom() > this.options.maxZoom) {
            return this.setZoom(zoom2);
          }
        }
        return this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(bounds, options) {
        this._enforcingBounds = true;
        var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
        if (!center.equals(newCenter)) {
          this.panTo(newCenter, options);
        }
        this._enforcingBounds = false;
        return this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(latlng, options) {
        options = options || {};
        var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
        if (!paddedBounds.contains(pixelPoint)) {
          this._enforcingBounds = true;
          var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
          var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
          pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
          pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
          this.panTo(this.unproject(pixelCenter), options);
          this._enforcingBounds = false;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(options) {
        if (!this._loaded) {
          return this;
        }
        options = extend({
          animate: false,
          pan: true
        }, options === true ? { animate: true } : options);
        var oldSize = this.getSize();
        this._sizeChanged = true;
        this._lastCenter = null;
        var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
        if (!offset.x && !offset.y) {
          return this;
        }
        if (options.animate && options.pan) {
          this.panBy(offset);
        } else {
          if (options.pan) {
            this._rawPanBy(offset);
          }
          this.fire("move");
          if (options.debounceMoveend) {
            clearTimeout(this._sizeTimer);
            this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
          } else {
            this.fire("moveend");
          }
        }
        return this.fire("resize", {
          oldSize,
          newSize
        });
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        this.setZoom(this._limitZoom(this._zoom));
        if (!this.options.zoomSnap) {
          this.fire("viewreset");
        }
        return this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(options) {
        options = this._locateOptions = extend({
          timeout: 1e4,
          watch: false
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, options);
        if (!("geolocation" in navigator)) {
          this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          });
          return this;
        }
        var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
        if (options.watch) {
          this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
        } else {
          navigator.geolocation.getCurrentPosition(onResponse, onError, options);
        }
        return this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        if (navigator.geolocation && navigator.geolocation.clearWatch) {
          navigator.geolocation.clearWatch(this._locationWatchId);
        }
        if (this._locateOptions) {
          this._locateOptions.setView = false;
        }
        return this;
      },
      _handleGeolocationError: function(error) {
        if (!this._container._leaflet_id) {
          return;
        }
        var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
        if (this._locateOptions.setView && !this._loaded) {
          this.fitWorld();
        }
        this.fire("locationerror", {
          code: c,
          message: "Geolocation error: " + message + "."
        });
      },
      _handleGeolocationResponse: function(pos) {
        if (!this._container._leaflet_id) {
          return;
        }
        var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
        if (options.setView) {
          var zoom2 = this.getBoundsZoom(bounds);
          this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
        }
        var data = {
          latlng,
          bounds,
          timestamp: pos.timestamp
        };
        for (var i in pos.coords) {
          if (typeof pos.coords[i] === "number") {
            data[i] = pos.coords[i];
          }
        }
        this.fire("locationfound", data);
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(name, HandlerClass) {
        if (!HandlerClass) {
          return this;
        }
        var handler = this[name] = new HandlerClass(this);
        this._handlers.push(handler);
        if (this.options[name]) {
          handler.enable();
        }
        return this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        this._initEvents(true);
        if (this.options.maxBounds) {
          this.off("moveend", this._panInsideMaxBounds);
        }
        if (this._containerId !== this._container._leaflet_id) {
          throw new Error("Map container is being reused by another instance");
        }
        try {
          delete this._container._leaflet_id;
          delete this._containerId;
        } catch (e) {
          this._container._leaflet_id = void 0;
          this._containerId = void 0;
        }
        if (this._locationWatchId !== void 0) {
          this.stopLocate();
        }
        this._stop();
        remove(this._mapPane);
        if (this._clearControlPos) {
          this._clearControlPos();
        }
        if (this._resizeRequest) {
          cancelAnimFrame(this._resizeRequest);
          this._resizeRequest = null;
        }
        this._clearHandlers();
        if (this._loaded) {
          this.fire("unload");
        }
        var i;
        for (i in this._layers) {
          this._layers[i].remove();
        }
        for (i in this._panes) {
          remove(this._panes[i]);
        }
        this._layers = [];
        this._panes = [];
        delete this._mapPane;
        delete this._renderer;
        return this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(name, container) {
        var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
        if (name) {
          this._panes[name] = pane;
        }
        return pane;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        this._checkIfLoaded();
        if (this._lastCenter && !this._moved()) {
          return this._lastCenter.clone();
        }
        return this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
        return new LatLngBounds(sw, ne);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(bounds, inside, padding) {
        bounds = toLatLngBounds(bounds);
        padding = toPoint(padding || [0, 0]);
        var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
        zoom2 = this.getScaleZoom(scale2, zoom2);
        if (snap) {
          zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
          zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
        }
        return Math.max(min, Math.min(max, zoom2));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        if (!this._size || this._sizeChanged) {
          this._size = new Point(
            this._container.clientWidth || 0,
            this._container.clientHeight || 0
          );
          this._sizeChanged = false;
        }
        return this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(center, zoom2) {
        var topLeftPoint = this._getTopLeftPoint(center, zoom2);
        return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        this._checkIfLoaded();
        return this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(zoom2) {
        return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(pane) {
        return typeof pane === "string" ? this._panes[pane] : pane;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(toZoom, fromZoom) {
        var crs = this.options.crs;
        fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
        return crs.scale(toZoom) / crs.scale(fromZoom);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(scale2, fromZoom) {
        var crs = this.options.crs;
        fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
        var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
        return isNaN(zoom2) ? Infinity : zoom2;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(latlng, zoom2) {
        zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
        return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(point, zoom2) {
        zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
        return this.options.crs.pointToLatLng(toPoint(point), zoom2);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(point) {
        var projectedPoint = toPoint(point).add(this.getPixelOrigin());
        return this.unproject(projectedPoint);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(latlng) {
        var projectedPoint = this.project(toLatLng(latlng))._round();
        return projectedPoint._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(latlng) {
        return this.options.crs.wrapLatLng(toLatLng(latlng));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(latlng) {
        return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(latlng1, latlng2) {
        return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(point) {
        return toPoint(point).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(point) {
        return toPoint(point).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(point) {
        var layerPoint = this.containerPointToLayerPoint(toPoint(point));
        return this.layerPointToLatLng(layerPoint);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(latlng) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(e) {
        return getMousePosition(e, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(e) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(e) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
      },
      // map initialization methods
      _initContainer: function(id) {
        var container = this._container = get2(id);
        if (!container) {
          throw new Error("Map container not found.");
        } else if (container._leaflet_id) {
          throw new Error("Map container is already initialized.");
        }
        on(container, "scroll", this._onScroll, this);
        this._containerId = stamp(container);
      },
      _initLayout: function() {
        var container = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
        addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var position = getStyle(container, "position");
        if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
          container.style.position = "relative";
        }
        this._initPanes();
        if (this._initControlPos) {
          this._initControlPos();
        }
      },
      _initPanes: function() {
        var panes = this._panes = {};
        this._paneRenderers = {};
        this._mapPane = this.createPane("mapPane", this._container);
        setPosition(this._mapPane, new Point(0, 0));
        this.createPane("tilePane");
        this.createPane("overlayPane");
        this.createPane("shadowPane");
        this.createPane("markerPane");
        this.createPane("tooltipPane");
        this.createPane("popupPane");
        if (!this.options.markerZoomAnimation) {
          addClass(panes.markerPane, "leaflet-zoom-hide");
          addClass(panes.shadowPane, "leaflet-zoom-hide");
        }
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(center, zoom2, noMoveStart) {
        setPosition(this._mapPane, new Point(0, 0));
        var loading = !this._loaded;
        this._loaded = true;
        zoom2 = this._limitZoom(zoom2);
        this.fire("viewprereset");
        var zoomChanged = this._zoom !== zoom2;
        this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
        this.fire("viewreset");
        if (loading) {
          this.fire("load");
        }
      },
      _moveStart: function(zoomChanged, noMoveStart) {
        if (zoomChanged) {
          this.fire("zoomstart");
        }
        if (!noMoveStart) {
          this.fire("movestart");
        }
        return this;
      },
      _move: function(center, zoom2, data, supressEvent) {
        if (zoom2 === void 0) {
          zoom2 = this._zoom;
        }
        var zoomChanged = this._zoom !== zoom2;
        this._zoom = zoom2;
        this._lastCenter = center;
        this._pixelOrigin = this._getNewPixelOrigin(center);
        if (!supressEvent) {
          if (zoomChanged || data && data.pinch) {
            this.fire("zoom", data);
          }
          this.fire("move", data);
        } else if (data && data.pinch) {
          this.fire("zoom", data);
        }
        return this;
      },
      _moveEnd: function(zoomChanged) {
        if (zoomChanged) {
          this.fire("zoomend");
        }
        return this.fire("moveend");
      },
      _stop: function() {
        cancelAnimFrame(this._flyToFrame);
        if (this._panAnim) {
          this._panAnim.stop();
        }
        return this;
      },
      _rawPanBy: function(offset) {
        setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        if (!this._enforcingBounds) {
          this.panInsideBounds(this.options.maxBounds);
        }
      },
      _checkIfLoaded: function() {
        if (!this._loaded) {
          throw new Error("Set map center and zoom first.");
        }
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(remove2) {
        this._targets = {};
        this._targets[stamp(this._container)] = this;
        var onOff = remove2 ? off : on;
        onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
        if (this.options.trackResize) {
          onOff(window, "resize", this._onResize, this);
        }
        if (Browser.any3d && this.options.transform3DLimit) {
          (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        }
      },
      _onResize: function() {
        cancelAnimFrame(this._resizeRequest);
        this._resizeRequest = requestAnimFrame(
          function() {
            this.invalidateSize({ debounceMoveend: true });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0;
        this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var pos = this._getMapPanePos();
        if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
          this._resetView(this.getCenter(), this.getZoom());
        }
      },
      _findEventTargets: function(e, type) {
        var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
        while (src) {
          target = this._targets[stamp(src)];
          if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
            dragging = true;
            break;
          }
          if (target && target.listens(type, true)) {
            if (isHover && !isExternalTarget(src, e)) {
              break;
            }
            targets.push(target);
            if (isHover) {
              break;
            }
          }
          if (src === this._container) {
            break;
          }
          src = src.parentNode;
        }
        if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
          targets = [this];
        }
        return targets;
      },
      _isClickDisabled: function(el) {
        while (el && el !== this._container) {
          if (el["_leaflet_disable_click"]) {
            return true;
          }
          el = el.parentNode;
        }
      },
      _handleDOMEvent: function(e) {
        var el = e.target || e.srcElement;
        if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
          return;
        }
        var type = e.type;
        if (type === "mousedown") {
          preventOutline(el);
        }
        this._fireDOMEvent(e, type);
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(e, type, canvasTargets) {
        if (e.type === "click") {
          var synth = extend({}, e);
          synth.type = "preclick";
          this._fireDOMEvent(synth, synth.type, canvasTargets);
        }
        var targets = this._findEventTargets(e, type);
        if (canvasTargets) {
          var filtered = [];
          for (var i = 0; i < canvasTargets.length; i++) {
            if (canvasTargets[i].listens(type, true)) {
              filtered.push(canvasTargets[i]);
            }
          }
          targets = filtered.concat(targets);
        }
        if (!targets.length) {
          return;
        }
        if (type === "contextmenu") {
          preventDefault(e);
        }
        var target = targets[0];
        var data = {
          originalEvent: e
        };
        if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
          var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
          data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
          data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
          data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
        }
        for (i = 0; i < targets.length; i++) {
          targets[i].fire(type, data, true);
          if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
            return;
          }
        }
      },
      _draggableMoved: function(obj) {
        obj = obj.dragging && obj.dragging.enabled() ? obj : this;
        return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var i = 0, len = this._handlers.length; i < len; i++) {
          this._handlers[i].disable();
        }
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(callback, context) {
        if (this._loaded) {
          callback.call(context || this, { target: this });
        } else {
          this.on("load", callback, context);
        }
        return this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return getPosition(this._mapPane) || new Point(0, 0);
      },
      _moved: function() {
        var pos = this._getMapPanePos();
        return pos && !pos.equals([0, 0]);
      },
      _getTopLeftPoint: function(center, zoom2) {
        var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
        return pixelOrigin.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(center, zoom2) {
        var viewHalf = this.getSize()._divideBy(2);
        return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(latlng, zoom2, center) {
        var topLeft = this._getNewPixelOrigin(center, zoom2);
        return this.project(latlng, zoom2)._subtract(topLeft);
      },
      _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
        var topLeft = this._getNewPixelOrigin(center, zoom2);
        return toBounds([
          this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
          this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
          this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
          this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(latlng) {
        return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(center, zoom2, bounds) {
        if (!bounds) {
          return center;
        }
        var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
        if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
          return center;
        }
        return this.unproject(centerPoint.add(offset), zoom2);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(offset, bounds) {
        if (!bounds) {
          return offset;
        }
        var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
        return offset.add(this._getBoundsOffset(newBounds, bounds));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
        var projectedMaxBounds = toBounds(
          this.project(maxBounds.getNorthEast(), zoom2),
          this.project(maxBounds.getSouthWest(), zoom2)
        ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
        return new Point(dx, dy);
      },
      _rebound: function(left, right) {
        return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
      },
      _limitZoom: function(zoom2) {
        var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
        if (snap) {
          zoom2 = Math.round(zoom2 / snap) * snap;
        }
        return Math.max(min, Math.min(max, zoom2));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        removeClass(this._mapPane, "leaflet-pan-anim");
        this.fire("moveend");
      },
      _tryAnimatedPan: function(center, options) {
        var offset = this._getCenterOffset(center)._trunc();
        if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
          return false;
        }
        this.panBy(offset, options);
        return true;
      },
      _createAnimProxy: function() {
        var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(proxy);
        this.on("zoomanim", function(e) {
          var prop = TRANSFORM, transform = this._proxy.style[prop];
          setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
          if (transform === this._proxy.style[prop] && this._animatingZoom) {
            this._onZoomTransitionEnd();
          }
        }, this);
        this.on("load moveend", this._animMoveEnd, this);
        this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        remove(this._proxy);
        this.off("load moveend", this._animMoveEnd, this);
        delete this._proxy;
      },
      _animMoveEnd: function() {
        var c = this.getCenter(), z = this.getZoom();
        setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
      },
      _catchTransitionEnd: function(e) {
        if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
          this._onZoomTransitionEnd();
        }
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(center, zoom2, options) {
        if (this._animatingZoom) {
          return true;
        }
        options = options || {};
        if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
          return false;
        }
        var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
        if (options.animate !== true && !this.getSize().contains(offset)) {
          return false;
        }
        requestAnimFrame(function() {
          this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
        }, this);
        return true;
      },
      _animateZoom: function(center, zoom2, startAnim, noUpdate) {
        if (!this._mapPane) {
          return;
        }
        if (startAnim) {
          this._animatingZoom = true;
          this._animateToCenter = center;
          this._animateToZoom = zoom2;
          addClass(this._mapPane, "leaflet-zoom-anim");
        }
        this.fire("zoomanim", {
          center,
          zoom: zoom2,
          noUpdate
        });
        if (!this._tempFireZoomEvent) {
          this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
        }
        this._move(this._animateToCenter, this._animateToZoom, void 0, true);
        setTimeout(bind(this._onZoomTransitionEnd, this), 250);
      },
      _onZoomTransitionEnd: function() {
        if (!this._animatingZoom) {
          return;
        }
        if (this._mapPane) {
          removeClass(this._mapPane, "leaflet-zoom-anim");
        }
        this._animatingZoom = false;
        this._move(this._animateToCenter, this._animateToZoom, void 0, true);
        if (this._tempFireZoomEvent) {
          this.fire("zoom");
        }
        delete this._tempFireZoomEvent;
        this.fire("move");
        this._moveEnd(true);
      }
    });
    function createMap(id, options) {
      return new Map(id, options);
    }
    var Control = Class.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(options) {
        setOptions(this, options);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(position) {
        var map = this._map;
        if (map) {
          map.removeControl(this);
        }
        this.options.position = position;
        if (map) {
          map.addControl(this);
        }
        return this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(map) {
        this.remove();
        this._map = map;
        var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
        addClass(container, "leaflet-control");
        if (pos.indexOf("bottom") !== -1) {
          corner.insertBefore(container, corner.firstChild);
        } else {
          corner.appendChild(container);
        }
        this._map.on("unload", this.remove, this);
        return this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        if (!this._map) {
          return this;
        }
        remove(this._container);
        if (this.onRemove) {
          this.onRemove(this._map);
        }
        this._map.off("unload", this.remove, this);
        this._map = null;
        return this;
      },
      _refocusOnMap: function(e) {
        if (this._map && e && e.screenX > 0 && e.screenY > 0) {
          this._map.getContainer().focus();
        }
      }
    });
    var control = function(options) {
      return new Control(options);
    };
    Map.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(control2) {
        control2.addTo(this);
        return this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(control2) {
        control2.remove();
        return this;
      },
      _initControlPos: function() {
        var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
        function createCorner(vSide, hSide) {
          var className = l + vSide + " " + l + hSide;
          corners[vSide + hSide] = create$1("div", className, container);
        }
        createCorner("top", "left");
        createCorner("top", "right");
        createCorner("bottom", "left");
        createCorner("bottom", "right");
      },
      _clearControlPos: function() {
        for (var i in this._controlCorners) {
          remove(this._controlCorners[i]);
        }
        remove(this._controlContainer);
        delete this._controlCorners;
        delete this._controlContainer;
      }
    });
    var Layers = Control.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: true,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: true,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: false,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: false,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(layerA, layerB, nameA, nameB) {
          return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
        }
      },
      initialize: function(baseLayers, overlays, options) {
        setOptions(this, options);
        this._layerControlInputs = [];
        this._layers = [];
        this._lastZIndex = 0;
        this._handlingClick = false;
        this._preventClick = false;
        for (var i in baseLayers) {
          this._addLayer(baseLayers[i], i);
        }
        for (i in overlays) {
          this._addLayer(overlays[i], i, true);
        }
      },
      onAdd: function(map) {
        this._initLayout();
        this._update();
        this._map = map;
        map.on("zoomend", this._checkDisabledLayers, this);
        for (var i = 0; i < this._layers.length; i++) {
          this._layers[i].layer.on("add remove", this._onLayerChange, this);
        }
        return this._container;
      },
      addTo: function(map) {
        Control.prototype.addTo.call(this, map);
        return this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var i = 0; i < this._layers.length; i++) {
          this._layers[i].layer.off("add remove", this._onLayerChange, this);
        }
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(layer, name) {
        this._addLayer(layer, name);
        return this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(layer, name) {
        this._addLayer(layer, name, true);
        return this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(layer) {
        layer.off("add remove", this._onLayerChange, this);
        var obj = this._getLayer(stamp(layer));
        if (obj) {
          this._layers.splice(this._layers.indexOf(obj), 1);
        }
        return this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        addClass(this._container, "leaflet-control-layers-expanded");
        this._section.style.height = null;
        var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
        if (acceptableHeight < this._section.clientHeight) {
          addClass(this._section, "leaflet-control-layers-scrollbar");
          this._section.style.height = acceptableHeight + "px";
        } else {
          removeClass(this._section, "leaflet-control-layers-scrollbar");
        }
        this._checkDisabledLayers();
        return this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        removeClass(this._container, "leaflet-control-layers-expanded");
        return this;
      },
      _initLayout: function() {
        var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
        container.setAttribute("aria-haspopup", true);
        disableClickPropagation(container);
        disableScrollPropagation(container);
        var section = this._section = create$1("section", className + "-list");
        if (collapsed) {
          this._map.on("click", this.collapse, this);
          on(container, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this);
        }
        var link = this._layersLink = create$1("a", className + "-toggle", container);
        link.href = "#";
        link.title = "Layers";
        link.setAttribute("role", "button");
        on(link, {
          keydown: function(e) {
            if (e.keyCode === 13) {
              this._expandSafely();
            }
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(e) {
            preventDefault(e);
            this._expandSafely();
          }
        }, this);
        if (!collapsed) {
          this.expand();
        }
        this._baseLayersList = create$1("div", className + "-base", section);
        this._separator = create$1("div", className + "-separator", section);
        this._overlaysList = create$1("div", className + "-overlays", section);
        container.appendChild(section);
      },
      _getLayer: function(id) {
        for (var i = 0; i < this._layers.length; i++) {
          if (this._layers[i] && stamp(this._layers[i].layer) === id) {
            return this._layers[i];
          }
        }
      },
      _addLayer: function(layer, name, overlay) {
        if (this._map) {
          layer.on("add remove", this._onLayerChange, this);
        }
        this._layers.push({
          layer,
          name,
          overlay
        });
        if (this.options.sortLayers) {
          this._layers.sort(bind(function(a, b) {
            return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
          }, this));
        }
        if (this.options.autoZIndex && layer.setZIndex) {
          this._lastZIndex++;
          layer.setZIndex(this._lastZIndex);
        }
        this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container) {
          return this;
        }
        empty(this._baseLayersList);
        empty(this._overlaysList);
        this._layerControlInputs = [];
        var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
        for (i = 0; i < this._layers.length; i++) {
          obj = this._layers[i];
          this._addItem(obj);
          overlaysPresent = overlaysPresent || obj.overlay;
          baseLayersPresent = baseLayersPresent || !obj.overlay;
          baseLayersCount += !obj.overlay ? 1 : 0;
        }
        if (this.options.hideSingleBase) {
          baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
          this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
        }
        this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
        return this;
      },
      _onLayerChange: function(e) {
        if (!this._handlingClick) {
          this._update();
        }
        var obj = this._getLayer(stamp(e.target));
        var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
        if (type) {
          this._map.fire(type, obj);
        }
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(name, checked) {
        var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
        var radioFragment = document.createElement("div");
        radioFragment.innerHTML = radioHtml;
        return radioFragment.firstChild;
      },
      _addItem: function(obj) {
        var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
        if (obj.overlay) {
          input = document.createElement("input");
          input.type = "checkbox";
          input.className = "leaflet-control-layers-selector";
          input.defaultChecked = checked;
        } else {
          input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
        }
        this._layerControlInputs.push(input);
        input.layerId = stamp(obj.layer);
        on(input, "click", this._onInputClick, this);
        var name = document.createElement("span");
        name.innerHTML = " " + obj.name;
        var holder = document.createElement("span");
        label.appendChild(holder);
        holder.appendChild(input);
        holder.appendChild(name);
        var container = obj.overlay ? this._overlaysList : this._baseLayersList;
        container.appendChild(label);
        this._checkDisabledLayers();
        return label;
      },
      _onInputClick: function() {
        if (this._preventClick) {
          return;
        }
        var inputs = this._layerControlInputs, input, layer;
        var addedLayers = [], removedLayers = [];
        this._handlingClick = true;
        for (var i = inputs.length - 1; i >= 0; i--) {
          input = inputs[i];
          layer = this._getLayer(input.layerId).layer;
          if (input.checked) {
            addedLayers.push(layer);
          } else if (!input.checked) {
            removedLayers.push(layer);
          }
        }
        for (i = 0; i < removedLayers.length; i++) {
          if (this._map.hasLayer(removedLayers[i])) {
            this._map.removeLayer(removedLayers[i]);
          }
        }
        for (i = 0; i < addedLayers.length; i++) {
          if (!this._map.hasLayer(addedLayers[i])) {
            this._map.addLayer(addedLayers[i]);
          }
        }
        this._handlingClick = false;
        this._refocusOnMap();
      },
      _checkDisabledLayers: function() {
        var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
        for (var i = inputs.length - 1; i >= 0; i--) {
          input = inputs[i];
          layer = this._getLayer(input.layerId).layer;
          input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
        }
      },
      _expandIfNotCollapsed: function() {
        if (this._map && !this.options.collapsed) {
          this.expand();
        }
        return this;
      },
      _expandSafely: function() {
        var section = this._section;
        this._preventClick = true;
        on(section, "click", preventDefault);
        this.expand();
        var that = this;
        setTimeout(function() {
          off(section, "click", preventDefault);
          that._preventClick = false;
        });
      }
    });
    var layers = function(baseLayers, overlays, options) {
      return new Layers(baseLayers, overlays, options);
    };
    var Zoom = Control.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(map) {
        var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
        this._zoomInButton = this._createButton(
          options.zoomInText,
          options.zoomInTitle,
          zoomName + "-in",
          container,
          this._zoomIn
        );
        this._zoomOutButton = this._createButton(
          options.zoomOutText,
          options.zoomOutTitle,
          zoomName + "-out",
          container,
          this._zoomOut
        );
        this._updateDisabled();
        map.on("zoomend zoomlevelschange", this._updateDisabled, this);
        return container;
      },
      onRemove: function(map) {
        map.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        this._disabled = true;
        this._updateDisabled();
        return this;
      },
      enable: function() {
        this._disabled = false;
        this._updateDisabled();
        return this;
      },
      _zoomIn: function(e) {
        if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
          this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
        }
      },
      _zoomOut: function(e) {
        if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
          this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
        }
      },
      _createButton: function(html, title, className, container, fn) {
        var link = create$1("a", className, container);
        link.innerHTML = html;
        link.href = "#";
        link.title = title;
        link.setAttribute("role", "button");
        link.setAttribute("aria-label", title);
        disableClickPropagation(link);
        on(link, "click", stop);
        on(link, "click", fn, this);
        on(link, "click", this._refocusOnMap, this);
        return link;
      },
      _updateDisabled: function() {
        var map = this._map, className = "leaflet-disabled";
        removeClass(this._zoomInButton, className);
        removeClass(this._zoomOutButton, className);
        this._zoomInButton.setAttribute("aria-disabled", "false");
        this._zoomOutButton.setAttribute("aria-disabled", "false");
        if (this._disabled || map._zoom === map.getMinZoom()) {
          addClass(this._zoomOutButton, className);
          this._zoomOutButton.setAttribute("aria-disabled", "true");
        }
        if (this._disabled || map._zoom === map.getMaxZoom()) {
          addClass(this._zoomInButton, className);
          this._zoomInButton.setAttribute("aria-disabled", "true");
        }
      }
    });
    Map.mergeOptions({
      zoomControl: true
    });
    Map.addInitHook(function() {
      if (this.options.zoomControl) {
        this.zoomControl = new Zoom();
        this.addControl(this.zoomControl);
      }
    });
    var zoom = function(options) {
      return new Zoom(options);
    };
    var Scale = Control.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: true,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: true
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(map) {
        var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
        this._addScales(options, className + "-line", container);
        map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
        map.whenReady(this._update, this);
        return container;
      },
      onRemove: function(map) {
        map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(options, className, container) {
        if (options.metric) {
          this._mScale = create$1("div", className, container);
        }
        if (options.imperial) {
          this._iScale = create$1("div", className, container);
        }
      },
      _update: function() {
        var map = this._map, y = map.getSize().y / 2;
        var maxMeters = map.distance(
          map.containerPointToLatLng([0, y]),
          map.containerPointToLatLng([this.options.maxWidth, y])
        );
        this._updateScales(maxMeters);
      },
      _updateScales: function(maxMeters) {
        if (this.options.metric && maxMeters) {
          this._updateMetric(maxMeters);
        }
        if (this.options.imperial && maxMeters) {
          this._updateImperial(maxMeters);
        }
      },
      _updateMetric: function(maxMeters) {
        var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
        this._updateScale(this._mScale, label, meters / maxMeters);
      },
      _updateImperial: function(maxMeters) {
        var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
        if (maxFeet > 5280) {
          maxMiles = maxFeet / 5280;
          miles = this._getRoundNum(maxMiles);
          this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
        } else {
          feet = this._getRoundNum(maxFeet);
          this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
        }
      },
      _updateScale: function(scale2, text, ratio) {
        scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
        scale2.innerHTML = text;
      },
      _getRoundNum: function(num) {
        var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
        return pow10 * d;
      }
    });
    var scale = function(options) {
      return new Scale(options);
    };
    var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
    var Attribution = Control.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
      },
      initialize: function(options) {
        setOptions(this, options);
        this._attributions = {};
      },
      onAdd: function(map) {
        map.attributionControl = this;
        this._container = create$1("div", "leaflet-control-attribution");
        disableClickPropagation(this._container);
        for (var i in map._layers) {
          if (map._layers[i].getAttribution) {
            this.addAttribution(map._layers[i].getAttribution());
          }
        }
        this._update();
        map.on("layeradd", this._addAttribution, this);
        return this._container;
      },
      onRemove: function(map) {
        map.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(ev) {
        if (ev.layer.getAttribution) {
          this.addAttribution(ev.layer.getAttribution());
          ev.layer.once("remove", function() {
            this.removeAttribution(ev.layer.getAttribution());
          }, this);
        }
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(prefix) {
        this.options.prefix = prefix;
        this._update();
        return this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(text) {
        if (!text) {
          return this;
        }
        if (!this._attributions[text]) {
          this._attributions[text] = 0;
        }
        this._attributions[text]++;
        this._update();
        return this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(text) {
        if (!text) {
          return this;
        }
        if (this._attributions[text]) {
          this._attributions[text]--;
          this._update();
        }
        return this;
      },
      _update: function() {
        if (!this._map) {
          return;
        }
        var attribs = [];
        for (var i in this._attributions) {
          if (this._attributions[i]) {
            attribs.push(i);
          }
        }
        var prefixAndAttribs = [];
        if (this.options.prefix) {
          prefixAndAttribs.push(this.options.prefix);
        }
        if (attribs.length) {
          prefixAndAttribs.push(attribs.join(", "));
        }
        this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
      }
    });
    Map.mergeOptions({
      attributionControl: true
    });
    Map.addInitHook(function() {
      if (this.options.attributionControl) {
        new Attribution().addTo(this);
      }
    });
    var attribution = function(options) {
      return new Attribution(options);
    };
    Control.Layers = Layers;
    Control.Zoom = Zoom;
    Control.Scale = Scale;
    Control.Attribution = Attribution;
    control.layers = layers;
    control.zoom = zoom;
    control.scale = scale;
    control.attribution = attribution;
    var Handler = Class.extend({
      initialize: function(map) {
        this._map = map;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        if (this._enabled) {
          return this;
        }
        this._enabled = true;
        this.addHooks();
        return this;
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        if (!this._enabled) {
          return this;
        }
        this._enabled = false;
        this.removeHooks();
        return this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    Handler.addTo = function(map, name) {
      map.addHandler(name, this);
      return this;
    };
    var Mixin = { Events };
    var START = Browser.touch ? "touchstart mousedown" : "mousedown";
    var Draggable = Evented.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(element, dragStartTarget, preventOutline2, options) {
        setOptions(this, options);
        this._element = element;
        this._dragStartTarget = dragStartTarget || element;
        this._preventOutline = preventOutline2;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        if (this._enabled) {
          return;
        }
        on(this._dragStartTarget, START, this._onDown, this);
        this._enabled = true;
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        if (!this._enabled) {
          return;
        }
        if (Draggable._dragging === this) {
          this.finishDrag(true);
        }
        off(this._dragStartTarget, START, this._onDown, this);
        this._enabled = false;
        this._moved = false;
      },
      _onDown: function(e) {
        if (!this._enabled) {
          return;
        }
        this._moved = false;
        if (hasClass(this._element, "leaflet-zoom-anim")) {
          return;
        }
        if (e.touches && e.touches.length !== 1) {
          if (Draggable._dragging === this) {
            this.finishDrag();
          }
          return;
        }
        if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
          return;
        }
        Draggable._dragging = this;
        if (this._preventOutline) {
          preventOutline(this._element);
        }
        disableImageDrag();
        disableTextSelection();
        if (this._moving) {
          return;
        }
        this.fire("down");
        var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
        this._startPoint = new Point(first.clientX, first.clientY);
        this._startPos = getPosition(this._element);
        this._parentScale = getScale(sizedParent);
        var mouseevent = e.type === "mousedown";
        on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
        on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
      },
      _onMove: function(e) {
        if (!this._enabled) {
          return;
        }
        if (e.touches && e.touches.length > 1) {
          this._moved = true;
          return;
        }
        var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
        if (!offset.x && !offset.y) {
          return;
        }
        if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
          return;
        }
        offset.x /= this._parentScale.x;
        offset.y /= this._parentScale.y;
        preventDefault(e);
        if (!this._moved) {
          this.fire("dragstart");
          this._moved = true;
          addClass(document.body, "leaflet-dragging");
          this._lastTarget = e.target || e.srcElement;
          if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
            this._lastTarget = this._lastTarget.correspondingUseElement;
          }
          addClass(this._lastTarget, "leaflet-drag-target");
        }
        this._newPos = this._startPos.add(offset);
        this._moving = true;
        this._lastEvent = e;
        this._updatePosition();
      },
      _updatePosition: function() {
        var e = { originalEvent: this._lastEvent };
        this.fire("predrag", e);
        setPosition(this._element, this._newPos);
        this.fire("drag", e);
      },
      _onUp: function() {
        if (!this._enabled) {
          return;
        }
        this.finishDrag();
      },
      finishDrag: function(noInertia) {
        removeClass(document.body, "leaflet-dragging");
        if (this._lastTarget) {
          removeClass(this._lastTarget, "leaflet-drag-target");
          this._lastTarget = null;
        }
        off(document, "mousemove touchmove", this._onMove, this);
        off(document, "mouseup touchend touchcancel", this._onUp, this);
        enableImageDrag();
        enableTextSelection();
        var fireDragend = this._moved && this._moving;
        this._moving = false;
        Draggable._dragging = false;
        if (fireDragend) {
          this.fire("dragend", {
            noInertia,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      }
    });
    function clipPolygon(points, bounds, round) {
      var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b, len, edge2, p;
      for (i = 0, len = points.length; i < len; i++) {
        points[i]._code = _getBitCode(points[i], bounds);
      }
      for (k = 0; k < 4; k++) {
        edge2 = edges[k];
        clippedPoints = [];
        for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
          a = points[i];
          b = points[j];
          if (!(a._code & edge2)) {
            if (b._code & edge2) {
              p = _getEdgeIntersection(b, a, edge2, bounds, round);
              p._code = _getBitCode(p, bounds);
              clippedPoints.push(p);
            }
            clippedPoints.push(a);
          } else if (!(b._code & edge2)) {
            p = _getEdgeIntersection(b, a, edge2, bounds, round);
            p._code = _getBitCode(p, bounds);
            clippedPoints.push(p);
          }
        }
        points = clippedPoints;
      }
      return points;
    }
    function polygonCenter(latlngs, crs) {
      var i, j, p1, p2, f, area, x, y, center;
      if (!latlngs || latlngs.length === 0) {
        throw new Error("latlngs not passed");
      }
      if (!isFlat(latlngs)) {
        console.warn("latlngs are not flat! Only the first ring will be used");
        latlngs = latlngs[0];
      }
      var centroidLatLng = toLatLng([0, 0]);
      var bounds = toLatLngBounds(latlngs);
      var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
      if (areaBounds < 1700) {
        centroidLatLng = centroid(latlngs);
      }
      var len = latlngs.length;
      var points = [];
      for (i = 0; i < len; i++) {
        var latlng = toLatLng(latlngs[i]);
        points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
      }
      area = x = y = 0;
      for (i = 0, j = len - 1; i < len; j = i++) {
        p1 = points[i];
        p2 = points[j];
        f = p1.y * p2.x - p2.y * p1.x;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
        area += f * 3;
      }
      if (area === 0) {
        center = points[0];
      } else {
        center = [x / area, y / area];
      }
      var latlngCenter = crs.unproject(toPoint(center));
      return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
    }
    function centroid(coords) {
      var latSum = 0;
      var lngSum = 0;
      var len = 0;
      for (var i = 0; i < coords.length; i++) {
        var latlng = toLatLng(coords[i]);
        latSum += latlng.lat;
        lngSum += latlng.lng;
        len++;
      }
      return toLatLng([latSum / len, lngSum / len]);
    }
    var PolyUtil = {
      __proto__: null,
      clipPolygon,
      polygonCenter,
      centroid
    };
    function simplify(points, tolerance) {
      if (!tolerance || !points.length) {
        return points.slice();
      }
      var sqTolerance = tolerance * tolerance;
      points = _reducePoints(points, sqTolerance);
      points = _simplifyDP(points, sqTolerance);
      return points;
    }
    function pointToSegmentDistance(p, p1, p2) {
      return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
    }
    function closestPointOnSegment(p, p1, p2) {
      return _sqClosestPointOnSegment(p, p1, p2);
    }
    function _simplifyDP(points, sqTolerance) {
      var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
      markers[0] = markers[len - 1] = 1;
      _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
      var i, newPoints = [];
      for (i = 0; i < len; i++) {
        if (markers[i]) {
          newPoints.push(points[i]);
        }
      }
      return newPoints;
    }
    function _simplifyDPStep(points, markers, sqTolerance, first, last) {
      var maxSqDist = 0, index2, i, sqDist;
      for (i = first + 1; i <= last - 1; i++) {
        sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
        if (sqDist > maxSqDist) {
          index2 = i;
          maxSqDist = sqDist;
        }
      }
      if (maxSqDist > sqTolerance) {
        markers[index2] = 1;
        _simplifyDPStep(points, markers, sqTolerance, first, index2);
        _simplifyDPStep(points, markers, sqTolerance, index2, last);
      }
    }
    function _reducePoints(points, sqTolerance) {
      var reducedPoints = [points[0]];
      for (var i = 1, prev = 0, len = points.length; i < len; i++) {
        if (_sqDist(points[i], points[prev]) > sqTolerance) {
          reducedPoints.push(points[i]);
          prev = i;
        }
      }
      if (prev < len - 1) {
        reducedPoints.push(points[len - 1]);
      }
      return reducedPoints;
    }
    var _lastCode;
    function clipSegment(a, b, bounds, useLastCode, round) {
      var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
      _lastCode = codeB;
      while (true) {
        if (!(codeA | codeB)) {
          return [a, b];
        }
        if (codeA & codeB) {
          return false;
        }
        codeOut = codeA || codeB;
        p = _getEdgeIntersection(a, b, codeOut, bounds, round);
        newCode = _getBitCode(p, bounds);
        if (codeOut === codeA) {
          a = p;
          codeA = newCode;
        } else {
          b = p;
          codeB = newCode;
        }
      }
    }
    function _getEdgeIntersection(a, b, code, bounds, round) {
      var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
      if (code & 8) {
        x = a.x + dx * (max.y - a.y) / dy;
        y = max.y;
      } else if (code & 4) {
        x = a.x + dx * (min.y - a.y) / dy;
        y = min.y;
      } else if (code & 2) {
        x = max.x;
        y = a.y + dy * (max.x - a.x) / dx;
      } else if (code & 1) {
        x = min.x;
        y = a.y + dy * (min.x - a.x) / dx;
      }
      return new Point(x, y, round);
    }
    function _getBitCode(p, bounds) {
      var code = 0;
      if (p.x < bounds.min.x) {
        code |= 1;
      } else if (p.x > bounds.max.x) {
        code |= 2;
      }
      if (p.y < bounds.min.y) {
        code |= 4;
      } else if (p.y > bounds.max.y) {
        code |= 8;
      }
      return code;
    }
    function _sqDist(p1, p2) {
      var dx = p2.x - p1.x, dy = p2.y - p1.y;
      return dx * dx + dy * dy;
    }
    function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
      var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
      if (dot > 0) {
        t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
        if (t > 1) {
          x = p2.x;
          y = p2.y;
        } else if (t > 0) {
          x += dx * t;
          y += dy * t;
        }
      }
      dx = p.x - x;
      dy = p.y - y;
      return sqDist ? dx * dx + dy * dy : new Point(x, y);
    }
    function isFlat(latlngs) {
      return !isArray2(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
    }
    function _flat(latlngs) {
      console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
      return isFlat(latlngs);
    }
    function polylineCenter(latlngs, crs) {
      var i, halfDist, segDist, dist, p1, p2, ratio, center;
      if (!latlngs || latlngs.length === 0) {
        throw new Error("latlngs not passed");
      }
      if (!isFlat(latlngs)) {
        console.warn("latlngs are not flat! Only the first ring will be used");
        latlngs = latlngs[0];
      }
      var centroidLatLng = toLatLng([0, 0]);
      var bounds = toLatLngBounds(latlngs);
      var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
      if (areaBounds < 1700) {
        centroidLatLng = centroid(latlngs);
      }
      var len = latlngs.length;
      var points = [];
      for (i = 0; i < len; i++) {
        var latlng = toLatLng(latlngs[i]);
        points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
      }
      for (i = 0, halfDist = 0; i < len - 1; i++) {
        halfDist += points[i].distanceTo(points[i + 1]) / 2;
      }
      if (halfDist === 0) {
        center = points[0];
      } else {
        for (i = 0, dist = 0; i < len - 1; i++) {
          p1 = points[i];
          p2 = points[i + 1];
          segDist = p1.distanceTo(p2);
          dist += segDist;
          if (dist > halfDist) {
            ratio = (dist - halfDist) / segDist;
            center = [
              p2.x - ratio * (p2.x - p1.x),
              p2.y - ratio * (p2.y - p1.y)
            ];
            break;
          }
        }
      }
      var latlngCenter = crs.unproject(toPoint(center));
      return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
    }
    var LineUtil = {
      __proto__: null,
      simplify,
      pointToSegmentDistance,
      closestPointOnSegment,
      clipSegment,
      _getEdgeIntersection,
      _getBitCode,
      _sqClosestPointOnSegment,
      isFlat,
      _flat,
      polylineCenter
    };
    var LonLat = {
      project: function(latlng) {
        return new Point(latlng.lng, latlng.lat);
      },
      unproject: function(point) {
        return new LatLng(point.y, point.x);
      },
      bounds: new Bounds([-180, -90], [180, 90])
    };
    var Mercator = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(latlng) {
        var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
        var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
        y = -r * Math.log(Math.max(ts, 1e-10));
        return new Point(latlng.lng * d * r, y);
      },
      unproject: function(point) {
        var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
        for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
          con = e * Math.sin(phi);
          con = Math.pow((1 - con) / (1 + con), e / 2);
          dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
          phi += dphi;
        }
        return new LatLng(phi * d, point.x * d / r);
      }
    };
    var index = {
      __proto__: null,
      LonLat,
      Mercator,
      SphericalMercator
    };
    var EPSG3395 = extend({}, Earth, {
      code: "EPSG:3395",
      projection: Mercator,
      transformation: function() {
        var scale2 = 0.5 / (Math.PI * Mercator.R);
        return toTransformation(scale2, 0.5, -scale2, 0.5);
      }()
    });
    var EPSG4326 = extend({}, Earth, {
      code: "EPSG:4326",
      projection: LonLat,
      transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
    });
    var Simple = extend({}, CRS, {
      projection: LonLat,
      transformation: toTransformation(1, 0, -1, 0),
      scale: function(zoom2) {
        return Math.pow(2, zoom2);
      },
      zoom: function(scale2) {
        return Math.log(scale2) / Math.LN2;
      },
      distance: function(latlng1, latlng2) {
        var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
        return Math.sqrt(dx * dx + dy * dy);
      },
      infinite: true
    });
    CRS.Earth = Earth;
    CRS.EPSG3395 = EPSG3395;
    CRS.EPSG3857 = EPSG3857;
    CRS.EPSG900913 = EPSG900913;
    CRS.EPSG4326 = EPSG4326;
    CRS.Simple = Simple;
    var Layer = Evented.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: true
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(map) {
        map.addLayer(this);
        return this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(obj) {
        if (obj) {
          obj.removeLayer(this);
        }
        return this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(name) {
        return this._map.getPane(name ? this.options[name] || name : this.options.pane);
      },
      addInteractiveTarget: function(targetEl) {
        this._map._targets[stamp(targetEl)] = this;
        return this;
      },
      removeInteractiveTarget: function(targetEl) {
        delete this._map._targets[stamp(targetEl)];
        return this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(e) {
        var map = e.target;
        if (!map.hasLayer(this)) {
          return;
        }
        this._map = map;
        this._zoomAnimated = map._zoomAnimated;
        if (this.getEvents) {
          var events = this.getEvents();
          map.on(events, this);
          this.once("remove", function() {
            map.off(events, this);
          }, this);
        }
        this.onAdd(map);
        this.fire("add");
        map.fire("layeradd", { layer: this });
      }
    });
    Map.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(layer) {
        if (!layer._layerAdd) {
          throw new Error("The provided object is not a Layer.");
        }
        var id = stamp(layer);
        if (this._layers[id]) {
          return this;
        }
        this._layers[id] = layer;
        layer._mapToAdd = this;
        if (layer.beforeAdd) {
          layer.beforeAdd(this);
        }
        this.whenReady(layer._layerAdd, layer);
        return this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(layer) {
        var id = stamp(layer);
        if (!this._layers[id]) {
          return this;
        }
        if (this._loaded) {
          layer.onRemove(this);
        }
        delete this._layers[id];
        if (this._loaded) {
          this.fire("layerremove", { layer });
          layer.fire("remove");
        }
        layer._map = layer._mapToAdd = null;
        return this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(layer) {
        return stamp(layer) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(method, context) {
        for (var i in this._layers) {
          method.call(context, this._layers[i]);
        }
        return this;
      },
      _addLayers: function(layers2) {
        layers2 = layers2 ? isArray2(layers2) ? layers2 : [layers2] : [];
        for (var i = 0, len = layers2.length; i < len; i++) {
          this.addLayer(layers2[i]);
        }
      },
      _addZoomLimit: function(layer) {
        if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
          this._zoomBoundLayers[stamp(layer)] = layer;
          this._updateZoomLevels();
        }
      },
      _removeZoomLimit: function(layer) {
        var id = stamp(layer);
        if (this._zoomBoundLayers[id]) {
          delete this._zoomBoundLayers[id];
          this._updateZoomLevels();
        }
      },
      _updateZoomLevels: function() {
        var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
        for (var i in this._zoomBoundLayers) {
          var options = this._zoomBoundLayers[i].options;
          minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
          maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
        }
        this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
        this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
        if (oldZoomSpan !== this._getZoomSpan()) {
          this.fire("zoomlevelschange");
        }
        if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
          this.setZoom(this._layersMaxZoom);
        }
        if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
          this.setZoom(this._layersMinZoom);
        }
      }
    });
    var LayerGroup = Layer.extend({
      initialize: function(layers2, options) {
        setOptions(this, options);
        this._layers = {};
        var i, len;
        if (layers2) {
          for (i = 0, len = layers2.length; i < len; i++) {
            this.addLayer(layers2[i]);
          }
        }
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(layer) {
        var id = this.getLayerId(layer);
        this._layers[id] = layer;
        if (this._map) {
          this._map.addLayer(layer);
        }
        return this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(layer) {
        var id = layer in this._layers ? layer : this.getLayerId(layer);
        if (this._map && this._layers[id]) {
          this._map.removeLayer(this._layers[id]);
        }
        delete this._layers[id];
        return this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(layer) {
        var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
        return layerId in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(methodName) {
        var args = Array.prototype.slice.call(arguments, 1), i, layer;
        for (i in this._layers) {
          layer = this._layers[i];
          if (layer[methodName]) {
            layer[methodName].apply(layer, args);
          }
        }
        return this;
      },
      onAdd: function(map) {
        this.eachLayer(map.addLayer, map);
      },
      onRemove: function(map) {
        this.eachLayer(map.removeLayer, map);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(method, context) {
        for (var i in this._layers) {
          method.call(context, this._layers[i]);
        }
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(id) {
        return this._layers[id];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var layers2 = [];
        this.eachLayer(layers2.push, layers2);
        return layers2;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(zIndex) {
        return this.invoke("setZIndex", zIndex);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(layer) {
        return stamp(layer);
      }
    });
    var layerGroup = function(layers2, options) {
      return new LayerGroup(layers2, options);
    };
    var FeatureGroup = LayerGroup.extend({
      addLayer: function(layer) {
        if (this.hasLayer(layer)) {
          return this;
        }
        layer.addEventParent(this);
        LayerGroup.prototype.addLayer.call(this, layer);
        return this.fire("layeradd", { layer });
      },
      removeLayer: function(layer) {
        if (!this.hasLayer(layer)) {
          return this;
        }
        if (layer in this._layers) {
          layer = this._layers[layer];
        }
        layer.removeEventParent(this);
        LayerGroup.prototype.removeLayer.call(this, layer);
        return this.fire("layerremove", { layer });
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(style2) {
        return this.invoke("setStyle", style2);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var bounds = new LatLngBounds();
        for (var id in this._layers) {
          var layer = this._layers[id];
          bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
        }
        return bounds;
      }
    });
    var featureGroup = function(layers2, options) {
      return new FeatureGroup(layers2, options);
    };
    var Icon = Class.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false
      },
      initialize: function(options) {
        setOptions(this, options);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(oldIcon) {
        return this._createIcon("icon", oldIcon);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(oldIcon) {
        return this._createIcon("shadow", oldIcon);
      },
      _createIcon: function(name, oldIcon) {
        var src = this._getIconUrl(name);
        if (!src) {
          if (name === "icon") {
            throw new Error("iconUrl not set in Icon options (see the docs).");
          }
          return null;
        }
        var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
        this._setIconStyles(img, name);
        if (this.options.crossOrigin || this.options.crossOrigin === "") {
          img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
        }
        return img;
      },
      _setIconStyles: function(img, name) {
        var options = this.options;
        var sizeOption = options[name + "Size"];
        if (typeof sizeOption === "number") {
          sizeOption = [sizeOption, sizeOption];
        }
        var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
        img.className = "leaflet-marker-" + name + " " + (options.className || "");
        if (anchor) {
          img.style.marginLeft = -anchor.x + "px";
          img.style.marginTop = -anchor.y + "px";
        }
        if (size) {
          img.style.width = size.x + "px";
          img.style.height = size.y + "px";
        }
      },
      _createImg: function(src, el) {
        el = el || document.createElement("img");
        el.src = src;
        return el;
      },
      _getIconUrl: function(name) {
        return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
      }
    });
    function icon(options) {
      return new Icon(options);
    }
    var IconDefault = Icon.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(name) {
        if (typeof IconDefault.imagePath !== "string") {
          IconDefault.imagePath = this._detectIconPath();
        }
        return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
      },
      _stripUrl: function(path) {
        var strip = function(str, re, idx) {
          var match = re.exec(str);
          return match && match[idx];
        };
        path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
        return path && strip(path, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var el = create$1("div", "leaflet-default-icon-path", document.body);
        var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
        document.body.removeChild(el);
        path = this._stripUrl(path);
        if (path) {
          return path;
        }
        var link = document.querySelector('link[href$="leaflet.css"]');
        if (!link) {
          return "";
        }
        return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
      }
    });
    var MarkerDrag = Handler.extend({
      initialize: function(marker2) {
        this._marker = marker2;
      },
      addHooks: function() {
        var icon2 = this._marker._icon;
        if (!this._draggable) {
          this._draggable = new Draggable(icon2, icon2, true);
        }
        this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable();
        addClass(icon2, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable();
        if (this._marker._icon) {
          removeClass(this._marker._icon, "leaflet-marker-draggable");
        }
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(e) {
        var marker2 = this._marker, map = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
        var panBounds = toBounds(
          bounds.min._subtract(origin).add(padding),
          bounds.max._subtract(origin).subtract(padding)
        );
        if (!panBounds.contains(iconPos)) {
          var movement = toPoint(
            (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
            (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
          ).multiplyBy(speed);
          map.panBy(movement, { animate: false });
          this._draggable._newPos._add(movement);
          this._draggable._startPos._add(movement);
          setPosition(marker2._icon, this._draggable._newPos);
          this._onDrag(e);
          this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng();
        this._marker.closePopup && this._marker.closePopup();
        this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(e) {
        if (this._marker.options.autoPan) {
          cancelAnimFrame(this._panRequest);
          this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
        }
      },
      _onDrag: function(e) {
        var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
        if (shadow) {
          setPosition(shadow, iconPos);
        }
        marker2._latlng = latlng;
        e.latlng = latlng;
        e.oldLatLng = this._oldLatLng;
        marker2.fire("move", e).fire("drag", e);
      },
      _onDragEnd: function(e) {
        cancelAnimFrame(this._panRequest);
        delete this._oldLatLng;
        this._marker.fire("moveend").fire("dragend", e);
      }
    });
    var Marker = Layer.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new IconDefault(),
        // Option inherited from "Interactive layer" abstract class
        interactive: true,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: true,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: false,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: false,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: true,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: false,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: false,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(latlng, options) {
        setOptions(this, options);
        this._latlng = toLatLng(latlng);
      },
      onAdd: function(map) {
        this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
        if (this._zoomAnimated) {
          map.on("zoomanim", this._animateZoom, this);
        }
        this._initIcon();
        this.update();
      },
      onRemove: function(map) {
        if (this.dragging && this.dragging.enabled()) {
          this.options.draggable = true;
          this.dragging.removeHooks();
        }
        delete this.dragging;
        if (this._zoomAnimated) {
          map.off("zoomanim", this._animateZoom, this);
        }
        this._removeIcon();
        this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(latlng) {
        var oldLatLng = this._latlng;
        this._latlng = toLatLng(latlng);
        this.update();
        return this.fire("move", { oldLatLng, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(offset) {
        this.options.zIndexOffset = offset;
        return this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(icon2) {
        this.options.icon = icon2;
        if (this._map) {
          this._initIcon();
          this.update();
        }
        if (this._popup) {
          this.bindPopup(this._popup, this._popup.options);
        }
        return this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var pos = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(pos);
        }
        return this;
      },
      _initIcon: function() {
        var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        var icon2 = options.icon.createIcon(this._icon), addIcon = false;
        if (icon2 !== this._icon) {
          if (this._icon) {
            this._removeIcon();
          }
          addIcon = true;
          if (options.title) {
            icon2.title = options.title;
          }
          if (icon2.tagName === "IMG") {
            icon2.alt = options.alt || "";
          }
        }
        addClass(icon2, classToAdd);
        if (options.keyboard) {
          icon2.tabIndex = "0";
          icon2.setAttribute("role", "button");
        }
        this._icon = icon2;
        if (options.riseOnHover) {
          this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          });
        }
        if (this.options.autoPanOnFocus) {
          on(icon2, "focus", this._panOnFocus, this);
        }
        var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
        if (newShadow !== this._shadow) {
          this._removeShadow();
          addShadow = true;
        }
        if (newShadow) {
          addClass(newShadow, classToAdd);
          newShadow.alt = "";
        }
        this._shadow = newShadow;
        if (options.opacity < 1) {
          this._updateOpacity();
        }
        if (addIcon) {
          this.getPane().appendChild(this._icon);
        }
        this._initInteraction();
        if (newShadow && addShadow) {
          this.getPane(options.shadowPane).appendChild(this._shadow);
        }
      },
      _removeIcon: function() {
        if (this.options.riseOnHover) {
          this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          });
        }
        if (this.options.autoPanOnFocus) {
          off(this._icon, "focus", this._panOnFocus, this);
        }
        remove(this._icon);
        this.removeInteractiveTarget(this._icon);
        this._icon = null;
      },
      _removeShadow: function() {
        if (this._shadow) {
          remove(this._shadow);
        }
        this._shadow = null;
      },
      _setPos: function(pos) {
        if (this._icon) {
          setPosition(this._icon, pos);
        }
        if (this._shadow) {
          setPosition(this._shadow, pos);
        }
        this._zIndex = pos.y + this.options.zIndexOffset;
        this._resetZIndex();
      },
      _updateZIndex: function(offset) {
        if (this._icon) {
          this._icon.style.zIndex = this._zIndex + offset;
        }
      },
      _animateZoom: function(opt) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
        this._setPos(pos);
      },
      _initInteraction: function() {
        if (!this.options.interactive) {
          return;
        }
        addClass(this._icon, "leaflet-interactive");
        this.addInteractiveTarget(this._icon);
        if (MarkerDrag) {
          var draggable = this.options.draggable;
          if (this.dragging) {
            draggable = this.dragging.enabled();
            this.dragging.disable();
          }
          this.dragging = new MarkerDrag(this);
          if (draggable) {
            this.dragging.enable();
          }
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(opacity) {
        this.options.opacity = opacity;
        if (this._map) {
          this._updateOpacity();
        }
        return this;
      },
      _updateOpacity: function() {
        var opacity = this.options.opacity;
        if (this._icon) {
          setOpacity(this._icon, opacity);
        }
        if (this._shadow) {
          setOpacity(this._shadow, opacity);
        }
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var map = this._map;
        if (!map) {
          return;
        }
        var iconOpts = this.options.icon.options;
        var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
        var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
        map.panInside(this._latlng, {
          paddingTopLeft: anchor,
          paddingBottomRight: size.subtract(anchor)
        });
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function marker(latlng, options) {
      return new Marker(latlng, options);
    }
    var Path = Layer.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: true,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: false,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: true,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: true
      },
      beforeAdd: function(map) {
        this._renderer = map.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this);
        this._reset();
        this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        if (this._map) {
          this._renderer._updatePath(this);
        }
        return this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(style2) {
        setOptions(this, style2);
        if (this._renderer) {
          this._renderer._updateStyle(this);
          if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
            this._updateBounds();
          }
        }
        return this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        if (this._renderer) {
          this._renderer._bringToFront(this);
        }
        return this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        if (this._renderer) {
          this._renderer._bringToBack(this);
        }
        return this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project();
        this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    });
    var CircleMarker = Path.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: true,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(latlng, options) {
        setOptions(this, options);
        this._latlng = toLatLng(latlng);
        this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(latlng) {
        var oldLatLng = this._latlng;
        this._latlng = toLatLng(latlng);
        this.redraw();
        return this.fire("move", { oldLatLng, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(radius) {
        this.options.radius = this._radius = radius;
        return this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(options) {
        var radius = options && options.radius || this._radius;
        Path.prototype.setStyle.call(this, options);
        this.setRadius(radius);
        return this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._updateBounds();
      },
      _updateBounds: function() {
        var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
        this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
      },
      _update: function() {
        if (this._map) {
          this._updatePath();
        }
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(p) {
        return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function circleMarker(latlng, options) {
      return new CircleMarker(latlng, options);
    }
    var Circle = CircleMarker.extend({
      initialize: function(latlng, options, legacyOptions) {
        if (typeof options === "number") {
          options = extend({}, legacyOptions, { radius: options });
        }
        setOptions(this, options);
        this._latlng = toLatLng(latlng);
        if (isNaN(this.options.radius)) {
          throw new Error("Circle radius cannot be NaN");
        }
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(radius) {
        this._mRadius = radius;
        return this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var half = [this._radius, this._radiusY || this._radius];
        return new LatLngBounds(
          this._map.layerPointToLatLng(this._point.subtract(half)),
          this._map.layerPointToLatLng(this._point.add(half))
        );
      },
      setStyle: Path.prototype.setStyle,
      _project: function() {
        var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
        if (crs.distance === Earth.distance) {
          var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
          if (isNaN(lngR) || lngR === 0) {
            lngR = latR / Math.cos(Math.PI / 180 * lat);
          }
          this._point = p.subtract(map.getPixelOrigin());
          this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
          this._radiusY = p.y - top.y;
        } else {
          var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = map.latLngToLayerPoint(this._latlng);
          this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
        }
        this._updateBounds();
      }
    });
    function circle(latlng, options, legacyOptions) {
      return new Circle(latlng, options, legacyOptions);
    }
    var Polyline = Path.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: false
      },
      initialize: function(latlngs, options) {
        setOptions(this, options);
        this._setLatLngs(latlngs);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(latlngs) {
        this._setLatLngs(latlngs);
        return this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(p) {
        var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
        for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
          var points = this._parts[j];
          for (var i = 1, len = points.length; i < len; i++) {
            p1 = points[i - 1];
            p2 = points[i];
            var sqDist = closest(p, p1, p2, true);
            if (sqDist < minDistance) {
              minDistance = sqDist;
              minPoint = closest(p, p1, p2);
            }
          }
        }
        if (minPoint) {
          minPoint.distance = Math.sqrt(minDistance);
        }
        return minPoint;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map) {
          throw new Error("Must add layer to map before using getCenter()");
        }
        return polylineCenter(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(latlng, latlngs) {
        latlngs = latlngs || this._defaultShape();
        latlng = toLatLng(latlng);
        latlngs.push(latlng);
        this._bounds.extend(latlng);
        return this.redraw();
      },
      _setLatLngs: function(latlngs) {
        this._bounds = new LatLngBounds();
        this._latlngs = this._convertLatLngs(latlngs);
      },
      _defaultShape: function() {
        return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(latlngs) {
        var result = [], flat = isFlat(latlngs);
        for (var i = 0, len = latlngs.length; i < len; i++) {
          if (flat) {
            result[i] = toLatLng(latlngs[i]);
            this._bounds.extend(result[i]);
          } else {
            result[i] = this._convertLatLngs(latlngs[i]);
          }
        }
        return result;
      },
      _project: function() {
        var pxBounds = new Bounds();
        this._rings = [];
        this._projectLatlngs(this._latlngs, this._rings, pxBounds);
        if (this._bounds.isValid() && pxBounds.isValid()) {
          this._rawPxBounds = pxBounds;
          this._updateBounds();
        }
      },
      _updateBounds: function() {
        var w = this._clickTolerance(), p = new Point(w, w);
        if (!this._rawPxBounds) {
          return;
        }
        this._pxBounds = new Bounds([
          this._rawPxBounds.min.subtract(p),
          this._rawPxBounds.max.add(p)
        ]);
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(latlngs, result, projectedBounds) {
        var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
        if (flat) {
          ring = [];
          for (i = 0; i < len; i++) {
            ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
            projectedBounds.extend(ring[i]);
          }
          result.push(ring);
        } else {
          for (i = 0; i < len; i++) {
            this._projectLatlngs(latlngs[i], result, projectedBounds);
          }
        }
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var bounds = this._renderer._bounds;
        this._parts = [];
        if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
          return;
        }
        if (this.options.noClip) {
          this._parts = this._rings;
          return;
        }
        var parts = this._parts, i, j, k, len, len2, segment, points;
        for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
          points = this._rings[i];
          for (j = 0, len2 = points.length; j < len2 - 1; j++) {
            segment = clipSegment(points[j], points[j + 1], bounds, j, true);
            if (!segment) {
              continue;
            }
            parts[k] = parts[k] || [];
            parts[k].push(segment[0]);
            if (segment[1] !== points[j + 1] || j === len2 - 2) {
              parts[k].push(segment[1]);
              k++;
            }
          }
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        var parts = this._parts, tolerance = this.options.smoothFactor;
        for (var i = 0, len = parts.length; i < len; i++) {
          parts[i] = simplify(parts[i], tolerance);
        }
      },
      _update: function() {
        if (!this._map) {
          return;
        }
        this._clipPoints();
        this._simplifyPoints();
        this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(p, closed) {
        var i, j, k, len, len2, part, w = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(p)) {
          return false;
        }
        for (i = 0, len = this._parts.length; i < len; i++) {
          part = this._parts[i];
          for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
            if (!closed && j === 0) {
              continue;
            }
            if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
              return true;
            }
          }
        }
        return false;
      }
    });
    function polyline(latlngs, options) {
      return new Polyline(latlngs, options);
    }
    Polyline._flat = _flat;
    var Polygon = Polyline.extend({
      options: {
        fill: true
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map) {
          throw new Error("Must add layer to map before using getCenter()");
        }
        return polygonCenter(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(latlngs) {
        var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
        if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
          result.pop();
        }
        return result;
      },
      _setLatLngs: function(latlngs) {
        Polyline.prototype._setLatLngs.call(this, latlngs);
        if (isFlat(this._latlngs)) {
          this._latlngs = [this._latlngs];
        }
      },
      _defaultShape: function() {
        return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
        bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
        this._parts = [];
        if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
          return;
        }
        if (this.options.noClip) {
          this._parts = this._rings;
          return;
        }
        for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
          clipped = clipPolygon(this._rings[i], bounds, true);
          if (clipped.length) {
            this._parts.push(clipped);
          }
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, true);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(p) {
        var inside = false, part, p1, p2, i, j, k, len, len2;
        if (!this._pxBounds || !this._pxBounds.contains(p)) {
          return false;
        }
        for (i = 0, len = this._parts.length; i < len; i++) {
          part = this._parts[i];
          for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
            p1 = part[j];
            p2 = part[k];
            if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
              inside = !inside;
            }
          }
        }
        return inside || Polyline.prototype._containsPoint.call(this, p, true);
      }
    });
    function polygon(latlngs, options) {
      return new Polygon(latlngs, options);
    }
    var GeoJSON = FeatureGroup.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(geojson, options) {
        setOptions(this, options);
        this._layers = {};
        if (geojson) {
          this.addData(geojson);
        }
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(geojson) {
        var features = isArray2(geojson) ? geojson : geojson.features, i, len, feature;
        if (features) {
          for (i = 0, len = features.length; i < len; i++) {
            feature = features[i];
            if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
              this.addData(feature);
            }
          }
          return this;
        }
        var options = this.options;
        if (options.filter && !options.filter(geojson)) {
          return this;
        }
        var layer = geometryToLayer(geojson, options);
        if (!layer) {
          return this;
        }
        layer.feature = asFeature(geojson);
        layer.defaultOptions = layer.options;
        this.resetStyle(layer);
        if (options.onEachFeature) {
          options.onEachFeature(geojson, layer);
        }
        return this.addLayer(layer);
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(layer) {
        if (layer === void 0) {
          return this.eachLayer(this.resetStyle, this);
        }
        layer.options = extend({}, layer.defaultOptions);
        this._setLayerStyle(layer, this.options.style);
        return this;
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(style2) {
        return this.eachLayer(function(layer) {
          this._setLayerStyle(layer, style2);
        }, this);
      },
      _setLayerStyle: function(layer, style2) {
        if (layer.setStyle) {
          if (typeof style2 === "function") {
            style2 = style2(layer.feature);
          }
          layer.setStyle(style2);
        }
      }
    });
    function geometryToLayer(geojson, options) {
      var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
      if (!coords && !geometry) {
        return null;
      }
      switch (geometry.type) {
        case "Point":
          latlng = _coordsToLatLng(coords);
          return _pointToLayer(pointToLayer, geojson, latlng, options);
        case "MultiPoint":
          for (i = 0, len = coords.length; i < len; i++) {
            latlng = _coordsToLatLng(coords[i]);
            layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
          }
          return new FeatureGroup(layers2);
        case "LineString":
        case "MultiLineString":
          latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
          return new Polyline(latlngs, options);
        case "Polygon":
        case "MultiPolygon":
          latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
          return new Polygon(latlngs, options);
        case "GeometryCollection":
          for (i = 0, len = geometry.geometries.length; i < len; i++) {
            var geoLayer = geometryToLayer({
              geometry: geometry.geometries[i],
              type: "Feature",
              properties: geojson.properties
            }, options);
            if (geoLayer) {
              layers2.push(geoLayer);
            }
          }
          return new FeatureGroup(layers2);
        case "FeatureCollection":
          for (i = 0, len = geometry.features.length; i < len; i++) {
            var featureLayer = geometryToLayer(geometry.features[i], options);
            if (featureLayer) {
              layers2.push(featureLayer);
            }
          }
          return new FeatureGroup(layers2);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
      return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
    }
    function coordsToLatLng(coords) {
      return new LatLng(coords[1], coords[0], coords[2]);
    }
    function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
      var latlngs = [];
      for (var i = 0, len = coords.length, latlng; i < len; i++) {
        latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
        latlngs.push(latlng);
      }
      return latlngs;
    }
    function latLngToCoords(latlng, precision) {
      latlng = toLatLng(latlng);
      return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
    }
    function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
      var coords = [];
      for (var i = 0, len = latlngs.length; i < len; i++) {
        coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
      }
      if (!levelsDeep && closed && coords.length > 0) {
        coords.push(coords[0].slice());
      }
      return coords;
    }
    function getFeature(layer, newGeometry) {
      return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
    }
    function asFeature(geojson) {
      if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
        return geojson;
      }
      return {
        type: "Feature",
        properties: {},
        geometry: geojson
      };
    }
    var PointToGeoJSON = {
      toGeoJSON: function(precision) {
        return getFeature(this, {
          type: "Point",
          coordinates: latLngToCoords(this.getLatLng(), precision)
        });
      }
    };
    Marker.include(PointToGeoJSON);
    Circle.include(PointToGeoJSON);
    CircleMarker.include(PointToGeoJSON);
    Polyline.include({
      toGeoJSON: function(precision) {
        var multi = !isFlat(this._latlngs);
        var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
        return getFeature(this, {
          type: (multi ? "Multi" : "") + "LineString",
          coordinates: coords
        });
      }
    });
    Polygon.include({
      toGeoJSON: function(precision) {
        var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
        var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
        if (!holes) {
          coords = [coords];
        }
        return getFeature(this, {
          type: (multi ? "Multi" : "") + "Polygon",
          coordinates: coords
        });
      }
    });
    LayerGroup.include({
      toMultiPoint: function(precision) {
        var coords = [];
        this.eachLayer(function(layer) {
          coords.push(layer.toGeoJSON(precision).geometry.coordinates);
        });
        return getFeature(this, {
          type: "MultiPoint",
          coordinates: coords
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(precision) {
        var type = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (type === "MultiPoint") {
          return this.toMultiPoint(precision);
        }
        var isGeometryCollection = type === "GeometryCollection", jsons = [];
        this.eachLayer(function(layer) {
          if (layer.toGeoJSON) {
            var json = layer.toGeoJSON(precision);
            if (isGeometryCollection) {
              jsons.push(json.geometry);
            } else {
              var feature = asFeature(json);
              if (feature.type === "FeatureCollection") {
                jsons.push.apply(jsons, feature.features);
              } else {
                jsons.push(feature);
              }
            }
          }
        });
        if (isGeometryCollection) {
          return getFeature(this, {
            geometries: jsons,
            type: "GeometryCollection"
          });
        }
        return {
          type: "FeatureCollection",
          features: jsons
        };
      }
    });
    function geoJSON(geojson, options) {
      return new GeoJSON(geojson, options);
    }
    var geoJson = geoJSON;
    var ImageOverlay = Layer.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: false,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(url, bounds, options) {
        this._url = url;
        this._bounds = toLatLngBounds(bounds);
        setOptions(this, options);
      },
      onAdd: function() {
        if (!this._image) {
          this._initImage();
          if (this.options.opacity < 1) {
            this._updateOpacity();
          }
        }
        if (this.options.interactive) {
          addClass(this._image, "leaflet-interactive");
          this.addInteractiveTarget(this._image);
        }
        this.getPane().appendChild(this._image);
        this._reset();
      },
      onRemove: function() {
        remove(this._image);
        if (this.options.interactive) {
          this.removeInteractiveTarget(this._image);
        }
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(opacity) {
        this.options.opacity = opacity;
        if (this._image) {
          this._updateOpacity();
        }
        return this;
      },
      setStyle: function(styleOpts) {
        if (styleOpts.opacity) {
          this.setOpacity(styleOpts.opacity);
        }
        return this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        if (this._map) {
          toFront(this._image);
        }
        return this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        if (this._map) {
          toBack(this._image);
        }
        return this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(url) {
        this._url = url;
        if (this._image) {
          this._image.src = url;
        }
        return this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(bounds) {
        this._bounds = toLatLngBounds(bounds);
        if (this._map) {
          this._reset();
        }
        return this;
      },
      getEvents: function() {
        var events = {
          zoom: this._reset,
          viewreset: this._reset
        };
        if (this._zoomAnimated) {
          events.zoomanim = this._animateZoom;
        }
        return events;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(value) {
        this.options.zIndex = value;
        this._updateZIndex();
        return this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var wasElementSupplied = this._url.tagName === "IMG";
        var img = this._image = wasElementSupplied ? this._url : create$1("img");
        addClass(img, "leaflet-image-layer");
        if (this._zoomAnimated) {
          addClass(img, "leaflet-zoom-animated");
        }
        if (this.options.className) {
          addClass(img, this.options.className);
        }
        img.onselectstart = falseFn;
        img.onmousemove = falseFn;
        img.onload = bind(this.fire, this, "load");
        img.onerror = bind(this._overlayOnError, this, "error");
        if (this.options.crossOrigin || this.options.crossOrigin === "") {
          img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
        }
        if (this.options.zIndex) {
          this._updateZIndex();
        }
        if (wasElementSupplied) {
          this._url = img.src;
          return;
        }
        img.src = this._url;
        img.alt = this.options.alt;
      },
      _animateZoom: function(e) {
        var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
        setTransform(this._image, offset, scale2);
      },
      _reset: function() {
        var image = this._image, bounds = new Bounds(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), size = bounds.getSize();
        setPosition(image, bounds.min);
        image.style.width = size.x + "px";
        image.style.height = size.y + "px";
      },
      _updateOpacity: function() {
        setOpacity(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
          this._image.style.zIndex = this.options.zIndex;
        }
      },
      _overlayOnError: function() {
        this.fire("error");
        var errorUrl = this.options.errorOverlayUrl;
        if (errorUrl && this._url !== errorUrl) {
          this._url = errorUrl;
          this._image.src = errorUrl;
        }
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    });
    var imageOverlay = function(url, bounds, options) {
      return new ImageOverlay(url, bounds, options);
    };
    var VideoOverlay = ImageOverlay.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: true,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: true,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: true,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: false,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: true
      },
      _initImage: function() {
        var wasElementSupplied = this._url.tagName === "VIDEO";
        var vid = this._image = wasElementSupplied ? this._url : create$1("video");
        addClass(vid, "leaflet-image-layer");
        if (this._zoomAnimated) {
          addClass(vid, "leaflet-zoom-animated");
        }
        if (this.options.className) {
          addClass(vid, this.options.className);
        }
        vid.onselectstart = falseFn;
        vid.onmousemove = falseFn;
        vid.onloadeddata = bind(this.fire, this, "load");
        if (wasElementSupplied) {
          var sourceElements = vid.getElementsByTagName("source");
          var sources = [];
          for (var j = 0; j < sourceElements.length; j++) {
            sources.push(sourceElements[j].src);
          }
          this._url = sourceElements.length > 0 ? sources : [vid.src];
          return;
        }
        if (!isArray2(this._url)) {
          this._url = [this._url];
        }
        if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
          vid.style["objectFit"] = "fill";
        }
        vid.autoplay = !!this.options.autoplay;
        vid.loop = !!this.options.loop;
        vid.muted = !!this.options.muted;
        vid.playsInline = !!this.options.playsInline;
        for (var i = 0; i < this._url.length; i++) {
          var source = create$1("source");
          source.src = this._url[i];
          vid.appendChild(source);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function videoOverlay(video, bounds, options) {
      return new VideoOverlay(video, bounds, options);
    }
    var SVGOverlay = ImageOverlay.extend({
      _initImage: function() {
        var el = this._image = this._url;
        addClass(el, "leaflet-image-layer");
        if (this._zoomAnimated) {
          addClass(el, "leaflet-zoom-animated");
        }
        if (this.options.className) {
          addClass(el, this.options.className);
        }
        el.onselectstart = falseFn;
        el.onmousemove = falseFn;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function svgOverlay(el, bounds, options) {
      return new SVGOverlay(el, bounds, options);
    }
    var DivOverlay = Layer.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: false,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(options, source) {
        if (options && (options instanceof LatLng || isArray2(options))) {
          this._latlng = toLatLng(options);
          setOptions(this, source);
        } else {
          setOptions(this, options);
          this._source = source;
        }
        if (this.options.content) {
          this._content = this.options.content;
        }
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(map) {
        map = arguments.length ? map : this._source._map;
        if (!map.hasLayer(this)) {
          map.addLayer(this);
        }
        return this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        if (this._map) {
          this._map.removeLayer(this);
        }
        return this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(layer) {
        if (this._map) {
          this.close();
        } else {
          if (arguments.length) {
            this._source = layer;
          } else {
            layer = this._source;
          }
          this._prepareOpen();
          this.openOn(layer._map);
        }
        return this;
      },
      onAdd: function(map) {
        this._zoomAnimated = map._zoomAnimated;
        if (!this._container) {
          this._initLayout();
        }
        if (map._fadeAnimated) {
          setOpacity(this._container, 0);
        }
        clearTimeout(this._removeTimeout);
        this.getPane().appendChild(this._container);
        this.update();
        if (map._fadeAnimated) {
          setOpacity(this._container, 1);
        }
        this.bringToFront();
        if (this.options.interactive) {
          addClass(this._container, "leaflet-interactive");
          this.addInteractiveTarget(this._container);
        }
      },
      onRemove: function(map) {
        if (map._fadeAnimated) {
          setOpacity(this._container, 0);
          this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
        } else {
          remove(this._container);
        }
        if (this.options.interactive) {
          removeClass(this._container, "leaflet-interactive");
          this.removeInteractiveTarget(this._container);
        }
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(latlng) {
        this._latlng = toLatLng(latlng);
        if (this._map) {
          this._updatePosition();
          this._adjustPan();
        }
        return this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(content) {
        this._content = content;
        this.update();
        return this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        if (!this._map) {
          return;
        }
        this._container.style.visibility = "hidden";
        this._updateContent();
        this._updateLayout();
        this._updatePosition();
        this._container.style.visibility = "";
        this._adjustPan();
      },
      getEvents: function() {
        var events = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        if (this._zoomAnimated) {
          events.zoomanim = this._animateZoom;
        }
        return events;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        if (this._map) {
          toFront(this._container);
        }
        return this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        if (this._map) {
          toBack(this._container);
        }
        return this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(latlng) {
        var source = this._source;
        if (!source._map) {
          return false;
        }
        if (source instanceof FeatureGroup) {
          source = null;
          var layers2 = this._source._layers;
          for (var id in layers2) {
            if (layers2[id]._map) {
              source = layers2[id];
              break;
            }
          }
          if (!source) {
            return false;
          }
          this._source = source;
        }
        if (!latlng) {
          if (source.getCenter) {
            latlng = source.getCenter();
          } else if (source.getLatLng) {
            latlng = source.getLatLng();
          } else if (source.getBounds) {
            latlng = source.getBounds().getCenter();
          } else {
            throw new Error("Unable to get source layer LatLng.");
          }
        }
        this.setLatLng(latlng);
        if (this._map) {
          this.update();
        }
        return true;
      },
      _updateContent: function() {
        if (!this._content) {
          return;
        }
        var node = this._contentNode;
        var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
        if (typeof content === "string") {
          node.innerHTML = content;
        } else {
          while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
          }
          node.appendChild(content);
        }
        this.fire("contentupdate");
      },
      _updatePosition: function() {
        if (!this._map) {
          return;
        }
        var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
        if (this._zoomAnimated) {
          setPosition(this._container, pos.add(anchor));
        } else {
          offset = offset.add(pos).add(anchor);
        }
        var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
        this._container.style.bottom = bottom + "px";
        this._container.style.left = left + "px";
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    Map.include({
      _initOverlay: function(OverlayClass, content, latlng, options) {
        var overlay = content;
        if (!(overlay instanceof OverlayClass)) {
          overlay = new OverlayClass(options).setContent(content);
        }
        if (latlng) {
          overlay.setLatLng(latlng);
        }
        return overlay;
      }
    });
    Layer.include({
      _initOverlay: function(OverlayClass, old, content, options) {
        var overlay = content;
        if (overlay instanceof OverlayClass) {
          setOptions(overlay, options);
          overlay._source = this;
        } else {
          overlay = old && !options ? old : new OverlayClass(options, this);
          overlay.setContent(content);
        }
        return overlay;
      }
    });
    var Popup = DivOverlay.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: true,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: false,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: true,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: true,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: true,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(map) {
        map = arguments.length ? map : this._source._map;
        if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
          map.removeLayer(map._popup);
        }
        map._popup = this;
        return DivOverlay.prototype.openOn.call(this, map);
      },
      onAdd: function(map) {
        DivOverlay.prototype.onAdd.call(this, map);
        map.fire("popupopen", { popup: this });
        if (this._source) {
          this._source.fire("popupopen", { popup: this }, true);
          if (!(this._source instanceof Path)) {
            this._source.on("preclick", stopPropagation);
          }
        }
      },
      onRemove: function(map) {
        DivOverlay.prototype.onRemove.call(this, map);
        map.fire("popupclose", { popup: this });
        if (this._source) {
          this._source.fire("popupclose", { popup: this }, true);
          if (!(this._source instanceof Path)) {
            this._source.off("preclick", stopPropagation);
          }
        }
      },
      getEvents: function() {
        var events = DivOverlay.prototype.getEvents.call(this);
        if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
          events.preclick = this.close;
        }
        if (this.options.keepInView) {
          events.moveend = this._adjustPan;
        }
        return events;
      },
      _initLayout: function() {
        var prefix = "leaflet-popup", container = this._container = create$1(
          "div",
          prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
        );
        var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
        this._contentNode = create$1("div", prefix + "-content", wrapper);
        disableClickPropagation(container);
        disableScrollPropagation(this._contentNode);
        on(container, "contextmenu", stopPropagation);
        this._tipContainer = create$1("div", prefix + "-tip-container", container);
        this._tip = create$1("div", prefix + "-tip", this._tipContainer);
        if (this.options.closeButton) {
          var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
          closeButton.setAttribute("role", "button");
          closeButton.setAttribute("aria-label", "Close popup");
          closeButton.href = "#close";
          closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
          on(closeButton, "click", function(ev) {
            preventDefault(ev);
            this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var container = this._contentNode, style2 = container.style;
        style2.width = "";
        style2.whiteSpace = "nowrap";
        var width = container.offsetWidth;
        width = Math.min(width, this.options.maxWidth);
        width = Math.max(width, this.options.minWidth);
        style2.width = width + 1 + "px";
        style2.whiteSpace = "";
        style2.height = "";
        var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
        if (maxHeight && height > maxHeight) {
          style2.height = maxHeight + "px";
          addClass(container, scrolledClass);
        } else {
          removeClass(container, scrolledClass);
        }
        this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(e) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
        setPosition(this._container, pos.add(anchor));
      },
      _adjustPan: function() {
        if (!this.options.autoPan) {
          return;
        }
        if (this._map._panAnim) {
          this._map._panAnim.stop();
        }
        if (this._autopanning) {
          this._autopanning = false;
          return;
        }
        var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
        layerPos._add(getPosition(this._container));
        var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
        if (containerPos.x + containerWidth + paddingBR.x > size.x) {
          dx = containerPos.x + containerWidth - size.x + paddingBR.x;
        }
        if (containerPos.x - dx - paddingTL.x < 0) {
          dx = containerPos.x - paddingTL.x;
        }
        if (containerPos.y + containerHeight + paddingBR.y > size.y) {
          dy = containerPos.y + containerHeight - size.y + paddingBR.y;
        }
        if (containerPos.y - dy - paddingTL.y < 0) {
          dy = containerPos.y - paddingTL.y;
        }
        if (dx || dy) {
          if (this.options.keepInView) {
            this._autopanning = true;
          }
          map.fire("autopanstart").panBy([dx, dy]);
        }
      },
      _getAnchor: function() {
        return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    });
    var popup = function(options, source) {
      return new Popup(options, source);
    };
    Map.mergeOptions({
      closePopupOnClick: true
    });
    Map.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(popup2, latlng, options) {
        this._initOverlay(Popup, popup2, latlng, options).openOn(this);
        return this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(popup2) {
        popup2 = arguments.length ? popup2 : this._popup;
        if (popup2) {
          popup2.close();
        }
        return this;
      }
    });
    Layer.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(content, options) {
        this._popup = this._initOverlay(Popup, this._popup, content, options);
        if (!this._popupHandlersAdded) {
          this.on({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          });
          this._popupHandlersAdded = true;
        }
        return this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        if (this._popup) {
          this.off({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          });
          this._popupHandlersAdded = false;
          this._popup = null;
        }
        return this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(latlng) {
        if (this._popup) {
          if (!(this instanceof FeatureGroup)) {
            this._popup._source = this;
          }
          if (this._popup._prepareOpen(latlng || this._latlng)) {
            this._popup.openOn(this._map);
          }
        }
        return this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        if (this._popup) {
          this._popup.close();
        }
        return this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        if (this._popup) {
          this._popup.toggle(this);
        }
        return this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : false;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(content) {
        if (this._popup) {
          this._popup.setContent(content);
        }
        return this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(e) {
        if (!this._popup || !this._map) {
          return;
        }
        stop(e);
        var target = e.layer || e.target;
        if (this._popup._source === target && !(target instanceof Path)) {
          if (this._map.hasLayer(this._popup)) {
            this.closePopup();
          } else {
            this.openPopup(e.latlng);
          }
          return;
        }
        this._popup._source = target;
        this.openPopup(e.latlng);
      },
      _movePopup: function(e) {
        this._popup.setLatLng(e.latlng);
      },
      _onKeyPress: function(e) {
        if (e.originalEvent.keyCode === 13) {
          this._openPopup(e);
        }
      }
    });
    var Tooltip = DivOverlay.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: false,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: false,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(map) {
        DivOverlay.prototype.onAdd.call(this, map);
        this.setOpacity(this.options.opacity);
        map.fire("tooltipopen", { tooltip: this });
        if (this._source) {
          this.addEventParent(this._source);
          this._source.fire("tooltipopen", { tooltip: this }, true);
        }
      },
      onRemove: function(map) {
        DivOverlay.prototype.onRemove.call(this, map);
        map.fire("tooltipclose", { tooltip: this });
        if (this._source) {
          this.removeEventParent(this._source);
          this._source.fire("tooltipclose", { tooltip: this }, true);
        }
      },
      getEvents: function() {
        var events = DivOverlay.prototype.getEvents.call(this);
        if (!this.options.permanent) {
          events.preclick = this.close;
        }
        return events;
      },
      _initLayout: function() {
        var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = create$1("div", className);
        this._container.setAttribute("role", "tooltip");
        this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(pos) {
        var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
        if (direction === "top") {
          subX = tooltipWidth / 2;
          subY = tooltipHeight;
        } else if (direction === "bottom") {
          subX = tooltipWidth / 2;
          subY = 0;
        } else if (direction === "center") {
          subX = tooltipWidth / 2;
          subY = tooltipHeight / 2;
        } else if (direction === "right") {
          subX = 0;
          subY = tooltipHeight / 2;
        } else if (direction === "left") {
          subX = tooltipWidth;
          subY = tooltipHeight / 2;
        } else if (tooltipPoint.x < centerPoint.x) {
          direction = "right";
          subX = 0;
          subY = tooltipHeight / 2;
        } else {
          direction = "left";
          subX = tooltipWidth + (offset.x + anchor.x) * 2;
          subY = tooltipHeight / 2;
        }
        pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
        removeClass(container, "leaflet-tooltip-right");
        removeClass(container, "leaflet-tooltip-left");
        removeClass(container, "leaflet-tooltip-top");
        removeClass(container, "leaflet-tooltip-bottom");
        addClass(container, "leaflet-tooltip-" + direction);
        setPosition(container, pos);
      },
      _updatePosition: function() {
        var pos = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(pos);
      },
      setOpacity: function(opacity) {
        this.options.opacity = opacity;
        if (this._container) {
          setOpacity(this._container, opacity);
        }
      },
      _animateZoom: function(e) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
        this._setPosition(pos);
      },
      _getAnchor: function() {
        return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    });
    var tooltip = function(options, source) {
      return new Tooltip(options, source);
    };
    Map.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(tooltip2, latlng, options) {
        this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
        return this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(tooltip2) {
        tooltip2.close();
        return this;
      }
    });
    Layer.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(content, options) {
        if (this._tooltip && this.isTooltipOpen()) {
          this.unbindTooltip();
        }
        this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
        this._initTooltipInteractions();
        if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
          this.openTooltip();
        }
        return this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        if (this._tooltip) {
          this._initTooltipInteractions(true);
          this.closeTooltip();
          this._tooltip = null;
        }
        return this;
      },
      _initTooltipInteractions: function(remove2) {
        if (!remove2 && this._tooltipHandlersAdded) {
          return;
        }
        var onOff = remove2 ? "off" : "on", events = {
          remove: this.closeTooltip,
          move: this._moveTooltip
        };
        if (!this._tooltip.options.permanent) {
          events.mouseover = this._openTooltip;
          events.mouseout = this.closeTooltip;
          events.click = this._openTooltip;
          if (this._map) {
            this._addFocusListeners();
          } else {
            events.add = this._addFocusListeners;
          }
        } else {
          events.add = this._openTooltip;
        }
        if (this._tooltip.options.sticky) {
          events.mousemove = this._moveTooltip;
        }
        this[onOff](events);
        this._tooltipHandlersAdded = !remove2;
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(latlng) {
        if (this._tooltip) {
          if (!(this instanceof FeatureGroup)) {
            this._tooltip._source = this;
          }
          if (this._tooltip._prepareOpen(latlng)) {
            this._tooltip.openOn(this._map);
            if (this.getElement) {
              this._setAriaDescribedByOnLayer(this);
            } else if (this.eachLayer) {
              this.eachLayer(this._setAriaDescribedByOnLayer, this);
            }
          }
        }
        return this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip) {
          return this._tooltip.close();
        }
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        if (this._tooltip) {
          this._tooltip.toggle(this);
        }
        return this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(content) {
        if (this._tooltip) {
          this._tooltip.setContent(content);
        }
        return this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        if (this.getElement) {
          this._addFocusListenersOnLayer(this);
        } else if (this.eachLayer) {
          this.eachLayer(this._addFocusListenersOnLayer, this);
        }
      },
      _addFocusListenersOnLayer: function(layer) {
        var el = typeof layer.getElement === "function" && layer.getElement();
        if (el) {
          on(el, "focus", function() {
            this._tooltip._source = layer;
            this.openTooltip();
          }, this);
          on(el, "blur", this.closeTooltip, this);
        }
      },
      _setAriaDescribedByOnLayer: function(layer) {
        var el = typeof layer.getElement === "function" && layer.getElement();
        if (el) {
          el.setAttribute("aria-describedby", this._tooltip._container.id);
        }
      },
      _openTooltip: function(e) {
        if (!this._tooltip || !this._map) {
          return;
        }
        if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
          this._openOnceFlag = true;
          var that = this;
          this._map.once("moveend", function() {
            that._openOnceFlag = false;
            that._openTooltip(e);
          });
          return;
        }
        this._tooltip._source = e.layer || e.target;
        this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
      },
      _moveTooltip: function(e) {
        var latlng = e.latlng, containerPoint, layerPoint;
        if (this._tooltip.options.sticky && e.originalEvent) {
          containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
          layerPoint = this._map.containerPointToLayerPoint(containerPoint);
          latlng = this._map.layerPointToLatLng(layerPoint);
        }
        this._tooltip.setLatLng(latlng);
      }
    });
    var DivIcon = Icon.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: false,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(oldIcon) {
        var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
        if (options.html instanceof Element) {
          empty(div);
          div.appendChild(options.html);
        } else {
          div.innerHTML = options.html !== false ? options.html : "";
        }
        if (options.bgPos) {
          var bgPos = toPoint(options.bgPos);
          div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
        }
        this._setIconStyles(div, "icon");
        return div;
      },
      createShadow: function() {
        return null;
      }
    });
    function divIcon(options) {
      return new DivIcon(options);
    }
    Icon.Default = IconDefault;
    var GridLayer = Layer.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: Browser.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: true,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: false,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(options) {
        setOptions(this, options);
      },
      onAdd: function() {
        this._initContainer();
        this._levels = {};
        this._tiles = {};
        this._resetView();
      },
      beforeAdd: function(map) {
        map._addZoomLimit(this);
      },
      onRemove: function(map) {
        this._removeAllTiles();
        remove(this._container);
        map._removeZoomLimit(this);
        this._container = null;
        this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        if (this._map) {
          toFront(this._container);
          this._setAutoZIndex(Math.max);
        }
        return this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        if (this._map) {
          toBack(this._container);
          this._setAutoZIndex(Math.min);
        }
        return this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(zIndex) {
        this.options.zIndex = zIndex;
        this._updateZIndex();
        return this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var tileZoom = this._clampZoom(this._map.getZoom());
          if (tileZoom !== this._tileZoom) {
            this._tileZoom = tileZoom;
            this._updateLevels();
          }
          this._update();
        }
        return this;
      },
      getEvents: function() {
        var events = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        if (!this.options.updateWhenIdle) {
          if (!this._onMove) {
            this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
          }
          events.move = this._onMove;
        }
        if (this._zoomAnimated) {
          events.zoomanim = this._animateZoom;
        }
        return events;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var s = this.options.tileSize;
        return s instanceof Point ? s : new Point(s, s);
      },
      _updateZIndex: function() {
        if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
          this._container.style.zIndex = this.options.zIndex;
        }
      },
      _setAutoZIndex: function(compare) {
        var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
        for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
          zIndex = layers2[i].style.zIndex;
          if (layers2[i] !== this._container && zIndex) {
            edgeZIndex = compare(edgeZIndex, +zIndex);
          }
        }
        if (isFinite(edgeZIndex)) {
          this.options.zIndex = edgeZIndex + compare(-1, 1);
          this._updateZIndex();
        }
      },
      _updateOpacity: function() {
        if (!this._map) {
          return;
        }
        if (Browser.ielt9) {
          return;
        }
        setOpacity(this._container, this.options.opacity);
        var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
        for (var key in this._tiles) {
          var tile = this._tiles[key];
          if (!tile.current || !tile.loaded) {
            continue;
          }
          var fade = Math.min(1, (now - tile.loaded) / 200);
          setOpacity(tile.el, fade);
          if (fade < 1) {
            nextFrame = true;
          } else {
            if (tile.active) {
              willPrune = true;
            } else {
              this._onOpaqueTile(tile);
            }
            tile.active = true;
          }
        }
        if (willPrune && !this._noPrune) {
          this._pruneTiles();
        }
        if (nextFrame) {
          cancelAnimFrame(this._fadeFrame);
          this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
        }
      },
      _onOpaqueTile: falseFn,
      _initContainer: function() {
        if (this._container) {
          return;
        }
        this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
        this._updateZIndex();
        if (this.options.opacity < 1) {
          this._updateOpacity();
        }
        this.getPane().appendChild(this._container);
      },
      _updateLevels: function() {
        var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
        if (zoom2 === void 0) {
          return void 0;
        }
        for (var z in this._levels) {
          z = Number(z);
          if (this._levels[z].el.children.length || z === zoom2) {
            this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
            this._onUpdateLevel(z);
          } else {
            remove(this._levels[z].el);
            this._removeTilesAtZoom(z);
            this._onRemoveLevel(z);
            delete this._levels[z];
          }
        }
        var level = this._levels[zoom2], map = this._map;
        if (!level) {
          level = this._levels[zoom2] = {};
          level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
          level.el.style.zIndex = maxZoom;
          level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
          level.zoom = zoom2;
          this._setZoomTransform(level, map.getCenter(), map.getZoom());
          falseFn(level.el.offsetWidth);
          this._onCreateLevel(level);
        }
        this._level = level;
        return level;
      },
      _onUpdateLevel: falseFn,
      _onRemoveLevel: falseFn,
      _onCreateLevel: falseFn,
      _pruneTiles: function() {
        if (!this._map) {
          return;
        }
        var key, tile;
        var zoom2 = this._map.getZoom();
        if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
          this._removeAllTiles();
          return;
        }
        for (key in this._tiles) {
          tile = this._tiles[key];
          tile.retain = tile.current;
        }
        for (key in this._tiles) {
          tile = this._tiles[key];
          if (tile.current && !tile.active) {
            var coords = tile.coords;
            if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
              this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
            }
          }
        }
        for (key in this._tiles) {
          if (!this._tiles[key].retain) {
            this._removeTile(key);
          }
        }
      },
      _removeTilesAtZoom: function(zoom2) {
        for (var key in this._tiles) {
          if (this._tiles[key].coords.z !== zoom2) {
            continue;
          }
          this._removeTile(key);
        }
      },
      _removeAllTiles: function() {
        for (var key in this._tiles) {
          this._removeTile(key);
        }
      },
      _invalidateAll: function() {
        for (var z in this._levels) {
          remove(this._levels[z].el);
          this._onRemoveLevel(Number(z));
          delete this._levels[z];
        }
        this._removeAllTiles();
        this._tileZoom = void 0;
      },
      _retainParent: function(x, y, z, minZoom) {
        var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x2, +y2);
        coords2.z = +z2;
        var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
        if (tile && tile.active) {
          tile.retain = true;
          return true;
        } else if (tile && tile.loaded) {
          tile.retain = true;
        }
        if (z2 > minZoom) {
          return this._retainParent(x2, y2, z2, minZoom);
        }
        return false;
      },
      _retainChildren: function(x, y, z, maxZoom) {
        for (var i = 2 * x; i < 2 * x + 2; i++) {
          for (var j = 2 * y; j < 2 * y + 2; j++) {
            var coords = new Point(i, j);
            coords.z = z + 1;
            var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
            if (tile && tile.active) {
              tile.retain = true;
              continue;
            } else if (tile && tile.loaded) {
              tile.retain = true;
            }
            if (z + 1 < maxZoom) {
              this._retainChildren(i, j, z + 1, maxZoom);
            }
          }
        }
      },
      _resetView: function(e) {
        var animating = e && (e.pinch || e.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
      },
      _animateZoom: function(e) {
        this._setView(e.center, e.zoom, true, e.noUpdate);
      },
      _clampZoom: function(zoom2) {
        var options = this.options;
        if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
          return options.minNativeZoom;
        }
        if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
          return options.maxNativeZoom;
        }
        return zoom2;
      },
      _setView: function(center, zoom2, noPrune, noUpdate) {
        var tileZoom = Math.round(zoom2);
        if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
          tileZoom = void 0;
        } else {
          tileZoom = this._clampZoom(tileZoom);
        }
        var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
        if (!noUpdate || tileZoomChanged) {
          this._tileZoom = tileZoom;
          if (this._abortLoading) {
            this._abortLoading();
          }
          this._updateLevels();
          this._resetGrid();
          if (tileZoom !== void 0) {
            this._update(center);
          }
          if (!noPrune) {
            this._pruneTiles();
          }
          this._noPrune = !!noPrune;
        }
        this._setZoomTransforms(center, zoom2);
      },
      _setZoomTransforms: function(center, zoom2) {
        for (var i in this._levels) {
          this._setZoomTransform(this._levels[i], center, zoom2);
        }
      },
      _setZoomTransform: function(level, center, zoom2) {
        var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
        if (Browser.any3d) {
          setTransform(level.el, translate, scale2);
        } else {
          setPosition(level.el, translate);
        }
      },
      _resetGrid: function() {
        var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
        var bounds = this._map.getPixelWorldBounds(this._tileZoom);
        if (bounds) {
          this._globalTileRange = this._pxBoundsToTileRange(bounds);
        }
        this._wrapX = crs.wrapLng && !this.options.noWrap && [
          Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
          Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
        ];
        this._wrapY = crs.wrapLat && !this.options.noWrap && [
          Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
          Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
        ];
      },
      _onMoveEnd: function() {
        if (!this._map || this._map._animatingZoom) {
          return;
        }
        this._update();
      },
      _getTiledPixelBounds: function(center) {
        var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
        return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(center) {
        var map = this._map;
        if (!map) {
          return;
        }
        var zoom2 = this._clampZoom(map.getZoom());
        if (center === void 0) {
          center = map.getCenter();
        }
        if (this._tileZoom === void 0) {
          return;
        }
        var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
          tileRange.getBottomLeft().subtract([margin, -margin]),
          tileRange.getTopRight().add([margin, -margin])
        );
        if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
          throw new Error("Attempted to load an infinite number of tiles");
        }
        for (var key in this._tiles) {
          var c = this._tiles[key].coords;
          if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
            this._tiles[key].current = false;
          }
        }
        if (Math.abs(zoom2 - this._tileZoom) > 1) {
          this._setView(center, zoom2);
          return;
        }
        for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
          for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
            var coords = new Point(i, j);
            coords.z = this._tileZoom;
            if (!this._isValidTile(coords)) {
              continue;
            }
            var tile = this._tiles[this._tileCoordsToKey(coords)];
            if (tile) {
              tile.current = true;
            } else {
              queue.push(coords);
            }
          }
        }
        queue.sort(function(a, b) {
          return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
        });
        if (queue.length !== 0) {
          if (!this._loading) {
            this._loading = true;
            this.fire("loading");
          }
          var fragment = document.createDocumentFragment();
          for (i = 0; i < queue.length; i++) {
            this._addTile(queue[i], fragment);
          }
          this._level.el.appendChild(fragment);
        }
      },
      _isValidTile: function(coords) {
        var crs = this._map.options.crs;
        if (!crs.infinite) {
          var bounds = this._globalTileRange;
          if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
            return false;
          }
        }
        if (!this.options.bounds) {
          return true;
        }
        var tileBounds = this._tileCoordsToBounds(coords);
        return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
      },
      _keyToBounds: function(key) {
        return this._tileCoordsToBounds(this._keyToTileCoords(key));
      },
      _tileCoordsToNwSe: function(coords) {
        var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se = map.unproject(sePoint, coords.z);
        return [nw, se];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(coords) {
        var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
        if (!this.options.noWrap) {
          bounds = this._map.wrapLatLngBounds(bounds);
        }
        return bounds;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(coords) {
        return coords.x + ":" + coords.y + ":" + coords.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(key) {
        var k = key.split(":"), coords = new Point(+k[0], +k[1]);
        coords.z = +k[2];
        return coords;
      },
      _removeTile: function(key) {
        var tile = this._tiles[key];
        if (!tile) {
          return;
        }
        remove(tile.el);
        delete this._tiles[key];
        this.fire("tileunload", {
          tile: tile.el,
          coords: this._keyToTileCoords(key)
        });
      },
      _initTile: function(tile) {
        addClass(tile, "leaflet-tile");
        var tileSize = this.getTileSize();
        tile.style.width = tileSize.x + "px";
        tile.style.height = tileSize.y + "px";
        tile.onselectstart = falseFn;
        tile.onmousemove = falseFn;
        if (Browser.ielt9 && this.options.opacity < 1) {
          setOpacity(tile, this.options.opacity);
        }
      },
      _addTile: function(coords, container) {
        var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
        var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
        this._initTile(tile);
        if (this.createTile.length < 2) {
          requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
        }
        setPosition(tile, tilePos);
        this._tiles[key] = {
          el: tile,
          coords,
          current: true
        };
        container.appendChild(tile);
        this.fire("tileloadstart", {
          tile,
          coords
        });
      },
      _tileReady: function(coords, err, tile) {
        if (err) {
          this.fire("tileerror", {
            error: err,
            tile,
            coords
          });
        }
        var key = this._tileCoordsToKey(coords);
        tile = this._tiles[key];
        if (!tile) {
          return;
        }
        tile.loaded = +/* @__PURE__ */ new Date();
        if (this._map._fadeAnimated) {
          setOpacity(tile.el, 0);
          cancelAnimFrame(this._fadeFrame);
          this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
        } else {
          tile.active = true;
          this._pruneTiles();
        }
        if (!err) {
          addClass(tile.el, "leaflet-tile-loaded");
          this.fire("tileload", {
            tile: tile.el,
            coords
          });
        }
        if (this._noTilesToLoad()) {
          this._loading = false;
          this.fire("load");
          if (Browser.ielt9 || !this._map._fadeAnimated) {
            requestAnimFrame(this._pruneTiles, this);
          } else {
            setTimeout(bind(this._pruneTiles, this), 250);
          }
        }
      },
      _getTilePos: function(coords) {
        return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(coords) {
        var newCoords = new Point(
          this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
          this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
        );
        newCoords.z = coords.z;
        return newCoords;
      },
      _pxBoundsToTileRange: function(bounds) {
        var tileSize = this.getTileSize();
        return new Bounds(
          bounds.min.unscaleBy(tileSize).floor(),
          bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var key in this._tiles) {
          if (!this._tiles[key].loaded) {
            return false;
          }
        }
        return true;
      }
    });
    function gridLayer(options) {
      return new GridLayer(options);
    }
    var TileLayer = GridLayer.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: false,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: false,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: false,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: false
      },
      initialize: function(url, options) {
        this._url = url;
        options = setOptions(this, options);
        if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
          options.tileSize = Math.floor(options.tileSize / 2);
          if (!options.zoomReverse) {
            options.zoomOffset++;
            options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
          } else {
            options.zoomOffset--;
            options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
          }
          options.minZoom = Math.max(0, options.minZoom);
        } else if (!options.zoomReverse) {
          options.maxZoom = Math.max(options.minZoom, options.maxZoom);
        } else {
          options.minZoom = Math.min(options.maxZoom, options.minZoom);
        }
        if (typeof options.subdomains === "string") {
          options.subdomains = options.subdomains.split("");
        }
        this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(url, noRedraw) {
        if (this._url === url && noRedraw === void 0) {
          noRedraw = true;
        }
        this._url = url;
        if (!noRedraw) {
          this.redraw();
        }
        return this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(coords, done) {
        var tile = document.createElement("img");
        on(tile, "load", bind(this._tileOnLoad, this, done, tile));
        on(tile, "error", bind(this._tileOnError, this, done, tile));
        if (this.options.crossOrigin || this.options.crossOrigin === "") {
          tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
        }
        if (typeof this.options.referrerPolicy === "string") {
          tile.referrerPolicy = this.options.referrerPolicy;
        }
        tile.alt = "";
        tile.src = this.getTileUrl(coords);
        return tile;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(coords) {
        var data = {
          r: Browser.retina ? "@2x" : "",
          s: this._getSubdomain(coords),
          x: coords.x,
          y: coords.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var invertedY = this._globalTileRange.max.y - coords.y;
          if (this.options.tms) {
            data["y"] = invertedY;
          }
          data["-y"] = invertedY;
        }
        return template(this._url, extend(data, this.options));
      },
      _tileOnLoad: function(done, tile) {
        if (Browser.ielt9) {
          setTimeout(bind(done, this, null, tile), 0);
        } else {
          done(null, tile);
        }
      },
      _tileOnError: function(done, tile, e) {
        var errorUrl = this.options.errorTileUrl;
        if (errorUrl && tile.getAttribute("src") !== errorUrl) {
          tile.src = errorUrl;
        }
        done(e, tile);
      },
      _onTileRemove: function(e) {
        e.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
        if (zoomReverse) {
          zoom2 = maxZoom - zoom2;
        }
        return zoom2 + zoomOffset;
      },
      _getSubdomain: function(tilePoint) {
        var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index2];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var i, tile;
        for (i in this._tiles) {
          if (this._tiles[i].coords.z !== this._tileZoom) {
            tile = this._tiles[i].el;
            tile.onload = falseFn;
            tile.onerror = falseFn;
            if (!tile.complete) {
              tile.src = emptyImageUrl;
              var coords = this._tiles[i].coords;
              remove(tile);
              delete this._tiles[i];
              this.fire("tileabort", {
                tile,
                coords
              });
            }
          }
        }
      },
      _removeTile: function(key) {
        var tile = this._tiles[key];
        if (!tile) {
          return;
        }
        tile.el.setAttribute("src", emptyImageUrl);
        return GridLayer.prototype._removeTile.call(this, key);
      },
      _tileReady: function(coords, err, tile) {
        if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
          return;
        }
        return GridLayer.prototype._tileReady.call(this, coords, err, tile);
      }
    });
    function tileLayer(url, options) {
      return new TileLayer(url, options);
    }
    var TileLayerWMS = TileLayer.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: false,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: false
      },
      initialize: function(url, options) {
        this._url = url;
        var wmsParams = extend({}, this.defaultWmsParams);
        for (var i in options) {
          if (!(i in this.options)) {
            wmsParams[i] = options[i];
          }
        }
        options = setOptions(this, options);
        var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
        var tileSize = this.getTileSize();
        wmsParams.width = tileSize.x * realRetina;
        wmsParams.height = tileSize.y * realRetina;
        this.wmsParams = wmsParams;
      },
      onAdd: function(map) {
        this._crs = this.options.crs || map.options.crs;
        this._wmsVersion = parseFloat(this.wmsParams.version);
        var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[projectionKey] = this._crs.code;
        TileLayer.prototype.onAdd.call(this, map);
      },
      getTileUrl: function(coords) {
        var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
        return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(params, noRedraw) {
        extend(this.wmsParams, params);
        if (!noRedraw) {
          this.redraw();
        }
        return this;
      }
    });
    function tileLayerWMS(url, options) {
      return new TileLayerWMS(url, options);
    }
    TileLayer.WMS = TileLayerWMS;
    tileLayer.wms = tileLayerWMS;
    var Renderer = Layer.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(options) {
        setOptions(this, options);
        stamp(this);
        this._layers = this._layers || {};
      },
      onAdd: function() {
        if (!this._container) {
          this._initContainer();
          addClass(this._container, "leaflet-zoom-animated");
        }
        this.getPane().appendChild(this._container);
        this._update();
        this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this);
        this._destroyContainer();
      },
      getEvents: function() {
        var events = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        if (this._zoomAnimated) {
          events.zoomanim = this._onAnimZoom;
        }
        return events;
      },
      _onAnimZoom: function(ev) {
        this._updateTransform(ev.center, ev.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(center, zoom2) {
        var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
        if (Browser.any3d) {
          setTransform(this._container, topLeftOffset, scale2);
        } else {
          setPosition(this._container, topLeftOffset);
        }
      },
      _reset: function() {
        this._update();
        this._updateTransform(this._center, this._zoom);
        for (var id in this._layers) {
          this._layers[id]._reset();
        }
      },
      _onZoomEnd: function() {
        for (var id in this._layers) {
          this._layers[id]._project();
        }
      },
      _updatePaths: function() {
        for (var id in this._layers) {
          this._layers[id]._update();
        }
      },
      _update: function() {
        var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
        this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
        this._center = this._map.getCenter();
        this._zoom = this._map.getZoom();
      }
    });
    var Canvas = Renderer.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var events = Renderer.prototype.getEvents.call(this);
        events.viewprereset = this._onViewPreReset;
        return events;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = true;
      },
      onAdd: function() {
        Renderer.prototype.onAdd.call(this);
        this._draw();
      },
      _initContainer: function() {
        var container = this._container = document.createElement("canvas");
        on(container, "mousemove", this._onMouseMove, this);
        on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
        on(container, "mouseout", this._handleMouseOut, this);
        container["_leaflet_disable_events"] = true;
        this._ctx = container.getContext("2d");
      },
      _destroyContainer: function() {
        cancelAnimFrame(this._redrawRequest);
        delete this._ctx;
        remove(this._container);
        off(this._container);
        delete this._container;
      },
      _updatePaths: function() {
        if (this._postponeUpdatePaths) {
          return;
        }
        var layer;
        this._redrawBounds = null;
        for (var id in this._layers) {
          layer = this._layers[id];
          layer._update();
        }
        this._redraw();
      },
      _update: function() {
        if (this._map._animatingZoom && this._bounds) {
          return;
        }
        Renderer.prototype._update.call(this);
        var b = this._bounds, container = this._container, size = b.getSize(), m = Browser.retina ? 2 : 1;
        setPosition(container, b.min);
        container.width = m * size.x;
        container.height = m * size.y;
        container.style.width = size.x + "px";
        container.style.height = size.y + "px";
        if (Browser.retina) {
          this._ctx.scale(2, 2);
        }
        this._ctx.translate(-b.min.x, -b.min.y);
        this.fire("update");
      },
      _reset: function() {
        Renderer.prototype._reset.call(this);
        if (this._postponeUpdatePaths) {
          this._postponeUpdatePaths = false;
          this._updatePaths();
        }
      },
      _initPath: function(layer) {
        this._updateDashArray(layer);
        this._layers[stamp(layer)] = layer;
        var order = layer._order = {
          layer,
          prev: this._drawLast,
          next: null
        };
        if (this._drawLast) {
          this._drawLast.next = order;
        }
        this._drawLast = order;
        this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(layer) {
        this._requestRedraw(layer);
      },
      _removePath: function(layer) {
        var order = layer._order;
        var next = order.next;
        var prev = order.prev;
        if (next) {
          next.prev = prev;
        } else {
          this._drawLast = prev;
        }
        if (prev) {
          prev.next = next;
        } else {
          this._drawFirst = next;
        }
        delete layer._order;
        delete this._layers[stamp(layer)];
        this._requestRedraw(layer);
      },
      _updatePath: function(layer) {
        this._extendRedrawBounds(layer);
        layer._project();
        layer._update();
        this._requestRedraw(layer);
      },
      _updateStyle: function(layer) {
        this._updateDashArray(layer);
        this._requestRedraw(layer);
      },
      _updateDashArray: function(layer) {
        if (typeof layer.options.dashArray === "string") {
          var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
          for (i = 0; i < parts.length; i++) {
            dashValue = Number(parts[i]);
            if (isNaN(dashValue)) {
              return;
            }
            dashArray.push(dashValue);
          }
          layer.options._dashArray = dashArray;
        } else {
          layer.options._dashArray = layer.options.dashArray;
        }
      },
      _requestRedraw: function(layer) {
        if (!this._map) {
          return;
        }
        this._extendRedrawBounds(layer);
        this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
      },
      _extendRedrawBounds: function(layer) {
        if (layer._pxBounds) {
          var padding = (layer.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new Bounds();
          this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
          this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null;
        if (this._redrawBounds) {
          this._redrawBounds.min._floor();
          this._redrawBounds.max._ceil();
        }
        this._clear();
        this._draw();
        this._redrawBounds = null;
      },
      _clear: function() {
        var bounds = this._redrawBounds;
        if (bounds) {
          var size = bounds.getSize();
          this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
        } else {
          this._ctx.save();
          this._ctx.setTransform(1, 0, 0, 1, 0, 0);
          this._ctx.clearRect(0, 0, this._container.width, this._container.height);
          this._ctx.restore();
        }
      },
      _draw: function() {
        var layer, bounds = this._redrawBounds;
        this._ctx.save();
        if (bounds) {
          var size = bounds.getSize();
          this._ctx.beginPath();
          this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
          this._ctx.clip();
        }
        this._drawing = true;
        for (var order = this._drawFirst; order; order = order.next) {
          layer = order.layer;
          if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
            layer._updatePath();
          }
        }
        this._drawing = false;
        this._ctx.restore();
      },
      _updatePoly: function(layer, closed) {
        if (!this._drawing) {
          return;
        }
        var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
        if (!len) {
          return;
        }
        ctx.beginPath();
        for (i = 0; i < len; i++) {
          for (j = 0, len2 = parts[i].length; j < len2; j++) {
            p = parts[i][j];
            ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
          }
          if (closed) {
            ctx.closePath();
          }
        }
        this._fillStroke(ctx, layer);
      },
      _updateCircle: function(layer) {
        if (!this._drawing || layer._empty()) {
          return;
        }
        var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
        if (s !== 1) {
          ctx.save();
          ctx.scale(1, s);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
        if (s !== 1) {
          ctx.restore();
        }
        this._fillStroke(ctx, layer);
      },
      _fillStroke: function(ctx, layer) {
        var options = layer.options;
        if (options.fill) {
          ctx.globalAlpha = options.fillOpacity;
          ctx.fillStyle = options.fillColor || options.color;
          ctx.fill(options.fillRule || "evenodd");
        }
        if (options.stroke && options.weight !== 0) {
          if (ctx.setLineDash) {
            ctx.setLineDash(layer.options && layer.options._dashArray || []);
          }
          ctx.globalAlpha = options.opacity;
          ctx.lineWidth = options.weight;
          ctx.strokeStyle = options.color;
          ctx.lineCap = options.lineCap;
          ctx.lineJoin = options.lineJoin;
          ctx.stroke();
        }
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(e) {
        var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
        for (var order = this._drawFirst; order; order = order.next) {
          layer = order.layer;
          if (layer.options.interactive && layer._containsPoint(point)) {
            if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
              clickedLayer = layer;
            }
          }
        }
        this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
      },
      _onMouseMove: function(e) {
        if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
          return;
        }
        var point = this._map.mouseEventToLayerPoint(e);
        this._handleMouseHover(e, point);
      },
      _handleMouseOut: function(e) {
        var layer = this._hoveredLayer;
        if (layer) {
          removeClass(this._container, "leaflet-interactive");
          this._fireEvent([layer], e, "mouseout");
          this._hoveredLayer = null;
          this._mouseHoverThrottled = false;
        }
      },
      _handleMouseHover: function(e, point) {
        if (this._mouseHoverThrottled) {
          return;
        }
        var layer, candidateHoveredLayer;
        for (var order = this._drawFirst; order; order = order.next) {
          layer = order.layer;
          if (layer.options.interactive && layer._containsPoint(point)) {
            candidateHoveredLayer = layer;
          }
        }
        if (candidateHoveredLayer !== this._hoveredLayer) {
          this._handleMouseOut(e);
          if (candidateHoveredLayer) {
            addClass(this._container, "leaflet-interactive");
            this._fireEvent([candidateHoveredLayer], e, "mouseover");
            this._hoveredLayer = candidateHoveredLayer;
          }
        }
        this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
        this._mouseHoverThrottled = true;
        setTimeout(bind(function() {
          this._mouseHoverThrottled = false;
        }, this), 32);
      },
      _fireEvent: function(layers2, e, type) {
        this._map._fireDOMEvent(e, type || e.type, layers2);
      },
      _bringToFront: function(layer) {
        var order = layer._order;
        if (!order) {
          return;
        }
        var next = order.next;
        var prev = order.prev;
        if (next) {
          next.prev = prev;
        } else {
          return;
        }
        if (prev) {
          prev.next = next;
        } else if (next) {
          this._drawFirst = next;
        }
        order.prev = this._drawLast;
        this._drawLast.next = order;
        order.next = null;
        this._drawLast = order;
        this._requestRedraw(layer);
      },
      _bringToBack: function(layer) {
        var order = layer._order;
        if (!order) {
          return;
        }
        var next = order.next;
        var prev = order.prev;
        if (prev) {
          prev.next = next;
        } else {
          return;
        }
        if (next) {
          next.prev = prev;
        } else if (prev) {
          this._drawLast = prev;
        }
        order.prev = null;
        order.next = this._drawFirst;
        this._drawFirst.prev = order;
        this._drawFirst = order;
        this._requestRedraw(layer);
      }
    });
    function canvas(options) {
      return Browser.canvas ? new Canvas(options) : null;
    }
    var vmlCreate = function() {
      try {
        document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
        return function(name) {
          return document.createElement("<lvml:" + name + ' class="lvml">');
        };
      } catch (e) {
      }
      return function(name) {
        return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }();
    var vmlMixin = {
      _initContainer: function() {
        this._container = create$1("div", "leaflet-vml-container");
      },
      _update: function() {
        if (this._map._animatingZoom) {
          return;
        }
        Renderer.prototype._update.call(this);
        this.fire("update");
      },
      _initPath: function(layer) {
        var container = layer._container = vmlCreate("shape");
        addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
        container.coordsize = "1 1";
        layer._path = vmlCreate("path");
        container.appendChild(layer._path);
        this._updateStyle(layer);
        this._layers[stamp(layer)] = layer;
      },
      _addPath: function(layer) {
        var container = layer._container;
        this._container.appendChild(container);
        if (layer.options.interactive) {
          layer.addInteractiveTarget(container);
        }
      },
      _removePath: function(layer) {
        var container = layer._container;
        remove(container);
        layer.removeInteractiveTarget(container);
        delete this._layers[stamp(layer)];
      },
      _updateStyle: function(layer) {
        var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
        container.stroked = !!options.stroke;
        container.filled = !!options.fill;
        if (options.stroke) {
          if (!stroke) {
            stroke = layer._stroke = vmlCreate("stroke");
          }
          container.appendChild(stroke);
          stroke.weight = options.weight + "px";
          stroke.color = options.color;
          stroke.opacity = options.opacity;
          if (options.dashArray) {
            stroke.dashStyle = isArray2(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
          } else {
            stroke.dashStyle = "";
          }
          stroke.endcap = options.lineCap.replace("butt", "flat");
          stroke.joinstyle = options.lineJoin;
        } else if (stroke) {
          container.removeChild(stroke);
          layer._stroke = null;
        }
        if (options.fill) {
          if (!fill) {
            fill = layer._fill = vmlCreate("fill");
          }
          container.appendChild(fill);
          fill.color = options.fillColor || options.color;
          fill.opacity = options.fillOpacity;
        } else if (fill) {
          container.removeChild(fill);
          layer._fill = null;
        }
      },
      _updateCircle: function(layer) {
        var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
        this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
      },
      _setPath: function(layer, path) {
        layer._path.v = path;
      },
      _bringToFront: function(layer) {
        toFront(layer._container);
      },
      _bringToBack: function(layer) {
        toBack(layer._container);
      }
    };
    var create = Browser.vml ? vmlCreate : svgCreate;
    var SVG = Renderer.extend({
      _initContainer: function() {
        this._container = create("svg");
        this._container.setAttribute("pointer-events", "none");
        this._rootGroup = create("g");
        this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        remove(this._container);
        off(this._container);
        delete this._container;
        delete this._rootGroup;
        delete this._svgSize;
      },
      _update: function() {
        if (this._map._animatingZoom && this._bounds) {
          return;
        }
        Renderer.prototype._update.call(this);
        var b = this._bounds, size = b.getSize(), container = this._container;
        if (!this._svgSize || !this._svgSize.equals(size)) {
          this._svgSize = size;
          container.setAttribute("width", size.x);
          container.setAttribute("height", size.y);
        }
        setPosition(container, b.min);
        container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
        this.fire("update");
      },
      // methods below are called by vector layers implementations
      _initPath: function(layer) {
        var path = layer._path = create("path");
        if (layer.options.className) {
          addClass(path, layer.options.className);
        }
        if (layer.options.interactive) {
          addClass(path, "leaflet-interactive");
        }
        this._updateStyle(layer);
        this._layers[stamp(layer)] = layer;
      },
      _addPath: function(layer) {
        if (!this._rootGroup) {
          this._initContainer();
        }
        this._rootGroup.appendChild(layer._path);
        layer.addInteractiveTarget(layer._path);
      },
      _removePath: function(layer) {
        remove(layer._path);
        layer.removeInteractiveTarget(layer._path);
        delete this._layers[stamp(layer)];
      },
      _updatePath: function(layer) {
        layer._project();
        layer._update();
      },
      _updateStyle: function(layer) {
        var path = layer._path, options = layer.options;
        if (!path) {
          return;
        }
        if (options.stroke) {
          path.setAttribute("stroke", options.color);
          path.setAttribute("stroke-opacity", options.opacity);
          path.setAttribute("stroke-width", options.weight);
          path.setAttribute("stroke-linecap", options.lineCap);
          path.setAttribute("stroke-linejoin", options.lineJoin);
          if (options.dashArray) {
            path.setAttribute("stroke-dasharray", options.dashArray);
          } else {
            path.removeAttribute("stroke-dasharray");
          }
          if (options.dashOffset) {
            path.setAttribute("stroke-dashoffset", options.dashOffset);
          } else {
            path.removeAttribute("stroke-dashoffset");
          }
        } else {
          path.setAttribute("stroke", "none");
        }
        if (options.fill) {
          path.setAttribute("fill", options.fillColor || options.color);
          path.setAttribute("fill-opacity", options.fillOpacity);
          path.setAttribute("fill-rule", options.fillRule || "evenodd");
        } else {
          path.setAttribute("fill", "none");
        }
      },
      _updatePoly: function(layer, closed) {
        this._setPath(layer, pointsToPath(layer._parts, closed));
      },
      _updateCircle: function(layer) {
        var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
        var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
        this._setPath(layer, d);
      },
      _setPath: function(layer, path) {
        layer._path.setAttribute("d", path);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(layer) {
        toFront(layer._path);
      },
      _bringToBack: function(layer) {
        toBack(layer._path);
      }
    });
    if (Browser.vml) {
      SVG.include(vmlMixin);
    }
    function svg(options) {
      return Browser.svg || Browser.vml ? new SVG(options) : null;
    }
    Map.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(layer) {
        var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
        if (!renderer) {
          renderer = this._renderer = this._createRenderer();
        }
        if (!this.hasLayer(renderer)) {
          this.addLayer(renderer);
        }
        return renderer;
      },
      _getPaneRenderer: function(name) {
        if (name === "overlayPane" || name === void 0) {
          return false;
        }
        var renderer = this._paneRenderers[name];
        if (renderer === void 0) {
          renderer = this._createRenderer({ pane: name });
          this._paneRenderers[name] = renderer;
        }
        return renderer;
      },
      _createRenderer: function(options) {
        return this.options.preferCanvas && canvas(options) || svg(options);
      }
    });
    var Rectangle = Polygon.extend({
      initialize: function(latLngBounds, options) {
        Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(latLngBounds) {
        return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
      },
      _boundsToLatLngs: function(latLngBounds) {
        latLngBounds = toLatLngBounds(latLngBounds);
        return [
          latLngBounds.getSouthWest(),
          latLngBounds.getNorthWest(),
          latLngBounds.getNorthEast(),
          latLngBounds.getSouthEast()
        ];
      }
    });
    function rectangle(latLngBounds, options) {
      return new Rectangle(latLngBounds, options);
    }
    SVG.create = create;
    SVG.pointsToPath = pointsToPath;
    GeoJSON.geometryToLayer = geometryToLayer;
    GeoJSON.coordsToLatLng = coordsToLatLng;
    GeoJSON.coordsToLatLngs = coordsToLatLngs;
    GeoJSON.latLngToCoords = latLngToCoords;
    GeoJSON.latLngsToCoords = latLngsToCoords;
    GeoJSON.getFeature = getFeature;
    GeoJSON.asFeature = asFeature;
    Map.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: true
    });
    var BoxZoom = Handler.extend({
      initialize: function(map) {
        this._map = map;
        this._container = map._container;
        this._pane = map._panes.overlayPane;
        this._resetStateTimeout = 0;
        map.on("unload", this._destroy, this);
      },
      addHooks: function() {
        on(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        off(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        remove(this._pane);
        delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0;
        this._moved = false;
      },
      _clearDeferredResetState: function() {
        if (this._resetStateTimeout !== 0) {
          clearTimeout(this._resetStateTimeout);
          this._resetStateTimeout = 0;
        }
      },
      _onMouseDown: function(e) {
        if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
          return false;
        }
        this._clearDeferredResetState();
        this._resetState();
        disableTextSelection();
        disableImageDrag();
        this._startPoint = this._map.mouseEventToContainerPoint(e);
        on(document, {
          contextmenu: stop,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(e) {
        if (!this._moved) {
          this._moved = true;
          this._box = create$1("div", "leaflet-zoom-box", this._container);
          addClass(this._container, "leaflet-crosshair");
          this._map.fire("boxzoomstart");
        }
        this._point = this._map.mouseEventToContainerPoint(e);
        var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
        setPosition(this._box, bounds.min);
        this._box.style.width = size.x + "px";
        this._box.style.height = size.y + "px";
      },
      _finish: function() {
        if (this._moved) {
          remove(this._box);
          removeClass(this._container, "leaflet-crosshair");
        }
        enableTextSelection();
        enableImageDrag();
        off(document, {
          contextmenu: stop,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(e) {
        if (e.which !== 1 && e.button !== 1) {
          return;
        }
        this._finish();
        if (!this._moved) {
          return;
        }
        this._clearDeferredResetState();
        this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
        var bounds = new LatLngBounds(
          this._map.containerPointToLatLng(this._startPoint),
          this._map.containerPointToLatLng(this._point)
        );
        this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
      },
      _onKeyDown: function(e) {
        if (e.keyCode === 27) {
          this._finish();
          this._clearDeferredResetState();
          this._resetState();
        }
      }
    });
    Map.addInitHook("addHandler", "boxZoom", BoxZoom);
    Map.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: true
    });
    var DoubleClickZoom = Handler.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(e) {
        var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
        if (map.options.doubleClickZoom === "center") {
          map.setZoom(zoom2);
        } else {
          map.setZoomAround(e.containerPoint, zoom2);
        }
      }
    });
    Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
    Map.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: true,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: true,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: Infinity,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: false,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var Drag = Handler.extend({
      addHooks: function() {
        if (!this._draggable) {
          var map = this._map;
          this._draggable = new Draggable(map._mapPane, map._container);
          this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this);
          this._draggable.on("predrag", this._onPreDragLimit, this);
          if (map.options.worldCopyJump) {
            this._draggable.on("predrag", this._onPreDragWrap, this);
            map.on("zoomend", this._onZoomEnd, this);
            map.whenReady(this._onZoomEnd, this);
          }
        }
        addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
        this._draggable.enable();
        this._positions = [];
        this._times = [];
      },
      removeHooks: function() {
        removeClass(this._map._container, "leaflet-grab");
        removeClass(this._map._container, "leaflet-touch-drag");
        this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var map = this._map;
        map._stop();
        if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var bounds = toLatLngBounds(this._map.options.maxBounds);
          this._offsetLimit = toBounds(
            this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          );
          this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else {
          this._offsetLimit = null;
        }
        map.fire("movestart").fire("dragstart");
        if (map.options.inertia) {
          this._positions = [];
          this._times = [];
        }
      },
      _onDrag: function(e) {
        if (this._map.options.inertia) {
          var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(pos);
          this._times.push(time);
          this._prunePositions(time);
        }
        this._map.fire("move", e).fire("drag", e);
      },
      _prunePositions: function(time) {
        while (this._positions.length > 1 && time - this._times[0] > 50) {
          this._positions.shift();
          this._times.shift();
        }
      },
      _onZoomEnd: function() {
        var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
        this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(value, threshold) {
        return value - (value - threshold) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!this._viscosity || !this._offsetLimit) {
          return;
        }
        var offset = this._draggable._newPos.subtract(this._draggable._startPos);
        var limit = this._offsetLimit;
        if (offset.x < limit.min.x) {
          offset.x = this._viscousLimit(offset.x, limit.min.x);
        }
        if (offset.y < limit.min.y) {
          offset.y = this._viscousLimit(offset.y, limit.min.y);
        }
        if (offset.x > limit.max.x) {
          offset.x = this._viscousLimit(offset.x, limit.max.x);
        }
        if (offset.y > limit.max.y) {
          offset.y = this._viscousLimit(offset.y, limit.max.y);
        }
        this._draggable._newPos = this._draggable._startPos.add(offset);
      },
      _onPreDragWrap: function() {
        var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
        this._draggable._absPos = this._draggable._newPos.clone();
        this._draggable._newPos.x = newX;
      },
      _onDragEnd: function(e) {
        var map = this._map, options = map.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
        map.fire("dragend", e);
        if (noInertia) {
          map.fire("moveend");
        } else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
          if (!offset.x && !offset.y) {
            map.fire("moveend");
          } else {
            offset = map._limitOffset(offset, map.options.maxBounds);
            requestAnimFrame(function() {
              map.panBy(offset, {
                duration: decelerationDuration,
                easeLinearity: ease,
                noMoveStart: true,
                animate: true
              });
            });
          }
        }
      }
    });
    Map.addInitHook("addHandler", "dragging", Drag);
    Map.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: true,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var Keyboard = Handler.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(map) {
        this._map = map;
        this._setPanDelta(map.options.keyboardPanDelta);
        this._setZoomDelta(map.options.zoomDelta);
      },
      addHooks: function() {
        var container = this._map._container;
        if (container.tabIndex <= 0) {
          container.tabIndex = "0";
        }
        on(container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this);
        this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks();
        off(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this);
        this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (this._focused) {
          return;
        }
        var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
        this._map._container.focus();
        window.scrollTo(left, top);
      },
      _onFocus: function() {
        this._focused = true;
        this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = false;
        this._map.fire("blur");
      },
      _setPanDelta: function(panDelta) {
        var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
        for (i = 0, len = codes.left.length; i < len; i++) {
          keys[codes.left[i]] = [-1 * panDelta, 0];
        }
        for (i = 0, len = codes.right.length; i < len; i++) {
          keys[codes.right[i]] = [panDelta, 0];
        }
        for (i = 0, len = codes.down.length; i < len; i++) {
          keys[codes.down[i]] = [0, panDelta];
        }
        for (i = 0, len = codes.up.length; i < len; i++) {
          keys[codes.up[i]] = [0, -1 * panDelta];
        }
      },
      _setZoomDelta: function(zoomDelta) {
        var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
        for (i = 0, len = codes.zoomIn.length; i < len; i++) {
          keys[codes.zoomIn[i]] = zoomDelta;
        }
        for (i = 0, len = codes.zoomOut.length; i < len; i++) {
          keys[codes.zoomOut[i]] = -zoomDelta;
        }
      },
      _addHooks: function() {
        on(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        off(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(e) {
        if (e.altKey || e.ctrlKey || e.metaKey) {
          return;
        }
        var key = e.keyCode, map = this._map, offset;
        if (key in this._panKeys) {
          if (!map._panAnim || !map._panAnim._inProgress) {
            offset = this._panKeys[key];
            if (e.shiftKey) {
              offset = toPoint(offset).multiplyBy(3);
            }
            if (map.options.maxBounds) {
              offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
            }
            if (map.options.worldCopyJump) {
              var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
              map.panTo(newLatLng);
            } else {
              map.panBy(offset);
            }
          }
        } else if (key in this._zoomKeys) {
          map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
        } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
          map.closePopup();
        } else {
          return;
        }
        stop(e);
      }
    });
    Map.addInitHook("addHandler", "keyboard", Keyboard);
    Map.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: true,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var ScrollWheelZoom = Handler.extend({
      addHooks: function() {
        on(this._map._container, "wheel", this._onWheelScroll, this);
        this._delta = 0;
      },
      removeHooks: function() {
        off(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(e) {
        var delta = getWheelDelta(e);
        var debounce = this._map.options.wheelDebounceTime;
        this._delta += delta;
        this._lastMousePos = this._map.mouseEventToContainerPoint(e);
        if (!this._startTime) {
          this._startTime = +/* @__PURE__ */ new Date();
        }
        var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer);
        this._timer = setTimeout(bind(this._performZoom, this), left);
        stop(e);
      },
      _performZoom: function() {
        var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
        map._stop();
        var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
        this._delta = 0;
        this._startTime = null;
        if (!delta) {
          return;
        }
        if (map.options.scrollWheelZoom === "center") {
          map.setZoom(zoom2 + delta);
        } else {
          map.setZoomAround(this._lastMousePos, zoom2 + delta);
        }
      }
    });
    Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
    var tapHoldDelay = 600;
    Map.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var TapHold = Handler.extend({
      addHooks: function() {
        on(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        off(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(e) {
        clearTimeout(this._holdTimeout);
        if (e.touches.length !== 1) {
          return;
        }
        var first = e.touches[0];
        this._startPos = this._newPos = new Point(first.clientX, first.clientY);
        this._holdTimeout = setTimeout(bind(function() {
          this._cancel();
          if (!this._isTapValid()) {
            return;
          }
          on(document, "touchend", preventDefault);
          on(document, "touchend touchcancel", this._cancelClickPrevent);
          this._simulateEvent("contextmenu", first);
        }, this), tapHoldDelay);
        on(document, "touchend touchcancel contextmenu", this._cancel, this);
        on(document, "touchmove", this._onMove, this);
      },
      _cancelClickPrevent: function cancelClickPrevent() {
        off(document, "touchend", preventDefault);
        off(document, "touchend touchcancel", cancelClickPrevent);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout);
        off(document, "touchend touchcancel contextmenu", this._cancel, this);
        off(document, "touchmove", this._onMove, this);
      },
      _onMove: function(e) {
        var first = e.touches[0];
        this._newPos = new Point(first.clientX, first.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(type, e) {
        var simulatedEvent = new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          view: window,
          // detail: 1,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY
          // button: 2,
          // buttons: 2
        });
        simulatedEvent._simulated = true;
        e.target.dispatchEvent(simulatedEvent);
      }
    });
    Map.addInitHook("addHandler", "tapHold", TapHold);
    Map.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Browser.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: true
    });
    var TouchZoom = Handler.extend({
      addHooks: function() {
        addClass(this._map._container, "leaflet-touch-zoom");
        on(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        removeClass(this._map._container, "leaflet-touch-zoom");
        off(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(e) {
        var map = this._map;
        if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) {
          return;
        }
        var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
        this._centerPoint = map.getSize()._divideBy(2);
        this._startLatLng = map.containerPointToLatLng(this._centerPoint);
        if (map.options.touchZoom !== "center") {
          this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
        }
        this._startDist = p1.distanceTo(p2);
        this._startZoom = map.getZoom();
        this._moved = false;
        this._zooming = true;
        map._stop();
        on(document, "touchmove", this._onTouchMove, this);
        on(document, "touchend touchcancel", this._onTouchEnd, this);
        preventDefault(e);
      },
      _onTouchMove: function(e) {
        if (!e.touches || e.touches.length !== 2 || !this._zooming) {
          return;
        }
        var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
        this._zoom = map.getScaleZoom(scale2, this._startZoom);
        if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
          this._zoom = map._limitZoom(this._zoom);
        }
        if (map.options.touchZoom === "center") {
          this._center = this._startLatLng;
          if (scale2 === 1) {
            return;
          }
        } else {
          var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
          if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
            return;
          }
          this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
        }
        if (!this._moved) {
          map._moveStart(true, false);
          this._moved = true;
        }
        cancelAnimFrame(this._animRequest);
        var moveFn = bind(map._move, map, this._center, this._zoom, { pinch: true, round: false }, void 0);
        this._animRequest = requestAnimFrame(moveFn, this, true);
        preventDefault(e);
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = false;
          return;
        }
        this._zooming = false;
        cancelAnimFrame(this._animRequest);
        off(document, "touchmove", this._onTouchMove, this);
        off(document, "touchend touchcancel", this._onTouchEnd, this);
        if (this._map.options.zoomAnimation) {
          this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
        } else {
          this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      }
    });
    Map.addInitHook("addHandler", "touchZoom", TouchZoom);
    Map.BoxZoom = BoxZoom;
    Map.DoubleClickZoom = DoubleClickZoom;
    Map.Drag = Drag;
    Map.Keyboard = Keyboard;
    Map.ScrollWheelZoom = ScrollWheelZoom;
    Map.TapHold = TapHold;
    Map.TouchZoom = TouchZoom;
    exports2.Bounds = Bounds;
    exports2.Browser = Browser;
    exports2.CRS = CRS;
    exports2.Canvas = Canvas;
    exports2.Circle = Circle;
    exports2.CircleMarker = CircleMarker;
    exports2.Class = Class;
    exports2.Control = Control;
    exports2.DivIcon = DivIcon;
    exports2.DivOverlay = DivOverlay;
    exports2.DomEvent = DomEvent;
    exports2.DomUtil = DomUtil;
    exports2.Draggable = Draggable;
    exports2.Evented = Evented;
    exports2.FeatureGroup = FeatureGroup;
    exports2.GeoJSON = GeoJSON;
    exports2.GridLayer = GridLayer;
    exports2.Handler = Handler;
    exports2.Icon = Icon;
    exports2.ImageOverlay = ImageOverlay;
    exports2.LatLng = LatLng;
    exports2.LatLngBounds = LatLngBounds;
    exports2.Layer = Layer;
    exports2.LayerGroup = LayerGroup;
    exports2.LineUtil = LineUtil;
    exports2.Map = Map;
    exports2.Marker = Marker;
    exports2.Mixin = Mixin;
    exports2.Path = Path;
    exports2.Point = Point;
    exports2.PolyUtil = PolyUtil;
    exports2.Polygon = Polygon;
    exports2.Polyline = Polyline;
    exports2.Popup = Popup;
    exports2.PosAnimation = PosAnimation;
    exports2.Projection = index;
    exports2.Rectangle = Rectangle;
    exports2.Renderer = Renderer;
    exports2.SVG = SVG;
    exports2.SVGOverlay = SVGOverlay;
    exports2.TileLayer = TileLayer;
    exports2.Tooltip = Tooltip;
    exports2.Transformation = Transformation;
    exports2.Util = Util;
    exports2.VideoOverlay = VideoOverlay;
    exports2.bind = bind;
    exports2.bounds = toBounds;
    exports2.canvas = canvas;
    exports2.circle = circle;
    exports2.circleMarker = circleMarker;
    exports2.control = control;
    exports2.divIcon = divIcon;
    exports2.extend = extend;
    exports2.featureGroup = featureGroup;
    exports2.geoJSON = geoJSON;
    exports2.geoJson = geoJson;
    exports2.gridLayer = gridLayer;
    exports2.icon = icon;
    exports2.imageOverlay = imageOverlay;
    exports2.latLng = toLatLng;
    exports2.latLngBounds = toLatLngBounds;
    exports2.layerGroup = layerGroup;
    exports2.map = createMap;
    exports2.marker = marker;
    exports2.point = toPoint;
    exports2.polygon = polygon;
    exports2.polyline = polyline;
    exports2.popup = popup;
    exports2.rectangle = rectangle;
    exports2.setOptions = setOptions;
    exports2.stamp = stamp;
    exports2.svg = svg;
    exports2.svgOverlay = svgOverlay;
    exports2.tileLayer = tileLayer;
    exports2.tooltip = tooltip;
    exports2.transformation = toTransformation;
    exports2.version = version;
    exports2.videoOverlay = videoOverlay;
    var oldL = window.L;
    exports2.noConflict = function() {
      window.L = oldL;
      return this;
    };
    window.L = exports2;
  });
})(leafletSrc, leafletSrc.exports);
var leafletSrcExports = leafletSrc.exports;
const L$1 = /* @__PURE__ */ getDefaultExportFromCjs(leafletSrcExports);
const _hoisted_1 = {
  key: 0,
  class: "p-map-embed__overlay",
  "aria-live": "polite"
};
const _hoisted_2 = {
  key: 1,
  class: "p-map-embed__zoom"
};
const _hoisted_3 = {
  key: 2,
  class: "p-map-embed__attribution",
  "aria-label": "地图版权信息"
};
const _sfc_main = {
  __name: "MapEmbed",
  props: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    zoom: { type: Number, default: 16 },
    height: { type: Number, default: 160 },
    showZoomControls: { type: Boolean, default: false },
    interactive: { type: Boolean, default: false },
    providers: { type: Array, default: null }
  },
  emits: ["load", "error", "provider-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const DEFAULT_PROVIDERS = [
      {
        id: "osmfj",
        name: "OpenStreetMap Japan (OSMFJ)",
        urlTemplate: "https://{s}.tile.openstreetmap.jp/{z}/{x}/{y}.png",
        subdomains: "abc",
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      },
      {
        id: "osm-de",
        name: "OpenStreetMap DE",
        urlTemplate: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
        subdomains: null,
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      },
      {
        id: "osmfr-hot",
        name: "OpenStreetMap FR (HOT)",
        urlTemplate: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        subdomains: "abc",
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      },
      {
        id: "osmfr-osmfr",
        name: "OpenStreetMap FR (OSMFR)",
        urlTemplate: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        subdomains: "abc",
        maxZoom: 20,
        attribution: "&copy; OpenStreetMap contributors"
      },
      {
        id: "osm-official",
        name: "OpenStreetMap (official)",
        urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: "abc",
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }
    ];
    const mapEl = ref(null);
    const loadState = ref("idle");
    const containerStyle = computed(() => {
      const h = Math.max(80, Number(props.height) || 160);
      return { height: `${h}px`, minHeight: `${h}px`, width: "100%" };
    });
    const currentProvider = ref(null);
    const stripHtml = (html) => String(html || "").replace(/<[^>]*>/g, "").replace(/&copy;/gi, "©").trim();
    const attributionText = computed(() => {
      if (!currentProvider.value) return "© OpenStreetMap contributors";
      const txt = stripHtml(currentProvider.value.attribution);
      return txt || "© OpenStreetMap contributors";
    });
    let map = null;
    let marker = null;
    let tileLayer = null;
    const { stop: stopResizeObserver } = useResizeObserver(mapEl, () => {
      if (map) map.invalidateSize({ animate: false });
    });
    let providerIndex = 0;
    let tileErrorCount = 0;
    let loadTimer = null;
    const clearLoadTimer = () => {
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
    };
    const clampNumber = (n, min, max) => {
      const num = Number(n);
      if (!Number.isFinite(num)) return 0;
      return Math.min(max, Math.max(min, num));
    };
    const getProviders = () => {
      const list = Array.isArray(props.providers) && props.providers.length > 0 ? props.providers : DEFAULT_PROVIDERS;
      return list.filter((p) => p && p.urlTemplate);
    };
    const toLatLng = () => {
      const lat = clampNumber(props.lat, -90, 90);
      const lng = clampNumber(props.lng, -180, 180);
      return [lat, lng];
    };
    const applyView = () => {
      if (!map) return;
      map.setView(toLatLng(), props.zoom, { animate: false });
      if (!marker) {
        marker = L$1.circleMarker(toLatLng(), {
          radius: 6,
          weight: 2,
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.9
        }).addTo(map);
      } else {
        marker.setLatLng(toLatLng());
      }
    };
    const zoomIn = () => {
      if (!map) return;
      map.zoomIn(1, { animate: false });
    };
    const zoomOut = () => {
      if (!map) return;
      map.zoomOut(1, { animate: false });
    };
    const destroyTileLayer = () => {
      clearLoadTimer();
      tileErrorCount = 0;
      if (tileLayer && map) {
        try {
          tileLayer.off();
          map.removeLayer(tileLayer);
        } catch {
        }
      }
      tileLayer = null;
    };
    const setProvider = (nextIndex) => {
      const providers = getProviders();
      if (!map || providers.length === 0) return;
      providerIndex = Math.max(0, Math.min(nextIndex, providers.length - 1));
      const provider = providers[providerIndex];
      currentProvider.value = provider;
      destroyTileLayer();
      loadState.value = "loading";
      emit("provider-change", { provider, index: providerIndex });
      let tileSuccessCount = 0;
      tileLayer = L$1.tileLayer(provider.urlTemplate, {
        maxZoom: provider.maxZoom ?? 19,
        subdomains: provider.subdomains ?? void 0,
        crossOrigin: true,
        attribution: provider.attribution ?? "",
        updateWhenIdle: true,
        keepBuffer: 2
      });
      const tryNextProvider = () => {
        clearLoadTimer();
        const next = providerIndex + 1;
        if (next >= providers.length) {
          loadState.value = "error";
          emit("error");
          return;
        }
        setProvider(next);
      };
      tileLayer.on("tileload", () => {
        tileSuccessCount += 1;
        if (tileSuccessCount === 1) {
          clearLoadTimer();
          tileErrorCount = 0;
          loadState.value = "loaded";
          emit("load");
        }
      });
      tileLayer.on("tileerror", () => {
        tileErrorCount += 1;
        if (tileSuccessCount === 0) {
          tryNextProvider();
          return;
        }
        if (tileErrorCount >= 5) {
          tryNextProvider();
        }
      });
      loadTimer = setTimeout(() => {
        tryNextProvider();
      }, 6e3);
      tileLayer.addTo(map);
    };
    const initMap = () => {
      if (!mapEl.value) return;
      map = L$1.map(mapEl.value, {
        zoomControl: false,
        attributionControl: false,
        dragging: props.interactive,
        scrollWheelZoom: props.interactive,
        doubleClickZoom: props.interactive,
        boxZoom: props.interactive,
        keyboard: props.interactive,
        tap: props.interactive,
        touchZoom: props.interactive
      });
      applyView();
      setProvider(0);
      requestAnimationFrame(() => {
        if (map) map.invalidateSize({ animate: false });
      });
    };
    onMounted(() => {
      initMap();
    });
    watch(
      () => [props.lat, props.lng, props.zoom],
      () => {
        applyView();
      }
    );
    watch(
      () => props.providers,
      () => {
        if (!map) return;
        setProvider(0);
      }
    );
    onBeforeUnmount(() => {
      clearLoadTimer();
      destroyTileLayer();
      stopResizeObserver?.();
      if (map) {
        try {
          map.remove();
        } catch {
        }
      }
      map = null;
      marker = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "mapEl",
        ref: mapEl,
        class: normalizeClass(["p-map-embed", { "is-error": loadState.value === "error" }]),
        style: normalizeStyle(containerStyle.value)
      }, [
        loadState.value === "error" ? (openBlock(), createElementBlock("div", _hoisted_1, _cache[0] || (_cache[0] = [
          createBaseVNode("div", { class: "p-map-embed__overlay-text" }, "地图加载失败", -1)
        ]))) : createCommentVNode("", true),
        __props.showZoomControls ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("button", {
            type: "button",
            class: "p-map-embed__zoom-btn",
            "aria-label": "放大",
            onClick: withModifiers(zoomIn, ["stop"])
          }, [
            createVNode(unref(IconPlus), {
              class: "p-map-embed__zoom-icon",
              "aria-hidden": "true"
            })
          ]),
          createBaseVNode("button", {
            type: "button",
            class: "p-map-embed__zoom-btn",
            "aria-label": "缩小",
            onClick: withModifiers(zoomOut, ["stop"])
          }, [
            createVNode(unref(IconMinus), {
              class: "p-map-embed__zoom-icon",
              "aria-hidden": "true"
            })
          ])
        ])) : createCommentVNode("", true),
        attributionText.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(attributionText.value), 1)) : createCommentVNode("", true)
      ], 6);
    };
  }
};
const MapEmbed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0db927e5"]]);
export {
  MapEmbed as M,
  buildExifRows as b,
  isImageLikeForExif as i,
  loadExifTagsFromArrayBufferAsync as l,
  resolveGpsCoordinates as r
};
