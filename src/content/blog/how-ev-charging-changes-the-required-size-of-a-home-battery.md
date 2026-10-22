---
title: "How EV Charging Changes the Required Size of a Home Battery"
category: "Application"
excerpt: "The published guidance for this range steps from 8-12 kWh for an average four-person home to 15-20 kWh for a high-demand home with a heat pump."
publishDate: "2026-09-25T03:15:09Z"
featuredImage: "/assets/images/blog/how-ev-charging-changes-the-required-size-of-a-home-battery/1_535.jpg"
relatedProducts:
  - "powerfly-hzeb-lct-20"
  - "dw-home-all-in-one-ess"
---

<p><strong>The published guidance for this range steps from 8-12 kWh for an average four-person home to 15-20 kWh for a high-demand home with a heat pump and an electric vehicle. The step up is real, and it is mostly not about how much energy the car needs. It is about when the car charges and how fast.</strong></p>

<h2>Two numbers arrive with the charger</h2>
<p>A Level 2 charger rated at 7 kW draws 7 kW continuously while it runs, and a two-hour session moves 14 kWh into the vehicle. The published specification for the 16 kWh wall unit states that it can support Level 2 charging at 7 kW for approximately two hours, which is the same arithmetic read from the battery side.</p>
<p>Those two figures point in different directions. The energy is small against a household's daily demand. The power is larger than the continuous output of the 10 kWh unit in the same range.</p>
<h2>The assumption that decides the answer</h2>
<p>One assumption moves the required size further than any other: whether the vehicle charges inside the battery's window or outside it.</p>
<p>Inside the window, the car charges in the evening and overnight from the battery, so the battery has to deliver the charging energy. Outside the window, the car charges from midday solar surplus or from an off-peak grid window, and the battery is bypassed. The published briefing for this range states the first case without hedging: adding an electric vehicle charger to the evening window can double the required evening energy.</p>
<p>Worked example. The figures below are all inputs to a single evening, run on a stated basis rather than taken from a monitored site.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Input or step</th>
<th>Figure</th>
<th>Basis</th>
</tr>
</thead>
<tbody>
<tr>
<td>Evening energy, household only</td>
<td>6 kWh</td>
<td>Worked assumption inside the published 8-12 kWh daily band for an average four-person home</td>
</tr>
<tr>
<td>Charger rating and session length</td>
<td>7 kW for 2 hours</td>
<td>Published Level 2 example in the 16 kWh unit's specification</td>
</tr>
<tr>
<td>Energy delivered to the vehicle</td>
<td>14 kWh</td>
<td>Arithmetic: 7 kW times 2 hours</td>
</tr>
<tr>
<td>Evening energy with the vehicle inside the window</td>
<td>20 kWh</td>
<td>Arithmetic: 6 kWh plus 14 kWh</td>
</tr>
<tr>
<td>Battery energy required for that evening</td>
<td>20 kWh before reserve and losses</td>
<td>Arithmetic, before the usable-capacity deduction</td>
</tr>
<tr>
<td>Continuous power required from the battery</td>
<td>7 kW</td>
<td>The charger's rating, if the battery is its source</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Assumptions are stated in the middle column and are this article's own. The charger rating and the two-hour session come from the published product specification, verified as of 2026-09. Units: kW is power, kWh is energy, and the energy figures are discharge requirements rather than usable capacity.</em></p>
<h2>What that does to the size of the battery</h2>
<p>Twenty kilowatt-hours for one evening is beyond every single-unit wall model in the range, including the 10 kWh unit that the published band would otherwise specify for this household. The energy step is therefore two sizes, not one.</p>
<p>The power requirement produces a separate failure. A 7 kW charger exceeds the continuous output of the 10 kWh unit, so that unit cannot serve the charger even when its stored energy would cover the session. The published figures show the crossover.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Published model</th>
<th>Published discharge current</th>
<th>Continuous output implied</th>
<th>A 7 kW charger</th>
</tr>
</thead>
<tbody>
<tr>
<td>10 kWh wall unit</td>
<td>100 A at 51.2 V nominal</td>
<td>About 5.12 kW</td>
<td>Below the charger rating</td>
</tr>
<tr>
<td>16 kWh wall unit</td>
<td>150 A at 51.2 V nominal</td>
<td>About 7.68 kW</td>
<td>Clears it, with no margin for other loads</td>
</tr>
<tr>
<td>20 kWh wall unit</td>
<td>200 A at 51.2 V nominal</td>
<td>About 10.24 kW</td>
<td>Clears it with margin</td>
</tr>
<tr>
<td>30.72 kWh high-voltage stack</td>
<td>Max power output published as 15.36 kW</td>
<td>As published</td>
<td>Clears it, and the energy step comes with it</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Voltages and currents are quoted from the published product specifications; the continuous output column is arithmetic on them and is not a tested figure. The 30.72 kWh stack publishes its power output directly. Verified as of 2026-09.</em></p>
<h2>Where the size stops changing</h2>
<p>The step disappears when the vehicle is moved out of the battery's window, and that is a scheduling decision rather than a hardware one. A car that charges from midday surplus uses the battery not at all, and the household requirement returns to the published 8-12 kWh band. The energy the battery must store is then decided by the house, not by the car.</p>
<p>This is why two homes with the same vehicle and the same daily consumption can be quoted 10 kWh and 20 kWh: they are not comparing the same system on the same basis, because one charges the car through the battery and the other does not. Ruibit publishes those bands per household profile rather than as one recommended size, which is why the charge window has to be stated before a band is applied.</p>
<h2>What changes the answer</h2>
<p>Charger rating is the first sensitivity. A 7 kW unit sits just above the 10 kWh model's ceiling and just below the 16 kWh model's, so a single step in charger rating can move the recommended model by one size while the vehicle's daily energy need stays the same. Higher-rated three-phase chargers published elsewhere in the range shift the requirement toward a three-phase all-in-one rather than a larger single-phase wall unit.</p>
<p>Session length is the second. Two hours is a partial charge. A session sized to refill a large pack adds energy in direct proportion, and the evening step grows with it.</p>
<p>The reserve setting is the third, because the battery energy in the first table is a discharge figure rather than a nameplate figure. If a fifth of the capacity is held back for outages, the nameplate number has to be larger than the discharge number.</p>
<h2>Where this calculation stops being true</h2>
<p>It stops being a sizing question and becomes an outage question if the vehicle is expected to charge while the grid is down. The charger is then a backup load at full rating, the battery must supply 7 kW continuously, and no scheduling choice removes it.</p>
<p>It also fails as written if the site's import limit caps the charger below its rating, because the charger then runs at the lower figure and the power column above no longer describes the installation. That constraint belongs to the supply, not to the battery.</p>
<p>Three things are effectively fixed once the charger is installed: the circuit and the position of the charger, the supply capacity it was sized against, and the panel partition that decides whether the charger survives an outage. All three are cheap in a proposal and expensive afterwards.</p>
<p>Two requests belong in writing before the order. Ask the supplier for the continuous discharge rating of the proposed model at the intended operating temperature, and for how long it can exceed that figure, because the charger needs a continuous rating rather than a surge claim. Ask which charge window the recommended size assumes, because a size quoted for off-peak grid charging is not valid for evening battery charging.</p>
<p>At handover, record the charge window, the charger rating, the reserve setting and the coincident peak the design was checked against. If the household later replaces the vehicle with one that charges faster, that record is what shows whether the battery was undersized or simply given a different job.</p>
<p><img src="/assets/images/blog/how-ev-charging-changes-the-required-size-of-a-home-battery/1_726.jpg" alt="How EV Charging Changes the Required Size of a Home Battery" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. Does an EV charger change how big a home battery needs to be?</strong></p>
<p>It can, and the change depends on when the car charges. If the vehicle charges from the battery in the evening, the battery has to carry the charging energy, and the published guidance for this range moves from 8-12 kWh for an average four-person home to 15-20 kWh where a heat pump and a vehicle are both present. If the car charges from midday surplus or an off-peak grid window, the battery is bypassed and the household figure stands.</p>
<p><strong>2. Why can a 10 kWh battery not charge a 7 kW electric vehicle?</strong></p>
<p>Because the limit is current rather than capacity. The published specification states a maximum discharge current of 100 A at a nominal 51.2 V, which is an arithmetic ceiling of about 5.12 kW of continuous output. A 7 kW charger exceeds that figure at any state of charge.</p>
<p><strong>3. How much energy does one charging session need?</strong></p>
<p>At 7 kW for two hours, the session moves 14 kWh into the vehicle. That is more than an entire 10 kWh wall unit and close to a full 16 kWh unit, which is why the published specification for the 16 kWh unit describes support for Level 2 charging at 7 kW for about two hours.</p>
<p><strong>4. When does EV charging leave the battery size unchanged?</strong></p>
<p>When the car charges outside the battery's window, from midday solar surplus or from the grid in an off-peak period. The energy the battery must store is then decided by the house, and the charger becomes a scheduling question.</p>
<p><strong>5. What should be asked before the charger is ordered?</strong></p>
<p>The continuous discharge rating of the proposed battery at the intended operating temperature, and how long it can exceed that figure, because the charger needs a continuous rating rather than a surge claim. Ask which charge window the recommended size assumes.</p>
