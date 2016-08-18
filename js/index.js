/**
 * @license emulate-jquery v1.0.0
 * author: tim
 * License: MIT
 */

'use strict';
//模仿 jQueryready
(function(window, undefined) {

    var readyList = [],
        _isReady = false;

    var $ = function(selector) {
        return new $.fn.init(selector);
    };

    $.VERSION = '1.0.0';

    $.fn = $.prototype;

    $.fn.init = function(selector) {
        if (!selector)
            return this; //$(""), $(null), $(undefined), $(false)
        if (typeof selector === 'string') {
            var elem = document.querySelectorAll(selector);
            var i, len = elem ? elem.length : 0;
            for (i = 0; i < len; i++) this[i] = elem[i];
            this.length = len;
            this.selector = selector || '';
            return this;
        } else if (selector instanceof NodeList) {
            var i, len = selector ? selector.length : 0;
            for (i = 0; i < len; i++) this[i] = selector[i];
            this.length = len;
            this.selector = '';
            return this;
        }
        if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        } else if (typeof selector === 'function') {
            return $(document).ready(selector);
        }
    };


    $.fn.init.prototype = $.fn;

    $.fn.on = function(type, callback, useCapture) {
        if ('attachEvent' in document) {
            $.each(this, function(i, idx) {
                idx.attachEvent('on' + type, callback);
            });
        } else {
            $.each(this, function(i, idx) {
                idx.addEventListener(type, callback, useCapture);
            });
        }
    };

    $.fn.off = function(type, callback, useCapture) {
        if ('attachEvent' in document) {
            $.each(this, function(i, idx) {
                detachEvent.call(idx, 'on' + type, callback);
            });
        } else {
            $.each(this, function(i, idx) {
                removeEventListener.call(idx, type, callback, useCapture);
            });
        }
    };

    $.each = function(elements, callback) {
        for (var i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false)
                return elements;
        }
    }; 
    $.fn.each = function(callback) {
        //likeArray
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i], i, this[i]);
        }
    };

    function readyFn() {
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();

            _isReady = true;

            fireReady();　　　　　　　　

        }
    }　　　　　　
    function fireReady() {　　　　　
        for (var i = 0; i < readyList.length; i++) {
            readyList[i]();
        }　　　　　
        readyList = null;
        fireReady = function() {}; //惰性函数，防止IE9二次调用
        　　
    }


    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", readyFn, false);
            window.removeEventListener("load", readyFn, false);

        } else {
            document.detachEvent("onreadystatechange", readyFn);
            window.detachEvent("onload", readyFn);
        }
    }
    $.fn.show = function() {
        $.each(this, function(i, ele) {
            ele.style.display = 'block';
        });
    };

    $.fn.addClass = function(name) {
        $.each(this, function(i, ele) {
            if (!$(ele).hasClass(name)) {
                ele.className += name ? (' ' + name) : '';
            }
        });
    };
    $.fn.hasClass = function(name) {
        $.each(this, function(i, ele) {
            var classRE = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
            return classRE.test(ele.className);
        });
    };
    $.fn.removeClass = function(name) {
        $.each(this, function(i, ele) {
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            ele.className = ele.className.replace(classRE, '');
        });
    };
    $.fn.toggleClass = function(name) {
        $.each(this, function(i, ele) {
            if (!$(ele).hasClass(name)) {
                $(ele).addClass(name);
            } else {
                $(ele).removeClass(name);
            }
        });
    };

    $.fn.css = function(attrName, attrValue) {
        this.each(function() {
            if (typeof attrName === 'object') {
                for (var key in attrName) {
                    key = camelize(key);
                    this.style[key] = attrName[key];
                }
            } else {
                this.style[attrName] = attrValue;
            }
        });

    };
    var camelize = function(str) {
        return str.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        });
    };


    $.fn.hide = function() {
        $.each(this, function(i, ele) {
            ele.style.display = 'none';
        });
    };
    

    $.fn.toggle = function() {
        $.each(this, function(i, ele) {
            ele.style.display == 'none' ? $(ele).show() : $(ele).hide();
        });
    };

    $.fn.remove = function() {
        this.each(function() {
            //error --- ie 不支持remove
            this.parentNode.removeChild(this);
        });
    };

    $.fn.before = function(dom){
        this.each(function(index,ele){
            ele.parentNode.insertBefore(dom,ele);
        });
    };

    $.fn.wap = function(dom){//$('#id').wap(nodeList)
        this.each(function(index, ele){
            $(ele).before(dom);
            dom.appendChild(ele);
        });
    };

    $.fn.ready = function(fn) {
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

    };
    $.makeColor = function() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    };


    function Cache(){
        this.expando = 'JQ' + $.VERSION + Math.random().toString().replace(/\D/,'') + (Cache.uuid++);
    }
    Cache.uuid = 1;
    Cache.prototype = {
        constructor:Cache,
        cache:function(ele){
            var value = ele[this.expando];
            if(!value){
                value = {};
               if( ele.nodeType ==1 ||  ele.nodeType ==9 ) {
                    ele[this.expando] = value;
               }else{
                    Object.defineProperty(ele, this.expando, {
                        value:value,
                        configurable:true,
                    });
               }
            }
           return value;
        },
        access:function(ele,key,value){//set / get 自动判断处理
             if (key === undefined || (typeof key === 'string' && value === undefined)) {
                return this.get(ele,key);
             }
             this.set(ele,key,value);
             return value!== undefined ? value :key;
        },
        set:function(ele,key,value){//key===string || key === object
            var cache = this.cache(ele);
            if(Object.prototype.toString.call(key) === '[object String]'){
                        cache[key] = value; 
            }else if(Object.prototype.toString.call(key) === '[object Object]'){
                for (var prop in key) {
                    cache[prop] = key[prop];
                }

            }
        },
        get:function(ele,key){
            return  key===undefined ? this.cache(ele) : this.cache(ele)[key];  
        },
    };
    var dataUser = new Cache();

    $.fn.data = function(key, val) {
       return dataUser.access(this[0],key,val);
    };    

    window.$ = $;
}(window, void 0));


//数据缓存
//模块加载器 CMD /AMD
//sizzle 选择器实现









