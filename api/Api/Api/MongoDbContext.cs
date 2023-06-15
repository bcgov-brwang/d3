using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class MongoDbContext : MongoClient
    {
        public IMongoDatabase Database { get; }

        public MongoDbContext(IConfiguration configuration) : base(configuration.GetConnectionString("MongoDB"))
        {
            Database = GetDatabase(configuration.GetConnectionString("DatabaseName"));
        }
    }
}
