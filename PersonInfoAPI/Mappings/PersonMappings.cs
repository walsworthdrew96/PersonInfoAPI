using PersonInfoAPI.Dtos;
using PersonInfoAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonInfoAPI.Mappings
{
    public class PersonMappings
    {
        //Person is converted to PersonReadDto
        public PersonReadDto InternalToExternalRead(Person p)
        {
            return new PersonReadDto()
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName
            };
        }

        //PersonCreateDto is converted to Person
        public Person ExternalCreateToInternal(int createdPersonId, PersonCreateDto p)
        {
            return new Person()
            {
                Id = createdPersonId,
                FirstName = p.FirstName,
                LastName = p.LastName
            };
        }

        //PersonUpdateDto is converted to Person
        public Person ExternalUpdateToInternal(int createdPersonId, PersonUpdateDto p)
        {
            return new Person()
            {
                Id = createdPersonId,
                FirstName = p.FirstName,
                LastName = p.LastName
            };
        }

        //Person is converted to PersonUpdateDto
        public PersonUpdateDto InternalToExternalUpdate(Person p)
        {
            return new PersonUpdateDto()
            {
                FirstName = p.FirstName,
                LastName = p.LastName
            };
        }
    }
}