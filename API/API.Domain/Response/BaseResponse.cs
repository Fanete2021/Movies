using API.Domain.Enum;

namespace API.Domain.Response
{
    public class BaseResponse<T>
    {
        public string DescriptionError { get; set; }

        public StatusCode StatusCode { get; set; }

        public T Data { get; set; }

        public int TotalCount { get; set; }
    }
}
