using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IMongoCollection<Node> _nodesCollection;
        private readonly IMongoCollection<Link> _linksCollection;

        public ApplicationsController(MongoDbContext dbContext)
        {
            _nodesCollection = dbContext.Database.GetCollection<Node>("Nodes");
            _linksCollection = dbContext.Database.GetCollection<Link>("Links");
        }

        [HttpGet]
        public Application Get()
        {
            Application result = null;
            var nodes = _nodesCollection.Find(FilterDefinition<Node>.Empty).ToList();
            var links = _linksCollection.Find(FilterDefinition<Link>.Empty).ToList();

            result = new Application { Nodes = nodes, Links = links };

            return result;
            
        }
    }
}
