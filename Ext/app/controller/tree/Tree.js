Ext.define("Demo.controller.tree.Tree", {
    extend: "Ext.app.ViewController",
    alias: "controller.demo_tree_tree",
    init: function () {
        this.control({
            "tree": {
                checkchange: this.onCheckChange
            }
        });
    },
    onCheckChange: function (node, ischecked) {
        // 不为空，表示为半选状态，半选之后的状态为选定
        if (node.get("cls") != "") {
            ischecked = true;
        }
        this.checkedChildNode(node, ischecked);
        this.checkedParentNode(node, ischecked);
    },
    // 选中所有的子节点
    checkedChildNode: function (node, ischecked) {
        node.set("checked", ischecked);
        node.set("cls", "");
        if (node.hasChildNodes()) {     // 是否包含子节点
            node.eachChild(function (nodeChild) {
                this.checkedChildNode(nodeChild, ischecked)
            });
        }
    },
    // 选中所有的父节点，半选或者选中
    // 在Ext4.0之后，树的选定状态就只有选定和不选定，取消了半选定状态。
    // 因此在设计树的时候应该只给叶子节点(leaf)设置checked属性
    // 如果一定要使用半选定状态可以参考下述的代码
    checkedParentNode: function (node, ischecked) {
        var parent = node.parentNode;
        var partial = true;
        if (parent != null) {
            parent.eachChild(function (parentChild) {
                // 确定半选状态
                // 情况一：子节点的checked与ischecked不一致
                // 情况二：子节点为半选状态 parentChild.get("cls") != ""
                if (parentChild.get("checked") != ischecked || parentChild.get("cls") != "") {
                    // 半选定状态为 : 选定 + 透明度50%
                    parent.set("cls", "partial_select");
                    parent.set("checked", true);
                    partial = false;
                    return false;
                }
            });
            if (partial) {
                parent.set("checked", ischecked);
                parent.set("cls", "");
            }
            this.checkedParentNode(parent, ischecked);
        }
    }

});

