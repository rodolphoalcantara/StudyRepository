namespace FundamentosDesenvolvedorIO.Configuration
{
    public static class CorsConfig
    {
        public static WebApplicationBuilder AddCorsConfig(this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                //policy para development menos restritiva
                options.AddPolicy("Development", builder =>
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
                //exemplo de policy para CORS
                options.AddPolicy("Production", builder =>
                    builder
                        .WithOrigins("https://localhost:9000")
                        .WithMethods("POST")
                        .AllowAnyHeader()
                );
            });

            return builder;
        }
    }
}
