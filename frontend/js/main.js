function parseForm(e) {

    e.preventDefault();

    var location = $('#location').val();
    var apiKey = 'AIzaSyDs3VmIxebVCXX0p1oH6vWjgias5-lorIQ';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKey;
 
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {

            console.log(url);
            console.log(data);
        },
        error: function(err) {
            console.log(JSON.stringify(err));
        }
    });
}