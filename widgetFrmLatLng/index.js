var img = document.getElementById("myImg");
var output = document.getElementById('output');
var main = document.getElementById('name');
var desc = document.getElementById('desc');
var temp = document.getElementById('temp');
var winds = document.getElementById("windsDirection");
var windSpeed = document.getElementById("windSpeed");
var laat ;
var long ; 
function initMap() {
    const myLatlng = { lat: 37.0902, lng: 95.7129 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get weather!",
      position: myLatlng,
    }); 
  
    infoWindow.open(map);
    // [START maps_event_click_latlng_listener]
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
     
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
        laat =  JSON.stringify(mapsMouseEvent.latLng.toJSON().lat, null, 2),
        long = JSON.stringify(mapsMouseEvent.latLng.toJSON().lng, null, 2)
         );
         console.log(laat);
         console.log(long);
         console.log( JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));

      infoWindow.open(map);   
     setLatLng(mapsMouseEvent);
    });
    // [END maps_event_click_latlng_listener]
    
    function setLatLng(mapsMouseEvent){
      laat =  JSON.stringify(mapsMouseEvent.latLng.toJSON().lat, null, 2),
      long = JSON.stringify(mapsMouseEvent.latLng.toJSON().lng, null, 2),
      current(laat,long);
      forecast(laat,long)
    }
    
   
       
    
    function current(laat,long) {
      var lon = long;
      var lat = laat;
    
    
      fetch("https://api.openweathermap.org/data/2.5/weather?lon=" + lon + "&lat=" + lat + "&appid=383483d59914abd926af4e0410d9c9d4")
        .then(response => response.json())
        .then(data => {
    
          console.log('hello from current data');
          var icon = data['weather'][0]['icon'];
          var icon = data['weather'][0]['icon'];
          var degree = data['wind']['deg'];
          var tempValue = data['main']['temp'];
          var nameValue = data['name'];
          console.log(degree);
          main.innerHTML = (degree);
          var descValue = data['weather'][0]['description'];
          var speedValue = data['wind']['speed'];
          var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
          var celcius = mytemp(tempValue);
          var round = Math.round(celcius);
          var upperhtml = "";
          var lowerhtml = "";
          main.innerHTML = nameValue;
          desc.innerHTML = "Desc : " + descValue;
          temp.innerHTML = round + "\u00B0C";
          winds.innerHTML = "Wind direction :" + myfunction(degree);
          windSpeed.innerHTML = "Wind Speed :" + speedValue;
          console.log('icon');
          img.src = iconUrl;
          console.log(nameValue);
          // lon.value = "";
          // lat.value = "";
    
        })
    
        .catch(err => alert("Wrong Information"));
    }
   
    
    
    function forecast(laat,long) {
      var lon = long;
      var lat = laat;
      console.log("forecast");
      fetch("https://api.openweathermap.org/data/2.5/onecall?lon=" + lon + "&lat=" + lat + "&exclude=hourly,minutely&appid=383483d59914abd926af4e0410d9c9d4")
        .then(response => response.json())
        .then(data => {
          var result = "";
          var time = "";
          console.log("my data array ");
          console.log(data.daily);
          data.daily.forEach(element => {
            console.log("in foreach loop");
            console.log(element.moon_phase)

            console.log("from for of forecast");
            var timestamp = element.dt;
            time = new Date(timestamp * 1000);
            var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    
            var dayOfWeek = days[time.getDay()];
    
            result += "<div class = 'col' text-center'>";
           var direction = element.wind_deg;
            var temprature = element.temp.day;
            var tocelcius = mytemp(temprature);
            var rond = Math.round(tocelcius);
            result += dayOfWeek + '<br/>';
            result += "<img src='https://openweathermap.org/img/wn/" + element.weather[0].icon + ".png'/><br/>";
            result += rond + "\u00B0C" + '<br/>';
            result +=  "Wind Speed :"+element.wind_speed + '<br/>';
            result +=  myfunction(direction);
            console.log("innerloop");
            result += "</div>";
            document.getElementById('display').style.display = "block";
          });
          console.log("outerloop");
          output.innerHTML = (result);
          console.log(result);
    
    
    
        })
        .catch(err => alert("Wrong Information!"));
    } let mytemp = (tempValue) => {
      return tempValue - 273.15;
    }
    
          };
        
          let myfunction = (degree) => {
            if ((degree > 337.5 && degree < 360) || (degree > 22.5 && degree < 22.5)) { return 'Northerly'; }
            else if (degree > 22.5 && degree < 67.5) { return 'North Easterly'; }
            else if (degree > 67.5 && degree < 112.5) { return 'Easterly'; }
            else if (degree > 122.5 && degree < 157.5) { return 'South Easterly'; }
            else if (degree > 157.5 && degree < 202.5) { return 'Southerly'; }
            else if (degree > 202.5 && degree < 247.5) { return 'South Westerly'; }
            else if (degree > 247.5 && degree < 292.5) { return 'Westerly'; }
            else if (degree > 292.5 && degree < 337.5) { return 'North Westerly'; }
          };
  
  window.initMap = initMap;
  // [END maps_event_click_latlng]
  
  
  
 