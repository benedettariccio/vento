let font1, font2; // Variabili per i font
let windSpeed = 0; // Velocità del vento
let locationName = "Sconosciuta"; // Nome della posizione
let hasData = false; // Flag per sapere se i dati sono stati caricati

function preload() {
  // Percorsi relativi dei font
  font1 = loadFont('assets/ABCDiatypeCondensed-Medium-Trial.otf'); // Primo font
  font2 = loadFont('assets/bianzhidai-Messy.otf'); // Secondo font
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fetchWeatherData(); // Ottieni i dati meteo
}

function fetchWeatherData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = '4b1de0e70c36c2df06eeacf7a59b4f46'; // La tua chiave API
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      loadJSON(url, (data) => {
        windSpeed = data.wind.speed; // Velocità del vento in m/s
        locationName = data.name || "Sconosciuta"; // Nome della posizione
        hasData = true; // Segna che i dati sono stati caricati
      });
    });
  } else {
    console.error("Geolocalizzazione non supportata dal browser.");
  }
}

function draw() {
  background(255);

  if (!hasData) {
    textFont(font1);
    text("Caricamento dei dati del vento...", width / 2, height / 2);
    return;
  }

  // Visualizza la posizione in alto a sinistra
  textAlign(LEFT, TOP);
  textFont(font1);
  textSize(20);
  text(`Posizione: ${locationName}`, 10, 10);

  // Visualizza la velocità del vento in alto a destra
  textAlign(RIGHT, TOP);
  text(`Velocità del vento: ${windSpeed.toFixed(1)} m/s`, width - 10, 10);

  // Mostra "SI" o "NO" al centro dello schermo con il font appropriato
  textAlign(CENTER, CENTER);
  textSize(1000);
  if (windSpeed > 5) {
    textFont(font2);
    text("SI", width / 2, height / 2);
  } else {
    textFont(font1);
    text("NO", width / 2, height / 2);
  }
}
