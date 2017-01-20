using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LearnExtJS.Web
{
    public partial class form : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request["action"] == "formUpload")
                {
                    formUpload();
                }
            }
        }

        public void formUpload()
        {
            string json = "{\"success\":\"true\",\"data\":\"";
            string filename = Request.Files["upload"].FileName;
            int start = filename.LastIndexOf("\\") + 1;
            int length = filename.LastIndexOf(".") - start;
            json += filename.Substring(start, length) + "    ";
            json += Request.Form["username"] + "    ";
            json += Request.Form["password"] + "    ";
            json += Request.Form["textarea"] + "    ";
            json += Request.Form["numberfield"] + "    ";
            json += Request.Form["checkbox"] + "    ";
            json += Request.Form["radio"] + "    ";
            json += Request.Form["date"] + "    ";
            json += Request.Form["time"] + "    ";
            json += Request.Form["combobox"] + "    ";
            Response.Write(json + "\"}");
            Response.End();
        }
    }
}