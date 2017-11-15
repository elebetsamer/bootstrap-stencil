---
title: Badges (bs-badge)
description: Documentation and examples for badges, our small count and labeling component.
group: components
toc: true
---

{% callout info %}
#### Component Status

<bs-badge theme="warning">Work in Progress</bs-badge>

The `bs-badge` component is under active development, and isn't fully completed yet.

It is stable and can be used, but may have some bugs.
{% endcallout %}

## Example

Badges scale to match the size of the immediate parent element by using relative font sizing and `em` units.

{% example html %}
<h1>Example heading <bs-badge theme="secondary">New</bs-badge></h1>
<h2>Example heading <bs-badge theme="secondary">New</bs-badge></h2>
<h3>Example heading <bs-badge theme="secondary">New</bs-badge></h3>
<h4>Example heading <bs-badge theme="secondary">New</bs-badge></h4>
<h5>Example heading <bs-badge theme="secondary">New</bs-badge></h5>
<h6>Example heading <bs-badge theme="secondary">New</bs-badge></h6>
{% endexample %}

Badges can be used as part of links or buttons to provide a counter.

{% example html %}
<button type="button" class="btn btn-primary">
  Notifications <bs-badge theme="light">4</bs-badge>
</button>
{% endexample %}

Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.

Unless the context is clear (as with the "Notifications" example, where it is understood that the "4" is the number of notifications), consider including additional context with a visually hidden piece of additional text.

{% example html %}
<button type="button" class="btn btn-primary">
  Profile <bs-badge theme="light">9</bs-badge>
  <span class="sr-only">unread messages</span>
</button>
{% endexample %}

## Contextual variations

Add any of the below mentioned `theme` to change the appearance of a badge. If no `theme` is set, the `primary` theme will be used.

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-badge theme="{{ color.name }}">{{ color.name | capitalize }}</bs-badge>
{%- endfor -%}
{% endexample %}

## Pill badges

Use the `pill` attribute to make badges more rounded (with a larger `border-radius` and additional horizontal `padding`). Useful if you miss the badges from Bootstrap v3.

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-badge theme="{{ color.name }}" pill>{{ color.name | capitalize }}</bs-badge>
{%- endfor -%}
{% endexample %}

## Links

Use the `href` attribute to render an `<a>` element quickly provide _actionable_ badges with hover and focus states.

{% example html %}
{%- for color in site.data.theme-colors -%}
<bs-badge href="#" theme="{{ color.name }}">{{ color.name | capitalize }}</bs-badge>
{%- endfor -%}
{% endexample %}

## JavaScript behavior

Since these are web components, there is no *framework* needed. You can just use native javascript to interact with the `bs-badge` component.

### Methods

| Method | Description |
| --- | --- |
| `document.createElement('bs-badge')` | Creates a badge. You will need to set other properties to add content, and you will need to add it the DOM. See code example below. |

#### Method examples

<div class="docs-example">
  <div id="dynamic-badges">
    <a href="#" onclick="createBadge(event);">Create a badge</a>
  </div>
</div>

```html
<div id="dynamic-badges">
  <a href="#" onclick="createBadge(event);">Create a badge</a>
</div>
<script>
  function createBadge(event) {
    event.preventDefault();

    var container = document.getElementById('dynamic-badges');
    var badgeEl = document.createElement('bs-badge');

    badgeEl.innerHTML = 'New badge';
    badgeEl.theme = 'info';

    container.appendChild(badgeEl);
  }
</script>
```

### Properties

| Property | Description |
| --- | --- |
| `document.getElementById("properties-badge").href = ''` or `#` | If set, renders a link badge.<br><bs-badge theme="danger">Do not change on an existing instance</bs-badge> Changing this property dynamically is buggy at the moment. |
| `document.getElementById("properties-badge").pill = true` or `false` | Changes a badge to be (or not be) a pill |
| `document.getElementById("properties-badge").theme = 'danger'` | Changes the theme for a badge |

#### Property examples

<div class="docs-example">
  <bs-badge id="properties-badge">
    Properties Badge
  </bs-badge>
  <br>
  <a href="#" onclick="togglePropertiesBadgePill(event);">Change `pill` on "Properties Badge"</a>
  <br>
  <a href="#" onclick="changePropertiesBadgeTheme(event);">Change "Properties Badge" theme</a>
</div>

```html
<bs-badge id="properties-badge">
  Properties Badge
</bs-badge>
<br>
<a href="#" onclick="togglePropertiesBadgePill(event);">Change `pill` on "Properties Badge"</a>
<br>
<a href="#" onclick="changePropertiesBadgeTheme(event);">Change "Properties Badge" theme</a>
<script>
  function changePropertiesBadgeTheme(event) {
    var badgeEl = document.getElementById("properties-badge");

    event.preventDefault();

    if (!badgeEl) {
      return;
    }

    switch (badgeEl.theme) {
      case 'primary':
        badgeEl.theme = 'secondary';
        break;
      case 'secondary':
        badgeEl.theme = 'success';
        break;
      case 'success':
        badgeEl.theme = 'danger';
        break;
      case 'danger':
        badgeEl.theme = 'warning';
        break;
      case 'warning':
        badgeEl.theme = 'info';
        break;
      case 'info':
        badgeEl.theme = 'light';
        break;
      case 'light':
        badgeEl.theme = 'dark';
        break;
      case 'dark':
        badgeEl.theme = 'primary';
        break;
    }
  }

  function togglePropertiesBadgePill(event) {
    var badgeEl = document.getElementById("properties-badge");

    event.preventDefault();

    if (!badgeEl) {
      return;
    }

    badgeEl.pill = !badgeEl.pill;
  }
</script>
```