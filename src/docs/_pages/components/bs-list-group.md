---
title: List group (bs-list-group)
description: List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.
group: components
toc: true
---

## Basic example

{% example html %}
<bs-list-group>
  <bs-list-group-item>Cras justo odio</bs-list-group-item>
  <bs-list-group-item>Dapibus ac facilisis in</bs-list-group-item>
  <bs-list-group-item>Morbi leo risus</bs-list-group-item>
  <bs-list-group-item>Porta ac consectetur ac</bs-list-group-item>
  <bs-list-group-item>Vestibulum at eros</bs-list-group-item>
</bs-list-group>
{% endexample %}

## Active items

Add `active` attribute to a `bs-list-group-item` to indicate the current active selection.

{% example html %}
<bs-list-group>
  <bs-list-group-item active>Cras justo odio</bs-list-group-item>
  <bs-list-group-item>Dapibus ac facilisis in</bs-list-group-item>
  <bs-list-group-item>Morbi leo risus</bs-list-group-item>
  <bs-list-group-item>Porta ac consectetur ac</bs-list-group-item>
  <bs-list-group-item>Vestibulum at eros</bs-list-group-item>
</bs-list-group>
{% endexample %}

## Disabled items

Add `disabled` attribute to a `bs-list-group-item` to make it _appear_ disabled. Note that some elements with `disabled` will also require custom JavaScript to fully disable their click events (e.g., links).

{% example html %}
<bs-list-group>
  <bs-list-group-item disabled>Cras justo odio</bs-list-group-item>
  <bs-list-group-item>Dapibus ac facilisis in</bs-list-group-item>
  <bs-list-group-item>Morbi leo risus</bs-list-group-item>
  <bs-list-group-item>Porta ac consectetur ac</bs-list-group-item>
  <bs-list-group-item>Vestibulum at eros</bs-list-group-item>
</bs-list-group>
{% endexample %}

## Links and buttons

Use the `href` or `button` attributes to create _actionable_ list group items with hover, disabled, and active states. The `bs-list-group-item` component will automatically add the Bootstrap `.list-group-item-action` class.

{% example html %}
<bs-list-group>
  <bs-list-group-item href="#" active>Cras justo odio</bs-list-group-item>
  <bs-list-group-item href="#">Dapibus ac facilisis in</bs-list-group-item>
  <bs-list-group-item href="#">Morbi leo risus</bs-list-group-item>
  <bs-list-group-item href="#">Porta ac consectetur ac</bs-list-group-item>
  <bs-list-group-item href="#" disabled>Vestibulum at eros</bs-list-group-item>
</bs-list-group>
{% endexample %}

{% example html %}
<bs-list-group>
  <bs-list-group-item button active>Cras justo odio</bs-list-group-item>
  <bs-list-group-item button>Dapibus ac facilisis in</bs-list-group-item>
  <bs-list-group-item button>Morbi leo risus</bs-list-group-item>
  <bs-list-group-item button>Porta ac consectetur ac</bs-list-group-item>
  <bs-list-group-item button disabled>Vestibulum at eros</bs-list-group-item>
</bs-list-group>
{% endexample %}

## Contextual classes

Use `theme` attribute to style list items with a stateful background and color.

{% example html %}
<bs-list-group>
  <bs-list-group-item>Dapibus ac facilisis in</bs-list-group-item>
  {%- for color in site.data.theme-colors -%}
  <bs-list-group-item theme="{{ color.name }}">This is a {{ color.name }} list group item</bs-list-group-item>
  {%- endfor -%}
</bs-list-group>
{% endexample %}

Contextual classes also work along side the `href` attribute. Note the addition of the hover styles here not present in the previous example. Also supported is the `active` state; apply it to indicate an active selection on a contextual list group item.

{% example html %}
<bs-list-group class="list-group">
  <bs-list-group-item href="#">Dapibus ac facilisis in</bs-list-group-item>
  {%- for color in site.data.theme-colors -%}
  <bs-list-group-item href="#" theme="{{ color.name }}">This is a {{ color.name }} list group item</bs-list-group-item>
  {%- endfor -%}
</bs-list-group>
{% endexample %}

## With badges

Add badges to any list group item to show unread counts, activity, and more with the help of some [utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/).

{% example html %}
<bs-list-group>
  <bs-list-group-item class="d-flex justify-content-between align-items-center">
    Cras justo odio
    <bs-badge pill>14</bs-badge>
  </bs-list-group-item>
  <bs-list-group-item class="d-flex justify-content-between align-items-center">
    Dapibus ac facilisis in
    <bs-badge pill>2</bs-badge>
  </bs-list-group-item>
  <bs-list-group-item class="d-flex justify-content-between align-items-center">
    Morbi leo risus
    <bs-badge pill>1</bs-badge>
  </bs-list-group-item>
</bs-list-group-item>
{% endexample %}

## Custom content

Add nearly any HTML within, even for linked list groups like the one below, with the help of [flexbox utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/).

{% example html %}
<bs-list-group class="list-group">
  <bs-list-group-item href="#" class="flex-column align-items-start" active>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
  </bs-list-group-item>
  <bs-list-group-item href="#" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </bs-list-group-item>
  <bs-list-group-item href="#" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </bs-list-group-item>
</bs-list-group>
{% endexample %}
