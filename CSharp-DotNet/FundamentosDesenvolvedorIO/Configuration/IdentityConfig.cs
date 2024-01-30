using FundamentosDesenvolvedorIO.Data;
using FundamentosDesenvolvedorIO.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FundamentosDesenvolvedorIO.Configuration
{
    public static class IdentityConfig
    {
        public static WebApplicationBuilder AddIdentityConfig(this WebApplicationBuilder builder)
        {
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApiDbContext>();

            // Pegando o Token e gerando a chave encodada
            var JwtSettingsSection = builder.Configuration.GetSection("JwtSettings");
            builder.Services.Configure<JwtSettings>(JwtSettingsSection);

            var jwtSettings = JwtSettingsSection.Get<JwtSettings>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Segredo);

            //configs de autenticação utilizando o padrao do pacote JwtBearer
            builder.Services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true; //precisa trabalhar no https
                options.SaveToken = true; //mantem o token dentro do request para ser utilizado em qualquer momento da request
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key), // chave para emissao do token
                    ValidateIssuer = true, // validar quem foi o emissor
                    ValidateAudience = true, // validar se minha audiencia é compativel com a do token
                    ValidAudience = jwtSettings.Audiencia, // audencia valida é a do appsettings
                    ValidIssuer = jwtSettings.Emissor // emissor valido é o do appsettings
                };
            });

            return builder;
        }
    }
}
