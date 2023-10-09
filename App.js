const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const climaBox = document.querySelector('.clima-box');
const climaDetalles = document.querySelector('.clima-detalles');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () =>{

    const api = 'a063483b33a5df7eb2d2e10973c788ad';
    const city = document.querySelector('.search input').value;

    if(city === '')
      return;

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`).then(response => response.json()).then(json =>{

        if(json.cod === '404'){
            container.style.height = '500px';
            climaBox.style.display = 'none';
            climaDetalles.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.clima-box img');
        const temperatura = document.querySelector('.clima-box .temperatura');
        const descripcion = document.querySelector('.clima-box .descripcion');
        const humedad = document.querySelector('.clima-detalles .humedad span');
        const viento = document.querySelector('.clima-detalles .viento span');
        
        switch(json.weather[0].main){
        case 'Clear':
                image.src = 'images/clear.png';
                break;
         case 'Rain':
                image.src = 'images/rain.png';
                break;
         case 'Snow':
                image.src = 'images/snow.png';
                break;
         case 'Clouds':
                image.src = 'images/cloud.png';
                break;
         case 'Haze':
                image.src = 'images/mist.png';
                break;

            default:
                image.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descripcion.innerHTML = `${json.weather[0].description}`;
        humedad.innerHTML = `${json.main.humidity}%`;
        viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        climaBox.style.display = '';
        climaDetalles.style.display = '';
        climaBox.classList.add('fadeIn');
        climaDetalles.classList.add('fadeIn');
        container.style.height = '590px';
    });
});