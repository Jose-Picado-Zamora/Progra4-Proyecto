using API_FundacionTamarindoPark.Entities;
using API_FundacionTamarindoPark.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProjectService.WebAPI.Data;
using System.Text;



namespace API_FundacionTamarindoPark.WebAPI
{
    public class Startup
    {
        

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            // 1. jwtSettings binding
            var jwtSettings = Configuration
                                .GetSection("JwtSettings")
                                .Get<JwtSettings>()
                                ?? throw new InvalidOperationException("Invalid JWT Settings");

            // 2. Registro de DI

            services.AddSingleton(jwtSettings);
            // Cambia el registro del servicio
            services.AddScoped<IUserAuthService, UserAuthService>();
            services.AddScoped<API_FundacionTamarindoPark.Services.IProjectsService, API_FundacionTamarindoPark.Services.ProjectService>();
            services.AddScoped<API_FundacionTamarindoPark.Services.IDonorService, API_FundacionTamarindoPark.Services.DonorService>();





            // 3. Configurar Authenticacion
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),

                        ValidateIssuer = true,
                        ValidIssuer = jwtSettings.Issuer,

                        ValidateAudience = true,
                        ValidAudience = jwtSettings.Audience,

                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddCors(options =>
            {
                options.AddPolicy("DevCors", policy =>
                    policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                );
            });

            services.AddAuthorization();


            services.AddDbContext<ProjectContext>(options => options.UseInMemoryDatabase("projectdb"));
            services.AddDbContext<DonorContext>(options => options.UseInMemoryDatabase("projectdb"));
            services.AddControllers();


            // Add Swagger generation
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = " API - Fundacion Tamarindo Park",
                    Version = "v1",
                    Description = "A simple example ASP.NET Core Web API for Fundacion Tamarindo Park"
                });
            });
        }


     
    

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();


                // Enable middleware to serve generated Swagger as a JSON endpoint.
                app.UseSwagger();

                // Enable middleware to serve swagger-ui, specifying the Swagger JSON endpoint.
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fundacion Tamarindo Park API v1");
                });
            }

            app.UseRouting();
            app.UseCors("DevCors");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
