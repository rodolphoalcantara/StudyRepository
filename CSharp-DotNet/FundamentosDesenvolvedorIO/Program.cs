using FundamentosDesenvolvedorIO.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder
    .AddApiConfig()
    .AddCorsConfig()
    .AddSwaggerConfig()
    .AddDbContextConfig()
    .AddIdentityConfig();


builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("Development");
    //app.UseCors("Production");//teste cors
}
else
{
    app.UseCors("Production");
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Acesse /swagger para mais informações");

app.Run();
