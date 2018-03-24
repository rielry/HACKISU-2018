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
                console.log(data.results);
                if(data.results.length > 0) {
                    loc = data.results[0].geometry.location;
                    rs += loc.lat + ',' + loc.lng;
                    return rs;
                } else {
                    //no matches
                    alert('Uh oh! We couldn\'t find a location with zipcode ' + location + '! Try again?' );
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