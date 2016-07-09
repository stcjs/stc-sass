import Plugin from 'stc-plugin';
import {promisify} from 'thinkit';
import {extend} from 'stc-helper';

let sass;

export default class SassPlugin extends Plugin {
  /**
   * run
   */
  async run() {
    if( !sass ) {
      sass = require('node-sass');
      sass.render = promisify(sass.render);
    }

    let content = await this.getContent('utf-8');
    let option = this.options;
    option = extend(option, {data: content});

    try {
      content = await sass.render(option);
    } catch(e) {
      throw new Error(`[${e.status}] ${this.file.path} ${e.line}:${e.column} ${e.message}`);
    }

    return {content: content.css.toString()};
  }
  /**
   * update
   */
  update({content}) {
    this.setContent(content);
    this.file.extname = this.options.extname || 'css';
  }

  /**
   * use cluster
   */
  static cluster(){
    return true;
  }
  /**
   * use cache
   */
  static cache(){
    return true;
  }
}
