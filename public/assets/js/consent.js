/* Consent gate for non-essential scripts.

   Today this site loads no analytics, no advertising and sets no cookies, so
   there is nothing to ask permission for and the banner stays hidden. It is
   built now so that adding a tracker later cannot silently bypass consent:

     <script type="text/plain" data-consent="analytics" src="..."></script>

   A script tagged that way is inert — the browser does not execute a
   text/plain script — until the visitor accepts. If any such script is present
   and no choice has been recorded, the banner appears. Without a tagged script
   the banner never appears on its own; the footer link still opens the panel so
   people can read what is stored and change a previous choice.

   The choice lives in localStorage, not a cookie, so the privacy notice's claim
   that the site sets no cookies stays true. localStorage for remembering a
   consent decision is strictly necessary and exempt from consent itself. */

(function () {
  var KEY = 'rb-consent-v1';
  var gated = Array.prototype.slice.call(
    document.querySelectorAll('script[type="text/plain"][data-consent]')
  );
  var panel = null;

  function read() {
    try {
      return JSON.parse(window.localStorage.getItem(KEY) || 'null');
    } catch (error) {
      return null;
    }
  }

  function write(value) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(value));
    } catch (error) {
      /* Private mode or storage disabled: fall back to asking again next visit. */
    }
  }

  function activateScripts() {
    gated.forEach(function (placeholder) {
      var script = document.createElement('script');
      Array.prototype.forEach.call(placeholder.attributes, function (attribute) {
        if (attribute.name !== 'type' && attribute.name !== 'data-consent') {
          script.setAttribute(attribute.name, attribute.value);
        }
      });
      script.text = placeholder.textContent;
      placeholder.parentNode.replaceChild(script, placeholder);
    });
    gated = [];
  }

  function applyChoice(choice) {
    write({ analytics: !!choice.analytics, at: new Date().toISOString() });
    if (choice.analytics) activateScripts();
    close();
  }

  function close() {
    if (!panel) return;
    var node = panel;
    panel = null;
    node.parentNode && node.parentNode.removeChild(node);
    document.documentElement.classList.remove('consent-open');
  }

  function build(text, actions) {
    var wrap = document.createElement('div');
    wrap.className = 'consent-panel';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'false');
    wrap.setAttribute('aria-labelledby', 'consent-title');
    wrap.setAttribute('aria-describedby', 'consent-body');

    var title = document.createElement('p');
    title.id = 'consent-title';
    title.className = 'consent-title';
    title.textContent = text.title;

    var body = document.createElement('p');
    body.id = 'consent-body';
    body.className = 'consent-body';
    body.innerHTML = text.body;

    var row = document.createElement('div');
    row.className = 'consent-actions';

    actions.forEach(function (action) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = action.primary ? 'btn btn-primary' : 'btn btn-secondary';
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      row.appendChild(button);
    });

    wrap.appendChild(title);
    wrap.appendChild(body);
    wrap.appendChild(row);
    return wrap;
  }

  var COPY = {
    ask: {
      title: 'Optional analytics',
      body:
        'This site runs no tracking today. We would like to load analytics to see which pages ' +
        'are useful, which sets a cookie. Nothing loads unless you agree. ' +
        '<a href="/privacy/#cookies">Read the privacy notice</a>.',
    },
    info: {
      title: 'Cookies and storage',
      body:
        'This site sets no cookies and runs no analytics. If you made a choice earlier, it is ' +
        'stored in this browser only, and you can clear it here. ' +
        '<a href="/privacy/#cookies">Read section 7 of the privacy notice</a>.',
    },
  };

  function show(mode) {
    if (panel) return;
    var stored = read();
    var actions;

    if (mode === 'ask') {
      actions = [
        { label: 'Accept analytics', primary: true, onClick: function () { applyChoice({ analytics: true }); } },
        { label: 'Essential only', onClick: function () { applyChoice({ analytics: false }); } },
      ];
    } else {
      actions = [
        {
          label: stored ? 'Clear my stored choice' : 'Close',
          primary: !stored,
          onClick: function () {
            if (stored) {
              try { window.localStorage.removeItem(KEY); } catch (error) {}
              close();
              if (gated.length) show('ask');
            } else {
              close();
            }
          },
        },
      ];
      if (stored) {
        actions.push({ label: 'Close', onClick: function () { close(); } });
      }
    }

    panel = build(COPY[mode], actions);
    document.body.appendChild(panel);
    document.documentElement.classList.add('consent-open');
    var first = panel.querySelector('button');
    first && first.focus();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && panel) close();
  });

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-consent-settings]');
    if (!trigger) return;
    event.preventDefault();
    show(gated.length ? 'ask' : 'info');
  });

  if (gated.length) {
    var stored = read();
    if (!stored) show('ask');
    else if (stored.analytics) activateScripts();
  }

  window.ruibitConsent = { open: function () { show(gated.length ? 'ask' : 'info'); } };
})();
