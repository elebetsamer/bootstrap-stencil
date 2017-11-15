---
title: Breadcrumb (bs-breadcrumb)
description: Indicate the current page's location within a navigational hierarchy that automatically adds separators via CSS.
group: components
---

## Overview

Separators are automatically added in CSS through [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) and [`content`](https://developer.mozilla.org/en-US/docs/Web/CSS/content).

{% example html %}
<nav aria-label="breadcrumb">
  <bs-breadcrumb>
    <bs-breadcrumb-item active>Home</bs-breadcrumb-item>
  </bs-breadcrumb>
</nav>

<nav aria-label="breadcrumb">
  <bs-breadcrumb>
    <bs-breadcrumb-item><a href="#">Home</a></bs-breadcrumb-item>
    <bs-breadcrumb-item active>Library</bs-breadcrumb-item>
  </bs-breadcrumb>
</nav>

<nav aria-label="breadcrumb">
  <bs-breadcrumb>
    <bs-breadcrumb-item><a href="#">Home</a></bs-breadcrumb-item>
    <bs-breadcrumb-item><a href="#">Library</a></bs-breadcrumb-item>
    <bs-breadcrumb-item active>Data</bs-breadcrumb-item>
  </bs-breadcrumb>
</nav>
{% endexample %}

## Accessibility

Since breadcrumbs provide a navigation, it's a good idea to add a meaningful label such as `aria-label="breadcrumb"` to describe the type of navigation provided in the `<nav>` element, as well as applying an `aria-current="page"` to the last item of the set to indicate that it represents the current page. The `aria-current="page"` attribute is added for you automatically based on the `active` property.

For more information, see the [WAI-ARIA Authoring Practices for the breadcrumb pattern](https://www.w3.org/TR/wai-aria-practices/#breadcrumb).
