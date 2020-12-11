using Microsoft.AspNetCore.Mvc;
using PersonInfoAPI.Data;
using PersonInfoAPI.Dtos;
using PersonInfoAPI.Mappings;
using PersonInfoAPI.Models;
using PersonInfoWebAPIWPF.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace PersonInfoAPI.Moq
{
    public class PersonsControllerTests : IDisposable
    {
        private MockSqlPersonAccess mockRepo;
        private PersonMappings mappings;

        public PersonsControllerTests()
        {
            mockRepo = new MockSqlPersonAccess();
            mappings = new PersonMappings();
        }

        public void Dispose()
        {
            mockRepo = null;
            mappings = null;
        }

        [Fact]
        public void GetAllPersons_ReturnsZeroResources_WhenDBIsEmpty()
        {
            //Arrange
            mockRepo.Setup();
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetAllPersons("");
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void GetPersonItems_Returns200OK_WhenDBIsEmpty()
        {
            //Arrange
            mockRepo.Setup();
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetAllPersons("");
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void GetAllPersons_ReturnsOneItem_WhenDBHasOneResource()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetAllPersons("");
            //Assert
            var okResult = result.Result as OkObjectResult;
            var persons = okResult.Value as List<PersonReadDto>;
            Assert.Single(persons);
        }

        [Fact]
        public void GetAllPersons_Returns200OK_WhenDBHasOneResource()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetAllPersons("");
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void GetAllPersons_ReturnsCorrectType_WhenDBHasOneResource()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetAllPersons("");
            //Assert
            Assert.IsType<ActionResult<IEnumerable<PersonReadDto>>>(result);
        }

        [Fact]
        public void GetPersonByID_Returns404NotFound_WhenNonExistentIDProvided()
        {
            //Arrange
            mockRepo.Setup();
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetPersonById(1, "");
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void GetPersonByID_Returns200OK__WhenValidIDProvided()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetPersonById(1, "");
            //Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void GetPersonByID_ReturnsCorrectResouceType_WhenValidIDProvided()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.GetPersonById(1, "");
            //Assert
            Assert.IsType<ActionResult<PersonReadDto>>(result);
        }

        [Fact]
        public void CreatePerson_ReturnsCorrectResourceType_WhenValidObjectSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.CreatePerson(new PersonCreateDto { }, "");
            //Assert
            Assert.IsType<ActionResult<PersonReadDto>>(result);
        }

        [Fact]
        public void CreatePerson_Returns201Created_WhenValidObjectSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.CreatePerson(new PersonCreateDto { }, "");
            //Assert
            Assert.IsType<CreatedAtRouteResult>(result.Result);
        }

        [Fact]
        public void UpdatePerson_Returns204NoContent_WhenValidObjectSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.UpdatePerson(1, new PersonUpdateDto { }, "");
            //Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdatePerson_Returns404NotFound_WhenNonExistentResourceIDSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.UpdatePerson(0, new PersonUpdateDto { }, "");
            //Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void DeletePerson_Returns204NoContent_WhenValidResourceIDSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            mockRepo.CreatePerson(new Person() { Id = -1, FirstName = "asdf", LastName = "asdf" });
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.DeletePerson(1, "");
            //Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void DeletePerson_Returns_404NotFound_WhenNonExistentResourceIDSubmitted()
        {
            //Arrange
            mockRepo.Setup();
            var controller = new PersonController(mockRepo);
            //Act
            var result = controller.DeletePerson(0, "");
            //Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}