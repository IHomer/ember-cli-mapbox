import Ember from 'ember';
import layout from '../templates/components/mapbox-map';

export default Ember.Component.extend({
  classNameBindings: ['recenter', 'resize'],
  layout: layout,
  divId: 'map',
  mapId: null,
  
  recenter: Ember.computed('center', function() {
    var map = this.get('map');
    var center = this.get('center');
    if (typeof(map) != 'undefined' && center != null) {
      map.setView(center, this.get('zoom'));
      return true;
    } else {
      return false;
    }
  }),
  resize: Ember.computed('resize', function() {
    var map = this.get('map');
    if (typeof(map) != 'undefined') {
      map.invalidateSize();
      return true;
    } else {
      return false;
    }
  }),
  setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function () {
      let map = L.mapbox.map(this.get('divId'), this.get('mapId'));

      if (this.get('center') && this.get('zoom')) {
        map.setView(this.get('center'), this.get('zoom'));
      }
      this.set('map', map);
    });
  }),
});
