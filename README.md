# primo-browzine
Integrate Browzine's Article DOI Lookup and Journal Availability endpoints into Primo interface.  The integrations described here are live on the [St. Olaf](https://stolaf-primo.hosted.exlibrisgroup.com/primo-explore/search?vid=01BRC_SOC&sortby=rank) and [Carleton](https://carleton-primo.hosted.exlibrisgroup.com/primo-explore/search?vid=01BRC_CCO&sortby=rank) Primo sites.  For a detailed description of all the interactions this API can provide and implementation suggestions, please visit the [BrowZine Technical Documentation Site](https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/overview) and take a look at the Detailed Interaction Overview in the Primo Interation section. [(direct link)](https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/79200260/Ex+Libris+Primo+Integration)

![Article in Context links in Primo results](browzine_example.png?raw=true "Article in Context links in Primo results")

Requirements:  
* Browzine subscription and API Key + Customer Number.
* Access to Customization Manager files for the new Primo UI.
* Local server to host Node.js scripts (Optional: Third Iron can optionally run this for you!)

This project uses Node.js on a non-Primo server to query BrowZine's APIs and return the data to Primo for display in results that contain journals (with an ISSN) or journal articles (with a DOI).

To implement:

1. Set up the Node.js scripts on a local server.  Third Iron can provide assistance with this step.  I tested using Amazon's Lambda service and an API gateway.  For production, St. Olaf is using a local server and ColdFusion component.  I've included that code if you happen to be a CF shop.
   1. browzineAPIKey and browzineLibraryID refer to your Browzine API key and customer number.  They should be updated to reflect your institution's keys.  Contact Third Iron support at support@thirdiron.com to obtain credentials.
1. Add the browzine.js code to the custom.js file in your [Customization Package](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_User_Interface/New_UI_Customization_-_Best_Practices#Using_the_UI_Customization_Package_Manager).  You will need to update the "nodeserver" constant with the URI for the server running the Node scripts.
1. Add the browzine.css lines to custom1.css file in your [Customization Package](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_User_Interface/New_UI_Customization_-_Best_Practices#Using_the_UI_Customization_Package_Manager).
1. Add the browzine.png image to the img directory in your [Customization Package](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_User_Interface/New_UI_Customization_-_Best_Practices#Using_the_UI_Customization_Package_Manager).
1. Deploy the Customization Package on your Primo server.
