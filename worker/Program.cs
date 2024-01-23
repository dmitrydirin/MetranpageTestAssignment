using Serilog;
using worker.Services.ProjectManager;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient<IProjectManager, HttpProjectManager>(client =>
{
	client.BaseAddress = new Uri(builder.Configuration["ProjectManager:BaseUrl"]);
});
builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(builder.Configuration));

var app = builder.Build();
app.MapControllers();
app.Run();
