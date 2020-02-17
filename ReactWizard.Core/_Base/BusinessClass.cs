using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactWizard.Core._Base
{
    public class BusinessClass<T> where T : class
    {
        protected BaseContext gBaseContext;
        public BusinessClass(BaseContext pBaseContext = null)
        {
            gBaseContext = pBaseContext ?? new BaseContext();
        }

        public T Save(T pModel)
        {
            this.gBaseContext.Add<T>(pModel);
            this.gBaseContext.SaveChanges();
            return pModel;
        }

        public T Update(T pModel)
        {
            this.gBaseContext.Update<T>(pModel);
            this.gBaseContext.SaveChanges();
            return pModel;
        }

        public void Delete(T pModel)
        {
            this.gBaseContext.Remove<T>(pModel);
            this.gBaseContext.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return this.gBaseContext.Set<T>();
        }

        public IEnumerable<T> Get(int pSkip, int pTotal)
        {
            return this.gBaseContext.Set<T>().Skip(pSkip).Take(pTotal);
        }
    }
}
