using Microsoft.AspNetCore.Mvc;

namespace FundamentosDesenvolvedorIO.Controllers
{
    [ApiController]
    [Route("api/minha-controller")]
    public class WeatherForecastController : ControllerBase
    {
        public WeatherForecastController()
        {
            
        }

        [HttpGet("teste")]
        //[Route("teste")]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}