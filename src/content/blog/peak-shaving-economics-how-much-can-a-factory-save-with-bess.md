---
title: "Peak Shaving Economics: How Much Can a Factory Save with BESS?"
category: "Buyer guide"
excerpt: "A factory saves money with a peak-shaving BESS only when battery discharge reduces the demand value that actually appears on the electricity bill."
publishDate: "2026-09-21T11:25:49Z"
featuredImage: "/assets/images/blog/peak-shaving-economics-how-much-can-a-factory-save-with-bess/1_7.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
  - "dawnice-enterflex-bs09-64-241-rack"
---

<h2 dir="auto" data-section-id="19lvubw" data-start="66" data-end="129">A Factory Does Not Save Money Because the Battery Discharges</h2>
<p dir="auto" data-start="131" data-end="562"></p>
<p dir="auto" data-start="131" data-end="562"><strong data-start="131" data-end="562">A factory saves money with a peak-shaving BESS only when battery discharge reduces the demand value that actually appears on the electricity bill. The first-pass annual saving is therefore <code data-start="322" data-end="433">avoided demand charge − charging cost − conversion losses − auxiliary energy − degradation cost − maintenance</code>. High demand charges and short, repeatable peaks usually create a stronger business case than broad, multi-hour load plateaus.</strong></p>
<p dir="auto" data-start="564" data-end="625">That sounds obvious until someone shows me a proposal saying:</p>
<p dir="auto" data-start="627" data-end="671"><strong data-start="627" data-end="671">“500 kWh BESS saves 30% on electricity.”</strong></p>
<p dir="auto" data-start="673" data-end="716">My first question is not about the battery.</p>
<p dir="auto" data-start="718" data-end="755"><strong data-start="718" data-end="755">“Thirty percent of which charge?”</strong></p>
<p dir="auto" data-start="757" data-end="1107">The U.S. Department of Energy distinguishes energy charges, billed in kWh, from demand charges, commonly based on maximum kW during a billing period. It also notes that interval data—often hourly or 15-minute—is needed to see the peaks that monthly consumption totals hide. <a data-start="1031" data-end="1107" rel="noopener" target="_new" href="https://www.energy.gov/cmei/femp/evaluating-your-utility-rate-options">DOE</a></p>
<p dir="auto" data-start="1109" data-end="1446">NREL reached a similar conclusion from a different direction: in its analysis of commercial battery storage economics, <strong data-start="1228" data-end="1392">peak demand charges were the strongest predictor of whether a BESS was economically viable, while load-profile shape was the strongest predictor of battery size</strong>. <a data-start="1394" data-end="1446" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy17osti/66832.pdf">NREL</a></p>
<p dir="auto" data-start="1448" data-end="1486">That is where I start the spreadsheet.</p>
<p dir="auto" data-start="1488" data-end="1511">Not with battery price.</p>
<h2 dir="auto" data-section-id="1wkl44" data-start="1513" data-end="1565">The Factory Paying $18/kW-Month Gets My Attention</h2>
<p dir="auto" data-start="1567" data-end="1673">Consider a hypothetical factory. These are worked-example assumptions, not a Ruibit/Dawnice customer case.</p>
<p dir="auto" data-start="1675" data-end="1689">The plant has:</p>
<p dir="auto" data-start="1691" data-end="1724"><strong data-start="1691" data-end="1724">Monthly peak demand: 1,020 kW</strong></p>
<p dir="auto" data-start="1726" data-end="1763"><strong data-start="1726" data-end="1763">Target after peak shaving: 800 kW</strong></p>
<p dir="auto" data-start="1765" data-end="1796"><strong data-start="1765" data-end="1796">Demand charge: $18/kW-month</strong></p>
<p dir="auto" data-start="1798" data-end="1833"><strong data-start="1798" data-end="1833">Peak reduction required: 220 kW</strong></p>
<p dir="auto" data-start="1835" data-end="1910">Assume the BESS successfully holds that reduction in all 12 billing months.</p>
<p dir="auto" data-start="1912" data-end="1946">The gross demand-charge saving is:</p>
<p dir="auto" data-start="1948" data-end="2000"><strong data-start="1948" data-end="2000">220 kW × $18/kW-month × 12 months = $47,520/year</strong></p>
<p dir="auto" data-start="2002" data-end="2057">That's the number people like putting in presentations.</p>
<p dir="auto" data-start="2059" data-end="2067">I don't.</p>
<p dir="auto" data-start="2069" data-end="2077">Not yet.</p>
<p dir="auto" data-start="2079" data-end="2146">Because <strong data-start="2087" data-end="2145">$47,520 is avoided demand charge, not net BESS savings</strong>.</p>
<h2 dir="auto" data-section-id="48sjc9" data-start="2148" data-end="2213">Then I Open the Load Curve and the Nice Number Usually Changes</h2>
<p dir="auto" data-start="2215" data-end="2303">Suppose the 220 kW peak reduction is required for only 45 minutes on a typical peak day.</p>
<p dir="auto" data-start="2305" data-end="2342">Energy delivered during the event is:</p>
<p dir="auto" data-start="2344" data-end="2373"><strong data-start="2344" data-end="2373">220 kW × 0.75 h = 165 kWh</strong></p>
<p dir="auto" data-start="2375" data-end="2413">If the peak instead lasts three hours:</p>
<p dir="auto" data-start="2415" data-end="2441"><strong data-start="2415" data-end="2441">220 kW × 3 h = 660 kWh</strong></p>
<p dir="auto" data-start="2443" data-end="2465">Same demand reduction.</p>
<p dir="auto" data-start="2467" data-end="2520">Same theoretical $47,520 annual demand-charge saving.</p>
<p dir="auto" data-start="2522" data-end="2545">Very different battery.</p>
<p dir="auto" data-start="2547" data-end="2787">This is why peak duration has such a strong influence on economics. NREL notes that longer-duration peak-shaving systems generally cost more because additional battery energy is required. <a data-start="2735" data-end="2787" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy19osti/71995.pdf">NREL</a></p>
<p dir="auto" data-start="2789" data-end="2980">A factory with a sharp 30–45 minute production peak may be a much more interesting BESS candidate than another factory with the same 1,020 kW maximum demand spread across a four-hour plateau.</p>
<p dir="auto" data-start="2982" data-end="3023">The electricity bill shows the same peak.</p>
<p dir="auto" data-start="3025" data-end="3052">The battery sees the width.</p>
<h2 dir="auto" data-section-id="wq7ovz" data-start="3054" data-end="3109">Missing One Peak Can Cost More Than Losing One Cycle</h2>
<p dir="auto" data-start="3111" data-end="3169">Now we get to the part I worry about as an energy manager.</p>
<p dir="auto" data-start="3171" data-end="3480">Some tariffs contain demand ratchets or look-back provisions. DOE notes that these can calculate current demand charges partly from previous peaks, meaning an occasional high spike may affect bills beyond the month when it occurred. <a data-start="3404" data-end="3480" rel="noopener" target="_new" href="https://www.energy.gov/cmei/femp/evaluating-your-utility-rate-options">DOE</a></p>
<p dir="auto" data-start="3482" data-end="3535">So imagine the BESS performs perfectly for 11 months.</p>
<p dir="auto" data-start="3537" data-end="3600">In August, SoC is too low when production hits the annual peak.</p>
<p dir="auto" data-start="3602" data-end="3666">The factory reaches <strong data-start="3622" data-end="3634">1,015 kW</strong> instead of staying near 800 kW.</p>
<p dir="auto" data-start="3668" data-end="3731">Depending on the tariff, that is not simply “one bad dispatch.”</p>
<p dir="auto" data-start="3733" data-end="3776">It may reset part of the economic baseline.</p>
<p dir="auto" data-start="3778" data-end="3831">This is why I don't value a peak-shaving system from:</p>
<p dir="auto" data-start="3833" data-end="3869"><strong data-start="3833" data-end="3869">battery capacity + demand charge</strong></p>
<p dir="auto" data-start="3871" data-end="3877">alone.</p>
<p dir="auto" data-start="3879" data-end="3891">I also want:</p>
<p dir="auto" data-start="3893" data-end="3906"><strong data-start="3893" data-end="3906">EMS logic</strong></p>
<p dir="auto" data-start="3908" data-end="3925"><strong data-start="3908" data-end="3925">load forecast</strong></p>
<p dir="auto" data-start="3927" data-end="3950"><strong data-start="3927" data-end="3950">minimum reserve SoC</strong></p>
<p dir="auto" data-start="3952" data-end="3970"><strong data-start="3952" data-end="3970">meter interval</strong></p>
<p dir="auto" data-start="3972" data-end="3993"><strong data-start="3972" data-end="3993">recharge strategy</strong></p>
<p dir="auto" data-start="3995" data-end="4008"><strong data-start="3995" data-end="4008">PCS power</strong></p>
<p dir="auto" data-start="4010" data-end="4060">and the exact tariff definition of billing demand.</p>
<p dir="auto" data-start="4062" data-end="4158">A battery can be technically healthy and financially useless for fifteen very expensive minutes.</p>
<h2 dir="auto" data-section-id="vxob5e" data-start="4160" data-end="4212">The Charging Bill Comes Back Through Another Door</h2>
<p dir="auto" data-start="4214" data-end="4296">Suppose the factory needs <strong data-start="4240" data-end="4269">165 kWh AC-side discharge</strong> during each shaving event.</p>
<p dir="auto" data-start="4298" data-end="4368">For an illustrative calculation, assume <strong data-start="4338" data-end="4367">90% round-trip efficiency</strong>.</p>
<p dir="auto" data-start="4370" data-end="4440">Energy that must be purchased to restore the battery is approximately:</p>
<p dir="auto" data-start="4442" data-end="4468"><strong data-start="4442" data-end="4468">165 ÷ 0.90 = 183.3 kWh</strong></p>
<p dir="auto" data-start="4470" data-end="4514">If charging electricity costs <strong data-start="4500" data-end="4513">$0.09/kWh</strong>:</p>
<p dir="auto" data-start="4516" data-end="4552"><strong data-start="4516" data-end="4552">183.3 × $0.09 = $16.50 per event</strong></p>
<p dir="auto" data-start="4554" data-end="4590">At 250 peak-shaving events per year:</p>
<p dir="auto" data-start="4592" data-end="4622"><strong data-start="4592" data-end="4622">$16.50 × 250 = $4,125/year</strong></p>
<p dir="auto" data-start="4624" data-end="4670">Now our simple economics looks more like this:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="4672" data-end="5002">
<thead data-start="4672" data-end="4704">
<tr data-start="4672" data-end="4704">
<th data-start="4672" data-end="4686" data-col-size="sm">Annual Item</th>
<th data-start="4686" data-end="4704" data-col-size="sm">Worked Example</th>
</tr>
</thead>
<tbody data-start="4716" data-end="5002">
<tr data-start="4716" data-end="4757">
<td data-start="4716" data-end="4746" data-col-size="sm">Gross avoided demand charge</td>
<td data-col-size="sm" data-start="4746" data-end="4757">$47,520</td>
</tr>
<tr data-start="4758" data-end="4787">
<td data-start="4758" data-end="4776" data-col-size="sm">Charging energy</td>
<td data-start="4776" data-end="4787" data-col-size="sm">−$4,125</td>
</tr>
<tr data-start="4788" data-end="4830">
<td data-start="4788" data-end="4819" data-col-size="sm">Remaining before other costs</td>
<td data-start="4819" data-end="4830" data-col-size="sm">$43,395</td>
</tr>
<tr data-start="4831" data-end="4882">
<td data-start="4831" data-end="4862" data-col-size="sm">HVAC / auxiliary consumption</td>
<td data-col-size="sm" data-start="4862" data-end="4882">Not yet included</td>
</tr>
<tr data-start="4883" data-end="4917">
<td data-start="4883" data-end="4897" data-col-size="sm">Maintenance</td>
<td data-start="4897" data-end="4917" data-col-size="sm">Not yet included</td>
</tr>
<tr data-start="4918" data-end="4961">
<td data-start="4918" data-end="4940" data-col-size="sm">Battery degradation</td>
<td data-col-size="sm" data-start="4940" data-end="4961">Not yet monetized</td>
</tr>
<tr data-start="4962" data-end="5002">
<td data-start="4962" data-end="4982" data-col-size="sm">Financing / taxes</td>
<td data-start="4982" data-end="5002" data-col-size="sm">Not yet included</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="5004" data-end="5049">That <strong data-start="5009" data-end="5048">$43,395 is still not project profit</strong>.</p>
<p dir="auto" data-start="5051" data-end="5094">It is merely a cleaner number than $47,520.</p>
<p dir="auto" data-start="5096" data-end="5218">And this is exactly why I am suspicious of BESS proposals that jump directly from demand-charge savings to payback period.</p>
<h2 dir="auto" data-section-id="534fa8" data-start="5220" data-end="5282">Degradation Is an Expense Even When Nobody Sends an Invoice</h2>
<p dir="auto" data-start="5284" data-end="5340">A battery cycle does not arrive with a receipt attached.</p>
<p dir="auto" data-start="5342" data-end="5362">It still has a cost.</p>
<p dir="auto" data-start="5364" data-end="5581">Suppose a factory saves another $8,000 per year by cycling more aggressively for energy arbitrage, but that dispatch increases throughput enough to accelerate capacity loss or reach warranty throughput limits earlier.</p>
<p dir="auto" data-start="5583" data-end="5614">Was the extra revenue worth it?</p>
<p dir="auto" data-start="5616" data-end="5622">Maybe.</p>
<p dir="auto" data-start="5624" data-end="5721">But the EMS should not chase every price spread merely because discharge is technically possible.</p>
<p dir="auto" data-start="5723" data-end="6022">NREL's storage modeling shows that dispatch strategy can materially change project NPV, particularly where tariffs vary by time. Peak shaving and price-signal dispatch are different control objectives and can produce different operating behavior. <a data-start="5970" data-end="6022" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy21osti/79790.pdf">NREL</a></p>
<p dir="auto" data-start="6024" data-end="6080">For a factory project, I would therefore model at least:</p>
<p dir="auto" data-start="6082" data-end="6107"><strong data-start="6082" data-end="6107">annual discharged MWh</strong></p>
<p dir="auto" data-start="6109" data-end="6143"><strong data-start="6109" data-end="6143">expected round-trip efficiency</strong></p>
<p dir="auto" data-start="6145" data-end="6162"><strong data-start="6145" data-end="6162">capacity fade</strong></p>
<p dir="auto" data-start="6164" data-end="6187"><strong data-start="6164" data-end="6187">warranty throughput</strong></p>
<p dir="auto" data-start="6189" data-end="6229"><strong data-start="6189" data-end="6229">augmentation/replacement assumptions</strong></p>
<p dir="auto" data-start="6231" data-end="6254">not merely cycle count.</p>
<p dir="auto" data-start="6256" data-end="6440">A shallow 20-minute peak-shaving event and a deep daily arbitrage cycle should not be treated as economically identical just because both appear as “one cycle” in a sales presentation.</p>
<p dir="auto" data-start="6256" data-end="6440"><img src="/assets/images/blog/peak-shaving-economics-how-much-can-a-factory-save-with-bess/detail7_81.jpg" alt="Peak Shaving Economics: How Much Can a Factory Save with BESS" width="400" height="330" loading="lazy" decoding="async"></p>
<h2 dir="auto" data-section-id="197mlbh" data-start="6442" data-end="6495">The Cheapest Battery Can Produce the Worst Payback</h2>
<p dir="auto" data-start="6497" data-end="6539">Let's use another hypothetical comparison.</p>
<p dir="auto" data-start="6541" data-end="6611">Two suppliers quote systems capable of the same 220 kW peak reduction:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="6613" data-end="6853">
<thead data-start="6613" data-end="6713">
<tr data-start="6613" data-end="6713">
<th data-start="6613" data-end="6624" data-col-size="sm">Proposal</th>
<th data-start="6624" data-end="6641" data-col-size="sm">Installed Cost</th>
<th data-start="6641" data-end="6657" data-col-size="sm">Usable Energy</th>
<th data-start="6657" data-end="6695" data-col-size="sm">Annual Net Benefit Before Financing</th>
<th data-start="6695" data-end="6713" data-col-size="sm">Simple Payback</th>
</tr>
</thead>
<tbody data-start="6740" data-end="6853">
<tr data-start="6740" data-end="6796">
<td data-start="6740" data-end="6751" data-col-size="sm">System A</td>
<td data-start="6751" data-end="6762" data-col-size="sm">$210,000</td>
<td data-col-size="sm" data-start="6762" data-end="6772">250 kWh</td>
<td data-col-size="sm" data-start="6772" data-end="6782">$40,000</td>
<td data-col-size="sm" data-start="6782" data-end="6796">5.25 years</td>
</tr>
<tr data-start="6797" data-end="6853">
<td data-start="6797" data-end="6808" data-col-size="sm">System B</td>
<td data-start="6808" data-end="6819" data-col-size="sm">$285,000</td>
<td data-start="6819" data-end="6829" data-col-size="sm">500 kWh</td>
<td data-start="6829" data-end="6839" data-col-size="sm">$43,000</td>
<td data-col-size="sm" data-start="6839" data-end="6853">6.63 years</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="6855" data-end="6892">System B stores twice as much energy.</p>
<p dir="auto" data-start="6894" data-end="6941">It also earns only $3,000 more in this example.</p>
<p dir="auto" data-start="6943" data-end="7074">If the factory's real peak lasts less than one hour, the extra 250 kWh may spend most of its life doing nothing financially useful.</p>
<p dir="auto" data-start="7076" data-end="7142">This is why <strong data-start="7088" data-end="7141">economic sizing is not the same as maximum sizing</strong>.</p>
<p dir="auto" data-start="7144" data-end="7306">When Ruibit/Dawnice receives a peak-shaving inquiry, I would rather send the factory's interval data and tariff than request “500 kWh because that is our budget.”</p>
<p dir="auto" data-start="7308" data-end="7553">Dawnice currently offers commercial configurations including <strong data-start="7369" data-end="7387">100 kW/200 kWh</strong> and <strong data-start="7392" data-end="7410">125 kW/265 kWh</strong> systems, alongside larger commercial and containerized storage platforms. <a data-start="7485" data-end="7553" rel="noopener" target="_new" href="https://www.energydawnice.com/commercial-solar-solutions/">Dawnice</a></p>
<p dir="auto" data-start="7555" data-end="7590">Those are equipment configurations.</p>
<p dir="auto" data-start="7592" data-end="7660">The factory's peak decides whether any of them makes economic sense.</p>
<h2 dir="auto" data-section-id="11fbwa7" data-start="7662" data-end="7728">Solar Can Improve the Calculation, but Only If the Timing Works</h2>
<p dir="auto" data-start="7730" data-end="7828">Factories with rooftop PV sometimes assume solar automatically makes peak shaving more profitable.</p>
<p dir="auto" data-start="7830" data-end="7846">Not necessarily.</p>
<p dir="auto" data-start="7848" data-end="7933">Imagine the factory peak occurs at <strong data-start="7883" data-end="7892">17:30</strong>, after PV production has fallen sharply.</p>
<p dir="auto" data-start="7935" data-end="8052">Solar may still charge the battery earlier, which can reduce charging-energy cost or increase solar self-consumption.</p>
<p dir="auto" data-start="8054" data-end="8061">Useful.</p>
<p dir="auto" data-start="8063" data-end="8148">But it does not eliminate the need for enough PCS power and reserved energy at 17:30.</p>
<p dir="auto" data-start="8150" data-end="8287">Conversely, if PV already reduces the midday peak below the demand threshold, the BESS may have very little peak-shaving work left to do.</p>
<p dir="auto" data-start="8289" data-end="8461">NREL notes that PV can shorten net peak duration in some systems, which can improve storage economics for peak shaving. <a data-start="8409" data-end="8461" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy19osti/71995.pdf">NREL</a></p>
<p dir="auto" data-start="8463" data-end="8493">The important word is <strong data-start="8485" data-end="8492">can</strong>.</p>
<p dir="auto" data-start="8495" data-end="8618">I would overlay PV generation and factory demand at the same interval resolution before assigning the value to the battery.</p>
<h2 dir="auto" data-section-id="18vb5nz" data-start="8620" data-end="8686">I Don't Calculate Payback Until These Seven Numbers Stop Moving</h2>
<p dir="auto" data-start="8688" data-end="8749">For a preliminary factory peak-shaving business case, I want:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="8751" data-end="9116">
<thead data-start="8751" data-end="8777">
<tr data-start="8751" data-end="8777">
<th data-start="8751" data-end="8759" data-col-size="sm">Input</th>
<th data-start="8759" data-end="8777" data-col-size="sm">Why It Matters</th>
</tr>
</thead>
<tbody data-start="8788" data-end="9116">
<tr data-start="8788" data-end="8833">
<td data-start="8788" data-end="8802" data-col-size="sm">Peak demand</td>
<td data-start="8802" data-end="8833" data-col-size="sm">Sets potential kW reduction</td>
</tr>
<tr data-start="8834" data-end="8871">
<td data-start="8834" data-end="8850" data-col-size="sm">Peak duration</td>
<td data-start="8850" data-end="8871" data-col-size="sm">Sets required kWh</td>
</tr>
<tr data-start="8872" data-end="8914">
<td data-start="8872" data-end="8888" data-col-size="sm">Demand charge</td>
<td data-start="8888" data-end="8914" data-col-size="sm">Prices each avoided kW</td>
</tr>
<tr data-start="8915" data-end="8968">
<td data-start="8915" data-end="8932" data-col-size="sm">Meter interval</td>
<td data-col-size="sm" data-start="8932" data-end="8968">Defines how the peak is measured</td>
</tr>
<tr data-start="8969" data-end="9014">
<td data-start="8969" data-end="8987" data-col-size="sm">Charging tariff</td>
<td data-start="8987" data-end="9014" data-col-size="sm">Prices battery recharge</td>
</tr>
<tr data-start="9015" data-end="9061">
<td data-start="9015" data-end="9033" data-col-size="sm">BESS efficiency</td>
<td data-start="9033" data-end="9061" data-col-size="sm">Determines energy losses</td>
</tr>
<tr data-start="9062" data-end="9116">
<td data-start="9062" data-end="9084" data-col-size="sm">Installed BESS cost</td>
<td data-start="9084" data-end="9116" data-col-size="sm">Establishes investment basis</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="9118" data-end="9280">Then I add degradation, maintenance, auxiliary consumption, financing, taxes, incentives, warranty limits, and residual value as the project becomes more serious.</p>
<p dir="auto" data-start="9282" data-end="9313">Only after that do I calculate:</p>
<p dir="auto" data-start="9315" data-end="9379"><strong data-start="9315" data-end="9379">Simple Payback = Installed Project Cost ÷ Annual Net Savings</strong></p>
<p dir="auto" data-start="9381" data-end="9513">For example, if the fully installed project costs <strong data-start="9431" data-end="9443">$220,000</strong> and modeled annual net savings after operating costs are <strong data-start="9501" data-end="9512">$40,000</strong>:</p>
<p dir="auto" data-start="9515" data-end="9566"><strong data-start="9515" data-end="9566">Simple Payback = $220,000 ÷ $40,000 = 5.5 years</strong></p>
<p dir="auto" data-start="9568" data-end="9582">Useful number.</p>
<p dir="auto" data-start="9584" data-end="9622">Not enough for an investment decision.</p>
<p dir="auto" data-start="9624" data-end="9769">A serious project should also examine NPV, IRR, degradation, tariff sensitivity, and what happens if the peak changes after production expansion.</p>
<h2 dir="auto" data-section-id="p3a4qs" data-start="9771" data-end="9827">Sometimes My Recommendation Is Not to Buy the Battery</h2>
<p dir="auto" data-start="9829" data-end="9881">This is the part that rarely appears in a quotation.</p>
<p dir="auto" data-start="9883" data-end="10031">Suppose I open the 15-minute data and discover the factory peak comes from one compressor starting unnecessarily while two production lines overlap.</p>
<p dir="auto" data-start="10033" data-end="10082">Rescheduling that equipment costs almost nothing.</p>
<p dir="auto" data-start="10084" data-end="10137">Or perhaps the demand charge is only <strong data-start="10121" data-end="10136">$4/kW-month</strong>.</p>
<p dir="auto" data-start="10139" data-end="10248">Or the “peak” lasts five hours every working day, forcing so much battery energy that the economics collapse.</p>
<p dir="auto" data-start="10250" data-end="10307">I would rather find that before somebody orders cabinets.</p>
<p dir="auto" data-start="10309" data-end="10605">Peak shaving is attractive when an expensive demand charge meets a load profile the battery can attack efficiently. NREL's analysis supports exactly that relationship: tariff and load shape are central economic drivers, not background details. <a data-start="10553" data-end="10605" rel="noopener" target="_new" href="https://www.nrel.gov/docs/fy17osti/66832.pdf">NREL</a></p>
<p dir="auto" data-start="10607" data-end="10630">So when a factory asks:</p>
<p dir="auto" data-start="10632" data-end="10664"><strong data-start="10632" data-end="10664">“How much can BESS save us?”</strong></p>
<p dir="auto" data-start="10666" data-end="10703">I would not answer with a percentage.</p>
<p dir="auto" data-start="10705" data-end="10724">Give me the tariff.</p>
<p dir="auto" data-start="10726" data-end="10752">Give me the interval data.</p>
<p dir="auto" data-start="10754" data-end="10789">Give me the installed project cost.</p>
<p dir="auto" data-start="10791" data-end="10827">Then we can put a price on the peak.</p>
<p dir="auto" data-start="10829" data-end="11049" data-is-last-node="" data-is-only-node=""><strong data-start="10829" data-end="11049" data-is-last-node="">A BESS does not create peak-shaving value by being large. It creates value by removing the right kilowatts from the right billing interval at a lower lifetime cost than those kilowatts were going to cost the factory.</strong></p>
<h2>FAQs</h2>
<h3>1. How much can a factory save with BESS peak shaving?</h3>
<p>Savings depend mainly on <strong>avoided peak demand, demand-charge rate, peak duration, tariff rules, BESS efficiency, and operating costs</strong>. There is no reliable universal savings percentage.</p>
<h3>2. How do you calculate peak-shaving savings?</h3>
<p>A simple starting formula is:</p>
<p><strong>Annual Gross Savings = Peak Reduction (kW) × Demand Charge ($/kW-month) × Applicable Months</strong></p>
<p>Then subtract charging energy, losses, auxiliary consumption, maintenance, and degradation-related costs.</p>
<h3>3. Why does peak duration affect BESS economics?</h3>
<p>Peak height determines required PCS power, while peak duration determines battery energy capacity. A short 200 kW spike may require far less kWh than a 200 kW reduction sustained for several hours.</p>
<h3>4. Does a larger BESS always produce greater peak-shaving savings?</h3>
<p>No. Once the battery can cover the economically valuable peak, additional capacity may provide little extra demand-charge reduction. Oversizing can increase CAPEX and lengthen payback.</p>
<h3>5. What data is needed before calculating factory BESS payback?</h3>
<p>Buyers should provide <strong>interval load data, demand charges, energy tariffs, peak duration, charging windows, transformer capacity, BESS efficiency, installed cost, degradation assumptions, and maintenance costs</strong>.</p>
