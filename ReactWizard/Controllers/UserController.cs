using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactWizard.Core._Base;
using ReactWizard.Core.BusinessInteligence;
using ReactWizard.Core.Model;

namespace ReactWizard.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [HttpGet("[action]")]
        public List<UserModel> List(int startIndex)
        {   
            User lUser = new User();
            return lUser.Get(startIndex, 5).ToList();
        }

        [HttpPost("[action]")]
        public Result Save([FromBody]UserModel userModel)
        {   
            User lUser = new User();
            return new Result { Object = lUser.Save(userModel) , ResultStatus = ResultStatus.Ok};
        }

        [HttpPost("[action]")]
        public Result Delete([FromBody]UserModel userModel)
        {   
            User lUser = new User();
            lUser.Delete(userModel);
            return new Result { Object = new UserModel() { Id = -1 }, ResultStatus = ResultStatus.Ok };
        }
    }
}