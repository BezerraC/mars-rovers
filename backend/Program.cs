var builder = WebApplication.CreateBuilder(args);

// CORS setup
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddSingleton<IMovementStrategy, StandardMovementStrategy>();
builder.Services.AddSingleton<RoverService>();

var app = builder.Build();

app.UseCors("AllowAllOrigins");

app.MapControllers();

app.MapGet("/", () => "API Explorando Marte");

app.Run();
