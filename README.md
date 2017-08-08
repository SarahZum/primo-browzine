# primo-browzine
Integrate Browzine's Article DOI Lookup and Journal Availability endpoints into Primo interface.

Requirements:  Browzine subscription and API Key + Customer Number.

This project uses Node.js on a non-Primo server to query Browzine's APIs and return the data to Primo for display in results that contain journals (with an ISSN) or journal articles (with a DOI).

To implement:

1. Set up the Node.js scripts on a local server.  Browzine can provide some assistance with this step.  I tested using Amazon's Lambda service and an API gateway.  For production, St. Olaf is using a local server and ColdFusion component.  I've included that code if you happen to be a CF shop.
1. Add the browzine.js code to the custom.js file in your [Customization Package](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_User_Interface/New_UI_Customization_-_Best_Practices#Using_the_UI_Customization_Package_Manager).  You will need to update the "nodeserver" constant with the URI for the server running the Node scripts.
1. Add the browzine.css lines to custom1.css file in your [Customization Package](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_User_Interface/New_UI_Customization_-_Best_Practices#Using_the_UI_Customization_Package_Manager).
1. Deploy the Customization Package on your Primo server.
