using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MTShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Subtitle = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Label = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Badge = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Badge", "Category", "Color", "Label", "Name", "Price", "Subtitle", "Type" },
                values: new object[,]
                {
                    { "dau-goi", null, "Chăm sóc tóc", "#577d69", "ROSEMARY SHAMPOO", "Dầu gội hương thảo", 219000, "Hương thơm thảo mộc · 300 ml", "pump" },
                    { "dau-xa", null, "Chăm sóc tóc", "#d1cda9", "DAILY CONDITIONER", "Dầu xả chăm sóc tóc", 199000, "Hoàn thiện bước gội đầu · 250 ml", "tube" },
                    { "kem-duong-am", "Gợi ý cho bạn", "Chăm sóc da", "#e1c3a3", "DAILY MOISTURE", "Kem dưỡng ẩm hằng ngày", 249000, "Bước dưỡng da cơ bản · 50 g", "jar" },
                    { "kem-tay", null, "Chăm sóc cơ thể", "#d7aa91", "HAND CREAM", "Kem dưỡng da tay", 99000, "Nhỏ gọn mang theo · 60 ml", "tube" },
                    { "sua-rua-mat", "Được yêu thích", "Chăm sóc da", "#b1c6a4", "GENTLE CLEANSER", "Sữa rửa mặt dịu nhẹ", 189000, "Làm sạch mỗi ngày · 150 ml", "pump" },
                    { "sua-tam", null, "Chăm sóc cơ thể", "#c5d3b0", "GREEN TEA BODY WASH", "Sữa tắm hương trà xanh", 179000, "Cho phút giây thư giãn · 300 ml", "pump" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
