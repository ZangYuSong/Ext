Ext.define("Demo.model.grid.Grid", {
    extend: "Ext.data.Model",
    fields: [
        { name: "id", type: "int" },
        { name: "company", type: "string" },
        { name: "price", type: "number" },
        { name: "change", type: "number" },
        { name: "pctChange", type: "number" },
        { name: "lastChange", type: "date" }
    ]
});