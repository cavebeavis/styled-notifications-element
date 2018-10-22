import { html, LitElement } from '@polymer/lit-element/lit-element.js';


/**
 * `styled-notifications-element`
 * Polymer lit-element implementation of JamieLivingstone/Notifications
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class StyledNotificationsElement extends LitElement {
  static get properties() {
    return {
      notification: Object,
      defaultTitle: String,
      defaultMessage: String,
      defaultTheme: String,
      defaultShowDuration: Number,
      defaultCloseOnClick: Boolean,
      defaultDisplayCloseButton: Boolean,
      defaultPositionClass: String,
      defaultOnclick: Boolean,
      successColor: String,
      infoColor: String,
      warningColor: String,
      errorColor: String,
      defaultColor: String
    };
  }
  constructor() {
    super();

    //initialize property values
    this.defaultTitle = "";
    this.defaultMessage = "";
    this.defaultTheme = 'default';
    this.defaultShowDuration = 3500;
    this.defaultCloseOnClick = true;
    this.defaultDisplayCloseButton = true;
    this.defaultPositionClass = 'nfc-top-left';
    this.defaultOnclick = false;

    this.notification = {
      title: this.defaultTitle,
      message: this.defaultMessage,
      theme: this.defaultTheme,                           //['default', 'info', 'error', 'success', 'warning']
      showDuration: 0,                                    //milliseconds to display message
      closeOnClick: this.defaultCloseOnClick,
      displayCloseButton: this.defaultDisplayCloseButton,
      positionClass: this.defaultPositionClass,           //['nfc-top-left','nfc-top-middle','nfc-top-right','nfc-bottom-left','nfc-bottom-middle','nfc-bottom-right']
      onclick: this.defaultOnclick
    };

    this.successColor = '#51A351';
    this.infoColor = '#2F96B4';
    this.warningColor = '#f87400';
    this.errorColor = '#BD362F';
    this.defaultColor = '#999999';

    //load notifications.css into the main page head tag
    let styleEl = document.createElement('link');
    styleEl.setAttribute("rel", "stylesheet");
    styleEl.setAttribute("type", "text/css");
    styleEl.setAttribute("href", '../node_modules/styled-notifications/dist/notifications.css');
    document.getElementsByTagName("head")[0].appendChild(styleEl);

    //import notifications.js
    import('../node_modules/styled-notifications/dist/notifications.js');
  }

  render() {
    return html`
      <style>
        td {
          min-width: 20vw;
        }
      </style>
      <div hidden>
        <table>
          <tr>
            <td>
              <label for="title">Title:</label>
            </td>
            <td>
              <div id="title">${this.notification.title}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="message">Message:</label>
            </td>
            <td>
              <div id="message">${this.notification.message}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="theme">Theme:</label>
            </td>
            <td>
              <div id="theme">${this.notification.theme}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="showDuration">Show Duration:</label>
            </td>
            <td>
              <div id="showDuration">${this.notification.showDuration}</div>
            </td>
          </tr>
      </div>
    `;
  }
  firstUpdated() {
    let styleEl = document.createElement('style');
    styleEl.innerText = `
      :root {
        --styled-notifications-success-background: ${this.successColor};
        --styled-notifications-info-background: ${this.infoColor};
        --styled-notifications-warning-background: ${this.warningColor};
        --styled-notifications-error-background: ${this.errorColor};
        --styled-notifications-default-background: ${this.defaultColor};
      }
    `;
    document.getElementsByTagName("head")[0].appendChild(styleEl);
  }
  updated(propMap) {
    let oldValue = propMap.get('notification');
    if (typeof oldValue === 'object' || typeof oldValue === 'Object') {
      this.handleNotification();
    }
  }
  handleNotification() {
    let notification = this.notification;
    if (notification.message) {
      let doNotification = window.createNotification({
        closeOnClick: (notification.closeOnClick ? notification.closeOnClick : this.defaultCloseOnClick),
        displayCloseButton: (notification.displayCloseButton ? notification.displayCloseButton : this.defaultDisplayCloseButton),
        positionClass: (notification.positionClass ? notification.positionClass : this.defaultPositionClass),
        onclick: (notification.onclick ? notification.onclick : this.defaultOnclick),
        theme: (notification.theme ? notification.theme : this.defaultTheme),
        showDuration: (notification.showDuration ? notification.showDuration : this.defaultShowDuration)
      });

      doNotification({
        title: (notification.title ? notification.title : this.defaultTitle),
        message: notification.message
      });
    }
  }
}

window.customElements.define('styled-notifications-element', StyledNotificationsElement);
