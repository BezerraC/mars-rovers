# Use the .NET 9 SDK base image to build the project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy the project files and restore dependencies
COPY backend.csproj .
RUN dotnet restore

# Copy the rest of the code and build the project
COPY . .
RUN dotnet publish -c Release -o /app

# Use the .NET 9 Runtime base image to run the project
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy the compiled files from the build stage
COPY --from=build /app .

# This is the port that the backend listens on
EXPOSE 5256

# Define the command to run the backend
ENTRYPOINT ["dotnet", "backend.dll"]
