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
        var result = _roverService.MoveRover(request.Rover, request.Plateau, request.Commands);
        return Ok(result);
    }
}
