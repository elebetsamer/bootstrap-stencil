/*
To setup, place in build/st-generate.js and add

"st-generate": "node build/st-generate.js"

To your npm scripts.

To generate a component in src/components/ run

npm run st-generate component my-component
*/

const fs = require('fs');

const capitalize = s => s.charAt(0).toUpperCase() + s.substr(1);

const av = process.argv;

const type = av[2];
const prefix = av[4] || 'bs-';
const name = `${prefix}${av[3]}`;

const componentClassName = name.replace(prefix, '').split('-').map(p => capitalize(p)).join('');

const jsTemplate = `
import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: '${name}',
  styleUrl: '${name}.scss'
})
export class ${componentClassName} {
  @Element()
  element: HTMLElement;

  componentWillLoad() {
    this.element.classList.add('${componentClassName.toLowerCase()}');
  }

  render() {
    return (<slot />);
  }
}
`

const scssTemplate = `
${name} {
  display: block;
}
`

const outPath = `src/components/${name}`;

try {
    fs.mkdirSync(outPath);
} catch(e) {
    console.error('Unable to create component')
    throw e;
}

try {
    fs.writeFileSync(`${outPath}/${name}.tsx`, jsTemplate.trim());
    fs.writeFileSync(`${outPath}/${name}.scss`, scssTemplate.trim());
} catch(e) {
    console.error('Unable to create source files');
    throw e;
}
