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
        private readonly IMongoCollection<ApplicationDetails> _applicationsCollection;

        public ApplicationsController(MongoDbContext dbContext)
        {
            
            _nodesCollection = dbContext.Database.GetCollection<Node>("Nodes");
            _linksCollection = dbContext.Database.GetCollection<Link>("Links");
            _applicationsCollection = dbContext.Database.GetCollection<ApplicationDetails>("Applications");
        }

        [HttpGet]
        [Route("TestChart")]
        public Application Get()
        {
            Application result = null;
            var nodes = _nodesCollection.Find(FilterDefinition<Node>.Empty).ToList();
            var links = _linksCollection.Find(FilterDefinition<Link>.Empty).ToList();

            result = new Application { Nodes = nodes, Links = links };

            return result;
            
        }

        [HttpGet]
        public ActionResult<IEnumerable<ApplicationDetails>> GetAllApplications()
        {
            var applications = _applicationsCollection.Find(_ => true).ToList();
            return Ok(applications);
        }

        [HttpGet("{name}")]
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
            _applicationsCollection.InsertOne(application);
            return CreatedAtAction(nameof(GetApplicationByName), new { name = application.Name }, application);
        }

        [HttpPut("{name}")]
        public IActionResult UpdateApplication(string name, ApplicationDetails updatedApplication)
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

            return Ok(application);
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
