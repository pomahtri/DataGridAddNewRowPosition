/**
* DevExtreme (esm/viz/axes/tick.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { Deferred } from '../../core/utils/deferred';

function getPathStyle(options) {
  return {
    stroke: options.color,
    'stroke-width': options.width,
    'stroke-opacity': options.opacity,
    opacity: 1
  };
}

function createTick(axis, renderer, tickOptions, gridOptions, skippedCategory, skipLabels, offset) {
  var tickOffset = offset || axis._tickOffset;
  var lineGroup = axis._axisLineGroup;
  var elementsGroup = axis._axisElementsGroup;
  var tickStyle = getPathStyle(tickOptions);
  var gridStyle = getPathStyle(gridOptions);
  var emptyStrRegExp = /^\s+$/;
  var axisOptions = axis.getOptions();
  var labelOptions = axisOptions.label;
  var labelStyle = axis._textOptions;

  function getLabelFontStyle(tick) {
    var fontStyle = axis._textFontStyles;
    var customizeColor = labelOptions.customizeColor;

    if (customizeColor && customizeColor.call) {
      fontStyle = extend({}, axis._textFontStyles, {
        fill: customizeColor.call(tick, tick)
      });
    }

    return fontStyle;
  }

  function createLabelHint(tick, range) {
    var labelHint = axis.formatHint(tick.value, labelOptions, range);

    if (isDefined(labelHint) && labelHint !== '') {
      tick.getContentContainer().setTitle(labelHint);
    }
  }

  return function (value) {
    var tick = {
      value: value,

      updateValue(newValue) {
        this.value = value = newValue;
      },

      initCoords: function initCoords() {
        this.coords = axis._getTranslatedValue(value, tickOffset);
        this.labelCoords = axis._getTranslatedValue(value);
      },

      saveCoords() {
        this._lastStoredCoordinates = {
          coords: this._storedCoords,
          labelCoords: this._storedLabelsCoords
        };
        this._storedCoords = this.coords;
        this._storedLabelsCoords = this.templateContainer ? this._getTemplateCoords() : this.labelCoords;
      },

      resetCoordinates() {
        if (this._lastStoredCoordinates) {
          this._storedCoords = this._lastStoredCoordinates.coords;
          this._storedLabelsCoords = this._lastStoredCoordinates.labelCoords;
        }
      },

      drawMark(options) {
        if (!tickOptions.visible || skippedCategory === value) {
          return;
        }

        if (axis.areCoordsOutsideAxis(this.coords)) {
          return;
        }

        if (this.mark) {
          this.mark.append(lineGroup);
          axis.sharp(this.mark, axis.getSharpDirectionByCoords(this.coords));
          this.updateTickPosition(options);
        } else {
          this.mark = axis._createPathElement([], tickStyle, axis.getSharpDirectionByCoords(this.coords)).append(lineGroup);
          this.updateTickPosition(options);
        }
      },

      setSkippedCategory(category) {
        skippedCategory = category;
      },

      _updateLine(lineElement, settings, storedSettings, animate, isGridLine) {
        if (!lineElement) {
          return;
        }

        if (settings.points === null || settings.r === null) {
          lineElement.remove();
          return;
        }

        if (animate && storedSettings && storedSettings.points !== null) {
          settings.opacity = 1;
          lineElement.attr(storedSettings);
          lineElement.animate(settings);
        } else {
          settings.opacity = animate ? 0 : 1;
          lineElement.attr(settings);
          animate && lineElement.animate({
            opacity: 1
          }, {
            delay: 0.5,
            partitionDuration: 0.5
          });
        }

        this.coords.angle && axis._rotateTick(lineElement, this.coords, isGridLine);
      },

      updateTickPosition: function updateTickPosition(options, animate) {
        this._updateLine(this.mark, {
          points: axis._getTickMarkPoints(tick.coords, tickOptions.length, options)
        }, this._storedCoords && {
          points: axis._getTickMarkPoints(tick._storedCoords, tickOptions.length, options)
        }, animate, false);
      },
      drawLabel: function drawLabel(range, template) {
        if (this.templateContainer && axis.isRendered()) {
          this.updateLabelPosition();
          return;
        }

        var labelIsVisible = labelOptions.visible && !skipLabels && !axis.getTranslator().getBusinessRange().isEmpty() && !axis.areCoordsOutsideAxis(this.labelCoords);

        if (!labelIsVisible) {
          if (this.label) {
            this.removeLabel();
          }

          return;
        }

        var templateOption = labelOptions.template;
        var text = axis.formatLabel(value, labelOptions, range);

        if (this.label) {
          this.label.attr({
            text,
            rotate: 0
          }).append(elementsGroup);
          createLabelHint(this, range);
          this.updateLabelPosition();
          return;
        }

        if (templateOption) {
          this.templateContainer = renderer.g().append(elementsGroup);
          this._templateDef && this._templateDef.reject();
          this._templateDef = new Deferred();
          template.render({
            model: {
              valueText: text,
              value: this.value,
              labelFontStyle: getLabelFontStyle(this),
              labelStyle
            },
            container: this.templateContainer.element,
            onRendered: () => {
              this.updateLabelPosition();
              this._templateDef && this._templateDef.resolve();
            }
          });
        } else {
          if (isDefined(text) && text !== '' && !emptyStrRegExp.test(text)) {
            this.label = renderer.text(text).css(getLabelFontStyle(this)).attr(labelStyle).append(elementsGroup);
            this.updateLabelPosition();
            createLabelHint(this, range);
          }
        }

        var containerForData = this.getContentContainer();
        containerForData && containerForData.data('chart-data-argument', this.value);
        this.templateContainer && createLabelHint(this, range);
      },

      getTemplateDeferred() {
        return this._templateDef;
      },

      getContentContainer() {
        return this.templateContainer || this.label;
      },

      fadeOutElements() {
        var startSettings = {
          opacity: 1
        };
        var endSettings = {
          opacity: 0
        };
        var animationSettings = {
          partitionDuration: 0.5
        };

        if (this.getContentContainer()) {
          this._fadeOutLabel();
        }

        if (this.grid) {
          this.grid.append(axis._axisGridGroup).attr(startSettings).animate(endSettings, animationSettings);
        }

        if (this.mark) {
          this.mark.append(axis._axisLineGroup).attr(startSettings).animate(endSettings, animationSettings);
        }
      },

      _fadeInLabel() {
        var group = axis._renderer.g().attr({
          opacity: 0
        }).append(axis._axisElementsGroup).animate({
          opacity: 1
        }, {
          delay: 0.5,
          partitionDuration: 0.5
        });

        this.getContentContainer().append(group);
      },

      _fadeOutLabel() {
        var group = axis._renderer.g().attr({
          opacity: 1
        }).animate({
          opacity: 0
        }, {
          partitionDuration: 0.5
        }).append(axis._axisElementsGroup).toBackground();

        this.getContentContainer().append(group);
      },

      _getTemplateCoords() {
        return axis._getLabelAdjustedCoord(this, (axis._constantLabelOffset || 0) + (tick.labelOffset || 0));
      },

      updateLabelPosition: function updateLabelPosition(animate) {
        var templateContainer = this.templateContainer;

        if (!this.getContentContainer()) {
          return;
        }

        if (animate && this._storedLabelsCoords) {
          if (templateContainer) {
            templateContainer.attr(this._storedLabelsCoords);

            var lCoords = this._getTemplateCoords();

            templateContainer.animate(lCoords);
          } else {
            this.label.attr({
              x: this._storedLabelsCoords.x,
              y: this._storedLabelsCoords.y
            });
            this.label.animate({
              x: this.labelCoords.x,
              y: this.labelCoords.y
            });
          }
        } else {
          if (templateContainer) {
            var _lCoords = this._getTemplateCoords();

            templateContainer.attr(_lCoords);
          } else {
            this.label.attr({
              x: this.labelCoords.x,
              y: this.labelCoords.y
            });
          }

          if (animate) {
            this._fadeInLabel();
          }
        }
      },

      updateMultilineTextAlignment() {
        if (labelOptions.template || !this.label) {
          return;
        }

        this.label.attr({
          textsAlignment: this.labelAlignment || axis.getOptions().label.alignment
        });
      },

      drawGrid: function drawGrid(drawLine) {
        if (gridOptions.visible && skippedCategory !== this.value) {
          if (this.grid) {
            this.grid.append(axis._axisGridGroup);
            axis.sharp(this.grid, axis.getSharpDirectionByCoords(this.coords));
            this.updateGridPosition();
          } else {
            this.grid = drawLine(this, gridStyle);
            this.grid && this.grid.append(axis._axisGridGroup);
          }
        }
      },
      updateGridPosition: function updateGridPosition(animate) {
        this._updateLine(this.grid, axis._getGridPoints(tick.coords), this._storedCoords && axis._getGridPoints(this._storedCoords), animate, true);
      },

      removeLabel() {
        var contentContainer = this.getContentContainer();
        contentContainer && contentContainer.remove();
        this._templateDef && this._templateDef.reject();
        this._templateDef = this.templateContainer = this.label = null;
      }

    };
    return tick;
  };
}

export { createTick as tick };
