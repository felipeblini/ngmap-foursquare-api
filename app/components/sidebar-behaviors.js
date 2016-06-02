$(document).ready(function() {
  // accordion event handler
  $(".category").click(function(e) {
    $(this).toggleClass("active");
  });

  // autocomplete
  var gm = google.maps;
  var geocoder = new gm.Geocoder();

  function getLatLonFromAddress(address, response) {
    geocoder.geocode(address, function (results, status) {
      response($.map(results, function (item) {
        return {
          label: item.formatted_address,
          value: item.formatted_address,
          latitude: item.geometry.location.lat(),
          longitude: item.geometry.location.lng()
        };
      }));
    });
  }

  function addressAutocomplete() {
    var elLatLon = $('#txtLatLon');

    return {
      source: function (request, response) {
        var address = { 'address': request.term + ', Brasil', 'region': 'BR' };
        getLatLonFromAddress(address, response);
      },
      select: function (event, ui) {
        var location = new gm.LatLng(ui.item.latitude, ui.item.longitude);
        elLatLon.val(location.lat() + ',' + location.lng()).trigger('input');
      }
    };
  }

  $('#txtEndereco').autocomplete(addressAutocomplete());
})
