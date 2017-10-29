function createAlert(event) {
  event.preventDefault();

  var container = document.getElementById('dynamic-alerts');
  var alertEl = document.createElement('bs-alert');

  alertEl.innerHTML = '<p>I am a new alert that was created dynamically.</p>';
  alertEl.dismissible = true;
  alertEl.theme = 'info';

  container.appendChild(alertEl);
}

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
