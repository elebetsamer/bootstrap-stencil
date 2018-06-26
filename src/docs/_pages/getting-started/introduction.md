---
title: Introduction
description: Get started with Bootstrap Stencil.
group: getting-started
toc: true
class: "highlight-light"
---

## Quick start

Looking to quickly add Bootstrap Stencil to your project? Check out the installation options below.

### Prerequisites

#### CSS

Currently, you will need to have the bootstrap css available in your site. The easiest way to do this is to use the Bootstrap CDN. This will likely change as this project progresses.

{% highlight html %}
<link rel="stylesheet" href="{{ site.cdn.bootstrap_css }}" integrity="{{ site.cdn.bootstrap_css_hash }}" crossorigin="anonymous">
{% endhighlight %}

#### JS

You will also currently need to have the bootstrap js (and its dependencies) available in your site. Again, this will likely change as this project progresses.

{% highlight html %}
<script src="{{ site.cdn.jquery }}" integrity="{{ site.cdn.jquery_hash }}" crossorigin="anonymous"></script>
<script src="{{ site.cdn.popper }}" integrity="{{ site.cdn.popper_hash }}" crossorigin="anonymous"></script>
<script src="{{ site.cdn.bootstrap_js }}" integrity="{{ site.cdn.bootstrap_js_hash }}" crossorigin="anonymous"></script>
{% endhighlight %}

### Use via script

This is the probably the easiest way to use Bootstrap Stencil.

Put a script tag in the head of your site.

{% highlight html %}
<script src='https://unpkg.com/bootstrap-stencil@{{ site.current_version }}/dist/bs-stencil.js'></script>
{% endhighlight %}

### Use via npm

Install the package using npm.

{% highlight sh %}
npm install bootstrap-stencil --save
{% endhighlight %}

Put a script tag in the head of your site.

{% highlight html %}
<script src='node_modules/bootstrap-stencil/dist/bs-stencil.js'></script>
{% endhighlight %}

### Use with a stencil app

Install the package using npm.

{% highlight sh %}
npm install bootstrap-stencil --save
{% endhighlight %}

Add the package to your <a href="https://stenciljs.com/docs/stencil-config" target="_blank"></a>stencil config</a> collections.

{% highlight js %}
collections: [
  { name: 'bootstrap-stencil' }
]
{% endhighlight %}