using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Site.Server.Data;
using Site.Server.Options;
using Site.Server.Repositories;
using System.Threading.RateLimiting;
using System.Net;
using Site.Server.Middleware;
using AutoMapper;
using Site.Server.Mapping;
using System.Threading;
using Pomelo.EntityFrameworkCore.MySql;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddDbContext<UserDatabaseContext>(options => options.UseMySql(
    configuration.GetConnectionString("ClothUsers"),
    new MySqlServerVersion(new Version(8, 0, 2))
));

builder.Services.AddDbContext<CartDatabaseContext>(options => options.UseMySql(
    configuration.GetConnectionString("Carts"),
    new MySqlServerVersion(new Version(8, 0, 2))
));


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAuthenticationRateLimiter();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<AppOptions>(builder.Configuration.GetSection(nameof(AppOptions)));
builder.Services.AddSingleton<IImageRepository, ImageRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICartRepository, CartRepository>();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new AutoMapperProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Change urls based on environment
if (builder.Environment.IsDevelopment())
{
    builder.WebHost.UseUrls("http://localhost:5000");
}
else
{
    builder.WebHost.UseUrls("http://+:80");
}

// Adding caching for image files
builder.Services.AddMemoryCache(options =>
{
    options.SizeLimit = 50 * 1024 * 1024; // 50MB
});

var app = builder.Build();


// Make sure databases are created and migrated
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var userContext = services.GetRequiredService<UserDatabaseContext>();
        var cartContext = services.GetRequiredService<CartDatabaseContext>();

        // Wait for database availbility
        var maxRetries = 20;
        var retryCount = 0;

        while (retryCount < maxRetries)
        {
            try
            {
                userContext.Database.EnsureCreated();
                cartContext.Database.EnsureCreated();
                break;
            }
            catch (Exception)
            {
                ++retryCount;
                if (retryCount >= maxRetries)
                {
                    throw;
                }
                Thread.Sleep(3000); // Wait 3 seconds before retrying
            }
        }
        Console.WriteLine("Database creation complete");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error occurred while attempting to create databases: {ex.Message}");
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthenticationRateLimiter();
app.UseCors();

app.UseAuthorization();
app.MapControllers();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);
app.MapFallbackToFile("/index.html");

app.Run();
