---
title: "How to Size a Home Battery from Interval Load Data"
category: "System design"
excerpt: "To size a home battery from interval load data, first decide what the battery is supposed to do."
publishDate: "2026-09-21T14:10:16Z"
updatedDate: "2026-09-21T14:42:26Z"
featuredImage: "/assets/images/blog/how-to-size-a-home-battery-from-interval-load-data/1_150.jpg"
relatedProducts:
  - "powerfly-hzeb-lct-10"
---

<h2 dir="auto" data-section-id="rvn79j" data-start="54" data-end="116">The Daily kWh Number Is Usually Not the Number I Start With</h2>
<p dir="auto" data-start="118" data-end="673"><strong data-start="118" data-end="673">To size a home battery from interval load data, first decide what the battery is supposed to do, then calculate the energy and power required during the relevant time window. For solar self-consumption, measure the household load that occurs after solar production falls. For backup, isolate essential loads and their outage duration. For time-of-use shifting, calculate the load inside the expensive tariff window. Battery kWh determines how long the system can supply those loads; inverter and battery kW determine whether it can supply them at all.</strong></p>
<p dir="auto" data-start="118" data-end="673"><img src="/assets/images/blog/how-to-size-a-home-battery-from-interval-load-data/1_150.jpg" alt="How to Size a Home Battery from Interval Load Data" width="400" height="400" loading="lazy" decoding="async"></p>
<p dir="auto" data-start="675" data-end="725">This is why I hesitate when an installer sends me:</p>
<p dir="auto" data-start="727" data-end="760"><strong data-start="727" data-end="760">Annual consumption: 7,300 kWh</strong></p>
<p dir="auto" data-start="762" data-end="822">and asks whether the house needs a 10 kWh or 15 kWh battery.</p>
<p dir="auto" data-start="824" data-end="885">That annual number tells me the home averages <strong data-start="870" data-end="884">20 kWh/day</strong>.</p>
<p dir="auto" data-start="887" data-end="1075">It does not tell me whether the homeowner cooks electrically at 18:30, charges an EV overnight, runs a heat pump through winter, or uses most electricity while the rooftop PV is producing.</p>
<p dir="auto" data-start="1077" data-end="1096">Interval data does.</p>
<p dir="auto" data-start="1098" data-end="1356">The U.S. Department of Energy describes interval data as readings at hourly or shorter intervals that reveal daily and weekly load profiles hidden inside monthly bills. <a data-start="1267" data-end="1356" rel="noopener" target="_new" href="https://www.energy.gov/cmei/femp/energy-management-information-system-capabilities">DOE</a></p>
<p dir="auto" data-start="1358" data-end="1412">For a home ESS, that difference is the sizing problem.</p>
<h2 dir="auto" data-section-id="exa351" data-start="1414" data-end="1473">I Would Open Tuesday Before I Open the Battery Catalogue</h2>
<p dir="auto" data-start="1475" data-end="1536">Consider a hypothetical home with 30-minute smart-meter data.</p>
<p dir="auto" data-start="1538" data-end="1545">It has:</p>
<p dir="auto" data-start="1547" data-end="1584"><strong data-start="1547" data-end="1584">Annual electricity use: 7,300 kWh</strong></p>
<p dir="auto" data-start="1586" data-end="1623"><strong data-start="1586" data-end="1623">Average daily consumption: 20 kWh</strong></p>
<p dir="auto" data-start="1625" data-end="1645"><strong data-start="1625" data-end="1645">6 kWp rooftop PV</strong></p>
<p dir="auto" data-start="1647" data-end="1734">The homeowner wants to increase solar self-consumption and retain some backup capacity.</p>
<p dir="auto" data-start="1736" data-end="1777">A typical spring weekday looks like this:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="1779" data-end="2056">
<thead data-start="1779" data-end="1826">
<tr data-start="1779" data-end="1826">
<th data-start="1779" data-end="1786" data-col-size="sm">Time</th>
<th data-start="1786" data-end="1798" data-col-size="sm">Home Load</th>
<th data-start="1798" data-end="1810" data-col-size="sm">PV Output</th>
<th data-start="1810" data-end="1826" data-col-size="sm">Net Position</th>
</tr>
</thead>
<tbody data-start="1848" data-end="2056">
<tr data-start="1848" data-end="1900">
<td data-start="1848" data-end="1862" data-col-size="sm">06:00–09:00</td>
<td data-start="1862" data-end="1872" data-col-size="sm">4.0 kWh</td>
<td data-start="1872" data-end="1882" data-col-size="sm">0.8 kWh</td>
<td data-start="1882" data-end="1900" data-col-size="sm">3.2 kWh import</td>
</tr>
<tr data-start="1901" data-end="1956">
<td data-start="1901" data-end="1915" data-col-size="sm">09:00–16:00</td>
<td data-start="1915" data-end="1925" data-col-size="sm">5.0 kWh</td>
<td data-start="1925" data-end="1936" data-col-size="sm">17.0 kWh</td>
<td data-start="1936" data-end="1956" data-col-size="sm">12.0 kWh surplus</td>
</tr>
<tr data-start="1957" data-end="2009">
<td data-start="1957" data-end="1971" data-col-size="sm">16:00–22:00</td>
<td data-start="1971" data-end="1981" data-col-size="sm">8.5 kWh</td>
<td data-start="1981" data-end="1991" data-col-size="sm">2.0 kWh</td>
<td data-start="1991" data-end="2009" data-col-size="sm">6.5 kWh import</td>
</tr>
<tr data-start="2010" data-end="2056">
<td data-start="2010" data-end="2024" data-col-size="sm">22:00–06:00</td>
<td data-col-size="sm" data-start="2024" data-end="2034">2.5 kWh</td>
<td data-col-size="sm" data-start="2034" data-end="2038">0</td>
<td data-col-size="sm" data-start="2038" data-end="2056">2.5 kWh import</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="2058" data-end="2084">The house consumes 20 kWh.</p>
<p dir="auto" data-start="2086" data-end="2202">But a 20 kWh battery would make little sense if the real objective is simply to move daytime solar into the evening.</p>
<p dir="auto" data-start="2204" data-end="2241">The useful first number is closer to:</p>
<p dir="auto" data-start="2243" data-end="2287"><strong data-start="2243" data-end="2287">Evening net demand = 8.5 − 2.0 = 6.5 kWh</strong></p>
<p dir="auto" data-start="2289" data-end="2333">Now I have something worth designing around.</p>
<h2 dir="auto" data-section-id="t7l60v" data-start="2335" data-end="2383">6.5 kWh at the Loads Is Not a 6.5 kWh Battery</h2>
<p dir="auto" data-start="2385" data-end="2429">The battery has losses and operating limits.</p>
<p dir="auto" data-start="2431" data-end="2460">For a worked example, assume:</p>
<p dir="auto" data-start="2462" data-end="2493"><strong data-start="2462" data-end="2493">Required AC energy: 6.5 kWh</strong></p>
<p dir="auto" data-start="2495" data-end="2530"><strong data-start="2495" data-end="2530">Battery-to-load efficiency: 92%</strong></p>
<p dir="auto" data-start="2532" data-end="2564"><strong data-start="2532" data-end="2564">Allowed usable fraction: 90%</strong></p>
<p dir="auto" data-start="2566" data-end="2571">Then:</p>
<p dir="auto" data-start="2573" data-end="2635"><strong data-start="2573" data-end="2635">Required nameplate energy = 6.5 ÷ (0.92 × 0.90) ≈ 7.85 kWh</strong></p>
<p dir="auto" data-start="2637" data-end="2728">A nominal <strong data-start="2647" data-end="2665">10 kWh battery</strong> now looks reasonable for this particular spring-day objective.</p>
<p dir="auto" data-start="2730" data-end="2749">That does not mean:</p>
<p dir="auto" data-start="2751" data-end="2792"><strong data-start="2751" data-end="2792">20 kWh/day household = 10 kWh battery</strong></p>
<p dir="auto" data-start="2794" data-end="2803">It means:</p>
<p dir="auto" data-start="2805" data-end="2944"><strong data-start="2805" data-end="2944">this load profile + this solar profile + these assumptions ≈ 8 kWh minimum nameplate requirement for the defined evening-shifting duty.</strong></p>
<p dir="auto" data-start="2946" data-end="3163">NREL similarly separates battery <strong data-start="2979" data-end="2988">power</strong> from <strong data-start="2994" data-end="3004">energy</strong> when sizing storage: energy determines autonomy, while discharge power must still meet the required load. <a data-start="3111" data-end="3163" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy24osti/90582.pdf">NREL</a></p>
<p dir="auto" data-start="3165" data-end="3219">That distinction becomes important five minutes later.</p>
<h2 dir="auto" data-section-id="1v2bxy4" data-start="3221" data-end="3268">Then the Oven and Heat Pump Turn On Together</h2>
<p dir="auto" data-start="3270" data-end="3303">At 18:10 the interval data shows:</p>
<p dir="auto" data-start="3305" data-end="3326"><strong data-start="3305" data-end="3326">Heat pump: 2.4 kW</strong></p>
<p dir="auto" data-start="3328" data-end="3357"><strong data-start="3328" data-end="3357">Induction cooking: 3.0 kW</strong></p>
<p dir="auto" data-start="3359" data-end="3407"><strong data-start="3359" data-end="3407">Lighting/refrigeration/general loads: 0.8 kW</strong></p>
<p dir="auto" data-start="3409" data-end="3415">Total:</p>
<p dir="auto" data-start="3417" data-end="3427"><strong data-start="3417" data-end="3427">6.2 kW</strong></p>
<p dir="auto" data-start="3429" data-end="3481">The 10 kWh battery may have plenty of stored energy.</p>
<p dir="auto" data-start="3483" data-end="3596">But if the battery–inverter package can deliver only <strong data-start="3536" data-end="3557">5 kW continuously</strong>, the home still imports from the grid.</p>
<p dir="auto" data-start="3598" data-end="3670">This is why I extract two different results from the same interval file:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="3672" data-end="3980">
<thead data-start="3672" data-end="3705">
<tr data-start="3672" data-end="3705">
<th data-start="3672" data-end="3690" data-col-size="sm">Sizing Question</th>
<th data-start="3690" data-end="3705" data-col-size="sm">Data I Need</th>
</tr>
</thead>
<tbody data-start="3716" data-end="3980">
<tr data-start="3716" data-end="3763">
<td data-start="3716" data-end="3733" data-col-size="sm">Battery energy</td>
<td data-start="3733" data-end="3763" data-col-size="sm">kWh over the target period</td>
</tr>
<tr data-start="3764" data-end="3816">
<td data-start="3764" data-end="3789" data-col-size="sm">Battery/inverter power</td>
<td data-start="3789" data-end="3816" data-col-size="sm">Highest simultaneous kW</td>
</tr>
<tr data-start="3817" data-end="3867">
<td data-start="3817" data-end="3837" data-col-size="sm">Surge requirement</td>
<td data-start="3837" data-end="3867" data-col-size="sm">Appliance startup behavior</td>
</tr>
<tr data-start="3868" data-end="3926">
<td data-start="3868" data-end="3891" data-col-size="sm">Charging requirement</td>
<td data-start="3891" data-end="3926" data-col-size="sm">Available solar/off-peak window</td>
</tr>
<tr data-start="3927" data-end="3980">
<td data-start="3927" data-end="3944" data-col-size="sm">Backup reserve</td>
<td data-start="3944" data-end="3980" data-col-size="sm">Protected loads × required hours</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="3982" data-end="4053">A distributor who sells only by battery kWh is solving half the system.</p>
<h2 dir="auto" data-section-id="1lnwybe" data-start="4055" data-end="4128">Backup Changes the Calculation Because Some Energy Becomes Untouchable</h2>
<p dir="auto" data-start="4130" data-end="4173">Now the homeowner adds another requirement:</p>
<p dir="auto" data-start="4175" data-end="4209"><strong data-start="4175" data-end="4209">"I want four hours of backup."</strong></p>
<p dir="auto" data-start="4211" data-end="4230">Four hours of what?</p>
<p dir="auto" data-start="4232" data-end="4271">Suppose the essential-load schedule is:</p>
<p dir="auto" data-start="4273" data-end="4316"><strong data-start="4273" data-end="4316">Refrigerator + freezer: 0.25 kW average</strong></p>
<p dir="auto" data-start="4318" data-end="4348"><strong data-start="4318" data-end="4348">Internet/security: 0.10 kW</strong></p>
<p dir="auto" data-start="4350" data-end="4371"><strong data-start="4350" data-end="4371">Lighting: 0.15 kW</strong></p>
<p dir="auto" data-start="4373" data-end="4414"><strong data-start="4373" data-end="4414">Heating controls/circulation: 0.30 kW</strong></p>
<p dir="auto" data-start="4416" data-end="4443">Approximate essential load:</p>
<p dir="auto" data-start="4445" data-end="4456"><strong data-start="4445" data-end="4456">0.80 kW</strong></p>
<p dir="auto" data-start="4458" data-end="4473">For four hours:</p>
<p dir="auto" data-start="4475" data-end="4500"><strong data-start="4475" data-end="4500">0.80 × 4 = 3.2 kWh AC</strong></p>
<p dir="auto" data-start="4502" data-end="4560">Using the same illustrative 92% discharge-path efficiency:</p>
<p dir="auto" data-start="4562" data-end="4607"><strong data-start="4562" data-end="4607">3.2 ÷ 0.92 ≈ 3.48 kWh battery-side energy</strong></p>
<p dir="auto" data-start="4609" data-end="4739">If the owner wants that reserve available at all times, those 3.48 kWh cannot simultaneously be promised for daily solar shifting.</p>
<p dir="auto" data-start="4741" data-end="4809">This is where a perfectly sensible 10 kWh proposal can become tight.</p>
<p dir="auto" data-start="4811" data-end="5092">NREL's residential storage modeling also shows that backup duration depends on battery charge level when the outage begins, household load profile, inverter efficiency, and whether PV can recharge the battery during the outage. <a data-start="5039" data-end="5092" rel="noopener" target="_new" href="https://docs.nrel.gov/docs/fy21osti/77324.pdf">NREL</a></p>
<p dir="auto" data-start="5094" data-end="5160">"10 kWh gives X hours" is therefore not a serious universal claim.</p>
<h2 dir="auto" data-section-id="1n7vmfz" data-start="5162" data-end="5198">Winter Is the File I Ask for Next</h2>
<p dir="auto" data-start="5200" data-end="5240">Spring made the 10 kWh system look good.</p>
<p dir="auto" data-start="5242" data-end="5262">Then I open January.</p>
<p dir="auto" data-start="5264" data-end="5290">The heat pump runs longer.</p>
<p dir="auto" data-start="5292" data-end="5318">Evening consumption rises.</p>
<p dir="auto" data-start="5320" data-end="5343">Solar production falls.</p>
<p dir="auto" data-start="5345" data-end="5388">The battery may not fully recharge from PV.</p>
<p dir="auto" data-start="5390" data-end="5516">This is why I prefer <strong data-start="5411" data-end="5450">at least 12 months of interval data</strong> where available rather than sizing from one attractive solar day.</p>
<p dir="auto" data-start="5518" data-end="5529">I look for:</p>
<p dir="auto" data-start="5531" data-end="5549"><strong data-start="5531" data-end="5549">winter weekday</strong></p>
<p dir="auto" data-start="5551" data-end="5569"><strong data-start="5551" data-end="5569">summer weekday</strong></p>
<p dir="auto" data-start="5571" data-end="5582"><strong data-start="5571" data-end="5582">weekend</strong></p>
<p dir="auto" data-start="5584" data-end="5604"><strong data-start="5584" data-end="5604">highest-load day</strong></p>
<p dir="auto" data-start="5606" data-end="5639"><strong data-start="5606" data-end="5639">lowest-solar/high-load period</strong></p>
<p dir="auto" data-start="5641" data-end="5661"><strong data-start="5641" data-end="5661">EV-charging days</strong></p>
<p dir="auto" data-start="5663" data-end="5694"><strong data-start="5663" data-end="5694">unusual but recurring loads</strong></p>
<p dir="auto" data-start="5696" data-end="5922">DOE notes that interval profiles can expose time-of-day, day-of-week, weather and occupancy-related changes that monthly totals conceal. <a data-start="5833" data-end="5922" rel="noopener" target="_new" href="https://www.energy.gov/cmei/femp/energy-management-information-system-capabilities">DOE</a></p>
<p dir="auto" data-start="5924" data-end="5992">For a residential installer, that means one "typical day" is useful.</p>
<p dir="auto" data-start="5994" data-end="6029">It is not enough to freeze the BOM.</p>
<h2 dir="auto" data-section-id="1hjyas" data-start="6031" data-end="6100">EV Charging Is Where I Often Remove Load Instead of Adding Battery</h2>
<p dir="auto" data-start="6102" data-end="6142">Suppose the home adds a 7 kW EV charger.</p>
<p dir="auto" data-start="6144" data-end="6168">The obvious response is:</p>
<p dir="auto" data-start="6170" data-end="6207"><strong data-start="6170" data-end="6207">larger inverter + larger battery.</strong></p>
<p dir="auto" data-start="6209" data-end="6225">Not necessarily.</p>
<p dir="auto" data-start="6227" data-end="6329">If the car can charge from the grid overnight at a low tariff, why discharge the home battery into it?</p>
<p dir="auto" data-start="6331" data-end="6449">If the EV can charge directly during midday solar surplus, why store that electricity in the stationary battery first?</p>
<p dir="auto" data-start="6451" data-end="6522">The same applies to water heating, pool pumps and other flexible loads.</p>
<p dir="auto" data-start="6524" data-end="6602">Before increasing battery capacity, I would ask whether the load can be moved.</p>
<p dir="auto" data-start="6604" data-end="6692">That is one of the biggest differences between home ESS sizing and simple backup sizing:</p>
<p dir="auto" data-start="6694" data-end="6739"><strong data-start="6694" data-end="6739">the house contains loads we can schedule.</strong></p>
<p dir="auto" data-start="6741" data-end="6822">A smart control strategy can sometimes save more money than another 5 kWh module.</p>
<h2 dir="auto" data-section-id="1cp8eoc" data-start="6824" data-end="6888">I Would Give Ruibit/Dawnice a Load File, Not "We Need 10 kWh"</h2>
<p dir="auto" data-start="6890" data-end="7028">For an installer or distributor building a repeatable home ESS package, I would reduce the interval data to a small set of design outputs:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="7030" data-end="7390">
<thead data-start="7030" data-end="7064">
<tr data-start="7030" data-end="7064">
<th data-start="7030" data-end="7046" data-col-size="sm">Design Output</th>
<th data-start="7046" data-end="7064" data-col-size="sm">Worked Example</th>
</tr>
</thead>
<tbody data-start="7076" data-end="7390">
<tr data-start="7076" data-end="7114">
<td data-start="7076" data-end="7104" data-col-size="sm">Average daily consumption</td>
<td data-col-size="sm" data-start="7104" data-end="7114">20 kWh</td>
</tr>
<tr data-start="7115" data-end="7154">
<td data-start="7115" data-end="7143" data-col-size="sm">Evening net load to shift</td>
<td data-start="7143" data-end="7154" data-col-size="sm">6.5 kWh</td>
</tr>
<tr data-start="7155" data-end="7207">
<td data-start="7155" data-end="7194" data-col-size="sm">Minimum calculated battery nameplate</td>
<td data-col-size="sm" data-start="7194" data-end="7207">~7.85 kWh</td>
</tr>
<tr data-start="7208" data-end="7246">
<td data-start="7208" data-end="7236" data-col-size="sm">Evening simultaneous peak</td>
<td data-start="7236" data-end="7246" data-col-size="sm">6.2 kW</td>
</tr>
<tr data-start="7247" data-end="7295">
<td data-start="7247" data-end="7281" data-col-size="sm">Four-hour essential backup load</td>
<td data-start="7281" data-end="7295" data-col-size="sm">3.2 kWh AC</td>
</tr>
<tr data-start="7296" data-end="7327">
<td data-start="7296" data-end="7317" data-col-size="sm">Daytime PV surplus</td>
<td data-start="7317" data-end="7327" data-col-size="sm">12 kWh</td>
</tr>
<tr data-start="7328" data-end="7390">
<td data-start="7328" data-end="7348" data-col-size="sm">Candidate package</td>
<td data-col-size="sm" data-start="7348" data-end="7390">~10 kWh class, subject to final checks</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="7392" data-end="7637">Then I would verify the actual Ruibit/Dawnice battery and inverter combination for <strong data-start="7475" data-end="7636">usable capacity, continuous output, battery current, voltage range, BMS protocol, backup output, PV charging capability, and regional electrical requirements</strong>.</p>
<p dir="auto" data-start="7639" data-end="7677">The table does not choose the product.</p>
<p dir="auto" data-start="7679" data-end="7721">It tells us what the product has to prove.</p>
<h2 dir="auto" data-section-id="tdaqou" data-start="7723" data-end="7791">A 10 kWh Battery Can Be Too Large and Too Small in the Same House</h2>
<p dir="auto" data-start="7793" data-end="7829">Too large for spring solar shifting.</p>
<p dir="auto" data-start="7831" data-end="7873">Too small for an eight-hour winter outage.</p>
<p dir="auto" data-start="7875" data-end="7903">That is not a contradiction.</p>
<p dir="auto" data-start="7905" data-end="7980">It means the homeowner has asked one battery to perform two different jobs.</p>
<p dir="auto" data-start="7982" data-end="8049">This is why I would not finish a residential battery proposal with:</p>
<p dir="auto" data-start="8051" data-end="8083"><strong data-start="8051" data-end="8083">Recommended capacity: 10 kWh</strong></p>
<p dir="auto" data-start="8085" data-end="8128">I would finish it with something closer to:</p>
<p dir="auto" data-start="8130" data-end="8338"><strong data-start="8130" data-end="8338">10 kWh covers the modeled evening-shifting requirement under the stated assumptions. Backup duration depends on reserve SoC, actual protected loads, seasonal demand, and PV availability during the outage.</strong></p>
<p dir="auto" data-start="8340" data-end="8354">Less exciting.</p>
<p dir="auto" data-start="8356" data-end="8373">Much more useful.</p>
<p dir="auto" data-start="8375" data-end="8467">For Home ESS sizing, the best interval data does not tell me how large a battery I can sell.</p>
<p dir="auto" data-start="8469" data-end="8648" data-is-last-node="" data-is-only-node="">It tells me <strong data-start="8481" data-end="8648" data-is-last-node="">which hours the battery is actually being asked to move, which loads it must carry, and which loads should probably never be put on the battery in the first place.</strong></p>
<p dir="auto" data-start="8469" data-end="8648" data-is-last-node="" data-is-only-node=""><img src="/assets/images/blog/how-to-size-a-home-battery-from-interval-load-data/1_135.jpg" alt="How to Size a Home Battery from Interval Load Data" width="400" height="400" loading="lazy" decoding="async"></p>
<p dir="auto" data-start="8469" data-end="8648" data-is-last-node="" data-is-only-node=""><strong>FAQs</strong><br>1. How do I size a home battery from interval load data?<br><br>Identify the kWh used during the period the battery must cover, then adjust for usable capacity and system losses. Separately check peak kW to ensure the battery and inverter can supply the required power.<br><br>2. Is daily electricity consumption enough to size a home battery?<br><br>No. Daily or monthly kWh hides when electricity is consumed. Interval data reveals evening demand, peak loads, EV charging, heat-pump operation, and seasonal patterns, which can significantly change the recommended battery size.<br><br>3. How much battery capacity should be reserved for backup?<br><br>Calculate the energy required by essential loads for the desired outage duration. For example, 0.8 kW of essential loads for four hours requires 3.2 kWh AC, before accounting for conversion losses.<br><br>4. Why should winter load data be checked before choosing a home battery?<br><br>Winter may bring higher heating loads and lower solar generation. A battery that works well for spring solar self-consumption may provide insufficient energy or recharge capability during winter.<br><br>5. Should EV charging be included when sizing a home battery?<br><br>Not automatically. EV charging is often flexible and may be scheduled during low-tariff periods or direct solar production. Load management can sometimes be more economical than adding battery capacity.</p>
<p dir="auto" data-start="8469" data-end="8648" data-is-last-node="" data-is-only-node=""> </p>
