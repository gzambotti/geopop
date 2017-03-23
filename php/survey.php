<?php

//  Ryan Enos project: GeoSurvey   --  code by Lex Berman 2015-09-30

require 'CONNECTION_VARS';
$questions = $_POST[myJsonString2];

// session 

$json_q=json_decode($questions);
$time = $json_q->timestamp;
$sess = $json_q->sessionid;
$pctA = $json_q->pctAsian;
$pctB = $json_q->pctBlack;
$pctH = $json_q->pctHispanic;
$pctW = $json_q->pctWhite;
$resp = $json_q->respondent;
$email = $json_q->email;

$ck = 'http://maps.cga.harvard.edu/geosurvey/js/query.php?id='.$sess;
$ck_url = urlencode("$ck");

// connect
  $conn_string = '';
    $conn_string .= ' host=localhost';
    $conn_string .= ' port=5432';
    $conn_string .= ' dbname=' . $psqdb;
    $conn_string .= ' user=' . $psquser;
    $conn_string .= ' password=' . $psqpwd;

$dbconn = @pg_connect($conn_string);
  $stat = pg_connection_status($dbconn);
  if ($stat === PGSQL_CONNECTION_OK) {
      echo 'OK see: '.$ck_url;
  } else {
      echo '<p>Connection status bad <p>';
  }


// check session ID in survey table, if NOT already existing ($num3<1), insert survey row

$result3 = pg_query($dbconn, "SELECT * FROM survey WHERE survey_session = '$sess'");

$num3 = pg_num_rows($result3);
if ($num3<1) {
  //insert survey info
  $resultB = pg_query($dbconn, "INSERT INTO survey(time, survey_session, pctasian, pctblack, pcthispanic, pctwhite, respondent, email) 
  VALUES('$time', '$sess', '$pctA', '$pctB', '$pctH', '$pctW', '$resp', '$email');"); 
}

pg_close($dbconn);

?>
