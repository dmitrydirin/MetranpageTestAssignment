using worker.Models;

namespace worker.Services.ProjectManager
{
	public interface IProjectManager
	{
		Task<IEnumerable<ProjectTemplate>> GetTemplates(CancellationToken cancellationToken);
	}
}
