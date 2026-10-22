---
title: "How to Design Solar Plus Storage for Industrial Parks: Architecture and EMS Strategy"
category: "Application"
excerpt: "Worked example. An industrial park with six tenant meters, one 1,600 kVA transformer and a 600 kWp rooftop array that has been in service for four years."
publishDate: "2026-09-21T13:30:28Z"
seo:
  title: "How to Design Solar Plus Storage for Industrial Parks"
featuredImage: "/assets/images/blog/how-to-design-solar-plus-storage-for-industrial-parks-architecture-and-ems-strategy/1_405.jpg"
relatedProducts:
  - "sunflower-125kw-261kwh-pv-hybrid-ess"
  - "dawnice-containerized-bess"
---

<p>Worked example. An industrial park with six tenant meters, one 1,600 kVA transformer and a 600 kWp rooftop array that has been in service for four years. The retrofit below is a worked example built to show how the architecture and the control strategy get decided, not a record of a delivered project.</p>

<h2>Before the retrofit: what the park was paying for</h2>
<p>The park buys electricity at one point of connection and recharges its tenants on a single blended rate per kilowatt-hour. That arrangement means the landlord collects the energy cost and absorbs everything else, and everything else included a demand charge of EUR 14.50 per kilowatt per month against a billed peak of 1,230 kW. That is EUR 17,835 a month, or EUR 214,020 a year, and it was being paid whether the park produced anything or not.</p>
<p>The rooftop array was already there and already working. It generated 690 MWh a year and 78 percent of that was consumed on site. The remaining 152 MWh left through the meter at an export value close to EUR 0.04 per kilowatt-hour, against an import price near EUR 0.16.</p>
<p>So the park had two separate leaks. One was a demand charge driven by a coincident morning peak, and the other was solar energy being given away at a quarter of what it cost to replace.</p>
<h2>The tenant that triggered the decision</h2>
<p>Nothing about the retrofit became urgent until a cold-storage operator signed a lease. Cold storage adds a load that runs at night, in summer and in winter, and it does not follow the park's existing profile. Within one billing period the park peak moved from roughly 1,050 kW to 1,230 kW, and the transformer loading crossed 75 percent at the same time.</p>
<p>That combination, a new peak and a transformer that was no longer comfortable, is the point at which a landlord stops treating the demand charge as a cost of doing business. The blended recharge rate had been set when the park's peak was 1,050 kW, and it no longer covered what the utility was charging.</p>
<h2>Three architecture choices that stop being reversible</h2>
<p>The first decision is not the battery size. It is where the battery sits relative to the tenant meters, because that choice decides who is allowed to keep the saving.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Where the battery sits</th>
<th>Who captures the demand saving</th>
<th>What it commits the park to</th>
</tr>
</thead>
<tbody>
<tr>
<td>Upstream, at the point of connection</td>
<td>the landlord, because the billed peak is the park peak</td>
<td>owning the asset, its maintenance and its performance risk</td>
</tr>
<tr>
<td>Downstream of one tenant meter</td>
<td>that tenant, on its own billed peak</td>
<td>a service relationship instead of an asset; the park peak is untouched</td>
</tr>
<tr>
<td>Split across two or three tenant boards</td>
<td>shared, in whatever proportion the tenancy agreement states</td>
<td>several control loops that must not fight each other</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p>Placing the battery upstream is what makes the demand saving the landlord's to keep. Placing it downstream of a tenant meter addresses that tenant's bill and leaves the park peak exactly where it was. Moving the battery after the fact is not a small job, because the point of connection is fixed by the incoming switchgear and the metering arrangement is fixed by the tenancy agreements in force.</p>
<p>The second choice is the coupling. The array is four years old and AC-coupled, with its own string inverters that are working. If the array is already AC-coupled with serviceable string inverters, DC-coupling the new battery means scrapping equipment that still has a decade of service left, and the cost lands on the wrong side of the retrofit ledger. The battery therefore takes its own power conversion system and the two systems meet on the AC bus.</p>
<p>The third choice is the charging window. A battery that charges overnight adds load at the hours when the park is quiet, which is usually welcome, but it changes the transformer loading profile and therefore the protection study. That study has to be re-run before the battery is commissioned, not after, because the settings it produces are what the relay is configured with.</p>
<h2>The EMS strategy, in priority order</h2>
<p>The control loop has to read the utility meter at the point of connection. A loop that reads the battery's own current transformers is regulating a number that nobody bills, and the difference between that number and the billed figure is exactly where demand charges are lost.</p>
<p>Above that, the site needs a priority order rather than a wish list, because two of the four duties in a solar plus storage park compete for the same stored energy.</p>
<ul>
<li>Demand control first: hold the park below 900 kW with a 30 kW deadband, evaluated as a rolling 15-minute average to match the utility's own demand window. If the demand ratchet resets annually, one uncontrolled peak in January sets the billing demand for the remaining eleven months.</li>
<li>Solar self-consumption second: absorb the midday surplus instead of exporting it at EUR 0.04 per kilowatt-hour.</li>
<li>Time-of-use arbitrage third: charge in the cheap window and discharge in the expensive one, within whatever headroom demand control leaves.</li>
<li>Backup reserve last, and only if it is declared before sizing.</li>
</ul>
<p>The conflict is structural. Peak control wants the battery full at 08:00, ready for the morning coincident peak. Solar self-consumption wants the battery empty at 11:00 so the array has somewhere to put its output. If both targets are expected at 1,000 kWh without a stated priority, the site will get whichever behaviour the firmware happened to be tuned for, and the shortfall will appear in one of the two columns rather than in the other.</p>
<p><img src="/assets/images/blog/how-to-design-solar-plus-storage-for-industrial-parks-architecture-and-ems-strategy/1_128.jpg" alt="How to Design Solar Plus Storage for Industrial Parks: Architecture and EMS Strategy" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>After the retrofit: what actually changed</h2>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Measure</th>
<th>Before</th>
<th>After</th>
</tr>
</thead>
<tbody>
<tr>
<td>Park peak demand</td>
<td>1,230 kW</td>
<td>900 kW</td>
</tr>
<tr>
<td>Monthly demand charge at EUR 14.50 per kW</td>
<td>EUR 17,835</td>
<td>EUR 13,050</td>
</tr>
<tr>
<td>Annual demand charge</td>
<td>EUR 214,020</td>
<td>EUR 156,600</td>
</tr>
<tr>
<td>Solar self-consumption</td>
<td>78 percent</td>
<td>94 percent</td>
</tr>
<tr>
<td>Solar energy exported</td>
<td>152 MWh</td>
<td>41 MWh</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p>Two lines produce almost all of the benefit. The demand line falls by EUR 57,420 a year, and the export line recovers the 111 MWh that used to leave the site, worth EUR 13,320 a year at a 12 cent gap between import and export price. Together that is EUR 70,740 a year.</p>
<p>One condition sits underneath that second number. If the tenants were billed on their own maximum demand rather than on kilowatt-hours, part of the demand saving would have been returned to them rather than staying with the park, and the payback would have moved accordingly. Interval data is what makes this comparison checkable at all, and no datasheet substitutes for it, including the ones Ruibit publishes for its container units.</p>
<h2>What the retrofit cost, and what it added to the workload</h2>
<p>The installed cost of 500 kW and 1,000 kWh, including the pad, the low-voltage interface and the control integration, was EUR 420,000. Against EUR 70,740 a year that is a simple payback of 5.9 years, and the honest version of that figure carries the four items that never appear in the benefit column.</p>
<p>Monthly thermal and filter checks joined a maintenance schedule that previously had nothing more complicated than a roof drain to inspect, and a spare-parts holding decision came with them. The pad and the crane access now occupy yard space the park had earmarked for parking. The control strategy has to be re-tuned whenever a tenancy changes, because a new load profile invalidates the peak assumption the targets were built on. And the blended recharge rate, which is what let the park keep the demand saving in the first place, is a commercial arrangement that can be renegotiated by the next tenant.</p>
<p>That last point is the one worth stating plainly. The retrofit did not remove a cost; it moved the cost from a utility invoice into an asset that has to be managed. Normalising any competing proposal means comparing it on the point of connection, the metering arrangement and the owner of the saving, because two schemes of the same 1,000 kWh with different placement are not the same project.</p>
<h2>Questions to settle before the design is frozen</h2>
<p>Ask which meter the control loop reads, and whether it is the meter the utility bills on. The answer that the loop uses the battery's own current transformers describes a system that will hold the battery's terminal power steady while the billed peak drifts.</p>
<p>Ask what demand window the utility bills on and how the control strategy averages across it. An instantaneous peak limiter presented as demand control will miss a 15-minute average by a margin that shows up once a month.</p>
<p>Ask who owns the interval data and the control configuration after handover. An answer that the data lives in the supplier's cloud means the next tenancy change cannot be tuned without the supplier in the room.</p>
<p><img src="/assets/images/blog/how-to-design-solar-plus-storage-for-industrial-parks-architecture-and-ems-strategy/1_172.jpg" alt="How to Design Solar Plus Storage for Industrial Parks: Architecture and EMS Strategy" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. Where should the battery be placed in an industrial park?</strong></p>
<p>Upstream, at the point of connection the utility bills on. Placement decides who keeps the demand saving. A battery behind one tenant meter reduces that tenant's billed peak and leaves the park peak unchanged.</p>
<p><strong>2. Why does the EMS need a priority order?</strong></p>
<p>Because peak control and solar self-consumption compete for the same stored energy. Peak control wants the battery full at 08:00; solar absorption wants it empty at 11:00. Without a stated order, the site gets whichever behaviour the firmware was tuned for.</p>
<p><strong>3. What demand window should the control loop use?</strong></p>
<p>The same window the utility bills on, typically a rolling 15-minute average, with a deadband of 20 to 30 kW. An instantaneous limiter presented as demand control will miss a 15-minute average.</p>
<p><strong>4. Can solar plus storage cut an industrial park's demand charge?</strong></p>
<p>It can, but only when the battery sits at the metered point of connection. In the worked example here the billed peak fell from 1,230 kW to 900 kW, cutting the annual demand charge from EUR 214,020 to EUR 156,600.</p>
<p><strong>5. Should a new battery be DC-coupled to an existing array?</strong></p>
<p>Usually not if the array is already AC-coupled with serviceable inverters. DC-coupling means replacing working equipment, so the battery takes its own conversion system and the two meet on the AC bus.</p>
<p><strong>6. What costs does the retrofit add?</strong></p>
<p>Monthly thermal and filter checks on a schedule that had none, a spare-parts holding decision, yard space for the pad and crane access, and a control strategy that has to be re-tuned whenever a tenancy changes.</p>
