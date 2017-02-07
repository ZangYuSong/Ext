Ext.define("Demo.controller.tree.Navigation", {
    extend: "Ext.app.ViewController",
    alias: "controller.demo_tree_controller",
    init: function () {
        // 添加控件事件的一种方式，另外一种是加载在view
        this.control({
            "demo_view_navigation": {
                rowclick: this.onClick
            }
        });
    },
    onClick: function (view, rec, item, index, e) {
        if (rec.data.id != -1) {
            var centerInfo = Ext.getCmp("centerInfo");
            centerInfo.removeAll();
            // rec.data.class 在IE8环境下会报错
            centerInfo.add(Ext.create(rec.data.classType));
        }
    }
});

