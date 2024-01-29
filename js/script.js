fetch('https://restcountries.com/v3.1/all').then(response => response.json())
.then(data => {
    const countriesLayout = document.getElementById('countries-layout');
    let countries = data.map(country => {

        const cardSpace = document.createElement('div');
        cardSpace.className = 'col-lg-3 col-md-4 col-sm-6'

        const cardDiv = document.createElement('div');
        cardDiv.id = country.name.common;
        cardDiv.className = 'card';
        // cardDiv.classList.add('px-0');

        cardDiv.style.boxShadow = '0px 5px 10px 0px #cdcdcd';

        const frontcard = document.createElement('div');
        frontcard.classList.add('card-front');
        cardDiv.append(frontcard);


        const imgElement = document.createElement('img');
        imgElement.className = 'card-img-top';
        imgElement.src = country.flags.png;
        imgElement.alt = 'Card image cap';
        imgElement.style.height = '150px';

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        cardBodyDiv.classList.add('text-center');
        cardBodyDiv.style.minHeight = '10rem'

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        cardFooter.classList.add('text-center');

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = country.name.common;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerHTML = `
            Capital: ${country.capital[0]} <br>
            Region: ${country.region} <br>
            Country Code: ${country.ccn3} <br>
        `;
        

        const btn = document.createElement('a');
        btn.className = 'btn btn-primary';
        btn.textContent = 'Click for Weather';
        btn.onclick = function flipCard() {
            var card = document.getElementById(country.name.common);
            card.classList.toggle('flipped');


            let [lat, long] = country.latlng;
            let apikey = '12d37c0a6c153e3be7bb44268ec9231c';
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`

            fetch(apiUrl).then(res => res.json())
            .then(weatherData => {
                const backcardbody = document.createElement('div');
                backcardbody.classList.add('card-body', 'text-center', 'overflow-y-scroll');
                backcardbody.style.height = '19.4rem';

                const backcardFooter = document.createElement('div');
                backcardFooter.classList.add('card-footer', 'text-center');


                const backcardText = document.createElement('div');
                backcardText.className = 'card-text';
                backcardText.classList.add('d-flex', 'flex-column', 'align-items-start');
                backcardText.innerHTML = `
                    <div class="weather-info">
                        <div class="info-item">
                            <span class="info-label"><strong>Lat-Long:</strong></span>
                            <span class="info-value">${weatherData.coord.lat} - ${weatherData.coord.lon}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Temperature:</strong></span>
                            <span class="info-value">${weatherData.main.temp}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Pressure:</strong></span>
                            <span class="info-value">${weatherData.main.pressure}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Humidity:</strong></span>
                            <span class="info-value">${weatherData.main.humidity}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Wind Speed:</strong></span>
                            <span class="info-value">${weatherData.wind.speed}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Sun Rise:</strong></span>
                            <span class="info-value">${new Date(weatherData.sys.sunrise)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label"><strong>Sun Set:</strong></span>
                            <span class="info-value">${new Date(weatherData.sys.sunset)}</span>
                        </div>
                    </div>
                `;

                backcardbody.append(backcardText);
                backcardbody.style.transform = 'rotateY(180deg)';

                const restoreBtn = document.createElement('button');
                restoreBtn.className = 'btn btn-secondary';
                restoreBtn.innerHTML = `Back`;
                restoreBtn.onclick = function restoreFrontCard() {
                    card.classList.toggle('flipped');
                    backcardbody.remove();
                    backcardFooter.remove();
                    cardDiv.append(frontcard);

                };
                backcardFooter.style.transform = 'rotateY(180deg)';

                backcardbody.append(backcardText);
                backcardFooter.append(restoreBtn);
                frontcard.remove();

                cardDiv.append(backcardbody, backcardFooter);

            })
        };

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardFooter.appendChild(btn);

        frontcard.appendChild(imgElement);
        frontcard.appendChild(cardBodyDiv);
        frontcard.appendChild(cardFooter);

        cardSpace.append(cardDiv);
        countriesLayout.append(cardSpace);

    });

})
.catch(error => console.error('Error fetching data:', error));