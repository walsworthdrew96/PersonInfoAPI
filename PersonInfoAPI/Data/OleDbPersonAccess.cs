using Microsoft.Extensions.Configuration;
using PersonInfoAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PersonInfoAPI.Data
{
    public class OleDbPersonAccess : IPersonAccess
    {
        private readonly string _connectionString;
        private readonly OleDbConnection _connection;

        private IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

        public OleDbPersonAccess()
        {
            var configuration = GetConfiguration();
            var conStrings = configuration.GetSection("ConnectionStrings");
            _connectionString = conStrings.GetSection("msAccessConnection").Value;
            _connection = new OleDbConnection(_connectionString);
        }

        private Person MapToPerson(OleDbDataReader reader)
        {
            return new Person()
            {
                Id = (int)reader["Id"],
                FirstName = reader["FirstName"].ToString(),
                LastName = reader["LastName"].ToString()
            };
        }

        public IEnumerable<Person> GetAllPersons()
        {
            try
            {
                _connection.Open();
                OleDbCommand command = new OleDbCommand($"SELECT * FROM Person;", _connection);
                OleDbDataReader reader = command.ExecuteReader();
                List<Person> people = new List<Person>();
                while (reader.Read())
                {
                    people.Add(MapToPerson(reader));
                }
                _connection.Close();
                return people;
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return new List<Person> { new Person() };
            }
            finally
            {
                _connection.Close();
            }
        }

        public Person GetPersonById(int Id)
        {
            try
            {
                _connection.ConnectionString = _connectionString;
                _connection.Open();
                OleDbCommand command = new OleDbCommand($"SELECT * FROM Person WHERE Id={Id};", _connection);
                OleDbDataReader reader = command.ExecuteReader();
                Person person = new Person();
                while (reader.Read())
                {
                    person = MapToPerson(reader);
                }
                _connection.Close();
                return person;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new Person();
            }
            finally
            {
                _connection.Close();
            }
        }

        public void CreatePerson(Person person)
        {
            try
            {
                _connection.ConnectionString = _connectionString;
                _connection.Open();
                OleDbCommand command = new OleDbCommand($"INSERT INTO Person (FirstName, LastName) VALUES ('{person.FirstName}', '{person.LastName}');", _connection);
                command.ExecuteNonQuery();
                _connection.Close();
                return;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        public void UpdatePerson(Person person)
        {
            try
            {
                _connection.ConnectionString = _connectionString;
                _connection.Open();
                OleDbCommand command = new OleDbCommand($"UPDATE Person SET FirstName='{person.FirstName}', LastName='{person.LastName}' WHERE Id={person.Id};", _connection);
                command.ExecuteNonQuery();
                _connection.Close();
                return;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                _connection.Close();
            }
        }

        public void DeletePerson(Person person)
        {
            try
            {
                _connection.ConnectionString = _connectionString;
                _connection.Open();
                OleDbCommand command = new OleDbCommand($"DELETE FROM Person WHERE Id={person.Id};", _connection);
                command.ExecuteNonQuery();
                _connection.Close();
                return;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}