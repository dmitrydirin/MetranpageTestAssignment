
using System.Text.Json.Serialization;
using System.Text.Json;
using worker.Models;

namespace worker.Services.ProjectManager
{
	public class HttpProjectManager : IProjectManager
	{
		private readonly HttpClient _httpClient;
		private readonly JsonSerializerOptions _jsonOptions;
		private readonly ILogger<HttpProjectManager> _logger;

		public HttpProjectManager(HttpClient httpClient, ILogger<HttpProjectManager> logger)
		{
			_httpClient = httpClient;

			_jsonOptions = new JsonSerializerOptions()
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
				DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
			};
			_logger = logger;
		}

		public async Task<IEnumerable<ProjectTemplate>> GetTemplates(CancellationToken cancellationToken)
		{
			var response = await _httpClient.GetFromJsonAsync<ProjectTemplateResponse>("templates", _jsonOptions, cancellationToken);
			return response.Templates;
		}
	}
}
