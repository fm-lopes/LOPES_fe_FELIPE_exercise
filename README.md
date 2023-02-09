# Tempo Frontend challenge

# Solution Improvement

### Describe what you have improved in the solution
All changes are also documented in files with @DONE comments
- Specified node version in package.json (v12 for instance cause issues on npm start);
- App.tsx: changed to const vars
- Card/index.tsx: extracted to type Column
- List/index.tsx: changed to boolean
- TeamOverview.tsx: Change several vars to const and used Promise.all to fire requests in parallel
- Teams.tsx: Changed var to const and fixed type any
- UserOverview.tsx: Changed vars to const
- testTeamOverview.tsx: fixed spyOn calls

## To Run the project you must run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```