---
title: "How to Size PCS Power for a Peak-Shaving BESS: Selection Guide & Sizing Rule"
category: "Sizing"
excerpt: "For peak shaving, PCS power should be sized from the maximum kW reduction the site must deliver at the grid meter."
publishDate: "2026-09-21T11:19:29Z"
seo:
  title: "How to Size PCS Power for a Peak-Shaving BESS"
featuredImage: "/assets/images/blog/how-to-size-pcs-power-for-a-peak-shaving-bess-selection-guide-and-sizing-rule/detail6_269.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
  - "dawnice-enterflex-bs09-64-241-rack"
---

<h2 dir="auto" data-section-id="3d1ffs" data-start="80" data-end="135">The 500 kWh Battery That Could Not Cut a 140 kW Peak</h2>
<p dir="auto" data-start="137" data-end="569"><strong data-start="137" data-end="569">For peak shaving, PCS power should be sized from the maximum kW reduction the site must deliver at the grid meter, while battery capacity should be sized from how long that reduction must be sustained. A practical first-pass rule is <code data-start="372" data-end="417">PCS power ≥ site peak − target demand limit</code>, followed by checks for margin, actual load shape, charge power, transformer limits, reactive power, temperature/altitude derating, and EMS response.</strong></p>
<p dir="auto" data-start="137" data-end="569"><img src="/assets/images/blog/how-to-size-pcs-power-for-a-peak-shaving-bess-selection-guide-and-sizing-rule/detail6_269.jpg" alt="How to Size PCS Power for a Peak-Shaving BESS: Selection Guide & Sizing Rule" width="400" height="383" loading="lazy" decoding="async"></p>
<p dir="auto" data-start="571" data-end="642">That distinction sounds elementary. It still causes expensive mistakes.</p>
<p dir="auto" data-start="644" data-end="903"><a data-start="644" data-end="696" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy14osti/60291.pdf">NREL</a> treats inverter power and battery energy as separate variables in behind-the-meter storage analysis and shows why demand-charge performance depends heavily on the facility load profile and tariff structure.</p>
<p dir="auto" data-start="905" data-end="928">When somebody sends me:</p>
<p dir="auto" data-start="930" data-end="993">"We need a 500 kWh peak-shaving battery. Please quote the PCS."</p>
<p dir="auto" data-start="995" data-end="1028">I usually send one question back:</p>
<p dir="auto" data-start="1030" data-end="1074"><strong data-start="1030" data-end="1074">"What is the peak we are trying to cut"</strong></p>
<h2 dir="auto" data-section-id="119fl3c" data-start="1076" data-end="1120">I Usually Start With the Worst 15 Minutes</h2>
<p dir="auto" data-start="1122" data-end="1216">Consider a hypothetical factory. This is a worked example, not a Ruibit/Dawnice customer case.</p>
<p dir="auto" data-start="1218" data-end="1242">The utility meter shows:</p>
<p dir="auto" data-start="1244" data-end="1270"><strong data-start="1244" data-end="1270">Maximum demand: 618 kW</strong></p>
<p dir="auto" data-start="1272" data-end="1321">The facility manager wants to cap grid import at:</p>
<p dir="auto" data-start="1323" data-end="1333"><strong data-start="1323" data-end="1333">480 kW</strong></p>
<p dir="auto" data-start="1335" data-end="1378">The first number I care about is therefore:</p>
<p dir="auto" data-start="1380" data-end="1428"><strong data-start="1380" data-end="1428">Required peak reduction = 618 − 480 = 138 kW</strong></p>
<p dir="auto" data-start="1430" data-end="1477">That <strong data-start="1435" data-end="1445">138 kW</strong> is the first PCS sizing signal.</p>
<p dir="auto" data-start="1479" data-end="1563">A 100 kW PCS connected to a 500 kWh battery still cannot do the job. At full output:</p>
<p dir="auto" data-start="1565" data-end="1611"><strong data-start="1565" data-end="1611">Remaining grid demand = 618 − 100 = 518 kW</strong></p>
<p dir="auto" data-start="1613" data-end="1671">The battery may have enough energy to discharge for hours.</p>
<p dir="auto" data-start="1673" data-end="1757">It simply cannot move enough power through the PCS at the moment the meter needs it.</p>
<p dir="auto" data-start="1759" data-end="1836">This is why I separate <strong data-start="1782" data-end="1835">kW from kWh before looking at a product catalogue</strong>.</p>
<h2 dir="auto" data-section-id="lemzk2" data-start="1838" data-end="1900">138 kW Is the Calculation. It Is Not Yet My Purchase Order.</h2>
<p dir="auto" data-start="1902" data-end="2012">If the highest historical requirement is exactly 138 kW, I would not automatically specify a 138 kW converter.</p>
<p dir="auto" data-start="2014" data-end="2100">For this example, suppose we apply an illustrative <strong data-start="2065" data-end="2099">10% engineering/control margin</strong>:</p>
<p dir="auto" data-start="2102" data-end="2127"><strong data-start="2102" data-end="2127">138 × 1.10 = 151.8 kW</strong></p>
<p dir="auto" data-start="2129" data-end="2247">That points toward roughly a <strong data-start="2158" data-end="2182">150–160 kW PCS class</strong>, subject to the actual supplier ratings and final project study.</p>
<p dir="auto" data-start="2249" data-end="2280">The 10% is not an industry law.</p>
<p dir="auto" data-start="2282" data-end="2563">I might use a different margin if production is expanding next year, the historical peak varies substantially, high ambient temperature causes PCS derating, the site is at high altitude, reactive power must be delivered simultaneously, or the EMS needs additional control headroom.</p>
<p dir="auto" data-start="2565" data-end="2667">This is one of those places where I would rather leave a number open than manufacture false precision.</p>
<p dir="auto" data-start="2669" data-end="2714">One year of load data tells me what happened.</p>
<p dir="auto" data-start="2716" data-end="2801">It does not tell me whether the factory will add another 90 kW compressor next March.</p>
<h2 dir="auto" data-section-id="1pac7o8" data-start="2803" data-end="2847">Then I Look Sideways Along the Load Curve</h2>
<p dir="auto" data-start="2849" data-end="2882">The highest point tells me power.</p>
<p dir="auto" data-start="2884" data-end="2926">The area above the target tells me energy.</p>
<p dir="auto" data-start="2928" data-end="2987">Suppose the same factory produces this four-interval event:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="2989" data-end="3198">
<thead data-start="2989" data-end="3048">
<tr data-start="2989" data-end="3048">
<th data-start="2989" data-end="3010" data-col-size="sm">15-Minute Interval</th>
<th data-start="3010" data-end="3026" data-col-size="sm">Facility Load</th>
<th data-start="3026" data-end="3048" data-col-size="sm">Power Above 480 kW</th>
</tr>
</thead>
<tbody data-start="3065" data-end="3198">
<tr data-start="3065" data-end="3097">
<td data-start="3065" data-end="3079" data-col-size="sm">14:00–14:15</td>
<td data-start="3079" data-end="3088" data-col-size="sm">530 kW</td>
<td data-col-size="sm" data-start="3088" data-end="3097">50 kW</td>
</tr>
<tr data-start="3098" data-end="3131">
<td data-start="3098" data-end="3112" data-col-size="sm">14:15–14:30</td>
<td data-col-size="sm" data-start="3112" data-end="3121">618 kW</td>
<td data-col-size="sm" data-start="3121" data-end="3131">138 kW</td>
</tr>
<tr data-start="3132" data-end="3165">
<td data-start="3132" data-end="3146" data-col-size="sm">14:30–14:45</td>
<td data-col-size="sm" data-start="3146" data-end="3155">590 kW</td>
<td data-col-size="sm" data-start="3155" data-end="3165">110 kW</td>
</tr>
<tr data-start="3166" data-end="3198">
<td data-start="3166" data-end="3180" data-col-size="sm">14:45–15:00</td>
<td data-start="3180" data-end="3189" data-col-size="sm">520 kW</td>
<td data-col-size="sm" data-start="3189" data-end="3198">40 kW</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="3200" data-end="3275">The AC-side energy required to flatten that one-hour peak is approximately:</p>
<p dir="auto" data-start="3277" data-end="3340"><strong data-start="3277" data-end="3340">Peak-event energy = (50 + 138 + 110 + 40) × 0.25 = 84.5 kWh</strong></p>
<p dir="auto" data-start="3342" data-end="3379">Now the project begins to make sense:</p>
<p dir="auto" data-start="3381" data-end="3426"><strong data-start="3381" data-end="3426">Peak PCS duty: about 138 kW before margin</strong></p>
<p dir="auto" data-start="3428" data-end="3516"><strong data-start="3428" data-end="3516">Peak-shaving energy for this event: about 84.5 kWh before losses and battery margins</strong></p>
<p dir="auto" data-start="3518" data-end="3627">That's a very different requirement from automatically pairing a 150 kW PCS with a 600 kWh four-hour battery.</p>
<p dir="auto" data-start="3629" data-end="3869"><a data-start="3629" data-end="3739" rel="noopener" target="_new" href="https://atb.nrel.gov/electricity/2024/commercial_battery_storage">NREL's commercial battery storage analysis</a> treats power capacity and energy duration as separate design dimensions rather than assuming one universal energy-to-power ratio.</p>
<p dir="auto" data-start="3871" data-end="3983">Peak shaving can be a surprisingly <strong data-start="3906" data-end="3935">power-heavy, energy-light</strong> application when the troublesome peak is short.</p>
<h2 dir="auto" data-section-id="gakaps" data-start="3985" data-end="4038">A 15-Minute Tariff Can Make a Short Peak Expensive</h2>
<p dir="auto" data-start="4040" data-end="4134">This is where electrical engineers and finance people finally start looking at the same graph.</p>
<p dir="auto" data-start="4136" data-end="4152">The PCS sees kW.</p>
<p dir="auto" data-start="4154" data-end="4188">Accounting sees the demand charge.</p>
<p dir="auto" data-start="4190" data-end="4222">The utility meter connects them.</p>
<p dir="auto" data-start="4224" data-end="4439">The <a data-start="4228" data-end="4347" rel="noopener" target="_new" href="https://www.energy.gov/sites/default/files/2013/08/f2/ElecStorageHndbk2013.pdf">DOE/EPRI Electricity Storage Handbook</a> discusses tariffs where a single 15-minute demand interval can establish the demand charge.</p>
<p dir="auto" data-start="4441" data-end="4527">So a fast PCS response is useful, but response speed alone does not solve the problem.</p>
<p dir="auto" data-start="4529" data-end="4648">If the meter is measuring a 15-minute average, the BESS must hold the required reduction through the relevant interval.</p>
<p dir="auto" data-start="4650" data-end="4760">A 200 kW PCS that runs out of usable battery energy halfway through the peak can still lose the demand target.</p>
<p dir="auto" data-start="4762" data-end="4786">That is why I don't ask:</p>
<p dir="auto" data-start="4788" data-end="4819">"How fast can the PCS respond"</p>
<p dir="auto" data-start="4821" data-end="4839">until I also know:</p>
<p dir="auto" data-start="4841" data-end="4875"><strong data-start="4841" data-end="4875">"How long must it stay there"</strong></p>
<p dir="auto" data-start="4841" data-end="4875"><img src="/assets/images/blog/how-to-size-pcs-power-for-a-peak-shaving-bess-selection-guide-and-sizing-rule/1_76.jpg" alt="How to Size PCS Power for a Peak-Shaving BESS: Selection Guide & Sizing Rule" width="400" height="400" loading="lazy" decoding="async"></p>
<h2 dir="auto" data-section-id="1daf7ol" data-start="4877" data-end="4938">The Transformer Is Where Some Perfect PCS Calculations Die</h2>
<p dir="auto" data-start="4940" data-end="4967">Suppose 150 kW looks right.</p>
<p dir="auto" data-start="4969" data-end="5041">Before I approve it, I check the site's transformer and charging window.</p>
<p dir="auto" data-start="5043" data-end="5237">Imagine an 800 kVA transformer already carrying a heavy daytime load. If the EMS recharges the BESS at 150 kW immediately after the peak, charging itself may create another high-demand interval.</p>
<p dir="auto" data-start="5239" data-end="5282">The correct question is therefore not only:</p>
<p dir="auto" data-start="5284" data-end="5319"><strong data-start="5284" data-end="5319">How much can the PCS discharge?</strong></p>
<p dir="auto" data-start="5321" data-end="5332">It is also:</p>
<p dir="auto" data-start="5334" data-end="5387"><strong data-start="5334" data-end="5387">When, and at what maximum power, can it recharge?</strong></p>
<p dir="auto" data-start="5389" data-end="5434">This can lead to asymmetric operating limits:</p>
<p dir="auto" data-start="5436" data-end="5465"><strong data-start="5436" data-end="5465">Maximum discharge: 150 kW</strong></p>
<p dir="auto" data-start="5467" data-end="5515"><strong data-start="5467" data-end="5515">Maximum site-permitted charge: perhaps 70 kW</strong></p>
<p dir="auto" data-start="5517" data-end="5593">The exact value must come from the site's electrical and tariff constraints.</p>
<p dir="auto" data-start="5595" data-end="5853">This is also why I would send Ruibit/Dawnice the load profile, transformer rating, target demand ceiling, and available charging window before asking for a final configuration. A supplier's standard kW/kWh combination is a hardware option, not a sizing rule.</p>
<h2 dir="auto" data-section-id="18go7td" data-start="5855" data-end="5878">One More Number: kVA</h2>
<p dir="auto" data-start="5880" data-end="5926">Peak shaving normally focuses on active power.</p>
<p dir="auto" data-start="5928" data-end="5958">The PCS may have other duties.</p>
<p dir="auto" data-start="5960" data-end="6003">Suppose a converter is expected to provide:</p>
<p dir="auto" data-start="6005" data-end="6028"><strong data-start="6005" data-end="6028">140 kW active power</strong></p>
<p dir="auto" data-start="6030" data-end="6049">and simultaneously:</p>
<p dir="auto" data-start="6051" data-end="6077"><strong data-start="6051" data-end="6077">60 kvar reactive power</strong></p>
<p dir="auto" data-start="6079" data-end="6118">Its apparent-power requirement becomes:</p>
<p dir="auto" data-start="6120" data-end="6138"><strong data-start="6120" data-end="6138">S = √(P² + Q²)</strong></p>
<p dir="auto" data-start="6140" data-end="6173"><strong data-start="6140" data-end="6173">S = √(140² + 60²) ≈ 152.3 kVA</strong></p>
<p dir="auto" data-start="6175" data-end="6219">A 150 kVA converter is now effectively full.</p>
<p dir="auto" data-start="6221" data-end="6264">This is why a B2B buyer should distinguish:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="6266" data-end="6711">
<thead data-start="6266" data-end="6300">
<tr data-start="6266" data-end="6300">
<th data-start="6266" data-end="6282" data-col-size="sm">PCS Parameter</th>
<th data-start="6282" data-end="6300" data-col-size="sm">Why I Check It</th>
</tr>
</thead>
<tbody data-start="6311" data-end="6711">
<tr data-start="6311" data-end="6354">
<td data-start="6311" data-end="6327" data-col-size="sm">Continuous kW</td>
<td data-start="6327" data-end="6354" data-col-size="sm">Peak-shaving capability</td>
</tr>
<tr data-start="6355" data-end="6405">
<td data-start="6355" data-end="6372" data-col-size="sm">Continuous kVA</td>
<td data-start="6372" data-end="6405" data-col-size="sm">Combined active/reactive duty</td>
</tr>
<tr data-start="6406" data-end="6453">
<td data-start="6406" data-end="6424" data-col-size="sm">Overload rating</td>
<td data-start="6424" data-end="6453" data-col-size="sm">Short-duration excursions</td>
</tr>
<tr data-start="6454" data-end="6508">
<td data-start="6454" data-end="6473" data-col-size="sm">Efficiency curve</td>
<td data-start="6473" data-end="6508" data-col-size="sm">Losses at actual operating load</td>
</tr>
<tr data-start="6509" data-end="6548">
<td data-start="6509" data-end="6524" data-col-size="sm">Charge power</td>
<td data-start="6524" data-end="6548" data-col-size="sm">Recharge constraints</td>
</tr>
<tr data-start="6549" data-end="6605">
<td data-start="6549" data-end="6577" data-col-size="sm">Reactive power / PF range</td>
<td data-col-size="sm" data-start="6577" data-end="6605">Grid or facility support</td>
</tr>
<tr data-start="6606" data-end="6657">
<td data-start="6606" data-end="6629" data-col-size="sm">Temperature derating</td>
<td data-start="6629" data-end="6657" data-col-size="sm">Hot-site available power</td>
</tr>
<tr data-start="6658" data-end="6711">
<td data-start="6658" data-end="6678" data-col-size="sm">Altitude derating</td>
<td data-start="6678" data-end="6711" data-col-size="sm">High-altitude available power</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="6713" data-end="6876">I would pay particular attention to the <strong data-start="6753" data-end="6773">efficiency curve</strong>, not merely peak efficiency. A PCS spending most of its life at 30–60% load should be evaluated there.</p>
<h2 dir="auto" data-section-id="1om97ad" data-start="6878" data-end="6921">The Sizing Rule I Keep on the Whiteboard</h2>
<p dir="auto" data-start="6923" data-end="6946">For preliminary design:</p>
<p dir="auto" data-start="6948" data-end="6974"><strong data-start="6948" data-end="6974">PCS peak-shaving duty:</strong></p>
<p dir="auto" data-start="6976" data-end="7004"><strong data-start="6976" data-end="7004">Pshave = Ppeak − Ptarget</strong></p>
<p dir="auto" data-start="7006" data-end="7033"><strong data-start="7006" data-end="7033">Preliminary PCS rating:</strong></p>
<p dir="auto" data-start="7035" data-end="7078"><strong data-start="7035" data-end="7078">PPCS ≥ Pshave × project-specific margin</strong></p>
<p dir="auto" data-start="7080" data-end="7102"><strong data-start="7080" data-end="7102">Peak-event energy:</strong></p>
<p dir="auto" data-start="7104" data-end="7155"><strong data-start="7104" data-end="7155">Eevent = Σ(Pload − Ptarget) × interval duration</strong></p>
<p dir="auto" data-start="7157" data-end="7382">Then verify the result against <strong data-start="7188" data-end="7381">transformer capacity, battery C-rate, PCS charge capability, reactive-power requirement, ambient temperature, altitude, future load growth, EMS control strategy, and utility demand interval</strong>.</p>
<p dir="auto" data-start="7384" data-end="7598"><a data-start="7384" data-end="7460" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy14osti/60291.pdf">NREL's peak-shaving research</a> makes the underlying point clear: available inverter power and battery energy both constrain how much peak reduction storage can deliver.</p>
<p dir="auto" data-start="7600" data-end="7635">That is the rule worth remembering.</p>
<p dir="auto" data-start="7637" data-end="7745"><strong data-start="7637" data-end="7745">PCS power follows the height of the peak you must remove. Battery energy follows the width of that peak.</strong></p>
<p dir="auto" data-start="7747" data-end="7842">Mix those two jobs together and it becomes very easy to buy too much battery—or too little PCS.</p>
<h2 dir="auto" data-section-id="cu98ye" data-start="7844" data-end="7905">I Would Reopen the Load File Before Adding Another Cabinet</h2>
<p dir="auto" data-start="7907" data-end="7967">If the first proposal misses the target, my instinct is not:</p>
<p dir="auto" data-start="7969" data-end="7991">"Add another 200 kWh."</p>
<p dir="auto" data-start="7993" data-end="8024">I go back to the interval data.</p>
<p dir="auto" data-start="8026" data-end="8052">Was the PCS power-limited?</p>
<p dir="auto" data-start="8054" data-end="8080">Did usable energy run out?</p>
<p dir="auto" data-start="8082" data-end="8104">Did SoC start too low?</p>
<p dir="auto" data-start="8106" data-end="8133">Did the EMS react too late?</p>
<p dir="auto" data-start="8135" data-end="8179">Was charging constrained by the transformer?</p>
<p dir="auto" data-start="8181" data-end="8226">Was the "peak" actually a three-hour plateau?</p>
<p dir="auto" data-start="8228" data-end="8325">Those failures can look identical on the electricity bill and require completely different fixes.</p>
<p dir="auto" data-start="8327" data-end="8402">For a peak-shaving project, that is the purchasing discipline I would keep:</p>
<p dir="auto" data-start="8404" data-end="8538" data-is-last-node="" data-is-only-node=""><strong data-start="8404" data-end="8538" data-is-last-node="">Do not choose PCS power from battery capacity. Do not choose battery capacity from PCS power. Let the site's load curve size both.</strong></p>
<p dir="auto" data-start="8404" data-end="8538" data-is-last-node="" data-is-only-node=""><img src="/assets/images/blog/how-to-size-pcs-power-for-a-peak-shaving-bess-selection-guide-and-sizing-rule/2_449.jpg" alt="How to Size PCS Power for a Peak-Shaving BESS: Selection Guide & Sizing Rule" width="400" height="266" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<h3>1. How do you size PCS power for peak shaving?</h3>
<p>Start with the required peak reduction: <strong>PCS power ≈ peak site demand − target grid-demand limit</strong>. Then verify engineering margin, derating, transformer limits, reactive power, and future load growth.</p>
<h3>2. Can PCS power be calculated from battery capacity?</h3>
<p>No. Battery capacity in kWh determines how long the BESS can discharge, while PCS power in kW determines how much power it can deliver at a given moment. Both should be sized from the load profile.</p>
<h3>3. Why is 15-minute load data important for PCS sizing?</h3>
<p>Interval data reveals the height and duration of actual demand peaks. A short 150 kW spike and a three-hour 150 kW plateau may require similar PCS power but very different battery capacities.</p>
<h3>4. Should PCS power include a sizing margin?</h3>
<p>Usually yes, but there is no universal percentage. Margin should reflect load variability, future expansion, temperature and altitude derating, reactive-power requirements, and control strategy.</p>
<h3>5. What PCS specifications should B2B buyers compare?</h3>
<p>Compare <strong>continuous kW, kVA, overload capability, efficiency curve, charge/discharge limits, reactive-power capability, power-factor range, derating conditions, and control interfaces</strong>.</p>
