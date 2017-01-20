Ext.define("Demo.model.tree.Navigation", {
    extend: "Ext.data.Model",
    fields: [
        { name: "id", type: "int" },
        { name: "text", type: "string" },
        { name: "class", type: "string" },
        { name: "leaf", type: "boolean" }
    ]
});

