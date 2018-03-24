var travellerInfo = new Object();

$('#daysTravelling').on('change', function(){
    var num = $('#daysTravelling').val();

    if(num == 1) {
        $('#daysTravellingDom').html('1 day');
    } else {
        $('#daysTravellingDom').html(num + ' days');
    }
});

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
                    loc = data.results[0].geometry.location;
                    rs += loc.lat + ',' + loc.lng;
                    var city = data.results[0].address_components[1].long_name;
                    $('#locationResult').html('Looks like you\'re going to ' + city + '! Great choice!');
                    $('#firstBoi').css('display', 'none');
                    $('#secondBoi').css('display', 'inherit');
                    travellerInfo.location = rs;
                    return rs;
                } else {
                    //no matches
                    $('#locationResultBad').html('Uh oh! We couldn\'t find a location with zipcode ' + location + '! Try again?' );
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
    travellerInfo.travelMethod = $('#travelMethod').val();
    travellerInfo.days = $('#daysTravelling').val();
    travellerInfo.budget = $('input[name=budgetRange]:checked').val();
    travellerInfo.familyFriendly = $('#familyFriendly').val();
    travellerInfo.activeLevel = $('#activeLevel').val();
    travellerInfo.adventureLevel = $('#adventureLevel').val();
    travellerInfo.urbanLevel = $('#urbanLevel').val();
    travellerInfo.materialismLevel = $('#materialismLevel').val();
    travellerInfo.earlyRisers = $('#earlyRisers').val(); 
}