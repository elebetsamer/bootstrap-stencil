---
title: Buttons (bs-button)
description: Use Bootstrap's custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
group: components
toc: true
---

{% callout info %}
#### Component Status

<bs-badge theme="warning">Work in Progress</bs-badge>

The `bs-button` component is under active development, and isn't fully completed yet.

It is stable and can be used, but may have some bugs or be missing some features.
{% endcallout %}

## Description

The `bs-button` component will render a `button` with Bootstrap classes applied to it.

## Examples

Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control. For styling, use one of the eight `theme` names (e.g., `success`) by setting the `theme` attribute. If a `theme` is not set, it will use the `primary` theme by default. In addition to the regular Bootstrap theme names, you can also set the `theme` to `link` in order get a button that looks like a link. You can use the `button-type` attribute to control the type of button that is rendered. The default button type will be `button`. This will cause a `<button type="button">` to be rendered.

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-button theme="{{ color.name }}">{{ color.name | capitalize }}</bs-button>
{%- endfor -%}
<bs-button theme="link">Link</bs-button>
{% endexample %}

## Button tags

The `bs-button` component will render a `button` by default. But depending on the attributes you pass in to it, it can also render an `<a>` element or an `<input>` element.

If you pass a value for the `value` attribute, an `<input>` element will be rendered. The `button-type` attribute will still be used to set the `type` attribute for the `input`.

If you pass a value for the `href` attribute, an `<a>` element will be rendered and the `button-type` attribute will be ignored. The `<a>` element will be rendered with a `role="button"` attribute, unless you set a value other than `button` for the `button-type` attribute. Refer to the callout below for more information about the `role="button"` attribute.

{% callout info %}
According to the Bootstrap documentation: When using button classes on `<a>` elements that are used to trigger in-page functionality (like collapsing content), rather than linking to new pages or sections within the current page, these links should be given a `role="button"` to appropriately convey their purpose to assistive technologies such as screen readers.
{% endcallout %}

{% example html %}
<bs-button href="#">Link</bs-button>
<bs-button href="#" button-type="link">Link with no "role" attribute.</bs-button>
<bs-button button-type="submit">Button</bs-button>
<bs-button value="Input"></bs-button>
<bs-button button-type="submit" value="Submit"></bs-button>
<bs-button button-type="reset" value="Reset"></bs-button>
{% endexample %}

## Outline buttons

In need of a button, but not the hefty background colors they bring? Set the `outline` attribute to `true` to remove all background images and colors on any button.

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-button outline="true" theme="{{ color.name }}">{{ color.name | capitalize }}</bs-button>
{%- endfor -%}
{% endexample %}

## Sizes

Fancy larger or smaller buttons? Set the `size` attribute to one of the Bootstrap size settings.

{% example html %}
<bs-button theme="primary" size="lg">Large button</bs-button>
<bs-button theme="secondary" size="lg">Large button</bs-button>
{% endexample %}

{% example html %}
<bs-button theme="primary" size="sm">Small button</bs-button>
<bs-button theme="secondary" size="sm">Small button</bs-button>
{% endexample %}

Create block level buttons—those that span the full width of a parent—by setting the `block` attribute to `true`.

{% example html %}
<bs-button theme="primary" size="lg" block="true">Block level button</bs-button>
<bs-button theme="secondary" size="lg" block="true">Block level button</bs-button>
{% endexample %}

## Disabled state

Make buttons look inactive by setting the `disabled="true"` boolean attribute to any `bs-button` element.

{% example html %}
<bs-button theme="primary" size="lg" disabled>Primary button</bs-button>
<bs-button theme="secondary" size="lg" disabled>Button</bs-button>
{% endexample %}

Disabled buttons using the `<a>` element behave a bit different:

- `<a>` elements don't support the `disabled` attribute, so the `.disabled` class is used to make it visually appear disabled. This is added for you automatically for `bs-button` elements with an `href` set and `disabled` set.
- Some future-friendly styles are included to disable all `pointer-events` on anchor buttons. In browsers which support that property, you won't see the disabled cursor at all.
- Disabled buttons should include the `aria-disabled="true"` attribute to indicate the state of the element to assistive technologies. This is added for you automatically based on the `disabled` attribute.

{% example html %}
<bs-button href="#" theme="primary" size="lg" disabled>Primary link</bs-button>
<bs-button href="#" theme="secondary" size="lg" disabled>Link</bs-button>
{% endexample %}

{% callout warning %}
#### Link functionality caveat

The `.disabled` class uses `pointer-events: none` to try to disable the link functionality of `<a>`s, but that CSS property is not yet standardized. In addition, even in browsers that do support `pointer-events: none`, keyboard navigation remains unaffected, meaning that sighted keyboard users and users of assistive technologies will still be able to activate these links. So to be safe, add a `tabindex="-1"` attribute on these links (to prevent them from receiving keyboard focus) and use custom JavaScript to disable their functionality.
{% endcallout %}

## JavaScript behavior

Since these are web components, there is no *framework* needed. You can just use native javascript to interact with the `bs-button` component.

### Methods

| Method | Description |
| --- | --- |
| `document.createElement('bs-button')` | Creates a button. You will need to set other properties to add content, and you will need to add it the DOM. See code example below. |

#### Method examples

<div class="docs-example">
  <div id="dynamic-buttons">
    <a href="#" onclick="createButton(event);">Create a button</a><br>
  </div>
</div>

```html
<div id="dynamic-buttons">
  <a href="#" onclick="createButton(event);">Create a button</a><br>
</div>
<script>
  function createButton(event) {
    event.preventDefault();

    var container = document.getElementById('dynamic-buttons');
    var buttonEl = document.createElement('bs-button');

    buttonEl.innerText = 'Dynamically created button';
    buttonEl.theme = 'info';

    container.appendChild(buttonEl);
  }
</script>
```

### Properties

| Property | Description |
| --- | --- |
| `document.getElementById("properties-button").block = true` or `false` | Changes a button to be (or not be) a block level button |
| `document.getElementById("properties-button").buttonType = 'button'` or `'submit'` or `'reset'` | Changes the `type` of button that is rendered |
| `document.getElementById("properties-button").disabled = true` or `false` | Changes the `disabled` state of the button |
| `document.getElementById("properties-button").href = ''` or `#` | When set, an `<a>` element will be rendered instead of a `button` |
| `document.getElementById("properties-button").outline = true` or `false` | Changes a button to be (or not be) an outline button |
| `document.getElementById("properties-button").size = 'sm'` or `'lg'` or `''` | Changes the size of the button |
| `document.getElementById("properties-button").theme = 'danger'` | Changes the theme for a button |
| `document.getElementById("properties-button").value = ''` or `Any Value` | When set, an `<input>` element will be rendered instead of a `button` |

#### Property examples

<div class="docs-example">
  <bs-button id="properties-button">This is a bs-button</bs-button>
  <br>
  <a href="#" onclick="togglePropertiesButtonBlock(event);">Change `block` on button</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonType(event);">Change `buttonType` on button</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonDisabled(event);">Change `disabled` on button</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonHref(event);">Change `href` on button</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonOutline(event);">Change `outline` on button</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonSize(event);">Change `size` on button</a>
  <br>
  <a href="#" onclick="changePropertiesButtonTheme(event);">Change button `theme`</a>
  <br>
  <a href="#" onclick="togglePropertiesButtonValue(event);">Change `value` on button</a>
</div>

```html
<bs-button id="properties-button">This is a bs-button</bs-button>
<br>
<a href="#" onclick="togglePropertiesButtonBlock(event);">Change `block` on button</a>
<br>
<a href="#" onclick="togglePropertiesButtonType(event);">Change `buttonType` on button</a>
<br>
<a href="#" onclick="togglePropertiesButtonDisabled(event);">Change `disabled` on button</a>
<br>
<a href="#" onclick="togglePropertiesButtonHref(event);">Change `href` on button</a>
<br>
<a href="#" onclick="togglePropertiesButtonOutline(event);">Change `outline` on button</a>
<br>
<a href="#" onclick="togglePropertiesButtonSize(event);">Change `size` on button</a>
<br>
<a href="#" onclick="changePropertiesButtonTheme(event);">Change button `theme`</a>
<br>
<a href="#" onclick="togglePropertiesButtonValue(event);">Change `value` on button</a>
<script>
  function togglePropertiesButtonBlock(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    buttonEl.block = !buttonEl.block;
  }

  function togglePropertiesButtonDisabled(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    buttonEl.disabled = !buttonEl.disabled;
  }

  function togglePropertiesButtonHref(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    if (buttonEl.href) {
      buttonEl.href = '';
    } else {
      buttonEl.href = '#';
    }
  }

  function togglePropertiesButtonOutline(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    buttonEl.outline = !buttonEl.outline;
  }

  function togglePropertiesButtonSize(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    if (buttonEl.size === 'sm') {
      buttonEl.size = '';
    } else if (buttonEl.size === 'lg') {
      buttonEl.size = 'sm';
    } else {
      buttonEl.size = 'lg';
    }
  }

  function togglePropertiesButtonType(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    if (buttonEl.buttonType === 'button') {
      buttonEl.buttonType = 'reset';
    } else if (buttonEl.buttonType === 'reset') {
      buttonEl.buttonType = 'submit';
    } else {
      buttonEl.buttonType = 'button';
    }
  }

  function togglePropertiesButtonValue(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    if (buttonEl.value) {
      buttonEl.value = '';
    } else {
      buttonEl.value = 'Any Value';
    }
  }

  function changePropertiesButtonTheme(event) {
    var buttonEl = document.getElementById("properties-button");

    event.preventDefault();

    switch (buttonEl.theme) {
      case 'primary':
        buttonEl.theme = 'secondary';
        break;
      case 'secondary':
        buttonEl.theme = 'success';
        break;
      case 'success':
        buttonEl.theme = 'danger';
        break;
      case 'danger':
        buttonEl.theme = 'warning';
        break;
      case 'warning':
        buttonEl.theme = 'info';
        break;
      case 'info':
        buttonEl.theme = 'light';
        break;
      case 'light':
        buttonEl.theme = 'dark';
        break;
      case 'dark':
        buttonEl.theme = 'primary';
        break;
    }
  }
</script>
```

### Events

There are currently no events generated by the `bs-button` component. But events may be added in the future.