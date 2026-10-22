---
title: "What Does Whole-Home Backup Actually Require?"
category: "System design"
excerpt: "Whole-home backup is a claim about one number: the coincident peak demand of the whole house, measured at the point where the backup supply takes over."
publishDate: "2026-10-07T15:18:44Z"
featuredImage: "/assets/images/blog/what-does-whole-home-backup-actually-require/1_58.jpg"
relatedProducts:
  - "dw-home-all-in-one-ess"
  - "powerfly-hzeb-lct-20"
---

<p><strong>Whole-home backup is a claim about one number: the coincident peak demand of the whole house, measured at the point where the backup supply takes over. It is not the daily energy total, and it is not the sum of the appliance labels. The quotation follows from how that number was arrived at.</strong></p>
<h2>The one number is the whole-house coincident peak</h2>
<p>The coincident peak is the highest simultaneous demand the property presents, in kilowatts, measured while the house runs normally. Coincidence is what makes it different from a nameplate sum. A house with a 3.6 kW oven, a 2.5 kW air conditioner and a 7 kW charger carries three labels that add to 13.1 kW, but the backup supply only has to carry the part that runs at the same instant.</p>
<p>Those figures are illustration rather than site data: labels add, loads overlap. A quotation built on added labels is larger than the house requires and can still miss the appliance that dominates.</p>
<p><img src="/assets/images/blog/what-does-whole-home-backup-actually-require/1_58.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>Where the number comes from</h2>
<p>Measure at the transfer point, over a period long enough to include the household's peak season. A meter or clamp there records what the house presents; an appliance list records what the household believes it owns.</p>
<p>No product page can supply this number, because it belongs to the property. Ruibit publishes the equipment side of the comparison on the product pages, and the house side has to come from a measurement at the site.</p>
<p>The distinction matters commercially: two houses with identical daily consumption can present peaks differing by a factor of two, depending on whether the load spreads across the day or concentrates into an evening window. An energy-only quotation cannot compare those two houses on the same basis.</p>
<h2>What the number implies for the backup path</h2>
<p>The backup path has to carry the coincident peak continuously, for as long as the outage lasts. On the all-in-one models published for this line, the continuous output is stated directly:</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Published model</th>
<th>Continuous output</th>
<th>Surge capability as published</th>
</tr>
</thead>
<tbody>
<tr>
<td>All-in-One 6 kW with 10 kWh</td>
<td>6 kW</td>
<td>9 kW</td>
</tr>
<tr>
<td>All-in-One 10 kW with 20 kWh</td>
<td>10 kW</td>
<td>15 kW</td>
</tr>
<tr>
<td>LumiSun-32K</td>
<td>12 kW, three-phase</td>
<td>Not stated on the page</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>The published specification states these ratings as of 2026-10.</em></p>
<p>Two consequences follow. If the measured peak sits above a single unit's published continuous output, whole-home backup needs a larger unit, or the house is split into a backed-up portion and a portion that drops during an outage. That split is the whole difference between whole-home backup and essential-load backup, and one number decides it.</p>
<p>The second consequence is that the inverter is not the only ceiling. The battery publishes its own discharge current per model, 50 A on the 5 kWh unit through 200 A on the 20 kWh, so at 51.2 V nominal its continuous contribution is also finite. If the battery's current binds first, the path is limited by the battery and not the inverter, and a quotation built on the inverter rating alone has priced one of two limits.</p>
<h2>What the number does not tell you</h2>
<p>It does not tell you how long. The published page for the 10 kW unit with 20 kWh states 12 to 24 hours of whole-home backup, and no published page states the load that duration assumes. Treating the published capacity as the ceiling, 20 kWh spread over 12 hours implies about 1.67 kW, and over 24 hours about 0.83 kW, both far below the 10 kW continuous rating of that model. The duration claim and the power rating describe two different operating points, and only the second one is the number that decides whether the whole house is backed up.</p>
<p>It does not tell you whether the peak holds either. A starting load presents a higher demand than its running demand, for a period of time, and that duration is a separate measurement.</p>
<p>Nor does it survive being taken from a bill: a monthly energy figure is an average, and an average cannot distinguish a house peaking at 4 kW from one peaking at 11 kW on the same daily total.</p>
<h2>When the number changes</h2>
<p>Electrification moves the peak more than it moves the daily total. When heating or charging is added, the peak can rise sharply while the daily energy figure stays inside the range the original quotation covered, so a package sized on energy alone can pass its own review and still fail on the evening the new load arrives.</p>
<p>The change is also not gradual. One appliance resets the number, which means the number has a date, and a peak measured before an electrification step describes a house that no longer exists.</p>
<h2>What to confirm before ordering</h2>
<p>Ask for the coincident peak the package is quoted against, in kilowatts, and whether it was measured at the transfer point or summed from appliance labels. Ask for the measurement condition behind that peak, meaning the season it covers and where it was taken. Ask whether the published continuous output is quoted at the ambient temperature of the planned location, since no page in this range attaches a temperature to its output figure.</p>
<p>Ask whether the capacity behind any duration claim is nameplate or usable. No published page in this range states a usable capacity figure, so a duration quoted from nameplate has not stated its own basis.</p>
<p>Ask which circuits sit on the backed-up path and who decides the split, because that answer converts an equipment list into a scope.</p>
<p>Two items cannot be changed once the installation is done. The transfer architecture is the first: a whole-house transfer arrangement and a backed-up subpanel are different builds, and converting one into the other is a rewire rather than an adjustment. The split of circuits is the second, because it follows the architecture.</p>
<p>At handover, record the measured coincident peak and its date, the circuits left on the backed-up path, and the published continuous limit of the equipment as installed. Those three lines are what a later complaint about a tripping backup, or a warranty question about overload, will be compared against.</p>
<p><img src="/assets/images/blog/what-does-whole-home-backup-actually-require/1_892.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What single number decides whether whole-home backup is possible?</strong></p>
<p>The coincident peak demand of the house in kilowatts, measured at the point where the backup supply takes over. It is the highest simultaneous demand the property presents, so it is neither the daily energy total nor the sum of the appliance labels.</p>
<p><strong>2. Why can I not just add up the appliance labels?</strong></p>
<p>Because loads overlap rather than accumulate. A house with a 3.6 kW oven, a 2.5 kW air conditioner and a 7 kW charger has labels adding to 13.1 kW, but the backup supply only carries what runs at the same instant. An added list can be too large and still miss the appliance that actually dominates the peak.</p>
<p><strong>3. Does a duration claim of 12 to 24 hours prove whole-home backup?</strong></p>
<p>No, because the load it assumes is not stated. Treating the published 20 kWh capacity as the ceiling, 12 hours implies about 1.67 kW and 24 hours about 0.83 kW, both far below the model's published 10 kW continuous output. The duration and the power rating describe different operating points.</p>
<p><strong>4. Is the inverter the only limit on the backed-up load?</strong></p>
<p>No. The battery publishes its own discharge current per model, 50 A on the 5 kWh unit through 200 A on the 20 kWh unit, so at 51.2 V nominal it also has a finite continuous contribution. The lower of the inverter and battery figures governs the path.</p>
<p><strong>5. When does the number have to be measured again?</strong></p>
<p>After any electrification step. Adding a charger or moving heating and cooking onto electricity raises the coincident peak sharply while often leaving monthly energy within the range an existing quotation covered, so a peak measured before that step describes a house that no longer exists.</p>
