var myTree;

Ext.onReady(function () {
    setTree();
    setClick();
});

var store = Ext.create("Ext.data.TreeStore", {
    nodeParam: "id",    // 异步加载最重要的一部分，向后台传递参数。根据id获取其对应的子节点
    proxy: {
        type: "ajax",
        url: "tree.aspx?action=loadData",
        reader: {
            type: 'json',
            // 对于树读取内嵌数据，在Ext.data.reader.Reader中必须配置一个root属性， 
            // 这样reader可以找到关于每个节点的内嵌数据。 如果未指定root，那么它将默认为'children'
            // 在5以后更改为 rootProperty
            rootProperty: 'nodes'
        }
    },
    folderSort: true,   // 是否排序
    sorters: [{         // 排序规则
        property: "text",
        direction: "desc"
    }],
    root: {
        text: "根节点",
        id: "0"
    },
    autoLoad: true
});

function setTree() {
    myTree = Ext.create("Ext.tree.Panel", {
        title: "树样例",
        width: 300,
        height: 600,
        store: store,
        rootVisible: true, // 隐藏根节点
        renderTo: Ext.getBody(),
        useArrows: true, // 在tree中使用Vista-style样式的箭头
        animate: true,   // 展开/折叠的动画
        rame: true,
        collapsible: true,  // 允许折叠
        collapsed: false, // 折叠
        viewConfig: {
            plugins: { ptype: "treeviewdragdrop"}  // 允许拖拽
        },
        tbar: [{
            text: "Click",
            handler: function () {
                var records = myTree.getView().getChecked(), names = [];
                Ext.Array.each(records, function (rec) {
                    names.push(rec.get("text"));
                });
                Ext.MessageBox.show({
                    title: "Selected Nodes",
                    msg: names.join("<br />"),
                    icon: Ext.MessageBox.INFO
                });
            }
        }]
    });
}

var menu = Ext.create("Ext.menu.Menu", {
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
});

function setClick() {
    // rowclick 单击
    // rowdblclick 双击
    //右键
    myTree.on("rowcontextmenu", function (view, node, item, index, event) {
        if (!node.hasChildNodes()) {
            event.preventDefault();
            menu.showAt(event.getXY());
        }
    });
    //1、全部展开 tree.expandAll();
    //2、全部收缩 tree.collapseAll();
    //3、得到父节点 node.parentNode
    //4、判断是否有父节点 node.parentNode==null
    //5、判断是否有子节点 node.hasChildNodes()
    //6、获取下一级所有子节点 node.eachChild(function(child) { })
    //7、获取选择的节点 tree.getSelectionModel().getSelectedNode()
    //8、设置选中节点  node.select()
    //9、上移节点 node.selectPrevious();
    //10、下移节点 node.selectNext();
    //11、获取节点ID  node.data.id
    //12、获取节点值  node.data.text
    //13、获取节点提示  node.attributes.qtip
}