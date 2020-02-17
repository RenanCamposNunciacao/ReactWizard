using System;
using System.Collections.Generic;
using System.Text;

namespace ReactWizard.Core.Model
{
    public class UserModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Telephone { get; set; }
        public string Cellphone { get; set; }
        public string Email { get; set; }
        public virtual ICollection<UserAddressModel> Addresses { get; set; }
        public string BirthDateFormated()
        {
            return this.BirthDate?.ToString("dd/MM/yyyy");
        }
    }
}
