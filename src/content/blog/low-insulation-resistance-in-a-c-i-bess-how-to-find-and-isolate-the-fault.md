---
title: "Low Insulation Resistance in a C&I BESS: How to Find and Isolate the Fault"
category: "Technology"
excerpt: "The insulation alarm clears at 14:20. It is back at 09:05 the next morning, with no load change overnight and no water on the pad."
publishDate: "2026-10-03T16:27:07Z"
seo:
  title: "Low Insulation Resistance in a C&I BESS"
featuredImage: "/assets/images/blog/low-insulation-resistance-in-a-c-i-bess-how-to-find-and-isolate-the-fault/1_729.jpg"
relatedProducts:
  - "loong-power-bs09-112-dp"
  - "honey-wd-ecf260s-dc-outdoor"
---

<p><strong>The insulation alarm clears at 14:20. It is back at 09:05 the next morning, with no load change overnight and no water on the pad. That pattern is not an intermittent monitor. It is a fault the reading was never able to locate, because a single resistance figure reports the parallel sum of every leakage path on the bus and says nothing about which one moved.</strong></p>

<h2>T+0: the alarm and the number behind it</h2>
<p>The published protection wording for the 265 kWh cabinet, model BS07-265-ES-X, reads three-layer protection architecture with real-time fault diagnosis. That tells you a diagnosis layer exists. It does not tell you the configured threshold, the test voltage, or what change the monitor can resolve.</p>
<p>Convert the reading before judging it. At the published rated battery voltage of 844.8 V for that cabinet, 1 megohm is 0.845 mA of leakage current and 100 kilohm is 8.45 mA. On the container, whose published rated battery voltage is 665.6 V, the same two readings are 0.666 mA and 6.66 mA. That conversion is arithmetic on published voltages, not a measurement. Amperes are what the isolation decision is about, and a threshold published only in megohms is a threshold nobody on site can check.</p>
<h2>T+40 minutes: the reading that cannot locate anything</h2>
<p>Everything connected to the DC bus contributes to the same measurement in parallel. A faulty section reading 1 megohm sitting beside a healthy section reading 50 megohms produces 980.4 kilohm at the terminals. If you read only the total, that fault appears as a shift of about 2 percent.</p>
<p>That has two consequences you can use. A whole-bus reading can sit inside the normal band while a real fault is present, and a reading that looks ordinary can be the sum of one bad section and several clean ones. The number is a starting condition, not a location.</p>
<h2>T+2 hours: the half-split that makes the fault visible</h2>
<p>Open the DC disconnects, discharge the section you are about to test, and measure each side against earth separately. If the low reading stays with the half you kept connected, the fault is in it; if the reading moves to the half you opened, the fault is on that side instead. Keep the half carrying the low reading and split it again. Halving finds one faulty unit in 2 steps on a 4-unit bus, 4 steps on a 10-unit bus and 5 steps on a 20-unit bus; checking one unit at a time takes up to 4, 10 and 20.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Bus size</th>
<th>Steps to isolate one unit by halving</th>
<th>Steps checking one unit at a time</th>
</tr>
</thead>
<tbody>
<tr>
<td>4 units</td>
<td>2</td>
<td>up to 4</td>
</tr>
<tr>
<td>10 units</td>
<td>4</td>
<td>up to 10</td>
</tr>
<tr>
<td>20 units</td>
<td>5</td>
<td>up to 20</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Conditions: one faulty section on the bus; each step is a separate measurement against earth with the section disconnected and the ambient temperature recorded. Units: measurement steps. Source: derived from the segment count; no published field data used.</em></p>
<p>Two habits decide whether the split works: discharge before measuring, since residual charge corrupts the first reading of every step, and record the temperature beside every reading.</p>
<h2>The boundaries the system already publishes</h2>
<p>The container's published specification separates the electrical compartment from the battery compartment. That is a measurement boundary the system ships with, so the first split costs no outage.</p>
<p>The published isolation transformer, rated 315/400 V, is the second boundary. It separates the battery DC system from the grid side, which means a low reading on the battery side and a low reading on the grid side are two different faults, with two different owners and two different shutdown procedures.</p>
<p>The cabinet publishes IP54 with corrosion class C4 and the container IP54 with C5. Neither figure is a statement about condensation, and the published humidity line for the container reads 0 to 95 percent, non-condensing. That is the published line that matters when a reading falls overnight.</p>
<h2>Next morning: the reading that was not comparable</h2>
<p>This is usually where the fault reappears. Insulation resistance falls as temperature falls and moisture condenses, so a reading taken at 09:05 and one taken at 40 degrees C are not two readings of the same quantity, whatever the display implies. If the two readings were taken at different temperatures, treat the comparison as unproven until both are repeated under the same conditions.</p>
<p>The published factory test requirement for this equipment records insulation resistance at the specified test voltage with ambient conditions. That is the comparison the field reading has to meet: same test voltage, same duration, conditions written beside the number. A comparison without the conditions is not evidence, it is two numbers.</p>
<h2>What to ask for, and what is fixed at commissioning</h2>
<p>Three questions carry most of this.</p>
<p>Ask for the configured threshold, the test voltage and the resolution the monitor can resolve. A reply that gives only a megohm threshold leaves the leakage current it corresponds to undefined.</p>
<p>Ask which compartment boundaries and which disconnects can be opened without a full shutdown procedure. A reply that the whole bank must come off to test it has just priced the diagnosis as a multi-hour outage.</p>
<p>Ask for the insulation readings from the factory and acceptance tests, with their conditions. Without them the first low reading on site has nothing to compare against.</p>
<p>Four things become fixed at commissioning. The configured threshold is fixed once the BMS parameters are signed off, and moving it later means a firmware change and a retest. The compartment and disconnect boundaries are fixed once the enclosure is built. The test voltage and duration in the acceptance record are fixed once that record is signed, so later readings must repeat that pair or they are not comparable. And the responsibility boundary at the isolation transformer is fixed once the scope of supply is signed, where a fault on the far side stays the other party's.</p>
<p>A buyer cannot pull a factory test sheet for a specific serial number out of the manufacturer's system; Ruibit distributes these units and is the route through which that record is obtained.</p>
<p>The step worth moving earlier is the first half-split. Everything before it produces a number, and only the split produces a location.</p>
<p><img src="/assets/images/blog/low-insulation-resistance-in-a-c-i-bess-how-to-find-and-isolate-the-fault/1_652.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What does a low insulation reading actually measure?</strong></p>
<p>The parallel resistance of every leakage path connected to the DC bus. A faulty section at 1 megohm beside a healthy section at 50 megohms reads 980.4 kilohm at the terminals, a shift of about 2 percent. That figure is a starting condition, not a location.</p>
<p><strong>2. Why does the alarm clear and then return?</strong></p>
<p>Because the leakage path moves with temperature and moisture. Insulation resistance falls as the enclosure cools and moisture condenses, so a reading at 09:05 and one at 40 degrees C are not measurements of the same quantity. An alarm that returns on a schedule is usually tracking the enclosure's temperature cycle, not the load.</p>
<p><strong>3. How do I find which unit is faulty?</strong></p>
<p>Split the bus and measure each side against earth with the section disconnected and discharged. If the low reading stays with the half you kept connected, the fault is in it; if it moves to the other half, the fault is there. Halving takes 2 steps on a 4-unit bus, 4 on a 10-unit bus and 5 on a 20-unit bus.</p>
<p><strong>4. What must be recorded with each reading?</strong></p>
<p>The ambient temperature, plus the test voltage and duration. The published factory test requirement records insulation resistance at the specified test voltage with ambient conditions, and a field comparison has to repeat that pair or it is not comparable.</p>
<p><strong>5. What should be requested before commissioning?</strong></p>
<p>The configured threshold, the test voltage, the resolution the monitor can resolve, the boundaries that can be opened without a shutdown, and the factory readings with their conditions. Thresholds and boundaries are fixed once the BMS parameters and the scope of supply are signed.</p>
