Ext.define("Demo.controller.form.Form", {
    extend: "Ext.app.ViewController",
    alias: "controller.demo_form_controller",
    init: function () {
        this.control({
            "demo_view_form button[action=reset]": {
                click: this.onReset
            },
            "demo_view_form button[action=save]": {
                click: this.onSave
            }
        });
        this.loadData();
    },
    onSave: function () {
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                url: "/app/server/form/Form.ashx?action=formUpload",
                type: "json",
                failure: function (form, action) {
                    Ext.Msg.alert("操作失败", action.result.data);
                }
            });
        }
    },
    loadData: function () {
        this.getView().load({
            url: "/app/server/form/Form.ashx",
            type: "json",
            params: {
                "action": "formGetData",
                "id": "1"
            },
            failure: function (form, action) {
                Ext.Msg.alert("操作失败");
            }
        });
    },
    onReset: function () {
        this.getView().reset();
    }
});