import Ember from 'ember';
import layout from '../templates/components/mapbox-marker';

export default Ember.Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  symbol: '',
  color: '#444444',
  marker: null,
  divIcon: null,
  fit: true,
  fitBounds: function(map, markers) {
    console.log('fitBounds');
    map.fitBounds(markers.getBounds());
  },
  isLoaded: Ember.observer('map', 'markers', 'marker', function() {
    var map = this.get('map');
    var markers = this.get('markers');
    var marker = this.get('marker');
    var fit = this.get('fit');
    if (typeof(markers) != 'undefined' && marker != null) {
      marker.addTo(markers);
      if (fit) {
        this.set('fit', false);
        Ember.run.scheduleOnce('afterRender', null, this.fitBounds, map, markers);
      }
    }
  }),
  colorChange: Ember.observer('color', 'size', 'symbol', 'divIcon', function() {
    var map = this.get('map');
    var marker = this.get('marker');
    if (typeof(map) != 'undefined' && marker != null) {
      var divIcon = this.get('divIcon');
      if (divIcon != null) {
        marker.setIcon(L.divIcon(divIcon));
      } else {
        marker.setIcon(L.mapbox.marker.icon({
          'marker-color': this.get('color'),
          'marker-size': this.get('size'),
          'marker-symbol': this.get('symbol')
        }));
      }
      if (this.get('popup-title')) {
        marker.bindPopup(this.get('popup-title'), {offset: [78,5]});
      }
    }
  }),
  setup: Ember.on('didInsertElement', function() {
    var divIcon = this.get('divIcon');
    var icon = null;
    if (divIcon != null) {
      icon = L.divIcon(divIcon);
    } else {
      icon = L.mapbox.marker.icon({
        'marker-color': this.get('color'),
        'marker-size': this.get('size'),
        'marker-symbol': this.get('symbol')
      });
    }
    let marker = L.marker(this.get('coordinates'), {
      icon: icon
    });
    
    if (this.get('popup-title')) {
      marker.bindPopup(this.get('popup-title'), {offset: [78,5]});
    }
    
    marker.on('click', () => {
      this.sendAction('onclick');
    });

    marker.on('popupopen', () => {
      this.sendAction('popupopen');
    });

    marker.on('popupclose', () => {
      this.sendAction('popupclose');
    });

    this.set('marker', marker);
  }),

  teardown: Ember.on('willDestroyElement', function() {
    let marker = this.get('marker');
    let map = this.get('map');
    if (map && marker) {
      map.removeLayer(marker);
    }
  }),

  popup: Ember.on('didRender', function() {
    if (this.get('is-open')) {
      this.get('marker').openPopup();
    }
  }),
});
