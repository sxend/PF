
export module DomUtil {
  'use strict';
  export function createScriptElement(src: string = "") {
    var script = document.createElement('script');
    if (src) {
      script.src = src;
    }
    script.async = true;
    return script;
  }
}
