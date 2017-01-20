Ext.define("Demo.view.tree.Tree", {
    extend: "Ext.tree.Panel",
    requires: [
        "Demo.store.tree.Tree"
    ],
    alias: "widget.tree",
    useArrows: true,
    animate: true,
    collapsible: true,
    width: 300,
    height: 600,
    store: Ext.create("Demo.store.tree.Tree"),
    initComponent: function () {
        this.callParent();
    }
});

