using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MTShop.Api.Data;
using MTShop.Api.Models;

namespace MTShop.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        [FromQuery] string? category = null,
        [FromQuery] string? q = null,
        [FromQuery] string? sort = null)
    {
        var query = _context.Products.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "Tất cả")
        {
            query = query.Where(p => p.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            var keyword = q.Trim();
            query = query.Where(p => p.Name.Contains(keyword) || p.Subtitle.Contains(keyword));
        }

        query = sort switch
        {
            "price-asc" => query.OrderBy(p => p.Price),
            "price-desc" => query.OrderByDescending(p => p.Price),
            _ => query
        };

        var products = await query.ToListAsync();
        return Ok(products);
    }

    // GET: api/products/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(string id)
    {
        var product = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound(new { message = $"Không tìm thấy sản phẩm có mã '{id}'." });
        }

        return Ok(product);
    }

    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
    {
        if (string.IsNullOrWhiteSpace(product.Id))
        {
            var baseSlug = GenerateSlug(product.Name);
            var candidateId = baseSlug;
            var counter = 1;
            while (await _context.Products.AnyAsync(p => p.Id == candidateId))
            {
                counter++;
                candidateId = $"{baseSlug}-{counter}";
            }
            product.Id = candidateId;
        }
        else
        {
            product.Id = product.Id.Trim();
            if (await _context.Products.AnyAsync(p => p.Id == product.Id))
            {
                return Conflict(new { message = $"Mã sản phẩm '{product.Id}' đã tồn tại." });
            }
        }

        if (string.IsNullOrWhiteSpace(product.Color)) product.Color = "#b1c6a4";
        if (string.IsNullOrWhiteSpace(product.Type)) product.Type = "pump";
        if (string.IsNullOrWhiteSpace(product.Label)) product.Label = "DAILY CARE";
        if (string.IsNullOrWhiteSpace(product.Badge)) product.Badge = null;

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/products/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(string id, [FromBody] Product updated)
    {
        var existing = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (existing == null)
        {
            return NotFound(new { message = $"Không tìm thấy sản phẩm có mã '{id}'." });
        }

        existing.Name = updated.Name;
        existing.Category = updated.Category;
        existing.Subtitle = updated.Subtitle;
        existing.Price = updated.Price;
        existing.Color = string.IsNullOrWhiteSpace(updated.Color) ? "#b1c6a4" : updated.Color;
        existing.Type = string.IsNullOrWhiteSpace(updated.Type) ? "pump" : updated.Type;
        existing.Label = string.IsNullOrWhiteSpace(updated.Label) ? "DAILY CARE" : updated.Label;
        existing.Badge = string.IsNullOrWhiteSpace(updated.Badge) ? null : updated.Badge;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    // DELETE: api/products/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        var existing = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (existing == null)
        {
            return NotFound(new { message = $"Không tìm thấy sản phẩm có mã '{id}'." });
        }

        _context.Products.Remove(existing);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static string GenerateSlug(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return $"sp-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
        }

        var normalized = text.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder();
        foreach (var c in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
            {
                sb.Append(c);
            }
        }

        var clean = sb.ToString()
            .Normalize(NormalizationForm.FormC)
            .Replace('đ', 'd')
            .Replace('Đ', 'd')
            .ToLowerInvariant();

        clean = Regex.Replace(clean, @"[^a-z0-9\s-]", "");
        clean = Regex.Replace(clean, @"\s+", "-").Trim('-');

        return string.IsNullOrEmpty(clean) ? $"sp-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}" : clean;
    }
}
