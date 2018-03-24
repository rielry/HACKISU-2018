var betterLocation;
var traveller;

function traveller(location,
    travelMethod,
    days,
    budget,
    familyFriendly,
    activeLevel,
    adventureLevel,
    urbanLevel,
    materialismLevel,
    earlyRisers)
{
    this.location = location;
    this.travelMethod = travelMethod;
    this.days = days;
    this.budget = budget;
    this.familyFriendly = familyFriendly;
    this.activeLevel = activeLevel;
    this.adventureLevel = adventureLevel;
    this.urbanLevel = urbanLevel;
    this.materialismLevel = materialismLevel;
    this.earlyRisers = earlyRisers;
}

//dynamically change days travelling based on user slidy boy
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
                    betterLocation = rs;
                    return rs;
                } else {
                    //no matches
                    $('#locationResultBad').html('Uh oh! We couldn\'t find a location with zipcode ' + location + '! Try again?' );
                    return null;
                }
            },
            error: function(err) {
                console.log(JSON.stringify(err));
            }
        });
    }
    return null;
}

function parseData(e) {

    e.preventDefault();

    var travelMethod = $('#travelMethod').val();
    var days = $('#daysTravelling').val();
    var budget = $('input[name=budgetRange]:checked').val();
    var familyFriendly = $('#familyFriendly').val();
    var activeLevel = $('#activeLevel').val();
    var adventureLevel = $('#adventureLevel').val();
    var urbanLevel = $('#urbanLevel').val();
    var materialismLevel = $('#materialismLevel').val();
    var earlyRisers = $('#earlyRisers').val(); 

    if(budget) {
        traveller = new traveller(  betterLocation,
                                    travelMethod,
                                    days,
                                    budget,
                                    familyFriendly,
                                    activeLevel,
                                    adventureLevel,
                                    urbanLevel,
                                    materialismLevel,
                                    earlyRisers);
    } else {
        alert('Please fill out your budget!');
    }
}

