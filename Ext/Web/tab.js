var tab;

Ext.onReady(function () {
    setTab();
});

function setTab() {
    tab = Ext.create("Ext.tab.Panel", {
        renderTo: Ext.getBody(),
        //        title: "标题居中",
        width: 600,
        height: 400,
        //        titleAlign: "center",   // 标题对其样式 left right center
        tabPosition: "left",    // 标签条的位置 top left right bottom
        tabRotation: 0,         // 标签条的旋转角度 default 0 1 2     对应 default none 90deg 270deg
        defaults: {
            iconAlign: "top",   // icon对其方式 top left right bottom
            textAlign: "center",     // 文本对其样式 left right center
            bodyPadding: 15,
            scrollable: true,   // 允许滚动
            closable: true  // 允许关闭
        },
        tabBar: {
            layout: {
                pack: "center"
            }
        },
        items: [{
            title: "Home",
            glyph: "xf015@FontAwesome",
            html: "首页"
        }, {
            title: "Users",
            glyph: "xf007@FontAwesome",
            html: "用户"
        }, {
            title: "Groups",
            glyph: "xf0c0@FontAwesome",
            html: "群组"
        }, {
            title: "Settings",
            glyph: "xf013@FontAwesome",
            html: "设置"
            // 异步加载其他页面
            //            loader: {
            //                url: 'resources/data/tab/ajax1.htm',
            //                contentType: 'html',
            //                loadMask: true
            //            }
        }]
    });
}