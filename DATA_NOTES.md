# RoofIQ Dataset Notes

This is a 50-market modeled starter dataset for prototype testing.

Use it to validate UI, scoring behavior, filters, and sales-product structure. Do not present it as verified market intelligence until each field is replaced or confirmed against source records.

Recommended source stack for production:

- NOAA / NCEI Climate Normals for rainfall and precipitation days
- Census / ACS for population and metro growth
- BLS QCEW for construction/roofing employment and wages
- Census Building Permits Survey for construction activity
- FEMA National Risk Index and NOAA Storm Events for weather risk
- Google Places / licensing databases for competitor density
- Local permit portals for roofing permit volume where available

Fields are normalized to 0-100 where applicable.

Rainfall per capita is included because it was requested, but rainfall multiplied by commercial roof exposure is the better roofing metric. People do not leak. Roofs do. Stunning stuff.
