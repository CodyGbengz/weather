var temps;
var windspeed;
var pressure;
var humidity;
var units ="imperial";
$(document).ready(function (){
    setBg();
    getWeather();
    $('#tUnitc').hide();
     $('#windspeed').html(Math.floor(windspeed +'miles/hour'));
            $('#pressure').html(Math.floor(pressure + 'mb'));
    $('#metric').on('click',function() {
            var tempMetric = Math.floor((temps - 32) * 5 / 9);
            var speedMetric = Math.floor(windspeed * 1.609344);
            var pressureMetric = Math.floor(pressure/10)
            $('#temperature').html(tempMetric);
            $('#windspeed').html(speedMetric +'Km/hour');
            $('#pressure').html(pressureMetric + 'kPa');
            $('#tUnitc').show();
            $('#tUnitf').hide();
    });
    $('#imperial').on('click',function(units) {
            $('#temperature').html(Math.floor(temps));
            $('#windspeed').html(Math.floor(windspeed +'miles/hour'));
            $('#pressure').html(Math.floor(pressure + 'mb'));
            $('#tUnitf').show();
            $('#tUnitc').hide();
    });
    var currentDate = new Date;
    currentDate = currentDate.toDateString();
    currentDate = currentDate.slice(0,3) + ', ' + currentDate.slice(4,8) + currentDate.slice(8,10) +','+ currentDate.slice(11,16);
    $('#currentdate').html(currentDate);
     var currentTime = new Date;
     currentTime = currentTime.toLocaleTimeString()
     currentTime = currentTime.slice(0,5) + currentTime.slice(-2);
        $('#currenttime').html(currentTime);

    setInterval(function(){
        $('#currenttime').html(currentTime);
    },1000);
  
    function setBg(){
    var currentTime = new Date;
    currentTime = currentTime.toLocaleTimeString();
    currentTime = currentTime.slice(0,1);
    var tOD = new Date;
    tOD = tOD.toLocaleTimeString();
    tOD = tOD.slice(-2);
    console.log(currentTime,tOD);
    if(currentTime === 12 && tOD ==="AM"){
        $('body').css('background-image','url("./images/aurora-borealis-sunset-wallpaper-1920x1080.jpg")');

    }
    else if(currentTime === 12 && tOD ==="PM"){
        $('body').css('background-image','url("./images/danboard_cardboard_robots_hide_and_seek_grass_67579_1920x1080.jpg")');

    }
    else if(currentTime >= 1 && currentTime <= 5 && tOD ==="AM"){
        $('body').css('background-image','url("./images/aurora-borealis-sunset-wallpaper-1920x1080.jpg")');

    }
    else if(currentTime >= 6 && currentTime <=11 && tOD ==="AM"){
        $('body').css('background-image','url("./images/danboard_cardboard_robots_hide_and_seek_grass_67579_1920x1080.jpg")');

    }
    else if(currentTime >= 1 && currentTime <= 5 && tOD ==="PM"){
        $('body').css('background-image','url("./images/danboard_cardboard_robots_hide_and_seek_grass_67579_1920x1080.jpg")');

    }
    else if(currentTime >= 6 && currentTime <= 7 && tOD === "PM"){
        $('body').css('background-image','url("./images/landscapes-nature-wallpapers-hd-for-windows-7-1366x768.jpg")');

    }
    else if(currentTime >= 7 && tOD === "PM"){
        $('body').css('background-image','url("./images/Family-Silhouette-Against-Beautiful-Sky.jpg")');

    }
}
});
function getWeather(){
    var latitude;
    var longitude;
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation);
    }
    function displayLocation(position){
        latitude = position.coords.latitude;
       longitude = position.coords.longitude;
    
    var weatherUrl ='http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +'&APPID=288c8d97cd4189f3f97f5e332df7a5d8'+'&units='+ units;
    $.getJSON(weatherUrl,function(data){
        console.log(data);
        temps =data.main.temp;
        pressure =data.main.pressure;
        windspeed=data.wind.speed;
        humidity=data.main.humidity;
        var weatherIcon = data.weather[0].icon;
        var weatherDescription = data.weather[0].description;
        var city = data.name;
        var country = data.sys.country;
        $('#city').html(city + ',');
        $('#country').html(country);
        $('#icon').attr('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
        $('#weather').html(weatherDescription);
        $('#temperature').html(Math.floor(temps));
        $('#windspd').html(Math.floor(windspeed +'miles/hour'));
        $('#press').html(Math.floor(pressure + 'mb'));
        $('#humid').html(humidity +'%');
      });
    }
    /*
    var url="http://ip-api.com/json";
    var latitude="";
    var longitude="";


    $.ajax({
        url:url,
        async:true,
        dataType:'json',
        success: function(data){
        console.log(data);
        var latitude = data.lat;
        var longitude = data.lon;
         }
  
});*/

}