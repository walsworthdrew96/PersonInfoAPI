using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonInfoAPI.Data;
using PersonInfoAPI.Dtos;
using PersonInfoAPI.Mappings;
using PersonInfoAPI.Models;

namespace PersonInfoWebAPIWPF.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonAccess _repository;
        private PersonMappings _mappings;

        public PersonController(IPersonAccess repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mappings = new PersonMappings();
        }

        // GET api/persons
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<PersonReadDto>> GetAllPersons(string dbSelection)
        {
            var personItems = _repository.GetAllPersons();
            //convert List<Person> to List<PersonReadDto>
            List<PersonReadDto> personReadItems = new List<PersonReadDto>();
            foreach (Person personItem in personItems)
            {
                personReadItems.Add(_mappings.InternalToExternalRead(personItem));
            }
            return Ok(personReadItems);
        }

        // GET api/persons/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<PersonReadDto> GetPersonById(int id, string dbSelection)
        {
            var personItem = _repository.GetPersonById(id);
            if (personItem == null) { return NotFound(); }
            return Ok(_mappings.InternalToExternalRead(personItem));
        }

        // POST api/persons
        [HttpPost]
        [Authorize]
        public ActionResult<PersonReadDto> CreatePerson([FromBody] PersonCreateDto personCreateDto, string dbSelection)
        {
            var personModel = _mappings.ExternalCreateToInternal(-1, personCreateDto);
            _repository.CreatePerson(personModel);
            var personReadDto = _mappings.InternalToExternalRead(personModel);
            return CreatedAtRoute(nameof(GetPersonById), new { Id = personReadDto.Id }, personReadDto);
        }

        // PUT api/persons/5
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult UpdatePerson(int id, [FromBody] PersonUpdateDto personUpdateDto, string dbSelection)
        {
            var personModelFromRepo = _repository.GetPersonById(id);
            if (personModelFromRepo == null)
            {
                return NotFound();
            }
            personModelFromRepo = _mappings.ExternalUpdateToInternal(id, personUpdateDto);
            _repository.UpdatePerson(personModelFromRepo);
            return NoContent();
        }

        // DELETE api/persons/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeletePerson(int id, string dbSelection)
        {
            var personModelFromRepo = _repository.GetPersonById(id);
            if (personModelFromRepo == null)
            {
                return NotFound();
            }
            _repository.DeletePerson(personModelFromRepo);
            return NoContent();
        }
    }
}