let currentLinkTemplate = "https://api.openweathermap.org/data/2.5/weather?q=:queryPlace&appid=7ded80d91f2b280ec979100cc8bbba94&units=metric&lang=en";
let forecastLinkTemplate = "https://api.openweathermap.org/data/2.5/forecast?q=:queryPlace&appid=7ded80d91f2b280ec979100cc8bbba94&units=metric&lang=en";
let iconLinkTemplate = "http://openweathermap.org/img/wn/:iconName@2x.png";
let currentWeatherDivParent = document.getElementById("current");
let forecastWeatherDivParent = document.getElementById("forecast");

let queryPlace = document.getElementById("query-place-input");
queryPlace.addEventListener("change",()=>{
    console.log("owo");
    let currentLink = currentLinkTemplate.replace(":queryPlace",queryPlace.value);
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) 
            {
                cardData = JSON.parse(this.responseText);
                console.log(cardData);
                currentWeatherDivParent.innerHTML = "";
                createSingleCard(currentWeatherDivParent,cardData,true);
            }  
        };
        ajax.open("GET", currentLink, true);
        ajax.send();

        let forecastLink = forecastLinkTemplate.replace(":queryPlace",queryPlace.value);
        fetch(forecastLink).then(response => response.json()).then((data)=>{
                console.log(data);
                forecastWeatherDivParent.innerHTML = "";
                for(let cardData of data.list)
                {
                    createSingleCard(forecastWeatherDivParent,cardData);
                }
            });
});

let cardTemplate = document.getElementById("card-template");
function createSingleCard(parent,data,long = false)
{
    let card = cardTemplate.content.cloneNode(true).children[0];
    let name = card.getElementsByClassName("name")[0];
    let description = card.getElementsByClassName("description")[0];
    let temperature = card.getElementsByClassName("temperature")[0];
    let wind = card.getElementsByClassName("wind-speed")[0];
    let icon = card.getElementsByClassName("icon")[0];

    name.innerText = data.name ?? data.dt_txt;
    description.innerText += data.weather[0].description;
    temperature.innerText += data.main.temp;
    wind.innerText += data.wind.speed;
    icon.children[0].src = iconLinkTemplate.replace(":iconName",data.weather[0].icon);
    
    if(long)
        card.classList.add("long");

    parent.appendChild(card);
}