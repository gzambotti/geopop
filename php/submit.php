<?php

//  Ryan Enos project: GeoSurvey   --  code by Lex Berman 2015-09-30

require 'CONNECTION_VARS';
$lines = $_POST[myJsonString];

//  random hash generator  (should move out of .php to .js)`
//  from https://gist.github.com/zyphlar/7217f566fc83a9633959 
function getRandomBytes($nbBytes = 32)
{
    $bytes = openssl_random_pseudo_bytes($nbBytes, $strong);
    if (false !== $bytes && true === $strong) {
        return $bytes;
    }
    else {
        throw new \Exception("Unable to generate secure token from OpenSSL.");
    }
}
function generatePassword($length){
    return substr(preg_replace("/[^a-zA-Z0-9]/", "", base64_encode(getRandomBytes($length+1))),0,$length);
}

// removed email value, not sent until survey.php
// session 

$json_h=json_decode($lines);
$time = $json_h->timestamp;
// $email = $json_h->email;
$zip = $json_h->zip;
$hm = $json_h->ziplive;
$yrs = $json_h->zipyrs;
$newsess = $json_h->sessionid;
/*
$hash = generatepassword(8);
$newsess = $time.'_'.$hash;
*/
$ck = 'http://maps.cga.harvard.edu/geosurvey/js/query.php?id='.$newsess;
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

//insert session info
$resultA = pg_query($dbconn, "INSERT INTO session(time, sessionid, zip, homezip, yrs) 
                  VALUES('$time', '$newsess', '$zip', '$hm', '$yrs');");

// block selections
// check session ID in blocks table, if NOT already existing ($num2<1), insert block rows

$result2 = pg_query($dbconn, "SELECT blocks_session FROM blocks WHERE blocks_session = '$newsess'");
$num2 = pg_num_rows($result2);
if ($num2<1) {
  $json_b=json_decode($lines);
   foreach($json_b->geo as $b)
    {
     $fips = $b->polyfips;
     $orig = $b->polyorigin;
     $x = $b->polyX;
     $y = $b->polyY;

        //insert block selections
        $resultB = pg_query($dbconn, "INSERT INTO blocks(blocks_session, polyfips, polyorigin, zip, polyX, polyY)
                  VALUES('$newsess', '$fips', '$orig', '$zip', '$x', '$y');");
    }
}

pg_close($dbconn);

?>
