---
title: "C&I Battery Storage Payback Period: Inputs, Formula, and Worked Example"
category: "Buyer guide"
excerpt: "A payback period in a proposal is the last line of a calculation that ran in a particular order."
publishDate: "2026-09-13T09:45:14Z"
updatedDate: "2026-09-24T01:06:50Z"
seo:
  title: "C&I Battery Storage Payback Period"
featuredImage: "/assets/images/blog/c-i-battery-storage-payback-period-inputs-formula-and-worked-example/1_703.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
---

<p><strong>A payback period in a proposal is the last line of a calculation that ran in a particular order. Reverse the order, and the single number turns into a handful of inputs, usually with only one of them doing the work.</strong></p>

<h2>The quotation being tested</h2>
<p>Worked example. A site is offered a 500 kW containerized system at EUR 420,000 installed, against a promised payback of 4.4 years. The site is billed EUR 14.50 per kW per month for demand, EUR 0.11 per kWh off peak and EUR 0.21 per kWh at peak.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Input</th>
<th>Value used here</th>
<th>Where the value comes from</th>
</tr>
</thead>
<tbody>
<tr>
<td>Installed cost</td>
<td>EUR 420,000</td>
<td>The quotation, including installation and commissioning</td>
</tr>
<tr>
<td>Rated energy</td>
<td>1.045 MWh</td>
<td>The published rating for the 500 kW container</td>
</tr>
<tr>
<td>Depth of discharge</td>
<td>90 percent</td>
<td>The same published specification</td>
</tr>
<tr>
<td>Round trip efficiency</td>
<td>88 percent, one way 93.8 percent</td>
<td>The same published specification</td>
</tr>
<tr>
<td>Demand charge</td>
<td>EUR 14.50 per kW per month</td>
<td>The site's own bill</td>
</tr>
<tr>
<td>Off peak and peak tariff</td>
<td>EUR 0.11 and EUR 0.21 per kWh</td>
<td>The site's own bill</td>
</tr>
<tr>
<td>Peak reduction asked of the battery</td>
<td>300 kW</td>
<td>The interval file, measured against the demand target</td>
</tr>
<tr>
<td>Cycles assumed in year one</td>
<td>330</td>
<td>The operating plan for the site</td>
</tr>
<tr>
<td>Fixed operation and maintenance</td>
<td>EUR 6,300 in year one, escalating 2 percent a year</td>
<td>The service agreement</td>
</tr>
<tr>
<td>Real discount rate</td>
<td>6 percent</td>
<td>The buyer's own cost of capital</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Source: cost and equipment rows from the quotation and the published specification; tariff and load rows from the site's own records.</em></p>
<h2>The formula, written so it can run backwards</h2>
<p>Simple payback is installed cost divided by annual net savings. Annual net savings is the demand leg plus the arbitrage leg minus operating cost. The demand leg is avoided kilowatts multiplied by the monthly demand charge and by twelve. The arbitrage leg is battery throughput multiplied by the net value of one kilowatt-hour cycled, which is not the tariff spread: charging at 93.8 percent one-way efficiency draws more energy than the battery returns, so a spread of EUR 0.10 per kWh is worth EUR 0.0797 per kWh of battery throughput.</p>
<p>The same formula runs backwards. Divide the cost by the promised payback and the annual saving it requires falls out: EUR 420,000 divided by 4.4 years is EUR 95,455.</p>
<h2>What 4.4 years requires</h2>
<p>Worked example. Holding demand at 300 kW avoids EUR 52,200 a year, and adding back EUR 6,300 of operating cost leaves EUR 49,555 that the arbitrage leg has to produce.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Leg</th>
<th>What 4.4 years requires</th>
<th>What 330 cycles produce</th>
</tr>
</thead>
<tbody>
<tr>
<td>Demand, 300 kW at EUR 174 per kW per year</td>
<td>EUR 52,200</td>
<td>EUR 52,200</td>
</tr>
<tr>
<td>Arbitrage, 344,850 kWh cycled</td>
<td>EUR 49,555</td>
<td>EUR 27,488</td>
</tr>
<tr>
<td>Operating cost, year one</td>
<td>minus EUR 6,300</td>
<td>minus EUR 6,300</td>
</tr>
<tr>
<td>Annual net savings</td>
<td>EUR 95,455</td>
<td>EUR 73,388</td>
</tr>
<tr>
<td>Simple payback</td>
<td>4.4 years</td>
<td>5.7 years</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Source: the first column divides the installed cost by the promised payback; the second applies the inputs in the table above.</em></p>
<p>The gap sits in the arbitrage line, and it is wide. EUR 49,555 at EUR 0.0797 per kWh of throughput needs 621,674 kWh cycled in a year, which is 594.9 cycles on a 1.045 MWh unit, or 1.63 cycles a day every day. The same proposal assumes 330 cycles, which is 0.90 a day. A single unit cannot deliver 595 cycles on a 330-cycle plan, so the payback figure and the assumption beside it are describing two different machines.</p>
<p><img src="/assets/images/blog/c-i-battery-storage-payback-period-inputs-formula-and-worked-example/1_745.jpg" alt="C&I Battery Storage Payback Period: Inputs, Formula, and Worked Example" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>What the site's own numbers produce</h2>
<p>With the assumption set unchanged, the payback is 5.7 years, and the two duties do not share the battery as cleanly as the page suggests. The 1.045 MWh is the rated figure published for the 500 kW container Ruibit distributes, and the 940.5 kWh this calculation uses is 90 percent of it, because the usable window is what the controller can draw from.</p>
<p>The demand leg needs 600 kWh held back to cover a two-hour event at 300 kW. On the 48 days a year when an event that long occurs, only 340.5 kWh of the window is left for arbitrage. Across the year that costs 30 cycles: throughput falls to 314,482 kWh, the arbitrage leg to EUR 25,068, and the payback moves from 5.7 to 5.9 years.</p>
<h2>Where the answer moves</h2>
<p>Three inputs move the result more than the rest, and each belongs to a different party.</p>
<ul>
<li>Cycles a year. At 200 cycles the arbitrage leg produces EUR 16,660 and the payback is 6.7 years. The cycle count is a fact about the site's operations, and no supplier can promise it.</li>
<li>The peak tariff. If the site needs 4.4 years from the tariff alone, the calculation requires EUR 0.278 per kWh at peak against the EUR 0.21 billed today, a 32 percent rise the buyer does not control.</li>
<li>The arbitrage leg itself. If the tariff is flat and arbitrage cannot exist, the payback is 9.2 years, because demand reduction alone rarely carries a commercial system.</li>
</ul>
<p>Two tests turn those sensitivities into a decision. If the site's own records show fewer than 300 cycles a year available, the arbitrage leg cannot reach the EUR 27,488 used here, and the payback passes six years. If the spread between off-peak and peak is narrower than EUR 0.10 per kWh, the arbitrage leg shrinks in proportion, because the net value per kWh cycled is linear in the spread while the installed cost is not.</p>
<p>The discount rate matters less than the input it multiplies. At a real 6 percent, the discounted payback is 7.3 years against a simple payback of 5.7.</p>
<h2>Where this calculation does not hold</h2>
<p>If the site's peaks fall outside the peak-rate window, the reserve stops competing with arbitrage and every figure above improves. If the demand charge can be held down by shifting loads by hand across the three or four intervals that set each month's peak, the battery is being paid to replace a procedure rather than a machine, and the comparison changes.</p>
<p>Ask for the cycle count behind the payback. An answer that the model assumes standard cycling, without a number, means the largest input is owned by nobody. Ask which tariff the arbitrage leg assumes, and whether the site is billed on that structure. An answer that the calculation uses typical rates is not a calculation about this site. Ask what reserve the demand leg holds and for how many hours. An answer that the reserve is included in the sizing, without hours, is an answer that counts the same energy twice.</p>
<p>Three things cannot be recovered once the order is placed. The installed cost is fixed at signature, and no later saving repairs a cost that was set against a 330-cycle plan for a site that runs 200. The usable window is fixed by the unit that was ordered, so a reserve larger than the longest event quietly removes the arbitrage hours the payback depended on. And the first year of throughput is spent before the buyer can compare it with the plan, which is why the cycle assumption belongs in the contract rather than in the sales deck.</p>
<p><img src="/assets/images/blog/c-i-battery-storage-payback-period-inputs-formula-and-worked-example/1_520.jpg" alt="C&I Battery Storage Payback Period: Inputs, Formula, and Worked Example" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What is the payback formula for a C&amp;I battery?</strong></p>
<p>Installed cost divided by annual net savings. Net savings is avoided demand charges plus energy arbitrage minus operating cost. A system costing EUR 420,000 and saving EUR 73,388 a year pays back in 5.7 years on a simple basis, and in 7.3 years when the savings are discounted at a real 6 percent.</p>
<p><strong>2. Why is the arbitrage leg worth less than the tariff spread?</strong></p>
<p>Because charging costs more energy than the battery returns. At 88 percent round trip efficiency the one-way figure is 93.8 percent, so a spread of EUR 0.10 per kWh is worth EUR 0.0797 per kWh of battery throughput, not EUR 0.10.</p>
<p><strong>3. What does a promised payback of 4.4 years actually require?</strong></p>
<p>It requires EUR 95,455 of annual net savings, which in the example needs EUR 49,555 from arbitrage. That is 621,674 kWh cycled a year, or 594.9 cycles on a 1.045 MWh unit, against the 330 cycles the same proposal assumes. The two numbers describe different machines.</p>
<p><strong>4. Which input changes the payback most?</strong></p>
<p>The cycle count, because it belongs to the site rather than the supplier. At 200 cycles a year the payback is 6.7 years instead of 5.7, and if no arbitrage exists at all, on a flat tariff, it is 9.2 years.</p>
<p><strong>5. What should be asked before accepting a payback figure?</strong></p>
<p>The cycle count behind it, the tariff structure the arbitrage leg assumes, and the reserve the demand leg holds, in hours. A reserve held for a two-hour event removes 600 kWh from arbitrage on each event day and costs about 30 cycles a year.</p>
