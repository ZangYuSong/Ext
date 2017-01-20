Ext.define("Demo.view.form.Form", {
    extend: "Ext.form.Panel",
    requires: [
        "Demo.ux.DateTimeField",
        "Demo.controller.form.Form",
        "Demo.store.combobox.Combobox"
    ],
    controller: "demo_form_controller",
    alias: "widget.demo_view_form",
    title: "表单样例",
    bodyPadding: 10,
    collapsible: true,
    width: 580,
    height: 600,
    fieldDefaults: {
        labelWidth: 75,
        labelAlign: "right",
        anchor: "100%",
        margin: 5
    },
    items: [{
        xtype: "fieldset",
        title: "基本信息",
        collapsible: true,
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "container",
            layout: "hbox",
            items: [{
                xtype: "textfield",
                name: "username",
                fieldLabel: "姓名",
                allowBlank: false
            }, {
                xtype: "textfield",
                name: "password",
                inputType: "password",
                fieldLabel: "密码",
                allowBlank: false
            }]
        }, {
            xtype: "hiddenfield",
            name: "hiddne",
            value: "隐藏的控件"
        }, {
            xtype: "filefield",
            name: "upload",
            fieldLabel: "文件上传",
            allowBlank: false,
            buttonText: "预览",
            buttonConfig: {
                glyph: "xf093@FontAwesome"
            }
        }, {
            xtype: "textareafield",
            name: "textarea",
            fieldLabel: "输入框",
            allowBlank: false
        }]
    }, {
        xtype: "fieldset",
        title: "详细信息",
        collapsible: true,
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "container",
            layout: "hbox",
            items: [{
                xtype: "datefield",
                name: "date",
                fieldLabel: "日期控件",
                format: "Y-m-d",
                altFormats: "Y-m-d|Y/m/d|Y m d",
                minValue: new Date(),
                allowBlank: false
            }, {
                xtype: "timefield",
                name: "time",
                fieldLabel: "时间控件",
                format: "H:i",
                altFormats: "H:i|H:i:s|H i|H i s",
                minValue: "08:30",
                maxValue: "17:30",
                increment: "5",
                allowBlank: false
            }]
        }, {
            xtype: "container",
            layout: "hbox",
            items: [{
                xtype: "combobox",
                name: "combobox",
                fieldLabel: "下拉菜单",
                store: {
                    type: "demo_combobox_combobox"
                },
                queryMode: 'local',
                displayField: 'title',
                valueField: 'id',
                allowBlank: false
            }, {
                xtype: "numberfield",
                name: "numberfield",
                fieldLabel: "数字输入框",
                minValue: 0,
                maxValue: 50,
                allowBlank: false
            }]
        }, {
            xtype: "displayfield",
            name: "displayfield",
            fieldLabel: "显示字段",
            value: "只能显示值，<span style=\"color:green;\">无法输入值</span>",
            allowBlank: false
        }, {
            xtype: "checkboxgroup",
            fieldLabel: "多选按钮",
            columns: 4,
            allowBlank: false,
            items: [{ boxLabel: "选项1", name: "checkbox", inputValue: "1" },
                    { boxLabel: "选项2", name: "checkbox", inputValue: "2" },
                    { boxLabel: "选项3", name: "checkbox", inputValue: "3" },
                    { boxLabel: "选项4", name: "checkbox", inputValue: "4" },
                    { boxLabel: "选项5", name: "checkbox", inputValue: "5"}]
        }, {
            xtype: "radiogroup",
            fieldLabel: "单选按钮",
            columns: 4,
            allowBlank: false,
            items: [{ boxLabel: "选项A", name: "radio", inputValue: "A" },
                    { boxLabel: "选项B", name: "radio", inputValue: "B" },
                    { boxLabel: "选项C", name: "radio", inputValue: "C" },
                    { boxLabel: "选项D", name: "radio", inputValue: "D" },
                    { boxLabel: "选项E", name: "radio", inputValue: "E"}]
        }]
    }, {
        xtype: "datetimefield",
        name: "datetime",
        format: "Y-m-d H:i:s",
        fieldLabel: "日期时间",
        allowBlank: false
    }],
    buttons: [{
        text: "保存",
        glyph: "xf0c7@FontAwesome",
        formBind: true,
        disabled: true,
        action: "save"
    }, {
        text: "重置",
        glyph: "xf021@FontAwesome",
        action: "reset"
    }],
    initComponent: function () {
        this.callParent();
    }
});