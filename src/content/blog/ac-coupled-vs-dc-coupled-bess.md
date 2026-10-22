---
title: "AC-Coupled vs DC-Coupled BESS: The Decision Is Your Existing Inverter"
category: "Technology"
excerpt: "Every comparison of AC-coupled and DC-coupled storage opens with an efficiency table, and every one of those tables is correct and beside the point."
publishDate: "2026-10-18T09:10:00Z"
seo:
  title: "AC-Coupled vs DC-Coupled BESS: How to Choose"
featuredImage: "/assets/images/products/sunflower-125kw-261kwh-pv-hybrid-ess/hero-3x2.jpg"
relatedProducts:
  - "sunflower-125kw-261kwh-pv-hybrid-ess"
  - "honey-125kw-261kwh-all-in-one-ess"
---

<p><strong>Every comparison of AC-coupled and DC-coupled storage opens with an efficiency table, and every one of those tables is correct and beside the point. The difference in round-trip efficiency is a few percentage points. The difference in what you are allowed to do with an existing PV plant is binary, and that is what usually decides the architecture.</strong></p>

<h2>What the two words actually describe</h2>
<p>Coupling describes where the battery joins the PV system, and therefore how many times energy changes form on its way to the cells.</p>
<p><strong>DC-coupled.</strong> The PV strings connect to a DC-DC converter or to the MPPT input of a hybrid inverter. That inverter shares a DC bus with the battery. When the sun charges the battery, the energy goes from PV to DC bus to cells without ever becoming alternating current.</p>
<p><strong>AC-coupled.</strong> The PV has its own grid-tied inverter feeding an AC bus. The battery has a separate bidirectional converter on the same AC bus. When the sun charges the battery, the energy is converted DC to AC by the PV inverter and then AC back to DC by the battery converter.</p>

<div class="table-wrap">
<table class="spec">
<thead>
<tr>
<th>Energy path</th>
<th>DC-coupled conversions</th>
<th>AC-coupled conversions</th>
</tr>
</thead>
<tbody>
<tr>
<td data-label="Energy path">PV &rarr; battery</td>
<td data-label="DC-coupled conversions">1 (DC-DC)</td>
<td data-label="AC-coupled conversions">2 (DC-AC, then AC-DC)</td>
</tr>
<tr>
<td data-label="Energy path">PV &rarr; building load, battery full</td>
<td data-label="DC-coupled conversions">1 (DC-AC)</td>
<td data-label="AC-coupled conversions">1 (DC-AC)</td>
</tr>
<tr>
<td data-label="Energy path">Battery &rarr; building load</td>
<td data-label="DC-coupled conversions">1 (DC-AC)</td>
<td data-label="AC-coupled conversions">1 (DC-AC)</td>
</tr>
<tr>
<td data-label="Energy path">Grid &rarr; battery</td>
<td data-label="DC-coupled conversions">2 (AC-DC, DC-DC)</td>
<td data-label="AC-coupled conversions">1 (AC-DC)</td>
</tr>
</tbody>
</table>
</div>

<p>The table holds the whole efficiency argument. DC coupling saves a conversion when solar charges the battery and loses one when the grid does. If most of the charging energy comes from the roof, DC-coupled wins on losses. If most comes from cheap overnight tariffs, the advantage narrows or reverses.</p>

<h2>Efficiency, quantified honestly</h2>
<p>NREL's cost benchmarking for PV-plus-storage states the mechanism plainly: DC-coupled systems avoid converting energy from DC to AC to DC, and therefore have higher round-trip efficiency than AC-coupled systems (<a href="https://www.nrel.gov/docs/fy22osti/81408.pdf">NREL, U.S. Solar Photovoltaic System and Energy Storage Cost Benchmark</a>).</p>
<p>The size of that advantage depends on the converters in question. A single-direction conversion stage typically costs a few percent; two stages of a high-quality converter can cost less than one mediocre stage. On a well-specified system the gap between the two architectures is usually small enough that it does not pay back the other costs on its own.</p>
<p>What it does mean is this: do not accept a claim that DC coupling "saves 10%" without a conversion-chain calculation for the specific products. Ask for the efficiency at each stage, at the operating point you will actually run at, not at nominal load.</p>

<h2>The retrofit question decides most projects</h2>
<p>If a PV array is already installed, already commissioned, and already under warranty, the practical answer is usually AC coupling. NREL's benchmark work makes the same point directly: for a retrofit — adding battery storage to an existing PV array — an AC-coupled battery may be more practical than a DC-coupled battery (<a href="https://www.nrel.gov/docs/fy19osti/72401.pdf">NREL, U.S. Utility-Scale Photovoltaics-Plus-Energy Storage System Costs Benchmark</a>).</p>
<p>The reasons are contractual as much as electrical:</p>
<ul>
<li><strong>The existing inverter stays untouched.</strong> Opening the DC side of a commissioned array can void the inverter warranty and requires re-testing the string design.</li>
<li><strong>Two vendors remain two vendors.</strong> The PV contractor keeps responsibility for generation; the storage contractor takes responsibility for the battery. Neither can blame the other's equipment.</li>
<li><strong>Downtime is limited to the AC interconnection.</strong> The array keeps producing while the battery is installed.</li>
<li><strong>Expansion is additive.</strong> A second cabinet connects to the same AC bus without redesigning the DC array.</li>
</ul>

<h2>Where DC coupling earns its place</h2>
<p>DC coupling stops being a compromise when the system is designed from zero:</p>
<ul>
<li><strong>Clipped energy recovery.</strong> A DC-coupled system can divert power that would have been clipped at the inverter's AC limit into the battery instead. On arrays deliberately oversized relative to their inverter, this is real revenue, and AC coupling cannot capture it.</li>
<li><strong>One inverter instead of two.</strong> A hybrid inverter replaces the PV inverter and the battery converter. On small commercial systems the saving in hardware, wall space and commissioning time is meaningful.</li>
<li><strong>Higher PV input per unit.</strong> A hybrid platform can accept a large DC array relative to its AC rating; the Sunflower platform, for example, is specified with up to 250 kW of usable PV input around a 125 kW output stage.</li>
<li><strong>Islanding behaviour is simpler.</strong> One device controls both the array and the battery in island mode, which removes a layer of coordination between two inverters.</li>
</ul>

<h2>Worked comparison on a small commercial site</h2>
<p>Take a 100 kWp array with a 200 kWh battery, and assume 500 kWh per day flows from PV into the battery. Keep the arithmetic simple and label the assumption: a two-stage conversion chain at 97% per stage, against a single stage at 97%.</p>

<div class="table-wrap">
<table class="spec">
<thead>
<tr>
<th>Item</th>
<th>DC-coupled</th>
<th>AC-coupled</th>
</tr>
</thead>
<tbody>
<tr>
<td data-label="Item">Stages on the PV-to-battery path</td>
<td data-label="DC-coupled">1</td>
<td data-label="AC-coupled">2</td>
</tr>
<tr>
<td data-label="Item">Energy retained from 500 kWh</td>
<td data-label="DC-coupled">485 kWh</td>
<td data-label="AC-coupled">470 kWh</td>
</tr>
<tr>
<td data-label="Item">Difference per day</td>
<td data-label="DC-coupled" colspan="2">15 kWh, about 3%</td>
</tr>
<tr>
<td data-label="Item">Difference per year at 300 equivalent days</td>
<td data-label="DC-coupled" colspan="2">4,500 kWh</td>
</tr>
</tbody>
</table>
</div>

<p>At a retail price of $0.15/kWh that is roughly $675 a year. It is not nothing, and on a new-build system where the inverter cost is already being spent, it is close to free. Against the cost of re-engineering a commissioned array, it is not worth arguing about.</p>

<h2>The constraint nobody puts in the comparison table</h2>
<p>DC-coupled systems concentrate risk in one device. If the hybrid inverter fails, the array and the battery both stop. An AC-coupled system loses one function at a time, and the two halves can come from different suppliers with separate service contracts.</p>
<p>That is a procurement consideration, not an engineering one, and on sites where uptime is contractual it can outweigh three percentage points of efficiency.</p>

<h2>What the single-line diagram has to show</h2>
<p>Whichever architecture is chosen, five things must appear on the drawing before the design is fixed, because each one becomes expensive to change after the switchgear is ordered:</p>
<ul>
<li><strong>The metering point</strong>, and whether the battery sits behind it or on a separate service.</li>
<li><strong>The point of common coupling</strong> where anti-islanding is detected, and which device performs the detection.</li>
<li><strong>Protection coordination</strong> between the PV inverter, the battery converter and the main breaker — two sources on one bus change the fault current, and the existing breaker may no longer be adequate.</li>
<li><strong>The neutral and earthing arrangement</strong> for the inverter in island mode; a system that is TN-S on the grid can become something else when the grid disappears.</li>
<li><strong>The communication path</strong> between the two devices, including what each one does when that path fails.</li>
</ul>
<p>A design that cannot answer these five questions is not yet a design, regardless of which coupling it claims.</p>

<h2>When the question does not apply</h2>
<p>If there is no PV on site — a pure grid-charging application for demand reduction, for example — coupling is irrelevant. There is nothing to couple. The battery connects to the AC bus, charges from the grid, and discharges to the load. The architecture question only exists where generation and storage share a system.</p>

<h2>What to ask before choosing</h2>
<ol>
<li>What is the round-trip efficiency at 50% load and at the ambient temperature of the site, per stage?</li>
<li>Does the hybrid inverter accept the array's existing string configuration, or does the array need re-stringing?</li>
<li>What does opening the DC side do to the PV inverter warranty?</li>
<li>In island mode, which device forms the grid, and what is the transfer time?</li>
<li>Can a second battery cabinet be added later without changing the inverter?</li>
<li>If the hybrid inverter fails, what still operates?</li>
<li>Which certifications cover the combined PV-and-battery configuration in the destination market?</li>
</ol>

<h2>The short version</h2>
<p>New build with PV, and a willing single supplier: DC coupling is usually the better engineering. Existing PV, multiple contractors, or a warranty you do not want to touch: AC coupling, and do not apologise for it. Everything else in this decision is a rounding error compared with those two situations.</p>
