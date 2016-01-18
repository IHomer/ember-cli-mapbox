import Ember from 'ember';
import layout from '../templates/components/mapbox-marker';

export default Ember.Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  symbol: '',
  color: '#444444',
  marker: null,
  isLoaded: Ember.computed('map', 'marker', function() {
    var map = this.get('map');
    var marker = this.get('marker');
    if (typeof(map) != 'undefined' && marker != null) {
      marker.addTo(map);
      return true;
    } else {
      return false;
    }
  }),
  setup: Ember.on('didInsertElement', function() {
    let marker = L.marker(this.get('coordinates'), {
      icon: L.mapbox.marker.icon({
        'marker-color': this.get('color'),
        'marker-size': this.get('size'),
        'marker-symbol': this.get('symbol')
      })
    });
    marker.bindPopup(this.get('popup-title'));

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
