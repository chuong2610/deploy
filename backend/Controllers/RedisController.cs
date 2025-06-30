using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

[ApiController]
[Route("api/[controller]")]
public class RedisController : ControllerBase
{
    private readonly IConnectionMultiplexer _redis;

    public RedisController(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    [HttpGet("ping")]
    public async Task<IActionResult> Ping()
    {
        try
        {
            var db = _redis.GetDatabase();
            var pong = await db.PingAsync();  // hoặc await db.StringSetAsync("test", "ok");
            return Ok(new { success = true, response = pong });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, error = ex.Message });
        }
    }
}
