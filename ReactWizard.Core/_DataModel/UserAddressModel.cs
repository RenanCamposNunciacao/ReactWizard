using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReactWizard.Core.Model
{
    public class UserAddressModel
    {
        public long? Id { get; set; }

        [ForeignKey("UserId")]
        public virtual UserModel User { get; set; }
        public long? UserId { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
