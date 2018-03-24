function parseForm() {

    var location = $('#location').val();
    var apiKey = 'AIzaSyD-HyEXFrceDw9DlR7Dq2umA7P7kNFV9V4';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKey;
 
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        data: {},
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(url);
            console.log('error');
            console.log(JSON.stringify(err));
        }
    });
}