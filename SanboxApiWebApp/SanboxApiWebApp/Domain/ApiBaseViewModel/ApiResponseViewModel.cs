using System.Text.Json.Serialization;

namespace SanboxApiWebApp.Domain.ApiBaseViewModel
{
    public class ApiResponseViewModel
    {
        [JsonPropertyName("Status_Id")]
        public short statusId { get; set; }

        [JsonPropertyName("Status_Value")]
        public string StatusValue { get; set; }
    }
}
