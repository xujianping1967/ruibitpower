---
title: "C&I BESS Commissioning Checklist: What EPCs and Facility Managers Must Verify"
category: "Installation"
excerpt: "A single signed declaration that commissioning is complete does not survive handover. These are the tests a facility manager should witness."
publishDate: "2026-09-24T16:09:16Z"
seo:
  title: "C&I BESS Commissioning Checklist"
featuredImage: "/assets/images/blog/c-i-bess-commissioning-checklist-what-epcs-and-facility-managers-must-verify/1_463.jpg"
relatedProducts:
  - "dawnice-containerized-bess"
  - "loong-power-bs09-112-dp"
---

<p><strong>A single declaration that commissioning is complete does not survive a handover. The two parties sign different things at different gates, and the items that decide acceptance are usually the ones neither side owns alone.</strong></p>

<h2>The boundary being reviewed</h2>
<p>Commissioning closes at three gates, and each has its own owner and its own piece of evidence.</p>
<div>
<div>
<div class="table-wrap"><table>
<thead>
<tr>
<th>Gate</th>
<th>What closes at the gate</th>
<th>Who owns it</th>
</tr>
</thead>
<tbody>
<tr>
<td>Before energization</td>
<td>The installed system matches the order, and the documentation set is complete</td>
<td>The EPC, with the facility manager observing</td>
</tr>
<tr>
<td>Before first parallel operation</td>
<td>Protection settings, the transformer interface and the utility's approval</td>
<td>The EPC and the utility, with the facility manager signing for the site</td>
</tr>
<tr>
<td>Before handover to operations</td>
<td>Data, alarms, training records and the warranty clock</td>
<td>The facility manager, with the EPC closing punch-list items</td>
</tr>
</tbody>
</table></div>
</div>
</div>
<p>The EPC owns what it supplied; the facility manager owns the interfaces the site provides. Almost everything that fails at handover sits on that line rather than clearly on one side of it.</p>
<h2>What each side is protecting</h2>
<p>The EPC is protecting two things: milestones tied to acceptance, and interfaces it does not control. The site's existing board capacity, the utility's approval, the fire panel the system must interface with, and the network the EMS reports over are all provided by others. An EPC that accepts responsibility for them has accepted a risk it cannot manage, which is why the first disputed item in most reviews is not technical.</p>
<p>The facility manager is protecting continuity. It inherits a system that has to be operated by staff who did not install it, documented to a standard the next engineer can use, and covered by a warranty whose clock starts on a date the site did not choose.</p>
<h2>The five items that decide acceptance</h2>
<p>The published configuration data Ruibit supplies for the 20GP container, down to the cell format and the compartment arrangement, is what a commissioning review compares the installed system against. That comparison produces five items that are routinely left to the end and should be first.</p>
<p>Nameplate against the order. The installed unit should be checked against the delivered configuration: 3.2 V and 314 Ah cells in a 5P208S arrangement, 1.045 MWh rated, 500 kW, IP54 with C5 corrosion protection. A substitution in cell format is visible on the nameplate and invisible in a charge and discharge test.</p>
<p>Protection settings and the transformer interface. The published arrangement includes an isolation transformer at 315/400 V. Its settings, the protection coordination and the reference of the utility's approval should be one document rather than three, because acceptance of the site's connection depends on all three agreeing.</p>
<p>The fire interface. The published arrangement for the 20GP container is FM200 or NOVEC1230 automatic extinguishing, with thermal isolation between the electrical compartment and the battery compartment. A functional test that stops at the detector proves half the system. The review should record what the test exercised, whether the detection chain reached the release stage, and which trigger the published response figure is measured from, a figure stated for the 125 kW cabinet as under 500 milliseconds.</p>
<p>Data and communications. The container publishes RS485 and TCP/IP communication, and a touch display with a cloud platform. The handover item is not that the link works, but which signals the owner will still receive.</p>
<p>The warranty and service baseline. Where a 5+5 year term is published, the acceptance record should also capture the conditions the cycle life is stated at, because the 125 kW cabinet's published figure of at least 8,000 cycles is given at 25 degrees Celsius, 0.5C and 90 percent depth of discharge, with end of life at 70 percent of rated capacity. Those four conditions are the baseline for every later capacity claim.</p>
<h2>What the facility manager must not accept</h2>
<p>Three questions should be answered in the record rather than on site.</p>
<p>Ask which revision of the settings sheet is installed, and whether the utility approved that revision. If the installed revision differs from the approved one, the gate is not passed, whatever the test results show. An answer that the settings match the design, without the approval reference, describes a connection that has not been accepted.</p>
<p>Ask what the fire interface test exercised, and whether the detection chain reached the release stage. An answer that the system was tested and the alarm came through describes a detector test, not a suppression test.</p>
<p>Ask what the owner will still receive in month thirteen: which signals, over which protocol, and where the data lives. An answer that monitoring is included, without naming the signals, describes a dashboard rather than a handover.</p>
<p>An energized system belongs in that list too. Charge and discharge proves the power path and nothing else.</p>
<h2>The trade-offs inside the checklist</h2>
<p>Two items cost more to verify than to assume, and both are worth the cost.</p>
<p>A full functional test of the fire interface may discharge a suppression agent or require the agent to be isolated for the test, so the review has to decide which type of test it is witnessing before the test begins. Where the interface cannot be tested end to end, the item should be recorded as untested rather than as passed.</p>
<p>Power testing needs the site's load, and the site's load is usually unavailable on the day the system is ready. Testing at partial power and recording the test as a full-power result is the most common way a commissioning record loses its value. If the full-power test is deferred, the deferral belongs in the record as a named, dated open item.</p>
<h2>What stays open, and who closes it</h2>
<p>Commissioning does not end when the system works. It ends when the open items have owners.</p>
<p>The punch list belongs to the EPC, with dates. The items depending on third parties, the utility approval and the fire panel confirmation in particular, belong to the facility manager, with dates. Items neither side can close, such as an unapproved settings revision, should hold the relevant payment milestone rather than the handover as a whole.</p>
<p>Four things are settled at acceptance and cannot be reopened afterwards: the protection settings recorded with the utility, the as-built documentation set, the warranty start date, and the firmware version the system was accepted on. Every later comparison, from an alarm investigation to a capacity claim, is measured against those four, which is why they belong in the acceptance signature rather than in a follow-up e-mail.</p>
<p><img src="/assets/images/blog/c-i-bess-commissioning-checklist-what-epcs-and-facility-managers-must-verify/2_411.jpg" alt="C&I BESS Commissioning Checklist: What EPCs and Facility Managers Must Verify" width="400" height="400" loading="lazy" decoding="async"></p>
<h2>FAQs</h2>
<p><strong>1. What are the gates in BESS commissioning?</strong></p>
<p>Three. Before energization, where the installed system is checked against the order and the documentation set is completed. Before first parallel operation, where protection settings, the transformer interface and the utility's approval are confirmed. And before handover to operations, where data, alarms, training records and the warranty clock transfer.</p>
<p><strong>2. What must be verified before energization?</strong></p>
<p>Nameplate and configuration against the order. On a 20GP container that means 3.2 V and 314 Ah cells in a 5P208S arrangement, 1.045 MWh rated, 500 kW, and IP54 with C5 corrosion protection. A substitution in cell format is visible on the nameplate and invisible in a charge and discharge test.</p>
<p><strong>3. Who owns what at the commissioning boundary?</strong></p>
<p>The EPC owns the equipment it supplied. The facility manager owns the interfaces the site provides, which include the existing board capacity, the utility approval, the fire panel and the network the EMS reports over. Items that fail at handover usually sit exactly on that line.</p>
<p><strong>4. What should a facility manager not accept on the contractor's word?</strong></p>
<p>The installed settings revision without the utility's approval reference, a fire interface test that exercised detection but not the release stage, and a promise that monitoring works without naming the signals. Charge and discharge proves the power path and nothing else.</p>
<p><strong>5. What is fixed once acceptance is signed?</strong></p>
<p>The protection settings recorded with the utility, the as-built documentation set, the warranty start date, and the firmware version the system was accepted on. Every later comparison, from an alarm investigation to a capacity claim, is measured against those four.</p>
