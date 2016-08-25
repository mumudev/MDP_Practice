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
        if(selector instanceof $){
            return selector;
        }
        return new $.fn.init(selector);
    };

    $.VERSION = '1.0.0';

    $.fn = $.prototype = {
        constructor:$,
    };

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
        return this;
    };

    $.fn.off = function(type, callback, useCapture) {
        if ('attachEvent' in document) {
            $.each(this, function(i, idx) {
                idx.detachEvent.call('on' + type, callback);
            });
        } else {
            $.each(this, function(i, idx) {
                idx.removeEventListener(type, callback, useCapture);
            });
        }
        return this;
    };

    $.each = function(elements, callback) {
        for (var i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false)
                return i;
        }
    }; 
    $.fn.each = function(callback) {
        //likeArray
        var ret;
        for (var i = 0; i < this.length; i++) {
            ret = callback.call(this[i], i, this[i]);
            if(ret === false) return;
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
        return this;
    };

    $.fn.addClass = function(name) {
        $.each(this, function(i, ele) {
            if (!$(ele).hasClass(name)) {
                ele.className += name ? (' ' + name) : '';
            }
        });
        return this;
    };
    $.fn.hasClass = function(name) {
        var ret;
        $.each(this, function(i, ele) {
            var classRE = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
            ret =  classRE.test(ele.className);
            if(ret) return !ret;
        });
        return ret;
    };
    $.fn.removeClass = function(name) {
        $.each(this, function(i, ele) {
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            ele.className = ele.className.replace(classRE, '');
        });
        return this;
    };
    $.fn.toggleClass = function(name) {
        $.each(this, function(i, ele) {
            if (!$(ele).hasClass(name)) {
                $(ele).addClass(name);
            } else {
                $(ele).removeClass(name);
            }
        });
        return this;
    };

    $.fn.css = function(attrName, attrValue) {
        var ret = null;
        this.each(function() {
            if (typeof attrName === 'object') {
                for (var key in attrName) {
                    key = camelize(key);
                    
                    this.style[key] = attrName[key];
                }
            } else if(attrValue){
                this.style[camelize(attrName)] = attrValue;
            }else{
                ret =  window.getComputedStyle(this)[attrName];
            }
        });
        return ret?ret:this;

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
        return this;
    };
    

    $.fn.toggle = function() {
        $.each(this, function(i, ele) {
            ele.style.display == 'none' ? $(ele).show() : $(ele).hide();
        });
        return this;
    };

    $.fn.remove = function() {
        this.each(function() {
            //error --- ie 不支持remove
            this.parentNode&&this.parentNode.removeChild(this);
        });
        return this;
    };

    $.fn.before = function(dom){
        this.each(function(index,ele){
            ele.parentNode.insertBefore(dom,ele);
        });
        return this;
    };

    $.fn.wrap = function(dom){//$('#id').rwap(nodeList)
        this.each(function(index, ele){
            $(ele).before(dom);
            dom.appendChild(ele);
        });
        return this;
    };

    $.fn.unwrap = function(selector){
        this.each(function(index, ele){
            var parent = $(ele).parent(selector);
            parent&&parent.length&&parent[0].parentNode.replaceChild(ele,parent[0]);
        });
        return this;
    };

    $.fn.eq = function(i){
        var len = this.length,
            index = i + ( i<0 ? len : 0);
        return $(this[index]);
    };

    $.fn.first = function(){
        return this.eq(0);
    };

    $.fn.last = function(){
        return this.eq(-1);
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

    $.fn.text = function(val){
        return this[0].textContent = val;
    };

    $.fn.find = function(selector){
         var elem = this[0].querySelectorAll(selector);
         return $(elem);
    };

    $.fn.parent = function(selector){
       selector = (selector.replace(/\.|#/g,''));
       var parent = this[0].parentNode;
       while(parent){
            if(parent.className&&(parent.className.indexOf(selector)>-1 || selector === parent.id)){
                return $(parent)
           }
           parent = parent.parentNode;
       }
    }

    $.fn.next = function(){
        var cur = this[0],
            dir = 'nextSibling';
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return $(cur);
    };

    $.fn.prev = function(){
        var cur = this[0],
            dir = 'prevSibling';
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return $(cur);
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

    var dataPriv = new Cache();
    var dataUser = new Cache();

    $.data = function(key, val) {
       return dataUser.access(this[0],key,val);
    };

    $.fn.data = function(key, val) {
        var data = dataUser.access(this[0],key,val);
        return data;
        // if(typeof key === 'string' && val!== undefined){
        //    return this[0].setAttribute('data-'+key,val);
        // }else if(typeof key === 'object'){
        //     for (var prop in key) {
        //         this[0].setAttribute(prop,key[prop]);
        //     }
        // }else if(val === undefined){
        //    return this[0].getAttribute('data-'+key);
        // }
    };

    $.fn.delegate = function(eventType,selector,fn){
        function handle(e){
            var evt = window.event ?window.event:e;
            var target = evt.target || evt.srcElement;
            var currentTarget = e ? e.currentTarget:this;

            selector = selector.replace(/\.|#/g,'');

            while(currentTarget !== target || !currentTarget || !target){
                if(target.id === selector || target.className.indexOf(selector)>-1 || target.nodeName.toLowerCase() === selector){
                    if(evt.stopPropagation){
                        evt.stopPropagation();
                    }else{
                        evt.cancelBubble = true;
                    }
                    return fn.call($(target),evt);
                }
                target  = target.parentNode;
            }
        }
        this.on(eventType,handle);
        return this;
    };    

    window.$ = $;
}(window, void 0));


//数据缓存
//模块加载器 CMD /AMD
//sizzle 选择器实现


//继承实现
function inherit(parent, child, flag) {
    if (Object.prototype.toString.call(parent) !== '[object Function]') {
        return console.log('parent not a valid class');
    }
    if (typeof child !== 'function') {
        child = function() {};
    }
    if (flag) {
        var supperClass = function() {};
        supperClass.prototype = parent.prototype;
        var oSuper = new supperClass();
        for (var key in oSuper) { //区分hasOwnProperity
            if (!child.prototype[key]) {
                child.prototype[key] = oSuper[key];
            }
        }
    } else {
        var childClass = function() {};
        childClass.prototype = child.prototype;
        var oSub = new childClass();
        child.prototype = new parent(); //复制整个父类
        for (var key in oSub) { //恢复子类原型属性
            if (!child.prototype[key]) {
                child.prototype[key] = oSub[key];
            }
        }
    }
    child.__supper__ = parent.prototype;
    child.prototype.constructor = child;
    return child;
}







