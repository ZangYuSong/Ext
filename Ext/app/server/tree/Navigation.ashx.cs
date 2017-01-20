using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ext.app.server.tree
{
    /// <summary>
    /// Navigation 的摘要说明
    /// </summary>
    public class Navigation : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request["action"];
            switch (action)
            {
                case "loadData":
                    loadData(context);
                    break;
                case "loadDataTree":
                    loadDataTree(context);
                    break;
            }
        }

        private void loadData(HttpContext context)
        {
            string[,] data = { { "0", "网格(grid)", "Demo.view.grid.Grid" }, { "1", "表单(form)", "Demo.view.form.Form" }, { "2", "树(tree)", "Demo.view.tree.Tree" } };
            string json = "{\"nodes\":[";
            for (int i = 0; i < data.GetLength(0); i++)
            {
                json += "{\"text\":\"" + data[i, 1] + "\",\"id\":\"" + data[i, 0] + "\",\"class\":\"" + data[i, 2] + "\",\"leaf\":\"true\"},";
            }
            json = json.Substring(0, json.Length - 1) + "]}";
            context.Response.ContentType = "application/json;charset=utf-8";
            context.Response.Write(json);
            context.Response.End();
        }

        private Dictionary<string, int> dic = new Dictionary<string, int>();
        private string[,] data = { { "1", "0", "资源管理" }, { "2", "0", "系统管理" }, { "3", "1", "人力资源" }, { "4", "1", "综合后勤" }, { "5", "3", "员工信息" }, { "6", "2", "系统配置" }, { "7", "2", "菜单配置" }, { "8", "7", "菜单选项" } };

        private void loadDataTree(HttpContext context)
        {
            string id = context.Request["id"];
            string json = "{\"nodes\":[";
            for (int i = 0; i < data.GetLength(0); i++)
            {
                if (dic.ContainsKey(data[i, 0]))
                {
                    dic[data[i, 1]] += 1;
                }
                else
                {
                    dic[data[i, 1]] = 1;
                }
            }
            for (int i = 0; i < data.GetLength(0); i++)
            {
                if (data[i, 1] == id)
                {
                    json += "{\"text\":\"" + data[i, 2] + "\",\"id\":\"" + data[i, 0] + "\",\"checked\":false";
                    if (!dic.ContainsKey(data[i, 0]))
                    {
                        json += ",\"leaf\":\"true\"}";
                    }
                    else
                    {
                        json += "}";
                    }
                    json += ",";
                }
            }
            json = json.Substring(0, json.Length - 1) + "]}";
            context.Response.ContentType = "application/json;charset=utf-8";
            context.Response.Write(json);
            context.Response.End();
        }

        private string GetJson(int i)
        {
            string json = "";
            string children = "";
            json = "{\"text\":\"" + data[i, 2] + "\",\"id\":\"" + data[i, 0] + "\",\"checked\":false";
            for (int j = 0; j < data.GetLength(0); j++)
            {
                if (data[j, 1] == data[i, 0])
                {
                    children += GetJson(j) + ",";
                }
            }
            if (children != "")
            {
                json += ",\"children\":[" + children + "]}";
            }
            else
            {
                json += ",\"leaf\":\"true\"}";
            }
            return json;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}