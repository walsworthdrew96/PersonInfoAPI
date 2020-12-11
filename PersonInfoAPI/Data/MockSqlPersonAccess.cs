using PersonInfoAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonInfoAPI.Data
{
    public class MockSqlPersonAccess : IPersonAccess
    {
        //private readonly string _connectionString;
        private List<Person> _persons;

        private int _nextPersonId;

        public MockSqlPersonAccess()
        {
            Setup();
        }

        public void Setup()
        {
            _persons = new List<Person>();
            _nextPersonId = 1;
        }

        public int GetNextPersonId()
        {
            return _nextPersonId++;
        }

        public IEnumerable<Person> GetAllPersons()
        {
            return _persons;
        }

        public Person GetPersonById(int Id)
        {
            int currentIndex = 0;
            foreach (Person p in _persons)
            {
                if (p.Id == Id)
                {
                    return _persons[currentIndex];
                }
                currentIndex += 1;
            }
            return null;
        }

        public void CreatePerson(Person person)
        {
            person.Id = GetNextPersonId();
            _persons.Add(person);
        }

        public void UpdatePerson(Person person)
        {
            int currentIndex = 0;
            foreach (Person p in _persons)
            {
                if (p.Id == person.Id)
                {
                    _persons[currentIndex] = person;
                    return;
                }
                currentIndex += 1;
            }
        }

        public void DeletePerson(Person person)
        {
            int currentIndex = 0;
            foreach (Person p in _persons)
            {
                if (p.Id == person.Id)
                {
                    _persons.RemoveAt(currentIndex);
                    return;
                }
                currentIndex += 1;
            }
        }
    }
}