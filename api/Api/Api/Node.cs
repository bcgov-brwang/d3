using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Api
{
    [BsonIgnoreExtraElements]
    public class Node
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string Name { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string Group { get; set; }
    }
}
