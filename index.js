const weather = document.querySelector(".js-date");
const API_KEY = "9e239c36ff4b7dd9dd179e57a23c0036";
const COORDS = "coords";




function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json()
    }).then(function(json){
      const temp = json.main.temp;
      const place = json.name;
      const feels_like = json.main.feels_like;
      const temp_min = json.main.temp_min
      const temp_max = json.main.temp_max
      const windspd = json.wind.speed
      const windDeg = findWindDeg(json.wind.deg)

      weather.innerHTML = `
      현재 위치 ${place}<br>
      현재 기온 ${temp} °C<br>
      체감 온도 ${feels_like} °C<br>
      최저 기온 ${temp_min} °C<br>
      최고 기온 ${temp_max} °C<br>
      풍속 ${windspd} m/s<br>
      풍향 ${windDeg}<br>
       `
    })

}

function findWindDeg(deg){
  winddeg = 'Undefined'
  if(deg>=0&&deg<=23){
    winddeg = "N"
  }else if(deg>23&&deg<=68){
    winddeg = "NE"
  }else if(deg>68&&deg<=112){
    winddeg = "E"
  }else if(deg>112&&deg<=157){
    winddeg = "SE"
  }else if(deg>157&&deg<=202){
    winddeg = "S"
  }else if(deg>202&&deg<=245){
    winddeg = "SW"
  }else if(deg>245&&deg<=290){
    winddeg = "W"
  }else if(deg>290&&deg<=337){
    winddeg = "NW"
  }else if(deg>337){
    winddeg = "N"
  }else{
    winddeg = "Worng degree"
  }

  return winddeg
}


function saveCoord(coordObject){
  localStorage.setItem(COORDS , JSON.stringify(coordObject))
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const coordObject = {
    latitude,
    longitude
  };
  saveCoord(coordObject);
  getWeather(latitude , longitude)
}

function handleGeoError(){
  console.log("Ooops")
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    const parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.latitude , parsedCoords.longitude)
  }

}

function init(){
  loadCoords();


}

init()
