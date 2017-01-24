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
            },
            "demo_view_form button[action=voluation]": {
                click: this.onVoluation
            }
        });
        this.loadData();
        this.overrideCheckboxgroupSetGet();
        this.overrideRadiogroupSetGet();
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
    },
    onVoluation: function () {
        var view = this.getView();
        var form = view.getForm();
        /*

        原本的赋值方式
        var checkbox = {
        "checkbox2": "2",   // name:inputValue
        "checkbox3": "3"
        }
        form.findField("checkbox").setValue(checkbox);
        alert(form.findField("checkbox").getValue());   // 得到一个对象
        var radio = {
        "radioC": "C"       // name:inputValue
        }
        form.findField("radio").setValue(radio);
        alert(form.findField("radio").getValue()); // 得到一个对象

        */

        // 重写后的赋值方式
        form.findField("checkboxgroup").setValue("1,2,3");
        alert(form.findField("checkboxgroup").getValue());

        form.findField("radiogroup").setValue("A");
        alert(form.findField("radiogroup").getValue());
    },
    // 重写radiogroup setValue和getValue方法
    overrideRadiogroupSetGet: function () {
        Ext.override(Ext.form.RadioGroup, {
            getValue: function () {
                var val = "";
                this.items.each(function (item) {
                    if (item.getValue()) {
                        val = item.inputValue;
                        return false;
                    }
                });
                return val;
            },
            setValue: function (val) {
                this.items.each(function (item) {
                    item.setValue(item.inputValue == val);
                });
            }
        });
    },
    // 重写checkboxgroup setValue和getValue方法
    overrideCheckboxgroupSetGet: function () {
        Ext.override(Ext.form.CheckboxGroup, {
            getValue: function () {
                var val = "";
                this.items.each(function (item) {
                    if (item.getValue()) {
                        val += item.inputValue + ",";
                    }
                });
                return val.slice(0, val.length - 1);
            },
            setValue: function (val) {
                var valAry = val.split(",");
                this.items.each(function (item) {
                    if (valAry.indexOf(item.inputValue) != -1) item.setValue(true);
                    else item.setValue(false);
                });
            }
        });
    }
});