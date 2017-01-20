Ext.define("Demo.view.grid.Grid", {
    extend: "Ext.grid.Panel",
    alias: "widget.demo_view_gridlist",
    requires: [
        "Demo.controller.grid.Grid",
        "Demo.store.grid.Grid",
        "Demo.view.toolbar.Toolbar"
    ],
    controller: "demo_grid_controller",
    title: "测试网格",
    collapsible: true,
    columnLines: true,
    frame: true,
    resizable: true,
    width: 800,
    height: 430,
    viewConfig: {
        plugins: ["gridviewdragdrop"]
    },
    selType: "checkboxmodel",
    tbar: {
        type: "demo_grid_toolbar"
    },
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
            // 这两个地方必须使用同一个store  这样你在点击分页  改变了分页的store就表示改变了列表的store
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