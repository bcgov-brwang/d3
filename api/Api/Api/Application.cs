using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api
{
    public class Application
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public List<Node> Nodes { get; set; }
        public List<Link> Links { get; set; }
    }
    
    public class ApplicationDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        //[BsonElement("Database")]
        //[BsonRepresentation(BsonType.Array)]
        public BsonValue Database { get; set; }
        //[BsonRepresentation(BsonType.Array)]
        //[BsonElement("FrontendFramework")]

        public BsonValue FrontendFramework { get; set; }
        //[BsonElement("FrontendLanguage")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue FrontendLanguage { get; set; }
        //[BsonElement("BackendFramework")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue BackendFramework { get; set; }
        //[BsonElement("BackendLanguage")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue BackendLanguage { get; set; }
        //[BsonElement("HostType")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue HostType { get; set; }
        //[BsonElement("CicdType")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue CicdType { get; set; }
        //[BsonElement("ExternalApis")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue ExternalApis { get; set; }
        //[BsonElement("ExposedApis")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue ExposedApis { get; set; }
        //[BsonElement("StakeHolders")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue StakeHolders { get; set; }
        //[BsonElement("TechContacts")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue TechContacts { get; set; }
        public BsonValue ReleaseDate { get; set; }
        //[BsonElement("HostServers")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue HostServers { get; set; }
        //[BsonElement("DatabaseServers")]

        //[BsonRepresentation(BsonType.Array)]
        public BsonValue DatabaseServers { get; set; }
        public string CurrentVersion { get; set; }


    }
}
