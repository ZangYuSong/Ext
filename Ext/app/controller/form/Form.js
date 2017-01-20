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
    },
    onSave: function () {
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                url: "/app/server/form/Form.ashx?action=formUpload",
                type: "json",
                success: function (form, action) {
                    Ext.Msg.alert("保存成功", action.result.data);
                },
                failure: function (form, action) {
                    Ext.Msg.alert("操作失败", action.result.data);
                }
            });
        }
    },
    onReset: function () {
        this.getView().reset();
    }
});