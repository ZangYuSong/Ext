using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LearnExtJS.Web
{
    public partial class grid : System.Web.UI.Page
    {
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
            int start = int.Parse(Request["start"]);
            int limit = int.Parse(Request["limit"]);
            string[] field = { "company", "price", "change", "pctChange", "lastChange" };
            string[,] data = { { "3m Co", "71.72", "0.02", "0.03", "2017/01/03 22:30:00" }, { "Alcoa Inc", "29.01", "0.42", "1.47", "2017/01/03 12:30:00" }, { "Altria Group Inc", "83.81", "0.28", "0.34", "2017/01/03 12:30:00" }, { "Alcoa Inc", "29.01", "0.42", "1.47", "2017/01/03 12:30:00" }, { "Altria Group Inc", "83.81", "0.28", "0.34", "2017/01/03 12:30:00" }, { "American Express Company", "52.55", "0.01", "0.02", "2017/01/03 12:30:00" }, { "American International Group,Inc.", "64.13", "0.31", "0.49", "2017/01/03 12:30:00" }, { "AT&T Inc.", "31.61", "-0.48", "-1.54", "2017/01/03 12:30:00" }, { "Boeing Co.", "75.43", "0.53", "0.71", "2017/01/03 12:30:00" }, { "Caterpillar Inc.", "67.27", "0.92", "1.39", "2017/01/03 12:30:00" }, { "Citigroup,Inc.", "49.37", "0.02", "0.04", "2017/01/03 12:30:00" }, { "E.I. du Pont de Nemours and Company", "40.48", "0.51", "1.28", "2017/01/03 12:30:00" }, { "Exxon Mobil Corp", "68.1", "-0.43", "-0.64", "2017/01/03 12:30:00" }, { "General Electric Company", "34.14", "-0.08", "-0.23", "2017/01/03 12:30:00" }, { "General Motors Corporation", "30.27", "1.09", "3.74", "2017/01/03 12:30:00" }, { "Hewlett-Packard Co.", "36.53", "-0.03", "-0.08", "2017/01/03 12:30:00" }, { "Honeywell Intl Inc", "38.77", "0.05", "0.13", "2017/01/03 12:30:00" }, { "Intel Corporation", "19.88", "0.31", "1.58", "2017/01/03 12:30:00" }, { "International Business Machines", "81.41", "0.44", "0.54", "2017/01/03 12:30:00" }, { "Johnson & Johnson", "64.72", "0.06", "0.09", "2017/01/03 12:30:00" }, { "JP Morgan & Chase & Co", "45.73", "0.07", "0.15", "2017/01/03 12:30:00" }, { "McDonald's Corporation", "36.76", "0.86", "2.40", "2017/01/03 12:30:00" }, { "Microsoft Corporation", "25.84", "0.14", "0.54", "2017/01/03 12:30:00" }, { "Pfizer Inc", "27.96", "0.4", "1.45", "2017/01/03 12:30:00" }, { "The Coca-Cola Company", "45.07", "0.26", "0.58", "2017/01/03 12:30:00" }, { "The Home Depot,Inc.", "34.64", "0.35", "1.02", "2017/01/03 12:30:00" }, { "The Procter & Gamble Company", "61.91", "0.01", "0.02", "2017/01/03 12:30:00" }, { "United Technologies Corporation", "63.26", "0.55", "0.88", "2017/01/03 12:30:00" }, { "Verizon Communications", "35.57", "0.39", "1.11", "2017/01/03 12:30:00" }, { "Wal-Mart Stores,Inc.", "45.45", "0.73", "1.63", "2017/01/03 12:30:00" }, { "Walt Disney Company (The) (Holding Company)", "29.89", "0.24", "0.81", "2017/01/03 12:30:00" } };
            string json = "{\"totalCount\":\"" + data.GetLength(0) + "\",\"Rows\":[";
            for (int i = start; i < (start + limit) && i < data.GetLength(0); i++)
            {
                json += "{\"id\":\"" + i + "\",";
                for (int j = 0; j < 5; j++)
                {
                    json += "\"" + field[j] + "\":\"" + data[i, j] + "\",";
                }
                json = json.Substring(0, json.Length - 1) + "},";
            }
            json = json.Substring(0, json.Length - 1) + "]}";
            Response.ContentType = "application/json;charset=utf-8";
            Response.Write(json);
            Response.End();
        }
    }
}