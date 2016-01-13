"use strict";function NextPage(){1==currentPage?($(".modalPageZero").hide(),$(".modalPageOne").show(),$(".modalPageTwo").hide(),$(".modalPageThree").hide(),document.getElementsByTagName("h2")[0].innerHTML="People and Geography Quiz from Harvard University",currentPage++):2==currentPage?($(".modalPageZero").hide(),$(".modalPageOne").hide(),$(".modalPageTwo").show(),$(".modalPageThree").hide(),currentPage++):3==currentPage?($(".modalPageZero").hide(),$(".modalPageOne").hide(),$(".modalPageTwo").hide(),$(".modalPageThree").show(),document.getElementsByTagName("h2")[0].innerHTML="Instructions",currentPage++):4==currentPage&&($("#formModalFirst").modal("hide"),currentPage++)}function change(){var e=colors[n++%colors.length];switch(e){case"Asian":document.getElementById("Asian").style.background="rgb(255, 128, 0)",document.getElementById("Asian").style.color="rgb(255, 255, 255)",document.getElementById("Asian").style.borderColor="rgb(255, 128, 0)";break;case"Black":document.getElementById("Black").style.background="rgb(255, 0, 0)",document.getElementById("Black").style.color="rgb(255, 255, 255)",document.getElementById("Black").style.borderColor="rgb(255, 0, 0)";break;case"Hispanic":document.getElementById("Hispanic").style.background="rgb(0, 255, 0)",document.getElementById("Hispanic").style.color="rgb(255, 255, 255)",document.getElementById("Hispanic").style.borderColor="rgb(0, 255, 0)";break;case"White":document.getElementById("White").style.background="rgb(0, 0, 255)",document.getElementById("White").style.color="rgb(255, 255, 255)",document.getElementById("White").style.borderColor="rgb(0, 0, 255)"}return e}function myPoly(e,t,o,r,a){this.polyfips=e,this.polyorigin=t,this.polyX=o,this.polyY=r,this.polyIDX=a}var currentPage=1;$(document).ready(function(){$(window).load(function(){$(".modal-dialog").modal({keyboard:!0}),$("#formModalFirst").modal("show"),$(".modalPageZero").show(),$(".modalPageOne").hide(),$(".modalPageTwo").hide(),$(".modalPageThree").hide(),$("#formModalSecond").modal("hide"),$("#formModalThird").modal("hide")})}),$(function(){$("button.next-button").on("click",function(){NextPage();var e=function(){};if(e.info=function(e){$("#alert_placeholder").append('<div class="alert alert-danger alert-dismissable">'+e+"</div>")},3==currentPage)if(""===$("#zipcodeid").val())currentPage=2,$(".modalPageZero").hide(),$(".modalPageOne").show(),$(".modalPageTwo").hide(),$(".modalPageThree").hide(),e.info("Please enter a zipcode!"),$(".alert").fadeTo(1500,500).slideUp(500,function(){$(this).remove()});else{var t=new RegExp("\\b"+$("#zipcodeid").val()+"\\b");t.test(ziparray)?$("#zipsub").click():(currentPage=2,$(".modalPageZero").hide(),$(".modalPageOne").show(),$(".modalPageTwo").hide(),$(".modalPageThree").hide(),e.info("Invalid zipcode, please enter another."),$(".alert").fadeTo(1500,500).slideUp(500,function(){$(this).remove()}))}})});var colors=["Asian","Black","Hispanic","White"],n=0,fourGroups=[],myPolyArray=[],$,map0,map1,featureLayer,totAsian=0,totBlack=0,totHispanic=0,totWhite=0,totAll=0,countRows=0,highAsian=0,highBlack=0,highHispanic=0,highWhite=0;Date.prototype.IsoNum=function(e){var t=6e4*this.getTimezoneOffset(),o=new Date(this-t).toISOString().slice(0,-1);return o.replace(/[-T:\.Z]/g,"").substring(0,e||20)};var timeX=new Date,time=timeX.IsoNum(14),hash=function(e){return"number"==typeof e&&e===parseInt(e,10)&&(e=Array(e+1).join("x")),e.replace(/x/g,function(){var e=Math.round(61*Math.random())+48;return e=e>57?e+7>90?e+13:e+7:e,String.fromCharCode(e)})},require,userhash=hash(10),sessionObj1={},sessionObj2={},serverurl="http://arcgis-arccgaharvardedu-66613874.us-east-1.elb.amazonaws.com/arcgis/rest/services/geosurvey/geopop/MapServer";require(["esri/map","esri/tasks/QueryTask","esri/tasks/query","esri/layers/FeatureLayer","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/geometry/webMercatorUtils","esri/graphicsUtils","dojo/on","dojo/parser","dojo/ready"],function(e,t,o,r,a,s,i,p,l,c,d,g,u){function f(){d(featureLayer,"graphic-draw",function(){for(var e=0;e<document.getElementsByClassName("svgMap0").length;e++)for(var t=document.getElementsByClassName("svgMap0")[e].getAttribute("data-FIPS"),o=0;o<myPolyArray.length;o++)myPolyArray[o].polyfips==t&&document.getElementsByClassName("svgMap0")[e].setAttribute("data-originbreak",myPolyArray[o].polyorigin)})}function m(e){var t=new r(serverurl+"/0",{id:"sideLayer",styling:!1,dataAttributes:["WHITE","BLACK","ASIAN","HISPANIC","zipcode","groups"]});return t.setDefinitionExpression("zipcode = '"+e+"'"),"svg"===t.surfaceType?d(t,"graphic-draw",function(e){countRows+=1,totAsian+=e.graphic.attributes.ASIAN,totBlack+=e.graphic.attributes.BLACK,totHispanic+=e.graphic.attributes.HISPANIC,totWhite+=e.graphic.attributes.WHITE;var t,o=e.graphic.attributes.groups;switch(o){case"A":t="Asian",highAsian+=e.graphic.attributes.ASIAN;break;case"AB":t="AB",highAsian+=e.graphic.attributes.ASIAN,highBlack+=e.graphic.attributes.BLACK;break;case"ABH":t="ABH",highAsian+=e.graphic.attributes.ASIAN,highBlack+=e.graphic.attributes.BLACK,highHispanic+=e.graphic.attributes.HISPANIC;break;case"ABHW":t="ABHW",highAsian+=e.graphic.attributes.ASIAN,highBlack+=e.graphic.attributes.BLACK,highHispanic+=e.graphic.attributes.HISPANIC,highWhite+=e.graphic.attributes.WHITE;break;case"ABW":t="ABW",highAsian+=e.graphic.attributes.ASIAN,highBlack+=e.graphic.attributes.BLACK,highWhite+=e.graphic.attributes.WHITE;break;case"AH":t="AH",highAsian+=e.graphic.attributes.ASIAN,highHispanic+=e.graphic.attributes.HISPANIC;break;case"AHW":t="AHW",highAsian+=e.graphic.attributes.ASIAN,highHispanic+=e.graphic.attributes.HISPANIC,highWhite+=e.graphic.attributes.WHITE;break;case"AW":t="AW",highAsian+=e.graphic.attributes.ASIAN,highWhite+=e.graphic.attributes.WHITE;break;case"B":t="Black",highBlack+=e.graphic.attributes.BLACK;break;case"BH":t="BH",highBlack+=e.graphic.attributes.BLACK,highHispanic+=e.graphic.attributes.HISPANIC;break;case"BHW":t="BHW",highBlack+=e.graphic.attributes.BLACK,highHispanic+=e.graphic.attributes.HISPANIC,highWhite+=e.graphic.attributes.WHITE;break;case"BW":t="BW",highBlack+=e.graphic.attributes.BLACK,highWhite+=e.graphic.attributes.WHITE;break;case"H":t="Hispanic",highHispanic+=e.graphic.attributes.HISPANIC;break;case"HW":t="HW",highHispanic+=e.graphic.attributes.HISPANIC,highWhite+=e.graphic.attributes.WHITE;break;case"N":t="none";break;case"W":t="White",highWhite+=e.graphic.attributes.WHITE}e.node.setAttribute("data-originbreak",t)}):(alert("Your browser does not support SVG.\nPlease user a modern web browser that supports SVG."),dom.byId("legend").innerHTML="Your browser does not support SVG."),map1.addLayer(t),t}function h(e){var t=document.getElementById("originText");switch(e){case"Asian":t.innerHTML="Choose the neighborhood where most <b>Asian</b> people live or choose “Skip Group”.",t.style.color="rgb(255, 255, 255)",t.style.background="rgb(255, 128, 0)";break;case"Black":t.innerHTML="Choose the neighborhood where most <b>Black</b> people live or choose “Skip Group”.",t.style.color="rgb(255, 255, 255)",t.style.background="rgb(255, 0, 0)";break;case"Hispanic":t.innerHTML="Choose the neighborhood where most <b>Hispanic</b> people live or choose “Skip Group”.",t.style.color="rgb(255, 255, 255)",t.style.background="rgb(0, 255, 0)";break;case"White":t.innerHTML="Choose the neighborhood where most <b>White</b> people live or choose “Skip Group”.",t.style.color="rgb(255, 255, 255)",t.style.background="rgb(0, 0, 255)"}}function y(e){if(featureLayer=new r(serverurl+"/0",{id:"featureLayer0",styling:!1,dataAttributes:["FIPS","zipcode"]}),featureLayer.setDefinitionExpression("zipcode = '"+e+"'"),d(featureLayer,"click",function(e){console.log("Name: "+e.graphic.attributes.FIPS);for(var t=0;t<document.getElementsByClassName("svgMap0").length;t++){var o=document.getElementsByClassName("svgMap0")[t].getAttribute("data-FIPS");if(o===e.graphic.attributes.FIPS){var r=change();document.getElementsByClassName("svgMap0")[t].setAttribute("data-originbreak",r),document.getElementsByClassName("svgMap0")[t].setAttribute("data-IDX",t);for(var a=0;a<myPolyArray.length;a++)myPolyArray[a].polyfips===e.graphic.attributes.FIPS&&(myPolyArray[a].polyorigin=r,myPolyArray[a].polyIDX=t.toString()+","+a.toString(),fourGroups.push(myPolyArray[a]),fourGroups.length>=4&&(featureLayer.disableMouseEvents(),document.getElementById("originText").innerHTML="Save your result, or click Start Over button",document.getElementById("originText").style.color="rgb(0, 0, 0)",document.getElementById("originText").style.background="rgb(160,160,160)"))}}for(var s=e.graphic.attributes.FIPS,t=0;t<fourGroups.length;t++)1===t&&2==fourGroups.length&&s===fourGroups[0].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","AB"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="AB"),2===t&&3==fourGroups.length&&(s===fourGroups[0].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","AH"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="AH"),s===fourGroups[1].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","BH"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="BH"),s===fourGroups[0].polyfips&&s===fourGroups[1].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABH"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="ABH")),3===t&&4==fourGroups.length&&(s===fourGroups[0].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","AW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="AW"),s===fourGroups[1].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","BW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="BW"),s===fourGroups[2].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","HW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="HW"),s===fourGroups[0].polyfips&&s===fourGroups[1].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="ABW"),s===fourGroups[0].polyfips&&s===fourGroups[2].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","AHW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="AHW"),s===fourGroups[1].polyfips&&s===fourGroups[2].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","BHW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="BHW"),s===fourGroups[0].polyfips&&s===fourGroups[1].polyfips&&s===fourGroups[2].polyfips&&(document.getElementsByClassName("svgMap0")[parseInt(fourGroups[t].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABHW"),myPolyArray[parseInt(fourGroups[t].polyIDX.split(",")[1])].polyorigin="ABHW"),document.getElementById("groupskip").disabled=!0);h(colors[n])}),"svg"===featureLayer.surfaceType){var t=I("linearGradient").attr({id:"gradAB"});I("stop").attr({offset:"50%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradAH"});I("stop").attr({offset:"50%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#00ff00"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradBH"});I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#00ff00"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradABH"});I("stop").attr({offset:"0%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"100%","stop-color":"#00ff00"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradAW"});I("stop").attr({offset:"50%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradBW"});I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradHW"});I("stop").attr({offset:"50%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradABW"});I("stop").attr({offset:"0%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#0000ff"}).appendTo(t),I("stop").attr({offset:"100%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradAHW"});I("stop").attr({offset:"0%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#0000ff"}).appendTo(t),I("stop").attr({offset:"100%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradBHW"});I("stop").attr({offset:"0%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"30%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"60%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"70%","stop-color":"#0000ff"}).appendTo(t),I("stop").attr({offset:"100%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t);var t=I("linearGradient").attr({id:"gradABHW"});I("stop").attr({offset:"0%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"25%","stop-color":"#ff8000"}).appendTo(t),I("stop").attr({offset:"25%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#ff0000"}).appendTo(t),I("stop").attr({offset:"50%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"75%","stop-color":"#00ff00"}).appendTo(t),I("stop").attr({offset:"75%","stop-color":"#0000ff"}).appendTo(t),I("stop").attr({offset:"100%","stop-color":"#0000ff"}).appendTo(t),$("svg defs").prepend(t),d(featureLayer,"graphic-draw",function(e){var t=l.xyToLngLat(e.graphic.geometry.getCentroid().x,e.graphic.geometry.getCentroid().y);e.node.setAttribute("data-originbreak","none"),e.node.setAttribute("data-X",t[1]),e.node.setAttribute("data-Y",t[0]),e.node.setAttribute("data-IDX","none"),e.node.setAttribute("class","svgMap0")})}else alert("Your browser does not support SVG.\nPlease user a modern web browser that supports SVG.");return map0.addLayer(featureLayer),featureLayer}function b(e){k=e,P=T-k.offsetLeft,E=H-k.offsetTop}function A(e){T=document.all?window.event.clientX:e.pageX,H=document.all?window.event.clientY:e.pageY,null!==k&&(k.style.left=T-P+"px",k.style.top=H-E+"px")}function v(){k=null}function B(e,t,o,r){var a=document.getElementById("blockTable"),s=a.insertRow(r),i=s.insertCell(0);i.setAttribute("class",e);var n=s.insertCell(1),p=s.insertCell(2);i.innerHTML=e,n.innerHTML=t,p.innerHTML=o}g.parse(),u(function(){function r(e){var t=e.features,o=c.graphicsExtent(t);map0.setExtent(o.expand(.1)),map1.setExtent(o.expand(.5))}map0=new e("mapDiv0",{basemap:"gray",center:[-94,38],zoom:5}),map1=new e("mapDiv1",{basemap:"gray",center:[-94,38],zoom:5}),map0.on("load",function(){map0.disableDoubleClickZoom()}),map1.on("extent-change",function(){map0.setExtent(map1.extent)}),$(document).on("click",".dropdown-menu li",function(){console.log($(this).attr("value"));var e=$(this).attr("value");map0.setBasemap(e),map1.setBasemap(e)}),$("#zipsub").click(function(){var e=String(document.getElementById("zipcodeid").value),a=new t(serverurl+"/0"),s=new o;s.returnGeometry=!0,s.where="zipcode = '"+e+"'",y(e),m(e),a.execute(s,r),featureLayer.on("update-end",function(){if(0===myPolyArray.length)for(var e=0;e<document.getElementsByClassName("svgMap0").length;e++){var t=document.getElementsByClassName("svgMap0")[e].getAttribute("data-FIPS"),o=document.getElementsByClassName("svgMap0")[e].getAttribute("data-X"),r=document.getElementsByClassName("svgMap0")[e].getAttribute("data-Y"),r=document.getElementsByClassName("svgMap0")[e].getAttribute("data-Y"),a=document.getElementsByClassName("svgMap0")[e].getAttribute("data-IDX"),s=new myPoly(t,"none",o,r,a);myPolyArray.push(s)}});var i={Asian:0,Black:0,Hispanic:0,White:0},n=document.getElementById("legendDiv0");$.each(i,function(e){var t=document.createElement("p"),o=document.createTextNode(e);t.appendChild(o),t.id=e,n.appendChild(t)}),document.getElementById("legendDiv0").style.opacity=.9;var p=document.getElementById("originText");p.innerHTML="Choose the neighborhood where most <b>Asian</b> people live or choose “Skip Group”",p.style.color="rgb(255, 255, 255)",p.style.background="rgb(255, 128, 0)"}),$("#modalinfo").click(function(){$("#formModalFirst").modal("show"),currentPage=4});map0.on("zoom-end",f);$("#mapcompare").click(function(){$("#formModalThird").modal("hide"),$("#wrapper").toggleClass("toggled");var e=$("input[name=radioq1]:checked","#q1form").val(),t=$("input[name=radioq2]:checked","#q2form").val(),o=$("input[name=radioq3]:checked","#q3form").val(),r=$("input[name=radioq4]:checked","#q4form").val();sessionObj2.timestamp=time,sessionObj2.sessionid=time+"_"+userhash,sessionObj2.pctAsian=e,sessionObj2.pctBlack=t,sessionObj2.pctHispanic=o,sessionObj2.pctWhite=r,sessionObj2.respondent=$("input[name=radioq6]:checked","#q6form").val(),sessionObj2.email=String(document.getElementById("useremail").value);var a=JSON.stringify(sessionObj2);featureLayer.disableMouseEvents(),totAsian=totAsian?totAsian:0,totBlack=totBlack?totBlack:0,totHispanic=totHispanic?totHispanic:0,totWhite=totWhite?totWhite:0,countRows=countRows?countRows:0;var s=parseFloat(totAsian/countRows).toFixed(0),i=parseFloat(totBlack/countRows).toFixed(0),n=parseFloat(totHispanic/countRows).toFixed(0),p=parseFloat(totWhite/countRows).toFixed(0),l={Asian:s+","+highAsian,Black:i+","+highBlack,Hispanic:n+","+highHispanic,White:p+","+highWhite};console.log(l);var c={labels:["Asian","Black","Hispanic","White"],datasets:[{label:"Average values",type:"line",fillColor:"rgba(0,0,0,0)",strokeColor:"rgba(0,0,0,1)",pointColor:"rgba(0,0,0,1)",pointStrokeColor:"#000000",pointHighlightFill:"#cccccc",pointHighlightStroke:"rgba(0,0,0,1)",data:[s,i,n,p]},{label:"Highest values",type:"bar",fillColor:"rgba(255,255,0,0)",strokeColor:"rgba(255,255,0,1)",pointColor:"rgba(220,20,220,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,1)",data:[highAsian,highBlack,highHispanic,highWhite]}]},d=document.getElementById("line-bar").getContext("2d"),g=new Chart(d).LineBar(c,{});g.datasets[1].bars[0].strokeColor="rgba(255, 128, 0, 1)",g.datasets[1].bars[0].fillColor="rgba(255, 128, 0, .3)",g.datasets[1].bars[1].strokeColor="rgba(255, 0, 0, 1)",g.datasets[1].bars[1].fillColor="rgba(255, 0, 0, .3)",g.datasets[1].bars[2].strokeColor="rgba(0, 255, 0, 1)",g.datasets[1].bars[2].fillColor="rgba(0, 255, 0, .3)",g.datasets[1].bars[3].strokeColor="rgba(0, 0, 255, 1)",g.datasets[1].bars[3].fillColor="rgba(0, 0, 255, .3)",g.update(),document.getElementById("blockTable").rows[0].cells[0].innerHTML="Zipcode: "+String(document.getElementById("zipcodeid").value);var u=0;$.each(l,function(e,t){u+=1,B(e,l[e].split(",")[0],l[e].split(",")[1],u)});var f=document.getElementById("mapDiv1_root").style.width.split("px")[0]/6,m=document.getElementById("mapDiv1_root").style.height.split("px")[0]/2,h=esri.geometry.ScreenPoint(f,m),y=map1.toMap(h),b=esri.geometry.xyToLngLat(y.x,y.y);map1.centerAt(b),$.post("js/survey.php",{myJsonString2:a},function(e){console.log("data sessionObj2 submitted correctly")}).fail(function(){alert("Posting failed.")})}),$("#groupskip").click(function(){var e=new myPoly("none","none","none","none","none");switch(fourGroups.push(e),colors.splice(0,1),h(colors[n]),fourGroups.length){case 1:document.getElementById("Asian").style.background="rgb(160,160,160)";break;case 2:document.getElementById("Black").style.background="rgb(160,160,160)";break;case 3:document.getElementById("Hispanic").style.background="rgb(160,160,160)";break;case 4:document.getElementById("White").style.background="rgb(160,160,160)",document.getElementById("groupskip").disabled=!0,featureLayer.disableMouseEvents()}}),$("#startover").click(function(){for(var e=0;e<document.getElementsByClassName("svgMap0").length;e++)document.getElementsByClassName("svgMap0")[e].setAttribute("data-originbreak","none");for(var e=0;e<myPolyArray.length;e++)myPolyArray[e].polyorigin="none";fourGroups=[],colors=["Asian","Black","Hispanic","White"],n=0,document.getElementById("groupskip").disabled=!1;for(var e=0;e<colors.length;e++)document.getElementById(colors[e]).style.background="rgb(255,255,255)",document.getElementById(colors[e]).style.color="rgb(0,0,0)",document.getElementById(colors[e]).style.borderColor="rgb(0,0,0)";featureLayer.enableMouseEvents(),h("Asian")}),$("#polysub").click(function(){$("#formModalSecond").modal("show");for(var e=[],t=0;t<myPolyArray.length;t++)delete myPolyArray[t].polyIDX,"none"!=myPolyArray[t].polyorigin&&e.push(myPolyArray[t]);sessionObj1.timestamp=time,sessionObj1.sessionid=time+"_"+userhash,sessionObj1.zip=String(document.getElementById("zipcodeid").value),sessionObj1.ziplive=$("input[name=optradiolive]:checked","#zipcoderadio").val(),sessionObj1.zipyrs=$("input[name=optradioyear]:checked","#yearradio").val(),sessionObj1.geo=e;var o=JSON.stringify(sessionObj1);console.log(o),$.post("js/submit.php",{myJsonString:o},function(e){console.log("data sessionObj1 submitted correctly")}).fail(function(){alert("Posting failed.")})}),$("#secondform").click(function(){$("#formModalThird").modal("show"),$("#formModalSecond").modal("hide")}),$("#newzipstart").click(function(){location.reload()})});var I=function(e){return $(document.createElementNS("http://www.w3.org/2000/svg",e))},k=null,T=0,H=0,P=0,E=0;document.getElementById("originText").onmousedown=function(){return b(this),!1},document.onmousemove=A,document.onmouseup=v});