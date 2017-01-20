Ext.define("Demo.view.Viewport", {
    extend: "Ext.container.Viewport",
    requires: [
        "Demo.view.tree.Navigation"
    ],
    layout: "border",
    defaults: {
        split: true    // 允许手动调整大小,除了中心
    },
    items: [{
        region: "west",
        width: 300,
        collapsible: true,
        title: "菜单列表",
        xtype: "demo_view_navigation"
    }, {
        id: "centerInfo",
        region: "center",
        title: "内容详情",
        layout: {
            type: "hbox",
            pack: "center",
            align: "middle"
        }
    }]
});