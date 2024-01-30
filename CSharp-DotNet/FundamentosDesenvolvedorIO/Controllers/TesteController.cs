using FundamentosDesenvolvedorIO.Models;
using Microsoft.AspNetCore.Mvc;

namespace FundamentosDesenvolvedorIO.Controllers
{
    [ApiController]
    [Route("demo")]
    public class TesteController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(Produto), StatusCodes.Status200OK)]
        public IActionResult Get()
        {
            return Ok(new Produto() { Id = 1, Nome = "Teste" });
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Produto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(int id)
        {
            return Ok(new Produto() { Id = id, Nome = "Teste" });
        }

        [HttpPost]
        [ProducesResponseType(typeof(Produto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post(Produto produto)
        {
            return CreatedAtAction(nameof(Get), new { id = produto.Id}, produto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(Produto), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put(int id, Produto produto)
        {
            if(id != produto.Id) {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Delete(int id)
        {
            if (id == 0)
            {
                return NotFound(); //analyzer apontando warning de retorno nao declarado no decoration
            }
            return NoContent();
        }
    }
}
