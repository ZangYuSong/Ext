Ext.define("Demo.view.tree.Navigation", {
    extend: "Ext.tree.Panel",
    requires: [
        "Demo.controller.tree.Navigation"
    ],
    alias: "widget.demo_view_navigation",
    controller: "demo_tree_controller",
    useArrows: true,
    animate: true,
    collapsible: true,
    store: Ext.create("Demo.store.tree.Navigation"),
    initComponent: function () {
        this.callParent();
    }
    //    添加控件事件的一种方式，另外一种是加载在controller
    //    listeners: {
    //        rowclick: "onClick"
    //    }
});

