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

function changePropertiesAlertTheme(event) {
  event.preventDefault();

  changeElementTheme("properties-alert");
}

function changePropertiesBadgeTheme(event) {
  event.preventDefault();

  changeElementTheme("properties-badge");
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

function togglePropertiesBadgeUrl(event) {
  var badgeEl = document.getElementById("properties-badge");

  event.preventDefault();

  if (!badgeEl) {
    return;
  }

  if (badgeEl.url) {
    badgeEl.url = '';
  } else {
    badgeEl.url = '#';
  }
}
