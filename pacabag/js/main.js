function getLocation(e) {
    e.preventDefault();
    var location = $('#location').val();
    var apiKey = 'AIzaSyDs3VmIxebVCXX0p1oH6vWjgias5-lorIQ';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + location + '&components=postal_code&key=' + apiKey;

    var rs = '';
    var loc;
   
    if(location) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            success: function(data) {
                if(data.results.length > 0) {
                    console.log(data.results[0]);
                    loc = data.results[0].geometry.location;
                    rs += loc.lat + ',' + loc.lng;
                    var city = data.results[0].address_components[1].long_name;
                    $('#locationResult').html('Looks like you\'re going to ' + city + '! Great choice!');
                    $('#firstBoi').css('display', 'none');
                    $('#secondBoi').css('display', 'inherit');
                    return rs;
                } else {
                    //no matches
                    $('#locationResult').html('Uh oh! We couldn\'t find a location with zipcode ' + location + '! Try again?' );
                    return null;
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
    return null;
}

function parseData() {

}