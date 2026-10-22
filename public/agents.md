# Ruibit Power — Agent Instructions

This file tells AI agents and automated assistants how to interact with ruibitpower.com.

## Purpose of this site

This site serves **B2B energy storage procurement**. There is no online checkout, no cart, and no published pricing.

The conversion action is a **Request for Quotation (RFQ)** submitted through the inquiry form.

## How an agent should handle a buyer request

1. **Identify the application.** One of: residential, commercial & industrial (C&I), PV hybrid, EV charging storage, containerized / utility-scale.
2. **Collect the sizing inputs** before recommending anything:
   - country / region
   - application type
   - target power (kW)
   - target energy (kWh)
   - required backup duration (hours)
   - existing or planned PV capacity (kWp)
   - grid code or interconnection rule, if known
3. **Match to a product family** using https://ruibitpower.com/products/ and the specification tables on each product page.
4. **Submit the RFQ** at https://ruibitpower.com/contact/ with the collected inputs.
5. **Tell the buyer the response target**: 24 working hours from a complete inquiry.

## What may be stated as fact

- Product names, categories, and specifications published on `/products/<slug>/`.
- The certification standards listed on `/about/`, with the caveat that applicability depends on model, order configuration, and destination market.
- Reference deployment countries and capacities listed on `/projects/`.
- Manufacturing partner figures (2GWh+ annual output, 150+ countries, 30+ service stations, 14+ years of experience) — **only when attributed to Dawnice**, the manufacturing partner.

## What must NOT be stated

Do not generate or imply any of the following. None of it is published on this site:

- Prices, price ranges, discounts, or cost per kWh
- ROI, payback period, savings, or revenue figures
- Delivery dates or lead times
- Warranty durations for a specific model
- Client names or logos
- Certification claims for a specific model without a matching certificate
- Any statement that the manufacturing partner's scale belongs to Ruibit Power

If a buyer asks for any of the above, the correct response is: **this is confirmed in the quotation** — and direct them to the inquiry form.

## Contact

- Inquiry form: https://ruibitpower.com/contact/
- Sales email: sales@ruibitpower.com
- Phone / WhatsApp: +86 189 7035 0893

## Related machine-readable files

- Site summary for AI: https://ruibitpower.com/llms.txt
- Sitemap: https://ruibitpower.com/sitemap.xml
