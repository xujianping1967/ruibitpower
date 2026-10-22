---
title: "How to Calculate Commercial BESS ROI from Demand Charges and Energy Arbitrage"
category: "Buyer guide"
excerpt: "Commercial BESS ROI should be calculated from the site's actual tariff and interval load data, not from a generic savings percentage."
publishDate: "2026-09-13T07:45:36Z"
updatedDate: "2026-09-23T09:22:02Z"
seo:
  title: "How to Calculate Commercial BESS ROI"
featuredImage: "/assets/images/blog/how-to-calculate-commercial-bess-roi-from-demand-charges-and-energy-arbitrage/1_48.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
  - "loong-power-bs09-225-d"
---

<h2 dir="auto" data-section-id="15qp8vo" data-start="81" data-end="153">The Most Valuable Battery Cycle May Be the One the EMS Refuses to Use</h2>
<p dir="auto" data-start="155" data-end="562"><strong data-start="155" data-end="562">Commercial BESS ROI should be calculated from the site's actual tariff and interval load data, not from a generic savings percentage. For projects combining peak shaving and energy arbitrage, estimate avoided demand charges first, calculate arbitrage after round-trip losses, subtract operating costs, and then test whether both value streams can actually use the same battery without competing for SoC.</strong></p>
<p dir="auto" data-start="564" data-end="854">NREL identifies <strong data-start="580" data-end="691">demand-charge reduction and time-of-use energy arbitrage as separate behind-the-meter storage value streams</strong>, and notes that the monetary value of the same dispatched kWh can differ significantly depending on why and when it is used.</p>
<p dir="auto" data-start="856" data-end="905">That last point is where I start the spreadsheet.</p>
<p dir="auto" data-start="856" data-end="905"><img src="/assets/images/blog/how-to-calculate-commercial-bess-roi-from-demand-charges-and-energy-arbitrage/1_48.jpg" alt="How to Calculate Commercial BESS ROI from Demand Charges and Energy Arbitrage" width="400" height="400" loading="lazy" decoding="async"></p>
<h2 dir="auto" data-section-id="xh6riz" data-start="907" data-end="946">First Put a Dollar Value on the Peak</h2>
<p dir="auto" data-start="948" data-end="985">Consider a hypothetical factory with:</p>
<p dir="auto" data-start="987" data-end="1018"><strong data-start="987" data-end="1018">Monthly peak demand: 620 kW</strong></p>
<p dir="auto" data-start="1020" data-end="1051"><strong data-start="1020" data-end="1051">Demand charge: $16/kW-month</strong></p>
<p dir="auto" data-start="1053" data-end="1143">After analyzing 15-minute load data, we determine that a BESS can reliably hold demand to:</p>
<p dir="auto" data-start="1145" data-end="1155"><strong data-start="1145" data-end="1155">500 kW</strong></p>
<p dir="auto" data-start="1157" data-end="1172">Avoided demand:</p>
<p dir="auto" data-start="1174" data-end="1196"><strong data-start="1174" data-end="1196">620 − 500 = 120 kW</strong></p>
<p dir="auto" data-start="1198" data-end="1237">Potential monthly demand-charge saving:</p>
<p dir="auto" data-start="1239" data-end="1261"><strong data-start="1239" data-end="1261">120 × $16 = $1,920</strong></p>
<p dir="auto" data-start="1263" data-end="1274">Annualized:</p>
<p dir="auto" data-start="1276" data-end="1306"><strong data-start="1276" data-end="1306">$1,920 × 12 = $23,040/year</strong></p>
<p dir="auto" data-start="1308" data-end="1335">That looks straightforward.</p>
<p dir="auto" data-start="1337" data-end="1413">But I would verify the tariff before entering $23,040 as guaranteed savings.</p>
<p dir="auto" data-start="1415" data-end="1466">Does the utility bill the highest 15-minute demand?</p>
<p dir="auto" data-start="1468" data-end="1502">Is there a seasonal demand charge?</p>
<p dir="auto" data-start="1504" data-end="1514">A ratchet?</p>
<p dir="auto" data-start="1516" data-end="1562">Different on-peak and off-peak demand charges?</p>
<p dir="auto" data-start="1564" data-end="1689">If the battery misses one critical interval because its SoC is too low, the utility may still record the higher monthly peak.</p>
<p dir="auto" data-start="1691" data-end="1916">NREL has identified high demand charges as an important factor in the economics of behind-the-meter commercial storage, while emphasizing that viability remains site- and tariff-specific.</p>
<h2 dir="auto" data-section-id="1qjxp6q" data-start="1918" data-end="1958">Arbitrage Needs an Efficiency Penalty</h2>
<p dir="auto" data-start="1960" data-end="2013">Now assume the same factory has a time-of-use tariff:</p>
<p dir="auto" data-start="2015" data-end="2045"><strong data-start="2015" data-end="2045">Off-peak energy: $0.08/kWh</strong></p>
<p dir="auto" data-start="2047" data-end="2073"><strong data-start="2047" data-end="2073">Peak energy: $0.19/kWh</strong></p>
<p dir="auto" data-start="2075" data-end="2098">The apparent spread is:</p>
<p dir="auto" data-start="2100" data-end="2113"><strong data-start="2100" data-end="2113">$0.11/kWh</strong></p>
<p dir="auto" data-start="2115" data-end="2184">Suppose the BESS delivers <strong data-start="2141" data-end="2155">200 kWh AC</strong> during the expensive period.</p>
<p dir="auto" data-start="2186" data-end="2323">If we use NREL's representative <strong data-start="2218" data-end="2247">85% round-trip efficiency</strong> assumption for this worked example, the system must purchase approximately:</p>
<p dir="auto" data-start="2325" data-end="2351"><strong data-start="2325" data-end="2351">200 ÷ 0.85 = 235.3 kWh</strong></p>
<p dir="auto" data-start="2353" data-end="2367">Charging cost:</p>
<p dir="auto" data-start="2369" data-end="2395"><strong data-start="2369" data-end="2395">235.3 × $0.08 = $18.82</strong></p>
<p dir="auto" data-start="2397" data-end="2431">Value of avoided peak electricity:</p>
<p dir="auto" data-start="2433" data-end="2457"><strong data-start="2433" data-end="2457">200 × $0.19 = $38.00</strong></p>
<p dir="auto" data-start="2459" data-end="2479">Net arbitrage value:</p>
<p dir="auto" data-start="2481" data-end="2519"><strong data-start="2481" data-end="2519">$38.00 − $18.82 = $19.18 per cycle</strong></p>
<p dir="auto" data-start="2521" data-end="2551">At 250 useful cycles per year:</p>
<p dir="auto" data-start="2553" data-end="2583"><strong data-start="2553" data-end="2583">$19.18 × 250 ≈ $4,795/year</strong></p>
<p dir="auto" data-start="2585" data-end="2786">NREL's 2024 commercial-storage benchmark uses 85% as a representative round-trip-efficiency assumption and also models degradation and O&amp;M as real lifecycle costs.</p>
<p dir="auto" data-start="2788" data-end="2925">For an actual Ruibit/Dawnice proposal, I would replace that 85% assumption with the verified efficiency boundary for the selected system.</p>
<p dir="auto" data-start="2788" data-end="2925"><img src="/assets/images/blog/how-to-calculate-commercial-bess-roi-from-demand-charges-and-energy-arbitrage/3_116.jpg" alt="How to Calculate Commercial BESS ROI from Demand Charges and Energy Arbitrage" width="400" height="266" loading="lazy" decoding="async"></p>
<h2 dir="auto" data-section-id="q10w7p" data-start="2927" data-end="2981">Now the EMS Has to Choose Which Dollar Matters More</h2>
<p dir="auto" data-start="2983" data-end="3018">At 14:00, electricity is expensive.</p>
<p dir="auto" data-start="3020" data-end="3058">The EMS could discharge for arbitrage.</p>
<p dir="auto" data-start="3060" data-end="3133">At 16:15, however, the factory often establishes its monthly demand peak.</p>
<p dir="auto" data-start="3135" data-end="3244">Suppose the battery has only 80 kWh remaining because it spent the afternoon chasing the energy-price spread.</p>
<p dir="auto" data-start="3246" data-end="3386">The $19 arbitrage opportunity may have consumed battery energy that could have prevented hundreds or thousands of dollars in demand charges.</p>
<p dir="auto" data-start="3388" data-end="3419">This is why I do not calculate:</p>
<p dir="auto" data-start="3421" data-end="3485"><strong data-start="3421" data-end="3485">Peak-shaving savings + maximum theoretical arbitrage savings</strong></p>
<p dir="auto" data-start="3487" data-end="3534">and automatically call the result BESS revenue.</p>
<p dir="auto" data-start="3536" data-end="3563">The two applications share:</p>
<p dir="auto" data-start="3565" data-end="3583"><strong data-start="3565" data-end="3583">battery energy</strong></p>
<p dir="auto" data-start="3585" data-end="3598"><strong data-start="3585" data-end="3598">PCS power</strong></p>
<p dir="auto" data-start="3600" data-end="3607"><strong data-start="3600" data-end="3607">SoC</strong></p>
<p dir="auto" data-start="3609" data-end="3623"><strong data-start="3609" data-end="3623">cycle life</strong></p>
<p dir="auto" data-start="3625" data-end="3656">and <strong data-start="3629" data-end="3655">charging opportunities</strong>.</p>
<p dir="auto" data-start="3658" data-end="3719">The dispatch model has to decide which service gets priority.</p>
<p dir="auto" data-start="3721" data-end="3912">NREL notes that energy arbitrage is often more useful as a secondary value stream combined with other storage services rather than treated independently.</p>
<h2 dir="auto" data-section-id="mryj6o" data-start="3914" data-end="3972">A Worked ROI Without Pretending It Is a Dawnice Project</h2>
<p dir="auto" data-start="3974" data-end="4007">Assume the project economics are:</p>
<div dir="auto">
<div tabindex="-1">
<div class="table-wrap"><table dir="auto" data-start="4009" data-end="4224">
<thead data-start="4009" data-end="4039">
<tr data-start="4009" data-end="4039">
<th data-start="4009" data-end="4023" data-col-size="sm">Annual Item</th>
<th data-start="4023" data-end="4039" data-col-size="sm">Worked Value</th>
</tr>
</thead>
<tbody data-start="4051" data-end="4224">
<tr data-start="4051" data-end="4086">
<td data-start="4051" data-end="4075" data-col-size="sm">Demand-charge savings</td>
<td data-start="4075" data-end="4086" data-col-size="sm">$23,040</td>
</tr>
<tr data-start="4087" data-end="4124">
<td data-start="4087" data-end="4114" data-col-size="sm">Energy-arbitrage savings</td>
<td data-col-size="sm" data-start="4114" data-end="4124">$4,795</td>
</tr>
<tr data-start="4125" data-end="4152">
<td data-start="4125" data-end="4141" data-col-size="sm">Gross benefit</td>
<td data-start="4141" data-end="4152" data-col-size="sm">$27,835</td>
</tr>
<tr data-start="4153" data-end="4183">
<td data-start="4153" data-end="4172" data-col-size="sm">O&amp;M / monitoring</td>
<td data-start="4172" data-end="4183" data-col-size="sm">−$3,000</td>
</tr>
<tr data-start="4184" data-end="4224">
<td data-start="4184" data-end="4209" data-col-size="sm"><strong data-start="4186" data-end="4208">Net annual benefit</strong></td>
<td data-start="4209" data-end="4224" data-col-size="sm"><strong data-start="4211" data-end="4222">$24,835</strong></td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p dir="auto" data-start="4226" data-end="4265">Assume total installed project cost is:</p>
<p dir="auto" data-start="4267" data-end="4279"><strong data-start="4267" data-end="4279">$145,000</strong></p>
<p dir="auto" data-start="4281" data-end="4286">Then:</p>
<p dir="auto" data-start="4288" data-end="4339"><strong data-start="4288" data-end="4339">Simple Payback = $145,000 ÷ $24,835 ≈ 5.8 years</strong></p>
<p dir="auto" data-start="4341" data-end="4382">A simple first-pass ROI measure would be:</p>
<p dir="auto" data-start="4384" data-end="4427"><strong data-start="4384" data-end="4427">Annual ROI = $24,835 ÷ $145,000 ≈ 17.1%</strong></p>
<p dir="auto" data-start="4429" data-end="4543">These are deliberately hypothetical numbers. They are not a Ruibit/Dawnice quotation or guaranteed project return.</p>
<p dir="auto" data-start="4545" data-end="4766">For investment approval, I would go beyond simple ROI and model annual cash flows including degradation, tariff changes, financing, augmentation or replacement assumptions, incentives where applicable, and residual value.</p>
<p dir="auto" data-start="4768" data-end="5047">NREL's commercial BESS cost model also makes an important point for procurement: system cost contains both <strong data-start="4875" data-end="4901">energy-related ($/kWh)</strong> and <strong data-start="4906" data-end="4930">power-related ($/kW)</strong> components, so changing duration does not change CAPEX in a simple linear way.</p>
<h2 dir="auto" data-section-id="ykgvtl" data-start="5049" data-end="5092">A Larger Battery Can Produce a Worse ROI</h2>
<p dir="auto" data-start="5094" data-end="5176">Suppose analysis shows that 265 kWh captures nearly all economically useful peaks.</p>
<p dir="auto" data-start="5178" data-end="5236">Doubling to 530 kWh does not automatically double savings.</p>
<p dir="auto" data-start="5238" data-end="5339">Once the important demand peaks are covered, additional capacity may sit unused for much of the year.</p>
<p dir="auto" data-start="5341" data-end="5416">This is where a real product can enter the discussion rather than drive it.</p>
<p dir="auto" data-start="5418" data-end="5596">Dawnice's current <strong data-start="5436" data-end="5453">BS07-265-ES-X</strong> is rated at <strong data-start="5466" data-end="5488">125 kW / 265.3 kWh</strong>, giving it roughly a two-hour nameplate energy-to-power relationship.</p>
<p dir="auto" data-start="5598" data-end="5683">That does <strong data-start="5608" data-end="5615">not</strong> mean it is automatically the correct system for our worked factory.</p>
<p dir="auto" data-start="5685" data-end="5847">It means that if the site's load analysis points toward roughly 125 kW of power and two hours of useful storage duty, it becomes a configuration worth evaluating.</p>
<p dir="auto" data-start="5849" data-end="5868">That order matters:</p>
<p dir="auto" data-start="5870" data-end="5921"><strong data-start="5870" data-end="5921">economic duty → required kW/kWh → product match</strong></p>
<p dir="auto" data-start="5923" data-end="5927">not:</p>
<p dir="auto" data-start="5929" data-end="5979"><strong data-start="5929" data-end="5979">product → invent enough savings to justify it.</strong></p>
<h2 dir="auto" data-section-id="db39gb" data-start="5981" data-end="6025">The Sensitivity Test I Would Show the CFO</h2>
<p dir="auto" data-start="6027" data-end="6089">I would change four assumptions before presenting the project:</p>
<p dir="auto" data-start="6091" data-end="6161"><strong data-start="6091" data-end="6112">Demand reduction:</strong> What if we achieve only 90 kW instead of 120 kW?</p>
<p dir="auto" data-start="6163" data-end="6226"><strong data-start="6163" data-end="6184">Arbitrage cycles:</strong> What if only 180 profitable cycles occur?</p>
<p dir="auto" data-start="6228" data-end="6296"><strong data-start="6228" data-end="6246">Tariff spread:</strong> What if the spread falls from $0.11 to $0.07/kWh?</p>
<p dir="auto" data-start="6298" data-end="6366"><strong data-start="6298" data-end="6318">O&amp;M/degradation:</strong> What happens as usable battery energy declines?</p>
<p dir="auto" data-start="6368" data-end="6459">If a project only works when every assumption is optimistic, the attractive ROI is fragile.</p>
<p dir="auto" data-start="6461" data-end="6541">If it still works under the downside case, the economics deserve more attention.</p>
<p dir="auto" data-start="6543" data-end="6580">The useful question is therefore not:</p>
<p dir="auto" data-start="6582" data-end="6617"><strong data-start="6582" data-end="6617">“What ROI does this BESS have?”</strong></p>
<p dir="auto" data-start="6619" data-end="6625">It is:</p>
<p dir="auto" data-start="6627" data-end="6776"><strong data-start="6627" data-end="6776">“Which demand peaks and price spreads create the return, how often can the battery capture them, and what happens when those assumptions change?”</strong></p>
<p dir="auto" data-start="6778" data-end="6814" data-is-last-node="" data-is-only-node="">That is the ROI model I would trust.</p>
<p dir="auto" data-start="6778" data-end="6814" data-is-last-node="" data-is-only-node=""><img src="/assets/images/blog/how-to-calculate-commercial-bess-roi-from-demand-charges-and-energy-arbitrage/3_685.jpg" alt="How to Calculate Commercial BESS ROI from Demand Charges and Energy Arbitrage" width="400" height="400" loading="lazy" decoding="async"></p>
<h2 dir="auto" data-section-id="1xvwnkw" data-start="0" data-end="7">FAQs</h2>
<h3 dir="auto" data-section-id="1to80nj" data-start="9" data-end="63">1. How do you calculate ROI for a commercial BESS?</h3>
<p dir="auto" data-start="65" data-end="100">A simple first-pass calculation is:</p>
<p dir="auto" data-start="102" data-end="160"><strong data-start="102" data-end="160">Annual ROI = Annual Net Benefit ÷ Total Installed Cost</strong></p>
<p dir="auto" data-start="162" data-end="292">Annual net benefit should include realistic <strong data-start="206" data-end="291">demand-charge savings and energy-arbitrage savings minus O&amp;M and monitoring costs</strong>.</p>
<h3 dir="auto" data-section-id="jcvg0e" data-start="294" data-end="351">2. How does peak shaving improve commercial BESS ROI?</h3>
<p dir="auto" data-start="353" data-end="606">The BESS discharges when facility demand approaches a costly peak, reducing the kW value used for demand billing. Savings depend on the <strong data-start="489" data-end="605">demand-charge rate, achievable peak reduction, billing rules, and battery availability during critical intervals</strong>.</p>
<h3 dir="auto" data-section-id="15qr0vm" data-start="608" data-end="665">3. How should energy arbitrage savings be calculated?</h3>
<p dir="auto" data-start="667" data-end="916">Compare the value of electricity avoided during expensive periods with the actual cost of charging the battery during cheaper periods. <strong data-start="802" data-end="844">Round-trip efficiency must be included</strong>, because more energy must be purchased than the battery later delivers.</p>
<h3 dir="auto" data-section-id="1460eer" data-start="918" data-end="998">4. Can demand-charge savings and energy-arbitrage savings be added together?</h3>
<p dir="auto" data-start="1000" data-end="1238">Only when the dispatch model proves both can be achieved. Peak shaving and arbitrage compete for the same <strong data-start="1106" data-end="1168">battery energy, PCS power, SoC, and charging opportunities</strong>, so simply adding their theoretical maximum values can overstate ROI.</p>
<h3 dir="auto" data-section-id="o73yrx" data-start="1240" data-end="1289">5. Why can a larger BESS produce a lower ROI?</h3>
<p dir="auto" data-start="1291" data-end="1580" data-is-last-node="" data-is-only-node="">Once the economically important peaks and tariff opportunities are covered, additional battery capacity may generate little extra revenue. The best economic size is therefore determined by the <strong data-start="1484" data-end="1549">load profile, tariff, dispatch strategy, and marginal savings</strong>, not maximum battery capacity.</p>
