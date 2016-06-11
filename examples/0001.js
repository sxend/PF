(function() {
  var templates = {
    "0001": '<div data-template-id="0001">{text}</div>',
    "0002": '<div data-template-id="0002">{text}</div>'
  };
  PF.ready(function() {
    var areas = [].slice.call(document.querySelectorAll('[data-pf-render-area]'));
    var configs = areas.map(function(area) {
      var config = {
        id: area.getAttribute('data-pf-render-id'),
        area: area,
        template: templates[area.getAttribute('data-pf-render-id')],
        onpfcomplete: function(data) {
          console.log('onpfcomplete', config.id);
        }
      };
      return config;
    });
    PF.main({
      configs: configs
    });
  });
})();
