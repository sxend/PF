import Context from "./context";
import {main} from "./main";

export module PF {
  'use strict';
  export function register(config: any): void {
    main(new Context(config));
  }
}
