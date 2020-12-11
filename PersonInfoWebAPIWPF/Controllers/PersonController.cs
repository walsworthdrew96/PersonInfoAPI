using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonInfoWebAPIWPF.Data;
using PersonInfoWebAPIWPF.Models;

namespace PersonInfoWebAPIWPF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Enable CORS for all Origins, Headers, and Methods
    //[EnableCors("*", "*", "*")]
    [EnableCors()]
    public class PersonController : ControllerBase
    {
        private readonly PersonAccess _repository;

        public PersonController(PersonAccess repository)
        {
            this._repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // GET api/persons
        [HttpGet]
        [EnableCors]
        public async Task<ActionResult<IEnumerable<Person>>> Get(string dbSelection)
        {
            return await _repository.GetAll(dbSelection);
        }

        // GET api/persons/5
        [HttpGet("{id}")]
        [EnableCors]
        public async Task<ActionResult<Person>> Get(int id, string dbSelection)
        {
            var response = await _repository.GetById(id, dbSelection);
            if (response == null) { return NotFound(); }
            return response;
        }

        // POST api/persons
        [HttpPost]
        [EnableCors]
        public async Task Post([FromBody] Person person, string dbSelection)
        {
            //Console.WriteLine($"person = {person}");
            await _repository.Insert(person, dbSelection);
        }

        // PUT api/persons/5
        [HttpPut("{id}")]
        [EnableCors]
        public async void Put(int id, [FromBody] Person person, string dbSelection)
        {
            Console.WriteLine($"id = {id}");
            Console.WriteLine($"person = {person}");
            await _repository.UpdateById(id, person, dbSelection);
        }

        // DELETE api/persons/5
        [HttpDelete("{id}")]
        [EnableCors]
        public async Task Delete(int id, string dbSelection)
        {
            await _repository.DeleteById(id, dbSelection);
        }
    }
}
