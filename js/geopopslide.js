// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.
"use strict";
var currentPage = 1;

$(document).ready(function() { 
    $(window).load(function(){
        $(".modal-dialog").modal({ keyboard: true });
        $("#formModalFirst").modal("show");
        $(".modalPageZero").show(); 
        $(".modalPageOne").hide();        
        $(".modalPageTwo").hide();
        $(".modalPageThree").hide();
        $("#formModalSecond").modal("hide");               
        $("#formModalThird").modal("hide");               
    });
    
    //$('.dropdown-toggle').dropdown();
    

});



function NextPage() {    
    if (currentPage == 1){
        $(".modalPageZero").hide();
        $(".modalPageOne").show();
        $(".modalPageTwo").hide();
        $(".modalPageThree").hide();
        //console.log(currentPage)
        document.getElementsByTagName("h2")[0].innerHTML = "People and Geography Quiz from Harvard University";        
        currentPage++;
        // to do we need to check 1) if there is a zipcode 2) if it's valid zipcode    
    } 

    else if (currentPage == 2){
        //console.log($('input[name=optradio]:checked', '#zipcoderadio').val())
        $(".modalPageZero").hide();
        $(".modalPageOne").hide();
        $(".modalPageTwo").show();
        $(".modalPageThree").hide();
        currentPage++;        
    }
    else if (currentPage == 3){
        //console.log($('input[name=optradio]:checked', '#zipcoderadio').val())
        $(".modalPageZero").hide();
        $(".modalPageOne").hide();
        $(".modalPageTwo").hide();
        $(".modalPageThree").show();
        document.getElementsByTagName("h2")[0].innerHTML = "Instructions"; 
        currentPage++;        
    }
    else if (currentPage == 4){
        $("#formModalFirst").modal("hide");        
        currentPage++;        
    }
}

$(function() {
    
    $("button.next-button").on("click", function() {
        NextPage();
        var bootstrap_alert = function() {};
        bootstrap_alert.info = function(message) {
            $("#alert_placeholder").append("<div class=\"alert alert-danger alert-dismissable\">"+ message+"</div>");
        }; 
        //console.log($('input[name=optradio]:checked', '#zipcoderadio').val())
        if(currentPage == 3){
            if($("#zipcodeid").val() === ""){
                currentPage = 2;
                $(".modalPageZero").hide();
                $(".modalPageOne").show();
                $(".modalPageTwo").hide();
                $(".modalPageThree").hide();
                bootstrap_alert.info("Please enter a zipcode!");                
                $(".alert").fadeTo(1500, 500).slideUp(500, function(){ $(this).remove(); });                
            }
            // check if the zipcode field is empty
            else{
                var codeRegEx = new RegExp("\\b"+$("#zipcodeid").val()+"\\b");
        
                if(codeRegEx.test(ziparray)) {
                    //console.log('found it!');
                    $("#zipsub").click();
                    
                } else {                    
                    currentPage = 2;
                    $(".modalPageZero").hide();
                    $(".modalPageOne").show();
                    $(".modalPageTwo").hide();
                    $(".modalPageThree").hide();
                    bootstrap_alert.info("Wrong ZIP code. Please try again!");                    
                    $(".alert").fadeTo(1500, 500).slideUp(500, function(){ $(this).remove(); });                    
                }    
            }
            // check if the zipcode field is correct aginst the array
        }        
                  
    });
});

//var colors = ["none","Asian", "Black", "Hispanic", "White", "Other"];
var colors = ["Asian", "Black", "Hispanic", "White"];
var n = 0;
var fourGroups = [];

function change() {
    var fipsColors = colors[n++ % colors.length]; 
    console.log(fipsColors, n);

    switch (fipsColors) {
        case "Asian":
            document.getElementById("Asian").style.background = "rgb(255, 128, 0)";
            document.getElementById("Asian").style.color = "rgb(255, 255, 255)";
            document.getElementById("Asian").style.borderColor ="rgb(255, 128, 0)";
            break;
        case "Black":
            document.getElementById("Black").style.background = "rgb(255, 0, 0)";
            document.getElementById("Black").style.color = "rgb(255, 255, 255)";
            document.getElementById("Black").style.borderColor ="rgb(255, 0, 0)";
            break;
        case "Hispanic":
            document.getElementById("Hispanic").style.background = "rgb(0, 255, 0)";
            document.getElementById("Hispanic").style.color = "rgb(255, 255, 255)";
            document.getElementById("Hispanic").style.borderColor ="rgb(0, 255, 0)";
            break;
        case "White":
            document.getElementById("White").style.background = "rgb(0, 0, 255)";
            document.getElementById("White").style.color = "rgb(255, 255, 255)";
            document.getElementById("White").style.borderColor ="rgb(0, 0, 255)";
            break;                
    }
    return fipsColors;
}


/*function ShowResults(value, index, ar) {    
    return value.polyfips;
}*/

function myPoly(polyfips, polyorigin, polyX, polyY, polyIDX) {
    this.polyfips = polyfips;
    this.polyorigin = polyorigin;
    this.polyX = polyX;
    this.polyY = polyY;
    this.polyIDX = polyIDX;
}
// create the polygon object
var myPolyArray = [];
// array to store the result
var $, map0, map1, featureLayer, totAsian = 0, totBlack = 0, totHispanic = 0, totWhite = 0, 
totAll = 0, countRows = 0, highAsian = 0, highBlack = 0, highHispanic = 0, highWhite = 0;
// global variables and population statistical variables

Date.prototype.IsoNum = function (n) {
    var tzoffset = this.getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(this - tzoffset)).toISOString().slice(0,-1);
    return localISOTime.replace(/[-T:\.Z]/g, "").substring(0,n || 20); // YYYYMMDD
};

var timeX = new Date();
var time = timeX.IsoNum(14);
// generate time
var hash = function(s){
    
    if (typeof(s) == "number" && s === parseInt(s, 10)){
        s = Array(s + 1).join("x");
    }
    return s.replace(/x/g, function(){
        var n = Math.round(Math.random() * 61) + 48;
        n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
        return String.fromCharCode(n);
    });
};
var require;
var userhash = hash(10);
// generate hash
var sessionObj1 = {};
var sessionObj2 = {};
// two objects to store the data result
var serverurl = "http://arcgis-arccgaharvardedu-66613874.us-east-1.elb.amazonaws.com/arcgis/rest/services/hgks/geopop/MapServer";
// arcgis server services URL
require([
    "esri/map",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", 
    "esri/renderers/SimpleRenderer",
    "esri/Color",
    "esri/geometry/webMercatorUtils",   
    "dojo/on",
    "dojo/parser",
    "dojo/ready"
], function (Map, QueryTask, Query, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer, Color, webMercatorUtils, on, parser, ready) {
    parser.parse();
    
    ready(function () {            
        "use strict";            
        // map0 is the full starting screen - map1 is the compare map
        map0 = new Map("mapDiv0", {basemap:"gray", center:[-94, 38], zoom:5});
        map1 = new Map("mapDiv1",{basemap: "gray", center: [-94, 38], zoom: 5 });
        map0.on("load", function() {map0.disableDoubleClickZoom();});
        map1.on("extent-change", function (){map0.setExtent(map1.extent);});

        $(document).on('click', '.dropdown-menu li', function () {
            console.log($(this).attr("value"));
            var typeBasemap = $(this).attr("value");
            map0.setBasemap(typeBasemap);
            map1.setBasemap(typeBasemap);
        });
                       
        $("#zipsub").click(function(){              
            var zipcode = String(document.getElementById("zipcodeid").value);            
            var queryTask = new QueryTask(serverurl + "/1");
            var query = new Query();
            query.returnGeometry = true;
            query.where = "ZIP = '"+ zipcode + "'";
            queryTask.execute(query,queryZipcode);
            addZipcodeLayerMap0(zipcode);
            addFeatureLayer(zipcode);
            addZipcodeLayerMap1(zipcode);
            addSideLayer(zipcode);
            
            
            featureLayer.on("update-end", function () {                     
            //keep the layer selected on zoom in and zoom out 
            if(myPolyArray.length === 0){ 
                for (var i = 0; i < document.getElementsByClassName("svgMap0").length; i++) { 
                    var valFIPS = document.getElementsByClassName("svgMap0")[i].getAttribute("data-FIPS");
                    var valX = document.getElementsByClassName("svgMap0")[i].getAttribute("data-X");
                    var valY = document.getElementsByClassName("svgMap0")[i].getAttribute("data-Y");
                    var valY = document.getElementsByClassName("svgMap0")[i].getAttribute("data-Y");
                    var valIDX = document.getElementsByClassName("svgMap0")[i].getAttribute("data-IDX");  
                    var fipsPoly = new myPoly(valFIPS, "none", valX,valY,valIDX);                            
                    myPolyArray.push(fipsPoly);                    
                    }
                }
            });           
            
            var pctArray = {Asian:0, Black: 0, Hispanic: 0, White: 0};            
            var element1 = document.getElementById("legendDiv0");

            $.each(pctArray, function(key) {
                var para1 = document.createElement("p");
                var node1 = document.createTextNode(key);
                para1.appendChild(node1);
                para1.id = key;                                
                element1.appendChild(para1); 
            });
            document.getElementById("legendDiv0").style.opacity = 0.9;
            // when the blockgroup boundaries load add the legend on map0
            var raceVal = document.getElementById("originText");
            raceVal.innerHTML = "Choose the neighborhood where most <b>Asian</b> live or choose “Skip Group”";
            raceVal.style.color = "rgb(255, 255, 255)";
            //raceVal.style.background = "rgb(255, 128, 0)";
            raceVal.style.background = "rgb(255, 128, 0)";
            // add the blob
                                       
        });

        function addZipcodeLayerMap0(zipval) {       
            var zipcodeLayer = new FeatureLayer(serverurl + "/1", {
                id:"zipcodeLayer",                
                dataAttributes:["ZIP"]
            });

            zipcodeLayer.setDefinitionExpression("ZIP = '"+ zipval + "'");

            var sfs = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 4);

            zipcodeLayer.setRenderer(new SimpleRenderer(sfs));
            map0.addLayer(zipcodeLayer);
            //map1.addLayer(zipcodeLayer);
            return zipcodeLayer;
        }

        function addZipcodeLayerMap1(zipval) {       
            var zipcodeLayer = new FeatureLayer(serverurl + "/1", {
                id:"zipcodeLayer",                
                dataAttributes:["ZIP"]
            });

            zipcodeLayer.setDefinitionExpression("ZIP = '"+ zipval + "'");

            var sfs = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 4);

            zipcodeLayer.setRenderer(new SimpleRenderer(sfs));
            map1.addLayer(zipcodeLayer);
            return zipcodeLayer;
        }
        
        // add zipcode outline to the map         
        $("#modalinfo").click(function(){
            $("#formModalFirst").modal("show");
            currentPage = 4;              
        });

        // open the infomodal
        var mapZoomChange = map0.on("zoom-end", zoomChangeHandler);        
        
        // function that slide in a new map section for data comparison
        $("#mapcompare").click(function(){           
            $("#formModalThird").modal("hide");            
            $("#wrapper").toggleClass("toggled");

            var pctAsianUser = $("input[name=radioq1]:checked", "#q1form").val();
            var pctBlackUser = $("input[name=radioq2]:checked", "#q2form").val();
            var pctHispanicUser = $("input[name=radioq3]:checked", "#q3form").val();
            var pctWhiteUser = $("input[name=radioq4]:checked", "#q4form").val();
            //var pctOtherUser = $("input[name=radioq5]:checked", "#q5form").val();
            // open the second map
            sessionObj2.timestamp = time;
            sessionObj2.sessionid = time + "_"+ userhash;
            sessionObj2.pctAsian = pctAsianUser;
            sessionObj2.pctBlack = pctBlackUser;
            sessionObj2.pctHispanic = pctHispanicUser;
            sessionObj2.pctWhite = pctWhiteUser;
            //sessionObj2.pctOther = pctOtherUser;    
            sessionObj2.respondent = $("input[name=radioq6]:checked", "#q6form").val();
            sessionObj2.email = String(document.getElementById("useremail").value);
            
            var myJsonString2 = JSON.stringify(sessionObj2);
            console.log(myJsonString2);           
            // store the data in the database
            featureLayer.disableMouseEvents();        
            // disable the mouse click over the MAP0 once MAP1 is also on       
            //stop this faction after 2 seconds
            totAsian = totAsian ? totAsian : 0;
            totBlack = totBlack ? totBlack : 0;
            totHispanic = totHispanic ? totHispanic : 0;
            totWhite = totWhite ? totWhite : 0;
            countRows = countRows ? countRows : 0;            
            // make sure a null value become zero
            //totAll = parseInt(totAsian) + parseInt(totBlack) + parseInt(totHispanic) + parseInt(totWhite);
            //console.log(parseInt(totAsian), parseInt(totBlack), parseInt(totHispanic), parseInt(totWhite), countRows)
            
            var meanAsian = parseFloat((totAsian / countRows)).toFixed(0);
            var meanBlack = parseFloat((totBlack / countRows)).toFixed(0);
            var meanHispanic = parseFloat((totHispanic / countRows)).toFixed(0);
            var meanWhite = parseFloat((totWhite / countRows)).toFixed(0);          
            
            // create average variables
            var meanArray = {Asian:meanAsian + "," + highAsian , Black: meanBlack + "," + highBlack, 
            Hispanic: meanHispanic + "," + highHispanic, White: meanWhite + "," + highWhite};
            console.log(meanArray)
            //console.log(highAsian,highBlack, highHispanic, highWhite);
            var data = {
                labels: ["Asian", "Black", "Hispanic", "White"],
                
                datasets: [{
                    label: "Average values",
                    //new option, barline will default to bar as that what is used to create the scale
                    type: "line",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(0,0,0,1)",
                    pointColor: "rgba(0,0,0,1)",
                    pointStrokeColor: "#000000",
                    pointHighlightFill: "#cccccc",
                    pointHighlightStroke: "rgba(0,0,0,1)",
                    data: [meanAsian,meanBlack, meanHispanic, meanWhite]
                },{
                    label: "Highest values",
                    //new option, barline will default to bar as that what is used to create the scale
                    type: "bar",
                    fillColor: "rgba(255,255,0,0)",
                    strokeColor: "rgba(255,255,0,1)",
                    pointColor: "rgba(220,20,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [highAsian,highBlack, highHispanic, highWhite]
                } ]
            };


            var lineBar = document.getElementById("line-bar").getContext("2d");
            var myLineBarChart = new Chart(lineBar).LineBar(data,{
                
            });
            //console.log(myLineBarChart.datasets[1])
            myLineBarChart.datasets[1].bars[0].strokeColor = "rgba(255, 128, 0, 1)";
            myLineBarChart.datasets[1].bars[0].fillColor = "rgba(255, 128, 0, .3)";            
            myLineBarChart.datasets[1].bars[1].strokeColor = "rgba(255, 0, 0, 1)";
            myLineBarChart.datasets[1].bars[1].fillColor = "rgba(255, 0, 0, .3)";            
            myLineBarChart.datasets[1].bars[2].strokeColor = "rgba(0, 255, 0, 1)";
            myLineBarChart.datasets[1].bars[2].fillColor = "rgba(0, 255, 0, .3)";            
            myLineBarChart.datasets[1].bars[3].strokeColor = "rgba(0, 0, 255, 1)";
            myLineBarChart.datasets[1].bars[3].fillColor = "rgba(0, 0, 255, .3)";            
            myLineBarChart.update();

            document.getElementById("blockTable").rows[0].cells[0].innerHTML = "Zipcode: " + String(document.getElementById("zipcodeid").value);
            var j = 0;
            $.each(meanArray, function(key, index) {                
                j = j + 1;
                blockTable(key, meanArray[key].split(',')[0], meanArray[key].split(',')[1], j)
                
            });

            /*new Chartist.Bar('.ct-chart', {
              labels: ['Asian (Mean: ' + meanAsian +')', 'Black (Mean:' + meanBlack +')', 'Hispanic (Mean: ' + meanHispanic +')', 'White (Mean: ' + meanWhite + ')'],
              series: [highAsian, highBlack, highHispanic, highWhite]
            }, {
              distributeSeries: true,
              //horizontalBars: true
            });*/
            /*
            var pctArrayUser = {Asian:pctAsianUser, Black: pctBlackUser, Hispanic: pctHispanicUser, White: pctWhiteUser, Other: pctOtherUser};
            console.log(pctArrayUser);
            $.each(pctArrayUser, function(key) {
                switch (pctArrayUser[key]) {
                    case "1":
                        pctArrayUser[key] = "< 10%";     
                        break;
                    case "2":                            
                        pctArrayUser[key] = "11 to 30%";     
                        break;
                    case "3":                            
                        pctArrayUser[key] = "31 to 50%";     
                        break;
                    case "4":                            
                        pctArrayUser[key] = "51 to 70%";     
                        break;
                    case "5":                            
                        pctArrayUser[key] = "71 to 90%";     
                        break;            
                    case "6":                            
                        pctArrayUser[key] = "> 90%";     
                        break;
                    case undefined:                            
                        pctArrayUser[key] = "0%";  
                        break;                        
                }   
            });    
            
            var para1 = document.createElement("p");
            var node1 = document.createTextNode("Groups average and highest");
            
            para1.appendChild(node1);
            para1.className = "legendtitle";
            var element1 = document.getElementById("legendDiv1");
            element1.appendChild(para1);

            $.each(averageArray, function(key) {
                var para1 = document.createElement("p");
                var node1 = document.createTextNode(key + ": " + averageArray[key].split(',')[0] + " - " + averageArray[key].split(',')[1]);
                para1.appendChild(node1);
                para1.id = key;

                //var element1 = document.getElementById("legendDiv1");
                element1.appendChild(para1);
            });
            */
            // populate LEGEND MAP 1
            /*
            document.getElementById("legendDiv0").style.height = "210px";
            document.getElementById("legendDiv0").style.width = "160px";           
            // set a new legend height and width
            var myNode = document.getElementById("legendDiv0");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            var para0 = document.createElement("p");
            var node0 = document.createTextNode("Here’s what you said");
 
            para0.appendChild(node0);
            para0.className = "legendtitle";
            var element0 = document.getElementById("legendDiv0");
            element0.appendChild(para0);

            $.each(pctArrayUser, function(key) {
                var para1 = document.createElement("p");
                var node1 = document.createTextNode(key + ": " + pctArrayUser[key]);
                para1.appendChild(node1);
                para1.id = key;
                //var element1 = document.getElementById("legendDiv0");
                element0.appendChild(para1);
            });            
            */
            // populate LEGEND MAP 0
            var widthmap1 = document.getElementById("mapDiv1_root").style.width.split("px")[0]/6;
            var heightmap1 = document.getElementById("mapDiv1_root").style.height.split("px")[0]/2;
            var screenmap1 = esri.geometry.ScreenPoint(widthmap1,heightmap1);
            var mp = map1.toMap(screenmap1);
            var normalizedVal = esri.geometry.xyToLngLat(mp.x,mp.y)
            map1.centerAt(normalizedVal);
            var timesRun = 0;
            var interval = setInterval(function(){
                timesRun += 1;
                if(timesRun === 2){
                    clearInterval(interval);
                }
                //do whatever here..                
                map0.setExtent(map1.extent);                
            }, 1000);
                       
            // sync the two maps
                      
            $.post("js/survey.php", { myJsonString2: myJsonString2 }, function(data){ 
                // show the response
                window.open(data); 
            }).fail(function() { 
                // just in case posting your form failed
                alert( "Posting failed." ); 
            });
            // save the data to the database
        });
                
        function queryZipcode(featureSet) {
            var resultFeatures = featureSet.features;
            for (var i=0, il = resultFeatures.length; i<il; i++) {
                var graphic = resultFeatures[i];                    
                map0.setExtent(graphic.geometry.getExtent().expand(1), true);
                map1.setExtent(graphic.geometry.getExtent().expand(1), true);
                
            }                     
        }               
        
        $("#groupskip").click(function(){            
            var skipPoly = new myPoly("none", "none", "none","none","none");
            fourGroups.push(skipPoly);
            colors.splice(0,1);
            groupMessage(colors[n]);
            switch (fourGroups.length) {
                case 1:
                    document.getElementById("Asian").style.background = "rgb(160,160,160)";                    
                    break;
                case 2:
                    document.getElementById("Black").style.background = "rgb(160,160,160)";                    
                    break;
                case 3:
                    document.getElementById("Hispanic").style.background = "rgb(160,160,160)";
                    break;
                case 4:
                    document.getElementById("White").style.background = "rgb(160,160,160)";
                    document.getElementById("groupskip").disabled = true;
                    featureLayer.disableMouseEvents();
                    break;              
            }

        });
        // skip group function

        $("#startover").click(function(){            
            for (var i = 0; i < document.getElementsByClassName("svgMap0").length; i++) {
                document.getElementsByClassName("svgMap0")[i].setAttribute("data-originbreak","none");
            }
            for (var i = 0; i < myPolyArray.length; i++) {
                myPolyArray[i].polyorigin = "none";
            }
            fourGroups = [];            
            colors = ["Asian", "Black", "Hispanic", "White"];
            n = 0;
            document.getElementById("groupskip").disabled = false;
            for (var i = 0; i < colors.length; i++) {
               document.getElementById(colors[i]).style.background = "rgb(255,255,255)";
               document.getElementById(colors[i]).style.color = "rgb(0,0,0)";
               document.getElementById(colors[i]).style.borderColor = "rgb(0,0,0)";

            }
            featureLayer.enableMouseEvents();
            groupMessage("Asian");

        });

        // start over

        // zoom at the zipcode extent            
        $("#polysub").click(function(){
            $("#formModalSecond").modal("show");
            var finalArray = [];
            for (var i = 0; i < myPolyArray.length; i++) {
                //console.log(myPolyArray[i])
                delete myPolyArray[i].polyIDX;
                if(myPolyArray[i].polyorigin != "none"){
                   finalArray.push(myPolyArray[i]);         
                }
            }            
            
            sessionObj1.timestamp = time;            
            sessionObj1.sessionid = time + "_"+ userhash;
            sessionObj1.zip = String(document.getElementById("zipcodeid").value);
            sessionObj1.ziplive = $("input[name=optradiolive]:checked", "#zipcoderadio").val();
            if($("input[name=optradiolive]:checked", "#zipcoderadio").val() == "yes"){
                sessionObj1.zipyrs = $("input[name=optradioyear]:checked", "#yearradio").val();
            }
            else{sessionObj1.zipyrs = "";}
            sessionObj1.geo = finalArray;
            var myJsonString = JSON.stringify(sessionObj1);
            console.log(myJsonString);
            
            $.post("js/submit.php", { myJsonString: myJsonString }, function(data){ 
                // show the response
                window.open(data); 
            }).fail(function() { 
                // just in case posting your form failed
                alert( "Posting failed." ); 
            });
            // save the data to db
        });

        $("#secondform").click(function(){            
            $("#formModalThird").modal("show");
            $("#formModalSecond").modal("hide");
        });

        $("#newzipstart").click(function(){            
            location.reload();
        });


    });
    
    function zoomChangeHandler(){
        on(featureLayer, "graphic-draw", function () {
            
            for (var i = 0; i < document.getElementsByClassName("svgMap0").length; i++) {
                var blkPoly = document.getElementsByClassName("svgMap0")[i].getAttribute("data-FIPS"); 
                
                for (var j = 0; j < myPolyArray.length; j++){
                    if(myPolyArray[j].polyfips == blkPoly){
                        //console.log(blkPoly, blkColor, " yes")
                        document.getElementsByClassName("svgMap0")[i].setAttribute("data-originbreak",myPolyArray[j].polyorigin);        
                    }
                }
            }   
        });             
    }
    // take care of the blockgroup once selected and user zoom in or out
    
    function addSideLayer(zipval) {       
        var sideLayer = new FeatureLayer(serverurl + "/0", {
            id:"sideLayer",
            styling:false,              
            dataAttributes:["WHITE","BLACK","ASIAN","HISPANIC","zipcode", "groups"]
        });

        sideLayer.setDefinitionExpression("zipcode = '"+ zipval + "'");
        if (sideLayer.surfaceType === "svg") {
                on(sideLayer, "graphic-draw", function (evt) {
                    countRows = countRows + 1;
                    totAsian = totAsian + evt.graphic.attributes.ASIAN;            
                    totBlack = totBlack + evt.graphic.attributes.BLACK;
                    totHispanic = totHispanic + evt.graphic.attributes.HISPANIC;
                    totWhite = totWhite + evt.graphic.attributes.WHITE;
                    //console.log(evt.graphic.attributes.groups)
                    /*if(evt.graphic.attributes.groups != 'N'){
                        
                        highAsian = evt.graphic.attributes.ASIAN;            
                        highBlack = evt.graphic.attributes.BLACK;
                        highHispanic = evt.graphic.attributes.HISPANIC;
                        highWhite = evt.graphic.attributes.WHITE;
                        console.log(highAsian,highBlack, highHispanic, highWhite)    
                    }*/
                    var tableAttr = evt.graphic.attributes.groups;
                    //console.log(tableAttr)
                    var category;
                    if (tableAttr == "A") {
                        category = "Asian";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN; 
                    } else if (tableAttr == "AB") {
                        category = "AB";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                    } else if (tableAttr == "ABH") {
                        category = "ABH";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                    } else if (tableAttr == "ABHW") {
                        category = "ABHW";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "ABW") {
                        category = "ABW";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "AH") {
                        category = "AH";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                    } else if (tableAttr == "AHW") {
                        category = "AHW";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "AW") {
                        category = "AW";
                        highAsian = highAsian + evt.graphic.attributes.ASIAN;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "B") {
                        category = "Black";
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                    } else if (tableAttr == "BH") {
                        category = "BH";
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                    } else if (tableAttr == "BHW") {
                        category = "BHW";
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "BW") {
                        category = "BW";
                        highBlack = highBlack + evt.graphic.attributes.BLACK;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "H") {
                        category = "Hispanic";
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                    } else if (tableAttr == "HW") {
                        category = "HW";
                        highHispanic = highHispanic + evt.graphic.attributes.HISPANIC;
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    } else if (tableAttr == "N") {
                        category = "none";
                    }
                    else if (tableAttr == "W") {
                        category = "White";
                        highWhite = highWhite + evt.graphic.attributes.WHITE;
                    }
                    // set the data attribute for the current feature
                    evt.node.setAttribute("data-originbreak", category);
                    
                });
            } else {
                alert("Your browser does not support SVG.\nPlease user a modern web browser that supports SVG.");
                dom.byId("legend").innerHTML = "Your browser does not support SVG.";
            }            
            
       
        // get the data for creating the percentage
        map1.addLayer(sideLayer);
        return sideLayer;
    }
    // add feature to the side map

    var createSVGElement = function(element) {
        return $(document.createElementNS('http://www.w3.org/2000/svg', element));
    }

    function groupMessage(blkColor){
        var raceVal = document.getElementById("originText");
        //raceVal.innerText = "";              
        //blkColor = valGroup;            
        switch (blkColor) {
            case "Asian":                            
                raceVal.innerHTML = "Choose the neighborhood where most <b>Asian</b> live or choose “Skip Group”.";
                raceVal.style.color = "rgb(255, 255, 255)";
                //raceVal.style.background = "rgb(255, 128, 0)";
                raceVal.style.background = "rgb(255, 128, 0)";
                break;
            case "Black":
                raceVal.innerHTML = "Choose the neighborhood where most <b>Black</b> live or choose “Skip Group”.";
                raceVal.style.color = "rgb(255, 255, 255)";
                raceVal.style.background = "rgb(255, 0, 0)";                                                        
                break;
            case "Hispanic":
                raceVal.innerHTML = "Choose the neighborhood where most <b>Hispanic</b> live or choose “Skip Group”.";                           
                raceVal.style.color = "rgb(255, 255, 255)";
                raceVal.style.background = "rgb(0, 255, 0)";                            
                break;
            case "White":
                raceVal.innerHTML = "Choose the neighborhood where most <b>White</b> live or choose “Skip Group”.";
                raceVal.style.color = "rgb(255, 255, 255)";
                raceVal.style.background = "rgb(0, 0, 255)";                                                        
                break;
        }

    }

    function addFeatureLayer(zipval) {
        "use strict";
        featureLayer = new FeatureLayer(serverurl + "/0", {
            id:"featureLayer0",
            styling:false,
            dataAttributes:["FIPS", "zipcode"]
        });

        featureLayer.setDefinitionExpression("zipcode = '"+ zipval + "'");
        
        
        on(featureLayer, "click", function (evt) {
            console.log("Name: " + evt.graphic.attributes.FIPS);

            //console.log(evt.graphic.__proto__.setSymbol())
            for (var i = 0; i < document.getElementsByClassName("svgMap0").length; i++) { 
                var blkPoly = document.getElementsByClassName("svgMap0")[i].getAttribute("data-FIPS"); 
                if(blkPoly === evt.graphic.attributes.FIPS ){
                    //console.log(blkPoly, blkColor,i)
                    //console.log(i)
                    //var blkColor = "origin" + change();
                    var blkColor = change();
                    
                    //console.log(blkColor);                   
                    document.getElementsByClassName("svgMap0")[i].setAttribute("data-originbreak",blkColor);
                    document.getElementsByClassName("svgMap0")[i].setAttribute("data-IDX",i);
                    //console.log(blkPoly, blkColor, myPolyArray)
                    // this is for the origin label feedback
                    //console.log(blkColor, raceVal)
                    
                    for (var j = 0; j < myPolyArray.length; j++){
                        //console.log(i);
                        if(myPolyArray[j].polyfips === evt.graphic.attributes.FIPS){                            
                            myPolyArray[j].polyorigin = blkColor;
                            myPolyArray[j].polyIDX = i.toString() + "," + j.toString();
                            //console.log(myPolyArray[j]);
                            fourGroups.push(myPolyArray[j]);
                                         
                            // add poly to fourGroups                    
                            if(fourGroups.length >= 4 ){
                                featureLayer.disableMouseEvents();                                
                                document.getElementById("originText").innerHTML = "Save your result, or click Start Over button";
                                document.getElementById("originText").style.color = "rgb(0, 0, 0)";
                                document.getElementById("originText").style.background = "rgb(160,160,160)";
                            }
                            // stop cick after four click
                        }             
                    }
                }
            }
                       
            var fipsValue = evt.graphic.attributes.FIPS;
            for (var i = 0; i < fourGroups.length; i++) {
                
                if(i === 1 && fourGroups.length == 2){
                    if(fipsValue === fourGroups[0].polyfips){
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","AB");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "AB";
                    }                    
                }

                if(i === 2 && fourGroups.length == 3){
                    if(fipsValue === fourGroups[0].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","AH");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "AH";
                    }
                    if(fipsValue === fourGroups[1].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","BH");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "BH";
                    }
                    if(fipsValue === fourGroups[0].polyfips && fipsValue === fourGroups[1].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABH");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "ABH";
                    }                    
                }
                    
                if(i === 3 && fourGroups.length == 4){
                    if(fipsValue === fourGroups[0].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","AW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "AW";
                    }
                    if(fipsValue === fourGroups[1].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","BW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "BW";
                    }
                    if(fipsValue === fourGroups[2].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","HW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "HW";
                    }                    
                    if(fipsValue === fourGroups[0].polyfips && fipsValue === fourGroups[1].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "ABW";
                    }
                    if(fipsValue === fourGroups[0].polyfips && fipsValue === fourGroups[2].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","AHW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "AHW";
                    }
                    if(fipsValue === fourGroups[1].polyfips && fipsValue === fourGroups[2].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","BHW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "BHW";
                    }
                    if(fipsValue === fourGroups[0].polyfips && fipsValue === fourGroups[1].polyfips && fipsValue === fourGroups[2].polyfips){                    
                        document.getElementsByClassName("svgMap0")[parseInt(fourGroups[i].polyIDX.split(",")[0])].setAttribute("data-originbreak","ABHW");                
                        myPolyArray[parseInt(fourGroups[i].polyIDX.split(",")[1])].polyorigin = "ABHW";
                    }
                    document.getElementById("groupskip").disabled = true;
                                        
                }                               
            }
            groupMessage(colors[n]);
            
        });
        
        

        if (featureLayer.surfaceType === "svg") {

            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradAB"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#ff0000"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade AB + CLICK 1
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradAH"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#00ff00"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade AH + CLICK 2
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradBH"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#00ff00"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade BH + CLICK 2
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradABH"});
            createSVGElement('stop').attr({offset: "0%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"30%","stop-color":"#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset: "30%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"60%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "60%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"70%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "70%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"100%","stop-color":"#00ff00"}).appendTo($myGradient);             
            $('svg defs').prepend($myGradient);
            // lineargrade ABH + CLICK 2                                    
            
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradAW"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#0000ff"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade AW + CLICK 3 + WHITE
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradBW"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#0000ff"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade BW + CLICK 3 + WHITE
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradHW"});
            createSVGElement('stop').attr({offset: "50%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#0000ff"}).appendTo($myGradient);            
            $('svg defs').prepend($myGradient);
            // lineargrade HW + CLICK 3 + WHITE
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradABW"});
            createSVGElement('stop').attr({offset: "0%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"30%","stop-color":"#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset: "30%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"60%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "60%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"70%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "70%","stop-color": "#0000ff"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"100%","stop-color":"#0000ff"}).appendTo($myGradient);             
            $('svg defs').prepend($myGradient);
            // lineargrade ABW + CLICK 3 + WHITE
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradAHW"});
            createSVGElement('stop').attr({offset: "0%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"30%","stop-color":"#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset: "30%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"60%","stop-color":"#00ff00"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "60%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"70%","stop-color":"#00ff00"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "70%","stop-color": "#0000ff"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"100%","stop-color":"#0000ff"}).appendTo($myGradient);             
            $('svg defs').prepend($myGradient);
            // lineargrade AHW + CLICK 3
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradBHW"});
            createSVGElement('stop').attr({offset: "0%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"30%","stop-color":"#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset: "30%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"60%","stop-color":"#00ff00"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "60%","stop-color": "#00ff00"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"70%","stop-color":"#00ff00"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "70%","stop-color": "#0000ff"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"100%","stop-color":"#0000ff"}).appendTo($myGradient);             
            $('svg defs').prepend($myGradient);            
            // lineargrade BHW + CLICK 3
            var $myGradient = createSVGElement('linearGradient').attr( {id:"gradABHW"});
            createSVGElement('stop').attr({offset: "0%","stop-color": "#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"25%","stop-color":"#ff8000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset: "25%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "50%","stop-color": "#ff0000"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"50%","stop-color":"#ff0000"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "50%","stop-color": "#00ff00"}).appendTo($myGradient);            
            createSVGElement('stop').attr({offset:"75%","stop-color":"#00ff00"}).appendTo($myGradient); 
            createSVGElement('stop').attr({offset: "75%","stop-color": "#0000ff"}).appendTo($myGradient);
            createSVGElement('stop').attr({offset:"100%","stop-color":"#0000ff"}).appendTo($myGradient);             
            $('svg defs').prepend($myGradient);            
            
            // lineargrade ABHW + CLICK 3



            on(featureLayer, "graphic-draw", function (evt) {
                var normalizedVal = webMercatorUtils.xyToLngLat(evt.graphic.geometry.getCentroid().x,evt.graphic.geometry.getCentroid().y);
                evt.node.setAttribute("data-originbreak", "none");                                
                evt.node.setAttribute("data-X", normalizedVal[1]);
                evt.node.setAttribute("data-Y", normalizedVal[0]);
                evt.node.setAttribute("data-IDX", "none");
                evt.node.setAttribute("class", "svgMap0");
                // set the data attributes for the current feature
                
            });
        } else {
            alert("Your browser does not support SVG.\nPlease user a modern web browser that supports SVG.");            
        }
        
        
        map0.addLayer(featureLayer);      
        return featureLayer;
    }
    // add the selected blockgroup to the map
    
    var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function _drag_init(elem) {
        // Store the object of the element which needs to be moved
        selected = elem;
        x_elem = x_pos - selected.offsetLeft;
        y_elem = y_pos - selected.offsetTop;
    }

    // Will be called when user dragging an element
    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        y_pos = document.all ? window.event.clientY : e.pageY;
        if (selected !== null) {
            selected.style.left = (x_pos - x_elem) + "px";
            selected.style.top = (y_pos - y_elem) + "px";
        }
    }
    // Destroy the object when we are done
    function _destroy() {
        selected = null;
    }
    // Bind the functions...
    document.getElementById("originText").onmousedown = function () {
        _drag_init(this);
        return false;
    };

    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;
    // drag originText DIV -- this goes away if we decide to remove the label div
    function blockTable(v0, v1, v2, v4) {
        var table = document.getElementById("blockTable");
        var row = table.insertRow(v4);
        var cell0 = row.insertCell(0);
        cell0.setAttribute("class", v0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        cell0.innerHTML = v0;
        cell1.innerHTML = v1;
        cell2.innerHTML = v2;
    }

});

