(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["/app"],{

/***/ "./resources/js/components/basictable.js":
/*!***********************************************!*\
  !*** ./resources/js/components/basictable.js ***!
  \***********************************************/
/***/ (() => {

/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */
(function ($) {
  $.fn.basictable = function (options) {
    var setup = function setup(table, data) {
      var headings = [];

      if (data.tableWrap) {
        table.wrap('<div class="bt-wrapper"></div>');
      } // Table Header


      if (data.header) {
        var format = '';

        if (table.find('thead tr th').length) {
          format = 'thead th';
        } else if (table.find('tbody tr th').length) {
          format = 'tbody tr th';
        } else if (table.find('th').length) {
          format = 'tr:first th';
        } else {
          format = 'tr:first td';
        }

        $.each(table.find(format), function () {
          var $heading = $(this);
          var colspan = parseInt($heading.attr('colspan'), 10) || 1;
          var row = $heading.closest('tr').index();

          if (!headings[row]) {
            headings[row] = [];
          }

          for (var i = 0; i < colspan; i++) {
            headings[row].push($heading);
          }
        });
      } // Table Body


      $.each(table.find('tbody tr'), function () {
        setupRow($(this), headings, data);
      }); // Table Footer

      $.each(table.find('tfoot tr'), function () {
        setupRow($(this), headings, data);
      });
    };

    var setupRow = function setupRow($row, headings, data) {
      $row.children().each(function () {
        var $cell = $(this);

        if (($cell.html() === '' || $cell.html() === '&nbsp;') && !data.showEmptyCells) {
          $cell.addClass('bt-hide');
        } else {
          var cellIndex = $cell.index();
          var headingText = '';

          for (var j = 0; j < headings.length; j++) {
            if (j != 0) {
              headingText += ': ';
            }

            var $heading = headings[j][cellIndex];
            headingText += $heading.text();
          }

          $cell.attr('data-th', headingText);

          if (data.contentWrap && !$cell.children().hasClass('bt-content')) {
            $cell.wrapInner('<span class="bt-content" />');
          }
        }
      });
    };

    var unwrap = function unwrap(table) {
      $.each(table.find('td'), function () {
        var $cell = $(this);
        var content = $cell.children('.bt-content').html();
        $cell.html(content);
      });
    };

    var check = function check(table, data) {
      // Only change when table is larger than parent if force
      // responsive is turned off.
      if (!data.forceResponsive) {
        if (table.removeClass('bt').outerWidth() > table.parent().width()) {
          start(table, data);
        } else {
          end(table, data);
        }
      } else {
        if (data.breakpoint !== null && $(window).width() <= data.breakpoint || data.containerBreakpoint !== null && table.parent().width() <= data.containerBreakpoint) {
          start(table, data);
        } else {
          end(table, data);
        }
      }
    };

    var start = function start(table, data) {
      table.addClass('bt');

      if (!data.header) {
        table.addClass('bt--no-header');
      }

      if (data.tableWrap) {
        table.parent('.bt-wrapper').addClass('active');
      }
    };

    var end = function end(table, data) {
      table.removeClass('bt bt--no-header');

      if (data.tableWrap) {
        table.parent('.bt-wrapper').removeClass('active');
      }
    };

    var destroy = function destroy(table, data) {
      table.removeClass('bt bt--no-header');
      table.find('td').removeAttr('data-th');

      if (data.tableWrap) {
        table.unwrap();
      }

      if (data.contentWrap) {
        unwrap(table);
      }

      table.removeData('basictable');
    };

    var resize = function resize(table) {
      if (table.data('basictable')) {
        check(table, table.data('basictable'));
      }
    }; // Get table.


    this.each(function () {
      var table = $(this); // If table has already executed.

      if (table.length === 0 || table.data('basictable')) {
        if (table.data('basictable')) {
          var data = table.data('basictable'); // Destroy basic table.

          if (options === 'destroy') {
            destroy(table, data);
          } else if (options === 'restart') {
            destroy(table, data);
            table.data('basictable', data);
            setup(table, data);
            check(table, data);
          } // Start responsive mode.
          else if (options === 'start') {
            start(table, data);
          } else if (options === 'stop') {
            end(table, data);
          } else {
            check(table, data);
          }
        }

        return false;
      } // Extend Settings.


      var settings = $.extend({}, $.fn.basictable.defaults, options);
      var vars = {
        breakpoint: settings.breakpoint,
        containerBreakpoint: settings.containerBreakpoint,
        contentWrap: settings.contentWrap,
        forceResponsive: settings.forceResponsive,
        noResize: settings.noResize,
        tableWrap: settings.tableWrap,
        showEmptyCells: settings.showEmptyCells,
        header: settings.header
      }; // Maintain the original functionality/defaults

      if (vars.breakpoint === null && vars.containerBreakpoint === null) {
        vars.breakpoint = 568;
      } // Initiate


      table.data('basictable', vars);
      setup(table, table.data('basictable'));

      if (!vars.noResize) {
        check(table, table.data('basictable'));
        $(window).bind('resize.basictable', function () {
          resize(table);
        });
      }
    });
  };

  $.fn.basictable.defaults = {
    breakpoint: null,
    containerBreakpoint: null,
    contentWrap: true,
    forceResponsive: true,
    noResize: false,
    tableWrap: false,
    showEmptyCells: false,
    header: true
  };
})(jQuery);

/***/ }),

/***/ "./resources/js/components/fileuploader.js":
/*!*************************************************!*\
  !*** ./resources/js/components/fileuploader.js ***!
  \*************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Fileuploader
 * Copyright (c) 2019 Innostudio.de
 * Website: https://innostudio.de/fileuploader/
 * Version: 2.2 (01-Apr-2019)
 * License: https://innostudio.de/fileuploader/documentation/#license
 */
(function ($) {
  "use strict";

  $.fn.fileuploader = function (q) {
    return this.each(function (t, r) {
      var s = $(r),
          // input element
      p = null,
          // parent element
      o = null,
          // new input element
      l = null,
          // list element
      sl = [],
          // input elements !important for addMore option
      n = $.extend(true, {}, $.fn.fileuploader.defaults, q),
          // options
      f = {
        /**
         * init
         * initialize the plugin
         *
         * @void
         */
        init: function init() {
          // create and set the parent element
          if (!s.closest('.fileuploader').length) s.wrap('<div class="fileuploader"></div>');
          p = s.closest('.fileuploader'); // add, merge and apply input attributes with the options
          // also define the defaults for some options

          f.set('attrOpts'); // check if the plugin is supported in current browser

          if (!f.isSupported()) {
            n.onSupportError && $.isFunction(n.onSupportError) ? n.onSupportError(p, s) : null;
            return false;
          } // before render callback


          if (n.beforeRender && $.isFunction(n.beforeRender) && n.beforeRender(p, s) === false) {
            return false;
          } // redesign the new input


          f.redesign(); // append files from options

          if (n.files) f.files.append(n.files); // after render callback

          f.rendered = true;
          n.afterRender && $.isFunction(n.afterRender) ? n.afterRender(l, p, o, s) : null; // bind events

          if (!f.disabled) f.bindUnbindEvents(true);
        },

        /**
         * bindUnbindEvents
         * bind or unbind events for input and new elements
         *
         * @param {bool} bind - bind the events?
         * @void
         */
        bindUnbindEvents: function bindUnbindEvents(bind) {
          // unbind events
          if (bind) f.bindUnbindEvents(false); // bind all input events

          s[bind ? 'on' : 'off'](f._assets.getAllEvents(), f.onEvent); // bind click event for the new input

          if (n.changeInput && o !== s) o[bind ? 'on' : 'off']('click', f.clickHandler); // bind drag&drop events

          if (n.dragDrop && n.dragDrop.container.length) {
            n.dragDrop.container[bind ? 'on' : 'off']('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
              e.preventDefault();
            });
            n.dragDrop.container[bind ? 'on' : 'off']('drop', f.dragDrop.onDrop);
            n.dragDrop.container[bind ? 'on' : 'off']('dragover', f.dragDrop.onDragEnter);
            n.dragDrop.container[bind ? 'on' : 'off']('dragleave', f.dragDrop.onDragLeave);
          } // bind the paste from clipboard event


          if (f.isUploadMode() && n.clipboardPaste) $(window)[bind ? 'on' : 'off']('paste', f.clipboard.paste); // bind sorter events

          if (n.sorter && n.thumbnails && n.thumbnails._selectors.sorter) f.sorter[bind ? 'init' : 'destroy'](); // bind the form reset

          s.closest('form')[bind ? 'on' : 'off']('reset', f.reset);
        },

        /**
         * redesign
         * create the new input and hide the standard one
         *
         * @void
         */
        redesign: function redesign() {
          // set as default
          o = s; // add a class name with theme

          if (n.theme) p.addClass('fileuploader-theme-' + n.theme); // set new input html

          if (n.changeInput) {
            switch ((_typeof(n.changeInput) + "").toLowerCase()) {
              case 'boolean':
                o = $('<div class="fileuploader-input">' + '<div class="fileuploader-input-caption"><span>' + f._assets.textParse(n.captions.feedback) + '</span></div>' + '<div class="fileuploader-input-button"><span>' + f._assets.textParse(n.captions.button) + '</span></div>' + '</div>');
                break;

              case 'string':
                if (n.changeInput != ' ') o = $(f._assets.textParse(n.changeInput, n));
                break;

              case 'object':
                o = $(n.changeInput);
                break;

              case 'function':
                o = $(n.changeInput(s, p, n, f._assets.textParse));
                break;
            } // add the new input after standard input


            s.after(o); // hide the standard input

            s.css({
              position: "absolute",
              "z-index": "-9999",
              height: '1px',
              width: '1px',
              padding: '0',
              margin: '0',
              "line-height": '0',
              outline: '0',
              border: '0',
              opacity: '0'
            });
          } // create thumbnails list


          if (n.thumbnails) f.thumbnails.create(); // set drag&drop container

          if (n.dragDrop) {
            n.dragDrop = _typeof(n.dragDrop) != 'object' ? {
              container: null
            } : n.dragDrop;
            n.dragDrop.container = n.dragDrop.container ? $(n.dragDrop.container) : o;
          }
        },

        /**
         * clickHandler
         * click event for new input
         *
                        * @param {Event} e - jQuery event
         * @void
         */
        clickHandler: function clickHandler(e) {
          e.preventDefault(); // clear clipboard pending

          if (f.clipboard._timer) {
            f.clipboard.clean();
            return;
          } // trigger input click


          s.click();
        },

        /**
         * onEvent
         * callbacks for each input event
         *
                        * @param {Event} e - jQuery event
         * @void
         */
        onEvent: function onEvent(e) {
          switch (e.type) {
            case 'focus':
              p ? p.addClass('fileuploader-focused') : null;
              break;

            case 'blur':
              p ? p.removeClass('fileuploader-focused') : null;
              break;

            case 'change':
              f.onChange.call(this);
              break;
          } // listeners callback


          n.listeners && $.isFunction(n.listeners[e.type]) ? n.listeners[e.type].call(s, p) : null;
        },

        /**
         * set
         * set properties
         *
                        * @param {String} type - property type
                        * @param {null|String} value - property value
         * @void
         */
        set: function set(type, value) {
          switch (type) {
            case 'attrOpts':
              var d = ['limit', 'maxSize', 'fileMaxSize', 'extensions', 'changeInput', 'theme', 'addMore', 'listInput', 'files'];

              for (var k = 0; k < d.length; k++) {
                var j = 'data-fileuploader-' + d[k];

                if (f._assets.hasAttr(j)) {
                  switch (d[k]) {
                    case 'changeInput':
                    case 'addMore':
                    case 'listInput':
                      n[d[k]] = ['true', 'false'].indexOf(s.attr(j)) > -1 ? s.attr(j) == 'true' : s.attr(j);
                      break;

                    case 'extensions':
                      n[d[k]] = s.attr(j).replace(/ /g, '').split(',');
                      break;

                    case 'files':
                      n[d[k]] = JSON.parse(s.attr(j));
                      break;

                    default:
                      n[d[k]] = s.attr(j);
                  }
                }

                s.removeAttr(j);
              } // set the plugin on disabled if the input has disabled attribute or limit is 0


              if (s.attr('disabled') != null || s.attr('readonly') != null || n.limit === 0) f.disabled = true; // set multiple attribute to the input

              if (!n.limit || n.limit && n.limit >= 2) {
                s.attr('multiple', 'multiple'); // set brackets at the end of input name

                n.inputNameBrackets && s.attr('name').slice(-2) != '[]' ? s.attr('name', s.attr('name') + '[]') : null;
              } // set list input element


              if (n.listInput === true) {
                n.listInput = $('<input type="hidden" name="fileuploader-list-' + s.attr('name').replace('[]', '').split('[').pop().replace(']', '') + '">').insertBefore(s);
              }

              if (typeof n.listInput == "string" && $(n.listInput).length == 0) {
                n.listInput = $('<input type="hidden" name="' + n.listInput + '">').insertBefore(s);
              } // apply some defined options to plugin


              f.set('disabled', f.disabled);
              if (!n.fileMaxSize && n.maxSize) n.fileMaxSize = n.maxSize;
              break;
            // set and apply disable option to plugin

            case 'disabled':
              f.disabled = value;
              p[f.disabled ? 'addClass' : 'removeClass']('fileuploader-disabled');
              s[f.disabled ? 'attr' : 'removeAttr']('disabled', 'disabled');
              if (f.rendered) f.bindUnbindEvents(!value);
              break;
            // set new input feedback html

            case 'feedback':
              if (!value) value = f._assets.textParse(f._itFl.length > 0 ? n.captions.feedback2 : n.captions.feedback, {
                length: f._itFl.length
              });
              $(!o.is(':file')) ? o.find('.fileuploader-input-caption span').html(value) : null;
              break;
            // set file input value to empty

            case 'input':
              var el = f._assets.copyAllAttributes($('<input type="file">'), s, true);

              f.bindUnbindEvents(false);
              s.after(s = el).remove();
              f.bindUnbindEvents(true);
              break;
            // set previous input; only for addMore option

            case 'prevInput':
              if (sl.length > 0) {
                f.bindUnbindEvents(false);
                sl[value].remove();
                sl.splice(value, 1);
                s = sl[sl.length - 1];
                f.bindUnbindEvents(true);
              }

              break;
            // set next input; only for addMore option

            case 'nextInput':
              var el = f._assets.copyAllAttributes($('<input type="file">'), s);

              f.bindUnbindEvents(false);

              if (sl.length > 0 && sl[sl.length - 1].get(0).files.length == 0) {
                s = sl[sl.length - 1];
              } else {
                sl.indexOf(s) == -1 ? sl.push(s) : null;
                sl.push(el);
                s.after(s = el);
              }

              f.bindUnbindEvents(true);
              break;
            // set list input with list of the files

            case 'listInput':
              if (n.listInput) n.listInput.val(f.files.list(true, null, false, value));
              break;
          }
        },

        /**
         * onChange
         * on input change event
         *
                        * @param {Event} e - jQuery event
                        * @param {Array} fileList - FileList array, used only by drag&drop and clipboard paste
         * @void
         */
        onChange: function onChange(e, fileList) {
          var files = s.get(0).files; // drag&drop or clipboard paste

          if (fileList) {
            if (fileList.length) {
              files = fileList;
            } else {
              f.set('input', '');
              f.files.clear();
              return false;
            }
          } // clean clipboard timer
          // made only for safety


          if (f.clipboard._timer) f.clipboard.clean(); // reset the input if default mode

          if (f.isDefaultMode()) {
            f.reset();
            if (files.length == 0) return;
          } // beforeSelect callback


          if (n.beforeSelect && $.isFunction(n.beforeSelect) && n.beforeSelect(files, l, p, o, s) == false) {
            return false;
          } // files


          var t = 0; // total processed files

          for (var i = 0; i < files.length; i++) {
            var file = files[i],
                // file
            item = f._itFl[f.files.add(file, 'choosed')],
                // item
            status = f.files.check(item, files, i == 0); // ["type", "message", "do not show the warning message", "do not check the next files"]
            // process the warnings


            if (status !== true) {
              f.files.remove(item, true);

              if (!status[2]) {
                if (f.isDefaultMode()) {
                  f.set('input', '');
                  f.reset();
                  status[3] = true;
                }

                status[1] ? n.dialogs.alert(status[1], item, l, p, o, s) : null;
              }

              if (status[3]) {
                break;
              }

              continue;
            } // file is valid
            // create item html


            if (n.thumbnails) f.thumbnails.item(item); // create item ajax request

            if (f.isUploadMode()) f.upload.prepare(item); // onSelect callback

            n.onSelect && $.isFunction(n.onSelect) ? n.onSelect(item, l, p, o, s) : null;
            t++;
          } // clear the input in uploadMode


          if (f.isUploadMode() && t > 0) f.set('input', ''); // set feedback caption

          f.set('feedback', null); // set nextInput for addMore option

          if (f.isAddMoreMode() && t > 0) {
            f.set('nextInput');
          } // set listInput value


          f.set('listInput', null); // afterSelect callback

          n.afterSelect && $.isFunction(n.afterSelect) ? n.afterSelect(l, p, o, s) : null;
        },

        /**
                        * @namespace thumbnails
                        */
        thumbnails: {
          /**
           * create
           * create the thumbnails list
           *
          * @namespace thumbnails
           * @void
           */
          create: function create() {
            // thumbnails.beforeShow callback
            n.thumbnails.beforeShow != null && $.isFunction(n.thumbnails.beforeShow) ? n.thumbnails.beforeShow(p, o, s) : null; // create item's list element

            var box = $(f._assets.textParse(n.thumbnails.box)).appendTo(n.thumbnails.boxAppendTo ? n.thumbnails.boxAppendTo : p);
            l = !box.is(n.thumbnails._selectors.list) ? box.find(n.thumbnails._selectors.list) : box; // bind item popup method to the selector

            if (n.thumbnails._selectors.popup_open) {
              l.on('click', n.thumbnails._selectors.popup_open, function (e) {
                e.preventDefault();
                var m = $(this).closest(n.thumbnails._selectors.item),
                    item = f.files.find(m);
                if (item && item.popup && item.html.hasClass('file-has-popup')) f.thumbnails.popup(item);
              });
            } // bind item upload start method to the selector


            if (f.isUploadMode() && n.thumbnails._selectors.start) {
              l.on('click', n.thumbnails._selectors.start, function (e) {
                e.preventDefault();
                if (f.locked) return false;
                var m = $(this).closest(n.thumbnails._selectors.item),
                    item = f.files.find(m);
                if (item) f.upload.send(item, true);
              });
            } // bind item upload retry method to the selector


            if (f.isUploadMode() && n.thumbnails._selectors.retry) {
              l.on('click', n.thumbnails._selectors.retry, function (e) {
                e.preventDefault();
                if (f.locked) return false;
                var m = $(this).closest(n.thumbnails._selectors.item),
                    item = f.files.find(m);
                if (item) f.upload.retry(item);
              });
            } // bind item editor rotate method to the selector


            if (n.thumbnails._selectors.rotate) {
              l.on('click', n.thumbnails._selectors.rotate, function (e) {
                e.preventDefault();
                if (f.locked) return false;
                var m = $(this).closest(n.thumbnails._selectors.item),
                    item = f.files.find(m);

                if (item && item.editor) {
                  item.editor.rotate();
                  item.editor.save();
                }
              });
            } // bind item remove / upload.cancel method to the selector


            if (n.thumbnails._selectors.remove) {
              l.on('click', n.thumbnails._selectors.remove, function (e) {
                e.preventDefault();
                if (f.locked) return false;

                var m = $(this).closest(n.thumbnails._selectors.item),
                    item = f.files.find(m),
                    c = function c(a) {
                  f.files.remove(item);
                };

                if (item) {
                  if (item.upload && item.upload.status != 'successful') {
                    f.upload.cancel(item);
                  } else {
                    if (n.thumbnails.removeConfirmation) {
                      n.dialogs.confirm(f._assets.textParse(n.captions.removeConfirmation, item), c);
                    } else {
                      c();
                    }
                  }
                }
              });
            }
          },

          /**
           * clear
           * set the HTML content from items list to empty
           *
          * @namespace thumbnails
           * @void
           */
          clear: function clear() {
            if (l) l.html('');
          },

          /**
           * item
           * create the item.html and append it to the list
           *
          * @namespace thumbnails
           * @param {Object} item
           * @param {HTML} replaceHtml
           * @void
           */
          item: function item(_item, replaceHtml) {
            _item.icon = f.thumbnails.generateFileIcon(_item.format, _item.extension);
            _item.image = '<div class="fileuploader-item-image"></div>';
            _item.progressBar = f.isUploadMode() ? '<div class="fileuploader-progressbar"><div class="bar"></div></div>' : '';
            _item.html = $(f._assets.textParse(_item.appended && n.thumbnails.item2 ? n.thumbnails.item2 : n.thumbnails.item, _item));
            _item.progressBar = _item.html.find('.fileuploader-progressbar'); // add class with file extension and file format to item html

            _item.html.addClass('file-type-' + (_item.format ? _item.format : 'no') + ' file-ext-' + (_item.extension ? _item.extension : 'no') + ''); // add item html to list element


            if (replaceHtml) replaceHtml.replaceWith(_item.html);else _item.html[n.thumbnails.itemPrepend ? 'prependTo' : 'appendTo'](l); // add popup option

            if (n.thumbnails.popup) _item.popup = {
              open: function open() {
                f.thumbnails.popup(_item);
              }
            }; // render the image thumbnail

            f.thumbnails.renderThumbnail(_item);

            _item.renderThumbnail = function (src) {
              if (src && _item.popup && _item.popup.close) {
                _item.popup.close();

                _item.popup = {
                  open: _item.popup.open
                };
              }

              f.thumbnails.renderThumbnail(_item, true, src);
            }; // thumbnails.onItemShow callback


            n.thumbnails.onItemShow != null && $.isFunction(n.thumbnails.onItemShow) ? n.thumbnails.onItemShow(_item, l, p, o, s) : null;
          },

          /**
                             * generateFileIcon
                             * generate a file icon with custom background color
                             *
           * @namespace thumbnails
                             * @param {String} form - file format
           * @param {String} extension - file extension
                             * @return {String} html element
                             */
          generateFileIcon: function generateFileIcon(format, extension) {
            var el = '<div style="${style}" class="fileuploader-item-icon' + '${class}"><i>' + (extension ? extension : '') + '</i></div>'; // set generated color to icon background

            var bgColor = f._assets.textToColor(extension);

            if (bgColor) {
              var isBgColorBright = f._assets.isBrightColor(bgColor);

              if (isBgColorBright) el = el.replace('${class}', ' is-bright-color');
              el = el.replace('${style}', 'background-color: ' + bgColor);
            }

            return el.replace('${style}', '').replace('${class}', '');
          },

          /**
                             * renderThumbnail
                             * render image thumbnail and append to .fileuploader-item-image element
           * it appends the generated icon if the file is not an image or not a valid image
                             *
           * @namespace thumbnails
                             * @param {Object} item
           * @param {bool} forceRender - skip the synchron functions and force the rendering
           * @param {string} src - custom image source
                             * @void
                             */
          renderThumbnail: function renderThumbnail(item, forceRender, src) {
            var m = item.html.find('.fileuploader-item-image'),
                readerSkip = item.data && item.data.readerSkip,
                setImageThumb = function setImageThumb(img) {
              var $img = $(img); // add $img to html

              m.removeClass('fileuploader-no-thumbnail fileuploader-loading').html($img);
              if (item.popup) item.html.addClass('file-has-popup'); // add onImageLoaded callback

              if ($img.is('img')) $img.attr('draggable', 'false').on('load error', function (e) {
                if (e.type == 'error') setIconThumb(true);
                renderNextItem();
                n.thumbnails.onImageLoaded != null && $.isFunction(n.thumbnails.onImageLoaded) ? n.thumbnails.onImageLoaded(item, l, p, o, s) : null;
              });
              if ($img.is('canvas')) n.thumbnails.onImageLoaded != null && $.isFunction(n.thumbnails.onImageLoaded) ? n.thumbnails.onImageLoaded(item, l, p, o, s) : null;
            },
                setIconThumb = function setIconThumb(onImageError) {
              m.addClass('fileuploader-no-thumbnail');
              m.removeClass('fileuploader-loading').html(item.icon);
              if (item.popup) item.html.addClass('file-has-popup');
              if (onImageError) n.thumbnails.onImageLoaded != null && $.isFunction(n.thumbnails.onImageLoaded) ? n.thumbnails.onImageLoaded(item, l, p, o, s) : null;
            },
                renderNextItem = function renderNextItem() {
              var i = 0;

              if (item && f._pfrL.indexOf(item) > -1) {
                f._pfrL.splice(f._pfrL.indexOf(item), 1);

                while (i < f._pfrL.length) {
                  if (f._itFl.indexOf(f._pfrL[i]) > -1) {
                    setTimeout(function () {
                      f.thumbnails.renderThumbnail(f._pfrL[i], true);
                    }, item.format == 'image' && item.size / 1000000 > 1.8 ? 200 : 0);
                    break;
                  } else {
                    f._pfrL.splice(i, 1);
                  }

                  i++;
                }
              }
            }; // skip this function if there is no place for image


            if (!m.length) {
              renderNextItem();
              return;
            } // set item.image to jQuery element


            item.image = m.html('').addClass('fileuploader-loading'); // create an image thumbnail only if file is an image and if FileReader is supported

            if ((['image', 'video', 'audio', 'astext'].indexOf(item.format) > -1 || item.data.thumbnail) && f.isFileReaderSupported() && !readerSkip && (item.appended || n.thumbnails.startImageRenderer || forceRender)) {
              // prevent popup before loading
              item.html.removeClass('file-has-popup'); // check pending list

              if (n.thumbnails.synchronImages) {
                f._pfrL.indexOf(item) == -1 && !forceRender ? f._pfrL.push(item) : null;

                if (f._pfrL.length > 1 && !forceRender) {
                  return;
                }
              } // create thumbnail


              var load = function load(data, fromReader) {
                var srcIsImg = data.nodeName && data.nodeName.toLocaleLowerCase() == 'img',
                    src = !srcIsImg ? data : data.src;

                if (n.thumbnails.canvasImage) {
                  var canvas = document.createElement('canvas'),
                      img = srcIsImg ? data : new Image(),
                      onload = function onload() {
                    // resize canvas
                    f.editor.resize(this, canvas, n.thumbnails.canvasImage.width ? n.thumbnails.canvasImage.width : m.width(), n.thumbnails.canvasImage.height ? n.thumbnails.canvasImage.height : m.height(), false, true); // check if canvas is not blank

                    if (!f._assets.isBlankCanvas(canvas)) {
                      setImageThumb(canvas);
                    } else {
                      setIconThumb();
                    } // render the next pending item


                    renderNextItem();
                  },
                      onerror = function onerror(text) {
                    setIconThumb(true);
                    renderNextItem();
                    img = null;
                  }; // do not create another image element


                  if (item.format == 'image' && fromReader && item.reader.node) return onload.call(item.reader.node); // do not create an empty image element

                  if (!src) return onerror();
                  if (srcIsImg) return onload.call(data); // create image element

                  img.onload = onload;
                  img.onerror = onerror;
                  if (item.data && item.data.readerCrossOrigin) img.setAttribute('crossOrigin', item.data.readerCrossOrigin);
                  img.src = src;
                } else {
                  setImageThumb(srcIsImg ? data : '<img src="' + src + '">');
                }
              }; // choose thumbnail source


              if (typeof src == 'string' || _typeof(src) == 'object') return load(src);else return f.files.read(item, function () {
                if (item.reader.node && (item.reader.frame || item.reader.node.nodeName.toLowerCase() == 'img')) {
                  load(item.reader.frame || item.reader.src, true);
                } else {
                  setIconThumb(item.format == 'image');
                  renderNextItem();
                }
              }, null, src, true);
            }

            setIconThumb();
          },

          /**
           * popup
           * create and show a popup for an item
           * appends the popup to parent element
          * reset values for the editor
           *
          * @namespace thumbnails
           * @param {Object} item
           * @param {Boolean} isByAction - popup is called by prev/next buttons
           * @void
           */
          popup: function popup(item, isByActions) {
            if (f.locked || !n.thumbnails.popup || !n.thumbnails._selectors.popup) return;

            var container = $(n.thumbnails.popup.container),
                box = container.find('.fileuploader-popup'),
                hasArrowsClass = 'fileuploader-popup-has-arrows',
                renderPopup = function renderPopup() {
              var template = item.popup.html || $(f._assets.textParse(n.thumbnails.popup.template, item)),
                  popupIsNew = item.popup.html !== template,
                  windowKeyEvent = function windowKeyEvent(e) {
                var key = e.which || e.keyCode;
                if (key == 27 && item.popup && item.popup.close) item.popup.close();
                if ((key == 37 || key == 39) && n.thumbnails.popup.arrows) item.popup.move(key == 37 ? 'prev' : 'next');
              };

              box.removeClass('loading'); // remove all created popups

              if (box.children(n.thumbnails._selectors.popup).length) {
                $.each(f._itFl, function (i, a) {
                  if (a != item && a.popup && a.popup.close) {
                    a.popup.close(isByActions);
                  }
                });
                box.find(n.thumbnails._selectors.popup).remove();
              }

              template.show().appendTo(box);
              item.popup.html = template;

              item.popup.move = function (to) {
                var itemIndex = f._itFl.indexOf(item),
                    nextItem = null,
                    itL = false;

                to = n.thumbnails.itemPrepend ? to == 'prev' ? 'next' : 'prev' : to;

                if (to == 'prev') {
                  for (var i = itemIndex; i >= 0; i--) {
                    var a = f._itFl[i];

                    if (a != item && a.popup && a.html.hasClass('file-has-popup')) {
                      nextItem = a;
                      break;
                    }

                    if (i == 0 && !nextItem && !itL && n.thumbnails.popup.loop) {
                      i = f._itFl.length;
                      itL = true;
                    }
                  }
                } else {
                  for (var i = itemIndex; i < f._itFl.length; i++) {
                    var a = f._itFl[i];

                    if (a != item && a.popup && a.html.hasClass('file-has-popup')) {
                      nextItem = a;
                      break;
                    }

                    if (i + 1 == f._itFl.length && !nextItem && !itL && n.thumbnails.popup.loop) {
                      i = -1;
                      itL = true;
                    }
                  }
                }

                if (nextItem) f.thumbnails.popup(nextItem, true);
              };

              item.popup.close = function (isByActions) {
                if (item.reader.node) {
                  item.reader.node.pause ? item.reader.node.pause() : null;
                }

                $(window).off('keyup', windowKeyEvent);
                container.css({
                  overflow: '',
                  width: ''
                }); // hide the cropper

                if (item.popup.editor && item.popup.editor.cropper) item.popup.editor.cropper.hide(); // hide the zoomer

                if (item.popup.zoomer) item.popup.zoomer.hide(); // thumbnails.popup.onHide callback

                item.popup.html && n.thumbnails.popup.onHide && $.isFunction(n.thumbnails.popup.onHide) ? n.thumbnails.popup.onHide(item, l, p, o, s) : item.popup.html ? item.popup.html.remove() : null;
                if (!isByActions) box.fadeOut(400, function () {
                  box.remove();
                });
                delete item.popup.close;
              }; // append item.reader.node to popup
              // play video/audio


              if (item.reader.node) {
                if (popupIsNew) template.html(template.html().replace(/\$\{reader\.node\}/, '<div class="reader-node"></div>')).find('.reader-node').html(item.reader.node);
                item.reader.node.controls = true;
                item.reader.node.currentTime = 0;
                item.reader.node.play ? item.reader.node.play() : null;
              } else {
                if (popupIsNew) template.find('.fileuploader-popup-node').html('<div class="reader-node"><div class="fileuploader-popup-file-icon">' + item.icon + '</div></div>');
              } // bind Window functions


              $(window).on('keyup', windowKeyEvent); // freeze the container

              container.css({
                overflow: 'hidden',
                width: container.innerWidth()
              }); // popup arrows

              item.popup.html.find('[data-action="prev"], [data-action="next"]').removeAttr('style');
              item.popup.html[f._itFl.length == 1 || !n.thumbnails.popup.arrows ? 'removeClass' : 'addClass'](hasArrowsClass);

              if (!n.thumbnails.popup.loop) {
                if (f._itFl.indexOf(item) == 0) item.popup.html.find('[data-action="prev"]').hide();
                if (f._itFl.indexOf(item) == f._itFl.length - 1) item.popup.html.find('[data-action="next"]').hide();
              } // popup zoomer


              f.editor.zoom(item); // popup editor

              if (item.editor) {
                if (!item.popup.editor) item.popup.editor = {}; // set saved rotation

                f.editor.rotate(item, item.popup.editor.rotation || item.editor.rotation || 0, true); // set saved crop

                if (item.popup.editor && item.popup.editor.cropper) {
                  item.popup.editor.cropper.hide(true);
                  setTimeout(function () {
                    f.editor.crop(item, item.editor.crop ? $.extend({}, item.editor.crop) : item.popup.editor.cropper.setDefaultData());
                  }, 100);
                }
              } // bind actions


              item.popup.html.on('click', '[data-action="prev"]', function (e) {
                item.popup.move('prev');
              }).on('click', '[data-action="next"]', function (e) {
                item.popup.move('next');
              }).on('click', '[data-action="crop"]', function (e) {
                if (item.editor) item.editor.cropper();
              }).on('click', '[data-action="rotate-cw"]', function (e) {
                if (item.editor) item.editor.rotate();
              }).on('click', '[data-action="zoom-in"]', function (e) {
                if (item.popup.zoomer) item.popup.zoomer.zoomIn();
              }).on('click', '[data-action="zoom-out"]', function (e) {
                if (item.popup.zoomer) item.popup.zoomer.zoomOut();
              }); // thumbnails.popup.onShow callback

              n.thumbnails.popup.onShow && $.isFunction(n.thumbnails.popup.onShow) ? n.thumbnails.popup.onShow(item, l, p, o, s) : null;
            };

            if (box.length == 0) box = $('<div class="fileuploader-popup"></div>').appendTo(container);
            box.fadeIn(400).addClass('loading');

            if (['image/', 'video/', 'audio/', 'application/pdf', 'astext'].indexOf(item.type) > -1 && !item.popup.html) {
              f.files.read(item, renderPopup);
            } else {
              renderPopup();
            }
          }
        },

        /**
                        * @namespace editor
                        */
        editor: {
          /**
                             * rotate
                             * rotate image action
           * animate rotation in popup, only when popup is enabled
                             *
           * @namespace editor
                             * @param {Object} item
                             * @param {Number} degrees - rotation degrees
                             * @param {Boolean} force - force rotation without animation to degrees
                             * @void
                             */
          rotate: function rotate(item, degrees, force) {
            var inPopup = item.popup && item.popup.html && $('html').find(item.popup.html).length;

            if (!inPopup) {
              var rotation = item.editor.rotation || 0,
                  deg = degrees ? degrees : rotation + 90;
              if (deg >= 360) deg = 0;
              if (item.popup.editor) item.popup.editor.rotation = deg;
              return item.editor.rotation = deg;
            } else if (item.reader.node) {
              // prevent animation issues
              if (item.popup.editor.isAnimating) return;
              item.popup.editor.isAnimating = true;
              var $popup = item.popup.html,
                  $node = $popup.find('.fileuploader-popup-node'),
                  $readerNode = $node.find('.reader-node'),
                  $imageEl = $readerNode.find('> img'),
                  rotation = item.popup.editor.rotation || 0,
                  scale = item.popup.editor.scale || 1,
                  animationObj = {
                rotation: rotation,
                scale: scale
              }; // hide cropper

              if (item.popup.editor.cropper) item.popup.editor.cropper.$template.hide(); // change values

              item.popup.editor.rotation = force ? degrees : rotation + 90;
              item.popup.editor.scale = ($readerNode.height() / $imageEl[[90, 270].indexOf(item.popup.editor.rotation) > -1 ? 'width' : 'height']()).toFixed(3);
              if ($imageEl.height() * item.popup.editor.scale > $readerNode.width() && [90, 270].indexOf(item.popup.editor.rotation) > -1) item.popup.editor.scale = $readerNode.height() / $imageEl.width();
              if (item.popup.editor.scale > 1) item.popup.editor.scale = 1; // animate

              $(animationObj).stop().animate({
                rotation: item.popup.editor.rotation,
                scale: item.popup.editor.scale
              }, {
                duration: force ? 2 : 300,
                easing: 'swing',
                step: function step(now, fx) {
                  var matrix = $imageEl.css('-webkit-transform') || $imageEl.css('-moz-transform') || $imageEl.css('transform') || 'none',
                      rotation = 0,
                      scale = 1,
                      prop = fx.prop; // get css matrix

                  if (matrix !== 'none') {
                    var values = matrix.split('(')[1].split(')')[0].split(','),
                        a = values[0],
                        b = values[1];
                    rotation = prop == 'rotation' ? now : Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    scale = prop == 'scale' ? now : Math.round(Math.sqrt(a * a + b * b) * 10) / 10;
                  } // set $imageEl css


                  $imageEl.css({
                    '-webkit-transform': 'rotate(' + rotation + 'deg) scale(' + scale + ')',
                    '-moz-transform': 'rotate(' + rotation + 'deg) scale(' + scale + ')',
                    'transform': 'rotate(' + rotation + 'deg) scale(' + scale + ')'
                  });
                },
                always: function always() {
                  delete item.popup.editor.isAnimating; // re-draw the cropper if exists

                  if (item.popup.editor.cropper && !force) {
                    item.popup.editor.cropper.setDefaultData();
                    item.popup.editor.cropper.init('rotation');
                  }
                }
              }); // check if rotation no greater than 360 degrees

              if (item.popup.editor.rotation >= 360) item.popup.editor.rotation = 0; // register as change

              if (item.popup.editor.rotation != item.editor.rotation) item.popup.editor.hasChanges = true;
            }
          },

          /**
                             * crop
                             * crop image action
           * show cropping tools, only when popup is enabled
                             *
           * @namespace editor
                             * @param {Object} item
                             * @param {Object} data - cropping data
                             * @void
                             */
          crop: function crop(item, data) {
            var inPopup = item.popup && item.popup.html && $('html').find(item.popup.html).length;

            if (!inPopup) {
              return item.editor.crop = data || item.editor.crop;
            } else if (item.reader.node) {
              if (!item.popup.editor.cropper) {
                var template = '<div class="fileuploader-cropper">' + '<div class="fileuploader-cropper-area">' + '<div class="point point-a"></div>' + '<div class="point point-b"></div>' + '<div class="point point-c"></div>' + '<div class="point point-d"></div>' + '<div class="point point-e"></div>' + '<div class="point point-f"></div>' + '<div class="point point-g"></div>' + '<div class="point point-h"></div>' + '<div class="area-move"></div>' + '<div class="area-image"></div>' + '<div class="area-info"></div>' + '</div>' + '</div>',
                    $popup = item.popup.html,
                    $imageEl = $popup.find('.fileuploader-popup-node .reader-node > img'),
                    $template = $(template),
                    $editor = $template.find('.fileuploader-cropper-area'); // define popup cropper tool

                item.popup.editor.cropper = {
                  $imageEl: $imageEl,
                  $template: $template,
                  $editor: $editor,
                  isCropping: false,
                  crop: data || null,
                  init: function init(data) {
                    var cropper = item.popup.editor.cropper,
                        position = cropper.$imageEl.position(),
                        width = cropper.$imageEl[0].getBoundingClientRect().width,
                        height = cropper.$imageEl[0].getBoundingClientRect().height,
                        isInverted = item.popup.editor.rotation && [90, 270].indexOf(item.popup.editor.rotation) > -1,
                        scale = isInverted ? item.popup.editor.scale : 1; // unbind all events

                    cropper.hide(); // set default data

                    if (!cropper.crop) cropper.setDefaultData(); // hide if image not visible

                    if (width == 0 || height == 0) return cropper.hide(true); // prevent duplicates

                    if (!cropper.isCropping) {
                      cropper.$imageEl.clone().appendTo(cropper.$template.find('.area-image'));
                      cropper.$imageEl.parent().append($template);
                    } // animate cropping tool


                    cropper.$template.hide().css({
                      left: position.left,
                      top: position.top,
                      width: width,
                      height: height
                    }).fadeIn(150);
                    cropper.$editor.hide();
                    clearTimeout(cropper._editorAnimationTimeout);
                    cropper._editorAnimationTimeout = setTimeout(function () {
                      delete cropper._editorAnimationTimeout;
                      cropper.$editor.fadeIn(250); // update data with cf and scale

                      if (item.editor.crop && $.isPlainObject(data)) {
                        cropper.resize();
                        cropper.crop.left = cropper.crop.left * cropper.crop.cfWidth * scale;
                        cropper.crop.width = cropper.crop.width * cropper.crop.cfWidth * scale;
                        cropper.crop.top = cropper.crop.top * cropper.crop.cfHeight * scale;
                        cropper.crop.height = cropper.crop.height * cropper.crop.cfHeight * scale;
                      } // maxWidth on open


                      if (n.editor.cropper && (n.editor.cropper.maxWidth || n.editor.cropper.maxHeight)) {
                        if (n.editor.cropper.maxWidth) cropper.crop.width = Math.min(n.editor.cropper.maxWidth * cropper.crop.cfWidth, cropper.crop.width);
                        if (n.editor.cropper.maxHeight) cropper.crop.height = Math.min(n.editor.cropper.maxHeight * cropper.crop.cfHeight, cropper.crop.height);

                        if ((!item.editor.crop || data == 'rotation') && data != 'resize') {
                          cropper.crop.left = (cropper.$template.width() - cropper.crop.width) / 2;
                          cropper.crop.top = (cropper.$template.height() - cropper.crop.height) / 2;
                        }
                      } // ratio on open


                      if ((!item.editor.crop || data == 'rotation') && n.editor.cropper && n.editor.cropper.ratio && data != 'resize') {
                        var ratio = n.editor.cropper.ratio,
                            ratioPx = f._assets.ratioToPx(cropper.crop.width, cropper.crop.height, ratio);

                        if (ratioPx) {
                          cropper.crop.width = Math.min(cropper.crop.width, ratioPx[0]);
                          cropper.crop.left = (cropper.$template.width() - cropper.crop.width) / 2;
                          cropper.crop.height = Math.min(cropper.crop.height, ratioPx[1]);
                          cropper.crop.top = (cropper.$template.height() - cropper.crop.height) / 2;
                        }
                      } // draw editor


                      cropper.drawPlaceHolder(cropper.crop);
                    }, 400); // start and bind events

                    if (n.editor.cropper && n.editor.cropper.showGrid) cropper.$editor.addClass('has-grid');
                    cropper.$imageEl.attr('draggable', 'false');
                    cropper.$template.on('mousedown touchstart', cropper.mousedown);
                    $(window).on('resize', cropper.resize); // register as changed

                    cropper.isCropping = true;
                    item.popup.editor.hasChanges = true;
                  },
                  setDefaultData: function setDefaultData() {
                    var cropper = item.popup.editor.cropper,
                        $imageEl = cropper.$imageEl,
                        width = $imageEl.width(),
                        height = $imageEl.height(),
                        isInverted = item.popup.editor.rotation && [90, 270].indexOf(item.popup.editor.rotation) > -1,
                        scale = item.popup.editor.scale || 1; // set default data

                    cropper.crop = {
                      left: 0,
                      top: 0,
                      width: isInverted ? height * scale : width,
                      height: isInverted ? width * scale : height,
                      cfWidth: width / item.reader.width,
                      cfHeight: height / item.reader.height
                    };
                    return null;
                  },
                  hide: function hide(force) {
                    var cropper = item.popup.editor.cropper; // hide editor on force

                    if (force) {
                      cropper.$template.hide();
                      cropper.$editor.hide();
                    } // stop and unbind events


                    cropper.$imageEl.attr('draggable', '');
                    cropper.$template.off('mousedown touchstart', cropper.mousedown);
                    $(window).off('resize', cropper.resize);
                  },
                  resize: function resize(e) {
                    var cropper = item.popup.editor.cropper,
                        $imageEl = cropper.$imageEl; // only when image is visible

                    if ($imageEl.width() > 0) {
                      if (!e) {
                        // re-write cf
                        cropper.crop.cfWidth = $imageEl.width() / item.reader.width;
                        cropper.crop.cfHeight = $imageEl.height() / item.reader.height;
                      } else {
                        // resize $editor
                        cropper.$template.hide();
                        clearTimeout(cropper._resizeTimeout);
                        cropper._resizeTimeout = setTimeout(function () {
                          delete cropper._resizeTimeout;
                          var cfWidth = $imageEl.width() / item.reader.width,
                              cfHeight = $imageEl.height() / item.reader.height;
                          cropper.crop.left = cropper.crop.left / cropper.crop.cfWidth * cfWidth;
                          cropper.crop.width = cropper.crop.width / cropper.crop.cfWidth * cfWidth;
                          cropper.crop.top = cropper.crop.top / cropper.crop.cfHeight * cfHeight;
                          cropper.crop.height = cropper.crop.height / cropper.crop.cfHeight * cfHeight;
                          cropper.crop.cfWidth = cfWidth;
                          cropper.crop.cfHeight = cfHeight;
                          cropper.init('resize');
                        }, 500);
                      }
                    }
                  },
                  drawPlaceHolder: function drawPlaceHolder(css) {
                    var cropper = item.popup.editor.cropper,
                        rotation = item.popup.editor.rotation || 0,
                        scale = item.popup.editor.scale || 1,
                        translate = [0, 0];
                    if (!css) return; // create new object

                    css = $.extend({}, css); // edit width, height and translate values by rotation

                    if (rotation) translate = [rotation == 180 || rotation == 270 ? -100 : 0, rotation == 90 || rotation == 180 ? -100 : 0]; // draw cropping-area

                    cropper.$editor.css(css);
                    cropper.setAreaInfo();
                    cropper.$editor.find('.area-image img').removeAttr('style').css({
                      width: cropper.$imageEl.width(),
                      height: cropper.$imageEl.height(),
                      left: cropper.$editor.position().left * -1,
                      top: cropper.$editor.position().top * -1,
                      '-webkit-transform': 'rotate(' + rotation + 'deg) scale(' + scale + ') translateX(' + translate[0] + '%) translateY(' + translate[1] + '%)',
                      '-moz-transform': 'rotate(' + rotation + 'deg) scale(' + scale + ') translateX(' + translate[0] + '%) translateY(' + translate[1] + '%)',
                      'transform': 'rotate(' + rotation + 'deg) scale(' + scale + ') translateX(' + translate[0] + '%) translateY(' + translate[1] + '%)'
                    });
                  },
                  setAreaInfo: function setAreaInfo(type) {
                    var cropper = item.popup.editor.cropper,
                        scale = item.popup.editor.scale || 1;
                    cropper.$editor.find('.area-info').html((cropper.isResizing || type == 'size' ? ['W: ' + Math.round(cropper.crop.width / cropper.crop.cfWidth / scale) + 'px', ' ', 'H: ' + Math.round(cropper.crop.height / cropper.crop.cfHeight / scale) + 'px'] : ['X: ' + Math.round(cropper.crop.left / cropper.crop.cfWidth / scale) + 'px', ' ', 'Y: ' + Math.round(cropper.crop.top / cropper.crop.cfHeight / scale) + 'px']).join(''));
                  },
                  mousedown: function mousedown(e) {
                    var eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                        $target = $(e.target),
                        cropper = item.popup.editor.cropper,
                        points = {
                      x: (eventType == 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX) - cropper.$template.offset().left,
                      y: (eventType == 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY) - cropper.$template.offset().top
                    },
                        callback = function callback() {
                      // set current state
                      cropper.pointData = {
                        el: $target,
                        x: points.x,
                        y: points.y,
                        xEditor: points.x - cropper.crop.left,
                        yEditor: points.y - cropper.crop.top,
                        left: cropper.crop.left,
                        top: cropper.crop.top,
                        width: cropper.crop.width,
                        height: cropper.crop.height
                      }; // start cropping event

                      if (cropper.isMoving || cropper.isResizing) {
                        cropper.setAreaInfo('size');
                        cropper.$editor.addClass('moving');
                        $('body').css({
                          '-webkit-user-select': 'none',
                          '-moz-user-select': 'none',
                          '-ms-user-select': 'none',
                          'user-select': 'none'
                        }); // bind window mousemove event

                        $(document).on('mousemove touchmove', cropper.mousemove);
                      }
                    };

                    if (item.popup.zoomer && item.popup.zoomer.hasSpacePressed) return; // determinate cropping type

                    cropper.isMoving = $target.is('.area-move');
                    cropper.isResizing = $target.is('.point'); // mousedown event

                    if (eventType == 'mousedown') {
                      // bind cropping start event
                      callback();
                    } // touchstart event


                    if (eventType == 'touchstart' && e.originalEvent.touches.length == 1) {
                      if (cropper.isMoving || cropper.isResizing) e.preventDefault();
                      cropper.isTouchLongPress = true; // check if long press

                      setTimeout(function () {
                        if (!cropper.isTouchLongPress) return;
                        delete cropper.isTouchLongPress;
                        callback();
                      }, n.thumbnails.touchDelay ? n.thumbnails.touchDelay : 0);
                    } // bind window mouseup event


                    $(document).on('mouseup touchend', cropper.mouseup);
                  },
                  mousemove: function mousemove(e) {
                    var eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                        $target = $(e.target),
                        cropper = item.popup.editor.cropper,
                        points = {
                      x: (eventType == 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX) - cropper.$template.offset().left,
                      y: (eventType == 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY) - cropper.$template.offset().top
                    };
                    if (e.originalEvent.touches && e.originalEvent.touches.length != 1) return cropper.mouseup(e); // move

                    if (cropper.isMoving) {
                      var left = points.x - cropper.pointData.xEditor,
                          top = points.y - cropper.pointData.yEditor; // position

                      if (left + cropper.crop.width > cropper.$template.width()) left = cropper.$template.width() - cropper.crop.width;
                      if (left < 0) left = 0;
                      if (top + cropper.crop.height > cropper.$template.height()) top = cropper.$template.height() - cropper.crop.height;
                      if (top < 0) top = 0; // set position

                      cropper.crop.left = left;
                      cropper.crop.top = top;
                    } // resize


                    if (cropper.isResizing) {
                      var point = cropper.pointData.el.attr('class').substr("point point-".length),
                          lastWidth = cropper.crop.left + cropper.crop.width,
                          lastHeight = cropper.crop.top + cropper.crop.height,
                          minWidth = (n.editor.cropper && n.editor.cropper.minWidth || 0) * cropper.crop.cfWidth,
                          minHeight = (n.editor.cropper && n.editor.cropper.minHeight || 0) * cropper.crop.cfHeight,
                          maxWidth = (n.editor.cropper && n.editor.cropper.maxWidth) * cropper.crop.cfWidth,
                          maxHeight = (n.editor.cropper && n.editor.cropper.maxHeight) * cropper.crop.cfHeight,
                          ratio = n.editor.cropper ? n.editor.cropper.ratio : null,
                          ratioPx; // set minWidth if greater than image

                      if (minWidth > cropper.$template.width()) minWidth = cropper.$template.width();
                      if (minHeight > cropper.$template.height()) minHeight = cropper.$template.height(); // set maxWidth if greater than image

                      if (maxWidth > cropper.$template.width()) maxWidth = cropper.$template.width();
                      if (maxHeight > cropper.$template.height()) maxHeight = cropper.$template.height(); // points

                      if ((point == 'a' || point == 'b' || point == 'c') && !ratioPx) {
                        cropper.crop.top = points.y;
                        if (cropper.crop.top < 0) cropper.crop.top = 0;
                        cropper.crop.height = lastHeight - cropper.crop.top;

                        if (cropper.crop.top > cropper.crop.top + cropper.crop.height) {
                          cropper.crop.top = lastHeight;
                          cropper.crop.height = 0;
                        } // minHeight


                        if (cropper.crop.height < minHeight) {
                          cropper.crop.top = lastHeight - minHeight;
                          cropper.crop.height = minHeight;
                        } // maxHeight


                        if (cropper.crop.height > maxHeight) {
                          cropper.crop.top = lastHeight - maxHeight;
                          cropper.crop.height = maxHeight;
                        } // ratio


                        ratioPx = ratio ? f._assets.ratioToPx(cropper.crop.width, cropper.crop.height, ratio) : null;

                        if (ratioPx) {
                          cropper.crop.width = ratioPx[0];
                          if (point == 'a' || point == 'b') cropper.crop.left = Math.max(0, cropper.pointData.left + (cropper.pointData.width - cropper.crop.width) / (point == 'b' ? 2 : 1)); // check

                          if (cropper.crop.left + cropper.crop.width > cropper.$template.width()) {
                            var newWidth = cropper.$template.width() - cropper.crop.left;
                            cropper.crop.width = newWidth;
                            cropper.crop.height = newWidth / ratioPx[2] * ratioPx[3];
                            cropper.crop.top = lastHeight - cropper.crop.height;
                          }
                        }
                      }

                      if ((point == 'e' || point == 'f' || point == 'g') && !ratioPx) {
                        cropper.crop.height = points.y - cropper.crop.top;
                        if (cropper.crop.height + cropper.crop.top > cropper.$template.height()) cropper.crop.height = cropper.$template.height() - cropper.crop.top; // minHeight

                        if (cropper.crop.height < minHeight) cropper.crop.height = minHeight; // maxHeight

                        if (cropper.crop.height > maxHeight) cropper.crop.height = maxHeight; // ratio

                        ratioPx = ratio ? f._assets.ratioToPx(cropper.crop.width, cropper.crop.height, ratio) : null;

                        if (ratioPx) {
                          cropper.crop.width = ratioPx[0];
                          if (point == 'f' || point == 'g') cropper.crop.left = Math.max(0, cropper.pointData.left + (cropper.pointData.width - cropper.crop.width) / (point == 'f' ? 2 : 1)); // check

                          if (cropper.crop.left + cropper.crop.width > cropper.$template.width()) {
                            var newWidth = cropper.$template.width() - cropper.crop.left;
                            cropper.crop.width = newWidth;
                            cropper.crop.height = newWidth / ratioPx[2] * ratioPx[3];
                          }
                        }
                      }

                      if ((point == 'c' || point == 'd' || point == 'e') && !ratioPx) {
                        cropper.crop.width = points.x - cropper.crop.left;
                        if (cropper.crop.width + cropper.crop.left > cropper.$template.width()) cropper.crop.width = cropper.$template.width() - cropper.crop.left; // minWidth

                        if (cropper.crop.width < minWidth) cropper.crop.width = minWidth; // maxWidth

                        if (cropper.crop.width > maxWidth) cropper.crop.width = maxWidth; // ratio

                        ratioPx = ratio ? f._assets.ratioToPx(cropper.crop.width, cropper.crop.height, ratio) : null;

                        if (ratioPx) {
                          cropper.crop.height = ratioPx[1];
                          if (point == 'c' || point == 'd') cropper.crop.top = Math.max(0, cropper.pointData.top + (cropper.pointData.height - cropper.crop.height) / (point == 'd' ? 2 : 1)); // check

                          if (cropper.crop.top + cropper.crop.height > cropper.$template.height()) {
                            var newHeight = cropper.$template.height() - cropper.crop.top;
                            cropper.crop.height = newHeight;
                            cropper.crop.width = newHeight / ratioPx[3] * ratioPx[2];
                          }
                        }
                      }

                      if ((point == 'a' || point == 'g' || point == 'h') && !ratioPx) {
                        cropper.crop.left = points.x;
                        if (cropper.crop.left > cropper.$template.width()) cropper.crop.left = cropper.$template.width();
                        if (cropper.crop.left < 0) cropper.crop.left = 0;
                        cropper.crop.width = lastWidth - cropper.crop.left;

                        if (cropper.crop.left > cropper.crop.left + cropper.crop.width) {
                          cropper.crop.left = lastWidth;
                          cropper.crop.width = 0;
                        } // minWidth


                        if (cropper.crop.width < minWidth) {
                          cropper.crop.left = lastWidth - minWidth;
                          cropper.crop.width = minWidth;
                        } // maxWidth


                        if (cropper.crop.width > maxWidth) {
                          cropper.crop.left = lastWidth - maxWidth;
                          cropper.crop.width = maxWidth;
                        } // ratio


                        ratioPx = ratio ? f._assets.ratioToPx(cropper.crop.width, cropper.crop.height, ratio) : null;

                        if (ratioPx) {
                          cropper.crop.height = ratioPx[1];
                          if (point == 'a' || point == 'h') cropper.crop.top = Math.max(0, cropper.pointData.top + (cropper.pointData.height - cropper.crop.height) / (point == 'h' ? 2 : 1)); // check

                          if (cropper.crop.top + cropper.crop.height > cropper.$template.height()) {
                            var newHeight = cropper.$template.height() - cropper.crop.top;
                            cropper.crop.height = newHeight;
                            cropper.crop.width = newHeight / ratioPx[3] * ratioPx[2];
                            cropper.crop.left = lastWidth - cropper.crop.width;
                          }
                        }
                      }
                    } // draw cropping-area


                    cropper.drawPlaceHolder(cropper.crop);
                  },
                  mouseup: function mouseup(e) {
                    var cropper = item.popup.editor.cropper; // check if empty area

                    if (cropper.$editor.width() == 0 || cropper.$editor.height() == 0) cropper.init(cropper.setDefaultData()); // clear

                    delete cropper.isTouchLongPress;
                    delete cropper.isMoving;
                    delete cropper.isResizing;
                    cropper.$editor.removeClass('moving show-info');
                    $('body').css({
                      '-webkit-user-select': '',
                      '-moz-user-select': '',
                      '-ms-user-select': '',
                      'user-select': ''
                    }); // unbind window events

                    $(document).off('mousemove touchmove', cropper.mousemove);
                    $(document).off('mouseup touchend', cropper.mouseup);
                  }
                }; // init cropper tool

                item.popup.editor.cropper.init();
              } else {
                if (data) item.popup.editor.cropper.crop = data;
                item.popup.editor.cropper.init(data);
              }
            }
          },

          /**
                             * resize
                             * resize a canvas image
                             *
           * @namespace editor
                             * @param {HTML} img
                             * @param {HTML} canvas
                             * @param {Number} width - new width
                             * @param {Number} height - new height
                             * @param {Boolean} alpha - enable transparency on resize (!not available on smooth resize)
                             * @param {Boolean} fixedSize - fixed canvas size
                             * @void
                             */
          resize: function resize(img, canvas, width, height, alpha, fixedSize) {
            var context = canvas.getContext('2d'),
                width = !width && height ? height * img.width / img.height : width,
                height = !height && width ? width * img.height / img.width : height,
                ratio = img.width / img.height,
                optimalWidth = ratio >= 1 ? width : height * ratio,
                optimalHeight = ratio < 1 ? height : width / ratio;

            if (fixedSize && optimalWidth < width) {
              optimalHeight = optimalHeight * (width / optimalWidth);
              optimalWidth = width;
            }

            if (fixedSize && optimalHeight < height) {
              optimalWidth = optimalWidth * (height / optimalHeight);
              optimalHeight = height;
            }

            var steps = Math.min(Math.ceil(Math.log(img.width / optimalWidth) / Math.log(2)), 12);
            canvas.width = optimalWidth;
            canvas.height = optimalHeight; // if image is smaller than canvas or there are no resizing steps

            if (img.width < canvas.width || img.height < canvas.height || steps < 2) {
              // set canvas size as image size if size is not fixed
              if (!fixedSize) {
                canvas.width = Math.min(img.width, canvas.width);
                canvas.height = Math.min(img.height, canvas.height);
              } // alight image to center


              var x = img.width < canvas.width ? (canvas.width - img.width) / 2 : 0,
                  y = img.height < canvas.height ? (canvas.height - img.height) / 2 : 0; // draw image

              if (!alpha) {
                context.fillStyle = "#fff";
                context.fillRect(0, 0, canvas.width, canvas.height);
              }

              context.drawImage(img, x, y, Math.min(img.width, canvas.width), Math.min(img.height, canvas.height));
            } else {
              var oc = document.createElement('canvas'),
                  octx = oc.getContext('2d'),
                  factor = 2; // smooth resize

              oc.width = img.width / factor;
              oc.height = img.height / factor;
              octx.fillStyle = "#fff";
              octx.fillRect(0, 0, oc.width, oc.height);
              octx.drawImage(img, 0, 0, oc.width, oc.height);

              while (steps > 2) {
                var factor2 = factor + 2,
                    widthFactor = img.width / factor,
                    heightFactor = img.height / factor;
                if (widthFactor > oc.width) widthFactor = oc.width;
                if (heightFactor > oc.height) heightFactor = oc.height;
                octx.drawImage(oc, 0, 0, widthFactor, heightFactor, 0, 0, img.width / factor2, img.height / factor2);
                factor = factor2;
                steps--;
              } // draw image


              var widthFactor = img.width / factor,
                  heightFactor = img.height / factor;
              if (widthFactor > oc.width) widthFactor = oc.width;
              if (heightFactor > oc.height) heightFactor = oc.height;
              context.drawImage(oc, 0, 0, widthFactor, heightFactor, 0, 0, optimalWidth, optimalHeight);
              oc = octx = null;
            }

            context = null;
          },
          zoom: function zoom(item) {
            var inPopup = item.popup && item.popup.html && $('html').find(item.popup.html).length;
            if (!inPopup) return;

            if (!item.popup.zoomer) {
              var $popup = item.popup.html,
                  $node = $popup.find('.fileuploader-popup-node'),
                  $readerNode = $node.find('.reader-node'),
                  $imageEl = $readerNode.find('> img').attr('draggable', 'false').attr('ondragstart', 'return false;');
              item.popup.zoomer = {
                html: $popup.find('.fileuploader-popup-zoomer'),
                isActive: item.format == 'image' && item.reader.node && n.thumbnails.popup.zoomer,
                scale: 100,
                zoom: 100,
                init: function init() {
                  var zoomer = this; // disable plugin no images and IE

                  if (!zoomer.isActive || f._assets.isIE() || f._assets.isMobile()) return zoomer.html.hide() && $readerNode.addClass('has-node-centered'); // init

                  zoomer.hide();
                  zoomer.resize();
                  $(window).on('resize', zoomer.resize);
                  $(window).on('keyup keydown', zoomer.keyPress);
                  zoomer.html.find('input').on('input change', zoomer.range);
                  $readerNode.on('mousedown touchstart', zoomer.mousedown);
                  $node.on('mousewheel DOMMouseScroll', zoomer.scroll);
                },
                hide: function hide() {
                  var zoomer = this;
                  $(window).off('resize', zoomer.resize);
                  $(window).off('keyup keydown', zoomer.keyPress);
                  zoomer.html.find('input').off('input change', zoomer.range);
                  $readerNode.off('mousedown', zoomer.mousedown);
                  $node.off('mousewheel DOMMouseScroll', zoomer.scroll);
                },
                center: function center(prevDimensions) {
                  var zoomer = this,
                      left = 0,
                      top = 0;

                  if (!prevDimensions) {
                    left = Math.round(($node.width() - $readerNode.width()) / 2);
                    top = Math.round(($node.height() - $readerNode.height()) / 2);
                  } else {
                    left = zoomer.left;
                    top = zoomer.top;
                    left -= ($node.width() / 2 - zoomer.left) * ($readerNode.width() / prevDimensions[0] - 1);
                    top -= ($node.height() / 2 - zoomer.top) * ($readerNode.height() / prevDimensions[1] - 1);
                    if ($readerNode.width() <= $node.width()) left = Math.round(($node.width() - $readerNode.width()) / 2);
                    if ($readerNode.height() <= $node.height()) top = Math.round(($node.height() - $readerNode.height()) / 2);

                    if ($readerNode.width() > $node.width()) {
                      if (left > 0) left = 0;else if (left + $readerNode.width() < $node.width()) left = $node.width() - $readerNode.width();
                    }

                    if ($readerNode.height() > $node.height()) {
                      if (top > 0) top = 0;else if (top + $readerNode.height() < $node.height()) top = $node.height() - $readerNode.height();
                    }

                    top = Math.min(top, 0);
                  } // set styles


                  $readerNode.css({
                    left: (zoomer.left = left) + 'px',
                    top: (zoomer.top = top) + 'px'
                  });
                },
                resize: function resize() {
                  var zoomer = item.popup.zoomer;
                  $readerNode.removeAttr('style');
                  zoomer.scale = zoomer.getImageScale();
                  zoomer.updateView();
                },
                range: function range(e) {
                  var zoomer = item.popup.zoomer,
                      $input = $(this),
                      val = parseFloat($input.val());

                  if (zoomer.scale >= 100) {
                    e.preventDefault();
                    $input.val(zoomer.scale);
                    return;
                  }

                  if (val < zoomer.scale) {
                    e.preventDefault();
                    val = zoomer.scale;
                    $input.val(val);
                  }

                  zoomer.updateView(val, true);
                },
                scroll: function scroll(e) {
                  var zoomer = item.popup.zoomer,
                      delta = -100;

                  if (e.originalEvent) {
                    if (e.originalEvent.wheelDelta) delta = e.originalEvent.wheelDelta / -40;
                    if (e.originalEvent.deltaY) delta = e.originalEvent.deltaY;
                    if (e.originalEvent.detail) delta = e.originalEvent.detail;
                  }

                  zoomer[delta < 0 ? 'zoomIn' : 'zoomOut'](3);
                },
                keyPress: function keyPress(e) {
                  var zoomer = item.popup.zoomer,
                      type = e.type,
                      key = e.keyCode || e.which;
                  if (key != 32) return;
                  zoomer.hasSpacePressed = type == 'keydown';
                  if (zoomer.hasSpacePressed && zoomer.isZoomed()) $readerNode.addClass('is-amoving');else $readerNode.removeClass('is-amoving');
                },
                mousedown: function mousedown(e) {
                  var zoomer = item.popup.zoomer,
                      $target = $(e.target),
                      eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                      points = {
                    x: eventType == 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX,
                    y: eventType == 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY
                  },
                      callback = function callback() {
                    // set current state
                    zoomer.pointData = {
                      x: points.x,
                      y: points.y,
                      xTarget: points.x - zoomer.left,
                      yTarget: points.y - zoomer.top
                    };
                    $('body').css({
                      '-webkit-user-select': 'none',
                      '-moz-user-select': 'none',
                      '-ms-user-select': 'none',
                      'user-select': 'none'
                    });
                    $readerNode.addClass('is-moving'); // bind window mousemove event

                    $(document).on('mousemove', zoomer.mousemove);
                  };

                  if (e.which != 1) return;
                  if (zoomer.scale == 100 || zoomer.zoom == zoomer.scale) return; // check e.target

                  if (!zoomer.hasSpacePressed && $target[0] != $imageEl[0] && !$target.is('.fileuploader-cropper')) return; // mousedown event

                  if (eventType == 'mousedown') {
                    callback();
                  } // touchstart event


                  if (eventType == 'touchstart') {
                    zoomer.isTouchLongPress = true; // check if long press

                    setTimeout(function () {
                      if (!zoomer.isTouchLongPress) return;
                      delete zoomer.isTouchLongPress;
                      callback();
                    }, n.thumbnails.touchDelay ? n.thumbnails.touchDelay : 0);
                  } // bind window mouseup event


                  $(document).on('mouseup touchend', zoomer.mouseup);
                },
                mousemove: function mousemove(e) {
                  var zoomer = item.popup.zoomer,
                      eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                      points = {
                    x: eventType == 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX,
                    y: eventType == 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY
                  },
                      left = points.x - zoomer.pointData.xTarget,
                      top = points.y - zoomer.pointData.yTarget; // fix the positon

                  if (top > 0) top = 0;
                  if (top < $node.height() - $readerNode.height()) top = $node.height() - $readerNode.height();

                  if ($readerNode.height() < $node.height()) {
                    top = $node.height() / 2 - $readerNode.height() / 2;
                  }

                  if ($readerNode.width() > $node.width()) {
                    if (left > 0) left = 0;
                    if (left < $node.width() - $readerNode.width()) left = $node.width() - $readerNode.width();
                  } else {
                    left = $node.width() / 2 - $readerNode.width() / 2;
                  } // set styles


                  $readerNode.css({
                    left: (zoomer.left = left) + 'px',
                    top: (zoomer.top = top) + 'px'
                  });
                },
                mouseup: function mouseup(e) {
                  var zoomer = item.popup.zoomer;
                  delete zoomer.pointData;
                  $('body').css({
                    '-webkit-user-select': '',
                    '-moz-user-select': '',
                    '-ms-user-select': '',
                    'user-select': ''
                  });
                  $readerNode.removeClass('is-moving');
                  $(document).off('mousemove', zoomer.mousemove);
                  $(document).off('mouseup', zoomer.mouseup);
                },
                zoomIn: function zoomIn(val) {
                  var zoomer = item.popup.zoomer,
                      step = val || 20;
                  if (zoomer.zoom >= 100) return;
                  zoomer.zoom = Math.min(100, zoomer.zoom + step);
                  zoomer.updateView(zoomer.zoom);
                },
                zoomOut: function zoomOut(val) {
                  var zoomer = item.popup.zoomer,
                      step = val || 20;
                  if (zoomer.zoom <= zoomer.scale) return;
                  zoomer.zoom = Math.max(zoomer.scale, zoomer.zoom - step);
                  zoomer.updateView(zoomer.zoom);
                },
                updateView: function updateView(val, input) {
                  var zoomer = this,
                      width = zoomer.getImageSize().width / 100 * val,
                      height = zoomer.getImageSize().height / 100 * val,
                      curWidth = $readerNode.width(),
                      curHeight = $readerNode.height(),
                      valueChanged = val && val != zoomer.scale;
                  if (!zoomer.isActive) return zoomer.center();
                  if (valueChanged) $readerNode.addClass('is-movable').css({
                    width: width + 'px',
                    height: height + 'px',
                    maxWidth: 'none',
                    maxHeight: 'none'
                  });else $readerNode.removeClass('is-movable is-amoving').removeAttr('style');
                  zoomer.zoom = val || zoomer.scale;
                  zoomer.center(valueChanged ? [curWidth, curHeight, zoomer.left, zoomer.top] : null);
                  zoomer.html.find('span').html(zoomer.zoom + '%');
                  if (!input) zoomer.html.find('input').val(zoomer.zoom);
                  if (val && item.popup.editor && item.popup.editor.cropper) item.popup.editor.cropper.resize(true);
                },
                isZoomed: function isZoomed() {
                  var zoomer = this;
                  return zoomer.zoom > zoomer.scale;
                },
                getImageSize: function getImageSize() {
                  var zoomer = this;
                  return {
                    width: $imageEl.prop('naturalWidth'),
                    height: $imageEl.prop('naturalHeight')
                  };
                },
                getImageScale: function getImageScale() {
                  var zoomer = this;
                  return Math.round(100 / ($imageEl.prop('naturalWidth') / $imageEl.width()));
                }
              };
            }

            item.popup.zoomer.init();
          },

          /**
                             * save
                             * save edited image
           * show cropping tools, only when popup is enabled
                             *
           * @namespace editor
                             * @param {Object} item
                             * @void
                             */
          save: function save(item, toBlob, mimeType, callback, preventThumbnailRender) {
            var inPopup = item.popup && item.popup.html && $('html').find(item.popup.html).length,
                image = new Image(),
                onload = function onload() {
              if (!item.reader.node) return; // update thumbnail

              var canvas = document.createElement('canvas'),
                  ctx = canvas.getContext('2d'),
                  image = this,
                  rotationCf = [0, 180]; // set canvas size and image

              canvas.width = item.reader.width;
              canvas.height = item.reader.height;
              ctx.drawImage(image, 0, 0, item.reader.width, item.reader.height); // rotate image

              if (typeof item.editor.rotation != 'undefined') {
                item.editor.rotation = item.editor.rotation || 0;
                canvas.width = rotationCf.indexOf(item.editor.rotation) > -1 ? item.reader.width : item.reader.height;
                canvas.height = rotationCf.indexOf(item.editor.rotation) > -1 ? item.reader.height : item.reader.width;
                var angle = item.editor.rotation * Math.PI / 180,
                    cw = canvas.width * 0.5,
                    ch = canvas.height * 0.5; // clear context

                ctx.clearRect(0, 0, canvas.width, canvas.height); // rotate context

                ctx.translate(cw, ch);
                ctx.rotate(angle);
                ctx.translate(-item.reader.width * 0.5, -item.reader.height * 0.5); // draw image and reset transform

                ctx.drawImage(image, 0, 0);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
              } // crop image


              if (item.editor.crop) {
                var cut = ctx.getImageData(item.editor.crop.left, item.editor.crop.top, item.editor.crop.width, item.editor.crop.height);
                canvas.width = item.editor.crop.width;
                canvas.height = item.editor.crop.height; // put image

                ctx.putImageData(cut, 0, 0);
              } // export image


              var type = mimeType || item.type || 'image/jpeg',
                  quality = n.editor.quality || 90,
                  exportDataURI = canvas.toDataURL(type, quality / 100),
                  nextStep = function nextStep(exportDataURI, img) {
                var data = !toBlob ? exportDataURI : f._assets.dataURItoBlob(exportDataURI, type);
                !preventThumbnailRender ? f.thumbnails.renderThumbnail(item, true, img || exportDataURI) : null;
                callback ? callback(data, item, l, p, o, s) : null;
                n.editor.onSave != null && typeof n.editor.onSave == "function" ? n.editor.onSave(data, item, l, p, o, s) : null;
                f.set('listInput', null);
              }; // resize image if maxWidth


              if (n.editor.maxWidth || n.editor.maxHeight) {
                var img = new Image();
                img.src = exportDataURI;

                img.onload = function () {
                  var canvas2 = document.createElement('canvas'); // resize canvas

                  f.editor.resize(img, canvas2, n.editor.maxWidth, n.editor.maxHeight, true, false);
                  exportDataURI = canvas2.toDataURL(type, quality / 100);
                  nextStep(exportDataURI, img);
                  canvas = ctx = canvas2 = null;
                };
              } else {
                nextStep(exportDataURI);
                canvas = ctx = null;
              }
            };

            if (inPopup) {
              if (!item.popup.editor.hasChanges) return;
              var scale = item.popup.editor.scale || 1;
              item.editor.rotation = item.popup.editor.rotation || 0;

              if (item.popup.editor.cropper) {
                item.editor.crop = item.popup.editor.cropper.crop;
                item.editor.crop.width = item.editor.crop.width / item.popup.editor.cropper.crop.cfWidth / scale;
                item.editor.crop.left = item.editor.crop.left / item.popup.editor.cropper.crop.cfWidth / scale;
                item.editor.crop.height = item.editor.crop.height / item.popup.editor.cropper.crop.cfHeight / scale;
                item.editor.crop.top = item.editor.crop.top / item.popup.editor.cropper.crop.cfHeight / scale;
              }
            }

            if (f._assets.isMobile()) {
              image.onload = onload;
              image.src = item.reader.src;
            } else if (item.reader.node) {
              onload.call(item.reader.node);
            } else {
              item.reader.read(function () {
                onload.call(item.reader.node);
              });
            }
          }
        },

        /**
                        * @namespace sorter
                        */
        sorter: {
          init: function init() {
            p.on('mousedown touchstart', n.thumbnails._selectors.sorter, f.sorter.mousedown);
          },
          destroy: function destroy() {
            p.off('mousedown touchstart', n.thumbnails._selectors.sorter, f.sorter.mousedown);
          },
          findItemAtPos: function findItemAtPos(points) {
            var sort = f.sorter.sort,
                $list = sort.items.not(sort.item.html),
                $item = null;
            $list.each(function (i, el) {
              var $el = $(el);

              if (points.x > $el.offset().left && points.x < $el.offset().left + $el.outerWidth() && points.y > $el.offset().top && points.y < $el.offset().top + $el.outerHeight()) {
                $item = $el;
                return false;
              }
            });
            return $item;
          },
          mousedown: function mousedown(e) {
            var eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                $target = $(e.target),
                $item = $target.closest(n.thumbnails._selectors.item),
                item = f.files.find($item),
                points = {
              x: eventType == 'mousedown' || !$item.length ? e.pageX : e.originalEvent.touches[0].pageX,
              y: eventType == 'mousedown' || !$item.length ? e.pageY : e.originalEvent.touches[0].pageY
            },
                callback = function callback() {
              // set current state
              f.sorter.sort = {
                el: $target,
                item: item,
                items: l.find(n.thumbnails._selectors.item),
                x: points.x,
                y: points.y,
                xItem: points.x - $item.offset().left,
                yItem: points.y - $item.offset().top,
                left: $item.position().left,
                top: $item.position().top,
                width: $item.outerWidth(),
                height: $item.outerHeight(),
                placeholder: n.sorter.placeholder ? $(n.sorter.placeholder) : item.html.clone().addClass('fileuploader-sorter-placeholder').html('')
              }; // disable user-select

              $('body').css({
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none'
              }); // bind window mousemove event

              $(document).on('mousemove touchmove', f.sorter.mousemove);
            };

            e.preventDefault(); // off

            if (f.sorter.sort) f.sorter.mouseup(); // prevent if there is no item

            if (!item) return; // prevent if target is selectorExclude

            if (n.sorter.selectorExclude && ($target.is(n.sorter.selectorExclude) || $target.closest(n.sorter.selectorExclude).length)) return; // preventDefault();

            $(n.thumbnails._selectors.sorter).on('click drop dragend dragleave dragover dragenter dragstart touchstart touchmove touchend touchcancel', function (e) {
              e.preventDefault();
            }); // mousedown event

            if (eventType == 'mousedown') {
              // bind cropping start event
              callback();
            } // touchstart event


            if (eventType == 'touchstart') {
              f.sorter.isTouchLongPress = true; // check if long press

              setTimeout(function () {
                if (!f.sorter.isTouchLongPress) return;
                delete f.sorter.isTouchLongPress;
                callback();
              }, n.thumbnails.touchDelay ? n.thumbnails.touchDelay : 0);
            } // bind window mouseup event


            $(document).on('mouseup touchend', f.sorter.mouseup);
          },
          mousemove: function mousemove(e) {
            var eventType = e.originalEvent.touches && e.originalEvent.touches[0] ? 'touchstart' : 'mousedown',
                sort = f.sorter.sort,
                item = sort.item,
                $list = l.find(n.thumbnails._selectors.item),
                $container = $(n.sorter.scrollContainer || window),
                scroll = {
              left: $(document).scrollLeft(),
              top: $(document).scrollTop(),
              containerLeft: $container.scrollLeft(),
              containerTop: $container.scrollTop()
            },
                points = {
              x: eventType == 'mousedown' ? e.clientX : e.originalEvent.touches[0].clientX,
              y: eventType == 'mousedown' ? e.clientY : e.originalEvent.touches[0].clientY
            };
            e.preventDefault(); // drag

            var left = points.x - sort.xItem,
                top = points.y - sort.yItem,
                leftContainer = points.x - ($container.prop('offsetLeft') || 0),
                topContainer = points.y - ($container.prop('offsetTop') || 0); // fix position

            if (left + sort.xItem > $container.width()) left = $container.width() - sort.xItem;
            if (left + sort.xItem < 0) left = 0 - sort.xItem;
            if (top + sort.yItem > $container.height()) top = $container.height() - sort.yItem;
            if (top + sort.yItem < 0) top = 0 - sort.yItem; // scroll

            if (topContainer <= 0) $container.scrollTop(scroll.containerTop - 10);
            if (topContainer > $container.height()) $container.scrollTop(scroll.containerTop + 10);
            if (leftContainer < 0) $container.scrollLeft(scroll.containerLeft - 10);
            if (leftContainer > $container.width()) $container.scrollLeft(scroll.containerLeft + 10); // set style

            item.html.addClass('sorting').css({
              position: 'fixed',
              left: left,
              top: top,
              width: f.sorter.sort.width,
              height: f.sorter.sort.height
            }); // position placeholder

            if (!l.find(sort.placeholder).length) item.html.after(sort.placeholder);
            sort.placeholder.css({
              width: f.sorter.sort.width,
              height: f.sorter.sort.height
            }); // set new position

            var $hoverEl = f.sorter.findItemAtPos({
              x: left + sort.xItem + scroll.left,
              y: top + sort.yItem + scroll.top
            });

            if ($hoverEl) {
              // prevent drag issue
              var directionX = sort.placeholder.offset().left != $hoverEl.offset().left,
                  directionY = sort.placeholder.offset().top != $hoverEl.offset().top;

              if (f.sorter.sort.lastHover) {
                if (f.sorter.sort.lastHover.el == $hoverEl[0]) {
                  if (directionY && f.sorter.sort.lastHover.direction == 'before' && points.y < f.sorter.sort.lastHover.y) return;
                  if (directionY && f.sorter.sort.lastHover.direction == 'after' && points.y > f.sorter.sort.lastHover.y) return;
                  if (directionX && f.sorter.sort.lastHover.direction == 'before' && points.x < f.sorter.sort.lastHover.x) return;
                  if (directionX && f.sorter.sort.lastHover.direction == 'after' && points.x > f.sorter.sort.lastHover.x) return;
                }
              } // insert element before/after in HTML


              var index = $list.index(item.html),
                  hoverIndex = $list.index($hoverEl),
                  direction = index > hoverIndex ? 'before' : 'after';
              $hoverEl[direction](sort.placeholder);
              $hoverEl[direction](item.html); // save last hover data

              f.sorter.sort.lastHover = {
                el: $hoverEl[0],
                x: points.x,
                y: points.y,
                direction: direction
              };
            }
          },
          mouseup: function mouseup() {
            var sort = f.sorter.sort,
                item = sort.item; // clear

            $('body').css({
              '-webkit-user-select': '',
              '-moz-user-select': '',
              '-ms-user-select': '',
              'user-select': ''
            });
            item.html.removeClass('sorting').css({
              position: '',
              left: '',
              top: '',
              width: '',
              height: ''
            });
            $(document).off('mousemove touchmove', f.sorter.mousemove);
            $(document).off('mouseup touchend', f.sorter.mouseup);
            sort.placeholder.remove();
            delete f.sorter.sort;
            f.sorter.save();
          },
          save: function save(isFromList) {
            var index = 0,
                list = [],
                cachedList = [],
                items = isFromList ? f._itFl : n.thumbnails.itemPrepend ? l.children().get().reverse() : l.children(),
                hasChanges; // set index for all files

            $.each(items, function (i, el) {
              var item = el.file ? el : f.files.find($(el));

              if (item) {
                // continue if not uploaded
                if (item.upload && !item.uploaded) return; // check for changes

                if (f.rendered && item.index != index && (f._itSl && f._itSl.indexOf(item.id) != index || true)) hasChanges = true;
                item.index = index;
                list.push(item);
                cachedList.push(item.id);
                index++;
              }
            }); // check for changes

            if (f._itSl && f._itSl.length != cachedList.length) hasChanges = true;
            f._itSl = cachedList; // replace list

            if (hasChanges && list.length == f._itFl.length) f._itFl = list; // update listInput

            if (!isFromList) f.set('listInput', 'ignoreSorter'); // onSort callback

            hasChanges && n.sorter.onSort != null && typeof n.sorter.onSort == "function" ? n.sorter.onSort(list, l, p, o, s) : null;
          }
        },

        /**
         * @namespace upload
         */
        upload: {
          /**
                             * prepare
                             * prepare item ajax data and also item ajax methods
                             *
           * @namespace upload
                             * @param {Object} item
           * @param {bool} force_send - force ajax sending after prepare
                             * @void
                             */
          prepare: function prepare(item, force_send) {
            // create item upload object
            item.upload = {
              url: n.upload.url,
              data: $.extend({}, n.upload.data),
              formData: new FormData(),
              type: n.upload.type || 'POST',
              enctype: n.upload.enctype || 'multipart/form-data',
              cache: false,
              contentType: false,
              processData: false,
              chunk: item.upload ? item.upload.chunk : null,
              status: null,
              send: function send() {
                f.upload.send(item, true);
              },
              cancel: function cancel(isFromRemove) {
                f.upload.cancel(item, isFromRemove);
              }
            }; // add file to formData

            item.upload.formData.append(s.attr('name'), item.file, item.name ? item.name : false);
            if (n.upload.start || force_send) f.upload.send(item, force_send);
          },

          /**
                             * send
                             * send item ajax
                             *
           * @namespace upload
                             * @param {Object} item
           * @param {bool} force_send - skip the synchron functions and force ajax sending
                             * @void
                             */
          send: function send(item, force_send) {
            // skip if upload settings were not prepared
            // only made for safety
            if (!item.upload) return;

            var setItemUploadStatus = function setItemUploadStatus(status) {
              if (item.html) item.html.removeClass('upload-pending upload-loading upload-cancelled upload-failed upload-success').addClass('upload-' + (status || item.upload.status));
            },
                loadNextItem = function loadNextItem() {
              var i = 0;

              if (f._pfuL.length > 0) {
                f._pfuL.indexOf(item) > -1 ? f._pfuL.splice(f._pfuL.indexOf(item), 1) : null;

                while (i < f._pfuL.length) {
                  if (f._itFl.indexOf(f._pfuL[i]) > -1 && f._pfuL[i].upload && !f._pfuL[i].upload.$ajax) {
                    f.upload.send(f._pfuL[i], true);
                    break;
                  } else {
                    f._pfuL.splice(i, 1);
                  }

                  i++;
                }
              }
            }; // synchron upload


            if (n.upload.synchron && !item.upload.chunk) {
              // add pending status to item
              item.upload.status = 'pending';
              if (item.html) setItemUploadStatus(); // check pending list

              if (force_send) {
                f._pfuL.indexOf(item) > -1 ? f._pfuL.splice(f._pfuL.indexOf(item), 1) : null;
              } else {
                f._pfuL.indexOf(item) == -1 ? f._pfuL.push(item) : null;

                if (f._pfuL.length > 1) {
                  return;
                }
              }
            } // chunk upload


            if (n.upload.chunk && item.file.slice) {
              var chunkSize = n.upload.chunk * 1e+6,
                  chunks = Math.ceil(item.size / chunkSize, chunkSize);
              if (chunks > 1 && !item.upload.chunk) item.upload.chunk = {
                name: item.name,
                size: item.file.size,
                type: item.file.type,
                chunkSize: chunkSize,
                temp_name: item.name,
                loaded: 0,
                total: chunks,
                i: -1
              };

              if (item.upload.chunk) {
                item.upload.chunk.i++;
                delete item.upload.chunk.isFirst;
                delete item.upload.chunk.isLast;
                if (item.upload.chunk.i == 0) item.upload.chunk.isFirst = true;
                if (item.upload.chunk.i == item.upload.chunk.total - 1) item.upload.chunk.isLast = true;

                if (item.upload.chunk.i <= item.upload.chunk.total - 1) {
                  var offset = item.upload.chunk.i * item.upload.chunk.chunkSize,
                      filePart = item.file.slice(offset, offset + item.upload.chunk.chunkSize);
                  item.upload.formData = new FormData();
                  item.upload.formData.append(s.attr('name'), filePart);
                  item.upload.data._chunkedd = JSON.stringify(item.upload.chunk);
                } else {
                  delete item.upload.chunk;
                }
              }
            } // upload.beforeSend callback


            if (n.upload.beforeSend && $.isFunction(n.upload.beforeSend) && n.upload.beforeSend(item, l, p, o, s) === false) {
              delete item.upload.chunk;
              setItemUploadStatus();
              loadNextItem();
              return;
            } // add uploading class to parent element


            p.addClass('fileuploader-is-uploading'); // add loading status to item

            if (item.upload.$ajax) item.upload.$ajax.abort();
            delete item.upload.$ajax;
            delete item.upload.send;
            item.upload.status = 'loading';

            if (item.html) {
              if (n.thumbnails._selectors.start) item.html.find(n.thumbnails._selectors.start).remove();
              setItemUploadStatus();
            } // add upload data to formData


            if (item.upload.data) {
              for (var k in item.upload.data) {
                if (!item.upload.data.hasOwnProperty(k)) continue;
                item.upload.formData.append(k, item.upload.data[k]);
              }
            }

            item.upload.data = item.upload.formData;

            item.upload.xhr = function () {
              var xhr = $.ajaxSettings.xhr(),
                  xhrStartedAt = item.upload.chunk && item.upload.chunk.xhrStartedAt ? item.upload.chunk.xhrStartedAt : new Date();

              if (xhr.upload) {
                xhr.upload.addEventListener("progress", function (e) {
                  if (item.upload.$ajax) {
                    item.upload.$ajax.total = item.upload.chunk ? item.upload.chunk.size : e.total;
                    item.upload.$ajax.xhrStartedAt = xhrStartedAt;
                  }

                  f.upload.progressHandling(e, item, xhrStartedAt);
                }, false);
              }

              return xhr;
            };

            item.upload.complete = function (jqXHR, textStatus) {
              if (item.upload.chunk && !item.upload.chunk.isLast && textStatus == 'success') return f.upload.send(item);
              loadNextItem();
              var g = true;
              $.each(f._itFl, function (i, a) {
                if (a.upload && a.upload.$ajax) g = false;
              });

              if (g) {
                p.removeClass('fileuploader-is-uploading');
                n.upload.onComplete != null && typeof n.upload.onComplete == "function" ? n.upload.onComplete(l, p, o, s, jqXHR, textStatus) : null;
              }
            };

            item.upload.success = function (data, textStatus, jqXHR) {
              if (item.upload.chunk && !item.upload.chunk.isLast) {
                try {
                  var json = JSON.parse(data);
                  item.upload.chunk.temp_name = json.fileuploader.temp_name;
                } catch (e) {}

                return;
              }

              delete item.upload.chunk;
              f.upload.progressHandling(null, item, item.upload.$ajax.xhrStartedAt, true);
              item.uploaded = true;
              delete item.upload;
              item.upload = {
                status: 'successful',
                resend: function resend() {
                  f.upload.retry(item);
                }
              };
              if (item.html) setItemUploadStatus();
              n.upload.onSuccess != null && $.isFunction(n.upload.onSuccess) ? n.upload.onSuccess(data, item, l, p, o, s, textStatus, jqXHR) : null;
              f.set('listInput', null);
            };

            item.upload.error = function (jqXHR, textStatus, errorThrown) {
              if (item.upload.chunk) item.upload.chunk.i = Math.max(-1, item.upload.chunk.i - 1);
              item.uploaded = false;
              item.upload.status = item.upload.status == 'cancelled' ? item.upload.status : 'failed';

              item.upload.retry = function () {
                f.upload.retry(item);
              };

              delete item.upload.$ajax;
              if (item.html) setItemUploadStatus();
              n.upload.onError != null && $.isFunction(n.upload.onError) ? n.upload.onError(item, l, p, o, s, jqXHR, textStatus, errorThrown) : null;
            }; // send


            item.upload.$ajax = $.ajax(item.upload);
          },

          /**
                             * cancel
                             * cancel item ajax request
                             *
           * @namespace upload
                             * @param {Object} item
                             * @void
                             */
          cancel: function cancel(item, isFromRemove) {
            if (item && item.upload) {
              item.upload.status = 'cancelled';
              delete item.upload.chunk;
              item.upload.$ajax ? item.upload.$ajax.abort() : null;
              delete item.upload.$ajax;
              !isFromRemove ? f.files.remove(item) : null;
            }
          },

          /**
                             * retry
                             * retry item ajax upload
                             *
           * @namespace upload
                             * @param {Object} item
                             * @void
                             */
          retry: function retry(item) {
            if (item && item.upload) {
              if (item.html && n.thumbnails._selectors.retry) item.html.find(n.thumbnails._selectors.retry).remove();
              f.upload.prepare(item, true);
            }
          },

          /**
                             * progressHandling
                             * item ajax progress function
                             *
           * @namespace upload
                             * @param {Event} e - xhr event
           * @param {Object} item
           * @param {Date} xhrStartedAt - request started Date()
           * @param {Boolean} isManual - check if function was manually called
                             * @void
                             */
          progressHandling: function progressHandling(e, item, xhrStartedAt, isManual) {
            if (!e && isManual && item.upload.$ajax) e = {
              total: item.upload.$ajax.total,
              loaded: item.upload.$ajax.total,
              lengthComputable: true
            };

            if (e.lengthComputable) {
              var loaded = e.loaded + (item.upload.chunk ? item.upload.chunk.loaded : 0),
                  total = item.upload.chunk ? item.upload.chunk.size : e.total,
                  percentage = Math.round(loaded * 100 / total),
                  timeStarted = item.upload.chunk && item.upload.chunk.xhrStartedAt ? item.upload.chunk.xhrStartedAt : xhrStartedAt,
                  secondsElapsed = (new Date().getTime() - timeStarted.getTime()) / 1000,
                  bytesPerSecond = secondsElapsed ? loaded / secondsElapsed : 0,
                  remainingBytes = Math.max(0, total - loaded),
                  secondsRemaining = Math.max(0, secondsElapsed ? remainingBytes / bytesPerSecond : 0),
                  data = {
                loaded: loaded,
                loadedInFormat: f._assets.bytesToText(loaded),
                total: total,
                totalInFormat: f._assets.bytesToText(total),
                percentage: percentage,
                secondsElapsed: secondsElapsed,
                secondsElapsedInFormat: f._assets.secondsToText(secondsElapsed, true),
                bytesPerSecond: bytesPerSecond,
                bytesPerSecondInFormat: f._assets.bytesToText(bytesPerSecond) + '/s',
                remainingBytes: remainingBytes,
                remainingBytesInFormat: f._assets.bytesToText(remainingBytes),
                secondsRemaining: secondsRemaining,
                secondsRemainingInFormat: f._assets.secondsToText(secondsRemaining, true)
              };

              if (item.upload.chunk) {
                if (item.upload.chunk.isFirst) item.upload.chunk.xhrStartedAt = xhrStartedAt;
                if (e.loaded == e.total && !item.upload.chunk.isLast) item.upload.chunk.loaded += Math.max(e.total, item.upload.chunk.total / item.upload.chunk.chunkSize);
              }

              if (data.percentage > 99 && !isManual) data.percentage = 99; // upload.onProgress callback

              n.upload.onProgress && $.isFunction(n.upload.onProgress) ? n.upload.onProgress(data, item, l, p, o, s) : null;
            }
          }
        },

        /**
         * @namespace dragDrop
         */
        dragDrop: {
          /**
                             * onDragEnter
                             * on dragging file on the drag container
                             *
           * @namespace dragDrop
                             * @param {Event} e - jQuery event
                             * @void
                             */
          onDragEnter: function onDragEnter(e) {
            clearTimeout(f.dragDrop._timer); // add dragging class to parent element

            n.dragDrop.container.addClass('fileuploader-dragging'); // set feedback caption

            f.set('feedback', f._assets.textParse(n.captions.drop)); // dragDrop.onDragEnter callback

            n.dragDrop.onDragEnter != null && $.isFunction(n.dragDrop.onDragEnter) ? n.dragDrop.onDragEnter(e, l, p, o, s) : null;
          },

          /**
                             * onDragLeave
                             * on dragging leave from the drag container
                             *
           * @namespace dragDrop
                             * @param {Event} e - jQuery event
                             * @void
                             */
          onDragLeave: function onDragLeave(e) {
            clearTimeout(f.dragDrop._timer);
            f.dragDrop._timer = setTimeout(function (e) {
              // check if not the childNodes from dragging container are hovered
              if (!f.dragDrop._dragLeaveCheck(e)) {
                return false;
              } // remove dragging class from parent element


              n.dragDrop.container.removeClass('fileuploader-dragging'); // set feedback caption

              f.set('feedback', null); // dragDrop.onDragLeave callback

              n.dragDrop.onDragLeave != null && $.isFunction(n.dragDrop.onDragLeave) ? n.dragDrop.onDragLeave(e, l, p, o, s) : null;
            }, 100, e);
          },

          /**
                             * onDrop
                             * on drop files
                             *
           * @namespace dragDrop
                             * @param {Event} e - jQuery event
                             * @void
                             */
          onDrop: function onDrop(e) {
            clearTimeout(f.dragDrop._timer); // remove dragging class from parent element

            n.dragDrop.container.removeClass('fileuploader-dragging'); // set feedback caption

            f.set('feedback', null); // check if event has dropped files and use them

            if (e && e.originalEvent && e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files && e.originalEvent.dataTransfer.files.length) {
              if (f.isUploadMode()) {
                f.onChange(e, e.originalEvent.dataTransfer.files);
              } else {
                s.prop('files', e.originalEvent.dataTransfer.files).trigger('change');
              }
            } // dragDrop.onDrop callback


            n.dragDrop.onDrop != null && $.isFunction(n.dragDrop.onDrop) ? n.dragDrop.onDrop(e, l, p, o, s) : null;
          },

          /**
                             * _dragLeaveCheck
                             * check by the living from drag container if not the childNodes are hovered
                             *
           * @namespace dragDrop
                             * @param {Event} e - jQuery event
                             * @return {bool} return the leaving statement
                             */
          _dragLeaveCheck: function _dragLeaveCheck(e) {
            var related = $(e.currentTarget),
                insideEls;

            if (!related.is(n.dragDrop.container)) {
              insideEls = n.dragDrop.container.find(related);

              if (insideEls.length) {
                return false;
              }
            }

            return true;
          }
        },

        /**
         * @namespace clipboard
         */
        clipboard: {
          /**
                             * paste
                             * on pasting a file from clipboard on page
                             *
           * @namespace clipboard
                             * @param {Event} e - jQuery event
                             * @void
                             */
          paste: function paste(e) {
            // check if the input is into view and if clipboard is supported and if there are files in the clipboard
            if (!f._assets.isIntoView(o) || !e.originalEvent.clipboardData || !e.originalEvent.clipboardData.items || !e.originalEvent.clipboardData.items.length) return;
            var items = e.originalEvent.clipboardData.items; // extra clean

            f.clipboard.clean();

            for (var i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1 || items[i].type.indexOf("text/uri-list") !== -1) {
                var blob = items[i].getAsFile(),
                    ms = n.clipboardPaste > 1 ? n.clipboardPaste : 2000;

                if (blob) {
                  // create clipboard file name
                  blob._name = f._assets.generateFileName(blob.type.indexOf("/") != -1 ? blob.type.split("/")[1].toString().toLowerCase() : 'png', 'Clipboard '); // set clipboard timer

                  f.set('feedback', f._assets.textParse(n.captions.paste, {
                    ms: ms / 1000
                  }));
                  f.clipboard._timer = setTimeout(function () {
                    f.set('feedback', null);
                    f.onChange(e, [blob]);
                  }, ms - 2);
                }
              }
            }
          },

          /**
                             * clean
                             * clean the clipboard timer
                             *
           * @namespace clipboard
                             * @void
                             */
          clean: function clean() {
            if (f.clipboard._timer) {
              clearTimeout(f.clipboard._timer);
              delete f.clipboard._timer; // set feedback caption

              f.set('feedback', null);
            }
          }
        },

        /**
         * @namespace files
         */
        files: {
          /**
                             * add
                             * add a file to memory
                             *
           * @namespace files
                             * @param {Object} file
           * @param {String} prop - type of adding a file to memory
                             * @return {Number} index - index of the item in memory array
                             */
          add: function add(file, prop) {
            var name = file._name || file.name,
                size = file.size,
                size2 = f._assets.bytesToText(size),
                type = file.type,
                format = type ? type.split('/', 1).toString().toLowerCase() : '',
                extension = name.indexOf('.') != -1 ? name.split('.').pop().toLowerCase() : '',
                title = name.substr(0, name.length - (name.indexOf('.') != -1 ? extension.length + 1 : extension.length)),
                data = file.data || {},
                src = file.file || file,
                id = prop == 'updated' ? file.id : Date.now(),
                index,
                item,
                data = {
              name: name,
              title: title,
              size: size,
              size2: size2,
              type: type,
              format: format,
              extension: extension,
              data: data,
              file: src,
              reader: {
                read: function read(callback, type, force) {
                  return f.files.read(item, callback, type, force);
                }
              },
              id: id,
              input: prop == 'choosed' ? s : null,
              html: null,
              choosed: prop == 'choosed',
              appended: prop == 'appended' || prop == 'updated',
              uploaded: prop == 'uploaded'
            };

            if (prop != 'updated') {
              f._itFl.push(data);

              index = f._itFl.length - 1;
              item = f._itFl[index];
            } else {
              index = f._itFl.indexOf(file);
              f._itFl[index] = item = data;
            }

            item.remove = function () {
              f.files.remove(item);
            };

            if (n.editor && format == 'image') item.editor = {
              rotate: function rotate(deg) {
                f.editor.rotate(item, deg);
              },
              cropper: function cropper(data) {
                f.editor.crop(item, data);
              },
              save: function save(callback, toBlob, mimeType, preventThumbnailRender) {
                f.editor.save(item, toBlob, mimeType, callback, preventThumbnailRender);
              }
            };
            if (file.local) item.local = file.local;
            return index;
          },

          /**
           * read
           * read choosed file and sends the information to callback
           *
          * @namespace files
           * @param {Object} item
           * @param {Function} callback
           * @param {String} type - FileReader readAs type
           * @param {Boolean} force - force a new file read and ignore the existing
           * @param {Boolean} isThumb - is thumbnail
           * @return {null}
           */
          read: function read(item, callback, type, force, isThumb) {
            if (f.isFileReaderSupported() && !item.data.readerSkip) {
              var reader = new FileReader(),
                  URL = window.URL || window.webkitURL,
                  hasThumb = isThumb && item.data.thumbnail,
                  useFile = typeof item.file != 'string',
                  execute_callbacks = function execute_callbacks() {
                var _callbacks = item.reader._callbacks || [];

                if (item.reader._timer) {
                  clearTimeout(item.reader._timer);
                  delete item.reader._timer;
                }

                delete item.reader._callbacks;
                delete item.reader._FileReader;

                for (var i = 0; i < _callbacks.length; i++) {
                  $.isFunction(_callbacks[i]) ? _callbacks[i](item, l, p, o, s) : null;
                }

                n.onFileRead && $.isFunction(n.onFileRead) ? n.onFileRead(item, l, p, o, s) : null;
              };

              if (!item.reader.src && !item.reader._FileReader || force) item.reader = {
                _FileReader: reader,
                _callbacks: [],
                read: item.reader.read
              };
              if (item.reader.src && !force) return callback && $.isFunction(callback) ? callback(item, l, p, o, s) : null;

              if (callback && item.reader._callbacks) {
                item.reader._callbacks.push(callback);

                if (item.reader._callbacks.length > 1) return;
              }

              if (item.format == 'astext') {
                reader.onload = function (e) {
                  var node = document.createElement('div');
                  item.reader.node = node;
                  item.reader.src = e.target.result;
                  item.reader.length = e.target.result.length;
                  node.innerHTML = item.reader.src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                  execute_callbacks();
                };

                reader.onerror = function () {
                  execute_callbacks();
                  item.reader = {
                    read: item.reader.read
                  };
                };

                if (useFile) reader.readAsText(item.file);else $.ajax({
                  url: item.file,
                  success: function success(result) {
                    reader.onload({
                      target: {
                        result: result
                      }
                    });
                  },
                  error: function error() {
                    reader.onerror();
                  }
                });
              } else if (item.format == 'image' || hasThumb) {
                var src;

                reader.onload = function (e) {
                  var node = new Image(),
                      loadNode = function loadNode() {
                    if (item.data && item.data.readerCrossOrigin) node.setAttribute('crossOrigin', item.data.readerCrossOrigin);
                    node.src = e.target.result + ((item.data.readerForce || force) && !useFile && !hasThumb && e.target.result.indexOf('data:image') == -1 ? (e.target.result.indexOf('?') == -1 ? '?' : '&') + 'd=' + Date.now() : '');

                    node.onload = function () {
                      // exif rotate image
                      if (item.reader.exifOrientation) {
                        var canvas = document.createElement('canvas'),
                            ctx = canvas.getContext('2d'),
                            image = node,
                            rotation = item.reader.exifOrientation,
                            rotationCf = [0, 180]; // set canvas size and image

                        canvas.width = image.naturalWidth;
                        canvas.height = image.naturalHeight;
                        ctx.drawImage(image, 0, 0); // rotate image

                        canvas.width = rotationCf.indexOf(rotation) > -1 ? image.naturalWidth : image.naturalHeight;
                        canvas.height = rotationCf.indexOf(rotation) > -1 ? image.naturalHeight : image.naturalWidth;
                        var angle = rotation * Math.PI / 180,
                            cw = canvas.width * 0.5,
                            ch = canvas.height * 0.5; // clear context

                        ctx.clearRect(0, 0, canvas.width, canvas.height); // rotate context

                        ctx.translate(cw, ch);
                        ctx.rotate(angle);
                        ctx.translate(-image.naturalWidth * 0.5, -image.naturalHeight * 0.5); // draw image and reset transform

                        ctx.drawImage(image, 0, 0);
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        node.src = canvas.toDataURL(item.type, 1);
                        delete item.reader.exifOrientation;
                        return;
                      }

                      item.reader.node = node;
                      item.reader.src = node.src;
                      item.reader.width = node.width;
                      item.reader.height = node.height;
                      item.reader.ratio = f._assets.pxToRatio(item.reader.width, item.reader.height);
                      if (src) URL.revokeObjectURL(src);
                      execute_callbacks();
                      if (hasThumb) item.reader = {
                        read: item.reader.read
                      };
                    };

                    node.onerror = function () {
                      execute_callbacks();
                      item.reader = {
                        read: item.reader.read
                      };
                    };
                  }; // exif rotation


                  if (n.thumbnails.exif && item.choosed) {
                    f._assets.getExifOrientation(item.file, function (orientation) {
                      if (orientation) item.reader.exifOrientation = orientation;
                      loadNode();
                    });
                  } else {
                    loadNode();
                  }
                };

                reader.onerror = function () {
                  execute_callbacks();
                  item.reader = {
                    read: item.reader.read
                  };
                };

                if (!hasThumb && Math.round(item.size / 1e+6) > n.reader.maxSize) return reader.onerror();

                if (useFile) {
                  if (n.thumbnails.useObjectUrl && n.thumbnails.canvasImage && URL) reader.onload({
                    target: {
                      result: src = URL.createObjectURL(item.file)
                    }
                  });else reader.readAsDataURL(item.file);
                } else {
                  reader.onload({
                    target: {
                      result: hasThumb ? item.data.thumbnail : item.file
                    }
                  });
                }
              } else if (item.format == 'video' || item.format == 'audio') {
                var node = document.createElement(item.format),
                    canPlay = node.canPlayType(item.type),
                    src;

                reader.onerror = function () {
                  item.reader.node = null;
                  execute_callbacks();
                  item.reader = {
                    read: item.reader.read
                  };
                };

                if (URL && canPlay !== '') {
                  if (isThumb && !n.thumbnails.videoThumbnail) {
                    item.reader.node = node;
                    execute_callbacks();
                    item.reader = {
                      read: item.reader.read
                    };
                    return;
                  }

                  src = useFile ? URL.createObjectURL(item.file) : item.file;

                  node.onloadedmetadata = function () {
                    item.reader.node = node;
                    item.reader.src = node.src;
                    item.reader.duration = node.duration;
                    item.reader.duration2 = f._assets.secondsToText(node.duration);

                    if (item.format == 'video') {
                      item.reader.width = node.videoWidth;
                      item.reader.height = node.videoHeight;
                      item.reader.ratio = f._assets.pxToRatio(item.reader.width, item.reader.height);
                    }
                  };

                  node.onerror = function () {
                    execute_callbacks();
                    item.reader = {
                      read: item.reader.read
                    };
                  };

                  node.onloadeddata = function () {
                    if (item.format == 'video') {
                      var canvas = document.createElement('canvas'),
                          context = canvas.getContext('2d');
                      canvas.width = node.videoWidth;
                      canvas.height = node.videoHeight;
                      context.drawImage(node, 0, 0, canvas.width, canvas.height);
                      item.reader.frame = !f._assets.isBlankCanvas(canvas) ? canvas.toDataURL() : null;
                      canvas = context = null;
                    }

                    execute_callbacks();
                  }; // dirty fix


                  setTimeout(function () {
                    if (item.data && item.data.readerCrossOrigin) node.setAttribute('crossOrigin', item.data.readerCrossOrigin);
                    node.src = src + '#t=1';
                  }, 100);
                } else {
                  reader.onerror();
                }
              } else if (item.type == 'application/pdf' && n.thumbnails.pdf) {
                var node = document.createElement('iframe'),
                    src = useFile ? URL.createObjectURL(item.file) : (n.thumbnails.pdf.urlPrefix || '') + item.file;

                if (n.thumbnails.pdf.viewer || f._assets.hasPlugin('pdf')) {
                  node.onload = function () {
                    item.reader.node = node;
                    item.reader.src = node.src;
                    node.style.display = '';
                    execute_callbacks();
                  };

                  node.src = (n.thumbnails.pdf.viewer || '') + src;
                  node.style.display = 'none';
                  document.body.appendChild(node);
                } else {
                  execute_callbacks();
                }
              } else {
                reader.onload = function (e) {
                  item.reader.src = e.target.result;
                  item.reader.length = e.target.result.length;
                  execute_callbacks();
                };

                reader.onerror = function (e) {
                  execute_callbacks();
                  item.reader = {
                    read: item.reader.read
                  };
                };

                useFile ? reader[type || 'readAsBinaryString'](item.file) : execute_callbacks();
              }

              item.reader._timer = setTimeout(reader.onerror, isThumb ? n.reader.thumbnailTimeout : n.reader.timeout);
            } else {
              if (callback) callback(item, l, p, o, s);
            }

            return null;
          },

          /**
                             * list
                             * generate a list of files
                             *
           * @namespace files
                             * @param {bool} toJSON - generate a JSON list
           * @param {String} customKey - use a custom item attribute by generating
           * @param {Boolean} triggered - function was triggered from the API
           * @param {String} additional - additional settings
                             * @return {String|Object}
                             */
          list: function list(toJson, customKey, triggered, additional) {
            var files = []; // save sorter

            if (n.sorter && !triggered && (!additional || additional != 'ignoreSorter')) f.sorter.save(true);
            $.each(f._itFl, function (i, a) {
              var file = a;
              if (file.upload && !file.uploaded) return true;
              if (customKey || toJson) file = (file.choosed && !file.uploaded ? '0:/' : '') + (customKey && f.files.getItemAttr(a, customKey) !== null ? f.files.getItemAttr(file, customKey) : file.local || file[typeof file.file == "string" ? "file" : "name"]);

              if (toJson) {
                file = {
                  file: file
                }; // editor properties
                // add only if file was cropped or rotated

                if (a.editor && (a.editor.crop || a.editor.rotation)) {
                  file.editor = {};
                  if (a.editor.rotation) file.editor.rotation = a.editor.rotation;
                  if (a.editor.crop) file.editor.crop = a.editor.crop;
                } // sorting property


                if (typeof a.index !== 'undefined') {
                  file.index = a.index;
                } // custom properties


                if (a.data && a.data.listProps) {
                  for (var key in a.data.listProps) {
                    file[key] = a.data.listProps[key];
                  }
                }
              }

              files.push(file);
            });
            files = n.onListInput && $.isFunction(n.onListInput) ? n.onListInput(files, f._itFl, n.listInput, l, p, o, s) : files;
            return !toJson ? files : JSON.stringify(files);
          },

          /**
                             * check
                             * check the files
                             *
           * @namespace files
                             * @param {Object} item
           * @param {Array} files
           * @param {bool} fullCheck - check some parameters that should be checked only once
                             * @return {bool|Array} r
                             */
          check: function check(item, files, fullCheck) {
            var r = ["warning", null, false, false];

            if (n.limit != null && fullCheck && files.length + f._itFl.length - 1 > n.limit) {
              r[1] = f._assets.textParse(n.captions.errors.filesLimit);
              r[3] = true;
              return r;
            }

            if (n.maxSize != null && fullCheck) {
              var g = 0;
              $.each(f._itFl, function (i, a) {
                g += a.size;
              });
              g -= item.size;
              $.each(files, function (i, a) {
                g += a.size;
              });

              if (g > Math.round(n.maxSize * 1e+6)) {
                r[1] = f._assets.textParse(n.captions.errors.filesSizeAll);
                r[3] = true;
                return r;
              }
            }

            if (n.onFilesCheck != null && $.isFunction(n.onFilesCheck) && fullCheck) {
              var onFilesCheck = n.onFilesCheck(files, n, l, p, o, s);

              if (onFilesCheck === false) {
                r[3] = true;
                return r;
              }
            }

            if (n.extensions != null && $.inArray(item.extension, n.extensions) == -1 && !n.extensions.filter(function (val) {
              return item.type.length && (val.indexOf(item.type) > -1 || val.indexOf(item.format + '/*') > -1);
            }).length) {
              r[1] = f._assets.textParse(n.captions.errors.filesType, item);
              return r;
            }

            if (n.disallowedExtensions != null && ($.inArray(item.extension, n.disallowedExtensions) > -1 || n.disallowedExtensions.filter(function (val) {
              return !item.type.length || val.indexOf(item.type) > -1 || val.indexOf(item.format + '/*') > -1;
            }).length)) {
              r[1] = f._assets.textParse(n.captions.errors.filesType, item);
              return r;
            }

            if (n.fileMaxSize != null && item.size > n.fileMaxSize * 1e+6) {
              r[1] = f._assets.textParse(n.captions.errors.fileSize, item);
              return r;
            }

            if (item.size == 0 && item.type == "") {
              r[1] = f._assets.textParse(n.captions.errors.remoteFile, item);
              return r;
            }

            if (item.size == 4096 && item.type == "") {
              r[1] = f._assets.textParse(n.captions.errors.folderUpload, item);
              return r;
            }

            if (!n.skipFileNameCheck) {
              var g = false;
              $.each(f._itFl, function (i, a) {
                if (a != item && a.choosed == true && a.file && a.name == item.name) {
                  g = true;

                  if (a.file.size == item.size && a.file.type == item.type && (item.file.lastModified && a.file.lastModified ? a.file.lastModified == item.file.lastModified : true) && files.length > 1) {
                    r[2] = true;
                  } else {
                    r[1] = f._assets.textParse(n.captions.errors.fileName, item);
                    r[2] = false;
                  }

                  return false;
                }
              });

              if (g) {
                return r;
              }
            }

            return true;
          },

          /**
                             * append
                             * check the files
                             *
           * @namespace files
                             * @param {Array} files
                             * @return {bool|Object}
                             */
          append: function append(files) {
            files = $.isArray(files) ? files : [files];

            if (files.length) {
              var item;

              for (var i = 0; i < files.length; i++) {
                if (!f._assets.keyCompare(files[i], ['name', 'file', 'size', 'type'])) {
                  continue;
                }

                item = f._itFl[f.files.add(files[i], 'appended')];
                n.thumbnails ? f.thumbnails.item(item) : null;
              } // set feedback caption


              f.set('feedback', null); // set listInput value

              f.set('listInput', null); // afterSelect callback

              n.afterSelect && $.isFunction(n.afterSelect) ? n.afterSelect(l, p, o, s) : null;
              return files.length == 1 ? item : true;
            }
          },

          /**
           * update
           * update an item using new information
           *
          * @namespace files
           * @param {Object} item
           * @param {Object} data
           * @return void
           */
          update: function update(item, data) {
            if (f._itFl.indexOf(item) == -1 || item.upload && item.upload.$ajax) return;
            var oldItem = item,
                index = f.files.add($.extend(item, data), 'updated'),
                item = f._itFl[index];
            if (item.popup && item.popup.close) item.popup.close();
            if (n.thumbnails && oldItem.html) f.thumbnails.item(item, oldItem.html);
            f.set('listInput', null);
          },

          /**
                             * find
                             * find an item in memory using html element
                             *
           * @namespace files
                             * @param {jQuery Object} html
                             * @return {null,Object}
                             */
          find: function find(html) {
            var item = null;
            $.each(f._itFl, function (i, a) {
              if (a.html && a.html.is(html)) {
                item = a;
                return false;
              }
            });
            return item;
          },

          /**
                             * remove
                             * remove an item from memory and html
                             *
           * @namespace files
                             * @param {Object} item
                             * @param {bool} isFromCheck - if removing function was triggered by checking a file
                             * @return {null,Object}
                             */
          remove: function remove(item, isFromCheck) {
            // onRemove callback
            if (!isFromCheck && n.onRemove && $.isFunction(n.onRemove) && n.onRemove(item, l, p, o, s) === false) return; // thumbnails.onItemRemove callback

            if (item.html) n.thumbnails.onItemRemove && $.isFunction(n.thumbnails.onItemRemove) && !isFromCheck ? n.thumbnails.onItemRemove(item.html, l, p, o, s) : item.html.remove(); // cancel file upload

            if (item.upload && item.upload.$ajax && item.upload.cancel) item.upload.cancel(true); // remove popup

            if (item.popup && item.popup.close) item.popup.close(); // remove filereader

            if (item.reader.src) {
              item.reader.node = null;
              URL.revokeObjectURL(item.reader.src);
            } // check if any file is in the same input like item.input


            if (item.input) {
              var g = true;
              $.each(f._itFl, function (i, a) {
                if (item != a && (item.input == a.input || isFromCheck && item.input.get(0).files.length > 1)) {
                  g = false;
                  return false;
                }
              });

              if (g) {
                if (f.isAddMoreMode() && sl.length > 1) {
                  f.set('nextInput');
                  sl.splice(sl.indexOf(item.input), 1);
                  item.input.remove();
                } else {
                  f.set('input', '');
                }
              }
            } // remove data from memory


            f._pfrL.indexOf(item) > -1 ? f._pfrL.splice(f._pfrL.indexOf(item), 1) : null;
            f._pfuL.indexOf(item) > -1 ? f._pfuL.splice(f._pfuL.indexOf(item), 1) : null;
            f._itFl.indexOf(item) > -1 ? f._itFl.splice(f._itFl.indexOf(item), 1) : null;
            item = null; // reset the plugin if there are no any files in the memory

            f._itFl.length == 0 ? f.reset() : null; // set feedback caption

            f.set('feedback', null); // set listInput value

            f.set('listInput', null);
          },

          /**
                             * getItemAttr
                             * get an attribute from item or item.data
                             *
           * @namespace files
                             * @param {Object} item
           * @param {String} attr - attribute key
                             * @return {null,String}
                             */
          getItemAttr: function getItemAttr(item, attr) {
            var result = null;

            if (item) {
              if (typeof item[attr] != "undefined") {
                result = item[attr];
              } else if (item.data && typeof item.data[attr] != "undefined") {
                result = item.data[attr];
              }
            }

            return result;
          },

          /**
                             * clear
                             * clear files from the memory
           * delete also item.html and item.upload data
                             *
           * @namespace files
                             * @param {bool} all - delete also appended files?
                             * @void
                             */
          clear: function clear(all) {
            var i = 0;

            while (i < f._itFl.length) {
              var a = f._itFl[i];

              if (!all && a.appended) {
                i++;
                continue;
              }

              if (a.html) a.html ? f._itFl[i].html.remove() : null;
              if (a.upload && a.upload.$ajax) f.upload.cancel(a);

              f._itFl.splice(i, 1);
            } // set feedback caption


            f.set('feedback', null); // set listInput value

            f.set('listInput', null); // onEmpty callback

            f._itFl.length == 0 && n.onEmpty && $.isFunction(n.onEmpty) ? n.onEmpty(l, p, o, s) : null;
          }
        },

        /**
         * reset
         * reset the plugin
         *
         * @param {bool} all - remove also appended files?
         * @void
         */
        reset: function reset(all) {
          if (all) {
            if (f.clipboard._timer) f.clipboard.clean();
            $.each(sl, function (i, a) {
              if (i < sl.length) a.remove();
            });
            sl = [];
            f.set('input', '');
          }

          f._itRl = [];
          f._pfuL = [];
          f._pfrL = [];
          f.files.clear(all);
        },

        /**
         * destroy
         * destroy the plugin
         *
         * @void
         */
        destroy: function destroy() {
          f.reset(true);
          f.bindUnbindEvents(false);
          s.removeAttr('style');
          p.before(s);
          delete s.get(0).FileUploader;
          p.remove();
          p = o = l = null;
        },

        /**
         * @namespace _assets
         */
        _assets: {
          bytesToText: function bytesToText(bytes) {
            if (bytes == 0) return '0 Byte';
            var k = 1024,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
          },
          escape: function escape(str) {
            return ('' + str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
          },
          secondsToText: function secondsToText(seconds, textFormat) {
            seconds = parseInt(Math.round(seconds), 10);
            var hours = Math.floor(seconds / 3600),
                minutes = Math.floor((seconds - hours * 3600) / 60),
                seconds = seconds - hours * 3600 - minutes * 60,
                result = "";

            if (hours > 0 || !textFormat) {
              result += (hours < 10 ? "0" : "") + hours + (textFormat ? "h " : ":");
            }

            if (minutes > 0 || !textFormat) {
              result += (minutes < 10 && !textFormat ? "0" : "") + minutes + (textFormat ? "m " : ":");
            }

            result += (seconds < 10 && !textFormat ? "0" : "") + seconds + (textFormat ? "s" : "");
            return result;
          },
          pxToRatio: function pxToRatio(width, height) {
            var gcd = function gcd(a, b) {
              return b == 0 ? a : gcd(b, a % b);
            },
                r = gcd(width, height);

            return [width / r, height / r];
          },
          ratioToPx: function ratioToPx(width, height, ratio) {
            ratio = (ratio + '').split(':');
            if (ratio.length < 2) return null;
            var rWidth = height / ratio[1] * ratio[0],
                rHeight = width / ratio[0] * ratio[1];
            return [rWidth, rHeight, ratio[0], ratio[1]];
          },
          hasAttr: function hasAttr(attr, el) {
            var el = !el ? s : el,
                a = el.attr(attr);

            if (!a || typeof a == 'undefined') {
              return false;
            } else {
              return true;
            }
          },
          copyAllAttributes: function copyAllAttributes(newEl, oldEl) {
            $.each(oldEl.get(0).attributes, function () {
              if (this.name == 'required' || this.name == 'type') return;
              newEl.attr(this.name, this.value);
            });
            if (oldEl.get(0).FileUploader) newEl.get(0).FileUploader = oldEl.get(0).FileUploader;
            return newEl;
          },
          getAllEvents: function getAllEvents(el) {
            var el = !el ? s : el,
                result = [];
            el = el.get ? el.get(0) : el;

            for (var key in el) {
              if (key.indexOf('on') === 0) {
                result.push(key.slice(2));
              }
            }

            if (result.indexOf('change') == -1) result.push('change');
            return result.join(' ');
          },
          isIntoView: function isIntoView(el) {
            var windowTop = $(window).scrollTop(),
                windowBottom = windowTop + window.innerHeight,
                elTop = el.offset().top,
                elBottom = elTop + el.outerHeight();
            return windowTop < elTop && windowBottom > elBottom;
          },
          isBlankCanvas: function isBlankCanvas(canvas) {
            var blank = document.createElement('canvas'),
                result = false;
            blank.width = canvas.width;
            blank.height = canvas.height;

            try {
              result = canvas.toDataURL() == blank.toDataURL();
            } catch (e) {}

            blank = null;
            return result;
          },
          generateFileName: function generateFileName(extension, prefix) {
            var date = new Date(),
                addZero = function addZero(x) {
              if (x < 10) x = "0" + x;
              return x;
            },
                prefix = prefix ? prefix : '',
                extension = extension ? '.' + extension : '';

            return prefix + date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + '-' + addZero(date.getMinutes()) + '-' + addZero(date.getSeconds()) + extension;
          },
          arrayBufferToBase64: function arrayBufferToBase64(buffer) {
            var binary = '',
                bytes = new Uint8Array(buffer);

            for (var i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }

            return window.btoa(binary);
          },
          dataURItoBlob: function dataURItoBlob(dataURI, type) {
            var byteString = atob(dataURI.split(',')[1]),
                mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0],
                arrayBuffer = new ArrayBuffer(byteString.length),
                _ia = new Uint8Array(arrayBuffer);

            for (var i = 0; i < byteString.length; i++) {
              _ia[i] = byteString.charCodeAt(i);
            }

            var dataView = new DataView(arrayBuffer),
                blob = new Blob([dataView.buffer], {
              type: type || mimeType
            });
            return blob;
          },
          getExifOrientation: function getExifOrientation(file, callback) {
            var reader = new FileReader(),
                rotation = {
              1: 0,
              3: 180,
              6: 90,
              8: 270
            };

            reader.onload = function (e) {
              var scanner = new DataView(e.target.result),
                  val = 1;

              if (scanner.byteLength && scanner.getUint16(0, false) == 0xFFD8) {
                var length = scanner.byteLength,
                    offset = 2;

                while (offset < length) {
                  if (scanner.getUint16(offset + 2, false) <= 8) break;
                  var uint16 = scanner.getUint16(offset, false);
                  offset += 2;

                  if (uint16 == 0xFFE1) {
                    if (scanner.getUint32(offset += 2, false) != 0x45786966) break;
                    var little = scanner.getUint16(offset += 6, false) == 0x4949,
                        tags;
                    offset += scanner.getUint32(offset + 4, little);
                    tags = scanner.getUint16(offset, little);
                    offset += 2;

                    for (var i = 0; i < tags; i++) {
                      if (scanner.getUint16(offset + i * 12, little) == 0x0112) {
                        val = scanner.getUint16(offset + i * 12 + 8, little);
                        length = 0;
                        break;
                      }
                    }
                  } else if ((uint16 & 0xFF00) != 0xFF00) {
                    break;
                  } else {
                    offset += scanner.getUint16(offset, false);
                  }
                }
              }

              callback ? callback(rotation[val] || 0) : null;
            };

            reader.onerror = function () {
              callback ? callback('') : null;
            };

            reader.readAsArrayBuffer(file);
          },
          textParse: function textParse(text, opts, noOptions) {
            opts = noOptions ? opts || {} : $.extend({}, {
              limit: n.limit,
              maxSize: n.maxSize,
              fileMaxSize: n.fileMaxSize,
              extensions: n.extensions ? n.extensions.join(', ') : null,
              captions: n.captions
            }, opts);

            switch (_typeof(text)) {
              case 'string':
                for (var key in opts) {
                  if (['name', 'file', 'type', 'size'].indexOf(key) > -1) opts[key] = f._assets.escape(opts[key]);
                }

                text = text.replace(/\$\{(.*?)\}/g, function (match, a) {
                  var a = a.replace(/ /g, ''),
                      r = typeof opts[a] != "undefined" && opts[a] != null ? opts[a] : '';
                  if (['reader.node'].indexOf(a) > -1) return match;

                  if (a.indexOf('.') > -1 || a.indexOf('[]') > -1) {
                    var x = a.substr(0, a.indexOf('.') > -1 ? a.indexOf('.') : a.indexOf('[') > -1 ? a.indexOf('[') : a.length),
                        y = a.substring(x.length);

                    if (opts[x]) {
                      try {
                        r = eval('opts["' + x + '"]' + y);
                      } catch (e) {
                        r = '';
                      }
                    }
                  }

                  r = $.isFunction(r) ? f._assets.textParse(r) : r;
                  return r || '';
                });
                break;

              case 'function':
                text = f._assets.textParse(text(opts, l, p, o, s, f._assets.textParse), opts, noOptions);
                break;
            }

            opts = null;
            return text;
          },
          textToColor: function textToColor(str) {
            if (!str || str.length == 0) return false;

            for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash)) {
              ;
            }

            for (var i = 0, colour = '#'; i < 3; colour += ('00' + (hash >> i++ * 2 & 0xFF).toString(16)).slice(-2)) {
              ;
            }

            return colour;
          },
          isBrightColor: function isBrightColor(color) {
            var getRGB = function getRGB(b) {
              var a;
              if (b && b.constructor == Array && b.length == 3) return b;
              if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) return [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])];
              if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
              if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
              if (a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
              return typeof colors != "undefined" ? colors[$.trim(b).toLowerCase()] : null;
            },
                luminance_get = function luminance_get(color) {
              var rgb = getRGB(color);
              if (!rgb) return null;
              return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            };

            return luminance_get(color) > 194;
          },
          keyCompare: function keyCompare(obj, structure) {
            for (var i = 0; i < structure.length; i++) {
              if (!$.isPlainObject(obj) || !obj.hasOwnProperty(structure[i])) {
                throw new Error('Could not find valid *strict* attribute "' + structure[i] + '" in ' + JSON.stringify(obj, null, 4));
              }
            }

            return true;
          },
          hasPlugin: function hasPlugin(name) {
            if (navigator.plugins && navigator.plugins.length) for (var key in navigator.plugins) {
              if (navigator.plugins[key].name.toLowerCase().indexOf(name) > -1) return true;
            }
            return false;
          },
          isIE: function isIE() {
            return navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1 || navigator.userAgent.indexOf("Edge") > -1;
          },
          isMobile: function isMobile() {
            return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
          }
        },
        isSupported: function isSupported() {
          return s && s.get(0).files;
        },
        isFileReaderSupported: function isFileReaderSupported() {
          return window.File && window.FileList && window.FileReader;
        },
        isDefaultMode: function isDefaultMode() {
          return !n.upload && (!n.addMore || n.limit == 1);
        },
        isAddMoreMode: function isAddMoreMode() {
          return !n.upload && n.addMore && n.limit != 1;
        },
        isUploadMode: function isUploadMode() {
          return n.upload;
        },
        // fileuploader file list
        _itFl: [],
        // fileuploader file upload pending list
        _pfuL: [],
        // fileuploader file render pending list
        _pfrL: [],
        // disabled
        disabled: false,
        // locked
        locked: false,
        // rendered
        rendered: false
      }; // set FileUploader property to the input

      if (n.enableApi) {
        s.get(0).FileUploader = {
          open: function open() {
            s.trigger('click');
          },
          getOptions: function getOptions() {
            return n;
          },
          getParentEl: function getParentEl() {
            return p;
          },
          getInputEl: function getInputEl() {
            return s;
          },
          getNewInputEl: function getNewInputEl() {
            return o;
          },
          getListEl: function getListEl() {
            return l;
          },
          getListInputEl: function getListInputEl() {
            return n.listInput;
          },
          getFiles: function getFiles() {
            return f._itFl;
          },
          getChoosedFiles: function getChoosedFiles() {
            return f._itFl.filter(function (a) {
              return a.choosed;
            });
          },
          getAppendedFiles: function getAppendedFiles() {
            return f._itFl.filter(function (a) {
              return a.appended;
            });
          },
          getUploadedFiles: function getUploadedFiles() {
            return f._itFl.filter(function (a) {
              return a.uploaded;
            });
          },
          getFileList: function getFileList(toJson, customKey) {
            return f.files.list(toJson, customKey, true);
          },
          updateFileList: function updateFileList() {
            f.set('listInput', null);
            return true;
          },
          setOption: function setOption(option, value) {
            n[option] = value;
            return true;
          },
          findFile: function findFile(html) {
            return f.files.find(html);
          },
          add: function add(data, type, name) {
            if (!f.isUploadMode()) return false;
            var blob;

            if (data instanceof Blob) {
              blob = data;
            } else {
              var dataURI = /data:[a-z]+\/[a-z]+\;base64\,/.test(data) ? data : 'data:' + type + ';base64,' + btoa(data);
              blob = f._assets.dataURItoBlob(dataURI, type);
            }

            blob._name = name || f._assets.generateFileName(blob.type.indexOf("/") != -1 ? blob.type.split("/")[1].toString().toLowerCase() : 'File ');
            f.onChange(null, [blob]);
            return true;
          },
          append: function append(files) {
            return f.files.append(files);
          },
          update: function update(item, data) {
            return f.files.update(item, data);
          },
          remove: function remove(item) {
            item = item.jquery ? f.files.find(item) : item;

            if (f._itFl.indexOf(item) > -1) {
              f.files.remove(item);
              return true;
            }

            return false;
          },
          uploadStart: function uploadStart() {
            var choosedFiles = this.getChoosedFiles() || [];

            if (f.isUploadMode() && choosedFiles.length > 0 && !choosedFiles[0].uploaded) {
              for (var i = 0; i < choosedFiles.length; i++) {
                f.upload.send(choosedFiles[i]);
              }
            }
          },
          reset: function reset() {
            f.reset(true);
            return true;
          },
          disable: function disable(lock) {
            f.set('disabled', true);
            if (lock) f.locked = true;
            return true;
          },
          enable: function enable() {
            f.set('disabled', false);
            f.locked = false;
            return true;
          },
          destroy: function destroy() {
            f.destroy();
            return true;
          },
          isEmpty: function isEmpty() {
            return f._itFl.length == 0;
          },
          isDisabled: function isDisabled() {
            return f.disabled;
          },
          isRendered: function isRendered() {
            return f.rendered;
          },
          assets: f._assets,
          getPluginMode: function getPluginMode() {
            if (f.isDefaultMode()) return 'default';
            if (f.isAddMoreMode()) return 'addMore';
            if (f.isUploadMode()) return 'upload';
          }
        };
      } // initialize the plugin


      f.init();
      return this;
    });
  };

  $.fileuploader = {
    getInstance: function getInstance(input) {
      var $input = input.prop ? input : $(input);
      return $input.get(0).FileUploader;
    }
  };
  $.fn.fileuploader.defaults = {
    limit: null,
    maxSize: null,
    fileMaxSize: null,
    extensions: null,
    disallowedExtensions: null,
    changeInput: true,
    inputNameBrackets: true,
    theme: 'default',
    thumbnails: {
      box: '<div class="fileuploader-items">' + '<ul class="fileuploader-items-list"></ul>' + '</div>',
      boxAppendTo: null,
      item: '<li class="fileuploader-item file-has-popup">' + '<div class="columns">' + '<div class="column-thumbnail">${image}<span class="fileuploader-action-popup"></span></div>' + '<div class="column-title">' + '<div title="${name}">${name}</div>' + '<span>${size2}</span>' + '</div>' + '<div class="column-actions">' + '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i></i></a>' + '</div>' + '</div>' + '<div class="progress-bar2">${progressBar}<span></span></div>' + '</li>',
      item2: '<li class="fileuploader-item file-has-popup">' + '<div class="columns">' + '<div class="column-thumbnail">${image}<span class="fileuploader-action-popup"></span></div>' + '<div class="column-title">' + '<a href="${file}" target="_blank">' + '<div title="${name}">${name}</div>' + '<span>${size2}</span>' + '</a>' + '</div>' + '<div class="column-actions">' + '<a href="${file}" class="fileuploader-action fileuploader-action-download" title="${captions.download}" download><i></i></a>' + '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i></i></a>' + '</div>' + '</div>' + '</li>',
      popup: {
        container: 'body',
        loop: true,
        arrows: true,
        zoomer: true,
        template: function template(data) {
          return '<div class="fileuploader-popup-preview">' + '<a class="fileuploader-popup-move" data-action="prev"></a>' + '<div class="fileuploader-popup-node ${format}">' + '${reader.node}' + '</div>' + '<div class="fileuploader-popup-content">' + '<div class="fileuploader-popup-footer">' + '<ul class="fileuploader-popup-tools">' + (data.format == 'image' && data.editor ? (data.editor.cropper ? '<li>' + '<a data-action="crop">' + '<i></i> ${captions.crop}' + '</a>' + '</li>' : '') + (data.editor.rotate ? '<li>' + '<a data-action="rotate-cw">' + '<i></i> ${captions.rotate}' + '</a>' + '</li>' : '') : '') + (data.format == 'image' ? '<li class="fileuploader-popup-zoomer">' + '<a data-action="zoom-out">&minus;</a>' + '<input type="range" min="0" max="100">' + '<a data-action="zoom-in">&plus;</a>' + '<span></span> ' + '</li>' : '') + '<li>' + '<a data-action="remove">' + '<i></i> ${captions.remove}' + '</a>' + '</li>' + '</ul>' + '</div>' + '<div class="fileuploader-popup-header">' + '<ul class="fileuploader-popup-meta">' + '<li>' + '<span>${captions.name}:</span>' + '<h5>${name}</h5>' + '</li>' + '<li>' + '<span>${captions.type}:</span>' + '<h5>${extension.toUpperCase()}</h5>' + '</li>' + '<li>' + '<span>${captions.size}:</span>' + '<h5>${size2}</h5>' + '</li>' + (data.reader && data.reader.width ? '<li>' + '<span>${captions.dimensions}:</span>' + '<h5>${reader.width}x${reader.height}px</h5>' + '</li>' : '') + (data.reader && data.reader.duration ? '<li>' + '<span>${captions.duration}:</span>' + '<h5>${reader.duration2}</h5>' + '</li>' : '') + '</ul>' + '<div class="fileuploader-popup-info"></div>' + '<ul class="fileuploader-popup-buttons">' + '<li><a class="fileuploader-popup-button" data-action="cancel">${captions.cancel}</a></li>' + '<li><a class="fileuploader-popup-button button-success" data-action="save">${captions.confirm}</a></li>' + '</ul>' + '</div>' + '</div>' + '<a class="fileuploader-popup-move" data-action="next"></a>' + '</div>';
        },
        onShow: function onShow(item) {
          item.popup.html.on('click', '[data-action="remove"]', function (e) {
            item.popup.close();
            item.remove();
          }).on('click', '[data-action="cancel"]', function (e) {
            item.popup.close();
          }).on('click', '[data-action="save"]', function (e) {
            if (item.editor) item.editor.save();
            if (item.popup.close) item.popup.close();
          });
        },
        onHide: null
      },
      itemPrepend: false,
      removeConfirmation: true,
      startImageRenderer: true,
      synchronImages: true,
      useObjectUrl: false,
      canvasImage: true,
      videoThumbnail: true,
      pdf: true,
      exif: true,
      touchDelay: 0,
      _selectors: {
        list: '.fileuploader-items-list',
        item: '.fileuploader-item',
        start: '.fileuploader-action-start',
        retry: '.fileuploader-action-retry',
        remove: '.fileuploader-action-remove',
        sorter: '.fileuploader-action-sort',
        rotate: '.fileuploader-action-rotate',
        popup: '.fileuploader-popup-preview',
        popup_open: '.fileuploader-action-popup'
      },
      beforeShow: null,
      onItemShow: null,
      onItemRemove: function onItemRemove(html) {
        html.children().animate({
          'opacity': 0
        }, 200, function () {
          setTimeout(function () {
            html.slideUp(200, function () {
              html.remove();
            });
          }, 100);
        });
      },
      onImageLoaded: null
    },
    editor: false,
    sorter: false,
    reader: {
      thumbnailTimeout: 5000,
      timeout: 12000,
      maxSize: 20
    },
    files: null,
    upload: null,
    dragDrop: true,
    addMore: false,
    skipFileNameCheck: false,
    clipboardPaste: true,
    listInput: true,
    enableApi: false,
    listeners: null,
    onSupportError: null,
    beforeRender: null,
    afterRender: null,
    beforeSelect: null,
    onFilesCheck: null,
    onFileRead: null,
    onSelect: null,
    afterSelect: null,
    onListInput: null,
    onRemove: null,
    onEmpty: null,
    dialogs: {
      alert: function (_alert) {
        function alert(_x) {
          return _alert.apply(this, arguments);
        }

        alert.toString = function () {
          return _alert.toString();
        };

        return alert;
      }(function (text) {
        return alert(text);
      }),
      confirm: function (_confirm) {
        function confirm(_x2, _x3) {
          return _confirm.apply(this, arguments);
        }

        confirm.toString = function () {
          return _confirm.toString();
        };

        return confirm;
      }(function (text, callback) {
        confirm(text) ? callback() : null;
      })
    },
    captions: {
      button: function button(options) {
        return 'Browse ' + (options.limit == 1 ? 'file' : 'files');
      },
      feedback: function feedback(options) {
        return 'Choose ' + (options.limit == 1 ? 'file' : 'files') + ' to upload';
      },
      feedback2: function feedback2(options) {
        return options.length + ' ' + (options.length > 1 ? ' files were' : ' file was') + ' chosen';
      },
      confirm: 'Confirm',
      cancel: 'Cancel',
      name: 'Name',
      type: 'Type',
      size: 'Size',
      dimensions: 'Dimensions',
      duration: 'Duration',
      crop: 'Crop',
      rotate: 'Rotate',
      sort: 'Sort',
      download: 'Download',
      remove: 'Remove',
      drop: 'Drop the files here to upload',
      paste: '<div class="fileuploader-pending-loader"></div> Pasting a file, click here to cancel.',
      removeConfirmation: 'Are you sure you want to remove this file?',
      errors: {
        filesLimit: 'Only ${limit} files are allowed to be uploaded.',
        filesType: 'Only ${extensions} files are allowed to be uploaded.',
        fileSize: '${name} is too large! Please choose a file up to ${fileMaxSize}MB.',
        filesSizeAll: 'Files that you chose are too large! Please upload files up to ${maxSize} MB.',
        fileName: 'File with the name ${name} is already selected.',
        remoteFile: 'Remote files are not allowed.',
        folderUpload: 'You are not allowed to upload folders.'
      }
    }
  };
})(jQuery);

/***/ }),

/***/ "./resources/js/components/fuse.min.js":
/*!*********************************************!*\
  !*** ./resources/js/components/fuse.min.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * Fuse.js v3.3.0 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function (e, t) {
  "object" == ( false ? 0 : _typeof(exports)) && "object" == ( false ? 0 : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function () {
  return function (e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }

    var r = {};
    return t.m = e, t.c = r, t.i = function (e) {
      return e;
    }, t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, {
        configurable: !1,
        enumerable: !0,
        get: n
      });
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return t.d(r, "a", r), r;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 8);
  }([function (e, t, r) {
    "use strict";

    e.exports = function (e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function (e, t, r) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var o = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }

      return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(5),
        a = r(7),
        s = r(4),
        c = function () {
      function e(t, r) {
        var o = r.location,
            i = void 0 === o ? 0 : o,
            a = r.distance,
            c = void 0 === a ? 100 : a,
            h = r.threshold,
            l = void 0 === h ? .6 : h,
            u = r.maxPatternLength,
            f = void 0 === u ? 32 : u,
            d = r.isCaseSensitive,
            v = void 0 !== d && d,
            p = r.tokenSeparator,
            g = void 0 === p ? / +/g : p,
            y = r.findAllMatches,
            m = void 0 !== y && y,
            k = r.minMatchCharLength,
            x = void 0 === k ? 1 : k;
        n(this, e), this.options = {
          location: i,
          distance: c,
          threshold: l,
          maxPatternLength: f,
          isCaseSensitive: v,
          tokenSeparator: g,
          findAllMatches: m,
          minMatchCharLength: x
        }, this.pattern = this.options.isCaseSensitive ? t : t.toLowerCase(), this.pattern.length <= f && (this.patternAlphabet = s(this.pattern));
      }

      return o(e, [{
        key: "search",
        value: function value(e) {
          if (this.options.isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) return {
            isMatch: !0,
            score: 0,
            matchedIndices: [[0, e.length - 1]]
          };
          var t = this.options,
              r = t.maxPatternLength,
              n = t.tokenSeparator;
          if (this.pattern.length > r) return i(e, this.pattern, n);
          var o = this.options,
              s = o.location,
              c = o.distance,
              h = o.threshold,
              l = o.findAllMatches,
              u = o.minMatchCharLength;
          return a(e, this.pattern, this.patternAlphabet, {
            location: s,
            distance: c,
            threshold: h,
            findAllMatches: l,
            minMatchCharLength: u
          });
        }
      }]), e;
    }();

    e.exports = c;
  }, function (e, t, r) {
    "use strict";

    var n = r(0),
        o = function e(t, r, o) {
      if (r) {
        var i = r.indexOf("."),
            a = r,
            s = null;
        -1 !== i && (a = r.slice(0, i), s = r.slice(i + 1));
        var c = t[a];
        if (null !== c && void 0 !== c) if (s || "string" != typeof c && "number" != typeof c) {
          if (n(c)) for (var h = 0, l = c.length; h < l; h += 1) {
            e(c[h], s, o);
          } else s && e(c, s, o);
        } else o.push(c.toString());
      } else o.push(t);

      return o;
    };

    e.exports = function (e, t) {
      return o(e, t, []);
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = [], n = -1, o = -1, i = 0, a = e.length; i < a; i += 1) {
        var s = e[i];
        s && -1 === n ? n = i : s || -1 === n || (o = i - 1, o - n + 1 >= t && r.push([n, o]), n = -1);
      }

      return e[i - 1] && i - n >= t && r.push([n, i - 1]), r;
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = function (e) {
      for (var t = {}, r = e.length, n = 0; n < r; n += 1) {
        t[e.charAt(n)] = 0;
      }

      for (var o = 0; o < r; o += 1) {
        t[e.charAt(o)] |= 1 << r - o - 1;
      }

      return t;
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : / +/g,
          n = new RegExp(t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(r, "|")),
          o = e.match(n),
          i = !!o,
          a = [];
      if (i) for (var s = 0, c = o.length; s < c; s += 1) {
        var h = o[s];
        a.push([e.indexOf(h), h.length - 1]);
      }
      return {
        score: i ? .5 : 1,
        isMatch: i,
        matchedIndices: a
      };
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = function (e, t) {
      var r = t.errors,
          n = void 0 === r ? 0 : r,
          o = t.currentLocation,
          i = void 0 === o ? 0 : o,
          a = t.expectedLocation,
          s = void 0 === a ? 0 : a,
          c = t.distance,
          h = void 0 === c ? 100 : c,
          l = n / e.length,
          u = Math.abs(s - i);
      return h ? l + u / h : u ? 1 : l;
    };
  }, function (e, t, r) {
    "use strict";

    var n = r(6),
        o = r(3);

    e.exports = function (e, t, r, i) {
      for (var a = i.location, s = void 0 === a ? 0 : a, c = i.distance, h = void 0 === c ? 100 : c, l = i.threshold, u = void 0 === l ? .6 : l, f = i.findAllMatches, d = void 0 !== f && f, v = i.minMatchCharLength, p = void 0 === v ? 1 : v, g = s, y = e.length, m = u, k = e.indexOf(t, g), x = t.length, S = [], M = 0; M < y; M += 1) {
        S[M] = 0;
      }

      if (-1 !== k) {
        var b = n(t, {
          errors: 0,
          currentLocation: k,
          expectedLocation: g,
          distance: h
        });

        if (m = Math.min(b, m), -1 !== (k = e.lastIndexOf(t, g + x))) {
          var _ = n(t, {
            errors: 0,
            currentLocation: k,
            expectedLocation: g,
            distance: h
          });

          m = Math.min(_, m);
        }
      }

      k = -1;

      for (var L = [], w = 1, A = x + y, C = 1 << x - 1, I = 0; I < x; I += 1) {
        for (var O = 0, F = A; O < F;) {
          n(t, {
            errors: I,
            currentLocation: g + F,
            expectedLocation: g,
            distance: h
          }) <= m ? O = F : A = F, F = Math.floor((A - O) / 2 + O);
        }

        A = F;
        var P = Math.max(1, g - F + 1),
            j = d ? y : Math.min(g + F, y) + x,
            z = Array(j + 2);
        z[j + 1] = (1 << I) - 1;

        for (var T = j; T >= P; T -= 1) {
          var E = T - 1,
              K = r[e.charAt(E)];

          if (K && (S[E] = 1), z[T] = (z[T + 1] << 1 | 1) & K, 0 !== I && (z[T] |= (L[T + 1] | L[T]) << 1 | 1 | L[T + 1]), z[T] & C && (w = n(t, {
            errors: I,
            currentLocation: E,
            expectedLocation: g,
            distance: h
          })) <= m) {
            if (m = w, (k = E) <= g) break;
            P = Math.max(1, 2 * g - k);
          }
        }

        if (n(t, {
          errors: I + 1,
          currentLocation: g,
          expectedLocation: g,
          distance: h
        }) > m) break;
        L = z;
      }

      return {
        isMatch: k >= 0,
        score: 0 === w ? .001 : w,
        matchedIndices: o(S, p)
      };
    };
  }, function (e, t, r) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var o = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }

      return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(1),
        a = r(2),
        s = r(0),
        c = function () {
      function e(t, r) {
        var o = r.location,
            i = void 0 === o ? 0 : o,
            s = r.distance,
            c = void 0 === s ? 100 : s,
            h = r.threshold,
            l = void 0 === h ? .6 : h,
            u = r.maxPatternLength,
            f = void 0 === u ? 32 : u,
            d = r.caseSensitive,
            v = void 0 !== d && d,
            p = r.tokenSeparator,
            g = void 0 === p ? / +/g : p,
            y = r.findAllMatches,
            m = void 0 !== y && y,
            k = r.minMatchCharLength,
            x = void 0 === k ? 1 : k,
            S = r.id,
            M = void 0 === S ? null : S,
            b = r.keys,
            _ = void 0 === b ? [] : b,
            L = r.shouldSort,
            w = void 0 === L || L,
            A = r.getFn,
            C = void 0 === A ? a : A,
            I = r.sortFn,
            O = void 0 === I ? function (e, t) {
          return e.score - t.score;
        } : I,
            F = r.tokenize,
            P = void 0 !== F && F,
            j = r.matchAllTokens,
            z = void 0 !== j && j,
            T = r.includeMatches,
            E = void 0 !== T && T,
            K = r.includeScore,
            $ = void 0 !== K && K,
            J = r.verbose,
            N = void 0 !== J && J;

        n(this, e), this.options = {
          location: i,
          distance: c,
          threshold: l,
          maxPatternLength: f,
          isCaseSensitive: v,
          tokenSeparator: g,
          findAllMatches: m,
          minMatchCharLength: x,
          id: M,
          keys: _,
          includeMatches: E,
          includeScore: $,
          shouldSort: w,
          getFn: C,
          sortFn: O,
          verbose: N,
          tokenize: P,
          matchAllTokens: z
        }, this.setCollection(t);
      }

      return o(e, [{
        key: "setCollection",
        value: function value(e) {
          return this.list = e, e;
        }
      }, {
        key: "search",
        value: function value(e) {
          this._log('---------\nSearch pattern: "' + e + '"');

          var t = this._prepareSearchers(e),
              r = t.tokenSearchers,
              n = t.fullSearcher,
              o = this._search(r, n),
              i = o.weights,
              a = o.results;

          return this._computeScore(i, a), this.options.shouldSort && this._sort(a), this._format(a);
        }
      }, {
        key: "_prepareSearchers",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = [];
          if (this.options.tokenize) for (var r = e.split(this.options.tokenSeparator), n = 0, o = r.length; n < o; n += 1) {
            t.push(new i(r[n], this.options));
          }
          return {
            tokenSearchers: t,
            fullSearcher: new i(e, this.options)
          };
        }
      }, {
        key: "_search",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
              t = arguments[1],
              r = this.list,
              n = {},
              o = [];

          if ("string" == typeof r[0]) {
            for (var i = 0, a = r.length; i < a; i += 1) {
              this._analyze({
                key: "",
                value: r[i],
                record: i,
                index: i
              }, {
                resultMap: n,
                results: o,
                tokenSearchers: e,
                fullSearcher: t
              });
            }

            return {
              weights: null,
              results: o
            };
          }

          for (var s = {}, c = 0, h = r.length; c < h; c += 1) {
            for (var l = r[c], u = 0, f = this.options.keys.length; u < f; u += 1) {
              var d = this.options.keys[u];

              if ("string" != typeof d) {
                if (s[d.name] = {
                  weight: 1 - d.weight || 1
                }, d.weight <= 0 || d.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
                d = d.name;
              } else s[d] = {
                weight: 1
              };

              this._analyze({
                key: d,
                value: this.options.getFn(l, d),
                record: l,
                index: c
              }, {
                resultMap: n,
                results: o,
                tokenSearchers: e,
                fullSearcher: t
              });
            }
          }

          return {
            weights: s,
            results: o
          };
        }
      }, {
        key: "_analyze",
        value: function value(e, t) {
          var r = e.key,
              n = e.arrayIndex,
              o = void 0 === n ? -1 : n,
              i = e.value,
              a = e.record,
              c = e.index,
              h = t.tokenSearchers,
              l = void 0 === h ? [] : h,
              u = t.fullSearcher,
              f = void 0 === u ? [] : u,
              d = t.resultMap,
              v = void 0 === d ? {} : d,
              p = t.results,
              g = void 0 === p ? [] : p;

          if (void 0 !== i && null !== i) {
            var y = !1,
                m = -1,
                k = 0;

            if ("string" == typeof i) {
              this._log("\nKey: " + ("" === r ? "-" : r));

              var x = f.search(i);

              if (this._log('Full text: "' + i + '", score: ' + x.score), this.options.tokenize) {
                for (var S = i.split(this.options.tokenSeparator), M = [], b = 0; b < l.length; b += 1) {
                  var _ = l[b];

                  this._log('\nPattern: "' + _.pattern + '"');

                  for (var L = !1, w = 0; w < S.length; w += 1) {
                    var A = S[w],
                        C = _.search(A),
                        I = {};

                    C.isMatch ? (I[A] = C.score, y = !0, L = !0, M.push(C.score)) : (I[A] = 1, this.options.matchAllTokens || M.push(1)), this._log('Token: "' + A + '", score: ' + I[A]);
                  }

                  L && (k += 1);
                }

                m = M[0];

                for (var O = M.length, F = 1; F < O; F += 1) {
                  m += M[F];
                }

                m /= O, this._log("Token score average:", m);
              }

              var P = x.score;
              m > -1 && (P = (P + m) / 2), this._log("Score average:", P);
              var j = !this.options.tokenize || !this.options.matchAllTokens || k >= l.length;

              if (this._log("\nCheck Matches: " + j), (y || x.isMatch) && j) {
                var z = v[c];
                z ? z.output.push({
                  key: r,
                  arrayIndex: o,
                  value: i,
                  score: P,
                  matchedIndices: x.matchedIndices
                }) : (v[c] = {
                  item: a,
                  output: [{
                    key: r,
                    arrayIndex: o,
                    value: i,
                    score: P,
                    matchedIndices: x.matchedIndices
                  }]
                }, g.push(v[c]));
              }
            } else if (s(i)) for (var T = 0, E = i.length; T < E; T += 1) {
              this._analyze({
                key: r,
                arrayIndex: T,
                value: i[T],
                record: a,
                index: c
              }, {
                resultMap: v,
                results: g,
                tokenSearchers: l,
                fullSearcher: f
              });
            }
          }
        }
      }, {
        key: "_computeScore",
        value: function value(e, t) {
          this._log("\n\nComputing score:\n");

          for (var r = 0, n = t.length; r < n; r += 1) {
            for (var o = t[r].output, i = o.length, a = 1, s = 1, c = 0; c < i; c += 1) {
              var h = e ? e[o[c].key].weight : 1,
                  l = 1 === h ? o[c].score : o[c].score || .001,
                  u = l * h;
              1 !== h ? s = Math.min(s, u) : (o[c].nScore = u, a *= u);
            }

            t[r].score = 1 === s ? a : s, this._log(t[r]);
          }
        }
      }, {
        key: "_sort",
        value: function value(e) {
          this._log("\n\nSorting...."), e.sort(this.options.sortFn);
        }
      }, {
        key: "_format",
        value: function value(e) {
          var t = [];
          this.options.verbose && this._log("\n\nOutput:\n\n", JSON.stringify(e));
          var r = [];
          this.options.includeMatches && r.push(function (e, t) {
            var r = e.output;
            t.matches = [];

            for (var n = 0, o = r.length; n < o; n += 1) {
              var i = r[n];

              if (0 !== i.matchedIndices.length) {
                var a = {
                  indices: i.matchedIndices,
                  value: i.value
                };
                i.key && (a.key = i.key), i.hasOwnProperty("arrayIndex") && i.arrayIndex > -1 && (a.arrayIndex = i.arrayIndex), t.matches.push(a);
              }
            }
          }), this.options.includeScore && r.push(function (e, t) {
            t.score = e.score;
          });

          for (var n = 0, o = e.length; n < o; n += 1) {
            var i = e[n];

            if (this.options.id && (i.item = this.options.getFn(i.item, this.options.id)[0]), r.length) {
              for (var a = {
                item: i.item
              }, s = 0, c = r.length; s < c; s += 1) {
                r[s](i, a);
              }

              t.push(a);
            } else t.push(i.item);
          }

          return t;
        }
      }, {
        key: "_log",
        value: function value() {
          if (this.options.verbose) {
            var e;
            (e = console).log.apply(e, arguments);
          }
        }
      }]), e;
    }();

    e.exports = c;
  }]);
});

/***/ }),

/***/ "./resources/js/components/keymaster.js":
/*!**********************************************!*\
  !*** ./resources/js/components/keymaster.js ***!
  \**********************************************/
/***/ (function(module) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
;

(function (global) {
  var k,
      _handlers = {},
      _mods = {
    16: false,
    18: false,
    17: false,
    91: false
  },
      _scope = 'all',
      // modifier keys
  _MODIFIERS = {
    '⇧': 16,
    shift: 16,
    '⌥': 18,
    alt: 18,
    option: 18,
    '⌃': 17,
    ctrl: 17,
    control: 17,
    '⌘': 91,
    command: 91
  },
      // special keys
  _MAP = {
    backspace: 8,
    tab: 9,
    clear: 12,
    enter: 13,
    'return': 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    'delete': 46,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    ',': 188,
    '.': 190,
    '/': 191,
    '`': 192,
    '-': 189,
    '=': 187,
    ';': 186,
    '\'': 222,
    '[': 219,
    ']': 221,
    '\\': 220
  },
      code = function code(x) {
    return _MAP[x] || x.toUpperCase().charCodeAt(0);
  },
      _downKeys = [];

  for (k = 1; k < 20; k++) {
    _MAP['f' + k] = 111 + k;
  } // IE doesn't support Array#indexOf, so have a simple replacement


  function index(array, item) {
    var i = array.length;

    while (i--) {
      if (array[i] === item) return i;
    }

    return -1;
  } // for comparing mods before unassignment


  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;

    for (var i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) return false;
    }

    return true;
  }

  var modifierMap = {
    16: 'shiftKey',
    18: 'altKey',
    17: 'ctrlKey',
    91: 'metaKey'
  };

  function updateModifierKey(event) {
    for (k in _mods) {
      _mods[k] = event[modifierMap[k]];
    }
  }

  ; // handle keydown event

  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
      _downKeys.push(key);
    } // if a modifier key, set the key.<modifierkeyname> property to true and return


    if (key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko

    if (key in _mods) {
      _mods[key] = true; // 'assignKey' from inside this closure is exported to window.key

      for (k in _MODIFIERS) {
        if (_MODIFIERS[k] == key) assignKey[k] = true;
      }

      return;
    }

    updateModifierKey(event); // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused

    if (!assignKey.filter.call(this, event)) return; // abort if no potentially matching shortcuts found

    if (!(key in _handlers)) return;
    scope = getScope(); // for each potential shortcut

    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i]; // see if it's in the current scope

      if (handler.scope == scope || handler.scope == 'all') {
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;

        for (k in _mods) {
          if (!_mods[k] && index(handler.mods, +k) > -1 || _mods[k] && index(handler.mods, +k) == -1) modifiersMatch = false;
        } // call the handler and stop the event if neccessary


        if (handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch) {
          if (handler.method(event, handler) === false) {
            if (event.preventDefault) event.preventDefault();else event.returnValue = false;
            if (event.stopPropagation) event.stopPropagation();
            if (event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  }

  ; // unset modifier keys on keyup

  function clearModifier(event) {
    var key = event.keyCode,
        k,
        i = index(_downKeys, key); // remove key from _downKeys

    if (i >= 0) {
      _downKeys.splice(i, 1);
    }

    if (key == 93 || key == 224) key = 91;

    if (key in _mods) {
      _mods[key] = false;

      for (k in _MODIFIERS) {
        if (_MODIFIERS[k] == key) assignKey[k] = false;
      }
    }
  }

  ;

  function resetModifiers() {
    for (k in _mods) {
      _mods[k] = false;
    }

    for (k in _MODIFIERS) {
      assignKey[k] = false;
    }
  }

  ; // parse and assign shortcut

  function assignKey(key, scope, method) {
    var keys, mods;
    keys = getKeys(key);

    if (method === undefined) {
      method = scope;
      scope = 'all';
    } // for each shortcut


    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');

      if (key.length > 1) {
        mods = getMods(key);
        key = [key[key.length - 1]];
      } // convert to keycode and...


      key = key[0];
      key = code(key); // ...store handler

      if (!(key in _handlers)) _handlers[key] = [];

      _handlers[key].push({
        shortcut: keys[i],
        scope: scope,
        method: method,
        key: keys[i],
        mods: mods
      });
    }
  }

  ; // unbind all handlers for given key in current scope

  function unbindKey(key, scope) {
    var multipleKeys,
        keys,
        mods = [],
        i,
        j,
        obj;
    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
      }

      key = keys[keys.length - 1];
      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }

      if (!_handlers[key]) {
        return;
      }

      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i]; // only clear handlers if correct scope and mods match

        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  }

  ; // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.

  function isPressed(keyCode) {
    if (typeof keyCode == 'string') {
      keyCode = code(keyCode);
    }

    return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
    return _downKeys.slice(0);
  }

  function filter(event) {
    var tagName = (event.target || event.srcElement).tagName; // ignore keypressed in any elements that support keyboard data input

    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  } // initialize key.<modifier> to false


  for (k in _MODIFIERS) {
    assignKey[k] = false;
  } // set current scope (default 'all')


  function setScope(scope) {
    _scope = scope || 'all';
  }

  ;

  function getScope() {
    return _scope || 'all';
  }

  ; // delete all handlers for a given scope

  function deleteScope(scope) {
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  }

  ; // abstract key logic for assign and unassign

  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');

    if (keys[keys.length - 1] == '') {
      keys[keys.length - 2] += ',';
    }

    return keys;
  } // abstract mods logic for assign and unassign


  function getMods(key) {
    var mods = key.slice(0, key.length - 1);

    for (var mi = 0; mi < mods.length; mi++) {
      mods[mi] = _MODIFIERS[mods[mi]];
    }

    return mods;
  } // cross-browser events


  function addEvent(object, event, method) {
    if (object.addEventListener) object.addEventListener(event, method, false);else if (object.attachEvent) object.attachEvent('on' + event, function () {
      method(window.event);
    });
  }

  ; // set the handlers globally on document

  addEvent(document, 'keydown', function (event) {
    dispatch(event);
  }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48

  addEvent(document, 'keyup', clearModifier); // reset modifiers to false whenever the window is (re)focused.

  addEvent(window, 'focus', resetModifiers); // store previously defined key

  var previousKey = global.key; // restore previously defined key and return reference to our key object

  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  } // set window.key and window.key.set/get/deleteScope, and the default filter


  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;
  if (true) module.exports = assignKey;
})(this);

/***/ }),

/***/ "./resources/js/components/modal.js":
/*!******************************************!*\
  !*** ./resources/js/components/modal.js ***!
  \******************************************/
/***/ (() => {

window.LivewireModal = function () {
  return {
    show: false,
    loading: false,
    container: '.volt-modal-dimmer',
    activeModal: null,
    modalStack: [],
    init: function init() {
      var _this = this;

      this.$watch('show', function (value) {
        if (value) {} else {
          _this.activeModal = null;
        }
      });
      Livewire.on('openModal', function (modal) {
        _this.show = true;
        _this.loading = true;
        _this.activeModal = modal;
      });
      Livewire.on('closeModal', function (count) {
        _this.close(count);
      });
      Livewire.hook('message.failed', function (message, component) {
        _this.loading = false;
        _this.activeModal = _this.modalStack.at(-1);
        _this.show = _this.activeModal !== undefined;
      });
      Livewire.on('activeModalChanged', function (modal) {
        _this.activeModal = modal;

        _this.modalStack.push(modal);

        _this.loading = false;
        setTimeout(function () {
          _this.$refs[modal].classList.remove('transition', 'scale', 'in');
        }, 300);
      });
    },
    close: function close() {
      var _this2 = this;

      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var closedModal = [];

      for (var i = 0; i < count; i++) {
        var modal = this.modalStack.pop();
        Livewire.emit('modalClosed', modal);
        closedModal.push(modal);
      }

      closedModal.forEach(function (modal, index) {
        var immediate = index > 0;

        if (_this2.$refs[modal] === undefined) {
          return false;
        }

        if (_this2.modalStack.length === 0) {
          if (immediate) {
            _this2.show = false;
            return;
          }

          _this2.$refs[modal].classList.add('transition', 'scale', 'out');

          setTimeout(function () {
            _this2.$refs[modal].classList.remove('transition', 'scale', 'out');

            _this2.show = false;
          }, 300);
        } else {
          if (immediate) {
            return;
          }

          _this2.$refs[modal].classList.add('transition', 'scale', 'out');

          setTimeout(function () {
            _this2.$refs[modal].classList.remove('transition', 'scale', 'out');
          }, 300);
        }
      });

      if (this.modalStack.length > 0) {
        this.activeModal = this.modalStack.at(-1);
        this.$refs[this.activeModal].classList.add('transition', 'scale', 'in');
        setTimeout(function () {
          _this2.$refs[_this2.activeModal].classList.remove('transition', 'scale', 'in');
        }, 300);
      }
    }
  };
};

/***/ }),

/***/ "./resources/js/init/quick-switcher.js":
/*!*********************************************!*\
  !*** ./resources/js/init/quick-switcher.js ***!
  \*********************************************/
/***/ (() => {

$(function () {
  key('⌘+k, ctrl+k', function () {
    var modal = $('[data-role="quick-switcher-modal"]');
    modal.modal({
      onHide: function onHide() {
        $('[data-role="quick-menu-searchbox"]').val("").trigger('keyup');
      }
    }).modal('show');
  });
  $('[data-role="quick-menu-searchbox"]').on('keyup', function (e) {
    var keyword = $(e.currentTarget).val();
    $('[data-role="quick-menu-searchbox"]').val(keyword);
    $('[data-role="quick-menu"] .items').html("");

    if (keyword == '') {
      $('[data-role="original-menu"]').show();
    } else {
      $('[data-role="original-menu"]').hide();
      var items = [];
      $('[data-role="original-menu"] a').each(function (index, elm) {
        items.push({
          text: $(elm).html(),
          url: $(elm).attr('href')
        });
      });
      var options = {
        tokenize: true,
        threshold: 0.5,
        keys: ['text']
      };
      var fuse = new Fuse(items, options);
      var result = fuse.search(keyword);
      var matches = '';

      for (var i in result) {
        var item = result[i];
        matches += "<a class='title' href='" + item.url + "'>" + item.text + "</a>";
      }

      $('[data-role="quick-menu"] .items').append(matches);
    }
  });
  var quickSwitcherDropdown = $('[data-role="quick-switcher-dropdown"]');
  $('[data-role="original-menu"] a').each(function (index, elm) {
    var parent = $(elm).data('parent');
    var child = $(elm).html();
    var label = child;

    if (parent) {
      label += '<div class="ui mini label right floated">' + parent + '</div>';
    }

    var option = $('<option>').attr('value', $(elm).attr('href')).html(label);
    quickSwitcherDropdown.append(option);
  });
  quickSwitcherDropdown.dropdown({
    fullTextSearch: true,
    forceSelection: false,
    selectOnKeydown: false,
    match: 'text',
    action: function action(text, value) {
      window.location.href = value;
    }
  });
});

/***/ }),

/***/ "./resources/js/init/sidebar.js":
/*!**************************************!*\
  !*** ./resources/js/init/sidebar.js ***!
  \**************************************/
/***/ (() => {

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;
$(function () {
  var sidebar = $('[data-role="sidebar"] .sidebar__scroller');

  if (sidebar.length > 0) {
    new SimpleBar(sidebar[0]);
    var sidebarVisibilitySwitcher = $('[data-role="sidebar-visibility-switcher"]');

    if (sidebarVisibilitySwitcher.length > 0) {
      sidebarVisibilitySwitcher.on('click', function () {
        sidebar.parent().toggleClass('show');
      });
    } // Hide sidebar ketika user click element di luar sidebar ketika sidebar ditampilkan di perangkat mobile


    $(document).click(function (event) {
      if ($('nav.sidebar').hasClass('show')) {
        if (!$(event.target).closest('nav.sidebar').length && !$(event.target).closest('[data-role="sidebar-visibility-switcher"]').length) {
          $('nav.sidebar').removeClass('show');
        }
      }
    }); // Track scroll position

    $('#sidebar .simplebar-scroll-content').scroll(debounce(function () {
      $('#sidebar').data('scroll', $('#sidebar .simplebar-scroll-content').scrollTop());
    }, 500));
  }

  $('[data-role="sidebar-accordion"]').accordion({
    selector: {
      trigger: '.title:not(.empty)'
    }
  });
  $('#sidebar').on('click', 'a.item, a.title.empty', function (e) {
    $(e.delegateTarget).find('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
});

/***/ }),

/***/ "./resources/js/init/ui.js":
/*!*********************************!*\
  !*** ./resources/js/init/ui.js ***!
  \*********************************/
/***/ (() => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Laravolt = /*#__PURE__*/function () {
  function Laravolt() {
    _classCallCheck(this, Laravolt);
  }

  _createClass(Laravolt, null, [{
    key: "init",
    value: function init(root) {
      root.find('table.unstackable.responsive').basictable();
      root.find('.ui.checkbox').checkbox();
      root.find('.ui.dropdown:not(.simple):not(.tag)').each(function () {
        var elm = $(this);
        var options = {
          forceSelection: false,
          selectOnKeydown: false,
          fullTextSearch: true,
          action: elm.data('action') !== undefined ? elm.data('action') : 'activate'
        };

        if ($(this).hasClass('link')) {
          options.onChange = function (value, text, $selectedItem) {
            window.location.href = value;
          };
        }

        if ($(this).data('ajax')) {
          var url = elm.data('api');
          var payload = elm.data('payload');
          var token = elm.data('token');
          options.minCharacters = 2;
          options.apiSettings = {
            url: elm.data('api') + '?term={query}',
            method: 'post',
            data: {
              payload: payload,
              _token: token
            }
          };
        }

        $(this).dropdown(options);
      });
      root.find('.ui.dropdown.tag:not(.simple)').each(function () {
        var selected = false;

        if ($(this).data('value')) {
          var values = $(this).data('value').toString().split(',');

          if (values.length == 1 && values[0] == '') {} else {
            selected = values;
          }
        }

        $(this).dropdown({
          forceSelection: false,
          allowAdditions: true,
          fullTextSearch: true,
          selectOnKeydown: false // keys: {
          //     delimiter: 13
          // }

        }).dropdown('set selected', selected);
      });

      $.fn.destroyDropdown = function () {
        return $(this).each(function () {
          $(this).parent().dropdown('destroy').replaceWith($(this).addClass($(this).data('class')));
        });
      };

      var dependenciesSelect = [];
      var dependenciesInput = [];
      root.find('select[data-depend-on]').each(function (idx, elm) {
        var child = $(elm);
        var parentName = child.data('depend-on');
        var parent = $('[name=' + parentName + ']');

        if (parent.prop('tagName') == 'SELECT') {
          if (dependenciesSelect[parentName] === undefined) {
            dependenciesSelect[parentName] = [];
          }

          dependenciesSelect[parentName].push(child);
        } else if (parent.prop('tagName') == 'INPUT') {
          if (dependenciesInput[parentName] === undefined) {
            dependenciesInput[parentName] = [];
          }

          dependenciesInput[parentName].push(child);
        }
      });

      var _loop = function _loop() {
        var parentName = _Object$keys[_i];
        var parent = $('[name=' + parentName + ']');
        var children = dependenciesSelect[parentName];
        parent.destroyDropdown();
        parent.dropdown({
          forceSelection: false,
          selectOnKeydown: false,
          fullTextSearch: 'exact',
          onChange: function onChange(value, text, $option) {
            jQuery.each(children, function (idx, child) {
              if (!value) {
                child.dropdown('clear');
                child.dropdown('setup menu', {
                  values: []
                });
              } else {
                var url = child.data('api');
                var payload = child.data('payload');
                var token = child.data('token');
                child.api({
                  url: url,
                  method: 'post',
                  data: {
                    term: value,
                    payload: payload,
                    _token: token
                  },
                  on: 'now',
                  beforeSend: function beforeSend(settings) {
                    child.dropdown('clear');
                    child.parent().addClass('loading');
                    return settings;
                  },
                  onSuccess: function onSuccess(response, element, xhr) {
                    var values = response.results;
                    child.dropdown('change values', values);
                  },
                  onComplete: function onComplete(response, element, xhr) {
                    child.parent().removeClass('loading');
                  },
                  onError: function onError(errorMessage, element, xhr) {
                    if (typeof xhr.responseJSON.exception !== 'undefined') {
                      alert(xhr.responseJSON.exception + ' in ' + xhr.responseJSON.file + ' line ' + xhr.responseJSON.line + ': ' + xhr.responseJSON.message);
                    } else {
                      alert('Something goes wrong with DropdownDB, but APP_DEBUG off. See application log (usually in storage/logs/laravel.log) for complete error message.');
                    }
                  }
                });
              }
            });
          }
        });
      };

      for (var _i = 0, _Object$keys = Object.keys(dependenciesSelect); _i < _Object$keys.length; _i++) {
        _loop();
      }

      var _loop2 = function _loop2() {
        var parentName = _Object$keys2[_i2];
        var parent = root.find('[name=' + parentName + ']');
        var children = dependenciesInput[parentName];
        parent.on('change', function (e) {
          var value = $(e.currentTarget).val();
          jQuery.each(children, function (idx, child) {
            if (!value) {
              child.dropdown('clear');
              child.dropdown('setup menu', {
                values: []
              });
            } else {
              var url = child.data('api');
              var payload = child.data('payload');
              var token = child.data('token');
              child.api({
                url: url,
                method: 'post',
                data: {
                  term: value,
                  payload: payload,
                  _token: token
                },
                on: 'now',
                beforeSend: function beforeSend(settings) {
                  child.dropdown('clear');
                  child.parent().addClass('loading');
                  return settings;
                },
                onSuccess: function onSuccess(response, element, xhr) {
                  var values = response.results;
                  child.dropdown('change values', values);

                  if (values.length == 1) {
                    child.dropdown('set selected', values[0].value);
                  }
                },
                onComplete: function onComplete(response, element, xhr) {
                  child.parent().removeClass('loading');
                }
              });
            }
          });
        });

        if (parent.val()) {
          parent.trigger('change');
        }
      };

      for (var _i2 = 0, _Object$keys2 = Object.keys(dependenciesInput); _i2 < _Object$keys2.length; _i2++) {
        _loop2();
      }

      root.find('.checkbox[data-toggle="checkall"]').each(function () {
        var $parent = $(this);
        var $childCheckbox = $(document).find($parent.data('selector'));
        var $storage = $(document).find($parent.data('storage'));
        $parent.checkbox({
          // check all children
          onChecked: function onChecked() {
            $childCheckbox.checkbox('check');
          },
          // uncheck all children
          onUnchecked: function onUnchecked() {
            $childCheckbox.checkbox('uncheck');
          }
        });
        $childCheckbox.checkbox({
          // Fire on load to set parent value
          fireOnInit: true,
          // Change parent state on each child checkbox change
          onChange: function onChange() {
            var $parentCheckbox = $parent,
                $checkbox = $childCheckbox,
                allChecked = true,
                allUnchecked = true,
                ids = []; // check to see if all other siblings are checked or unchecked

            $checkbox.each(function () {
              if ($(this).checkbox('is checked')) {
                allUnchecked = false;
                ids.push($(this).children().first().val());
              } else {
                allChecked = false;
              }
            });
            $parentCheckbox.val(JSON.stringify(ids)).trigger('change'); // set parent checkbox state, but dont trigger its onChange callback

            if (allChecked) {
              $parentCheckbox.checkbox('set checked');
            } else if (allUnchecked) {
              $parentCheckbox.checkbox('set unchecked');
            } else {
              $parentCheckbox.checkbox('set indeterminate');
            }
          }
        });
      });
      root.find('.ui.input.calendar').each(function (idx, elm) {
        var $elm = $(elm);
        var type = $elm.data('calendar-type');

        if (!type) {
          type = 'date';
        }

        var format = $elm.data('calendar-format');

        if (!format) {
          format = 'YYYY-MM-DD';
        }

        $elm.calendar({
          type: type,
          ampm: false,
          selectAdjacentDays: true,
          onSelect: function onSelect(date, mode) {
            elm.querySelector('input').dispatchEvent(new Event('input'));
          },
          formatter: {
            date: function date(_date, settings) {
              if (!_date) {
                return '';
              }

              var h = _date.getHours();

              var i = _date.getMinutes();

              var s = _date.getSeconds();

              var j = _date.getDate();

              var DD = ('0' + _date.getDate()).slice(-2);

              var d = DD;
              var n = _date.getMonth() + 1;
              var MM = ('0' + (_date.getMonth() + 1)).slice(-2);
              var m = MM;

              var MMMM = settings.text.months[_date.getMonth()];

              var M = settings.text.monthsShort[_date.getMonth()];

              var YY = _date.getFullYear().toString().substr(2, 2);

              var Y = _date.getFullYear();

              var YYYY = _date.getFullYear();

              var output = format.replace('h', h).replace('i', i).replace('s', s).replace('j', j).replace('d', d).replace('n', n).replace('m', m).replace('DD', DD).replace('YYYY', YYYY).replace('YY', YY).replace('Y', Y);
              var replacer = {
                MMMM: MMMM,
                MMM: M,
                MM: MM,
                M: M
              };
              var temp = format;

              for (var key in replacer) {
                if (temp.includes(key)) {
                  output = output.replace(key, replacer[key]);
                  temp = temp.replace(key, '');
                }
              }

              return output;
            }
          }
        });
      });
      root.find('input[type=file].uploader').each(function (idx, elm) {
        var extensions = $(elm).data('extensions');

        if (extensions) {
          extensions = extensions.split(',');
        } else {
          extensions = null;
        }

        var upload = null;

        if ($(elm).data('media-url')) {
          upload = {
            url: $(elm).data('media-url'),
            data: {
              _token: $(elm).data('token'),
              _key: $(elm).attr('name'),
              _action: 'upload'
            },
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            synchron: true,
            chunk: false,
            onSuccess: function onSuccess(response, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
              if (response.success && response.files[0]) {
                var _response$files$0$dat;

                item.data.id = (_response$files$0$dat = response.files[0].data.id) !== null && _response$files$0$dat !== void 0 ? _response$files$0$dat : null;
                item.local = response.files[0].file;
                item.html.find('.fileuploader-action-remove').addClass('fileuploader-action-success');
                setTimeout(function () {
                  item.html.find('.progress-bar2').fadeOut(400);
                }, 400);
                return true;
              }

              return this.onError(item, listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus, response.message);
            },
            onError: function onError(item, listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus, errorThrown) {
              var progressBar = item.html.find('.progress-bar2');

              if (progressBar.length > 0) {
                progressBar.find('span').html(0 + '%');
                progressBar.find('.fileuploader-progressbar .bar').width(0 + '%');
                item.html.find('.progress-bar2').fadeOut(400);
              }

              item.upload.status !== 'cancelled' && item.html.find('.fileuploader-action-retry').length === 0 ? item.html.find('.column-actions').prepend('<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>') : null;
              alert(errorThrown + '. Try again later.');
            },
            onProgress: function onProgress(data, item, listEl, parentEl, newInputEl, inputEl) {
              var progressBar = item.html.find('.progress-bar2');

              if (progressBar.length > 0) {
                progressBar.show();
                progressBar.find('span').html(data.percentage + '%');
                progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + '%');
              }
            },
            onComplete: function onComplete(listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {// callback will go here
            }
          };
        }

        $(elm).fileuploader({
          theme: 'simple',
          limit: $(elm).data('limit'),
          fileMaxSize: $(elm).data('file-max-size'),
          extensions: extensions,
          addMore: true,
          upload: upload,
          onRemove: function onRemove(item) {
            // Doesn't have ID, it means file not yet uploaded, no need to delete on server side
            if (item.data.id === undefined) {
              return true;
            }

            if ($(elm).data('media-url')) {
              $.post($(elm).data('media-url'), {
                _token: $(elm).data('token'),
                _action: 'delete',
                id: item.data.id
              });
            }

            return true;
          },
          changeInput: '<div class="fileuploader-input">' + '<div class="fileuploader-input-inner">' + '<div><span>${captions.browse}</span></div>' + '</div>' + '</div>',
          captions: {
            browse: 'Browse or drop files here'
          },
          thumbnails: {
            removeConfirmation: false
          }
        });
      });

      if (typeof AutoNumeric === 'function' && $('input[data-role="rupiah"]').length > 0) {
        AutoNumeric.multiple('input[data-role="rupiah"]', {
          currencySymbol: '',
          decimalCharacter: ',',
          digitGroupSeparator: '.',
          decimalPlaces: 0,
          unformatOnSubmit: true
        });
      }

      if ((typeof google === "undefined" ? "undefined" : _typeof(google)) === 'object' && _typeof(google.maps) === 'object') {
        root.find('[data-form-coordinate]').each(function () {
          var input = $(this);

          var _long, lat;

          var _input$val$split = input.val().split(',');

          var _input$val$split2 = _slicedToArray(_input$val$split, 2);

          lat = _input$val$split2[0];
          _long = _input$val$split2[1];
          lat = lat || -7.451808;
          _long = _long || 111.035929;
          var mapContainer = $('<div>').css('width', '100%').css('height', 300).css('border-radius', 4).css('margin-top', '5px');
          mapContainer.insertAfter($(this));
          var center = new google.maps.LatLng(lat, _long);
          var options = {
            zoom: 17,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var disabled = $(this).is('[disabled]');

          if (disabled) {
            $.extend(options, {
              gestureHandling: 'none',
              zoomControl: false
            });
          }

          var map = new google.maps.Map(mapContainer[0], options);
          var marker = new google.maps.Marker({
            position: center,
            map: map,
            draggable: !disabled
          });
          google.maps.event.addListener(marker, 'drag', function () {
            input.val(marker.position.lat() + ',' + marker.position.lng());
          });
        });
      }
    }
  }]);

  return Laravolt;
}();

var TURBOLINK_ENABLED = $('meta[name="turbolinks-enabled"]').attr('content') === '1';

if (TURBOLINK_ENABLED) {
  var Turbolinks = window.Turbolinks;
  Turbolinks.start();
  $(document).on('turbolinks:load', function () {
    Laravolt.init($('body'));
  }); // Keep menu scroll position

  $(document).on('turbolinks:render', function (event) {
    $('#sidebar .simplebar-scroll-content').scrollTop($('#sidebar').data('scroll'));
  });
} else {
  $(document).on('DOMContentLoaded', function () {
    Laravolt.init($('body'));
  });
}

window.addEventListener('laravolt.toast', function (e) {
  $('body').toast(JSON.parse(e.detail));
});

if (typeof Livewire !== 'undefined') {
  Livewire.hook('message.processed', function (el, component) {
    Laravolt.init($('[wire\\:id="' + component.id + '"]'));
  });
}

/***/ }),

/***/ "./resources/js/laravolt.js":
/*!**********************************!*\
  !*** ./resources/js/laravolt.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var simplebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar */ "./node_modules/simplebar/dist/simplebar.esm.js");
/* harmony import */ var autonumeric__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autonumeric */ "./node_modules/autonumeric/dist/autoNumeric.min.js");
/* harmony import */ var autonumeric__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(autonumeric__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var turbolinks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! turbolinks */ "./node_modules/turbolinks/dist/turbolinks.js");
/* harmony import */ var turbolinks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(turbolinks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_fuse_min_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/fuse.min.js */ "./resources/js/components/fuse.min.js");
/* harmony import */ var _components_fuse_min_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_fuse_min_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _laravolt_semantic_semantic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../laravolt/semantic/semantic */ "./resources/laravolt/semantic/semantic.js");
/* harmony import */ var _laravolt_semantic_semantic__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_laravolt_semantic_semantic__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_components_basictable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../js/components/basictable */ "./resources/js/components/basictable.js");
/* harmony import */ var _js_components_basictable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_components_basictable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_components_keymaster__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../js/components/keymaster */ "./resources/js/components/keymaster.js");
/* harmony import */ var _js_components_keymaster__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_components_keymaster__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_components_fileuploader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../js/components/fileuploader */ "./resources/js/components/fileuploader.js");
/* harmony import */ var _js_components_fileuploader__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_components_fileuploader__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_components_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../js/components/modal */ "./resources/js/components/modal.js");
/* harmony import */ var _js_components_modal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_components_modal__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _js_init_sidebar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../js/init/sidebar */ "./resources/js/init/sidebar.js");
/* harmony import */ var _js_init_sidebar__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_init_sidebar__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _js_init_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../js/init/ui */ "./resources/js/init/ui.js");
/* harmony import */ var _js_init_ui__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_init_ui__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _js_init_quick_switcher__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../js/init/quick-switcher */ "./resources/js/init/quick-switcher.js");
/* harmony import */ var _js_init_quick_switcher__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_init_quick_switcher__WEBPACK_IMPORTED_MODULE_12__);





window.$ = window.jQuery = window.jquery = (jquery__WEBPACK_IMPORTED_MODULE_0___default());
window.simplebar = simplebar__WEBPACK_IMPORTED_MODULE_1__["default"];
window.autoNumeric = (autonumeric__WEBPACK_IMPORTED_MODULE_2___default());
window.Fuse = (_components_fuse_min_js__WEBPACK_IMPORTED_MODULE_4___default());
window.Turbolinks = (turbolinks__WEBPACK_IMPORTED_MODULE_3___default());









/***/ }),

/***/ "./resources/laravolt/semantic/semantic.js":
/*!*************************************************!*\
  !*** ./resources/laravolt/semantic/semantic.js ***!
  \*************************************************/
/***/ (() => {

function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj;}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;},_typeof(obj);}/*
 * # Fomantic UI - 2.8.3
 * https://github.com/fomantic/Fomantic-UI
 * http://fomantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */ /*!
 * # Fomantic-UI - Site
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};$.site=$.fn.site=function(parameters){var time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),_settings=$.isPlainObject(parameters)?$.extend(true,{},$.site.settings,parameters):$.extend({},$.site.settings),namespace=_settings.namespace,error=_settings.error,moduleNamespace='module-'+namespace,$document=$(document),$module=$document,element=this,instance=$module.data(moduleNamespace),module,returnedValue;module={initialize:function initialize(){module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of site',module);instance=module;$module.data(moduleNamespace,module);},normalize:function normalize(){module.fix.console();module.fix.requestAnimationFrame();},fix:{console:function(_console){function console(){return _console.apply(this,arguments);}console.toString=function(){return _console.toString();};return console;}(function(){module.debug('Normalizing window.console');if(console===undefined||console.log===undefined){module.verbose('Console not available, normalizing events');module.disable.console();}if(typeof console.group=='undefined'||typeof console.groupEnd=='undefined'||typeof console.groupCollapsed=='undefined'){module.verbose('Console group not available, normalizing events');window.console.group=function(){};window.console.groupEnd=function(){};window.console.groupCollapsed=function(){};}if(typeof console.markTimeline=='undefined'){module.verbose('Mark timeline not available, normalizing events');window.console.markTimeline=function(){};}}),consoleClear:function consoleClear(){module.debug('Disabling programmatic console clearing');window.console.clear=function(){};},requestAnimationFrame:function requestAnimationFrame(){module.debug('Normalizing requestAnimationFrame');if(window.requestAnimationFrame===undefined){module.debug('RequestAnimationFrame not available, normalizing event');window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);};}}},moduleExists:function moduleExists(name){return $.fn[name]!==undefined&&$.fn[name].settings!==undefined;},enabled:{modules:function modules(_modules){var enabledModules=[];_modules=_modules||_settings.modules;$.each(_modules,function(index,name){if(module.moduleExists(name)){enabledModules.push(name);}});return enabledModules;}},disabled:{modules:function modules(_modules2){var disabledModules=[];_modules2=_modules2||_settings.modules;$.each(_modules2,function(index,name){if(!module.moduleExists(name)){disabledModules.push(name);}});return disabledModules;}},change:{setting:function setting(_setting,value,modules,modifyExisting){modules=typeof modules==='string'?modules==='all'?_settings.modules:[modules]:modules||_settings.modules;modifyExisting=modifyExisting!==undefined?modifyExisting:true;$.each(modules,function(index,name){var namespace=module.moduleExists(name)?$.fn[name].settings.namespace||false:true,$existingModules;if(module.moduleExists(name)){module.verbose('Changing default setting',_setting,value,name);$.fn[name].settings[_setting]=value;if(modifyExisting&&namespace){$existingModules=$(':data(module-'+namespace+')');if($existingModules.length>0){module.verbose('Modifying existing settings',$existingModules);$existingModules[name]('setting',_setting,value);}}}});},settings:function settings(newSettings,modules,modifyExisting){modules=typeof modules==='string'?[modules]:modules||_settings.modules;modifyExisting=modifyExisting!==undefined?modifyExisting:true;$.each(modules,function(index,name){var $existingModules;if(module.moduleExists(name)){module.verbose('Changing default setting',newSettings,name);$.extend(true,$.fn[name].settings,newSettings);if(modifyExisting&&namespace){$existingModules=$(':data(module-'+namespace+')');if($existingModules.length>0){module.verbose('Modifying existing settings',$existingModules);$existingModules[name]('setting',newSettings);}}}});}},enable:{console:function console(){module.console(true);},debug:function debug(modules,modifyExisting){modules=modules||_settings.modules;module.debug('Enabling debug for modules',modules);module.change.setting('debug',true,modules,modifyExisting);},verbose:function verbose(modules,modifyExisting){modules=modules||_settings.modules;module.debug('Enabling verbose debug for modules',modules);module.change.setting('verbose',true,modules,modifyExisting);}},disable:{console:function console(){module.console(false);},debug:function debug(modules,modifyExisting){modules=modules||_settings.modules;module.debug('Disabling debug for modules',modules);module.change.setting('debug',false,modules,modifyExisting);},verbose:function verbose(modules,modifyExisting){modules=modules||_settings.modules;module.debug('Disabling verbose debug for modules',modules);module.change.setting('verbose',false,modules,modifyExisting);}},console:function console(enable){if(enable){if(instance.cache.console===undefined){module.error(error.console);return;}module.debug('Restoring console function');window.console=instance.cache.console;}else{module.debug('Disabling console function');instance.cache.console=window.console;window.console={clear:function clear(){},error:function error(){},group:function group(){},groupCollapsed:function groupCollapsed(){},groupEnd:function groupEnd(){},info:function info(){},log:function log(){},markTimeline:function markTimeline(){},warn:function warn(){}};}},destroy:function destroy(){module.verbose('Destroying previous site for',$module);$module.removeData(moduleNamespace);},cache:{},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,_settings,name);}else if(value!==undefined){_settings[name]=value;}else{return _settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(_settings.debug){if(_settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(_settings.verbose&&_settings.debug){if(_settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){module.error=Function.prototype.bind.call(console.error,console,_settings.name+':');module.error.apply(console,arguments);},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Element':element,'Name':message[0],'Arguments':[].slice.call(message,1)||'','Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){module.destroy();}module.initialize();}return returnedValue!==undefined?returnedValue:this;};$.site.settings={name:'Site',namespace:'site',error:{console:'Console cannot be restored, most likely it was overwritten outside of module',method:'The method you called is not defined.'},debug:false,verbose:false,performance:true,modules:['accordion','api','calendar','checkbox','dimmer','dropdown','embed','form','modal','nag','popup','slider','rating','shape','sidebar','state','sticky','tab','toast','transition','visibility','visit'],siteNamespace:'site',namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}};// allows for selection of elements with data attributes
$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(dataName){return function(elem){return!!$.data(elem,dataName);};}):function(elem,i,match){// support: jQuery < 1.8
return!!$.data(elem,match[3]);}});})(jQuery,window,document);/*!
 * # Fomantic-UI - Form Validation
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.form=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],legacyParameters=arguments[1],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var $module=$(this),element=this,formErrors=[],keyHeldDown=false,// set at run-time
$field,$group,$message,$prompt,$submit,$clear,$reset,_settings2,_validation,metadata,selector,className,regExp,error,namespace,moduleNamespace,eventNamespace,submitting=false,_dirty=false,history=['clean','clean'],instance,module;module={initialize:function initialize(){// settings grabbed at run time
module.get.settings();if(methodInvoked){if(instance===undefined){module.instantiate();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.verbose('Initializing form validation',$module,_settings2);module.bindEvents();module.set.defaults();module.instantiate();}},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous module',instance);module.removeEvents();$module.removeData(moduleNamespace);},refresh:function refresh(){module.verbose('Refreshing selector cache');$field=$module.find(selector.field);$group=$module.find(selector.group);$message=$module.find(selector.message);$prompt=$module.find(selector.prompt);$submit=$module.find(selector.submit);$clear=$module.find(selector.clear);$reset=$module.find(selector.reset);},submit:function submit(){module.verbose('Submitting form',$module);submitting=true;$module.submit();},attachEvents:function attachEvents(selector,action){action=action||'submit';$(selector).on('click'+eventNamespace,function(event){module[action]();event.preventDefault();});},bindEvents:function bindEvents(){module.verbose('Attaching form events');$module.on('submit'+eventNamespace,module.validate.form).on('blur'+eventNamespace,selector.field,module.event.field.blur).on('click'+eventNamespace,selector.submit,module.submit).on('click'+eventNamespace,selector.reset,module.reset).on('click'+eventNamespace,selector.clear,module.clear);if(_settings2.keyboardShortcuts){$module.on('keydown'+eventNamespace,selector.field,module.event.field.keydown);}$field.each(function(index,el){var $input=$(el),type=$input.prop('type'),inputEvent=module.get.changeEvent(type,$input);$input.on(inputEvent+eventNamespace,module.event.field.change);});// Dirty events
if(_settings2.preventLeaving){$(window).on('beforeunload'+eventNamespace,module.event.beforeUnload);}$field.on('change click keyup keydown blur',function(e){$(this).triggerHandler(e.type+".dirty");});$field.on('change.dirty click.dirty keyup.dirty keydown.dirty blur.dirty',module.determine.isDirty);$module.on('dirty'+eventNamespace,function(e){_settings2.onDirty.call();});$module.on('clean'+eventNamespace,function(e){_settings2.onClean.call();});},clear:function clear(){$field.each(function(index,el){var $field=$(el),$element=$field.parent(),$fieldGroup=$field.closest($group),$prompt=$fieldGroup.find(selector.prompt),$calendar=$field.closest(selector.uiCalendar),defaultValue=$field.data(metadata.defaultValue)||'',isCheckbox=$element.is(selector.uiCheckbox),isDropdown=$element.is(selector.uiDropdown)&&module.can.useElement('dropdown'),isCalendar=$calendar.length>0&&module.can.useElement('calendar'),isErrored=$fieldGroup.hasClass(className.error);if(isErrored){module.verbose('Resetting error on field',$fieldGroup);$fieldGroup.removeClass(className.error);$prompt.remove();}if(isDropdown){module.verbose('Resetting dropdown value',$element,defaultValue);$element.dropdown('clear',true);}else if(isCheckbox){$field.prop('checked',false);}else if(isCalendar){$calendar.calendar('clear');}else{module.verbose('Resetting field value',$field,defaultValue);$field.val('');}});},reset:function reset(){$field.each(function(index,el){var $field=$(el),$element=$field.parent(),$fieldGroup=$field.closest($group),$calendar=$field.closest(selector.uiCalendar),$prompt=$fieldGroup.find(selector.prompt),defaultValue=$field.data(metadata.defaultValue),isCheckbox=$element.is(selector.uiCheckbox),isDropdown=$element.is(selector.uiDropdown)&&module.can.useElement('dropdown'),isCalendar=$calendar.length>0&&module.can.useElement('calendar'),isErrored=$fieldGroup.hasClass(className.error);if(defaultValue===undefined){return;}if(isErrored){module.verbose('Resetting error on field',$fieldGroup);$fieldGroup.removeClass(className.error);$prompt.remove();}if(isDropdown){module.verbose('Resetting dropdown value',$element,defaultValue);$element.dropdown('restore defaults',true);}else if(isCheckbox){module.verbose('Resetting checkbox value',$element,defaultValue);$field.prop('checked',defaultValue);}else if(isCalendar){$calendar.calendar('set date',defaultValue);}else{module.verbose('Resetting field value',$field,defaultValue);$field.val(defaultValue);}});module.determine.isDirty();},determine:{isValid:function isValid(){var allValid=true;$.each(_validation,function(fieldName,field){if(!module.validate.field(field,fieldName,true)){allValid=false;}});return allValid;},isDirty:function isDirty(e){var formIsDirty=false;$field.each(function(index,el){var $el=$(el),isCheckbox=$el.filter(selector.checkbox).length>0,isDirty;if(isCheckbox){isDirty=module.is.checkboxDirty($el);}else{isDirty=module.is.fieldDirty($el);}$el.data(_settings2.metadata.isDirty,isDirty);formIsDirty|=isDirty;});if(formIsDirty){module.set.dirty();}else{module.set.clean();}if(e&&e.namespace==='dirty'){e.stopImmediatePropagation();e.preventDefault();}}},is:{bracketedRule:function bracketedRule(rule){return rule.type&&rule.type.match(_settings2.regExp.bracket);},shorthandFields:function shorthandFields(fields){var fieldKeys=Object.keys(fields),firstRule=fields[fieldKeys[0]];return module.is.shorthandRules(firstRule);},// duck type rule test
shorthandRules:function shorthandRules(rules){return typeof rules=='string'||Array.isArray(rules);},empty:function empty($field){if(!$field||$field.length===0){return true;}else if($field.is(selector.checkbox)){return!$field.is(':checked');}else{return module.is.blank($field);}},blank:function blank($field){return $.trim($field.val())==='';},valid:function valid(field){var allValid=true;if(field){module.verbose('Checking if field is valid',field);return module.validate.field(_validation[field],field,false);}else{module.verbose('Checking if form is valid');$.each(_validation,function(fieldName,field){if(!module.is.valid(fieldName)){allValid=false;}});return allValid;}},dirty:function dirty(){return _dirty;},clean:function clean(){return!_dirty;},fieldDirty:function fieldDirty($el){var initialValue=$el.data(metadata.defaultValue);// Explicitly check for null/undefined here as value may be `false`, so ($el.data(dataInitialValue) || '') would not work
if(initialValue==null){initialValue='';}var currentValue=$el.val();if(currentValue==null){currentValue='';}// Boolean values can be encoded as "true/false" or "True/False" depending on underlying frameworks so we need a case insensitive comparison
var boolRegex=/^(true|false)$/i;var isBoolValue=boolRegex.test(initialValue)&&boolRegex.test(currentValue);if(isBoolValue){var regex=new RegExp("^"+initialValue+"$","i");return!regex.test(currentValue);}return currentValue!==initialValue;},checkboxDirty:function checkboxDirty($el){var initialValue=$el.data(metadata.defaultValue);var currentValue=$el.is(":checked");return initialValue!==currentValue;},justDirty:function justDirty(){return history[0]==='dirty';},justClean:function justClean(){return history[0]==='clean';}},removeEvents:function removeEvents(){$module.off(eventNamespace);$field.off(eventNamespace);$submit.off(eventNamespace);$field.off(eventNamespace);},event:{field:{keydown:function keydown(event){var $field=$(this),key=event.which,isInput=$field.is(selector.input),isCheckbox=$field.is(selector.checkbox),isInDropdown=$field.closest(selector.uiDropdown).length>0,keyCode={enter:13,escape:27};if(key==keyCode.escape){module.verbose('Escape key pressed blurring field');$field.blur();}if(!event.ctrlKey&&key==keyCode.enter&&isInput&&!isInDropdown&&!isCheckbox){if(!keyHeldDown){$field.one('keyup'+eventNamespace,module.event.field.keyup);module.submit();module.debug('Enter pressed on input submitting form');}keyHeldDown=true;}},keyup:function keyup(){keyHeldDown=false;},blur:function blur(event){var $field=$(this),$fieldGroup=$field.closest($group),validationRules=module.get.validation($field);if($fieldGroup.hasClass(className.error)){module.debug('Revalidating field',$field,validationRules);if(validationRules){module.validate.field(validationRules);}}else if(_settings2.on=='blur'){if(validationRules){module.validate.field(validationRules);}}},change:function change(event){var $field=$(this),$fieldGroup=$field.closest($group),validationRules=module.get.validation($field);if(validationRules&&(_settings2.on=='change'||$fieldGroup.hasClass(className.error)&&_settings2.revalidate)){clearTimeout(module.timer);module.timer=setTimeout(function(){module.debug('Revalidating field',$field,module.get.validation($field));module.validate.field(validationRules);},_settings2.delay);}}},beforeUnload:function beforeUnload(event){if(module.is.dirty()&&!submitting){var event=event||window.event;// For modern browsers
if(event){event.returnValue=_settings2.text.leavingMessage;}// For olders...
return _settings2.text.leavingMessage;}}},get:{ancillaryValue:function ancillaryValue(rule){if(!rule.type||!rule.value&&!module.is.bracketedRule(rule)){return false;}return rule.value!==undefined?rule.value:rule.type.match(_settings2.regExp.bracket)[1]+'';},ruleName:function ruleName(rule){if(module.is.bracketedRule(rule)){return rule.type.replace(rule.type.match(_settings2.regExp.bracket)[0],'');}return rule.type;},changeEvent:function changeEvent(type,$input){if(type=='checkbox'||type=='radio'||type=='hidden'||$input.is('select')){return'change';}else{return module.get.inputEvent();}},inputEvent:function inputEvent(){return document.createElement('input').oninput!==undefined?'input':document.createElement('input').onpropertychange!==undefined?'propertychange':'keyup';},fieldsFromShorthand:function fieldsFromShorthand(fields){var fullFields={};$.each(fields,function(name,rules){if(typeof rules=='string'){rules=[rules];}fullFields[name]={rules:[]};$.each(rules,function(index,rule){fullFields[name].rules.push({type:rule});});});return fullFields;},prompt:function prompt(rule,field){var ruleName=module.get.ruleName(rule),ancillary=module.get.ancillaryValue(rule),$field=module.get.field(field.identifier),value=$field.val(),prompt=$.isFunction(rule.prompt)?rule.prompt(value):rule.prompt||_settings2.prompt[ruleName]||_settings2.text.unspecifiedRule,requiresValue=prompt.search('{value}')!==-1,requiresName=prompt.search('{name}')!==-1,$label,name;if(requiresValue){prompt=prompt.replace('{value}',$field.val());}if(requiresName){$label=$field.closest(selector.group).find('label').eq(0);name=$label.length==1?$label.text():$field.prop('placeholder')||_settings2.text.unspecifiedField;prompt=prompt.replace('{name}',name);}prompt=prompt.replace('{identifier}',field.identifier);prompt=prompt.replace('{ruleValue}',ancillary);if(!rule.prompt){module.verbose('Using default validation prompt for type',prompt,ruleName);}return prompt;},settings:function settings(){if($.isPlainObject(parameters)){var keys=Object.keys(parameters),isLegacySettings=keys.length>0?parameters[keys[0]].identifier!==undefined&&parameters[keys[0]].rules!==undefined:false;if(isLegacySettings){// 1.x (ducktyped)
_settings2=$.extend(true,{},$.fn.form.settings,legacyParameters);_validation=$.extend({},$.fn.form.settings.defaults,parameters);module.error(_settings2.error.oldSyntax,element);module.verbose('Extending settings from legacy parameters',_validation,_settings2);}else{// 2.x
if(parameters.fields&&module.is.shorthandFields(parameters.fields)){parameters.fields=module.get.fieldsFromShorthand(parameters.fields);}_settings2=$.extend(true,{},$.fn.form.settings,parameters);_validation=$.extend({},$.fn.form.settings.defaults,_settings2.fields);module.verbose('Extending settings',_validation,_settings2);}}else{_settings2=$.fn.form.settings;_validation=$.fn.form.settings.defaults;module.verbose('Using default form validation',_validation,_settings2);}// shorthand
namespace=_settings2.namespace;metadata=_settings2.metadata;selector=_settings2.selector;className=_settings2.className;regExp=_settings2.regExp;error=_settings2.error;moduleNamespace='module-'+namespace;eventNamespace='.'+namespace;// grab instance
instance=$module.data(moduleNamespace);// refresh selector cache
module.refresh();},field:function field(identifier){module.verbose('Finding field with identifier',identifier);identifier=module.escape.string(identifier);var t;if((t=$field.filter('#'+identifier)).length>0){return t;}if((t=$field.filter('[name="'+identifier+'"]')).length>0){return t;}if((t=$field.filter('[name="'+identifier+'[]"]')).length>0){return t;}if((t=$field.filter('[data-'+metadata.validate+'="'+identifier+'"]')).length>0){return t;}return $('<input/>');},fields:function fields(_fields){var $fields=$();$.each(_fields,function(index,name){$fields=$fields.add(module.get.field(name));});return $fields;},validation:function validation($field){var fieldValidation,identifier;if(!_validation){return false;}$.each(_validation,function(fieldName,field){identifier=field.identifier||fieldName;$.each(module.get.field(identifier),function(index,groupField){if(groupField==$field[0]){field.identifier=identifier;fieldValidation=field;return false;}});});return fieldValidation||false;},value:function value(field){var fields=[],results;fields.push(field);results=module.get.values.call(element,fields);return results[field];},values:function values(fields){var $fields=Array.isArray(fields)?module.get.fields(fields):$field,values={};$fields.each(function(index,field){var $field=$(field),$calendar=$field.closest(selector.uiCalendar),name=$field.prop('name'),value=$field.val(),isCheckbox=$field.is(selector.checkbox),isRadio=$field.is(selector.radio),isMultiple=name.indexOf('[]')!==-1,isCalendar=$calendar.length>0&&module.can.useElement('calendar'),isChecked=isCheckbox?$field.is(':checked'):false;if(name){if(isMultiple){name=name.replace('[]','');if(!values[name]){values[name]=[];}if(isCheckbox){if(isChecked){values[name].push(value||true);}else{values[name].push(false);}}else{values[name].push(value);}}else{if(isRadio){if(values[name]===undefined||values[name]==false){values[name]=isChecked?value||true:false;}}else if(isCheckbox){if(isChecked){values[name]=value||true;}else{values[name]=false;}}else if(isCalendar){var date=$calendar.calendar('get date');if(date!==null){if(_settings2.dateHandling=='date'){values[name]=date;}else if(_settings2.dateHandling=='input'){values[name]=$calendar.calendar('get input date');}else if(_settings2.dateHandling=='formatter'){var type=$calendar.calendar('setting','type');switch(type){case'date':values[name]=_settings2.formatter.date(date);break;case'datetime':values[name]=_settings2.formatter.datetime(date);break;case'time':values[name]=_settings2.formatter.time(date);break;case'month':values[name]=_settings2.formatter.month(date);break;case'year':values[name]=_settings2.formatter.year(date);break;default:module.debug('Wrong calendar mode',$calendar,type);values[name]='';}}}else{values[name]='';}}else{values[name]=value;}}}});return values;},dirtyFields:function dirtyFields(){return $field.filter(function(index,e){return $(e).data(metadata.isDirty);});}},has:{field:function field(identifier){module.verbose('Checking for existence of a field with identifier',identifier);identifier=module.escape.string(identifier);if(typeof identifier!=='string'){module.error(error.identifier,identifier);}if($field.filter('#'+identifier).length>0){return true;}else if($field.filter('[name="'+identifier+'"]').length>0){return true;}else if($field.filter('[data-'+metadata.validate+'="'+identifier+'"]').length>0){return true;}return false;}},can:{useElement:function useElement(element){if($.fn[element]!==undefined){return true;}module.error(error.noElement.replace('{element}',element));return false;}},escape:{string:function string(text){text=String(text);return text.replace(regExp.escape,'\\$&');}},add:{// alias
rule:function rule(name,rules){module.add.field(name,rules);},field:function field(name,rules){// Validation should have at least a standard format
if(_validation[name]===undefined||_validation[name].rules===undefined){_validation[name]={rules:[]};}var newValidation={rules:[]};if(module.is.shorthandRules(rules)){rules=Array.isArray(rules)?rules:[rules];$.each(rules,function(_index,rule){newValidation.rules.push({type:rule});});}else{newValidation.rules=rules.rules;}// For each new rule, check if there's not already one with the same type
$.each(newValidation.rules,function(_index,rule){if($.grep(_validation[name].rules,function(item){return item.type==rule.type;}).length==0){_validation[name].rules.push(rule);}});module.debug('Adding rules',newValidation.rules,_validation);},fields:function fields(_fields2){var newValidation;if(_fields2&&module.is.shorthandFields(_fields2)){newValidation=module.get.fieldsFromShorthand(_fields2);}else{newValidation=_fields2;}_validation=$.extend({},_validation,newValidation);},prompt:function prompt(identifier,errors,internal){var $field=module.get.field(identifier),$fieldGroup=$field.closest($group),$prompt=$fieldGroup.children(selector.prompt),promptExists=$prompt.length!==0;errors=typeof errors=='string'?[errors]:errors;module.verbose('Adding field error state',identifier);if(!internal){$fieldGroup.addClass(className.error);}if(_settings2.inline){if(!promptExists){$prompt=_settings2.templates.prompt(errors,className.label);$prompt.appendTo($fieldGroup);}$prompt.html(errors[0]);if(!promptExists){if(_settings2.transition&&module.can.useElement('transition')&&$module.transition('is supported')){module.verbose('Displaying error with css transition',_settings2.transition);$prompt.transition(_settings2.transition+' in',_settings2.duration);}else{module.verbose('Displaying error with fallback javascript animation');$prompt.fadeIn(_settings2.duration);}}else{module.verbose('Inline errors are disabled, no inline error added',identifier);}}},errors:function errors(_errors){module.debug('Adding form error messages',_errors);module.set.error();$message.html(_settings2.templates.error(_errors));}},remove:{rule:function rule(field,_rule){var rules=Array.isArray(_rule)?_rule:[_rule];if(_validation[field]===undefined||!Array.isArray(_validation[field].rules)){return;}if(_rule===undefined){module.debug('Removed all rules');_validation[field].rules=[];return;}$.each(_validation[field].rules,function(index,rule){if(rule&&rules.indexOf(rule.type)!==-1){module.debug('Removed rule',rule.type);_validation[field].rules.splice(index,1);}});},field:function field(_field){var fields=Array.isArray(_field)?_field:[_field];$.each(fields,function(index,field){module.remove.rule(field);});},// alias
rules:function rules(field,_rules){if(Array.isArray(field)){$.each(field,function(index,field){module.remove.rule(field,_rules);});}else{module.remove.rule(field,_rules);}},fields:function fields(_fields3){module.remove.field(_fields3);},prompt:function prompt(identifier){var $field=module.get.field(identifier),$fieldGroup=$field.closest($group),$prompt=$fieldGroup.children(selector.prompt);$fieldGroup.removeClass(className.error);if(_settings2.inline&&$prompt.is(':visible')){module.verbose('Removing prompt for field',identifier);if(_settings2.transition&&module.can.useElement('transition')&&$module.transition('is supported')){$prompt.transition(_settings2.transition+' out',_settings2.duration,function(){$prompt.remove();});}else{$prompt.fadeOut(_settings2.duration,function(){$prompt.remove();});}}}},set:{success:function success(){$module.removeClass(className.error).addClass(className.success);},defaults:function defaults(){$field.each(function(index,el){var $el=$(el),$parent=$el.parent(),isCheckbox=$el.filter(selector.checkbox).length>0,isDropdown=$parent.is(selector.uiDropdown)&&module.can.useElement('dropdown'),$calendar=$el.closest(selector.uiCalendar),isCalendar=$calendar.length>0&&module.can.useElement('calendar'),value=isCheckbox?$el.is(':checked'):$el.val();if(isDropdown){$parent.dropdown('save defaults');}else if(isCalendar){$calendar.calendar('refresh');}$el.data(metadata.defaultValue,value);$el.data(metadata.isDirty,false);});},error:function error(){$module.removeClass(className.success).addClass(className.error);},value:function value(field,_value){var fields={};fields[field]=_value;return module.set.values.call(element,fields);},values:function values(fields){if($.isEmptyObject(fields)){return;}$.each(fields,function(key,value){var $field=module.get.field(key),$element=$field.parent(),$calendar=$field.closest(selector.uiCalendar),isMultiple=Array.isArray(value),isCheckbox=$element.is(selector.uiCheckbox)&&module.can.useElement('checkbox'),isDropdown=$element.is(selector.uiDropdown)&&module.can.useElement('dropdown'),isRadio=$field.is(selector.radio)&&isCheckbox,isCalendar=$calendar.length>0&&module.can.useElement('calendar'),fieldExists=$field.length>0,$multipleField;if(fieldExists){if(isMultiple&&isCheckbox){module.verbose('Selecting multiple',value,$field);$element.checkbox('uncheck');$.each(value,function(index,value){$multipleField=$field.filter('[value="'+value+'"]');$element=$multipleField.parent();if($multipleField.length>0){$element.checkbox('check');}});}else if(isRadio){module.verbose('Selecting radio value',value,$field);$field.filter('[value="'+value+'"]').parent(selector.uiCheckbox).checkbox('check');}else if(isCheckbox){module.verbose('Setting checkbox value',value,$element);if(value===true||value===1){$element.checkbox('check');}else{$element.checkbox('uncheck');}}else if(isDropdown){module.verbose('Setting dropdown value',value,$element);$element.dropdown('set selected',value);}else if(isCalendar){$calendar.calendar('set date',value);}else{module.verbose('Setting field value',value,$field);$field.val(value);}}});},dirty:function dirty(){module.verbose('Setting state dirty');_dirty=true;history[0]=history[1];history[1]='dirty';if(module.is.justClean()){$module.trigger('dirty');}},clean:function clean(){module.verbose('Setting state clean');_dirty=false;history[0]=history[1];history[1]='clean';if(module.is.justDirty()){$module.trigger('clean');}},asClean:function asClean(){module.set.defaults();module.set.clean();},asDirty:function asDirty(){module.set.defaults();module.set.dirty();}},validate:{form:function form(event,ignoreCallbacks){var values=module.get.values();// input keydown event will fire submit repeatedly by browser default
if(keyHeldDown){return false;}// reset errors
formErrors=[];if(module.determine.isValid()){module.debug('Form has no validation errors, submitting');module.set.success();if(ignoreCallbacks!==true){return _settings2.onSuccess.call(element,event,values);}}else{module.debug('Form has errors');module.set.error();if(!_settings2.inline){module.add.errors(formErrors);}// prevent ajax submit
if(event&&$module.data('moduleApi')!==undefined){event.stopImmediatePropagation();}if(ignoreCallbacks!==true){return _settings2.onFailure.call(element,formErrors,values);}}},// takes a validation object and returns whether field passes validation
field:function field(_field2,fieldName,showErrors){showErrors=showErrors!==undefined?showErrors:true;if(typeof _field2=='string'){module.verbose('Validating field',_field2);fieldName=_field2;_field2=_validation[_field2];}var identifier=_field2.identifier||fieldName,$field=module.get.field(identifier),$dependsField=_field2.depends?module.get.field(_field2.depends):false,fieldValid=true,fieldErrors=[];if(!_field2.identifier){module.debug('Using field name as identifier',identifier);_field2.identifier=identifier;}var isDisabled=true;$.each($field,function(){if(!$(this).prop('disabled')){isDisabled=false;return false;}});if(isDisabled){module.debug('Field is disabled. Skipping',identifier);}else if(_field2.optional&&module.is.blank($field)){module.debug('Field is optional and blank. Skipping',identifier);}else if(_field2.depends&&module.is.empty($dependsField)){module.debug('Field depends on another value that is not present or empty. Skipping',$dependsField);}else if(_field2.rules!==undefined){$field.closest($group).removeClass(className.error);$.each(_field2.rules,function(index,rule){if(module.has.field(identifier)){var invalidFields=module.validate.rule(_field2,rule,true)||[];if(invalidFields.length>0){module.debug('Field is invalid',identifier,rule.type);fieldErrors.push(module.get.prompt(rule,_field2));fieldValid=false;if(showErrors){$(invalidFields).closest($group).addClass(className.error);}}}});}if(fieldValid){if(showErrors){module.remove.prompt(identifier,fieldErrors);_settings2.onValid.call($field);}}else{if(showErrors){formErrors=formErrors.concat(fieldErrors);module.add.prompt(identifier,fieldErrors,true);_settings2.onInvalid.call($field,fieldErrors);}return false;}return true;},// takes validation rule and returns whether field passes rule
rule:function rule(field,_rule2,internal){var $field=module.get.field(field.identifier),ancillary=module.get.ancillaryValue(_rule2),ruleName=module.get.ruleName(_rule2),ruleFunction=_settings2.rules[ruleName],invalidFields=[],isCheckbox=$field.is(selector.checkbox),isValid=function isValid(field){var value=isCheckbox?$(field).filter(':checked').val():$(field).val();// cast to string avoiding encoding special values
value=value===undefined||value===''||value===null?'':_settings2.shouldTrim?$.trim(value+''):String(value+'');return ruleFunction.call(field,value,ancillary,$module);};if(!$.isFunction(ruleFunction)){module.error(error.noRule,ruleName);return;}if(isCheckbox){if(!isValid($field)){invalidFields=$field;}}else{$.each($field,function(index,field){if(!isValid(field)){invalidFields.push(field);}});}return internal?invalidFields:!(invalidFields.length>0);}},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,_settings2,name);}else if(value!==undefined){_settings2[name]=value;}else{return _settings2[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!_settings2.silent&&_settings2.debug){if(_settings2.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings2.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!_settings2.silent&&_settings2.verbose&&_settings2.debug){if(_settings2.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings2.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!_settings2.silent){module.error=Function.prototype.bind.call(console.error,console,_settings2.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings2.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings2.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};module.initialize();});return returnedValue!==undefined?returnedValue:this;};$.fn.form.settings={name:'Form',namespace:'form',debug:false,verbose:false,performance:true,fields:false,keyboardShortcuts:true,on:'submit',inline:false,delay:200,revalidate:true,shouldTrim:true,transition:'scale',duration:200,preventLeaving:false,dateHandling:'date',// 'date', 'input', 'formatter'
onValid:function onValid(){},onInvalid:function onInvalid(){},onSuccess:function onSuccess(){return true;},onFailure:function onFailure(){return false;},onDirty:function onDirty(){},onClean:function onClean(){},metadata:{defaultValue:'default',validate:'validate',isDirty:'isDirty'},regExp:{htmlID:/^[a-zA-Z][\w:.-]*$/g,bracket:/\[(.*)\]/i,decimal:/^\d+\.?\d*$/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|:,=@]/g,flags:/^\/(.*)\/(.*)?/,integer:/^\-?\d+$/,number:/^\-?\d*(\.\d+)?$/,url:/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i},text:{unspecifiedRule:'Please enter a valid value',unspecifiedField:'This field',leavingMessage:'There are unsaved changes on this page which will be discarded if you continue.'},prompt:{empty:'{name} must have a value',checked:'{name} must be checked',email:'{name} must be a valid e-mail',url:'{name} must be a valid url',regExp:'{name} is not formatted correctly',integer:'{name} must be an integer',decimal:'{name} must be a decimal number',number:'{name} must be set to a number',is:'{name} must be "{ruleValue}"',isExactly:'{name} must be exactly "{ruleValue}"',not:'{name} cannot be set to "{ruleValue}"',notExactly:'{name} cannot be set to exactly "{ruleValue}"',contain:'{name} must contain "{ruleValue}"',containExactly:'{name} must contain exactly "{ruleValue}"',doesntContain:'{name} cannot contain  "{ruleValue}"',doesntContainExactly:'{name} cannot contain exactly "{ruleValue}"',minLength:'{name} must be at least {ruleValue} characters',length:'{name} must be at least {ruleValue} characters',exactLength:'{name} must be exactly {ruleValue} characters',maxLength:'{name} cannot be longer than {ruleValue} characters',match:'{name} must match {ruleValue} field',different:'{name} must have a different value than {ruleValue} field',creditCard:'{name} must be a valid credit card number',minCount:'{name} must have at least {ruleValue} choices',exactCount:'{name} must have exactly {ruleValue} choices',maxCount:'{name} must have {ruleValue} or less choices'},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:'.clear',field:'input, textarea, select',group:'.field',input:'input',message:'.error.message',prompt:'.prompt.label',radio:'input[type="radio"]',reset:'.reset:not([type="reset"])',submit:'.submit:not([type="submit"])',uiCheckbox:'.ui.checkbox',uiDropdown:'.ui.dropdown',uiCalendar:'.ui.calendar'},className:{error:'error',label:'ui basic red pointing prompt label',pressed:'down',success:'success'},error:{identifier:'You must specify a string identifier for each field',method:'The method you called is not defined.',noRule:'There is no rule matching the one you specified',oldSyntax:'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.',noElement:'This module requires ui {element}'},templates:{// template that produces error message
error:function error(errors){var html='<ul class="list">';$.each(errors,function(index,value){html+='<li>'+value+'</li>';});html+='</ul>';return $(html);},// template that produces label
prompt:function prompt(errors,labelClasses){return $('<div/>').addClass(labelClasses).html(errors[0]);}},formatter:{date:function date(_date){return Intl.DateTimeFormat('en-GB').format(_date);},datetime:function datetime(date){return Intl.DateTimeFormat('en-GB',{year:"numeric",month:"2-digit",day:"2-digit",hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(date);},time:function time(date){return Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(date);},month:function month(date){return Intl.DateTimeFormat('en-GB',{month:'2-digit',year:'numeric'}).format(date);},year:function year(date){return Intl.DateTimeFormat('en-GB',{year:'numeric'}).format(date);}},rules:{// is not empty or blank string
empty:function empty(value){return!(value===undefined||''===value||Array.isArray(value)&&value.length===0);},// checkbox checked
checked:function checked(){return $(this).filter(':checked').length>0;},// is most likely an email
email:function email(value){return $.fn.form.settings.regExp.email.test(value);},// value is most likely url
url:function url(value){return $.fn.form.settings.regExp.url.test(value);},// matches specified regExp
regExp:function regExp(value,_regExp){if(_regExp instanceof RegExp){return value.match(_regExp);}var regExpParts=_regExp.match($.fn.form.settings.regExp.flags),flags;// regular expression specified as /baz/gi (flags)
if(regExpParts){_regExp=regExpParts.length>=2?regExpParts[1]:_regExp;flags=regExpParts.length>=3?regExpParts[2]:'';}return value.match(new RegExp(_regExp,flags));},// is valid integer or matches range
integer:function integer(value,range){var intRegExp=$.fn.form.settings.regExp.integer,min,max,parts;if(!range||['','..'].indexOf(range)!==-1){// do nothing
}else if(range.indexOf('..')==-1){if(intRegExp.test(range)){min=max=range-0;}}else{parts=range.split('..',2);if(intRegExp.test(parts[0])){min=parts[0]-0;}if(intRegExp.test(parts[1])){max=parts[1]-0;}}return intRegExp.test(value)&&(min===undefined||value>=min)&&(max===undefined||value<=max);},// is valid number (with decimal)
decimal:function decimal(value){return $.fn.form.settings.regExp.decimal.test(value);},// is valid number
number:function number(value){return $.fn.form.settings.regExp.number.test(value);},// is value (case insensitive)
is:function is(value,text){text=typeof text=='string'?text.toLowerCase():text;value=typeof value=='string'?value.toLowerCase():value;return value==text;},// is value
isExactly:function isExactly(value,text){return value==text;},// value is not another value (case insensitive)
not:function not(value,notValue){value=typeof value=='string'?value.toLowerCase():value;notValue=typeof notValue=='string'?notValue.toLowerCase():notValue;return value!=notValue;},// value is not another value (case sensitive)
notExactly:function notExactly(value,notValue){return value!=notValue;},// value contains text (insensitive)
contains:function contains(value,text){// escape regex characters
text=text.replace($.fn.form.settings.regExp.escape,"\\$&");return value.search(new RegExp(text,'i'))!==-1;},// value contains text (case sensitive)
containsExactly:function containsExactly(value,text){// escape regex characters
text=text.replace($.fn.form.settings.regExp.escape,"\\$&");return value.search(new RegExp(text))!==-1;},// value contains text (insensitive)
doesntContain:function doesntContain(value,text){// escape regex characters
text=text.replace($.fn.form.settings.regExp.escape,"\\$&");return value.search(new RegExp(text,'i'))===-1;},// value contains text (case sensitive)
doesntContainExactly:function doesntContainExactly(value,text){// escape regex characters
text=text.replace($.fn.form.settings.regExp.escape,"\\$&");return value.search(new RegExp(text))===-1;},// is at least string length
minLength:function minLength(value,requiredLength){return value!==undefined?value.length>=requiredLength:false;},// see rls notes for 2.0.6 (this is a duplicate of minLength)
length:function length(value,requiredLength){return value!==undefined?value.length>=requiredLength:false;},// is exactly length
exactLength:function exactLength(value,requiredLength){return value!==undefined?value.length==requiredLength:false;},// is less than length
maxLength:function maxLength(value,_maxLength){return value!==undefined?value.length<=_maxLength:false;},// matches another field
match:function match(value,identifier,$module){var matchingValue,matchingElement;if((matchingElement=$module.find('[data-validate="'+identifier+'"]')).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('#'+identifier)).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('[name="'+identifier+'"]')).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('[name="'+identifier+'[]"]')).length>0){matchingValue=matchingElement;}return matchingValue!==undefined?value.toString()==matchingValue.toString():false;},// different than another field
different:function different(value,identifier,$module){// use either id or name of field
var matchingValue,matchingElement;if((matchingElement=$module.find('[data-validate="'+identifier+'"]')).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('#'+identifier)).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('[name="'+identifier+'"]')).length>0){matchingValue=matchingElement.val();}else if((matchingElement=$module.find('[name="'+identifier+'[]"]')).length>0){matchingValue=matchingElement;}return matchingValue!==undefined?value.toString()!==matchingValue.toString():false;},creditCard:function creditCard(cardNumber,cardTypes){var cards={visa:{pattern:/^4/,length:[16]},amex:{pattern:/^3[47]/,length:[15]},mastercard:{pattern:/^5[1-5]/,length:[16]},discover:{pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,length:[16]},unionPay:{pattern:/^(62|88)/,length:[16,17,18,19]},jcb:{pattern:/^35(2[89]|[3-8][0-9])/,length:[16]},maestro:{pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,length:[12,13,14,15,16,17,18,19]},dinersClub:{pattern:/^(30[0-5]|^36)/,length:[14]},laser:{pattern:/^(6304|670[69]|6771)/,length:[16,17,18,19]},visaElectron:{pattern:/^(4026|417500|4508|4844|491(3|7))/,length:[16]}},valid={},validCard=false,requiredTypes=typeof cardTypes=='string'?cardTypes.split(','):false,unionPay,validation;if(typeof cardNumber!=='string'||cardNumber.length===0){return;}// allow dashes in card
cardNumber=cardNumber.replace(/[\-]/g,'');// verify card types
if(requiredTypes){$.each(requiredTypes,function(index,type){// verify each card type
validation=cards[type];if(validation){valid={length:$.inArray(cardNumber.length,validation.length)!==-1,pattern:cardNumber.search(validation.pattern)!==-1};if(valid.length&&valid.pattern){validCard=true;}}});if(!validCard){return false;}}// skip luhn for UnionPay
unionPay={number:$.inArray(cardNumber.length,cards.unionPay.length)!==-1,pattern:cardNumber.search(cards.unionPay.pattern)!==-1};if(unionPay.number&&unionPay.pattern){return true;}// verify luhn, adapted from  <https://gist.github.com/2134376>
var length=cardNumber.length,multiple=0,producedValue=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],sum=0;while(length--){sum+=producedValue[multiple][parseInt(cardNumber.charAt(length),10)];multiple^=1;}return sum%10===0&&sum>0;},minCount:function minCount(value,_minCount){if(_minCount==0){return true;}if(_minCount==1){return value!=='';}return value.split(',').length>=_minCount;},exactCount:function exactCount(value,_exactCount){if(_exactCount==0){return value==='';}if(_exactCount==1){return value!==''&&value.search(',')===-1;}return value.split(',').length==_exactCount;},maxCount:function maxCount(value,_maxCount){if(_maxCount==0){return false;}if(_maxCount==1){return value.search(',')===-1;}return value.split(',').length<=_maxCount;}}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Accordion
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.accordion=function(parameters){var $allModules=$(this),time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.accordion.settings,parameters):$.extend({},$.fn.accordion.settings),className=settings.className,namespace=settings.namespace,selector=settings.selector,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,moduleSelector=$allModules.selector||'',$module=$(this),$title=$module.find(selector.title),$content=$module.find(selector.content),element=this,instance=$module.data(moduleNamespace),observer,module;module={initialize:function initialize(){module.debug('Initializing',$module);module.bind.events();if(settings.observeChanges){module.observeChanges();}module.instantiate();},instantiate:function instantiate(){instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.debug('Destroying previous instance',$module);$module.off(eventNamespace).removeData(moduleNamespace);},refresh:function refresh(){$title=$module.find(selector.title);$content=$module.find(selector.content);},observeChanges:function observeChanges(){if('MutationObserver'in window){observer=new MutationObserver(function(mutations){module.debug('DOM tree modified, updating selector cache');module.refresh();});observer.observe(element,{childList:true,subtree:true});module.debug('Setting up mutation observer',observer);}},bind:{events:function events(){module.debug('Binding delegated events');$module.on(settings.on+eventNamespace,selector.trigger,module.event.click);}},event:{click:function click(){module.toggle.call(this);}},toggle:function toggle(query){var $activeTitle=query!==undefined?typeof query==='number'?$title.eq(query):$(query).closest(selector.title):$(this).closest(selector.title),$activeContent=$activeTitle.next($content),isAnimating=$activeContent.hasClass(className.animating),isActive=$activeContent.hasClass(className.active),isOpen=isActive&&!isAnimating,isOpening=!isActive&&isAnimating;module.debug('Toggling visibility of content',$activeTitle);if(isOpen||isOpening){if(settings.collapsible){module.close.call($activeTitle);}else{module.debug('Cannot close accordion content collapsing is disabled');}}else{module.open.call($activeTitle);}},open:function open(query){var $activeTitle=query!==undefined?typeof query==='number'?$title.eq(query):$(query).closest(selector.title):$(this).closest(selector.title),$activeContent=$activeTitle.next($content),isAnimating=$activeContent.hasClass(className.animating),isActive=$activeContent.hasClass(className.active),isOpen=isActive||isAnimating;if(isOpen){module.debug('Accordion already open, skipping',$activeContent);return;}module.debug('Opening accordion content',$activeTitle);settings.onOpening.call($activeContent);settings.onChanging.call($activeContent);if(settings.exclusive){module.closeOthers.call($activeTitle);}$activeTitle.addClass(className.active);$activeContent.stop(true,true).addClass(className.animating);if(settings.animateChildren){if($.fn.transition!==undefined&&$module.transition('is supported')){$activeContent.children().transition({animation:'fade in',queue:false,useFailSafe:true,debug:settings.debug,verbose:settings.verbose,duration:settings.duration,skipInlineHidden:true,onComplete:function onComplete(){$activeContent.children().removeClass(className.transition);}});}else{$activeContent.children().stop(true,true).animate({opacity:1},settings.duration,module.resetOpacity);}}$activeContent.slideDown(settings.duration,settings.easing,function(){$activeContent.removeClass(className.animating).addClass(className.active);module.reset.display.call(this);settings.onOpen.call(this);settings.onChange.call(this);});},close:function close(query){var $activeTitle=query!==undefined?typeof query==='number'?$title.eq(query):$(query).closest(selector.title):$(this).closest(selector.title),$activeContent=$activeTitle.next($content),isAnimating=$activeContent.hasClass(className.animating),isActive=$activeContent.hasClass(className.active),isOpening=!isActive&&isAnimating,isClosing=isActive&&isAnimating;if((isActive||isOpening)&&!isClosing){module.debug('Closing accordion content',$activeContent);settings.onClosing.call($activeContent);settings.onChanging.call($activeContent);$activeTitle.removeClass(className.active);$activeContent.stop(true,true).addClass(className.animating);if(settings.animateChildren){if($.fn.transition!==undefined&&$module.transition('is supported')){$activeContent.children().transition({animation:'fade out',queue:false,useFailSafe:true,debug:settings.debug,verbose:settings.verbose,duration:settings.duration,skipInlineHidden:true});}else{$activeContent.children().stop(true,true).animate({opacity:0},settings.duration,module.resetOpacity);}}$activeContent.slideUp(settings.duration,settings.easing,function(){$activeContent.removeClass(className.animating).removeClass(className.active);module.reset.display.call(this);settings.onClose.call(this);settings.onChange.call(this);});}},closeOthers:function closeOthers(index){var $activeTitle=index!==undefined?$title.eq(index):$(this).closest(selector.title),$parentTitles=$activeTitle.parents(selector.content).prev(selector.title),$activeAccordion=$activeTitle.closest(selector.accordion),activeSelector=selector.title+'.'+className.active+':visible',activeContent=selector.content+'.'+className.active+':visible',$openTitles,$nestedTitles,$openContents;if(settings.closeNested){$openTitles=$activeAccordion.find(activeSelector).not($parentTitles);$openContents=$openTitles.next($content);}else{$openTitles=$activeAccordion.find(activeSelector).not($parentTitles);$nestedTitles=$activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);$openTitles=$openTitles.not($nestedTitles);$openContents=$openTitles.next($content);}if($openTitles.length>0){module.debug('Exclusive enabled, closing other content',$openTitles);$openTitles.removeClass(className.active);$openContents.removeClass(className.animating).stop(true,true);if(settings.animateChildren){if($.fn.transition!==undefined&&$module.transition('is supported')){$openContents.children().transition({animation:'fade out',useFailSafe:true,debug:settings.debug,verbose:settings.verbose,duration:settings.duration,skipInlineHidden:true});}else{$openContents.children().stop(true,true).animate({opacity:0},settings.duration,module.resetOpacity);}}$openContents.slideUp(settings.duration,settings.easing,function(){$(this).removeClass(className.active);module.reset.display.call(this);});}},reset:{display:function display(){module.verbose('Removing inline display from element',this);$(this).css('display','');if($(this).attr('style')===''){$(this).attr('style','').removeAttr('style');}},opacity:function opacity(){module.verbose('Removing inline opacity from element',this);$(this).css('opacity','');if($(this).attr('style')===''){$(this).attr('style','').removeAttr('style');}}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){module.debug('Changing internal',name,value);if(value!==undefined){if($.isPlainObject(name)){$.extend(true,module,name);}else{module[name]=value;}}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.accordion.settings={name:'Accordion',namespace:'accordion',silent:false,debug:false,verbose:false,performance:true,on:'click',// event on title that opens accordion
observeChanges:true,// whether accordion should automatically refresh on DOM insertion
exclusive:true,// whether a single accordion content panel should be open at once
collapsible:true,// whether accordion content can be closed
closeNested:false,// whether nested content should be closed when a panel is closed
animateChildren:true,// whether children opacity should be animated
duration:350,// duration of animation
easing:'easeOutQuad',// easing equation for animation
onOpening:function onOpening(){},// callback before open animation
onClosing:function onClosing(){},// callback before closing animation
onChanging:function onChanging(){},// callback before closing or opening animation
onOpen:function onOpen(){},// callback after open animation
onClose:function onClose(){},// callback after closing animation
onChange:function onChange(){},// callback after closing or opening animation
error:{method:'The method you called is not defined'},className:{active:'active',animating:'animating',transition:'transition'},selector:{accordion:'.accordion',title:'.title',trigger:'.title',content:'.content'}};// Adds easing
$.extend($.easing,{easeOutQuad:function easeOutQuad(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;}});})(jQuery,window,document);/*!
 * # Fomantic-UI - Calendar
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.calendar=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue,timeGapTable={'5':{'row':4,'column':3},'10':{'row':3,'column':2},'15':{'row':2,'column':2},'20':{'row':3,'column':1},'30':{'row':2,'column':1}};$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.calendar.settings,parameters):$.extend({},$.fn.calendar.settings),className=settings.className,namespace=settings.namespace,selector=settings.selector,formatter=settings.formatter,parser=settings.parser,metadata=settings.metadata,timeGap=timeGapTable[settings.minTimeGap],error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$input=$module.find(selector.input),$container=$module.find(selector.popup),$activator=$module.find(selector.activator),element=this,instance=$module.data(moduleNamespace),isTouch,isTouchDown=false,focusDateUsedForRange=false,module;module={initialize:function initialize(){module.debug('Initializing calendar for',element,$module);isTouch=module.get.isTouch();module.setup.config();module.setup.popup();module.setup.inline();module.setup.input();module.setup.date();module.create.calendar();module.bind.events();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of calendar');instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){module.verbose('Destroying previous calendar for',element);$module.removeData(moduleNamespace);module.unbind.events();},setup:{config:function config(){if(module.get.minDate()!==null){module.set.minDate($module.data(metadata.minDate));}if(module.get.maxDate()!==null){module.set.maxDate($module.data(metadata.maxDate));}module.setting('type',module.get.type());},popup:function popup(){if(settings.inline){return;}if(!$activator.length){$activator=$module.children().first();if(!$activator.length){return;}}if($.fn.popup===undefined){module.error(error.popup);return;}if(!$container.length){//prepend the popup element to the activator's parent so that it has less chance of messing with
//the styling (eg input action button needs to be the last child to have correct border radius)
var $activatorParent=$activator.parent(),domPositionFunction=$activatorParent.closest(selector.append).length!==0?'appendTo':'prependTo';$container=$('<div/>').addClass(className.popup)[domPositionFunction]($activatorParent);}$container.addClass(className.calendar);var onVisible=settings.onVisible;var onHidden=settings.onHidden;if(!$input.length){//no input, $container has to handle focus/blur
$container.attr('tabindex','0');onVisible=function onVisible(){module.focus();return settings.onVisible.apply($container,arguments);};onHidden=function onHidden(){module.blur();return settings.onHidden.apply($container,arguments);};}var onShow=function onShow(){//reset the focus date onShow
module.set.focusDate(module.get.date());module.set.mode(settings.startMode);return settings.onShow.apply($container,arguments);};var on=settings.on||($input.length?'focus':'click');var options=$.extend({},settings.popupOptions,{popup:$container,on:on,hoverable:on==='hover',onShow:onShow,onVisible:onVisible,onHide:settings.onHide,onHidden:onHidden});module.popup(options);},inline:function inline(){if($activator.length&&!settings.inline){return;}$container=$('<div/>').addClass(className.calendar).appendTo($module);if(!$input.length){$container.attr('tabindex','0');}},input:function input(){if(settings.touchReadonly&&$input.length&&isTouch){$input.prop('readonly',true);}},date:function date(){var date;if(settings.initialDate){date=parser.date(settings.initialDate,settings);}else if($module.data(metadata.date)!==undefined){date=parser.date($module.data(metadata.date),settings);}else if($input.length){date=parser.date($input.val(),settings);}module.set.date(date,settings.formatInput,false);}},create:{calendar:function calendar(){var i,r,c,p,row,cell,pageGrid;var mode=module.get.mode();var today=new Date();var date=module.get.date();var focusDate=module.get.focusDate();var display=focusDate||date||settings.initialDate||today;display=module.helper.dateInRange(display);if(!focusDate){focusDate=display;module.set.focusDate(focusDate,false,false);}var isYear=mode==='year';var isMonth=mode==='month';var isDay=mode==='day';var isHour=mode==='hour';var isMinute=mode==='minute';var isTimeOnly=settings.type==='time';var multiMonth=Math.max(settings.multiMonth,1);var monthOffset=!isDay?0:module.get.monthOffset();var minute=display.getMinutes();var hour=display.getHours();var day=display.getDate();var startMonth=display.getMonth()+monthOffset;var year=display.getFullYear();var columns=isDay?settings.showWeekNumbers?8:7:isHour?4:timeGap['column'];var rows=isDay||isHour?6:timeGap['row'];var pages=isDay?multiMonth:1;var container=$container;var tooltipPosition=container.hasClass("left")?"right center":"left center";container.empty();if(pages>1){pageGrid=$('<div/>').addClass(className.grid).appendTo(container);}for(p=0;p<pages;p++){if(pages>1){var pageColumn=$('<div/>').addClass(className.column).appendTo(pageGrid);container=pageColumn;}var month=startMonth+p;var firstMonthDayColumn=(new Date(year,month,1).getDay()-settings.firstDayOfWeek%7+7)%7;if(!settings.constantHeight&&isDay){var requiredCells=new Date(year,month+1,0).getDate()+firstMonthDayColumn;rows=Math.ceil(requiredCells/7);}var yearChange=isYear?10:isMonth?1:0;var monthChange=isDay?1:0;var dayChange=isHour||isMinute?1:0;var prevNextDay=isHour||isMinute?day:1;var prevDate=new Date(year-yearChange,month-monthChange,prevNextDay-dayChange,hour);var nextDate=new Date(year+yearChange,month+monthChange,prevNextDay+dayChange,hour);var prevLast=isYear?new Date(Math.ceil(year/10)*10-9,0,0):isMonth?new Date(year,0,0):isDay?new Date(year,month,0):new Date(year,month,day,-1);var nextFirst=isYear?new Date(Math.ceil(year/10)*10+1,0,1):isMonth?new Date(year+1,0,1):isDay?new Date(year,month+1,1):new Date(year,month,day+1);var tempMode=mode;if(isDay&&settings.showWeekNumbers){tempMode+=' andweek';}var table=$('<table/>').addClass(className.table).addClass(tempMode).appendTo(container);var textColumns=columns;//no header for time-only mode
if(!isTimeOnly){var thead=$('<thead/>').appendTo(table);row=$('<tr/>').appendTo(thead);cell=$('<th/>').attr('colspan',''+columns).appendTo(row);var headerDate=isYear||isMonth?new Date(year,0,1):isDay?new Date(year,month,1):new Date(year,month,day,hour,minute);var headerText=$('<span/>').addClass(className.link).appendTo(cell);headerText.text(formatter.header(headerDate,mode,settings));var newMode=isMonth?settings.disableYear?'day':'year':isDay?settings.disableMonth?'year':'month':'day';headerText.data(metadata.mode,newMode);if(p===0){var prev=$('<span/>').addClass(className.prev).appendTo(cell);prev.data(metadata.focusDate,prevDate);prev.toggleClass(className.disabledCell,!module.helper.isDateInRange(prevLast,mode));$('<i/>').addClass(className.prevIcon).appendTo(prev);}if(p===pages-1){var next=$('<span/>').addClass(className.next).appendTo(cell);next.data(metadata.focusDate,nextDate);next.toggleClass(className.disabledCell,!module.helper.isDateInRange(nextFirst,mode));$('<i/>').addClass(className.nextIcon).appendTo(next);}if(isDay){row=$('<tr/>').appendTo(thead);if(settings.showWeekNumbers){cell=$('<th/>').appendTo(row);cell.text(settings.text.weekNo);cell.addClass(className.weekCell);textColumns--;}for(i=0;i<textColumns;i++){cell=$('<th/>').appendTo(row);cell.text(formatter.dayColumnHeader((i+settings.firstDayOfWeek)%7,settings));}}}var tbody=$('<tbody/>').appendTo(table);i=isYear?Math.ceil(year/10)*10-9:isDay?1-firstMonthDayColumn:0;for(r=0;r<rows;r++){row=$('<tr/>').appendTo(tbody);if(isDay&&settings.showWeekNumbers){cell=$('<th/>').appendTo(row);cell.text(module.get.weekOfYear(year,month,i+1-settings.firstDayOfWeek));cell.addClass(className.weekCell);}for(c=0;c<textColumns;c++,i++){var cellDate=isYear?new Date(i,month,1,hour,minute):isMonth?new Date(year,i,1,hour,minute):isDay?new Date(year,month,i,hour,minute):isHour?new Date(year,month,day,i):new Date(year,month,day,hour,i*settings.minTimeGap);var cellText=isYear?i:isMonth?settings.text.monthsShort[i]:isDay?cellDate.getDate():formatter.time(cellDate,settings,true);cell=$('<td/>').addClass(className.cell).appendTo(row);cell.text(cellText);cell.data(metadata.date,cellDate);var adjacent=isDay&&cellDate.getMonth()!==(month+12)%12;var disabled=!settings.selectAdjacentDays&&adjacent||!module.helper.isDateInRange(cellDate,mode)||settings.isDisabled(cellDate,mode)||module.helper.isDisabled(cellDate,mode)||!module.helper.isEnabled(cellDate,mode);if(disabled){var disabledDate=module.helper.findDayAsObject(cellDate,mode,settings.disabledDates);if(disabledDate!==null&&disabledDate[metadata.message]){cell.attr("data-tooltip",disabledDate[metadata.message]);cell.attr("data-position",tooltipPosition);}}else{var eventDate=module.helper.findDayAsObject(cellDate,mode,settings.eventDates);if(eventDate!==null){cell.addClass(eventDate[metadata["class"]]||settings.eventClass);if(eventDate[metadata.message]){cell.attr("data-tooltip",eventDate[metadata.message]);cell.attr("data-position",tooltipPosition);}}}var active=module.helper.dateEqual(cellDate,date,mode);var isToday=module.helper.dateEqual(cellDate,today,mode);cell.toggleClass(className.adjacentCell,adjacent);cell.toggleClass(className.disabledCell,disabled);cell.toggleClass(className.activeCell,active&&!adjacent);if(!isHour&&!isMinute){cell.toggleClass(className.todayCell,!adjacent&&isToday);}// Allow for external modifications of each cell
var cellOptions={mode:mode,adjacent:adjacent,disabled:disabled,active:active,today:isToday};formatter.cell(cell,cellDate,cellOptions);if(module.helper.dateEqual(cellDate,focusDate,mode)){//ensure that the focus date is exactly equal to the cell date
//so that, if selected, the correct value is set
module.set.focusDate(cellDate,false,false);}}}if(settings.today){var todayRow=$('<tr/>').appendTo(tbody);var todayButton=$('<td/>').attr('colspan',''+columns).addClass(className.today).appendTo(todayRow);todayButton.text(formatter.today(settings));todayButton.data(metadata.date,today);}module.update.focus(false,table);}}},update:{focus:function focus(updateRange,container){container=container||$container;var mode=module.get.mode();var date=module.get.date();var focusDate=module.get.focusDate();var startDate=module.get.startDate();var endDate=module.get.endDate();var rangeDate=(updateRange?focusDate:null)||date||(!isTouch?focusDate:null);container.find('td').each(function(){var cell=$(this);var cellDate=cell.data(metadata.date);if(!cellDate){return;}var disabled=cell.hasClass(className.disabledCell);var active=cell.hasClass(className.activeCell);var adjacent=cell.hasClass(className.adjacentCell);var focused=module.helper.dateEqual(cellDate,focusDate,mode);var inRange=!rangeDate?false:!!startDate&&module.helper.isDateInRange(cellDate,mode,startDate,rangeDate)||!!endDate&&module.helper.isDateInRange(cellDate,mode,rangeDate,endDate);cell.toggleClass(className.focusCell,focused&&(!isTouch||isTouchDown)&&(!adjacent||settings.selectAdjacentDays&&adjacent)&&!disabled);if(module.helper.isTodayButton(cell)){return;}cell.toggleClass(className.rangeCell,inRange&&!active&&!disabled);});}},refresh:function refresh(){module.create.calendar();},bind:{events:function events(){module.debug('Binding events');$container.on('mousedown'+eventNamespace,module.event.mousedown);$container.on('touchstart'+eventNamespace,module.event.mousedown);$container.on('mouseup'+eventNamespace,module.event.mouseup);$container.on('touchend'+eventNamespace,module.event.mouseup);$container.on('mouseover'+eventNamespace,module.event.mouseover);if($input.length){$input.on('input'+eventNamespace,module.event.inputChange);$input.on('focus'+eventNamespace,module.event.inputFocus);$input.on('blur'+eventNamespace,module.event.inputBlur);$input.on('click'+eventNamespace,module.event.inputClick);$input.on('keydown'+eventNamespace,module.event.keydown);}else{$container.on('keydown'+eventNamespace,module.event.keydown);}}},unbind:{events:function events(){module.debug('Unbinding events');$container.off(eventNamespace);if($input.length){$input.off(eventNamespace);}}},event:{mouseover:function mouseover(event){var target=$(event.target);var date=target.data(metadata.date);var mousedown=event.buttons===1;if(date){module.set.focusDate(date,false,true,mousedown);}},mousedown:function mousedown(event){if($input.length){//prevent the mousedown on the calendar causing the input to lose focus
event.preventDefault();}isTouchDown=event.type.indexOf('touch')>=0;var target=$(event.target);var date=target.data(metadata.date);if(date){module.set.focusDate(date,false,true,true);}},mouseup:function mouseup(event){//ensure input has focus so that it receives keydown events for calendar navigation
module.focus();event.preventDefault();event.stopPropagation();isTouchDown=false;var target=$(event.target);if(target.hasClass("disabled")){return;}var parent=target.parent();if(parent.data(metadata.date)||parent.data(metadata.focusDate)||parent.data(metadata.mode)){//clicked on a child element, switch to parent (used when clicking directly on prev/next <i> icon element)
target=parent;}var date=target.data(metadata.date);var focusDate=target.data(metadata.focusDate);var mode=target.data(metadata.mode);if(date&&settings.onSelect.call(element,date,module.get.mode())!==false){var forceSet=target.hasClass(className.today);module.selectDate(date,forceSet);}else if(focusDate){module.set.focusDate(focusDate);}else if(mode){module.set.mode(mode);}},keydown:function keydown(event){var keyCode=event.which;if(keyCode===27||keyCode===9){//esc || tab
module.popup('hide');}if(module.popup('is visible')){if(keyCode===37||keyCode===38||keyCode===39||keyCode===40){//arrow keys
var mode=module.get.mode();var bigIncrement=mode==='day'?7:mode==='hour'?4:mode==='minute'?timeGap['column']:3;var increment=keyCode===37?-1:keyCode===38?-bigIncrement:keyCode==39?1:bigIncrement;increment*=mode==='minute'?settings.minTimeGap:1;var focusDate=module.get.focusDate()||module.get.date()||new Date();var year=focusDate.getFullYear()+(mode==='year'?increment:0);var month=focusDate.getMonth()+(mode==='month'?increment:0);var day=focusDate.getDate()+(mode==='day'?increment:0);var hour=focusDate.getHours()+(mode==='hour'?increment:0);var minute=focusDate.getMinutes()+(mode==='minute'?increment:0);var newFocusDate=new Date(year,month,day,hour,minute);if(settings.type==='time'){newFocusDate=module.helper.mergeDateTime(focusDate,newFocusDate);}if(module.helper.isDateInRange(newFocusDate,mode)){module.set.focusDate(newFocusDate);}}else if(keyCode===13){//enter
var mode=module.get.mode();var date=module.get.focusDate();if(date&&!settings.isDisabled(date,mode)&&!module.helper.isDisabled(date,mode)&&module.helper.isEnabled(date,mode)){module.selectDate(date);}//disable form submission:
event.preventDefault();event.stopPropagation();}}if(keyCode===38||keyCode===40){//arrow-up || arrow-down
event.preventDefault();//don't scroll
module.popup('show');}},inputChange:function inputChange(){var val=$input.val();var date=parser.date(val,settings);module.set.date(date,false);},inputFocus:function inputFocus(){$container.addClass(className.active);},inputBlur:function inputBlur(){$container.removeClass(className.active);if(settings.formatInput){var date=module.get.date();var text=formatter.datetime(date,settings);$input.val(text);}},inputClick:function inputClick(){module.popup('show');}},get:{weekOfYear:function weekOfYear(weekYear,weekMonth,weekDay){// adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
var ms1d=864e5,// milliseconds in a day
ms7d=7*ms1d;// milliseconds in a week
return function(){// return a closure so constants get calculated only once
var DC3=Date.UTC(weekYear,weekMonth,weekDay+3)/ms1d,// an Absolute Day Number
AWN=Math.floor(DC3/7),// an Absolute Week Number
Wyr=new Date(AWN*ms7d).getUTCFullYear();return AWN-Math.floor(Date.UTC(Wyr,0,7)/ms7d)+1;}();},date:function date(){return module.helper.sanitiseDate($module.data(metadata.date))||null;},inputDate:function inputDate(){return $input.val();},focusDate:function focusDate(){return $module.data(metadata.focusDate)||null;},startDate:function startDate(){var startModule=module.get.calendarModule(settings.startCalendar);return(startModule?startModule.get.date():$module.data(metadata.startDate))||null;},endDate:function endDate(){var endModule=module.get.calendarModule(settings.endCalendar);return(endModule?endModule.get.date():$module.data(metadata.endDate))||null;},minDate:function minDate(){return $module.data(metadata.minDate)||null;},maxDate:function maxDate(){return $module.data(metadata.maxDate)||null;},monthOffset:function monthOffset(){return $module.data(metadata.monthOffset)||0;},mode:function mode(){//only returns valid modes for the current settings
var mode=$module.data(metadata.mode)||settings.startMode;var validModes=module.get.validModes();if($.inArray(mode,validModes)>=0){return mode;}return settings.type==='time'?'hour':settings.type==='month'?'month':settings.type==='year'?'year':'day';},type:function type(){return $module.data(metadata.type)||settings.type;},validModes:function validModes(){var validModes=[];if(settings.type!=='time'){if(!settings.disableYear||settings.type==='year'){validModes.push('year');}if(!(settings.disableMonth||settings.type==='year')||settings.type==='month'){validModes.push('month');}if(settings.type.indexOf('date')>=0){validModes.push('day');}}if(settings.type.indexOf('time')>=0){validModes.push('hour');if(!settings.disableMinute){validModes.push('minute');}}return validModes;},isTouch:function isTouch(){try{document.createEvent('TouchEvent');return true;}catch(e){return false;}},calendarModule:function calendarModule(selector){if(!selector){return null;}if(!(selector instanceof $)){selector=$(selector).first();}//assume range related calendars are using the same namespace
return selector.data(moduleNamespace);}},set:{date:function date(_date2,updateInput,fireChange){updateInput=updateInput!==false;fireChange=fireChange!==false;_date2=module.helper.sanitiseDate(_date2);_date2=module.helper.dateInRange(_date2);var mode=module.get.mode();var text=formatter.datetime(_date2,settings);if(fireChange&&settings.onBeforeChange.call(element,_date2,text,mode)===false){return false;}module.set.focusDate(_date2);if(settings.isDisabled(_date2,mode)){return false;}var endDate=module.get.endDate();if(!!endDate&&!!_date2&&_date2>endDate){//selected date is greater than end date in range, so clear end date
module.set.endDate(undefined);}module.set.dataKeyValue(metadata.date,_date2);if(updateInput&&$input.length){$input.val(text);}if(fireChange){settings.onChange.call(element,_date2,text,mode);}},startDate:function startDate(date,refreshCalendar){date=module.helper.sanitiseDate(date);var startModule=module.get.calendarModule(settings.startCalendar);if(startModule){startModule.set.date(date);}module.set.dataKeyValue(metadata.startDate,date,refreshCalendar);},endDate:function endDate(date,refreshCalendar){date=module.helper.sanitiseDate(date);var endModule=module.get.calendarModule(settings.endCalendar);if(endModule){endModule.set.date(date);}module.set.dataKeyValue(metadata.endDate,date,refreshCalendar);},focusDate:function focusDate(date,refreshCalendar,updateFocus,updateRange){date=module.helper.sanitiseDate(date);date=module.helper.dateInRange(date);var isDay=module.get.mode()==='day';var oldFocusDate=module.get.focusDate();if(isDay&&date&&oldFocusDate){var yearDelta=date.getFullYear()-oldFocusDate.getFullYear();var monthDelta=yearDelta*12+date.getMonth()-oldFocusDate.getMonth();if(monthDelta){var monthOffset=module.get.monthOffset()-monthDelta;module.set.monthOffset(monthOffset,false);}}var changed=module.set.dataKeyValue(metadata.focusDate,date,refreshCalendar);updateFocus=updateFocus!==false&&changed&&refreshCalendar===false||focusDateUsedForRange!=updateRange;focusDateUsedForRange=updateRange;if(updateFocus){module.update.focus(updateRange);}},minDate:function minDate(date){date=module.helper.sanitiseDate(date);if(settings.maxDate!==null&&settings.maxDate<=date){module.verbose('Unable to set minDate variable bigger that maxDate variable',date,settings.maxDate);}else{module.setting('minDate',date);module.set.dataKeyValue(metadata.minDate,date);}},maxDate:function maxDate(date){date=module.helper.sanitiseDate(date);if(settings.minDate!==null&&settings.minDate>=date){module.verbose('Unable to set maxDate variable lower that minDate variable',date,settings.minDate);}else{module.setting('maxDate',date);module.set.dataKeyValue(metadata.maxDate,date);}},monthOffset:function monthOffset(_monthOffset,refreshCalendar){var multiMonth=Math.max(settings.multiMonth,1);_monthOffset=Math.max(1-multiMonth,Math.min(0,_monthOffset));module.set.dataKeyValue(metadata.monthOffset,_monthOffset,refreshCalendar);},mode:function mode(_mode,refreshCalendar){module.set.dataKeyValue(metadata.mode,_mode,refreshCalendar);},dataKeyValue:function dataKeyValue(key,value,refreshCalendar){var oldValue=$module.data(key);var equal=oldValue===value||oldValue<=value&&oldValue>=value;//equality test for dates and string objects
if(value){$module.data(key,value);}else{$module.removeData(key);}refreshCalendar=refreshCalendar!==false&&!equal;if(refreshCalendar){module.refresh();}return!equal;}},selectDate:function selectDate(date,forceSet){module.verbose('New date selection',date);var mode=module.get.mode();var complete=forceSet||mode==='minute'||settings.disableMinute&&mode==='hour'||settings.type==='date'&&mode==='day'||settings.type==='month'&&mode==='month'||settings.type==='year'&&mode==='year';if(complete){var canceled=module.set.date(date)===false;if(!canceled&&settings.closable){module.popup('hide');//if this is a range calendar, show the end date calendar popup and focus the input
var endModule=module.get.calendarModule(settings.endCalendar);if(endModule){endModule.popup('show');endModule.focus();}}}else{var newMode=mode==='year'?!settings.disableMonth?'month':'day':mode==='month'?'day':mode==='day'?'hour':'minute';module.set.mode(newMode);if(mode==='hour'||mode==='day'&&module.get.date()){//the user has chosen enough to consider a valid date/time has been chosen
module.set.date(date);}else{module.set.focusDate(date);}}},changeDate:function changeDate(date){module.set.date(date);},clear:function clear(){module.set.date(undefined);},popup:function popup(){return $activator.popup.apply($activator,arguments);},focus:function focus(){if($input.length){$input.focus();}else{$container.focus();}},blur:function blur(){if($input.length){$input.blur();}else{$container.blur();}},helper:{isDisabled:function isDisabled(date,mode){return mode==='day'&&(settings.disabledDaysOfWeek.indexOf(date.getDay())!==-1||settings.disabledDates.some(function(d){if(typeof d==='string'){d=module.helper.sanitiseDate(d);}if(d instanceof Date){return module.helper.dateEqual(date,d,mode);}if(d!==null&&_typeof(d)==='object'&&d[metadata.date]){return module.helper.dateEqual(date,module.helper.sanitiseDate(d[metadata.date]),mode);}}));},isEnabled:function isEnabled(date,mode){if(mode==='day'){return settings.enabledDates.length===0||settings.enabledDates.some(function(d){if(typeof d==='string'){d=module.helper.sanitiseDate(d);}if(d instanceof Date){return module.helper.dateEqual(date,d,mode);}if(d!==null&&_typeof(d)==='object'&&d[metadata.date]){return module.helper.dateEqual(date,module.helper.sanitiseDate(d[metadata.date]),mode);}});}else{return true;}},findDayAsObject:function findDayAsObject(date,mode,dates){if(mode==='day'){var i=0,il=dates.length;var d;for(;i<il;i++){d=dates[i];if(typeof d==='string'){d=module.helper.sanitiseDate(d);}if(d instanceof Date&&module.helper.dateEqual(date,d,mode)){var dateObject={};dateObject[metadata.date]=d;return dateObject;}else if(d!==null&&_typeof(d)==='object'&&d[metadata.date]&&module.helper.dateEqual(date,module.helper.sanitiseDate(d[metadata.date]),mode)){return d;}}}return null;},sanitiseDate:function sanitiseDate(date){if(!date){return undefined;}if(!(date instanceof Date)){date=parser.date(''+date,settings);}if(!date||date===null||isNaN(date.getTime())){return undefined;}return date;},dateDiff:function dateDiff(date1,date2,mode){mode=mode||'day';var isTimeOnly=settings.type==='time';var isYear=mode==='year';var isYearOrMonth=isYear||mode==='month';var isMinute=mode==='minute';var isHourOrMinute=isMinute||mode==='hour';//only care about a minute accuracy of settings.minTimeGap
date1=new Date(isTimeOnly?2000:date1.getFullYear(),isTimeOnly?0:isYear?0:date1.getMonth(),isTimeOnly?1:isYearOrMonth?1:date1.getDate(),!isHourOrMinute?0:date1.getHours(),!isMinute?0:settings.minTimeGap*Math.floor(date1.getMinutes()/settings.minTimeGap));date2=new Date(isTimeOnly?2000:date2.getFullYear(),isTimeOnly?0:isYear?0:date2.getMonth(),isTimeOnly?1:isYearOrMonth?1:date2.getDate(),!isHourOrMinute?0:date2.getHours(),!isMinute?0:settings.minTimeGap*Math.floor(date2.getMinutes()/settings.minTimeGap));return date2.getTime()-date1.getTime();},dateEqual:function dateEqual(date1,date2,mode){return!!date1&&!!date2&&module.helper.dateDiff(date1,date2,mode)===0;},isDateInRange:function isDateInRange(date,mode,minDate,maxDate){if(!minDate&&!maxDate){var startDate=module.get.startDate();minDate=startDate&&settings.minDate?new Date(Math.max(startDate,settings.minDate)):startDate||settings.minDate;maxDate=settings.maxDate;}minDate=minDate&&new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate(),minDate.getHours(),settings.minTimeGap*Math.ceil(minDate.getMinutes()/settings.minTimeGap));return!(!date||minDate&&module.helper.dateDiff(date,minDate,mode)>0||maxDate&&module.helper.dateDiff(maxDate,date,mode)>0);},dateInRange:function dateInRange(date,minDate,maxDate){if(!minDate&&!maxDate){var startDate=module.get.startDate();minDate=startDate&&settings.minDate?new Date(Math.max(startDate,settings.minDate)):startDate||settings.minDate;maxDate=settings.maxDate;}minDate=minDate&&new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate(),minDate.getHours(),settings.minTimeGap*Math.ceil(minDate.getMinutes()/settings.minTimeGap));var isTimeOnly=settings.type==='time';return!date?date:minDate&&module.helper.dateDiff(date,minDate,'minute')>0?isTimeOnly?module.helper.mergeDateTime(date,minDate):minDate:maxDate&&module.helper.dateDiff(maxDate,date,'minute')>0?isTimeOnly?module.helper.mergeDateTime(date,maxDate):maxDate:date;},mergeDateTime:function mergeDateTime(date,time){return!date||!time?time:new Date(date.getFullYear(),date.getMonth(),date.getDate(),time.getHours(),time.getMinutes());},isTodayButton:function isTodayButton(element){return element.text()===settings.text.today;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.calendar.settings={name:'Calendar',namespace:'calendar',silent:false,debug:false,verbose:false,performance:false,type:'datetime',// picker type, can be 'datetime', 'date', 'time', 'month', or 'year'
firstDayOfWeek:0,// day for first day column (0 = Sunday)
constantHeight:true,// add rows to shorter months to keep day calendar height consistent (6 rows)
today:false,// show a 'today/now' button at the bottom of the calendar
closable:true,// close the popup after selecting a date/time
monthFirst:true,// month before day when parsing/converting date from/to text
touchReadonly:true,// set input to readonly on touch devices
inline:false,// create the calendar inline instead of inside a popup
on:null,// when to show the popup (defaults to 'focus' for input, 'click' for others)
initialDate:null,// date to display initially when no date is selected (null = now)
startMode:false,// display mode to start in, can be 'year', 'month', 'day', 'hour', 'minute' (false = 'day')
minDate:null,// minimum date/time that can be selected, dates/times before are disabled
maxDate:null,// maximum date/time that can be selected, dates/times after are disabled
ampm:true,// show am/pm in time mode
disableYear:false,// disable year selection mode
disableMonth:false,// disable month selection mode
disableMinute:false,// disable minute selection mode
formatInput:true,// format the input text upon input blur and module creation
startCalendar:null,// jquery object or selector for another calendar that represents the start date of a date range
endCalendar:null,// jquery object or selector for another calendar that represents the end date of a date range
multiMonth:1,// show multiple months when in 'day' mode
minTimeGap:5,showWeekNumbers:null,// show Number of Week at the very first column of a dayView
disabledDates:[],// specific day(s) which won't be selectable and contain additional information.
disabledDaysOfWeek:[],// day(s) which won't be selectable(s) (0 = Sunday)
enabledDates:[],// specific day(s) which will be selectable, all other days will be disabled
eventDates:[],// specific day(s) which will be shown in a different color and using tooltips
centuryBreak:60,// starting short year until 99 where it will be assumed to belong to the last century
currentCentury:2000,// century to be added to 2-digit years (00 to {centuryBreak}-1)
selectAdjacentDays:false,// The calendar can show dates from adjacent month. These adjacent month dates can also be made selectable.
// popup options ('popup', 'on', 'hoverable', and show/hide callbacks are overridden)
popupOptions:{position:'bottom left',lastResort:'bottom left',prefer:'opposite',hideOnScroll:false},text:{days:['S','M','T','W','T','F','S'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],monthsShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],today:'Today',now:'Now',am:'AM',pm:'PM',weekNo:'Week'},formatter:{header:function header(date,mode,settings){return mode==='year'?settings.formatter.yearHeader(date,settings):mode==='month'?settings.formatter.monthHeader(date,settings):mode==='day'?settings.formatter.dayHeader(date,settings):mode==='hour'?settings.formatter.hourHeader(date,settings):settings.formatter.minuteHeader(date,settings);},yearHeader:function yearHeader(date,settings){var decadeYear=Math.ceil(date.getFullYear()/10)*10;return decadeYear-9+' - '+(decadeYear+2);},monthHeader:function monthHeader(date,settings){return date.getFullYear();},dayHeader:function dayHeader(date,settings){var month=settings.text.months[date.getMonth()];var year=date.getFullYear();return month+' '+year;},hourHeader:function hourHeader(date,settings){return settings.formatter.date(date,settings);},minuteHeader:function minuteHeader(date,settings){return settings.formatter.date(date,settings);},dayColumnHeader:function dayColumnHeader(day,settings){return settings.text.days[day];},datetime:function datetime(date,settings){if(!date){return'';}var day=settings.type==='time'?'':settings.formatter.date(date,settings);var time=settings.type.indexOf('time')<0?'':settings.formatter.time(date,settings,false);var separator=settings.type==='datetime'?' ':'';return day+separator+time;},date:function date(_date3,settings){if(!_date3){return'';}var day=_date3.getDate();var month=settings.text.months[_date3.getMonth()];var year=_date3.getFullYear();return settings.type==='year'?year:settings.type==='month'?month+' '+year:(settings.monthFirst?month+' '+day:day+' '+month)+', '+year;},time:function time(date,settings,forCalendar){if(!date){return'';}var hour=date.getHours();var minute=date.getMinutes();var ampm='';if(settings.ampm){ampm=' '+(hour<12?settings.text.am:settings.text.pm);hour=hour===0?12:hour>12?hour-12:hour;}return hour+':'+(minute<10?'0':'')+minute+ampm;},today:function today(settings){return settings.type==='date'?settings.text.today:settings.text.now;},cell:function cell(_cell,date,cellOptions){}},parser:{date:function date(text,settings){if(text instanceof Date){return text;}if(!text){return null;}text=(''+text).trim().toLowerCase();if(text.length===0){return null;}// Reverse date and month in some cases
text=settings.monthFirst?text:text.replace(/[\/\-\.]/g,'/').replace(/([0-9]+)\/([0-9]+)/,'$2/$1');var textDate=new Date(text);if(!isNaN(textDate.getDate())){return textDate;}var i,j,k;var minute=-1,hour=-1,day=-1,month=-1,year=-1;var isAm=undefined;var isTimeOnly=settings.type==='time';var isDateOnly=settings.type.indexOf('time')<0;var words=text.split(settings.regExp.dateWords),word;var numbers=text.split(settings.regExp.dateNumbers),number;var parts;var monthString;if(!isDateOnly){//am/pm
isAm=$.inArray(settings.text.am.toLowerCase(),words)>=0?true:$.inArray(settings.text.pm.toLowerCase(),words)>=0?false:undefined;//time with ':'
for(i=0;i<numbers.length;i++){number=numbers[i];if(number.indexOf(':')>=0){if(hour<0||minute<0){parts=number.split(':');for(k=0;k<Math.min(2,parts.length);k++){j=parseInt(parts[k]);if(isNaN(j)){j=0;}if(k===0){hour=j%24;}else{minute=j%60;}}}numbers.splice(i,1);}}}if(!isTimeOnly){//textual month
for(i=0;i<words.length;i++){word=words[i];if(word.length<=0){continue;}for(j=0;j<settings.text.months.length;j++){monthString=settings.text.months[j];monthString=monthString.substring(0,word.length).toLowerCase();if(monthString===word){month=j+1;break;}}if(month>=0){break;}}//year > settings.centuryBreak
for(i=0;i<numbers.length;i++){j=parseInt(numbers[i]);if(isNaN(j)){continue;}if(j>=settings.centuryBreak&&i===numbers.length-1){if(j<=99){j+=settings.currentCentury-100;}year=j;numbers.splice(i,1);break;}}//numeric month
if(month<0){for(i=0;i<numbers.length;i++){k=i>1||settings.monthFirst?i:i===1?0:1;j=parseInt(numbers[k]);if(isNaN(j)){continue;}if(1<=j&&j<=12){month=j;numbers.splice(k,1);break;}}}//day
for(i=0;i<numbers.length;i++){j=parseInt(numbers[i]);if(isNaN(j)){continue;}if(1<=j&&j<=31){day=j;numbers.splice(i,1);break;}}//year <= settings.centuryBreak
if(year<0){for(i=numbers.length-1;i>=0;i--){j=parseInt(numbers[i]);if(isNaN(j)){continue;}if(j<=99){j+=settings.currentCentury;}year=j;numbers.splice(i,1);break;}}}if(!isDateOnly){//hour
if(hour<0){for(i=0;i<numbers.length;i++){j=parseInt(numbers[i]);if(isNaN(j)){continue;}if(0<=j&&j<=23){hour=j;numbers.splice(i,1);break;}}}//minute
if(minute<0){for(i=0;i<numbers.length;i++){j=parseInt(numbers[i]);if(isNaN(j)){continue;}if(0<=j&&j<=59){minute=j;numbers.splice(i,1);break;}}}}if(minute<0&&hour<0&&day<0&&month<0&&year<0){return null;}if(minute<0){minute=0;}if(hour<0){hour=0;}if(day<0){day=1;}if(month<0){month=1;}if(year<0){year=new Date().getFullYear();}if(isAm!==undefined){if(isAm){if(hour===12){hour=0;}}else if(hour<12){hour+=12;}}var date=new Date(year,month-1,day,hour,minute);if(date.getMonth()!==month-1||date.getFullYear()!==year){//month or year don't match up, switch to last day of the month
date=new Date(year,month,0,hour,minute);}return isNaN(date.getTime())?null:date;}},// callback before date is changed, return false to cancel the change
onBeforeChange:function onBeforeChange(date,text,mode){return true;},// callback when date changes
onChange:function onChange(date,text,mode){},// callback before show animation, return false to prevent show
onShow:function onShow(){},// callback after show animation
onVisible:function onVisible(){},// callback before hide animation, return false to prevent hide
onHide:function onHide(){},// callback after hide animation
onHidden:function onHidden(){},// callback before item is selected, return false to prevent selection
onSelect:function onSelect(date,mode){},// is the given date disabled?
isDisabled:function isDisabled(date,mode){return false;},selector:{popup:'.ui.popup',input:'input',activator:'input',append:'.inline.field,.inline.fields'},regExp:{dateWords:/[^A-Za-z\u00C0-\u024F]+/g,dateNumbers:/[^\d:]+/g},error:{popup:'UI Popup, a required component is not included in this page',method:'The method you called is not defined.'},className:{calendar:'calendar',active:'active',popup:'ui popup',grid:'ui equal width grid',column:'column',table:'ui celled center aligned unstackable table',prev:'prev link',next:'next link',prevIcon:'chevron left icon',nextIcon:'chevron right icon',link:'link',cell:'link',disabledCell:'disabled',weekCell:'disabled',adjacentCell:'adjacent',activeCell:'active',rangeCell:'range',focusCell:'focus',todayCell:'today',today:'today link'},metadata:{date:'date',focusDate:'focusDate',startDate:'startDate',endDate:'endDate',minDate:'minDate',maxDate:'maxDate',mode:'mode',type:'type',monthOffset:'monthOffset',message:'message',"class":'class'},eventClass:'blue'};})(jQuery,window,document);/*!
 * # Fomantic-UI - Checkbox
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.checkbox=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.extend(true,{},$.fn.checkbox.settings,parameters),className=settings.className,namespace=settings.namespace,selector=settings.selector,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$label=$(this).children(selector.label),$input=$(this).children(selector.input),input=$input[0],_initialLoad=false,shortcutPressed=false,instance=$module.data(moduleNamespace),observer,element=this,module;module={initialize:function initialize(){module.verbose('Initializing checkbox',settings);module.create.label();module.bind.events();module.set.tabbable();module.hide.input();module.observeChanges();module.instantiate();module.setup();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying module');module.unbind.events();module.show.input();$module.removeData(moduleNamespace);},fix:{reference:function reference(){if($module.is(selector.input)){module.debug('Behavior called on <input> adjusting invoked element');$module=$module.closest(selector.checkbox);module.refresh();}}},setup:function setup(){module.set.initialLoad();if(module.is.indeterminate()){module.debug('Initial value is indeterminate');module.indeterminate();}else if(module.is.checked()){module.debug('Initial value is checked');module.check();}else{module.debug('Initial value is unchecked');module.uncheck();}module.remove.initialLoad();},refresh:function refresh(){$label=$module.children(selector.label);$input=$module.children(selector.input);input=$input[0];},hide:{input:function input(){module.verbose('Modifying <input> z-index to be unselectable');$input.addClass(className.hidden);}},show:{input:function input(){module.verbose('Modifying <input> z-index to be selectable');$input.removeClass(className.hidden);}},observeChanges:function observeChanges(){if('MutationObserver'in window){observer=new MutationObserver(function(mutations){module.debug('DOM tree modified, updating selector cache');module.refresh();});observer.observe(element,{childList:true,subtree:true});module.debug('Setting up mutation observer',observer);}},attachEvents:function attachEvents(selector,event){var $element=$(selector);event=$.isFunction(module[event])?module[event]:module.toggle;if($element.length>0){module.debug('Attaching checkbox events to element',selector,event);$element.on('click'+eventNamespace,event);}else{module.error(error.notFound);}},preventDefaultOnInputTarget:function preventDefaultOnInputTarget(){if(typeof event!=='undefined'&&event!==null&&$(event.target).is(selector.input)){module.verbose('Preventing default check action after manual check action');event.preventDefault();}},event:{change:function change(event){if(!module.should.ignoreCallbacks()){settings.onChange.call(input);}},click:function click(event){var $target=$(event.target);if($target.is(selector.input)){module.verbose('Using default check action on initialized checkbox');return;}if($target.is(selector.link)){module.debug('Clicking link inside checkbox, skipping toggle');return;}module.toggle();$input.focus();event.preventDefault();},keydown:function keydown(event){var key=event.which,keyCode={enter:13,space:32,escape:27,left:37,up:38,right:39,down:40};var r=module.get.radios(),rIndex=r.index($module),rLen=r.length,checkIndex=false;if(key==keyCode.left||key==keyCode.up){checkIndex=(rIndex===0?rLen:rIndex)-1;}else if(key==keyCode.right||key==keyCode.down){checkIndex=rIndex===rLen-1?0:rIndex+1;}if(!module.should.ignoreCallbacks()&&checkIndex!==false){if(settings.beforeUnchecked.apply(input)===false){module.verbose('Option not allowed to be unchecked, cancelling key navigation');return false;}if(settings.beforeChecked.apply($(r[checkIndex]).children(selector.input)[0])===false){module.verbose('Next option should not allow check, cancelling key navigation');return false;}}if(key==keyCode.escape){module.verbose('Escape key pressed blurring field');$input.blur();shortcutPressed=true;}else if(!event.ctrlKey&&(key==keyCode.space||key==keyCode.enter&&settings.enableEnterKey)){module.verbose('Enter/space key pressed, toggling checkbox');module.toggle();shortcutPressed=true;}else{shortcutPressed=false;}},keyup:function keyup(event){if(shortcutPressed){event.preventDefault();}}},check:function check(){if(!module.should.allowCheck()){return;}module.debug('Checking checkbox',$input);module.set.checked();if(!module.should.ignoreCallbacks()){settings.onChecked.call(input);module.trigger.change();}module.preventDefaultOnInputTarget();},uncheck:function uncheck(){if(!module.should.allowUncheck()){return;}module.debug('Unchecking checkbox');module.set.unchecked();if(!module.should.ignoreCallbacks()){settings.onUnchecked.call(input);module.trigger.change();}module.preventDefaultOnInputTarget();},indeterminate:function indeterminate(){if(module.should.allowIndeterminate()){module.debug('Checkbox is already indeterminate');return;}module.debug('Making checkbox indeterminate');module.set.indeterminate();if(!module.should.ignoreCallbacks()){settings.onIndeterminate.call(input);module.trigger.change();}},determinate:function determinate(){if(module.should.allowDeterminate()){module.debug('Checkbox is already determinate');return;}module.debug('Making checkbox determinate');module.set.determinate();if(!module.should.ignoreCallbacks()){settings.onDeterminate.call(input);module.trigger.change();}},enable:function enable(){if(module.is.enabled()){module.debug('Checkbox is already enabled');return;}module.debug('Enabling checkbox');module.set.enabled();if(!module.should.ignoreCallbacks()){settings.onEnable.call(input);// preserve legacy callbacks
settings.onEnabled.call(input);module.trigger.change();}},disable:function disable(){if(module.is.disabled()){module.debug('Checkbox is already disabled');return;}module.debug('Disabling checkbox');module.set.disabled();if(!module.should.ignoreCallbacks()){settings.onDisable.call(input);// preserve legacy callbacks
settings.onDisabled.call(input);module.trigger.change();}},get:{radios:function radios(){var name=module.get.name();return $('input[name="'+name+'"]').closest(selector.checkbox);},otherRadios:function otherRadios(){return module.get.radios().not($module);},name:function name(){return $input.attr('name');}},is:{initialLoad:function initialLoad(){return _initialLoad;},radio:function radio(){return $input.hasClass(className.radio)||$input.attr('type')=='radio';},indeterminate:function indeterminate(){return $input.prop('indeterminate')!==undefined&&$input.prop('indeterminate');},checked:function checked(){return $input.prop('checked')!==undefined&&$input.prop('checked');},disabled:function disabled(){return $input.prop('disabled')!==undefined&&$input.prop('disabled');},enabled:function enabled(){return!module.is.disabled();},determinate:function determinate(){return!module.is.indeterminate();},unchecked:function unchecked(){return!module.is.checked();}},should:{allowCheck:function allowCheck(){if(module.is.determinate()&&module.is.checked()&&!module.is.initialLoad()){module.debug('Should not allow check, checkbox is already checked');return false;}if(!module.should.ignoreCallbacks()&&settings.beforeChecked.apply(input)===false){module.debug('Should not allow check, beforeChecked cancelled');return false;}return true;},allowUncheck:function allowUncheck(){if(module.is.determinate()&&module.is.unchecked()&&!module.is.initialLoad()){module.debug('Should not allow uncheck, checkbox is already unchecked');return false;}if(!module.should.ignoreCallbacks()&&settings.beforeUnchecked.apply(input)===false){module.debug('Should not allow uncheck, beforeUnchecked cancelled');return false;}return true;},allowIndeterminate:function allowIndeterminate(){if(module.is.indeterminate()&&!module.is.initialLoad()){module.debug('Should not allow indeterminate, checkbox is already indeterminate');return false;}if(!module.should.ignoreCallbacks()&&settings.beforeIndeterminate.apply(input)===false){module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');return false;}return true;},allowDeterminate:function allowDeterminate(){if(module.is.determinate()&&!module.is.initialLoad()){module.debug('Should not allow determinate, checkbox is already determinate');return false;}if(!module.should.ignoreCallbacks()&&settings.beforeDeterminate.apply(input)===false){module.debug('Should not allow determinate, beforeDeterminate cancelled');return false;}return true;},ignoreCallbacks:function ignoreCallbacks(){return _initialLoad&&!settings.fireOnInit;}},can:{change:function change(){return!($module.hasClass(className.disabled)||$module.hasClass(className.readOnly)||$input.prop('disabled')||$input.prop('readonly'));},uncheck:function uncheck(){return typeof settings.uncheckable==='boolean'?settings.uncheckable:!module.is.radio();}},set:{initialLoad:function initialLoad(){_initialLoad=true;},checked:function checked(){module.verbose('Setting class to checked');$module.removeClass(className.indeterminate).addClass(className.checked);if(module.is.radio()){module.uncheckOthers();}if(!module.is.indeterminate()&&module.is.checked()){module.debug('Input is already checked, skipping input property change');return;}module.verbose('Setting state to checked',input);$input.prop('indeterminate',false).prop('checked',true);},unchecked:function unchecked(){module.verbose('Removing checked class');$module.removeClass(className.indeterminate).removeClass(className.checked);if(!module.is.indeterminate()&&module.is.unchecked()){module.debug('Input is already unchecked');return;}module.debug('Setting state to unchecked');$input.prop('indeterminate',false).prop('checked',false);},indeterminate:function indeterminate(){module.verbose('Setting class to indeterminate');$module.addClass(className.indeterminate);if(module.is.indeterminate()){module.debug('Input is already indeterminate, skipping input property change');return;}module.debug('Setting state to indeterminate');$input.prop('indeterminate',true);},determinate:function determinate(){module.verbose('Removing indeterminate class');$module.removeClass(className.indeterminate);if(module.is.determinate()){module.debug('Input is already determinate, skipping input property change');return;}module.debug('Setting state to determinate');$input.prop('indeterminate',false);},disabled:function disabled(){module.verbose('Setting class to disabled');$module.addClass(className.disabled);if(module.is.disabled()){module.debug('Input is already disabled, skipping input property change');return;}module.debug('Setting state to disabled');$input.prop('disabled','disabled');},enabled:function enabled(){module.verbose('Removing disabled class');$module.removeClass(className.disabled);if(module.is.enabled()){module.debug('Input is already enabled, skipping input property change');return;}module.debug('Setting state to enabled');$input.prop('disabled',false);},tabbable:function tabbable(){module.verbose('Adding tabindex to checkbox');if($input.attr('tabindex')===undefined){$input.attr('tabindex',0);}}},remove:{initialLoad:function initialLoad(){_initialLoad=false;}},trigger:{change:function change(){var events=document.createEvent('HTMLEvents'),inputElement=$input[0];if(inputElement){module.verbose('Triggering native change event');events.initEvent('change',true,false);inputElement.dispatchEvent(events);}}},create:{label:function label(){if($input.prevAll(selector.label).length>0){$input.prev(selector.label).detach().insertAfter($input);module.debug('Moving existing label',$label);}else if(!module.has.label()){$label=$('<label>').insertAfter($input);module.debug('Creating label',$label);}}},has:{label:function label(){return $label.length>0;}},bind:{events:function events(){module.verbose('Attaching checkbox events');$module.on('click'+eventNamespace,module.event.click).on('change'+eventNamespace,module.event.change).on('keydown'+eventNamespace,selector.input,module.event.keydown).on('keyup'+eventNamespace,selector.input,module.event.keyup);}},unbind:{events:function events(){module.debug('Removing events');$module.off(eventNamespace);}},uncheckOthers:function uncheckOthers(){var $radios=module.get.otherRadios();module.debug('Unchecking other radios',$radios);$radios.removeClass(className.checked);},toggle:function toggle(){if(!module.can.change()){if(!module.is.radio()){module.debug('Checkbox is read-only or disabled, ignoring toggle');}return;}if(module.is.indeterminate()||module.is.unchecked()){module.debug('Currently unchecked');module.check();}else if(module.is.checked()&&module.can.uncheck()){module.debug('Currently checked');module.uncheck();}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.checkbox.settings={name:'Checkbox',namespace:'checkbox',silent:false,debug:false,verbose:true,performance:true,// delegated event context
uncheckable:'auto',fireOnInit:false,enableEnterKey:true,onChange:function onChange(){},beforeChecked:function beforeChecked(){},beforeUnchecked:function beforeUnchecked(){},beforeDeterminate:function beforeDeterminate(){},beforeIndeterminate:function beforeIndeterminate(){},onChecked:function onChecked(){},onUnchecked:function onUnchecked(){},onDeterminate:function onDeterminate(){},onIndeterminate:function onIndeterminate(){},onEnable:function onEnable(){},onDisable:function onDisable(){},// preserve misspelled callbacks (will be removed in 3.0)
onEnabled:function onEnabled(){},onDisabled:function onDisabled(){},className:{checked:'checked',indeterminate:'indeterminate',disabled:'disabled',hidden:'hidden',radio:'radio',readOnly:'read-only'},error:{method:'The method you called is not defined'},selector:{checkbox:'.ui.checkbox',label:'label, .box',input:'input[type="checkbox"], input[type="radio"]',link:'a[href]'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Dimmer
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.dimmer=function(parameters){var $allModules=$(this),time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.dimmer.settings,parameters):$.extend({},$.fn.dimmer.settings),selector=settings.selector,namespace=settings.namespace,className=settings.className,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,moduleSelector=$allModules.selector||'',clickEvent='ontouchstart'in document.documentElement?'touchstart':'click',$module=$(this),$dimmer,$dimmable,element=this,instance=$module.data(moduleNamespace),module;module={preinitialize:function preinitialize(){if(module.is.dimmer()){$dimmable=$module.parent();$dimmer=$module;}else{$dimmable=$module;if(module.has.dimmer()){if(settings.dimmerName){$dimmer=$dimmable.find(selector.dimmer).filter('.'+settings.dimmerName);}else{$dimmer=$dimmable.find(selector.dimmer);}}else{$dimmer=module.create();}}},initialize:function initialize(){module.debug('Initializing dimmer',settings);module.bind.events();module.set.dimmable();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){module.verbose('Destroying previous module',$dimmer);module.unbind.events();module.remove.variation();$dimmable.off(eventNamespace);},bind:{events:function events(){if(settings.on=='hover'){$dimmable.on('mouseenter'+eventNamespace,module.show).on('mouseleave'+eventNamespace,module.hide);}else if(settings.on=='click'){$dimmable.on(clickEvent+eventNamespace,module.toggle);}if(module.is.page()){module.debug('Setting as a page dimmer',$dimmable);module.set.pageDimmer();}if(module.is.closable()){module.verbose('Adding dimmer close event',$dimmer);$dimmable.on(clickEvent+eventNamespace,selector.dimmer,module.event.click);}}},unbind:{events:function events(){$module.removeData(moduleNamespace);$dimmable.off(eventNamespace);}},event:{click:function click(event){module.verbose('Determining if event occured on dimmer',event);if($dimmer.find(event.target).length===0||$(event.target).is(selector.content)){module.hide();event.stopImmediatePropagation();}}},addContent:function addContent(element){var $content=$(element);module.debug('Add content to dimmer',$content);if($content.parent()[0]!==$dimmer[0]){$content.detach().appendTo($dimmer);}},create:function create(){var $element=$(settings.template.dimmer(settings));if(settings.dimmerName){module.debug('Creating named dimmer',settings.dimmerName);$element.addClass(settings.dimmerName);}$element.appendTo($dimmable);return $element;},show:function show(callback){callback=$.isFunction(callback)?callback:function(){};module.debug('Showing dimmer',$dimmer,settings);module.set.variation();if((!module.is.dimmed()||module.is.animating())&&module.is.enabled()){module.animate.show(callback);settings.onShow.call(element);settings.onChange.call(element);}else{module.debug('Dimmer is already shown or disabled');}},hide:function hide(callback){callback=$.isFunction(callback)?callback:function(){};if(module.is.dimmed()||module.is.animating()){module.debug('Hiding dimmer',$dimmer);module.animate.hide(callback);settings.onHide.call(element);settings.onChange.call(element);}else{module.debug('Dimmer is not visible');}},toggle:function toggle(){module.verbose('Toggling dimmer visibility',$dimmer);if(!module.is.dimmed()){module.show();}else{if(module.is.closable()){module.hide();}}},animate:{show:function show(callback){callback=$.isFunction(callback)?callback:function(){};if(settings.useCSS&&$.fn.transition!==undefined&&$dimmer.transition('is supported')){if(settings.useFlex){module.debug('Using flex dimmer');module.remove.legacy();}else{module.debug('Using legacy non-flex dimmer');module.set.legacy();}if(settings.opacity!=='auto'){module.set.opacity();}$dimmer.transition({displayType:settings.useFlex?'flex':'block',animation:settings.transition+' in',queue:false,duration:module.get.duration(),useFailSafe:true,onStart:function onStart(){module.set.dimmed();},onComplete:function onComplete(){module.set.active();callback();}});}else{module.verbose('Showing dimmer animation with javascript');module.set.dimmed();if(settings.opacity=='auto'){settings.opacity=0.8;}$dimmer.stop().css({opacity:0,width:'100%',height:'100%'}).fadeTo(module.get.duration(),settings.opacity,function(){$dimmer.removeAttr('style');module.set.active();callback();});}},hide:function hide(callback){callback=$.isFunction(callback)?callback:function(){};if(settings.useCSS&&$.fn.transition!==undefined&&$dimmer.transition('is supported')){module.verbose('Hiding dimmer with css');$dimmer.transition({displayType:settings.useFlex?'flex':'block',animation:settings.transition+' out',queue:false,duration:module.get.duration(),useFailSafe:true,onComplete:function onComplete(){module.remove.dimmed();module.remove.variation();module.remove.active();callback();}});}else{module.verbose('Hiding dimmer with javascript');$dimmer.stop().fadeOut(module.get.duration(),function(){module.remove.dimmed();module.remove.active();$dimmer.removeAttr('style');callback();});}}},get:{dimmer:function dimmer(){return $dimmer;},duration:function duration(){if(_typeof(settings.duration)=='object'){if(module.is.active()){return settings.duration.hide;}else{return settings.duration.show;}}return settings.duration;}},has:{dimmer:function dimmer(){if(settings.dimmerName){return $module.find(selector.dimmer).filter('.'+settings.dimmerName).length>0;}else{return $module.find(selector.dimmer).length>0;}}},is:{active:function active(){return $dimmer.hasClass(className.active);},animating:function animating(){return $dimmer.is(':animated')||$dimmer.hasClass(className.animating);},closable:function closable(){if(settings.closable=='auto'){if(settings.on=='hover'){return false;}return true;}return settings.closable;},dimmer:function dimmer(){return $module.hasClass(className.dimmer);},dimmable:function dimmable(){return $module.hasClass(className.dimmable);},dimmed:function dimmed(){return $dimmable.hasClass(className.dimmed);},disabled:function disabled(){return $dimmable.hasClass(className.disabled);},enabled:function enabled(){return!module.is.disabled();},page:function page(){return $dimmable.is('body');},pageDimmer:function pageDimmer(){return $dimmer.hasClass(className.pageDimmer);}},can:{show:function show(){return!$dimmer.hasClass(className.disabled);}},set:{opacity:function opacity(_opacity){var color=$dimmer.css('background-color'),colorArray=color.split(','),isRGB=colorArray&&colorArray.length==3,isRGBA=colorArray&&colorArray.length==4;_opacity=settings.opacity===0?0:settings.opacity||_opacity;if(isRGB||isRGBA){colorArray[3]=_opacity+')';color=colorArray.join(',');}else{color='rgba(0, 0, 0, '+_opacity+')';}module.debug('Setting opacity to',_opacity);$dimmer.css('background-color',color);},legacy:function legacy(){$dimmer.addClass(className.legacy);},active:function active(){$dimmer.addClass(className.active);},dimmable:function dimmable(){$dimmable.addClass(className.dimmable);},dimmed:function dimmed(){$dimmable.addClass(className.dimmed);},pageDimmer:function pageDimmer(){$dimmer.addClass(className.pageDimmer);},disabled:function disabled(){$dimmer.addClass(className.disabled);},variation:function variation(_variation){_variation=_variation||settings.variation;if(_variation){$dimmer.addClass(_variation);}}},remove:{active:function active(){$dimmer.removeClass(className.active);},legacy:function legacy(){$dimmer.removeClass(className.legacy);},dimmed:function dimmed(){$dimmable.removeClass(className.dimmed);},disabled:function disabled(){$dimmer.removeClass(className.disabled);},variation:function variation(_variation2){_variation2=_variation2||settings.variation;if(_variation2){$dimmer.removeClass(_variation2);}}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};module.preinitialize();if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.dimmer.settings={name:'Dimmer',namespace:'dimmer',silent:false,debug:false,verbose:false,performance:true,// whether should use flex layout
useFlex:true,// name to distinguish between multiple dimmers in context
dimmerName:false,// whether to add a variation type
variation:false,// whether to bind close events
closable:'auto',// whether to use css animations
useCSS:true,// css animation to use
transition:'fade',// event to bind to
on:false,// overriding opacity value
opacity:'auto',// transition durations
duration:{show:500,hide:500},// whether the dynamically created dimmer should have a loader
displayLoader:false,loaderText:false,loaderVariation:'',onChange:function onChange(){},onShow:function onShow(){},onHide:function onHide(){},error:{method:'The method you called is not defined.'},className:{active:'active',animating:'animating',dimmable:'dimmable',dimmed:'dimmed',dimmer:'dimmer',disabled:'disabled',hide:'hide',legacy:'legacy',pageDimmer:'page',show:'show',loader:'ui loader'},selector:{dimmer:'> .ui.dimmer',content:'.ui.dimmer > .content, .ui.dimmer > .content > .center'},template:{dimmer:function dimmer(settings){var d=$('<div/>').addClass('ui dimmer'),l;if(settings.displayLoader){l=$('<div/>').addClass(settings.className.loader).addClass(settings.loaderVariation);if(!!settings.loaderText){l.text(settings.loaderText);l.addClass('text');}d.append(l);}return d;}}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Dropdown
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.dropdown=function(parameters){var $allModules=$(this),$document=$(document),moduleSelector=$allModules.selector||'',hasTouch=('ontouchstart'in document.documentElement),clickEvent=hasTouch?'touchstart':'click',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(elementIndex){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.dropdown.settings,parameters):$.extend({},$.fn.dropdown.settings),className=settings.className,message=settings.message,fields=settings.fields,keys=settings.keys,metadata=settings.metadata,namespace=settings.namespace,regExp=settings.regExp,selector=settings.selector,error=settings.error,templates=settings.templates,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$context=$(settings.context),$text=$module.find(selector.text),$search=$module.find(selector.search),$sizer=$module.find(selector.sizer),$input=$module.find(selector.input),$icon=$module.find(selector.icon),$clear=$module.find(selector.clearIcon),$combo=$module.prev().find(selector.text).length>0?$module.prev().find(selector.text):$module.prev(),$menu=$module.children(selector.menu),$item=$menu.find(selector.item),$divider=settings.hideDividers?$item.parent().children(selector.divider):$(),activated=false,itemActivated=false,internalChange=false,iconClicked=false,element=this,instance=$module.data(moduleNamespace),selectActionActive,_initialLoad2,pageLostFocus,willRefocus,elementNamespace,_id,_selectObserver,_menuObserver,module;module={initialize:function initialize(){module.debug('Initializing dropdown',settings);if(module.is.alreadySetup()){module.setup.reference();}else{if(settings.ignoreDiacritics&&!String.prototype.normalize){settings.ignoreDiacritics=false;module.error(error.noNormalize,element);}module.setup.layout();if(settings.values){module.change.values(settings.values);}module.refreshData();module.save.defaults();module.restore.selected();module.create.id();module.bind.events();module.observeChanges();module.instantiate();}},instantiate:function instantiate(){module.verbose('Storing instance of dropdown',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous dropdown',$module);module.remove.tabbable();module.remove.active();$menu.transition('stop all');$menu.removeClass(className.visible).addClass(className.hidden);$module.off(eventNamespace).removeData(moduleNamespace);$menu.off(eventNamespace);$document.off(elementNamespace);module.disconnect.menuObserver();module.disconnect.selectObserver();},observeChanges:function observeChanges(){if('MutationObserver'in window){_selectObserver=new MutationObserver(module.event.select.mutation);_menuObserver=new MutationObserver(module.event.menu.mutation);module.debug('Setting up mutation observer',_selectObserver,_menuObserver);module.observe.select();module.observe.menu();}},disconnect:{menuObserver:function menuObserver(){if(_menuObserver){_menuObserver.disconnect();}},selectObserver:function selectObserver(){if(_selectObserver){_selectObserver.disconnect();}}},observe:{select:function select(){if(module.has.input()&&_selectObserver){_selectObserver.observe($module[0],{childList:true,subtree:true});}},menu:function menu(){if(module.has.menu()&&_menuObserver){_menuObserver.observe($menu[0],{childList:true,subtree:true});}}},create:{id:function id(){_id=(Math.random().toString(16)+'000000000').substr(2,8);elementNamespace='.'+_id;module.verbose('Creating unique id for element',_id);},userChoice:function userChoice(values){var $userChoices,$userChoice,isUserValue,html;values=values||module.get.userValues();if(!values){return false;}values=Array.isArray(values)?values:[values];$.each(values,function(index,value){if(module.get.item(value)===false){html=settings.templates.addition(module.add.variables(message.addResult,value));$userChoice=$('<div />').html(html).attr('data-'+metadata.value,value).attr('data-'+metadata.text,value).addClass(className.addition).addClass(className.item);if(settings.hideAdditions){$userChoice.addClass(className.hidden);}$userChoices=$userChoices===undefined?$userChoice:$userChoices.add($userChoice);module.verbose('Creating user choices for value',value,$userChoice);}});return $userChoices;},userLabels:function userLabels(value){var userValues=module.get.userValues();if(userValues){module.debug('Adding user labels',userValues);$.each(userValues,function(index,value){module.verbose('Adding custom user value');module.add.label(value,value);});}},menu:function menu(){$menu=$('<div />').addClass(className.menu).appendTo($module);},sizer:function sizer(){$sizer=$('<span />').addClass(className.sizer).insertAfter($search);}},search:function search(query){query=query!==undefined?query:module.get.query();module.verbose('Searching for query',query);if(module.has.minCharacters(query)){module.filter(query);}else{module.hide(null,true);}},select:{firstUnfiltered:function firstUnfiltered(){module.verbose('Selecting first non-filtered element');module.remove.selectedItem();$item.not(selector.unselectable).not(selector.addition+selector.hidden).eq(0).addClass(className.selected);},nextAvailable:function nextAvailable($selected){$selected=$selected.eq(0);var $nextAvailable=$selected.nextAll(selector.item).not(selector.unselectable).eq(0),$prevAvailable=$selected.prevAll(selector.item).not(selector.unselectable).eq(0),hasNext=$nextAvailable.length>0;if(hasNext){module.verbose('Moving selection to',$nextAvailable);$nextAvailable.addClass(className.selected);}else{module.verbose('Moving selection to',$prevAvailable);$prevAvailable.addClass(className.selected);}}},setup:{api:function api(){var apiSettings={debug:settings.debug,urlData:{value:module.get.value(),query:module.get.query()},on:false};module.verbose('First request, initializing API');$module.api(apiSettings);},layout:function layout(){if($module.is('select')){module.setup.select();module.setup.returnedObject();}if(!module.has.menu()){module.create.menu();}if(module.is.selection()&&module.is.clearable()&&!module.has.clearItem()){module.verbose('Adding clear icon');$clear=$('<i />').addClass('remove icon').insertBefore($text);}if(module.is.search()&&!module.has.search()){module.verbose('Adding search input');$search=$('<input />').addClass(className.search).prop('autocomplete','off').insertBefore($text);}if(module.is.multiple()&&module.is.searchSelection()&&!module.has.sizer()){module.create.sizer();}if(settings.allowTab){module.set.tabbable();}},select:function select(){var selectValues=module.get.selectValues();module.debug('Dropdown initialized on a select',selectValues);if($module.is('select')){$input=$module;}// see if select is placed correctly already
if($input.parent(selector.dropdown).length>0){module.debug('UI dropdown already exists. Creating dropdown menu only');$module=$input.closest(selector.dropdown);if(!module.has.menu()){module.create.menu();}$menu=$module.children(selector.menu);module.setup.menu(selectValues);}else{module.debug('Creating entire dropdown from select');$module=$('<div />').attr('class',$input.attr('class')).addClass(className.selection).addClass(className.dropdown).html(templates.dropdown(selectValues,fields,settings.preserveHTML,settings.className)).insertBefore($input);if($input.hasClass(className.multiple)&&$input.prop('multiple')===false){module.error(error.missingMultiple);$input.prop('multiple',true);}if($input.is('[multiple]')){module.set.multiple();}if($input.prop('disabled')){module.debug('Disabling dropdown');$module.addClass(className.disabled);}$input.removeAttr('required').removeAttr('class').detach().prependTo($module);}module.refresh();},menu:function menu(values){$menu.html(templates.menu(values,fields,settings.preserveHTML,settings.className));$item=$menu.find(selector.item);$divider=settings.hideDividers?$item.parent().children(selector.divider):$();},reference:function reference(){module.debug('Dropdown behavior was called on select, replacing with closest dropdown');// replace module reference
$module=$module.parent(selector.dropdown);instance=$module.data(moduleNamespace);element=$module.get(0);module.refresh();module.setup.returnedObject();},returnedObject:function returnedObject(){var $firstModules=$allModules.slice(0,elementIndex),$lastModules=$allModules.slice(elementIndex+1);// adjust all modules to use correct reference
$allModules=$firstModules.add($module).add($lastModules);}},refresh:function refresh(){module.refreshSelectors();module.refreshData();},refreshItems:function refreshItems(){$item=$menu.find(selector.item);$divider=settings.hideDividers?$item.parent().children(selector.divider):$();},refreshSelectors:function refreshSelectors(){module.verbose('Refreshing selector cache');$text=$module.find(selector.text);$search=$module.find(selector.search);$input=$module.find(selector.input);$icon=$module.find(selector.icon);$combo=$module.prev().find(selector.text).length>0?$module.prev().find(selector.text):$module.prev();$menu=$module.children(selector.menu);$item=$menu.find(selector.item);$divider=settings.hideDividers?$item.parent().children(selector.divider):$();},refreshData:function refreshData(){module.verbose('Refreshing cached metadata');$item.removeData(metadata.text).removeData(metadata.value);},clearData:function clearData(){module.verbose('Clearing metadata');$item.removeData(metadata.text).removeData(metadata.value);$module.removeData(metadata.defaultText).removeData(metadata.defaultValue).removeData(metadata.placeholderText);},toggle:function toggle(){module.verbose('Toggling menu visibility');if(!module.is.active()){module.show();}else{module.hide();}},show:function show(callback,preventFocus){callback=$.isFunction(callback)?callback:function(){};if(!module.can.show()&&module.is.remote()){module.debug('No API results retrieved, searching before show');module.queryRemote(module.get.query(),module.show);}if(module.can.show()&&!module.is.active()){module.debug('Showing dropdown');if(module.has.message()&&!(module.has.maxSelections()||module.has.allResultsFiltered())){module.remove.message();}if(module.is.allFiltered()){return true;}if(settings.onShow.call(element)!==false){module.animate.show(function(){if(module.can.click()){module.bind.intent();}if(module.has.search()&&!preventFocus){module.focusSearch();}module.set.visible();callback.call(element);});}}},hide:function hide(callback,preventBlur){callback=$.isFunction(callback)?callback:function(){};if(module.is.active()&&!module.is.animatingOutward()){module.debug('Hiding dropdown');if(settings.onHide.call(element)!==false){module.animate.hide(function(){module.remove.visible();// hidding search focus
if(module.is.focusedOnSearch()&&preventBlur!==true){$search.blur();}callback.call(element);});}}else if(module.can.click()){module.unbind.intent();}},hideOthers:function hideOthers(){module.verbose('Finding other dropdowns to hide');$allModules.not($module).has(selector.menu+'.'+className.visible).dropdown('hide');},hideMenu:function hideMenu(){module.verbose('Hiding menu  instantaneously');module.remove.active();module.remove.visible();$menu.transition('hide');},hideSubMenus:function hideSubMenus(){var $subMenus=$menu.children(selector.item).find(selector.menu);module.verbose('Hiding sub menus',$subMenus);$subMenus.transition('hide');},bind:{events:function events(){module.bind.keyboardEvents();module.bind.inputEvents();module.bind.mouseEvents();},keyboardEvents:function keyboardEvents(){module.verbose('Binding keyboard events');$module.on('keydown'+eventNamespace,module.event.keydown);if(module.has.search()){$module.on(module.get.inputEvent()+eventNamespace,selector.search,module.event.input);}if(module.is.multiple()){$document.on('keydown'+elementNamespace,module.event.document.keydown);}},inputEvents:function inputEvents(){module.verbose('Binding input change events');$module.on('change'+eventNamespace,selector.input,module.event.change);},mouseEvents:function mouseEvents(){module.verbose('Binding mouse events');if(module.is.multiple()){$module.on(clickEvent+eventNamespace,selector.label,module.event.label.click).on(clickEvent+eventNamespace,selector.remove,module.event.remove.click);}if(module.is.searchSelection()){$module.on('mousedown'+eventNamespace,module.event.mousedown).on('mouseup'+eventNamespace,module.event.mouseup).on('mousedown'+eventNamespace,selector.menu,module.event.menu.mousedown).on('mouseup'+eventNamespace,selector.menu,module.event.menu.mouseup).on(clickEvent+eventNamespace,selector.icon,module.event.icon.click).on(clickEvent+eventNamespace,selector.clearIcon,module.event.clearIcon.click).on('focus'+eventNamespace,selector.search,module.event.search.focus).on(clickEvent+eventNamespace,selector.search,module.event.search.focus).on('blur'+eventNamespace,selector.search,module.event.search.blur).on(clickEvent+eventNamespace,selector.text,module.event.text.focus);if(module.is.multiple()){$module.on(clickEvent+eventNamespace,module.event.click);}}else{if(settings.on=='click'){$module.on(clickEvent+eventNamespace,selector.icon,module.event.icon.click).on(clickEvent+eventNamespace,module.event.test.toggle);}else if(settings.on=='hover'){$module.on('mouseenter'+eventNamespace,module.delay.show).on('mouseleave'+eventNamespace,module.delay.hide);}else{$module.on(settings.on+eventNamespace,module.toggle);}$module.on('mousedown'+eventNamespace,module.event.mousedown).on('mouseup'+eventNamespace,module.event.mouseup).on('focus'+eventNamespace,module.event.focus).on(clickEvent+eventNamespace,selector.clearIcon,module.event.clearIcon.click);if(module.has.menuSearch()){$module.on('blur'+eventNamespace,selector.search,module.event.search.blur);}else{$module.on('blur'+eventNamespace,module.event.blur);}}$menu.on((hasTouch?'touchstart':'mouseenter')+eventNamespace,selector.item,module.event.item.mouseenter).on('mouseleave'+eventNamespace,selector.item,module.event.item.mouseleave).on('click'+eventNamespace,selector.item,module.event.item.click);},intent:function intent(){module.verbose('Binding hide intent event to document');if(hasTouch){$document.on('touchstart'+elementNamespace,module.event.test.touch).on('touchmove'+elementNamespace,module.event.test.touch);}$document.on(clickEvent+elementNamespace,module.event.test.hide);}},unbind:{intent:function intent(){module.verbose('Removing hide intent event from document');if(hasTouch){$document.off('touchstart'+elementNamespace).off('touchmove'+elementNamespace);}$document.off(clickEvent+elementNamespace);}},filter:function filter(query){var searchTerm=query!==undefined?query:module.get.query(),afterFiltered=function afterFiltered(){if(module.is.multiple()){module.filterActive();}if(query||!query&&module.get.activeItem().length==0){module.select.firstUnfiltered();}if(module.has.allResultsFiltered()){if(settings.onNoResults.call(element,searchTerm)){if(settings.allowAdditions){if(settings.hideAdditions){module.verbose('User addition with no menu, setting empty style');module.set.empty();module.hideMenu();}}else{module.verbose('All items filtered, showing message',searchTerm);module.add.message(message.noResults);}}else{module.verbose('All items filtered, hiding dropdown',searchTerm);module.hideMenu();}}else{module.remove.empty();module.remove.message();}if(settings.allowAdditions){module.add.userSuggestion(module.escape.htmlEntities(query));}if(module.is.searchSelection()&&module.can.show()&&module.is.focusedOnSearch()){module.show();}};if(settings.useLabels&&module.has.maxSelections()){return;}if(settings.apiSettings){if(module.can.useAPI()){module.queryRemote(searchTerm,function(){if(settings.filterRemoteData){module.filterItems(searchTerm);}var preSelected=$input.val();if(!Array.isArray(preSelected)){preSelected=preSelected&&preSelected!==""?preSelected.split(settings.delimiter):[];}$.each(preSelected,function(index,value){$item.filter('[data-value="'+value+'"]').addClass(className.filtered);});afterFiltered();});}else{module.error(error.noAPI);}}else{module.filterItems(searchTerm);afterFiltered();}},queryRemote:function queryRemote(query,callback){var apiSettings={errorDuration:false,cache:'local',throttle:settings.throttle,urlData:{query:query},onError:function onError(){module.add.message(message.serverError);callback();},onFailure:function onFailure(){module.add.message(message.serverError);callback();},onSuccess:function onSuccess(response){var values=response[fields.remoteValues];if(!Array.isArray(values)){values=[];}module.remove.message();module.setup.menu({values:values});if(values.length===0&&!settings.allowAdditions){module.add.message(message.noResults);}callback();}};if(!$module.api('get request')){module.setup.api();}apiSettings=$.extend(true,{},apiSettings,settings.apiSettings);$module.api('setting',apiSettings).api('query');},filterItems:function filterItems(query){var searchTerm=module.remove.diacritics(query!==undefined?query:module.get.query()),results=null,escapedTerm=module.escape.string(searchTerm),regExpFlags=(settings.ignoreSearchCase?'i':'')+'gm',beginsWithRegExp=new RegExp('^'+escapedTerm,regExpFlags);// avoid loop if we're matching nothing
if(module.has.query()){results=[];module.verbose('Searching for matching values',searchTerm);$item.each(function(){var $choice=$(this),text,value;if($choice.hasClass(className.unfilterable)){results.push(this);return true;}if(settings.match==='both'||settings.match==='text'){text=module.remove.diacritics(String(module.get.choiceText($choice,false)));if(text.search(beginsWithRegExp)!==-1){results.push(this);return true;}else if(settings.fullTextSearch==='exact'&&module.exactSearch(searchTerm,text)){results.push(this);return true;}else if(settings.fullTextSearch===true&&module.fuzzySearch(searchTerm,text)){results.push(this);return true;}}if(settings.match==='both'||settings.match==='value'){value=module.remove.diacritics(String(module.get.choiceValue($choice,text)));if(value.search(beginsWithRegExp)!==-1){results.push(this);return true;}else if(settings.fullTextSearch==='exact'&&module.exactSearch(searchTerm,value)){results.push(this);return true;}else if(settings.fullTextSearch===true&&module.fuzzySearch(searchTerm,value)){results.push(this);return true;}}});}module.debug('Showing only matched items',searchTerm);module.remove.filteredItem();if(results){$item.not(results).addClass(className.filtered);}if(!module.has.query()){$divider.removeClass(className.hidden);}else if(settings.hideDividers===true){$divider.addClass(className.hidden);}else if(settings.hideDividers==='empty'){$divider.removeClass(className.hidden).filter(function(){// First find the last divider in this divider group
// Dividers which are direct siblings are considered a group
var lastDivider=$(this).nextUntil(selector.item);return(lastDivider.length?lastDivider:$(this)// Count all non-filtered items until the next divider (or end of the dropdown)
).nextUntil(selector.divider).filter(selector.item+":not(."+className.filtered+")")// Hide divider if no items are found
.length===0;}).addClass(className.hidden);}},fuzzySearch:function fuzzySearch(query,term){var termLength=term.length,queryLength=query.length;query=settings.ignoreSearchCase?query.toLowerCase():query;term=settings.ignoreSearchCase?term.toLowerCase():term;if(queryLength>termLength){return false;}if(queryLength===termLength){return query===term;}search:for(var characterIndex=0,nextCharacterIndex=0;characterIndex<queryLength;characterIndex++){var queryCharacter=query.charCodeAt(characterIndex);while(nextCharacterIndex<termLength){if(term.charCodeAt(nextCharacterIndex++)===queryCharacter){continue search;}}return false;}return true;},exactSearch:function exactSearch(query,term){query=settings.ignoreSearchCase?query.toLowerCase():query;term=settings.ignoreSearchCase?term.toLowerCase():term;return term.indexOf(query)>-1;},filterActive:function filterActive(){if(settings.useLabels){$item.filter('.'+className.active).addClass(className.filtered);}},focusSearch:function focusSearch(skipHandler){if(module.has.search()&&!module.is.focusedOnSearch()){if(skipHandler){$module.off('focus'+eventNamespace,selector.search);$search.focus();$module.on('focus'+eventNamespace,selector.search,module.event.search.focus);}else{$search.focus();}}},blurSearch:function blurSearch(){if(module.has.search()){$search.blur();}},forceSelection:function forceSelection(){var $currentlySelected=$item.not(className.filtered).filter('.'+className.selected).eq(0),$activeItem=$item.not(className.filtered).filter('.'+className.active).eq(0),$selectedItem=$currentlySelected.length>0?$currentlySelected:$activeItem,hasSelected=$selectedItem.length>0;if(settings.allowAdditions||hasSelected&&!module.is.multiple()){module.debug('Forcing partial selection to selected item',$selectedItem);module.event.item.click.call($selectedItem,{},true);}else{module.remove.searchTerm();}},change:{values:function values(_values){if(!settings.allowAdditions){module.clear();}module.debug('Creating dropdown with specified values',_values);module.setup.menu({values:_values});$.each(_values,function(index,item){if(item.selected==true){module.debug('Setting initial selection to',item[fields.value]);module.set.selected(item[fields.value]);if(!module.is.multiple()){return false;}}});if(module.has.selectInput()){module.disconnect.selectObserver();$input.html('');$input.append('<option disabled selected value></option>');$.each(_values,function(index,item){var value=settings.templates.deQuote(item[fields.value]),name=settings.templates.escape(item[fields.name]||'',settings.preserveHTML);$input.append('<option value="'+value+'">'+name+'</option>');});module.observe.select();}}},event:{change:function change(){if(!internalChange){module.debug('Input changed, updating selection');module.set.selected();}},focus:function focus(){if(settings.showOnFocus&&!activated&&module.is.hidden()&&!pageLostFocus){module.show();}},blur:function blur(event){pageLostFocus=document.activeElement===this;if(!activated&&!pageLostFocus){module.remove.activeLabel();module.hide();}},mousedown:function mousedown(){if(module.is.searchSelection()){// prevent menu hiding on immediate re-focus
willRefocus=true;}else{// prevents focus callback from occurring on mousedown
activated=true;}},mouseup:function mouseup(){if(module.is.searchSelection()){// prevent menu hiding on immediate re-focus
willRefocus=false;}else{activated=false;}},click:function click(event){var $target=$(event.target);// focus search
if($target.is($module)){if(!module.is.focusedOnSearch()){module.focusSearch();}else{module.show();}}},search:{focus:function focus(event){activated=true;if(module.is.multiple()){module.remove.activeLabel();}if(settings.showOnFocus||event.type!=='focus'&&event.type!=='focusin'){module.search();}},blur:function blur(event){pageLostFocus=document.activeElement===this;if(module.is.searchSelection()&&!willRefocus){if(!itemActivated&&!pageLostFocus){if(settings.forceSelection){module.forceSelection();}else if(!settings.allowAdditions){module.remove.searchTerm();}module.hide();}}willRefocus=false;}},clearIcon:{click:function click(event){module.clear();if(module.is.searchSelection()){module.remove.searchTerm();}module.hide();event.stopPropagation();}},icon:{click:function click(event){iconClicked=true;if(module.has.search()){if(!module.is.active()){if(settings.showOnFocus){module.focusSearch();}else{module.toggle();}}else{module.blurSearch();}}else{module.toggle();}}},text:{focus:function focus(event){activated=true;module.focusSearch();}},input:function input(event){if(module.is.multiple()||module.is.searchSelection()){module.set.filtered();}clearTimeout(module.timer);module.timer=setTimeout(module.search,settings.delay.search);},label:{click:function click(event){var $label=$(this),$labels=$module.find(selector.label),$activeLabels=$labels.filter('.'+className.active),$nextActive=$label.nextAll('.'+className.active),$prevActive=$label.prevAll('.'+className.active),$range=$nextActive.length>0?$label.nextUntil($nextActive).add($activeLabels).add($label):$label.prevUntil($prevActive).add($activeLabels).add($label);if(event.shiftKey){$activeLabels.removeClass(className.active);$range.addClass(className.active);}else if(event.ctrlKey){$label.toggleClass(className.active);}else{$activeLabels.removeClass(className.active);$label.addClass(className.active);}settings.onLabelSelect.apply(this,$labels.filter('.'+className.active));}},remove:{click:function click(){var $label=$(this).parent();if($label.hasClass(className.active)){// remove all selected labels
module.remove.activeLabels();}else{// remove this label only
module.remove.activeLabels($label);}}},test:{toggle:function toggle(event){var toggleBehavior=module.is.multiple()?module.show:module.toggle;if(module.is.bubbledLabelClick(event)||module.is.bubbledIconClick(event)){return;}if(module.determine.eventOnElement(event,toggleBehavior)){event.preventDefault();}},touch:function touch(event){module.determine.eventOnElement(event,function(){if(event.type=='touchstart'){module.timer=setTimeout(function(){module.hide();},settings.delay.touch);}else if(event.type=='touchmove'){clearTimeout(module.timer);}});event.stopPropagation();},hide:function hide(event){if(module.determine.eventInModule(event,module.hide)){if(element.id&&$(event.target).attr('for')===element.id){event.preventDefault();}}}},select:{mutation:function mutation(mutations){module.debug('<select> modified, recreating menu');if(module.is.selectMutation(mutations)){module.disconnect.selectObserver();module.refresh();module.setup.select();module.set.selected();module.observe.select();}}},menu:{mutation:function mutation(mutations){var mutation=mutations[0],$addedNode=mutation.addedNodes?$(mutation.addedNodes[0]):$(false),$removedNode=mutation.removedNodes?$(mutation.removedNodes[0]):$(false),$changedNodes=$addedNode.add($removedNode),isUserAddition=$changedNodes.is(selector.addition)||$changedNodes.closest(selector.addition).length>0,isMessage=$changedNodes.is(selector.message)||$changedNodes.closest(selector.message).length>0;if(isUserAddition||isMessage){module.debug('Updating item selector cache');module.refreshItems();}else{module.debug('Menu modified, updating selector cache');module.refresh();}},mousedown:function mousedown(){itemActivated=true;},mouseup:function mouseup(){itemActivated=false;}},item:{mouseenter:function mouseenter(event){var $target=$(event.target),$item=$(this),$subMenu=$item.children(selector.menu),$otherMenus=$item.siblings(selector.item).children(selector.menu),hasSubMenu=$subMenu.length>0,isBubbledEvent=$subMenu.find($target).length>0;if(!isBubbledEvent&&hasSubMenu){clearTimeout(module.itemTimer);module.itemTimer=setTimeout(function(){module.verbose('Showing sub-menu',$subMenu);$.each($otherMenus,function(){module.animate.hide(false,$(this));});module.animate.show(false,$subMenu);},settings.delay.show);event.preventDefault();}},mouseleave:function mouseleave(event){var $subMenu=$(this).children(selector.menu);if($subMenu.length>0){clearTimeout(module.itemTimer);module.itemTimer=setTimeout(function(){module.verbose('Hiding sub-menu',$subMenu);module.animate.hide(false,$subMenu);},settings.delay.hide);}},click:function click(event,skipRefocus){var $choice=$(this),$target=event?$(event.target):$(''),$subMenu=$choice.find(selector.menu),text=module.get.choiceText($choice),value=module.get.choiceValue($choice,text),hasSubMenu=$subMenu.length>0,isBubbledEvent=$subMenu.find($target).length>0;// prevents IE11 bug where menu receives focus even though `tabindex=-1`
if(document.activeElement.tagName.toLowerCase()!=='input'){$(document.activeElement).blur();}if(!isBubbledEvent&&(!hasSubMenu||settings.allowCategorySelection)){if(module.is.searchSelection()){if(settings.allowAdditions){module.remove.userAddition();}module.remove.searchTerm();if(!module.is.focusedOnSearch()&&!(skipRefocus==true)){module.focusSearch(true);}}if(!settings.useLabels){module.remove.filteredItem();module.set.scrollPosition($choice);}module.determine.selectAction.call(this,text,value);}}},document:{// label selection should occur even when element has no focus
keydown:function keydown(event){var pressedKey=event.which,isShortcutKey=module.is.inObject(pressedKey,keys);if(isShortcutKey){var $label=$module.find(selector.label),$activeLabel=$label.filter('.'+className.active),activeValue=$activeLabel.data(metadata.value),labelIndex=$label.index($activeLabel),labelCount=$label.length,hasActiveLabel=$activeLabel.length>0,hasMultipleActive=$activeLabel.length>1,isFirstLabel=labelIndex===0,isLastLabel=labelIndex+1==labelCount,isSearch=module.is.searchSelection(),isFocusedOnSearch=module.is.focusedOnSearch(),isFocused=module.is.focused(),caretAtStart=isFocusedOnSearch&&module.get.caretPosition(false)===0,isSelectedSearch=caretAtStart&&module.get.caretPosition(true)!==0,$nextLabel;if(isSearch&&!hasActiveLabel&&!isFocusedOnSearch){return;}if(pressedKey==keys.leftArrow){// activate previous label
if((isFocused||caretAtStart)&&!hasActiveLabel){module.verbose('Selecting previous label');$label.last().addClass(className.active);}else if(hasActiveLabel){if(!event.shiftKey){module.verbose('Selecting previous label');$label.removeClass(className.active);}else{module.verbose('Adding previous label to selection');}if(isFirstLabel&&!hasMultipleActive){$activeLabel.addClass(className.active);}else{$activeLabel.prev(selector.siblingLabel).addClass(className.active).end();}event.preventDefault();}}else if(pressedKey==keys.rightArrow){// activate first label
if(isFocused&&!hasActiveLabel){$label.first().addClass(className.active);}// activate next label
if(hasActiveLabel){if(!event.shiftKey){module.verbose('Selecting next label');$label.removeClass(className.active);}else{module.verbose('Adding next label to selection');}if(isLastLabel){if(isSearch){if(!isFocusedOnSearch){module.focusSearch();}else{$label.removeClass(className.active);}}else if(hasMultipleActive){$activeLabel.next(selector.siblingLabel).addClass(className.active);}else{$activeLabel.addClass(className.active);}}else{$activeLabel.next(selector.siblingLabel).addClass(className.active);}event.preventDefault();}}else if(pressedKey==keys.deleteKey||pressedKey==keys.backspace){if(hasActiveLabel){module.verbose('Removing active labels');if(isLastLabel){if(isSearch&&!isFocusedOnSearch){module.focusSearch();}}$activeLabel.last().next(selector.siblingLabel).addClass(className.active);module.remove.activeLabels($activeLabel);event.preventDefault();}else if(caretAtStart&&!isSelectedSearch&&!hasActiveLabel&&pressedKey==keys.backspace){module.verbose('Removing last label on input backspace');$activeLabel=$label.last().addClass(className.active);module.remove.activeLabels($activeLabel);}}else{$activeLabel.removeClass(className.active);}}}},keydown:function keydown(event){var pressedKey=event.which,isShortcutKey=module.is.inObject(pressedKey,keys);if(isShortcutKey){var $currentlySelected=$item.not(selector.unselectable).filter('.'+className.selected).eq(0),$activeItem=$menu.children('.'+className.active).eq(0),$selectedItem=$currentlySelected.length>0?$currentlySelected:$activeItem,$visibleItems=$selectedItem.length>0?$selectedItem.siblings(':not(.'+className.filtered+')').addBack():$menu.children(':not(.'+className.filtered+')'),$subMenu=$selectedItem.children(selector.menu),$parentMenu=$selectedItem.closest(selector.menu),inVisibleMenu=$parentMenu.hasClass(className.visible)||$parentMenu.hasClass(className.animating)||$parentMenu.parent(selector.menu).length>0,hasSubMenu=$subMenu.length>0,hasSelectedItem=$selectedItem.length>0,selectedIsSelectable=$selectedItem.not(selector.unselectable).length>0,delimiterPressed=pressedKey==keys.delimiter&&settings.allowAdditions&&module.is.multiple(),isAdditionWithoutMenu=settings.allowAdditions&&settings.hideAdditions&&(pressedKey==keys.enter||delimiterPressed)&&selectedIsSelectable,$nextItem,isSubMenuItem,newIndex;// allow selection with menu closed
if(isAdditionWithoutMenu){module.verbose('Selecting item from keyboard shortcut',$selectedItem);module.event.item.click.call($selectedItem,event);if(module.is.searchSelection()){module.remove.searchTerm();}if(module.is.multiple()){event.preventDefault();}}// visible menu keyboard shortcuts
if(module.is.visible()){// enter (select or open sub-menu)
if(pressedKey==keys.enter||delimiterPressed){if(pressedKey==keys.enter&&hasSelectedItem&&hasSubMenu&&!settings.allowCategorySelection){module.verbose('Pressed enter on unselectable category, opening sub menu');pressedKey=keys.rightArrow;}else if(selectedIsSelectable){module.verbose('Selecting item from keyboard shortcut',$selectedItem);module.event.item.click.call($selectedItem,event);if(module.is.searchSelection()){module.remove.searchTerm();if(module.is.multiple()){$search.focus();}}}event.preventDefault();}// sub-menu actions
if(hasSelectedItem){if(pressedKey==keys.leftArrow){isSubMenuItem=$parentMenu[0]!==$menu[0];if(isSubMenuItem){module.verbose('Left key pressed, closing sub-menu');module.animate.hide(false,$parentMenu);$selectedItem.removeClass(className.selected);$parentMenu.closest(selector.item).addClass(className.selected);event.preventDefault();}}// right arrow (show sub-menu)
if(pressedKey==keys.rightArrow){if(hasSubMenu){module.verbose('Right key pressed, opening sub-menu');module.animate.show(false,$subMenu);$selectedItem.removeClass(className.selected);$subMenu.find(selector.item).eq(0).addClass(className.selected);event.preventDefault();}}}// up arrow (traverse menu up)
if(pressedKey==keys.upArrow){$nextItem=hasSelectedItem&&inVisibleMenu?$selectedItem.prevAll(selector.item+':not('+selector.unselectable+')').eq(0):$item.eq(0);if($visibleItems.index($nextItem)<0){module.verbose('Up key pressed but reached top of current menu');event.preventDefault();return;}else{module.verbose('Up key pressed, changing active item');$selectedItem.removeClass(className.selected);$nextItem.addClass(className.selected);module.set.scrollPosition($nextItem);if(settings.selectOnKeydown&&module.is.single()){module.set.selectedItem($nextItem);}}event.preventDefault();}// down arrow (traverse menu down)
if(pressedKey==keys.downArrow){$nextItem=hasSelectedItem&&inVisibleMenu?$nextItem=$selectedItem.nextAll(selector.item+':not('+selector.unselectable+')').eq(0):$item.eq(0);if($nextItem.length===0){module.verbose('Down key pressed but reached bottom of current menu');event.preventDefault();return;}else{module.verbose('Down key pressed, changing active item');$item.removeClass(className.selected);$nextItem.addClass(className.selected);module.set.scrollPosition($nextItem);if(settings.selectOnKeydown&&module.is.single()){module.set.selectedItem($nextItem);}}event.preventDefault();}// page down (show next page)
if(pressedKey==keys.pageUp){module.scrollPage('up');event.preventDefault();}if(pressedKey==keys.pageDown){module.scrollPage('down');event.preventDefault();}// escape (close menu)
if(pressedKey==keys.escape){module.verbose('Escape key pressed, closing dropdown');module.hide();}}else{// delimiter key
if(delimiterPressed){event.preventDefault();}// down arrow (open menu)
if(pressedKey==keys.downArrow&&!module.is.visible()){module.verbose('Down key pressed, showing dropdown');module.show();event.preventDefault();}}}else{if(!module.has.search()){module.set.selectedLetter(String.fromCharCode(pressedKey));}}}},trigger:{change:function change(){var events=document.createEvent('HTMLEvents'),inputElement=$input[0];if(inputElement){module.verbose('Triggering native change event');events.initEvent('change',true,false);inputElement.dispatchEvent(events);}}},determine:{selectAction:function selectAction(text,value){selectActionActive=true;module.verbose('Determining action',settings.action);if($.isFunction(module.action[settings.action])){module.verbose('Triggering preset action',settings.action,text,value);module.action[settings.action].call(element,text,value,this);}else if($.isFunction(settings.action)){module.verbose('Triggering user action',settings.action,text,value);settings.action.call(element,text,value,this);}else{module.error(error.action,settings.action);}selectActionActive=false;},eventInModule:function eventInModule(event,callback){var $target=$(event.target),inDocument=$target.closest(document.documentElement).length>0,inModule=$target.closest($module).length>0;callback=$.isFunction(callback)?callback:function(){};if(inDocument&&!inModule){module.verbose('Triggering event',callback);callback();return true;}else{module.verbose('Event occurred in dropdown, canceling callback');return false;}},eventOnElement:function eventOnElement(event,callback){var $target=$(event.target),$label=$target.closest(selector.siblingLabel),inVisibleDOM=document.body.contains(event.target),notOnLabel=$module.find($label).length===0||!(module.is.multiple()&&settings.useLabels),notInMenu=$target.closest($menu).length===0;callback=$.isFunction(callback)?callback:function(){};if(inVisibleDOM&&notOnLabel&&notInMenu){module.verbose('Triggering event',callback);callback();return true;}else{module.verbose('Event occurred in dropdown menu, canceling callback');return false;}}},action:{nothing:function nothing(){},activate:function activate(text,value,element){value=value!==undefined?value:text;if(module.can.activate($(element))){module.set.selected(value,$(element));if(!module.is.multiple()){module.hideAndClear();}}},select:function select(text,value,element){value=value!==undefined?value:text;if(module.can.activate($(element))){module.set.value(value,text,$(element));if(!module.is.multiple()){module.hideAndClear();}}},combo:function combo(text,value,element){value=value!==undefined?value:text;module.set.selected(value,$(element));module.hideAndClear();},hide:function hide(text,value,element){module.set.value(value,text,$(element));module.hideAndClear();}},get:{id:function id(){return _id;},defaultText:function defaultText(){return $module.data(metadata.defaultText);},defaultValue:function defaultValue(){return $module.data(metadata.defaultValue);},placeholderText:function placeholderText(){if(settings.placeholder!='auto'&&typeof settings.placeholder=='string'){return settings.placeholder;}return $module.data(metadata.placeholderText)||'';},text:function text(){return $text.text();},query:function query(){return $.trim($search.val());},searchWidth:function searchWidth(value){value=value!==undefined?value:$search.val();$sizer.text(value);// prevent rounding issues
return Math.ceil($sizer.width()+1);},selectionCount:function selectionCount(){var values=module.get.values(),count;count=module.is.multiple()?Array.isArray(values)?values.length:0:module.get.value()!==''?1:0;return count;},transition:function transition($subMenu){return settings.transition=='auto'?module.is.upward($subMenu)?'slide up':'slide down':settings.transition;},userValues:function userValues(){var values=module.get.values();if(!values){return false;}values=Array.isArray(values)?values:[values];return $.grep(values,function(value){return module.get.item(value)===false;});},uniqueArray:function uniqueArray(array){return $.grep(array,function(value,index){return $.inArray(value,array)===index;});},caretPosition:function caretPosition(returnEndPos){var input=$search.get(0),range,rangeLength;if(returnEndPos&&'selectionEnd'in input){return input.selectionEnd;}else if(!returnEndPos&&'selectionStart'in input){return input.selectionStart;}if(document.selection){input.focus();range=document.selection.createRange();rangeLength=range.text.length;if(returnEndPos){return rangeLength;}range.moveStart('character',-input.value.length);return range.text.length-rangeLength;}},value:function value(){var value=$input.length>0?$input.val():$module.data(metadata.value),isEmptyMultiselect=Array.isArray(value)&&value.length===1&&value[0]==='';// prevents placeholder element from being selected when multiple
return value===undefined||isEmptyMultiselect?'':value;},values:function values(){var value=module.get.value();if(value===''){return'';}return!module.has.selectInput()&&module.is.multiple()?typeof value=='string'// delimited string
?module.escape.htmlEntities(value).split(settings.delimiter):'':value;},remoteValues:function remoteValues(){var values=module.get.values(),remoteValues=false;if(values){if(typeof values=='string'){values=[values];}$.each(values,function(index,value){var name=module.read.remoteData(value);module.verbose('Restoring value from session data',name,value);if(name){if(!remoteValues){remoteValues={};}remoteValues[value]=name;}});}return remoteValues;},choiceText:function choiceText($choice,preserveHTML){preserveHTML=preserveHTML!==undefined?preserveHTML:settings.preserveHTML;if($choice){if($choice.find(selector.menu).length>0){module.verbose('Retrieving text of element with sub-menu');$choice=$choice.clone();$choice.find(selector.menu).remove();$choice.find(selector.menuIcon).remove();}return $choice.data(metadata.text)!==undefined?$choice.data(metadata.text):preserveHTML?$.trim($choice.html()):$.trim($choice.text());}},choiceValue:function choiceValue($choice,choiceText){choiceText=choiceText||module.get.choiceText($choice);if(!$choice){return false;}return $choice.data(metadata.value)!==undefined?String($choice.data(metadata.value)):typeof choiceText==='string'?$.trim(settings.ignoreSearchCase?choiceText.toLowerCase():choiceText):String(choiceText);},inputEvent:function inputEvent(){var input=$search[0];if(input){return input.oninput!==undefined?'input':input.onpropertychange!==undefined?'propertychange':'keyup';}return false;},selectValues:function selectValues(){var select={},oldGroup=[];select.values=[];$module.find('option').each(function(){var $option=$(this),name=$option.html(),disabled=$option.attr('disabled'),value=$option.attr('value')!==undefined?$option.attr('value'):name,text=$option.data(metadata.text)!==undefined?$option.data(metadata.text):name,group=$option.parent('optgroup');if(settings.placeholder==='auto'&&value===''){select.placeholder=name;}else{if(group.length!==oldGroup.length||group[0]!==oldGroup[0]){select.values.push({type:'header',divider:settings.headerDivider,name:group.attr('label')||''});oldGroup=group;}select.values.push({name:name,value:value,text:text,disabled:disabled});}});if(settings.placeholder&&settings.placeholder!=='auto'){module.debug('Setting placeholder value to',settings.placeholder);select.placeholder=settings.placeholder;}if(settings.sortSelect){if(settings.sortSelect===true){select.values.sort(function(a,b){return a.name.localeCompare(b.name);});}else if(settings.sortSelect==='natural'){select.values.sort(function(a,b){return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});}else if($.isFunction(settings.sortSelect)){select.values.sort(settings.sortSelect);}module.debug('Retrieved and sorted values from select',select);}else{module.debug('Retrieved values from select',select);}return select;},activeItem:function activeItem(){return $item.filter('.'+className.active);},selectedItem:function selectedItem(){var $selectedItem=$item.not(selector.unselectable).filter('.'+className.selected);return $selectedItem.length>0?$selectedItem:$item.eq(0);},itemWithAdditions:function itemWithAdditions(value){var $items=module.get.item(value),$userItems=module.create.userChoice(value),hasUserItems=$userItems&&$userItems.length>0;if(hasUserItems){$items=$items.length>0?$items.add($userItems):$userItems;}return $items;},item:function item(value,strict){var $selectedItem=false,shouldSearch,isMultiple;value=value!==undefined?value:module.get.values()!==undefined?module.get.values():module.get.text();isMultiple=module.is.multiple()&&Array.isArray(value);shouldSearch=isMultiple?value.length>0:value!==undefined&&value!==null;strict=value===''||value===false||value===true?true:strict||false;if(shouldSearch){$item.each(function(){var $choice=$(this),optionText=module.get.choiceText($choice),optionValue=module.get.choiceValue($choice,optionText);// safe early exit
if(optionValue===null||optionValue===undefined){return;}if(isMultiple){if($.inArray(module.escape.htmlEntities(String(optionValue)),value)!==-1){$selectedItem=$selectedItem?$selectedItem.add($choice):$choice;}}else if(strict){module.verbose('Ambiguous dropdown value using strict type check',$choice,value);if(optionValue===value){$selectedItem=$choice;return true;}}else{if(settings.ignoreCase){optionValue=optionValue.toLowerCase();value=value.toLowerCase();}if(module.escape.htmlEntities(String(optionValue))===module.escape.htmlEntities(String(value))){module.verbose('Found select item by value',optionValue,value);$selectedItem=$choice;return true;}}});}return $selectedItem;}},check:{maxSelections:function maxSelections(selectionCount){if(settings.maxSelections){selectionCount=selectionCount!==undefined?selectionCount:module.get.selectionCount();if(selectionCount>=settings.maxSelections){module.debug('Maximum selection count reached');if(settings.useLabels){$item.addClass(className.filtered);module.add.message(message.maxSelections);}return true;}else{module.verbose('No longer at maximum selection count');module.remove.message();module.remove.filteredItem();if(module.is.searchSelection()){module.filterItems();}return false;}}return true;}},restore:{defaults:function defaults(preventChangeTrigger){module.clear(preventChangeTrigger);module.restore.defaultText();module.restore.defaultValue();},defaultText:function defaultText(){var defaultText=module.get.defaultText(),placeholderText=module.get.placeholderText;if(defaultText===placeholderText){module.debug('Restoring default placeholder text',defaultText);module.set.placeholderText(defaultText);}else{module.debug('Restoring default text',defaultText);module.set.text(defaultText);}},placeholderText:function placeholderText(){module.set.placeholderText();},defaultValue:function defaultValue(){var defaultValue=module.get.defaultValue();if(defaultValue!==undefined){module.debug('Restoring default value',defaultValue);if(defaultValue!==''){module.set.value(defaultValue);module.set.selected();}else{module.remove.activeItem();module.remove.selectedItem();}}},labels:function labels(){if(settings.allowAdditions){if(!settings.useLabels){module.error(error.labels);settings.useLabels=true;}module.debug('Restoring selected values');module.create.userLabels();}module.check.maxSelections();},selected:function selected(){module.restore.values();if(module.is.multiple()){module.debug('Restoring previously selected values and labels');module.restore.labels();}else{module.debug('Restoring previously selected values');}},values:function values(){// prevents callbacks from occurring on initial load
module.set.initialLoad();if(settings.apiSettings&&settings.saveRemoteData&&module.get.remoteValues()){module.restore.remoteValues();}else{module.set.selected();}var value=module.get.value();if(value&&value!==''&&!(Array.isArray(value)&&value.length===0)){$input.removeClass(className.noselection);}else{$input.addClass(className.noselection);}module.remove.initialLoad();},remoteValues:function remoteValues(){var values=module.get.remoteValues();module.debug('Recreating selected from session data',values);if(values){if(module.is.single()){$.each(values,function(value,name){module.set.text(name);});}else{$.each(values,function(value,name){module.add.label(value,name);});}}}},read:{remoteData:function remoteData(value){var name;if(window.Storage===undefined){module.error(error.noStorage);return;}name=sessionStorage.getItem(value);return name!==undefined?name:false;}},save:{defaults:function defaults(){module.save.defaultText();module.save.placeholderText();module.save.defaultValue();},defaultValue:function defaultValue(){var value=module.get.value();module.verbose('Saving default value as',value);$module.data(metadata.defaultValue,value);},defaultText:function defaultText(){var text=module.get.text();module.verbose('Saving default text as',text);$module.data(metadata.defaultText,text);},placeholderText:function placeholderText(){var text;if(settings.placeholder!==false&&$text.hasClass(className.placeholder)){text=module.get.text();module.verbose('Saving placeholder text as',text);$module.data(metadata.placeholderText,text);}},remoteData:function remoteData(name,value){if(window.Storage===undefined){module.error(error.noStorage);return;}module.verbose('Saving remote data to session storage',value,name);sessionStorage.setItem(value,name);}},clear:function clear(preventChangeTrigger){if(module.is.multiple()&&settings.useLabels){module.remove.labels();}else{module.remove.activeItem();module.remove.selectedItem();module.remove.filteredItem();}module.set.placeholderText();module.clearValue(preventChangeTrigger);},clearValue:function clearValue(preventChangeTrigger){module.set.value('',null,null,preventChangeTrigger);},scrollPage:function scrollPage(direction,$selectedItem){var $currentItem=$selectedItem||module.get.selectedItem(),$menu=$currentItem.closest(selector.menu),menuHeight=$menu.outerHeight(),currentScroll=$menu.scrollTop(),itemHeight=$item.eq(0).outerHeight(),itemsPerPage=Math.floor(menuHeight/itemHeight),maxScroll=$menu.prop('scrollHeight'),newScroll=direction=='up'?currentScroll-itemHeight*itemsPerPage:currentScroll+itemHeight*itemsPerPage,$selectableItem=$item.not(selector.unselectable),isWithinRange,$nextSelectedItem,elementIndex;elementIndex=direction=='up'?$selectableItem.index($currentItem)-itemsPerPage:$selectableItem.index($currentItem)+itemsPerPage;isWithinRange=direction=='up'?elementIndex>=0:elementIndex<$selectableItem.length;$nextSelectedItem=isWithinRange?$selectableItem.eq(elementIndex):direction=='up'?$selectableItem.first():$selectableItem.last();if($nextSelectedItem.length>0){module.debug('Scrolling page',direction,$nextSelectedItem);$currentItem.removeClass(className.selected);$nextSelectedItem.addClass(className.selected);if(settings.selectOnKeydown&&module.is.single()){module.set.selectedItem($nextSelectedItem);}$menu.scrollTop(newScroll);}},set:{filtered:function filtered(){var isMultiple=module.is.multiple(),isSearch=module.is.searchSelection(),isSearchMultiple=isMultiple&&isSearch,searchValue=isSearch?module.get.query():'',hasSearchValue=typeof searchValue==='string'&&searchValue.length>0,searchWidth=module.get.searchWidth(),valueIsSet=searchValue!=='';if(isMultiple&&hasSearchValue){module.verbose('Adjusting input width',searchWidth,settings.glyphWidth);$search.css('width',searchWidth);}if(hasSearchValue||isSearchMultiple&&valueIsSet){module.verbose('Hiding placeholder text');$text.addClass(className.filtered);}else if(!isMultiple||isSearchMultiple&&!valueIsSet){module.verbose('Showing placeholder text');$text.removeClass(className.filtered);}},empty:function empty(){$module.addClass(className.empty);},loading:function loading(){$module.addClass(className.loading);},placeholderText:function placeholderText(text){text=text||module.get.placeholderText();module.debug('Setting placeholder text',text);module.set.text(text);$text.addClass(className.placeholder);},tabbable:function tabbable(){if(module.is.searchSelection()){module.debug('Added tabindex to searchable dropdown');$search.val('').attr('tabindex',0);$menu.attr('tabindex',-1);}else{module.debug('Added tabindex to dropdown');if($module.attr('tabindex')===undefined){$module.attr('tabindex',0);$menu.attr('tabindex',-1);}}},initialLoad:function initialLoad(){module.verbose('Setting initial load');_initialLoad2=true;},activeItem:function activeItem($item){if(settings.allowAdditions&&$item.filter(selector.addition).length>0){$item.addClass(className.filtered);}else{$item.addClass(className.active);}},partialSearch:function partialSearch(text){var length=module.get.query().length;$search.val(text.substr(0,length));},scrollPosition:function scrollPosition($item,forceScroll){var edgeTolerance=5,$menu,hasActive,offset,itemHeight,itemOffset,menuOffset,menuScroll,menuHeight,abovePage,belowPage;$item=$item||module.get.selectedItem();$menu=$item.closest(selector.menu);hasActive=$item&&$item.length>0;forceScroll=forceScroll!==undefined?forceScroll:false;if(module.get.activeItem().length===0){forceScroll=false;}if($item&&$menu.length>0&&hasActive){itemOffset=$item.position().top;$menu.addClass(className.loading);menuScroll=$menu.scrollTop();menuOffset=$menu.offset().top;itemOffset=$item.offset().top;offset=menuScroll-menuOffset+itemOffset;if(!forceScroll){menuHeight=$menu.height();belowPage=menuScroll+menuHeight<offset+edgeTolerance;abovePage=offset-edgeTolerance<menuScroll;}module.debug('Scrolling to active item',offset);if(forceScroll||abovePage||belowPage){$menu.scrollTop(offset);}$menu.removeClass(className.loading);}},text:function text(_text){if(settings.action==='combo'){module.debug('Changing combo button text',_text,$combo);if(settings.preserveHTML){$combo.html(_text);}else{$combo.text(_text);}}else if(settings.action==='activate'){if(_text!==module.get.placeholderText()){$text.removeClass(className.placeholder);}module.debug('Changing text',_text,$text);$text.removeClass(className.filtered);if(settings.preserveHTML){$text.html(_text);}else{$text.text(_text);}}},selectedItem:function selectedItem($item){var value=module.get.choiceValue($item),searchText=module.get.choiceText($item,false),text=module.get.choiceText($item,true);module.debug('Setting user selection to item',$item);module.remove.activeItem();module.set.partialSearch(searchText);module.set.activeItem($item);module.set.selected(value,$item);module.set.text(text);},selectedLetter:function selectedLetter(letter){var $selectedItem=$item.filter('.'+className.selected),alreadySelectedLetter=$selectedItem.length>0&&module.has.firstLetter($selectedItem,letter),$nextValue=false,$nextItem;// check next of same letter
if(alreadySelectedLetter){$nextItem=$selectedItem.nextAll($item).eq(0);if(module.has.firstLetter($nextItem,letter)){$nextValue=$nextItem;}}// check all values
if(!$nextValue){$item.each(function(){if(module.has.firstLetter($(this),letter)){$nextValue=$(this);return false;}});}// set next value
if($nextValue){module.verbose('Scrolling to next value with letter',letter);module.set.scrollPosition($nextValue);$selectedItem.removeClass(className.selected);$nextValue.addClass(className.selected);if(settings.selectOnKeydown&&module.is.single()){module.set.selectedItem($nextValue);}}},direction:function direction($menu){if(settings.direction=='auto'){// reset position, remove upward if it's base menu
if(!$menu){module.remove.upward();}else if(module.is.upward($menu)){//we need make sure when make assertion openDownward for $menu, $menu does not have upward class
module.remove.upward($menu);}if(module.can.openDownward($menu)){module.remove.upward($menu);}else{module.set.upward($menu);}if(!module.is.leftward($menu)&&!module.can.openRightward($menu)){module.set.leftward($menu);}}else if(settings.direction=='upward'){module.set.upward($menu);}},upward:function upward($currentMenu){var $element=$currentMenu||$module;$element.addClass(className.upward);},leftward:function leftward($currentMenu){var $element=$currentMenu||$menu;$element.addClass(className.leftward);},value:function value(_value2,text,$selected,preventChangeTrigger){if(_value2!==undefined&&_value2!==''&&!(Array.isArray(_value2)&&_value2.length===0)){$input.removeClass(className.noselection);}else{$input.addClass(className.noselection);}var escapedValue=module.escape.value(_value2),hasInput=$input.length>0,currentValue=module.get.values(),stringValue=_value2!==undefined?String(_value2):_value2,newValue;if(hasInput){if(!settings.allowReselection&&stringValue==currentValue){module.verbose('Skipping value update already same value',_value2,currentValue);if(!module.is.initialLoad()){return;}}if(module.is.single()&&module.has.selectInput()&&module.can.extendSelect()){module.debug('Adding user option',_value2);module.add.optionValue(_value2);}module.debug('Updating input value',escapedValue,currentValue);internalChange=true;$input.val(escapedValue);if(settings.fireOnInit===false&&module.is.initialLoad()){module.debug('Input native change event ignored on initial load');}else if(preventChangeTrigger!==true){module.trigger.change();}internalChange=false;}else{module.verbose('Storing value in metadata',escapedValue,$input);if(escapedValue!==currentValue){$module.data(metadata.value,stringValue);}}if(settings.fireOnInit===false&&module.is.initialLoad()){module.verbose('No callback on initial load',settings.onChange);}else if(preventChangeTrigger!==true){settings.onChange.call(element,_value2,text,$selected);}},active:function active(){$module.addClass(className.active);},multiple:function multiple(){$module.addClass(className.multiple);},visible:function visible(){$module.addClass(className.visible);},exactly:function exactly(value,$selectedItem){module.debug('Setting selected to exact values');module.clear();module.set.selected(value,$selectedItem);},selected:function selected(value,$selectedItem){var isMultiple=module.is.multiple();$selectedItem=settings.allowAdditions?$selectedItem||module.get.itemWithAdditions(value):$selectedItem||module.get.item(value);if(!$selectedItem){return;}module.debug('Setting selected menu item to',$selectedItem);if(module.is.multiple()){module.remove.searchWidth();}if(module.is.single()){module.remove.activeItem();module.remove.selectedItem();}else if(settings.useLabels){module.remove.selectedItem();}// select each item
$selectedItem.each(function(){var $selected=$(this),selectedText=module.get.choiceText($selected),selectedValue=module.get.choiceValue($selected,selectedText),isFiltered=$selected.hasClass(className.filtered),isActive=$selected.hasClass(className.active),isUserValue=$selected.hasClass(className.addition),shouldAnimate=isMultiple&&$selectedItem.length==1;if(isMultiple){if(!isActive||isUserValue){if(settings.apiSettings&&settings.saveRemoteData){module.save.remoteData(selectedText,selectedValue);}if(settings.useLabels){module.add.label(selectedValue,selectedText,shouldAnimate);module.add.value(selectedValue,selectedText,$selected);module.set.activeItem($selected);module.filterActive();module.select.nextAvailable($selectedItem);}else{module.add.value(selectedValue,selectedText,$selected);module.set.text(module.add.variables(message.count));module.set.activeItem($selected);}}else if(!isFiltered&&(settings.useLabels||selectActionActive)){module.debug('Selected active value, removing label');module.remove.selected(selectedValue);}}else{if(settings.apiSettings&&settings.saveRemoteData){module.save.remoteData(selectedText,selectedValue);}module.set.text(selectedText);module.set.value(selectedValue,selectedText,$selected);$selected.addClass(className.active).addClass(className.selected);}});module.remove.searchTerm();}},add:{label:function label(value,text,shouldAnimate){var $next=module.is.searchSelection()?$search:$text,escapedValue=module.escape.value(value),$label;if(settings.ignoreCase){escapedValue=escapedValue.toLowerCase();}$label=$('<a />').addClass(className.label).attr('data-'+metadata.value,escapedValue).html(templates.label(escapedValue,text,settings.preserveHTML,settings.className));$label=settings.onLabelCreate.call($label,escapedValue,text);if(module.has.label(value)){module.debug('User selection already exists, skipping',escapedValue);return;}if(settings.label.variation){$label.addClass(settings.label.variation);}if(shouldAnimate===true){module.debug('Animating in label',$label);$label.addClass(className.hidden).insertBefore($next).transition({animation:settings.label.transition,debug:settings.debug,verbose:settings.verbose,duration:settings.label.duration});}else{module.debug('Adding selection label',$label);$label.insertBefore($next);}},message:function message(_message){var $message=$menu.children(selector.message),html=settings.templates.message(module.add.variables(_message));if($message.length>0){$message.html(html);}else{$message=$('<div/>').html(html).addClass(className.message).appendTo($menu);}},optionValue:function optionValue(value){var escapedValue=module.escape.value(value),$option=$input.find('option[value="'+module.escape.string(escapedValue)+'"]'),hasOption=$option.length>0;if(hasOption){return;}// temporarily disconnect observer
module.disconnect.selectObserver();if(module.is.single()){module.verbose('Removing previous user addition');$input.find('option.'+className.addition).remove();}$('<option/>').prop('value',escapedValue).addClass(className.addition).html(value).appendTo($input);module.verbose('Adding user addition as an <option>',value);module.observe.select();},userSuggestion:function userSuggestion(value){var $addition=$menu.children(selector.addition),$existingItem=module.get.item(value),alreadyHasValue=$existingItem&&$existingItem.not(selector.addition).length,hasUserSuggestion=$addition.length>0,html;if(settings.useLabels&&module.has.maxSelections()){return;}if(value===''||alreadyHasValue){$addition.remove();return;}if(hasUserSuggestion){$addition.data(metadata.value,value).data(metadata.text,value).attr('data-'+metadata.value,value).attr('data-'+metadata.text,value).removeClass(className.filtered);if(!settings.hideAdditions){html=settings.templates.addition(module.add.variables(message.addResult,value));$addition.html(html);}module.verbose('Replacing user suggestion with new value',$addition);}else{$addition=module.create.userChoice(value);$addition.prependTo($menu);module.verbose('Adding item choice to menu corresponding with user choice addition',$addition);}if(!settings.hideAdditions||module.is.allFiltered()){$addition.addClass(className.selected).siblings().removeClass(className.selected);}module.refreshItems();},variables:function variables(message,term){var hasCount=message.search('{count}')!==-1,hasMaxCount=message.search('{maxCount}')!==-1,hasTerm=message.search('{term}')!==-1,count,query;module.verbose('Adding templated variables to message',message);if(hasCount){count=module.get.selectionCount();message=message.replace('{count}',count);}if(hasMaxCount){count=module.get.selectionCount();message=message.replace('{maxCount}',settings.maxSelections);}if(hasTerm){query=term||module.get.query();message=message.replace('{term}',query);}return message;},value:function value(addedValue,addedText,$selectedItem){var currentValue=module.get.values(),newValue;if(module.has.value(addedValue)){module.debug('Value already selected');return;}if(addedValue===''){module.debug('Cannot select blank values from multiselect');return;}// extend current array
if(Array.isArray(currentValue)){newValue=currentValue.concat([addedValue]);newValue=module.get.uniqueArray(newValue);}else{newValue=[addedValue];}// add values
if(module.has.selectInput()){if(module.can.extendSelect()){module.debug('Adding value to select',addedValue,newValue,$input);module.add.optionValue(addedValue);}}else{newValue=newValue.join(settings.delimiter);module.debug('Setting hidden input to delimited value',newValue,$input);}if(settings.fireOnInit===false&&module.is.initialLoad()){module.verbose('Skipping onadd callback on initial load',settings.onAdd);}else{settings.onAdd.call(element,addedValue,addedText,$selectedItem);}module.set.value(newValue,addedText,$selectedItem);module.check.maxSelections();}},remove:{active:function active(){$module.removeClass(className.active);},activeLabel:function activeLabel(){$module.find(selector.label).removeClass(className.active);},empty:function empty(){$module.removeClass(className.empty);},loading:function loading(){$module.removeClass(className.loading);},initialLoad:function initialLoad(){_initialLoad2=false;},upward:function upward($currentMenu){var $element=$currentMenu||$module;$element.removeClass(className.upward);},leftward:function leftward($currentMenu){var $element=$currentMenu||$menu;$element.removeClass(className.leftward);},visible:function visible(){$module.removeClass(className.visible);},activeItem:function activeItem(){$item.removeClass(className.active);},filteredItem:function filteredItem(){if(settings.useLabels&&module.has.maxSelections()){return;}if(settings.useLabels&&module.is.multiple()){$item.not('.'+className.active).removeClass(className.filtered);}else{$item.removeClass(className.filtered);}if(settings.hideDividers){$divider.removeClass(className.hidden);}module.remove.empty();},optionValue:function optionValue(value){var escapedValue=module.escape.value(value),$option=$input.find('option[value="'+module.escape.string(escapedValue)+'"]'),hasOption=$option.length>0;if(!hasOption||!$option.hasClass(className.addition)){return;}// temporarily disconnect observer
if(_selectObserver){_selectObserver.disconnect();module.verbose('Temporarily disconnecting mutation observer');}$option.remove();module.verbose('Removing user addition as an <option>',escapedValue);if(_selectObserver){_selectObserver.observe($input[0],{childList:true,subtree:true});}},message:function message(){$menu.children(selector.message).remove();},searchWidth:function searchWidth(){$search.css('width','');},searchTerm:function searchTerm(){module.verbose('Cleared search term');$search.val('');module.set.filtered();},userAddition:function userAddition(){$item.filter(selector.addition).remove();},selected:function selected(value,$selectedItem){$selectedItem=settings.allowAdditions?$selectedItem||module.get.itemWithAdditions(value):$selectedItem||module.get.item(value);if(!$selectedItem){return false;}$selectedItem.each(function(){var $selected=$(this),selectedText=module.get.choiceText($selected),selectedValue=module.get.choiceValue($selected,selectedText);if(module.is.multiple()){if(settings.useLabels){module.remove.value(selectedValue,selectedText,$selected);module.remove.label(selectedValue);}else{module.remove.value(selectedValue,selectedText,$selected);if(module.get.selectionCount()===0){module.set.placeholderText();}else{module.set.text(module.add.variables(message.count));}}}else{module.remove.value(selectedValue,selectedText,$selected);}$selected.removeClass(className.filtered).removeClass(className.active);if(settings.useLabels){$selected.removeClass(className.selected);}});},selectedItem:function selectedItem(){$item.removeClass(className.selected);},value:function value(removedValue,removedText,$removedItem){var values=module.get.values(),newValue;removedValue=module.escape.htmlEntities(removedValue);if(module.has.selectInput()){module.verbose('Input is <select> removing selected option',removedValue);newValue=module.remove.arrayValue(removedValue,values);module.remove.optionValue(removedValue);}else{module.verbose('Removing from delimited values',removedValue);newValue=module.remove.arrayValue(removedValue,values);newValue=newValue.join(settings.delimiter);}if(settings.fireOnInit===false&&module.is.initialLoad()){module.verbose('No callback on initial load',settings.onRemove);}else{settings.onRemove.call(element,removedValue,removedText,$removedItem);}module.set.value(newValue,removedText,$removedItem);module.check.maxSelections();},arrayValue:function arrayValue(removedValue,values){if(!Array.isArray(values)){values=[values];}values=$.grep(values,function(value){return removedValue!=value;});module.verbose('Removed value from delimited string',removedValue,values);return values;},label:function label(value,shouldAnimate){var $labels=$module.find(selector.label),$removedLabel=$labels.filter('[data-'+metadata.value+'="'+module.escape.string(settings.ignoreCase?value.toLowerCase():value)+'"]');module.verbose('Removing label',$removedLabel);$removedLabel.remove();},activeLabels:function activeLabels($activeLabels){$activeLabels=$activeLabels||$module.find(selector.label).filter('.'+className.active);module.verbose('Removing active label selections',$activeLabels);module.remove.labels($activeLabels);},labels:function labels($labels){$labels=$labels||$module.find(selector.label);module.verbose('Removing labels',$labels);$labels.each(function(){var $label=$(this),value=$label.data(metadata.value),stringValue=value!==undefined?String(value):value,isUserValue=module.is.userValue(stringValue);if(settings.onLabelRemove.call($label,value)===false){module.debug('Label remove callback cancelled removal');return;}module.remove.message();if(isUserValue){module.remove.value(stringValue);module.remove.label(stringValue);}else{// selected will also remove label
module.remove.selected(stringValue);}});},tabbable:function tabbable(){if(module.is.searchSelection()){module.debug('Searchable dropdown initialized');$search.removeAttr('tabindex');$menu.removeAttr('tabindex');}else{module.debug('Simple selection dropdown initialized');$module.removeAttr('tabindex');$menu.removeAttr('tabindex');}},diacritics:function diacritics(text){return settings.ignoreDiacritics?text.normalize('NFD').replace(/[\u0300-\u036f]/g,''):text;}},has:{menuSearch:function menuSearch(){return module.has.search()&&$search.closest($menu).length>0;},clearItem:function clearItem(){return $clear.length>0;},search:function search(){return $search.length>0;},sizer:function sizer(){return $sizer.length>0;},selectInput:function selectInput(){return $input.is('select');},minCharacters:function minCharacters(searchTerm){if(settings.minCharacters&&!iconClicked){searchTerm=searchTerm!==undefined?String(searchTerm):String(module.get.query());return searchTerm.length>=settings.minCharacters;}iconClicked=false;return true;},firstLetter:function firstLetter($item,letter){var text,firstLetter;if(!$item||$item.length===0||typeof letter!=='string'){return false;}text=module.get.choiceText($item,false);letter=letter.toLowerCase();firstLetter=String(text).charAt(0).toLowerCase();return letter==firstLetter;},input:function input(){return $input.length>0;},items:function items(){return $item.length>0;},menu:function menu(){return $menu.length>0;},message:function message(){return $menu.children(selector.message).length!==0;},label:function label(value){var escapedValue=module.escape.value(value),$labels=$module.find(selector.label);if(settings.ignoreCase){escapedValue=escapedValue.toLowerCase();}return $labels.filter('[data-'+metadata.value+'="'+module.escape.string(escapedValue)+'"]').length>0;},maxSelections:function maxSelections(){return settings.maxSelections&&module.get.selectionCount()>=settings.maxSelections;},allResultsFiltered:function allResultsFiltered(){var $normalResults=$item.not(selector.addition);return $normalResults.filter(selector.unselectable).length===$normalResults.length;},userSuggestion:function userSuggestion(){return $menu.children(selector.addition).length>0;},query:function query(){return module.get.query()!=='';},value:function value(_value3){return settings.ignoreCase?module.has.valueIgnoringCase(_value3):module.has.valueMatchingCase(_value3);},valueMatchingCase:function valueMatchingCase(value){var values=module.get.values(),hasValue=Array.isArray(values)?values&&$.inArray(value,values)!==-1:values==value;return hasValue?true:false;},valueIgnoringCase:function valueIgnoringCase(value){var values=module.get.values(),hasValue=false;if(!Array.isArray(values)){values=[values];}$.each(values,function(index,existingValue){if(String(value).toLowerCase()==String(existingValue).toLowerCase()){hasValue=true;return false;}});return hasValue;}},is:{active:function active(){return $module.hasClass(className.active);},animatingInward:function animatingInward(){return $menu.transition('is inward');},animatingOutward:function animatingOutward(){return $menu.transition('is outward');},bubbledLabelClick:function bubbledLabelClick(event){return $(event.target).is('select, input')&&$module.closest('label').length>0;},bubbledIconClick:function bubbledIconClick(event){return $(event.target).closest($icon).length>0;},alreadySetup:function alreadySetup(){return $module.is('select')&&$module.parent(selector.dropdown).data(moduleNamespace)!==undefined&&$module.prev().length===0;},animating:function animating($subMenu){return $subMenu?$subMenu.transition&&$subMenu.transition('is animating'):$menu.transition&&$menu.transition('is animating');},leftward:function leftward($subMenu){var $selectedMenu=$subMenu||$menu;return $selectedMenu.hasClass(className.leftward);},clearable:function clearable(){return $module.hasClass(className.clearable)||settings.clearable;},disabled:function disabled(){return $module.hasClass(className.disabled);},focused:function focused(){return document.activeElement===$module[0];},focusedOnSearch:function focusedOnSearch(){return document.activeElement===$search[0];},allFiltered:function allFiltered(){return(module.is.multiple()||module.has.search())&&!(settings.hideAdditions==false&&module.has.userSuggestion())&&!module.has.message()&&module.has.allResultsFiltered();},hidden:function hidden($subMenu){return!module.is.visible($subMenu);},initialLoad:function initialLoad(){return _initialLoad2;},inObject:function inObject(needle,object){var found=false;$.each(object,function(index,property){if(property==needle){found=true;return true;}});return found;},multiple:function multiple(){return $module.hasClass(className.multiple);},remote:function remote(){return settings.apiSettings&&module.can.useAPI();},single:function single(){return!module.is.multiple();},selectMutation:function selectMutation(mutations){var selectChanged=false;$.each(mutations,function(index,mutation){if($(mutation.target).is('select')||$(mutation.addedNodes).is('select')){selectChanged=true;return false;}});return selectChanged;},search:function search(){return $module.hasClass(className.search);},searchSelection:function searchSelection(){return module.has.search()&&$search.parent(selector.dropdown).length===1;},selection:function selection(){return $module.hasClass(className.selection);},userValue:function userValue(value){return $.inArray(value,module.get.userValues())!==-1;},upward:function upward($menu){var $element=$menu||$module;return $element.hasClass(className.upward);},visible:function visible($subMenu){return $subMenu?$subMenu.hasClass(className.visible):$menu.hasClass(className.visible);},verticallyScrollableContext:function verticallyScrollableContext(){var overflowY=$context.get(0)!==window?$context.css('overflow-y'):false;return overflowY=='auto'||overflowY=='scroll';},horizontallyScrollableContext:function horizontallyScrollableContext(){var overflowX=$context.get(0)!==window?$context.css('overflow-X'):false;return overflowX=='auto'||overflowX=='scroll';}},can:{activate:function activate($item){if(settings.useLabels){return true;}if(!module.has.maxSelections()){return true;}if(module.has.maxSelections()&&$item.hasClass(className.active)){return true;}return false;},openDownward:function openDownward($subMenu){var $currentMenu=$subMenu||$menu,canOpenDownward=true,onScreen={},calculations;$currentMenu.addClass(className.loading);calculations={context:{offset:$context.get(0)===window?{top:0,left:0}:$context.offset(),scrollTop:$context.scrollTop(),height:$context.outerHeight()},menu:{offset:$currentMenu.offset(),height:$currentMenu.outerHeight()}};if(module.is.verticallyScrollableContext()){calculations.menu.offset.top+=calculations.context.scrollTop;}onScreen={above:calculations.context.scrollTop<=calculations.menu.offset.top-calculations.context.offset.top-calculations.menu.height,below:calculations.context.scrollTop+calculations.context.height>=calculations.menu.offset.top-calculations.context.offset.top+calculations.menu.height};if(onScreen.below){module.verbose('Dropdown can fit in context downward',onScreen);canOpenDownward=true;}else if(!onScreen.below&&!onScreen.above){module.verbose('Dropdown cannot fit in either direction, favoring downward',onScreen);canOpenDownward=true;}else{module.verbose('Dropdown cannot fit below, opening upward',onScreen);canOpenDownward=false;}$currentMenu.removeClass(className.loading);return canOpenDownward;},openRightward:function openRightward($subMenu){var $currentMenu=$subMenu||$menu,canOpenRightward=true,isOffscreenRight=false,calculations;$currentMenu.addClass(className.loading);calculations={context:{offset:$context.get(0)===window?{top:0,left:0}:$context.offset(),scrollLeft:$context.scrollLeft(),width:$context.outerWidth()},menu:{offset:$currentMenu.offset(),width:$currentMenu.outerWidth()}};if(module.is.horizontallyScrollableContext()){calculations.menu.offset.left+=calculations.context.scrollLeft;}isOffscreenRight=calculations.menu.offset.left-calculations.context.offset.left+calculations.menu.width>=calculations.context.scrollLeft+calculations.context.width;if(isOffscreenRight){module.verbose('Dropdown cannot fit in context rightward',isOffscreenRight);canOpenRightward=false;}$currentMenu.removeClass(className.loading);return canOpenRightward;},click:function click(){return hasTouch||settings.on=='click';},extendSelect:function extendSelect(){return settings.allowAdditions||settings.apiSettings;},show:function show(){return!module.is.disabled()&&(module.has.items()||module.has.message());},useAPI:function useAPI(){return $.fn.api!==undefined;}},animate:{show:function show(callback,$subMenu){var $currentMenu=$subMenu||$menu,start=$subMenu?function(){}:function(){module.hideSubMenus();module.hideOthers();module.set.active();},transition;callback=$.isFunction(callback)?callback:function(){};module.verbose('Doing menu show animation',$currentMenu);module.set.direction($subMenu);transition=module.get.transition($subMenu);if(module.is.selection()){module.set.scrollPosition(module.get.selectedItem(),true);}if(module.is.hidden($currentMenu)||module.is.animating($currentMenu)){if(transition=='none'){start();$currentMenu.transition('show');callback.call(element);}else if($.fn.transition!==undefined&&$module.transition('is supported')){$currentMenu.transition({animation:transition+' in',debug:settings.debug,verbose:settings.verbose,duration:settings.duration,queue:true,onStart:start,onComplete:function onComplete(){callback.call(element);}});}else{module.error(error.noTransition,transition);}}},hide:function hide(callback,$subMenu){var $currentMenu=$subMenu||$menu,start=$subMenu?function(){}:function(){if(module.can.click()){module.unbind.intent();}module.remove.active();},transition=module.get.transition($subMenu);callback=$.isFunction(callback)?callback:function(){};if(module.is.visible($currentMenu)||module.is.animating($currentMenu)){module.verbose('Doing menu hide animation',$currentMenu);if(transition=='none'){start();$currentMenu.transition('hide');callback.call(element);}else if($.fn.transition!==undefined&&$module.transition('is supported')){$currentMenu.transition({animation:transition+' out',duration:settings.duration,debug:settings.debug,verbose:settings.verbose,queue:false,onStart:start,onComplete:function onComplete(){callback.call(element);}});}else{module.error(error.transition);}}}},hideAndClear:function hideAndClear(){module.remove.searchTerm();if(module.has.maxSelections()){return;}if(module.has.search()){module.hide(function(){module.remove.filteredItem();});}else{module.hide();}},delay:{show:function show(){module.verbose('Delaying show event to ensure user intent');clearTimeout(module.timer);module.timer=setTimeout(module.show,settings.delay.show);},hide:function hide(){module.verbose('Delaying hide event to ensure user intent');clearTimeout(module.timer);module.timer=setTimeout(module.hide,settings.delay.hide);}},escape:{value:function value(_value4){var multipleValues=Array.isArray(_value4),stringValue=typeof _value4==='string',isUnparsable=!stringValue&&!multipleValues,hasQuotes=stringValue&&_value4.search(regExp.quote)!==-1,values=[];if(isUnparsable||!hasQuotes){return _value4;}module.debug('Encoding quote values for use in select',_value4);if(multipleValues){$.each(_value4,function(index,value){values.push(value.replace(regExp.quote,'&quot;'));});return values;}return _value4.replace(regExp.quote,'&quot;');},string:function string(text){text=String(text);return text.replace(regExp.escape,'\\$&');},htmlEntities:function htmlEntities(string){var badChars=/[<>"'`]/g,shouldEscape=/[&<>"'`]/,escape={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},escapedChar=function escapedChar(chr){return escape[chr];};if(shouldEscape.test(string)){string=string.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;");return string.replace(badChars,escapedChar);}return string;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:$allModules;};$.fn.dropdown.settings={silent:false,debug:false,verbose:false,performance:true,on:'click',// what event should show menu action on item selection
action:'activate',// action on item selection (nothing, activate, select, combo, hide, function(){})
values:false,// specify values to use for dropdown
clearable:false,// whether the value of the dropdown can be cleared
apiSettings:false,selectOnKeydown:true,// Whether selection should occur automatically when keyboard shortcuts used
minCharacters:0,// Minimum characters required to trigger API call
filterRemoteData:false,// Whether API results should be filtered after being returned for query term
saveRemoteData:true,// Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh
throttle:200,// How long to wait after last user input to search remotely
context:window,// Context to use when determining if on screen
direction:'auto',// Whether dropdown should always open in one direction
keepOnScreen:true,// Whether dropdown should check whether it is on screen before showing
match:'both',// what to match against with search selection (both, text, or label)
fullTextSearch:false,// search anywhere in value (set to 'exact' to require exact matches)
ignoreDiacritics:false,// match results also if they contain diacritics of the same base character (for example searching for "a" will also match "á" or "â" or "à", etc...)
hideDividers:false,// Whether to hide any divider elements (specified in selector.divider) that are sibling to any items when searched (set to true will hide all dividers, set to 'empty' will hide them when they are not followed by a visible item)
placeholder:'auto',// whether to convert blank <select> values to placeholder text
preserveHTML:true,// preserve html when selecting value
sortSelect:false,// sort selection on init
forceSelection:true,// force a choice on blur with search selection
allowAdditions:false,// whether multiple select should allow user added values
ignoreCase:false,// whether to consider case sensitivity when creating labels
ignoreSearchCase:true,// whether to consider case sensitivity when filtering items
hideAdditions:true,// whether or not to hide special message prompting a user they can enter a value
maxSelections:false,// When set to a number limits the number of selections to this count
useLabels:true,// whether multiple select should filter currently active selections from choices
delimiter:',',// when multiselect uses normal <input> the values will be delimited with this character
showOnFocus:true,// show menu on focus
allowReselection:false,// whether current value should trigger callbacks when reselected
allowTab:true,// add tabindex to element
allowCategorySelection:false,// allow elements with sub-menus to be selected
fireOnInit:false,// Whether callbacks should fire when initializing dropdown values
transition:'auto',// auto transition will slide down or up based on direction
duration:200,// duration of transition
glyphWidth:1.037,// widest glyph width in em (W is 1.037 em) used to calculate multiselect input width
headerDivider:true,// whether option headers should have an additional divider line underneath when converted from <select> <optgroup>
// label settings on multi-select
label:{transition:'scale',duration:200,variation:false},// delay before event
delay:{hide:300,show:200,search:20,touch:50},/* Callbacks */onChange:function onChange(value,text,$selected){},onAdd:function onAdd(value,text,$selected){},onRemove:function onRemove(value,text,$selected){},onLabelSelect:function onLabelSelect($selectedLabels){},onLabelCreate:function onLabelCreate(value,text){return $(this);},onLabelRemove:function onLabelRemove(value){return true;},onNoResults:function onNoResults(searchTerm){return true;},onShow:function onShow(){},onHide:function onHide(){},/* Component */name:'Dropdown',namespace:'dropdown',message:{addResult:'Add <b>{term}</b>',count:'{count} selected',maxSelections:'Max {maxCount} selections',noResults:'No results found.',serverError:'There was an error contacting the server'},error:{action:'You called a dropdown action that was not defined',alreadySetup:'Once a select has been initialized behaviors must be called on the created ui dropdown',labels:'Allowing user additions currently requires the use of labels.',missingMultiple:'<select> requires multiple property to be set to correctly preserve multiple values',method:'The method you called is not defined.',noAPI:'The API module is required to load resources remotely',noStorage:'Saving remote data requires session storage',noTransition:'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',noNormalize:'"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s:=@]/g,quote:/"/g},metadata:{defaultText:'defaultText',defaultValue:'defaultValue',placeholderText:'placeholder',text:'text',value:'value'},// property names for remote query
fields:{remoteValues:'results',// grouping for api results
values:'values',// grouping for all dropdown values
disabled:'disabled',// whether value should be disabled
name:'name',// displayed dropdown text
value:'value',// actual dropdown value
text:'text',// displayed text when selected
type:'type',// type of dropdown element
image:'image',// optional image path
imageClass:'imageClass',// optional individual class for image
icon:'icon',// optional icon name
iconClass:'iconClass',// optional individual class for icon (for example to use flag instead)
"class":'class',// optional individual class for item/header
divider:'divider'// optional divider append for group headers
},keys:{backspace:8,delimiter:188,// comma
deleteKey:46,enter:13,escape:27,pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},selector:{addition:'.addition',divider:'.divider, .header',dropdown:'.ui.dropdown',hidden:'.hidden',icon:'> .dropdown.icon',input:'> input[type="hidden"], > select',item:'.item',label:'> .label',remove:'> .label > .delete.icon',siblingLabel:'.label',menu:'.menu',message:'.message',menuIcon:'.dropdown.icon',search:'input.search, .menu > .search > input, .menu input.search',sizer:'> input.sizer',text:'> .text:not(.icon)',unselectable:'.disabled, .filtered',clearIcon:'> .remove.icon'},className:{active:'active',addition:'addition',animating:'animating',disabled:'disabled',empty:'empty',dropdown:'ui dropdown',filtered:'filtered',hidden:'hidden transition',icon:'icon',image:'image',item:'item',label:'ui label',loading:'loading',menu:'menu',message:'message',multiple:'multiple',placeholder:'default',sizer:'sizer',search:'search',selected:'selected',selection:'selection',upward:'upward',leftward:'left',visible:'visible',clearable:'clearable',noselection:'noselection',"delete":'delete',header:'header',divider:'divider',groupIcon:'',unfilterable:'unfilterable'}};/* Templates */$.fn.dropdown.settings.templates={deQuote:function deQuote(string){return String(string).replace(/"/g,"");},escape:function escape(string,preserveHTML){if(preserveHTML){return string;}var badChars=/[<>"'`]/g,shouldEscape=/[&<>"'`]/,escape={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},escapedChar=function escapedChar(chr){return escape[chr];};if(shouldEscape.test(string)){string=string.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;");return string.replace(badChars,escapedChar);}return string;},// generates dropdown from select values
dropdown:function dropdown(select,fields,preserveHTML,className){var placeholder=select.placeholder||false,html='',escape=$.fn.dropdown.settings.templates.escape;html+='<i class="dropdown icon"></i>';if(placeholder){html+='<div class="default text">'+escape(placeholder,preserveHTML)+'</div>';}else{html+='<div class="text"></div>';}html+='<div class="'+className.menu+'">';html+=$.fn.dropdown.settings.templates.menu(select,fields,preserveHTML,className);html+='</div>';return html;},// generates just menu from select
menu:function menu(response,fields,preserveHTML,className){var values=response[fields.values]||[],html='',escape=$.fn.dropdown.settings.templates.escape,deQuote=$.fn.dropdown.settings.templates.deQuote;$.each(values,function(index,option){var itemType=option[fields.type]?option[fields.type]:'item';if(itemType==='item'){var maybeText=option[fields.text]?' data-text="'+deQuote(option[fields.text])+'"':'',maybeDisabled=option[fields.disabled]?className.disabled+' ':'';html+='<div class="'+maybeDisabled+(option[fields["class"]]?deQuote(option[fields["class"]]):className.item)+'" data-value="'+deQuote(option[fields.value])+'"'+maybeText+'>';if(option[fields.image]){html+='<img class="'+(option[fields.imageClass]?deQuote(option[fields.imageClass]):className.image)+'" src="'+deQuote(option[fields.image])+'">';}if(option[fields.icon]){html+='<i class="'+deQuote(option[fields.icon])+' '+(option[fields.iconClass]?deQuote(option[fields.iconClass]):className.icon)+'"></i>';}html+=escape(option[fields.name]||'',preserveHTML);html+='</div>';}else if(itemType==='header'){var groupName=escape(option[fields.name]||'',preserveHTML),groupIcon=option[fields.icon]?deQuote(option[fields.icon]):className.groupIcon;if(groupName!==''||groupIcon!==''){html+='<div class="'+(option[fields["class"]]?deQuote(option[fields["class"]]):className.header)+'">';if(groupIcon!==''){html+='<i class="'+groupIcon+' '+(option[fields.iconClass]?deQuote(option[fields.iconClass]):className.icon)+'"></i>';}html+=groupName;html+='</div>';}if(option[fields.divider]){html+='<div class="'+className.divider+'"></div>';}}});return html;},// generates label for multiselect
label:function label(value,text,preserveHTML,className){var escape=$.fn.dropdown.settings.templates.escape;return escape(text,preserveHTML)+'<i class="'+className["delete"]+' icon"></i>';},// generates messages like "No results"
message:function message(_message2){return _message2;},// generates user addition to selection menu
addition:function addition(choice){return choice;}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Embed
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){"use strict";$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.embed=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.embed.settings,parameters):$.extend({},$.fn.embed.settings),selector=settings.selector,className=settings.className,sources=settings.sources,error=settings.error,metadata=settings.metadata,namespace=settings.namespace,templates=settings.templates,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$placeholder=$module.find(selector.placeholder),$icon=$module.find(selector.icon),$embed=$module.find(selector.embed),element=this,instance=$module.data(moduleNamespace),module;module={initialize:function initialize(){module.debug('Initializing embed');module.determine.autoplay();module.create();module.bind.events();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous instance of embed');module.reset();$module.removeData(moduleNamespace).off(eventNamespace);},refresh:function refresh(){module.verbose('Refreshing selector cache');$placeholder=$module.find(selector.placeholder);$icon=$module.find(selector.icon);$embed=$module.find(selector.embed);},bind:{events:function events(){if(module.has.placeholder()){module.debug('Adding placeholder events');$module.on('click'+eventNamespace,selector.placeholder,module.createAndShow).on('click'+eventNamespace,selector.icon,module.createAndShow);}}},create:function create(){var placeholder=module.get.placeholder();if(placeholder){module.createPlaceholder();}else{module.createAndShow();}},createPlaceholder:function createPlaceholder(placeholder){var icon=module.get.icon(),url=module.get.url(),embed=module.generate.embed(url);placeholder=placeholder||module.get.placeholder();$module.html(templates.placeholder(placeholder,icon));module.debug('Creating placeholder for embed',placeholder,icon);},createEmbed:function createEmbed(url){module.refresh();url=url||module.get.url();$embed=$('<div/>').addClass(className.embed).html(module.generate.embed(url)).appendTo($module);settings.onCreate.call(element,url);module.debug('Creating embed object',$embed);},changeEmbed:function changeEmbed(url){$embed.html(module.generate.embed(url));},createAndShow:function createAndShow(){module.createEmbed();module.show();},// sets new embed
change:function change(source,id,url){module.debug('Changing video to ',source,id,url);$module.data(metadata.source,source).data(metadata.id,id);if(url){$module.data(metadata.url,url);}else{$module.removeData(metadata.url);}if(module.has.embed()){module.changeEmbed();}else{module.create();}},// clears embed
reset:function reset(){module.debug('Clearing embed and showing placeholder');module.remove.data();module.remove.active();module.remove.embed();module.showPlaceholder();settings.onReset.call(element);},// shows current embed
show:function show(){module.debug('Showing embed');module.set.active();settings.onDisplay.call(element);},hide:function hide(){module.debug('Hiding embed');module.showPlaceholder();},showPlaceholder:function showPlaceholder(){module.debug('Showing placeholder image');module.remove.active();settings.onPlaceholderDisplay.call(element);},get:{id:function id(){return settings.id||$module.data(metadata.id);},placeholder:function placeholder(){return settings.placeholder||$module.data(metadata.placeholder);},icon:function icon(){return settings.icon?settings.icon:$module.data(metadata.icon)!==undefined?$module.data(metadata.icon):module.determine.icon();},source:function source(url){return settings.source?settings.source:$module.data(metadata.source)!==undefined?$module.data(metadata.source):module.determine.source();},type:function type(){var source=module.get.source();return sources[source]!==undefined?sources[source].type:false;},url:function url(){return settings.url?settings.url:$module.data(metadata.url)!==undefined?$module.data(metadata.url):module.determine.url();}},determine:{autoplay:function autoplay(){if(module.should.autoplay()){settings.autoplay=true;}},source:function source(url){var matchedSource=false;url=url||module.get.url();if(url){$.each(sources,function(name,source){if(url.search(source.domain)!==-1){matchedSource=name;return false;}});}return matchedSource;},icon:function icon(){var source=module.get.source();return sources[source]!==undefined?sources[source].icon:false;},url:function url(){var id=settings.id||$module.data(metadata.id),source=settings.source||$module.data(metadata.source),url;url=sources[source]!==undefined?sources[source].url.replace('{id}',id):false;if(url){$module.data(metadata.url,url);}return url;}},set:{active:function active(){$module.addClass(className.active);}},remove:{data:function data(){$module.removeData(metadata.id).removeData(metadata.icon).removeData(metadata.placeholder).removeData(metadata.source).removeData(metadata.url);},active:function active(){$module.removeClass(className.active);},embed:function embed(){$embed.empty();}},encode:{parameters:function parameters(_parameters){var urlString=[],index;for(index in _parameters){urlString.push(encodeURIComponent(index)+'='+encodeURIComponent(_parameters[index]));}return urlString.join('&amp;');}},generate:{embed:function embed(url){module.debug('Generating embed html');var source=module.get.source(),html,parameters;url=module.get.url(url);if(url){parameters=module.generate.parameters(source);html=templates.iframe(url,parameters);}else{module.error(error.noURL,$module);}return html;},parameters:function parameters(source,extraParameters){var parameters=sources[source]&&sources[source].parameters!==undefined?sources[source].parameters(settings):{};extraParameters=extraParameters||settings.parameters;if(extraParameters){parameters=$.extend({},parameters,extraParameters);}parameters=settings.onEmbed(parameters);return module.encode.parameters(parameters);}},has:{embed:function embed(){return $embed.length>0;},placeholder:function placeholder(){return settings.placeholder||$module.data(metadata.placeholder);}},should:{autoplay:function autoplay(){return settings.autoplay==='auto'?settings.placeholder||$module.data(metadata.placeholder)!==undefined:settings.autoplay;}},is:{video:function video(){return module.get.type()=='video';}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.embed.settings={name:'Embed',namespace:'embed',silent:false,debug:false,verbose:false,performance:true,icon:false,source:false,url:false,id:false,// standard video settings
autoplay:'auto',color:'#444444',hd:true,brandedUI:false,// additional parameters to include with the embed
parameters:false,onDisplay:function onDisplay(){},onPlaceholderDisplay:function onPlaceholderDisplay(){},onReset:function onReset(){},onCreate:function onCreate(url){},onEmbed:function onEmbed(parameters){return parameters;},metadata:{id:'id',icon:'icon',placeholder:'placeholder',source:'source',url:'url'},error:{noURL:'No URL specified',method:'The method you called is not defined'},className:{active:'active',embed:'embed'},selector:{embed:'.embed',placeholder:'.placeholder',icon:'.icon'},sources:{youtube:{name:'youtube',type:'video',icon:'video play',domain:'youtube.com',url:'//www.youtube.com/embed/{id}',parameters:function parameters(settings){return{autohide:!settings.brandedUI,autoplay:settings.autoplay,color:settings.color||undefined,hq:settings.hd,jsapi:settings.api,modestbranding:!settings.brandedUI};}},vimeo:{name:'vimeo',type:'video',icon:'video play',domain:'vimeo.com',url:'//player.vimeo.com/video/{id}',parameters:function parameters(settings){return{api:settings.api,autoplay:settings.autoplay,byline:settings.brandedUI,color:settings.color||undefined,portrait:settings.brandedUI,title:settings.brandedUI};}}},templates:{iframe:function iframe(url,parameters){var src=url;if(parameters){src+='?'+parameters;}return''+'<iframe src="'+src+'"'+' width="100%" height="100%"'+' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';},placeholder:function placeholder(image,icon){var html='';if(icon){html+='<i class="'+icon+' icon"></i>';}if(image){html+='<img class="placeholder" src="'+image+'">';}return html;}},// NOT YET IMPLEMENTED
api:false,onPause:function onPause(){},onPlay:function onPlay(){},onStop:function onStop(){}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Modal
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.modal=function(parameters){var $allModules=$(this),$window=$(window),$document=$(document),$body=$('body'),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);},returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.modal.settings,parameters):$.extend({},$.fn.modal.settings),selector=settings.selector,className=settings.className,namespace=settings.namespace,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$context=$(settings.context),$close=$module.find(selector.close),$allModals,$otherModals,$focusedElement,$dimmable,$dimmer,element=this,instance=$module.data(moduleNamespace),ignoreRepeatedEvents=false,initialMouseDownInModal,initialMouseDownInScrollbar,initialBodyMargin='',tempBodyMargin='',elementEventNamespace,_id2,observer,module;module={initialize:function initialize(){module.cache={};module.verbose('Initializing dimmer',$context);module.create.id();module.create.dimmer();if(settings.allowMultiple){module.create.innerDimmer();}if(!settings.centered){$module.addClass('top aligned');}module.refreshModals();module.bind.events();if(settings.observeChanges){module.observeChanges();}module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of modal');instance=module;$module.data(moduleNamespace,instance);},create:{dimmer:function dimmer(){var defaultSettings={debug:settings.debug,dimmerName:'modals'},dimmerSettings=$.extend(true,defaultSettings,settings.dimmerSettings);if($.fn.dimmer===undefined){module.error(error.dimmer);return;}module.debug('Creating dimmer');$dimmable=$context.dimmer(dimmerSettings);if(settings.detachable){module.verbose('Modal is detachable, moving content into dimmer');$dimmable.dimmer('add content',$module);}else{module.set.undetached();}$dimmer=$dimmable.dimmer('get dimmer');},id:function id(){_id2=(Math.random().toString(16)+'000000000').substr(2,8);elementEventNamespace='.'+_id2;module.verbose('Creating unique id for element',_id2);},innerDimmer:function innerDimmer(){if($module.find(selector.dimmer).length==0){$module.prepend('<div class="ui inverted dimmer"></div>');}}},destroy:function destroy(){if(observer){observer.disconnect();}module.verbose('Destroying previous modal');$module.removeData(moduleNamespace).off(eventNamespace);$window.off(elementEventNamespace);$dimmer.off(elementEventNamespace);$close.off(eventNamespace);$context.dimmer('destroy');},observeChanges:function observeChanges(){if('MutationObserver'in window){observer=new MutationObserver(function(mutations){module.debug('DOM tree modified, refreshing');module.refresh();});observer.observe(element,{childList:true,subtree:true});module.debug('Setting up mutation observer',observer);}},refresh:function refresh(){module.remove.scrolling();module.cacheSizes();if(!module.can.useFlex()){module.set.modalOffset();}module.set.screenHeight();module.set.type();},refreshModals:function refreshModals(){$otherModals=$module.siblings(selector.modal);$allModals=$otherModals.add($module);},attachEvents:function attachEvents(selector,event){var $toggle=$(selector);event=$.isFunction(module[event])?module[event]:module.toggle;if($toggle.length>0){module.debug('Attaching modal events to element',selector,event);$toggle.off(eventNamespace).on('click'+eventNamespace,event);}else{module.error(error.notFound,selector);}},bind:{events:function events(){module.verbose('Attaching events');$module.on('click'+eventNamespace,selector.close,module.event.close).on('click'+eventNamespace,selector.approve,module.event.approve).on('click'+eventNamespace,selector.deny,module.event.deny);$window.on('resize'+elementEventNamespace,module.event.resize);},scrollLock:function scrollLock(){// touch events default to passive, due to changes in chrome to optimize mobile perf
$dimmable.get(0).addEventListener('touchmove',module.event.preventScroll,{passive:false});}},unbind:{scrollLock:function scrollLock(){$dimmable.get(0).removeEventListener('touchmove',module.event.preventScroll,{passive:false});}},get:{id:function id(){return(Math.random().toString(16)+'000000000').substr(2,8);}},event:{approve:function approve(){if(ignoreRepeatedEvents||settings.onApprove.call(element,$(this))===false){module.verbose('Approve callback returned false cancelling hide');return;}ignoreRepeatedEvents=true;module.hide(function(){ignoreRepeatedEvents=false;});},preventScroll:function preventScroll(event){if(event.target.className.indexOf('dimmer')!==-1){event.preventDefault();}},deny:function deny(){if(ignoreRepeatedEvents||settings.onDeny.call(element,$(this))===false){module.verbose('Deny callback returned false cancelling hide');return;}ignoreRepeatedEvents=true;module.hide(function(){ignoreRepeatedEvents=false;});},close:function close(){module.hide();},mousedown:function mousedown(event){var $target=$(event.target),isRtl=module.is.rtl();;initialMouseDownInModal=$target.closest(selector.modal).length>0;if(initialMouseDownInModal){module.verbose('Mouse down event registered inside the modal');}initialMouseDownInScrollbar=module.is.scrolling()&&(!isRtl&&$(window).outerWidth()-settings.scrollbarWidth<=event.clientX||isRtl&&settings.scrollbarWidth>=event.clientX);if(initialMouseDownInScrollbar){module.verbose('Mouse down event registered inside the scrollbar');}},mouseup:function mouseup(event){if(!settings.closable){module.verbose('Dimmer clicked but closable setting is disabled');return;}if(initialMouseDownInModal){module.debug('Dimmer clicked but mouse down was initially registered inside the modal');return;}if(initialMouseDownInScrollbar){module.debug('Dimmer clicked but mouse down was initially registered inside the scrollbar');return;}var $target=$(event.target),isInModal=$target.closest(selector.modal).length>0,isInDOM=$.contains(document.documentElement,event.target);if(!isInModal&&isInDOM&&module.is.active()&&$module.hasClass(className.front)){module.debug('Dimmer clicked, hiding all modals');if(settings.allowMultiple){if(!module.hideAll()){return;}}else if(!module.hide()){return;}module.remove.clickaway();}},debounce:function debounce(method,delay){clearTimeout(module.timer);module.timer=setTimeout(method,delay);},keyboard:function keyboard(event){var keyCode=event.which,escapeKey=27;if(keyCode==escapeKey){if(settings.closable){module.debug('Escape key pressed hiding modal');if($module.hasClass(className.front)){module.hide();}}else{module.debug('Escape key pressed, but closable is set to false');}event.preventDefault();}},resize:function resize(){if($dimmable.dimmer('is active')&&(module.is.animating()||module.is.active())){requestAnimationFrame(module.refresh);}}},toggle:function toggle(){if(module.is.active()||module.is.animating()){module.hide();}else{module.show();}},show:function show(callback){callback=$.isFunction(callback)?callback:function(){};module.refreshModals();module.set.dimmerSettings();module.set.dimmerStyles();module.showModal(callback);},hide:function hide(callback){callback=$.isFunction(callback)?callback:function(){};module.refreshModals();return module.hideModal(callback);},showModal:function showModal(callback){callback=$.isFunction(callback)?callback:function(){};if(module.is.animating()||!module.is.active()){module.showDimmer();module.cacheSizes();module.set.bodyMargin();if(module.can.useFlex()){module.remove.legacy();}else{module.set.legacy();module.set.modalOffset();module.debug('Using non-flex legacy modal positioning.');}module.set.screenHeight();module.set.type();module.set.clickaway();if(!settings.allowMultiple&&module.others.active()){module.hideOthers(module.showModal);}else{ignoreRepeatedEvents=false;if(settings.allowMultiple){if(module.others.active()){$otherModals.filter('.'+className.active).find(selector.dimmer).addClass('active');}if(settings.detachable){$module.detach().appendTo($dimmer);}}settings.onShow.call(element);if(settings.transition&&$.fn.transition!==undefined&&$module.transition('is supported')){module.debug('Showing modal with css animations');$module.transition({debug:settings.debug,animation:settings.transition+' in',queue:settings.queue,duration:settings.duration,useFailSafe:true,onComplete:function onComplete(){settings.onVisible.apply(element);if(settings.keyboardShortcuts){module.add.keyboardShortcuts();}module.save.focus();module.set.active();if(settings.autofocus){module.set.autofocus();}callback();}});}else{module.error(error.noTransition);}}}else{module.debug('Modal is already visible');}},hideModal:function hideModal(callback,keepDimmed,hideOthersToo){var $previousModal=$otherModals.filter('.'+className.active).last();callback=$.isFunction(callback)?callback:function(){};module.debug('Hiding modal');if(settings.onHide.call(element,$(this))===false){module.verbose('Hide callback returned false cancelling hide');ignoreRepeatedEvents=false;return false;}if(module.is.animating()||module.is.active()){if(settings.transition&&$.fn.transition!==undefined&&$module.transition('is supported')){module.remove.active();$module.transition({debug:settings.debug,animation:settings.transition+' out',queue:settings.queue,duration:settings.duration,useFailSafe:true,onStart:function onStart(){if(!module.others.active()&&!module.others.animating()&&!keepDimmed){module.hideDimmer();}if(settings.keyboardShortcuts&&!module.others.active()){module.remove.keyboardShortcuts();}},onComplete:function onComplete(){module.unbind.scrollLock();if(settings.allowMultiple){$previousModal.addClass(className.front);$module.removeClass(className.front);if(hideOthersToo){$allModals.find(selector.dimmer).removeClass('active');}else{$previousModal.find(selector.dimmer).removeClass('active');}}settings.onHidden.call(element);module.remove.dimmerStyles();module.restore.focus();callback();}});}else{module.error(error.noTransition);}}},showDimmer:function showDimmer(){if($dimmable.dimmer('is animating')||!$dimmable.dimmer('is active')){module.save.bodyMargin();module.debug('Showing dimmer');$dimmable.dimmer('show');}else{module.debug('Dimmer already visible');}},hideDimmer:function hideDimmer(){if($dimmable.dimmer('is animating')||$dimmable.dimmer('is active')){module.unbind.scrollLock();$dimmable.dimmer('hide',function(){module.restore.bodyMargin();module.remove.clickaway();module.remove.screenHeight();});}else{module.debug('Dimmer is not visible cannot hide');return;}},hideAll:function hideAll(callback){var $visibleModals=$allModals.filter('.'+className.active+', .'+className.animating);callback=$.isFunction(callback)?callback:function(){};if($visibleModals.length>0){module.debug('Hiding all visible modals');var hideOk=true;//check in reverse order trying to hide most top displayed modal first
$($visibleModals.get().reverse()).each(function(index,element){if(hideOk){hideOk=$(element).modal('hide modal',callback,false,true);}});if(hideOk){module.hideDimmer();}return hideOk;}},hideOthers:function hideOthers(callback){var $visibleModals=$otherModals.filter('.'+className.active+', .'+className.animating);callback=$.isFunction(callback)?callback:function(){};if($visibleModals.length>0){module.debug('Hiding other modals',$otherModals);$visibleModals.modal('hide modal',callback,true);}},others:{active:function active(){return $otherModals.filter('.'+className.active).length>0;},animating:function animating(){return $otherModals.filter('.'+className.animating).length>0;}},add:{keyboardShortcuts:function keyboardShortcuts(){module.verbose('Adding keyboard shortcuts');$document.on('keyup'+eventNamespace,module.event.keyboard);}},save:{focus:function focus(){var $activeElement=$(document.activeElement),inCurrentModal=$activeElement.closest($module).length>0;if(!inCurrentModal){$focusedElement=$(document.activeElement).blur();}},bodyMargin:function bodyMargin(){initialBodyMargin=$body.css('margin-'+(module.can.leftBodyScrollbar()?'left':'right'));var bodyMarginRightPixel=parseInt(initialBodyMargin.replace(/[^\d.]/g,'')),bodyScrollbarWidth=window.innerWidth-document.documentElement.clientWidth;tempBodyMargin=bodyMarginRightPixel+bodyScrollbarWidth;}},restore:{focus:function focus(){if($focusedElement&&$focusedElement.length>0&&settings.restoreFocus){$focusedElement.focus();}},bodyMargin:function bodyMargin(){var position=module.can.leftBodyScrollbar()?'left':'right';$body.css('margin-'+position,initialBodyMargin);$body.find(selector.bodyFixed.replace('right',position)).css('padding-'+position,initialBodyMargin);}},remove:{active:function active(){$module.removeClass(className.active);},legacy:function legacy(){$module.removeClass(className.legacy);},clickaway:function clickaway(){if(!settings.detachable){$module.off('mousedown'+elementEventNamespace);}$dimmer.off('mousedown'+elementEventNamespace);$dimmer.off('mouseup'+elementEventNamespace);},dimmerStyles:function dimmerStyles(){$dimmer.removeClass(className.inverted);$dimmable.removeClass(className.blurring);},bodyStyle:function bodyStyle(){if($body.attr('style')===''){module.verbose('Removing style attribute');$body.removeAttr('style');}},screenHeight:function screenHeight(){module.debug('Removing page height');$body.css('height','');},keyboardShortcuts:function keyboardShortcuts(){module.verbose('Removing keyboard shortcuts');$document.off('keyup'+eventNamespace);},scrolling:function scrolling(){$dimmable.removeClass(className.scrolling);$module.removeClass(className.scrolling);}},cacheSizes:function cacheSizes(){$module.addClass(className.loading);var scrollHeight=$module.prop('scrollHeight'),modalWidth=$module.outerWidth(),modalHeight=$module.outerHeight();if(module.cache.pageHeight===undefined||modalHeight!==0){$.extend(module.cache,{pageHeight:$(document).outerHeight(),width:modalWidth,height:modalHeight+settings.offset,scrollHeight:scrollHeight+settings.offset,contextHeight:settings.context=='body'?$(window).height():$dimmable.height()});module.cache.topOffset=-(module.cache.height/2);}$module.removeClass(className.loading);module.debug('Caching modal and container sizes',module.cache);},can:{leftBodyScrollbar:function leftBodyScrollbar(){if(module.cache.leftBodyScrollbar===undefined){module.cache.leftBodyScrollbar=module.is.rtl()&&(module.is.iframe&&!module.is.firefox()||module.is.safari()||module.is.edge()||module.is.ie());}return module.cache.leftBodyScrollbar;},useFlex:function useFlex(){return settings.useFlex&&settings.detachable&&!module.is.ie();},fit:function fit(){var contextHeight=module.cache.contextHeight,verticalCenter=module.cache.contextHeight/2,topOffset=module.cache.topOffset,scrollHeight=module.cache.scrollHeight,height=module.cache.height,paddingHeight=settings.padding,startPosition=verticalCenter+topOffset;return scrollHeight>height?startPosition+scrollHeight+paddingHeight<contextHeight:height+paddingHeight*2<contextHeight;}},is:{active:function active(){return $module.hasClass(className.active);},ie:function ie(){if(module.cache.isIE===undefined){var isIE11=!window.ActiveXObject&&'ActiveXObject'in window,isIE=('ActiveXObject'in window);module.cache.isIE=isIE11||isIE;}return module.cache.isIE;},animating:function animating(){return $module.transition('is supported')?$module.transition('is animating'):$module.is(':visible');},scrolling:function scrolling(){return $dimmable.hasClass(className.scrolling);},modernBrowser:function modernBrowser(){// appName for IE11 reports 'Netscape' can no longer use
return!(window.ActiveXObject||'ActiveXObject'in window);},rtl:function rtl(){if(module.cache.isRTL===undefined){module.cache.isRTL=$body.attr('dir')==='rtl'||$body.css('direction')==='rtl';}return module.cache.isRTL;},safari:function safari(){if(module.cache.isSafari===undefined){module.cache.isSafari=/constructor/i.test(window.HTMLElement)||!!window.ApplePaySession;}return module.cache.isSafari;},edge:function edge(){if(module.cache.isEdge===undefined){module.cache.isEdge=!!window.setImmediate&&!module.is.ie();}return module.cache.isEdge;},firefox:function firefox(){if(module.cache.isFirefox===undefined){module.cache.isFirefox=!!window.InstallTrigger;}return module.cache.isFirefox;},iframe:function iframe(){return!(self===top);}},set:{autofocus:function autofocus(){var $inputs=$module.find('[tabindex], :input').filter(':visible').filter(function(){return $(this).closest('.disabled').length===0;}),$autofocus=$inputs.filter('[autofocus]'),$input=$autofocus.length>0?$autofocus.first():$inputs.first();if($input.length>0){$input.focus();}},bodyMargin:function bodyMargin(){var position=module.can.leftBodyScrollbar()?'left':'right';if(settings.detachable||module.can.fit()){$body.css('margin-'+position,tempBodyMargin+'px');}$body.find(selector.bodyFixed.replace('right',position)).css('padding-'+position,tempBodyMargin+'px');},clickaway:function clickaway(){if(!settings.detachable){$module.on('mousedown'+elementEventNamespace,module.event.mousedown);}$dimmer.on('mousedown'+elementEventNamespace,module.event.mousedown);$dimmer.on('mouseup'+elementEventNamespace,module.event.mouseup);},dimmerSettings:function dimmerSettings(){if($.fn.dimmer===undefined){module.error(error.dimmer);return;}var defaultSettings={debug:settings.debug,dimmerName:'modals',closable:'auto',useFlex:module.can.useFlex(),duration:{show:settings.duration,hide:settings.duration}},dimmerSettings=$.extend(true,defaultSettings,settings.dimmerSettings);if(settings.inverted){dimmerSettings.variation=dimmerSettings.variation!==undefined?dimmerSettings.variation+' inverted':'inverted';}$context.dimmer('setting',dimmerSettings);},dimmerStyles:function dimmerStyles(){if(settings.inverted){$dimmer.addClass(className.inverted);}else{$dimmer.removeClass(className.inverted);}if(settings.blurring){$dimmable.addClass(className.blurring);}else{$dimmable.removeClass(className.blurring);}},modalOffset:function modalOffset(){if(!settings.detachable){var canFit=module.can.fit();$module.css({top:!$module.hasClass('aligned')&&canFit?$(document).scrollTop()+(module.cache.contextHeight-module.cache.height)/2:!canFit||$module.hasClass('top')?$(document).scrollTop()+settings.padding:$(document).scrollTop()+(module.cache.contextHeight-module.cache.height-settings.padding),marginLeft:-(module.cache.width/2)});}else{$module.css({marginTop:!$module.hasClass('aligned')&&module.can.fit()?-(module.cache.height/2):settings.padding/2,marginLeft:-(module.cache.width/2)});}module.verbose('Setting modal offset for legacy mode');},screenHeight:function screenHeight(){if(module.can.fit()){$body.css('height','');}else if(!$module.hasClass('bottom')){module.debug('Modal is taller than page content, resizing page height');$body.css('height',module.cache.height+settings.padding*2);}},active:function active(){$module.addClass(className.active+' '+className.front);$otherModals.filter('.'+className.active).removeClass(className.front);},scrolling:function scrolling(){$dimmable.addClass(className.scrolling);$module.addClass(className.scrolling);module.unbind.scrollLock();},legacy:function legacy(){$module.addClass(className.legacy);},type:function type(){if(module.can.fit()){module.verbose('Modal fits on screen');if(!module.others.active()&&!module.others.animating()){module.remove.scrolling();module.bind.scrollLock();}}else if(!$module.hasClass('bottom')){module.verbose('Modal cannot fit on screen setting to scrolling');module.set.scrolling();}else{module.verbose('Bottom aligned modal not fitting on screen is unsupported for scrolling');}},undetached:function undetached(){$dimmable.addClass(className.undetached);}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.modal.settings={name:'Modal',namespace:'modal',useFlex:'auto',offset:0,silent:false,debug:false,verbose:false,performance:true,observeChanges:false,allowMultiple:false,detachable:true,closable:true,autofocus:true,restoreFocus:true,inverted:false,blurring:false,centered:true,dimmerSettings:{closable:false,useCSS:true},// whether to use keyboard shortcuts
keyboardShortcuts:true,context:'body',queue:false,duration:500,transition:'scale',// padding with edge of page
padding:50,scrollbarWidth:10,// called before show animation
onShow:function onShow(){},// called after show animation
onVisible:function onVisible(){},// called before hide animation
onHide:function onHide(){return true;},// called after hide animation
onHidden:function onHidden(){},// called after approve selector match
onApprove:function onApprove(){return true;},// called after deny selector match
onDeny:function onDeny(){return true;},selector:{close:'> .close',approve:'.actions .positive, .actions .approve, .actions .ok',deny:'.actions .negative, .actions .deny, .actions .cancel',modal:'.ui.modal',dimmer:'> .ui.dimmer',bodyFixed:'> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar'},error:{dimmer:'UI Dimmer, a required component is not included in this page',method:'The method you called is not defined.',notFound:'The element you specified could not be found'},className:{active:'active',animating:'animating',blurring:'blurring',inverted:'inverted',legacy:'legacy',loading:'loading',scrolling:'scrolling',undetached:'undetached',front:'front'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Nag
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.nag=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.nag.settings,parameters):$.extend({},$.fn.nag.settings),selector=settings.selector,error=settings.error,namespace=settings.namespace,eventNamespace='.'+namespace,moduleNamespace=namespace+'-module',$module=$(this),$context=settings.context?$(settings.context):$('body'),element=this,instance=$module.data(moduleNamespace),module;module={initialize:function initialize(){module.verbose('Initializing element');$module.on('click'+eventNamespace,selector.close,module.dismiss).data(moduleNamespace,module);if(settings.detachable&&$module.parent()[0]!==$context[0]){$module.detach().prependTo($context);}if(settings.displayTime>0){setTimeout(module.hide,settings.displayTime);}module.show();},destroy:function destroy(){module.verbose('Destroying instance');$module.removeData(moduleNamespace).off(eventNamespace);},show:function show(){if(module.should.show()&&!$module.is(':visible')){module.debug('Showing nag',settings.animation.show);if(settings.animation.show=='fade'){$module.fadeIn(settings.duration,settings.easing);}else{$module.slideDown(settings.duration,settings.easing);}}},hide:function hide(){module.debug('Showing nag',settings.animation.hide);if(settings.animation.show=='fade'){$module.fadeIn(settings.duration,settings.easing);}else{$module.slideUp(settings.duration,settings.easing);}},onHide:function onHide(){module.debug('Removing nag',settings.animation.hide);$module.remove();if(settings.onHide){settings.onHide();}},dismiss:function dismiss(event){if(settings.storageMethod){module.storage.set(settings.key,settings.value);}module.hide();event.stopImmediatePropagation();event.preventDefault();},should:{show:function show(){if(settings.persist){module.debug('Persistent nag is set, can show nag');return true;}if(module.storage.get(settings.key)!=settings.value.toString()){module.debug('Stored value is not set, can show nag',module.storage.get(settings.key));return true;}module.debug('Stored value is set, cannot show nag',module.storage.get(settings.key));return false;}},get:{storageOptions:function storageOptions(){var options={};if(settings.expires){options.expires=settings.expires;}if(settings.domain){options.domain=settings.domain;}if(settings.path){options.path=settings.path;}return options;}},clear:function clear(){module.storage.remove(settings.key);},storage:{set:function set(key,value){var options=module.get.storageOptions();if(settings.storageMethod=='localstorage'&&window.localStorage!==undefined){window.localStorage.setItem(key,value);module.debug('Value stored using local storage',key,value);}else if(settings.storageMethod=='sessionstorage'&&window.sessionStorage!==undefined){window.sessionStorage.setItem(key,value);module.debug('Value stored using session storage',key,value);}else if($.cookie!==undefined){$.cookie(key,value,options);module.debug('Value stored using cookie',key,value,options);}else{module.error(error.noCookieStorage);return;}},get:function get(key,value){var storedValue;if(settings.storageMethod=='localstorage'&&window.localStorage!==undefined){storedValue=window.localStorage.getItem(key);}else if(settings.storageMethod=='sessionstorage'&&window.sessionStorage!==undefined){storedValue=window.sessionStorage.getItem(key);}// get by cookie
else if($.cookie!==undefined){storedValue=$.cookie(key);}else{module.error(error.noCookieStorage);}if(storedValue=='undefined'||storedValue=='null'||storedValue===undefined||storedValue===null){storedValue=undefined;}return storedValue;},remove:function remove(key){var options=module.get.storageOptions();if(settings.storageMethod=='localstorage'&&window.localStorage!==undefined){window.localStorage.removeItem(key);}else if(settings.storageMethod=='sessionstorage'&&window.sessionStorage!==undefined){window.sessionStorage.removeItem(key);}// store by cookie
else if($.cookie!==undefined){$.removeCookie(key,options);}else{module.error(error.noStorage);}}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.nag.settings={name:'Nag',silent:false,debug:false,verbose:false,performance:true,namespace:'Nag',// allows cookie to be overridden
persist:false,// set to zero to require manually dismissal, otherwise hides on its own
displayTime:0,animation:{show:'slide',hide:'slide'},context:false,detachable:false,expires:30,domain:false,path:'/',// type of storage to use
storageMethod:'cookie',// value to store in dismissed localstorage/cookie
key:'nag',value:'dismiss',error:{noCookieStorage:'$.cookie is not included. A storage solution is required.',noStorage:'Neither $.cookie or store is defined. A storage solution is required for storing state',method:'The method you called is not defined.'},className:{bottom:'bottom',fixed:'fixed'},selector:{close:'.close.icon'},speed:500,easing:'easeOutQuad',onHide:function onHide(){}};// Adds easing
$.extend($.easing,{easeOutQuad:function easeOutQuad(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;}});})(jQuery,window,document);/*!
 * # Fomantic-UI - Popup
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.popup=function(parameters){var $allModules=$(this),$document=$(document),$window=$(window),$body=$('body'),moduleSelector=$allModules.selector||'',clickEvent='ontouchstart'in document.documentElement?'touchstart':'click',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.popup.settings,parameters):$.extend({},$.fn.popup.settings),selector=settings.selector,className=settings.className,error=settings.error,metadata=settings.metadata,namespace=settings.namespace,eventNamespace='.'+settings.namespace,moduleNamespace='module-'+namespace,$module=$(this),$context=$(settings.context),$scrollContext=$(settings.scrollContext),$boundary=$(settings.boundary),$target=settings.target?$(settings.target):$module,$popup,$offsetParent,searchDepth=0,triedPositions=false,openedWithTouch=false,element=this,instance=$module.data(moduleNamespace),documentObserver,elementNamespace,_id3,module;module={// binds events
initialize:function initialize(){module.debug('Initializing',$module);module.createID();module.bind.events();if(!module.exists()&&settings.preserve){module.create();}if(settings.observeChanges){module.observeChanges();}module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance',module);instance=module;$module.data(moduleNamespace,instance);},observeChanges:function observeChanges(){if('MutationObserver'in window){documentObserver=new MutationObserver(module.event.documentChanged);documentObserver.observe(document,{childList:true,subtree:true});module.debug('Setting up mutation observer',documentObserver);}},refresh:function refresh(){if(settings.popup){$popup=$(settings.popup).eq(0);}else{if(settings.inline){$popup=$target.nextAll(selector.popup).eq(0);settings.popup=$popup;}}if(settings.popup){$popup.addClass(className.loading);$offsetParent=module.get.offsetParent();$popup.removeClass(className.loading);if(settings.movePopup&&module.has.popup()&&module.get.offsetParent($popup)[0]!==$offsetParent[0]){module.debug('Moving popup to the same offset parent as target');$popup.detach().appendTo($offsetParent);}}else{$offsetParent=settings.inline?module.get.offsetParent($target):module.has.popup()?module.get.offsetParent($popup):$body;}if($offsetParent.is('html')&&$offsetParent[0]!==$body[0]){module.debug('Setting page as offset parent');$offsetParent=$body;}if(module.get.variation()){module.set.variation();}},reposition:function reposition(){module.refresh();module.set.position();},destroy:function destroy(){module.debug('Destroying previous module');if(documentObserver){documentObserver.disconnect();}// remove element only if was created dynamically
if($popup&&!settings.preserve){module.removePopup();}// clear all timeouts
clearTimeout(module.hideTimer);clearTimeout(module.showTimer);// remove events
module.unbind.close();module.unbind.events();$module.removeData(moduleNamespace);},event:{start:function start(event){var delay=$.isPlainObject(settings.delay)?settings.delay.show:settings.delay;clearTimeout(module.hideTimer);if(!openedWithTouch||openedWithTouch&&settings.addTouchEvents){module.showTimer=setTimeout(module.show,delay);}},end:function end(){var delay=$.isPlainObject(settings.delay)?settings.delay.hide:settings.delay;clearTimeout(module.showTimer);module.hideTimer=setTimeout(module.hide,delay);},touchstart:function touchstart(event){openedWithTouch=true;if(settings.addTouchEvents){module.show();}},resize:function resize(){if(module.is.visible()){module.set.position();}},documentChanged:function documentChanged(mutations){[].forEach.call(mutations,function(mutation){if(mutation.removedNodes){[].forEach.call(mutation.removedNodes,function(node){if(node==element||$(node).find(element).length>0){module.debug('Element removed from DOM, tearing down events');module.destroy();}});}});},hideGracefully:function hideGracefully(event){var $target=$(event.target),isInDOM=$.contains(document.documentElement,event.target),inPopup=$target.closest(selector.popup).length>0;// don't close on clicks inside popup
if(event&&!inPopup&&isInDOM){module.debug('Click occurred outside popup hiding popup');module.hide();}else{module.debug('Click was inside popup, keeping popup open');}}},// generates popup html from metadata
create:function create(){var html=module.get.html(),title=module.get.title(),content=module.get.content();if(html||content||title){module.debug('Creating pop-up html');if(!html){html=settings.templates.popup({title:title,content:content});}$popup=$('<div/>').addClass(className.popup).data(metadata.activator,$module).html(html);if(settings.inline){module.verbose('Inserting popup element inline',$popup);$popup.insertAfter($module);}else{module.verbose('Appending popup element to body',$popup);$popup.appendTo($context);}module.refresh();module.set.variation();if(settings.hoverable){module.bind.popup();}settings.onCreate.call($popup,element);}else if(settings.popup){$(settings.popup).data(metadata.activator,$module);module.verbose('Used popup specified in settings');module.refresh();if(settings.hoverable){module.bind.popup();}}else if($target.next(selector.popup).length!==0){module.verbose('Pre-existing popup found');settings.inline=true;settings.popup=$target.next(selector.popup).data(metadata.activator,$module);module.refresh();if(settings.hoverable){module.bind.popup();}}else{module.debug('No content specified skipping display',element);}},createID:function createID(){_id3=(Math.random().toString(16)+'000000000').substr(2,8);elementNamespace='.'+_id3;module.verbose('Creating unique id for element',_id3);},// determines popup state
toggle:function toggle(){module.debug('Toggling pop-up');if(module.is.hidden()){module.debug('Popup is hidden, showing pop-up');module.unbind.close();module.show();}else{module.debug('Popup is visible, hiding pop-up');module.hide();}},show:function show(callback){callback=callback||function(){};module.debug('Showing pop-up',settings.transition);if(module.is.hidden()&&!(module.is.active()&&module.is.dropdown())){if(!module.exists()){module.create();}if(settings.onShow.call($popup,element)===false){module.debug('onShow callback returned false, cancelling popup animation');return;}else if(!settings.preserve&&!settings.popup){module.refresh();}if($popup&&module.set.position()){module.save.conditions();if(settings.exclusive){module.hideAll();}module.animate.show(callback);}}},hide:function hide(callback){callback=callback||function(){};if(module.is.visible()||module.is.animating()){if(settings.onHide.call($popup,element)===false){module.debug('onHide callback returned false, cancelling popup animation');return;}module.remove.visible();module.unbind.close();module.restore.conditions();module.animate.hide(callback);}},hideAll:function hideAll(){$(selector.popup).filter('.'+className.popupVisible).each(function(){$(this).data(metadata.activator).popup('hide');});},exists:function exists(){if(!$popup){return false;}if(settings.inline||settings.popup){return module.has.popup();}else{return $popup.closest($context).length>=1?true:false;}},removePopup:function removePopup(){if(module.has.popup()&&!settings.popup){module.debug('Removing popup',$popup);$popup.remove();$popup=undefined;settings.onRemove.call($popup,element);}},save:{conditions:function conditions(){module.cache={title:$module.attr('title')};if(module.cache.title){$module.removeAttr('title');}module.verbose('Saving original attributes',module.cache.title);}},restore:{conditions:function conditions(){if(module.cache&&module.cache.title){$module.attr('title',module.cache.title);module.verbose('Restoring original attributes',module.cache.title);}return true;}},supports:{svg:function svg(){return typeof SVGGraphicsElement!=='undefined';}},animate:{show:function show(callback){callback=$.isFunction(callback)?callback:function(){};if(settings.transition&&$.fn.transition!==undefined&&$module.transition('is supported')){module.set.visible();$popup.transition({animation:settings.transition+' in',queue:false,debug:settings.debug,verbose:settings.verbose,duration:settings.duration,onComplete:function onComplete(){module.bind.close();callback.call($popup,element);settings.onVisible.call($popup,element);}});}else{module.error(error.noTransition);}},hide:function hide(callback){callback=$.isFunction(callback)?callback:function(){};module.debug('Hiding pop-up');if(settings.transition&&$.fn.transition!==undefined&&$module.transition('is supported')){$popup.transition({animation:settings.transition+' out',queue:false,duration:settings.duration,debug:settings.debug,verbose:settings.verbose,onComplete:function onComplete(){module.reset();callback.call($popup,element);settings.onHidden.call($popup,element);}});}else{module.error(error.noTransition);}}},change:{content:function content(html){$popup.html(html);}},get:{html:function html(){$module.removeData(metadata.html);return $module.data(metadata.html)||settings.html;},title:function title(){$module.removeData(metadata.title);return $module.data(metadata.title)||settings.title;},content:function content(){$module.removeData(metadata.content);return $module.data(metadata.content)||settings.content||$module.attr('title');},variation:function variation(){$module.removeData(metadata.variation);return $module.data(metadata.variation)||settings.variation;},popup:function popup(){return $popup;},popupOffset:function popupOffset(){return $popup.offset();},calculations:function calculations(){var $popupOffsetParent=module.get.offsetParent($popup),targetElement=$target[0],isWindow=$boundary[0]==window,targetPosition=settings.inline||settings.popup&&settings.movePopup?$target.position():$target.offset(),screenPosition=isWindow?{top:0,left:0}:$boundary.offset(),calculations={},scroll=isWindow?{top:$window.scrollTop(),left:$window.scrollLeft()}:{top:0,left:0},screen;calculations={// element which is launching popup
target:{element:$target[0],width:$target.outerWidth(),height:$target.outerHeight(),top:targetPosition.top,left:targetPosition.left,margin:{}},// popup itself
popup:{width:$popup.outerWidth(),height:$popup.outerHeight()},// offset container (or 3d context)
parent:{width:$offsetParent.outerWidth(),height:$offsetParent.outerHeight()},// screen boundaries
screen:{top:screenPosition.top,left:screenPosition.left,scroll:{top:scroll.top,left:scroll.left},width:$boundary.width(),height:$boundary.height()}};// if popup offset context is not same as target, then adjust calculations
if($popupOffsetParent.get(0)!==$offsetParent.get(0)){var popupOffset=$popupOffsetParent.offset();calculations.target.top-=popupOffset.top;calculations.target.left-=popupOffset.left;calculations.parent.width=$popupOffsetParent.outerWidth();calculations.parent.height=$popupOffsetParent.outerHeight();}// add in container calcs if fluid
if(settings.setFluidWidth&&module.is.fluid()){calculations.container={width:$popup.parent().outerWidth()};calculations.popup.width=calculations.container.width;}// add in margins if inline
calculations.target.margin.top=settings.inline?parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-top'),10):0;calculations.target.margin.left=settings.inline?module.is.rtl()?parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-right'),10):parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-left'),10):0;// calculate screen boundaries
screen=calculations.screen;calculations.boundary={top:screen.top+screen.scroll.top,bottom:screen.top+screen.scroll.top+screen.height,left:screen.left+screen.scroll.left,right:screen.left+screen.scroll.left+screen.width};return calculations;},id:function id(){return _id3;},startEvent:function startEvent(){if(settings.on=='hover'){return'mouseenter';}else if(settings.on=='focus'){return'focus';}return false;},scrollEvent:function scrollEvent(){return'scroll';},endEvent:function endEvent(){if(settings.on=='hover'){return'mouseleave';}else if(settings.on=='focus'){return'blur';}return false;},distanceFromBoundary:function distanceFromBoundary(offset,calculations){var distanceFromBoundary={},popup,boundary;calculations=calculations||module.get.calculations();// shorthand
popup=calculations.popup;boundary=calculations.boundary;if(offset){distanceFromBoundary={top:offset.top-boundary.top,left:offset.left-boundary.left,right:boundary.right-(offset.left+popup.width),bottom:boundary.bottom-(offset.top+popup.height)};module.verbose('Distance from boundaries determined',offset,distanceFromBoundary);}return distanceFromBoundary;},offsetParent:function offsetParent($element){var element=$element!==undefined?$element[0]:$target[0],parentNode=element.parentNode,$node=$(parentNode);if(parentNode){var is2D=$node.css('transform')==='none',isStatic=$node.css('position')==='static',isBody=$node.is('body');while(parentNode&&!isBody&&isStatic&&is2D){parentNode=parentNode.parentNode;$node=$(parentNode);is2D=$node.css('transform')==='none';isStatic=$node.css('position')==='static';isBody=$node.is('body');}}return $node&&$node.length>0?$node:$();},positions:function positions(){return{'top left':false,'top center':false,'top right':false,'bottom left':false,'bottom center':false,'bottom right':false,'left center':false,'right center':false};},nextPosition:function nextPosition(position){var positions=position.split(' '),verticalPosition=positions[0],horizontalPosition=positions[1],opposite={top:'bottom',bottom:'top',left:'right',right:'left'},adjacent={left:'center',center:'right',right:'left'},backup={'top left':'top center','top center':'top right','top right':'right center','right center':'bottom right','bottom right':'bottom center','bottom center':'bottom left','bottom left':'left center','left center':'top left'},adjacentsAvailable=verticalPosition=='top'||verticalPosition=='bottom',oppositeTried=false,adjacentTried=false,nextPosition=false;if(!triedPositions){module.verbose('All available positions available');triedPositions=module.get.positions();}module.debug('Recording last position tried',position);triedPositions[position]=true;if(settings.prefer==='opposite'){nextPosition=[opposite[verticalPosition],horizontalPosition];nextPosition=nextPosition.join(' ');oppositeTried=triedPositions[nextPosition]===true;module.debug('Trying opposite strategy',nextPosition);}if(settings.prefer==='adjacent'&&adjacentsAvailable){nextPosition=[verticalPosition,adjacent[horizontalPosition]];nextPosition=nextPosition.join(' ');adjacentTried=triedPositions[nextPosition]===true;module.debug('Trying adjacent strategy',nextPosition);}if(adjacentTried||oppositeTried){module.debug('Using backup position',nextPosition);nextPosition=backup[position];}return nextPosition;}},set:{position:function position(_position,calculations){// exit conditions
if($target.length===0||$popup.length===0){module.error(error.notFound);return;}var offset,distanceAway,target,popup,parent,positioning,popupOffset,distanceFromBoundary;calculations=calculations||module.get.calculations();_position=_position||$module.data(metadata.position)||settings.position;offset=$module.data(metadata.offset)||settings.offset;distanceAway=settings.distanceAway;// shorthand
target=calculations.target;popup=calculations.popup;parent=calculations.parent;if(module.should.centerArrow(calculations)){module.verbose('Adjusting offset to center arrow on small target element');if(_position=='top left'||_position=='bottom left'){offset+=target.width/2;offset-=settings.arrowPixelsFromEdge;}if(_position=='top right'||_position=='bottom right'){offset-=target.width/2;offset+=settings.arrowPixelsFromEdge;}}if(target.width===0&&target.height===0&&!module.is.svg(target.element)){module.debug('Popup target is hidden, no action taken');return false;}if(settings.inline){module.debug('Adding margin to calculation',target.margin);if(_position=='left center'||_position=='right center'){offset+=target.margin.top;distanceAway+=-target.margin.left;}else if(_position=='top left'||_position=='top center'||_position=='top right'){offset+=target.margin.left;distanceAway-=target.margin.top;}else{offset+=target.margin.left;distanceAway+=target.margin.top;}}module.debug('Determining popup position from calculations',_position,calculations);if(module.is.rtl()){_position=_position.replace(/left|right/g,function(match){return match=='left'?'right':'left';});module.debug('RTL: Popup position updated',_position);}// if last attempt use specified last resort position
if(searchDepth==settings.maxSearchDepth&&typeof settings.lastResort==='string'){_position=settings.lastResort;}switch(_position){case'top left':positioning={top:'auto',bottom:parent.height-target.top+distanceAway,left:target.left+offset,right:'auto'};break;case'top center':positioning={bottom:parent.height-target.top+distanceAway,left:target.left+target.width/2-popup.width/2+offset,top:'auto',right:'auto'};break;case'top right':positioning={bottom:parent.height-target.top+distanceAway,right:parent.width-target.left-target.width-offset,top:'auto',left:'auto'};break;case'left center':positioning={top:target.top+target.height/2-popup.height/2+offset,right:parent.width-target.left+distanceAway,left:'auto',bottom:'auto'};break;case'right center':positioning={top:target.top+target.height/2-popup.height/2+offset,left:target.left+target.width+distanceAway,bottom:'auto',right:'auto'};break;case'bottom left':positioning={top:target.top+target.height+distanceAway,left:target.left+offset,bottom:'auto',right:'auto'};break;case'bottom center':positioning={top:target.top+target.height+distanceAway,left:target.left+target.width/2-popup.width/2+offset,bottom:'auto',right:'auto'};break;case'bottom right':positioning={top:target.top+target.height+distanceAway,right:parent.width-target.left-target.width-offset,left:'auto',bottom:'auto'};break;}if(positioning===undefined){module.error(error.invalidPosition,_position);}module.debug('Calculated popup positioning values',positioning);// tentatively place on stage
$popup.css(positioning).removeClass(className.position).addClass(_position).addClass(className.loading);popupOffset=module.get.popupOffset();// see if any boundaries are surpassed with this tentative position
distanceFromBoundary=module.get.distanceFromBoundary(popupOffset,calculations);if(!settings.forcePosition&&module.is.offstage(distanceFromBoundary,_position)){module.debug('Position is outside viewport',_position);if(searchDepth<settings.maxSearchDepth){searchDepth++;_position=module.get.nextPosition(_position);module.debug('Trying new position',_position);return $popup?module.set.position(_position,calculations):false;}else{if(settings.lastResort){module.debug('No position found, showing with last position');}else{module.debug('Popup could not find a position to display',$popup);module.error(error.cannotPlace,element);module.remove.attempts();module.remove.loading();module.reset();settings.onUnplaceable.call($popup,element);return false;}}}module.debug('Position is on stage',_position);module.remove.attempts();module.remove.loading();if(settings.setFluidWidth&&module.is.fluid()){module.set.fluidWidth(calculations);}return true;},fluidWidth:function fluidWidth(calculations){calculations=calculations||module.get.calculations();module.debug('Automatically setting element width to parent width',calculations.parent.width);$popup.css('width',calculations.container.width);},variation:function variation(_variation3){_variation3=_variation3||module.get.variation();if(_variation3&&module.has.popup()){module.verbose('Adding variation to popup',_variation3);$popup.addClass(_variation3);}},visible:function visible(){$module.addClass(className.visible);}},remove:{loading:function loading(){$popup.removeClass(className.loading);},variation:function variation(_variation4){_variation4=_variation4||module.get.variation();if(_variation4){module.verbose('Removing variation',_variation4);$popup.removeClass(_variation4);}},visible:function visible(){$module.removeClass(className.visible);},attempts:function attempts(){module.verbose('Resetting all searched positions');searchDepth=0;triedPositions=false;}},bind:{events:function events(){module.debug('Binding popup events to module');if(settings.on=='click'){$module.on(clickEvent+eventNamespace,module.toggle);}if(settings.on=='hover'){$module.on('touchstart'+eventNamespace,module.event.touchstart);}if(module.get.startEvent()){$module.on(module.get.startEvent()+eventNamespace,module.event.start).on(module.get.endEvent()+eventNamespace,module.event.end);}if(settings.target){module.debug('Target set to element',$target);}$window.on('resize'+elementNamespace,module.event.resize);},popup:function popup(){module.verbose('Allowing hover events on popup to prevent closing');if($popup&&module.has.popup()){$popup.on('mouseenter'+eventNamespace,module.event.start).on('mouseleave'+eventNamespace,module.event.end);}},close:function close(){if(settings.hideOnScroll===true||settings.hideOnScroll=='auto'&&settings.on!='click'){module.bind.closeOnScroll();}if(module.is.closable()){module.bind.clickaway();}else if(settings.on=='hover'&&openedWithTouch){module.bind.touchClose();}},closeOnScroll:function closeOnScroll(){module.verbose('Binding scroll close event to document');$scrollContext.one(module.get.scrollEvent()+elementNamespace,module.event.hideGracefully);},touchClose:function touchClose(){module.verbose('Binding popup touchclose event to document');$document.on('touchstart'+elementNamespace,function(event){module.verbose('Touched away from popup');module.event.hideGracefully.call(element,event);});},clickaway:function clickaway(){module.verbose('Binding popup close event to document');$document.on(clickEvent+elementNamespace,function(event){module.verbose('Clicked away from popup');module.event.hideGracefully.call(element,event);});}},unbind:{events:function events(){$window.off(elementNamespace);$module.off(eventNamespace);},close:function close(){$document.off(elementNamespace);$scrollContext.off(elementNamespace);}},has:{popup:function popup(){return $popup&&$popup.length>0;}},should:{centerArrow:function centerArrow(calculations){return!module.is.basic()&&calculations.target.width<=settings.arrowPixelsFromEdge*2;}},is:{closable:function closable(){if(settings.closable=='auto'){if(settings.on=='hover'){return false;}return true;}return settings.closable;},offstage:function offstage(distanceFromBoundary,position){var offstage=[];// return boundaries that have been surpassed
$.each(distanceFromBoundary,function(direction,distance){if(distance<-settings.jitter){module.debug('Position exceeds allowable distance from edge',direction,distance,position);offstage.push(direction);}});if(offstage.length>0){return true;}else{return false;}},svg:function svg(element){return module.supports.svg()&&element instanceof SVGGraphicsElement;},basic:function basic(){return $module.hasClass(className.basic);},active:function active(){return $module.hasClass(className.active);},animating:function animating(){return $popup!==undefined&&$popup.hasClass(className.animating);},fluid:function fluid(){return $popup!==undefined&&$popup.hasClass(className.fluid);},visible:function visible(){return $popup!==undefined&&$popup.hasClass(className.popupVisible);},dropdown:function dropdown(){return $module.hasClass(className.dropdown);},hidden:function hidden(){return!module.is.visible();},rtl:function rtl(){return $module.attr('dir')==='rtl'||$module.css('direction')==='rtl';}},reset:function reset(){module.remove.visible();if(settings.preserve){if($.fn.transition!==undefined){$popup.transition('remove transition');}}else{module.removePopup();}},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){settings[name]=value;}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.popup.settings={name:'Popup',// module settings
silent:false,debug:false,verbose:false,performance:true,namespace:'popup',// whether it should use dom mutation observers
observeChanges:true,// callback only when element added to dom
onCreate:function onCreate(){},// callback before element removed from dom
onRemove:function onRemove(){},// callback before show animation
onShow:function onShow(){},// callback after show animation
onVisible:function onVisible(){},// callback before hide animation
onHide:function onHide(){},// callback when popup cannot be positioned in visible screen
onUnplaceable:function onUnplaceable(){},// callback after hide animation
onHidden:function onHidden(){},// when to show popup
on:'hover',// element to use to determine if popup is out of boundary
boundary:window,// whether to add touchstart events when using hover
addTouchEvents:true,// default position relative to element
position:'top left',// if given position should be used regardless if popup fits
forcePosition:false,// name of variation to use
variation:'',// whether popup should be moved to context
movePopup:true,// element which popup should be relative to
target:false,// jq selector or element that should be used as popup
popup:false,// popup should remain inline next to activator
inline:false,// popup should be removed from page on hide
preserve:false,// popup should not close when being hovered on
hoverable:false,// explicitly set content
content:false,// explicitly set html
html:false,// explicitly set title
title:false,// whether automatically close on clickaway when on click
closable:true,// automatically hide on scroll
hideOnScroll:'auto',// hide other popups on show
exclusive:false,// context to attach popups
context:'body',// context for binding scroll events
scrollContext:window,// position to prefer when calculating new position
prefer:'opposite',// specify position to appear even if it doesn't fit
lastResort:false,// number of pixels from edge of popup to pointing arrow center (used from centering)
arrowPixelsFromEdge:20,// delay used to prevent accidental refiring of animations due to user error
delay:{show:50,hide:70},// whether fluid variation should assign width explicitly
setFluidWidth:true,// transition settings
duration:200,transition:'scale',// distance away from activating element in px
distanceAway:0,// number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
jitter:2,// offset on aligning axis from calculated position
offset:0,// maximum times to look for a position before failing (9 positions total)
maxSearchDepth:15,error:{invalidPosition:'The position you specified is not a valid position',cannotPlace:'Popup does not fit within the boundaries of the viewport',method:'The method you called is not defined.',noTransition:'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',notFound:'The target or popup you specified does not exist on the page'},metadata:{activator:'activator',content:'content',html:'html',offset:'offset',position:'position',title:'title',variation:'variation'},className:{active:'active',basic:'basic',animating:'animating',dropdown:'dropdown',fluid:'fluid',loading:'loading',popup:'ui popup',position:'top left center bottom right',visible:'visible',popupVisible:'visible'},selector:{popup:'.ui.popup'},templates:{escape:function escape(string){var badChars=/[<>"'`]/g,shouldEscape=/[&<>"'`]/,escape={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},escapedChar=function escapedChar(chr){return escape[chr];};if(shouldEscape.test(string)){string=string.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;");return string.replace(badChars,escapedChar);}return string;},popup:function popup(text){var html='',escape=$.fn.popup.settings.templates.escape;if(_typeof(text)!==undefined){if(_typeof(text.title)!==undefined&&text.title){text.title=escape(text.title);html+='<div class="header">'+text.title+'</div>';}if(_typeof(text.content)!==undefined&&text.content){text.content=escape(text.content);html+='<div class="content">'+text.content+'</div>';}}return html;}}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Progress
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.progress=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var _settings3=$.isPlainObject(parameters)?$.extend(true,{},$.fn.progress.settings,parameters):$.extend({},$.fn.progress.settings),className=_settings3.className,_metadata=_settings3.metadata,namespace=_settings3.namespace,selector=_settings3.selector,error=_settings3.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$bars=$(this).find(selector.bar),$progresses=$(this).find(selector.progress),$label=$(this).find(selector.label),element=this,instance=$module.data(moduleNamespace),animating=false,transitionEnd,module;module={helper:{sum:function sum(nums){return Array.isArray(nums)?nums.reduce(function(left,right){return left+Number(right);},0):0;},/**
           * Derive precision for multiple progress with total and values.
           *
           * This helper dervices a precision that is sufficiently large to show minimum value of multiple progress.
           *
           * Example1
           * - total: 1122
           * - values: [325, 111, 74, 612]
           * - min ratio: 74/1122 = 0.0659...
           * - required precision:  100
           *
           * Example2
           * - total: 10541
           * - values: [3235, 1111, 74, 6121]
           * - min ratio: 74/10541 = 0.0070...
           * - required precision:   1000
           *
           * @param min A minimum value within multiple values
           * @param total A total amount of multiple values
           * @returns {number} A precison. Could be 1, 10, 100, ... 1e+10.
           */derivePrecision:function derivePrecision(min,total){var precisionPower=0;var precision=1;var ratio=min/total;while(precisionPower<10){ratio=ratio*precision;if(ratio>1){break;}precision=Math.pow(10,precisionPower++);}return precision;},forceArray:function forceArray(element){return Array.isArray(element)?element:!isNaN(element)?[element]:typeof element=='string'?element.split(','):[];}},initialize:function initialize(){module.set.duration();module.set.transitionEvent();module.debug(element);module.read.metadata();module.read.settings();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of progress',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous progress for',$module);clearInterval(instance.interval);module.remove.state();$module.removeData(moduleNamespace);instance=undefined;},reset:function reset(){module.remove.nextValue();module.update.progress(0);},complete:function complete(keepState){if(module.percent===undefined||module.percent<100){module.remove.progressPoll();if(keepState!==true){module.set.percent(100);}}},read:{metadata:function metadata(){var data={percent:module.helper.forceArray($module.data(_metadata.percent)),total:$module.data(_metadata.total),value:module.helper.forceArray($module.data(_metadata.value))};if(data.total){module.debug('Total value set from metadata',data.total);module.set.total(data.total);}if(data.value.length>0){module.debug('Current value set from metadata',data.value);module.set.value(data.value);module.set.progress(data.value);}if(data.percent.length>0){module.debug('Current percent value set from metadata',data.percent);module.set.percent(data.percent);}},settings:function settings(){if(_settings3.total!==false){module.debug('Current total set in settings',_settings3.total);module.set.total(_settings3.total);}if(_settings3.value!==false){module.debug('Current value set in settings',_settings3.value);module.set.value(_settings3.value);module.set.progress(module.value);}if(_settings3.percent!==false){module.debug('Current percent set in settings',_settings3.percent);module.set.percent(_settings3.percent);}}},bind:{transitionEnd:function transitionEnd(callback){var transitionEnd=module.get.transitionEnd();$bars.one(transitionEnd+eventNamespace,function(event){clearTimeout(module.failSafeTimer);callback.call(this,event);});module.failSafeTimer=setTimeout(function(){$bars.triggerHandler(transitionEnd);},_settings3.duration+_settings3.failSafeDelay);module.verbose('Adding fail safe timer',module.timer);}},increment:function increment(incrementValue){var startValue,newValue;if(module.has.total()){startValue=module.get.value();incrementValue=incrementValue||1;}else{startValue=module.get.percent();incrementValue=incrementValue||module.get.randomValue();}newValue=startValue+incrementValue;module.debug('Incrementing percentage by',startValue,newValue,incrementValue);newValue=module.get.normalizedValue(newValue);module.set.progress(newValue);},decrement:function decrement(decrementValue){var total=module.get.total(),startValue,newValue;if(total){startValue=module.get.value();decrementValue=decrementValue||1;newValue=startValue-decrementValue;module.debug('Decrementing value by',decrementValue,startValue);}else{startValue=module.get.percent();decrementValue=decrementValue||module.get.randomValue();newValue=startValue-decrementValue;module.debug('Decrementing percentage by',decrementValue,startValue);}newValue=module.get.normalizedValue(newValue);module.set.progress(newValue);},has:{progressPoll:function progressPoll(){return module.progressPoll;},total:function total(){return module.get.total()!==false;}},get:{text:function text(templateText,index){var index_=index||0,value=module.get.value(index_),total=module.total||0,percent=animating?module.get.displayPercent(index_):module.get.percent(index_),left=module.total>0?total-value:100-percent;templateText=templateText||'';templateText=templateText.replace('{value}',value).replace('{total}',total).replace('{left}',left).replace('{percent}',percent).replace('{bar}',_settings3.text.bars[index_]||'');module.verbose('Adding variables to progress bar text',templateText);return templateText;},normalizedValue:function normalizedValue(value){if(value<0){module.debug('Value cannot decrement below 0');return 0;}if(module.has.total()){if(value>module.total){module.debug('Value cannot increment above total',module.total);return module.total;}}else if(value>100){module.debug('Value cannot increment above 100 percent');return 100;}return value;},updateInterval:function updateInterval(){if(_settings3.updateInterval=='auto'){return _settings3.duration;}return _settings3.updateInterval;},randomValue:function randomValue(){module.debug('Generating random increment percentage');return Math.floor(Math.random()*_settings3.random.max+_settings3.random.min);},numericValue:function numericValue(value){return typeof value==='string'?value.replace(/[^\d.]/g,'')!==''?+value.replace(/[^\d.]/g,''):false:value;},transitionEnd:function transitionEnd(){var element=document.createElement('element'),transitions={'transition':'transitionend','OTransition':'oTransitionEnd','MozTransition':'transitionend','WebkitTransition':'webkitTransitionEnd'},transition;for(transition in transitions){if(element.style[transition]!==undefined){return transitions[transition];}}},// gets current displayed percentage (if animating values this is the intermediary value)
displayPercent:function displayPercent(index){var $bar=$($bars[index]),barWidth=$bar.width(),totalWidth=$module.width(),minDisplay=parseInt($bar.css('min-width'),10),displayPercent=barWidth>minDisplay?barWidth/totalWidth*100:module.percent;return _settings3.precision>0?Math.round(displayPercent*(10*_settings3.precision))/(10*_settings3.precision):Math.round(displayPercent);},percent:function percent(index){return module.percent&&module.percent[index||0]||0;},value:function value(index){return module.nextValue||module.value&&module.value[index||0]||0;},total:function total(){return module.total||false;}},create:{progressPoll:function progressPoll(){module.progressPoll=setTimeout(function(){module.update.toNextValue();module.remove.progressPoll();},module.get.updateInterval());}},is:{complete:function complete(){return module.is.success()||module.is.warning()||module.is.error();},success:function success(){return $module.hasClass(className.success);},warning:function warning(){return $module.hasClass(className.warning);},error:function error(){return $module.hasClass(className.error);},active:function active(){return $module.hasClass(className.active);},visible:function visible(){return $module.is(':visible');}},remove:{progressPoll:function progressPoll(){module.verbose('Removing progress poll timer');if(module.progressPoll){clearTimeout(module.progressPoll);delete module.progressPoll;}},nextValue:function nextValue(){module.verbose('Removing progress value stored for next update');delete module.nextValue;},state:function state(){module.verbose('Removing stored state');delete module.total;delete module.percent;delete module.value;},active:function active(){module.verbose('Removing active state');$module.removeClass(className.active);},success:function success(){module.verbose('Removing success state');$module.removeClass(className.success);},warning:function warning(){module.verbose('Removing warning state');$module.removeClass(className.warning);},error:function error(){module.verbose('Removing error state');$module.removeClass(className.error);}},set:{barWidth:function barWidth(values){module.debug("set bar width with ",values);values=module.helper.forceArray(values);var firstNonZeroIndex=-1;var lastNonZeroIndex=-1;var valuesSum=module.helper.sum(values);var barCounts=$bars.length;var isMultiple=barCounts>1;var percents=values.map(function(value,index){var allZero=index===barCounts-1&&valuesSum===0;var $bar=$($bars[index]);if(value===0&&isMultiple&&!allZero){$bar.css('display','none');}else{if(isMultiple&&allZero){$bar.css('background','transparent');}if(firstNonZeroIndex==-1){firstNonZeroIndex=index;}lastNonZeroIndex=index;$bar.css({display:'block',width:value+'%'});}return parseFloat(value);});values.forEach(function(_,index){var $bar=$($bars[index]);$bar.css({borderTopLeftRadius:index==firstNonZeroIndex?'':0,borderBottomLeftRadius:index==firstNonZeroIndex?'':0,borderTopRightRadius:index==lastNonZeroIndex?'':0,borderBottomRightRadius:index==lastNonZeroIndex?'':0});});$module.attr('data-percent',percents);},duration:function duration(_duration){_duration=_duration||_settings3.duration;_duration=typeof _duration=='number'?_duration+'ms':_duration;module.verbose('Setting progress bar transition duration',_duration);$bars.css({'transition-duration':_duration});},percent:function percent(percents){percents=module.helper.forceArray(percents).map(function(percent){return typeof percent=='string'?+percent.replace('%',''):percent;});var hasTotal=module.has.total();var totalPecent=module.helper.sum(percents);var isMultpleValues=percents.length>1&&hasTotal;var sumTotal=module.helper.sum(module.helper.forceArray(module.value));if(isMultpleValues&&sumTotal>module.total){// Sum values instead of pecents to avoid precision issues when summing floats
module.error(error.sumExceedsTotal,sumTotal,module.total);}else if(!isMultpleValues&&totalPecent>100){// Sum before rouding since sum of rounded may have error though sum of actual is fine
module.error(error.tooHigh,totalPecent);}else if(totalPecent<0){module.error(error.tooLow,totalPecent);}else{var autoPrecision=_settings3.precision>0?_settings3.precision:isMultpleValues?module.helper.derivePrecision(Math.min.apply(null,module.value),module.total):undefined;// round display percentage
var roundedPercents=percents.map(function(percent){return autoPrecision>0?Math.round(percent*(10*autoPrecision))/(10*autoPrecision):Math.round(percent);});module.percent=roundedPercents;if(!hasTotal){module.value=roundedPercents.map(function(percent){return autoPrecision>0?Math.round(percent/100*module.total*(10*autoPrecision))/(10*autoPrecision):Math.round(percent/100*module.total*10)/10;});if(_settings3.limitValues){module.value=module.value.map(function(value){return value>100?100:module.value<0?0:module.value;});}}module.set.barWidth(percents);module.set.labelInterval();module.set.labels();}_settings3.onChange.call(element,percents,module.value,module.total);},labelInterval:function labelInterval(){var animationCallback=function animationCallback(){module.verbose('Bar finished animating, removing continuous label updates');clearInterval(module.interval);animating=false;module.set.labels();};clearInterval(module.interval);module.bind.transitionEnd(animationCallback);animating=true;module.interval=setInterval(function(){var isInDOM=$.contains(document.documentElement,element);if(!isInDOM){clearInterval(module.interval);animating=false;}module.set.labels();},_settings3.framerate);},labels:function labels(){module.verbose('Setting both bar progress and outer label text');module.set.barLabel();module.set.state();},label:function label(text){text=text||'';if(text){text=module.get.text(text);module.verbose('Setting label to text',text);$label.text(text);}},state:function state(percent){percent=percent!==undefined?percent:module.helper.sum(module.percent);if(percent===100){if(_settings3.autoSuccess&&$bars.length===1&&!(module.is.warning()||module.is.error()||module.is.success())){module.set.success();module.debug('Automatically triggering success at 100%');}else{module.verbose('Reached 100% removing active state');module.remove.active();module.remove.progressPoll();}}else if(percent>0){module.verbose('Adjusting active progress bar label',percent);module.set.active();}else{module.remove.active();module.set.label(_settings3.text.active);}},barLabel:function barLabel(text){$progresses.map(function(index,element){var $progress=$(element);if(text!==undefined){$progress.text(module.get.text(text,index));}else if(_settings3.label=='ratio'&&module.total){module.verbose('Adding ratio to bar label');$progress.text(module.get.text(_settings3.text.ratio,index));}else if(_settings3.label=='percent'){module.verbose('Adding percentage to bar label');$progress.text(module.get.text(_settings3.text.percent,index));}});},active:function active(text){text=text||_settings3.text.active;module.debug('Setting active state');if(_settings3.showActivity&&!module.is.active()){$module.addClass(className.active);}module.remove.warning();module.remove.error();module.remove.success();text=_settings3.onLabelUpdate('active',text,module.value,module.total);if(text){module.set.label(text);}module.bind.transitionEnd(function(){_settings3.onActive.call(element,module.value,module.total);});},success:function success(text,keepState){text=text||_settings3.text.success||_settings3.text.active;module.debug('Setting success state');$module.addClass(className.success);module.remove.active();module.remove.warning();module.remove.error();module.complete(keepState);if(_settings3.text.success){text=_settings3.onLabelUpdate('success',text,module.value,module.total);module.set.label(text);}else{text=_settings3.onLabelUpdate('active',text,module.value,module.total);module.set.label(text);}module.bind.transitionEnd(function(){_settings3.onSuccess.call(element,module.total);});},warning:function warning(text,keepState){text=text||_settings3.text.warning;module.debug('Setting warning state');$module.addClass(className.warning);module.remove.active();module.remove.success();module.remove.error();module.complete(keepState);text=_settings3.onLabelUpdate('warning',text,module.value,module.total);if(text){module.set.label(text);}module.bind.transitionEnd(function(){_settings3.onWarning.call(element,module.value,module.total);});},error:function error(text,keepState){text=text||_settings3.text.error;module.debug('Setting error state');$module.addClass(className.error);module.remove.active();module.remove.success();module.remove.warning();module.complete(keepState);text=_settings3.onLabelUpdate('error',text,module.value,module.total);if(text){module.set.label(text);}module.bind.transitionEnd(function(){_settings3.onError.call(element,module.value,module.total);});},transitionEvent:function transitionEvent(){transitionEnd=module.get.transitionEnd();},total:function total(totalValue){module.total=totalValue;},value:function value(_value5){module.value=module.helper.forceArray(_value5);},progress:function progress(value){if(!module.has.progressPoll()){module.debug('First update in progress update interval, immediately updating',value);module.update.progress(value);module.create.progressPoll();}else{module.debug('Updated within interval, setting next update to use new value',value);module.set.nextValue(value);}},nextValue:function nextValue(value){module.nextValue=value;}},update:{toNextValue:function toNextValue(){var nextValue=module.nextValue;if(nextValue){module.debug('Update interval complete using last updated value',nextValue);module.update.progress(nextValue);module.remove.nextValue();}},progress:function progress(values){var hasTotal=module.has.total();if(hasTotal){module.set.value(values);}var percentCompletes=module.helper.forceArray(values).map(function(value){var percentComplete;value=module.get.numericValue(value);if(value===false){module.error(error.nonNumeric,value);}value=module.get.normalizedValue(value);if(hasTotal){percentComplete=value/module.total*100;module.debug('Calculating percent complete from total',percentComplete);}else{percentComplete=value;module.debug('Setting value to exact percentage value',percentComplete);}return percentComplete;});module.set.percent(percentCompletes);}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,_settings3,name);}else if(value!==undefined){if($.isPlainObject(_settings3[name])){$.extend(true,_settings3[name],value);}else{_settings3[name]=value;}}else{return _settings3[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!_settings3.silent&&_settings3.debug){if(_settings3.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings3.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!_settings3.silent&&_settings3.verbose&&_settings3.debug){if(_settings3.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings3.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!_settings3.silent){module.error=Function.prototype.bind.call(console.error,console,_settings3.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings3.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings3.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.progress.settings={name:'Progress',namespace:'progress',silent:false,debug:false,verbose:false,performance:true,random:{min:2,max:5},duration:300,updateInterval:'auto',autoSuccess:true,showActivity:true,limitValues:true,label:'percent',precision:0,framerate:1000/30,/// 30 fps
percent:false,total:false,value:false,// delay in ms for fail safe animation callback
failSafeDelay:100,onLabelUpdate:function onLabelUpdate(state,text,value,total){return text;},onChange:function onChange(percent,value,total){},onSuccess:function onSuccess(total){},onActive:function onActive(value,total){},onError:function onError(value,total){},onWarning:function onWarning(value,total){},error:{method:'The method you called is not defined.',nonNumeric:'Progress value is non numeric',tooHigh:'Value specified is above 100%',tooLow:'Value specified is below 0%',sumExceedsTotal:'Sum of multple values exceed total'},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:'percent',total:'total',value:'value'},selector:{bar:'> .bar',label:'> .label',progress:'.bar > .progress'},text:{active:false,error:false,success:false,warning:false,percent:'{percent}%',ratio:'{value} of {total}',bars:['']},className:{active:'active',error:'error',success:'success',warning:'warning'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Slider
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){"use strict";window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.slider=function(parameters){var $allModules=$(this),$window=$(window),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],SINGLE_STEP=1,BIG_STEP=2,NO_STEP=0,SINGLE_BACKSTEP=-1,BIG_BACKSTEP=-2,// Used to manage document bound events.
// Use this so that we can distinguish between which document events are bound to which range.
currentRange=0,returnedValue;$allModules.each(function(){var _settings4=$.isPlainObject(parameters)?$.extend(true,{},$.fn.slider.settings,parameters):$.extend({},$.fn.slider.settings),className=_settings4.className,_metadata2=_settings4.metadata,namespace=_settings4.namespace,error=_settings4.error,keys=_settings4.keys,interpretLabel=_settings4.interpretLabel,isHover=false,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$currThumb,$thumb,$secondThumb,$track,$trackFill,$labels,element=this,instance=$module.data(moduleNamespace),documentEventID,_value6,_position3,secondPos,offset,precision,isTouch,gapRatio=1,initialPosition,initialLoad,module;module={initialize:function initialize(){module.debug('Initializing slider',_settings4);initialLoad=true;currentRange+=1;documentEventID=currentRange;isTouch=module.setup.testOutTouch();module.setup.layout();module.setup.labels();if(!module.is.disabled()){module.bind.events();}module.read.metadata();module.read.settings();initialLoad=false;module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of slider',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous slider for',$module);clearInterval(instance.interval);module.unbind.events();module.unbind.slidingEvents();$module.removeData(moduleNamespace);instance=undefined;},setup:{layout:function layout(){if($module.attr('tabindex')===undefined){$module.attr('tabindex',0);}if($module.find('.inner').length==0){$module.append("<div class='inner'>"+"<div class='track'></div>"+"<div class='track-fill'></div>"+"<div class='thumb'></div>"+"</div>");}precision=module.get.precision();$thumb=$module.find('.thumb:not(.second)');$currThumb=$thumb;if(module.is.range()){if($module.find('.thumb.second').length==0){$module.find('.inner').append("<div class='thumb second'></div>");}$secondThumb=$module.find('.thumb.second');}$track=$module.find('.track');$trackFill=$module.find('.track-fill');offset=$thumb.width()/2;},labels:function labels(){if(module.is.labeled()){$labels=$module.find('.labels:not(.auto)');if($labels.length!=0){module.setup.customLabel();}else{module.setup.autoLabel();}if(_settings4.showLabelTicks){$module.addClass(className.ticked);}}},testOutTouch:function testOutTouch(){try{document.createEvent('TouchEvent');return true;}catch(e){return false;}},customLabel:function customLabel(){var $children=$labels.find('.label'),numChildren=$children.length,min=module.get.min(),max=module.get.max(),ratio;$children.each(function(index){var $child=$(this),attrValue=$child.attr('data-value');if(attrValue){attrValue=attrValue>max?max:attrValue<min?min:attrValue;ratio=(attrValue-min)/(max-min);}else{ratio=(index+1)/(numChildren+1);}module.update.labelPosition(ratio,$(this));});},autoLabel:function autoLabel(){if(module.get.step()!=0){$labels=$module.find('.labels');if($labels.length!=0){$labels.empty();}else{$labels=$module.append('<ul class="auto labels"></ul>').find('.labels');}for(var i=0,len=module.get.numLabels();i<=len;i++){var labelText=module.get.label(i),$label=labelText!==""?!(i%module.get.gapRatio())?$('<li class="label">'+labelText+'</li>'):$('<li class="halftick label"></li>'):null,ratio=i/len;if($label){module.update.labelPosition(ratio,$label);$labels.append($label);}}}}},bind:{events:function events(){module.bind.globalKeyboardEvents();module.bind.keyboardEvents();module.bind.mouseEvents();if(module.is.touch()){module.bind.touchEvents();}if(_settings4.autoAdjustLabels){module.bind.windowEvents();}},keyboardEvents:function keyboardEvents(){module.verbose('Binding keyboard events');$module.on('keydown'+eventNamespace,module.event.keydown);},globalKeyboardEvents:function globalKeyboardEvents(){$(document).on('keydown'+eventNamespace+documentEventID,module.event.activateFocus);},mouseEvents:function mouseEvents(){module.verbose('Binding mouse events');$module.find('.track, .thumb, .inner').on('mousedown'+eventNamespace,function(event){event.stopImmediatePropagation();event.preventDefault();module.event.down(event);});$module.on('mousedown'+eventNamespace,module.event.down);$module.on('mouseenter'+eventNamespace,function(event){isHover=true;});$module.on('mouseleave'+eventNamespace,function(event){isHover=false;});},touchEvents:function touchEvents(){module.verbose('Binding touch events');$module.find('.track, .thumb, .inner').on('touchstart'+eventNamespace,function(event){event.stopImmediatePropagation();event.preventDefault();module.event.down(event);});$module.on('touchstart'+eventNamespace,module.event.down);},slidingEvents:function slidingEvents(){// these don't need the identifier because we only ever want one of them to be registered with document
module.verbose('Binding page wide events while handle is being draged');if(module.is.touch()){$(document).on('touchmove'+eventNamespace,module.event.move);$(document).on('touchend'+eventNamespace,module.event.up);}else{$(document).on('mousemove'+eventNamespace,module.event.move);$(document).on('mouseup'+eventNamespace,module.event.up);}},windowEvents:function windowEvents(){$window.on('resize'+eventNamespace,module.event.resize);}},unbind:{events:function events(){$module.find('.track, .thumb, .inner').off('mousedown'+eventNamespace);$module.find('.track, .thumb, .inner').off('touchstart'+eventNamespace);$module.off('mousedown'+eventNamespace);$module.off('mouseenter'+eventNamespace);$module.off('mouseleave'+eventNamespace);$module.off('touchstart'+eventNamespace);$module.off('keydown'+eventNamespace);$module.off('focusout'+eventNamespace);$(document).off('keydown'+eventNamespace+documentEventID,module.event.activateFocus);$window.off('resize'+eventNamespace);},slidingEvents:function slidingEvents(){if(module.is.touch()){$(document).off('touchmove'+eventNamespace);$(document).off('touchend'+eventNamespace);}else{$(document).off('mousemove'+eventNamespace);$(document).off('mouseup'+eventNamespace);}}},event:{down:function down(event){event.preventDefault();if(module.is.range()){var eventPos=module.determine.eventPos(event),newPos=module.determine.pos(eventPos);// Special handling if range mode and both thumbs have the same value
if(_settings4.preventCrossover&&module.is.range()&&module.thumbVal===module.secondThumbVal){initialPosition=newPos;$currThumb=undefined;}else{$currThumb=module.determine.closestThumb(newPos);}}if(!module.is.disabled()){module.bind.slidingEvents();}},move:function move(event){event.preventDefault();var value=module.determine.valueFromEvent(event);if($currThumb===undefined){var eventPos=module.determine.eventPos(event),newPos=module.determine.pos(eventPos);$currThumb=initialPosition>newPos?$thumb:$secondThumb;}if(module.get.step()==0||module.is.smooth()){var thumbVal=module.thumbVal,secondThumbVal=module.secondThumbVal,thumbSmoothVal=module.determine.smoothValueFromEvent(event);if(!$currThumb.hasClass('second')){if(_settings4.preventCrossover&&module.is.range()){value=Math.min(secondThumbVal,value);thumbSmoothVal=Math.min(secondThumbVal,thumbSmoothVal);}thumbVal=value;}else{if(_settings4.preventCrossover&&module.is.range()){value=Math.max(thumbVal,value);thumbSmoothVal=Math.max(thumbVal,thumbSmoothVal);}secondThumbVal=value;}value=Math.abs(thumbVal-(secondThumbVal||0));module.update.position(thumbSmoothVal);_settings4.onMove.call(element,value,thumbVal,secondThumbVal);}else{module.update.value(value,function(value,thumbVal,secondThumbVal){_settings4.onMove.call(element,value,thumbVal,secondThumbVal);});}},up:function up(event){event.preventDefault();var value=module.determine.valueFromEvent(event);module.set.value(value);module.unbind.slidingEvents();},keydown:function keydown(event,first){if(_settings4.preventCrossover&&module.is.range()&&module.thumbVal===module.secondThumbVal){$currThumb=undefined;}if(module.is.focused()){$(document).trigger(event);}if(first||module.is.focused()){var step=module.determine.keyMovement(event);if(step!=NO_STEP){event.preventDefault();switch(step){case SINGLE_STEP:module.takeStep();break;case BIG_STEP:module.takeStep(module.get.multiplier());break;case SINGLE_BACKSTEP:module.backStep();break;case BIG_BACKSTEP:module.backStep(module.get.multiplier());break;}}}},activateFocus:function activateFocus(event){if(!module.is.focused()&&module.is.hover()&&module.determine.keyMovement(event)!=NO_STEP){event.preventDefault();module.event.keydown(event,true);$module.focus();}},resize:function resize(_event){// To avoid a useless performance cost, we only call the label refresh when its necessary
if(gapRatio!=module.get.gapRatio()){module.setup.labels();gapRatio=module.get.gapRatio();}}},resync:function resync(){module.verbose('Resyncing thumb position based on value');if(module.is.range()){module.update.position(module.secondThumbVal,$secondThumb);}module.update.position(module.thumbVal,$thumb);module.setup.labels();},takeStep:function takeStep(multiplier){var multiplier=multiplier!=undefined?multiplier:1,step=module.get.step(),currValue=module.get.currentThumbValue();module.verbose('Taking a step');if(step>0){module.set.value(currValue+step*multiplier);}else if(step==0){var precision=module.get.precision(),newValue=currValue+multiplier/precision;module.set.value(Math.round(newValue*precision)/precision);}},backStep:function backStep(multiplier){var multiplier=multiplier!=undefined?multiplier:1,step=module.get.step(),currValue=module.get.currentThumbValue();module.verbose('Going back a step');if(step>0){module.set.value(currValue-step*multiplier);}else if(step==0){var precision=module.get.precision(),newValue=currValue-multiplier/precision;module.set.value(Math.round(newValue*precision)/precision);}},is:{range:function range(){return $module.hasClass(_settings4.className.range);},hover:function hover(){return isHover;},focused:function focused(){return $module.is(':focus');},disabled:function disabled(){return $module.hasClass(_settings4.className.disabled);},labeled:function labeled(){return $module.hasClass(_settings4.className.labeled);},reversed:function reversed(){return $module.hasClass(_settings4.className.reversed);},vertical:function vertical(){return $module.hasClass(_settings4.className.vertical);},smooth:function smooth(){return _settings4.smooth||$module.hasClass(_settings4.className.smooth);},touch:function touch(){return isTouch;}},get:{trackOffset:function trackOffset(){if(module.is.vertical()){return $track.offset().top;}else{return $track.offset().left;}},trackLength:function trackLength(){if(module.is.vertical()){return $track.height();}else{return $track.width();}},trackLeft:function trackLeft(){if(module.is.vertical()){return $track.position().top;}else{return $track.position().left;}},trackStartPos:function trackStartPos(){return module.is.reversed()?module.get.trackLeft()+module.get.trackLength():module.get.trackLeft();},trackEndPos:function trackEndPos(){return module.is.reversed()?module.get.trackLeft():module.get.trackLeft()+module.get.trackLength();},trackStartMargin:function trackStartMargin(){var margin;if(module.is.vertical()){margin=module.is.reversed()?$module.css('padding-bottom'):$module.css('padding-top');}else{margin=module.is.reversed()?$module.css('padding-right'):$module.css('padding-left');}return margin||'0px';},trackEndMargin:function trackEndMargin(){var margin;if(module.is.vertical()){margin=module.is.reversed()?$module.css('padding-top'):$module.css('padding-bottom');}else{margin=module.is.reversed()?$module.css('padding-left'):$module.css('padding-right');}return margin||'0px';},precision:function precision(){var decimalPlaces,step=module.get.step();if(step!=0){var split=String(step).split('.');if(split.length==2){decimalPlaces=split[1].length;}else{decimalPlaces=0;}}else{decimalPlaces=_settings4.decimalPlaces;}var precision=Math.pow(10,decimalPlaces);module.debug('Precision determined',precision);return precision;},min:function min(){return _settings4.min;},max:function max(){var step=module.get.step(),min=module.get.min(),quotient=step===0?0:Math.floor((_settings4.max-min)/step),remainder=step===0?0:(_settings4.max-min)%step;return remainder===0?_settings4.max:min+quotient*step;},step:function step(){return _settings4.step;},numLabels:function numLabels(){var value=Math.round((module.get.max()-module.get.min())/module.get.step());module.debug('Determined that there should be '+value+' labels');return value;},labelType:function labelType(){return _settings4.labelType;},label:function label(value){if(interpretLabel){return interpretLabel(value);}switch(_settings4.labelType){case _settings4.labelTypes.number:return Math.round((value*module.get.step()+module.get.min())*precision)/precision;case _settings4.labelTypes.letter:return alphabet[value%26];default:return value;}},value:function value(){return _value6;},currentThumbValue:function currentThumbValue(){return $currThumb!==undefined&&$currThumb.hasClass('second')?module.secondThumbVal:module.thumbVal;},thumbValue:function thumbValue(which){switch(which){case'second':if(module.is.range()){return module.secondThumbVal;}else{module.error(error.notrange);break;}case'first':default:return module.thumbVal;}},multiplier:function multiplier(){return _settings4.pageMultiplier;},thumbPosition:function thumbPosition(which){switch(which){case'second':if(module.is.range()){return secondPos;}else{module.error(error.notrange);break;}case'first':default:return _position3;}},gapRatio:function gapRatio(){var gapRatio=1;if(_settings4.autoAdjustLabels){var numLabels=module.get.numLabels(),trackLength=module.get.trackLength(),gapCounter=1;// While the distance between two labels is too short,
// we divide the number of labels at each iteration
// and apply only if the modulo of the operation is an odd number.
if(trackLength>0){while(trackLength/numLabels*gapCounter<_settings4.labelDistance){if(!(numLabels%gapCounter)){gapRatio=gapCounter;}gapCounter+=1;}}}return gapRatio;}},determine:{pos:function pos(pagePos){return module.is.reversed()?module.get.trackStartPos()-pagePos+module.get.trackOffset():pagePos-module.get.trackOffset()-module.get.trackStartPos();},closestThumb:function closestThumb(eventPos){var thumbPos=parseFloat(module.determine.thumbPos($thumb)),thumbDelta=Math.abs(eventPos-thumbPos),secondThumbPos=parseFloat(module.determine.thumbPos($secondThumb)),secondThumbDelta=Math.abs(eventPos-secondThumbPos);if(thumbDelta===secondThumbDelta&&module.get.thumbValue()===module.get.min()){return $secondThumb;}return thumbDelta<=secondThumbDelta?$thumb:$secondThumb;},closestThumbPos:function closestThumbPos(eventPos){var thumbPos=parseFloat(module.determine.thumbPos($thumb)),thumbDelta=Math.abs(eventPos-thumbPos),secondThumbPos=parseFloat(module.determine.thumbPos($secondThumb)),secondThumbDelta=Math.abs(eventPos-secondThumbPos);return thumbDelta<=secondThumbDelta?thumbPos:secondThumbPos;},thumbPos:function thumbPos($element){var pos=module.is.vertical()?module.is.reversed()?$element.css('bottom'):$element.css('top'):module.is.reversed()?$element.css('right'):$element.css('left');return pos;},positionFromValue:function positionFromValue(value){var min=module.get.min(),max=module.get.max(),value=value>max?max:value<min?min:value,trackLength=module.get.trackLength(),ratio=(value-min)/(max-min),position=Math.round(ratio*trackLength);module.verbose('Determined position: '+position+' from value: '+value);return position;},positionFromRatio:function positionFromRatio(ratio){var trackLength=module.get.trackLength(),step=module.get.step(),position=Math.round(ratio*trackLength),adjustedPos=step==0?position:Math.round(position/step)*step;return adjustedPos;},valueFromEvent:function valueFromEvent(event){var eventPos=module.determine.eventPos(event),newPos=module.determine.pos(eventPos),value;if(eventPos<module.get.trackOffset()){value=module.is.reversed()?module.get.max():module.get.min();}else if(eventPos>module.get.trackOffset()+module.get.trackLength()){value=module.is.reversed()?module.get.min():module.get.max();}else{value=module.determine.value(newPos);}return value;},smoothValueFromEvent:function smoothValueFromEvent(event){var min=module.get.min(),max=module.get.max(),trackLength=module.get.trackLength(),eventPos=module.determine.eventPos(event),newPos=eventPos-module.get.trackOffset(),ratio,value;newPos=newPos<0?0:newPos>trackLength?trackLength:newPos;ratio=newPos/trackLength;if(module.is.reversed()){ratio=1-ratio;}value=ratio*(max-min)+min;return value;},eventPos:function eventPos(event){if(module.is.touch()){var touchEvent=event.changedTouches?event:event.originalEvent,touches=touchEvent.changedTouches[0]?touchEvent.changedTouches:touchEvent.touches,touchY=touches[0].pageY,touchX=touches[0].pageX;return module.is.vertical()?touchY:touchX;}var clickY=event.pageY||event.originalEvent.pageY,clickX=event.pageX||event.originalEvent.pageX;return module.is.vertical()?clickY:clickX;},value:function value(position){var startPos=module.is.reversed()?module.get.trackEndPos():module.get.trackStartPos(),endPos=module.is.reversed()?module.get.trackStartPos():module.get.trackEndPos(),ratio=(position-startPos)/(endPos-startPos),range=module.get.max()-module.get.min(),step=module.get.step(),value=ratio*range,difference=step==0?value:Math.round(value/step)*step;module.verbose('Determined value based upon position: '+position+' as: '+value);if(value!=difference){module.verbose('Rounding value to closest step: '+difference);}// Use precision to avoid ugly Javascript floating point rounding issues
// (like 35 * .01 = 0.35000000000000003)
difference=Math.round(difference*precision)/precision;module.verbose('Cutting off additional decimal places');return difference+module.get.min();},keyMovement:function keyMovement(event){var key=event.which,downArrow=module.is.vertical()?module.is.reversed()?keys.downArrow:keys.upArrow:keys.downArrow,upArrow=module.is.vertical()?module.is.reversed()?keys.upArrow:keys.downArrow:keys.upArrow,leftArrow=!module.is.vertical()?module.is.reversed()?keys.rightArrow:keys.leftArrow:keys.leftArrow,rightArrow=!module.is.vertical()?module.is.reversed()?keys.leftArrow:keys.rightArrow:keys.rightArrow;if(key==downArrow||key==leftArrow){return SINGLE_BACKSTEP;}else if(key==upArrow||key==rightArrow){return SINGLE_STEP;}else if(key==keys.pageDown){return BIG_BACKSTEP;}else if(key==keys.pageUp){return BIG_STEP;}else{return NO_STEP;}}},handleNewValuePosition:function handleNewValuePosition(val){var min=module.get.min(),max=module.get.max(),newPos;if(val<=min){val=min;}else if(val>=max){val=max;}newPos=module.determine.positionFromValue(val);return newPos;},set:{value:function value(newValue){module.update.value(newValue,function(value,thumbVal,secondThumbVal){if(!initialLoad||_settings4.fireOnInit){_settings4.onChange.call(element,value,thumbVal,secondThumbVal);_settings4.onMove.call(element,value,thumbVal,secondThumbVal);}});},rangeValue:function rangeValue(first,second){if(module.is.range()){var min=module.get.min(),max=module.get.max();if(first<=min){first=min;}else if(first>=max){first=max;}if(second<=min){second=min;}else if(second>=max){second=max;}module.thumbVal=first;module.secondThumbVal=second;_value6=Math.abs(module.thumbVal-module.secondThumbVal);module.update.position(module.thumbVal,$thumb);module.update.position(module.secondThumbVal,$secondThumb);if(!initialLoad||_settings4.fireOnInit){_settings4.onChange.call(element,_value6,module.thumbVal,module.secondThumbVal);_settings4.onMove.call(element,_value6,module.thumbVal,module.secondThumbVal);}}else{module.error(error.notrange);}},position:function position(_position2,which){var thumbVal=module.determine.value(_position2);switch(which){case'second':module.secondThumbVal=thumbVal;module.update.position(thumbVal,$secondThumb);break;default:module.thumbVal=thumbVal;module.update.position(thumbVal,$thumb);}_value6=Math.abs(module.thumbVal-(module.secondThumbVal||0));module.set.value(_value6);}},update:{value:function value(newValue,callback){var min=module.get.min(),max=module.get.max();if(newValue<=min){newValue=min;}else if(newValue>=max){newValue=max;}if(!module.is.range()){_value6=newValue;module.thumbVal=_value6;}else{if($currThumb===undefined){$currThumb=newValue<=module.get.currentThumbValue()?$thumb:$secondThumb;}if(!$currThumb.hasClass('second')){if(_settings4.preventCrossover&&module.is.range()){newValue=Math.min(module.secondThumbVal,newValue);}module.thumbVal=newValue;}else{if(_settings4.preventCrossover&&module.is.range()){newValue=Math.max(module.thumbVal,newValue);}module.secondThumbVal=newValue;}_value6=Math.abs(module.thumbVal-module.secondThumbVal);}module.update.position(newValue);module.debug('Setting slider value to '+_value6);if(typeof callback==='function'){callback(_value6,module.thumbVal,module.secondThumbVal);}},position:function position(newValue,$element){var newPos=module.handleNewValuePosition(newValue),$targetThumb=$element!=undefined?$element:$currThumb,thumbVal=module.thumbVal||module.get.min(),secondThumbVal=module.secondThumbVal||module.get.min();if(module.is.range()){if(!$targetThumb.hasClass('second')){_position3=newPos;thumbVal=newValue;}else{secondPos=newPos;secondThumbVal=newValue;}}else{_position3=newPos;thumbVal=newValue;}var trackPosValue,thumbPosValue,min=module.get.min(),max=module.get.max(),thumbPosPercent=100*(newValue-min)/(max-min),trackStartPosPercent=100*(Math.min(thumbVal,secondThumbVal)-min)/(max-min),trackEndPosPercent=100*(1-(Math.max(thumbVal,secondThumbVal)-min)/(max-min));if(module.is.vertical()){if(module.is.reversed()){thumbPosValue={bottom:'calc('+thumbPosPercent+'% - '+offset+'px)',top:'auto'};trackPosValue={bottom:trackStartPosPercent+'%',top:trackEndPosPercent+'%'};}else{thumbPosValue={top:'calc('+thumbPosPercent+'% - '+offset+'px)',bottom:'auto'};trackPosValue={top:trackStartPosPercent+'%',bottom:trackEndPosPercent+'%'};}}else{if(module.is.reversed()){thumbPosValue={right:'calc('+thumbPosPercent+'% - '+offset+'px)',left:'auto'};trackPosValue={right:trackStartPosPercent+'%',left:trackEndPosPercent+'%'};}else{thumbPosValue={left:'calc('+thumbPosPercent+'% - '+offset+'px)',right:'auto'};trackPosValue={left:trackStartPosPercent+'%',right:trackEndPosPercent+'%'};}}$targetThumb.css(thumbPosValue);$trackFill.css(trackPosValue);module.debug('Setting slider position to '+newPos);},labelPosition:function labelPosition(ratio,$label){var startMargin=module.get.trackStartMargin(),endMargin=module.get.trackEndMargin(),posDir=module.is.vertical()?module.is.reversed()?'bottom':'top':module.is.reversed()?'right':'left',startMarginMod=module.is.reversed()&&!module.is.vertical()?' - ':' + ';var position='(100% - '+startMargin+' - '+endMargin+') * '+ratio;$label.css(posDir,'calc('+position+startMarginMod+startMargin+')');}},"goto":{max:function max(){module.set.value(module.get.max());},min:function min(){module.set.value(module.get.min());}},read:{metadata:function metadata(){var data={thumbVal:$module.data(_metadata2.thumbVal),secondThumbVal:$module.data(_metadata2.secondThumbVal)};if(data.thumbVal){if(module.is.range()&&data.secondThumbVal){module.debug('Current value set from metadata',data.thumbVal,data.secondThumbVal);module.set.rangeValue(data.thumbVal,data.secondThumbVal);}else{module.debug('Current value set from metadata',data.thumbVal);module.set.value(data.thumbVal);}}},settings:function settings(){if(_settings4.start!==false){if(module.is.range()){module.debug('Start position set from settings',_settings4.start,_settings4.end);module.set.rangeValue(_settings4.start,_settings4.end);}else{module.debug('Start position set from settings',_settings4.start);module.set.value(_settings4.start);}}}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,_settings4,name);}else if(value!==undefined){if($.isPlainObject(_settings4[name])){$.extend(true,_settings4[name],value);}else{_settings4[name]=value;}}else{return _settings4[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!_settings4.silent&&_settings4.debug){if(_settings4.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings4.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!_settings4.silent&&_settings4.verbose&&_settings4.debug){if(_settings4.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings4.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!_settings4.silent){module.error=Function.prototype.bind.call(console.error,console,_settings4.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings4.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings4.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if($.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.slider.settings={silent:false,debug:false,verbose:false,performance:true,name:'Slider',namespace:'slider',error:{method:'The method you called is not defined.',notrange:'This slider is not a range slider'},metadata:{thumbVal:'thumbVal',secondThumbVal:'secondThumbVal'},min:0,max:20,step:1,start:0,end:20,labelType:'number',showLabelTicks:false,smooth:false,autoAdjustLabels:true,labelDistance:100,preventCrossover:true,fireOnInit:false,//the decimal place to round to if step is undefined
decimalPlaces:2,// page up/down multiplier. How many more times the steps to take on page up/down press
pageMultiplier:2,selector:{},className:{reversed:'reversed',disabled:'disabled',labeled:'labeled',ticked:'ticked',vertical:'vertical',range:'range',smooth:'smooth'},keys:{pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},labelTypes:{number:'number',letter:'letter'},onChange:function onChange(value,thumbVal,secondThumbVal){},onMove:function onMove(value,thumbVal,secondThumbVal){}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Rating
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.rating=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.rating.settings,parameters):$.extend({},$.fn.rating.settings),namespace=settings.namespace,className=settings.className,metadata=settings.metadata,selector=settings.selector,cssVars=settings.cssVars,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,element=this,instance=$(this).data(moduleNamespace),$module=$(this),$icon=$module.find(selector.icon),_initialLoad3,module;module={initialize:function initialize(){module.verbose('Initializing rating module',settings);if($icon.length===0){module.setup.layout();}if(settings.interactive&&!module.is.disabled()){module.enable();}else{module.disable();}module.set.initialLoad();module.set.rating(module.get.initialRating());module.remove.initialLoad();module.instantiate();},instantiate:function instantiate(){module.verbose('Instantiating module',settings);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous instance',instance);module.remove.events();$module.removeData(moduleNamespace);},refresh:function refresh(){$icon=$module.find(selector.icon);},setup:{layout:function layout(){var maxRating=module.get.maxRating(),icon=module.get.icon(),html=$.fn.rating.settings.templates.icon(maxRating,icon);module.debug('Generating icon html dynamically');$module.html(html);module.refresh();}},event:{mouseenter:function mouseenter(){var $activeIcon=$(this);$activeIcon.nextAll().removeClass(className.selected);$module.addClass(className.selected);$activeIcon.addClass(className.selected).prevAll().addClass(className.selected);},mouseleave:function mouseleave(){$module.removeClass(className.selected);$icon.removeClass(className.selected);},click:function click(){var $activeIcon=$(this),currentRating=module.get.rating(),rating=$icon.index($activeIcon)+1,canClear=settings.clearable=='auto'?$icon.length===1:settings.clearable;if(canClear&&currentRating==rating){module.clearRating();}else{module.set.rating(rating);}}},clearRating:function clearRating(){module.debug('Clearing current rating');module.set.rating(0);},bind:{events:function events(){module.verbose('Binding events');$module.on('mouseenter'+eventNamespace,selector.icon,module.event.mouseenter).on('mouseleave'+eventNamespace,selector.icon,module.event.mouseleave).on('click'+eventNamespace,selector.icon,module.event.click);}},remove:{events:function events(){module.verbose('Removing events');$module.off(eventNamespace);},initialLoad:function initialLoad(){_initialLoad3=false;}},enable:function enable(){module.debug('Setting rating to interactive mode');module.bind.events();$module.removeClass(className.disabled);},disable:function disable(){module.debug('Setting rating to read-only mode');module.remove.events();$module.addClass(className.disabled);},is:{initialLoad:function initialLoad(){return _initialLoad3;},disabled:function disabled(){return $module.hasClass(className.disabled);}},get:{icon:function icon(){var icon=$module.data(metadata.icon);if(icon){$module.removeData(metadata.icon);}return icon||settings.icon;},initialRating:function initialRating(){if($module.data(metadata.rating)!==undefined){$module.removeData(metadata.rating);return $module.data(metadata.rating);}return settings.initialRating;},maxRating:function maxRating(){if($module.data(metadata.maxRating)!==undefined){$module.removeData(metadata.maxRating);return $module.data(metadata.maxRating);}return settings.maxRating;},rating:function rating(){var currentRating=$icon.filter('.'+className.active).length;module.verbose('Current rating retrieved',currentRating);return currentRating;}},set:{rating:function rating(_rating){var ratingIndex=Math.floor(_rating-1>=0?_rating-1:0),$activeIcon=$icon.eq(ratingIndex),$partialActiveIcon=_rating<=1?$activeIcon:$activeIcon.next(),filledPercentage=_rating%1*100;$module.removeClass(className.selected);$icon.removeClass(className.selected).removeClass(className.active).removeClass(className.partiallyActive);if(_rating>0){module.verbose('Setting current rating to',_rating);$activeIcon.prevAll().addBack().addClass(className.active);if($activeIcon.next()&&_rating%1!==0){$partialActiveIcon.addClass(className.partiallyActive).addClass(className.active);$partialActiveIcon.css(cssVars.filledCustomPropName,filledPercentage+'%');if($partialActiveIcon.css('backgroundColor')==='transparent'){$partialActiveIcon.removeClass(className.partiallyActive).removeClass(className.active);}}}if(!module.is.initialLoad()){settings.onRate.call(element,_rating);}},initialLoad:function initialLoad(){_initialLoad3=true;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.rating.settings={name:'Rating',namespace:'rating',icon:'star',silent:false,debug:false,verbose:false,performance:true,initialRating:0,interactive:true,maxRating:4,clearable:'auto',fireOnInit:false,onRate:function onRate(rating){},error:{method:'The method you called is not defined',noMaximum:'No maximum rating specified. Cannot generate HTML automatically'},metadata:{rating:'rating',maxRating:'maxRating',icon:'icon'},className:{active:'active',disabled:'disabled',selected:'selected',loading:'loading',partiallyActive:'partial'},cssVars:{filledCustomPropName:'--full'},selector:{icon:'.icon'},templates:{icon:function icon(maxRating,iconClass){var icon=1,html='';while(icon<=maxRating){html+='<i class="'+iconClass+' icon"></i>';icon++;}return html;}}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Search
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.search=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$(this).each(function(){var _settings5=$.isPlainObject(parameters)?$.extend(true,{},$.fn.search.settings,parameters):$.extend({},$.fn.search.settings),className=_settings5.className,metadata=_settings5.metadata,regExp=_settings5.regExp,fields=_settings5.fields,selector=_settings5.selector,error=_settings5.error,namespace=_settings5.namespace,eventNamespace='.'+namespace,moduleNamespace=namespace+'-module',$module=$(this),$prompt=$module.find(selector.prompt),$searchButton=$module.find(selector.searchButton),$results=$module.find(selector.results),$result=$module.find(selector.result),$category=$module.find(selector.category),element=this,instance=$module.data(moduleNamespace),disabledBubbled=false,resultsDismissed=false,module;module={initialize:function initialize(){module.verbose('Initializing module');module.get.settings();module.determine.searchFields();module.bind.events();module.set.type();module.create.results();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying instance');$module.off(eventNamespace).removeData(moduleNamespace);},refresh:function refresh(){module.debug('Refreshing selector cache');$prompt=$module.find(selector.prompt);$searchButton=$module.find(selector.searchButton);$category=$module.find(selector.category);$results=$module.find(selector.results);$result=$module.find(selector.result);},refreshResults:function refreshResults(){$results=$module.find(selector.results);$result=$module.find(selector.result);},bind:{events:function events(){module.verbose('Binding events to search');if(_settings5.automatic){$module.on(module.get.inputEvent()+eventNamespace,selector.prompt,module.event.input);$prompt.attr('autocomplete','off');}$module// prompt
.on('focus'+eventNamespace,selector.prompt,module.event.focus).on('blur'+eventNamespace,selector.prompt,module.event.blur).on('keydown'+eventNamespace,selector.prompt,module.handleKeyboard)// search button
.on('click'+eventNamespace,selector.searchButton,module.query)// results
.on('mousedown'+eventNamespace,selector.results,module.event.result.mousedown).on('mouseup'+eventNamespace,selector.results,module.event.result.mouseup).on('click'+eventNamespace,selector.result,module.event.result.click);}},determine:{searchFields:function searchFields(){// this makes sure $.extend does not add specified search fields to default fields
// this is the only setting which should not extend defaults
if(parameters&&parameters.searchFields!==undefined){_settings5.searchFields=parameters.searchFields;}}},event:{input:function input(){if(_settings5.searchDelay){clearTimeout(module.timer);module.timer=setTimeout(function(){if(module.is.focused()){module.query();}},_settings5.searchDelay);}else{module.query();}},focus:function focus(){module.set.focus();if(_settings5.searchOnFocus&&module.has.minimumCharacters()){module.query(function(){if(module.can.show()){module.showResults();}});}},blur:function blur(event){var pageLostFocus=document.activeElement===this,callback=function callback(){module.cancel.query();module.remove.focus();module.timer=setTimeout(module.hideResults,_settings5.hideDelay);};if(pageLostFocus){return;}resultsDismissed=false;if(module.resultsClicked){module.debug('Determining if user action caused search to close');$module.one('click.close'+eventNamespace,selector.results,function(event){if(module.is.inMessage(event)||disabledBubbled){$prompt.focus();return;}disabledBubbled=false;if(!module.is.animating()&&!module.is.hidden()){callback();}});}else{module.debug('Input blurred without user action, closing results');callback();}},result:{mousedown:function mousedown(){module.resultsClicked=true;},mouseup:function mouseup(){module.resultsClicked=false;},click:function click(event){module.debug('Search result selected');var $result=$(this),$title=$result.find(selector.title).eq(0),$link=$result.is('a[href]')?$result:$result.find('a[href]').eq(0),href=$link.attr('href')||false,target=$link.attr('target')||false,// title is used for result lookup
value=$title.length>0?$title.text():false,results=module.get.results(),result=$result.data(metadata.result)||module.get.result(value,results);if(value){module.set.value(value);}if($.isFunction(_settings5.onSelect)){if(_settings5.onSelect.call(element,result,results)===false){module.debug('Custom onSelect callback cancelled default select action');disabledBubbled=true;return;}}module.hideResults();if(href){module.verbose('Opening search link found in result',$link);if(target=='_blank'||event.ctrlKey){window.open(href);}else{window.location.href=href;}}}}},handleKeyboard:function handleKeyboard(event){var// force selector refresh
$result=$module.find(selector.result),$category=$module.find(selector.category),$activeResult=$result.filter('.'+className.active),currentIndex=$result.index($activeResult),resultSize=$result.length,hasActiveResult=$activeResult.length>0,keyCode=event.which,keys={backspace:8,enter:13,escape:27,upArrow:38,downArrow:40},newIndex;// search shortcuts
if(keyCode==keys.escape){module.verbose('Escape key pressed, blurring search field');module.hideResults();resultsDismissed=true;}if(module.is.visible()){if(keyCode==keys.enter){module.verbose('Enter key pressed, selecting active result');if($result.filter('.'+className.active).length>0){module.event.result.click.call($result.filter('.'+className.active),event);event.preventDefault();return false;}}else if(keyCode==keys.upArrow&&hasActiveResult){module.verbose('Up key pressed, changing active result');newIndex=currentIndex-1<0?currentIndex:currentIndex-1;$category.removeClass(className.active);$result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);event.preventDefault();}else if(keyCode==keys.downArrow){module.verbose('Down key pressed, changing active result');newIndex=currentIndex+1>=resultSize?currentIndex:currentIndex+1;$category.removeClass(className.active);$result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);event.preventDefault();}}else{// query shortcuts
if(keyCode==keys.enter){module.verbose('Enter key pressed, executing query');module.query();module.set.buttonPressed();$prompt.one('keyup',module.remove.buttonFocus);}}},setup:{api:function api(searchTerm,callback){var apiSettings={debug:_settings5.debug,on:false,cache:_settings5.cache,action:'search',urlData:{query:searchTerm},onSuccess:function onSuccess(response){module.parse.response.call(element,response,searchTerm);callback();},onFailure:function onFailure(){module.displayMessage(error.serverError);callback();},onAbort:function onAbort(response){},onError:module.error};$.extend(true,apiSettings,_settings5.apiSettings);module.verbose('Setting up API request',apiSettings);$module.api(apiSettings);}},can:{useAPI:function useAPI(){return $.fn.api!==undefined;},show:function show(){return module.is.focused()&&!module.is.visible()&&!module.is.empty();},transition:function transition(){return _settings5.transition&&$.fn.transition!==undefined&&$module.transition('is supported');}},is:{animating:function animating(){return $results.hasClass(className.animating);},hidden:function hidden(){return $results.hasClass(className.hidden);},inMessage:function inMessage(event){if(!event.target){return;}var $target=$(event.target),isInDOM=$.contains(document.documentElement,event.target);return isInDOM&&$target.closest(selector.message).length>0;},empty:function empty(){return $results.html()==='';},visible:function visible(){return $results.filter(':visible').length>0;},focused:function focused(){return $prompt.filter(':focus').length>0;}},get:{settings:function settings(){if($.isPlainObject(parameters)&&parameters.searchFullText){_settings5.fullTextSearch=parameters.searchFullText;module.error(_settings5.error.oldSearchSyntax,element);}if(_settings5.ignoreDiacritics&&!String.prototype.normalize){_settings5.ignoreDiacritics=false;module.error(error.noNormalize,element);}},inputEvent:function inputEvent(){var prompt=$prompt[0],inputEvent=prompt!==undefined&&prompt.oninput!==undefined?'input':prompt!==undefined&&prompt.onpropertychange!==undefined?'propertychange':'keyup';return inputEvent;},value:function value(){return $prompt.val();},results:function results(){var results=$module.data(metadata.results);return results;},result:function result(value,results){var result=false;value=value!==undefined?value:module.get.value();results=results!==undefined?results:module.get.results();if(_settings5.type==='category'){module.debug('Finding result that matches',value);$.each(results,function(index,category){if(Array.isArray(category.results)){result=module.search.object(value,category.results)[0];// don't continue searching if a result is found
if(result){return false;}}});}else{module.debug('Finding result in results object',value);result=module.search.object(value,results)[0];}return result||false;}},select:{firstResult:function firstResult(){module.verbose('Selecting first result');$result.first().addClass(className.active);}},set:{focus:function focus(){$module.addClass(className.focus);},loading:function loading(){$module.addClass(className.loading);},value:function value(_value7){module.verbose('Setting search input value',_value7);$prompt.val(_value7);},type:function type(_type){_type=_type||_settings5.type;if(_settings5.type=='category'){$module.addClass(_settings5.type);}},buttonPressed:function buttonPressed(){$searchButton.addClass(className.pressed);}},remove:{loading:function loading(){$module.removeClass(className.loading);},focus:function focus(){$module.removeClass(className.focus);},buttonPressed:function buttonPressed(){$searchButton.removeClass(className.pressed);},diacritics:function diacritics(text){return _settings5.ignoreDiacritics?text.normalize('NFD').replace(/[\u0300-\u036f]/g,''):text;}},query:function query(callback){callback=$.isFunction(callback)?callback:function(){};var searchTerm=module.get.value(),cache=module.read.cache(searchTerm);callback=callback||function(){};if(module.has.minimumCharacters()){if(cache){module.debug('Reading result from cache',searchTerm);module.save.results(cache.results);module.addResults(cache.html);module.inject.id(cache.results);callback();}else{module.debug('Querying for',searchTerm);if($.isPlainObject(_settings5.source)||Array.isArray(_settings5.source)){module.search.local(searchTerm);callback();}else if(module.can.useAPI()){module.search.remote(searchTerm,callback);}else{module.error(error.source);callback();}}_settings5.onSearchQuery.call(element,searchTerm);}else{module.hideResults();}},search:{local:function local(searchTerm){var results=module.search.object(searchTerm,_settings5.source),searchHTML;module.set.loading();module.save.results(results);module.debug('Returned full local search results',results);if(_settings5.maxResults>0){module.debug('Using specified max results',results);results=results.slice(0,_settings5.maxResults);}if(_settings5.type=='category'){results=module.create.categoryResults(results);}searchHTML=module.generateResults({results:results});module.remove.loading();module.addResults(searchHTML);module.inject.id(results);module.write.cache(searchTerm,{html:searchHTML,results:results});},remote:function remote(searchTerm,callback){callback=$.isFunction(callback)?callback:function(){};if($module.api('is loading')){$module.api('abort');}module.setup.api(searchTerm,callback);$module.api('query');},object:function object(searchTerm,source,searchFields){searchTerm=module.remove.diacritics(String(searchTerm));var results=[],exactResults=[],fuzzyResults=[],searchExp=searchTerm.replace(regExp.escape,'\\$&'),matchRegExp=new RegExp(regExp.beginsWith+searchExp,'i'),// avoid duplicates when pushing results
addResult=function addResult(array,result){var notResult=$.inArray(result,results)==-1,notFuzzyResult=$.inArray(result,fuzzyResults)==-1,notExactResults=$.inArray(result,exactResults)==-1;if(notResult&&notFuzzyResult&&notExactResults){array.push(result);}};source=source||_settings5.source;searchFields=searchFields!==undefined?searchFields:_settings5.searchFields;// search fields should be array to loop correctly
if(!Array.isArray(searchFields)){searchFields=[searchFields];}// exit conditions if no source
if(source===undefined||source===false){module.error(error.source);return[];}// iterate through search fields looking for matches
$.each(searchFields,function(index,field){$.each(source,function(label,content){var fieldExists=typeof content[field]=='string'||typeof content[field]=='number';if(fieldExists){var text;if(typeof content[field]==='string'){text=module.remove.diacritics(content[field]);}else{text=content[field].toString();}if(text.search(matchRegExp)!==-1){// content starts with value (first in results)
addResult(results,content);}else if(_settings5.fullTextSearch==='exact'&&module.exactSearch(searchTerm,text)){// content fuzzy matches (last in results)
addResult(exactResults,content);}else if(_settings5.fullTextSearch==true&&module.fuzzySearch(searchTerm,text)){// content fuzzy matches (last in results)
addResult(fuzzyResults,content);}}});});$.merge(exactResults,fuzzyResults);$.merge(results,exactResults);return results;}},exactSearch:function exactSearch(query,term){query=query.toLowerCase();term=term.toLowerCase();return term.indexOf(query)>-1;},fuzzySearch:function fuzzySearch(query,term){var termLength=term.length,queryLength=query.length;if(typeof query!=='string'){return false;}query=query.toLowerCase();term=term.toLowerCase();if(queryLength>termLength){return false;}if(queryLength===termLength){return query===term;}search:for(var characterIndex=0,nextCharacterIndex=0;characterIndex<queryLength;characterIndex++){var queryCharacter=query.charCodeAt(characterIndex);while(nextCharacterIndex<termLength){if(term.charCodeAt(nextCharacterIndex++)===queryCharacter){continue search;}}return false;}return true;},parse:{response:function response(_response,searchTerm){if(Array.isArray(_response)){var o={};o[fields.results]=_response;_response=o;}var searchHTML=module.generateResults(_response);module.verbose('Parsing server response',_response);if(_response!==undefined){if(searchTerm!==undefined&&_response[fields.results]!==undefined){module.addResults(searchHTML);module.inject.id(_response[fields.results]);module.write.cache(searchTerm,{html:searchHTML,results:_response[fields.results]});module.save.results(_response[fields.results]);}}}},cancel:{query:function query(){if(module.can.useAPI()){$module.api('abort');}}},has:{minimumCharacters:function minimumCharacters(){var searchTerm=module.get.value(),numCharacters=searchTerm.length;return numCharacters>=_settings5.minCharacters;},results:function results(){if($results.length===0){return false;}var html=$results.html();return html!='';}},clear:{cache:function cache(value){var cache=$module.data(metadata.cache);if(!value){module.debug('Clearing cache',value);$module.removeData(metadata.cache);}else if(value&&cache&&cache[value]){module.debug('Removing value from cache',value);delete cache[value];$module.data(metadata.cache,cache);}}},read:{cache:function cache(name){var cache=$module.data(metadata.cache);if(_settings5.cache){module.verbose('Checking cache for generated html for query',name);return _typeof(cache)=='object'&&cache[name]!==undefined?cache[name]:false;}return false;}},create:{categoryResults:function categoryResults(results){var categoryResults={};$.each(results,function(index,result){if(!result.category){return;}if(categoryResults[result.category]===undefined){module.verbose('Creating new category of results',result.category);categoryResults[result.category]={name:result.category,results:[result]};}else{categoryResults[result.category].results.push(result);}});return categoryResults;},id:function id(resultIndex,categoryIndex){var resultID=resultIndex+1,// not zero indexed
letterID,id;if(categoryIndex!==undefined){// start char code for "A"
letterID=String.fromCharCode(97+categoryIndex);id=letterID+resultID;module.verbose('Creating category result id',id);}else{id=resultID;module.verbose('Creating result id',id);}return id;},results:function results(){if($results.length===0){$results=$('<div />').addClass(className.results).appendTo($module);}}},inject:{result:function result(_result,resultIndex,categoryIndex){module.verbose('Injecting result into results');var $selectedResult=categoryIndex!==undefined?$results.children().eq(categoryIndex).children(selector.results).first().children(selector.result).eq(resultIndex):$results.children(selector.result).eq(resultIndex);module.verbose('Injecting results metadata',$selectedResult);$selectedResult.data(metadata.result,_result);},id:function id(results){module.debug('Injecting unique ids into results');var// since results may be object, we must use counters
categoryIndex=0,resultIndex=0;if(_settings5.type==='category'){// iterate through each category result
$.each(results,function(index,category){if(category.results.length>0){resultIndex=0;$.each(category.results,function(index,result){if(result.id===undefined){result.id=module.create.id(resultIndex,categoryIndex);}module.inject.result(result,resultIndex,categoryIndex);resultIndex++;});categoryIndex++;}});}else{// top level
$.each(results,function(index,result){if(result.id===undefined){result.id=module.create.id(resultIndex);}module.inject.result(result,resultIndex);resultIndex++;});}return results;}},save:{results:function results(_results){module.verbose('Saving current search results to metadata',_results);$module.data(metadata.results,_results);}},write:{cache:function cache(name,value){var cache=$module.data(metadata.cache)!==undefined?$module.data(metadata.cache):{};if(_settings5.cache){module.verbose('Writing generated html to cache',name,value);cache[name]=value;$module.data(metadata.cache,cache);}}},addResults:function addResults(html){if($.isFunction(_settings5.onResultsAdd)){if(_settings5.onResultsAdd.call($results,html)===false){module.debug('onResultsAdd callback cancelled default action');return false;}}if(html){$results.html(html);module.refreshResults();if(_settings5.selectFirstResult){module.select.firstResult();}module.showResults();}else{module.hideResults(function(){$results.empty();});}},showResults:function showResults(callback){callback=$.isFunction(callback)?callback:function(){};if(resultsDismissed){return;}if(!module.is.visible()&&module.has.results()){if(module.can.transition()){module.debug('Showing results with css animations');$results.transition({animation:_settings5.transition+' in',debug:_settings5.debug,verbose:_settings5.verbose,duration:_settings5.duration,onComplete:function onComplete(){callback();},queue:true});}else{module.debug('Showing results with javascript');$results.stop().fadeIn(_settings5.duration,_settings5.easing);}_settings5.onResultsOpen.call($results);}},hideResults:function hideResults(callback){callback=$.isFunction(callback)?callback:function(){};if(module.is.visible()){if(module.can.transition()){module.debug('Hiding results with css animations');$results.transition({animation:_settings5.transition+' out',debug:_settings5.debug,verbose:_settings5.verbose,duration:_settings5.duration,onComplete:function onComplete(){callback();},queue:true});}else{module.debug('Hiding results with javascript');$results.stop().fadeOut(_settings5.duration,_settings5.easing);}_settings5.onResultsClose.call($results);}},generateResults:function generateResults(response){module.debug('Generating html from response',response);var template=_settings5.templates[_settings5.type],isProperObject=$.isPlainObject(response[fields.results])&&!$.isEmptyObject(response[fields.results]),isProperArray=Array.isArray(response[fields.results])&&response[fields.results].length>0,html='';if(isProperObject||isProperArray){if(_settings5.maxResults>0){if(isProperObject){if(_settings5.type=='standard'){module.error(error.maxResults);}}else{response[fields.results]=response[fields.results].slice(0,_settings5.maxResults);}}if($.isFunction(template)){html=template(response,fields,_settings5.preserveHTML);}else{module.error(error.noTemplate,false);}}else if(_settings5.showNoResults){html=module.displayMessage(error.noResults,'empty',error.noResultsHeader);}_settings5.onResults.call(element,response);return html;},displayMessage:function displayMessage(text,type,header){type=type||'standard';module.debug('Displaying message',text,type,header);module.addResults(_settings5.templates.message(text,type,header));return _settings5.templates.message(text,type,header);},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,_settings5,name);}else if(value!==undefined){_settings5[name]=value;}else{return _settings5[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!_settings5.silent&&_settings5.debug){if(_settings5.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings5.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!_settings5.silent&&_settings5.verbose&&_settings5.debug){if(_settings5.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings5.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!_settings5.silent){module.error=Function.prototype.bind.call(console.error,console,_settings5.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings5.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings5.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.search.settings={name:'Search',namespace:'search',silent:false,debug:false,verbose:false,performance:true,// template to use (specified in settings.templates)
type:'standard',// minimum characters required to search
minCharacters:1,// whether to select first result after searching automatically
selectFirstResult:false,// API config
apiSettings:false,// object to search
source:false,// Whether search should query current term on focus
searchOnFocus:true,// fields to search
searchFields:['id','title','description'],// field to display in standard results template
displayField:'',// search anywhere in value (set to 'exact' to require exact matches
fullTextSearch:'exact',// match results also if they contain diacritics of the same base character (for example searching for "a" will also match "á" or "â" or "à", etc...)
ignoreDiacritics:false,// whether to add events to prompt automatically
automatic:true,// delay before hiding menu after blur
hideDelay:0,// delay before searching
searchDelay:200,// maximum results returned from search
maxResults:7,// whether to store lookups in local cache
cache:true,// whether no results errors should be shown
showNoResults:true,// preserve possible html of resultset values
preserveHTML:true,// transition settings
transition:'scale',duration:200,easing:'easeOutExpo',// callbacks
onSelect:false,onResultsAdd:false,onSearchQuery:function onSearchQuery(query){},onResults:function onResults(response){},onResultsOpen:function onResultsOpen(){},onResultsClose:function onResultsClose(){},className:{animating:'animating',active:'active',empty:'empty',focus:'focus',hidden:'hidden',loading:'loading',results:'results',pressed:'down'},error:{source:'Cannot search. No source used, and Semantic API module was not included',noResultsHeader:'No Results',noResults:'Your search returned no results',logging:'Error in debug logging, exiting.',noEndpoint:'No search endpoint was specified',noTemplate:'A valid template name was not specified.',oldSearchSyntax:'searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.',serverError:'There was an issue querying the server.',maxResults:'Results must be an array to use maxResults setting',method:'The method you called is not defined.',noNormalize:'"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'},metadata:{cache:'cache',results:'results',result:'result'},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:'(?:\s|^)'},// maps api response attributes to internal representation
fields:{categories:'results',// array of categories (category view)
categoryName:'name',// name of category (category view)
categoryResults:'results',// array of results (category view)
description:'description',// result description
image:'image',// result image
price:'price',// result price
results:'results',// array of results (standard)
title:'title',// result title
url:'url',// result url
action:'action',// "view more" object name
actionText:'text',// "view more" text
actionURL:'url'// "view more" url
},selector:{prompt:'.prompt',searchButton:'.search.button',results:'.results',message:'.results > .message',category:'.category',result:'.result',title:'.title, .name'},templates:{escape:function escape(string,preserveHTML){if(preserveHTML){return string;}var badChars=/[<>"'`]/g,shouldEscape=/[&<>"'`]/,escape={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},escapedChar=function escapedChar(chr){return escape[chr];};if(shouldEscape.test(string)){string=string.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;");return string.replace(badChars,escapedChar);}return string;},message:function message(_message3,type,header){var html='';if(_message3!==undefined&&type!==undefined){html+=''+'<div class="message '+type+'">';if(header){html+=''+'<div class="header">'+header+'</div>';}html+=' <div class="description">'+_message3+'</div>';html+='</div>';}return html;},category:function category(response,fields,preserveHTML){var html='',escape=$.fn.search.settings.templates.escape;if(response[fields.categoryResults]!==undefined){// each category
$.each(response[fields.categoryResults],function(index,category){if(category[fields.results]!==undefined&&category.results.length>0){html+='<div class="category">';if(category[fields.categoryName]!==undefined){html+='<div class="name">'+escape(category[fields.categoryName],preserveHTML)+'</div>';}// each item inside category
html+='<div class="results">';$.each(category.results,function(index,result){if(result[fields.url]){html+='<a class="result" href="'+result[fields.url].replace(/"/g,"")+'">';}else{html+='<a class="result">';}if(result[fields.image]!==undefined){html+=''+'<div class="image">'+' <img src="'+result[fields.image].replace(/"/g,"")+'">'+'</div>';}html+='<div class="content">';if(result[fields.price]!==undefined){html+='<div class="price">'+escape(result[fields.price],preserveHTML)+'</div>';}if(result[fields.title]!==undefined){html+='<div class="title">'+escape(result[fields.title],preserveHTML)+'</div>';}if(result[fields.description]!==undefined){html+='<div class="description">'+escape(result[fields.description],preserveHTML)+'</div>';}html+=''+'</div>';html+='</a>';});html+='</div>';html+=''+'</div>';}});if(response[fields.action]){if(fields.actionURL===false){html+=''+'<div class="action">'+escape(response[fields.action][fields.actionText],preserveHTML)+'</div>';}else{html+=''+'<a href="'+response[fields.action][fields.actionURL].replace(/"/g,"")+'" class="action">'+escape(response[fields.action][fields.actionText],preserveHTML)+'</a>';}}return html;}return false;},standard:function standard(response,fields,preserveHTML){var html='',escape=$.fn.search.settings.templates.escape;if(response[fields.results]!==undefined){// each result
$.each(response[fields.results],function(index,result){if(result[fields.url]){html+='<a class="result" href="'+result[fields.url].replace(/"/g,"")+'">';}else{html+='<a class="result">';}if(result[fields.image]!==undefined){html+=''+'<div class="image">'+' <img src="'+result[fields.image].replace(/"/g,"")+'">'+'</div>';}html+='<div class="content">';if(result[fields.price]!==undefined){html+='<div class="price">'+escape(result[fields.price],preserveHTML)+'</div>';}if(result[fields.title]!==undefined){html+='<div class="title">'+escape(result[fields.title],preserveHTML)+'</div>';}if(result[fields.description]!==undefined){html+='<div class="description">'+escape(result[fields.description],preserveHTML)+'</div>';}html+=''+'</div>';html+='</a>';});if(response[fields.action]){if(fields.actionURL===false){html+=''+'<div class="action">'+escape(response[fields.action][fields.actionText],preserveHTML)+'</div>';}else{html+=''+'<a href="'+response[fields.action][fields.actionURL].replace(/"/g,"")+'" class="action">'+escape(response[fields.action][fields.actionText],preserveHTML)+'</a>';}}return html;}return false;}}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Shape
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.shape=function(parameters){var $allModules=$(this),time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);},returnedValue;$allModules.each(function(){var moduleSelector=$allModules.selector||'',settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.shape.settings,parameters):$.extend({},$.fn.shape.settings),// internal aliases
namespace=settings.namespace,selector=settings.selector,error=settings.error,className=settings.className,// define namespaces for modules
eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,// selector cache
$module=$(this),$sides=$module.find('>'+selector.sides),$side=$sides.find('>'+selector.side),// private variables
nextIndex=false,$activeSide,$nextSide,// standard module
element=this,instance=$module.data(moduleNamespace),module;module={initialize:function initialize(){module.verbose('Initializing module for',element);module.set.defaultSide();module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){module.verbose('Destroying previous module for',element);$module.removeData(moduleNamespace).off(eventNamespace);},refresh:function refresh(){module.verbose('Refreshing selector cache for',element);$module=$(element);$sides=$(this).find(selector.sides);$side=$(this).find(selector.side);},repaint:function repaint(){module.verbose('Forcing repaint event');var shape=$sides[0]||document.createElement('div'),fakeAssignment=shape.offsetWidth;},animate:function animate(propertyObject,callback){module.verbose('Animating box with properties',propertyObject);callback=callback||function(event){module.verbose('Executing animation callback');if(event!==undefined){event.stopPropagation();}module.reset();module.set.active();};settings.beforeChange.call($nextSide[0]);if(module.get.transitionEvent()){module.verbose('Starting CSS animation');$module.addClass(className.animating);$sides.css(propertyObject).one(module.get.transitionEvent(),callback);module.set.duration(settings.duration);requestAnimationFrame(function(){$module.addClass(className.animating);$activeSide.addClass(className.hidden);});}else{callback();}},queue:function queue(method){module.debug('Queueing animation of',method);$sides.one(module.get.transitionEvent(),function(){module.debug('Executing queued animation');setTimeout(function(){$module.shape(method);},0);});},reset:function reset(){module.verbose('Animating states reset');$module.removeClass(className.animating).attr('style','').removeAttr('style');// removeAttr style does not consistently work in safari
$sides.attr('style','').removeAttr('style');$side.attr('style','').removeAttr('style').removeClass(className.hidden);$nextSide.removeClass(className.animating).attr('style','').removeAttr('style');},is:{complete:function complete(){return $side.filter('.'+className.active)[0]==$nextSide[0];},animating:function animating(){return $module.hasClass(className.animating);},hidden:function hidden(){return $module.closest(':hidden').length>0;}},set:{defaultSide:function defaultSide(){$activeSide=$side.filter('.'+settings.className.active);$nextSide=$activeSide.next(selector.side).length>0?$activeSide.next(selector.side):$side.first();nextIndex=false;module.verbose('Active side set to',$activeSide);module.verbose('Next side set to',$nextSide);},duration:function duration(_duration2){_duration2=_duration2||settings.duration;_duration2=typeof _duration2=='number'?_duration2+'ms':_duration2;module.verbose('Setting animation duration',_duration2);if(settings.duration||settings.duration===0){$sides.add($side).css({'-webkit-transition-duration':_duration2,'-moz-transition-duration':_duration2,'-ms-transition-duration':_duration2,'-o-transition-duration':_duration2,'transition-duration':_duration2});}},currentStageSize:function currentStageSize(){var $activeSide=$side.filter('.'+settings.className.active),width=$activeSide.outerWidth(true),height=$activeSide.outerHeight(true);$module.css({width:width,height:height});},stageSize:function stageSize(){var $clone=$module.clone().addClass(className.loading),$side=$clone.find('>'+selector.sides+'>'+selector.side),$activeSide=$side.filter('.'+settings.className.active),$nextSide=nextIndex?$side.eq(nextIndex):$activeSide.next(selector.side).length>0?$activeSide.next(selector.side):$side.first(),newWidth=settings.width==='next'?$nextSide.outerWidth(true):settings.width==='initial'?$module.width():settings.width,newHeight=settings.height==='next'?$nextSide.outerHeight(true):settings.height==='initial'?$module.height():settings.height;$activeSide.removeClass(className.active);$nextSide.addClass(className.active);$clone.insertAfter($module);$clone.remove();if(settings.width!=='auto'){$module.css('width',newWidth+settings.jitter);module.verbose('Specifying width during animation',newWidth);}if(settings.height!=='auto'){$module.css('height',newHeight+settings.jitter);module.verbose('Specifying height during animation',newHeight);}},nextSide:function nextSide(selector){nextIndex=selector;$nextSide=$side.filter(selector);nextIndex=$side.index($nextSide);if($nextSide.length===0){module.set.defaultSide();module.error(error.side);}module.verbose('Next side manually set to',$nextSide);},active:function active(){module.verbose('Setting new side to active',$nextSide);$side.removeClass(className.active);$nextSide.addClass(className.active);settings.onChange.call($nextSide[0]);module.set.defaultSide();}},flip:{to:function to(type,stage){if(module.is.hidden()){module.debug('Module not visible',$nextSide);return;}if(module.is.complete()&&!module.is.animating()&&!settings.allowRepeats){module.debug('Side already visible',$nextSide);return;}var transform=module.get.transform[type]();if(!module.is.animating()){module.debug('Flipping '+type,$nextSide);module.set.stageSize();module.stage[stage]();module.animate(transform);}else{module.queue('flip '+type);}},up:function up(){module.flip.to('up','above');},down:function down(){module.flip.to('down','below');},left:function left(){module.flip.to('left','left');},right:function right(){module.flip.to('right','right');},over:function over(){module.flip.to('over','behind');},back:function back(){module.flip.to('back','behind');}},get:{transform:{up:function up(){var translateZ=$activeSide.outerHeight(true)/2,translateY=$nextSide.outerHeight(true)-translateZ;return{transform:'translateY('+translateY+'px) translateZ(-'+translateZ+'px) rotateX(-90deg)'};},down:function down(){var translate={z:$activeSide.outerHeight(true)/2};return{transform:'translateY(-'+translate.z+'px) translateZ(-'+translate.z+'px) rotateX(90deg)'};},left:function left(){var translateZ=$activeSide.outerWidth(true)/2,translateX=$nextSide.outerWidth(true)-translateZ;return{transform:'translateX('+translateX+'px) translateZ(-'+translateZ+'px) rotateY(90deg)'};},right:function right(){var translate={z:$activeSide.outerWidth(true)/2};return{transform:'translateX(-'+translate.z+'px) translateZ(-'+translate.z+'px) rotateY(-90deg)'};},over:function over(){var translate={x:-(($activeSide.outerWidth(true)-$nextSide.outerWidth(true))/2)};return{transform:'translateX('+translate.x+'px) rotateY(180deg)'};},back:function back(){var translate={x:-(($activeSide.outerWidth(true)-$nextSide.outerWidth(true))/2)};return{transform:'translateX('+translate.x+'px) rotateY(-180deg)'};}},transitionEvent:function transitionEvent(){var element=document.createElement('element'),transitions={'transition':'transitionend','OTransition':'oTransitionEnd','MozTransition':'transitionend','WebkitTransition':'webkitTransitionEnd'},transition;for(transition in transitions){if(element.style[transition]!==undefined){return transitions[transition];}}},nextSide:function nextSide(){return $activeSide.next(selector.side).length>0?$activeSide.next(selector.side):$side.first();}},stage:{above:function above(){var box={origin:($activeSide.outerHeight(true)-$nextSide.outerHeight(true))/2,depth:{active:$nextSide.outerHeight(true)/2,next:$activeSide.outerHeight(true)/2}};module.verbose('Setting the initial animation position as above',$nextSide,box);$activeSide.css({'transform':'rotateX(0deg)'});$nextSide.addClass(className.animating).css({'top':box.origin+'px','transform':'rotateX(90deg) translateZ('+box.depth.next+'px) translateY(-'+box.depth.active+'px)'});},below:function below(){var box={origin:($activeSide.outerHeight(true)-$nextSide.outerHeight(true))/2,depth:{active:$nextSide.outerHeight(true)/2,next:$activeSide.outerHeight(true)/2}};module.verbose('Setting the initial animation position as below',$nextSide,box);$activeSide.css({'transform':'rotateX(0deg)'});$nextSide.addClass(className.animating).css({'top':box.origin+'px','transform':'rotateX(-90deg) translateZ('+box.depth.next+'px) translateY('+box.depth.active+'px)'});},left:function left(){var height={active:$activeSide.outerWidth(true),next:$nextSide.outerWidth(true)},box={origin:(height.active-height.next)/2,depth:{active:height.next/2,next:height.active/2}};module.verbose('Setting the initial animation position as left',$nextSide,box);$activeSide.css({'transform':'rotateY(0deg)'});$nextSide.addClass(className.animating).css({'left':box.origin+'px','transform':'rotateY(-90deg) translateZ('+box.depth.next+'px) translateX(-'+box.depth.active+'px)'});},right:function right(){var height={active:$activeSide.outerWidth(true),next:$nextSide.outerWidth(true)},box={origin:(height.active-height.next)/2,depth:{active:height.next/2,next:height.active/2}};module.verbose('Setting the initial animation position as right',$nextSide,box);$activeSide.css({'transform':'rotateY(0deg)'});$nextSide.addClass(className.animating).css({'left':box.origin+'px','transform':'rotateY(90deg) translateZ('+box.depth.next+'px) translateX('+box.depth.active+'px)'});},behind:function behind(){var height={active:$activeSide.outerWidth(true),next:$nextSide.outerWidth(true)},box={origin:(height.active-height.next)/2,depth:{active:height.next/2,next:height.active/2}};module.verbose('Setting the initial animation position as behind',$nextSide,box);$activeSide.css({'transform':'rotateY(0deg)'});$nextSide.addClass(className.animating).css({'left':box.origin+'px','transform':'rotateY(-180deg)'});}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}var $inputs=$module.find('input');if($inputs.length>0){$inputs.blur();setTimeout(function(){module.invoke(query);},150);}else{module.invoke(query);}}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.shape.settings={// module info
name:'Shape',// hide all debug content
silent:false,// debug content outputted to console
debug:false,// verbose debug output
verbose:false,// fudge factor in pixels when swapping from 2d to 3d (can be useful to correct rounding errors)
jitter:0,// performance data output
performance:true,// event namespace
namespace:'shape',// width during animation, can be set to 'auto', initial', 'next' or pixel amount
width:'initial',// height during animation, can be set to 'auto', 'initial', 'next' or pixel amount
height:'initial',// callback occurs on side change
beforeChange:function beforeChange(){},onChange:function onChange(){},// allow animation to same side
allowRepeats:false,// animation duration
duration:false,// possible errors
error:{side:'You tried to switch to a side that does not exist.',method:'The method you called is not defined'},// classnames used
className:{animating:'animating',hidden:'hidden',loading:'loading',active:'active'},// selectors used
selector:{sides:'.sides',side:'.side'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Sidebar
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.sidebar=function(parameters){var $allModules=$(this),$window=$(window),$document=$(document),$html=$('html'),$head=$('head'),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);},returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.sidebar.settings,parameters):$.extend({},$.fn.sidebar.settings),selector=settings.selector,className=settings.className,namespace=settings.namespace,regExp=settings.regExp,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$context=$(settings.context),$sidebars=$module.children(selector.sidebar),$fixed=$context.children(selector.fixed),$pusher=$context.children(selector.pusher),$style,element=this,instance=$module.data(moduleNamespace),elementNamespace,_id4,currentScroll,transitionEvent,module;module={initialize:function initialize(){module.debug('Initializing sidebar',parameters);module.create.id();transitionEvent=module.get.transitionEvent();// avoids locking rendering if initialized in onReady
if(settings.delaySetup){requestAnimationFrame(module.setup.layout);}else{module.setup.layout();}requestAnimationFrame(function(){module.setup.cache();});module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},create:{id:function id(){_id4=(Math.random().toString(16)+'000000000').substr(2,8);elementNamespace='.'+_id4;module.verbose('Creating unique id for element',_id4);}},destroy:function destroy(){module.verbose('Destroying previous module for',$module);$module.off(eventNamespace).removeData(moduleNamespace);if(module.is.ios()){module.remove.ios();}// bound by uuid
$context.off(elementNamespace);$window.off(elementNamespace);$document.off(elementNamespace);},event:{clickaway:function clickaway(event){if(settings.closable){var clickedInPusher=$pusher.find(event.target).length>0||$pusher.is(event.target),clickedContext=$context.is(event.target);if(clickedInPusher){module.verbose('User clicked on dimmed page');module.hide();}if(clickedContext){module.verbose('User clicked on dimmable context (scaled out page)');module.hide();}}},touch:function touch(event){//event.stopPropagation();
},containScroll:function containScroll(event){if(element.scrollTop<=0){element.scrollTop=1;}if(element.scrollTop+element.offsetHeight>=element.scrollHeight){element.scrollTop=element.scrollHeight-element.offsetHeight-1;}},scroll:function scroll(event){if($(event.target).closest(selector.sidebar).length===0){event.preventDefault();}}},bind:{clickaway:function clickaway(){module.verbose('Adding clickaway events to context',$context);$context.on('click'+elementNamespace,module.event.clickaway).on('touchend'+elementNamespace,module.event.clickaway);},scrollLock:function scrollLock(){if(settings.scrollLock){module.debug('Disabling page scroll');$window.on('DOMMouseScroll'+elementNamespace,module.event.scroll);}module.verbose('Adding events to contain sidebar scroll');$document.on('touchmove'+elementNamespace,module.event.touch);$module.on('scroll'+eventNamespace,module.event.containScroll);}},unbind:{clickaway:function clickaway(){module.verbose('Removing clickaway events from context',$context);$context.off(elementNamespace);},scrollLock:function scrollLock(){module.verbose('Removing scroll lock from page');$document.off(elementNamespace);$window.off(elementNamespace);$module.off('scroll'+eventNamespace);}},add:{inlineCSS:function inlineCSS(){var width=module.cache.width||$module.outerWidth(),height=module.cache.height||$module.outerHeight(),isRTL=module.is.rtl(),direction=module.get.direction(),distance={left:width,right:-width,top:height,bottom:-height},style;if(isRTL){module.verbose('RTL detected, flipping widths');distance.left=-width;distance.right=width;}style='<style>';if(direction==='left'||direction==='right'){module.debug('Adding CSS rules for animation distance',width);style+=''+' .ui.visible.'+direction+'.sidebar ~ .fixed,'+' .ui.visible.'+direction+'.sidebar ~ .pusher {'+'   -webkit-transform: translate3d('+distance[direction]+'px, 0, 0);'+'           transform: translate3d('+distance[direction]+'px, 0, 0);'+' }';}else if(direction==='top'||direction=='bottom'){style+=''+' .ui.visible.'+direction+'.sidebar ~ .fixed,'+' .ui.visible.'+direction+'.sidebar ~ .pusher {'+'   -webkit-transform: translate3d(0, '+distance[direction]+'px, 0);'+'           transform: translate3d(0, '+distance[direction]+'px, 0);'+' }';}/* IE is only browser not to create context with transforms */ /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */if(module.is.ie()){if(direction==='left'||direction==='right'){module.debug('Adding CSS rules for animation distance',width);style+=''+' body.pushable > .ui.visible.'+direction+'.sidebar ~ .pusher:after {'+'   -webkit-transform: translate3d('+distance[direction]+'px, 0, 0);'+'           transform: translate3d('+distance[direction]+'px, 0, 0);'+' }';}else if(direction==='top'||direction=='bottom'){style+=''+' body.pushable > .ui.visible.'+direction+'.sidebar ~ .pusher:after {'+'   -webkit-transform: translate3d(0, '+distance[direction]+'px, 0);'+'           transform: translate3d(0, '+distance[direction]+'px, 0);'+' }';}/* opposite sides visible forces content overlay */style+=''+' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after,'+' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {'+'   -webkit-transform: translate3d(0, 0, 0);'+'           transform: translate3d(0, 0, 0);'+' }';}style+='</style>';$style=$(style).appendTo($head);module.debug('Adding sizing css to head',$style);}},refresh:function refresh(){module.verbose('Refreshing selector cache');$context=$(settings.context);$sidebars=$context.children(selector.sidebar);$pusher=$context.children(selector.pusher);$fixed=$context.children(selector.fixed);module.clear.cache();},refreshSidebars:function refreshSidebars(){module.verbose('Refreshing other sidebars');$sidebars=$context.children(selector.sidebar);},repaint:function repaint(){module.verbose('Forcing repaint event');element.style.display='none';var ignored=element.offsetHeight;element.scrollTop=element.scrollTop;element.style.display='';},setup:{cache:function cache(){module.cache={width:$module.outerWidth(),height:$module.outerHeight()};},layout:function layout(){if($context.children(selector.pusher).length===0){module.debug('Adding wrapper element for sidebar');module.error(error.pusher);$pusher=$('<div class="pusher" />');$context.children().not(selector.omitted).not($sidebars).wrapAll($pusher);module.refresh();}if($module.nextAll(selector.pusher).length===0||$module.nextAll(selector.pusher)[0]!==$pusher[0]){module.debug('Moved sidebar to correct parent element');module.error(error.movedSidebar,element);$module.detach().prependTo($context);module.refresh();}module.clear.cache();module.set.pushable();module.set.direction();}},attachEvents:function attachEvents(selector,event){var $toggle=$(selector);event=$.isFunction(module[event])?module[event]:module.toggle;if($toggle.length>0){module.debug('Attaching sidebar events to element',selector,event);$toggle.on('click'+eventNamespace,event);}else{module.error(error.notFound,selector);}},show:function show(callback){callback=$.isFunction(callback)?callback:function(){};if(module.is.hidden()){module.refreshSidebars();if(settings.overlay){module.error(error.overlay);settings.transition='overlay';}module.refresh();if(module.othersActive()){module.debug('Other sidebars currently visible');if(settings.exclusive){// if not overlay queue animation after hide
if(settings.transition!='overlay'){module.hideOthers(module.show);return;}else{module.hideOthers();}}else{settings.transition='overlay';}}module.pushPage(function(){callback.call(element);settings.onShow.call(element);});settings.onChange.call(element);settings.onVisible.call(element);}else{module.debug('Sidebar is already visible');}},hide:function hide(callback){callback=$.isFunction(callback)?callback:function(){};if(module.is.visible()||module.is.animating()){module.debug('Hiding sidebar',callback);module.refreshSidebars();module.pullPage(function(){callback.call(element);settings.onHidden.call(element);});settings.onChange.call(element);settings.onHide.call(element);}},othersAnimating:function othersAnimating(){return $sidebars.not($module).filter('.'+className.animating).length>0;},othersVisible:function othersVisible(){return $sidebars.not($module).filter('.'+className.visible).length>0;},othersActive:function othersActive(){return module.othersVisible()||module.othersAnimating();},hideOthers:function hideOthers(callback){var $otherSidebars=$sidebars.not($module).filter('.'+className.visible),sidebarCount=$otherSidebars.length,callbackCount=0;callback=callback||function(){};$otherSidebars.sidebar('hide',function(){callbackCount++;if(callbackCount==sidebarCount){callback();}});},toggle:function toggle(){module.verbose('Determining toggled direction');if(module.is.hidden()){module.show();}else{module.hide();}},pushPage:function pushPage(callback){var transition=module.get.transition(),$transition=transition==='overlay'||module.othersActive()?$module:$pusher,animate,dim,_transitionEnd;callback=$.isFunction(callback)?callback:function(){};if(settings.transition=='scale down'){module.scrollToTop();}module.set.transition(transition);module.repaint();animate=function animate(){module.bind.clickaway();module.add.inlineCSS();module.set.animating();module.set.visible();};dim=function dim(){module.set.dimmed();};_transitionEnd=function transitionEnd(event){if(event.target==$transition[0]){$transition.off(transitionEvent+elementNamespace,_transitionEnd);module.remove.animating();module.bind.scrollLock();callback.call(element);}};$transition.off(transitionEvent+elementNamespace);$transition.on(transitionEvent+elementNamespace,_transitionEnd);requestAnimationFrame(animate);if(settings.dimPage&&!module.othersVisible()){requestAnimationFrame(dim);}},pullPage:function pullPage(callback){var transition=module.get.transition(),$transition=transition=='overlay'||module.othersActive()?$module:$pusher,animate,_transitionEnd2;callback=$.isFunction(callback)?callback:function(){};module.verbose('Removing context push state',module.get.direction());module.unbind.clickaway();module.unbind.scrollLock();animate=function animate(){module.set.transition(transition);module.set.animating();module.remove.visible();if(settings.dimPage&&!module.othersVisible()){$pusher.removeClass(className.dimmed);}};_transitionEnd2=function transitionEnd(event){if(event.target==$transition[0]){$transition.off(transitionEvent+elementNamespace,_transitionEnd2);module.remove.animating();module.remove.transition();module.remove.inlineCSS();if(transition=='scale down'||settings.returnScroll&&module.is.mobile()){module.scrollBack();}callback.call(element);}};$transition.off(transitionEvent+elementNamespace);$transition.on(transitionEvent+elementNamespace,_transitionEnd2);requestAnimationFrame(animate);},scrollToTop:function scrollToTop(){module.verbose('Scrolling to top of page to avoid animation issues');currentScroll=$(window).scrollTop();$module.scrollTop(0);window.scrollTo(0,0);},scrollBack:function scrollBack(){module.verbose('Scrolling back to original page position');window.scrollTo(0,currentScroll);},clear:{cache:function cache(){module.verbose('Clearing cached dimensions');module.cache={};}},set:{// ios only (scroll on html not document). This prevent auto-resize canvas/scroll in ios
// (This is no longer necessary in latest iOS)
ios:function ios(){$html.addClass(className.ios);},// container
pushed:function pushed(){$context.addClass(className.pushed);},pushable:function pushable(){$context.addClass(className.pushable);},// pusher
dimmed:function dimmed(){$pusher.addClass(className.dimmed);},// sidebar
active:function active(){$module.addClass(className.active);},animating:function animating(){$module.addClass(className.animating);},transition:function transition(_transition){_transition=_transition||module.get.transition();$module.addClass(_transition);},direction:function direction(_direction){_direction=_direction||module.get.direction();$module.addClass(className[_direction]);},visible:function visible(){$module.addClass(className.visible);},overlay:function overlay(){$module.addClass(className.overlay);}},remove:{inlineCSS:function inlineCSS(){module.debug('Removing inline css styles',$style);if($style&&$style.length>0){$style.remove();}},// ios scroll on html not document
ios:function ios(){$html.removeClass(className.ios);},// context
pushed:function pushed(){$context.removeClass(className.pushed);},pushable:function pushable(){$context.removeClass(className.pushable);},// sidebar
active:function active(){$module.removeClass(className.active);},animating:function animating(){$module.removeClass(className.animating);},transition:function transition(_transition2){_transition2=_transition2||module.get.transition();$module.removeClass(_transition2);},direction:function direction(_direction2){_direction2=_direction2||module.get.direction();$module.removeClass(className[_direction2]);},visible:function visible(){$module.removeClass(className.visible);},overlay:function overlay(){$module.removeClass(className.overlay);}},get:{direction:function direction(){if($module.hasClass(className.top)){return className.top;}else if($module.hasClass(className.right)){return className.right;}else if($module.hasClass(className.bottom)){return className.bottom;}return className.left;},transition:function transition(){var direction=module.get.direction(),transition;transition=module.is.mobile()?settings.mobileTransition=='auto'?settings.defaultTransition.mobile[direction]:settings.mobileTransition:settings.transition=='auto'?settings.defaultTransition.computer[direction]:settings.transition;module.verbose('Determined transition',transition);return transition;},transitionEvent:function transitionEvent(){var element=document.createElement('element'),transitions={'transition':'transitionend','OTransition':'oTransitionEnd','MozTransition':'transitionend','WebkitTransition':'webkitTransitionEnd'},transition;for(transition in transitions){if(element.style[transition]!==undefined){return transitions[transition];}}}},is:{ie:function ie(){var isIE11=!window.ActiveXObject&&'ActiveXObject'in window,isIE=('ActiveXObject'in window);return isIE11||isIE;},ios:function ios(){var userAgent=navigator.userAgent,isIOS=userAgent.match(regExp.ios),isMobileChrome=userAgent.match(regExp.mobileChrome);if(isIOS&&!isMobileChrome){module.verbose('Browser was found to be iOS',userAgent);return true;}else{return false;}},mobile:function mobile(){var userAgent=navigator.userAgent,isMobile=userAgent.match(regExp.mobile);if(isMobile){module.verbose('Browser was found to be mobile',userAgent);return true;}else{module.verbose('Browser is not mobile, using regular transition',userAgent);return false;}},hidden:function hidden(){return!module.is.visible();},visible:function visible(){return $module.hasClass(className.visible);},// alias
open:function open(){return module.is.visible();},closed:function closed(){return module.is.hidden();},vertical:function vertical(){return $module.hasClass(className.top);},animating:function animating(){return $context.hasClass(className.animating);},rtl:function rtl(){if(module.cache.rtl===undefined){module.cache.rtl=$module.attr('dir')==='rtl'||$module.css('direction')==='rtl';}return module.cache.rtl;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){module.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.sidebar.settings={name:'Sidebar',namespace:'sidebar',silent:false,debug:false,verbose:false,performance:true,transition:'auto',mobileTransition:'auto',defaultTransition:{computer:{left:'uncover',right:'uncover',top:'overlay',bottom:'overlay'},mobile:{left:'uncover',right:'uncover',top:'overlay',bottom:'overlay'}},context:'body',exclusive:false,closable:true,dimPage:true,scrollLock:false,returnScroll:false,delaySetup:false,duration:500,onChange:function onChange(){},onShow:function onShow(){},onHide:function onHide(){},onHidden:function onHidden(){},onVisible:function onVisible(){},className:{active:'active',animating:'animating',dimmed:'dimmed',ios:'ios',pushable:'pushable',pushed:'pushed',right:'right',top:'top',left:'left',bottom:'bottom',visible:'visible'},selector:{fixed:'.fixed',omitted:'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',pusher:'.pusher',sidebar:'.ui.sidebar'},regExp:{ios:/(iPad|iPhone|iPod)/g,mobileChrome:/(CriOS)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:'The method you called is not defined.',pusher:'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',movedSidebar:'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',overlay:'The overlay setting is no longer supported, use animation: overlay',notFound:'There were no elements that matched the specified selector'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Sticky
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.sticky=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.sticky.settings,parameters):$.extend({},$.fn.sticky.settings),className=settings.className,namespace=settings.namespace,error=settings.error,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$module=$(this),$window=$(window),$scroll=$(settings.scrollContext),$container,$context,instance=$module.data(moduleNamespace),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);},element=this,documentObserver,observer,module;module={initialize:function initialize(){module.determineContainer();module.determineContext();module.verbose('Initializing sticky',settings,$container);module.save.positions();module.checkErrors();module.bind.events();if(settings.observeChanges){module.observeChanges();}module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous instance');module.reset();if(documentObserver){documentObserver.disconnect();}if(observer){observer.disconnect();}$window.off('load'+eventNamespace,module.event.load).off('resize'+eventNamespace,module.event.resize);$scroll.off('scrollchange'+eventNamespace,module.event.scrollchange);$module.removeData(moduleNamespace);},observeChanges:function observeChanges(){if('MutationObserver'in window){documentObserver=new MutationObserver(module.event.documentChanged);observer=new MutationObserver(module.event.changed);documentObserver.observe(document,{childList:true,subtree:true});observer.observe(element,{childList:true,subtree:true});observer.observe($context[0],{childList:true,subtree:true});module.debug('Setting up mutation observer',observer);}},determineContainer:function determineContainer(){if(settings.container){$container=$(settings.container);}else{$container=$module.offsetParent();}},determineContext:function determineContext(){if(settings.context){$context=$(settings.context);}else{$context=$container;}if($context.length===0){module.error(error.invalidContext,settings.context,$module);return;}},checkErrors:function checkErrors(){if(module.is.hidden()){module.error(error.visible,$module);}if(module.cache.element.height>module.cache.context.height){module.reset();module.error(error.elementSize,$module);return;}},bind:{events:function events(){$window.on('load'+eventNamespace,module.event.load).on('resize'+eventNamespace,module.event.resize);// pub/sub pattern
$scroll.off('scroll'+eventNamespace).on('scroll'+eventNamespace,module.event.scroll).on('scrollchange'+eventNamespace,module.event.scrollchange);}},event:{changed:function changed(mutations){clearTimeout(module.timer);module.timer=setTimeout(function(){module.verbose('DOM tree modified, updating sticky menu',mutations);module.refresh();},100);},documentChanged:function documentChanged(mutations){[].forEach.call(mutations,function(mutation){if(mutation.removedNodes){[].forEach.call(mutation.removedNodes,function(node){if(node==element||$(node).find(element).length>0){module.debug('Element removed from DOM, tearing down events');module.destroy();}});}});},load:function load(){module.verbose('Page contents finished loading');requestAnimationFrame(module.refresh);},resize:function resize(){module.verbose('Window resized');requestAnimationFrame(module.refresh);},scroll:function scroll(){requestAnimationFrame(function(){$scroll.triggerHandler('scrollchange'+eventNamespace,$scroll.scrollTop());});},scrollchange:function scrollchange(event,scrollPosition){module.stick(scrollPosition);settings.onScroll.call(element);}},refresh:function refresh(hardRefresh){module.reset();if(!settings.context){module.determineContext();}if(hardRefresh){module.determineContainer();}module.save.positions();module.stick();settings.onReposition.call(element);},supports:{sticky:function sticky(){var $element=$('<div/>');$element.addClass(className.supported);return $element.css('position').match('sticky');}},save:{lastScroll:function lastScroll(scroll){module.lastScroll=scroll;},elementScroll:function elementScroll(scroll){module.elementScroll=scroll;},positions:function positions(){var scrollContext={height:$scroll.height()},element={margin:{top:parseInt($module.css('margin-top'),10),bottom:parseInt($module.css('margin-bottom'),10)},offset:$module.offset(),width:$module.outerWidth(),height:$module.outerHeight()},context={offset:$context.offset(),height:$context.outerHeight()};if(!module.is.standardScroll()){module.debug('Non-standard scroll. Removing scroll offset from element offset');scrollContext.top=$scroll.scrollTop();scrollContext.left=$scroll.scrollLeft();element.offset.top+=scrollContext.top;context.offset.top+=scrollContext.top;element.offset.left+=scrollContext.left;context.offset.left+=scrollContext.left;}module.cache={fits:element.height+settings.offset<=scrollContext.height,sameHeight:element.height==context.height,scrollContext:{height:scrollContext.height},element:{margin:element.margin,top:element.offset.top-element.margin.top,left:element.offset.left,width:element.width,height:element.height,bottom:element.offset.top+element.height},context:{top:context.offset.top,height:context.height,bottom:context.offset.top+context.height}};module.set.containerSize();module.stick();module.debug('Caching element positions',module.cache);}},get:{direction:function direction(scroll){var direction='down';scroll=scroll||$scroll.scrollTop();if(module.lastScroll!==undefined){if(module.lastScroll<scroll){direction='down';}else if(module.lastScroll>scroll){direction='up';}}return direction;},scrollChange:function scrollChange(scroll){scroll=scroll||$scroll.scrollTop();return module.lastScroll?scroll-module.lastScroll:0;},currentElementScroll:function currentElementScroll(){if(module.elementScroll){return module.elementScroll;}return module.is.top()?Math.abs(parseInt($module.css('top'),10))||0:Math.abs(parseInt($module.css('bottom'),10))||0;},elementScroll:function elementScroll(scroll){scroll=scroll||$scroll.scrollTop();var element=module.cache.element,scrollContext=module.cache.scrollContext,delta=module.get.scrollChange(scroll),maxScroll=element.height-scrollContext.height+settings.offset,elementScroll=module.get.currentElementScroll(),possibleScroll=elementScroll+delta;if(module.cache.fits||possibleScroll<0){elementScroll=0;}else if(possibleScroll>maxScroll){elementScroll=maxScroll;}else{elementScroll=possibleScroll;}return elementScroll;}},remove:{lastScroll:function lastScroll(){delete module.lastScroll;},elementScroll:function elementScroll(scroll){delete module.elementScroll;},minimumSize:function minimumSize(){$container.css('min-height','');},offset:function offset(){$module.css('margin-top','');}},set:{offset:function offset(){module.verbose('Setting offset on element',settings.offset);$module.css('margin-top',settings.offset);},containerSize:function containerSize(){var tagName=$container.get(0).tagName;if(tagName==='HTML'||tagName=='body'){// this can trigger for too many reasons
//module.error(error.container, tagName, $module);
module.determineContainer();}else{if(Math.abs($container.outerHeight()-module.cache.context.height)>settings.jitter){module.debug('Context has padding, specifying exact height for container',module.cache.context.height);$container.css({height:module.cache.context.height});}}},minimumSize:function minimumSize(){var element=module.cache.element;$container.css('min-height',element.height);},scroll:function scroll(_scroll){module.debug('Setting scroll on element',_scroll);if(module.elementScroll==_scroll){return;}if(module.is.top()){$module.css('bottom','').css('top',-_scroll);}if(module.is.bottom()){$module.css('top','').css('bottom',_scroll);}},size:function size(){if(module.cache.element.height!==0&&module.cache.element.width!==0){element.style.setProperty('width',module.cache.element.width+'px','important');element.style.setProperty('height',module.cache.element.height+'px','important');}}},is:{standardScroll:function standardScroll(){return $scroll[0]==window;},top:function top(){return $module.hasClass(className.top);},bottom:function bottom(){return $module.hasClass(className.bottom);},initialPosition:function initialPosition(){return!module.is.fixed()&&!module.is.bound();},hidden:function hidden(){return!$module.is(':visible');},bound:function bound(){return $module.hasClass(className.bound);},fixed:function fixed(){return $module.hasClass(className.fixed);}},stick:function stick(scroll){var cachedPosition=scroll||$scroll.scrollTop(),cache=module.cache,fits=cache.fits,sameHeight=cache.sameHeight,element=cache.element,scrollContext=cache.scrollContext,context=cache.context,offset=module.is.bottom()&&settings.pushing?settings.bottomOffset:settings.offset,scroll={top:cachedPosition+offset,bottom:cachedPosition+offset+scrollContext.height},elementScroll=fits?0:module.get.elementScroll(scroll.top),// shorthand
doesntFit=!fits,elementVisible=element.height!==0;if(elementVisible&&!sameHeight){if(module.is.initialPosition()){if(scroll.top>=context.bottom){module.debug('Initial element position is bottom of container');module.bindBottom();}else if(scroll.top>element.top){if(element.height+scroll.top-elementScroll>=context.bottom){module.debug('Initial element position is bottom of container');module.bindBottom();}else{module.debug('Initial element position is fixed');module.fixTop();}}}else if(module.is.fixed()){// currently fixed top
if(module.is.top()){if(scroll.top<=element.top){module.debug('Fixed element reached top of container');module.setInitialPosition();}else if(element.height+scroll.top-elementScroll>=context.bottom){module.debug('Fixed element reached bottom of container');module.bindBottom();}// scroll element if larger than screen
else if(doesntFit){module.set.scroll(elementScroll);module.save.lastScroll(scroll.top);module.save.elementScroll(elementScroll);}}// currently fixed bottom
else if(module.is.bottom()){// top edge
if(scroll.bottom-element.height<=element.top){module.debug('Bottom fixed rail has reached top of container');module.setInitialPosition();}// bottom edge
else if(scroll.bottom>=context.bottom){module.debug('Bottom fixed rail has reached bottom of container');module.bindBottom();}// scroll element if larger than screen
else if(doesntFit){module.set.scroll(elementScroll);module.save.lastScroll(scroll.top);module.save.elementScroll(elementScroll);}}}else if(module.is.bottom()){if(scroll.top<=element.top){module.debug('Jumped from bottom fixed to top fixed, most likely used home/end button');module.setInitialPosition();}else{if(settings.pushing){if(module.is.bound()&&scroll.bottom<=context.bottom){module.debug('Fixing bottom attached element to bottom of browser.');module.fixBottom();}}else{if(module.is.bound()&&scroll.top<=context.bottom-element.height){module.debug('Fixing bottom attached element to top of browser.');module.fixTop();}}}}}},bindTop:function bindTop(){module.debug('Binding element to top of parent container');module.remove.offset();$module.css({left:'',top:'',marginBottom:''}).removeClass(className.fixed).removeClass(className.bottom).addClass(className.bound).addClass(className.top);settings.onTop.call(element);settings.onUnstick.call(element);},bindBottom:function bindBottom(){module.debug('Binding element to bottom of parent container');module.remove.offset();$module.css({left:'',top:''}).removeClass(className.fixed).removeClass(className.top).addClass(className.bound).addClass(className.bottom);settings.onBottom.call(element);settings.onUnstick.call(element);},setInitialPosition:function setInitialPosition(){module.debug('Returning to initial position');module.unfix();module.unbind();},fixTop:function fixTop(){module.debug('Fixing element to top of page');if(settings.setSize){module.set.size();}module.set.minimumSize();module.set.offset();$module.css({left:module.cache.element.left,bottom:'',marginBottom:''}).removeClass(className.bound).removeClass(className.bottom).addClass(className.fixed).addClass(className.top);settings.onStick.call(element);},fixBottom:function fixBottom(){module.debug('Sticking element to bottom of page');if(settings.setSize){module.set.size();}module.set.minimumSize();module.set.offset();$module.css({left:module.cache.element.left,bottom:'',marginBottom:''}).removeClass(className.bound).removeClass(className.top).addClass(className.fixed).addClass(className.bottom);settings.onStick.call(element);},unbind:function unbind(){if(module.is.bound()){module.debug('Removing container bound position on element');module.remove.offset();$module.removeClass(className.bound).removeClass(className.top).removeClass(className.bottom);}},unfix:function unfix(){if(module.is.fixed()){module.debug('Removing fixed position on element');module.remove.minimumSize();module.remove.offset();$module.removeClass(className.fixed).removeClass(className.top).removeClass(className.bottom);settings.onUnstick.call(element);}},reset:function reset(){module.debug('Resetting elements position');module.unbind();module.unfix();module.resetCSS();module.remove.offset();module.remove.lastScroll();},resetCSS:function resetCSS(){$module.css({width:'',height:''});$container.css({height:''});},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){settings[name]=value;}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,0);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.sticky.settings={name:'Sticky',namespace:'sticky',silent:false,debug:false,verbose:true,performance:true,// whether to stick in the opposite direction on scroll up
pushing:false,context:false,container:false,// Context to watch scroll events
scrollContext:window,// Offset to adjust scroll
offset:0,// Offset to adjust scroll when attached to bottom of screen
bottomOffset:0,// will only set container height if difference between context and container is larger than this number
jitter:5,// set width of sticky element when it is fixed to page (used to make sure 100% width is maintained if no fixed size set)
setSize:true,// Whether to automatically observe changes with Mutation Observers
observeChanges:false,// Called when position is recalculated
onReposition:function onReposition(){},// Called on each scroll
onScroll:function onScroll(){},// Called when element is stuck to viewport
onStick:function onStick(){},// Called when element is unstuck from viewport
onUnstick:function onUnstick(){},// Called when element reaches top of context
onTop:function onTop(){},// Called when element reaches bottom of context
onBottom:function onBottom(){},error:{container:'Sticky element must be inside a relative container',visible:'Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.',method:'The method you called is not defined.',invalidContext:'Context specified does not exist',elementSize:'Sticky element is larger than its container, cannot create sticky.'},className:{bound:'bound',fixed:'fixed',supported:'native',top:'top',bottom:'bottom'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Tab
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isWindow=$.isWindow||function(obj){return obj!=null&&obj===obj.window;};$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.tab=function(parameters){var// use window context if none specified
$allModules=$.isFunction(this)?$(window):$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),initializedHistory=false,returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.tab.settings,parameters):$.extend({},$.fn.tab.settings),className=settings.className,metadata=settings.metadata,selector=settings.selector,error=settings.error,regExp=settings.regExp,eventNamespace='.'+settings.namespace,moduleNamespace='module-'+settings.namespace,$module=$(this),$context,$tabs,cache={},firstLoad=true,recursionDepth=0,element=this,instance=$module.data(moduleNamespace),activeTabPath,parameterArray,module,historyEvent;module={initialize:function initialize(){module.debug('Initializing tab menu item',$module);module.fix.callbacks();module.determineTabs();module.debug('Determining tabs',settings.context,$tabs);// set up automatic routing
if(settings.auto){module.set.auto();}module.bind.events();if(settings.history&&!initializedHistory){module.initializeHistory();initializedHistory=true;}if(instance===undefined&&module.determine.activeTab()==null){module.debug('No active tab detected, setting first tab active',module.get.initialPath());module.changeTab(module.get.initialPath());};module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.debug('Destroying tabs',$module);$module.removeData(moduleNamespace).off(eventNamespace);},bind:{events:function events(){// if using $.tab don't add events
if(!$.isWindow(element)){module.debug('Attaching tab activation events to element',$module);$module.on('click'+eventNamespace,module.event.click);}}},determineTabs:function determineTabs(){var $reference;// determine tab context
if(settings.context==='parent'){if($module.closest(selector.ui).length>0){$reference=$module.closest(selector.ui);module.verbose('Using closest UI element as parent',$reference);}else{$reference=$module;}$context=$reference.parent();module.verbose('Determined parent element for creating context',$context);}else if(settings.context){$context=$(settings.context);module.verbose('Using selector for tab context',settings.context,$context);}else{$context=$('body');}// find tabs
if(settings.childrenOnly){$tabs=$context.children(selector.tabs);module.debug('Searching tab context children for tabs',$context,$tabs);}else{$tabs=$context.find(selector.tabs);module.debug('Searching tab context for tabs',$context,$tabs);}},fix:{callbacks:function callbacks(){if($.isPlainObject(parameters)&&(parameters.onTabLoad||parameters.onTabInit)){if(parameters.onTabLoad){parameters.onLoad=parameters.onTabLoad;delete parameters.onTabLoad;module.error(error.legacyLoad,parameters.onLoad);}if(parameters.onTabInit){parameters.onFirstLoad=parameters.onTabInit;delete parameters.onTabInit;module.error(error.legacyInit,parameters.onFirstLoad);}settings=$.extend(true,{},$.fn.tab.settings,parameters);}}},initializeHistory:function initializeHistory(){module.debug('Initializing page state');if($.address===undefined){module.error(error.state);return false;}else{if(settings.historyType=='state'){module.debug('Using HTML5 to manage state');if(settings.path!==false){$.address.history(true).state(settings.path);}else{module.error(error.path);return false;}}$.address.bind('change',module.event.history.change);}},event:{click:function click(event){var tabPath=$(this).data(metadata.tab);if(tabPath!==undefined){if(settings.history){module.verbose('Updating page state',event);$.address.value(tabPath);}else{module.verbose('Changing tab',event);module.changeTab(tabPath);}event.preventDefault();}else{module.debug('No tab specified');}},history:{change:function change(event){var tabPath=event.pathNames.join('/')||module.get.initialPath(),pageTitle=settings.templates.determineTitle(tabPath)||false;module.performance.display();module.debug('History change event',tabPath,event);historyEvent=event;if(tabPath!==undefined){module.changeTab(tabPath);}if(pageTitle){$.address.title(pageTitle);}}}},refresh:function refresh(){if(activeTabPath){module.debug('Refreshing tab',activeTabPath);module.changeTab(activeTabPath);}},cache:{read:function read(cacheKey){return cacheKey!==undefined?cache[cacheKey]:false;},add:function add(cacheKey,content){cacheKey=cacheKey||activeTabPath;module.debug('Adding cached content for',cacheKey);cache[cacheKey]=content;},remove:function remove(cacheKey){cacheKey=cacheKey||activeTabPath;module.debug('Removing cached content for',cacheKey);delete cache[cacheKey];}},escape:{string:function string(text){text=String(text);return text.replace(regExp.escape,'\\$&');}},set:{auto:function auto(){var url=typeof settings.path=='string'?settings.path.replace(/\/$/,'')+'/{$tab}':'/{$tab}';module.verbose('Setting up automatic tab retrieval from server',url);if($.isPlainObject(settings.apiSettings)){settings.apiSettings.url=url;}else{settings.apiSettings={url:url};}},loading:function loading(tabPath){var $tab=module.get.tabElement(tabPath),isLoading=$tab.hasClass(className.loading);if(!isLoading){module.verbose('Setting loading state for',$tab);$tab.addClass(className.loading).siblings($tabs).removeClass(className.active+' '+className.loading);if($tab.length>0){settings.onRequest.call($tab[0],tabPath);}}},state:function state(_state){$.address.value(_state);}},changeTab:function changeTab(tabPath){var pushStateAvailable=window.history&&window.history.pushState,shouldIgnoreLoad=pushStateAvailable&&settings.ignoreFirstLoad&&firstLoad,remoteContent=settings.auto||$.isPlainObject(settings.apiSettings),// only add default path if not remote content
pathArray=remoteContent&&!shouldIgnoreLoad?module.utilities.pathToArray(tabPath):module.get.defaultPathArray(tabPath);tabPath=module.utilities.arrayToPath(pathArray);$.each(pathArray,function(index,tab){var currentPathArray=pathArray.slice(0,index+1),currentPath=module.utilities.arrayToPath(currentPathArray),isTab=module.is.tab(currentPath),isLastIndex=index+1==pathArray.length,$tab=module.get.tabElement(currentPath),$anchor,nextPathArray,nextPath,isLastTab;module.verbose('Looking for tab',tab);if(isTab){module.verbose('Tab was found',tab);// scope up
activeTabPath=currentPath;parameterArray=module.utilities.filterArray(pathArray,currentPathArray);if(isLastIndex){isLastTab=true;}else{nextPathArray=pathArray.slice(0,index+2);nextPath=module.utilities.arrayToPath(nextPathArray);isLastTab=!module.is.tab(nextPath);if(isLastTab){module.verbose('Tab parameters found',nextPathArray);}}if(isLastTab&&remoteContent){if(!shouldIgnoreLoad){module.activate.navigation(currentPath);module.fetch.content(currentPath,tabPath);}else{module.debug('Ignoring remote content on first tab load',currentPath);firstLoad=false;module.cache.add(tabPath,$tab.html());module.activate.all(currentPath);settings.onFirstLoad.call($tab[0],currentPath,parameterArray,historyEvent);settings.onLoad.call($tab[0],currentPath,parameterArray,historyEvent);}return false;}else{module.debug('Opened local tab',currentPath);module.activate.all(currentPath);if(!module.cache.read(currentPath)){module.cache.add(currentPath,true);module.debug('First time tab loaded calling tab init');settings.onFirstLoad.call($tab[0],currentPath,parameterArray,historyEvent);}settings.onLoad.call($tab[0],currentPath,parameterArray,historyEvent);}}else if(tabPath.search('/')==-1&&tabPath!==''){// look for in page anchor
tabPath=module.escape.string(tabPath);$anchor=$('#'+tabPath+', a[name="'+tabPath+'"]');currentPath=$anchor.closest('[data-tab]').data(metadata.tab);$tab=module.get.tabElement(currentPath);// if anchor exists use parent tab
if($anchor&&$anchor.length>0&&currentPath){module.debug('Anchor link used, opening parent tab',$tab,$anchor);if(!$tab.hasClass(className.active)){setTimeout(function(){module.scrollTo($anchor);},0);}module.activate.all(currentPath);if(!module.cache.read(currentPath)){module.cache.add(currentPath,true);module.debug('First time tab loaded calling tab init');settings.onFirstLoad.call($tab[0],currentPath,parameterArray,historyEvent);}settings.onLoad.call($tab[0],currentPath,parameterArray,historyEvent);return false;}}else{module.error(error.missingTab,$module,$context,currentPath);return false;}});},scrollTo:function scrollTo($element){var scrollOffset=$element&&$element.length>0?$element.offset().top:false;if(scrollOffset!==false){module.debug('Forcing scroll to an in-page link in a hidden tab',scrollOffset,$element);$(document).scrollTop(scrollOffset);}},update:{content:function content(tabPath,html,evaluateScripts){var $tab=module.get.tabElement(tabPath),tab=$tab[0];evaluateScripts=evaluateScripts!==undefined?evaluateScripts:settings.evaluateScripts;if(typeof settings.cacheType=='string'&&settings.cacheType.toLowerCase()=='dom'&&typeof html!=='string'){$tab.empty().append($(html).clone(true));}else{if(evaluateScripts){module.debug('Updating HTML and evaluating inline scripts',tabPath,html);$tab.html(html);}else{module.debug('Updating HTML',tabPath,html);tab.innerHTML=html;}}}},fetch:{content:function content(tabPath,fullTabPath){var $tab=module.get.tabElement(tabPath),apiSettings={dataType:'html',encodeParameters:false,on:'now',cache:settings.alwaysRefresh,headers:{'X-Remote':true},onSuccess:function onSuccess(response){if(settings.cacheType=='response'){module.cache.add(fullTabPath,response);}module.update.content(tabPath,response);if(tabPath==activeTabPath){module.debug('Content loaded',tabPath);module.activate.tab(tabPath);}else{module.debug('Content loaded in background',tabPath);}settings.onFirstLoad.call($tab[0],tabPath,parameterArray,historyEvent);settings.onLoad.call($tab[0],tabPath,parameterArray,historyEvent);if(settings.loadOnce){module.cache.add(fullTabPath,true);}else if(typeof settings.cacheType=='string'&&settings.cacheType.toLowerCase()=='dom'&&$tab.children().length>0){setTimeout(function(){var $clone=$tab.children().clone(true);$clone=$clone.not('script');module.cache.add(fullTabPath,$clone);},0);}else{module.cache.add(fullTabPath,$tab.html());}},urlData:{tab:fullTabPath}},request=$tab.api('get request')||false,existingRequest=request&&request.state()==='pending',requestSettings,cachedContent;fullTabPath=fullTabPath||tabPath;cachedContent=module.cache.read(fullTabPath);if(settings.cache&&cachedContent){module.activate.tab(tabPath);module.debug('Adding cached content',fullTabPath);if(!settings.loadOnce){if(settings.evaluateScripts=='once'){module.update.content(tabPath,cachedContent,false);}else{module.update.content(tabPath,cachedContent);}}settings.onLoad.call($tab[0],tabPath,parameterArray,historyEvent);}else if(existingRequest){module.set.loading(tabPath);module.debug('Content is already loading',fullTabPath);}else if($.api!==undefined){requestSettings=$.extend(true,{},settings.apiSettings,apiSettings);module.debug('Retrieving remote content',fullTabPath,requestSettings);module.set.loading(tabPath);$tab.api(requestSettings);}else{module.error(error.api);}}},activate:{all:function all(tabPath){module.activate.tab(tabPath);module.activate.navigation(tabPath);},tab:function tab(tabPath){var $tab=module.get.tabElement(tabPath),$deactiveTabs=settings.deactivate=='siblings'?$tab.siblings($tabs):$tabs.not($tab),isActive=$tab.hasClass(className.active);module.verbose('Showing tab content for',$tab);if(!isActive){$tab.addClass(className.active);$deactiveTabs.removeClass(className.active+' '+className.loading);if($tab.length>0){settings.onVisible.call($tab[0],tabPath);}}},navigation:function navigation(tabPath){var $navigation=module.get.navElement(tabPath),$deactiveNavigation=settings.deactivate=='siblings'?$navigation.siblings($allModules):$allModules.not($navigation),isActive=$navigation.hasClass(className.active);module.verbose('Activating tab navigation for',$navigation,tabPath);if(!isActive){$navigation.addClass(className.active);$deactiveNavigation.removeClass(className.active+' '+className.loading);}}},deactivate:{all:function all(){module.deactivate.navigation();module.deactivate.tabs();},navigation:function navigation(){$allModules.removeClass(className.active);},tabs:function tabs(){$tabs.removeClass(className.active+' '+className.loading);}},is:{tab:function tab(tabName){return tabName!==undefined?module.get.tabElement(tabName).length>0:false;}},get:{initialPath:function initialPath(){return $allModules.eq(0).data(metadata.tab)||$tabs.eq(0).data(metadata.tab);},path:function path(){return $.address.value();},// adds default tabs to tab path
defaultPathArray:function defaultPathArray(tabPath){return module.utilities.pathToArray(module.get.defaultPath(tabPath));},defaultPath:function defaultPath(tabPath){var $defaultNav=$allModules.filter('[data-'+metadata.tab+'^="'+module.escape.string(tabPath)+'/"]').eq(0),defaultTab=$defaultNav.data(metadata.tab)||false;if(defaultTab){module.debug('Found default tab',defaultTab);if(recursionDepth<settings.maxDepth){recursionDepth++;return module.get.defaultPath(defaultTab);}module.error(error.recursion);}else{module.debug('No default tabs found for',tabPath,$tabs);}recursionDepth=0;return tabPath;},navElement:function navElement(tabPath){tabPath=tabPath||activeTabPath;return $allModules.filter('[data-'+metadata.tab+'="'+module.escape.string(tabPath)+'"]');},tabElement:function tabElement(tabPath){var $fullPathTab,$simplePathTab,tabPathArray,lastTab;tabPath=tabPath||activeTabPath;tabPathArray=module.utilities.pathToArray(tabPath);lastTab=module.utilities.last(tabPathArray);$fullPathTab=$tabs.filter('[data-'+metadata.tab+'="'+module.escape.string(tabPath)+'"]');$simplePathTab=$tabs.filter('[data-'+metadata.tab+'="'+module.escape.string(lastTab)+'"]');return $fullPathTab.length>0?$fullPathTab:$simplePathTab;},tab:function tab(){return activeTabPath;}},determine:{activeTab:function activeTab(){var activeTab=null;$tabs.each(function(_index,tab){var $tab=$(tab);if($tab.hasClass(className.active)){var tabPath=$(this).data(metadata.tab),$anchor=$allModules.filter('[data-'+metadata.tab+'="'+module.escape.string(tabPath)+'"]');if($anchor.hasClass(className.active)){activeTab=tabPath;}}});return activeTab;}},utilities:{filterArray:function filterArray(keepArray,removeArray){return $.grep(keepArray,function(keepValue){return $.inArray(keepValue,removeArray)==-1;});},last:function last(array){return Array.isArray(array)?array[array.length-1]:false;},pathToArray:function pathToArray(pathName){if(pathName===undefined){pathName=activeTabPath;}return typeof pathName=='string'?pathName.split('/'):[pathName];},arrayToPath:function arrayToPath(pathArray){return Array.isArray(pathArray)?pathArray.join('/'):false;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};// shortcut for tabbed content with no defined navigation
$.tab=function(){$(window).tab.apply(this,arguments);};$.fn.tab.settings={name:'Tab',namespace:'tab',silent:false,debug:false,verbose:false,performance:true,auto:false,// uses pjax style endpoints fetching content from same url with remote-content headers
history:false,// use browser history
historyType:'hash',// #/ or html5 state
path:false,// base path of url
context:false,// specify a context that tabs must appear inside
childrenOnly:false,// use only tabs that are children of context
maxDepth:25,// max depth a tab can be nested
deactivate:'siblings',// whether tabs should deactivate sibling menu elements or all elements initialized together
alwaysRefresh:false,// load tab content new every tab click
cache:true,// cache the content requests to pull locally
loadOnce:false,// Whether tab data should only be loaded once when using remote content
cacheType:'response',// Whether to cache exact response, or to html cache contents after scripts execute
ignoreFirstLoad:false,// don't load remote content on first load
apiSettings:false,// settings for api call
evaluateScripts:'once',// whether inline scripts should be parsed (true/false/once). Once will not re-evaluate on cached content
onFirstLoad:function onFirstLoad(tabPath,parameterArray,historyEvent){},// called first time loaded
onLoad:function onLoad(tabPath,parameterArray,historyEvent){},// called on every load
onVisible:function onVisible(tabPath,parameterArray,historyEvent){},// called every time tab visible
onRequest:function onRequest(tabPath,parameterArray,historyEvent){},// called ever time a tab beings loading remote content
templates:{determineTitle:function determineTitle(tabArray){}// returns page title for path
},error:{api:'You attempted to load content without API module',method:'The method you called is not defined',missingTab:'Activated tab cannot be found. Tabs are case-sensitive.',noContent:'The tab you specified is missing a content url.',path:'History enabled, but no path was specified',recursion:'Max recursive depth reached',legacyInit:'onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.',legacyLoad:'onTabLoad has been renamed to onLoad in 2.0. Please adjust your code',state:'History requires Asual\'s Address library <https://github.com/asual/jquery-address>'},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s:=@]/g},metadata:{tab:'tab',loaded:'loaded',promise:'promise'},className:{loading:'loading',active:'active'},selector:{tabs:'.ui.tab',ui:'.ui'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Toast
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.toast=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.toast.settings,parameters):$.extend({},$.fn.toast.settings),className=settings.className,selector=settings.selector,error=settings.error,namespace=settings.namespace,fields=settings.fields,eventNamespace='.'+namespace,moduleNamespace=namespace+'-module',$module=$(this),$toastBox,$toast,$actions,$progress,$progressBar,$animationObject,$close,$context=settings.context?$(settings.context):$('body'),isToastComponent=$module.hasClass('toast')||$module.hasClass('message')||$module.hasClass('card'),element=this,instance=isToastComponent?$module.data(moduleNamespace):undefined,module;module={initialize:function initialize(){module.verbose('Initializing element');if(!module.has.container()){module.create.container();}if(isToastComponent||settings.message!==''||settings.title!==''||module.get.iconClass()!==''||settings.showImage||module.has.configActions()){if(typeof settings.showProgress!=='string'||[className.top,className.bottom].indexOf(settings.showProgress)===-1){settings.showProgress=false;}module.create.toast();if(settings.closeOnClick&&(settings.closeIcon||$($toast).find(selector.input).length>0||module.has.configActions())){settings.closeOnClick=false;}if(!settings.closeOnClick){$toastBox.addClass(className.unclickable);}module.bind.events();}module.instantiate();if($toastBox){module.show();}},instantiate:function instantiate(){module.verbose('Storing instance of toast');instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){if($toastBox){module.debug('Removing toast',$toastBox);module.unbind.events();$toastBox.remove();$toastBox=undefined;$toast=undefined;$animationObject=undefined;settings.onRemove.call($toastBox,element);$progress=undefined;$progressBar=undefined;$close=undefined;}$module.removeData(moduleNamespace);},show:function show(callback){callback=callback||function(){};module.debug('Showing toast');if(settings.onShow.call($toastBox,element)===false){module.debug('onShow callback returned false, cancelling toast animation');return;}module.animate.show(callback);},close:function close(callback){callback=callback||function(){};module.remove.visible();module.unbind.events();module.animate.close(callback);},create:{container:function container(){module.verbose('Creating container');$context.append($('<div/>',{"class":settings.position+' '+className.container}));},toast:function toast(){$toastBox=$('<div/>',{"class":className.box});if(!isToastComponent){module.verbose('Creating toast');$toast=$('<div/>');var $content=$('<div/>',{"class":className.content});var iconClass=module.get.iconClass();if(iconClass!==''){$toast.append($('<i/>',{"class":iconClass+' '+className.icon}));}if(settings.showImage){$toast.append($('<img>',{"class":className.image+' '+settings.classImage,src:settings.showImage}));}if(settings.title!==''){$content.append($('<div/>',{"class":className.title,text:settings.title}));}$content.append($('<div/>',{html:module.helpers.escape(settings.message,settings.preserveHTML)}));$toast.addClass(settings["class"]+' '+className.toast).append($content);$toast.css('opacity',settings.opacity);if(settings.closeIcon){$close=$('<i/>',{"class":className.close+' '+(typeof settings.closeIcon==='string'?settings.closeIcon:'')});if($close.hasClass(className.left)){$toast.prepend($close);}else{$toast.append($close);}}}else{$toast=settings.cloneModule?$module.clone().removeAttr('id'):$module;$close=$toast.find('> i'+module.helpers.toClass(className.close));settings.closeIcon=$close.length>0;}if($toast.hasClass(className.compact)){settings.compact=true;}if($toast.hasClass('card')){settings.compact=false;}$actions=$toast.find('.actions');if(module.has.configActions()){if($actions.length===0){$actions=$('<div/>',{"class":className.actions+' '+(settings.classActions||'')}).appendTo($toast);}if($toast.hasClass('card')&&!$actions.hasClass(className.attached)){$actions.addClass(className.extraContent);if($actions.hasClass(className.vertical)){$actions.removeClass(className.vertical);module.error(error.verticalCard);}}settings.actions.forEach(function(el){var icon=el[fields.icon]?'<i class="'+module.helpers.deQuote(el[fields.icon])+' icon"></i>':'',text=module.helpers.escape(el[fields.text]||'',settings.preserveHTML),cls=module.helpers.deQuote(el[fields["class"]]||''),_click=el[fields.click]&&$.isFunction(el[fields.click])?el[fields.click]:function(){};$actions.append($('<button/>',{html:icon+text,"class":className.button+' '+cls,click:function click(){if(_click.call(element,$module)===false){return;}module.close();}}));});}if($actions&&$actions.hasClass(className.vertical)){$toast.addClass(className.vertical);}if($actions.length>0&&!$actions.hasClass(className.attached)){if($actions&&(!$actions.hasClass(className.basic)||$actions.hasClass(className.left))){$toast.addClass(className.actions);}}if(settings.displayTime==='auto'){settings.displayTime=Math.max(settings.minDisplayTime,$toast.text().split(" ").length/settings.wordsPerMinute*60000);}$toastBox.append($toast);if($actions.length>0&&$actions.hasClass(className.attached)){$actions.addClass(className.buttons);$actions.detach();$toast.addClass(className.attached);if(!$actions.hasClass(className.vertical)){if($actions.hasClass(className.top)){$toastBox.prepend($actions);$toast.addClass(className.bottom);}else{$toastBox.append($actions);$toast.addClass(className.top);}}else{$toast.wrap($('<div/>',{"class":className.vertical+' '+className.attached+' '+(settings.compact?className.compact:'')}));if($actions.hasClass(className.left)){$toast.addClass(className.left).parent().addClass(className.left).prepend($actions);}else{$toast.parent().append($actions);}}}if($module!==$toast){$module=$toast;element=$toast[0];}if(settings.displayTime>0){var progressingClass=className.progressing+' '+(settings.pauseOnHover?className.pausable:'');if(!!settings.showProgress){$progress=$('<div/>',{"class":className.progress+' '+(settings.classProgress||settings["class"]),'data-percent':''});if(!settings.classProgress){if($toast.hasClass('toast')&&!$toast.hasClass(className.inverted)){$progress.addClass(className.inverted);}else{$progress.removeClass(className.inverted);}}$progressBar=$('<div/>',{"class":'bar '+(settings.progressUp?'up ':'down ')+progressingClass});$progress.addClass(settings.showProgress).append($progressBar);if($progress.hasClass(className.top)){$toastBox.prepend($progress);}else{$toastBox.append($progress);}$progressBar.css('animation-duration',settings.displayTime/1000+'s');}$animationObject=$('<span/>',{"class":'wait '+progressingClass});$animationObject.css('animation-duration',settings.displayTime/1000+'s');$animationObject.appendTo($toast);}if(settings.compact){$toastBox.addClass(className.compact);$toast.addClass(className.compact);if($progress){$progress.addClass(className.compact);}}if(settings.newestOnTop){$toastBox.prependTo(module.get.container());}else{$toastBox.appendTo(module.get.container());}}},bind:{events:function events(){module.debug('Binding events to toast');if(settings.closeOnClick||settings.closeIcon){(settings.closeIcon?$close:$toast).on('click'+eventNamespace,module.event.click);}if($animationObject){$animationObject.on('animationend'+eventNamespace,module.close);}$toastBox.on('click'+eventNamespace,selector.approve,module.event.approve).on('click'+eventNamespace,selector.deny,module.event.deny);}},unbind:{events:function events(){module.debug('Unbinding events to toast');if(settings.closeOnClick||settings.closeIcon){(settings.closeIcon?$close:$toast).off('click'+eventNamespace);}if($animationObject){$animationObject.off('animationend'+eventNamespace);}$toastBox.off('click'+eventNamespace);}},animate:{show:function show(callback){callback=$.isFunction(callback)?callback:function(){};if(settings.transition&&module.can.useElement('transition')&&$module.transition('is supported')){module.set.visible();$toastBox.transition({animation:settings.transition.showMethod+' in',queue:false,debug:settings.debug,verbose:settings.verbose,duration:settings.transition.showDuration,onComplete:function onComplete(){callback.call($toastBox,element);settings.onVisible.call($toastBox,element);}});}},close:function close(callback){callback=$.isFunction(callback)?callback:function(){};module.debug('Closing toast');if(settings.onHide.call($toastBox,element)===false){module.debug('onHide callback returned false, cancelling toast animation');return;}if(settings.transition&&$.fn.transition!==undefined&&$module.transition('is supported')){$toastBox.transition({animation:settings.transition.hideMethod+' out',queue:false,duration:settings.transition.hideDuration,debug:settings.debug,verbose:settings.verbose,interval:50,onBeforeHide:function onBeforeHide(callback){callback=$.isFunction(callback)?callback:function(){};if(settings.transition.closeEasing!==''){$toastBox.css('opacity',0);$toastBox.wrap('<div/>').parent().slideUp(500,settings.transition.closeEasing,function(){if($toastBox){$toastBox.parent().remove();callback.call($toastBox);}});}else{callback.call($toastBox);}},onComplete:function onComplete(){callback.call($toastBox,element);settings.onHidden.call($toastBox,element);module.destroy();}});}else{module.error(error.noTransition);}},pause:function pause(){$animationObject.css('animationPlayState','paused');if($progressBar){$progressBar.css('animationPlayState','paused');}},"continue":function _continue(){$animationObject.css('animationPlayState','running');if($progressBar){$progressBar.css('animationPlayState','running');}}},has:{container:function container(){module.verbose('Determining if there is already a container');return $context.find(module.helpers.toClass(settings.position)+selector.container).length>0;},toast:function toast(){return!!module.get.toast();},toasts:function toasts(){return module.get.toasts().length>0;},configActions:function configActions(){return Array.isArray(settings.actions)&&settings.actions.length>0;}},get:{container:function container(){return $context.find(module.helpers.toClass(settings.position)+selector.container)[0];},toastBox:function toastBox(){return $toastBox||null;},toast:function toast(){return $toast||null;},toasts:function toasts(){return $(module.get.container()).find(selector.box);},iconClass:function iconClass(){return typeof settings.showIcon==='string'?settings.showIcon:settings.showIcon&&settings.icons[settings["class"]]?settings.icons[settings["class"]]:'';},remainingTime:function remainingTime(){return $animationObject?$animationObject.css('opacity')*settings.displayTime:0;}},set:{visible:function visible(){$toast.addClass(className.visible);}},remove:{visible:function visible(){$toast.removeClass(className.visible);}},event:{click:function click(event){if($(event.target).closest('a').length===0){settings.onClick.call($toastBox,element);module.close();}},approve:function approve(){if(settings.onApprove.call(element,$module)===false){module.verbose('Approve callback returned false cancelling close');return;}module.close();},deny:function deny(){if(settings.onDeny.call(element,$module)===false){module.verbose('Deny callback returned false cancelling close');return;}module.close();}},helpers:{toClass:function toClass(selector){var classes=selector.split(' '),result='';classes.forEach(function(element){result+='.'+element;});return result;},deQuote:function deQuote(string){return String(string).replace(/"/g,"");},escape:function escape(string,preserveHTML){if(preserveHTML){return string;}var badChars=/[<>"'`]/g,shouldEscape=/[&<>"'`]/,escape={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},escapedChar=function escapedChar(chr){return escape[chr];};if(shouldEscape.test(string)){string=string.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;");return string.replace(badChars,escapedChar);}return string;}},can:{useElement:function useElement(element){if($.fn[element]!==undefined){return true;}module.error(error.noElement.replace('{element}',element));return false;}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();returnedValue=$module;}});return returnedValue!==undefined?returnedValue:this;};$.fn.toast.settings={name:'Toast',namespace:'toast',silent:false,debug:false,verbose:false,performance:true,context:'body',position:'top right',"class":'neutral',classProgress:false,classActions:false,classImage:'mini',title:'',message:'',displayTime:3000,// set to zero to require manually dismissal, otherwise hides on its own
minDisplayTime:1000,// minimum displaytime in case displayTime is set to 'auto'
wordsPerMinute:120,showIcon:false,newestOnTop:false,showProgress:false,pauseOnHover:true,progressUp:false,//if true, the bar will start at 0% and increase to 100%
opacity:1,compact:true,closeIcon:false,closeOnClick:true,cloneModule:true,actions:false,preserveHTML:true,showImage:false,// transition settings
transition:{showMethod:'scale',showDuration:500,hideMethod:'scale',hideDuration:500,closeEasing:'easeOutCubic'//Set to empty string to stack the closed toast area immediately (old behaviour)
},error:{method:'The method you called is not defined.',noElement:'This module requires ui {element}',verticalCard:'Vertical but not attached actions are not supported for card layout'},className:{container:'ui toast-container',box:'floating toast-box',progress:'ui attached active progress',toast:'ui toast',icon:'centered icon',visible:'visible',content:'content',title:'ui header',actions:'actions',extraContent:'extra content',button:'ui button',buttons:'ui buttons',close:'close icon',image:'ui image',vertical:'vertical',attached:'attached',inverted:'inverted',compact:'compact',pausable:'pausable',progressing:'progressing',top:'top',bottom:'bottom',left:'left',basic:'basic',unclickable:'unclickable'},icons:{info:'info',success:'checkmark',warning:'warning',error:'times'},selector:{container:'.ui.toast-container',box:'.toast-box',toast:'.ui.toast',input:'input:not([type="hidden"]), textarea, select, button, .ui.button, ui.dropdown',approve:'.actions .positive, .actions .approve, .actions .ok',deny:'.actions .negative, .actions .deny, .actions .cancel'},fields:{"class":'class',text:'text',icon:'icon',click:'click'},// callbacks
onShow:function onShow(){},onVisible:function onVisible(){},onClick:function onClick(){},onHide:function onHide(){},onHidden:function onHidden(){},onRemove:function onRemove(){},onApprove:function onApprove(){},onDeny:function onDeny(){}};$.extend($.easing,{easeOutBounce:function easeOutBounce(x,t,b,c,d){if((t/=d)<1/2.75){return c*(7.5625*t*t)+b;}else if(t<2/2.75){return c*(7.5625*(t-=1.5/2.75)*t+.75)+b;}else if(t<2.5/2.75){return c*(7.5625*(t-=2.25/2.75)*t+.9375)+b;}else{return c*(7.5625*(t-=2.625/2.75)*t+.984375)+b;}},easeOutCubic:function easeOutCubic(t){return--t*t*t+1;}});})(jQuery,window,document);/*!
 * # Fomantic-UI - Transition
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.transition=function(){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],moduleArguments=arguments,query=moduleArguments[0],queryArguments=[].slice.call(arguments,1),methodInvoked=typeof query==='string',returnedValue;$allModules.each(function(index){var $module=$(this),element=this,// set at run time
settings,instance,error,className,metadata,animationEnd,moduleNamespace,eventNamespace,module;module={initialize:function initialize(){// get full settings
settings=module.get.settings.apply(element,moduleArguments);// shorthand
className=settings.className;error=settings.error;metadata=settings.metadata;// define namespace
eventNamespace='.'+settings.namespace;moduleNamespace='module-'+settings.namespace;instance=$module.data(moduleNamespace)||module;// get vendor specific events
animationEnd=module.get.animationEndEvent();if(methodInvoked){methodInvoked=module.invoke(query);}// method not invoked, lets run an animation
if(methodInvoked===false){module.verbose('Converted arguments into settings object',settings);if(settings.interval){module.delay(settings.animate);}else{module.animate();}module.instantiate();}},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){module.verbose('Destroying previous module for',element);$module.removeData(moduleNamespace);},refresh:function refresh(){module.verbose('Refreshing display type on next animation');delete module.displayType;},forceRepaint:function forceRepaint(){module.verbose('Forcing element repaint');var $parentElement=$module.parent(),$nextElement=$module.next();if($nextElement.length===0){$module.detach().appendTo($parentElement);}else{$module.detach().insertBefore($nextElement);}},repaint:function repaint(){module.verbose('Repainting element');var fakeAssignment=element.offsetWidth;},delay:function delay(interval){var direction=module.get.animationDirection(),shouldReverse,delay;if(!direction){direction=module.can.transition()?module.get.direction():'static';}interval=interval!==undefined?interval:settings.interval;shouldReverse=settings.reverse=='auto'&&direction==className.outward;delay=shouldReverse||settings.reverse==true?($allModules.length-index)*settings.interval:index*settings.interval;module.debug('Delaying animation by',delay);setTimeout(module.animate,delay);},animate:function animate(overrideSettings){settings=overrideSettings||settings;if(!module.is.supported()){module.error(error.support);return false;}module.debug('Preparing animation',settings.animation);if(module.is.animating()){if(settings.queue){if(!settings.allowRepeats&&module.has.direction()&&module.is.occurring()&&module.queuing!==true){module.debug('Animation is currently occurring, preventing queueing same animation',settings.animation);}else{module.queue(settings.animation);}return false;}else if(!settings.allowRepeats&&module.is.occurring()){module.debug('Animation is already occurring, will not execute repeated animation',settings.animation);return false;}else{module.debug('New animation started, completing previous early',settings.animation);instance.complete();}}if(module.can.animate()){module.set.animating(settings.animation);}else{module.error(error.noAnimation,settings.animation,element);}},reset:function reset(){module.debug('Resetting animation to beginning conditions');module.remove.animationCallbacks();module.restore.conditions();module.remove.animating();},queue:function queue(animation){module.debug('Queueing animation of',animation);module.queuing=true;$module.one(animationEnd+'.queue'+eventNamespace,function(){module.queuing=false;module.repaint();module.animate.apply(this,settings);});},complete:function complete(event){if(event&&event.target===element){event.stopPropagation();}module.debug('Animation complete',settings.animation);module.remove.completeCallback();module.remove.failSafe();if(!module.is.looping()){if(module.is.outward()){module.verbose('Animation is outward, hiding element');module.restore.conditions();module.hide();}else if(module.is.inward()){module.verbose('Animation is outward, showing element');module.restore.conditions();module.show();}else{module.verbose('Static animation completed');module.restore.conditions();settings.onComplete.call(element);}}},force:{visible:function visible(){var style=$module.attr('style'),userStyle=module.get.userStyle(style),displayType=module.get.displayType(),overrideStyle=userStyle+'display: '+displayType+' !important;',inlineDisplay=$module[0].style.display,mustStayHidden=!displayType||inlineDisplay==='none'&&settings.skipInlineHidden||$module[0].tagName.match(/(script|link|style)/i);if(mustStayHidden){module.remove.transition();return false;}module.verbose('Overriding default display to show element',displayType);$module.attr('style',overrideStyle);return true;},hidden:function hidden(){var style=$module.attr('style'),currentDisplay=$module.css('display'),emptyStyle=style===undefined||style==='';if(currentDisplay!=='none'&&!module.is.hidden()){module.verbose('Overriding default display to hide element');$module.css('display','none');}else if(emptyStyle){$module.removeAttr('style');}}},has:{direction:function direction(animation){var hasDirection=false;animation=animation||settings.animation;if(typeof animation==='string'){animation=animation.split(' ');$.each(animation,function(index,word){if(word===className.inward||word===className.outward){hasDirection=true;}});}return hasDirection;},inlineDisplay:function inlineDisplay(){var style=$module.attr('style')||'';return Array.isArray(style.match(/display.*?;/,''));}},set:{animating:function animating(animation){// remove previous callbacks
module.remove.completeCallback();// determine exact animation
animation=animation||settings.animation;var animationClass=module.get.animationClass(animation);// save animation class in cache to restore class names
module.save.animation(animationClass);if(module.force.visible()){module.remove.hidden();module.remove.direction();module.start.animation(animationClass);}},duration:function duration(animationName,_duration3){_duration3=_duration3||settings.duration;_duration3=typeof _duration3=='number'?_duration3+'ms':_duration3;if(_duration3||_duration3===0){module.verbose('Setting animation duration',_duration3);$module.css({'animation-duration':_duration3});}},direction:function direction(_direction3){_direction3=_direction3||module.get.direction();if(_direction3==className.inward){module.set.inward();}else{module.set.outward();}},looping:function looping(){module.debug('Transition set to loop');$module.addClass(className.looping);},hidden:function hidden(){$module.addClass(className.transition).addClass(className.hidden);},inward:function inward(){module.debug('Setting direction to inward');$module.removeClass(className.outward).addClass(className.inward);},outward:function outward(){module.debug('Setting direction to outward');$module.removeClass(className.inward).addClass(className.outward);},visible:function visible(){$module.addClass(className.transition).addClass(className.visible);}},start:{animation:function animation(animationClass){animationClass=animationClass||module.get.animationClass();module.debug('Starting tween',animationClass);$module.addClass(animationClass).one(animationEnd+'.complete'+eventNamespace,module.complete);if(settings.useFailSafe){module.add.failSafe();}module.set.duration(settings.duration);settings.onStart.call(element);}},save:{animation:function animation(_animation){if(!module.cache){module.cache={};}module.cache.animation=_animation;},displayType:function displayType(_displayType){if(_displayType!=='none'){$module.data(metadata.displayType,_displayType);}},transitionExists:function transitionExists(animation,exists){$.fn.transition.exists[animation]=exists;module.verbose('Saving existence of transition',animation,exists);}},restore:{conditions:function conditions(){var animation=module.get.currentAnimation();if(animation){$module.removeClass(animation);module.verbose('Removing animation class',module.cache);}module.remove.duration();}},add:{failSafe:function failSafe(){var duration=module.get.duration();module.timer=setTimeout(function(){$module.triggerHandler(animationEnd);},duration+settings.failSafeDelay);module.verbose('Adding fail safe timer',module.timer);}},remove:{animating:function animating(){$module.removeClass(className.animating);},animationCallbacks:function animationCallbacks(){module.remove.queueCallback();module.remove.completeCallback();},queueCallback:function queueCallback(){$module.off('.queue'+eventNamespace);},completeCallback:function completeCallback(){$module.off('.complete'+eventNamespace);},display:function display(){$module.css('display','');},direction:function direction(){$module.removeClass(className.inward).removeClass(className.outward);},duration:function duration(){$module.css('animation-duration','');},failSafe:function failSafe(){module.verbose('Removing fail safe timer',module.timer);if(module.timer){clearTimeout(module.timer);}},hidden:function hidden(){$module.removeClass(className.hidden);},visible:function visible(){$module.removeClass(className.visible);},looping:function looping(){module.debug('Transitions are no longer looping');if(module.is.looping()){module.reset();$module.removeClass(className.looping);}},transition:function transition(){$module.removeClass(className.transition).removeClass(className.visible).removeClass(className.hidden);}},get:{settings:function settings(animation,duration,onComplete){// single settings object
if(_typeof(animation)=='object'){return $.extend(true,{},$.fn.transition.settings,animation);}// all arguments provided
else if(typeof onComplete=='function'){return $.extend({},$.fn.transition.settings,{animation:animation,onComplete:onComplete,duration:duration});}// only duration provided
else if(typeof duration=='string'||typeof duration=='number'){return $.extend({},$.fn.transition.settings,{animation:animation,duration:duration});}// duration is actually settings object
else if(_typeof(duration)=='object'){return $.extend({},$.fn.transition.settings,duration,{animation:animation});}// duration is actually callback
else if(typeof duration=='function'){return $.extend({},$.fn.transition.settings,{animation:animation,onComplete:duration});}// only animation provided
else{return $.extend({},$.fn.transition.settings,{animation:animation});}},animationClass:function animationClass(animation){var animationClass=animation||settings.animation,directionClass=module.can.transition()&&!module.has.direction()?module.get.direction()+' ':'';return className.animating+' '+className.transition+' '+directionClass+animationClass;},currentAnimation:function currentAnimation(){return module.cache&&module.cache.animation!==undefined?module.cache.animation:false;},currentDirection:function currentDirection(){return module.is.inward()?className.inward:className.outward;},direction:function direction(){return module.is.hidden()||!module.is.visible()?className.inward:className.outward;},animationDirection:function animationDirection(animation){var direction;animation=animation||settings.animation;if(typeof animation==='string'){animation=animation.split(' ');// search animation name for out/in class
$.each(animation,function(index,word){if(word===className.inward){direction=className.inward;}else if(word===className.outward){direction=className.outward;}});}// return found direction
if(direction){return direction;}return false;},duration:function duration(_duration4){_duration4=_duration4||settings.duration;if(_duration4===false){_duration4=$module.css('animation-duration')||0;}return typeof _duration4==='string'?_duration4.indexOf('ms')>-1?parseFloat(_duration4):parseFloat(_duration4)*1000:_duration4;},displayType:function displayType(shouldDetermine){shouldDetermine=shouldDetermine!==undefined?shouldDetermine:true;if(settings.displayType){return settings.displayType;}if(shouldDetermine&&$module.data(metadata.displayType)===undefined){var currentDisplay=$module.css('display');if(currentDisplay===''||currentDisplay==='none'){// create fake element to determine display state
module.can.transition(true);}else{module.save.displayType(currentDisplay);}}return $module.data(metadata.displayType);},userStyle:function userStyle(style){style=style||$module.attr('style')||'';return style.replace(/display.*?;/,'');},transitionExists:function transitionExists(animation){return $.fn.transition.exists[animation];},animationStartEvent:function animationStartEvent(){var element=document.createElement('div'),animations={'animation':'animationstart','OAnimation':'oAnimationStart','MozAnimation':'mozAnimationStart','WebkitAnimation':'webkitAnimationStart'},animation;for(animation in animations){if(element.style[animation]!==undefined){return animations[animation];}}return false;},animationEndEvent:function animationEndEvent(){var element=document.createElement('div'),animations={'animation':'animationend','OAnimation':'oAnimationEnd','MozAnimation':'mozAnimationEnd','WebkitAnimation':'webkitAnimationEnd'},animation;for(animation in animations){if(element.style[animation]!==undefined){return animations[animation];}}return false;}},can:{transition:function transition(forced){var animation=settings.animation,transitionExists=module.get.transitionExists(animation),displayType=module.get.displayType(false),elementClass,tagName,$clone,currentAnimation,inAnimation,directionExists;if(transitionExists===undefined||forced){module.verbose('Determining whether animation exists');elementClass=$module.attr('class');tagName=$module.prop('tagName');$clone=$('<'+tagName+' />').addClass(elementClass).insertAfter($module);currentAnimation=$clone.addClass(animation).removeClass(className.inward).removeClass(className.outward).addClass(className.animating).addClass(className.transition).css('animationName');inAnimation=$clone.addClass(className.inward).css('animationName');if(!displayType){displayType=$clone.attr('class',elementClass).removeAttr('style').removeClass(className.hidden).removeClass(className.visible).show().css('display');module.verbose('Determining final display state',displayType);module.save.displayType(displayType);}$clone.remove();if(currentAnimation!=inAnimation){module.debug('Direction exists for animation',animation);directionExists=true;}else if(currentAnimation=='none'||!currentAnimation){module.debug('No animation defined in css',animation);return;}else{module.debug('Static animation found',animation,displayType);directionExists=false;}module.save.transitionExists(animation,directionExists);}return transitionExists!==undefined?transitionExists:directionExists;},animate:function animate(){// can transition does not return a value if animation does not exist
return module.can.transition()!==undefined;}},is:{animating:function animating(){return $module.hasClass(className.animating);},inward:function inward(){return $module.hasClass(className.inward);},outward:function outward(){return $module.hasClass(className.outward);},looping:function looping(){return $module.hasClass(className.looping);},occurring:function occurring(animation){animation=animation||settings.animation;animation='.'+animation.replace(' ','.');return $module.filter(animation).length>0;},visible:function visible(){return $module.is(':visible');},hidden:function hidden(){return $module.css('visibility')==='hidden';},supported:function supported(){return animationEnd!==false;}},hide:function hide(){module.verbose('Hiding element');if(module.is.animating()){module.reset();}element.blur();// IE will trigger focus change if element is not blurred before hiding
module.remove.display();module.remove.visible();if($.isFunction(settings.onBeforeHide)){settings.onBeforeHide.call(element,function(){module.hideNow();});}else{module.hideNow();}},hideNow:function hideNow(){module.set.hidden();module.force.hidden();settings.onHide.call(element);settings.onComplete.call(element);// module.repaint();
},show:function show(display){module.verbose('Showing element',display);if(module.force.visible()){module.remove.hidden();module.set.visible();settings.onShow.call(element);settings.onComplete.call(element);// module.repaint();
}},toggle:function toggle(){if(module.is.visible()){module.hide();}else{module.show();}},stop:function stop(){module.debug('Stopping current animation');$module.triggerHandler(animationEnd);},stopAll:function stopAll(){module.debug('Stopping all animation');module.remove.queueCallback();$module.triggerHandler(animationEnd);},clear:{queue:function queue(){module.debug('Clearing animation queue');module.remove.queueCallback();}},enable:function enable(){module.verbose('Starting animation');$module.removeClass(className.disabled);},disable:function disable(){module.debug('Stopping animation');$module.addClass(className.disabled);},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if($allModules.length>1){title+=' '+'('+$allModules.length+')';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},// modified for transition to return invoke success
invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found!==undefined?found:false;}};module.initialize();});return returnedValue!==undefined?returnedValue:this;};// Records if CSS transition is available
$.fn.transition.exists={};$.fn.transition.settings={// module info
name:'Transition',// hide all output from this component regardless of other settings
silent:false,// debug content outputted to console
debug:false,// verbose debug output
verbose:false,// performance data output
performance:true,// event namespace
namespace:'transition',// delay between animations in group
interval:0,// whether group animations should be reversed
reverse:'auto',// animation callback event
onStart:function onStart(){},onComplete:function onComplete(){},onShow:function onShow(){},onHide:function onHide(){},// whether timeout should be used to ensure callback fires in cases animationend does not
useFailSafe:true,// delay in ms for fail safe
failSafeDelay:100,// whether EXACT animation can occur twice in a row
allowRepeats:false,// Override final display type on visible
displayType:false,// animation duration
animation:'fade',duration:false,// new animations will occur after previous ones
queue:true,// whether initially inline hidden objects should be skipped for transition
skipInlineHidden:false,metadata:{displayType:'display'},className:{animating:'animating',disabled:'disabled',hidden:'hidden',inward:'in',loading:'loading',looping:'looping',outward:'out',transition:'transition',visible:'visible'},// possible errors
error:{noAnimation:'Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.',repeated:'That animation is already occurring, cancelling repeated animation',method:'The method you called is not defined',support:'This browser does not support CSS animations'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - API
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isWindow=$.isWindow||function(obj){return obj!=null&&obj===obj.window;};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.api=$.fn.api=function(parameters){var// use window context if none specified
$allModules=$.isFunction(this)?$(window):$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var _settings6=$.isPlainObject(parameters)?$.extend(true,{},$.fn.api.settings,parameters):$.extend({},$.fn.api.settings),// internal aliases
namespace=_settings6.namespace,metadata=_settings6.metadata,selector=_settings6.selector,error=_settings6.error,className=_settings6.className,// define namespaces for modules
eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,// element that creates request
$module=$(this),$form=$module.closest(selector.form),// context used for state
$context=_settings6.stateContext?$(_settings6.stateContext):$module,// request details
ajaxSettings,requestSettings,url,data,requestStartTime,// standard module
element=this,context=$context[0],instance=$module.data(moduleNamespace),module;module={initialize:function initialize(){if(!methodInvoked){module.bind.events();}module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,instance);},destroy:function destroy(){module.verbose('Destroying previous module for',element);$module.removeData(moduleNamespace).off(eventNamespace);},bind:{events:function events(){var triggerEvent=module.get.event();if(triggerEvent){module.verbose('Attaching API events to element',triggerEvent);$module.on(triggerEvent+eventNamespace,module.event.trigger);}else if(_settings6.on=='now'){module.debug('Querying API endpoint immediately');module.query();}}},decode:{json:function json(response){if(response!==undefined&&typeof response=='string'){try{response=JSON.parse(response);}catch(e){// isnt json string
}}return response;}},read:{cachedResponse:function cachedResponse(url){var response;if(window.Storage===undefined){module.error(error.noStorage);return;}response=sessionStorage.getItem(url);module.debug('Using cached response',url,response);response=module.decode.json(response);return response;}},write:{cachedResponse:function cachedResponse(url,response){if(response&&response===''){module.debug('Response empty, not caching',response);return;}if(window.Storage===undefined){module.error(error.noStorage);return;}if($.isPlainObject(response)){response=JSON.stringify(response);}sessionStorage.setItem(url,response);module.verbose('Storing cached response for url',url,response);}},query:function query(){if(module.is.disabled()){module.debug('Element is disabled API request aborted');return;}if(module.is.loading()){if(_settings6.interruptRequests){module.debug('Interrupting previous request');module.abort();}else{module.debug('Cancelling request, previous request is still pending');return;}}// pass element metadata to url (value, text)
if(_settings6.defaultData){$.extend(true,_settings6.urlData,module.get.defaultData());}// Add form content
if(_settings6.serializeForm){_settings6.data=module.add.formData(_settings6.data);}// call beforesend and get any settings changes
requestSettings=module.get.settings();// check if before send cancelled request
if(requestSettings===false){module.cancelled=true;module.error(error.beforeSend);return;}else{module.cancelled=false;}// get url
url=module.get.templatedURL();if(!url&&!module.is.mocked()){module.error(error.missingURL);return;}// replace variables
url=module.add.urlData(url);// missing url parameters
if(!url&&!module.is.mocked()){return;}requestSettings.url=_settings6.base+url;// look for jQuery ajax parameters in settings
ajaxSettings=$.extend(true,{},_settings6,{type:_settings6.method||_settings6.type,data:data,url:_settings6.base+url,beforeSend:_settings6.beforeXHR,success:function success(){},failure:function failure(){},complete:function complete(){}});module.debug('Querying URL',ajaxSettings.url);module.verbose('Using AJAX settings',ajaxSettings);if(_settings6.cache==='local'&&module.read.cachedResponse(url)){module.debug('Response returned from local cache');module.request=module.create.request();module.request.resolveWith(context,[module.read.cachedResponse(url)]);return;}if(!_settings6.throttle){module.debug('Sending request',data,ajaxSettings.method);module.send.request();}else{if(!_settings6.throttleFirstRequest&&!module.timer){module.debug('Sending request',data,ajaxSettings.method);module.send.request();module.timer=setTimeout(function(){},_settings6.throttle);}else{module.debug('Throttling request',_settings6.throttle);clearTimeout(module.timer);module.timer=setTimeout(function(){if(module.timer){delete module.timer;}module.debug('Sending throttled request',data,ajaxSettings.method);module.send.request();},_settings6.throttle);}}},should:{removeError:function removeError(){return _settings6.hideError===true||_settings6.hideError==='auto'&&!module.is.form();}},is:{disabled:function disabled(){return $module.filter(selector.disabled).length>0;},expectingJSON:function expectingJSON(){return _settings6.dataType==='json'||_settings6.dataType==='jsonp';},form:function form(){return $module.is('form')||$context.is('form');},mocked:function mocked(){return _settings6.mockResponse||_settings6.mockResponseAsync||_settings6.response||_settings6.responseAsync;},input:function input(){return $module.is('input');},loading:function loading(){return module.request?module.request.state()=='pending':false;},abortedRequest:function abortedRequest(xhr){if(xhr&&xhr.readyState!==undefined&&xhr.readyState===0){module.verbose('XHR request determined to be aborted');return true;}else{module.verbose('XHR request was not aborted');return false;}},validResponse:function validResponse(response){if(!module.is.expectingJSON()||!$.isFunction(_settings6.successTest)){module.verbose('Response is not JSON, skipping validation',_settings6.successTest,response);return true;}module.debug('Checking JSON returned success',_settings6.successTest,response);if(_settings6.successTest(response)){module.debug('Response passed success test',response);return true;}else{module.debug('Response failed success test',response);return false;}}},was:{cancelled:function cancelled(){return module.cancelled||false;},succesful:function succesful(){module.verbose('This behavior will be deleted due to typo. Use "was successful" instead.');return module.was.successful();},successful:function successful(){return module.request&&module.request.state()=='resolved';},failure:function failure(){return module.request&&module.request.state()=='rejected';},complete:function complete(){return module.request&&(module.request.state()=='resolved'||module.request.state()=='rejected');}},add:{urlData:function urlData(url,_urlData){var requiredVariables,optionalVariables;if(url){requiredVariables=url.match(_settings6.regExp.required);optionalVariables=url.match(_settings6.regExp.optional);_urlData=_urlData||_settings6.urlData;if(requiredVariables){module.debug('Looking for required URL variables',requiredVariables);$.each(requiredVariables,function(index,templatedString){var// allow legacy {$var} style
variable=templatedString.indexOf('$')!==-1?templatedString.substr(2,templatedString.length-3):templatedString.substr(1,templatedString.length-2),value=$.isPlainObject(_urlData)&&_urlData[variable]!==undefined?_urlData[variable]:$module.data(variable)!==undefined?$module.data(variable):$context.data(variable)!==undefined?$context.data(variable):_urlData[variable];// remove value
if(value===undefined){module.error(error.requiredParameter,variable,url);url=false;return false;}else{module.verbose('Found required variable',variable,value);value=_settings6.encodeParameters?module.get.urlEncodedValue(value):value;url=url.replace(templatedString,value);}});}if(optionalVariables){module.debug('Looking for optional URL variables',requiredVariables);$.each(optionalVariables,function(index,templatedString){var// allow legacy {/$var} style
variable=templatedString.indexOf('$')!==-1?templatedString.substr(3,templatedString.length-4):templatedString.substr(2,templatedString.length-3),value=$.isPlainObject(_urlData)&&_urlData[variable]!==undefined?_urlData[variable]:$module.data(variable)!==undefined?$module.data(variable):$context.data(variable)!==undefined?$context.data(variable):_urlData[variable];// optional replacement
if(value!==undefined){module.verbose('Optional variable Found',variable,value);url=url.replace(templatedString,value);}else{module.verbose('Optional variable not found',variable);// remove preceding slash if set
if(url.indexOf('/'+templatedString)!==-1){url=url.replace('/'+templatedString,'');}else{url=url.replace(templatedString,'');}}});}}return url;},formData:function formData(data){var canSerialize=$.fn.serializeObject!==undefined,formData=canSerialize?$form.serializeObject():$form.serialize(),hasOtherData;data=data||_settings6.data;hasOtherData=$.isPlainObject(data);if(hasOtherData){if(canSerialize){module.debug('Extending existing data with form data',data,formData);data=$.extend(true,{},data,formData);}else{module.error(error.missingSerialize);module.debug('Cant extend data. Replacing data with form data',data,formData);data=formData;}}else{module.debug('Adding form data',formData);data=formData;}return data;}},send:{request:function request(){module.set.loading();module.request=module.create.request();if(module.is.mocked()){module.mockedXHR=module.create.mockedXHR();}else{module.xhr=module.create.xhr();}_settings6.onRequest.call(context,module.request,module.xhr);}},event:{trigger:function trigger(event){module.query();if(event.type=='submit'||event.type=='click'){event.preventDefault();}},xhr:{always:function always(){// nothing special
},done:function done(response,textStatus,xhr){var context=this,elapsedTime=new Date().getTime()-requestStartTime,timeLeft=_settings6.loadingDuration-elapsedTime,translatedResponse=$.isFunction(_settings6.onResponse)?module.is.expectingJSON()&&!_settings6.rawResponse?_settings6.onResponse.call(context,$.extend(true,{},response)):_settings6.onResponse.call(context,response):false;timeLeft=timeLeft>0?timeLeft:0;if(translatedResponse){module.debug('Modified API response in onResponse callback',_settings6.onResponse,translatedResponse,response);response=translatedResponse;}if(timeLeft>0){module.debug('Response completed early delaying state change by',timeLeft);}setTimeout(function(){if(module.is.validResponse(response)){module.request.resolveWith(context,[response,xhr]);}else{module.request.rejectWith(context,[xhr,'invalid']);}},timeLeft);},fail:function fail(xhr,status,httpMessage){var context=this,elapsedTime=new Date().getTime()-requestStartTime,timeLeft=_settings6.loadingDuration-elapsedTime;timeLeft=timeLeft>0?timeLeft:0;if(timeLeft>0){module.debug('Response completed early delaying state change by',timeLeft);}setTimeout(function(){if(module.is.abortedRequest(xhr)){module.request.rejectWith(context,[xhr,'aborted',httpMessage]);}else{module.request.rejectWith(context,[xhr,'error',status,httpMessage]);}},timeLeft);}},request:{done:function done(response,xhr){module.debug('Successful API Response',response);if(_settings6.cache==='local'&&url){module.write.cachedResponse(url,response);module.debug('Saving server response locally',module.cache);}_settings6.onSuccess.call(context,response,$module,xhr);},complete:function complete(firstParameter,secondParameter){var xhr,response;// have to guess callback parameters based on request success
if(module.was.successful()){response=firstParameter;xhr=secondParameter;}else{xhr=firstParameter;response=module.get.responseFromXHR(xhr);}module.remove.loading();_settings6.onComplete.call(context,response,$module,xhr);},fail:function fail(xhr,status,httpMessage){var// pull response from xhr if available
response=module.get.responseFromXHR(xhr),errorMessage=module.get.errorFromRequest(response,status,httpMessage);if(status=='aborted'){module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)',status,httpMessage);_settings6.onAbort.call(context,status,$module,xhr);return true;}else if(status=='invalid'){module.debug('JSON did not pass success test. A server-side error has most likely occurred',response);}else if(status=='error'){if(xhr!==undefined){module.debug('XHR produced a server error',status,httpMessage);// make sure we have an error to display to console
if((xhr.status<200||xhr.status>=300)&&httpMessage!==undefined&&httpMessage!==''){module.error(error.statusMessage+httpMessage,ajaxSettings.url);}_settings6.onError.call(context,errorMessage,$module,xhr);}}if(_settings6.errorDuration&&status!=='aborted'){module.debug('Adding error state');module.set.error();if(module.should.removeError()){setTimeout(module.remove.error,_settings6.errorDuration);}}module.debug('API Request failed',errorMessage,xhr);_settings6.onFailure.call(context,response,$module,xhr);}}},create:{request:function request(){// api request promise
return $.Deferred().always(module.event.request.complete).done(module.event.request.done).fail(module.event.request.fail);},mockedXHR:function mockedXHR(){var// xhr does not simulate these properties of xhr but must return them
textStatus=false,status=false,httpMessage=false,responder=_settings6.mockResponse||_settings6.response,asyncResponder=_settings6.mockResponseAsync||_settings6.responseAsync,asyncCallback,response,mockedXHR;mockedXHR=$.Deferred().always(module.event.xhr.complete).done(module.event.xhr.done).fail(module.event.xhr.fail);if(responder){if($.isFunction(responder)){module.debug('Using specified synchronous callback',responder);response=responder.call(context,requestSettings);}else{module.debug('Using settings specified response',responder);response=responder;}// simulating response
mockedXHR.resolveWith(context,[response,textStatus,{responseText:response}]);}else if($.isFunction(asyncResponder)){asyncCallback=function asyncCallback(response){module.debug('Async callback returned response',response);if(response){mockedXHR.resolveWith(context,[response,textStatus,{responseText:response}]);}else{mockedXHR.rejectWith(context,[{responseText:response},status,httpMessage]);}};module.debug('Using specified async response callback',asyncResponder);asyncResponder.call(context,requestSettings,asyncCallback);}return mockedXHR;},xhr:function xhr(){var xhr;// ajax request promise
xhr=$.ajax(ajaxSettings).always(module.event.xhr.always).done(module.event.xhr.done).fail(module.event.xhr.fail);module.verbose('Created server request',xhr,ajaxSettings);return xhr;}},set:{error:function error(){module.verbose('Adding error state to element',$context);$context.addClass(className.error);},loading:function loading(){module.verbose('Adding loading state to element',$context);$context.addClass(className.loading);requestStartTime=new Date().getTime();}},remove:{error:function error(){module.verbose('Removing error state from element',$context);$context.removeClass(className.error);},loading:function loading(){module.verbose('Removing loading state from element',$context);$context.removeClass(className.loading);}},get:{responseFromXHR:function responseFromXHR(xhr){return $.isPlainObject(xhr)?module.is.expectingJSON()?module.decode.json(xhr.responseText):xhr.responseText:false;},errorFromRequest:function errorFromRequest(response,status,httpMessage){return $.isPlainObject(response)&&response.error!==undefined?response.error// use json error message
:_settings6.error[status]!==undefined// use server error message
?_settings6.error[status]:httpMessage;},request:function request(){return module.request||false;},xhr:function xhr(){return module.xhr||false;},settings:function settings(){var runSettings;runSettings=_settings6.beforeSend.call($module,_settings6);if(runSettings){if(runSettings.success!==undefined){module.debug('Legacy success callback detected',runSettings);module.error(error.legacyParameters,runSettings.success);runSettings.onSuccess=runSettings.success;}if(runSettings.failure!==undefined){module.debug('Legacy failure callback detected',runSettings);module.error(error.legacyParameters,runSettings.failure);runSettings.onFailure=runSettings.failure;}if(runSettings.complete!==undefined){module.debug('Legacy complete callback detected',runSettings);module.error(error.legacyParameters,runSettings.complete);runSettings.onComplete=runSettings.complete;}}if(runSettings===undefined){module.error(error.noReturnedValue);}if(runSettings===false){return runSettings;}return runSettings!==undefined?$.extend(true,{},runSettings):$.extend(true,{},_settings6);},urlEncodedValue:function urlEncodedValue(value){var decodedValue=window.decodeURIComponent(value),encodedValue=window.encodeURIComponent(value),alreadyEncoded=decodedValue!==value;if(alreadyEncoded){module.debug('URL value is already encoded, avoiding double encoding',value);return value;}module.verbose('Encoding value using encodeURIComponent',value,encodedValue);return encodedValue;},defaultData:function defaultData(){var data={};if(!$.isWindow(element)){if(module.is.input()){data.value=$module.val();}else if(module.is.form()){}else{data.text=$module.text();}}return data;},event:function event(){if($.isWindow(element)||_settings6.on=='now'){module.debug('API called without element, no events attached');return false;}else if(_settings6.on=='auto'){if($module.is('input')){return element.oninput!==undefined?'input':element.onpropertychange!==undefined?'propertychange':'keyup';}else if($module.is('form')){return'submit';}else{return'click';}}else{return _settings6.on;}},templatedURL:function templatedURL(action){action=action||$module.data(metadata.action)||_settings6.action||false;url=$module.data(metadata.url)||_settings6.url||false;if(url){module.debug('Using specified url',url);return url;}if(action){module.debug('Looking up url for action',action,_settings6.api);if(_settings6.api[action]===undefined&&!module.is.mocked()){module.error(error.missingAction,_settings6.action,_settings6.api);return;}url=_settings6.api[action];}else if(module.is.form()){url=$module.attr('action')||$context.attr('action')||false;module.debug('No url or action specified, defaulting to form action',url);}return url;}},abort:function abort(){var xhr=module.get.xhr();if(xhr&&xhr.state()!=='resolved'){module.debug('Cancelling API request');xhr.abort();}},// reset state
reset:function reset(){module.remove.error();module.remove.loading();},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,_settings6,name);}else if(value!==undefined){if($.isPlainObject(_settings6[name])){$.extend(true,_settings6[name],value);}else{_settings6[name]=value;}}else{return _settings6[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!_settings6.silent&&_settings6.debug){if(_settings6.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,_settings6.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!_settings6.silent&&_settings6.verbose&&_settings6.debug){if(_settings6.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,_settings6.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!_settings6.silent){module.error=Function.prototype.bind.call(console.error,console,_settings6.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(_settings6.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'',//'Element'        : element,
'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=_settings6.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.api.settings={name:'API',namespace:'api',debug:false,verbose:false,performance:true,// object containing all templates endpoints
api:{},// whether to cache responses
cache:true,// whether new requests should abort previous requests
interruptRequests:true,// event binding
on:'auto',// context for applying state classes
stateContext:false,// duration for loading state
loadingDuration:0,// whether to hide errors after a period of time
hideError:'auto',// duration for error state
errorDuration:2000,// whether parameters should be encoded with encodeURIComponent
encodeParameters:true,// API action to use
action:false,// templated URL to use
url:false,// base URL to apply to all endpoints
base:'',// data that will
urlData:{},// whether to add default data to url data
defaultData:true,// whether to serialize closest form
serializeForm:false,// how long to wait before request should occur
throttle:0,// whether to throttle first request or only repeated
throttleFirstRequest:true,// standard ajax settings
method:'get',data:{},dataType:'json',// mock response
mockResponse:false,mockResponseAsync:false,// aliases for mock
response:false,responseAsync:false,// whether onResponse should work with response value without force converting into an object
rawResponse:false,// callbacks before request
beforeSend:function beforeSend(settings){return settings;},beforeXHR:function beforeXHR(xhr){},onRequest:function onRequest(promise,xhr){},// after request
onResponse:false,// function(response) { },
// response was successful, if JSON passed validation
onSuccess:function onSuccess(response,$module){},// request finished without aborting
onComplete:function onComplete(response,$module){},// failed JSON success test
onFailure:function onFailure(response,$module){},// server error
onError:function onError(errorMessage,$module){},// request aborted
onAbort:function onAbort(errorMessage,$module){},successTest:false,// errors
error:{beforeSend:'The before send function has aborted the request',error:'There was an error with your request',exitConditions:'API Request Aborted. Exit conditions met',JSONParse:'JSON could not be parsed during error handling',legacyParameters:'You are using legacy API success callback names',method:'The method you called is not defined',missingAction:'API action used but no url was defined',missingSerialize:'jquery-serialize-object is required to add form data to an existing data object',missingURL:'No URL specified for api event',noReturnedValue:'The beforeSend callback must return a settings object, beforeSend ignored.',noStorage:'Caching responses locally requires session storage',parseError:'There was an error parsing your request',requiredParameter:'Missing a required URL parameter: ',statusMessage:'Server gave an error: ',timeout:'Your request timed out'},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:'loading',error:'error'},selector:{disabled:'.disabled',form:'form'},metadata:{action:'action',url:'url'}};})(jQuery,window,document);/*!
 * # Fomantic-UI - State
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){"use strict";$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.state=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.state.settings,parameters):$.extend({},$.fn.state.settings),error=settings.error,metadata=settings.metadata,className=settings.className,namespace=settings.namespace,states=settings.states,_text2=settings.text,eventNamespace='.'+namespace,moduleNamespace=namespace+'-module',$module=$(this),element=this,instance=$module.data(moduleNamespace),module;module={initialize:function initialize(){module.verbose('Initializing module');// allow module to guess desired state based on element
if(settings.automatic){module.add.defaults();}// bind events with delegated events
if(settings.context&&moduleSelector!==''){$(settings.context).on(moduleSelector,'mouseenter'+eventNamespace,module.change.text).on(moduleSelector,'mouseleave'+eventNamespace,module.reset.text).on(moduleSelector,'click'+eventNamespace,module.toggle.state);}else{$module.on('mouseenter'+eventNamespace,module.change.text).on('mouseleave'+eventNamespace,module.reset.text).on('click'+eventNamespace,module.toggle.state);}module.instantiate();},instantiate:function instantiate(){module.verbose('Storing instance of module',module);instance=module;$module.data(moduleNamespace,module);},destroy:function destroy(){module.verbose('Destroying previous module',instance);$module.off(eventNamespace).removeData(moduleNamespace);},refresh:function refresh(){module.verbose('Refreshing selector cache');$module=$(element);},add:{defaults:function defaults(){var userStates=parameters&&$.isPlainObject(parameters.states)?parameters.states:{};$.each(settings.defaults,function(type,typeStates){if(module.is[type]!==undefined&&module.is[type]()){module.verbose('Adding default states',type,element);$.extend(settings.states,typeStates,userStates);}});}},is:{active:function active(){return $module.hasClass(className.active);},loading:function loading(){return $module.hasClass(className.loading);},inactive:function inactive(){return!$module.hasClass(className.active);},state:function state(_state2){if(className[_state2]===undefined){return false;}return $module.hasClass(className[_state2]);},enabled:function enabled(){return!$module.is(settings.filter.active);},disabled:function disabled(){return $module.is(settings.filter.active);},textEnabled:function textEnabled(){return!$module.is(settings.filter.text);},// definitions for automatic type detection
button:function button(){return $module.is('.button:not(a, .submit)');},input:function input(){return $module.is('input');},progress:function progress(){return $module.is('.ui.progress');}},allow:function allow(state){module.debug('Now allowing state',state);states[state]=true;},disallow:function disallow(state){module.debug('No longer allowing',state);states[state]=false;},allows:function allows(state){return states[state]||false;},enable:function enable(){$module.removeClass(className.disabled);},disable:function disable(){$module.addClass(className.disabled);},setState:function setState(state){if(module.allows(state)){$module.addClass(className[state]);}},removeState:function removeState(state){if(module.allows(state)){$module.removeClass(className[state]);}},toggle:{state:function state(){var apiRequest,requestCancelled;if(module.allows('active')&&module.is.enabled()){module.refresh();if($.fn.api!==undefined){apiRequest=$module.api('get request');requestCancelled=$module.api('was cancelled');if(requestCancelled){module.debug('API Request cancelled by beforesend');settings.activateTest=function(){return false;};settings.deactivateTest=function(){return false;};}else if(apiRequest){module.listenTo(apiRequest);return;}}module.change.state();}}},listenTo:function listenTo(apiRequest){module.debug('API request detected, waiting for state signal',apiRequest);if(apiRequest){if(_text2.loading){module.update.text(_text2.loading);}$.when(apiRequest).then(function(){if(apiRequest.state()=='resolved'){module.debug('API request succeeded');settings.activateTest=function(){return true;};settings.deactivateTest=function(){return true;};}else{module.debug('API request failed');settings.activateTest=function(){return false;};settings.deactivateTest=function(){return false;};}module.change.state();});}},// checks whether active/inactive state can be given
change:{state:function state(){module.debug('Determining state change direction');// inactive to active change
if(module.is.inactive()){module.activate();}else{module.deactivate();}if(settings.sync){module.sync();}settings.onChange.call(element);},text:function text(){if(module.is.textEnabled()){if(module.is.disabled()){module.verbose('Changing text to disabled text',_text2.hover);module.update.text(_text2.disabled);}else if(module.is.active()){if(_text2.hover){module.verbose('Changing text to hover text',_text2.hover);module.update.text(_text2.hover);}else if(_text2.deactivate){module.verbose('Changing text to deactivating text',_text2.deactivate);module.update.text(_text2.deactivate);}}else{if(_text2.hover){module.verbose('Changing text to hover text',_text2.hover);module.update.text(_text2.hover);}else if(_text2.activate){module.verbose('Changing text to activating text',_text2.activate);module.update.text(_text2.activate);}}}}},activate:function activate(){if(settings.activateTest.call(element)){module.debug('Setting state to active');$module.addClass(className.active);module.update.text(_text2.active);settings.onActivate.call(element);}},deactivate:function deactivate(){if(settings.deactivateTest.call(element)){module.debug('Setting state to inactive');$module.removeClass(className.active);module.update.text(_text2.inactive);settings.onDeactivate.call(element);}},sync:function sync(){module.verbose('Syncing other buttons to current state');if(module.is.active()){$allModules.not($module).state('activate');}else{$allModules.not($module).state('deactivate');}},get:{text:function text(){return settings.selector.text?$module.find(settings.selector.text).text():$module.html();},textFor:function textFor(state){return _text2[state]||false;}},flash:{text:function text(_text3,duration,callback){var previousText=module.get.text();module.debug('Flashing text message',_text3,duration);_text3=_text3||settings.text.flash;duration=duration||settings.flashDuration;callback=callback||function(){};module.update.text(_text3);setTimeout(function(){module.update.text(previousText);callback.call(element);},duration);}},reset:{// on mouseout sets text to previous value
text:function text(){var activeText=_text2.active||$module.data(metadata.storedText),inactiveText=_text2.inactive||$module.data(metadata.storedText);if(module.is.textEnabled()){if(module.is.active()&&activeText){module.verbose('Resetting active text',activeText);module.update.text(activeText);}else if(inactiveText){module.verbose('Resetting inactive text',activeText);module.update.text(inactiveText);}}}},update:{text:function text(_text4){var currentText=module.get.text();if(_text4&&_text4!==currentText){module.debug('Updating text',_text4);if(settings.selector.text){$module.data(metadata.storedText,_text4).find(settings.selector.text).text(_text4);}else{$module.data(metadata.storedText,_text4).html(_text4);}}else{module.debug('Text is already set, ignoring update',_text4);}}},setting:function setting(name,value){module.debug('Changing setting',name,value);if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){if($.isPlainObject(settings[name])){$.extend(true,settings[name],value);}else{settings[name]=value;}}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.state.settings={// module info
name:'State',// debug output
debug:false,// verbose debug output
verbose:false,// namespace for events
namespace:'state',// debug data includes performance
performance:true,// callback occurs on state change
onActivate:function onActivate(){},onDeactivate:function onDeactivate(){},onChange:function onChange(){},// state test functions
activateTest:function activateTest(){return true;},deactivateTest:function deactivateTest(){return true;},// whether to automatically map default states
automatic:true,// activate / deactivate changes all elements instantiated at same time
sync:false,// default flash text duration, used for temporarily changing text of an element
flashDuration:1000,// selector filter
filter:{text:'.loading, .disabled',active:'.disabled'},context:false,// error
error:{beforeSend:'The before send function has cancelled state change',method:'The method you called is not defined.'},// metadata
metadata:{promise:'promise',storedText:'stored-text'},// change class on state
className:{active:'active',disabled:'disabled',error:'error',loading:'loading',success:'success',warning:'warning'},selector:{// selector for text node
text:false},defaults:{input:{disabled:true,loading:true,active:true},button:{disabled:true,loading:true,active:true},progress:{active:true,success:true,warning:true,error:true}},states:{active:true,disabled:true,error:true,loading:true,success:true,warning:true},text:{disabled:false,flash:false,hover:false,active:false,inactive:false,activate:false,deactivate:false}};})(jQuery,window,document);/*!
 * # Fomantic-UI - Visibility
 * http://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */;(function($,window,document,undefined){'use strict';$.isFunction=$.isFunction||function(obj){return typeof obj==="function"&&typeof obj.nodeType!=="number";};window=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();$.fn.visibility=function(parameters){var $allModules=$(this),moduleSelector=$allModules.selector||'',time=new Date().getTime(),performance=[],query=arguments[0],methodInvoked=typeof query=='string',queryArguments=[].slice.call(arguments,1),returnedValue,moduleCount=$allModules.length,loadedCount=0;$allModules.each(function(){var settings=$.isPlainObject(parameters)?$.extend(true,{},$.fn.visibility.settings,parameters):$.extend({},$.fn.visibility.settings),className=settings.className,namespace=settings.namespace,error=settings.error,metadata=settings.metadata,eventNamespace='.'+namespace,moduleNamespace='module-'+namespace,$window=$(window),$module=$(this),$context=$(settings.context),$placeholder,instance=$module.data(moduleNamespace),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,0);},element=this,disabled=false,contextObserver,observer,module;module={initialize:function initialize(){module.debug('Initializing',settings);module.setup.cache();if(module.should.trackChanges()){if(settings.type=='image'){module.setup.image();}if(settings.type=='fixed'){module.setup.fixed();}if(settings.observeChanges){module.observeChanges();}module.bind.events();}module.save.position();if(!module.is.visible()){module.error(error.visible,$module);}if(settings.initialCheck){module.checkVisibility();}module.instantiate();},instantiate:function instantiate(){module.debug('Storing instance',module);$module.data(moduleNamespace,module);instance=module;},destroy:function destroy(){module.verbose('Destroying previous module');if(observer){observer.disconnect();}if(contextObserver){contextObserver.disconnect();}$window.off('load'+eventNamespace,module.event.load).off('resize'+eventNamespace,module.event.resize);$context.off('scroll'+eventNamespace,module.event.scroll).off('scrollchange'+eventNamespace,module.event.scrollchange);if(settings.type=='fixed'){module.resetFixed();module.remove.placeholder();}$module.off(eventNamespace).removeData(moduleNamespace);},observeChanges:function observeChanges(){if('MutationObserver'in window){contextObserver=new MutationObserver(module.event.contextChanged);observer=new MutationObserver(module.event.changed);contextObserver.observe(document,{childList:true,subtree:true});observer.observe(element,{childList:true,subtree:true});module.debug('Setting up mutation observer',observer);}},bind:{events:function events(){module.verbose('Binding visibility events to scroll and resize');if(settings.refreshOnLoad){$window.on('load'+eventNamespace,module.event.load);}$window.on('resize'+eventNamespace,module.event.resize);// pub/sub pattern
$context.off('scroll'+eventNamespace).on('scroll'+eventNamespace,module.event.scroll).on('scrollchange'+eventNamespace,module.event.scrollchange);}},event:{changed:function changed(mutations){module.verbose('DOM tree modified, updating visibility calculations');module.timer=setTimeout(function(){module.verbose('DOM tree modified, updating sticky menu');module.refresh();},100);},contextChanged:function contextChanged(mutations){[].forEach.call(mutations,function(mutation){if(mutation.removedNodes){[].forEach.call(mutation.removedNodes,function(node){if(node==element||$(node).find(element).length>0){module.debug('Element removed from DOM, tearing down events');module.destroy();}});}});},resize:function resize(){module.debug('Window resized');if(settings.refreshOnResize){requestAnimationFrame(module.refresh);}},load:function load(){module.debug('Page finished loading');requestAnimationFrame(module.refresh);},// publishes scrollchange event on one scroll
scroll:function scroll(){if(settings.throttle){clearTimeout(module.timer);module.timer=setTimeout(function(){$context.triggerHandler('scrollchange'+eventNamespace,[$context.scrollTop()]);},settings.throttle);}else{requestAnimationFrame(function(){$context.triggerHandler('scrollchange'+eventNamespace,[$context.scrollTop()]);});}},// subscribes to scrollchange
scrollchange:function scrollchange(event,scrollPosition){module.checkVisibility(scrollPosition);}},precache:function precache(images,callback){if(!(images instanceof Array)){images=[images];}var imagesLength=images.length,loadedCounter=0,cache=[],cacheImage=document.createElement('img'),handleLoad=function handleLoad(){loadedCounter++;if(loadedCounter>=images.length){if($.isFunction(callback)){callback();}}};while(imagesLength--){cacheImage=document.createElement('img');cacheImage.onload=handleLoad;cacheImage.onerror=handleLoad;cacheImage.src=images[imagesLength];cache.push(cacheImage);}},enableCallbacks:function enableCallbacks(){module.debug('Allowing callbacks to occur');disabled=false;},disableCallbacks:function disableCallbacks(){module.debug('Disabling all callbacks temporarily');disabled=true;},should:{trackChanges:function trackChanges(){if(methodInvoked){module.debug('One time query, no need to bind events');return false;}module.debug('Callbacks being attached');return true;}},setup:{cache:function cache(){module.cache={occurred:{},screen:{},element:{}};},image:function image(){var src=$module.data(metadata.src);if(src){module.verbose('Lazy loading image',src);settings.once=true;settings.observeChanges=false;// show when top visible
settings.onOnScreen=function(){module.debug('Image on screen',element);module.precache(src,function(){module.set.image(src,function(){loadedCount++;if(loadedCount==moduleCount){settings.onAllLoaded.call(this);}settings.onLoad.call(this);});});};}},fixed:function fixed(){module.debug('Setting up fixed');settings.once=false;settings.observeChanges=false;settings.initialCheck=true;settings.refreshOnLoad=true;if(!parameters.transition){settings.transition=false;}module.create.placeholder();module.debug('Added placeholder',$placeholder);settings.onTopPassed=function(){module.debug('Element passed, adding fixed position',$module);module.show.placeholder();module.set.fixed();if(settings.transition){if($.fn.transition!==undefined){$module.transition(settings.transition,settings.duration);}}};settings.onTopPassedReverse=function(){module.debug('Element returned to position, removing fixed',$module);module.hide.placeholder();module.remove.fixed();};}},create:{placeholder:function placeholder(){module.verbose('Creating fixed position placeholder');$placeholder=$module.clone(false).css('display','none').addClass(className.placeholder).insertAfter($module);}},show:{placeholder:function placeholder(){module.verbose('Showing placeholder');$placeholder.css('display','block').css('visibility','hidden');}},hide:{placeholder:function placeholder(){module.verbose('Hiding placeholder');$placeholder.css('display','none').css('visibility','');}},set:{fixed:function fixed(){module.verbose('Setting element to fixed position');$module.addClass(className.fixed).css({position:'fixed',top:settings.offset+'px',left:'auto',zIndex:settings.zIndex});settings.onFixed.call(element);},image:function image(src,callback){$module.attr('src',src);if(settings.transition){if($.fn.transition!==undefined){if($module.hasClass(className.visible)){module.debug('Transition already occurred on this image, skipping animation');return;}$module.transition(settings.transition,settings.duration,callback);}else{$module.fadeIn(settings.duration,callback);}}else{$module.show();}}},is:{onScreen:function onScreen(){var calculations=module.get.elementCalculations();return calculations.onScreen;},offScreen:function offScreen(){var calculations=module.get.elementCalculations();return calculations.offScreen;},visible:function visible(){if(module.cache&&module.cache.element){return!(module.cache.element.width===0&&module.cache.element.offset.top===0);}return false;},verticallyScrollableContext:function verticallyScrollableContext(){var overflowY=$context.get(0)!==window?$context.css('overflow-y'):false;return overflowY=='auto'||overflowY=='scroll';},horizontallyScrollableContext:function horizontallyScrollableContext(){var overflowX=$context.get(0)!==window?$context.css('overflow-x'):false;return overflowX=='auto'||overflowX=='scroll';}},refresh:function refresh(){module.debug('Refreshing constants (width/height)');if(settings.type=='fixed'){module.resetFixed();}module.reset();module.save.position();if(settings.checkOnRefresh){module.checkVisibility();}settings.onRefresh.call(element);},resetFixed:function resetFixed(){module.remove.fixed();module.remove.occurred();},reset:function reset(){module.verbose('Resetting all cached values');if($.isPlainObject(module.cache)){module.cache.screen={};module.cache.element={};}},checkVisibility:function checkVisibility(scroll){module.verbose('Checking visibility of element',module.cache.element);if(!disabled&&module.is.visible()){// save scroll position
module.save.scroll(scroll);// update calculations derived from scroll
module.save.calculations();// percentage
module.passed();// reverse (must be first)
module.passingReverse();module.topVisibleReverse();module.bottomVisibleReverse();module.topPassedReverse();module.bottomPassedReverse();// one time
module.onScreen();module.offScreen();module.passing();module.topVisible();module.bottomVisible();module.topPassed();module.bottomPassed();// on update callback
if(settings.onUpdate){settings.onUpdate.call(element,module.get.elementCalculations());}}},passed:function passed(amount,newCallback){var calculations=module.get.elementCalculations();// assign callback
if(amount&&newCallback){settings.onPassed[amount]=newCallback;}else if(amount!==undefined){return module.get.pixelsPassed(amount)>calculations.pixelsPassed;}else if(calculations.passing){$.each(settings.onPassed,function(amount,callback){if(calculations.bottomVisible||calculations.pixelsPassed>module.get.pixelsPassed(amount)){module.execute(callback,amount);}else if(!settings.once){module.remove.occurred(callback);}});}},onScreen:function onScreen(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onOnScreen,callbackName='onScreen';if(newCallback){module.debug('Adding callback for onScreen',newCallback);settings.onOnScreen=newCallback;}if(calculations.onScreen){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback!==undefined){return calculations.onOnScreen;}},offScreen:function offScreen(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onOffScreen,callbackName='offScreen';if(newCallback){module.debug('Adding callback for offScreen',newCallback);settings.onOffScreen=newCallback;}if(calculations.offScreen){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback!==undefined){return calculations.onOffScreen;}},passing:function passing(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onPassing,callbackName='passing';if(newCallback){module.debug('Adding callback for passing',newCallback);settings.onPassing=newCallback;}if(calculations.passing){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback!==undefined){return calculations.passing;}},topVisible:function topVisible(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onTopVisible,callbackName='topVisible';if(newCallback){module.debug('Adding callback for top visible',newCallback);settings.onTopVisible=newCallback;}if(calculations.topVisible){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return calculations.topVisible;}},bottomVisible:function bottomVisible(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onBottomVisible,callbackName='bottomVisible';if(newCallback){module.debug('Adding callback for bottom visible',newCallback);settings.onBottomVisible=newCallback;}if(calculations.bottomVisible){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return calculations.bottomVisible;}},topPassed:function topPassed(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onTopPassed,callbackName='topPassed';if(newCallback){module.debug('Adding callback for top passed',newCallback);settings.onTopPassed=newCallback;}if(calculations.topPassed){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return calculations.topPassed;}},bottomPassed:function bottomPassed(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onBottomPassed,callbackName='bottomPassed';if(newCallback){module.debug('Adding callback for bottom passed',newCallback);settings.onBottomPassed=newCallback;}if(calculations.bottomPassed){module.execute(callback,callbackName);}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return calculations.bottomPassed;}},passingReverse:function passingReverse(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onPassingReverse,callbackName='passingReverse';if(newCallback){module.debug('Adding callback for passing reverse',newCallback);settings.onPassingReverse=newCallback;}if(!calculations.passing){if(module.get.occurred('passing')){module.execute(callback,callbackName);}}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback!==undefined){return!calculations.passing;}},topVisibleReverse:function topVisibleReverse(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onTopVisibleReverse,callbackName='topVisibleReverse';if(newCallback){module.debug('Adding callback for top visible reverse',newCallback);settings.onTopVisibleReverse=newCallback;}if(!calculations.topVisible){if(module.get.occurred('topVisible')){module.execute(callback,callbackName);}}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return!calculations.topVisible;}},bottomVisibleReverse:function bottomVisibleReverse(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onBottomVisibleReverse,callbackName='bottomVisibleReverse';if(newCallback){module.debug('Adding callback for bottom visible reverse',newCallback);settings.onBottomVisibleReverse=newCallback;}if(!calculations.bottomVisible){if(module.get.occurred('bottomVisible')){module.execute(callback,callbackName);}}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return!calculations.bottomVisible;}},topPassedReverse:function topPassedReverse(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onTopPassedReverse,callbackName='topPassedReverse';if(newCallback){module.debug('Adding callback for top passed reverse',newCallback);settings.onTopPassedReverse=newCallback;}if(!calculations.topPassed){if(module.get.occurred('topPassed')){module.execute(callback,callbackName);}}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return!calculations.onTopPassed;}},bottomPassedReverse:function bottomPassedReverse(newCallback){var calculations=module.get.elementCalculations(),callback=newCallback||settings.onBottomPassedReverse,callbackName='bottomPassedReverse';if(newCallback){module.debug('Adding callback for bottom passed reverse',newCallback);settings.onBottomPassedReverse=newCallback;}if(!calculations.bottomPassed){if(module.get.occurred('bottomPassed')){module.execute(callback,callbackName);}}else if(!settings.once){module.remove.occurred(callbackName);}if(newCallback===undefined){return!calculations.bottomPassed;}},execute:function execute(callback,callbackName){var calculations=module.get.elementCalculations(),screen=module.get.screenCalculations();callback=callback||false;if(callback){if(settings.continuous){module.debug('Callback being called continuously',callbackName,calculations);callback.call(element,calculations,screen);}else if(!module.get.occurred(callbackName)){module.debug('Conditions met',callbackName,calculations);callback.call(element,calculations,screen);}}module.save.occurred(callbackName);},remove:{fixed:function fixed(){module.debug('Removing fixed position');$module.removeClass(className.fixed).css({position:'',top:'',left:'',zIndex:''});settings.onUnfixed.call(element);},placeholder:function placeholder(){module.debug('Removing placeholder content');if($placeholder){$placeholder.remove();}},occurred:function occurred(callback){if(callback){var occurred=module.cache.occurred;if(occurred[callback]!==undefined&&occurred[callback]===true){module.debug('Callback can now be called again',callback);module.cache.occurred[callback]=false;}}else{module.cache.occurred={};}}},save:{calculations:function calculations(){module.verbose('Saving all calculations necessary to determine positioning');module.save.direction();module.save.screenCalculations();module.save.elementCalculations();},occurred:function occurred(callback){if(callback){if(module.cache.occurred[callback]===undefined||module.cache.occurred[callback]!==true){module.verbose('Saving callback occurred',callback);module.cache.occurred[callback]=true;}}},scroll:function scroll(scrollPosition){scrollPosition=scrollPosition+settings.offset||$context.scrollTop()+settings.offset;module.cache.scroll=scrollPosition;},direction:function direction(){var scroll=module.get.scroll(),lastScroll=module.get.lastScroll(),direction;if(scroll>lastScroll&&lastScroll){direction='down';}else if(scroll<lastScroll&&lastScroll){direction='up';}else{direction='static';}module.cache.direction=direction;return module.cache.direction;},elementPosition:function elementPosition(){var element=module.cache.element,screen=module.get.screenSize();module.verbose('Saving element position');// (quicker than $.extend)
element.fits=element.height<screen.height;element.offset=$module.offset();element.width=$module.outerWidth();element.height=$module.outerHeight();// compensate for scroll in context
if(module.is.verticallyScrollableContext()){element.offset.top+=$context.scrollTop()-$context.offset().top;}if(module.is.horizontallyScrollableContext()){element.offset.left+=$context.scrollLeft-$context.offset().left;}// store
module.cache.element=element;return element;},elementCalculations:function elementCalculations(){var screen=module.get.screenCalculations(),element=module.get.elementPosition();// offset
if(settings.includeMargin){element.margin={};element.margin.top=parseInt($module.css('margin-top'),10);element.margin.bottom=parseInt($module.css('margin-bottom'),10);element.top=element.offset.top-element.margin.top;element.bottom=element.offset.top+element.height+element.margin.bottom;}else{element.top=element.offset.top;element.bottom=element.offset.top+element.height;}// visibility
element.topPassed=screen.top>=element.top;element.bottomPassed=screen.top>=element.bottom;element.topVisible=screen.bottom>=element.top&&!element.topPassed;element.bottomVisible=screen.bottom>=element.bottom&&!element.bottomPassed;element.pixelsPassed=0;element.percentagePassed=0;// meta calculations
element.onScreen=(element.topVisible||element.passing)&&!element.bottomPassed;element.passing=element.topPassed&&!element.bottomPassed;element.offScreen=!element.onScreen;// passing calculations
if(element.passing){element.pixelsPassed=screen.top-element.top;element.percentagePassed=(screen.top-element.top)/element.height;}module.cache.element=element;module.verbose('Updated element calculations',element);return element;},screenCalculations:function screenCalculations(){var scroll=module.get.scroll();module.save.direction();module.cache.screen.top=scroll;module.cache.screen.bottom=scroll+module.cache.screen.height;return module.cache.screen;},screenSize:function screenSize(){module.verbose('Saving window position');module.cache.screen={height:$context.height()};},position:function position(){module.save.screenSize();module.save.elementPosition();}},get:{pixelsPassed:function pixelsPassed(amount){var element=module.get.elementCalculations();if(amount.search('%')>-1){return element.height*(parseInt(amount,10)/100);}return parseInt(amount,10);},occurred:function occurred(callback){return module.cache.occurred!==undefined?module.cache.occurred[callback]||false:false;},direction:function direction(){if(module.cache.direction===undefined){module.save.direction();}return module.cache.direction;},elementPosition:function elementPosition(){if(module.cache.element===undefined){module.save.elementPosition();}return module.cache.element;},elementCalculations:function elementCalculations(){if(module.cache.element===undefined){module.save.elementCalculations();}return module.cache.element;},screenCalculations:function screenCalculations(){if(module.cache.screen===undefined){module.save.screenCalculations();}return module.cache.screen;},screenSize:function screenSize(){if(module.cache.screen===undefined){module.save.screenSize();}return module.cache.screen;},scroll:function scroll(){if(module.cache.scroll===undefined){module.save.scroll();}return module.cache.scroll;},lastScroll:function lastScroll(){if(module.cache.screen===undefined){module.debug('First scroll event, no last scroll could be found');return false;}return module.cache.screen.top;}},setting:function setting(name,value){if($.isPlainObject(name)){$.extend(true,settings,name);}else if(value!==undefined){settings[name]=value;}else{return settings[name];}},internal:function internal(name,value){if($.isPlainObject(name)){$.extend(true,module,name);}else if(value!==undefined){module[name]=value;}else{return module[name];}},debug:function debug(){if(!settings.silent&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.debug=Function.prototype.bind.call(console.info,console,settings.name+':');module.debug.apply(console,arguments);}}},verbose:function verbose(){if(!settings.silent&&settings.verbose&&settings.debug){if(settings.performance){module.performance.log(arguments);}else{module.verbose=Function.prototype.bind.call(console.info,console,settings.name+':');module.verbose.apply(console,arguments);}}},error:function error(){if(!settings.silent){module.error=Function.prototype.bind.call(console.error,console,settings.name+':');module.error.apply(console,arguments);}},performance:{log:function log(message){var currentTime,executionTime,previousTime;if(settings.performance){currentTime=new Date().getTime();previousTime=time||currentTime;executionTime=currentTime-previousTime;time=currentTime;performance.push({'Name':message[0],'Arguments':[].slice.call(message,1)||'','Element':element,'Execution Time':executionTime});}clearTimeout(module.performance.timer);module.performance.timer=setTimeout(module.performance.display,500);},display:function display(){var title=settings.name+':',totalTime=0;time=false;clearTimeout(module.performance.timer);$.each(performance,function(index,data){totalTime+=data['Execution Time'];});title+=' '+totalTime+'ms';if(moduleSelector){title+=' \''+moduleSelector+'\'';}if((console.group!==undefined||console.table!==undefined)&&performance.length>0){console.groupCollapsed(title);if(console.table){console.table(performance);}else{$.each(performance,function(index,data){console.log(data['Name']+': '+data['Execution Time']+'ms');});}console.groupEnd();}performance=[];}},invoke:function invoke(query,passedArguments,context){var object=instance,maxDepth,found,response;passedArguments=passedArguments||queryArguments;context=element||context;if(typeof query=='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){var camelCaseValue=depth!=maxDepth?value+query[depth+1].charAt(0).toUpperCase()+query[depth+1].slice(1):query;if($.isPlainObject(object[camelCaseValue])&&depth!=maxDepth){object=object[camelCaseValue];}else if(object[camelCaseValue]!==undefined){found=object[camelCaseValue];return false;}else if($.isPlainObject(object[value])&&depth!=maxDepth){object=object[value];}else if(object[value]!==undefined){found=object[value];return false;}else{module.error(error.method,query);return false;}});}if($.isFunction(found)){response=found.apply(context,passedArguments);}else if(found!==undefined){response=found;}if(Array.isArray(returnedValue)){returnedValue.push(response);}else if(returnedValue!==undefined){returnedValue=[returnedValue,response];}else if(response!==undefined){returnedValue=response;}return found;}};if(methodInvoked){if(instance===undefined){module.initialize();}instance.save.scroll();instance.save.calculations();module.invoke(query);}else{if(instance!==undefined){instance.invoke('destroy');}module.initialize();}});return returnedValue!==undefined?returnedValue:this;};$.fn.visibility.settings={name:'Visibility',namespace:'visibility',debug:false,verbose:false,performance:true,// whether to use mutation observers to follow changes
observeChanges:true,// check position immediately on init
initialCheck:true,// whether to refresh calculations after all page images load
refreshOnLoad:true,// whether to refresh calculations after page resize event
refreshOnResize:true,// should call callbacks on refresh event (resize, etc)
checkOnRefresh:true,// callback should only occur one time
once:true,// callback should fire continuously whe evaluates to true
continuous:false,// offset to use with scroll top
offset:0,// whether to include margin in elements position
includeMargin:false,// scroll context for visibility checks
context:window,// visibility check delay in ms (defaults to animationFrame)
throttle:false,// special visibility type (image, fixed)
type:false,// z-index to use with visibility 'fixed'
zIndex:'10',// image only animation settings
transition:'fade in',duration:1000,// array of callbacks for percentage
onPassed:{},// standard callbacks
onOnScreen:false,onOffScreen:false,onPassing:false,onTopVisible:false,onBottomVisible:false,onTopPassed:false,onBottomPassed:false,// reverse callbacks
onPassingReverse:false,onTopVisibleReverse:false,onBottomVisibleReverse:false,onTopPassedReverse:false,onBottomPassedReverse:false,// special callbacks for image
onLoad:function onLoad(){},onAllLoaded:function onAllLoaded(){},// special callbacks for fixed position
onFixed:function onFixed(){},onUnfixed:function onUnfixed(){},// utility callbacks
onUpdate:false,// disabled by default for performance
onRefresh:function onRefresh(){},metadata:{src:'src'},className:{fixed:'fixed',placeholder:'constraint',visible:'visible'},error:{method:'The method you called is not defined.',visible:'Element is hidden, you must call refresh after element becomes visible'}};})(jQuery,window,document);

/***/ }),

/***/ "./resources/laravolt/sass/app.scss":
/*!******************************************!*\
  !*** ./resources/laravolt/sass/app.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["app","/vendor"], () => (__webpack_exec__("./resources/js/laravolt.js"), __webpack_exec__("./resources/laravolt/sass/app.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);