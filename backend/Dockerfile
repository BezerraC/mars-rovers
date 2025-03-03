# Use the SDK image for development and debugging
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS dev
WORKDIR /app

# Copy the project file and restore the dependencies
COPY . .

EXPOSE 5256

# Execute the application with the watch command to enable hot reload
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5256"]
