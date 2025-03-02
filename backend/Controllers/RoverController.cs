using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RoverController : ControllerBase
{
    private readonly RoverService _roverService;

    public RoverController(RoverService roverService)
    {
        _roverService = roverService;
    }

    [HttpPost("move")]
    public IActionResult MoveRover([FromBody] RoverCommand request)
    {
        try
        {
            var result = _roverService.MoveRover(request.Rover, request.Plateau, request.Commands);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            // Returns an error response with a specific message
            return BadRequest(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            // Returns an error response for invalid commands
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception)
        {
            // Returns a generic error response for other errors
            return StatusCode(500, new { message = "Ocorreu um erro interno no servidor." });
        }
    }
}