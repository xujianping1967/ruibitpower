---
title: "AC-Coupled vs DC-Coupled Home Solar Storage: Which Fits Your Setup?"
category: "System design"
excerpt: "The coupling argument is normally about efficiency, and the decision that settles a real project is about how many grid-interactive sources end up energised."
publishDate: "2026-09-25T12:57:13Z"
seo:
  title: "AC-Coupled vs DC-Coupled Home Solar Storage"
featuredImage: "/assets/images/blog/ac-coupled-vs-dc-coupled-home-solar-storage-which-fits-your-setup/2_281.jpg"
relatedProducts:
  - "powerfly-hzeb-lct-10"
  - "six-ultra-bs06-s-hv-stackable"
---

<p><strong>The coupling argument is normally about efficiency, and the decision that settles a real project is about how many grid-interactive sources end up energised on the same AC bus.</strong></p>

<h2>Before: one source and one protection arrangement</h2>
<p>A grid-tied rooftop system is electrically simple: the array feeds one inverter, that inverter feeds one circuit in the consumer unit, and the device protecting that circuit was selected for the fault current one source can deliver.</p>
<p>The survey discipline published for this range treats the main breaker rating and the export limit as survey items, and states the consequence without softening it: a 50 A main breaker does not support a 16 kW inverter on a single-phase connection even if the inverter itself can. A published project record shows what that check is worth: the service entrance capacity had to be verified before a split-phase unit was approved, and the panel upgrade scope moved the budget by 15 percent.</p>
<h2>What the published specification supports</h2>
<p>Both paths are published, with the condition for each stated rather than implied. The product page for the All-in-One 10 kW / 20 kWh system states that a system using a string inverter with AC output can be connected via AC coupling, and that a DC-coupled solar array can connect directly to its MPPT inputs. The same page publishes dual MPPT with a maximum 12 kW of solar input across a 120 to 500 V DC window, 10 kW continuous output with 15 kW surge, and 20 kWh of battery at 51.2 V and 400 Ah.</p>
<p>Read as an interface document, that pair of sentences draws the line the decision turns on. AC coupling keeps the existing inverter and asks the new equipment to sync onto a bus the old inverter is already energising. DC coupling removes the old inverter from the energy path and puts the array on the new unit's own inputs.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Interface question</th>
<th>AC-coupled path</th>
<th>DC-coupled path</th>
</tr>
</thead>
<tbody>
<tr>
<td>Grid-interactive sources on the AC bus</td>
<td>Two: the existing PV inverter and the battery inverter</td>
<td>One: the replacement unit</td>
</tr>
<tr>
<td>Existing PV inverter</td>
<td>Retained and still energised</td>
<td>Removed from the energy path, array re-terminated on the new MPPT inputs</td>
</tr>
<tr>
<td>Array voltage window</td>
<td>Settled by the existing inverter, unchanged</td>
<td>Re-verified against the published 120 to 500 V DC window</td>
</tr>
<tr>
<td>Fault current at the existing circuit</td>
<td>Contributed by both inverters</td>
<td>Contributed by one device</td>
</tr>
<tr>
<td>Existing array certificate</td>
<td>Remains part of the installation</td>
<td>Replaced by the new unit's certification</td>
</tr>
<tr>
<td>Extra conversion stage</td>
<td>Present between PV and battery</td>
<td>Absent</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>The published figures are quoted from the product page for the All-in-One 10 kW / 20 kWh system, verified as of 2026-09. The interface rows are an engineering description of the two architectures, not a quotation from any page.</em></p>
<h2>The interface that actually changes</h2>
<p>Two sources can energise the same bus, which is the whole after-state difference. It changes what the device at the point of connection protects against, because fault current can now arrive from a direction that was not present before.</p>
<p>The two paths are only comparable on the same basis: the measurement boundary is the AC bus for one and the unit's own inputs for the other.</p>
<p>It also changes when the existing protection arrangement stops being adequate. Nothing new has to fail for that to happen; the arrangement describes a system with one source, and the installation now has two.</p>
<p>DC coupling does not avoid the question, it relocates it. The array moves onto the new unit's inputs, so that unit's published string window becomes the binding constraint, and the AC-side circuit carries one source again.</p>
<h2>What the published pages do not state</h2>
<p>This is where the two paths are described with different levels of detail, which matters to a buyer writing a scope.</p>
<p>Protection inside the new unit is published for several models in this range: one states surge protection, ground fault protection and arc fault detection, and another states a protection suite with AFCI and GFDI. Residual current protection at the installation level is a different matter: across the published pages in this range, no requirement for a residual current device type, and no residual current device reference at all, is published. Grounding and neutral reference arrangements are published with the same silence. Ruibit publishes the coupling method and the array window for this model, but not the interface protection design.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Published for the AC interface</th>
<th>Left open by the published pages</th>
</tr>
</thead>
<tbody>
<tr>
<td>AC coupling supported through an existing string inverter</td>
<td>The residual current device type required at the interface</td>
</tr>
<tr>
<td>DC coupling into the unit's own MPPT inputs</td>
<td>The neutral and earth reference arrangement at the interface</td>
</tr>
<tr>
<td>Internal surge, ground fault and arc fault protection</td>
<td>Protection coordination between the two sources and the existing device</td>
</tr>
<tr>
<td>10 kW continuous, 15 kW surge output</td>
<td>Which party owns the interface protection design</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Verified as of 2026-09 across the published product pages in this range. The right-hand column is a statement about what the pages do not contain, not a statement that no requirement exists.</em></p>
<h2>Cost and side effects</h2>
<p>AC coupling keeps a working inverter in service, which is real value, and it pays for that in three places. Conversion happens twice between the array and the battery, so the published round-trip efficiency describes the battery's own path, not this one. A second inverter stays powered when the array is idle, a continuous draw no capacity figure covers. And the interface protection design becomes a coordination exercise between two manufacturers' devices.</p>
<p>DC coupling removes the second conversion and the second source, and pays for it in array work: the strings are re-terminated and their window re-checked, which is a string design exercise rather than part of this comparison.</p>
<h2>Which fits, and on what condition</h2>
<p>If the existing PV inverter is recent, meets the local connection requirements and the array window sits inside the published 120 to 500 V DC range, AC coupling fits, because working equipment stays in service.</p>
<p>If the array is out of that window, or the existing inverter is at the end of its service life, or the household wants one device responsible for both the array and the battery, DC coupling fits, because re-terminating strings is cheaper than running two devices with undesigned protection coordination.</p>
<p>If the array window is unknown at quotation time, neither fits yet. The architecture cannot be reversed cheaply once the array has been re-terminated.</p>
<p>Three things belong in writing before the order. Ask which party owns the interface protection design and what the residual current device selection is, since no page in this range publishes it. Ask whether the existing inverter stays certified as part of the installation if it is retained. Ask for the array voltage window at the expected minimum and maximum cell temperature, which decides whether either path is available.</p>
<p>At handover, record the number of grid-interactive sources on the AC bus, the device that protects the point of connection, and the array window the choice was based on. A system handed over with two sources and one single-source protection design is the failure this whole decision exists to prevent.</p>
<p><img src="/assets/images/blog/ac-coupled-vs-dc-coupled-home-solar-storage-which-fits-your-setup/2_762.jpg" alt="AC-Coupled vs DC-Coupled Home Solar Storage - Which Fits Your Setup" width="400" height="380" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What is the real difference between AC coupling and DC coupling?</strong></p>
<p>It is how many grid-interactive sources end up on the AC bus. AC coupling keeps the existing PV inverter and adds a battery inverter beside it, so two sources can energise the same bus. DC coupling removes the existing inverter from the energy path and puts the array on the new unit's own MPPT inputs, leaving one source.</p>
<p><strong>2. Which setups fit AC coupling?</strong></p>
<p>Ones where the existing PV inverter is recent, meets the local connection requirements, and the array voltage window sits inside the published range of the new unit. Keeping working equipment in service is the gain, and the price is an extra conversion stage plus a second device drawing standby power.</p>
<p><strong>3. Which setups fit DC coupling?</strong></p>
<p>Ones where the array falls outside the published 120 to 500 V DC window of the all-in-one unit, where the existing inverter is near the end of its service life, or where the household wants one device responsible for both the array and the battery.</p>
<p><strong>4. Does the published specification cover the protection interface?</strong></p>
<p>Partly. The product pages publish AC coupling through an existing string inverter, DC coupling into the unit's own MPPT inputs, and internal surge, ground fault and arc fault protection. They do not publish the residual current device type, the neutral and earth reference arrangement, or which party owns the interface protection design.</p>
<p><strong>5. What should be confirmed in writing before ordering?</strong></p>
<p>Which party owns the interface protection design and what residual current device is specified, whether a retained inverter stays certified as part of the installation, and the array voltage window at the expected minimum and maximum cell temperature.</p>
