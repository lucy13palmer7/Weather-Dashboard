let APIKey = "33eab3412b3922958fbac6ddd2432638";
let units = "imperial";
let url = "https://api.openweathermap.org/data/2.5/forecast?" + getSearchMethod + "APPID=" +APIKey "&units=$" + units;
let searchMethod;
// search q or zip
function getSearchMethod(searchTerm) {
    if (
        searchTerm.length === 5 &&
        Number.parseInt(searchTerm) + "" === searchTerm
    )
        searchMethod = "zip";
    else searchMethod = "q";
}
$.ajax({
    url: url, //API Call
    dataType: "json",
    type: "GET",
    data: {
        q: city,
        appid: APIKey,
        units: "metric",
        cnt: "10"
    },
    success: function (data) {
        console.log('Received data:', data) // For testing
        var wf = "";
        $.each(data.list, function (index, val) {
            $("#fiveTemp").text("Temp: " + response.main.temp);
            // 
            $("#fiveHum").text("Humidity: " + response.main.humidity);
        });
    }
});