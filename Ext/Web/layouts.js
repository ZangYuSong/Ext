Ext.onReady(function () {
    accordion();
    absolute();
    border();
    card();
    column();
    fit();
    hbox();
    vbox();
    table();
});

// 此布局将多个Panel以一种可以展开/收缩的样式排列, 且任何时候只有一个Panel可以处于展开状态. 每个Panel都会内置对展开/收缩支持.
function accordion() {
    Ext.create("Ext.window.Window", {
        title: "Accordion",
        width: 300,
        height: 300,
        layout: {
            type: "accordion",
            // 是否表示允许通过点击标题栏的任意位置来展开/收缩子项Panel
            titleCollapse: true,
            // 动画效果
            animate: true,
            // 是否面板移动到容器的第一个
            activeOnTop: true
        },
        items: [{
            title: "Panel 1",
            html: "Panel 1"
        }, {
            title: "Panel 2",
            html: "Panel 2"
        }, {
            title: "Panel 3",
            html: "Panel 3"
        }]
    }).show();
}

// 此布局为锚点固定特性的布局, 并使用标准x,y属性进行x/y坐标定位
function absolute() {
    Ext.create("Ext.window.Window", {
        title: "Absolute",
        width: 300,
        height: 300,
        layout: "absolute",
        defaultType: "label",
        items: [{
            x: 10,
            y: 10,
            text: "10*10"
        }, {
            x: 30,
            y: 30,
            text: "30*30"
        }, {
            x: 100,
            y: 100,
            text: "100*100"
        }]
    }).show();
}

// 此布局为面向应用的UI布局样式, 支持多重嵌套面板, 自动在各区域及内嵌展开和收缩 区域之间产生分隔栏.
function border() {
    Ext.create("Ext.window.Window", {
        title: "Boder",
        width: 500,
        height: 400,
        layout: "border",
        defaults: {
            split: true,    // 允许手动调整大小,除了中心
            bodyPadding: 10
        },
        items: [{
            // 使用Border布局的容器必须拥有一个子组件配置为region:"center"
            // 布局的位置
            // 东   南    西   北    中
            // 右   下    左   上    中
            // east south west north center
            region: "south",
            height: 100,
            html: "南/下"
        }, {
            region: "west",
            margin: "5 0 0 0",
            html: "西/左"
        }, {
            region: "center",
            margin: "5 0 0 0",
            html: "中"
        }]
    }).show();
}

// 此布局管理多个子组件, 每个都完全填满父容器, 而每次仅显示一个
function card() {
    Ext.create("Ext.window.Window", {
        title: "Card",
        layout: "card",
        width: 500,
        height: 400,
        bodyPadding: 15,
        bbar: ["->", {
            id: "card-prev",
            text: "Previous",
            handler: function (btn) {
                // up() 获取组件的父级组件 
                click(btn.up("window"), -1);
            },
            disabled: true
        }, {
            id: "card-next",
            handler: function (btn) {
                click(btn.up("window"), 1);
            },
            text: "Next"
        }],
        items: [{
            id: "card-0",
            html: "第一步"
        }, {
            id: "card-1",
            html: "第二步"
        }, {
            id: "card-2",
            html: "第三步"
        }]
    }).show();
}
function click(me, incr) {
    var l = me.getLayout();
    var i = l.activeItem.id.split("card-")[1];
    var next = parseInt(i, 10) + incr;
    l.setActiveItem(next);
    // down() 获取组件的子级组件 
    me.down("#card-prev").setDisabled(next === 0);
    me.down("#card-next").setDisabled(next === 2);
}

// 此布局用于在一个多列格式中创建结构化布局的布局样式, 每列可以用百分比或固定的宽度值来定义, 但允许高度根据内容而改变
function column() {
    Ext.create("Ext.window.Window", {
        title: "Column",
        width: 500,
        height: 240,
        layout: "column",
        bodyPadding: 5,
        defaults: {
            bodyPadding: 15
        },
        items: [{
            title: "0.3",
            columnWidth: 0.3,
            html: "<p>0.3</p><p>0.3</p><p>0.3</p>"
        }, {
            title: "0.7",
            columnWidth: 0.7,
            html: "<p>0.7</p><p>0.7</p><p>0.7</p>"
        }, {
            title: "150px",
            width: 150,
            html: "<p>150px</p><p>150px</p><p>150px</p>"
        }]
    }).show();
}

// 此布局当容器只包含一个子元素时, 子元素自动填满容器
function fit() {
    Ext.create("Ext.window.Window", {
        title: "Fit",
        width: 300,
        height: 150,
        layout: "fit",
        items: {
            title: "Inner Panel",
            html: "This is the inner panel content",
            bodyPadding: 20,
            border: false
        }
    }).show();
}

// 此布局是将所有子组件在容器中水平排列
function hbox() {
    Ext.create("Ext.window.Window", {
        title: "HBox",
        width: 500,
        height: 400,
        layout: {
            type: "hbox",
            // 控制子组件如何被打包在一起. 此属性的有效值为:
            // start - 子组件被包在一起放在容器的左边 (默认)
            // center - 子组件被包在一起放在容器里居中
            // end - 子组件被包在一起放在容器的右边
            pack: "center",
            // 对其方式
            // top : 默认值 各子组件在容器顶部水平对齐.
            // middle : 各子组件在容器中间水平对齐.
            // stretch : 各子组件的高度拉伸至与容器的高度相等.
            // stretchmax : 各子组件的高度拉伸至与最高的子组件的高度相等.
            align: "stretch"
        },
        bodyPadding: 10,
        defaults: {
            frame: true,
            bodyPadding: 10
        },
        items: [{
            title: "Panel 1",
            flex: 1,
            margin: "0 10 0 0",
            html: "flex : 1"
        }, {
            title: "Panel 2",
            width: 100,
            margin: "0 10 0 0",
            html: "width : 100"
        }, {
            title: "Panel 3",
            flex: 2,
            html: "flex : 2"
        }]
    }).show();
}

// 此布局是将所有子组件在容器中垂直排列
function vbox() {
    Ext.create("Ext.window.Window", {
        title: "VBox",
        width: 400,
        height: 500,
        layout: {
            type: "vbox",
            pack: "center",
            // 类似hbox属性，水平变为垂直  高度变为宽度
            align: "stretch"
        },
        bodyPadding: 10,
        defaults: {
            frame: true,
            bodyPadding: 10
        },
        items: [{
            title: "Panel 1",
            flex: 1,
            margin: "0 10 0 0",
            html: "flex : 1"
        }, {
            title: "Panel 2",
            height: 100,
            margin: "0 10 0 0",
            html: "height : 100"
        }, {
            title: "Panel 3",
            flex: 2,
            html: "flex : 2"
        }]
    }).show();
}

// 此布局允许你很轻松的将内容渲染到一个HTML的table中. 可以指定列数, 也能够使用rowspan和colspan参数来创建复杂的布局
// 对于TableLayout来说, 唯一有效的参数只有 columns 和 tableAttrs. 但是, 所有添加到此布局下的子项可以支持以下 几个布局专用属性:
// rowspan 应用到包含此子项的table单元格.
// colspan 应用到包含此子项的table单元格.
// cellId 一个ID添加到包含此子项的table单元格上.
// cellCls 一个CSS class名称添加到包含此子项的table单元格上.
function table() {
    Ext.create("Ext.window.Window", {
        title: "Table",
        width: 500,
        height: 140,
        layout: {
            type: "table",
            columns: 3,
            tableAttrs: {
                style: {
                    width: "100%"
                }
            }
        },
        scrollable: true,
        defaults: {
            bodyPadding: "15 20",
            border: true
        },
        items: [{
            html: "Cell A content",
            height: 100,
            rowspan: 2
        }, {
            html: "Cell B content",
            height: 50,
            colspan: 2
        }, {
            html: "Cell C content",
            height: 50
        }, {
            html: "Cell D content",
            height: 50
        }]
    }).show();
}