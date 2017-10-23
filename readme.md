![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Bootstrap Stencil

[Bootstrap](http://getbootstrap.com) is one of the most popular css frameworks around and [Stencil](https://stenciljs.com) is a compiler for building fast web apps using Web Components.

This project attempts to make use of both in order to make light weight reusable web components for the Bootstrap framework.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Project status

Note, this project is still in very early alpha and is not ready for use by anyone yet.

## Dependencies

- [Bootstrap](https://github.com/twbs/bootstrap) (v4.x.x)
- [Stencil](https://github.com/ionic-team/stencil)

## TODO

While each component has its own checklist, these are some of the bigger items that need to be done.

- [ ] Create documentation site (jekyll?)
- [ ] Isolate styles per component instead of relying on the full Bootstrap framework
- [ ] Implement javascript functionality (native javascript, not jQuery)
- [ ] Create a bs-reboot (or maybe normalize) component. This will be useful once each component has isolated styles.
- [ ] Add unit tests. Stencil now supports Jest for tests, so this should be implemented.
- [ ] Evaluate if a service worker should be used.

The lists below are meant to loosely follow the structure of the Bootstrap site.

### Bootstrap layout

- [ ] Grid (not sure if implementation needed)
- [ ] Media object
- Utilities (not needed)

### Bootstrap content

- Reboot (not needed)
- Typography (not needed)
- Code (not needed)
- [ ] Images (maybe needed for responsive image, thumbnails, rounded etc)
- [ ] Tables (maybe needed)
- [ ] Figures

### Bootstrap components

- [ ] Alerts
  - [ ] Basic implementation
  - [ ] Add `.alert-link` class to content links automatically. On by default.
  - [ ] Add *Dismissing* functionality
    - [ ] Basic dismiss implementation (WIP)
    - [ ] Animate dismissal
  - [ ] Add events
    - [ ] Add `close.bs.alert` event
    - [ ] Add `closed.bs.alert` event
  - [ ] Isolate styles
- [ ] Badge
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Pill badge
  - [ ] Link badge
- [ ] Breadcrumb
  - [ ] Basic implementation
  - [ ] Isolate styles
    - [ ] Breadcrumb Item
      - [ ] Basic implementation
- [ ] Buttons
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Button types
    - [ ] Button
    - [ ] Input button
    - [ ] Link button
    - [ ] Outline button
  - [ ] Button sizes
  - [ ] Active state
  - [ ] Disabled state
  - [ ] Button plugin (not sure if this should be implemented, but keeping this here for reference)
    - [ ] Toggle states
    - [ ] Checkbox and radio buttons
- [ ] Button group (Because of the way Bootstrap handles the btn-group styles, this is going to take some creative thinking)
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Button toolbar
  - [ ] Sizing
  - [ ] Vertical variation
- [ ] Card
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Title
  - [ ] Subtitle
  - [ ] Top image cap
  - [ ] Bottom image cap
  - [ ] Card link
  - [ ] Card header
  - [ ] Card footer
  - [ ] Border cards
  - [ ] Card Groups
  - [ ] Card Decks
  - [ ] Card Columns (Don't think we probably need to implement this)
- [ ] Carousel
  - [ ] Isolate styles
  - [ ] Slides only
  - [ ] With controls
  - [ ] With indicators
  - [ ] With captions
- [ ] Collapse
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Dropdowns
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Form
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Input group
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Jumbotron
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] List group
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Modal
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Navs
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Navbar
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Pagination
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Disabled and active states
  - [ ] Sizing
  - [ ] Alignment
- [ ] Popovers
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Progress
  - [ ] Basic implementation
  - [ ] Isolate styles
  - [ ] Labels
  - [ ] Backgrounds
  - [ ] Multiple bars (not sure about this one)
  - [ ] Striped
  - [ ] Animated stripes
- [ ] Scrollspy
  - [ ] Basic implementation
  - [ ] Isolate styles
- [ ] Tooltips
  - [ ] Basic implementation
  - [ ] Isolate styles

### Bootstrap utilities

I don't think that any of the Bootstrap utilities need to be implemented as components.


## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/stencil-component-starter.git my-web-component
cd my-web-component
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To watch for file changes during develop, run:

```bash
npm run dev
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).


## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.


## Using this component

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/my-name@0.0.1/dist/myname.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-name --save`
- Put a script tag similar to this `<script src='node_modules/my-name/dist/myname.js></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-name --save`
- Add `{ name: 'my-name' }` to your [collections](https://github.com/ionic-team/stencil-starter/blob/master/stencil.config.js#L5)
- Then you can use the element anywhere in your template, JSX, html etc
