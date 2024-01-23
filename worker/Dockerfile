# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:7.0 as build-env
WORKDIR /src
COPY . ./
RUN dotnet restore ./worker.csproj
RUN dotnet publish ./worker.csproj -c Release -o publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /src/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "./worker.dll"]