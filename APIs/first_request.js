var request = require('request')


request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    if(!error && response.statusCode == 200){
        console.log(body) // show the HTML fot the Google homepage
        console.log(typeof body) // show the HTML fot the Google homepage
        var parsedData = JSON.parse(body)
        console.log(parsedData)
        console.log(typeof parsedData)
        console.log("Sunset in Hawaii is at... ")
        console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"])

    }
})