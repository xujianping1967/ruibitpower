---
title: "kW vs kWh in Commercial Battery Storage: Power, Capacity, and Sizing Explained"
category: "Sizing"
excerpt: "The number is 0.25 hours. A 617 kW peak held for one billing interval is 154.25 kWh. The same 617 kW held for four hours is 2,468 kWh."
publishDate: "2026-09-21T10:34:22Z"
updatedDate: "2026-09-21T10:51:41Z"
seo:
  title: "kW vs kWh in Commercial Battery Storage"
featuredImage: "/assets/images/blog/kw-vs-kwh-in-commercial-battery-storage-power-capacity-and-sizing-explained/1_36.jpg"
relatedProducts:
  - "loong-power-bs09-112-dp"
  - "honey-125kw-261kwh-all-in-one-ess"
---

<p>The number is 0.25 hours. A 617 kW peak held for one billing interval is 154.25 kWh. The same 617 kW held for four hours is 2,468 kWh. Nothing about the battery changes between those two cases. The clock does. Commercial battery storage is not sold in two units that describe two products; kW and kWh are one measurement taken over two different windows, and the length of the window is written into the tariff.</p>

<h2>Where 0.25 hours comes from</h2>
<p>Demand is billed on average power inside a fixed interval, most often fifteen minutes. A four-minute spike averages away. A fourteen-minute overload does not.</p>
<ul>
<li>kW is a rate: how fast energy moves.</li>
<li>kWh is an amount: how much moved.</li>
<li>Time is the exchange rate between them, and in a commercial tariff the exchange rate is 0.25 h.</li>
<li>C-rate is power divided by energy: kW divided by kWh.</li>
</ul>
<p>Buyers treat the pair as two independent product attributes and compare quotations one at a time. Suppliers learn to bid that way. The market then quotes a "cost per kWh" for systems whose cost is driven by kilowatts, and attaches 2,468 kWh of battery to a 617 kW peak because four hours sounds familiar.</p>
<h2>What the interval does to the specification</h2>
<p>Hold one peak for different periods and the equipment list rewrites itself.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Peak held for</th>
<th>Energy at the meter</th>
<th>Battery-side energy at 0.94</th>
<th>Implied C-rate</th>
<th>Verdict for continuous LFP</th>
</tr>
</thead>
<tbody>
<tr>
<td>15 min, 1 interval</td>
<td>154.25 kWh</td>
<td>164.1 kWh</td>
<td>3.76C</td>
<td>not sold at this rate</td>
</tr>
<tr>
<td>45 min, 3 intervals</td>
<td>462.75 kWh</td>
<td>492.3 kWh</td>
<td>1.25C</td>
<td>above the continuous band of most cabinets</td>
</tr>
<tr>
<td>2 h, 8 intervals</td>
<td>1,234 kWh</td>
<td>1,312.8 kWh</td>
<td>0.47C</td>
<td>inside the continuous band</td>
</tr>
<tr>
<td>4 h, 16 intervals</td>
<td>2,468 kWh</td>
<td>2,625.5 kWh</td>
<td>0.23C</td>
<td>oversized for a demand-charge job</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><strong>Conditions and assumptions:</strong> the 617 kW peak and the 0.94 discharge path are illustrative values chosen to make the arithmetic traceable, not a customer project. Energy figures are rated values on the battery side. The 0.5C continuous band is a design convention for C&amp;I LiFePO4 cabinets, not a warranty term.</p>
<p>Read the table down the C-rate column, and the familiar two-hour system stops looking like a habit. At 617 kW a two-hour battery runs at 0.47C, which is close to the continuous band most cabinets are built for. The two-hour duration is not a market convention borrowed from utility practice. It is the C-rate limit written as a duration.</p>
<ul>
<li>Energy at the meter for 45 minutes: 617 x 0.75 = 462.75 kWh</li>
<li>Battery-side energy: 462.75 / 0.94 = 492.3 kWh</li>
<li>C-rate on a 1,312.8 kWh pack: 617 / 1,312.8 = 0.47C</li>
<li>Full-power duration of that pack: 1,312.8 / 617 = 2.13 h</li>
</ul>
<h2>What each unit buys, and where the two meet in equipment</h2>
<p><img src="/assets/images/blog/kw-vs-kwh-in-commercial-battery-storage-power-capacity-and-sizing-explained/1_66.jpg" alt="kW vs kWh in Commercial Battery Storage: Power, Capacity, and Sizing Explained" width="400" height="400" loading="lazy" decoding="async"></p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Unit</th>
<th>What it fixes</th>
<th>What it does not fix</th>
</tr>
</thead>
<tbody>
<tr>
<td>kW</td>
<td>PCS rating and count, breaker and cable ratings, transformer loading, protection and harmonic studies, cooling duty at full power, the demand-charge outcome</td>
<td>how long the site can run on the stored energy</td>
</tr>
<tr>
<td>kWh</td>
<td>cell and module count, cabinet count, footprint, weight and floor loading, fire separation, duration at any given power, daily throughput ceiling, augmentation schedule</td>
<td>the peak the site can shave</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p>Two devices make the split obvious. An inverter is rated in kW only. A battery is rated in kWh only. A cabinet carries both, and the ratio between the two numbers is its duration.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Configuration</th>
<th>Power</th>
<th>Energy</th>
<th>Duration</th>
</tr>
</thead>
<tbody>
<tr>
<td>125 kW all-in-one cabinet</td>
<td>125 kW AC</td>
<td>265.267 kWh rated, 238.74 kWh usable at 90% DoD</td>
<td>2.12 h rated, 1.91 h usable</td>
</tr>
<tr>
<td>100 kW liquid-cooled all-in-one</td>
<td>100 kW</td>
<td>215 kWh rated</td>
<td>2.15 h</td>
</tr>
<tr>
<td>Three-phase hybrid inverter</td>
<td>30-70 kW</td>
<td>no energy rating</td>
<td>not applicable</td>
</tr>
<tr>
<td>1 MW container system</td>
<td>1 MW</td>
<td>2 MWh</td>
<td>2.0 h</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Figures are quoted from the published product specifications; confirm against the current datasheet before specifying.</em></p>
<p>Two installed projects show the same pairing. A 1 MW / 2 MWh containerized system for a Dutch industrial park, completed in May 2026, and a 100 kW / 200 kWh peak-shaving system in Switzerland, completed the same month, are both two-hour designs. Neither was sized on the peak alone. Both were delivered by Ruibit Energy as an authorized distributor of Dawnice Energy (project record, project record).</p>
<h2>What the interval does not tell you</h2>
<p>It does not tell you what you can buy. The fifteen-minute case implies 3.76C, and no commercial cabinet is sold at that rate. The interval sets a floor on energy, not a ceiling, and the floor is higher than the arithmetic suggests.</p>
<p>It does not tell you the connection limit. Discharging 617 kW while the site draws 300 kW pushes 917 kW through a transformer that was sized years earlier. When the connection is the binding constraint, the kilowatts are capped and the kilowatt-hours have to carry the job alone.</p>
<p>It does not cover backup. A reserve locked at 30% SoC is unavailable for peak shaving, and the two duties rarely peak in the same hour.</p>
<p>It does not survive degradation. The cabinet that delivers 617 kW in year one is not the same cabinet in year ten, and the warranty figure is the one that decides whether the peak still gets shaved.</p>
<h2>When the number changes</h2>
<p>If the peak is held for two hours instead of 45 minutes, the energy duty rises to 1,234 kWh and the design stops being power-led. Cabinet count then follows the duty cycle rather than the peak.</p>
<p>If the site runs a second shift at high load, the peak becomes a plateau and the fifteen-minute window stops being the binding constraint.</p>
<p>If the tariff moves its demand window from fifteen minutes to thirty minutes or an hour, every kilowatt-hour figure above changes, and the equipment list changes with it.</p>
<p>If the site adds EV chargers, the new demand lands in a season where the interval data has no history. Until it is measured, the interval average will understate the peak.</p>
<p>If the tariff carries a ratchet clause, the interval that mattered in August prices eleven more months, which is why the control loop deserves more attention than the next increment of capacity.</p>
<h2>The second number to look up</h2>
<p>This article answers what the two units mean. It does not answer how much of either you need, because that depends on a number used nowhere above: the 15-minute load data itself, twelve months of it, interval by interval. Without it, 617 kW is an anecdote. With it, the peak, its duration and its seasonality all appear, and the equipment list falls out of the arithmetic rather than out of a price list.</p>
<p>Two further numbers are worth having before a quotation is written: the transformer nameplate rating, which caps the kilowatts whatever the battery can do, and the cost of an outage hour, which is the only figure that can justify paying for kilowatt-hours the tariff never asked you to buy.</p>
<p><img src="/assets/images/blog/kw-vs-kwh-in-commercial-battery-storage-power-capacity-and-sizing-explained/1_94.jpg" alt="kW vs kWh in Commercial Battery Storage: Power, Capacity, and Sizing Explained" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. Is a commercial battery priced per kW or per kWh?</strong></p>
<p>Both, and that is the source of most confusion. The PCS is priced in kW, the battery in kWh. Compare two quotations at the same duration, or the numbers describe different systems.</p>
<p><strong>2. How long can a 617 kW battery discharge?</strong></p>
<p>Duration depends on energy, not power. A 1,312.8 kWh pack holds 617 kW for about 2.1 hours. A 164 kWh pack would need 3.76C, which no commercial cabinet offers.</p>
<p><strong>3. What C-rate do commercial LFP cabinets run at?</strong></p>
<p>About 0.5C for continuous duty. That floor sets the minimum energy for a given power: 617 kW needs roughly 1,234 kWh to stay inside the band.</p>
<p><strong>4. Can a small battery shave a 15-minute peak?</strong></p>
<p>Not in practice. A 617 kW peak held for one 15-minute interval implies 3.76C, above the rate C&amp;I LiFePO4 cabinets are sold at, so the battery grows with the power.</p>
<p><strong>5. Does a higher kW rating mean a bigger battery?</strong></p>
<p>No. Power and energy are independent. A 1 MW inverter stores nothing on its own; the kWh come from the battery behind it.</p>
<p><strong>6. Why is cost per kWh a misleading comparison?</strong></p>
<p>Because in short-peak projects the cost is driven by kilowatts. Quoting per kWh hides the PCS, protection and connection work that the peak forces into the design.</p>
