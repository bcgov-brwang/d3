using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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
        private readonly IMongoCollection<ApplicationDetails> _applicationsCollection;
        private readonly MongoDbContext _mongoDbContext;

        public ApplicationsController(MongoDbContext dbContext)
        {
            _mongoDbContext = dbContext;
            
            _nodesCollection = dbContext.Database.GetCollection<Node>("Nodes");
            _linksCollection = dbContext.Database.GetCollection<Link>("Links");
            _applicationsCollection = dbContext.Database.GetCollection<ApplicationDetails>("Applications");
        }

        [HttpGet("Chart")]
        //[Route("Chart")]
        public Application Get(string name)
        {
            Application result = null;
            var nodes = _nodesCollection.Find(FilterDefinition<Node>.Empty).ToList();
            var links = _linksCollection.Find(FilterDefinition<Link>.Empty).ToList();

            foreach (var node in nodes)
            {
                node.Id = node.Name;
            }

            

            if (name != null)
            {
                var fillteredLinks = links.Where(x => x.Source == name).ToList();
                var targetNames = links.Where(x => x.Source == name).Select(x => x.Target).ToList();
                var fillteredNodes = nodes.Where(x => targetNames.Contains(x.Name) || x.Name == name).ToList();
                result = new Application { Nodes = fillteredNodes, Links = fillteredLinks };

            }
            else
            {
                result = new Application { Nodes = nodes, Links = links };

            }

            return result;
            
        }

        [HttpGet]
        public ActionResult<IEnumerable<ApplicationDetails>> GetAllApplications()
        {
            var applications = _applicationsCollection.Find(_ => true).ToList();
            return Ok(applications);
        }

        //[HttpGet("{name}")]
        //[Route("details")]
        // GET api/applications/details?name=OnRouteBc
        [HttpGet("details")]
        public ActionResult<ApplicationDetails> GetApplicationByName(string name)
        {
            var application = _applicationsCollection.Find(b => b.Name == name).FirstOrDefault();
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpPost]
        public ActionResult<ApplicationDetails> CreateApplication(ApplicationDetails application)
        {
            //todo: create nodes and links here
            //application node
            //database node
            Node applicationNode = new Node
            {
                Name = application.Name,
                Group = "Application"
            };
            _nodesCollection.InsertOne(applicationNode);
            //database node
            Node databaseNode = new Node
            {
                Name = application.Database,
                Group = "Database"
            };
            _nodesCollection.InsertOne(databaseNode);
            Link applicationToDatabaseLink = new Link
            {
                Source = application.Name,
                Target = application.Database,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToDatabaseLink);

            _applicationsCollection.InsertOne(application);
            return CreatedAtAction(nameof(GetApplicationByName), new { name = application.Name }, application);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateApplicationAsync(string name, ApplicationDetails updatedApplication)
        {
            var application = _applicationsCollection.FindOneAndUpdate(
                Builders<ApplicationDetails>.Filter.Eq(b => b.Name, name),
                Builders<ApplicationDetails>.Update
                    .Set(b => b.FrontendFramework, updatedApplication.FrontendFramework)
                    .Set(b => b.FrontendLanguage, updatedApplication.FrontendLanguage)
                    .Set(b => b.BackendFramework, updatedApplication.BackendFramework),
                new FindOneAndUpdateOptions<ApplicationDetails>
                {
                    ReturnDocument = ReturnDocument.After
                });

            if (application == null)
            {
                return NotFound();
            }
            else
            {
                //compare what have been changed between application and updatedApplication
                if (application.Database != updatedApplication.Database)
                {
                    var linkfilter = Builders<Link>.Filter.Eq("Source", name);
                    var linkUpdate = Builders<Link>.Update.Set("Target", updatedApplication.Database);
                    _linksCollection.UpdateOne(linkfilter, linkUpdate);
                }
                
            }
            
            
            var filter = Builders<ApplicationDetails>.Filter.Eq("Name", name); // Replace with your document's unique identifier
            var update = Builders<ApplicationDetails>.Update.Set("Database", updatedApplication.Database); // Replace with the field name and new value
            var result = _applicationsCollection.UpdateOne(filter, update); // UpdateOne updates a single document matching the filter
            

            //todo: update links


            return Ok(result);
        }

        [HttpDelete("{name}")]
        public IActionResult DeleteApplication(string name)
        {
            var result = _applicationsCollection.DeleteOne(b => b.Name == name);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }


    }
}
