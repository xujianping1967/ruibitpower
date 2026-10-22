---
title: "How to Size a C&I BESS from 15-Minute Load Data: A Worked Example"
category: "System design"
excerpt: "A 15-minute interval file is the only load record that can size a commercial battery."
publishDate: "2026-09-13T07:36:29Z"
updatedDate: "2026-09-23T09:17:49Z"
seo:
  title: "How to Size a C&I BESS from 15-Minute Load Data"
featuredImage: "/assets/images/blog/how-to-size-a-c-i-bess-from-15-minute-load-data-a-worked-example/1_578.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
---

<p><strong>A 15-minute interval file is the only load record that can size a commercial battery, and the reason is not accuracy: the billing clock and the control clock run at the same resolution, so the peaks the site is charged for are the peaks the control system has to remove. What follows is one pass after another over the same spreadsheet.</strong></p>

<h2>What the interval file has to answer</h2>
<p>Five questions come out of one file, and they have to be answered in order, because each changes the next.</p>
<ul>
<li>The demand target, which comes from the tariff rather than from the load</li>
<li>The discharge power, which is the highest interval above that target</li>
<li>The discharge energy, which is the longest contiguous run above the target</li>
<li>The conversion allowance, which turns delivered energy into DC energy and then into a unit that can be ordered</li>
<li>The event count, which decides whether cycle life or load shape is the binding constraint</li>
</ul>
<p>A monthly bill answers none of them: it can show 4,180,000 kWh consumed in a year and say nothing about whether the battery holds 172 kW for twenty minutes or 60 kW for three hours.</p>
<h2>The target comes from the tariff, not from the load</h2>
<p>Worked example. The site pays EUR 14.50 per kW per month with a ratchet, and the annual peak is 812 kW in 15-minute data. The target is set at 640 kW, which removes the top 172 kW of every interval without moving more energy than the equipment can carry.</p>
<p>Set too close to the annual peak, the battery is sized by a handful of intervals. Set too far below it, the run length grows and the energy requirement grows faster than the power requirement. The target is the one input that belongs to the buyer, not to the data.</p>
<h2>The two numbers the load shape produces</h2>
<p>Power comes from a single interval: 812 kW minus the 640 kW target is 172 kW. Energy comes from the shape of the excursion, not the annual total. Here the longest run above the target is 11 consecutive intervals, two hours and forty-five minutes, holding 486 kWh above the line.</p>
<p>That distinction is where most sizing proposals go wrong: multiplying the energy above the line by a number of hours produces a battery several times larger than the site needs.</p>
<h2>From delivered energy to a unit that can be ordered</h2>
<p>The 486 kWh is energy delivered at the meter. Two conversions stand between it and an order, both stated as assumptions so they can be argued with.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Pass over the same file</th>
<th>What is read</th>
<th>What it fixes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Target</td>
<td>The demand charge and its ratchet</td>
<td>640 kW demand target</td>
</tr>
<tr>
<td>Power</td>
<td>The highest 15-minute interval, 812 kW</td>
<td>172 kW of discharge power</td>
</tr>
<tr>
<td>Energy</td>
<td>The longest run above the target, 11 intervals over 2 hours 45 minutes</td>
<td>486 kWh delivered above the line</td>
</tr>
<tr>
<td>Conversion</td>
<td>A discharge efficiency of 93.8 percent, the discharge side of an 88 percent round trip</td>
<td>518.1 kWh of DC energy</td>
</tr>
<tr>
<td>Count</td>
<td>27,400 kWh a year above the line across 62 events</td>
<td>36.7 equivalent cycles a year</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Worked example. The interval data, tariff and demand figures are illustrative. The conversion follows an 88 percent round trip stated for this class of unit, and the usable energy comes from the published specification quoted below.</em></p>
<p>Ruibit documents the 125 kW cabinet at 265.26 kWh rated against 238.74 kWh usable at 90 percent depth of discharge, which is what the conversion is checked against. Dividing 518.1 kWh by 238.74 kWh gives 2.17 units, so the order is three: 795.78 kWh rated, 716.22 kWh usable, and 375 kW of power against a requirement of 172 kW. Energy decided the order; power was over-served by the choice.</p>
<p>The resulting ratio, 795.78 kWh against 375 kW, is a little over two hours, which is where peak-shaving units tend to settle. A commercial site in Switzerland took a 100 kW and 200 kWh unit in May 2026, and a containerized unit delivered to a Dutch industrial park the same month carries 1 MW against 2 MWh.</p>
<h2>The cycle count is a check, not a target</h2>
<p>Worked example. The annual energy above the line, 27,400 kWh, becomes 29,211 kWh of DC discharge after the same conversion, which is 36.7 equivalent full cycles against the 795.78 kWh installed. Over ten years that is about 292 MWh of throughput, against a published cycle life of at least 8,000 cycles on this class of cell, so endurance is not what limits the design.</p>
<p>The count matters for another reason: it is the number to compare against the warranty throughput. A site that later adds a shift doubles its events, and the sizing has to be re-run.</p>
<h2>What this sizing does not cover</h2>
<p>It does not cover motor starting, which is an inrush problem and can require more power than the peak interval suggests. It does not cover backup or autonomy, because a battery sized to cap demand holds energy for the longest excursion, not an outage. And it does not cover the transformer and connection, which set a ceiling no battery sizing can raise.</p>
<p>Two criteria belong in the proposal. If a single excursion accounts for more than half of the annual energy above the target, the design has to be checked against that event rather than against the annual total. If the calculated duty falls below 50 equivalent cycles a year, the buyer is paying for cycle life the site will not consume, and PCS efficiency matters more than cell endurance.</p>
<h2>What to ask, and what the sizing locks in</h2>
<p>Ask what the usable energy figure in the offer is measured at. An answer of rated capacity, with no depth of discharge or measurement boundary, is not the number the pass needs.</p>
<p>Ask whether the reserve held above the depth of discharge sits in the control strategy or with the operator. An answer that the floor is adjustable means the usable energy in the proposal may not be available on site.</p>
<p>Ask how many events a year the sizing assumed, and what the control system does when the count is exceeded. An answer that the EMS takes care of it is an answer about software, not about capacity.</p>
<p>Three inputs are recorded once and cannot be reopened afterwards. The demand target agreed with the utility, and any ratchet attached to it, fix the savings basis for the year they are set in. The connection and transformer capacity fix the ceiling on power that can be added later. And the design year of interval data fixes the whole sizing, which is why a mild year produces a battery that spends the next summer above its target.</p>
<p><img src="/assets/images/blog/how-to-size-a-c-i-bess-from-15-minute-load-data-a-worked-example/1_476.jpg" alt="How to Size a C&I BESS from 15-Minute Load Data: A Worked Example" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. Why does BESS sizing need 15-minute load data instead of a monthly bill?</strong></p>
<p>Because the billing clock and the control clock run at the same resolution. A monthly bill shows total consumption and a peak, but not whether the battery has to hold 172 kW for twenty minutes or 60 kW for three hours. Those are different machines.</p>
<p><strong>2. How is the power requirement read from interval data?</strong></p>
<p>It is the highest interval above the demand target. If the annual peak is 812 kW and the target is 640 kW, the power requirement is 172 kW. Power is set by a single interval, and no averaging should be applied to it.</p>
<p><strong>3. How is the energy requirement read?</strong></p>
<p>From the shape of the excursion, not the annual total. Find the longest contiguous run above the target, add the energy above the line across that run, and use that figure. In the example, 11 intervals over two hours and forty-five minutes carry 486 kWh above the line.</p>
<p><strong>4. How much capacity should be ordered once the energy figure is known?</strong></p>
<p>Convert delivered energy into DC energy first, then divide by the usable energy per unit. At 93.8 percent discharge efficiency, 486 kWh delivered needs 518.1 kWh of DC energy, which is 2.17 of a 238.74 kWh usable unit, so the order is three.</p>
<p><strong>5. Does peak shaving wear out a battery?</strong></p>
<p>Rarely at a single site. The example works out at 36.7 equivalent cycles a year, about 292 MWh over ten years, against a published cycle life of at least 8,000 cycles. The binding constraint is the longest excursion, which is a shape problem rather than a durability problem.</p>
