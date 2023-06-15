using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api
{
    public class Link
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string Source { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string Target { get; set; }
        [BsonRepresentation(BsonType.String)]
        public int Value { get; set; }
    }
}
