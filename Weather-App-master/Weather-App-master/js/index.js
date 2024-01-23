
let search = document.getElementById("search");
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months =["January","February","March","April","May","June","July","August","September","October","November","December"];

async function getLocation(finalRes){
    let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=16c38487d88a455d882205628230101&q=${finalRes}&days=3`)
    if(res.status == 200){
    let finalRes=await res.json();
    console.log(finalRes.location)
    console.log(finalRes.forecast.forecastday)
    displayCurrentDay(finalRes.location,finalRes.current)
    displayDataOfTwoDays(finalRes.forecast.forecastday)}
}
search.addEventListener("keyup",(finalRes) =>{
getLocation(finalRes.target.value)});

function displayCurrentDay(finalRes,res){
    let time = new Date(res.last_updated);
    let month = time.getMonth();
    let day = time.getDay();
    let date = time.getDate();
    console.log(days[day]+' '+ date +' '+ months[month]);
    let cartona=`<div class="col-lg-4">
    <div class="wheather-container rounded-cont-top rounded-cont-left min-max-height">
        <div class="wheather">
            <div class="wheather-header rounded-cont-left rounded-cont-top">
                <div class="day float-start">${days[day]}</div>
                <div class="date float-end">${date+' '+months[month]}</div>
            </div>
            <div class="clearfix"></div>
            <div class="wheather-content" id="current">
            <div class="location">${finalRes.name}</div>
            <div class="tempDegree">
            <div class="temp d-inline-block "><span class="me-0">${res.temp_c}</span><sup>o</sup>C</div>
                <div class="wheather-icon d-inline-block">
               <img src="https:${res.condition.icon}" alt="" width="90">
                </div>
            </div>
            <div class="condition fw-semibold fs-6">${res.condition.text}</div>
            <span><img src="imgs/icon-umberella.png" alt="">20%</span>
            <span><img src="imgs/icon-wind.png" alt="">${res.wind_kph}km/h</span>
            <span><img src="imgs/icon-compass.png" alt="">East</span>
            </div>
        </div>
    </div>
</div>`
document.getElementById("wheather").innerHTML = cartona;
}

function displayDataOfTwoDays(finalRes){
let cartona ='';
for(let i=1; i < finalRes.length; i++)
cartona +=`<div class="col-lg-4">
<div class="wheather-container ${i==1?`bg-gray`:`rounded-cont-bottom rounded-cont-right`} text-center min-max-height">
    <div class="wheather">
        <div class="wheather-header rounded-cont-right">
        <div class="day">${days[new Date(finalRes[i].date).getDay()]}</div>
    </div>
    <div class="wheather-content d-flex flex-column align-items-center">
        <div class="wheather-icon mt-4 mb-5">
            <img src="https:${finalRes[i].day.condition.icon}" alt="" width="55">
    </div>
    <div class="tempDegree">${finalRes[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${finalRes[i].day.mintemp_c}<sup>o</sup></small>
        <div class="condition mb-5 fw-semibold fs-6">${finalRes[i].day.condition.text}</div>
    </div>
    </div>
    </div>
</div>`
document.getElementById("wheather").innerHTML+= cartona;
}
getLocation("Alexandria")

function showTime(){
    let time=new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let session ='AM';
    if(hour > 12){
        hour = hour - 12;
        session = 'PM'
    }
    hour = (hour < 10)? '0' + hour : hour;
    min = (min < 10)? '0' + min : min;
    sec = (sec < 10)? '0' + sec : sec;
    let t = hour +' : '+ min + ' : ' + sec +' '+ session;
    document.getElementById('myClockDisplay').innerText = t;
    document.getElementById('myClockDisplay').textContent =t;
    setTimeout(showTime,1000);
}
showTime();




