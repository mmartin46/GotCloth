

# Build .NET project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY *.csproj ./
# Restore dependencies
RUN dotnet restore

# Copy source code
COPY . .

# Build the app
RUN dotnet build -c Release -o /app/build

# Publish the app
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS runtime
WORKDIR /app

# Copy the published files
COPY --from=build /app/publish .

# Create image directory
RUN mkdir -p /app/wwwroot/images

# Expose port 80
EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "Site.Server.dll"]