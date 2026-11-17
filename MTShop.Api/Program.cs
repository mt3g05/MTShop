using Microsoft.EntityFrameworkCore;
using MTShop.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình kết nối Database MySQL với EF Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = new MySqlServerVersion(new Version(8, 4, 0));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

// 2. Cấu hình CORS cho phép Front-end React (Vite) gọi API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://127.0.0.1:3000",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://localhost:5173"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Tự động áp dụng Migration và Seed Data khi khởi động nếu kết nối MySQL hợp lệ
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        logger.LogWarning("Chưa thể tự động chạy Migration vào MySQL. Hãy kiểm tra lại User/Password trong appsettings.json. Chi tiết: {Message}", ex.Message);
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
