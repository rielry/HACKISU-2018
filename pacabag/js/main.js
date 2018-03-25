var betterLocation;

function traveller(location,
    familyFriendly,
    activeLevel,
    adventureLevel,
    urbanLevel,
    materialismLevel,
    earlyRisers)
{
    this.location = location;
    this.familyFriendly = familyFriendly;
    this.activeLevel = activeLevel;
    this.adventureLevel = adventureLevel;
    this.urbanLevel = urbanLevel;
    this.materialismLevel = materialismLevel;
    this.earlyRisers = earlyRisers;
}

function getLocation(e) {
    e.preventDefault();
    var location = $('#location').val();
    var apiKey = 'AIzaSyDs3VmIxebVCXX0p1oH6vWjgias5-lorIQ';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + location + '&components=postal_code&key=' + apiKey;

    var rs = new Object();
    var loc;
   
    if(location) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            success: function(data) {
                if(data.results.length > 0) {
                    var city = data.results[0].address_components[1].long_name;
                    $('#locationResult').html('Looks like you\'re going to ' + city + '! Great choice!');
                    $('#firstBoi').css('display', 'none');
                    $('#locationResultBad').css('display', 'none');
                    $('#secondBoi').css('display', 'inherit');
                    betterLocation = location;
                } else {
                    //no matches
                    $('#locationResultBad').html('Uh oh! We couldn\'t find a location with zipcode ' + location + '! Try again?' );
                }
            },
            error: function(err) {
                console.log(JSON.stringify(err));
            }
        });
    }
}

function parseData(e) {

    e.preventDefault();

    var familyFriendly = $('#familyFriendly').val();
    var activeLevel = $('#activeLevel').val();
    var adventureLevel = $('#adventureLevel').val();
    var urbanLevel = $('#urbanLevel').val();
    var materialismLevel = $('#materialismLevel').val();
    var earlyRisers = $('#earlyRisers').val(); 

    var data = new traveller(  betterLocation,
                                familyFriendly,
                                activeLevel,
                                adventureLevel,
                                urbanLevel,
                                materialismLevel,
                                earlyRisers);

    $.ajax({
        url: 'http://localhost:3000/places',
        type: 'GET',
        dataType: 'json',
        data: data
    })
    .done(function(res) {
        $('#thirdBoi').css('display', 'inherit');

        var n;
        if(res.length > 5) {
            n = 5;
        } else {
            n = res.length;
        }

        $('#placeholder').empty();

        for(var i = 0; i < n; i++) {
            console.log(res[i]);

            if(res[i].image_url == null){
                res[i].image_url = "pacabag/assets/pictures/alpacaload.gif";
            }

            $('#placeholder').append('<div class="card"><div class="row"><div class="col-sm-4" style="max-height: 10%;"><img src="'+ res[i].image_url +'" style=" width: 100%; height: 100%; object-fit: contain;"></div><div class="col-sm-8"><div class="container"><p class="header2" style="font-size: 2em;"><b>'+ res[i].name +'</b></p><p class="header3">' + res[i].location.address1 + ' ' + res[i].location.city + ' ' + res[i].location.state + '</p><p>'+ res[i].phone +'</p><a href="'+ res[i].url +'"> Yelp Review </a></div></div></div></div>');
        }
    });
}


// <div class="card">
//     <div class="row">
//         <div class="col-sm-4" style="max-height: 10%;">
//             <img src="pacabag/assets/Pictures/alpacaload.gif" style=" width: 100%; height: 100%; object-fit: contain;"">
//         </div>
//         <div class="col-sm-8">
//             <div class="container">
//                 <p class="header2"><b>name</b></p>
//                 <p class="header3">location.address1 location.city, location.state</p>
//                 <p>phone</p>
//                 <p>price</p>
//             </div>
//         </div>
//     </div>
// </div>