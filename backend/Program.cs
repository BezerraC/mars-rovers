var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<RoverService>();

var app = builder.Build();

app.MapControllers();

app.MapGet("/", () => "API Explorando Marte");

app.Run();
