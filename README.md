# DementiaHackNodeArduino
## Setup and Installation - Web App
- Make sure you have RethinkDB installed (`brew install rethinkdb`)
- Run `rethinkdb` in a tab in Mac OSX
- Run `npm i` in the root directory to
- Make sure `gulp` is installed by running `npm i gulp -g`
- In the root directory run `gulp`
- Point your browser to http://localhost:3000

## REST API
### POST - /schedule
#### In the body of the request
- id
- day_of_week_1
- day_of_week_2
- day_of_week_3
- day_of_week_4
- day_of_week_5
- day_of_week_6
- day_of_week_7
- time_of_day_1
- time_of_day_2
- time_of_day_3
- time_of_day_4

### GET - /schedule
#### Returns ALL schedules with the following
- id
- date
- day_of_week_1
- day_of_week_2
- day_of_week_3
- day_of_week_4
- day_of_week_5
- day_of_week_6
- day_of_week_7
- time_of_day_1
- time_of_day_2
- time_of_day_3
- time_of_day_4

### GET - /scheudle/:id
#### Returns the LATEST schedule
