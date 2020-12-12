using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PersonInfoAPI.Data;
using System.Data.SqlClient;
using System.Text;

//test
namespace PersonInfoAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddScoped<IPersonAccess, SqlPersonAccess>();

            // // Enable CORS for any origin, headers, methods, and credentials.
            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(builder => builder.SetIsOriginAllowed(origin => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            //});

            string[] allowedOrigins = { "https://localhost:5001", "http://localhost:3000", "https://personinfoappservice.azurewebsites.net/", "https://drewapiwebapp.azurewebsites.net" };
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => builder.WithOrigins(allowedOrigins).AllowCredentials());
            });

            services.AddControllersWithViews();
            services.AddControllers();

            services.AddMvc();

            // 1. Add Authentication Services
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = $"https://{Configuration["Auth0:Domain"]}/";
                options.Audience = Configuration["Auth0:Audience"];
            });

            //react build files location
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            //app.UseCors();
            // 2. Enable authentication middleware
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                //spa application folder
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // run the react server in development mode
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}