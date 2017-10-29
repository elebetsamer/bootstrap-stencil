---
title: Alerts
description: Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
group: components
---

{% callout info %}
#### Component Status

<bs-badge theme="warning">Work in Progress</bs-badge>

The `bs-alert` component is under active development, and isn't fully completed yet.

It is stable and can be used, but is missing some features (like animations and events) as compared to the vanilla Bootstrap alert.
{% endcallout %}

## Examples

Alerts are available for any length of text, as well as an optional dismiss button. For styling, use one of the eight `theme` names (e.g., `success`) by setting the `theme` attribute. If a `theme` is not set, it will use the `primary` theme by default. For inline dismissal, use the [dismissible attribute](#dismissing).

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-alert theme="{{ color.name }}">
  This is a {{ color.name }} alert—check it out!
</bs-alert>
{%- endfor -%}
{% endexample %}

### Link color

To quickly provide matching colored links within any alert, the `bs-alert` component will, by default, automatically add the bootstrap `.alert-link` utility class to any links found in the content. This behavior can be disabled by setting the `process-links` attribute to `false` as shown in the first example below.

{% example html %}
<bs-alert process-links="false">
  This is an alert with <a href="#">an example link</a> that won't get the `.alert-link` class automatically added to links because `process-links="false"`.
</bs-alert>
{%- for color in site.data.theme-colors -%}
<bs-alert theme="{{ color.name }}">
  This is a {{ color.name }} alert with <a href="#">an example link</a>. Give it a click if you like.
</bs-alert>
{%- endfor -%}
{% endexample %}

### Additional content

Alerts can also contain additional HTML elements like headings, paragraphs and dividers. If you just want a simple heading, you can use the `heading` attribute to set it: `heading="Your heading!"`. This will render an `h4` tag with the `.alert-heading` class on it. You can always provide an `.alert-heading` on your own though if you prefer.

{% example html %}
<bs-alert theme="success" heading="Well done!">
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</bs-alert>
<bs-alert theme="success">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</bs-alert>
{% endexample %}

### Dismissing

{% callout info %}
#### Work in progress

There is no animation support at this time.
{% endcallout %}

Using the `dismissible` attribute, it's possible to dismiss any alert inline. You can see this in action with a live demo:

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-alert theme="{{ color.name }}" dismissible="true">
  This is a dismissible {{ color.name }} alert—check it out!
</bs-alert>
{%- endfor -%}
{% endexample %}

## JavaScript behavior

Since these are web components, there is no *framework* needed. You can just use native javascript to interact with the components.

### Methods

| Method | Description |
| --- | --- |
| `document.createElement('bs-alert')` | Creates an alert. You will need to set other properties to add content, and you will need to add it the DOM. See code example below. |
| `document.getElementById("my-alert").dismiss()` | Closes an alert by removing it from the DOM. This can be called to dismiss the alert even if it wasn't set as `dimissible`. |

#### Method examples

<div class="docs-example">
  <div id="dynamic-alerts">
    <a href="#" onclick="createAlert(event);">Create an alert</a>
  </div>
  <hr>
  <bs-alert id="methods-alert" heading="Methods Alert!">
    This is just a regular `bs-alert` element, which is just like any other html element.
  </bs-alert>
  <a href="#" onclick="dismissMethodsAlert(event);">Dismiss "Methods Alert"</a>
</div>

```html
<div id="dynamic-alerts">
  <a href="#" onclick="createAlert(event);">Create an alert</a>
</div>
<hr>
<bs-alert id="methods-alert" heading="Methods Alert!">
  This is just a regular `bs-alert` element, which is just like any other html element.
</bs-alert>
<a href="#" onclick="dismissMethodsAlert(event);">Dismiss "Methods Alert"</a>
<script>
  function createAlert(event) {
    event.preventDefault();

    var container = document.getElementById('dynamic-alerts');
    var alertEl = document.createElement('bs-alert');

    alertEl.innerHTML = '<p>I am a new alert that was created dynamically.</p>';
    alertEl.dismissible = true;
    alertEl.theme = 'info';

    container.appendChild(alertEl);
  }

  function dismissMethodsAlert(event) {
    var alertEl = document.getElementById("methods-alert");

    event.preventDefault();

    if (!alertEl) {
      return;
    }

    alertEl.dismiss();
  }
</script>
```

### Properties

| Property | Description |
| --- | --- |
| `document.getElementById("my-alert").dismissible = false` | Changes an alert to not be dismissible |
| `document.getElementById("my-alert").dismissible = true` | Changes an alert to be dismissible |
| `document.getElementById("my-alert").theme = 'danger'` | Changes the theme for an alert |

#### Property examples

<div class="docs-example">
  <bs-alert id="properties-alert" heading="Properties Alert!">
    This is just a regular `bs-alert` element, which is just like any other html element.
  </bs-alert>
  <a href="#" onclick="togglePropertiesAlertDismissible(event);">Change `dismissible` on "Properties Alert"</a>
  <br>
  <a href="#" onclick="changePropertiesAlertTheme(event);">Change "Properties Alert" theme</a>
</div>

```html
<bs-alert id="properties-alert" heading="Properties Alert!">
  This is just a regular `bs-alert` element, which is just like any other html element.
</bs-alert>
<a href="#" onclick="togglePropertiesAlertDismissible(event);">Change `dismissible` on "Properties Alert"</a>
<br>
<a href="#" onclick="changePropertiesAlertTheme(event);">Change "Properties Alert" theme</a>
<script>
  function changePropertiesAlertTheme(event) {
    var alertEl = document.getElementById("properties-alert");

    event.preventDefault();

    if (!alertEl) {
      return;
    }

    switch (alertEl.theme) {
      case 'primary':
        alertEl.theme = 'secondary';
        break;
      case 'secondary':
        alertEl.theme = 'success';
        break;
      case 'success':
        alertEl.theme = 'danger';
        break;
      case 'danger':
        alertEl.theme = 'warning';
        break;
      case 'warning':
        alertEl.theme = 'info';
        break;
      case 'info':
        alertEl.theme = 'light';
        break;
      case 'light':
        alertEl.theme = 'dark';
        break;
      case 'dark':
        alertEl.theme = 'primary';
        break;
    }
  }

  function togglePropertiesAlertDismissible(event) {
    var alertEl = document.getElementById("properties-alert");

    event.preventDefault();

    if (!alertEl) {
      return;
    }

    alertEl.dismissible = !alertEl.dismissible;
  }
</script>
```

### Events

There are currently no events generated by the `bs-alert` component. But events may be added in the future.