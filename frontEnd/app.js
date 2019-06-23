console.log("Hello")

window.addEventListener('load', function(){
    getButtons()
    assignListeners()
    let js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMaps}`;
    document.getElementsByTagName('head')[0].appendChild(js_file);
    statusBar.innerText = "Please enable location services" 
    
    navigator.geolocation.getCurrentPosition(function(position) {
        statusBar.innerText = "Location Secured: Rendering Map" 
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        loadMap(latitude, longitude)
        statusBar.innerText = "Map Rendered: Initializing Scooter Sleuth"
        console.log("Finding Scooters")
        scooterFetch(latitude, longitude)
    });
});

// locationInformation
let jumpData = []
let lyftData = []
let spinData = []
let birdData = []
let limeData = []

// buttons 
let enableLocationButton
let lyftButton
let birdButton
let limeButton
let jumpButton
let spinButton 
let statusBar
let name
let flatiron
let email

// Map Information
let longitude
let latitude
let map
let jumpMarkers = []
let spinMarkers = []
let lyftMarkers = []
let birdMarkers = []
let limeMarkers = []

// Map Plotting Functions
function loadMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: latitude, lng: longitude}, zoom: 16});
    // marker of current location
    let infowindow = new google.maps.InfoWindow({content: "Your location"});
    let marker = new google.maps.Marker({position: new google.maps.LatLng(latitude, longitude), map: map, animation: google.maps.Animation.en});
    marker.addListener('click', function() {infowindow.open(map, marker)});
}

function plotJump(jumpData) {
    jumpData.forEach((coord) => {
        let infowindow = new google.maps.InfoWindow({content: "Jump"});
        let marker = new google.maps.Marker({position: new google.maps.LatLng(coord["lat"], coord["lon"]), map: map, icon: 'https://vectr.com/drbarq/g2Zs35T5Vl.svg?width=35&height=35&select=g2Zs35T5Vlpage0', animation: google.maps.Animation.en});
        // marker.addListener('click', function() {infowindow.open(map, marker)});
        jumpMarkers.push(marker)
      })
      jumpButton.value = 'plotted'
}

function plotSpin(spinData) {
    spinData.forEach((coord) => {
        let infowindow = new google.maps.InfoWindow({content: "Spin"});
        let marker = new google.maps.Marker({position: new google.maps.LatLng(coord["lat"], coord["lon"]), map: map, icon: 'https://vectr.com/drbarq/ah2pOcTuH.svg?width=35&height=35&select=ah2pOcTuHpage0', animation: google.maps.Animation.en});
        // marker.addListener('click', function() {infowindow.open(map, marker)});
        spinMarkers.push(marker)
      })
      spinButton.value = 'plotted'
}

function plotLyft(lyftData) {
    lyftData.forEach((coord) => {
        // debugger;
        let infowindow = new google.maps.InfoWindow({content: "Lyft"});
        let marker = new google.maps.Marker({position: new google.maps.LatLng(coord["lat"], coord["lon"]), map: map, icon: 'https://vectr.com/drbarq/c4EU6HxMQk.svg?width=35&height=35&select=c4EU6HxMQkpage0', animation: google.maps.Animation.en});
        // marker.addListener('click', function() {infowindow.open(map, marker)});
        lyftMarkers.push(marker)
      })
      lyftButton.value = 'plotted'
}

function plotBird(birdData) {
    birdData.forEach((coord) => {
        let infowindow = new google.maps.InfoWindow({content: "Bird"});
        let marker = new google.maps.Marker({position: new google.maps.LatLng(coord['location']["latitude"], coord['location']["longitude"]), map: map, icon: 'https://vectr.com/drbarq/eN2O7gHhT.svg?width=35&height=35&select=eN2O7gHhTpage0', animation: google.maps.Animation.en});
        // marker.addListener('click', function() {infowindow.open(map, marker)});
        birdMarkers.push(marker)
      })
      birdButton.value = 'plotted'
}

function plotLime(limeData) {
    limeData.forEach((coord) => {
        let infowindow = new google.maps.InfoWindow({content: "lime"});
        let marker = new google.maps.Marker({position: new google.maps.LatLng(coord["attributes"]["latitude"], coord["attributes"]["longitude"]), map: map, icon: 'https://vectr.com/drbarq/c9wCsc8nTd.svg?width=35&height=35&select=c9wCsc8nTdpage0', animation: google.maps.Animation.en});
        // marker.addListener('click', function() {infowindow.open(map, marker)});
        limeMarkers.push(marker)
      })
      limeButton.value = 'plotted'
}

// Button Functions
let getButtons = function() {
    enableLocationButton = document.getElementsByClassName('location')[0]
    lyftButton = document.getElementsByClassName('lyft')[0]
    birdButton = document.getElementsByClassName('bird')[0]
    limeButton = document.getElementsByClassName('lime')[0]
    jumpButton = document.getElementsByClassName('jump')[0]
    spinButton = document.getElementsByClassName('spin')[0]
    statusBar = document.getElementsByClassName('statusUpdate')[0]
    name = document.getElementsByClassName("name")[0]
    flatiron = document.getElementsByClassName("flatiron")[0]
    email = document.getElementsByClassName("email")[0]
    githubButton = document.getElementsByClassName("github")[0]
    linkedinButton = document.getElementsByClassName("linkedin")[0]
    youTubeButton = document.getElementsByClassName("youtube")[0]
}

let assignListeners = function() {
    lyftButton.addEventListener('click', function(e) {
        buttonLogic(e)
    })
    birdButton.addEventListener('click', function(e) {
        buttonLogic(e)
    })
    limeButton.addEventListener('click', function(e){
        buttonLogic(e)
    })
    jumpButton.addEventListener('click', function(e) {
        buttonLogic(e)
    })
    spinButton.addEventListener('click', function(e) {
        buttonLogic(e)
    })
    githubButton.addEventListener('click',function() {
        window.open("https://github.com/drbarq");
    })
    linkedinButton.addEventListener('click', function() {
        window.open("https://www.linkedin.com/in/joetustin/")
    })
    youTubeButton.addEventListener('click', function() {
        window.open("https://www.youtube.com/watch?v=PwzsgzlYaZY")
    })
}

let removeMarkers = function(storedMarkers, e) {
    storedMarkers.forEach(function(marker) {
        marker.setMap(null)
    })
    e.target.value = 'markers removed';
}

let setMarkers = function(storedMarkers, e) {
    storedMarkers.forEach(function(marker) {
        marker.setMap(map)
    })
    e.target.value = 'plotted';
}

let buttonLogic = function(e) {
    buttonState = e.target.value
    brand = e.target.classList.value
    brandUpCase = brand.charAt(0).toUpperCase() + brand.slice(1)
    plotBrand = eval(`plot${brandUpCase}`)
    brandData = eval(`${brand}Data`)
    storedMarkers = eval(`${brand}Markers`)

    switch(buttonState) {
        case "Scooters Found":
            plotBrand(brandData);
            break;
        case "plotted":
            removeMarkers(storedMarkers, e);
            break;
        case "markers removed":
            setMarkers(storedMarkers, e)
            break;
    }
}

// Scooter Data Fetch
let scooterFetch = function() {
    getLyftScooters()
    getJumpBikes()
    getSpinScooters()
    getBirdScooters(latitude, longitude)
    getLimeScooters(latitude, longitude)
    statusBar.innerText = "Scooters Successfully Located!  Please Select a Scooter Company Above to Display on the Map"
}

let getBirdScooters = function(latitude, longitude) {
    let birdURL = `https://api.bird.co/bird/nearby?latitude=${latitude}&longitude=${longitude}&radius=1000`
    fetch(birdURL, {
        "method": "GET",
        "headers": {
        "Authorization": `${config.bird}`,
        "Device-id": `${config.birdDevice}`,
        "App-Version": "4.24.5",
        "Location": `{\"latitude\":${latitude},\"longitude\":${longitude},\"altitude\":500,\"accuracy\":100,\"speed\":-1,\"heading\":-1}`
      }})
      .then(function(response) {
          return response.json()
      })
      .then(function(result) {
          birdData = result["birds"]
          birdButton.value = "Scooters Found"
          console.log(result)
      })
      .catch(function(err) {
          console.error(err)
      })
}

let getLimeScooters = function(latitude, longitude) {
    bound = .2
    ne_lat = latitude - bound
    ne_lng = longitude - bound
    sw_lat = latitude + bound
    sw_lng = longitude + bound

    let limeURL = `https://stormy-badlands-64113.herokuapp.com/https://web-production.lime.bike/api/rider/v1/views/map?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}&user_latitude=${latitude}&user_longitude=${longitude}&zoom=16'`
    fetch(limeURL, {
        "method": "GET",
        "headers": {
        "Authorization": `${config.lime}`,
        "cookie": `${config.limeCookie}`
      }})
      .then(function(response) {
          return response.json()
      })
      .then(function(result) {
          limeData = result.data.attributes.bikes
          limeButton.value = "Scooters Found"
          console.log(result)
      })
      .catch(function(err) {
          console.error(err)
      })
}

let getLyftScooters = function() {
    let lyftURL = "https://stormy-badlands-64113.herokuapp.com/https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/den/free_bike_status.json"
        fetch(lyftURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {
            lyftData = result["data"]["bikes"]
            lyftButton.value = "Scooters Found"
            console.log(result)
        })
        .catch(function(err) {
            console.error(err)
        })
}  

let getJumpBikes = function() {
    let jumpURL = "https://den.jumpbikes.com/opendata/free_bike_status.json"
        fetch(jumpURL) 
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {
            jumpData = result["data"]["bikes"]
            jumpButton.value = "Scooters Found"
            console.log("Grabbed all the Jumps")
        })
        .catch(function(err) {
            console.error(err)
        })
}

let getSpinScooters = function() {
    let spinURL = "https://web.spin.pm/api/gbfs/v1/denver/free_bike_status"
    fetch(spinURL) 
    .then(function(response) {
        return response.json()
    })
    .then(function(result) {
        spinData = result["data"]["bikes"]
        spinButton.value = "Scooters Found"
        console.log("Grabbed all the Spins")
    })
    .catch(function(err) {
        console.error(err)
    })
}


