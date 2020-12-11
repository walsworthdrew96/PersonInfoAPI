using Microsoft.Extensions.Configuration;
using PersonInfoAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonInfoAPI.Data
{
    public interface IPersonAccess
    {
        IEnumerable<Person> GetAllPersons();

        Person GetPersonById(int Id);

        void CreatePerson(Person person);

        void UpdatePerson(Person person);

        void DeletePerson(Person person);
    }
}