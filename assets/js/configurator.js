const form = document.querySelector("[data-configurator]");
const result = document.querySelector("[data-configurator-result]");

const recommendations = {
  home: "Recommended starting point: 5kWh-20kWh wall-mounted or stackable Dawnice home battery with a compatible hybrid inverter.",
  commercial: "Recommended starting point: 86kWh-500kWh outdoor cabinet or all-in-one C&I ESS, depending on load profile and peak demand.",
  industrial: "Recommended starting point: 500kWh-2MWh+ liquid-cooled or containerized BESS with PCS, EMS and fire protection.",
  ev: "Recommended starting point: 100kWh-2MWh+ C&I BESS for transformer relief, peak control and solar charging support.",
  offgrid: "Recommended starting point: hybrid inverter plus battery system for homes, or outdoor cabinet/containerized BESS for remote sites."
};

if (form && result) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const application = data.get("application");
    result.textContent = recommendations[application] || "Recommended next step: share your load profile, country, solar capacity and backup target so Ruibit Power can match a suitable Dawnice-based configuration.";
    result.hidden = false;
  });
}
