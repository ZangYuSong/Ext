﻿Ext.define("Demo.view.tree.Tree", {
    extend: "Ext.tree.Panel",
    requires: [
        "Demo.store.tree.Tree",
        "Demo.controller.tree.Tree"
    ],
    alias: "widget.demo_view_tree",
    controller: "demo_controller_tree",
    useArrows: true,
    animate: true,
    collapsible: true,
    width: 300,
    height: 600,
    store: Ext.create("Demo.store.tree.Tree"),
    initComponent: function () {
        this.expandAll();   // 全部展开
        this.callParent();
    }
});