---
title: "How Does Time-of-Use Arbitrage Work with a C&I BESS? Tariff Spreads, Efficiency, and Dispatch Strategy"
category: "Buyer guide"
excerpt: "Time-of-use arbitrage uses a C&I BESS to charge when electricity is relatively inexpensive and discharge when grid electricity is more expensive."
publishDate: "2026-09-29T17:22:06Z"
updatedDate: "2026-09-29T17:49:33Z"
seo:
  title: "How Does Time-of-Use Arbitrage Work with a C&I BESS?"
featuredImage: "/assets/images/blog/how-does-time-of-use-arbitrage-work-with-a-c-i-bess-tariff-spreads-efficiency-and-dispatch-strategy/1_698.jpg"
relatedProducts:
  - "honey-125kw-261kwh-all-in-one-ess"
---

<h2>The Highest Electricity Price Is Not Always the Best Time to Discharge</h2>
<p><strong>Time-of-use arbitrage uses a C&amp;I BESS to charge when electricity is relatively inexpensive and discharge when grid electricity is more expensive. But the tariff spread alone does not determine the value. Round-trip losses, battery SoC, charge and discharge power, degradation, demand charges, solar production, and backup reserve all affect the dispatch decision. In practice, the EMS may deliberately keep the battery idle during an expensive tariff period if a higher-value demand peak is expected later.</strong></p>
<p><img src="/assets/images/blog/how-does-time-of-use-arbitrage-work-with-a-c-i-bess-tariff-spreads-efficiency-and-dispatch-strategy/1_698.jpg"  alt="C and I BESS time of use arbitrage tariff spread charging" width="400" height="400" loading="lazy" decoding="async"></p>
<p>NREL models commercial battery storage with both power and energy ratings and explicitly includes round-trip efficiency and cycling assumptions in its performance and economic framework.</p>
<p>The easiest way to understand arbitrage is to follow one factory through a working day.</p>
<h2>01:00 — Cheap Electricity Arrives</h2>
<p>Assume this illustrative tariff:</p>
<div>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Period</th>
<th>Electricity Price</th>
</tr>
</thead>
<tbody>
<tr>
<td>00:00–06:00</td>
<td>$0.08/kWh</td>
</tr>
<tr>
<td>06:00–16:00</td>
<td>$0.13/kWh</td>
</tr>
<tr>
<td>16:00–21:00</td>
<td>$0.22/kWh</td>
</tr>
<tr>
<td>21:00–24:00</td>
<td>$0.12/kWh</td>
</tr>
</tbody>
</table></div>
</div>
</div>
</div>
<p>The factory has a <strong>500kWh-class BESS</strong>.</p>
<p>At 01:00, battery SoC is 25%.</p>
<p>The obvious command is:</p>
<blockquote>
<p>Charge.</p>
</blockquote>
<p>But how much?</p>
<p>If tomorrow's rooftop PV is expected to produce substantial surplus energy, charging the battery to 100% overnight may waste a free charging opportunity at midday.</p>
<p>If no PV exists and the battery will face a long evening peak, a higher overnight target may make sense.</p>
<p>So the EMS needs more than a clock.</p>
<p>It needs a target SoC based on the next expected duty.</p>
<h2>05:30 — Did We Finish Charging in Time?</h2>
<p>Suppose the EMS wants to add <strong>300kWh</strong> before the off-peak window closes.</p>
<p>There are five hours available.</p>
<p>Ignoring losses for a first check:</p>
<p><strong>300kWh ÷ 5h = 60kW</strong></p>
<p>The battery therefore needs approximately 60kW of average charging power at the battery side before accounting for the actual charging-path losses and operating constraints.</p>
<p>If the PCS can charge at only 50kW, the tariff strategy is physically impossible as written.</p>
<p>A larger battery does not solve that problem.</p>
<p>The project needs enough <strong>kW to move the required kWh inside the tariff window</strong>.</p>
<p>This is one reason PCS power belongs in an arbitrage model from the beginning.</p>
<h2>11:30 — Solar Changes the Value of Stored Energy</h2>
<p>Production is running and rooftop PV now exceeds facility demand by 80kW.</p>
<p>The BESS has room available.</p>
<p>The EMS now has several options:</p>
<p><strong>charge from surplus PV</strong></p>
<p><strong>export the surplus</strong></p>
<p><strong>curtail PV if required</strong></p>
<p>or hold battery capacity for another purpose.</p>
<p>The right decision depends on the site's export value and later electricity prices.</p>
<p>If exported solar earns little while evening grid electricity costs $0.22/kWh, storing the surplus may be attractive.</p>
<p>If export compensation is strong, the calculation changes.</p>
<p><strong>Stored energy only adds economic value when the avoided on-peak purchase exceeds the round-trip losses, battery degradation, and other costs associated with storing and releasing that energy.</strong></p>
<h2>16:00 — The Tariff Jumps to $0.22/kWh</h2>
<p>Now the classic arbitrage opportunity appears.</p>
<p>Assume the BESS will deliver <strong>200kWh</strong> during the expensive period.</p>
<p>For a simplified worked example, use:</p>
<p><strong>Off-peak charging price = $0.08/kWh</strong></p>
<p><strong>Peak electricity price = $0.22/kWh</strong></p>
<p><strong>Round-trip efficiency = 90%</strong></p>
<p>To deliver 200kWh later, the system would need approximately:</p>
<p><strong>200 ÷ 0.90 = 222.2kWh</strong></p>
<p>of charging energy under this simplified efficiency assumption.</p>
<p>Charging cost:</p>
<p><strong>222.2 × $0.08 ≈ $17.78</strong></p>
<p>Value of 200kWh of avoided peak grid purchase:</p>
<p><strong>200 × $0.22 = $44.00</strong></p>
<p>Illustrative gross arbitrage value:</p>
<p><strong>$44.00 − $17.78 = $26.22</strong></p>
<p>That is the value of this simplified energy-price shift before considering other project costs or competing battery uses.</p>
<p>It is not $28.</p>
<p>Simply multiplying:</p>
<p><strong>200 × ($0.22 − $0.08)</strong></p>
<p>would ignore the extra charging energy required because of losses.</p>
<h2>17:30 — The EMS Refuses to Discharge</h2>
<p>The electricity price is still high.</p>
<p>Yet the EMS holds the battery.</p>
<p>Why?</p>
<p>At 18:00, several production lines are expected to overlap.</p>
<p>The facility pays a demand charge based on its billing peak.</p>
<p>If aggressive arbitrage at 16:00 leaves insufficient SoC to shave the 18:00 demand event, the factory might save a few dollars on energy and lose much more on demand charges.</p>
<p>The battery cannot spend the same stored kWh twice.</p>
<p>So the EMS may preserve:</p>
<p><strong>100–150kWh</strong></p>
<p>for the expected demand peak.</p>
<p>This is where a simple tariff schedule becomes a dispatch strategy.</p>
<p>For a Ruibit/Dawnice C&amp;I project, I would therefore ask whether the system is expected to perform:</p>
<p><strong>energy arbitrage only</strong></p>
<p>or</p>
<p><strong>arbitrage + peak shaving + PV shifting + backup</strong></p>
<p>before deciding how much usable energy can actually be assigned to each job.</p>
<h2>18:05 — Peak Shaving Takes Priority</h2>
<p>Factory demand reaches:</p>
<p><strong>680kW</strong></p>
<p>The site's target grid demand is:</p>
<p><strong>550kW</strong></p>
<p>Required BESS contribution:</p>
<p><strong>680 − 550 = 130kW</strong></p>
<p>Now the PCS needs to deliver approximately 130kW for peak shaving.</p>
<p>If the PCS is rated only 100kW, no EMS algorithm can make it provide 130kW continuously beyond its permitted capability.</p>
<p>If the battery has only 40kWh available, it may also lack enough energy to sustain the reduction for a long event.</p>
<p>Arbitrage and peak shaving therefore compete along two dimensions:</p>
<p><strong>PCS kW</strong></p>
<p>and</p>
<p><strong>available battery kWh</strong>.</p>
<p>The control strategy has to protect both.</p>
<h2>21:00 — Should the Battery Be Empty?</h2>
<p>Not necessarily.</p>
<p>Suppose the tariff falls to $0.12/kWh, but the customer requires 20% SoC reserved for backup.</p>
<p>That reserve is not available for ordinary arbitrage.</p>
<p>Keeping energy unused may look inefficient on a daily revenue spreadsheet.</p>
<p>But the customer bought resilience too.</p>
<p>The EMS has to respect that requirement.</p>
<p>A financial model that assumes the battery uses 100% of available energy for arbitrage while simultaneously maintaining a full backup reserve is double-counting the asset.</p>
<h2>The Tariff Spread Needs a Break-Even Check</h2>
<p>There is a useful way to test whether a price spread is even worth examining.</p>
<p>If off-peak electricity costs:</p>
<p><strong>$0.10/kWh</strong></p>
<p>and round-trip efficiency is:</p>
<p><strong>90%</strong></p>
<p>then the energy cost required to deliver 1kWh later is approximately:</p>
<p><strong>$0.10 ÷ 0.90 = $0.111/kWh</strong></p>
<p>So a peak price only slightly above $0.111/kWh leaves very little gross arbitrage value before considering degradation, auxiliary consumption, O&amp;M, or other costs.</p>
<p>The spread has to survive the losses.</p>
<p>That is more useful than simply asking:</p>
<blockquote>
<p>What is the difference between peak and off-peak prices?</p>
</blockquote>
<h2>What I Want Before Modeling C&amp;I Arbitrage</h2>
<p>For a serious project, I would request:</p>
<p><strong>interval load data</strong></p>
<p><strong>complete tariff schedule</strong></p>
<p><strong>demand-charge rules</strong></p>
<p><strong>PV generation data</strong></p>
<p><strong>PCS charge/discharge limits</strong></p>
<p><strong>usable battery energy</strong></p>
<p><strong>round-trip efficiency and its measurement boundary</strong></p>
<p><strong>minimum and maximum SoC</strong></p>
<p><strong>backup reserve</strong></p>
<p><strong>expected cycling limits</strong></p>
<p><strong>EMS operating priorities</strong></p>
<p>Then I would simulate the actual dispatch rather than assume one perfect charge/discharge cycle every day.</p>
<p>DOE's battery-storage evaluation methodology similarly emphasizes measured performance and defined efficiency and capacity metrics when evaluating BESS operation.</p>
<p><strong>So don't quote an arbitrage project from battery capacity alone. Ask the supplier to verify energy capacity, PCS power, charge window, control logic, and reserve requirements.</strong></p>
<h2>Arbitrage Is an EMS Decision, Not Just a Tariff Calculation</h2>
<p>The simple version of time-of-use arbitrage is:</p>
<p><strong>charge low → discharge high</strong></p>
<p>A real C&amp;I site adds another layer:</p>
<p><strong>Is cheap electricity available long enough to charge?</strong></p>
<p><strong>Will PV provide cheaper energy later?</strong></p>
<p><strong>How much does round-trip efficiency remove from the spread?</strong></p>
<p><strong>Is a demand peak coming?</strong></p>
<p><strong>How much SoC must remain for backup?</strong></p>
<p><strong>Can the PCS move enough power when the opportunity arrives?</strong></p>
<p><strong>Is using the battery now more valuable than saving it for the next event?</strong></p>
<p>That final question is where the EMS earns its place.</p>
<p><strong>The cheapest electricity is not automatically the best time to charge, and the highest tariff is not automatically the best time to discharge. The better dispatch is the one that assigns limited battery kW and kWh to the highest-value job without counting the same stored energy twice.</strong></p>
<p><img src="/assets/images/blog/how-does-time-of-use-arbitrage-work-with-a-c-i-bess-tariff-spreads-efficiency-and-dispatch-strategy/1_826.jpg"  alt="commercial battery EMS dispatch strategy discharge window" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<h3>1. How does time-of-use arbitrage work with a C&amp;I BESS?</h3>
<p>The BESS charges when electricity is relatively inexpensive and discharges during higher-price periods. Actual value depends on the <strong>tariff spread, efficiency, battery limits, and EMS dispatch strategy</strong>.</p>
<h3>2. How does round-trip efficiency affect BESS arbitrage savings?</h3>
<p>Energy losses mean the BESS must buy more charging energy than it later delivers. The <strong>avoided peak electricity cost must exceed charging costs, losses, degradation, and other operating costs</strong>.</p>
<h3>3. Why might the EMS avoid discharging during an expensive tariff period?</h3>
<p>The EMS may preserve SoC for a <strong>higher-value demand peak, backup reserve, or another expected event</strong> instead of using the battery immediately for arbitrage.</p>
<h3>4. What data is needed to evaluate C&amp;I BESS arbitrage?</h3>
<p>Use <strong>interval load data, tariff schedules, demand charges, PV generation, PCS limits, usable battery energy, round-trip efficiency, SoC limits, backup reserve, and EMS priorities</strong>.</p>
<h3>5. Can the same battery energy be used for arbitrage and peak shaving?</h3>
<p>Not simultaneously. Using stored energy for arbitrage reduces the SoC available for later peak shaving, so the EMS must prioritize the higher-value duty.</p>
