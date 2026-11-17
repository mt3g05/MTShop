using Microsoft.EntityFrameworkCore;
using MTShop.Api.Models;

namespace MTShop.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed 6 sản phẩm mặc định của MTShop khi chạy Migration
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = "sua-rua-mat",
                Name = "Sữa rửa mặt dịu nhẹ",
                Category = "Chăm sóc da",
                Subtitle = "Làm sạch mỗi ngày · 150 ml",
                Price = 189000,
                Color = "#b1c6a4",
                Type = "pump",
                Label = "GENTLE CLEANSER",
                Badge = "Được yêu thích"
            },
            new Product
            {
                Id = "kem-duong-am",
                Name = "Kem dưỡng ẩm hằng ngày",
                Category = "Chăm sóc da",
                Subtitle = "Bước dưỡng da cơ bản · 50 g",
                Price = 249000,
                Color = "#e1c3a3",
                Type = "jar",
                Label = "DAILY MOISTURE",
                Badge = "Gợi ý cho bạn"
            },
            new Product
            {
                Id = "dau-goi",
                Name = "Dầu gội hương thảo",
                Category = "Chăm sóc tóc",
                Subtitle = "Hương thơm thảo mộc · 300 ml",
                Price = 219000,
                Color = "#577d69",
                Type = "pump",
                Label = "ROSEMARY SHAMPOO",
                Badge = null
            },
            new Product
            {
                Id = "sua-tam",
                Name = "Sữa tắm hương trà xanh",
                Category = "Chăm sóc cơ thể",
                Subtitle = "Cho phút giây thư giãn · 300 ml",
                Price = 179000,
                Color = "#c5d3b0",
                Type = "pump",
                Label = "GREEN TEA BODY WASH",
                Badge = null
            },
            new Product
            {
                Id = "kem-tay",
                Name = "Kem dưỡng da tay",
                Category = "Chăm sóc cơ thể",
                Subtitle = "Nhỏ gọn mang theo · 60 ml",
                Price = 99000,
                Color = "#d7aa91",
                Type = "tube",
                Label = "HAND CREAM",
                Badge = null
            },
            new Product
            {
                Id = "dau-xa",
                Name = "Dầu xả chăm sóc tóc",
                Category = "Chăm sóc tóc",
                Subtitle = "Hoàn thiện bước gội đầu · 250 ml",
                Price = 199000,
                Color = "#d1cda9",
                Type = "tube",
                Label = "DAILY CONDITIONER",
                Badge = null
            }
        );
    }
}
