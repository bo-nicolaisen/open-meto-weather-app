
const myAppElement = document.getElementById('app');


loadDayData('https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=10.07&hourly=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weathercode,cloudcover,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=Europe%2FBerlin&start_date=2023-02-12&end_date=2023-02-14');
loadWeekData('https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=10.07&daily=weathercode,temperature_2m_max,sunrise,sunset,precipitation_sum&windspeed_unit=ms&timezone=Europe%2FBerlin&start_date=2023-02-12&end_date=2023-02-18');


//Load Data function controller
function loadDayData(myUrl) {

    fetch(myUrl)
        .then((response) => {
            //return response.text();
            return response.json();
        })
        .then((myData) => {
            // do something with 'data'
            //let myData=JSON.parse(data);



            buildDayView(myData);
        })
        .catch(error => {
            throw (error);
        }
        );
}

//Load Data function controller
function loadWeekData(myUrl) {

    fetch(myUrl)
        .then((response) => {
            //return response.text();
            return response.json();
        })
        .then((myData) => {
            // do something with 'data'
            //let myData=JSON.parse(data);



            buildWeekView(myData);
        })
        .catch(error => {
            throw (error);
        }
        );
}


function buildDayView(myData) {

    //console.log('day data: ' + myData.hourly.precipitation);
    const currentDateObj = new Date();
    const currentHour = currentDateObj.getUTCHours() + 1;
    const currentDate = currentDateObj.getUTCDate();
    console.log('current hour: ' + (currentHour));




    myData.hourly.temperature_2m.map((myVal, myIndex) => {

        const dateObj = new Date(myData.hourly.time[myIndex]);
        const myHour = dateObj.getUTCHours();
        const myDate = dateObj.getUTCDate();


        if (myHour >= currentHour && myDate >= currentDate) {


            let myHourElement = document.createElement('article');



            myHourElement.innerText =

                myHour + ' -- : ' +
                convertWeatherCode(myData.hourly.weathercode[myIndex]) + ' -- temp: ' +
                myVal + ' -- feels like:' +
                myData.hourly.apparent_temperature[myIndex] + ' -- wind: ' +
                myData.hourly.windspeed_10m[myIndex] + '-- direction: ' +
                myData.hourly.winddirection_10m[myIndex];

            myAppElement.appendChild(myHourElement);

        }

    });


}






function buildWeekView(myData) {

    // console.log('week data: ' + myData);




}







function convertWeatherCode(myCode) {

    switch (myCode) {
        case 0:

            break;
        case 1:
            return 'Mainly clear';
            break;

        case 2:
            return ' partly cloudy';
            break;

        case 3:
            return 'overcast';
            break;

        case 45:
            return 'Fog';
            break;

        case 48:
            return 'depositing rime fog';
            break;



        default:
            //Statements executed when none of
            //the values match the value of the expression
            break;
    }


}



/* weathercode conversion

Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail


*/

