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

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddDbContext<UserDatabaseContext>(options => options.UseSqlServer(
    configuration.GetConnectionString("ClothUsers")
));

builder.Services.AddDbContext<CartDatabaseContext>(options => options.UseSqlServer(
    configuration.GetConnectionString("Carts")     
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

builder.WebHost.UseUrls("https://localhost:7269");

var app = builder.Build();


app.UseDefaultFiles();
app.UseStaticFiles();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
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
