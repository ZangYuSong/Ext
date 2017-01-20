Ext.define("Demo.store.tree.Navigation", {
    extend: "Ext.data.TreeStore",
    alias: "store.demo_navigation_store",
    model: "Demo.model.tree.Navigation",
    proxy: {
        type: "ajax",
        url: "/app/server/tree/Navigation.ashx?action=loadData",
        reader: {
            type: 'json',
            rootProperty: 'nodes'
        }
    },
    root: {
        text: "所有菜单",
        id: "-1"
    },
    autoLoad: true
});