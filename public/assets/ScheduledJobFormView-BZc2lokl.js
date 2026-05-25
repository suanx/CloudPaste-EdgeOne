import { aW as commonjsGlobal, aX as getDefaultExportFromCjs, F as computed, j as createElementBlock, k as openBlock, K as Fragment, l as createBaseVNode, p as createCommentVNode, A as createTextVNode, t as toDisplayString, n as normalizeClass, L as renderList, aK as _export_sfc, m as withModifiers, z as createVNode, y as unref, ab as IconChevronRight, g as ref, w as watch, o as onMounted, as as IconHome, ez as IconBack, J as IconRefresh, ak as IconInformationCircle, dF as IconFolderOpen, M as createBlock, aD as normalizeStyle, eA as getDirectoryList, c as createLogger, aE as withCtx, aA as IconCheckCircle, G as IconClose, aF as Transition, q as withDirectives, b5 as IconFolder, aG as withKeys, v as vModelText, al as IconCopy, Q as IconList, aq as vShow, bf as IconArrowUp, bU as TransitionGroup, bd as IconFolderPlus, x as vModelCheckbox, e as useI18n, aj as IconCheck, ae as vModelSelect, az as IconTaskList, d as useRouter, dL as useRoute, ac as useThemeMode, d1 as resolveComponent, bb as IconClock } from "./index-BQxzU9F1.js";
import { u as useScheduledJobs } from "./useScheduledJobs-DOzm9zah.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { F as FileType, e as detectFileTypeFromFilename } from "./fileTypes-C4-giE9O.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
var cronstrueI18n = { exports: {} };
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(typeof self !== "undefined" ? self : commonjsGlobal, function() {
    return (
      /******/
      function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          var module2 = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
          module2.l = true;
          return module2.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports2, name, getter) {
          if (!__webpack_require__.o(exports2, name)) {
            Object.defineProperty(exports2, name, { enumerable: true, get: getter });
          }
        };
        __webpack_require__.r = function(exports2) {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports2, "__esModule", { value: true });
        };
        __webpack_require__.t = function(value, mode) {
          if (mode & 1) value = __webpack_require__(value);
          if (mode & 8) return value;
          if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
          var ns = /* @__PURE__ */ Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", { enumerable: true, value });
          if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key2) {
            return value[key2];
          }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module2) {
          var getter = module2 && module2.__esModule ? (
            /******/
            function getDefault() {
              return module2["default"];
            }
          ) : (
            /******/
            function getModuleExports() {
              return module2;
            }
          );
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 7);
      }([
        /* 0 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ExpressionDescriptor = void 0;
          var stringUtilities_1 = __webpack_require__(1);
          var cronParser_1 = __webpack_require__(2);
          var ExpressionDescriptor = function() {
            function ExpressionDescriptor2(expression, options) {
              this.expression = expression;
              this.options = options;
              this.expressionParts = new Array(5);
              if (ExpressionDescriptor2.locales[options.locale]) {
                this.i18n = ExpressionDescriptor2.locales[options.locale];
              } else {
                console.warn("Locale '" + options.locale + "' could not be found; falling back to 'en'.");
                this.i18n = ExpressionDescriptor2.locales["en"];
              }
              if (options.use24HourTimeFormat === void 0) {
                options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
              }
            }
            ExpressionDescriptor2.toString = function(expression, _a) {
              var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, _f = _b.monthStartIndexZero, monthStartIndexZero = _f === void 0 ? false : _f, use24HourTimeFormat = _b.use24HourTimeFormat, _g = _b.locale, locale = _g === void 0 ? "en" : _g;
              var options = {
                throwExceptionOnParseError,
                verbose,
                dayOfWeekStartIndexZero,
                monthStartIndexZero,
                use24HourTimeFormat,
                locale
              };
              var descripter = new ExpressionDescriptor2(expression, options);
              return descripter.getFullDescription();
            };
            ExpressionDescriptor2.initialize = function(localesLoader) {
              ExpressionDescriptor2.specialCharacters = ["/", "-", ",", "*"];
              localesLoader.load(ExpressionDescriptor2.locales);
            };
            ExpressionDescriptor2.prototype.getFullDescription = function() {
              var description = "";
              try {
                var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero, this.options.monthStartIndexZero);
                this.expressionParts = parser.parse();
                var timeSegment = this.getTimeOfDayDescription();
                var dayOfMonthDesc = this.getDayOfMonthDescription();
                var monthDesc = this.getMonthDescription();
                var dayOfWeekDesc = this.getDayOfWeekDescription();
                var yearDesc = this.getYearDescription();
                description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
                description = this.transformVerbosity(description, this.options.verbose);
                description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
              } catch (ex) {
                if (!this.options.throwExceptionOnParseError) {
                  description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
                } else {
                  throw "" + ex;
                }
              }
              return description;
            };
            ExpressionDescriptor2.prototype.getTimeOfDayDescription = function() {
              var secondsExpression = this.expressionParts[0];
              var minuteExpression = this.expressionParts[1];
              var hourExpression = this.expressionParts[2];
              var description = "";
              if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor2.specialCharacters) && !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor2.specialCharacters) && !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor2.specialCharacters)) {
                description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
              } else if (!secondsExpression && minuteExpression.indexOf("-") > -1 && !(minuteExpression.indexOf(",") > -1) && !(minuteExpression.indexOf("/") > -1) && !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor2.specialCharacters)) {
                var minuteParts = minuteExpression.split("-");
                description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
              } else if (!secondsExpression && hourExpression.indexOf(",") > -1 && hourExpression.indexOf("-") == -1 && hourExpression.indexOf("/") == -1 && !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor2.specialCharacters)) {
                var hourParts = hourExpression.split(",");
                description += this.i18n.at();
                for (var i = 0; i < hourParts.length; i++) {
                  description += " ";
                  description += this.formatTime(hourParts[i], minuteExpression, "");
                  if (i < hourParts.length - 2) {
                    description += ",";
                  }
                  if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                  }
                }
              } else {
                var secondsDescription = this.getSecondsDescription();
                var minutesDescription = this.getMinutesDescription();
                var hoursDescription = this.getHoursDescription();
                description += secondsDescription;
                if (description.length > 0 && minutesDescription.length > 0) {
                  description += ", ";
                }
                description += minutesDescription;
                if (minutesDescription === hoursDescription) {
                  return description;
                }
                if (description.length > 0 && hoursDescription.length > 0) {
                  description += ", ";
                }
                description += hoursDescription;
              }
              return description;
            };
            ExpressionDescriptor2.prototype.getSecondsDescription = function() {
              var _this = this;
              var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function(s) {
                return s;
              }, function(s) {
                return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
              }, function(s) {
                return _this.i18n.secondsX0ThroughX1PastTheMinute();
              }, function(s) {
                return s == "0" ? "" : parseInt(s) < 20 ? _this.i18n.atX0SecondsPastTheMinute() : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
              });
              return description;
            };
            ExpressionDescriptor2.prototype.getMinutesDescription = function() {
              var _this = this;
              var secondsExpression = this.expressionParts[0];
              var hourExpression = this.expressionParts[2];
              var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function(s) {
                return s;
              }, function(s) {
                return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
              }, function(s) {
                return _this.i18n.minutesX0ThroughX1PastTheHour();
              }, function(s) {
                try {
                  return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == "" ? _this.i18n.everyHour() : parseInt(s) < 20 ? _this.i18n.atX0MinutesPastTheHour() : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
                } catch (e) {
                  return _this.i18n.atX0MinutesPastTheHour();
                }
              });
              return description;
            };
            ExpressionDescriptor2.prototype.getHoursDescription = function() {
              var _this = this;
              var expression = this.expressionParts[2];
              var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function(s) {
                return _this.formatTime(s, "0", "");
              }, function(s) {
                return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
              }, function(s) {
                return _this.i18n.betweenX0AndX1();
              }, function(s) {
                return _this.i18n.atX0();
              });
              return description;
            };
            ExpressionDescriptor2.prototype.getDayOfWeekDescription = function() {
              var _this = this;
              var daysOfWeekNames = this.i18n.daysOfTheWeek();
              var description = null;
              if (this.expressionParts[5] == "*") {
                description = "";
              } else {
                description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function(s) {
                  var exp = s;
                  if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                  } else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                  }
                  return daysOfWeekNames[parseInt(exp)];
                }, function(s) {
                  if (parseInt(s) == 1) {
                    return "";
                  } else {
                    return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0DaysOfTheWeek(), s);
                  }
                }, function(s) {
                  return _this.i18n.commaX0ThroughX1();
                }, function(s) {
                  var format = null;
                  if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekOfMonthDescription = null;
                    switch (dayOfWeekOfMonthNumber) {
                      case "1":
                        dayOfWeekOfMonthDescription = _this.i18n.first();
                        break;
                      case "2":
                        dayOfWeekOfMonthDescription = _this.i18n.second();
                        break;
                      case "3":
                        dayOfWeekOfMonthDescription = _this.i18n.third();
                        break;
                      case "4":
                        dayOfWeekOfMonthDescription = _this.i18n.fourth();
                        break;
                      case "5":
                        dayOfWeekOfMonthDescription = _this.i18n.fifth();
                        break;
                    }
                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
                  } else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
                  } else {
                    var domSpecified = _this.expressionParts[3] != "*";
                    format = domSpecified ? _this.i18n.commaAndOnX0() : _this.i18n.commaOnlyOnX0();
                  }
                  return format;
                });
              }
              return description;
            };
            ExpressionDescriptor2.prototype.getMonthDescription = function() {
              var _this = this;
              var monthNames = this.i18n.monthsOfTheYear();
              var description = this.getSegmentDescription(this.expressionParts[4], "", function(s) {
                return monthNames[parseInt(s) - 1];
              }, function(s) {
                if (parseInt(s) == 1) {
                  return "";
                } else {
                  return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
                }
              }, function(s) {
                return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
              }, function(s) {
                return _this.i18n.commaOnlyInMonthX0 ? _this.i18n.commaOnlyInMonthX0() : _this.i18n.commaOnlyInX0();
              });
              return description;
            };
            ExpressionDescriptor2.prototype.getDayOfMonthDescription = function() {
              var _this = this;
              var description = null;
              var expression = this.expressionParts[3];
              switch (expression) {
                case "L":
                  description = this.i18n.commaOnTheLastDayOfTheMonth();
                  break;
                case "WL":
                case "LW":
                  description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                  break;
                default:
                  var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                  if (weekDayNumberMatches) {
                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
                    var dayString = dayNumber == 1 ? this.i18n.firstWeekday() : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                  } else {
                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
                    if (lastDayOffSetMatches) {
                      var offSetDays = lastDayOffSetMatches[1];
                      description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
                      break;
                    } else if (expression == "*" && this.expressionParts[5] != "*") {
                      return "";
                    } else {
                      description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function(s) {
                        return s == "L" ? _this.i18n.lastDay() : _this.i18n.dayX0 ? stringUtilities_1.StringUtilities.format(_this.i18n.dayX0(), s) : s;
                      }, function(s) {
                        return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days();
                      }, function(s) {
                        return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
                      }, function(s) {
                        return _this.i18n.commaOnDayX0OfTheMonth();
                      });
                    }
                    break;
                  }
              }
              return description;
            };
            ExpressionDescriptor2.prototype.getYearDescription = function() {
              var _this = this;
              var description = this.getSegmentDescription(this.expressionParts[6], "", function(s) {
                return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
              }, function(s) {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
              }, function(s) {
                return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
              }, function(s) {
                return _this.i18n.commaOnlyInYearX0 ? _this.i18n.commaOnlyInYearX0() : _this.i18n.commaOnlyInX0();
              });
              return description;
            };
            ExpressionDescriptor2.prototype.getSegmentDescription = function(expression, allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat) {
              var description = null;
              var doesExpressionContainIncrement = expression.indexOf("/") > -1;
              var doesExpressionContainRange = expression.indexOf("-") > -1;
              var doesExpressionContainMultipleValues = expression.indexOf(",") > -1;
              if (!expression) {
                description = "";
              } else if (expression === "*") {
                description = allDescription;
              } else if (!doesExpressionContainIncrement && !doesExpressionContainRange && !doesExpressionContainMultipleValues) {
                description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
              } else if (doesExpressionContainMultipleValues) {
                var segments = expression.split(",");
                var descriptionContent = "";
                for (var i = 0; i < segments.length; i++) {
                  if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                      descriptionContent += " ";
                    }
                  }
                  if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.i18n.spaceAnd() + " ";
                  }
                  if (segments[i].indexOf("/") > -1 || segments[i].indexOf("-") > -1) {
                    var isSegmentRangeWithoutIncrement = segments[i].indexOf("-") > -1 && segments[i].indexOf("/") == -1;
                    var currentDescriptionContent = this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, isSegmentRangeWithoutIncrement ? this.i18n.commaX0ThroughX1 : getRangeDescriptionFormat, getDescriptionFormat);
                    if (isSegmentRangeWithoutIncrement) {
                      currentDescriptionContent = currentDescriptionContent.replace(", ", "");
                    }
                    descriptionContent += currentDescriptionContent;
                  } else if (!doesExpressionContainIncrement) {
                    descriptionContent += getSingleItemDescription(segments[i]);
                  } else {
                    descriptionContent += this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat);
                  }
                }
                if (!doesExpressionContainIncrement) {
                  description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
                } else {
                  description = descriptionContent;
                }
              } else if (doesExpressionContainIncrement) {
                var segments = expression.split("/");
                description = stringUtilities_1.StringUtilities.format(getIncrementDescriptionFormat(segments[1]), segments[1]);
                if (segments[0].indexOf("-") > -1) {
                  var rangeSegmentDescription = this.generateRangeSegmentDescription(segments[0], getRangeDescriptionFormat, getSingleItemDescription);
                  if (rangeSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                  }
                  description += rangeSegmentDescription;
                } else if (segments[0].indexOf("*") == -1) {
                  var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                  rangeItemDescription = rangeItemDescription.replace(", ", "");
                  description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
                }
              } else if (doesExpressionContainRange) {
                description = this.generateRangeSegmentDescription(expression, getRangeDescriptionFormat, getSingleItemDescription);
              }
              return description;
            };
            ExpressionDescriptor2.prototype.generateRangeSegmentDescription = function(rangeExpression, getRangeDescriptionFormat, getSingleItemDescription) {
              var description = "";
              var rangeSegments = rangeExpression.split("-");
              var rangeSegment1Description = getSingleItemDescription(rangeSegments[0]);
              var rangeSegment2Description = getSingleItemDescription(rangeSegments[1]);
              rangeSegment2Description = rangeSegment2Description.replace(":00", ":59");
              var rangeDescriptionFormat = getRangeDescriptionFormat(rangeExpression);
              description += stringUtilities_1.StringUtilities.format(rangeDescriptionFormat, rangeSegment1Description, rangeSegment2Description);
              return description;
            };
            ExpressionDescriptor2.prototype.formatTime = function(hourExpression, minuteExpression, secondExpression) {
              var hour = parseInt(hourExpression);
              var period = "";
              var setPeriodBeforeTime = false;
              if (!this.options.use24HourTimeFormat) {
                setPeriodBeforeTime = this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime();
                period = setPeriodBeforeTime ? this.getPeriod(hour) + " " : " " + this.getPeriod(hour);
                if (hour > 12) {
                  hour -= 12;
                }
                if (hour === 0) {
                  hour = 12;
                }
              }
              var minute = minuteExpression;
              var second = "";
              if (secondExpression) {
                second = ":" + ("00" + secondExpression).substring(secondExpression.length);
              }
              return "" + (setPeriodBeforeTime ? period : "") + ("00" + hour.toString()).substring(hour.toString().length) + ":" + ("00" + minute.toString()).substring(minute.toString().length) + second + (!setPeriodBeforeTime ? period : "");
            };
            ExpressionDescriptor2.prototype.transformVerbosity = function(description, useVerboseFormat) {
              if (!useVerboseFormat) {
                description = description.replace(new RegExp(", " + this.i18n.everyMinute(), "g"), "");
                description = description.replace(new RegExp(", " + this.i18n.everyHour(), "g"), "");
                description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
                description = description.replace(/\, ?$/, "");
              }
              return description;
            };
            ExpressionDescriptor2.prototype.getPeriod = function(hour) {
              return hour >= 12 ? this.i18n.pm && this.i18n.pm() || "PM" : this.i18n.am && this.i18n.am() || "AM";
            };
            ExpressionDescriptor2.locales = {};
            return ExpressionDescriptor2;
          }();
          exports2.ExpressionDescriptor = ExpressionDescriptor;
        },
        /* 1 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.StringUtilities = void 0;
          var StringUtilities = function() {
            function StringUtilities2() {
            }
            StringUtilities2.format = function(template) {
              var values = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
              }
              return template.replace(/%s/g, function() {
                return values.shift();
              });
            };
            StringUtilities2.containsAny = function(text, searchStrings) {
              return searchStrings.some(function(c) {
                return text.indexOf(c) > -1;
              });
            };
            return StringUtilities2;
          }();
          exports2.StringUtilities = StringUtilities;
        },
        /* 2 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.CronParser = void 0;
          var rangeValidator_1 = __webpack_require__(3);
          var CronParser = function() {
            function CronParser2(expression, dayOfWeekStartIndexZero, monthStartIndexZero) {
              if (dayOfWeekStartIndexZero === void 0) {
                dayOfWeekStartIndexZero = true;
              }
              if (monthStartIndexZero === void 0) {
                monthStartIndexZero = false;
              }
              this.expression = expression;
              this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
              this.monthStartIndexZero = monthStartIndexZero;
            }
            CronParser2.prototype.parse = function() {
              var parsed = this.extractParts(this.expression);
              this.normalize(parsed);
              this.validate(parsed);
              return parsed;
            };
            CronParser2.prototype.extractParts = function(expression) {
              if (!this.expression) {
                throw new Error("Expression is empty");
              }
              var parsed = expression.trim().split(/[ ]+/);
              if (parsed.length < 5) {
                throw new Error("Expression has only " + parsed.length + " part" + (parsed.length == 1 ? "" : "s") + ". At least 5 parts are required.");
              } else if (parsed.length == 5) {
                parsed.unshift("");
                parsed.push("");
              } else if (parsed.length == 6) {
                var isYearWithNoSecondsPart = /\d{4}$/.test(parsed[5]) || parsed[4] == "?" || parsed[2] == "?";
                if (isYearWithNoSecondsPart) {
                  parsed.unshift("");
                } else {
                  parsed.push("");
                }
              } else if (parsed.length > 7) {
                throw new Error("Expression has " + parsed.length + " parts; too many!");
              }
              return parsed;
            };
            CronParser2.prototype.normalize = function(expressionParts) {
              var _this = this;
              expressionParts[3] = expressionParts[3].replace("?", "*");
              expressionParts[5] = expressionParts[5].replace("?", "*");
              expressionParts[2] = expressionParts[2].replace("?", "*");
              if (expressionParts[0].indexOf("0/") == 0) {
                expressionParts[0] = expressionParts[0].replace("0/", "*/");
              }
              if (expressionParts[1].indexOf("0/") == 0) {
                expressionParts[1] = expressionParts[1].replace("0/", "*/");
              }
              if (expressionParts[2].indexOf("0/") == 0) {
                expressionParts[2] = expressionParts[2].replace("0/", "*/");
              }
              if (expressionParts[3].indexOf("1/") == 0) {
                expressionParts[3] = expressionParts[3].replace("1/", "*/");
              }
              if (expressionParts[4].indexOf("1/") == 0) {
                expressionParts[4] = expressionParts[4].replace("1/", "*/");
              }
              if (expressionParts[6].indexOf("1/") == 0) {
                expressionParts[6] = expressionParts[6].replace("1/", "*/");
              }
              expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function(t) {
                var dowDigits = t.replace(/\D/, "");
                var dowDigitsAdjusted = dowDigits;
                if (_this.dayOfWeekStartIndexZero) {
                  if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                  }
                } else {
                  dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
                }
                return t.replace(dowDigits, dowDigitsAdjusted);
              });
              if (expressionParts[5] == "L") {
                expressionParts[5] = "6";
              }
              if (expressionParts[3] == "?") {
                expressionParts[3] = "*";
              }
              if (expressionParts[3].indexOf("W") > -1 && (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
                throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
              }
              var days = {
                SUN: 0,
                MON: 1,
                TUE: 2,
                WED: 3,
                THU: 4,
                FRI: 5,
                SAT: 6
              };
              for (var day in days) {
                expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
              }
              expressionParts[4] = expressionParts[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function(t) {
                var dowDigits = t.replace(/\D/, "");
                var dowDigitsAdjusted = dowDigits;
                if (_this.monthStartIndexZero) {
                  dowDigitsAdjusted = (parseInt(dowDigits) + 1).toString();
                }
                return t.replace(dowDigits, dowDigitsAdjusted);
              });
              var months = {
                JAN: 1,
                FEB: 2,
                MAR: 3,
                APR: 4,
                MAY: 5,
                JUN: 6,
                JUL: 7,
                AUG: 8,
                SEP: 9,
                OCT: 10,
                NOV: 11,
                DEC: 12
              };
              for (var month in months) {
                expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
              }
              if (expressionParts[0] == "0") {
                expressionParts[0] = "";
              }
              if (!/\*|\-|\,|\//.test(expressionParts[2]) && (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))) {
                expressionParts[2] += "-" + expressionParts[2];
              }
              for (var i = 0; i < expressionParts.length; i++) {
                if (expressionParts[i].indexOf(",") != -1) {
                  expressionParts[i] = expressionParts[i].split(",").filter(function(str) {
                    return str !== "";
                  }).join(",") || "*";
                }
                if (expressionParts[i] == "*/1") {
                  expressionParts[i] = "*";
                }
                if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
                  var stepRangeThrough = null;
                  switch (i) {
                    case 4:
                      stepRangeThrough = "12";
                      break;
                    case 5:
                      stepRangeThrough = "6";
                      break;
                    case 6:
                      stepRangeThrough = "9999";
                      break;
                    default:
                      stepRangeThrough = null;
                      break;
                  }
                  if (stepRangeThrough != null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
                  }
                }
              }
            };
            CronParser2.prototype.validate = function(parsed) {
              this.assertNoInvalidCharacters("DOW", parsed[5]);
              this.assertNoInvalidCharacters("DOM", parsed[3]);
              this.validateRange(parsed);
            };
            CronParser2.prototype.validateRange = function(parsed) {
              rangeValidator_1.default.secondRange(parsed[0]);
              rangeValidator_1.default.minuteRange(parsed[1]);
              rangeValidator_1.default.hourRange(parsed[2]);
              rangeValidator_1.default.dayOfMonthRange(parsed[3]);
              rangeValidator_1.default.monthRange(parsed[4], this.monthStartIndexZero);
              rangeValidator_1.default.dayOfWeekRange(parsed[5], this.dayOfWeekStartIndexZero);
            };
            CronParser2.prototype.assertNoInvalidCharacters = function(partDescription, expression) {
              var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
              if (invalidChars && invalidChars.length) {
                throw new Error(partDescription + " part contains invalid values: '" + invalidChars.toString() + "'");
              }
            };
            return CronParser2;
          }();
          exports2.CronParser = CronParser;
        },
        /* 3 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          function assert(value, message) {
            if (!value) {
              throw new Error(message);
            }
          }
          var RangeValidator = function() {
            function RangeValidator2() {
            }
            RangeValidator2.secondRange = function(parse) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var second = parseInt(parsed[i], 10);
                  assert(second >= 0 && second <= 59, "seconds part must be >= 0 and <= 59");
                }
              }
            };
            RangeValidator2.minuteRange = function(parse) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var minute = parseInt(parsed[i], 10);
                  assert(minute >= 0 && minute <= 59, "minutes part must be >= 0 and <= 59");
                }
              }
            };
            RangeValidator2.hourRange = function(parse) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var hour = parseInt(parsed[i], 10);
                  assert(hour >= 0 && hour <= 23, "hours part must be >= 0 and <= 23");
                }
              }
            };
            RangeValidator2.dayOfMonthRange = function(parse) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var dayOfMonth = parseInt(parsed[i], 10);
                  assert(dayOfMonth >= 1 && dayOfMonth <= 31, "DOM part must be >= 1 and <= 31");
                }
              }
            };
            RangeValidator2.monthRange = function(parse, monthStartIndexZero) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var month = parseInt(parsed[i], 10);
                  assert(month >= 1 && month <= 12, monthStartIndexZero ? "month part must be >= 0 and <= 11" : "month part must be >= 1 and <= 12");
                }
              }
            };
            RangeValidator2.dayOfWeekRange = function(parse, dayOfWeekStartIndexZero) {
              var parsed = parse.split(",");
              for (var i = 0; i < parsed.length; i++) {
                if (!isNaN(parseInt(parsed[i], 10))) {
                  var dayOfWeek = parseInt(parsed[i], 10);
                  assert(dayOfWeek >= 0 && dayOfWeek <= 6, dayOfWeekStartIndexZero ? "DOW part must be >= 0 and <= 6" : "DOW part must be >= 1 and <= 7");
                }
              }
            };
            return RangeValidator2;
          }();
          exports2.default = RangeValidator;
        },
        /* 4 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.en = void 0;
          var en = function() {
            function en2() {
            }
            en2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            en2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            en2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            en2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            en2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            en2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "An error occured when generating the expression description.  Check the cron expression syntax.";
            };
            en2.prototype.everyMinute = function() {
              return "every minute";
            };
            en2.prototype.everyHour = function() {
              return "every hour";
            };
            en2.prototype.atSpace = function() {
              return "At ";
            };
            en2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Every minute between %s and %s";
            };
            en2.prototype.at = function() {
              return "At";
            };
            en2.prototype.spaceAnd = function() {
              return " and";
            };
            en2.prototype.everySecond = function() {
              return "every second";
            };
            en2.prototype.everyX0Seconds = function() {
              return "every %s seconds";
            };
            en2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "seconds %s through %s past the minute";
            };
            en2.prototype.atX0SecondsPastTheMinute = function() {
              return "at %s seconds past the minute";
            };
            en2.prototype.everyX0Minutes = function() {
              return "every %s minutes";
            };
            en2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minutes %s through %s past the hour";
            };
            en2.prototype.atX0MinutesPastTheHour = function() {
              return "at %s minutes past the hour";
            };
            en2.prototype.everyX0Hours = function() {
              return "every %s hours";
            };
            en2.prototype.betweenX0AndX1 = function() {
              return "between %s and %s";
            };
            en2.prototype.atX0 = function() {
              return "at %s";
            };
            en2.prototype.commaEveryDay = function() {
              return ", every day";
            };
            en2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", every %s days of the week";
            };
            en2.prototype.commaX0ThroughX1 = function() {
              return ", %s through %s";
            };
            en2.prototype.first = function() {
              return "first";
            };
            en2.prototype.second = function() {
              return "second";
            };
            en2.prototype.third = function() {
              return "third";
            };
            en2.prototype.fourth = function() {
              return "fourth";
            };
            en2.prototype.fifth = function() {
              return "fifth";
            };
            en2.prototype.commaOnThe = function() {
              return ", on the ";
            };
            en2.prototype.spaceX0OfTheMonth = function() {
              return " %s of the month";
            };
            en2.prototype.lastDay = function() {
              return "the last day";
            };
            en2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", on the last %s of the month";
            };
            en2.prototype.commaOnlyOnX0 = function() {
              return ", only on %s";
            };
            en2.prototype.commaAndOnX0 = function() {
              return ", and on %s";
            };
            en2.prototype.commaEveryX0Months = function() {
              return ", every %s months";
            };
            en2.prototype.commaOnlyInX0 = function() {
              return ", only in %s";
            };
            en2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", on the last day of the month";
            };
            en2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", on the last weekday of the month";
            };
            en2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s days before the last day of the month";
            };
            en2.prototype.firstWeekday = function() {
              return "first weekday";
            };
            en2.prototype.weekdayNearestDayX0 = function() {
              return "weekday nearest day %s";
            };
            en2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", on the %s of the month";
            };
            en2.prototype.commaEveryX0Days = function() {
              return ", every %s days";
            };
            en2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", between day %s and %s of the month";
            };
            en2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", on day %s of the month";
            };
            en2.prototype.commaEveryHour = function() {
              return ", every hour";
            };
            en2.prototype.commaEveryX0Years = function() {
              return ", every %s years";
            };
            en2.prototype.commaStartingX0 = function() {
              return ", starting %s";
            };
            en2.prototype.daysOfTheWeek = function() {
              return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            };
            en2.prototype.monthsOfTheYear = function() {
              return [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
              ];
            };
            return en2;
          }();
          exports2.en = en;
        },
        ,
        ,
        /* 7 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.toString = void 0;
          var expressionDescriptor_1 = __webpack_require__(0);
          var allLocalesLoader_1 = __webpack_require__(8);
          expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
          exports2.default = expressionDescriptor_1.ExpressionDescriptor;
          var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
          exports2.toString = toString;
        },
        /* 8 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.allLocalesLoader = void 0;
          var allLocales = __webpack_require__(9);
          var allLocalesLoader = function() {
            function allLocalesLoader2() {
            }
            allLocalesLoader2.prototype.load = function(availableLocales) {
              for (var property in allLocales) {
                if (allLocales.hasOwnProperty(property)) {
                  availableLocales[property] = new allLocales[property]();
                }
              }
            };
            return allLocalesLoader2;
          }();
          exports2.allLocalesLoader = allLocalesLoader;
        },
        /* 9 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          var en_1 = __webpack_require__(4);
          Object.defineProperty(exports2, "en", { enumerable: true, get: function() {
            return en_1.en;
          } });
          var da_1 = __webpack_require__(10);
          Object.defineProperty(exports2, "da", { enumerable: true, get: function() {
            return da_1.da;
          } });
          var de_1 = __webpack_require__(11);
          Object.defineProperty(exports2, "de", { enumerable: true, get: function() {
            return de_1.de;
          } });
          var es_1 = __webpack_require__(12);
          Object.defineProperty(exports2, "es", { enumerable: true, get: function() {
            return es_1.es;
          } });
          var fr_1 = __webpack_require__(13);
          Object.defineProperty(exports2, "fr", { enumerable: true, get: function() {
            return fr_1.fr;
          } });
          var it_1 = __webpack_require__(14);
          Object.defineProperty(exports2, "it", { enumerable: true, get: function() {
            return it_1.it;
          } });
          var id_1 = __webpack_require__(15);
          Object.defineProperty(exports2, "id", { enumerable: true, get: function() {
            return id_1.id;
          } });
          var ko_1 = __webpack_require__(16);
          Object.defineProperty(exports2, "ko", { enumerable: true, get: function() {
            return ko_1.ko;
          } });
          var nl_1 = __webpack_require__(17);
          Object.defineProperty(exports2, "nl", { enumerable: true, get: function() {
            return nl_1.nl;
          } });
          var nb_1 = __webpack_require__(18);
          Object.defineProperty(exports2, "nb", { enumerable: true, get: function() {
            return nb_1.nb;
          } });
          var sv_1 = __webpack_require__(19);
          Object.defineProperty(exports2, "sv", { enumerable: true, get: function() {
            return sv_1.sv;
          } });
          var pl_1 = __webpack_require__(20);
          Object.defineProperty(exports2, "pl", { enumerable: true, get: function() {
            return pl_1.pl;
          } });
          var pt_BR_1 = __webpack_require__(21);
          Object.defineProperty(exports2, "pt_BR", { enumerable: true, get: function() {
            return pt_BR_1.pt_BR;
          } });
          var ro_1 = __webpack_require__(22);
          Object.defineProperty(exports2, "ro", { enumerable: true, get: function() {
            return ro_1.ro;
          } });
          var ru_1 = __webpack_require__(23);
          Object.defineProperty(exports2, "ru", { enumerable: true, get: function() {
            return ru_1.ru;
          } });
          var tr_1 = __webpack_require__(24);
          Object.defineProperty(exports2, "tr", { enumerable: true, get: function() {
            return tr_1.tr;
          } });
          var uk_1 = __webpack_require__(25);
          Object.defineProperty(exports2, "uk", { enumerable: true, get: function() {
            return uk_1.uk;
          } });
          var zh_CN_1 = __webpack_require__(26);
          Object.defineProperty(exports2, "zh_CN", { enumerable: true, get: function() {
            return zh_CN_1.zh_CN;
          } });
          var zh_TW_1 = __webpack_require__(27);
          Object.defineProperty(exports2, "zh_TW", { enumerable: true, get: function() {
            return zh_TW_1.zh_TW;
          } });
          var ja_1 = __webpack_require__(28);
          Object.defineProperty(exports2, "ja", { enumerable: true, get: function() {
            return ja_1.ja;
          } });
          var he_1 = __webpack_require__(29);
          Object.defineProperty(exports2, "he", { enumerable: true, get: function() {
            return he_1.he;
          } });
          var cs_1 = __webpack_require__(30);
          Object.defineProperty(exports2, "cs", { enumerable: true, get: function() {
            return cs_1.cs;
          } });
          var sk_1 = __webpack_require__(31);
          Object.defineProperty(exports2, "sk", { enumerable: true, get: function() {
            return sk_1.sk;
          } });
          var fi_1 = __webpack_require__(32);
          Object.defineProperty(exports2, "fi", { enumerable: true, get: function() {
            return fi_1.fi;
          } });
          var sl_1 = __webpack_require__(33);
          Object.defineProperty(exports2, "sl", { enumerable: true, get: function() {
            return sl_1.sl;
          } });
          var sw_1 = __webpack_require__(34);
          Object.defineProperty(exports2, "sw", { enumerable: true, get: function() {
            return sw_1.sw;
          } });
          var fa_1 = __webpack_require__(35);
          Object.defineProperty(exports2, "fa", { enumerable: true, get: function() {
            return fa_1.fa;
          } });
          var ca_1 = __webpack_require__(36);
          Object.defineProperty(exports2, "ca", { enumerable: true, get: function() {
            return ca_1.ca;
          } });
          var be_1 = __webpack_require__(37);
          Object.defineProperty(exports2, "be", { enumerable: true, get: function() {
            return be_1.be;
          } });
        },
        /* 10 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.da = void 0;
          var da = function() {
            function da2() {
            }
            da2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            da2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
            };
            da2.prototype.at = function() {
              return "kl";
            };
            da2.prototype.atSpace = function() {
              return "kl ";
            };
            da2.prototype.atX0 = function() {
              return "kl %s";
            };
            da2.prototype.atX0MinutesPastTheHour = function() {
              return "%s minutter efter timeskift";
            };
            da2.prototype.atX0SecondsPastTheMinute = function() {
              return "%s sekunder efter minutskift";
            };
            da2.prototype.betweenX0AndX1 = function() {
              return "mellem %s og %s";
            };
            da2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", mellem dag %s og %s i måneden";
            };
            da2.prototype.commaEveryDay = function() {
              return ", hver dag";
            };
            da2.prototype.commaEveryX0Days = function() {
              return ", hver %s. dag";
            };
            da2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", hver %s. ugedag";
            };
            da2.prototype.commaEveryX0Months = function() {
              return ", hver %s. måned";
            };
            da2.prototype.commaEveryX0Years = function() {
              return ", hvert %s. år";
            };
            da2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", på dag %s i måneden";
            };
            da2.prototype.commaOnlyInX0 = function() {
              return ", kun i %s";
            };
            da2.prototype.commaOnlyOnX0 = function() {
              return ", kun på %s";
            };
            da2.prototype.commaAndOnX0 = function() {
              return ", og på %s";
            };
            da2.prototype.commaOnThe = function() {
              return ", på den ";
            };
            da2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", på den sidste dag i måneden";
            };
            da2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", på den sidste hverdag i måneden";
            };
            da2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dage før den sidste dag i måneden";
            };
            da2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", på den sidste %s i måneden";
            };
            da2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", på den %s i måneden";
            };
            da2.prototype.commaX0ThroughX1 = function() {
              return ", %s til og med %s";
            };
            da2.prototype.everyHour = function() {
              return "hver time";
            };
            da2.prototype.everyMinute = function() {
              return "hvert minut";
            };
            da2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "hvert minut mellem %s og %s";
            };
            da2.prototype.everySecond = function() {
              return "hvert sekund";
            };
            da2.prototype.everyX0Hours = function() {
              return "hver %s. time";
            };
            da2.prototype.everyX0Minutes = function() {
              return "hvert %s. minut";
            };
            da2.prototype.everyX0Seconds = function() {
              return "hvert %s. sekund";
            };
            da2.prototype.fifth = function() {
              return "femte";
            };
            da2.prototype.first = function() {
              return "første";
            };
            da2.prototype.firstWeekday = function() {
              return "første hverdag";
            };
            da2.prototype.fourth = function() {
              return "fjerde";
            };
            da2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minutterne fra %s til og med %s hver time";
            };
            da2.prototype.second = function() {
              return "anden";
            };
            da2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekunderne fra %s til og med %s hvert minut";
            };
            da2.prototype.spaceAnd = function() {
              return " og";
            };
            da2.prototype.spaceX0OfTheMonth = function() {
              return " %s i måneden";
            };
            da2.prototype.lastDay = function() {
              return "sidste dag";
            };
            da2.prototype.third = function() {
              return "tredje";
            };
            da2.prototype.weekdayNearestDayX0 = function() {
              return "hverdag nærmest dag %s";
            };
            da2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            da2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            da2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            da2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            da2.prototype.commaStartingX0 = function() {
              return ", startende %s";
            };
            da2.prototype.daysOfTheWeek = function() {
              return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
            };
            da2.prototype.monthsOfTheYear = function() {
              return [
                "januar",
                "februar",
                "marts",
                "april",
                "maj",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "december"
              ];
            };
            return da2;
          }();
          exports2.da = da;
        },
        /* 11 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.de = void 0;
          var de = function() {
            function de2() {
            }
            de2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            de2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            de2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            de2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            de2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            de2.prototype.everyMinute = function() {
              return "jede Minute";
            };
            de2.prototype.everyHour = function() {
              return "jede Stunde";
            };
            de2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Beim Generieren der Ausdrucksbeschreibung ist ein Fehler aufgetreten. Überprüfen Sie die Syntax des Cron-Ausdrucks.";
            };
            de2.prototype.atSpace = function() {
              return "Um ";
            };
            de2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Jede Minute zwischen %s und %s";
            };
            de2.prototype.at = function() {
              return "Um";
            };
            de2.prototype.spaceAnd = function() {
              return " und";
            };
            de2.prototype.everySecond = function() {
              return "Jede Sekunde";
            };
            de2.prototype.everyX0Seconds = function() {
              return "alle %s Sekunden";
            };
            de2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "Sekunden %s bis %s";
            };
            de2.prototype.atX0SecondsPastTheMinute = function() {
              return "bei Sekunde %s";
            };
            de2.prototype.everyX0Minutes = function() {
              return "alle %s Minuten";
            };
            de2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "Minuten %s bis %s";
            };
            de2.prototype.atX0MinutesPastTheHour = function() {
              return "bei Minute %s";
            };
            de2.prototype.everyX0Hours = function() {
              return "alle %s Stunden";
            };
            de2.prototype.betweenX0AndX1 = function() {
              return "zwischen %s und %s";
            };
            de2.prototype.atX0 = function() {
              return "um %s";
            };
            de2.prototype.commaEveryDay = function() {
              return ", jeden Tag";
            };
            de2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", alle %s Tage der Woche";
            };
            de2.prototype.commaX0ThroughX1 = function() {
              return ", %s bis %s";
            };
            de2.prototype.first = function() {
              return "ersten";
            };
            de2.prototype.second = function() {
              return "zweiten";
            };
            de2.prototype.third = function() {
              return "dritten";
            };
            de2.prototype.fourth = function() {
              return "vierten";
            };
            de2.prototype.fifth = function() {
              return "fünften";
            };
            de2.prototype.commaOnThe = function() {
              return ", am ";
            };
            de2.prototype.spaceX0OfTheMonth = function() {
              return " %s des Monats";
            };
            de2.prototype.lastDay = function() {
              return "der letzte Tag";
            };
            de2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", am letzten %s des Monats";
            };
            de2.prototype.commaOnlyOnX0 = function() {
              return ", nur jeden %s";
            };
            de2.prototype.commaAndOnX0 = function() {
              return ", und jeden %s";
            };
            de2.prototype.commaEveryX0Months = function() {
              return ", alle %s Monate";
            };
            de2.prototype.commaOnlyInX0 = function() {
              return ", nur im %s";
            };
            de2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", am letzten Tag des Monats";
            };
            de2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", am letzten Werktag des Monats";
            };
            de2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s tage vor dem letzten Tag des Monats";
            };
            de2.prototype.firstWeekday = function() {
              return "ersten Werktag";
            };
            de2.prototype.weekdayNearestDayX0 = function() {
              return "Werktag am nächsten zum %s Tag";
            };
            de2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", am %s des Monats";
            };
            de2.prototype.commaEveryX0Days = function() {
              return ", alle %s Tage";
            };
            de2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", zwischen Tag %s und %s des Monats";
            };
            de2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", an Tag %s des Monats";
            };
            de2.prototype.commaEveryX0Years = function() {
              return ", alle %s Jahre";
            };
            de2.prototype.commaStartingX0 = function() {
              return ", beginnend %s";
            };
            de2.prototype.daysOfTheWeek = function() {
              return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
            };
            de2.prototype.monthsOfTheYear = function() {
              return [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
              ];
            };
            return de2;
          }();
          exports2.de = de;
        },
        /* 12 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.es = void 0;
          var es = function() {
            function es2() {
            }
            es2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            es2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            es2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            es2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            es2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            es2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
            };
            es2.prototype.at = function() {
              return "A las";
            };
            es2.prototype.atSpace = function() {
              return "A las ";
            };
            es2.prototype.atX0 = function() {
              return "a las %s";
            };
            es2.prototype.atX0MinutesPastTheHour = function() {
              return "a los %s minutos de la hora";
            };
            es2.prototype.atX0SecondsPastTheMinute = function() {
              return "a los %s segundos del minuto";
            };
            es2.prototype.betweenX0AndX1 = function() {
              return "entre las %s y las %s";
            };
            es2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", entre los días %s y %s del mes";
            };
            es2.prototype.commaEveryDay = function() {
              return ", cada día";
            };
            es2.prototype.commaEveryX0Days = function() {
              return ", cada %s días";
            };
            es2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", cada %s días de la semana";
            };
            es2.prototype.commaEveryX0Months = function() {
              return ", cada %s meses";
            };
            es2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", el día %s del mes";
            };
            es2.prototype.commaOnlyInX0 = function() {
              return ", sólo en %s";
            };
            es2.prototype.commaOnlyOnX0 = function() {
              return ", sólo el %s";
            };
            es2.prototype.commaAndOnX0 = function() {
              return ", y el %s";
            };
            es2.prototype.commaOnThe = function() {
              return ", en el ";
            };
            es2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", en el último día del mes";
            };
            es2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", en el último día de la semana del mes";
            };
            es2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s días antes del último día del mes";
            };
            es2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", en el último %s del mes";
            };
            es2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", en el %s del mes";
            };
            es2.prototype.commaX0ThroughX1 = function() {
              return ", de %s a %s";
            };
            es2.prototype.everyHour = function() {
              return "cada hora";
            };
            es2.prototype.everyMinute = function() {
              return "cada minuto";
            };
            es2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "cada minuto entre las %s y las %s";
            };
            es2.prototype.everySecond = function() {
              return "cada segundo";
            };
            es2.prototype.everyX0Hours = function() {
              return "cada %s horas";
            };
            es2.prototype.everyX0Minutes = function() {
              return "cada %s minutos";
            };
            es2.prototype.everyX0Seconds = function() {
              return "cada %s segundos";
            };
            es2.prototype.fifth = function() {
              return "quinto";
            };
            es2.prototype.first = function() {
              return "primero";
            };
            es2.prototype.firstWeekday = function() {
              return "primer día de la semana";
            };
            es2.prototype.fourth = function() {
              return "cuarto";
            };
            es2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "del minuto %s al %s pasada la hora";
            };
            es2.prototype.second = function() {
              return "segundo";
            };
            es2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "En los segundos %s al %s de cada minuto";
            };
            es2.prototype.spaceAnd = function() {
              return " y";
            };
            es2.prototype.spaceX0OfTheMonth = function() {
              return " %s del mes";
            };
            es2.prototype.lastDay = function() {
              return "el último día";
            };
            es2.prototype.third = function() {
              return "tercer";
            };
            es2.prototype.weekdayNearestDayX0 = function() {
              return "día de la semana más próximo al %s";
            };
            es2.prototype.commaEveryX0Years = function() {
              return ", cada %s años";
            };
            es2.prototype.commaStartingX0 = function() {
              return ", comenzando %s";
            };
            es2.prototype.daysOfTheWeek = function() {
              return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
            };
            es2.prototype.monthsOfTheYear = function() {
              return [
                "enero",
                "febrero",
                "marzo",
                "abril",
                "mayo",
                "junio",
                "julio",
                "agosto",
                "septiembre",
                "octubre",
                "noviembre",
                "diciembre"
              ];
            };
            return es2;
          }();
          exports2.es = es;
        },
        /* 13 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.fr = void 0;
          var fr = function() {
            function fr2() {
            }
            fr2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            fr2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            fr2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            fr2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            fr2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            fr2.prototype.everyMinute = function() {
              return "toutes les minutes";
            };
            fr2.prototype.everyHour = function() {
              return "toutes les heures";
            };
            fr2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
            };
            fr2.prototype.atSpace = function() {
              return "À ";
            };
            fr2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Toutes les minutes entre %s et %s";
            };
            fr2.prototype.at = function() {
              return "À";
            };
            fr2.prototype.spaceAnd = function() {
              return " et";
            };
            fr2.prototype.everySecond = function() {
              return "toutes les secondes";
            };
            fr2.prototype.everyX0Seconds = function() {
              return "toutes les %s secondes";
            };
            fr2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "les secondes entre %s et %s après la minute";
            };
            fr2.prototype.atX0SecondsPastTheMinute = function() {
              return "%s secondes après la minute";
            };
            fr2.prototype.everyX0Minutes = function() {
              return "toutes les %s minutes";
            };
            fr2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "les minutes entre %s et %s après l'heure";
            };
            fr2.prototype.atX0MinutesPastTheHour = function() {
              return "%s minutes après l'heure";
            };
            fr2.prototype.everyX0Hours = function() {
              return "toutes les %s heures";
            };
            fr2.prototype.betweenX0AndX1 = function() {
              return "de %s à %s";
            };
            fr2.prototype.atX0 = function() {
              return "à %s";
            };
            fr2.prototype.commaEveryDay = function() {
              return ", tous les jours";
            };
            fr2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", every %s days of the week";
            };
            fr2.prototype.commaX0ThroughX1 = function() {
              return ", de %s à %s";
            };
            fr2.prototype.first = function() {
              return "premier";
            };
            fr2.prototype.second = function() {
              return "second";
            };
            fr2.prototype.third = function() {
              return "troisième";
            };
            fr2.prototype.fourth = function() {
              return "quatrième";
            };
            fr2.prototype.fifth = function() {
              return "cinquième";
            };
            fr2.prototype.commaOnThe = function() {
              return ", le ";
            };
            fr2.prototype.spaceX0OfTheMonth = function() {
              return " %s du mois";
            };
            fr2.prototype.lastDay = function() {
              return "le dernier jour";
            };
            fr2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", le dernier %s du mois";
            };
            fr2.prototype.commaOnlyOnX0 = function() {
              return ", uniquement le %s";
            };
            fr2.prototype.commaAndOnX0 = function() {
              return ", et %s";
            };
            fr2.prototype.commaEveryX0Months = function() {
              return ", tous les %s mois";
            };
            fr2.prototype.commaOnlyInX0 = function() {
              return ", uniquement en %s";
            };
            fr2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", le dernier jour du mois";
            };
            fr2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", le dernier jour ouvrable du mois";
            };
            fr2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s jours avant le dernier jour du mois";
            };
            fr2.prototype.firstWeekday = function() {
              return "premier jour ouvrable";
            };
            fr2.prototype.weekdayNearestDayX0 = function() {
              return "jour ouvrable le plus proche du %s";
            };
            fr2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", le %s du mois";
            };
            fr2.prototype.commaEveryX0Days = function() {
              return ", tous les %s jours";
            };
            fr2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", du %s au %s du mois";
            };
            fr2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", le %s du mois";
            };
            fr2.prototype.commaEveryX0Years = function() {
              return ", tous les %s ans";
            };
            fr2.prototype.commaDaysX0ThroughX1 = function() {
              return ", du %s au %s";
            };
            fr2.prototype.commaStartingX0 = function() {
              return ", départ %s";
            };
            fr2.prototype.daysOfTheWeek = function() {
              return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
            };
            fr2.prototype.monthsOfTheYear = function() {
              return [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre"
              ];
            };
            return fr2;
          }();
          exports2.fr = fr;
        },
        /* 14 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.it = void 0;
          var it = function() {
            function it2() {
            }
            it2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            it2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            it2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            it2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            it2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            it2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
            };
            it2.prototype.at = function() {
              return "Alle";
            };
            it2.prototype.atSpace = function() {
              return "Alle ";
            };
            it2.prototype.atX0 = function() {
              return "alle %s";
            };
            it2.prototype.atX0MinutesPastTheHour = function() {
              return "al %s minuto passata l'ora";
            };
            it2.prototype.atX0SecondsPastTheMinute = function() {
              return "al %s secondo passato il minuto";
            };
            it2.prototype.betweenX0AndX1 = function() {
              return "tra le %s e le %s";
            };
            it2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", tra il giorno %s e %s del mese";
            };
            it2.prototype.commaEveryDay = function() {
              return ", ogni giorno";
            };
            it2.prototype.commaEveryX0Days = function() {
              return ", ogni %s giorni";
            };
            it2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", ogni %s giorni della settimana";
            };
            it2.prototype.commaEveryX0Months = function() {
              return ", ogni %s mesi";
            };
            it2.prototype.commaEveryX0Years = function() {
              return ", ogni %s anni";
            };
            it2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", il giorno %s del mese";
            };
            it2.prototype.commaOnlyInX0 = function() {
              return ", solo in %s";
            };
            it2.prototype.commaOnlyOnX0 = function() {
              return ", solo il %s";
            };
            it2.prototype.commaAndOnX0 = function() {
              return ", e il %s";
            };
            it2.prototype.commaOnThe = function() {
              return ", il ";
            };
            it2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", l'ultimo giorno del mese";
            };
            it2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", nell'ultima settimana del mese";
            };
            it2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s giorni prima dell'ultimo giorno del mese";
            };
            it2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", l'ultimo %s del mese";
            };
            it2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", il %s del mese";
            };
            it2.prototype.commaX0ThroughX1 = function() {
              return ", %s al %s";
            };
            it2.prototype.everyHour = function() {
              return "ogni ora";
            };
            it2.prototype.everyMinute = function() {
              return "ogni minuto";
            };
            it2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Ogni minuto tra le %s e le %s";
            };
            it2.prototype.everySecond = function() {
              return "ogni secondo";
            };
            it2.prototype.everyX0Hours = function() {
              return "ogni %s ore";
            };
            it2.prototype.everyX0Minutes = function() {
              return "ogni %s minuti";
            };
            it2.prototype.everyX0Seconds = function() {
              return "ogni %s secondi";
            };
            it2.prototype.fifth = function() {
              return "quinto";
            };
            it2.prototype.first = function() {
              return "primo";
            };
            it2.prototype.firstWeekday = function() {
              return "primo giorno della settimana";
            };
            it2.prototype.fourth = function() {
              return "quarto";
            };
            it2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuti %s al %s dopo l'ora";
            };
            it2.prototype.second = function() {
              return "secondo";
            };
            it2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "secondi %s al %s oltre il minuto";
            };
            it2.prototype.spaceAnd = function() {
              return " e";
            };
            it2.prototype.spaceX0OfTheMonth = function() {
              return " %s del mese";
            };
            it2.prototype.lastDay = function() {
              return "l'ultimo giorno";
            };
            it2.prototype.third = function() {
              return "terzo";
            };
            it2.prototype.weekdayNearestDayX0 = function() {
              return "giorno della settimana più vicino al %s";
            };
            it2.prototype.commaStartingX0 = function() {
              return ", a partire %s";
            };
            it2.prototype.daysOfTheWeek = function() {
              return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
            };
            it2.prototype.monthsOfTheYear = function() {
              return [
                "gennaio",
                "febbraio",
                "marzo",
                "aprile",
                "maggio",
                "giugno",
                "luglio",
                "agosto",
                "settembre",
                "ottobre",
                "novembre",
                "dicembre"
              ];
            };
            return it2;
          }();
          exports2.it = it;
        },
        /* 15 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.id = void 0;
          var id = function() {
            function id2() {
            }
            id2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            id2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            id2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            id2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            id2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            id2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Terjadi kesalahan saat membuat deskripsi ekspresi. Periksa sintaks ekspresi cron.";
            };
            id2.prototype.everyMinute = function() {
              return "setiap menit";
            };
            id2.prototype.everyHour = function() {
              return "setiap jam";
            };
            id2.prototype.atSpace = function() {
              return "Pada ";
            };
            id2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Setiap menit diantara %s dan %s";
            };
            id2.prototype.at = function() {
              return "Pada";
            };
            id2.prototype.spaceAnd = function() {
              return " dan";
            };
            id2.prototype.everySecond = function() {
              return "setiap detik";
            };
            id2.prototype.everyX0Seconds = function() {
              return "setiap %s detik";
            };
            id2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "detik ke %s sampai %s melewati menit";
            };
            id2.prototype.atX0SecondsPastTheMinute = function() {
              return "pada %s detik lewat satu menit";
            };
            id2.prototype.everyX0Minutes = function() {
              return "setiap %s menit";
            };
            id2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "menit ke %s sampai %s melewati jam";
            };
            id2.prototype.atX0MinutesPastTheHour = function() {
              return "pada %s menit melewati jam";
            };
            id2.prototype.everyX0Hours = function() {
              return "setiap %s jam";
            };
            id2.prototype.betweenX0AndX1 = function() {
              return "diantara %s dan %s";
            };
            id2.prototype.atX0 = function() {
              return "pada %s";
            };
            id2.prototype.commaEveryDay = function() {
              return ", setiap hari";
            };
            id2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", setiap hari %s  dalam seminggu";
            };
            id2.prototype.commaX0ThroughX1 = function() {
              return ", %s sampai %s";
            };
            id2.prototype.first = function() {
              return "pertama";
            };
            id2.prototype.second = function() {
              return "kedua";
            };
            id2.prototype.third = function() {
              return "ketiga";
            };
            id2.prototype.fourth = function() {
              return "keempat";
            };
            id2.prototype.fifth = function() {
              return "kelima";
            };
            id2.prototype.commaOnThe = function() {
              return ", di ";
            };
            id2.prototype.spaceX0OfTheMonth = function() {
              return " %s pada bulan";
            };
            id2.prototype.lastDay = function() {
              return "hari terakhir";
            };
            id2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", pada %s terakhir bulan ini";
            };
            id2.prototype.commaOnlyOnX0 = function() {
              return ", hanya pada %s";
            };
            id2.prototype.commaAndOnX0 = function() {
              return ", dan pada %s";
            };
            id2.prototype.commaEveryX0Months = function() {
              return ", setiap bulan %s ";
            };
            id2.prototype.commaOnlyInX0 = function() {
              return ", hanya pada %s";
            };
            id2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", pada hari terakhir bulan ini";
            };
            id2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", pada hari kerja terakhir setiap bulan";
            };
            id2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s hari sebelum hari terakhir setiap bulan";
            };
            id2.prototype.firstWeekday = function() {
              return "hari kerja pertama";
            };
            id2.prototype.weekdayNearestDayX0 = function() {
              return "hari kerja terdekat %s";
            };
            id2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", pada %s bulan ini";
            };
            id2.prototype.commaEveryX0Days = function() {
              return ", setiap %s hari";
            };
            id2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", antara hari %s dan %s dalam sebulan";
            };
            id2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", pada hari %s dalam sebulan";
            };
            id2.prototype.commaEveryHour = function() {
              return ", setiap jam";
            };
            id2.prototype.commaEveryX0Years = function() {
              return ", setiap %s tahun";
            };
            id2.prototype.commaStartingX0 = function() {
              return ", mulai pada %s";
            };
            id2.prototype.daysOfTheWeek = function() {
              return ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            };
            id2.prototype.monthsOfTheYear = function() {
              return [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember"
              ];
            };
            return id2;
          }();
          exports2.id = id;
        },
        /* 16 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ko = void 0;
          var ko = function() {
            function ko2() {
            }
            ko2.prototype.setPeriodBeforeTime = function() {
              return true;
            };
            ko2.prototype.pm = function() {
              return "오후";
            };
            ko2.prototype.am = function() {
              return "오전";
            };
            ko2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            ko2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            ko2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            ko2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            ko2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            ko2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "표현식 설명을 생성하는 중 오류가 발생했습니다. cron 표현식 구문을 확인하십시오.";
            };
            ko2.prototype.everyMinute = function() {
              return "1분마다";
            };
            ko2.prototype.everyHour = function() {
              return "1시간마다";
            };
            ko2.prototype.atSpace = function() {
              return "에서 ";
            };
            ko2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "%s 및 %s 사이에 매 분";
            };
            ko2.prototype.at = function() {
              return "에서";
            };
            ko2.prototype.spaceAnd = function() {
              return " 및";
            };
            ko2.prototype.everySecond = function() {
              return "1초마다";
            };
            ko2.prototype.everyX0Seconds = function() {
              return "%s초마다";
            };
            ko2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "정분 후 %s초에서 %s초까지";
            };
            ko2.prototype.atX0SecondsPastTheMinute = function() {
              return "정분 후 %s초에서";
            };
            ko2.prototype.everyX0Minutes = function() {
              return "%s분마다";
            };
            ko2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "정시 후 %s분에서 %s까지";
            };
            ko2.prototype.atX0MinutesPastTheHour = function() {
              return "정시 후 %s분에서";
            };
            ko2.prototype.everyX0Hours = function() {
              return "%s시간마다";
            };
            ko2.prototype.betweenX0AndX1 = function() {
              return "%s에서 %s 사이";
            };
            ko2.prototype.atX0 = function() {
              return "%s에서";
            };
            ko2.prototype.commaEveryDay = function() {
              return ", 매일";
            };
            ko2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", 주 중 %s일마다";
            };
            ko2.prototype.commaX0ThroughX1 = function() {
              return ", %s에서 %s까지";
            };
            ko2.prototype.first = function() {
              return "첫 번째";
            };
            ko2.prototype.second = function() {
              return "두 번째";
            };
            ko2.prototype.third = function() {
              return "세 번째";
            };
            ko2.prototype.fourth = function() {
              return "네 번째";
            };
            ko2.prototype.fifth = function() {
              return "다섯 번째";
            };
            ko2.prototype.commaOnThe = function() {
              return ", 해당 ";
            };
            ko2.prototype.spaceX0OfTheMonth = function() {
              return " 해당 월의 %s";
            };
            ko2.prototype.lastDay = function() {
              return "마지막 날";
            };
            ko2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", 해당 월의 마지막 %s";
            };
            ko2.prototype.commaOnlyOnX0 = function() {
              return ", %s에만";
            };
            ko2.prototype.commaAndOnX0 = function() {
              return ", 및 %s에";
            };
            ko2.prototype.commaEveryX0Months = function() {
              return ", %s개월마다";
            };
            ko2.prototype.commaOnlyInX0 = function() {
              return ", %s에서만";
            };
            ko2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", 해당 월의 마지막 날에";
            };
            ko2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", 해당 월의 마지막 평일에";
            };
            ko2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", 해당 월의 마지막 날 %s일 전";
            };
            ko2.prototype.firstWeekday = function() {
              return "첫 번째 평일";
            };
            ko2.prototype.weekdayNearestDayX0 = function() {
              return "평일 가장 가까운 날 %s";
            };
            ko2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", 해당 월의 %s에";
            };
            ko2.prototype.commaEveryX0Days = function() {
              return ", %s일마다";
            };
            ko2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", 해당 월의 %s일 및 %s일 사이";
            };
            ko2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", 해당 월의 %s일에";
            };
            ko2.prototype.commaEveryMinute = function() {
              return ", 1분마다";
            };
            ko2.prototype.commaEveryHour = function() {
              return ", 1시간마다";
            };
            ko2.prototype.commaEveryX0Years = function() {
              return ", %s년마다";
            };
            ko2.prototype.commaStartingX0 = function() {
              return ", %s부터";
            };
            ko2.prototype.daysOfTheWeek = function() {
              return ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            };
            ko2.prototype.monthsOfTheYear = function() {
              return ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
            };
            return ko2;
          }();
          exports2.ko = ko;
        },
        /* 17 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.nl = void 0;
          var nl = function() {
            function nl2() {
            }
            nl2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            nl2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            nl2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            nl2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            nl2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            nl2.prototype.everyMinute = function() {
              return "elke minuut";
            };
            nl2.prototype.everyHour = function() {
              return "elk uur";
            };
            nl2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
            };
            nl2.prototype.atSpace = function() {
              return "Op ";
            };
            nl2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Elke minuut tussen %s en %s";
            };
            nl2.prototype.at = function() {
              return "Op";
            };
            nl2.prototype.spaceAnd = function() {
              return " en";
            };
            nl2.prototype.everySecond = function() {
              return "elke seconde";
            };
            nl2.prototype.everyX0Seconds = function() {
              return "elke %s seconden";
            };
            nl2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "seconden %s t/m %s na de minuut";
            };
            nl2.prototype.atX0SecondsPastTheMinute = function() {
              return "op %s seconden na de minuut";
            };
            nl2.prototype.everyX0Minutes = function() {
              return "elke %s minuten";
            };
            nl2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuut %s t/m %s na het uur";
            };
            nl2.prototype.atX0MinutesPastTheHour = function() {
              return "op %s minuten na het uur";
            };
            nl2.prototype.everyX0Hours = function() {
              return "elke %s uur";
            };
            nl2.prototype.betweenX0AndX1 = function() {
              return "tussen %s en %s";
            };
            nl2.prototype.atX0 = function() {
              return "op %s";
            };
            nl2.prototype.commaEveryDay = function() {
              return ", elke dag";
            };
            nl2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", elke %s dagen van de week";
            };
            nl2.prototype.commaX0ThroughX1 = function() {
              return ", %s t/m %s";
            };
            nl2.prototype.first = function() {
              return "eerste";
            };
            nl2.prototype.second = function() {
              return "tweede";
            };
            nl2.prototype.third = function() {
              return "derde";
            };
            nl2.prototype.fourth = function() {
              return "vierde";
            };
            nl2.prototype.fifth = function() {
              return "vijfde";
            };
            nl2.prototype.commaOnThe = function() {
              return ", op de ";
            };
            nl2.prototype.spaceX0OfTheMonth = function() {
              return " %s van de maand";
            };
            nl2.prototype.lastDay = function() {
              return "de laatste dag";
            };
            nl2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", op de laatste %s van de maand";
            };
            nl2.prototype.commaOnlyOnX0 = function() {
              return ", alleen op %s";
            };
            nl2.prototype.commaAndOnX0 = function() {
              return ", en op %s";
            };
            nl2.prototype.commaEveryX0Months = function() {
              return ", elke %s maanden";
            };
            nl2.prototype.commaOnlyInX0 = function() {
              return ", alleen in %s";
            };
            nl2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", op de laatste dag van de maand";
            };
            nl2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", op de laatste werkdag van de maand";
            };
            nl2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dagen vóór de laatste dag van de maand";
            };
            nl2.prototype.firstWeekday = function() {
              return "eerste werkdag";
            };
            nl2.prototype.weekdayNearestDayX0 = function() {
              return "werkdag dichtst bij dag %s";
            };
            nl2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", op de %s van de maand";
            };
            nl2.prototype.commaEveryX0Days = function() {
              return ", elke %s dagen";
            };
            nl2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", tussen dag %s en %s van de maand";
            };
            nl2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", op dag %s van de maand";
            };
            nl2.prototype.commaEveryX0Years = function() {
              return ", elke %s jaren";
            };
            nl2.prototype.commaStartingX0 = function() {
              return ", beginnend %s";
            };
            nl2.prototype.daysOfTheWeek = function() {
              return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
            };
            nl2.prototype.monthsOfTheYear = function() {
              return [
                "januari",
                "februari",
                "maart",
                "april",
                "mei",
                "juni",
                "juli",
                "augustus",
                "september",
                "oktober",
                "november",
                "december"
              ];
            };
            return nl2;
          }();
          exports2.nl = nl;
        },
        /* 18 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.nb = void 0;
          var nb = function() {
            function nb2() {
            }
            nb2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            nb2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            nb2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            nb2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            nb2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            nb2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "En feil inntraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
            };
            nb2.prototype.at = function() {
              return "Kl.";
            };
            nb2.prototype.atSpace = function() {
              return "Kl.";
            };
            nb2.prototype.atX0 = function() {
              return "på %s";
            };
            nb2.prototype.atX0MinutesPastTheHour = function() {
              return "på %s minutter etter timen";
            };
            nb2.prototype.atX0SecondsPastTheMinute = function() {
              return "på %s sekunder etter minuttet";
            };
            nb2.prototype.betweenX0AndX1 = function() {
              return "mellom %s og %s";
            };
            nb2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", mellom dag %s og %s av måneden";
            };
            nb2.prototype.commaEveryDay = function() {
              return ", hver dag";
            };
            nb2.prototype.commaEveryX0Days = function() {
              return ", hver %s dag";
            };
            nb2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", hver %s ukedag";
            };
            nb2.prototype.commaEveryX0Months = function() {
              return ", hver %s måned";
            };
            nb2.prototype.commaEveryX0Years = function() {
              return ", hvert %s år";
            };
            nb2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", på dag %s av måneden";
            };
            nb2.prototype.commaOnlyInX0 = function() {
              return ", bare i %s";
            };
            nb2.prototype.commaOnlyOnX0 = function() {
              return ", på %s";
            };
            nb2.prototype.commaAndOnX0 = function() {
              return ", og på %s";
            };
            nb2.prototype.commaOnThe = function() {
              return ", på ";
            };
            nb2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", på den siste dagen i måneden";
            };
            nb2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", den siste ukedagen i måneden";
            };
            nb2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dager før den siste dagen i måneden";
            };
            nb2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", på den siste %s av måneden";
            };
            nb2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", på den %s av måneden";
            };
            nb2.prototype.commaX0ThroughX1 = function() {
              return ", %s til og med %s";
            };
            nb2.prototype.everyHour = function() {
              return "hver time";
            };
            nb2.prototype.everyMinute = function() {
              return "hvert minutt";
            };
            nb2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Hvert minutt mellom %s og %s";
            };
            nb2.prototype.everySecond = function() {
              return "hvert sekund";
            };
            nb2.prototype.everyX0Hours = function() {
              return "hver %s time";
            };
            nb2.prototype.everyX0Minutes = function() {
              return "hvert %s minutt";
            };
            nb2.prototype.everyX0Seconds = function() {
              return "hvert %s sekund";
            };
            nb2.prototype.fifth = function() {
              return "femte";
            };
            nb2.prototype.first = function() {
              return "første";
            };
            nb2.prototype.firstWeekday = function() {
              return "første ukedag";
            };
            nb2.prototype.fourth = function() {
              return "fjerde";
            };
            nb2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuttene fra %s til og med %s etter timen";
            };
            nb2.prototype.second = function() {
              return "sekund";
            };
            nb2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekundene fra %s til og med %s etter minuttet";
            };
            nb2.prototype.spaceAnd = function() {
              return " og";
            };
            nb2.prototype.spaceX0OfTheMonth = function() {
              return " %s i måneden";
            };
            nb2.prototype.lastDay = function() {
              return "den siste dagen";
            };
            nb2.prototype.third = function() {
              return "tredje";
            };
            nb2.prototype.weekdayNearestDayX0 = function() {
              return "ukedag nærmest dag %s";
            };
            nb2.prototype.commaStartingX0 = function() {
              return ", starter %s";
            };
            nb2.prototype.daysOfTheWeek = function() {
              return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
            };
            nb2.prototype.monthsOfTheYear = function() {
              return [
                "januar",
                "februar",
                "mars",
                "april",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
              ];
            };
            return nb2;
          }();
          exports2.nb = nb;
        },
        /* 19 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.sv = void 0;
          var sv = function() {
            function sv2() {
            }
            sv2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            sv2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            sv2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            sv2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            sv2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            sv2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Ett fel inträffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
            };
            sv2.prototype.everyMinute = function() {
              return "varje minut";
            };
            sv2.prototype.everyHour = function() {
              return "varje timme";
            };
            sv2.prototype.atSpace = function() {
              return "Kl ";
            };
            sv2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Varje minut mellan %s och %s";
            };
            sv2.prototype.at = function() {
              return "Kl";
            };
            sv2.prototype.spaceAnd = function() {
              return " och";
            };
            sv2.prototype.everySecond = function() {
              return "varje sekund";
            };
            sv2.prototype.everyX0Seconds = function() {
              return "varje %s sekund";
            };
            sv2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekunderna från %s till och med %s efter minuten";
            };
            sv2.prototype.atX0SecondsPastTheMinute = function() {
              return "på %s sekunder efter minuten";
            };
            sv2.prototype.everyX0Minutes = function() {
              return "var %s minut";
            };
            sv2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuterna från %s till och med %s efter timmen";
            };
            sv2.prototype.atX0MinutesPastTheHour = function() {
              return "på %s minuten efter timmen";
            };
            sv2.prototype.everyX0Hours = function() {
              return "var %s timme";
            };
            sv2.prototype.betweenX0AndX1 = function() {
              return "mellan %s och %s";
            };
            sv2.prototype.atX0 = function() {
              return "kl %s";
            };
            sv2.prototype.commaEveryDay = function() {
              return ", varje dag";
            };
            sv2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", var %s dag i veckan";
            };
            sv2.prototype.commaX0ThroughX1 = function() {
              return ", %s till %s";
            };
            sv2.prototype.first = function() {
              return "första";
            };
            sv2.prototype.second = function() {
              return "andra";
            };
            sv2.prototype.third = function() {
              return "tredje";
            };
            sv2.prototype.fourth = function() {
              return "fjärde";
            };
            sv2.prototype.fifth = function() {
              return "femte";
            };
            sv2.prototype.commaOnThe = function() {
              return ", den ";
            };
            sv2.prototype.spaceX0OfTheMonth = function() {
              return " %sen av månaden";
            };
            sv2.prototype.lastDay = function() {
              return "den sista dagen";
            };
            sv2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", på sista %s av månaden";
            };
            sv2.prototype.commaOnlyOnX0 = function() {
              return ", varje %s";
            };
            sv2.prototype.commaAndOnX0 = function() {
              return ", och på %s";
            };
            sv2.prototype.commaEveryX0Months = function() {
              return ", var %s månad";
            };
            sv2.prototype.commaOnlyInX0 = function() {
              return ", bara på %s";
            };
            sv2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", på sista dagen av månaden";
            };
            sv2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", på sista veckodag av månaden";
            };
            sv2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dagar före den sista dagen i månaden";
            };
            sv2.prototype.firstWeekday = function() {
              return "första veckodag";
            };
            sv2.prototype.weekdayNearestDayX0 = function() {
              return "veckodagen närmast dag %s";
            };
            sv2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", på den %s av månaden";
            };
            sv2.prototype.commaEveryX0Days = function() {
              return ", var %s dag";
            };
            sv2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", mellan dag %s och %s av månaden";
            };
            sv2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", på dag %s av månaden";
            };
            sv2.prototype.commaEveryX0Years = function() {
              return ", var %s år";
            };
            sv2.prototype.commaStartingX0 = function() {
              return ", startar %s";
            };
            sv2.prototype.daysOfTheWeek = function() {
              return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
            };
            sv2.prototype.monthsOfTheYear = function() {
              return [
                "januari",
                "februari",
                "mars",
                "april",
                "maj",
                "juni",
                "juli",
                "augusti",
                "september",
                "oktober",
                "november",
                "december"
              ];
            };
            return sv2;
          }();
          exports2.sv = sv;
        },
        /* 20 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.pl = void 0;
          var pl = function() {
            function pl2() {
            }
            pl2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            pl2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            pl2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            pl2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            pl2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            pl2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
            };
            pl2.prototype.at = function() {
              return "O";
            };
            pl2.prototype.atSpace = function() {
              return "O ";
            };
            pl2.prototype.atX0 = function() {
              return "o %s";
            };
            pl2.prototype.atX0MinutesPastTheHour = function() {
              return "w %s minucie";
            };
            pl2.prototype.atX0SecondsPastTheMinute = function() {
              return "w %s sekundzie";
            };
            pl2.prototype.betweenX0AndX1 = function() {
              return "od %s do %s";
            };
            pl2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", od %s-ego do %s-ego dnia miesiąca";
            };
            pl2.prototype.commaEveryDay = function() {
              return ", co dzień";
            };
            pl2.prototype.commaEveryX0Days = function() {
              return ", co %s dni";
            };
            pl2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", co %s dni tygodnia";
            };
            pl2.prototype.commaEveryX0Months = function() {
              return ", co %s miesięcy";
            };
            pl2.prototype.commaEveryX0Years = function() {
              return ", co %s lat";
            };
            pl2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", %s-ego dnia miesiąca";
            };
            pl2.prototype.commaOnlyInX0 = function() {
              return ", tylko %s";
            };
            pl2.prototype.commaOnlyOnX0 = function() {
              return ", tylko %s";
            };
            pl2.prototype.commaAndOnX0 = function() {
              return ", i %s";
            };
            pl2.prototype.commaOnThe = function() {
              return ", ";
            };
            pl2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", ostatni dzień miesiąca";
            };
            pl2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", ostatni dzień roboczy miesiąca";
            };
            pl2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dni przed ostatnim dniem miesiąca";
            };
            pl2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", ostatni %s miesiąca";
            };
            pl2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", %s miesiąca";
            };
            pl2.prototype.commaX0ThroughX1 = function() {
              return ", od %s do %s";
            };
            pl2.prototype.everyHour = function() {
              return "co godzinę";
            };
            pl2.prototype.everyMinute = function() {
              return "co minutę";
            };
            pl2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Co minutę od %s do %s";
            };
            pl2.prototype.everySecond = function() {
              return "co sekundę";
            };
            pl2.prototype.everyX0Hours = function() {
              return "co %s godzin";
            };
            pl2.prototype.everyX0Minutes = function() {
              return "co %s minut";
            };
            pl2.prototype.everyX0Seconds = function() {
              return "co %s sekund";
            };
            pl2.prototype.fifth = function() {
              return "piąty";
            };
            pl2.prototype.first = function() {
              return "pierwszy";
            };
            pl2.prototype.firstWeekday = function() {
              return "pierwszy dzień roboczy";
            };
            pl2.prototype.fourth = function() {
              return "czwarty";
            };
            pl2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuty od %s do %s";
            };
            pl2.prototype.second = function() {
              return "drugi";
            };
            pl2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekundy od %s do %s";
            };
            pl2.prototype.spaceAnd = function() {
              return " i";
            };
            pl2.prototype.spaceX0OfTheMonth = function() {
              return " %s miesiąca";
            };
            pl2.prototype.lastDay = function() {
              return "ostatni dzień";
            };
            pl2.prototype.third = function() {
              return "trzeci";
            };
            pl2.prototype.weekdayNearestDayX0 = function() {
              return "dzień roboczy najbliższy %s-ego dnia";
            };
            pl2.prototype.commaStartingX0 = function() {
              return ", startowy %s";
            };
            pl2.prototype.daysOfTheWeek = function() {
              return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
            };
            pl2.prototype.monthsOfTheYear = function() {
              return [
                "styczeń",
                "luty",
                "marzec",
                "kwiecień",
                "maj",
                "czerwiec",
                "lipiec",
                "sierpień",
                "wrzesień",
                "październik",
                "listopad",
                "grudzień"
              ];
            };
            return pl2;
          }();
          exports2.pl = pl;
        },
        /* 21 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.pt_BR = void 0;
          var pt_BR = function() {
            function pt_BR2() {
            }
            pt_BR2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            pt_BR2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            pt_BR2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            pt_BR2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            pt_BR2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            pt_BR2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
            };
            pt_BR2.prototype.at = function() {
              return "às";
            };
            pt_BR2.prototype.atSpace = function() {
              return "às ";
            };
            pt_BR2.prototype.atX0 = function() {
              return "Às %s";
            };
            pt_BR2.prototype.atX0MinutesPastTheHour = function() {
              return "aos %s minutos da hora";
            };
            pt_BR2.prototype.atX0SecondsPastTheMinute = function() {
              return "aos %s segundos do minuto";
            };
            pt_BR2.prototype.betweenX0AndX1 = function() {
              return "entre %s e %s";
            };
            pt_BR2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", entre os dias %s e %s do mês";
            };
            pt_BR2.prototype.commaEveryDay = function() {
              return ", a cada dia";
            };
            pt_BR2.prototype.commaEveryX0Days = function() {
              return ", a cada %s dias";
            };
            pt_BR2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", a cada %s dias de semana";
            };
            pt_BR2.prototype.commaEveryX0Months = function() {
              return ", a cada %s meses";
            };
            pt_BR2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", no dia %s do mês";
            };
            pt_BR2.prototype.commaOnlyInX0 = function() {
              return ", somente em %s";
            };
            pt_BR2.prototype.commaOnlyOnX0 = function() {
              return ", somente de %s";
            };
            pt_BR2.prototype.commaAndOnX0 = function() {
              return ", e de %s";
            };
            pt_BR2.prototype.commaOnThe = function() {
              return ", na ";
            };
            pt_BR2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", no último dia do mês";
            };
            pt_BR2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", no último dia da semana do mês";
            };
            pt_BR2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dias antes do último dia do mês";
            };
            pt_BR2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", na última %s do mês";
            };
            pt_BR2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", no %s do mês";
            };
            pt_BR2.prototype.commaX0ThroughX1 = function() {
              return ", de %s a %s";
            };
            pt_BR2.prototype.everyHour = function() {
              return "a cada hora";
            };
            pt_BR2.prototype.everyMinute = function() {
              return "a cada minuto";
            };
            pt_BR2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "a cada minuto entre %s e %s";
            };
            pt_BR2.prototype.everySecond = function() {
              return "a cada segundo";
            };
            pt_BR2.prototype.everyX0Hours = function() {
              return "a cada %s horas";
            };
            pt_BR2.prototype.everyX0Minutes = function() {
              return "a cada %s minutos";
            };
            pt_BR2.prototype.everyX0Seconds = function() {
              return "a cada %s segundos";
            };
            pt_BR2.prototype.fifth = function() {
              return "quinta";
            };
            pt_BR2.prototype.first = function() {
              return "primeira";
            };
            pt_BR2.prototype.firstWeekday = function() {
              return "primeiro dia da semana";
            };
            pt_BR2.prototype.fourth = function() {
              return "quarta";
            };
            pt_BR2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "do minuto %s até %s de cada hora";
            };
            pt_BR2.prototype.second = function() {
              return "segunda";
            };
            pt_BR2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "No segundo %s até %s de cada minuto";
            };
            pt_BR2.prototype.spaceAnd = function() {
              return " e";
            };
            pt_BR2.prototype.spaceX0OfTheMonth = function() {
              return " %s do mês";
            };
            pt_BR2.prototype.lastDay = function() {
              return "o último dia";
            };
            pt_BR2.prototype.third = function() {
              return "terceira";
            };
            pt_BR2.prototype.weekdayNearestDayX0 = function() {
              return "dia da semana mais próximo do dia %s";
            };
            pt_BR2.prototype.commaEveryX0Years = function() {
              return ", a cada %s anos";
            };
            pt_BR2.prototype.commaStartingX0 = function() {
              return ", iniciando %s";
            };
            pt_BR2.prototype.daysOfTheWeek = function() {
              return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
            };
            pt_BR2.prototype.monthsOfTheYear = function() {
              return [
                "janeiro",
                "fevereiro",
                "março",
                "abril",
                "maio",
                "junho",
                "julho",
                "agosto",
                "setembro",
                "outubro",
                "novembro",
                "dezembro"
              ];
            };
            return pt_BR2;
          }();
          exports2.pt_BR = pt_BR;
        },
        /* 22 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ro = void 0;
          var ro = function() {
            function ro2() {
            }
            ro2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            ro2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Eroare la generarea descrierii. Verificați sintaxa.";
            };
            ro2.prototype.at = function() {
              return "La";
            };
            ro2.prototype.atSpace = function() {
              return "La ";
            };
            ro2.prototype.atX0 = function() {
              return "la %s";
            };
            ro2.prototype.atX0MinutesPastTheHour = function() {
              return "la și %s minute";
            };
            ro2.prototype.atX0SecondsPastTheMinute = function() {
              return "la și %s secunde";
            };
            ro2.prototype.betweenX0AndX1 = function() {
              return "între %s și %s";
            };
            ro2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", între zilele %s și %s ale lunii";
            };
            ro2.prototype.commaEveryDay = function() {
              return ", în fiecare zi";
            };
            ro2.prototype.commaEveryX0Days = function() {
              return ", la fiecare %s zile";
            };
            ro2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", la fiecare a %s-a zi a săptămânii";
            };
            ro2.prototype.commaEveryX0Months = function() {
              return ", la fiecare %s luni";
            };
            ro2.prototype.commaEveryX0Years = function() {
              return ", o dată la %s ani";
            };
            ro2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", în ziua %s a lunii";
            };
            ro2.prototype.commaOnlyInX0 = function() {
              return ", doar în %s";
            };
            ro2.prototype.commaOnlyOnX0 = function() {
              return ", doar %s";
            };
            ro2.prototype.commaAndOnX0 = function() {
              return ", și %s";
            };
            ro2.prototype.commaOnThe = function() {
              return ", în ";
            };
            ro2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", în ultima zi a lunii";
            };
            ro2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", în ultima zi lucrătoare a lunii";
            };
            ro2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s zile înainte de ultima zi a lunii";
            };
            ro2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", în ultima %s a lunii";
            };
            ro2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", în %s a lunii";
            };
            ro2.prototype.commaX0ThroughX1 = function() {
              return ", de %s până %s";
            };
            ro2.prototype.everyHour = function() {
              return "în fiecare oră";
            };
            ro2.prototype.everyMinute = function() {
              return "în fiecare minut";
            };
            ro2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "În fiecare minut între %s și %s";
            };
            ro2.prototype.everySecond = function() {
              return "în fiecare secundă";
            };
            ro2.prototype.everyX0Hours = function() {
              return "la fiecare %s ore";
            };
            ro2.prototype.everyX0Minutes = function() {
              return "la fiecare %s minute";
            };
            ro2.prototype.everyX0Seconds = function() {
              return "la fiecare %s secunde";
            };
            ro2.prototype.fifth = function() {
              return "a cincea";
            };
            ro2.prototype.first = function() {
              return "prima";
            };
            ro2.prototype.firstWeekday = function() {
              return "prima zi a săptămânii";
            };
            ro2.prototype.fourth = function() {
              return "a patra";
            };
            ro2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "între minutele %s și %s";
            };
            ro2.prototype.second = function() {
              return "a doua";
            };
            ro2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "între secunda %s și secunda %s";
            };
            ro2.prototype.spaceAnd = function() {
              return " și";
            };
            ro2.prototype.spaceX0OfTheMonth = function() {
              return " %s a lunii";
            };
            ro2.prototype.lastDay = function() {
              return "ultima zi";
            };
            ro2.prototype.third = function() {
              return "a treia";
            };
            ro2.prototype.weekdayNearestDayX0 = function() {
              return "cea mai apropiată zi a săptămânii de ziua %s";
            };
            ro2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return ", din %s până în %s";
            };
            ro2.prototype.commaYearX0ThroughYearX1 = function() {
              return ", din %s până în %s";
            };
            ro2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return "la și %s de minute";
            };
            ro2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return "la și %s de secunde";
            };
            ro2.prototype.commaStartingX0 = function() {
              return ", pornire %s";
            };
            ro2.prototype.daysOfTheWeek = function() {
              return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
            };
            ro2.prototype.monthsOfTheYear = function() {
              return [
                "ianuarie",
                "februarie",
                "martie",
                "aprilie",
                "mai",
                "iunie",
                "iulie",
                "august",
                "septembrie",
                "octombrie",
                "noiembrie",
                "decembrie"
              ];
            };
            return ro2;
          }();
          exports2.ro = ro;
        },
        /* 23 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ru = void 0;
          var ru = function() {
            function ru2() {
            }
            ru2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            ru2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            ru2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            ru2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            ru2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            ru2.prototype.everyMinute = function() {
              return "каждую минуту";
            };
            ru2.prototype.everyHour = function() {
              return "каждый час";
            };
            ru2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
            };
            ru2.prototype.atSpace = function() {
              return "В ";
            };
            ru2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Каждую минуту с %s по %s";
            };
            ru2.prototype.at = function() {
              return "В";
            };
            ru2.prototype.spaceAnd = function() {
              return " и";
            };
            ru2.prototype.everySecond = function() {
              return "каждую секунду";
            };
            ru2.prototype.everyX0Seconds = function() {
              return "каждые %s секунд";
            };
            ru2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "секунды с %s по %s";
            };
            ru2.prototype.atX0SecondsPastTheMinute = function() {
              return "в %s секунд";
            };
            ru2.prototype.everyX0Minutes = function() {
              return "каждые %s минут";
            };
            ru2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "минуты с %s по %s";
            };
            ru2.prototype.atX0MinutesPastTheHour = function() {
              return "в %s минут";
            };
            ru2.prototype.everyX0Hours = function() {
              return "каждые %s часов";
            };
            ru2.prototype.betweenX0AndX1 = function() {
              return "с %s по %s";
            };
            ru2.prototype.atX0 = function() {
              return "в %s";
            };
            ru2.prototype.commaEveryDay = function() {
              return ", каждый день";
            };
            ru2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", каждые %s дней недели";
            };
            ru2.prototype.commaX0ThroughX1 = function() {
              return ", %s по %s";
            };
            ru2.prototype.first = function() {
              return "первый";
            };
            ru2.prototype.second = function() {
              return "второй";
            };
            ru2.prototype.third = function() {
              return "третий";
            };
            ru2.prototype.fourth = function() {
              return "четвертый";
            };
            ru2.prototype.fifth = function() {
              return "пятый";
            };
            ru2.prototype.commaOnThe = function() {
              return ", в ";
            };
            ru2.prototype.spaceX0OfTheMonth = function() {
              return " %s месяца";
            };
            ru2.prototype.lastDay = function() {
              return "последний день";
            };
            ru2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", в последний %s месяца";
            };
            ru2.prototype.commaOnlyOnX0 = function() {
              return ", только в %s";
            };
            ru2.prototype.commaAndOnX0 = function() {
              return ", и в %s";
            };
            ru2.prototype.commaEveryX0Months = function() {
              return ", каждые %s месяцев";
            };
            ru2.prototype.commaOnlyInX0 = function() {
              return ", только в %s";
            };
            ru2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", в последний день месяца";
            };
            ru2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", в последний будний день месяца";
            };
            ru2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s дней до последнего дня месяца";
            };
            ru2.prototype.firstWeekday = function() {
              return "первый будний день";
            };
            ru2.prototype.weekdayNearestDayX0 = function() {
              return "ближайший будний день к %s";
            };
            ru2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", в %s месяца";
            };
            ru2.prototype.commaEveryX0Days = function() {
              return ", каждые %s дней";
            };
            ru2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", с %s по %s число месяца";
            };
            ru2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", в %s число месяца";
            };
            ru2.prototype.commaEveryX0Years = function() {
              return ", каждые %s лет";
            };
            ru2.prototype.commaStartingX0 = function() {
              return ", начало %s";
            };
            ru2.prototype.daysOfTheWeek = function() {
              return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
            };
            ru2.prototype.monthsOfTheYear = function() {
              return [
                "январь",
                "февраль",
                "март",
                "апрель",
                "май",
                "июнь",
                "июль",
                "август",
                "сентябрь",
                "октябрь",
                "ноябрь",
                "декабрь"
              ];
            };
            return ru2;
          }();
          exports2.ru = ru;
        },
        /* 24 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.tr = void 0;
          var tr = function() {
            function tr2() {
            }
            tr2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            tr2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            tr2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            tr2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            tr2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            tr2.prototype.everyMinute = function() {
              return "her dakika";
            };
            tr2.prototype.everyHour = function() {
              return "her saat";
            };
            tr2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
            };
            tr2.prototype.atSpace = function() {
              return "Saat ";
            };
            tr2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Saat %s ve %s arasındaki her dakika";
            };
            tr2.prototype.at = function() {
              return "Saat";
            };
            tr2.prototype.spaceAnd = function() {
              return " ve";
            };
            tr2.prototype.everySecond = function() {
              return "her saniye";
            };
            tr2.prototype.everyX0Seconds = function() {
              return "her %s saniyede bir";
            };
            tr2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "dakikaların %s. ve %s. saniyeleri arası";
            };
            tr2.prototype.atX0SecondsPastTheMinute = function() {
              return "dakikaların %s. saniyesinde";
            };
            tr2.prototype.everyX0Minutes = function() {
              return "her %s dakikada bir";
            };
            tr2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "saatlerin %s. ve %s. dakikaları arası";
            };
            tr2.prototype.atX0MinutesPastTheHour = function() {
              return "saatlerin %s. dakikasında";
            };
            tr2.prototype.everyX0Hours = function() {
              return "her %s saatte";
            };
            tr2.prototype.betweenX0AndX1 = function() {
              return "%s ile %s arasında";
            };
            tr2.prototype.atX0 = function() {
              return "saat %s";
            };
            tr2.prototype.commaEveryDay = function() {
              return ", her gün";
            };
            tr2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", ayın her %s günü";
            };
            tr2.prototype.commaX0ThroughX1 = function() {
              return ", %s ile %s arasında";
            };
            tr2.prototype.first = function() {
              return "ilk";
            };
            tr2.prototype.second = function() {
              return "ikinci";
            };
            tr2.prototype.third = function() {
              return "üçüncü";
            };
            tr2.prototype.fourth = function() {
              return "dördüncü";
            };
            tr2.prototype.fifth = function() {
              return "beşinci";
            };
            tr2.prototype.commaOnThe = function() {
              return ", ayın ";
            };
            tr2.prototype.spaceX0OfTheMonth = function() {
              return " %s günü";
            };
            tr2.prototype.lastDay = function() {
              return "son gün";
            };
            tr2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", ayın son %s günü";
            };
            tr2.prototype.commaOnlyOnX0 = function() {
              return ", sadece %s günü";
            };
            tr2.prototype.commaAndOnX0 = function() {
              return ", ve %s";
            };
            tr2.prototype.commaEveryX0Months = function() {
              return ", %s ayda bir";
            };
            tr2.prototype.commaOnlyInX0 = function() {
              return ", sadece %s için";
            };
            tr2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", ayın son günü";
            };
            tr2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", ayın son iş günü";
            };
            tr2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s ayın son gününden önceki günler";
            };
            tr2.prototype.firstWeekday = function() {
              return "ilk iş günü";
            };
            tr2.prototype.weekdayNearestDayX0 = function() {
              return "%s. günü sonrasındaki ilk iş günü";
            };
            tr2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", ayın %s";
            };
            tr2.prototype.commaEveryX0Days = function() {
              return ", %s günde bir";
            };
            tr2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", ayın %s. ve %s. günleri arası";
            };
            tr2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", ayın %s. günü";
            };
            tr2.prototype.commaEveryX0Years = function() {
              return ", %s yılda bir";
            };
            tr2.prototype.commaStartingX0 = function() {
              return ", başlangıç %s";
            };
            tr2.prototype.daysOfTheWeek = function() {
              return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
            };
            tr2.prototype.monthsOfTheYear = function() {
              return [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık"
              ];
            };
            return tr2;
          }();
          exports2.tr = tr;
        },
        /* 25 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.uk = void 0;
          var uk = function() {
            function uk2() {
            }
            uk2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            uk2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            uk2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            uk2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            uk2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            uk2.prototype.everyMinute = function() {
              return "щохвилини";
            };
            uk2.prototype.everyHour = function() {
              return "щогодини";
            };
            uk2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
            };
            uk2.prototype.atSpace = function() {
              return "О ";
            };
            uk2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Щохвилини між %s та %s";
            };
            uk2.prototype.at = function() {
              return "О";
            };
            uk2.prototype.spaceAnd = function() {
              return " та";
            };
            uk2.prototype.everySecond = function() {
              return "Щосекунди";
            };
            uk2.prototype.everyX0Seconds = function() {
              return "кожні %s секунд";
            };
            uk2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "з %s по %s секунду";
            };
            uk2.prototype.atX0SecondsPastTheMinute = function() {
              return "о %s секунді";
            };
            uk2.prototype.everyX0Minutes = function() {
              return "кожні %s хвилин";
            };
            uk2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "з %s по %s хвилину";
            };
            uk2.prototype.atX0MinutesPastTheHour = function() {
              return "о %s хвилині";
            };
            uk2.prototype.everyX0Hours = function() {
              return "кожні %s годин";
            };
            uk2.prototype.betweenX0AndX1 = function() {
              return "між %s та %s";
            };
            uk2.prototype.atX0 = function() {
              return "о %s";
            };
            uk2.prototype.commaEveryDay = function() {
              return ", щоденно";
            };
            uk2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", кожен %s день тижня";
            };
            uk2.prototype.commaX0ThroughX1 = function() {
              return ", %s по %s";
            };
            uk2.prototype.first = function() {
              return "перший";
            };
            uk2.prototype.second = function() {
              return "другий";
            };
            uk2.prototype.third = function() {
              return "третій";
            };
            uk2.prototype.fourth = function() {
              return "четвертий";
            };
            uk2.prototype.fifth = function() {
              return "п'ятий";
            };
            uk2.prototype.commaOnThe = function() {
              return ", в ";
            };
            uk2.prototype.spaceX0OfTheMonth = function() {
              return " %s місяця";
            };
            uk2.prototype.lastDay = function() {
              return "останній день";
            };
            uk2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", в останній %s місяця";
            };
            uk2.prototype.commaOnlyOnX0 = function() {
              return ", тільки в %s";
            };
            uk2.prototype.commaAndOnX0 = function() {
              return ", і в %s";
            };
            uk2.prototype.commaEveryX0Months = function() {
              return ", кожен %s місяць";
            };
            uk2.prototype.commaOnlyInX0 = function() {
              return ", тільки в %s";
            };
            uk2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", в останній день місяця";
            };
            uk2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", в останній будень місяця";
            };
            uk2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s днів до останнього дня місяця";
            };
            uk2.prototype.firstWeekday = function() {
              return "перший будень";
            };
            uk2.prototype.weekdayNearestDayX0 = function() {
              return "будень найближчий до %s дня";
            };
            uk2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", в %s місяця";
            };
            uk2.prototype.commaEveryX0Days = function() {
              return ", кожен %s день";
            };
            uk2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", між %s та %s днями місяця";
            };
            uk2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", на %s день місяця";
            };
            uk2.prototype.commaEveryX0Years = function() {
              return ", кожні %s роки";
            };
            uk2.prototype.commaStartingX0 = function() {
              return ", початок %s";
            };
            uk2.prototype.daysOfTheWeek = function() {
              return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
            };
            uk2.prototype.monthsOfTheYear = function() {
              return [
                "січень",
                "лютий",
                "березень",
                "квітень",
                "травень",
                "червень",
                "липень",
                "серпень",
                "вересень",
                "жовтень",
                "листопад",
                "грудень"
              ];
            };
            return uk2;
          }();
          exports2.uk = uk;
        },
        /* 26 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.zh_CN = void 0;
          var zh_CN = function() {
            function zh_CN2() {
            }
            zh_CN2.prototype.setPeriodBeforeTime = function() {
              return true;
            };
            zh_CN2.prototype.pm = function() {
              return "下午";
            };
            zh_CN2.prototype.am = function() {
              return "上午";
            };
            zh_CN2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            zh_CN2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            zh_CN2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            zh_CN2.prototype.commaYearX0ThroughYearX1 = function() {
              return ", 从%s年至%s年";
            };
            zh_CN2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            zh_CN2.prototype.everyMinute = function() {
              return "每分钟";
            };
            zh_CN2.prototype.everyHour = function() {
              return "每小时";
            };
            zh_CN2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "生成表达式描述时发生了错误，请检查cron表达式语法。";
            };
            zh_CN2.prototype.atSpace = function() {
              return "在";
            };
            zh_CN2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "在 %s 至 %s 之间的每分钟";
            };
            zh_CN2.prototype.at = function() {
              return "在";
            };
            zh_CN2.prototype.spaceAnd = function() {
              return " 和";
            };
            zh_CN2.prototype.everySecond = function() {
              return "每秒";
            };
            zh_CN2.prototype.everyX0Seconds = function() {
              return "每隔 %s 秒";
            };
            zh_CN2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "在每分钟的第 %s 到 %s 秒";
            };
            zh_CN2.prototype.atX0SecondsPastTheMinute = function() {
              return "在每分钟的第 %s 秒";
            };
            zh_CN2.prototype.everyX0Minutes = function() {
              return "每隔 %s 分钟";
            };
            zh_CN2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "在每小时的第 %s 到 %s 分钟";
            };
            zh_CN2.prototype.atX0MinutesPastTheHour = function() {
              return "在每小时的第 %s 分钟";
            };
            zh_CN2.prototype.everyX0Hours = function() {
              return "每隔 %s 小时";
            };
            zh_CN2.prototype.betweenX0AndX1 = function() {
              return "在 %s 和 %s 之间";
            };
            zh_CN2.prototype.atX0 = function() {
              return "在%s";
            };
            zh_CN2.prototype.commaEveryDay = function() {
              return ", 每天";
            };
            zh_CN2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", 每周的每 %s 天";
            };
            zh_CN2.prototype.commaX0ThroughX1 = function() {
              return ", %s至%s";
            };
            zh_CN2.prototype.first = function() {
              return "第一个";
            };
            zh_CN2.prototype.second = function() {
              return "第二个";
            };
            zh_CN2.prototype.third = function() {
              return "第三个";
            };
            zh_CN2.prototype.fourth = function() {
              return "第四个";
            };
            zh_CN2.prototype.fifth = function() {
              return "第五个";
            };
            zh_CN2.prototype.commaOnThe = function() {
              return ", 限每月的";
            };
            zh_CN2.prototype.spaceX0OfTheMonth = function() {
              return "%s";
            };
            zh_CN2.prototype.lastDay = function() {
              return "本月最后一天";
            };
            zh_CN2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", 限每月的最后一个%s";
            };
            zh_CN2.prototype.commaOnlyOnX0 = function() {
              return ", 仅%s";
            };
            zh_CN2.prototype.commaAndOnX0 = function() {
              return ", 并且为%s";
            };
            zh_CN2.prototype.commaEveryX0Months = function() {
              return ", 每隔 %s 个月";
            };
            zh_CN2.prototype.commaOnlyInX0 = function() {
              return ", 仅限%s";
            };
            zh_CN2.prototype.commaOnlyInMonthX0 = function() {
              return ", 仅于%s份";
            };
            zh_CN2.prototype.commaOnlyInYearX0 = function() {
              return ", 仅于 %s 年";
            };
            zh_CN2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", 限每月的最后一天";
            };
            zh_CN2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", 限每月的最后一个工作日";
            };
            zh_CN2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", 限每月最后%s天";
            };
            zh_CN2.prototype.firstWeekday = function() {
              return "第一个工作日";
            };
            zh_CN2.prototype.weekdayNearestDayX0 = function() {
              return "最接近 %s 号的工作日";
            };
            zh_CN2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", 限每月的%s";
            };
            zh_CN2.prototype.commaEveryX0Days = function() {
              return ", 每隔 %s 天";
            };
            zh_CN2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", 限每月的 %s 至 %s 之间";
            };
            zh_CN2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", 限每月%s";
            };
            zh_CN2.prototype.commaEveryX0Years = function() {
              return ", 每隔 %s 年";
            };
            zh_CN2.prototype.commaStartingX0 = function() {
              return ", %s开始";
            };
            zh_CN2.prototype.dayX0 = function() {
              return " %s 号";
            };
            zh_CN2.prototype.daysOfTheWeek = function() {
              return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            };
            zh_CN2.prototype.monthsOfTheYear = function() {
              return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            };
            return zh_CN2;
          }();
          exports2.zh_CN = zh_CN;
        },
        /* 27 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.zh_TW = void 0;
          var zh_TW = function() {
            function zh_TW2() {
            }
            zh_TW2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            zh_TW2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            zh_TW2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            zh_TW2.prototype.commaYearX0ThroughYearX1 = function() {
              return ", 从%s年至%s年";
            };
            zh_TW2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            zh_TW2.prototype.everyMinute = function() {
              return "每分鐘";
            };
            zh_TW2.prototype.everyHour = function() {
              return "每小時";
            };
            zh_TW2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "產生正規表達式描述時發生了錯誤，請檢查 cron 表達式語法。";
            };
            zh_TW2.prototype.atSpace = function() {
              return "在 ";
            };
            zh_TW2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "在 %s 和 %s 之間的每分鐘";
            };
            zh_TW2.prototype.at = function() {
              return "在";
            };
            zh_TW2.prototype.spaceAnd = function() {
              return " 和";
            };
            zh_TW2.prototype.everySecond = function() {
              return "每秒";
            };
            zh_TW2.prototype.everyX0Seconds = function() {
              return "每 %s 秒";
            };
            zh_TW2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "在每分鐘的 %s 到 %s 秒";
            };
            zh_TW2.prototype.atX0SecondsPastTheMinute = function() {
              return "在每分鐘的 %s 秒";
            };
            zh_TW2.prototype.everyX0Minutes = function() {
              return "每 %s 分鐘";
            };
            zh_TW2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "在每小時的 %s 到 %s 分鐘";
            };
            zh_TW2.prototype.atX0MinutesPastTheHour = function() {
              return "在每小時的 %s 分";
            };
            zh_TW2.prototype.everyX0Hours = function() {
              return "每 %s 小時";
            };
            zh_TW2.prototype.betweenX0AndX1 = function() {
              return "在 %s 和 %s 之間";
            };
            zh_TW2.prototype.atX0 = function() {
              return "在 %s";
            };
            zh_TW2.prototype.commaEveryDay = function() {
              return ", 每天";
            };
            zh_TW2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", 每週的每 %s 天";
            };
            zh_TW2.prototype.commaX0ThroughX1 = function() {
              return ", %s 到 %s";
            };
            zh_TW2.prototype.first = function() {
              return "第一個";
            };
            zh_TW2.prototype.second = function() {
              return "第二個";
            };
            zh_TW2.prototype.third = function() {
              return "第三個";
            };
            zh_TW2.prototype.fourth = function() {
              return "第四個";
            };
            zh_TW2.prototype.fifth = function() {
              return "第五個";
            };
            zh_TW2.prototype.commaOnThe = function() {
              return ", 在每月 ";
            };
            zh_TW2.prototype.spaceX0OfTheMonth = function() {
              return "%s ";
            };
            zh_TW2.prototype.lastDay = function() {
              return "最後一天";
            };
            zh_TW2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", 每月的最後一個 %s ";
            };
            zh_TW2.prototype.commaOnlyOnX0 = function() {
              return ", 僅在 %s";
            };
            zh_TW2.prototype.commaAndOnX0 = function() {
              return ", 和 %s";
            };
            zh_TW2.prototype.commaEveryX0Months = function() {
              return ", 每 %s 月";
            };
            zh_TW2.prototype.commaOnlyInX0 = function() {
              return ", 僅在 %s";
            };
            zh_TW2.prototype.commaOnlyInMonthX0 = function() {
              return ", 僅在%s";
            };
            zh_TW2.prototype.commaOnlyInYearX0 = function() {
              return ", 僅在 %s 年";
            };
            zh_TW2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", 每月的最後一天";
            };
            zh_TW2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", 每月的最後一個工作日";
            };
            zh_TW2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s 這個月的最後一天的前幾天";
            };
            zh_TW2.prototype.firstWeekday = function() {
              return "第一個工作日";
            };
            zh_TW2.prototype.weekdayNearestDayX0 = function() {
              return "最接近 %s 號的工作日";
            };
            zh_TW2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", 每月的 %s ";
            };
            zh_TW2.prototype.commaEveryX0Days = function() {
              return ", 每 %s 天";
            };
            zh_TW2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", 在每月的 %s 和 %s 之間";
            };
            zh_TW2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", 每月的 %s";
            };
            zh_TW2.prototype.commaEveryX0Years = function() {
              return ", 每 %s 年";
            };
            zh_TW2.prototype.commaStartingX0 = function() {
              return ", %s 開始";
            };
            zh_TW2.prototype.dayX0 = function() {
              return " %s 號";
            };
            zh_TW2.prototype.daysOfTheWeek = function() {
              return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            };
            zh_TW2.prototype.monthsOfTheYear = function() {
              return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            };
            return zh_TW2;
          }();
          exports2.zh_TW = zh_TW;
        },
        /* 28 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ja = void 0;
          var ja = function() {
            function ja2() {
            }
            ja2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            ja2.prototype.everyMinute = function() {
              return "毎分";
            };
            ja2.prototype.everyHour = function() {
              return "毎時";
            };
            ja2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "式の記述を生成する際にエラーが発生しました。Cron 式の構文を確認してください。";
            };
            ja2.prototype.atSpace = function() {
              return "次において実施";
            };
            ja2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "%s から %s まで毎分";
            };
            ja2.prototype.at = function() {
              return "次において実施";
            };
            ja2.prototype.spaceAnd = function() {
              return "と";
            };
            ja2.prototype.everySecond = function() {
              return "毎秒";
            };
            ja2.prototype.everyX0Seconds = function() {
              return "%s 秒ごと";
            };
            ja2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "毎分 %s 秒から %s 秒まで";
            };
            ja2.prototype.atX0SecondsPastTheMinute = function() {
              return "毎分 %s 秒過ぎ";
            };
            ja2.prototype.everyX0Minutes = function() {
              return "%s 分ごと";
            };
            ja2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "毎時 %s 分から %s 分まで";
            };
            ja2.prototype.atX0MinutesPastTheHour = function() {
              return "毎時 %s 分過ぎ";
            };
            ja2.prototype.everyX0Hours = function() {
              return "%s 時間ごと";
            };
            ja2.prototype.betweenX0AndX1 = function() {
              return "%s と %s の間";
            };
            ja2.prototype.atX0 = function() {
              return "次において実施 %s";
            };
            ja2.prototype.commaEveryDay = function() {
              return "、毎日";
            };
            ja2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return "、週のうち %s 日ごと";
            };
            ja2.prototype.commaX0ThroughX1 = function() {
              return "、%s から %s まで";
            };
            ja2.prototype.first = function() {
              return "1 番目";
            };
            ja2.prototype.second = function() {
              return "2 番目";
            };
            ja2.prototype.third = function() {
              return "3 番目";
            };
            ja2.prototype.fourth = function() {
              return "4 番目";
            };
            ja2.prototype.fifth = function() {
              return "5 番目";
            };
            ja2.prototype.commaOnThe = function() {
              return "次に";
            };
            ja2.prototype.spaceX0OfTheMonth = function() {
              return "月のうち %s";
            };
            ja2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return "月の最後の %s に";
            };
            ja2.prototype.commaOnlyOnX0 = function() {
              return "%s にのみ";
            };
            ja2.prototype.commaEveryX0Months = function() {
              return "、%s か月ごと";
            };
            ja2.prototype.commaOnlyInX0 = function() {
              return "%s でのみ";
            };
            ja2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return "次の最終日に";
            };
            ja2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return "月の最後の平日に";
            };
            ja2.prototype.firstWeekday = function() {
              return "最初の平日";
            };
            ja2.prototype.weekdayNearestDayX0 = function() {
              return "%s 日の直近の平日";
            };
            ja2.prototype.commaOnTheX0OfTheMonth = function() {
              return "月の %s に";
            };
            ja2.prototype.commaEveryX0Days = function() {
              return "、%s 日ごと";
            };
            ja2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return "、月の %s 日から %s 日の間";
            };
            ja2.prototype.commaOnDayX0OfTheMonth = function() {
              return "、月の %s 日目";
            };
            ja2.prototype.spaceAndSpace = function() {
              return "と";
            };
            ja2.prototype.commaEveryMinute = function() {
              return "、毎分";
            };
            ja2.prototype.commaEveryHour = function() {
              return "、毎時";
            };
            ja2.prototype.commaEveryX0Years = function() {
              return "、%s 年ごと";
            };
            ja2.prototype.commaStartingX0 = function() {
              return "、%s に開始";
            };
            ja2.prototype.aMPeriod = function() {
              return "AM";
            };
            ja2.prototype.pMPeriod = function() {
              return "PM";
            };
            ja2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return "月の最終日の %s 日前";
            };
            ja2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            ja2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            ja2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            ja2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            ja2.prototype.lastDay = function() {
              return "最終日";
            };
            ja2.prototype.commaAndOnX0 = function() {
              return "、〜と %s";
            };
            ja2.prototype.daysOfTheWeek = function() {
              return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
            };
            ja2.prototype.monthsOfTheYear = function() {
              return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            };
            return ja2;
          }();
          exports2.ja = ja;
        },
        /* 29 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.he = void 0;
          var he = function() {
            function he2() {
            }
            he2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            he2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            he2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            he2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            he2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            he2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "אירעה שגיאה בעת יצירת תיאור הביטוי. בדוק את תחביר הביטוי cron.";
            };
            he2.prototype.everyMinute = function() {
              return "כל דקה";
            };
            he2.prototype.everyHour = function() {
              return "כל שעה";
            };
            he2.prototype.atSpace = function() {
              return "ב ";
            };
            he2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "כל דקה %s עד %s";
            };
            he2.prototype.at = function() {
              return "ב";
            };
            he2.prototype.spaceAnd = function() {
              return " ו";
            };
            he2.prototype.everySecond = function() {
              return "כל שניה";
            };
            he2.prototype.everyX0Seconds = function() {
              return "כל %s שניות";
            };
            he2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "%s עד %s שניות של הדקה";
            };
            he2.prototype.atX0SecondsPastTheMinute = function() {
              return "ב %s שניות של הדקה";
            };
            he2.prototype.everyX0Minutes = function() {
              return "כל %s דקות";
            };
            he2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "%s עד %s דקות של השעה";
            };
            he2.prototype.atX0MinutesPastTheHour = function() {
              return "ב %s דקות של השעה";
            };
            he2.prototype.everyX0Hours = function() {
              return "כל %s שעות";
            };
            he2.prototype.betweenX0AndX1 = function() {
              return "%s עד %s";
            };
            he2.prototype.atX0 = function() {
              return "ב %s";
            };
            he2.prototype.commaEveryDay = function() {
              return ", כל יום";
            };
            he2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", כל %s ימים בשבוע";
            };
            he2.prototype.commaX0ThroughX1 = function() {
              return ", %s עד %s";
            };
            he2.prototype.first = function() {
              return "ראשון";
            };
            he2.prototype.second = function() {
              return "שני";
            };
            he2.prototype.third = function() {
              return "שלישי";
            };
            he2.prototype.fourth = function() {
              return "רביעי";
            };
            he2.prototype.fifth = function() {
              return "חמישי";
            };
            he2.prototype.commaOnThe = function() {
              return ", ב ";
            };
            he2.prototype.spaceX0OfTheMonth = function() {
              return " %s של החודש";
            };
            he2.prototype.lastDay = function() {
              return "היום האחרון";
            };
            he2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", רק ב %s של החודש";
            };
            he2.prototype.commaOnlyOnX0 = function() {
              return ", רק ב %s";
            };
            he2.prototype.commaAndOnX0 = function() {
              return ", וב %s";
            };
            he2.prototype.commaEveryX0Months = function() {
              return ", כל %s חודשים";
            };
            he2.prototype.commaOnlyInX0 = function() {
              return ", רק ב %s";
            };
            he2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", ביום האחרון של החודש";
            };
            he2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", ביום החול האחרון של החודש";
            };
            he2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s ימים לפני היום האחרון בחודש";
            };
            he2.prototype.firstWeekday = function() {
              return "יום החול הראשון";
            };
            he2.prototype.weekdayNearestDayX0 = function() {
              return "יום החול הראשון הקרוב אל %s";
            };
            he2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", ביום ה%s של החודש";
            };
            he2.prototype.commaEveryX0Days = function() {
              return ", כל %s ימים";
            };
            he2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", בין היום ה%s וה%s של החודש";
            };
            he2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", ביום ה%s של החודש";
            };
            he2.prototype.commaEveryX0Years = function() {
              return ", כל %s שנים";
            };
            he2.prototype.commaStartingX0 = function() {
              return ", החל מ %s";
            };
            he2.prototype.daysOfTheWeek = function() {
              return ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
            };
            he2.prototype.monthsOfTheYear = function() {
              return ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
            };
            return he2;
          }();
          exports2.he = he;
        },
        /* 30 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.cs = void 0;
          var cs = function() {
            function cs2() {
            }
            cs2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            cs2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            cs2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            cs2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            cs2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            cs2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Při vytváření popisu došlo k chybě. Zkontrolujte prosím správnost syntaxe cronu.";
            };
            cs2.prototype.everyMinute = function() {
              return "každou minutu";
            };
            cs2.prototype.everyHour = function() {
              return "každou hodinu";
            };
            cs2.prototype.atSpace = function() {
              return "V ";
            };
            cs2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Každou minutu mezi %s a %s";
            };
            cs2.prototype.at = function() {
              return "V";
            };
            cs2.prototype.spaceAnd = function() {
              return " a";
            };
            cs2.prototype.everySecond = function() {
              return "každou sekundu";
            };
            cs2.prototype.everyX0Seconds = function() {
              return "každých %s sekund";
            };
            cs2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekundy od %s do %s";
            };
            cs2.prototype.atX0SecondsPastTheMinute = function() {
              return "v %s sekund";
            };
            cs2.prototype.everyX0Minutes = function() {
              return "každých %s minut";
            };
            cs2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minuty od %s do %s";
            };
            cs2.prototype.atX0MinutesPastTheHour = function() {
              return "v %s minut";
            };
            cs2.prototype.everyX0Hours = function() {
              return "každých %s hodin";
            };
            cs2.prototype.betweenX0AndX1 = function() {
              return "mezi %s a %s";
            };
            cs2.prototype.atX0 = function() {
              return "v %s";
            };
            cs2.prototype.commaEveryDay = function() {
              return ", každý den";
            };
            cs2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", každých %s dní v týdnu";
            };
            cs2.prototype.commaX0ThroughX1 = function() {
              return ", od %s do %s";
            };
            cs2.prototype.first = function() {
              return "první";
            };
            cs2.prototype.second = function() {
              return "druhý";
            };
            cs2.prototype.third = function() {
              return "třetí";
            };
            cs2.prototype.fourth = function() {
              return "čtvrtý";
            };
            cs2.prototype.fifth = function() {
              return "pátý";
            };
            cs2.prototype.commaOnThe = function() {
              return ", ";
            };
            cs2.prototype.spaceX0OfTheMonth = function() {
              return " %s v měsíci";
            };
            cs2.prototype.lastDay = function() {
              return "poslední den";
            };
            cs2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", poslední %s v měsíci";
            };
            cs2.prototype.commaOnlyOnX0 = function() {
              return ", pouze v %s";
            };
            cs2.prototype.commaAndOnX0 = function() {
              return ", a v %s";
            };
            cs2.prototype.commaEveryX0Months = function() {
              return ", každých %s měsíců";
            };
            cs2.prototype.commaOnlyInX0 = function() {
              return ", pouze v %s";
            };
            cs2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", poslední den v měsíci";
            };
            cs2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", poslední pracovní den v měsíci";
            };
            cs2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dní před posledním dnem v měsíci";
            };
            cs2.prototype.firstWeekday = function() {
              return "první pracovní den";
            };
            cs2.prototype.weekdayNearestDayX0 = function() {
              return "pracovní den nejblíže %s. dni";
            };
            cs2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", v %s v měsíci";
            };
            cs2.prototype.commaEveryX0Days = function() {
              return ", každých %s dnů";
            };
            cs2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", mezi dny %s a %s v měsíci";
            };
            cs2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", %s. den v měsíci";
            };
            cs2.prototype.commaEveryX0Years = function() {
              return ", každých %s roků";
            };
            cs2.prototype.commaStartingX0 = function() {
              return ", začínající %s";
            };
            cs2.prototype.daysOfTheWeek = function() {
              return ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
            };
            cs2.prototype.monthsOfTheYear = function() {
              return [
                "Leden",
                "Únor",
                "Březen",
                "Duben",
                "Květen",
                "Červen",
                "Červenec",
                "Srpen",
                "Září",
                "Říjen",
                "Listopad",
                "Prosinec"
              ];
            };
            return cs2;
          }();
          exports2.cs = cs;
        },
        /* 31 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.sk = void 0;
          var sk = function() {
            function sk2() {
            }
            sk2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            sk2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            sk2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            sk2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            sk2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            sk2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Pri vytváraní popisu došlo k chybe. Skontrolujte prosím správnosť syntaxe cronu.";
            };
            sk2.prototype.everyMinute = function() {
              return "každú minútu";
            };
            sk2.prototype.everyHour = function() {
              return "každú hodinu";
            };
            sk2.prototype.atSpace = function() {
              return "V ";
            };
            sk2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Každú minútu medzi %s a %s";
            };
            sk2.prototype.at = function() {
              return "V";
            };
            sk2.prototype.spaceAnd = function() {
              return " a";
            };
            sk2.prototype.everySecond = function() {
              return "každú sekundu";
            };
            sk2.prototype.everyX0Seconds = function() {
              return "každých %s sekúnd";
            };
            sk2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekundy od %s do %s";
            };
            sk2.prototype.atX0SecondsPastTheMinute = function() {
              return "v %s sekúnd";
            };
            sk2.prototype.everyX0Minutes = function() {
              return "každých %s minút";
            };
            sk2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minúty od %s do %s";
            };
            sk2.prototype.atX0MinutesPastTheHour = function() {
              return "v %s minút";
            };
            sk2.prototype.everyX0Hours = function() {
              return "každých %s hodín";
            };
            sk2.prototype.betweenX0AndX1 = function() {
              return "medzi %s a %s";
            };
            sk2.prototype.atX0 = function() {
              return "v %s";
            };
            sk2.prototype.commaEveryDay = function() {
              return ", každý deň";
            };
            sk2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", každých %s dní v týždni";
            };
            sk2.prototype.commaX0ThroughX1 = function() {
              return ", od %s do %s";
            };
            sk2.prototype.first = function() {
              return "prvý";
            };
            sk2.prototype.second = function() {
              return "druhý";
            };
            sk2.prototype.third = function() {
              return "tretí";
            };
            sk2.prototype.fourth = function() {
              return "štvrtý";
            };
            sk2.prototype.fifth = function() {
              return "piaty";
            };
            sk2.prototype.commaOnThe = function() {
              return ", ";
            };
            sk2.prototype.spaceX0OfTheMonth = function() {
              return " %s v mesiaci";
            };
            sk2.prototype.lastDay = function() {
              return "posledný deň";
            };
            sk2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", posledný %s v mesiaci";
            };
            sk2.prototype.commaOnlyOnX0 = function() {
              return ", iba v %s";
            };
            sk2.prototype.commaAndOnX0 = function() {
              return ", a v %s";
            };
            sk2.prototype.commaEveryX0Months = function() {
              return ", každých %s mesiacov";
            };
            sk2.prototype.commaOnlyInX0 = function() {
              return ", iba v %s";
            };
            sk2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", posledný deň v mesiaci";
            };
            sk2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", posledný pracovný deň v mesiaci";
            };
            sk2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dní pred posledným dňom v mesiaci";
            };
            sk2.prototype.firstWeekday = function() {
              return "prvý pracovný deň";
            };
            sk2.prototype.weekdayNearestDayX0 = function() {
              return "pracovný deň najbližšie %s. dňu";
            };
            sk2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", v %s v mesiaci";
            };
            sk2.prototype.commaEveryX0Days = function() {
              return ", každých %s dní";
            };
            sk2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", medzi dňami %s a %s v mesiaci";
            };
            sk2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", %s. deň v mesiaci";
            };
            sk2.prototype.commaEveryX0Years = function() {
              return ", každých %s rokov";
            };
            sk2.prototype.commaStartingX0 = function() {
              return ", začínajúcich %s";
            };
            sk2.prototype.daysOfTheWeek = function() {
              return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
            };
            sk2.prototype.monthsOfTheYear = function() {
              return [
                "Január",
                "Február",
                "Marec",
                "Apríl",
                "Máj",
                "Jún",
                "Júl",
                "August",
                "September",
                "Október",
                "November",
                "December"
              ];
            };
            return sk2;
          }();
          exports2.sk = sk;
        },
        /* 32 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.fi = void 0;
          var fi = function() {
            function fi2() {
            }
            fi2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            fi2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
            };
            fi2.prototype.at = function() {
              return "Klo";
            };
            fi2.prototype.atSpace = function() {
              return "Klo ";
            };
            fi2.prototype.atX0 = function() {
              return "klo %s";
            };
            fi2.prototype.atX0MinutesPastTheHour = function() {
              return "%s minuuttia yli";
            };
            fi2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return "%s minuuttia yli";
            };
            fi2.prototype.atX0SecondsPastTheMinute = function() {
              return "%s sekunnnin jälkeen";
            };
            fi2.prototype.betweenX0AndX1 = function() {
              return "%s - %s välillä";
            };
            fi2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", kuukauden päivien %s ja %s välillä";
            };
            fi2.prototype.commaEveryDay = function() {
              return ", joka päivä";
            };
            fi2.prototype.commaEveryHour = function() {
              return ", joka tunti";
            };
            fi2.prototype.commaEveryMinute = function() {
              return ", joka minuutti";
            };
            fi2.prototype.commaEveryX0Days = function() {
              return ", joka %s. päivä";
            };
            fi2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", joka %s. viikonpäivä";
            };
            fi2.prototype.commaEveryX0Months = function() {
              return ", joka %s. kuukausi";
            };
            fi2.prototype.commaEveryX0Years = function() {
              return ", joka %s. vuosi";
            };
            fi2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", kuukauden %s päivä";
            };
            fi2.prototype.commaOnlyInX0 = function() {
              return ", vain %s";
            };
            fi2.prototype.commaOnlyOnX0 = function() {
              return ", vain %s";
            };
            fi2.prototype.commaOnThe = function() {
              return ",";
            };
            fi2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", kuukauden viimeisenä päivänä";
            };
            fi2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", kuukauden viimeisenä viikonpäivänä";
            };
            fi2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", kuukauden viimeinen %s";
            };
            fi2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", kuukauden %s";
            };
            fi2.prototype.commaX0ThroughX1 = function() {
              return ", %s - %s";
            };
            fi2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s päivää ennen kuukauden viimeistä päivää";
            };
            fi2.prototype.commaStartingX0 = function() {
              return ", alkaen %s";
            };
            fi2.prototype.everyHour = function() {
              return "joka tunti";
            };
            fi2.prototype.everyMinute = function() {
              return "joka minuutti";
            };
            fi2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "joka minuutti %s - %s välillä";
            };
            fi2.prototype.everySecond = function() {
              return "joka sekunti";
            };
            fi2.prototype.everyX0Hours = function() {
              return "joka %s. tunti";
            };
            fi2.prototype.everyX0Minutes = function() {
              return "joka %s. minuutti";
            };
            fi2.prototype.everyX0Seconds = function() {
              return "joka %s. sekunti";
            };
            fi2.prototype.fifth = function() {
              return "viides";
            };
            fi2.prototype.first = function() {
              return "ensimmäinen";
            };
            fi2.prototype.firstWeekday = function() {
              return "ensimmäinen viikonpäivä";
            };
            fi2.prototype.fourth = function() {
              return "neljäs";
            };
            fi2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "joka tunti minuuttien %s - %s välillä";
            };
            fi2.prototype.second = function() {
              return "toinen";
            };
            fi2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "joka minuutti sekunttien %s - %s välillä";
            };
            fi2.prototype.spaceAnd = function() {
              return " ja";
            };
            fi2.prototype.spaceAndSpace = function() {
              return " ja ";
            };
            fi2.prototype.spaceX0OfTheMonth = function() {
              return " %s kuukaudessa";
            };
            fi2.prototype.third = function() {
              return "kolmas";
            };
            fi2.prototype.weekdayNearestDayX0 = function() {
              return "viikonpäivä lähintä %s päivää";
            };
            fi2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            fi2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            fi2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            fi2.prototype.lastDay = function() {
              return "viimeinen päivä";
            };
            fi2.prototype.commaAndOnX0 = function() {
              return ", ja edelleen %s";
            };
            fi2.prototype.daysOfTheWeek = function() {
              return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
            };
            fi2.prototype.monthsOfTheYear = function() {
              return [
                "tammikuu",
                "helmikuu",
                "maaliskuu",
                "huhtikuu",
                "toukokuu",
                "kesäkuu",
                "heinäkuu",
                "elokuu",
                "syyskuu",
                "lokakuu",
                "marraskuu",
                "joulukuu"
              ];
            };
            return fi2;
          }();
          exports2.fi = fi;
        },
        /* 33 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.sl = void 0;
          var sl = function() {
            function sl2() {
            }
            sl2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            sl2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Pri generiranju opisa izraza je prišlo do napake. Preverite sintakso izraza cron.";
            };
            sl2.prototype.at = function() {
              return "Ob";
            };
            sl2.prototype.atSpace = function() {
              return "Ob ";
            };
            sl2.prototype.atX0 = function() {
              return "ob %s";
            };
            sl2.prototype.atX0MinutesPastTheHour = function() {
              return "ob %s.";
            };
            sl2.prototype.atX0SecondsPastTheMinute = function() {
              return "ob %s.";
            };
            sl2.prototype.betweenX0AndX1 = function() {
              return "od %s do %s";
            };
            sl2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", od %s. do %s. dne v mesecu";
            };
            sl2.prototype.commaEveryDay = function() {
              return ", vsak dan";
            };
            sl2.prototype.commaEveryX0Days = function() {
              return ", vsakih %s dni";
            };
            sl2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", vsakih %s dni v tednu";
            };
            sl2.prototype.commaEveryX0Months = function() {
              return ", vsakih %s mesecev";
            };
            sl2.prototype.commaEveryX0Years = function() {
              return ", vsakih %s let";
            };
            sl2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", %s. dan v mesecu";
            };
            sl2.prototype.commaOnlyInX0 = function() {
              return ", samo v %s";
            };
            sl2.prototype.commaOnlyOnX0 = function() {
              return ", samo v %s";
            };
            sl2.prototype.commaAndOnX0 = function() {
              return "in naprej %s";
            };
            sl2.prototype.commaOnThe = function() {
              return ", ";
            };
            sl2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", zadnji %s v mesecu";
            };
            sl2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", zadnji delovni dan v mesecu";
            };
            sl2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dni pred koncem meseca";
            };
            sl2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", zadnji %s v mesecu";
            };
            sl2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", %s v mesecu";
            };
            sl2.prototype.commaX0ThroughX1 = function() {
              return ", od %s do %s";
            };
            sl2.prototype.everyHour = function() {
              return "vsako uro";
            };
            sl2.prototype.everyMinute = function() {
              return "vsako minuto";
            };
            sl2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Vsako minuto od %s do %s";
            };
            sl2.prototype.everySecond = function() {
              return "vsako sekundo";
            };
            sl2.prototype.everyX0Hours = function() {
              return "vsakih %s ur";
            };
            sl2.prototype.everyX0Minutes = function() {
              return "vsakih %s minut";
            };
            sl2.prototype.everyX0Seconds = function() {
              return "vsakih %s sekund";
            };
            sl2.prototype.fifth = function() {
              return "peti";
            };
            sl2.prototype.first = function() {
              return "prvi";
            };
            sl2.prototype.firstWeekday = function() {
              return "prvi delovni dan";
            };
            sl2.prototype.fourth = function() {
              return "četrti";
            };
            sl2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minute od %s do %s";
            };
            sl2.prototype.second = function() {
              return "drugi";
            };
            sl2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekunde od %s do %s";
            };
            sl2.prototype.spaceAnd = function() {
              return " in";
            };
            sl2.prototype.spaceX0OfTheMonth = function() {
              return " %s v mesecu";
            };
            sl2.prototype.lastDay = function() {
              return "zadnjič";
            };
            sl2.prototype.third = function() {
              return "tretji";
            };
            sl2.prototype.weekdayNearestDayX0 = function() {
              return "delovni dan, najbližji %s. dnevu";
            };
            sl2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            sl2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            sl2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            sl2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            sl2.prototype.commaStartingX0 = function() {
              return ", začenši %s";
            };
            sl2.prototype.daysOfTheWeek = function() {
              return ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"];
            };
            sl2.prototype.monthsOfTheYear = function() {
              return [
                "januar",
                "februar",
                "marec",
                "april",
                "maj",
                "junij",
                "julij",
                "avgust",
                "september",
                "oktober",
                "november",
                "december"
              ];
            };
            return sl2;
          }();
          exports2.sl = sl;
        },
        /* 34 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.sw = void 0;
          var sw = function() {
            function sw2() {
            }
            sw2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            sw2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            sw2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            sw2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            sw2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            sw2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
            };
            sw2.prototype.everyMinute = function() {
              return "kila dakika";
            };
            sw2.prototype.everyHour = function() {
              return "kila saa";
            };
            sw2.prototype.atSpace = function() {
              return "Kwa ";
            };
            sw2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Kila dakika kwanzia %s hadi %s";
            };
            sw2.prototype.at = function() {
              return "Kwa";
            };
            sw2.prototype.spaceAnd = function() {
              return " na";
            };
            sw2.prototype.everySecond = function() {
              return "kila sekunde";
            };
            sw2.prototype.everyX0Seconds = function() {
              return "kila sekunde %s";
            };
            sw2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "sekunde ya %s hadi %s baada ya dakika";
            };
            sw2.prototype.atX0SecondsPastTheMinute = function() {
              return "at %s seconds past the minute";
            };
            sw2.prototype.everyX0Minutes = function() {
              return "kila dakika %s";
            };
            sw2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "minutes %s through %s past the hour";
            };
            sw2.prototype.atX0MinutesPastTheHour = function() {
              return "at %s minutes past the hour";
            };
            sw2.prototype.everyX0Hours = function() {
              return "every %s hours";
            };
            sw2.prototype.betweenX0AndX1 = function() {
              return "kati ya %s na %s";
            };
            sw2.prototype.atX0 = function() {
              return "kwenye %s";
            };
            sw2.prototype.commaEveryDay = function() {
              return ", kila siku";
            };
            sw2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", kila siku %s ya wiki";
            };
            sw2.prototype.commaX0ThroughX1 = function() {
              return ", %s hadi %s";
            };
            sw2.prototype.first = function() {
              return "ya kwanza";
            };
            sw2.prototype.second = function() {
              return "ya pili";
            };
            sw2.prototype.third = function() {
              return "ya tatu";
            };
            sw2.prototype.fourth = function() {
              return "ya nne";
            };
            sw2.prototype.fifth = function() {
              return "ya tano";
            };
            sw2.prototype.commaOnThe = function() {
              return ", kwenye ";
            };
            sw2.prototype.spaceX0OfTheMonth = function() {
              return " siku %s ya mwezi";
            };
            sw2.prototype.lastDay = function() {
              return "siku ya mwisho";
            };
            sw2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", siku ya %s ya mwezi";
            };
            sw2.prototype.commaOnlyOnX0 = function() {
              return ", kwa %s tu";
            };
            sw2.prototype.commaAndOnX0 = function() {
              return ", na pia %s";
            };
            sw2.prototype.commaEveryX0Months = function() {
              return ", kila mwezi wa %s";
            };
            sw2.prototype.commaOnlyInX0 = function() {
              return ", kwa %s tu";
            };
            sw2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", siku ya mwisho wa mwezi";
            };
            sw2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", wikendi ya mwisho wa mwezi";
            };
            sw2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", siku ya %s kabla ya siku ya mwisho wa mwezi";
            };
            sw2.prototype.firstWeekday = function() {
              return "siku za kazi ya kwanza";
            };
            sw2.prototype.weekdayNearestDayX0 = function() {
              return "siku ya kazi karibu na siku ya %s";
            };
            sw2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", siku ya %s ya mwezi";
            };
            sw2.prototype.commaEveryX0Days = function() {
              return ", kila siku %s";
            };
            sw2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", kati ya siku %s na %s ya mwezi";
            };
            sw2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", siku ya %s ya mwezi";
            };
            sw2.prototype.commaEveryX0Years = function() {
              return ", kila miaka %s";
            };
            sw2.prototype.commaStartingX0 = function() {
              return ", kwanzia %s";
            };
            sw2.prototype.daysOfTheWeek = function() {
              return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
            };
            sw2.prototype.monthsOfTheYear = function() {
              return [
                "Januari",
                "Februari",
                "Machi",
                "Aprili",
                "Mei",
                "Juni",
                "Julai",
                "Agosti",
                "Septemba",
                "Oktoba",
                "Novemba",
                "Desemba"
              ];
            };
            return sw2;
          }();
          exports2.sw = sw;
        },
        /* 35 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.fa = void 0;
          var fa = function() {
            function fa2() {
            }
            fa2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            fa2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            fa2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            fa2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            fa2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            fa2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "خطایی در نمایش توضیحات این وظیفه رخ داد. لطفا ساختار آن را بررسی کنید.";
            };
            fa2.prototype.everyMinute = function() {
              return "هر دقیقه";
            };
            fa2.prototype.everyHour = function() {
              return "هر ساعت";
            };
            fa2.prototype.atSpace = function() {
              return "در ";
            };
            fa2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "هر دقیقه بین %s و %s";
            };
            fa2.prototype.at = function() {
              return "در";
            };
            fa2.prototype.spaceAnd = function() {
              return " و";
            };
            fa2.prototype.everySecond = function() {
              return "هر ثانیه";
            };
            fa2.prototype.everyX0Seconds = function() {
              return "هر %s ثانیه";
            };
            fa2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "ثانیه %s تا %s دقیقه گذشته";
            };
            fa2.prototype.atX0SecondsPastTheMinute = function() {
              return "در %s قانیه از دقیقه گذشته";
            };
            fa2.prototype.everyX0Minutes = function() {
              return "هر %s دقیقه";
            };
            fa2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "دقیقه %s تا %s ساعت گذشته";
            };
            fa2.prototype.atX0MinutesPastTheHour = function() {
              return "در %s دقیقه پس از ساعت";
            };
            fa2.prototype.everyX0Hours = function() {
              return "هر %s ساعت";
            };
            fa2.prototype.betweenX0AndX1 = function() {
              return "بین %s و %s";
            };
            fa2.prototype.atX0 = function() {
              return "در %s";
            };
            fa2.prototype.commaEveryDay = function() {
              return ", هر روز";
            };
            fa2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", هر %s روز از هفته";
            };
            fa2.prototype.commaX0ThroughX1 = function() {
              return ", %s تا %s";
            };
            fa2.prototype.first = function() {
              return "اول";
            };
            fa2.prototype.second = function() {
              return "دوم";
            };
            fa2.prototype.third = function() {
              return "سوم";
            };
            fa2.prototype.fourth = function() {
              return "چهارم";
            };
            fa2.prototype.fifth = function() {
              return "پنجم";
            };
            fa2.prototype.commaOnThe = function() {
              return ", در ";
            };
            fa2.prototype.spaceX0OfTheMonth = function() {
              return " %s ماه";
            };
            fa2.prototype.lastDay = function() {
              return "آخرین روز";
            };
            fa2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", در %s ماه";
            };
            fa2.prototype.commaOnlyOnX0 = function() {
              return ", فقط در %s";
            };
            fa2.prototype.commaAndOnX0 = function() {
              return ", و در %s";
            };
            fa2.prototype.commaEveryX0Months = function() {
              return ", هر %s ماه";
            };
            fa2.prototype.commaOnlyInX0 = function() {
              return ", فقط در %s";
            };
            fa2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", در آخرین روز ماه";
            };
            fa2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", در آخرین روز ماه";
            };
            fa2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s روز قبل از آخرین روز ماه";
            };
            fa2.prototype.firstWeekday = function() {
              return "اولین روز";
            };
            fa2.prototype.weekdayNearestDayX0 = function() {
              return "روز نزدیک به روز %s";
            };
            fa2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", در %s ماه";
            };
            fa2.prototype.commaEveryX0Days = function() {
              return ", هر %s روز";
            };
            fa2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", بین روز %s و %s ماه";
            };
            fa2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", در %s ماه";
            };
            fa2.prototype.commaEveryMinute = function() {
              return ", هر minute";
            };
            fa2.prototype.commaEveryHour = function() {
              return ", هر ساعت";
            };
            fa2.prototype.commaEveryX0Years = function() {
              return ", هر %s سال";
            };
            fa2.prototype.commaStartingX0 = function() {
              return ", آغاز %s";
            };
            fa2.prototype.daysOfTheWeek = function() {
              return ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
            };
            fa2.prototype.monthsOfTheYear = function() {
              return ["ژانویه", "فوریه", "مارس", "آپریل", "مه", "ژوئن", "ژوئیه", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
            };
            return fa2;
          }();
          exports2.fa = fa;
        },
        /* 36 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.ca = void 0;
          var ca = function() {
            function ca2() {
            }
            ca2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            ca2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            ca2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            ca2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            ca2.prototype.use24HourTimeFormatByDefault = function() {
              return false;
            };
            ca2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "S'ha produït un error mentres es generava la descripció de l'expressió. Revisi la sintaxi de la expressió de cron.";
            };
            ca2.prototype.at = function() {
              return "A les";
            };
            ca2.prototype.atSpace = function() {
              return "A les ";
            };
            ca2.prototype.atX0 = function() {
              return "a les %s";
            };
            ca2.prototype.atX0MinutesPastTheHour = function() {
              return "als %s minuts de l'hora";
            };
            ca2.prototype.atX0SecondsPastTheMinute = function() {
              return "als %s segonds del minut";
            };
            ca2.prototype.betweenX0AndX1 = function() {
              return "entre les %s i les %s";
            };
            ca2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", entre els dies %s i %s del mes";
            };
            ca2.prototype.commaEveryDay = function() {
              return ", cada dia";
            };
            ca2.prototype.commaEveryX0Days = function() {
              return ", cada %s dies";
            };
            ca2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", cada %s dies de la setmana";
            };
            ca2.prototype.commaEveryX0Months = function() {
              return ", cada %s mesos";
            };
            ca2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", el dia %s del mes";
            };
            ca2.prototype.commaOnlyInX0 = function() {
              return ", sólo en %s";
            };
            ca2.prototype.commaOnlyOnX0 = function() {
              return ", només el %s";
            };
            ca2.prototype.commaAndOnX0 = function() {
              return ", i el %s";
            };
            ca2.prototype.commaOnThe = function() {
              return ", en el ";
            };
            ca2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", en l'últim dia del mes";
            };
            ca2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", en l'últim dia de la setmana del mes";
            };
            ca2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s dies abans de l'últim dia del mes";
            };
            ca2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", en l'últim %s del mes";
            };
            ca2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", en el %s del mes";
            };
            ca2.prototype.commaX0ThroughX1 = function() {
              return ", de %s a %s";
            };
            ca2.prototype.everyHour = function() {
              return "cada hora";
            };
            ca2.prototype.everyMinute = function() {
              return "cada minut";
            };
            ca2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "cada minut entre les %s i les %s";
            };
            ca2.prototype.everySecond = function() {
              return "cada segon";
            };
            ca2.prototype.everyX0Hours = function() {
              return "cada %s hores";
            };
            ca2.prototype.everyX0Minutes = function() {
              return "cada %s minuts";
            };
            ca2.prototype.everyX0Seconds = function() {
              return "cada %s segons";
            };
            ca2.prototype.fifth = function() {
              return "cinquè";
            };
            ca2.prototype.first = function() {
              return "primer";
            };
            ca2.prototype.firstWeekday = function() {
              return "primer dia de la setmana";
            };
            ca2.prototype.fourth = function() {
              return "quart";
            };
            ca2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "del minut %s al %s passada l'hora";
            };
            ca2.prototype.second = function() {
              return "segon";
            };
            ca2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "En els segons %s al %s de cada minut";
            };
            ca2.prototype.spaceAnd = function() {
              return " i";
            };
            ca2.prototype.spaceX0OfTheMonth = function() {
              return " %s del mes";
            };
            ca2.prototype.lastDay = function() {
              return "l'últim dia";
            };
            ca2.prototype.third = function() {
              return "tercer";
            };
            ca2.prototype.weekdayNearestDayX0 = function() {
              return "dia de la setmana més proper al %s";
            };
            ca2.prototype.commaEveryX0Years = function() {
              return ", cada %s anys";
            };
            ca2.prototype.commaStartingX0 = function() {
              return ", començant %s";
            };
            ca2.prototype.daysOfTheWeek = function() {
              return ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
            };
            ca2.prototype.monthsOfTheYear = function() {
              return [
                "gener",
                "febrer",
                "març",
                "abril",
                "maig",
                "juny",
                "juliol",
                "agost",
                "setembre",
                "octubre",
                "novembre",
                "desembre"
              ];
            };
            return ca2;
          }();
          exports2.ca = ca;
        },
        /* 37 */
        /***/
        function(module2, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", { value: true });
          exports2.be = void 0;
          var be = function() {
            function be2() {
            }
            be2.prototype.atX0SecondsPastTheMinuteGt20 = function() {
              return null;
            };
            be2.prototype.atX0MinutesPastTheHourGt20 = function() {
              return null;
            };
            be2.prototype.commaMonthX0ThroughMonthX1 = function() {
              return null;
            };
            be2.prototype.commaYearX0ThroughYearX1 = function() {
              return null;
            };
            be2.prototype.use24HourTimeFormatByDefault = function() {
              return true;
            };
            be2.prototype.everyMinute = function() {
              return "кожную хвіліну";
            };
            be2.prototype.everyHour = function() {
              return "кожную гадзіну";
            };
            be2.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function() {
              return "Адбылася памылка падчас генерацыі апісання выразы. Праверце сінтаксіс крон-выразы.";
            };
            be2.prototype.atSpace = function() {
              return "У ";
            };
            be2.prototype.everyMinuteBetweenX0AndX1 = function() {
              return "Кожную хвіліну з %s да %s";
            };
            be2.prototype.at = function() {
              return "У";
            };
            be2.prototype.spaceAnd = function() {
              return " і";
            };
            be2.prototype.everySecond = function() {
              return "кожную секунду";
            };
            be2.prototype.everyX0Seconds = function() {
              return "кожныя %s секунд";
            };
            be2.prototype.secondsX0ThroughX1PastTheMinute = function() {
              return "секунды з %s па %s";
            };
            be2.prototype.atX0SecondsPastTheMinute = function() {
              return "у %s секунд";
            };
            be2.prototype.everyX0Minutes = function() {
              return "кожныя %s хвілін";
            };
            be2.prototype.minutesX0ThroughX1PastTheHour = function() {
              return "хвіліны з %s па %s";
            };
            be2.prototype.atX0MinutesPastTheHour = function() {
              return "у %s хвілін";
            };
            be2.prototype.everyX0Hours = function() {
              return "кожныя %s гадзін";
            };
            be2.prototype.betweenX0AndX1 = function() {
              return "з %s па %s";
            };
            be2.prototype.atX0 = function() {
              return "у %s";
            };
            be2.prototype.commaEveryDay = function() {
              return ", кожны дзень";
            };
            be2.prototype.commaEveryX0DaysOfTheWeek = function() {
              return ", кожныя %s дзён тыдня";
            };
            be2.prototype.commaX0ThroughX1 = function() {
              return ", %s па %s";
            };
            be2.prototype.first = function() {
              return "першы";
            };
            be2.prototype.second = function() {
              return "другі";
            };
            be2.prototype.third = function() {
              return "трэці";
            };
            be2.prototype.fourth = function() {
              return "чацвёрты";
            };
            be2.prototype.fifth = function() {
              return "пяты";
            };
            be2.prototype.commaOnThe = function() {
              return ", у ";
            };
            be2.prototype.spaceX0OfTheMonth = function() {
              return " %s месяца";
            };
            be2.prototype.lastDay = function() {
              return "апошні дзень";
            };
            be2.prototype.commaOnTheLastX0OfTheMonth = function() {
              return ", у апошні %s месяца";
            };
            be2.prototype.commaOnlyOnX0 = function() {
              return ", толькі ў %s";
            };
            be2.prototype.commaAndOnX0 = function() {
              return ", і ў %s";
            };
            be2.prototype.commaEveryX0Months = function() {
              return ", кожныя %s месяцаў";
            };
            be2.prototype.commaOnlyInX0 = function() {
              return ", толькі ў %s";
            };
            be2.prototype.commaOnTheLastDayOfTheMonth = function() {
              return ", у апошні дзень месяца";
            };
            be2.prototype.commaOnTheLastWeekdayOfTheMonth = function() {
              return ", у апошні будні дзень месяца";
            };
            be2.prototype.commaDaysBeforeTheLastDayOfTheMonth = function() {
              return ", %s дзён да апошняга дня месяца";
            };
            be2.prototype.firstWeekday = function() {
              return "першы будны дзень";
            };
            be2.prototype.weekdayNearestDayX0 = function() {
              return "найбліжэйшы будны дзень да %s";
            };
            be2.prototype.commaOnTheX0OfTheMonth = function() {
              return ", у %s месяцы";
            };
            be2.prototype.commaEveryX0Days = function() {
              return ", кожныя %s дзён";
            };
            be2.prototype.commaBetweenDayX0AndX1OfTheMonth = function() {
              return ", з %s па %s лік месяца";
            };
            be2.prototype.commaOnDayX0OfTheMonth = function() {
              return ", у %s лік месяца";
            };
            be2.prototype.commaEveryX0Years = function() {
              return ", кожныя %s гадоў";
            };
            be2.prototype.commaStartingX0 = function() {
              return ", пачатак %s";
            };
            be2.prototype.daysOfTheWeek = function() {
              return ["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"];
            };
            be2.prototype.monthsOfTheYear = function() {
              return [
                "студзень",
                "люты",
                "сакавік",
                "красавік",
                "травень",
                "чэрвень",
                "ліпень",
                "жнівень",
                "верасень",
                "кастрычнік",
                "лістапад",
                "снежань"
              ];
            };
            return be2;
          }();
          exports2.be = be;
        }
        /******/
      ])
    );
  });
})(cronstrueI18n);
var cronstrueI18nExports = cronstrueI18n.exports;
var cronstrueWithLocales = cronstrueI18nExports;
var i18n = cronstrueWithLocales;
const cronstrue = /* @__PURE__ */ getDefaultExportFromCjs(i18n);
const _hoisted_1$5 = { class: "dynamic-form-field" };
const _hoisted_2$5 = ["for"];
const _hoisted_3$5 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_4$3 = ["id", "value", "placeholder", "disabled", "required"];
const _hoisted_5$3 = ["for"];
const _hoisted_6$3 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_7$3 = ["id", "value", "placeholder", "min", "max", "disabled", "required"];
const _hoisted_8$3 = {
  key: 0,
  class: "ml-1"
};
const _hoisted_9$3 = ["id", "checked", "disabled"];
const _hoisted_10$2 = ["for"];
const _hoisted_11$2 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_12$2 = ["for"];
const _hoisted_13$2 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_14$2 = ["id", "value", "disabled", "required"];
const _hoisted_15$2 = ["value"];
const _hoisted_16$2 = ["for"];
const _hoisted_17$2 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_18$2 = ["id", "value", "placeholder", "disabled", "required"];
const _hoisted_19$2 = ["for"];
const _hoisted_20$2 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_21$2 = ["id", "value", "disabled", "required"];
const _sfc_main$5 = {
  __name: "DynamicFormField",
  props: {
    /** 字段 Schema 定义 */
    field: {
      type: Object,
      required: true
    },
    /** 字段值（v-model） */
    modelValue: {
      type: [String, Number, Boolean],
      default: void 0
    },
    /** 暗黑模式 */
    darkMode: {
      type: Boolean,
      default: false
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fieldType = computed(() => props.field?.type || "string");
    const fieldLabel = computed(() => props.field?.label || props.field?.name || "");
    const isRequired = computed(() => props.field?.required === true);
    const fieldDescription = computed(() => props.field?.description || "");
    const selectOptions = computed(() => props.field?.options || []);
    const minValue = computed(() => props.field?.min);
    const maxValue = computed(() => props.field?.max);
    const defaultValue = computed(() => props.field?.defaultValue);
    const updateValue = (newValue) => {
      emit("update:modelValue", newValue);
    };
    const handleInput = (event) => {
      const value = event.target.value;
      if (fieldType.value === "number") {
        updateValue(value === "" ? void 0 : Number(value));
      } else {
        updateValue(value);
      }
    };
    const handleCheckbox = (event) => {
      updateValue(event.target.checked);
    };
    const handleSelect = (event) => {
      updateValue(event.target.value);
    };
    const inputClass = computed(() => [
      "block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border",
      props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500",
      props.disabled ? "opacity-50 cursor-not-allowed" : ""
    ]);
    const labelClass = computed(() => [
      "block text-sm font-medium mb-1",
      props.darkMode ? "text-gray-200" : "text-gray-700"
    ]);
    const descriptionClass = computed(() => [
      "mt-1 text-xs",
      props.darkMode ? "text-gray-400" : "text-gray-500"
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        fieldType.value === "string" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("label", {
            for: __props.field.name,
            class: normalizeClass(labelClass.value)
          }, [
            createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
            isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_3$5, "*")) : createCommentVNode("", true)
          ], 10, _hoisted_2$5),
          createBaseVNode("input", {
            type: "text",
            id: __props.field.name,
            value: __props.modelValue,
            placeholder: defaultValue.value !== void 0 ? String(defaultValue.value) : "",
            disabled: __props.disabled,
            required: isRequired.value,
            class: normalizeClass(inputClass.value),
            onInput: handleInput
          }, null, 42, _hoisted_4$3),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, toDisplayString(fieldDescription.value), 3)) : createCommentVNode("", true)
        ], 64)) : fieldType.value === "number" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("label", {
            for: __props.field.name,
            class: normalizeClass(labelClass.value)
          }, [
            createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
            isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_6$3, "*")) : createCommentVNode("", true)
          ], 10, _hoisted_5$3),
          createBaseVNode("input", {
            type: "number",
            id: __props.field.name,
            value: __props.modelValue,
            placeholder: defaultValue.value !== void 0 ? String(defaultValue.value) : "",
            min: minValue.value,
            max: maxValue.value,
            disabled: __props.disabled,
            required: isRequired.value,
            class: normalizeClass(inputClass.value),
            onInput: handleInput
          }, null, 42, _hoisted_7$3),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, [
            createTextVNode(toDisplayString(fieldDescription.value) + " ", 1),
            minValue.value !== void 0 || maxValue.value !== void 0 ? (openBlock(), createElementBlock("span", _hoisted_8$3, " (" + toDisplayString(minValue.value !== void 0 ? `最小: ${minValue.value}` : "") + toDisplayString(minValue.value !== void 0 && maxValue.value !== void 0 ? ", " : "") + toDisplayString(maxValue.value !== void 0 ? `最大: ${maxValue.value}` : "") + ") ", 1)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ], 64)) : fieldType.value === "boolean" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", {
            class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
          }, [
            createBaseVNode("input", {
              type: "checkbox",
              id: __props.field.name,
              checked: __props.modelValue,
              disabled: __props.disabled,
              class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""]),
              onChange: handleCheckbox
            }, null, 42, _hoisted_9$3),
            createBaseVNode("label", {
              for: __props.field.name,
              class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
            }, [
              createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
              isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_11$2, "*")) : createCommentVNode("", true)
            ], 10, _hoisted_10$2)
          ], 2),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, toDisplayString(fieldDescription.value), 3)) : createCommentVNode("", true)
        ], 64)) : fieldType.value === "select" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("label", {
            for: __props.field.name,
            class: normalizeClass(labelClass.value)
          }, [
            createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
            isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_13$2, "*")) : createCommentVNode("", true)
          ], 10, _hoisted_12$2),
          createBaseVNode("select", {
            id: __props.field.name,
            value: __props.modelValue,
            disabled: __props.disabled,
            required: isRequired.value,
            class: normalizeClass(inputClass.value),
            onChange: handleSelect
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(selectOptions.value, (opt) => {
              return openBlock(), createElementBlock("option", {
                key: opt.value,
                value: opt.value
              }, toDisplayString(opt.label || opt.value), 9, _hoisted_15$2);
            }), 128))
          ], 42, _hoisted_14$2),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, toDisplayString(fieldDescription.value), 3)) : createCommentVNode("", true)
        ], 64)) : fieldType.value === "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          createBaseVNode("label", {
            for: __props.field.name,
            class: normalizeClass(labelClass.value)
          }, [
            createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
            isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_17$2, "*")) : createCommentVNode("", true)
          ], 10, _hoisted_16$2),
          createBaseVNode("textarea", {
            id: __props.field.name,
            value: __props.modelValue,
            placeholder: defaultValue.value !== void 0 ? String(defaultValue.value) : "",
            disabled: __props.disabled,
            required: isRequired.value,
            rows: "4",
            class: normalizeClass(inputClass.value),
            onInput: handleInput
          }, null, 42, _hoisted_18$2),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, toDisplayString(fieldDescription.value), 3)) : createCommentVNode("", true)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          createBaseVNode("label", {
            for: __props.field.name,
            class: normalizeClass(labelClass.value)
          }, [
            createTextVNode(toDisplayString(fieldLabel.value) + " ", 1),
            isRequired.value ? (openBlock(), createElementBlock("span", _hoisted_20$2, "*")) : createCommentVNode("", true)
          ], 10, _hoisted_19$2),
          createBaseVNode("input", {
            type: "text",
            id: __props.field.name,
            value: __props.modelValue,
            disabled: __props.disabled,
            required: isRequired.value,
            class: normalizeClass(inputClass.value),
            onInput: handleInput
          }, null, 42, _hoisted_21$2),
          fieldDescription.value ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: normalizeClass(descriptionClass.value)
          }, toDisplayString(fieldDescription.value), 3)) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
};
const _hoisted_1$4 = ["innerHTML"];
const _hoisted_2$4 = { class: "flex-1 min-w-0" };
const _hoisted_3$4 = ["title"];
const _sfc_main$4 = {
  __name: "PathTreeItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    selectedPath: {
      type: String,
      default: ""
    },
    allowFiles: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select", "enter"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSelected = computed(() => {
      return props.selectedPath === props.item.path;
    });
    const fileIconHtml = computed(() => {
      const itemType = props.item.isDirectory ? FileType.FOLDER : props.item.type ?? detectFileTypeFromFilename(props.item.name);
      const iconItem = {
        isDirectory: props.item.isDirectory,
        isMount: props.item.isMount || false,
        filename: props.item.name,
        name: props.item.name,
        type: itemType
      };
      return getFileIcon(iconItem, props.darkMode);
    });
    const formatSize = (bytes) => {
      if (!bytes || bytes === 0) return "";
      const units = ["B", "KB", "MB", "GB", "TB"];
      let unitIndex = 0;
      let size = bytes;
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
    };
    const handleClick = () => {
      emit("select", props.item);
    };
    const handleDoubleClick = () => {
      if (props.item.isDirectory) {
        emit("enter", props.item);
      }
    };
    const handleEnter = () => {
      if (props.item.isDirectory) {
        emit("enter", props.item);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["path-tree-item flex items-center px-3 py-2.5 cursor-pointer transition-colors group", [
          isSelected.value ? __props.darkMode ? "bg-primary-900/40 border-l-2 border-primary-400" : "bg-primary-50 border-l-2 border-primary-500" : __props.darkMode ? "hover:bg-gray-700/70 border-l-2 border-transparent" : "hover:bg-gray-50 border-l-2 border-transparent",
          __props.darkMode ? "text-gray-300" : "text-gray-700"
        ]]),
        onClick: handleClick,
        onDblclick: handleDoubleClick
      }, [
        isSelected.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["flex-shrink-0 mr-2 w-1.5 h-1.5 rounded-full", __props.darkMode ? "bg-primary-400" : "bg-primary-500"])
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "flex-shrink-0 mr-2.5 w-5 h-5",
          innerHTML: fileIconHtml.value
        }, null, 8, _hoisted_1$4),
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", {
            class: normalizeClass(["truncate text-sm", isSelected.value ? "font-semibold" : "font-medium"])
          }, toDisplayString(__props.item.name), 3),
          !__props.item.isDirectory && __props.item.size ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["text-xs mt-0.5", __props.darkMode ? "text-gray-500" : "text-gray-400"])
          }, toDisplayString(formatSize(__props.item.size)), 3)) : createCommentVNode("", true)
        ]),
        __props.item.isDirectory ? (openBlock(), createElementBlock("button", {
          key: 1,
          onClick: withModifiers(handleEnter, ["stop"]),
          class: normalizeClass(["flex-shrink-0 ml-2 p-1 rounded transition-all", [
            __props.darkMode ? "text-gray-500 hover:text-primary-400 hover:bg-gray-700" : "text-gray-400 hover:text-primary-500 hover:bg-gray-100",
            "opacity-50 group-hover:opacity-100"
          ]]),
          title: _ctx.$t("admin.scheduledJobs.syncTask.enterFolder", "进入文件夹")
        }, [
          createVNode(unref(IconChevronRight), {
            size: "sm",
            "aria-hidden": "true"
          })
        ], 10, _hoisted_3$4)) : createCommentVNode("", true)
      ], 34);
    };
  }
};
const PathTreeItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-08e50603"]]);
const _hoisted_1$3 = { class: "flex items-center justify-between mb-2" };
const _hoisted_2$3 = ["title"];
const _hoisted_3$3 = ["onClick", "title"];
const _hoisted_4$2 = { class: "flex items-center gap-0.5 flex-shrink-0" };
const _hoisted_5$2 = ["disabled", "title"];
const _hoisted_6$2 = ["disabled", "title"];
const _hoisted_7$2 = { class: "text-sm" };
const _hoisted_8$2 = { class: "text-sm font-medium mb-1" };
const _hoisted_9$2 = { class: "text-xs opacity-70" };
const _sfc_main$3 = {
  __name: "PathTreeSelector",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    allowFiles: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: "300px"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const loading = ref(false);
    const error = ref(null);
    const items = ref([]);
    const currentPath = ref("/");
    const selectedPath = ref(props.modelValue);
    const isFullscreen = ref(false);
    let pendingRequest = null;
    let pendingPath = null;
    let isInitialLoaded = false;
    const pathSegments = computed(() => {
      if (!currentPath.value || currentPath.value === "/") {
        return [];
      }
      return currentPath.value.split("/").filter(Boolean);
    });
    const sortItems = (itemList) => {
      return [...itemList].sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return (a.name || "").localeCompare(b.name || "", void 0, { sensitivity: "base" });
      });
    };
    const loadDirectory = async (path = "/", forceRefresh = false) => {
      if (pendingRequest && pendingPath === path) {
        return pendingRequest;
      }
      loading.value = true;
      error.value = null;
      pendingPath = path;
      try {
        pendingRequest = getDirectoryList(path, { refresh: forceRefresh });
        const response = await pendingRequest;
        if (response.success && response.data) {
          const allItems = response.data.items || [];
          const filtered = props.allowFiles ? allItems : allItems.filter((item) => item.isDirectory);
          items.value = sortItems(filtered);
          currentPath.value = path;
        } else {
          error.value = response.message || "加载失败";
        }
      } catch (err) {
        error.value = err.message || "加载失败";
      } finally {
        loading.value = false;
        pendingRequest = null;
        pendingPath = null;
      }
    };
    const handleSelect = (item) => {
      if (props.allowFiles || item.isDirectory) {
        selectedPath.value = item.path;
        emit("update:modelValue", item.path);
      }
    };
    const handleEnterDirectory = (item) => {
      if (item.isDirectory) {
        loadDirectory(item.path);
      }
    };
    const goUp = () => {
      if (currentPath.value === "/") return;
      const segments = currentPath.value.split("/").filter(Boolean);
      if (segments.length <= 1) {
        loadDirectory("/");
      } else {
        const parentPath = "/" + segments.slice(0, -1).join("/");
        loadDirectory(parentPath);
      }
    };
    const navigateToSegment = (index) => {
      const path = "/" + pathSegments.value.slice(0, index + 1).join("/");
      loadDirectory(path);
    };
    watch(() => props.modelValue, (newVal) => {
      selectedPath.value = newVal;
    });
    onMounted(() => {
      if (!isInitialLoaded) {
        isInitialLoaded = true;
        loadDirectory("/");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["path-tree-selector", { "fullscreen-mode": isFullscreen.value }])
      }, [
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", {
            class: normalizeClass(["flex-1 flex items-center gap-1 text-sm overflow-x-auto py-1.5 px-2 rounded-md mr-2", __props.darkMode ? "bg-gray-800/50 text-gray-300" : "bg-gray-50 text-gray-600"])
          }, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => loadDirectory("/")),
              class: normalizeClass(["p-1 rounded transition-colors flex-shrink-0", [
                __props.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
                currentPath.value === "/" ? __props.darkMode ? "text-primary-400" : "text-primary-600" : __props.darkMode ? "text-gray-400" : "text-gray-500"
              ]]),
              title: _ctx.$t("admin.scheduledJobs.syncTask.goToRoot", "返回根目录")
            }, [
              createVNode(unref(IconHome), {
                size: "sm",
                "aria-hidden": "true"
              })
            ], 10, _hoisted_2$3),
            (openBlock(true), createElementBlock(Fragment, null, renderList(pathSegments.value, (segment, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                createVNode(unref(IconChevronRight), {
                  size: "xs",
                  class: normalizeClass(["flex-shrink-0", __props.darkMode ? "text-gray-600" : "text-gray-300"]),
                  "aria-hidden": "true"
                }, null, 8, ["class"]),
                createBaseVNode("button", {
                  onClick: ($event) => navigateToSegment(index),
                  class: normalizeClass(["px-1.5 py-0.5 rounded transition-colors whitespace-nowrap max-w-[100px] truncate text-xs", [
                    __props.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
                    index === pathSegments.value.length - 1 ? __props.darkMode ? "text-primary-400 font-medium" : "text-primary-600 font-medium" : ""
                  ]]),
                  title: segment
                }, toDisplayString(segment), 11, _hoisted_3$3)
              ], 64);
            }), 128))
          ], 2),
          createBaseVNode("div", _hoisted_4$2, [
            createBaseVNode("button", {
              onClick: goUp,
              disabled: currentPath.value === "/",
              class: normalizeClass(["p-1.5 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
              title: _ctx.$t("admin.scheduledJobs.syncTask.goUp", "返回上级")
            }, [
              createVNode(unref(IconBack), {
                size: "sm",
                "aria-hidden": "true"
              })
            ], 10, _hoisted_5$2),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => loadDirectory(currentPath.value, true)),
              disabled: loading.value,
              class: normalizeClass(["p-1.5 rounded-md transition-colors disabled:opacity-30", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
              title: _ctx.$t("admin.scheduledJobs.syncTask.refresh", "刷新")
            }, [
              createVNode(unref(IconRefresh), {
                size: "sm",
                class: normalizeClass({ "animate-spin": loading.value }),
                "aria-hidden": "true"
              }, null, 8, ["class"])
            ], 10, _hoisted_6$2)
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["border rounded-md overflow-y-auto", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"]),
          style: normalizeStyle({ maxHeight: __props.maxHeight })
        }, [
          loading.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["p-4 text-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
          }, [
            createVNode(unref(IconRefresh), {
              class: "animate-spin mx-auto mb-2",
              "aria-hidden": "true"
            }),
            createTextVNode(" " + toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.loading", "加载中...")), 1)
          ], 2)) : error.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["p-4 text-center", __props.darkMode ? "text-red-400" : "text-red-600"])
          }, [
            createVNode(unref(IconInformationCircle), {
              size: "xl",
              class: "mx-auto mb-2 opacity-50",
              "aria-hidden": "true"
            }),
            createBaseVNode("p", _hoisted_7$2, toDisplayString(error.value), 1),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => loadDirectory(currentPath.value)),
              class: "mt-2 text-xs underline hover:no-underline"
            }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.retry", "点击重试")), 1)
          ], 2)) : items.value.length === 0 ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(["p-6 text-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
          }, [
            createVNode(unref(IconFolderOpen), {
              size: "2xl",
              class: "mx-auto mb-3 opacity-40",
              "aria-hidden": "true"
            }),
            createBaseVNode("p", _hoisted_8$2, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.emptyDirectory", "目录为空")), 1),
            createBaseVNode("p", _hoisted_9$2, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.emptyDirectoryHint", "当前目录下没有可选内容")), 1)
          ], 2)) : (openBlock(), createElementBlock("div", {
            key: 3,
            class: normalizeClass(["divide-y", __props.darkMode ? "divide-gray-700" : "divide-gray-200"])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item) => {
              return openBlock(), createBlock(PathTreeItem, {
                key: item.path,
                item,
                "dark-mode": __props.darkMode,
                "selected-path": selectedPath.value,
                "allow-files": __props.allowFiles,
                onSelect: handleSelect,
                onEnter: handleEnterDirectory
              }, null, 8, ["item", "dark-mode", "selected-path", "allow-files"]);
            }), 128))
          ], 2))
        ], 6)
      ], 2);
    };
  }
};
const PathTreeSelector = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-499b03bf"]]);
const _hoisted_1$2 = { class: "sync-task-config-form" };
const _hoisted_2$2 = { class: "space-y-4" };
const _hoisted_3$2 = ["onClick"];
const _hoisted_4$1 = { class: "flex items-center gap-2" };
const _hoisted_5$1 = ["title"];
const _hoisted_6$1 = ["title"];
const _hoisted_7$1 = ["title"];
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = { class: "dual-panel-container" };
const _hoisted_10$1 = { class: "flex items-center gap-2" };
const _hoisted_11$1 = { class: "panel-input" };
const _hoisted_12$1 = { class: "flex items-center gap-2" };
const _hoisted_13$1 = ["onUpdate:modelValue", "placeholder", "onKeyup", "onBlur"];
const _hoisted_14$1 = ["onClick", "title"];
const _hoisted_15$1 = ["onClick", "title"];
const _hoisted_16$1 = ["onClick", "title"];
const _hoisted_17$1 = { class: "panel-selector" };
const _hoisted_18$1 = { class: "sync-direction-indicator" };
const _hoisted_19$1 = { class: "hidden xl:flex flex-col items-center justify-center h-full py-8" };
const _hoisted_20$1 = { class: "flex xl:hidden items-center justify-center py-3" };
const _hoisted_21$1 = { class: "flex items-center gap-2" };
const _hoisted_22$1 = { class: "panel-input" };
const _hoisted_23$1 = { class: "flex items-center gap-2" };
const _hoisted_24$1 = ["onUpdate:modelValue", "placeholder", "onKeyup", "onBlur"];
const _hoisted_25$1 = ["onClick", "title"];
const _hoisted_26$1 = ["onClick", "title"];
const _hoisted_27$1 = ["onClick", "title"];
const _hoisted_28$1 = { class: "panel-selector" };
const _hoisted_29$1 = ["disabled"];
const _hoisted_30$1 = { class: "text-xs opacity-60" };
const _hoisted_31$1 = { class: "mt-4" };
const _hoisted_32$1 = { class: "flex items-start cursor-pointer" };
const _hoisted_33$1 = { class: "ml-3" };
const _hoisted_34$1 = { class: "flex items-center gap-3" };
const _sfc_main$2 = {
  __name: "SyncTaskConfigForm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const log = createLogger("SyncTaskConfigForm");
    function deriveTargetFolder(targetPath) {
      const raw = String(targetPath || "").trim();
      if (!raw) return "";
      let p = raw.replace(/\\\\/g, "/").replace(/\/{2,}/g, "/");
      if (!p.startsWith("/")) p = `/${p}`;
      if (p === "/") return "/";
      if (p.endsWith("/")) {
        return p.replace(/\/+$/g, "/");
      }
      const lastSlash = p.lastIndexOf("/");
      if (lastSlash <= 0) return "/";
      return p.slice(0, lastSlash + 1) || "/";
    }
    const props = __props;
    const emit = __emit;
    const pathPairs = ref([]);
    const options = ref({
      skipExisting: true,
      maxConcurrency: 1
    });
    let isInitialized = false;
    let isInternalUpdate = false;
    let lastEmittedConfigStr = null;
    function createNewPair() {
      return {
        id: Date.now() + Math.random(),
        sourcePath: "",
        targetPath: "",
        targetFolder: "",
        sourcePathInput: "",
        targetPathInput: "",
        sourceExpanded: true,
        targetExpanded: true,
        collapsed: false
        // 路径对整体是否收缩
      };
    }
    function parseConfigToPairs(config) {
      if (!config || Object.keys(config).length === 0) {
        return [createNewPair()];
      }
      if (Array.isArray(config.pairs) && config.pairs.length > 0) {
        return config.pairs.map((pair, index) => ({
          id: Date.now() + index + Math.random(),
          sourcePath: pair.sourcePath || "",
          targetPath: pair.targetPath || "",
          targetFolder: deriveTargetFolder(pair.targetPath || ""),
          sourcePathInput: pair.sourcePath || "",
          targetPathInput: pair.targetPath || "",
          sourceExpanded: !pair.sourcePath,
          targetExpanded: !pair.targetPath,
          collapsed: !!(pair.sourcePath && pair.targetPath)
          // 已配置的路径对默认收缩
        }));
      }
      if (config.sourcePath || config.targetPath) {
        return [{
          id: Date.now(),
          sourcePath: config.sourcePath || "",
          targetPath: config.targetPath || "",
          targetFolder: deriveTargetFolder(config.targetPath || ""),
          sourcePathInput: config.sourcePath || "",
          targetPathInput: config.targetPath || "",
          sourceExpanded: !config.sourcePath,
          targetExpanded: !config.targetPath,
          collapsed: !!(config.sourcePath && config.targetPath)
          // 已配置的路径对默认收缩
        }];
      }
      return [createNewPair()];
    }
    function parseConfigToOptions(config) {
      return {
        skipExisting: config?.skipExisting !== void 0 ? config.skipExisting : true,
        maxConcurrency: config?.maxConcurrency || 1
      };
    }
    const toBackendConfig = () => {
      const allPairs = pathPairs.value.map((p) => {
        const sourcePath = (p.sourcePathInput || p.sourcePath || "").trim();
        const targetPath = (p.targetPathInput || p.targetPath || "").trim();
        return { sourcePath, targetPath };
      });
      if (allPairs.length === 1) {
        return {
          sourcePath: allPairs[0].sourcePath,
          targetPath: allPairs[0].targetPath,
          ...options.value
        };
      }
      return {
        pairs: allPairs,
        ...options.value
      };
    };
    function isConfigEquivalent(config1, config2) {
      const getPairsCount = (cfg) => {
        if (!cfg) return 0;
        if (Array.isArray(cfg.pairs)) return cfg.pairs.length;
        if (cfg.sourcePath !== void 0 || cfg.targetPath !== void 0) return 1;
        return 0;
      };
      const count1 = getPairsCount(config1);
      const count2 = getPairsCount(config2);
      if (count1 !== count2) return false;
      const normalize = (cfg) => {
        if (!cfg) return "{}";
        const { skipExisting, maxConcurrency, pairs, sourcePath, targetPath } = cfg;
        return JSON.stringify({ skipExisting, maxConcurrency, pairs, sourcePath, targetPath });
      };
      return normalize(config1) === normalize(config2);
    }
    onMounted(() => {
      if (!isInitialized) {
        isInitialized = true;
        pathPairs.value = parseConfigToPairs(props.modelValue);
        options.value = parseConfigToOptions(props.modelValue);
        lastEmittedConfigStr = JSON.stringify(toBackendConfig());
      }
    });
    const addPathPair = () => {
      if (pathPairs.value.length < 100) {
        isInternalUpdate = true;
        pathPairs.value.push(createNewPair());
        emitConfigChange();
        setTimeout(() => {
          isInternalUpdate = false;
        }, 50);
      }
    };
    const removePathPair = (id) => {
      if (pathPairs.value.length > 1) {
        isInternalUpdate = true;
        pathPairs.value = pathPairs.value.filter((p) => p.id !== id);
        emitConfigChange();
        setTimeout(() => {
          isInternalUpdate = false;
        }, 50);
      }
    };
    const toggleSourceExpand = (pair) => {
      pair.sourceExpanded = !pair.sourceExpanded;
    };
    const toggleTargetExpand = (pair) => {
      pair.targetExpanded = !pair.targetExpanded;
    };
    const togglePairCollapsed = (pair) => {
      const willCollapse = !pair.collapsed;
      if (willCollapse) {
        applyQuickPath(pair, "source");
        applyQuickPath(pair, "target");
      }
      pair.collapsed = willCollapse;
    };
    const applyQuickPath = (pair, type) => {
      if (type === "source") {
        const input = pair.sourcePathInput?.trim();
        if (input) {
          pair.sourcePath = input;
          pair.sourceExpanded = false;
        }
      } else {
        const input = pair.targetPathInput?.trim();
        if (input) {
          pair.targetPath = input;
          pair.targetFolder = deriveTargetFolder(input);
          pair.targetExpanded = false;
        }
      }
    };
    const onPathSelected = (pair, type, path) => {
      {
        pair.sourcePathInput = path;
      }
    };
    const onTargetFolderSelected = (pair, folderPath) => {
      const folder = String(folderPath || "").trim();
      if (!folder) return;
      pair.targetFolder = folder;
      pair.targetPath = folder;
      pair.targetPathInput = folder;
    };
    const clearPath = (pair, type) => {
      if (type === "source") {
        pair.sourcePath = "";
        pair.sourcePathInput = "";
        pair.sourceExpanded = true;
      } else {
        pair.targetPath = "";
        pair.targetFolder = "";
        pair.targetPathInput = "";
        pair.targetExpanded = true;
      }
    };
    const copyPath = async (path) => {
      if (!path) return;
      const success = await copyToClipboard(path);
      if (!success) {
        log.error("复制路径失败:", path);
      }
    };
    function emitConfigChange() {
      const newConfig = toBackendConfig();
      const newConfigStr = JSON.stringify(newConfig);
      if (newConfigStr !== lastEmittedConfigStr) {
        lastEmittedConfigStr = newConfigStr;
        emit("update:modelValue", newConfig);
      }
    }
    watch(() => props.modelValue, (newVal) => {
      if (isInternalUpdate) return;
      if (!isInitialized) return;
      const currentConfig = toBackendConfig();
      if (isConfigEquivalent(newVal, currentConfig)) return;
      pathPairs.value = parseConfigToPairs(newVal);
      options.value = parseConfigToOptions(newVal);
      lastEmittedConfigStr = JSON.stringify(toBackendConfig());
    }, { deep: true });
    let updateTimer = null;
    watch([pathPairs, options], () => {
      if (isInternalUpdate) return;
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
      updateTimer = setTimeout(() => {
        emitConfigChange();
      }, 150);
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(TransitionGroup, {
            name: "path-pair-list",
            tag: "div",
            class: "space-y-4"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(pathPairs.value, (pair, index) => {
                return openBlock(), createElementBlock("div", {
                  key: pair.id,
                  class: "path-pair-container"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center justify-between cursor-pointer select-none group/header py-1.5 px-1", pair.collapsed ? "mb-0" : "mb-3"]),
                    onClick: ($event) => togglePairCollapsed(pair)
                  }, [
                    createBaseVNode("div", _hoisted_4$1, [
                      createBaseVNode("button", {
                        type: "button",
                        class: normalizeClass(["p-0.5 rounded transition-all", __props.darkMode ? "text-gray-400 group-hover/header:text-gray-300" : "text-gray-500 group-hover/header:text-gray-600"]),
                        title: pair.collapsed ? _ctx.$t("admin.scheduledJobs.syncTask.expandPair", "展开路径对") : _ctx.$t("admin.scheduledJobs.syncTask.collapsePair", "收起路径对")
                      }, [
                        createVNode(unref(IconChevronRight), {
                          size: "sm",
                          class: normalizeClass(["transition-transform duration-200", { "rotate-90": !pair.collapsed }])
                        }, null, 8, ["class"])
                      ], 10, _hoisted_5$1),
                      createBaseVNode("span", {
                        class: normalizeClass(["inline-flex items-center justify-center w-6 h-6 rounded text-xs font-semibold", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"])
                      }, toDisplayString(index + 1), 3),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-600"])
                      }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.pairNumber", "路径对 {n}", { n: index + 1 })), 3),
                      pair.sourcePath && pair.targetPath ? (openBlock(), createBlock(unref(IconCheckCircle), {
                        key: 0,
                        size: "sm",
                        class: normalizeClass(__props.darkMode ? "text-green-400" : "text-green-500")
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      pair.collapsed && (pair.sourcePath || pair.targetPath) ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: normalizeClass(["flex items-center gap-2 ml-2 text-xs font-mono truncate max-w-[300px] xl:max-w-[500px]", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                      }, [
                        createBaseVNode("span", {
                          class: "truncate",
                          title: pair.sourcePath
                        }, toDisplayString(pair.sourcePath || "..."), 9, _hoisted_6$1),
                        createVNode(unref(IconChevronRight), {
                          size: "xs",
                          class: "flex-shrink-0"
                        }),
                        createBaseVNode("span", {
                          class: "truncate",
                          title: pair.targetPath
                        }, toDisplayString(pair.targetPath || "..."), 9, _hoisted_7$1)
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    pathPairs.value.length > 1 ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => removePathPair(pair.id), ["stop"]),
                      class: normalizeClass(["text-xs px-2 py-1 rounded transition-colors", __props.darkMode ? "text-gray-500 hover:text-red-400 hover:bg-gray-800" : "text-gray-400 hover:text-red-500 hover:bg-gray-100"])
                    }, [
                      createVNode(unref(IconClose), { size: "sm" })
                    ], 10, _hoisted_8$1)) : createCommentVNode("", true)
                  ], 10, _hoisted_3$2),
                  createVNode(Transition, { name: "pair-content" }, {
                    default: withCtx(() => [
                      withDirectives(createBaseVNode("div", _hoisted_9$1, [
                        createBaseVNode("div", {
                          class: normalizeClass(["path-panel", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["panel-header", __props.darkMode ? "bg-blue-900/30 border-gray-700" : "bg-blue-50 border-gray-200"])
                          }, [
                            createBaseVNode("div", _hoisted_10$1, [
                              createVNode(unref(IconFolder), {
                                size: "sm",
                                class: normalizeClass(__props.darkMode ? "text-blue-400" : "text-blue-600")
                              }, null, 8, ["class"]),
                              createBaseVNode("span", {
                                class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-blue-300" : "text-blue-700"])
                              }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.sourcePath", "源路径")), 3)
                            ])
                          ], 2),
                          createBaseVNode("div", _hoisted_11$1, [
                            createBaseVNode("div", _hoisted_12$1, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": ($event) => pair.sourcePathInput = $event,
                                type: "text",
                                placeholder: _ctx.$t("admin.scheduledJobs.syncTask.quickInputPlaceholder", "输入路径后按回车..."),
                                class: normalizeClass(["flex-1 px-3 py-2 text-sm font-mono border-0 bg-transparent focus:outline-none focus:ring-0", __props.darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"]),
                                onKeyup: withKeys(($event) => applyQuickPath(pair, "source"), ["enter"]),
                                onBlur: ($event) => applyQuickPath(pair, "source")
                              }, null, 42, _hoisted_13$1), [
                                [vModelText, pair.sourcePathInput]
                              ]),
                              pair.sourcePath ? (openBlock(), createElementBlock("button", {
                                key: 0,
                                onClick: ($event) => copyPath(pair.sourcePath),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-primary-400" : "hover:bg-gray-100 text-gray-400 hover:text-primary-500"]),
                                title: _ctx.$t("admin.scheduledJobs.syncTask.copyPath", "复制路径")
                              }, [
                                createVNode(unref(IconCopy), { size: "sm" })
                              ], 10, _hoisted_14$1)) : createCommentVNode("", true),
                              createBaseVNode("button", {
                                onClick: ($event) => toggleSourceExpand(pair),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"]),
                                title: pair.sourceExpanded ? _ctx.$t("admin.scheduledJobs.syncTask.collapse", "收起") : _ctx.$t("admin.scheduledJobs.syncTask.expand", "展开")
                              }, [
                                createVNode(unref(IconList), { size: "sm" })
                              ], 10, _hoisted_15$1),
                              pair.sourcePath ? (openBlock(), createElementBlock("button", {
                                key: 1,
                                onClick: ($event) => clearPath(pair, "source"),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-red-400" : "hover:bg-gray-100 text-gray-400 hover:text-red-500"]),
                                title: _ctx.$t("admin.scheduledJobs.syncTask.clearPath", "清除")
                              }, [
                                createVNode(unref(IconClose), { size: "sm" })
                              ], 10, _hoisted_16$1)) : createCommentVNode("", true)
                            ])
                          ]),
                          withDirectives(createBaseVNode("div", _hoisted_17$1, [
                            createVNode(PathTreeSelector, {
                              modelValue: pair.sourcePath,
                              "onUpdate:modelValue": [($event) => pair.sourcePath = $event, ($event) => onPathSelected(pair, "source", $event)],
                              "dark-mode": __props.darkMode,
                              "allow-files": true,
                              "max-height": "280px"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dark-mode"])
                          ], 512), [
                            [vShow, pair.sourceExpanded]
                          ]),
                          createBaseVNode("div", {
                            class: normalizeClass(["panel-hint", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                          }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.sourcePathHint", "可以是文件或文件夹路径")), 3)
                        ], 2),
                        createBaseVNode("div", _hoisted_18$1, [
                          createBaseVNode("div", _hoisted_19$1, [
                            createBaseVNode("div", {
                              class: normalizeClass(["w-px flex-1 min-h-[20px]", __props.darkMode ? "bg-gradient-to-b from-transparent via-gray-600 to-gray-600" : "bg-gradient-to-b from-transparent via-gray-300 to-gray-300"])
                            }, null, 2),
                            createBaseVNode("div", {
                              class: normalizeClass(["relative w-9 h-9 rounded-full flex items-center justify-center my-2 transition-all duration-200", [
                                pair.sourcePath && pair.targetPath ? __props.darkMode ? "bg-primary-600/20 ring-2 ring-primary-500/50" : "bg-primary-50 ring-2 ring-primary-200" : __props.darkMode ? "bg-gray-800 ring-1 ring-gray-700" : "bg-gray-50 ring-1 ring-gray-200"
                              ]])
                            }, [
                              createVNode(unref(IconChevronRight), {
                                size: "sm",
                                class: normalizeClass(["transition-colors", pair.sourcePath && pair.targetPath ? __props.darkMode ? "text-primary-400" : "text-primary-500" : __props.darkMode ? "text-gray-500" : "text-gray-400"])
                              }, null, 8, ["class"])
                            ], 2),
                            createBaseVNode("div", {
                              class: normalizeClass(["w-px flex-1 min-h-[20px]", __props.darkMode ? "bg-gradient-to-b from-gray-600 via-gray-600 to-transparent" : "bg-gradient-to-b from-gray-300 via-gray-300 to-transparent"])
                            }, null, 2)
                          ]),
                          createBaseVNode("div", _hoisted_20$1, [
                            createBaseVNode("div", {
                              class: normalizeClass(["flex items-center gap-3", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                            }, [
                              createBaseVNode("div", {
                                class: normalizeClass(["h-px w-8", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                              }, null, 2),
                              createVNode(unref(IconArrowUp), {
                                size: "md",
                                class: "rotate-180"
                              }),
                              createBaseVNode("div", {
                                class: normalizeClass(["h-px w-8", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                              }, null, 2)
                            ], 2)
                          ])
                        ]),
                        createBaseVNode("div", {
                          class: normalizeClass(["path-panel", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["panel-header", __props.darkMode ? "bg-green-900/30 border-gray-700" : "bg-green-50 border-gray-200"])
                          }, [
                            createBaseVNode("div", _hoisted_21$1, [
                              createVNode(unref(IconFolder), {
                                size: "sm",
                                class: normalizeClass(__props.darkMode ? "text-green-400" : "text-green-600")
                              }, null, 8, ["class"]),
                              createBaseVNode("span", {
                                class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-green-300" : "text-green-700"])
                              }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.targetPath", "目标路径")), 3)
                            ])
                          ], 2),
                          createBaseVNode("div", _hoisted_22$1, [
                            createBaseVNode("div", _hoisted_23$1, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": ($event) => pair.targetPathInput = $event,
                                type: "text",
                                placeholder: _ctx.$t("admin.scheduledJobs.syncTask.quickInputPlaceholder", "输入路径后按回车..."),
                                class: normalizeClass(["flex-1 px-3 py-2 text-sm font-mono border-0 bg-transparent focus:outline-none focus:ring-0", __props.darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"]),
                                onKeyup: withKeys(($event) => applyQuickPath(pair, "target"), ["enter"]),
                                onBlur: ($event) => applyQuickPath(pair, "target")
                              }, null, 42, _hoisted_24$1), [
                                [vModelText, pair.targetPathInput]
                              ]),
                              pair.targetPath ? (openBlock(), createElementBlock("button", {
                                key: 0,
                                onClick: ($event) => copyPath(pair.targetPath),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-primary-400" : "hover:bg-gray-100 text-gray-400 hover:text-primary-500"]),
                                title: _ctx.$t("admin.scheduledJobs.syncTask.copyPath", "复制路径")
                              }, [
                                createVNode(unref(IconCopy), { size: "sm" })
                              ], 10, _hoisted_25$1)) : createCommentVNode("", true),
                              createBaseVNode("button", {
                                onClick: ($event) => toggleTargetExpand(pair),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"]),
                                title: pair.targetExpanded ? _ctx.$t("admin.scheduledJobs.syncTask.collapse", "收起") : _ctx.$t("admin.scheduledJobs.syncTask.expand", "展开")
                              }, [
                                createVNode(unref(IconList), { size: "sm" })
                              ], 10, _hoisted_26$1),
                              pair.targetPath ? (openBlock(), createElementBlock("button", {
                                key: 1,
                                onClick: ($event) => clearPath(pair, "target"),
                                class: normalizeClass(["p-1.5 rounded transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-red-400" : "hover:bg-gray-100 text-gray-400 hover:text-red-500"]),
                                title: _ctx.$t("admin.scheduledJobs.syncTask.clearPath", "清除")
                              }, [
                                createVNode(unref(IconClose), { size: "sm" })
                              ], 10, _hoisted_27$1)) : createCommentVNode("", true)
                            ])
                          ]),
                          withDirectives(createBaseVNode("div", _hoisted_28$1, [
                            createVNode(PathTreeSelector, {
                              modelValue: pair.targetFolder,
                              "onUpdate:modelValue": [($event) => pair.targetFolder = $event, ($event) => onTargetFolderSelected(pair, $event)],
                              "dark-mode": __props.darkMode,
                              "allow-files": false,
                              "max-height": "280px"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dark-mode"])
                          ], 512), [
                            [vShow, pair.targetExpanded]
                          ]),
                          createBaseVNode("div", {
                            class: normalizeClass(["panel-hint", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                          }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.targetPathHint", "可以是文件夹路径（自动拼接源文件名），也可手动重命名文件路径")), 3)
                        ], 2)
                      ], 512), [
                        [vShow, !pair.collapsed]
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  index < pathPairs.value.length - 1 ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["mt-4 border-t", __props.darkMode ? "border-gray-800" : "border-gray-100"])
                  }, null, 2)) : createCommentVNode("", true)
                ]);
              }), 128))
            ]),
            _: 1
          }),
          createBaseVNode("button", {
            onClick: addPathPair,
            disabled: pathPairs.value.length >= 100,
            class: normalizeClass(["w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors border-2 border-dashed flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed", __props.darkMode ? "border-gray-700 hover:border-gray-600 text-gray-500 hover:text-gray-400 hover:bg-gray-800/50" : "border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 hover:bg-gray-50"])
          }, [
            createVNode(unref(IconFolderPlus), { size: "sm" }),
            createTextVNode(" " + toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.addPathPair", "添加路径对")) + " ", 1),
            createBaseVNode("span", _hoisted_30$1, "(" + toDisplayString(pathPairs.value.length) + "/100)", 1)
          ], 10, _hoisted_29$1),
          createBaseVNode("details", _hoisted_31$1, [
            createBaseVNode("summary", {
              class: normalizeClass(["flex items-center gap-2 text-sm cursor-pointer select-none py-2", __props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"])
            }, [
              createVNode(unref(IconChevronRight), {
                size: "sm",
                class: "transition-transform details-chevron"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.advancedOptions", "高级选项")), 1)
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["mt-3 p-4 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-6", __props.darkMode ? "bg-gray-800/30 border-gray-700" : "bg-gray-50 border-gray-200"])
            }, [
              createBaseVNode("label", _hoisted_32$1, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => options.value.skipExisting = $event),
                  type: "checkbox",
                  class: "mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                }, null, 512), [
                  [vModelCheckbox, options.value.skipExisting]
                ]),
                createBaseVNode("div", _hoisted_33$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.skipExisting", "跳过已存在文件")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.skipExistingHint", "启用后仅复制目标位置不存在的文件（增量同步）")), 3)
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.maxConcurrency", "复制并发数")), 3),
                createBaseVNode("div", _hoisted_34$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => options.value.maxConcurrency = $event),
                    type: "range",
                    min: "1",
                    max: "32",
                    class: normalizeClass(["flex-1 h-1.5 rounded-full appearance-none cursor-pointer", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                  }, null, 2), [
                    [
                      vModelText,
                      options.value.maxConcurrency,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => options.value.maxConcurrency = $event),
                    type: "number",
                    min: "1",
                    max: "32",
                    class: normalizeClass(["w-14 px-2 py-1 rounded text-sm text-center border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"])
                  }, null, 2), [
                    [
                      vModelText,
                      options.value.maxConcurrency,
                      void 0,
                      { number: true }
                    ]
                  ])
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, toDisplayString(_ctx.$t("admin.scheduledJobs.syncTask.concurrencyHint", "Workers 环境建议使用 1")), 3)
              ])
            ], 2)
          ])
        ])
      ]);
    };
  }
};
const SyncTaskConfigForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-33607651"]]);
const _hoisted_1$1 = { class: "scheduled-job-form flex-1 flex flex-col min-h-0" };
const _hoisted_2$1 = { class: "flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto pb-4" };
const _hoisted_3$1 = { class: "grid grid-cols-1 lg:grid-cols-3 gap-4" };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { class: "p-4 space-y-4" };
const _hoisted_6 = { value: "" };
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_9 = { class: "p-4 space-y-4" };
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = { key: 1 };
const _hoisted_13 = { class: "p-4 space-y-4" };
const _hoisted_14 = { class: "flex gap-2" };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { class: "flex gap-2" };
const _hoisted_17 = ["value"];
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "flex items-center justify-between pt-2" };
const _hoisted_20 = ["aria-checked"];
const _hoisted_21 = { key: 1 };
const _hoisted_22 = { class: "flex-1 overflow-y-auto p-4" };
const _hoisted_23 = {
  key: 0,
  class: "h-full flex flex-col items-center justify-center text-center py-12"
};
const _hoisted_24 = {
  key: 2,
  class: "space-y-4"
};
const _hoisted_25 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-12 text-center"
};
const _hoisted_26 = {
  key: 3,
  class: "h-full flex flex-col"
};
const _hoisted_27 = ["placeholder"];
const _hoisted_28 = {
  key: 0,
  class: "mt-2 text-xs text-red-500"
};
const _hoisted_29 = { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" };
const _hoisted_30 = { class: "flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto" };
const _hoisted_31 = { class: "flex items-center gap-1 sm:gap-1.5 flex-shrink-0" };
const _hoisted_32 = { class: "flex items-center gap-1 sm:gap-1.5 flex-shrink-0" };
const _hoisted_33 = { class: "flex items-center gap-1 sm:gap-1.5 flex-shrink-0" };
const _hoisted_34 = { class: "flex gap-2 sm:gap-3" };
const _hoisted_35 = ["disabled"];
const _sfc_main$1 = {
  __name: "ScheduledJobFormContent",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    job: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    handlerTypes: {
      type: Array,
      default: () => []
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t, tm, locale } = useI18n();
    createLogger("ScheduledJobFormContent");
    ref(false);
    const error = ref("");
    const configMode = ref("form");
    const formData = ref({
      taskId: "",
      handlerId: "",
      name: "",
      description: "",
      scheduleType: "interval",
      intervalSec: 3600,
      cronExpression: "",
      enabled: true,
      config: {}
    });
    const intervalValue = ref(1);
    const intervalUnit = ref(3600);
    const configText = ref("{}");
    const configError = ref("");
    const configPlaceholder = computed(() => {
      const message = tm("admin.scheduledJobs.form.configPlaceholder");
      return typeof message === "string" ? message : '{\n  "key": "value"\n}';
    });
    const timeUnits = [
      { value: 60, label: "minutes" },
      { value: 3600, label: "hours" },
      { value: 86400, label: "days" }
    ];
    const currentHandlerType = computed(() => {
      if (!formData.value.handlerId) return null;
      return props.handlerTypes.find((h) => h.id === formData.value.handlerId) || null;
    });
    const getCategoryClass = (category) => {
      if (category === "maintenance") {
        return props.darkMode ? "bg-blue-900/40 text-blue-300" : "bg-blue-100 text-blue-700";
      }
      return props.darkMode ? "bg-purple-900/40 text-purple-300" : "bg-purple-100 text-purple-700";
    };
    const getCategoryLabel = (category) => {
      return category === "maintenance" ? t("admin.scheduledJobs.handlerType.category.maintenance") : t("admin.scheduledJobs.handlerType.category.business");
    };
    watch([intervalValue, intervalUnit], ([value, unit]) => {
      formData.value.intervalSec = value * unit;
    });
    watch(configText, (newVal) => {
      if (configMode.value !== "json") return;
      try {
        if (!newVal.trim()) {
          formData.value.config = {};
          configError.value = "";
          return;
        }
        formData.value.config = JSON.parse(newVal);
        configError.value = "";
      } catch (e) {
        configError.value = t("admin.scheduledJobs.validation.configInvalidJson");
      }
    });
    watch(
      () => formData.value.config,
      (newConfig) => {
        if (configMode.value !== "form") return;
        configText.value = JSON.stringify(newConfig || {}, null, 2);
      },
      { deep: true }
    );
    const resetForm = () => {
      formData.value = {
        taskId: "",
        handlerId: "",
        name: "",
        description: "",
        scheduleType: "interval",
        intervalSec: 3600,
        cronExpression: "",
        enabled: true,
        config: {}
      };
      intervalValue.value = 1;
      intervalUnit.value = 3600;
      configText.value = "{}";
      configError.value = "";
      configMode.value = "form";
      error.value = "";
    };
    watch(configMode, (newMode) => {
      if (newMode === "json") {
        configText.value = JSON.stringify(formData.value.config || {}, null, 2);
      } else {
        try {
          formData.value.config = JSON.parse(configText.value || "{}");
          configError.value = "";
        } catch (e) {
        }
      }
    });
    watch(
      () => props.job,
      (newJob) => {
        if (newJob) {
          formData.value = {
            taskId: newJob.taskId,
            handlerId: newJob.handlerId,
            name: newJob.name || "",
            description: newJob.description || "",
            scheduleType: newJob.scheduleType || "interval",
            intervalSec: newJob.intervalSec,
            cronExpression: newJob.cronExpression || "",
            enabled: newJob.enabled,
            config: newJob.config || {}
          };
          const sec = newJob.intervalSec;
          if (sec % 86400 === 0) {
            intervalValue.value = sec / 86400;
            intervalUnit.value = 86400;
          } else if (sec % 3600 === 0) {
            intervalValue.value = sec / 3600;
            intervalUnit.value = 3600;
          } else if (sec % 60 === 0) {
            intervalValue.value = sec / 60;
            intervalUnit.value = 60;
          } else {
            intervalValue.value = Math.ceil(sec / 60);
            intervalUnit.value = 60;
          }
          configText.value = JSON.stringify(newJob.config || {}, null, 2);
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );
    watch(() => formData.value.handlerId, (newHandlerId) => {
      if (!newHandlerId || props.isEdit) return;
      const handler = props.handlerTypes.find((h) => h.id === newHandlerId);
      if (!handler) return;
      const schema = handler.configSchema || [];
      const config = {};
      for (const field of schema) {
        if (field.defaultValue !== void 0) {
          config[field.name] = field.defaultValue;
        }
      }
      formData.value.config = config;
      configText.value = JSON.stringify(config, null, 2);
    });
    const handlerValid = computed(() => !!formData.value.handlerId && !!currentHandlerType.value);
    const configValid = computed(() => {
      if (configError.value) return false;
      if (formData.value.handlerId === "scheduled_sync_copy") {
        const config = formData.value.config || {};
        if (Array.isArray(config.pairs) && config.pairs.length > 0) {
          const hasValidPair = config.pairs.some(
            (pair) => pair && typeof pair.sourcePath === "string" && typeof pair.targetPath === "string" && pair.sourcePath.trim() && pair.targetPath.trim()
          );
          return hasValidPair;
        }
        if (typeof config.sourcePath === "string" && typeof config.targetPath === "string" && config.sourcePath.trim() && config.targetPath.trim()) {
          return true;
        }
        return false;
      }
      const schema = currentHandlerType.value?.configSchema || [];
      for (const field of schema) {
        if (field.required) {
          const value = formData.value.config[field.name];
          if (value === void 0 || value === null || value === "") {
            return false;
          }
        }
      }
      return true;
    });
    const scheduleValid = computed(() => {
      const type = formData.value.scheduleType || "interval";
      if (type === "interval") {
        return Number(formData.value.intervalSec) >= 60;
      }
      if (type === "cron") {
        return !!formData.value.cronExpression;
      }
      return false;
    });
    const cronHint = computed(() => {
      const expr = (formData.value.cronExpression || "").trim();
      if (!expr) {
        return t("admin.scheduledJobs.form.cronExample");
      }
      try {
        const currentLocale = (locale.value || "zh-CN").toLowerCase();
        const cronLocale = currentLocale.startsWith("zh") ? "zh_CN" : "en";
        return cronstrue.toString(expr, {
          locale: cronLocale,
          use24HourTimeFormat: true
        });
      } catch (e) {
        return t("admin.scheduledJobs.form.cronExample");
      }
    });
    const formValid = computed(() => {
      return handlerValid.value && configValid.value && scheduleValid.value;
    });
    const updateConfigField = (fieldName, value) => {
      formData.value.config = {
        ...formData.value.config,
        [fieldName]: value
      };
    };
    const handleSubmit = () => {
      if (!formValid.value || configError.value) {
        return;
      }
      const payload = {
        handlerId: formData.value.handlerId,
        name: formData.value.name,
        description: formData.value.description,
        scheduleType: formData.value.scheduleType,
        intervalSec: formData.value.scheduleType === "interval" ? formData.value.intervalSec : void 0,
        cronExpression: formData.value.scheduleType === "cron" ? formData.value.cronExpression : void 0,
        enabled: formData.value.enabled,
        config: formData.value.config
      };
      if (props.isEdit) {
        payload.taskId = formData.value.taskId;
      }
      emit("submit", payload);
    };
    const handleCancel = () => {
      emit("cancel");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        error.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mb-4 p-3 rounded-md text-sm font-medium", __props.darkMode ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"])
        }, toDisplayString(error.value), 3)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("section", {
              class: normalizeClass(["rounded-lg border", __props.darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["px-4 py-3 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-semibold flex items-center gap-2", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", handlerValid.value ? "bg-green-500 text-white" : __props.darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"])
                  }, [
                    handlerValid.value ? (openBlock(), createBlock(unref(IconCheck), {
                      key: 0,
                      size: "sm"
                    })) : (openBlock(), createElementBlock("span", _hoisted_4, "1"))
                  ], 2),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.handlerType.title")), 1)
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, [
                    createTextVNode(toDisplayString(unref(t)("admin.scheduledJobs.handlerType.select")) + " ", 1),
                    _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                  ], 2),
                  __props.isEdit ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["px-3 py-2 rounded-md text-sm border", __props.darkMode ? "bg-gray-700/50 border-gray-600 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"])
                  }, toDisplayString(currentHandlerType.value?.name || formData.value.handlerId), 3)) : withDirectives((openBlock(), createElementBlock("select", {
                    key: 1,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.handlerId = $event),
                    class: normalizeClass(["w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"])
                  }, [
                    createBaseVNode("option", _hoisted_6, toDisplayString(unref(t)("admin.scheduledJobs.handlerType.selectPlaceholder")), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.handlerTypes, (handler) => {
                      return openBlock(), createElementBlock("option", {
                        key: handler.id,
                        value: handler.id
                      }, toDisplayString(handler.name), 9, _hoisted_7);
                    }), 128))
                  ], 2)), [
                    [vModelSelect, formData.value.handlerId]
                  ])
                ]),
                currentHandlerType.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["p-3 rounded-md", __props.darkMode ? "bg-gray-700/30" : "bg-gray-50"])
                }, [
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("span", {
                      class: normalizeClass(["text-xs px-2 py-0.5 rounded-full font-medium", getCategoryClass(currentHandlerType.value.category)])
                    }, toDisplayString(getCategoryLabel(currentHandlerType.value.category)), 3)
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm leading-relaxed", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(currentHandlerType.value.description), 3)
                ], 2)) : createCommentVNode("", true)
              ])
            ], 2),
            createBaseVNode("section", {
              class: normalizeClass(["rounded-lg border", __props.darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["px-4 py-3 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-semibold flex items-center gap-2", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                }, [
                  createVNode(unref(IconInformationCircle), {
                    size: "sm",
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                  }, null, 8, ["class"]),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.form.name")) + " & " + toDisplayString(unref(t)("admin.scheduledJobs.form.description")), 1)
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.name")), 3),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.name = $event),
                    type: "text",
                    placeholder: unref(t)("admin.scheduledJobs.form.namePlaceholder"),
                    class: normalizeClass(["w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"])
                  }, null, 10, _hoisted_10), [
                    [vModelText, formData.value.name]
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.nameHint")), 3)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.description")), 3),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.description = $event),
                    rows: "3",
                    placeholder: unref(t)("admin.scheduledJobs.form.descriptionPlaceholder"),
                    class: normalizeClass(["w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"])
                  }, null, 10, _hoisted_11), [
                    [vModelText, formData.value.description]
                  ])
                ])
              ])
            ], 2),
            createBaseVNode("section", {
              class: normalizeClass(["rounded-lg border", __props.darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["px-4 py-3 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-semibold flex items-center gap-2", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", scheduleValid.value ? "bg-green-500 text-white" : __props.darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"])
                  }, [
                    scheduleValid.value ? (openBlock(), createBlock(unref(IconCheck), {
                      key: 0,
                      size: "sm"
                    })) : (openBlock(), createElementBlock("span", _hoisted_12, "3"))
                  ], 2),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.form.step3Title")), 1)
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.scheduleType")), 3),
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[3] || (_cache[3] = ($event) => formData.value.scheduleType = "interval"),
                      class: normalizeClass(["flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors border", formData.value.scheduleType === "interval" ? "bg-primary-500 text-white border-primary-500" : __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"])
                    }, toDisplayString(unref(t)("admin.scheduledJobs.form.scheduleTypeInterval")), 3),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[4] || (_cache[4] = ($event) => formData.value.scheduleType = "cron"),
                      class: normalizeClass(["flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors border", formData.value.scheduleType === "cron" ? "bg-primary-500 text-white border-primary-500" : __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"])
                    }, toDisplayString(unref(t)("admin.scheduledJobs.form.scheduleTypeCron")), 3)
                  ])
                ]),
                formData.value.scheduleType === "interval" ? (openBlock(), createElementBlock("div", _hoisted_15, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, [
                    createTextVNode(toDisplayString(unref(t)("admin.scheduledJobs.form.intervalSec")) + " ", 1),
                    _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                  ], 2),
                  createBaseVNode("div", _hoisted_16, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => intervalValue.value = $event),
                      type: "number",
                      min: "1",
                      class: normalizeClass(["flex-1 px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"])
                    }, null, 2), [
                      [
                        vModelText,
                        intervalValue.value,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => intervalUnit.value = $event),
                      class: normalizeClass(["px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"])
                    }, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(timeUnits, (unit) => {
                        return createBaseVNode("option", {
                          key: unit.value,
                          value: unit.value
                        }, toDisplayString(unref(t)(`admin.scheduledJobs.timeUnit.${unit.label}`)), 9, _hoisted_17);
                      }), 64))
                    ], 2), [
                      [vModelSelect, intervalUnit.value]
                    ])
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.intervalHint")), 3)
                ])) : createCommentVNode("", true),
                formData.value.scheduleType === "cron" ? (openBlock(), createElementBlock("div", _hoisted_18, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, [
                    createTextVNode(" Cron " + toDisplayString(unref(t)("admin.scheduledJobs.form.scheduleTypeCron")) + " ", 1),
                    _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                  ], 2),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => formData.value.cronExpression = $event),
                    type: "text",
                    class: normalizeClass(["w-full px-3 py-2 rounded-md border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"]),
                    placeholder: "0 2 * * *"
                  }, null, 2), [
                    [vModelText, formData.value.cronExpression]
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(cronHint.value), 3)
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.enabledLabel")), 3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[8] || (_cache[8] = ($event) => formData.value.enabled = !formData.value.enabled),
                    class: normalizeClass(["relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2", [
                      formData.value.enabled ? "bg-primary-500" : __props.darkMode ? "bg-gray-600" : "bg-gray-300",
                      __props.darkMode ? "focus:ring-offset-gray-800" : ""
                    ]]),
                    role: "switch",
                    "aria-checked": formData.value.enabled
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", formData.value.enabled ? "translate-x-6" : "translate-x-1"])
                    }, null, 2)
                  ], 10, _hoisted_20)
                ])
              ])
            ], 2)
          ]),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-lg border flex-1 flex flex-col min-h-[400px]", __props.darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-4 py-3 border-b flex items-center justify-between flex-shrink-0", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-semibold flex items-center gap-2", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", configValid.value ? "bg-green-500 text-white" : __props.darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"])
                }, [
                  configValid.value ? (openBlock(), createBlock(unref(IconCheck), {
                    key: 0,
                    size: "sm"
                  })) : (openBlock(), createElementBlock("span", _hoisted_21, "2"))
                ], 2),
                createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.form.configParams")), 1)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["flex rounded-md overflow-hidden border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
              }, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[9] || (_cache[9] = ($event) => configMode.value = "form"),
                  class: normalizeClass(["px-3 py-1 text-xs font-medium transition", configMode.value === "form" ? "bg-primary-500 text-white" : __props.darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.form.modeForm")), 3),
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[10] || (_cache[10] = ($event) => configMode.value = "json"),
                  class: normalizeClass(["px-3 py-1 text-xs font-medium transition", configMode.value === "json" ? "bg-primary-500 text-white" : __props.darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.form.modeJson")), 3)
              ], 2)
            ], 2),
            createBaseVNode("div", _hoisted_22, [
              !formData.value.handlerId ? (openBlock(), createElementBlock("div", _hoisted_23, [
                createVNode(unref(IconTaskList), {
                  size: "4xl",
                  class: normalizeClass(["mb-4", __props.darkMode ? "text-gray-600" : "text-gray-300"])
                }, null, 8, ["class"]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.handlerType.selectPlaceholder")), 3)
              ])) : configMode.value === "form" && formData.value.handlerId === "scheduled_sync_copy" ? (openBlock(), createBlock(SyncTaskConfigForm, {
                key: 1,
                modelValue: formData.value.config,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => formData.value.config = $event),
                "dark-mode": __props.darkMode
              }, null, 8, ["modelValue", "dark-mode"])) : configMode.value === "form" ? (openBlock(), createElementBlock("div", _hoisted_24, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(currentHandlerType.value?.configSchema || [], (field) => {
                  return openBlock(), createBlock(_sfc_main$5, {
                    key: field.name,
                    field,
                    "model-value": formData.value.config[field.name],
                    "dark-mode": __props.darkMode,
                    "onUpdate:modelValue": ($event) => updateConfigField(field.name, $event)
                  }, null, 8, ["field", "model-value", "dark-mode", "onUpdate:modelValue"]);
                }), 128)),
                !currentHandlerType.value?.configSchema?.length ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  createVNode(unref(IconCheckCircle), {
                    size: "3xl",
                    class: normalizeClass(["mb-3", __props.darkMode ? "text-gray-600" : "text-gray-300"])
                  }, null, 8, ["class"]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.form.noConfigParams")), 3)
                ])) : createCommentVNode("", true)
              ])) : (openBlock(), createElementBlock("div", _hoisted_26, [
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => configText.value = $event),
                  class: normalizeClass(["flex-1 w-full px-3 py-2 rounded-md border text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[300px]", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"]),
                  placeholder: configPlaceholder.value
                }, null, 10, _hoisted_27), [
                  [vModelText, configText.value]
                ]),
                configError.value ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(configError.value), 1)) : createCommentVNode("", true)
              ]))
            ])
          ], 2)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["flex-shrink-0 mt-4 pt-4 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_29, [
            createBaseVNode("div", _hoisted_30, [
              createBaseVNode("div", _hoisted_31, [
                createBaseVNode("span", {
                  class: normalizeClass(["w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full", handlerValid.value ? "bg-green-500" : "bg-gray-400"])
                }, null, 2),
                createBaseVNode("span", {
                  class: normalizeClass([__props.darkMode ? "text-gray-400" : "text-gray-500", "whitespace-nowrap"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.handlerType.title")), 3)
              ]),
              createBaseVNode("div", _hoisted_32, [
                createBaseVNode("span", {
                  class: normalizeClass(["w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full", configValid.value ? "bg-green-500" : "bg-gray-400"])
                }, null, 2),
                createBaseVNode("span", {
                  class: normalizeClass([__props.darkMode ? "text-gray-400" : "text-gray-500", "whitespace-nowrap"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.form.configParams")), 3)
              ]),
              createBaseVNode("div", _hoisted_33, [
                createBaseVNode("span", {
                  class: normalizeClass(["w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full", scheduleValid.value ? "bg-green-500" : "bg-gray-400"])
                }, null, 2),
                createBaseVNode("span", {
                  class: normalizeClass([__props.darkMode ? "text-gray-400" : "text-gray-500", "whitespace-nowrap"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.form.step3Title")), 3)
              ])
            ]),
            createBaseVNode("div", _hoisted_34, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleCancel,
                class: normalizeClass(["flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition border", __props.darkMode ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200" : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"])
              }, toDisplayString(unref(t)("admin.scheduledJobs.form.cancel")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: handleSubmit,
                disabled: !formValid.value || __props.submitting,
                class: "flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              }, [
                __props.submitting ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(__props.isEdit ? unref(t)("admin.scheduledJobs.form.save") : unref(t)("admin.scheduledJobs.form.create")), 1)
              ], 8, _hoisted_35)
            ])
          ])
        ], 2)
      ]);
    };
  }
};
const ScheduledJobFormContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a2228af1"]]);
const _hoisted_1 = { class: "p-4 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4" };
const _hoisted_3 = { class: "text-red-500 mb-4" };
const _sfc_main = {
  __name: "ScheduledJobFormView",
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const log = createLogger("ScheduledJobFormView");
    const { isDarkMode: darkMode } = useThemeMode();
    const { createJob, updateJob, loadHandlerTypes, handlerTypes, jobs, loadJobs } = useScheduledJobs();
    const taskId = computed(() => route.params.id);
    const isEdit = computed(() => !!taskId.value);
    const job = ref(null);
    const loading = ref(false);
    const submitting = ref(false);
    const error = ref("");
    const pageTitle = computed(
      () => isEdit.value ? t("admin.scheduledJobs.form.editTitle") : t("admin.scheduledJobs.form.createTitle")
    );
    onMounted(async () => {
      if (isEdit.value) {
        loading.value = true;
        try {
          await Promise.all([loadHandlerTypes(), loadJobs()]);
          job.value = jobs.value.find((j) => j.taskId === taskId.value);
          if (!job.value) {
            error.value = t("admin.scheduledJobs.errors.jobNotFound");
          }
        } catch (err) {
          log.error("加载任务失败:", err);
          error.value = err.message || t("admin.scheduledJobs.errors.loadFailed");
        } finally {
          loading.value = false;
        }
      } else {
        await loadHandlerTypes();
      }
    });
    const handleSubmit = async (formData) => {
      submitting.value = true;
      error.value = "";
      try {
        if (isEdit.value) {
          await updateJob(taskId.value, formData);
        } else {
          await createJob(formData);
        }
        router.push({ name: "AdminScheduledJobs" });
      } catch (err) {
        log.error(isEdit.value ? "更新定时任务失败:" : "创建定时任务失败:", err);
        error.value = err.message || t(
          isEdit.value ? "admin.scheduledJobs.updateFailed" : "admin.scheduledJobs.createFailed"
        );
        submitting.value = false;
      }
    };
    const handleCancel = () => {
      router.push({ name: "AdminScheduledJobs" });
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("nav", {
              class: normalizeClass(["text-sm flex items-center mb-2", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, [
              createVNode(_component_router_link, {
                to: { name: "AdminScheduledJobs" },
                class: "hover:text-primary-500 transition flex items-center gap-1"
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconClock), { size: "sm" }),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.title")), 1)
                ]),
                _: 1
              }),
              createVNode(unref(IconChevronRight), {
                size: "sm",
                class: "mx-2"
              }),
              createBaseVNode("span", {
                class: normalizeClass(unref(darkMode) ? "text-gray-200" : "text-gray-700")
              }, toDisplayString(pageTitle.value), 3)
            ], 2),
            createBaseVNode("h1", {
              class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(pageTitle.value), 3),
            isEdit.value && job.value ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["mt-1 text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(job.value.name || job.value.taskId), 3)) : createCommentVNode("", true)
          ]),
          createBaseVNode("button", {
            onClick: handleCancel,
            class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow flex items-center gap-1.5", unref(darkMode) ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"])
          }, [
            createVNode(unref(IconBack), { size: "sm" }),
            createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.form.backToList")), 1)
          ], 2)
        ]),
        isEdit.value && loading.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["flex flex-col justify-center items-center h-60 rounded-lg", unref(darkMode) ? "bg-gray-800" : "bg-gray-50"])
        }, [
          createVNode(unref(IconRefresh), {
            size: "2xl",
            class: "animate-spin text-primary-500 mb-4"
          }),
          createBaseVNode("p", {
            class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("common.loading", "加载中...")), 3)
        ], 2)) : isEdit.value && error.value && !job.value && !loading.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["flex-1 flex flex-col justify-center items-center p-8 rounded-lg", unref(darkMode) ? "bg-gray-800" : "bg-white"])
        }, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(IconInformationCircle), { size: "4xl" })
          ]),
          createBaseVNode("p", {
            class: normalizeClass(["text-lg font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-900"])
          }, toDisplayString(error.value), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-sm mb-6", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("admin.scheduledJobs.errors.jobNotFoundHint", "请检查任务ID是否正确，或返回列表重新选择")), 3),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push({ name: "AdminScheduledJobs" })),
            class: "px-6 py-2.5 rounded-md text-sm font-medium transition bg-primary-500 hover:bg-primary-600 text-white inline-flex items-center gap-2"
          }, [
            createVNode(unref(IconBack), { size: "sm" }),
            createTextVNode(" " + toDisplayString(unref(t)("common.backToList", "返回列表")), 1)
          ])
        ], 2)) : !isEdit.value || job.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          error.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mb-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2", unref(darkMode) ? "bg-red-900/30 text-red-300 border border-red-800" : "bg-red-50 text-red-700 border border-red-200"])
          }, [
            createVNode(unref(IconInformationCircle), {
              size: "md",
              class: "flex-shrink-0"
            }),
            createTextVNode(" " + toDisplayString(error.value), 1)
          ], 2)) : createCommentVNode("", true),
          createVNode(ScheduledJobFormContent, {
            "dark-mode": unref(darkMode),
            job: job.value,
            "handler-types": unref(handlerTypes),
            "is-edit": isEdit.value,
            submitting: submitting.value,
            onSubmit: handleSubmit,
            onCancel: handleCancel
          }, null, 8, ["dark-mode", "job", "handler-types", "is-edit", "submitting"])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
export {
  _sfc_main as default
};
