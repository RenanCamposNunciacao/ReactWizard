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
    public class UserAddressController : Controller
    {
        [HttpGet("[action]")]
        public List<UserAddressModel> List(int startIndex, int userId)
        {   
            UserAddress lUserAddress = new UserAddress();
            return lUserAddress.GetByUser(startIndex, userId).ToList();
        }

        [HttpPost("[action]")]
        public Result Save([FromBody]UserAddressModel pUserAddressModel)
        {   
            UserAddress lUserAddress = new UserAddress();
            return new Result { Object = lUserAddress.Save(pUserAddressModel) , ResultStatus = ResultStatus.Ok};
        }

        [HttpPost("[action]")]
        public Result Delete([FromBody]UserAddressModel pUserAddressModel)
        {   
            UserAddress lUserAddress = new UserAddress();
            lUserAddress.Delete(pUserAddressModel);
            return new Result { Object = new UserAddressModel() { Id = -1 }, ResultStatus = ResultStatus.Ok };
        }
    }
}