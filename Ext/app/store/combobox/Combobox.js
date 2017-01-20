Ext.define("Demo.store.combobox.Combobox", {
    extend: "Ext.data.Store",
    alias: "store.demo_combobox_combobox",
    model: "Demo.model.combobox.Combobox",
    data: [
        { "id": "0", "title": "Aa" },
        { "id": "1", "title": "Bb" },
        { "id": "2", "title": "Cc" }
    ]
});