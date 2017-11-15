function createAlert(event) {
  event.preventDefault();

  var container = document.getElementById('dynamic-alerts');
  var alertEl = document.createElement('bs-alert');

  alertEl.innerHTML = '<p>I am a new alert that was created dynamically.</p>';
  alertEl.dismissible = true;
  alertEl.theme = 'info';

  container.appendChild(alertEl);
}

function createBadge(event) {
  event.preventDefault();

  var container = document.getElementById('dynamic-badges');
  var badgeEl = document.createElement('bs-badge');

  badgeEl.innerHTML = 'New badge';
  badgeEl.theme = 'info';

  container.appendChild(badgeEl);
}

function createButton(event) {
  event.preventDefault();

  var container = document.getElementById('dynamic-buttons');
  var buttonEl = document.createElement('bs-button');

  buttonEl.innerText = 'Dynamically created button';
  buttonEl.theme = 'info';

  container.appendChild(buttonEl);
}

function changePropertiesAlertTheme(event) {
  event.preventDefault();

  changeElementTheme("properties-alert");
}

function changePropertiesBadgeTheme(event) {
  event.preventDefault();

  changeElementTheme("properties-badge");
}

function changePropertiesButtonTheme(event) {
  event.preventDefault();

  changeElementTheme("properties-button");
}

function changeElementTheme(elementId) {
  var el = document.getElementById(elementId);

  event.preventDefault();

  if (!el) {
    return;
  }

  switch (el.theme) {
    case 'primary':
      el.theme = 'secondary';
      break;
    case 'secondary':
      el.theme = 'success';
      break;
    case 'success':
      el.theme = 'danger';
      break;
    case 'danger':
      el.theme = 'warning';
      break;
    case 'warning':
      el.theme = 'info';
      break;
    case 'info':
      el.theme = 'light';
      break;
    case 'light':
      el.theme = 'dark';
      break;
    case 'dark':
      el.theme = 'primary';
      break;
  }
}

function dismissMethodsAlert(event) {
  var alertEl = document.getElementById("methods-alert");

  event.preventDefault();

  if (!alertEl) {
    return;
  }

  alertEl.dismiss();
}

function togglePropertiesAlertDismissible(event) {
  var alertEl = document.getElementById("properties-alert");

  event.preventDefault();

  if (!alertEl) {
    return;
  }

  alertEl.dismissible = !alertEl.dismissible;
}

function togglePropertiesBadgePill(event) {
  var badgeEl = document.getElementById("properties-badge");

  event.preventDefault();

  if (!badgeEl) {
    return;
  }

  badgeEl.pill = !badgeEl.pill;
}

function togglePropertiesBadgeHref(event) {
  var badgeEl = document.getElementById("properties-badge");

  event.preventDefault();

  if (!badgeEl) {
    return;
  }

  if (badgeEl.href) {
    badgeEl.href = '';
  } else {
    badgeEl.href = '#';
  }
}

function togglePropertiesButtonBlock(event) {
  var buttonEl = document.getElementById("properties-button");

  event.preventDefault();

  if (!buttonEl) {
    return;
  }

  buttonEl.block = !buttonEl.block;
}

function togglePropertiesButtonDisabled(event) {
  var buttonEl = document.getElementById("properties-button");

  event.preventDefault();

  if (!buttonEl) {
    return;
  }

  buttonEl.disabled = !buttonEl.disabled;
}

function togglePropertiesButtonHref(event) {
  var buttonEl = document.getElementById("properties-button");

  event.preventDefault();

  if (!buttonEl) {
    return;
  }

  if (buttonEl.href) {
    buttonEl.href = '';
  } else {
    buttonEl.href = '#';
  }
}

function togglePropertiesButtonOutline(event) {
  var buttonEl = document.getElementById("properties-button");

  event.preventDefault();

  if (!buttonEl) {
    return;
  }

  buttonEl.outline = !buttonEl.outline;
}

function togglePropertiesButtonSize(event) {
  var buttonEl = document.getElementById("properties-button");

  event.preventDefault();

  if (!buttonEl) {
    return;
  }

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

  if (!buttonEl) {
    return;
  }

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

  if (!buttonEl) {
    return;
  }

  if (buttonEl.value) {
    buttonEl.value = '';
  } else {
    buttonEl.value = 'Any Value';
  }
}

function togglePropertiesCarouselSlidesOnly(event) {
  var el = document.getElementById("properties-carousel");

  event.preventDefault();

  if (!el) {
    return;
  }

  el.slidesOnly = !el.slidesOnly;
}
