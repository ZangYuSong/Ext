Ext.define("Demo.model.grid.Grid", {
    extend: "Ext.data.Model",
    alias: "",
    fields: [
        { name: "id", type: "int" },
        { name: "company", type: "string" },
        { name: "price", type: "number" },
        { name: "change", type: "number" },
        { name: "pctChange", type: "number" },
        { name: "lastChange", type: "date" }
    ]
});

Ext.define("Demo.store.grid.Grid", {
    extend: "Ext.data.Store",
    alias: "store.demo_grid_store",
    model: "Demo.model.grid.Grid",
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: "grid.aspx?action=loadData",
        reader: {
            rootProperty: "Rows",
            totalProperty: "totalCount",
            type: "json"
        }
    },
    autoLoad: true
});

Ext.onReady(function () {
    setGrid();
});

Ext.define("Demo.controller.grid.Grid", {
    extend: "Ext.app.ViewController",   // 继承的父类
    alias: "controller.demo_grid_controller",   // 别名
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

Ext.define("Demo.view.grid.Grid", {
    extend: "Ext.grid.Panel",
    alias: "widget.gridlist",
    controller: "demo_grid_controller",
    title: "测试网格",
    width: 900,
    height: 430,
    collapsible: true,
    columnLines: true,
    frame: true,
    resizable: true,
    viewConfig: {
        plugins: ["gridviewdragdrop"]
    },
    selType: "checkboxmodel",
    listeners: {
        rowdblclick: "onDblClick",
        rowcontextmenu: "onContextmenu"
    },
    tbar: Ext.create("Ext.toolbar.Toolbar", {
        xtype: 'toolbar',
        items: [{
            text: "新增",
            glyph: "xf067@FontAwesome"
        }, "-", {
            text: "修改",
            glyph: "xf044@FontAwesome",
            handler: "onEdit"
        }, "-", {
            text: "删除",
            glyph: "xf014@FontAwesome"
        }, "-", {
            text: "详情",
            glyph: "xf15c@FontAwesome"
        }]
    }),
    columns: [{
        xtype: "rownumberer",
        sortable: false,
        locked: true
    }, {
        text: "公司",
        flex: 1,
        sortable: true,
        dataIndex: "company"
    }, {
        text: "股票行市",
        columns: [{
            text: "价格 ￥",
            width: 120,
            sortable: true,
            renderer: "addSuffix",
            dataIndex: "price"
        }, {
            text: "浮动",
            width: 120,
            sortable: true,
            renderer: "changeColor",
            dataIndex: "change"
        }, {
            text: "浮动百分比 %",
            width: 120,
            sortable: true,
            renderer: "changeColor",
            dataIndex: "pctChange"
        }]
    }, {
        text: "最近更新时间",
        width: 200,
        sortable: true,
        formatter: "date(\"Y-m-d H:i:s\")",
        dataIndex: "lastChange"
    }],
    initComponent: function () {
        var store = Ext.create("Demo.store.grid.Grid");
        Ext.apply(this, {
            // store: {
            //     type: "demo_grid_store"
            // },
            // 不使用上述方式的原因 在grid中总共有两个地方使用到了store
            // 一个是加载列表 一个是加载分页
            // 这两个地方必须使用同一个store 列表内容会根据分页的不同，加载不同
            // 如果使用上述方式，怎会生成两个不同的store，这样你在点击分页的时候，列表就没有任何反应
            store: store,
            bbar: {
                xtype: "pagingtoolbar",
                store: store,
                displayInfo: true,
                emptyMsg: "没有数据显示",
                displayMsg: "显示从{0}条数据到{1}条数据，共{2}条数据"
            }
        });
        this.callParent();
    }
});

function setGrid() {
    Ext.create("Demo.view.grid.Grid", { renderTo: Ext.getBody() });
}