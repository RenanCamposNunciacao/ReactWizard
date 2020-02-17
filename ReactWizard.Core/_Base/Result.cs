using System;
using System.Collections.Generic;
using System.Text;

namespace ReactWizard.Core._Base
{
    public class Result
    {
        public object Object { get; set; }
        public ResultStatus ResultStatus { get; set; }
        public string Message { get; set; }
    }

    public enum ResultStatus
    {
        Ok = 1,
        Error = 2
    }
}
