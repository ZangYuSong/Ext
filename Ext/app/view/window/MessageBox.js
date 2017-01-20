Ext.define("Demo.view.window.MessageBox", {
    extend: "Ext.panel.Panel",
    requires: [
        "Demo.controller.window.MessageBox"
    ],
    alias: "widget.demo_view_messagebox",
    controller: "demo_messagebox_controller",
    height: 200,
    width: 200,
    bodyPadding: 15,
    collapsible: true,
    title: "消息提醒样例",
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
        items: [
            { text: "确认", action: "confirm" },
            { text: "提醒", action: "alert" },
            { text: "输入框", action: "prompt" },
            { text: "自定义", action: "self" }
        ]
    }],
    initComponent: function () {
        this.callParent();
    }
});