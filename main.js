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
const response = {
    location: {
        name: "Nador",
        country: "Morocco",
        region: "Oriental"
    },
    current: {
        temp_c: 23,
        humidity: 55,
        wind_kph: 12,
        condition: {
            text: "Sunny",
            icon: "sun.png"
        }
    }
};
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
    const res=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    const data = await res.json()
    console.log(data);
    
            parentsbutton.innerHTML="";
           if (!data.results || data.results.length === 0) {
                const p = document.createElement("p")
                p.textContent="City not found"
p.style.color = "red";
p.style.fontSize = "20px";
p.style.fontWeight = "bold";
p.style.textAlign = "center";
                parentsbutton.appendChild(p)
                
            }else{data.results.forEach(city => {
        const button = document.createElement("button")
        button.textContent=`${city.name} - ${city.country}`
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

    });
    }
} catch (error) {
    console.error(error)
    
}finally{
    spinner.classList.add("hidden");

}
}
document.getElementById("search-btn").addEventListener("click",(e)=>{
    e.preventDefault()
    getdatata(inputserch.value.trim())

})
