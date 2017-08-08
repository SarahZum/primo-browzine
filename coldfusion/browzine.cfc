<cfcomponent>
<cffunction name="journalLookup" access="remote" returnType="any" returnFormat="plain" output="true">
	<!--- Add credentials from Browzine --->   
	<cfSet var stoKey = "" />
	<cfSet var stoID = "" />
  <!--- Setup local variables ---> 
	<cfset var ISSN = "" />
	<cfset var cb = "" />
	<cfset var data = "" />
	<cfset var browzinePath = "">
	<!--- Get URL parameters --->  
	<cfset ISSN = ToString(url.ISSN) />
	<cfset cb = url.callback />
  <cfset browzinePath = "https://api.thirdiron.com/public/v1/libraries/" & stoID & "/search?issns=" & ISSN & "&access_token=" & stoKey>

  <!--- Submit api request --->
	<cfhttp url="#browzinePath#" port="443" method="get">
	</cfhttp>
  <cfset data = deserializeJSON(cfhttp.fileContent)>
  <cfset data = serializeJSON(data)>
  <cfset data = cb & "(" & data & ")">
  <cfreturn data>  
</cffunction>

<cffunction name="articleLookup" access="remote" returnType="any" returnFormat="plain" output="true">
	<!--- Add credentials from Browzine --->   
	<cfSet var stoKey = "" />
	<cfSet var stoID = "" />
  <!--- Setup local variables --->
	<cfset var DOI = "" />
	<cfset var cb = "" />
	<cfset var data = "" />
	<cfset var browzinePath = "">
	<!--- Get URL parameters --->  
	<cfset DOI = ToString(url.DOI) />
  <cfset cb = url.callback />
  <cfset browzinePath = "https://api.thirdiron.com/public/v1/libraries/" & stoID & "/articles/doi/" & DOI & "?access_token=" & stoKey>

	<!--- Submit api request --->
	<cfhttp url="#browzinePath#" port="443" method="get">
	</cfhttp>
  <cfset data = deserializeJSON(cfhttp.fileContent)>
  <cfset data = serializeJSON(data)>
  <cfset data = cb & "(" & data & ")">
  <cfreturn data>  
</cffunction>
</cfcomponent>
