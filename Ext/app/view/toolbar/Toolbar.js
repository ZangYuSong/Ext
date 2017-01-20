Ext.define("Demo.view.toolbar.Toolbar", {
    extend: "Ext.toolbar.Toolbar",
    alias: "widget.demo_grid_toolbar",
    xtype: 'toolbar',
    items: [{
        text: "新增",
        glyph: "xf067@FontAwesome"
    }, "-", {
        text: "修改",
        glyph: "xf044@FontAwesome",
        action: "edit"
    }, "-", {
        text: "删除",
        glyph: "xf014@FontAwesome"
    }, "-", {
        text: "详情",
        glyph: "xf15c@FontAwesome"
    }]
});