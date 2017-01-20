﻿Ext.define("Demo.controller.grid.Grid", {
    extend: "Ext.app.ViewController",   // 继承的父类
    alias: "controller.demo_grid_controller",   // 别名
    init: function () {
        this.control({
            "demo_view_gridlist": {
                rowdblclick: this.onDblClick,
                rowcontextmenu: this.onContextmenu
            },
            "demo_grid_toolbar button[action=edit]": {
                click: this.onEdit
            }
        });
    },
    menu: Ext.create('Ext.menu.Menu', {
        width: 100,
        items: [{
            text: "新增",
            glyph: "xf067@FontAwesome"
        }, {
            text: "修改",
            glyph: "xf044@FontAwesome"
        }, {
            text: "删除",
            glyph: "xf014@FontAwesome"
        }]
    }),
    changeColor: function (val) {
        if (val > 0) {
            return "<span style=\"color:green;\">" + val + "</span>";
        } else if (val < 0) {
            return "<span style=\"color:red;\">" + val + "</span>";
        }
        return val;
    },
    addSuffix: function (val) {
        return "￥" + val
    },
    onEdit: function () {
        var selMdoel = this.getView().getSelectionModel();
        var isSelected = selMdoel.hasSelection();
        if (!isSelected) {
            Ext.MessageBox.alert("注意", "请选者一行添加的数据的，进行添加");
            return;
        }
        var gridData = selMdoel.getSelected(); //获取选择的数据
        Ext.MessageBox.alert("注意", gridData.items[0].data.id);
    },
    onDblClick: function (view, record, item, index, event) {
        Ext.MessageBox.alert("注意", record.data.id);
    },
    onContextmenu: function (view, record, item, index, event) {
        event.preventDefault();
        this.menu.showAt(event.getXY());
    }
});