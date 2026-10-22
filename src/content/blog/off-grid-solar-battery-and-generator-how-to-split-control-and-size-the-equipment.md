---
title: "Off-Grid Solar, Battery, and Generator: How to Split Control and Size the Equipment"
category: "System design"
excerpt: "An off-grid solar, battery, and generator system shares one battery bank between three sources."
publishDate: "2026-10-03T15:36:11Z"
seo:
  title: "Off-Grid Solar, Battery, and Generator"
featuredImage: "/assets/images/blog/off-grid-solar-battery-and-generator-how-to-split-control-and-size-the-equipment/1_482.jpg"
relatedProducts:
  - "dawnice-hzeb-hct-125ts-265-genset-hybrid"
  - "powerfly-hzeb-lct-20"
---

<p><strong>An off-grid solar, battery, and generator system shares one battery bank between three sources. The expensive mistake is sizing the generator before deciding which device may start it. The recharge ceiling comes from the inverter, and that ceiling, not the load list, sizes the generator.</strong></p>

<h2>The winter month sets the target, not the annual average</h2>
<p>Seasonal balance is where an off-grid design starts, because the worst month is the one the system has to survive. Take December and January for the specific site and write down the deficit: the kilowatt hours the array cannot deliver in the month with the least sun.</p>
<p>That deficit is what the battery and the generator jointly cover. A design sized on the annual average looks adequate on paper and fails in the first winter, which costs a service visit in the month the road may not be passable.</p>
<p>The gap also assigns the roles: the array supplies in bulk, the battery covers the night, and the generator covers the tail beyond the bank's autonomy.</p>
<h2>Who decides what: the four control layers</h2>
<p>The control split is a question of ownership, not wiring: four parameters each carry one decision.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Decision</th>
<th>Owned by</th>
<th>What the published page states</th>
</tr>
</thead>
<tbody>
<tr>
<td>When PV is harvested</td>
<td>Inverter MPPT</td>
<td>Built-in, 60-115 V DC PV range, max 6 kW</td>
</tr>
<tr>
<td>When charging must stop</td>
<td>Battery BMS</td>
<td>Max charge current published per model, 50 A to 200 A</td>
</tr>
<tr>
<td>When the generator starts</td>
<td>Inverter</td>
<td>AC generator input with auto-start support</td>
</tr>
<tr>
<td>How much charge flows</td>
<td>Inverter</td>
<td>Max charge current 60 A to 120 A, model dependent</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>The published specification states these figures as of 2026-10; the ownership column is this article's reading of how the four parameters interact.</em></p>
<p>The third row is the one that gets missed. Generator start is triggered by battery voltage, not by a forecast: the published page states that when battery voltage drops below a set threshold, the inverter can automatically start a generator to recharge the battery and power the loads. That makes the inverter, not the generator's own controller, the device that owns the start decision. A design that leaves the generator on its own controller ends with one decision and two owners.</p>
<h2>The recharge ceiling is the number that sizes the generator</h2>
<p>This is where off-grid budgets most often go wrong. A larger generator does not shorten the recharge time, because the charge reaching the battery passes through the inverter's charge limit; beyond it, the extra capacity has nowhere to go.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Inverter charge ceiling</th>
<th>Into the battery at 51.2 V</th>
<th>AC the source must supply</th>
</tr>
</thead>
<tbody>
<tr>
<td>60 A</td>
<td>3.07 kW</td>
<td>3.27 kW</td>
</tr>
<tr>
<td>120 A</td>
<td>6.14 kW</td>
<td>6.53 kW</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Worked example. The battery-side figures are this article's arithmetic from the published charge current range and the published nominal voltage; the AC-side column applies the published 94% peak efficiency. Both columns sit on the same basis, and no published page states a recharge time.</em></p>
<p>The generator's useful size is therefore set by the inverter's charge ceiling, not the bank. A unit below roughly 6.5 kW cannot reach the ceiling of a 120 A inverter, and one far above it adds nothing to recharge speed, though it still carries the loads.</p>
<h2>Sizing the bank from the deficit days</h2>
<p>Capacity comes from the days the property must run without sun, times the daily load, divided by the usable fraction. The published wall-mount family covers 5, 10, 16 and 20 kWh at 51.2 V nominal, with round-trip efficiency of 95% or better and cycle life published as 6,000 or 8,000 cycles at 80% depth of discharge.</p>
<p>Maximum charge and discharge current are published per model, 50 A on the 5 kWh unit through 200 A on the 20 kWh, so the limit travels with the pack rather than the bank; two paralleled 10 kWh units present a per-unit figure, not a doubled one, unless that page says otherwise. The certification list is not uniform either: the 5 kWh page lists CE, UN38.3 and IEC62619, while the larger units add UL1973. The usable capacity a site can count on follows the same published basis, not the bank total.</p>
<h2>What one year of operation changes</h2>
<p>An off-grid system is operated, not installed and forgotten. Over a year, load grows because the property gains an appliance, worst-month array output falls further than a monthly average suggests, and generator hours accumulate as fuel that must reach a remote site. Record from the first week the measured daily load, the generator start count, and the state of charge at which each start occurred.</p>
<h2>Where the published pages stop</h2>
<p>No charge-acceptance curve is published for the battery family, so the ceiling above is arithmetic rather than measured, and no page states the measurement condition behind the published charge current. The inverter's charge current and DC input are both published as ranges across the line, not per variant, so neither can be read for a specific power rating.</p>
<p>Compatibility between the off-grid inverter and the wall-mount battery family is not stated on either page. Ruibit publishes them as separate products, and both sit in a 48 V class nominal voltage, but a shared voltage class is not a compatibility statement.</p>
<p>No fuel generator is published on this site at all, so every generator figure here is a derived requirement rather than a product specification. The generator's continuous rating against its peak rating, and its behaviour when a load steps, are questions for whichever unit is chosen.</p>
<h2>What to confirm before ordering</h2>
<p>Ask for the charge current and DC input voltage of the specific inverter variant, not the range for the line, and confirm both against the battery model. Ask whether the published battery charge current applies per unit or to the paralleled bank. Ask for the generator start threshold, whether it is adjustable, and what state of charge it corresponds to. Ask which certificate covers the exact model, since the family list is not uniform.</p>
<p>Two items cannot be changed once the equipment is on site. The DC voltage class is the first, because a 24 V inverter and a 51.2 V battery are not reconciled by a setting. The generator's continuous rating is the second, because a unit too small to reach the charge ceiling runs longer at part load, and one far too large has already been paid for.</p>
<p>At handover, record the measured daily load, the generator start threshold as left set, the charge current the inverter is configured to, and the certificate scope of the model as delivered. Those four lines are what a later capacity complaint or warranty question will be compared against.</p>
<p><img src="/assets/images/blog/off-grid-solar-battery-and-generator-how-to-split-control-and-size-the-equipment/3_886.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"></p>
<p><strong>FAQs</strong><br><strong>1. Who decides when the generator starts in an off-grid system?</strong><br><br>The inverter, not the generator's own controller. The published off-grid inverter page states that when battery voltage drops below a set threshold, the inverter can automatically start a generator to recharge the battery and power the loads. Leaving the generator on its own controller gives one decision two owners.<br><br><strong>2. Does a bigger generator recharge the battery faster?</strong><br><br>Only up to the inverter's charge ceiling. A generator smaller than roughly 6.5 kW cannot reach the ceiling of a 120 A inverter, and one far larger adds nothing to recharge speed because the charge current is capped inside the inverter. A larger unit still carries the loads directly.<br><br><strong>3. How do I size the battery bank for a remote property?</strong><br><br>From the deficit days, not the annual average. Take the worst month's generation and load, find the kilowatt hours the array cannot deliver, then size the bank for the number of days the property must run without sun. The published wall-mount family runs from 5 to 20 kWh at 51.2 V.<br><br><strong>4. Does the battery's published charge current double when two units are paralleled?</strong><br><br>Do not assume it does. The charge and discharge current is published per model, 50 A on the 5 kWh unit through 200 A on the 20 kWh unit, so the figure travels with the pack rather than the bank. Ask what the page states for the configuration being ordered.<br><br><strong>5. Can I read the inverter's charge current for a specific power rating?</strong><br><br>Not from the published page. It is given as a range of 60 A to 120 A across the line, model dependent, and the DC input is the same, stated as 24 V or 48 V. Ask the supplier to confirm both for the exact variant before sizing the generator.</p>
