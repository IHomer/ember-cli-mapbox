export function initialize(instance) {
  var container = instance.container();
  var config = container.lookupFactory('config:environment');

  if (!config.mapbox || !config.mapbox.accessToken) {
    console.error('Please specify your mapbox.accessToken in your config.');
    return;
  }

  L.mapbox.accessToken = config.mapbox.accessToken;
}

export default {
  name: 'mapbox-access-code',
  initialize: initialize,
};