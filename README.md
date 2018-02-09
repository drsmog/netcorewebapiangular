for installing/restoring nuget packages run
```
dotnet restore
```

for running API run
(default address is http://localhost:5000)
to test API check http://localhost:5000/api/values
```
dotnet run
```

for running front app for dev
runs on http://localhost:4200
```
cd public/myapp
ng serve
```

frontend to build for debug mode/production
all output files will be inside wwwroot folder
```
ng build
```
production
```
ng build --prod
```