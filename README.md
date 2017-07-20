# primo-browzine
Integrate Browzine's Article DOI Lookup and Journal Availability endpoints into Primo interface.

Requirements:  Browzine subscription and API Key + Customer Number.

This project uses Node.js on a non-Primo server to query Browzine's APIs and return the data to Primo for display in results that contain journals (with an ISSN) or journal articles (with a DOI).

