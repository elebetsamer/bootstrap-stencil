---
title: Button group (bs-button-group)
description: Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.
group: components
toc: true
---

## Basic example

Wrap a series of `bs-button`s in a `bs-btn-group`.

{% example html %}
<bs-button-group aria-label="Basic example">
  <bs-button theme="secondary">Left</bs-button>
  <bs-button theme="secondary">Middle</bs-button>
  <bs-button theme="secondary">Right</bs-button>
</bs-button-group>
{% endexample %}

{% callout warning %}
#### Ensure correct `role` and provide a label

In order for assistive technologies (such as screen readers) to convey that a series of buttons is grouped, an appropriate `role` attribute is **automatically** provided. For button groups, this would be `role="group"`, while toolbars would be `role="toolbar"`.

In addition, groups and toolbars should be given an explicit label, as most assistive technologies will otherwise not announce them, despite the presence of the correct role attribute. In the examples provided here, we use `aria-label`, but alternatives such as `aria-labelledby` can also be used.
{% endcallout %}

## Button toolbar

Combine sets of button groups with the `bs-button-toolbar` component for more complex components. Use utility classes as needed to space out groups, buttons, and more.

{% example html %}
<bs-button-toolbar aria-label="Toolbar with button groups">
  <bs-button-group class="mr-2" aria-label="First group">
    <bs-button theme="secondary">1</bs-button>
    <bs-button theme="secondary">2</bs-button>
    <bs-button theme="secondary">3</bs-button>
    <bs-button theme="secondary">4</bs-button>
  </bs-button-group>
  <bs-button-group class="mr-2" aria-label="Second group">
    <bs-button theme="secondary">5</bs-button>
    <bs-button theme="secondary">6</bs-button>
    <bs-button theme="secondary">7</bs-button>
  </bs-button-group>
  <bs-button-group aria-label="Third group">
    <bs-button theme="secondary">8</bs-button>
  </bs-button-group>
</bs-button-toolbar>
{% endexample %}

Feel free to mix input groups with button groups in your toolbars. Similar to the example above, you'll likely need some utilities though to space things properly.

{% example html %}
<bs-button-toolbar class="mb-3" aria-label="Toolbar with button groups">
  <bs-button-group class="mr-2" aria-label="First group">
    <bs-button theme="secondary">1</bs-button>
    <bs-button theme="secondary">2</bs-button>
    <bs-button theme="secondary">3</bs-button>
    <bs-button theme="secondary">4</bs-button>
  </bs-button-group>
  <div class="input-group">
    <span class="input-group-addon" id="btnGroupAddon">@</span>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
  </div>
</bs-button-toolbar>

<bs-button-toolbar class="justify-content-between" aria-label="Toolbar with button groups">
  <bs-button-group aria-label="First group">
    <bs-button theme="secondary">1</bs-button>
    <bs-button theme="secondary">2</bs-button>
    <bs-button theme="secondary">3</bs-button>
    <bs-button theme="secondary">4</bs-button>
  </bs-button-group>
  <div class="input-group">
    <span class="input-group-addon" id="btnGroupAddon2">@</span>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2">
  </div>
</bs-button-toolbar>
{% endexample %}

## Sizing

Instead of applying button sizing classes to every button in a group, just add `.btn-group-*` to each `.btn-group`, including each one when nesting multiple groups.

{% example html %}
<bs-button-group size="lg" aria-label="Large button group">
  <bs-button theme="secondary">Left</bs-button>
  <bs-button theme="secondary">Middle</bs-button>
  <bs-button theme="secondary">Right</bs-button>
</bs-button-group>
<br>
<bs-button-group aria-label="Default button group">
  <bs-button theme="secondary">Left</bs-button>
  <bs-button theme="secondary">Middle</bs-button>
  <bs-button theme="secondary">Right</bs-button>
</bs-button-group>
<br>
<bs-button-group size="sm" aria-label="Small button group">
  <bs-button theme="secondary">Left</bs-button>
  <bs-button theme="secondary">Middle</bs-button>
  <bs-button theme="secondary">Right</bs-button>
</bs-button-group>
{% endexample %}

## Nesting

Place a `.btn-group` within another `.btn-group` when you want dropdown menus mixed with a series of buttons.

{% example html %}
<bs-button-group aria-label="Button group with nested dropdown">
  <bs-button theme="secondary">1</bs-button>
  <bs-button theme="secondary">2</bs-button>

  <bs-button-group>
    <bs-button id="btnGroupDrop1" theme="secondary" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </bs-button>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </bs-button-group>
</bs-button-group>
{% endexample %}

## Vertical variation

Make a set of buttons appear vertically stacked rather than horizontally. **Split button dropdowns are not supported here.**

{% example html %}
<bs-button-group vertical aria-label="Vertical button group">
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
</bs-button-group>
{% endexample %}

{% example html %}
<bs-button-group vertical aria-label="Vertical button group">
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button-group>
    <bs-button id="btnGroupVerticalDrop1" theme="secondary" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </bs-button>
    <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </bs-button-group>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button theme="secondary">Button</bs-button>
  <bs-button-group>
    <bs-button id="btnGroupVerticalDrop2" theme="secondary" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </bs-button>
    <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop2">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </bs-button-group>
  <bs-button-group>
    <bs-button id="btnGroupVerticalDrop3" theme="secondary" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </bs-button>
    <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop3">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </bs-button-group>
  <bs-button-group class="btn-group" role="group">
    <bs-button id="btnGroupVerticalDrop4" theme="secondary" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </bs-button>
    <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop4">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
    </div>
  </bs-button-group>
</bs-button-group>
{% endexample %}
