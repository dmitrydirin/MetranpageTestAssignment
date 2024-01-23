using Microsoft.AspNetCore.Mvc;
using worker.Models;
using worker.Services.ProjectManager;

namespace worker.Controllers
{
    [Route("/")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private readonly IProjectManager _projectManager;
        private readonly ILogger<AppController> _logger;

		public AppController(IProjectManager projectManager, ILogger<AppController> logger)
		{
			_projectManager = projectManager;
			_logger = logger;
		}

		[HttpPost("build")]
        public async Task<IActionResult> Build(BuildRequest requestData, CancellationToken cancellationToken)
        {
            IEnumerable<ProjectTemplate> templates = null;
            try
            {
                templates = await _projectManager.GetTemplates(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest(new { success = false, error = ex.Message });
            }
            var template = templates.FirstOrDefault(t => t.Id == requestData.TemplateId);
            return Ok(new { success = true, buildedProject = $"Project ID {requestData.Id}, Template args: arg1 = {template.Arg1}, arg2 = {template.Arg2}" });
        }
    }
}
