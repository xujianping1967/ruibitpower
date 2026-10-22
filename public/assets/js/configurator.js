/**
 * Ruibit Power — B2B sizing guide.
 * Turns a short project brief into a product-family recommendation and a
 * pre-filled RFQ link. No external dependencies.
 *
 * Sizing logic: special applications are resolved first, then a capacity-band
 * ladder picks the platform whose band contains the target energy. Bands are
 * indicative starting points, not a final design.
 */
(function () {
  const form = document.querySelector('[data-configurator]');
  const result = document.querySelector('[data-configurator-result]');
  if (!form || !result) return;

  const num = (value) => {
    const parsed = Number.parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  };

  /** Platforms the sizing ladder can return. */
  const PLATFORM = {
    powerfly: {
      family: 'PowerFly wall-mounted / ground-mounted series',
      slug: 'powerfly-hzeb-lct-10',
      band: '5.12 – 20.99 kWh per unit, parallel expansion',
      unit: 21,
      why: 'Single-phase residential storage for rooftop solar, backup, and self-consumption.',
    },
    sixultra: {
      family: 'Six Ultra BS06-S high-voltage stackable',
      slug: 'six-ultra-bs06-s-hv-stackable',
      band: '15.36 – 46.08 kWh, up to 5 parallel clusters',
      unit: 46,
      why: 'Higher-capacity residential or light-commercial storage with an IP65 / C4 enclosure and OTA upgrades.',
    },
    bs09_112: {
      family: 'BS09 112 kWh outdoor ESS (DC-coupled)',
      slug: 'loong-power-bs09-112-dp',
      band: '112 kWh DC storage per unit',
      unit: 112,
      why: 'DC-coupled cabinet for sites that already have power conversion, and for retrofits.',
    },
    honey261: {
      family: 'Honey 125 kW / 261 kWh all-in-one ESS',
      slug: 'honey-125kw-261kwh-all-in-one-ess',
      band: '125 kW / 261 kWh, liquid-cooled, IP54',
      unit: 261,
      why: 'AC-coupled all-in-one cabinet with integrated PCS and EMS — the default for C&I sites without existing conversion equipment.',
    },
    bs09_225: {
      family: 'BS09 225 kWh DC ESS',
      slug: 'loong-power-bs09-225-d',
      band: '225 kWh DC storage per unit',
      unit: 225,
      why: 'Higher energy density per cabinet for larger industrial loads, expanded by adding units.',
    },
    cabinet: {
      family: 'Honey outdoor cabinet ESS',
      slug: 'honey-wd-ecf260s-dc-outdoor',
      band: 'Cabinet-class C&I storage',
      unit: 260,
      why: 'Outdoor cabinet platform for peak shaving, time-of-use shifting, and backup power.',
    },
    sunflower: {
      family: 'Sunflower 125 kW / 261 kWh PV hybrid ESS',
      slug: 'sunflower-125kw-261kwh-pv-hybrid-ess',
      band: '125 kW / 261 kWh integrated PV + storage',
      unit: 261,
      why: 'Integrated PV, battery, PCS, and EMS for sites that generate and store on the same connection.',
    },
    container: {
      family: 'Containerized BESS',
      slug: 'dawnice-containerized-bess',
      band: 'Project-scale containerized systems',
      unit: null,
      why: 'Engineered per project for utility-scale and large distributed deployments.',
    },
  };

  const recommend = (inputs) => {
    const { application, energy, power } = inputs;

    /* Application overrides */
    if (application === 'pvhybrid') return PLATFORM.sunflower;
    if (application === 'containerized') return PLATFORM.container;
    if (application === 'ev') return PLATFORM.honey261;

    /* Residential ladder */
    if (application === 'residential') {
      if (energy === null) return PLATFORM.powerfly;
      if (energy <= PLATFORM.powerfly.unit) return PLATFORM.powerfly;
      if (energy <= PLATFORM.sixultra.unit) return PLATFORM.sixultra;
      /* Above the residential range, fall through to the C&I ladder. */
    }

    /* Commercial / industrial ladder by capacity band */
    if (energy !== null) {
      if (energy <= PLATFORM.bs09_112.unit) return PLATFORM.bs09_112;
      if (energy <= PLATFORM.honey261.unit) return PLATFORM.honey261;
      if (energy <= 450) return PLATFORM.bs09_225;
      return PLATFORM.container;
    }

    /* No energy figure: use power as a weak signal, else a general default. */
    if (power !== null) {
      if (power <= 20) return PLATFORM.powerfly;
      if (power <= 60) return PLATFORM.sixultra;
      if (power <= 150) return PLATFORM.honey261;
      if (power <= 300) return PLATFORM.cabinet;
      return PLATFORM.container;
    }

    return PLATFORM.honey261;
  };

  const readInputs = () => {
    const data = new FormData(form);
    return {
      application: String(data.get('application') || ''),
      power: num(data.get('power')),
      energy: num(data.get('energy')),
      country: String(data.get('country') || '').trim(),
      pv: num(data.get('pv')),
      backup: num(data.get('backup')),
    };
  };

  const buildSummary = (inputs) => {
    const parts = [];
    if (inputs.power !== null) parts.push(`${inputs.power} kW`);
    if (inputs.energy !== null) parts.push(`${inputs.energy} kWh`);
    if (inputs.pv !== null) parts.push(`${inputs.pv} kWp PV`);
    if (inputs.backup !== null) parts.push(`${inputs.backup} h backup`);
    if (inputs.country) parts.push(inputs.country);
    return parts.join(' · ');
  };

  const render = () => {
    const inputs = readInputs();
    if (!inputs.application) {
      result.hidden = true;
      result.textContent = '';
      return;
    }

    const platform = recommend(inputs);
    const summary = buildSummary(inputs);

    /* Tell the buyer when the target exceeds a single unit. */
    let unitNote = '';
    if (platform.unit && inputs.energy && inputs.energy > platform.unit) {
      const units = Math.ceil(inputs.energy / platform.unit);
      unitNote = `A ${inputs.energy} kWh target is above a single unit. This would typically be configured as ${units} × ${platform.family} or moved to a containerized system — confirmed in the quotation.`;
    }

    const params = new URLSearchParams();
    params.set('application', inputs.application);
    if (inputs.power !== null) params.set('power', String(inputs.power));
    if (inputs.energy !== null) params.set('energy', String(inputs.energy));
    if (inputs.country) params.set('country', inputs.country);
    if (inputs.pv !== null) params.set('pv', String(inputs.pv));
    if (inputs.backup !== null) params.set('backup', String(inputs.backup));
    params.set('recommended', platform.family);

    /* Every value below is written with textContent, never innerHTML. `country`
       is free text typed by the visitor and is echoed into the summary, so
       string-concatenated markup here would turn a typed "<img onerror=...>"
       into live DOM. Links are built with setAttribute so the query string
       cannot break out of the attribute either. */
    const node = (tag, className, text) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (text !== undefined) el.textContent = text;
      return el;
    };

    const actions = node('div', 'cfg-actions');
    const quote = node('a', 'button primary', 'Request quotation for this system');
    quote.setAttribute('href', '/contact/?' + params.toString());
    const specs = node('a', 'button secondary', 'View specifications');
    specs.setAttribute('href', '/products/' + platform.slug + '/');
    actions.append(quote, specs);

    const fragments = [
      node('p', 'cfg-eyebrow', 'Indicative starting point'),
      node('h3', 'cfg-title', platform.family),
      node('p', 'cfg-band', platform.band),
      node('p', 'cfg-why', platform.why),
    ];
    if (unitNote) fragments.push(node('p', 'cfg-unit', unitNote));
    if (summary) fragments.push(node('p', 'cfg-summary', 'Your brief: ' + summary));
    fragments.push(actions);
    fragments.push(
      node(
        'p',
        'cfg-note',
        'This is a sizing starting point, not a final design. Final configuration is confirmed against your load profile, grid rules, and site conditions.',
      ),
    );

    result.textContent = '';
    result.append(...fragments);
    result.hidden = false;
  };

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    render();
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
