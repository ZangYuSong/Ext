using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ext.app.server.form
{
    /// <summary>
    /// Form 的摘要说明
    /// </summary>
    public class Form : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request["action"];
            switch (action)
            {
                case "formUpload":
                    formUpload(context);
                    break;
            }
        }

        private void formUpload(HttpContext context)
        {
            string json = "{\"success\":\"true\",\"data\":\"";
            string filename = context.Request.Files["upload"].FileName;
            int start = filename.LastIndexOf("\\") + 1;
            int length = filename.LastIndexOf(".") - start;
            json += filename.Substring(start, length) + "    ";
            json += context.Request.Form["username"] + "    ";
            json += context.Request.Form["password"] + "    ";
            json += context.Request.Form["textarea"] + "    ";
            json += context.Request.Form["numberfield"] + "    ";
            json += context.Request.Form["checkbox"] + "    ";
            json += context.Request.Form["radio"] + "    ";
            json += context.Request.Form["date"] + "    ";
            json += context.Request.Form["time"] + "    ";
            json += context.Request.Form["combobox"] + "    ";
            json += context.Request.Form["datetime"] + "    ";
            context.Response.Write(json + "\"}");
            context.Response.End();
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