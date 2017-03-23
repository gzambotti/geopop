<?php

//  Ryan Enos project  --  code by Lex Berman 2015-09-29
//  testing query of submitted data from map

require 'CONNECTION_VARS';
$id = $_GET[id];


echo "<html>
<head>
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
<title>json parser</title>
 <link rel='stylesheet' type='text/css'  href='json.css'>
</head>
<body>";
echo "<hr> searching for sessionID: <br>";   
echo $id; 
echo "<hr>";


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
      echo '<p>Connection status ok <p>';
  } else {
      echo '<p>Connection status bad <p>';
  }


// header
echo 'session info:  <p><div class="header">';

// check the new session record
$qry1 = pg_query($dbconn, "SELECT * FROM session WHERE sessionid = '$id'");
$num1 = pg_num_rows($qry1);
if ($num1<1) {
  echo "An error occurred.\n";
  exit;
}
else {
  while ($row = pg_fetch_row($qry1)) {
    echo "time: $row[1]";
    echo ", ";
    echo "email: $row[2]";
    echo ", ";
    echo "sessionid: $row[3]";
    echo ", ";
    echo "zip: $row[4]";
    echo ", ";
    echo "homezip: $row[5]";
    echo ", ";
    echo "yrs: $row[6]";
    echo "<br />\n";
  }
}

echo '</div>';



$qry2 = pg_query($dbconn, "SELECT * FROM blocks WHERE blocks_session = '$id'");
$num2 = pg_num_rows($qry2);
if ($num2<1) {
 echo '<hr>nothing found for id: ' . $id .'<p>';
}
else {
 echo '<p><hr><p><div class="blocks">';
  while ($row2 = pg_fetch_row($qry2)) {
    echo "blocks_session: $row2[1]";
    echo ", ";
    echo "polyfips: $row2[2]";
    echo ", ";
    echo "polyorigin: $row2[3]";
    echo ", ";
    echo "zip: $row2[4]";
    echo "<br />\n";
  }
 echo '</div>';
}

pg_close($dbconn);

?>

</body>
</html>
