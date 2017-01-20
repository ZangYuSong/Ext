using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LearnExtJS.Web
{
    public partial class tree : System.Web.UI.Page
    {
        private Dictionary<string, int> dic = new Dictionary<string, int>();
        private string[,] data = { { "1", "0", "资源管理" }, { "2", "0", "系统管理" }, { "3", "1", "人力资源" }, { "4", "1", "综合后勤" }, { "5", "3", "员工信息" }, { "6", "2", "系统配置" }, { "7", "2", "菜单配置" }, { "8", "7", "菜单选项" } };
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request["action"] == "loadData")
                {
                    loadData();
                }
            }
        }
        private void loadData()
        {
            string id = Request["id"];
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
            Response.ContentType = "application/json;charset=utf-8";
            Response.Write(json);
            Response.End();
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
    }
}