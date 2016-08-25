/**
 * Design for Lightweight Framework.
 * @author Charlie Yu
 * @method {hasClass,addClass,removeClass}
 * @return {Dom}
 */
(function(window, undefined) {
    var readyList = [],
        _isReady = false;

    var $ = function(selector) {
        if (selector instanceof $) {
            return selector;
        }
        return new $.fn.init(selector);
    };
    $.fn = $.prototype = { constructor: $ };
    $.VERSION = '1.0.0';

    $.each = function(elements, callback) {
        for (var i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false)
                return elements;
        }
    };

    $.commonAction = {
        eq: function(attrName, attrValue) {
            // body...
        },
        first: function(attrName, attrValue) {
            // body...
        },
        last: function(attrName, attrValue) {
            // body...
        },
        each: function(callback) {
            //likeArray
            for (var i = 0; i < this.length; i++) {
                callback.call(this[i], i, this[i]);
            }
        }
    };

    $.bindAction = {
        on: function(type, callback, useCapture) {
            if ('attachEvent' in document) {
                $.each(this, function(i, idx) {
                    idx.attachEvent('on' + type, callback);
                });
            } else {
                $.each(this, function(i, idx) {
                    idx.addEventListener(type, callback, useCapture);
                });
            }
            return this;
        },
        off: function(type, callback, useCapture) {
            if ('attachEvent' in document) {
                $.each(this, function(i, idx) {
                    detachEvent.call(idx, 'on' + type, callback);
                });
            } else {
                $.each(this, function(i, idx) {
                    removeEventListener.call(idx, type, callback, useCapture);
                });
            }
            return this;
        },
        ready: function(fn) {
        if (readyList) {
            readyList.push(fn);
        }

        if (readyList.length > 1) {
            return;
        }

        if (document.readyState === 'complete') {
            setTimeout(readyFn);
        } else if (document.addEventListener) { //符合W3C 则监听 DOMContentLoaded和load事件
            //console.log('addEventListener');
            document.addEventListener('DOMContentLoaded', readyFn, false);
            document.addEventListener('load', readyFn, false);
        } else { //针对IE
            //console.log('attachEvent');
            document.attachEvent('onreadystatechange', readyFn);

            document.attachEvent('onload', readyFn);
        }

        }

    };

    var camelize = function(str) {
        return str.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        });
    };

    $.cssAction = {
        css: function(attrName, attrValue) {
            var ret = null;
            this.each(function() {
                if (typeof attrName === 'object') {
                    for (var key in attrName) {
                        key = camelize(key);

                        this.style[key] = attrName[key];
                    }
                } else if (attrValue) {
                    this.style[camelize(attrName)] = attrValue;
                } else {
                    ret = window.getComputedStyle(this)[attrName];
                }
            });
            return ret ? ret : this;
        },
        hide: function() {
            $.each(this, function(i, ele) {
                ele.style.display = 'none';
            });
            return this;
        },
        toggle: function() {
            $.each(this, function(i, ele) {
                if (ele.style.display == 'none')
                    $(ele).show();
                else
                    $(ele).hide();
            });
            return this;
        },
        remove: function() {
            this.each(function() {
                //error --- ie 不支持remove
                if (this.parentNode)
                    this.parentNode.removeChild(this);
            });
            return this;
        },

        hasClass: function(name) {
            $.each(this, function(i, ele) {
                var classRE = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
                return classRE.test(ele.className);
            });
        },
        addClass: function(name) {
            $.each(this, function(i, ele) {
                if (!$(ele).hasClass(name)) {
                    ele.className += name ? (' ' + name) : '';
                }
            });
            return this;
        },
        removeClass: function(name) {
            $.each(this, function(i, ele) {
                var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
                ele.className = ele.className.replace(classRE, '');
            });
            return this;
        },
        toggleClass: function(name) {
            $.each(this, function(i, ele) {
                if (!$(ele).hasClass(name)) {
                    $(ele).addClass(name);
                } else {
                    $(ele).removeClass(name);
                }
            });
            return this;
        }
    };

    $.fn = {
        init: function(selector) {
            var len, i;
            this.prototype = $.fn;
            if (!selector) {
                return this;
            } else if (typeof selector === 'string') {
                var elem = document.querySelectorAll(selector);
                len = elem ? elem.length : 0;
                for (i = 0; i < len; i++) this[i] = elem[i];
                this.length = len;
                this.selector = selector || '';
                return this;

            } else if (selector instanceof NodeList) {
                len = selector ? selector.length : 0;
                for (i = 0; i < len; i++) this[i] = selector[i];
                this.length = len;
                this.selector = '';
                return this;

            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

            }
        },
        extend: function(source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    this[p] = source[p];
                }
            }
        }
    };

    $.fn.extend($.commonAction);
    $.fn.extend($.bindAction);
    $.fn.extend($.cssAction);
    window.$ = $;
})(window, void 0);
