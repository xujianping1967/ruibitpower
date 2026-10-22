---
title: "Thermal Runaway in LiFePO4 BESS: Causes, Propagation, and Mitigation"
category: "Safety"
excerpt: "A cell on its way into thermal runaway gives off gas for minutes before anything measurable happens to its surface temperature."
publishDate: "2026-09-13T16:25:11Z"
updatedDate: "2026-09-24T01:22:51Z"
seo:
  title: "Thermal Runaway in LiFePO4 BESS"
featuredImage: "/assets/images/blog/thermal-runaway-in-lifepo4-bess-causes-propagation-and-mitigation/1_275.jpg"
relatedProducts:
  - "loong-power-bs09-225-d"
  - "honey-wd-ecf260s-dc-outdoor"
---

<p>A cell on its way into thermal runaway gives off gas for minutes before anything measurable happens to its surface temperature. Most alarm sequences run the other way round, which is why the useful question is not whether a container has a suppression cylinder in it. It is which signal arrives first, and how much time that signal buys.</p>

<h2>What the cell does before anything detects it</h2>
<p>Three things start the reaction, and only one of them is a mistake by the operator.</p>
<p>An internal short from a manufacturing defect comes first. A metal particle, a fold in the separator or a misaligned electrode creates a local resistance inside the cell, and the heat it produces widens the defect that produced it. Cell voltage stays inside its normal band through this stage, which is the difficulty: the parameter a battery management system watches most closely moves last.</p>
<p>Electrical overstress is second. Charging above the cell's upper voltage limit, or forcing current through a deeply discharged cell, plates lithium onto the anode and decomposes the electrolyte. A working battery management system prevents this, so an overstress event is also a record of a fault or a calibration drift.</p>
<p>Mechanical and thermal abuse is third, and the only cause a site can usually trace to an event: impact, crush, or a blocked cooling path.</p>
<p>Published thermal-abuse work puts the heat-release onset of a full-charge LFP cell in the 180 to 250 degree Celsius band, with peak heating between 210 and 360 degrees. Those figures sit far above any operating range, but not above what a local short produces inside the cell, which is why the onset number is often quoted as if it were a safety margin. It is not one.</p>
<h2>The timeline, with the published time figures attached</h2>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Stage after the internal short</th>
<th>Published time figure</th>
<th>What detects it</th>
</tr>
</thead>
<tbody>
<tr>
<td>T+0, the internal short forms</td>
<td>none exists for this stage</td>
<td>nothing outside the cell</td>
</tr>
<tr>
<td>Off-gas begins</td>
<td>5 to 20 minutes before full runaway</td>
<td>hydrogen, carbon monoxide and electrolyte vapour, by a gas sensor</td>
</tr>
<tr>
<td>Visible smoke</td>
<td>up to 22 minutes after the first off-gas</td>
<td>smoke or enclosure overpressure, by smoke detection or a pneumatic tube</td>
</tr>
<tr>
<td>Cell surface temperature reaches the BMS threshold</td>
<td>after the gas, not before it</td>
<td>temperature at the module tap point, by the BMS</td>
</tr>
<tr>
<td>Propagation to the next module</td>
<td>minutes, when the boundary fails</td>
<td>heat flux and neighbour temperature</td>
</tr>
<tr>
<td>Suppression acts</td>
<td>under 500 milliseconds once triggered</td>
<td>aerosol and water mist, or FM200 and NOVEC1230</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Source: off-gas window from FM Global's published guidance on off-gas detection; the 22 minute figure from third-party testing reported in 2026; the response time from the published specification for the 125 kW cabinet.</em></p>
<p>The ordering is the finding: gas arrives first, smoke second, and the cell surface temperature most alarms depend on arrives after both. One overcharge study of an energy storage cabin recorded a top-mounted hydrogen detector warning 145 seconds before runaway, a shorter warning than the published window because the sensor sat at the top of the volume rather than in the exhaust path.</p>
<h2>Which step could have arrived earlier</h2>
<p>Everything above depends on where the detector sits.</p>
<p>A sensor on the enclosure wall reads a diluted sample of whatever has diffused across the volume; the same sensor in the exhaust duct above the modules reads the gas while it is still concentrated. The published window is measured from the point of detection, so placement decides how much of it a site receives.</p>
<p>The second step that could move earlier is the temperature alarm. A battery management system reads temperature at a handful of tap points on a module, so a single cell's hotspot must conduct into a large block of metal before it appears anywhere. That is not a defect in the monitoring but a statement about what a temperature sensor can see, and it is why a system warned only by a temperature threshold relies on the last signal in the sequence.</p>
<h2>What stops the event at the module boundary</h2>
<p>Once one cell's case opens, the question is whether the next module is heated by it. Separation and thermal barriers slow the heat transfer, compartment separation keeps the source away from equipment that has to keep working, and suppression removes heat from the volume rather than from the cell.</p>
<p>Ruibit's published safety wording for the 20GP container names two of these as checkable facts: FM200 or NOVEC1230 automatic extinguishing inside the container, and thermal isolation between the electrical compartment and the battery compartment.</p>
<p>For the 125 kW cabinet, the published response figure for the dual suppression is under 500 milliseconds, with the two agents named as aerosol at cluster level and water mist at cabin level. A response time is only as useful as its trigger.</p>
<h2>Where the mitigation stops being a specification</h2>
<p>Two tests separate mitigation from a datasheet line.</p>
<p>If a suppression response time is quoted without the trigger it is measured from, the 500 milliseconds may run from the controller's decision rather than from the gas appearing, and the distance between those two points is the entire window above. If the sampling point is not stated as being in the exhaust path from the modules, the site has bought a detector for the room rather than for the battery.</p>
<p>Ask which trigger the response time is measured from, and whether it is the gas sensor or a temperature threshold. An answer naming only the temperature threshold has skipped the earliest signal in the sequence. Ask where the gas sample is drawn from, and whether the ducting is inside the delivered scope. An answer that the sensor sits inside the enclosure, with no sampling path, describes a detector waiting for gas to fill the space. Ask what the propagation testing covered: a cell, a module or a full container. An answer that the chemistry does not propagate has misunderstood what LFP does and does not change.</p>
<p>Three things are fixed once the container is built: the cell-level defect rate, set in a factory the buyer never sees; the compartment layout and the volume the suppression agent must fill; and the detector positions, which are set at commissioning and are the only one of the three a buyer can still influence.</p>
<h2>The step I would most want earlier</h2>
<p>If one step in the sequence could be moved forward, it is the gas sampling point, because it is the only one that acts while the event is still reversible. A temperature threshold reports an event already started inside the cell; a detector reading the exhaust path reports the same event minutes earlier. The published 5 to 20 minute window belongs only to the systems already looking in the right place.</p>
<p><img src="/assets/images/blog/thermal-runaway-in-lifepo4-bess-causes-propagation-and-mitigation/2_592.jpg" alt="Thermal Runaway in LiFePO4 BESS: Causes, Propagation, and Mitigation" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What causes thermal runaway in a LiFePO4 battery?</strong></p>
<p>Three triggers, in order of frequency: an internal short from a manufacturing defect, electrical overstress such as overcharging or reverse current, and mechanical or thermal abuse. Only the first happens during normal operation, which is why cell quality matters more than site behaviour.</p>
<p><strong>2. How much warning does off-gas detection give?</strong></p>
<p>Published guidance on off-gas detection puts the gap between first off-gas and full thermal runaway at about 5 to 20 minutes. Third-party testing reported in 2026 caught failing cells up to 22 minutes before visible smoke. One overcharge study recorded a hydrogen detector warning 145 seconds ahead, because the sensor sat at the top of the volume rather than in the exhaust path.</p>
<p><strong>3. Why does the BMS not detect it first?</strong></p>
<p>Because it reads temperature at a small number of tap points on each module, so a single cell's hotspot must conduct into a large block of metal before it registers. Gas leaves the cell earlier than heat reaches the sensor, so a system warned only by a temperature threshold relies on the last signal in the sequence.</p>
<p><strong>4. What limits propagation between modules?</strong></p>
<p>Physical separation and thermal barriers slow heat transfer, compartment separation keeps the source away from equipment that must keep working, and suppression removes heat from the volume. Published examples of the first two are FM200 or NOVEC1230 automatic extinguishing and thermal isolation between the electrical and battery compartments.</p>
<p><strong>5. What should be asked about a suppression response time?</strong></p>
<p>Which trigger it is measured from, and whether that trigger is the gas sensor or a temperature threshold. Also where the gas sample is drawn from, and whether propagation testing covered a cell, a module or a full container.</p>
