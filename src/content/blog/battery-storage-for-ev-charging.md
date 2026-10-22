---
title: "Battery Storage for EV Charging: Size the Demand Spike, Not the Energy"
category: "Sizing"
excerpt: "A 120 kW charger does not add 120 kW to your energy bill. It adds 120 kW to your peak, and in most commercial tariffs the peak is what sets the charge."
publishDate: "2026-10-18T09:00:00Z"
seo:
  title: "Battery Storage for EV Charging: Sizing Guide"
featuredImage: "/assets/images/products/honey-125kw-261kwh-all-in-one-ess/hero-3x2.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
---

<p><strong>A 120 kW charger does not add 120 kW to your energy bill. It adds 120 kW to your peak, and in most commercial tariffs the peak is what sets the charge for the next twelve months. That single sentence explains why most EV charging battery projects are sized wrongly: they are sized on the energy the cars consume, when the bill is decided by the power the site draws for twenty minutes.</strong></p>

<h2>Why charging is a different load from everything else on site</h2>
<p>A building's load is slow. Lights, HVAC and refrigeration move by a few percent over an hour, and a battery can follow them comfortably. A charging hub is the opposite: the load steps from 20 kW to 400 kW when two cars plug in, holds for half an hour, then drops back. The energy is modest. The power is not.</p>
<p>That difference decides the whole design. If you size the battery on daily energy, you will buy a system with enough kilowatt-hours and not enough kilowatts, and it will clip its own output exactly when the peak arrives.</p>

<h2>Power first, energy second</h2>
<p>The order of the calculation matters more than the formulas in it. Work in this sequence:</p>
<ol>
<li><strong>Establish the existing site peak</strong> from at least twelve months of interval data, not from the connected load on the nameplate.</li>
<li><strong>Add the chargers at their coincident power</strong>, which is lower than the sum of nameplates because sessions rarely start together.</li>
<li><strong>Set a target cap</strong> — the highest demand you are willing to pay for.</li>
<li><strong>The gap between the uncapped peak and the cap is the power the battery must deliver.</strong></li>
<li><strong>Multiply that power by the duration of the overlap window</strong> to get the energy, then check that the resulting C-rate is one your cells will accept.</li>
</ol>

<div class="table-wrap">
<table>
<thead>
<tr>
<th>Step</th>
<th>Quantity</th>
<th>Worked example</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Existing peak, from interval data</td>
<td>300 kW</td>
</tr>
<tr>
<td>2</td>
<td>New chargers, nameplate</td>
<td>4 &times; 60 kW = 240 kW</td>
</tr>
<tr>
<td>3</td>
<td>Coincidence factor observed on comparable hubs</td>
<td>0.70 &rarr; 168 kW</td>
</tr>
<tr>
<td>4</td>
<td>Uncapped site peak</td>
<td>468 kW</td>
</tr>
<tr>
<td>5</td>
<td>Target cap</td>
<td>350 kW</td>
</tr>
<tr>
<td>6</td>
<td>Power the battery must supply</td>
<td>118 kW</td>
</tr>
<tr>
<td>7</td>
<td>Overlap window</td>
<td>45 minutes</td>
</tr>
<tr>
<td>8</td>
<td>Energy actually required</td>
<td>88.5 kWh</td>
</tr>
</tbody>
</table>
</div>

<p>Read the last two rows together, because they are where projects go wrong. The energy requirement is 88.5 kWh. A 100 kWh battery would cover it. But that battery would have to deliver 118 kW into an 88.5 kWh pack, which is a discharge rate of 1.33C — a rate most stationary lithium iron phosphate cabinets will not sustain for 45 minutes without derating or shortening life.</p>

<h2>The constraint that decides cost: C-rate, not capacity</h2>
<p>A battery's usable power and its capacity are tied together by the C-rate. A 261 kWh cabinet with a 125 kW converter runs at 0.48C at full output, which is comfortable. The same cabinet asked for 200 kW would run at 0.77C and would need liquid cooling headroom and a manufacturer's explicit blessing.</p>
<p>This is why the cheapest-looking quote is usually the one that fails acceptance testing. Buying 100 kWh to cover 88.5 kWh of energy is arithmetically correct and physically wrong.</p>

<div class="table-wrap">
<table class="spec">
<thead>
<tr>
<th>Battery capacity</th>
<th>Power required</th>
<th>C-rate</th>
<th>Verdict for a 45-minute shave</th>
</tr>
</thead>
<tbody>
<tr>
<td data-label="Battery capacity">100 kWh</td>
<td data-label="Power required">118 kW</td>
<td data-label="C-rate">1.18C</td>
<td data-label="Verdict for a 45-minute shave">Outside normal continuous rating</td>
</tr>
<tr>
<td data-label="Battery capacity">200 kWh</td>
<td data-label="Power required">118 kW</td>
<td data-label="C-rate">0.59C</td>
<td data-label="Verdict for a 45-minute shave">Workable, but little headroom for growth</td>
</tr>
<tr>
<td data-label="Battery capacity">261 kWh</td>
<td data-label="Power required">118 kW</td>
<td data-label="C-rate">0.45C</td>
<td data-label="Verdict for a 45-minute shave">Comfortable, and leaves room for a fifth charger</td>
</tr>
<tr>
<td data-label="Battery capacity">400 kWh</td>
<td data-label="Power required">118 kW</td>
<td data-label="C-rate">0.30C</td>
<td data-label="Verdict for a 45-minute shave">Oversized on energy; only justified if sessions lengthen</td>
</tr>
</tbody>
</table>
</div>

<h2>Reduce the peak before you buy a battery</h2>
<p>Every kilowatt of shaved peak costs less to remove by scheduling than by storage. Three levers, in ascending cost:</p>
<ul>
<li><strong>Stagger the chargers.</strong> A 60 kW unit that starts five minutes after its neighbour turns a 240 kW step into two 120 kW steps. Nothing is lost to the driver.</li>
<li><strong>Cap the site, not the car.</strong> A controller that allocates 350 kW across four stalls still delivers a full session to a single vehicle; it only limits the fourth simultaneous session.</li>
<li><strong>Then add storage</strong> for the residual gap that scheduling cannot close.</li>
</ul>
<p>A hub with low utilisation rarely needs a battery at all. If the site runs two sessions a day, the peak is short and infrequent, and the demand charge it creates may be smaller than the annualised cost of a cabinet.</p>

<h2>Where the battery earns its capital</h2>
<p>Storage is justified when at least two of these are true:</p>
<ul>
<li>The tariff has a demand charge above roughly $10/kW, or a ratchet clause that holds the peak for a year.</li>
<li>The transformer has no headroom and upgrading it is more expensive, or slower, than installing a cabinet.</li>
<li>The site has a grid connection limit that forbids the chargers running together.</li>
<li>There is a time-of-use spread wide enough that arbitrage contributes a second revenue line.</li>
</ul>
<p>NREL's work on commercial demand charges makes the first point quantitatively: for a large share of commercial customers, demand charges dominate the bill, and the savings available from storage depend on how well the dispatch matches the actual peak rather than the average load (<a href="https://www.nrel.gov/docs/fy18osti/70360.pdf">NREL, Solar + Storage Synergies for Managing Commercial Demand Charges</a>).</p>
<p>The tariff structure decides how much of that saving you actually keep. A monthly demand charge resets every billing period; a ratchet clause holds the highest peak for eleven or twelve months. The same battery, dispatched the same way, is worth materially more under the second structure, which is why NREL's follow-up analysis frames the question as an interaction between tariff and dispatch rather than as a property of the storage system alone (<a href="https://docs.nrel.gov/docs/fy20osti/77798.pdf">NREL, Demand Charge Savings from Solar PV and Energy Storage</a>). Before sizing, obtain the actual tariff sheet and read the ratchet language.</p>

<h2>Site constraints that outrank the electrical design</h2>
<p>Four items kill projects after the sizing is agreed:</p>
<ul>
<li><strong>Footprint and separation.</strong> Outdoor cabinets need clearances for service and, in the United States, separation distances under NFPA 855 that depend on chemistry, capacity and whether the unit is listed to UL 9540.</li>
<li><strong>Ventilation and heat rejection.</strong> A charging canopy in direct sun is a hard thermal environment; liquid-cooled cabinets tolerate it better than air-cooled ones, at a cost.</li>
<li><strong>Noise.</strong> Fans and pumps run during the evening peak, which is when neighbours are home.</li>
<li><strong>Permitting sequence.</strong> The electrical inspector and the fire authority review different drawings, and the second one is usually the slower.</li>
</ul>

<h2>What to ask a supplier before signing</h2>
<ol>
<li>What continuous C-rate does the warranty allow, and for how many cycles per year?</li>
<li>Is the quoted power the inverter's rating at 45&deg;C ambient, or at 25&deg;C?</li>
<li>How does the system behave when a fifth charger is added — is the converter modular?</li>
<li>Does the controller read the utility meter directly, or does it estimate site load?</li>
<li>What happens on loss of communication between meter and battery?</li>
<li>Which grid codes and certifications apply in the destination country, for this specific model?</li>
<li>Are the cells, the BMS and the converter from one supplier, and who warrants the integrated system?</li>
<li>What is the committed lead time, and is it quoted in writing?</li>
</ol>

<h2>The honest limits of this approach</h2>
<p>This article assumes the site is billed on a demand charge and that the peak is set by the chargers. Neither is universal. In markets with capacity charges instead of demand charges, or where the charging hub is behind a landlord's meter, the economics move to a different calculation entirely. And every number above is illustrative: the coincidence factor, the overlap window and the achievable C-rate all have to come from the site's own interval data and the chosen product's datasheet, not from a template.</p>
<p>What does not change is the order of operations. Power first, energy second, and the C-rate check before the purchase order.</p>
