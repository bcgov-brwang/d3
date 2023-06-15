using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("data")]
        public Application GetApplicationData()
        {
            return new Application
            {
                Nodes = new List<Node> { 
                    new Node{ Id = "onRoutBc", Group = "Application"},
                    new Node{ Id = "HETS", Group = "Application"},
                    new Node{ Id = "CRT", Group = "Application"},
                    new Node{ Id = "HMCR", Group = "Application"},
                    new Node{ Id = "Schoolbus", Group = "Application"},
                    new Node{ Id = "Transaction", Group = "Application"},
                    new Node{ Id = "Postgres", Group = "Database"},
                    new Node{ Id = "MSSQL", Group = "Database"},
                    new Node{ Id = "React", Group = "Frontend Framework"},
                    new Node{ Id = "Nest.js", Group = "Backend Framework"},
                    new Node{ Id = "ASP.NET Core", Group = "Backend Framework"},
                    new Node{ Id = "CMS", Group = "API"},
                    new Node{ Id = "CDOGS", Group = "API"},
                    new Node{ Id = "CHES", Group = "API"},
                    new Node{ Id = "twm", Group = "API"},
                    new Node{ Id = "OpenShift", Group = "Host"},
                    new Node{ Id = "GitHub Action", Group = "CICD"}
                
                },
                Links = new List<Link> { 
                    new Link{ Source = "onRoutBc", Target  = "Postgres", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "React", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "Nest.js", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "CMS", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "CDOGS", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "CHES", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "onRoutBc", Target  = "GitHub Action", Value = 1},

                    new Link{ Source = "HETS", Target  = "Postgres", Value = 1},
                    new Link{ Source = "HETS", Target  = "React", Value = 1},
                    new Link{ Source = "HETS", Target  = "ASP.NET Core", Value = 1},
                    new Link{ Source = "HETS", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "HETS", Target  = "GitHub Action", Value = 1},

                    new Link{ Source = "CRT", Target  = "MSSQL", Value = 1},
                    new Link{ Source = "CRT", Target  = "React", Value = 1},
                    new Link{ Source = "CRT", Target  = "ASP.NET Core", Value = 1},
                    new Link{ Source = "CRT", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "CRT", Target  = "GitHub Action", Value = 1},

                    new Link{ Source = "HMCR", Target  = "MSSQL", Value = 1},
                    new Link{ Source = "HMCR", Target  = "React", Value = 1},
                    new Link{ Source = "HMCR", Target  = "ASP.NET Core", Value = 1},
                    new Link{ Source = "HMCR", Target  = "twm", Value = 1},
                    new Link{ Source = "HMCR", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "HMCR", Target  = "GitHub Action", Value = 1},

                    new Link{ Source = "Schoolbus", Target  = "Postgres", Value = 1},
                    new Link{ Source = "Schoolbus", Target  = "React", Value = 1},
                    new Link{ Source = "Schoolbus", Target  = "ASP.NET Core", Value = 1},
                    new Link{ Source = "Schoolbus", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "Schoolbus", Target  = "GitHub Action", Value = 1},

                    new Link{ Source = "Transaction", Target  = "MSSQL", Value = 1},
                    new Link{ Source = "Transaction", Target  = "React", Value = 1},
                    new Link{ Source = "Transaction", Target  = "ASP.NET Core", Value = 1},
                    new Link{ Source = "Transaction", Target  = "OpenShift", Value = 1},
                    new Link{ Source = "Transaction", Target  = "GitHub Action", Value = 1},





                }
            };
        }
    }
}
