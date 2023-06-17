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
        public string Database { get; set; }
        //[BsonRepresentation(BsonType.Array)]
        //[BsonElement("FrontendFramework")]

        public string FrontendFramework { get; set; }
        //[BsonElement("FrontendLanguage")]

        //[BsonRepresentation(BsonType.Array)]
        public string FrontendLanguage { get; set; }
        //[BsonElement("BackendFramework")]

        //[BsonRepresentation(BsonType.Array)]
        public string BackendFramework { get; set; }
        //[BsonElement("BackendLanguage")]

        //[BsonRepresentation(BsonType.Array)]
        public string BackendLanguage { get; set; }
        //[BsonElement("HostType")]

        //[BsonRepresentation(BsonType.Array)]
        public string HostType { get; set; }
        //[BsonElement("CicdType")]

        //[BsonRepresentation(BsonType.Array)]
        public string CicdType { get; set; }
        //[BsonElement("ExternalApis")]

        //[BsonRepresentation(BsonType.Array)]
        public string ExternalApis { get; set; }
        //[BsonElement("ExposedApis")]

        //[BsonRepresentation(BsonType.Array)]
        public string ExposedApis { get; set; }
        //[BsonElement("StakeHolders")]

        //[BsonRepresentation(BsonType.Array)]
        public string StakeHolders { get; set; }
        //[BsonElement("TechContacts")]

        //[BsonRepresentation(BsonType.Array)]
        public string TechContacts { get; set; }
        public string ReleaseDate { get; set; }
        //[BsonElement("HostServers")]

        //[BsonRepresentation(BsonType.Array)]
        public string HostServers { get; set; }
        //[BsonElement("DatabaseServers")]

        //[BsonRepresentation(BsonType.Array)]
        public string DatabaseServers { get; set; }
        public string CurrentVersion { get; set; }


    }
}
