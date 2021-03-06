﻿Ext.define("Demo.store.tree.Tree", {
    extend: "Ext.data.TreeStore",
    nodeParam: "id",
    proxy: {
        type: "ajax",
        url: "/app/server/tree/Navigation.ashx?action=loadDataTree",
        reader: {
            type: 'json',
            rootProperty: 'nodes'
        }
    },
    root: {
        text: "所有菜单",
        id: "0",
        checked: false
    },
    autoLoad: true
});