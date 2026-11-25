const button = document.getElementById("search-btn")
button.disabled = true
const inputserch = document.getElementById("city-input")
inputserch.addEventListener("input", (e) => {
    e.preventDefault()
    if (/^[a-zA-Z\s]+$/.test(inputserch.value.trim())) {
        button.disabled = false
        button.style.backgroundColor = "blue"


    } else {
        button.disabled = true
        button.style.backgroundColor = "gray"
    }
})

const weatherData = {
    city: "Nador",
    country: "Morocco",
    temperature: 23,
    humidity: 60,
    wind: 15,
    condition: "Sunny"
};
const spinner = document.getElementById("loding")
const parentsbutton = document.getElementById("results")






async function getdatata(city) {
    spinner.classList.remove("hidden")


    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        if (!res.ok) {
            throw new Error(`some thing worng :  ${res.status}`);
        }
        const data = await res.json()
        console.log(data);

        parentsbutton.innerHTML = "";
        if (!data.results || data.results.length === 0) {
            const p = document.createElement("p")
            p.textContent = "City not found"
            p.style.color = "red";
            p.style.fontSize = "20px";
            p.style.fontWeight = "bold";
            p.style.textAlign = "center";
            parentsbutton.appendChild(p)

        } else {
            data.results.forEach(city => {

                const button = document.createElement("button")
                button.textContent = `${city.name} - ${city.country}`
                button.classList.add(
                    "w-full",
                    "p-3",
                    "bg-white",
                    "text-gray-800",
                    "border",
                    "border-gray-300",
                    "rounded-lg",
                    "text-left",
                    "cursor-pointer",
                    "hover:bg-blue-50",
                    "hover:border-blue-500",
                    "transition"
                );
                parentsbutton.appendChild(button)
                button.addEventListener("click", (e) => {
                    e.preventDefault()
                    getdata(city.latitude, city.longitude, city.name)

                })

            });
        }
    } catch (error) {

        console.error(error.message);
        rety.classList.remove("hidden");


        const p = document.createElement("p");
        p.textContent = "Something went wrong. Please try again.";
        p.style.color = "red";

        parentsbutton.innerHTML = "";
        parentsbutton.appendChild(p);
    } finally {

        spinner.classList.add("hidden");

    }
}
document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault()
    getdatata(inputserch.value.trim())

})
const City = document.getElementById("city-name")
const date = document.getElementById("date")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")

inputserch

const WEATHER_CODES = {
    0: { label: "Ciel dégagé", icon: "☀️" },
    1: { label: "Plutôt dégagé", icon: "🌤️" },
    2: { label: "Partiellement nuageux", icon: "⛅" },
    3: { label: "Couvert", icon: "☁️" },
    45: { label: "Brouillard", icon: "🌫️" },
    48: { label: "Brouillard givrant", icon: "🌫️" },
    51: { label: "Bruine légère", icon: "🌦️" },
    53: { label: "Bruine", icon: "🌦️" },
    55: { label: "Bruine forte", icon: "🌦️" },
    56: { label: "Bruine verglaçante", icon: "🌧️" },
    57: { label: "Bruine verglaçante", icon: "🌧️" },
    61: { label: "Pluie légère", icon: "🌧️" },
    63: { label: "Pluie", icon: "🌧️" },
    65: { label: "Pluie forte", icon: "🌧️" },
    66: { label: "Pluie verglaçante", icon: "🌧️" },
    67: { label: "Pluie verglaçante", icon: "🌧️" },
    71: { label: "Neige légère", icon: "🌨️" },
    73: { label: "Neige", icon: "🌨️" },
    75: { label: "Neige forte", icon: "❄️" },
    77: { label: "Grains de neige", icon: "🌨️" },
    80: { label: "Averses légères", icon: "🌦️" },
    81: { label: "Averses", icon: "🌧️" },
    82: { label: "Averses violentes", icon: "⛈️" },
    85: { label: "Averses de neige", icon: "🌨️" },
    86: { label: "Fortes averses de neige", icon: "❄️" },
    95: { label: "Orage", icon: "⛈️" },
    96: { label: "Orage avec grêle", icon: "⛈️" },
    99: { label: "Orage avec forte grêle", icon: "⛈️" },
};


const rety = document.getElementById("retry-btn")
rety.addEventListener("click", (e) => {
    e.preventDefault()
    rety.classList.add("hidden")
    getdatata(inputserch.value.trim())
})

async function getdata(latitude, longitude, city) {
    parentsbutton.textContent = ""

    spinner.classList.remove("hidden");

    try {

        console.log("getdata started");
        console.log(spinner.classList);

const url = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=6`
);        if (!url.ok) {
            throw new Error(`some thing worng :  ${url.status}`);

        }
        const data = await url.json()

        console.log(data);
        City.textContent = city;

        temperature.textContent = data.current.temperature_2m;

        humidity.textContent = data.current.relative_humidity_2m + " %";
        description.textContent = data.current.weather_code

        wind.textContent = data.current.wind_speed_10m + " km/h";
        description.textContent = WEATHER_CODES[data.current.weather_code].label + " " + WEATHER_CODES[data.current.weather_code].icon

        date.textContent = new Date(data.current.time).toLocaleDateString("fr-FR", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

 const weatherContainer = document.getElementById("weather-next");

weatherContainer.innerHTML = "";

for (let i = 1; i < data.daily.time.length; i++) {

    const day = new Date(data.daily.time[i] + "T00:00:00");

    const dateName = day.toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    const weather = WEATHER_CODES[data.daily.weather_code[i]];

    const maxTemp = data.daily.temperature_2m_max[i];
    const minTemp = data.daily.temperature_2m_min[i];

    const card = document.createElement("div");

    card.className = "bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300";

    card.innerHTML = `
        <h2 class="text-xl font-bold text-gray-800 capitalize">
            ${city}
        </h2>

        <p class="text-gray-500 mt-2 capitalize">
            ${dateName}
        </p>

        <div class="flex items-center justify-center gap-3 my-5">

            <span class="text-4xl font-bold text-gray-800">
                ${maxTemp}°
            </span>

            <span class="text-2xl text-gray-400">
                ${minTemp}°C
            </span>

        </div>

        <p class="text-center text-gray-600 font-medium">
            ${weather.label} ${weather.icon}
        </p>

        <div class="grid grid-cols-2 gap-3 mt-6">

            <div class="bg-blue-50 rounded-xl p-3 text-center">
                <h3 class="text-sm text-gray-500">Max Temp</h3>
                <p class="font-bold text-gray-800 mt-1">
                    ${maxTemp}°C
                </p>
            </div>

            <div class="bg-blue-50 rounded-xl p-3 text-center">
                <h3 class="text-sm text-gray-500">Min Temp</h3>
                <p class="font-bold text-gray-800 mt-1">
                    ${minTemp}°C
                </p>
            </div>

        </div>
    `;

    weatherContainer.appendChild(card);
}

    } catch (error) {
        console.error(error.message);

        const p = document.createElement("p");
        p.textContent = error.message;
        p.style.color = "red";

        parentsbutton.innerHTML = "";
        parentsbutton.appendChild(p);
    } finally {

        spinner.classList.add("hidden");

    }
}



