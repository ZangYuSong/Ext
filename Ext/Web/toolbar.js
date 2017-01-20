/*
onReady文档加载完成之后执行
第一个参数是必须的，表示要执行的函数或匿名函数，
第二参数表示函数的作用域，
第三个参数表示函数执行的一些其它特性，比如延迟多少毫秒执行等，大多数情况下只需要第一个参数即可
*/
Ext.onReady(function () {
    setToolBars();
});

var setToolBars = function () {
    var addedItems = [];
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
        renderTo: "toolbar",
        width: 800,
        margin: "10px",
        items: [
            {
                // 默认类型
                xtype: "button",
                text: "添加按钮",
                handler: function () {
                    var text = $("input[name=\"buttonName\"]").val();
                    if (text) {
                        addedItems.push(toolbar.add({
                            text: text
                        }));
                    } else {
                        alert("请输入新增按钮名称");
                    }

                }
            },
            "-"  // 垂直分割符号 等同于 { xtype: "tbseparator" }
            ,
            {
                xtype: 'textfield',
                name: 'buttonName',
                emptyText: '输入新增按钮名称'
            },
            "-"
            ,
            {
                // 分割按钮
                xtype: "splitbutton",
                text: "分割按钮"
            },
            {
                text: "禁用所有项",
                scope: this,
                name: "disableBtn",
                disabled: false,
                handler: function () {
                    toolbar.disable();
                }

            },
            {
                text: "启用所有项",
                scope: this,
                name: "disableBtn",
                disabled: true,
                handler: function () {
                    toolbar.enable();
                }

            },
            "->" // 右对齐容器,类似右对齐输入的文本框 等同于 { xtype: "tbfill" }
            ,
            {
                text: "删除上一个新增项",
                handler: function () {
                    toolbar.remove(addedItems.pop());
                }
            }
        ]
    });
}
