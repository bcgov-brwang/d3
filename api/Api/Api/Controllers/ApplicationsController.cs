﻿using Microsoft.AspNetCore.Http;
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
            if (_nodesCollection.Find(n => n.Name == databaseNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(databaseNode);
            }

            //frontend framework node
            Node frontendFrameworkNode = new Node
            {
                Name = application.FrontendFramework,
                Group = "Frontend Framework"
            };
            if (_nodesCollection.Find(n => n.Name == frontendFrameworkNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(frontendFrameworkNode);
            }

            //frontend language node
            Node frontendLanguageNode = new Node
            {
                Name = application.FrontendLanguage,
                Group = "Frontend Language"
            };
            if (_nodesCollection.Find(n => n.Name == frontendLanguageNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(frontendLanguageNode);
            }

            //backend framework node
            Node backendFrameworkNode = new Node
            {
                Name = application.BackendFramework,
                Group = "Backend Framework"
            };
            if (_nodesCollection.Find(n => n.Name == backendFrameworkNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(backendFrameworkNode);
            }

            //backend language node
            Node backendLanguageNode = new Node
            {
                Name = application.BackendLanguage,
                Group = "Backend Language"
            };
            if (_nodesCollection.Find(n => n.Name == backendLanguageNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(backendLanguageNode);
            }

            //host type node
            Node hostTypeNode = new Node
            {
                Name = application.HostType,
                Group = "Host Type"
            };
            if (_nodesCollection.Find(n => n.Name == hostTypeNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(hostTypeNode);
            }

            //cicd type node
            Node cicdTypeNode = new Node
            {
                Name = application.CicdType,
                Group = "CICD Type"
            };
            if (_nodesCollection.Find(n => n.Name == cicdTypeNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(cicdTypeNode);
            }

            //external apis node
            Node externalApisNode = new Node
            {
                Name = application.ExternalApis,
                Group = "External APIs"
            };
            if (_nodesCollection.Find(n => n.Name == externalApisNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(externalApisNode);
            }

            //exposed apis node
            Node exposedApisNode = new Node
            {
                Name = application.ExposedApis,
                Group = "Exposed APIs"
            };
            if (_nodesCollection.Find(n => n.Name == exposedApisNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(exposedApisNode);
            }

            //stakeholders node
            Node stakeholdersNode = new Node
            {
                Name = application.StakeHolders,
                Group = "Stakeholders"
            };
            if (_nodesCollection.Find(n => n.Name == stakeholdersNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(stakeholdersNode);
            }

            //tech contacts node
            Node techContactsNode = new Node
            {
                Name = application.TechContacts,
                Group = "Tech Contacts"
            };
            if (_nodesCollection.Find(n => n.Name == techContactsNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(techContactsNode);
            }

            //release date node
            Node releaseDateNode = new Node
            {
                Name = application.ReleaseDate,
                Group = "Release Date"
            };
            if (_nodesCollection.Find(n => n.Name == releaseDateNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(releaseDateNode);
            }

            //host servers node
            Node hostServersNode = new Node
            {
                Name = application.HostServers,
                Group = "Host Servers"
            };
            if (_nodesCollection.Find(n => n.Name == hostServersNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(hostServersNode);
            }

            //database servers node
            Node databaseServersNode = new Node
            {
                Name = application.DatabaseServers,
                Group = "Database Servers"
            };
            if (_nodesCollection.Find(n => n.Name == databaseServersNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(databaseServersNode);
            }

            //current version node
            Node currentVersionNode = new Node
            {
                Name = application.CurrentVersion,
                Group = "Current Version"
            };
            if (_nodesCollection.Find(n => n.Name == currentVersionNode.Name).ToList().Count == 0)
            {
                _nodesCollection.InsertOne(currentVersionNode);
            }

            //database link
            Link applicationToDatabaseLink = new Link
            {
                Source = application.Name,
                Target = application.Database,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToDatabaseLink);

            //frontend framework link
            Link applicationToFrontendFrameworkLink = new Link
            {
                Source = application.Name,
                Target = application.FrontendFramework,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToFrontendFrameworkLink);

            //frontend language link
            Link applicationToFrontendLanguageLink = new Link
            {
                Source = application.Name,
                Target = application.FrontendLanguage,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToFrontendLanguageLink);



            //backend framework link
            Link applicationToBackendFrameworkLink = new Link
            {
                Source = application.Name,
                Target = application.BackendFramework,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToBackendFrameworkLink);

            //backend language link
            Link applicationToBackendLanguageLink = new Link
            {
                Source = application.Name,
                Target = application.BackendLanguage,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToBackendLanguageLink);

            //host type link
            Link applicationToHostTypeLink = new Link
            {
                Source = application.Name,
                Target = application.HostType,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToHostTypeLink);

            //cicd type link
            Link applicationToCicdTypeLink = new Link
            {
                Source = application.Name,
                Target = application.CicdType,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToCicdTypeLink);

            //external apis link
            Link applicationToExternalApisLink = new Link
            {
                Source = application.Name,
                Target = application.ExternalApis,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToExternalApisLink);

            //exposed apis link
            Link applicationToExposedApisLink = new Link
            {
                Source = application.Name,
                Target = application.ExposedApis,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToExposedApisLink);

            //stakeholders link
            Link applicationToStakeholdersLink = new Link
            {
                Source = application.Name,
                Target = application.StakeHolders,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToStakeholdersLink);

            //tech contacts link
            Link applicationToTechContactsLink = new Link
            {
                Source = application.Name,
                Target = application.TechContacts,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToTechContactsLink);

            //release date link
            Link applicationToReleaseDateLink = new Link
            {
                Source = application.Name,
                Target = application.ReleaseDate,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToReleaseDateLink);

            //host servers link
            Link applicationToHostServersLink = new Link
            {
                Source = application.Name,
                Target = application.HostServers,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToHostServersLink);

            //database servers link
            Link applicationToDatabaseServersLink = new Link
            {
                Source = application.Name,
                Target = application.DatabaseServers,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToDatabaseServersLink);

            //current version link
            Link applicationToCurrentVersionLink = new Link
            {
                Source = application.Name,
                Target = application.CurrentVersion,
                Value = 1
            };
            _linksCollection.InsertOne(applicationToCurrentVersionLink);



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
            //delete application
            var result = _applicationsCollection.DeleteOne(b => b.Name == name);


            var relatedLinks = _linksCollection.Find(l => l.Source == name).ToList();
            foreach (var link in relatedLinks)
            {
                var otherApplicationLink = _linksCollection.Find(l => l.Source != name && l.Target == link.Target).FirstOrDefault();
                if (otherApplicationLink == null)
                {
                    _nodesCollection.DeleteOne(n => n.Name == link.Target);
                }
            }

            //delete links
            _linksCollection.DeleteMany(l => l.Source == name || l.Target == name);

            //delete node
            _nodesCollection.DeleteOne(n => n.Name == name);

            

            

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }


    }
}
