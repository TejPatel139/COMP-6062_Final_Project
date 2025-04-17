new Vue({
    el: '#app', // Mounts the Vue instance to the DOM element with ID "app"
    data: {
      // Stores user profile data
      user: {
        name: '',
        age: '',
        picture: ''
      },
      // Stores weather query parameters (used to build API URL)
      weatherQuery: {
        city: 'London',
        province: 'Ontario',
        country: 'Canada'
      },
      // Stores fetched weather data
      weather: {
        temperature: '',
        wind: '',
        description: ''
      },
      // Holds the word input by the user
      word: '',
      // Stores the fetched word definition data
      wordDefinition: {
        word: '',
        phonetic: '',
        definition: ''
      }
    },
    methods: {
      // Fetches a random user profile from the backend API
      getUser() {
        fetch("http://comp6062.liamstewart.ca/random-user-profile")
          .then(res => res.json())
          .then(data => {
            // Updates user data from API response
            this.user.name = `${data.first_name} ${data.last_name}`;
            this.user.age = data.age;
            this.user.picture = data.profile_picture;
          })
          .catch(error => {
            console.error("Error fetching user profile:", error);
          });
      },
  
      // Fetches weather information based on city, province, and country
      getWeather() {
        const { city, province, country } = this.weatherQuery;
        const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Updates weather object with response data
            this.weather = {
              temperature: data.temperature,
              wind: data.wind_speed,
              description: data.weather_description,
            };
          })
          .catch(error => {
            console.error('Error fetching weather:', error);
            this.weather = null; // Optional: clears weather if error occurs
          });
      },
  
      // Fetches definition of the word input by the user
      getDefinition() {
        fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              const wordData = data[0];
              // Updates word definition object from API response
              this.wordDefinition = {
                word: wordData.word,
                phonetic: wordData.phonetic,
                definition: wordData.definition,
              };
            } else {
              // Fallback if word not found
              this.wordDefinition = {
                word: 'Not Found',
                phonetic: '',
                definition: 'No definition available.'
              };
            }
          })
          .catch(error => {
            console.error('Error fetching word definition:', error);
          });
      }
    },
  
    // Lifecycle hook: runs automatically when the component is mounted
    mounted() {
      this.getUser();   // Fetch a random user on load
      this.getWeather(); // Fetch weather for default location on load
    }
  });
  