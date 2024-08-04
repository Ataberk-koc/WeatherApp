document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '402dESVUHFoGy1j9NuaUwBxyIkdM6Eg4';

    // Önce location key almak için şehir arama endpoint'ini kullanın
    const locationApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

    fetch(locationApiUrl)
        .then(response => response.json())
        .then(locationData => {
            if (locationData && locationData.length > 0) {
                const locationKey = locationData[0].Key;

                // Şimdi hava durumu verilerini almak için location key kullanın
                const weatherApiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

                return fetch(weatherApiUrl);
            } else {
                throw new Error('Şehir bulunamadı');
            }
        })
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData && weatherData.length > 0) {
                const weather = weatherData[0];
                document.getElementById('city-name').textContent = city;
                document.getElementById('temperature').textContent = `Sıcaklık: ${weather.Temperature.Metric.Value} °C`;
                document.getElementById('description').textContent = `Açıklama: ${weather.WeatherText}`;
            } else {
                throw new Error('Hava durumu bilgisi alınamadı');
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Şehir bulunamadı veya başka bir hata oluştu.');
        });
});
