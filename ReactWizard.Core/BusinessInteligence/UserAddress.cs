using ReactWizard.Core._Base;
using ReactWizard.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ReactWizard.Core.BusinessInteligence
{
    public class UserAddress : BusinessClass<UserAddressModel>
    {
        public UserAddress(BaseContext pBaseContext = null) : base(pBaseContext) { }

        public UserAddressModel Save(UserAddressModel pUserAddressModel)
        {
            if (pUserAddressModel.Id > 0)
                return base.Update(pUserAddressModel);
            else
                return base.Save(pUserAddressModel);
        }

        public IEnumerable<UserAddressModel> GetByUser(int startIndex, int userId)
        {   
            return base.gBaseContext.UserAddress.Where(x => x.User.Id == userId).Skip(startIndex).Take(5); ;
        }
    }
}
