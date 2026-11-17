using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MTShop.Api.Models;

[Table("Products")]
public class Product
{
    [Key]
    [MaxLength(100)]
    public string Id { get; set; } = string.Empty;

    [Required(ErrorMessage = "Tên sản phẩm là bắt buộc")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Danh mục là bắt buộc")]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Subtitle { get; set; } = string.Empty;

    [Range(0, 100000000, ErrorMessage = "Giá sản phẩm không hợp lệ")]
    public int Price { get; set; }

    [MaxLength(20)]
    public string Color { get; set; } = "#b1c6a4";

    [MaxLength(20)]
    public string Type { get; set; } = "pump";

    [MaxLength(100)]
    public string Label { get; set; } = "DAILY CARE";

    [MaxLength(100)]
    public string? Badge { get; set; }
}
