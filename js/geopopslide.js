'use strict';
var currentPage = 1;

$(document).ready(function() { 
    $(window).load(function(){
        $('.modal-dialog').modal({ keyboard: true })
        $('#formModalFirst').modal('show');
        $(".modalPageOne").show();        
        $(".modalPageTwo").hide();
    });   
});

function NextPage() {
    if(currentPage == 1) {
        // validate page contents here - return if invalid
        $(".modalPageOne").hide();
        $(".modalPageTwo").show();
        currentPage++;
    } else if (currentPage == 2){
        // etc..
        console.log("which page????")
    }
}

$(function() {
    $("button.next-button").on("click", function() {
        NextPage();
    });
});

var colors = ['none','Asian', 'Black', 'Latino', 'White', 'Other'];
var n = 0;

function change() {var fipsColors = colors[n++ % colors.length];return fipsColors;}

function ShowResults(value, index, ar) {
    //console.log(value.polyname, index)
    return value.polyfips;
}

function myPoly(polyfips, polyorigin) {
    this.polyfips = polyfips;
    this.polyorigin = polyorigin;
}
// this function that creates the polygon object
var myPolyArray = [];
// array to store the result
var map0, map1, featureLayer, sideLayer, origins = [];
var time = Date.now();
var sessionObj1 = new Object();
var sessionObj2 = new Object();
// two objects to store the data
var racebreaks = [{fill:"rgb(255, 128, 0)",legendLabel:"Asian"},{fill:"rgb(255, 0, 0)",legendLabel:"Black"},
                  {fill:"rgb(0, 255, 0)",legendLabel:"Latino"}, {fill:"rgb(0, 0, 255)",legendLabel:"White"},
                  {fill:"rgb(255, 0, 255)",legendLabel:"Other"}]; 

var serverurl = "http://arcgis-arccgaharvardedu-66613874.us-east-1.elb.amazonaws.com/arcgis/rest/services/hgks/geopop/MapServer"
// arcgis server URL
require([
    "esri/map",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol", 
    "esri/renderers/ClassBreaksRenderer",
    "esri/Color",     
    "dojo/_base/array",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/parser",
    "dojo/ready"
], function (Map, QueryTask, Query, FeatureLayer, SimpleFillSymbol, ClassBreaksRenderer, Color, array, dom, domConstruct, on, parser, ready) {
    parser.parse();
    
    ready(function () {            
        origins = [{attribute:"originnone",value:5000000}];

        map0 = new Map("mapDiv0", {basemap:"gray", center:[-94, 38], zoom:5});
        map1 = new Map("mapDiv1",{basemap: "gray", center: [-94, 38], zoom: 5 });
        map0.on("load", function() {
            map0.disableDoubleClickZoom();

        });
               
        $('#zipsub').click(function(){

            var zipcode = String(document.getElementById("zipcodeid").value);
            console.log(zipcode);
            
            var queryTask = new QueryTask(serverurl + "/1");
            var query = new Query();
            query.returnGeometry = true;
            query.where = "ZIP = '"+ zipcode + "'";
            //execute query
            
            queryTask.executeForCount(query,function(count){
                //dom.byId("info").innerHTML = count + " features matched the input query";
                if(count == 0){
                    console.log("add feedback");
                    var bootstrap_alert = function() {};
                    bootstrap_alert.info = function(message) {
                        $('#alert_placeholder').append('<div class="alert alert-danger alert-dismissable">'+ message+'</div>')
                    }       
                    bootstrap_alert.info("Wrong ZIP code. Please try again!");
                    $("#alert_placeholder").fadeTo(1500, 500).slideUp(500, function(){ $(this).remove(); });
                }
                else{
                    queryTask.execute(query,queryZipcode);
                    addFeatureLayer(zipcode);
                    addSideLayer(zipcode);

                    featureLayer.on("update-end", function () { 
                    //console.log("the layer is on");
                    //keep the layer selected on zoom in and zoom out 
                    if(myPolyArray.length == 0){ 
                        for (var i = 0; i < document.getElementsByTagName("path").length; i++) { 
                            var valFIPS = document.getElementsByTagName("path")[i].getAttribute("data-FIPS"); 
                            //if(foo == myPolyArray[j].polyname){
                            //document.getElementsByTagName("path")[i].setAttribute("data-originbreak",myPolyArray[j].polyorigin);
                            //console.log(foo) 
                            //}
                            var fipsPoly = new myPoly(valFIPS, "originnone");
                            
                            myPolyArray.push(fipsPoly);                    
                        }
                        }
                    });
                    $('#formModalFirst').modal('hide'); 
                }    
                },function(error){
                    console.log(error);
            });                
        });
        
        var mapZoomChange = map0.on("zoom-end", zoomChangeHandler);
        
        // function that slide in a new map section for data comparison
        $('#mapcompare').click(function(){
            $('#formModalSecond').modal('hide');
            //e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            sessionObj2.sessionid = time + String(document.getElementById("zipcodeid").value); // change to email
            sessionObj2.survey = [];
            var myJsonString = JSON.stringify(sessionObj2);

            console.log(myJsonString)
            // sync the two maps (probaby bettre to add button)
            //map0.on("extent-change",function(){map0.setExtent(map1.extent)});
            //return featureLayer;
            // draw legend items
            /*array.forEach(racebreaks, function (racebreak, i) {
                domConstruct.create("div", {
                    innerHTML:'<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                            '<path fill="' + racebreak.fill + '" d="M 0 0 L 23 0 L 23 23 L 0 23 Z" />' +
                            '</svg><span style="vertical-align: top; padding-left: 3px">' + racebreak.legendLabel + '</span>'
                }, 'legendDiv');
            })*/
            featureLayer.disableMouseEvents();

        });
        // sync the map
        /*$('#polysync').click(function(e){
            //console.log(e)
            map0.setExtent(map1.extent);
            map0.on("extent-change",function(){map0.setExtent(map1.extent);});
        });*/    
        // function to zoom at the zipcode extent
        function queryZipcode(featureSet) {
            var resultFeatures = featureSet.features;
            for (var i=0, il = resultFeatures.length; i<il; i++) {
                var graphic = resultFeatures[i];                    
                map0.setExtent(graphic.geometry.getExtent().expand(1), true);
                map1.setExtent(graphic.geometry.getExtent().expand(1), true);

            }
            
        }               

        // send the result to the db (to be completed)    
        $('#polysub').click(function(){
            $('#formModalSecond').modal('show');
            var finalArray = [];
            for (var i = 0; i < myPolyArray.length; i++) {
                //console.log(myPolyArray[i].polyorigin)
                if(myPolyArray[i].polyorigin != 'originnone'){
                   finalArray.push(myPolyArray[i])         
                }

            }
            
            /*for(var j= 0; j< finalArray.length; j++){
                var b = finalArray[j].polyorigin.split('origin')[1]; 
                finalArray[j].polyorigin = b;
            }*/

            sessionObj1.timestamp = time;
            sessionObj1.email = "someone@gmail.com";
            sessionObj1.sessionid = time + "one@gmail.com";
            sessionObj1.zip = String(document.getElementById("zipcodeid").value);
            sessionObj1.ziplive = "02142";
            sessionObj1.yrs = "3";
            sessionObj1.geo = finalArray;
            var myJsonString = JSON.stringify(sessionObj1);
            console.log(myJsonString)
            /*
            $.ajax({
                type: 'POST',
                url: 'process.php',
                data:{data: myJsonString},
                cache: false,

                success: function(){
                    alert("OK");
                    //console.log(data)
                }
            });
            */
            //console.log(finalArray)
            //var clickBtnValue = $(this).val();
            /*var ajaxurl = 'groupinsert.php',
            data =  {'action': myJsonString};
            $.post(ajaxurl, data, function (response) {
                // Response div goes here.
                console.log(data);
            });
            */
        });

        
    });

    // function to take care of the blockgroup once selected and user zoom in or out
    function zoomChangeHandler(evt){
        on(featureLayer, "graphic-draw", function (evt) {
    
            for (var i = 0; i < document.getElementsByTagName("path").length; i++) { 
                //console.log(document.getElementsByTagName("path")[i])
                var blkPoly = document.getElementsByTagName("path")[i].getAttribute("data-FIPS"); 
                var blkColor = document.getElementsByTagName("path")[i].getAttribute("data-originbreak");
                
                for (var j = 0; j < myPolyArray.length; j++){
                    if(myPolyArray[j].polyfips == blkPoly){
                        //console.log(blkPoly, blkColor, " yes")
                        document.getElementsByTagName("path")[i].setAttribute("data-originbreak",myPolyArray[j].polyorigin);        
                    }
                } 
            }    
        });             
        
    }
    // add feature to the side map
    function addSideLayer(zipval) {
        var sideLayer = new FeatureLayer(serverurl + "/0", {
            id:"sideLayer",              
            dataAttributes:["zipcode", "score"]
        });

        sideLayer.setDefinitionExpression("zipcode = '"+ zipval + "'");            
        var symbol = new SimpleFillSymbol();
        symbol.setColor(new Color([150, 150, 150, 0]));

        // Add five breaks to the renderer.
        var renderer = new ClassBreaksRenderer(symbol, "score");
        renderer.addBreak(1, 1, new SimpleFillSymbol().setColor(new Color([0, 0, 255, 0.6]))); //blue - white
        renderer.addBreak(2, 2, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.6]))); // red - black        
        renderer.addBreak(3, 3, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.6]))); // orange - asian        
        renderer.addBreak(4, 4, new SimpleFillSymbol().setColor(new Color([0, 255, 0, 0.6]))); // yellow - latino        
        renderer.addBreak(5, 5, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.6]))); // purple - other

        sideLayer.setRenderer(renderer);
        map1.addLayer(sideLayer);
        return sideLayer;
    }

    // add the selected blockgroup to the map
    function addFeatureLayer(zipval) {
        featureLayer = new FeatureLayer(serverurl + "/0", {
            id:"featureLayer",
            styling:false,
            dataAttributes:["FIPS", "zipcode"]
        });

        featureLayer.setDefinitionExpression("zipcode = '"+ zipval + "'");
        //var raceVal = document.getElementById("originText");
        on(featureLayer, "click", function (evt) {
            //console.log("Name: " + evt.graphic.attributes.name);
            //console.log(evt.graphic.__proto__.setSymbol())
            for (var i = 0; i < document.getElementsByTagName("path").length; i++) { 
                var blkPoly = document.getElementsByTagName("path")[i].getAttribute("data-FIPS"); 
                if(blkPoly == evt.graphic.attributes.FIPS ){
                    var blkColor = "origin" + change();
                    document.getElementsByTagName("path")[i].setAttribute("data-originbreak",blkColor);
                    //console.log(blkPoly, blkColor, myPolyArray)
                    /*console.log(blkColor, raceVal)
                    raceVal.innerText = "";              
                    
                    switch (blkColor) {
                        case "originnone":
                            blkColor = "originnone";
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "";
                            raceVal.style.opacity= 0.9; 
                            break;
                        case "originAsian":                            
                            raceVal.innerHTML = "<h1>" + blkColor.split("origin")[1] + "</h1>";
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "rgb(255, 128, 0)";
                            break;
                        case "originBlack":
                            raceVal.innerHTML = "<h1>" + blkColor.split("origin")[1] + "</h1>";
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "rgb(255, 0, 0)";                                                        
                            break;
                        case "originLatino":
                            raceVal.innerHTML = "<h1>" + blkColor.split("origin")[1] + "</h1>";                           
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "rgb(0, 255, 0)";                            
                            break;
                        case "originWhite":
                            raceVal.innerHTML = "<h1>" + blkColor.split("origin")[1] + "</h1>";
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "rgb(0, 0, 255)";                                                        
                            break;
                        case "originOther":
                            raceVal.innerHTML = "<h1>" + blkColor.split("origin")[1] + "</h1>";
                            raceVal.style.color = "rgb(255, 255, 255)";
                            raceVal.style.background = "rgb(255, 0, 255)";                                           
                            break;
                    }*/
                    for (var j = 0; j < myPolyArray.length; j++){
                        //console.log(myPolyArray[j].polyname);
                        if(myPolyArray[j].polyfips == evt.graphic.attributes.FIPS){
                            console.log(myPolyArray[j].polyfips, j)
                            myPolyArray[j].polyorigin = blkColor;
                        }             
                    }
                }
            }            
        });

        if (featureLayer.surfaceType === "svg") {
            
            on(featureLayer, "graphic-draw", function (evt) {
                var tableAttr = parseInt(evt.graphic.attributes.FIPS);
                //console.log(tableAttr, classbreaks[0].value)
                //console.log(evt.graphic.geometry);            
                
                var category;
                if (tableAttr > origins[0].value) {
                    category = origins[0].attribute;
                }
                // set the data attribute for the current feature
                evt.node.setAttribute("data-originbreak", category);
            });
        } else {
            alert("Your browser does not support SVG.\nPlease user a modern web browser that supports SVG.");
            //dom.byId("legend").innerHTML = "Your browser does not support SVG.";
        }
        map0.addLayer(featureLayer);

       
        return featureLayer;
    }

    // drag originText DIV
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
            selected.style.left = (x_pos - x_elem) + 'px';
            selected.style.top = (y_pos - y_elem) + 'px';
        }
    }

    // Destroy the object when we are done
    function _destroy() {
        selected = null;
    }

    // Bind the functions...
    document.getElementById('originText').onmousedown = function () {
        _drag_init(this);
        return false;
    };

    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;


});