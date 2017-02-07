Ext.application({
    name: "Demo",
    paths: "app",
    autoCreateViewport: true,    // 自动创建application的OPOA视图，默认加载并初始化app/view/Viewport.js
    // launch: function() {}  // 初始化之后调用
    init: function () { indexOf_Array() }    // 初始化时调用
});

function indexOf_Array() {
    //解决IE8数组不支持indexOf方法
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
}