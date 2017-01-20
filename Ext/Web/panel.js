var mypanel = null;

Ext.onReady(function () {
    mypanel = Ext.create("Ext.panel.Panel", {
        renderTo: Ext.getBody(),
        defaults: {
            xtype: "panel",
            width: 200,
            height: 280,
            bodyPadding: 10,
            frame: true
        },
        bodyStyle: "border:0;",
        layout: {
            type: "table",
            columns: 3,
            tdAttrs: { style: "padding: 10px; vertical-align: top;" }
        },
        items: [
            { html: "one", title: "one", headerPosition: "left" },
            { html: "two", title: "two", headerPosition: "right" },
            { html: "three", title: "three", collapsible: true, title: "title", headerPosition: "bottom" },
            {
                title: "four",
                collapsible: true,
                id: "four",
                width: 640,
                html: "four",
                glyph: "xf007@FontAwesome",
                tools: [
                    {
                        type: "pin",
                        handler: function () {
                            Ext.getCmp("four").body.update(this.type);
                        }
                    }, {
                        type: "search",
                        handler: function () {
                            Ext.getCmp("four").body.update(this.type);
                        }
                    }, {
                        type: "save",
                        handler: function () {
                            Ext.getCmp("four").body.update(this.type);
                        }
                    }, {
                        type: "delete",
                        handler: function () {
                            mypanel.remove(Ext.getCmp("four"));
                        }
                    }
                ],
                colspan: 3
            }
        ]
    });
});