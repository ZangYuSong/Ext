Ext.define("Demo.store.grid.Grid", {
    extend: "Ext.data.Store",
    alias: "store.demo_grid_store",
    model: "Demo.model.grid.Grid",
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: "/app/server/grid/Grid.ashx?action=loadData",
        reader: {
            rootProperty: "Rows",
            totalProperty: "totalCount",
            type: "json"
        }
    },
    autoLoad: true
});