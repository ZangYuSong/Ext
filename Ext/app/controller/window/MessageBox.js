Ext.define("Demo.controller.window.MessageBox", {
    extend: "Ext.app.ViewController",
    alias: "controller.demo_messagebox_controller",
    init: function () {
        this.control({
            "demo_view_messagebox button[action=confirm]": {
                click: this.onConfirm
            },
            "demo_view_messagebox button[action=alert]": {
                click: this.onAlert
            },
            "demo_view_messagebox button[action=prompt]": {
                click: this.onPrompt
            },
            "demo_view_messagebox button[action=self]": {
                click: this.onSelf
            }
        });
    },
    onConfirm: function () {
        var me = this;
        Ext.Msg.confirm("confirm", "你确定要这么做吗?", function (btn) {
            me.toast(Ext.String.format("你点击的是{0}按钮", btn));
        });
    },
    onAlert: function () {
        var me = this;
        Ext.Msg.alert("alert", "你确定要这么做吗?", function (btn) {
            me.toast(Ext.String.format("你点击的是{0}按钮", btn));
        });
    },
    onPrompt: function () {
        var me = this;
        Ext.Msg.prompt("prompt", "你确定要这么做吗?", function (btn, text) {
            me.toast(Ext.String.format("你点击的是{0}按钮,输入的是\"{1}\"", btn, text));
        });
    },
    onSelf: function (btn) {
        var me = this;
        Ext.Msg.show({
            title: "自定义标题",
            msg: "自定义提示信息",
            buttons: Ext.Msg.YESNOCANCEL,
            animateTarget: btn,
            fn: function (btn) {
                me.toast(Ext.String.format("你点击的是{0}按钮", btn));
            }
        });
    },
    toast: function (str) {
        Ext.toast({
            html: str,
            closable: false,
            align: "t",
            slideInDuration: 400,
            minWidth: 400
        });
    }
});