using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Api
{

    public class StringArraySerializer : SerializerBase<List<string>>
    {
        public override List<string> Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            var bsonType = context.Reader.GetCurrentBsonType();
            if (bsonType != BsonType.Array)
            {
                throw new BsonSerializationException("Expected array type but found " + bsonType);
            }

            var list = new List<string>();

            context.Reader.ReadStartArray();
            while (context.Reader.ReadBsonType() != BsonType.EndOfDocument)
            {
                if (context.Reader.GetCurrentBsonType() == BsonType.String)
                {
                    var value = context.Reader.ReadString();
                    list.Add(value);
                }
            }
            context.Reader.ReadEndArray();

            return list;
        }

        public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, List<string> value)
        {
            var writer = context.Writer;
            writer.WriteStartArray();
            foreach (var item in value)
            {
                writer.WriteString(item);
            }
            writer.WriteEndArray();
        }
    }
}
