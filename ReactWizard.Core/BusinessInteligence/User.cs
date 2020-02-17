using ReactWizard.Core._Base;
using ReactWizard.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace ReactWizard.Core.BusinessInteligence
{
    public class User : BusinessClass<UserModel>
    {
        public User(BaseContext pBaseContext = null) : base(pBaseContext) { }

        public new UserModel Save(UserModel pUserModel)
        {
            if (pUserModel.Id > 0)
                return base.Update(pUserModel);
            else
                return base.Save(pUserModel);
        }
    }
}
