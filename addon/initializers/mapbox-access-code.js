export function initialize(instance) {
  let container = this.container;
  if (!container && instance.container) {
    container = instance.container();
  } else {
    container = instance.__container__;
  }

  let config = container.lookupFactory('config:environment');
  
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
