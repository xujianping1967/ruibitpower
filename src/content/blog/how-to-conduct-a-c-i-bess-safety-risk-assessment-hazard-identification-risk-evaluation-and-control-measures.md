---
title: "How to Conduct a C&I BESS Safety Risk Assessment: Hazard Identification, Risk Evaluation, and Control Measures"
category: "Safety"
excerpt: "A five by five risk matrix has twenty-five cells. Sixteen of them change their rating band when one reviewer moves a single axis by one level."
publishDate: "2026-10-07T14:54:20Z"
seo:
  title: "How to Conduct a C&I BESS Safety Risk Assessment"
featuredImage: "/assets/images/blog/how-to-conduct-a-c-i-bess-safety-risk-assessment-hazard-identification-risk-evaluation-and-control-measures/2_69.jpg"
relatedProducts:
  - "dawnice-containerized-bess"
  - "honey-wd-ecf260s-dc-outdoor"
---

<p><strong>A five by five risk matrix has twenty-five cells. Sixteen of them change their rating band when one reviewer moves a single axis by one level, and every cell in the middle band does. That arithmetic, not the colour of the boxes, is what a review meeting can actually test.</strong></p>

<h2>What the review is approving, and what is outside it</h2>
<p>A risk assessment is three columns of work: hazards listed, each one rated, each rating answered by a control with an owner. It is not the product certificate, the suppression datasheet or the emergency response plan, and mixing them is why some assessments never close.</p>
<p>Out of scope here: which suppression agent is correct, who writes the emergency plan, and what a certificate covers. Those are separate documents.</p>
<h2>What each discipline in the room is protecting</h2>
<p>Every hazard gets three different colours because four people in the room are protecting four different things.</p>
<p>The fire safety engineer protects the enclosure and the responders who arrive at it. The EPC protects the installation sequence and the energisation date. The operator protects the shift and its load. The authority's or insurer's representative protects the repeatability of the record, because a rating nobody else can reproduce is not a rating.</p>
<p>None of those positions is wrong; the disagreement is rarely about the hazard, but about which axis to move.</p>
<h2>The premise that gets withdrawn</h2>
<p>Every assessment carries an unstated premise about people, and the common one is that the site is manned, so the procedures in the document are in force.</p>
<p>Take the premise away mid-review: the plant is staffed 07:00 to 19:00 and unattended for the other twelve hours. An administrative control is then in force half of the clock.</p>
<p>The published use case makes the unattended half the busy half. Off-peak charging and peak-window discharge put the highest duty on the hours when nobody is on site, so a control that is absent when the duty is highest is not a 50 percent control.</p>
<p>That is the moment to re-sort the list, and the sorting rule is one question: does the control act by itself, or does it need somebody to decide?</p>
<h2>Which ratings are worth debating</h2>
<p>The matrix in front of the room is five by five, scored as likelihood multiplied by consequence, with bands at 1 to 4, 5 to 9, and 10 and above.</p>
<p>The shape of that scheme is worth knowing before anyone argues about a colour: a one-level shift on either axis changes the band in 16 of the 25 cells, so 64 percent are fragile and 9 are robust.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Band</th>
<th>Cells in the matrix</th>
<th>Cells that change band on a one-level shift</th>
</tr>
</thead>
<tbody>
<tr>
<td>Low, score 1 to 4</td>
<td>8</td>
<td>5</td>
</tr>
<tr>
<td>Medium, score 5 to 9</td>
<td>7</td>
<td>7</td>
</tr>
<tr>
<td>High, score 10 to 25</td>
<td>10</td>
<td>4</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Conditions and units: a 5 by 5 matrix scored as likelihood multiplied by consequence, band boundaries at 5 and 10; a one-level shift moves either axis by one step with the other held. Result in cells. Source: derived from the scoring scheme.</em></p>
<p>Worked example. Seven cells sit in the middle band and all seven are fragile. A hazard scored 9 and one scored 10 are a single reviewer's opinion apart, and one is tolerable while the other is not. An hour spent debating the colour of those two boxes is an hour spent on the least reproducible part of the document.</p>
<p>The productive question is different: which hazards sit in fragile cells, and are the axis definitions written down? A likelihood scale whose levels read possible and likely has no period attached, and a scale without a period cannot be reproduced by a second reviewer. Anchoring each level to a time window is the cheapest fix available.</p>
<h2>Controls that stop working when the site empties</h2>
<p>The published specifications already describe a set of controls, and they differ between the two product families.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Control</th>
<th>265 kWh cabinet (published)</th>
<th>20GP container (published)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Suppression</td>
<td>aerosol and water mist</td>
<td>FM200 / NOVEC1230</td>
</tr>
<tr>
<td>Compartment separation</td>
<td>not published</td>
<td>electrical and battery compartments separated</td>
</tr>
<tr>
<td>Enclosure</td>
<td>IP54, C4</td>
<td>IP54, C5</td>
</tr>
<tr>
<td>Operating temperature</td>
<td>-30 to 55 degrees C, derating above 45 degrees C</td>
<td>0 to +45 degrees C</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p><em>Conditions and units: as published for the two families. Source: published specification statements, current range, 2026.</em></p>
<p>Read that table as an inventory of self-acting controls: every published item works with nobody present. An agent discharges, a compartment boundary holds, a derating point acts on the converter.</p>
<p>What the published pages do not contain is any control that needs a person, and that is exactly the layer the withdrawn premise deleted. So the test for each hazard is one sentence long: name the control that acts with nobody on site. If the honest answer is a procedure, the hazard is unmitigated for part of the day by construction and belongs in the fragile list.</p>
<h2>The decision, and the two items left open</h2>
<p>Ask which hazards carry only an administrative control and what happens to them when the site is unattended. A supplier who points to the safety manual is pointing at a document, not a barrier.</p>
<p>Ask for the likelihood axis with a time window per level; a matrix whose levels carry no period cannot be reproduced by anyone not in the room.</p>
<p>Ask which of the published controls are self-acting and which need a decision. A list that mixes the two hides the half of the day when nobody is there.</p>
<p>Four things become fixed before the assessment is signed. Compartment separation is fixed once the container is built and cannot be added on site. The suppression agent is fixed once the unit is built and its documentation issued. The published temperature window and its derating point are fixed by design, so an assessment that assumes operation above 45 degrees C relies on something unpublished. And the manning assumption is fixed once the emergency plan is issued and drilled, which is why the review has to test it now rather than after.</p>
<p>Everything published above comes from the specification pages of the units Ruibit distributes; the manning hours and scoring bands are site inputs.</p>
<p>Two items leave the room open. The likelihood anchors for the middle band are owed by the assessment author before the next review. The ownership of the administrative controls is owed by the site's operations manager before energisation. The hazard list does not need to be longer; it needs the two columns that are missing, and an owner for each row.</p>
<p><img src="/assets/images/blog/how-to-conduct-a-c-i-bess-safety-risk-assessment-hazard-identification-risk-evaluation-and-control-measures/3_69.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What should a BESS safety risk assessment contain?</strong></p>
<p>Three columns of work: the hazards listed, each one rated, and each rating answered by a control with a named owner. A rating without an owner is an observation, and a control without an owner is a sentence.</p>
<p><strong>2. Why do two reviewers score the same hazard differently?</strong></p>
<p>Because a five by five matrix is fragile in the middle. A one-level shift on either axis changes the band in 16 of the 25 cells, and all seven cells in the middle band change. Anchoring each likelihood level to a defined time window is what makes a rating reproducible.</p>
<p><strong>3. What is a fragile cell in a risk matrix?</strong></p>
<p>A cell whose band changes when one axis moves by a single level while the other is held. Sixteen of the 25 cells are fragile, so the review should spend its time on the hazards sitting in those cells rather than on the colour of the whole matrix.</p>
<p><strong>4. What should a control measure include?</strong></p>
<p>A named owner, the layer it works at, meaning self-acting or requiring a person, and the condition under which it is in force. If a site is unattended for twelve hours a day, an administrative control exists for half the clock.</p>
<p><strong>5. What cannot be added after the container is built?</strong></p>
<p>Compartment separation, the suppression agent with its documentation, and the published temperature window with its derating point. An assessment that relies on a barrier the container does not have cannot install it on site.</p>
