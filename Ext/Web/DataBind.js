var databind = null;
var count = 1;

Ext.define("Myapp.store.Countries", {
    extend: "Ext.data.Store",
    alias: "store.countries",
    fields: ["country"],
    data: [{ country: "中国" }, { country: "美国" }]
});

Ext.define("Myapp.store.CountryStates", {
    extend: "Ext.data.Store",
    alias: "store.states",
    fields: ["country", "states"],
    data: [{ country: "中国", states: "北京" }, { country: "美国", states: "纽约" }, { country: "中国", states: "上海" }, { country: "美国", states: "华盛顿" }]
});

Ext.define("Myapp.binding.TwoWayFormulasModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.binding-two-way-formulas",
    formulas: {
        quad: function (get) {
            return get("twice") * 2;
        },
        twice: function (get) {
            return get("x") * 2;
        },
        age: {
            get: function (get) {
                return this.getAge(get("birthDate"));
            },
            set: function (age) {
                var date = this.getData().birthDate, now = new Date();
                if (!date) {
                    // Ext.Date.add(date, interval, value) 给date增加或减少时间，这个函数不改变原有Date对象的值，而是返回一个新的Date对象。  
                    // @param   {Date}    date      原日期对象。  
                    // @param   {String}  interval  value的单位，可以选Ext.Date.DAY、Ext.Date.HOUR、Ext.Date.MINUTE、Ext.Date.MONTH、  
                    // Ext.Date.SECOND、Ext.Date.YEAR、Ext.Date.MILLI。  
                    // @param   {number}  value     日期对象需要增加的值。  
                    // @return  {Date}              返回增加值后的Date对象。  
                    date = Ext.Date.add(now, Ext.Date.YEAR, -age);
                } else {
                    date = new Date(now.getFullYear() - age, date.getMonth(), date.getDate());
                    if (this.getAge(date) !== age) {
                        date = Ext.Date.add(date, Ext.Date.YEAR, -1);
                    }
                }
                this.set("birthDate", date);
            }
        }
    },
    getAge: function (date) {
        var now = new Date(), age;
        if (date) {
            age = now.getFullYear() - date.getFullYear();
            if ((now.getMonth() < date.getMonth()) || (now.getMonth() == date.getMonth() && now.getDate() < date.getDate())) {
                --age;
            }
        }
        return age || 0;
    }
});

Ext.onReady(function () {
    simpleBind();
    palette();
});

// 简单样例
function simpleBind() {
    databind = Ext.create("Ext.window.Window", {
        viewModel: {
            type: "binding-two-way-formulas",
            data: {
                title: "我是标题",
                x: 1,
                birthDate: new Date(1992, 0, 17)
            }
        },
        height: 600,
        width: 300,
        bodyPadding: 15,
        bind: {
            title: "{title}"
        },
        items: [{
            xtype: "container",
            flex: 1,
            layout: {
                type: "vbox",
                align: "stretch"
            },
            defaults: {
                labelWidth: 70,
                margin: "5 5"
            },
            items: [{
                xtype: "textfield",
                fieldLabel: "标题内容",
                bind: "{title}"
            }, {
                xtype: "button",
                text: "改变标题",
                handler: function () {
                    databind.getViewModel().set("title", "标题被改变" + count + "次");
                    count++;
                }
            }, {
                xtype: "numberfield",
                fieldLabel: "X的值",
                bind: "{x}"
            }, {
                xtype: "displayfield",
                fieldLabel: "X计算公式",
                bind: "{x} * 2 = {twice} / {x} * 4 = {quad}"
            }, {
                xtype: "checkbox",
                boxLabel: "是否隐藏",
                // reference配置项会将组件自身注册到它所属的视图
                reference: "isAdmin"
            }, {
                xtype: "displayfield",
                value: "隐藏或者显示",
                bind: {
                    disabled: "{!isAdmin.checked}"
                }
            }, {
                xtype: "combobox",
                displayField: "country",
                valueField: "country",
                /**
                * 使用方式
                * reference: "country",
                * publishes: "value"
                *
                * 其他地方调用:country.value
                */
                reference: "country",
                publishes: "value",
                fieldLabel: "国家",
                store: {
                    type: "countries"
                }
            }, {
                xtype: "combobox",
                displayField: "states",
                valueField: "states",
                fieldLabel: "城市",
                bind: {
                    visible: "{country.value}",
                    filters: {
                        property: "country",
                        value: "{country.value}"
                    }
                },
                store: {
                    type: "states"
                }
            }, {
                xtype: "numberfield",
                fieldLabel: "年龄",
                bind: "{age}",
                minValue: 0
            }, {
                xtype: "datefield",
                format: "m/d/Y",
                fieldLabel: "生日",
                bind: "{birthDate}",
                format: "Y-m-d",
                maxValue: new Date()
            }]
        }]
    }).show();
}

// 调色板
function palette() {
    Ext.create("Ext.window.Window", {
        viewModel: {
            data: {
                red: 255,
                green: 100,
                blue: 150
            }
        },
        height: 300,
        width: 400,
        bodyPadding: 15,
        title: "调色板",
        layout: "anchor",
        defaultType: "fieldcontainer",
        defaults: {
            anchor: "0",
            labelWidth: 60,
            layout: {
                type: "hbox",
                align: "center"
            }
        },
        items: [{
            fieldLabel: "Red",
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [
                { xtype: "numberfield", width: 100, bind: "{red}", margin: "0 10 0 0" },
                { xtype: "sliderwidget", flex: 1, bind: "{red}", publishOnComplete: false }
            ]
        }, {
            fieldLabel: "Green",
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [
                { xtype: "numberfield", width: 100, bind: "{green}", margin: "0 10 0 0" },
                { xtype: "sliderwidget", flex: 1, bind: "{green}", publishOnComplete: false }
            ]
        }, {
            fieldLabel: "Blue",
            defaults: {
                maxValue: 255,
                minValue: 0
            },
            items: [
                { xtype: "numberfield", width: 100, bind: "{blue}", margin: "0 10 0 0" },
                { xtype: "sliderwidget", flex: 1, bind: "{blue}", publishOnComplete: false }
            ]
        }, {
            xtype: "component",
            height: 100,
            bind: {
                style: {
                    backgroundColor: "#{red:hex(2)}{green:hex(2)}{blue:hex(2)}"
                }
            }
        }]
    }).show();
}