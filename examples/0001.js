(function() {
  var templates = {
    "0001": "<div data-template-id='0001'>{text}</div>",
    "0002": "<div data-template-id='0002'>{text}</div>"
  }
  PF.ready(function() {
    let areas = [].slice.call(document.querySelectorAll('[data-pf-render-area]'));
    var configs = areas.map(area => {
      return {
        id: area.getAttribute('data-pf-render-id'),
        area: area,
        template: templates[area.getAttribute('data-pf-render-id')]
      };
    });
    PF.main(configs);
  });
})();
