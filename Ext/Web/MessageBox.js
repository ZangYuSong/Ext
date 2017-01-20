Ext.onReady(function () {
    // 自定义消息按钮的文本
    Ext.window.MessageBox.prototype.buttonText = {
        ok: "确定",
        cancel: "取消",
        yes: "是",
        no: "否"
    };
    Ext.create("Ext.window.Window", {
        title: "MessageBox",
        height: 200,
        width: 200,
        bodyPadding: 15,
        items: [{
            xtype: "container",
            flex: 1,
            layout: {
                type: "vbox",
                align: "stretch"
            },
            defaults: {
                margin: "0 0 10 0"
            },
            defaultType: "button",
            items: [{
                text: "确认",
                handler: function () {
                    // MessageBox == Msg
                    Ext.Msg.confirm("confirm", "你确定要这么做吗?", function (btn) {
                        toast(Ext.String.format("你点击的是{0}按钮", btn));
                    });
                }
            }, {
                text: "提醒",
                handler: function () {
                    Ext.MessageBox.alert("alert", "保存成功", function (btn) {
                        toast(Ext.String.format("你点击的是{0}按钮", btn));
                    });
                }
            }, {
                text: "输入框",
                handler: function () {
                    Ext.MessageBox.prompt("prompt", "带输入框的提示框", function (btn, text) {
                        toast(Ext.String.format("你点击的是{0}按钮,输入的文本是\"{1}\"", btn, text));
                    });
                }
            }, {
                text: "自定义",
                handler: function (btn) {
                    Ext.Msg.show({
                        title: "自定义标题",
                        msg: "自定义提示信息",
                        // YESNOCANCEL Button 显示Yes， No 和 Cancel 按钮的配置
                        // YESNO Button 显示 Yes 和 No 按钮的配置
                        // YES Button 显示单个Yes按钮的配置
                        // NO CANCEL OK OKCANCEL
                        buttons: Ext.Msg.YESNOCANCEL,
                        animateTarget: btn,
                        // 提供 WARNING QUESTION ERROR INFO 图标图片的CSS样式
                        icon: Ext.Msg.INFO,
                        fn: function (btn) {
                            toast(Ext.String.format("你点击的是{0}按钮", btn));
                        }
                    });
                }
            }]
        }]
    }).show();
});

function toast(str) {
    Ext.toast({
        html: str,
        closable: false,
        align: "t",
        slideInDuration: 400,
        minWidth: 400
    });
}