using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using PersonInfoAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PersonInfoAPI.Data
{
    public class SqlPersonAccess : IPersonAccess
    {
        private readonly string _connectionString;
        private readonly SqlConnection _connection;

        private IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

        public SqlPersonAccess()
        {
            var configuration = GetConfiguration();
            var builder = new SqlConnectionStringBuilder(configuration.GetConnectionString("azureSqlConnection"));
            //builder.Password = configuration["Password"];
            _connectionString = builder.ConnectionString;
            _connection = new SqlConnection(_connectionString);
        }

        private Person MapToPerson(SqlDataReader reader)
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
                using SqlCommand cmd = new SqlCommand("GetAllPerson", _connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                var response = new List<Person>();
                _connection.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        response.Add(MapToPerson(reader));
                    }
                }
                _connection.Close();
                return response;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new List<Person>();
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
                using SqlCommand cmd = new SqlCommand("GetPersonById", _connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Id", Id));
                Person response = null;
                _connection.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        response = MapToPerson(reader);
                    }
                }
                _connection.Close();
                return response;
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
                using SqlCommand cmd = new SqlCommand("InsertPerson", _connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@FirstName", person.FirstName));
                cmd.Parameters.Add(new SqlParameter("@LastName", person.LastName));
                _connection.Open();
                cmd.ExecuteNonQuery();
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
                using SqlCommand cmd = new SqlCommand("UpdatePersonById", _connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.Add(new SqlParameter("@Id", person.Id));
                cmd.Parameters.Add(new SqlParameter("@FirstName", person.FirstName));
                cmd.Parameters.Add(new SqlParameter("@LastName", person.LastName));
                _connection.Open();
                cmd.ExecuteNonQuery();
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
                SqlCommand deleteCmd = new SqlCommand("DeletePersonById", _connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                deleteCmd.Parameters.Add(new SqlParameter("@Id", person.Id));
                _connection.Open();
                deleteCmd.ExecuteNonQuery();
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