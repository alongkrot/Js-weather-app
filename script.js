const appKey ="414ef8eec1c65c4b383d767bb150dc72";

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");

//กดปุ่มหาข้อมูล
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);


// กดปุ่ม enter หาข้อมูล
function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

// searchหาข้อมูล
function findWeatherDetails() {
    if (searchInput.value === "") {
        
    } else {
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}


// รับค่าจาก sever
function theResponse(response) {
    //เเปลงจาก json เป็น javascript
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";


}

// ส่ง request ไป sever
function httpRequestAsync(url, callback) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            callback(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true) // true for asynchronous
    httpRequest.send();
}