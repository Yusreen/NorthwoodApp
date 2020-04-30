<?php
    //connect to the database
    require_once("connect.php");
    session_start();
    //shop not login  users from entering 
    if(isset($_SESSION['id'])){
      $user_id = $_SESSION['id'];
    }else{
      header("Location: index.php");
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/skeleton.css">
  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.4.1/css/all.css' integrity='sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz'
    crossorigin='anonymous'>
  <link rel="stylesheet" href="../css/styleSkeleton.css">
  <script type="text/javascript" src="/App/scripts/jquery.min.js"></script>
  <script type="text/javascript" src="/App/scripts/script.js"></script>
  <script src="../scripts/navbar.js"></script>
  <script src="../scripts/messageVoice.js" type="text/javascript"></script>
  
</head>

<body class="container">

  <!--Contacts List-->
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <center>
        <strong>Welcome <?php echo $_SESSION['username']; ?> ! </strong>
    </center>
    <h2>Here's your contact list:</h2>
    <p>(Click on the name of the person you would like to chat with)</p>
    <div class="container">
    <?php
        //Show all the users except for me
        $query = "SELECT * FROM user WHERE id != '$user_id'";
        $q = mysqli_query($con, $query);

       //See if a new message has been sent
        $getNotif="SELECT * FROM conversation WHERE (user_one='$user_id' AND user_two !='$user_id') OR (user_one!='$user_id' AND user_two='$user_id')";
        $n = mysqli_query($con, $getNotif);

        
      
       //Display the results
       if (mysqli_num_rows($q) > 0) {
          while ($row=mysqli_fetch_assoc($q)){
          //If user has sent/received a message, the button color changes.
          if(mysqli_num_rows($n)>0)
          {
            $notif_row=mysqli_fetch_assoc($n);
           
            if( $notif_row['notification_receiver']>0)
            {
              
          echo "id: " . $notif_row["conversation_id"]. " - Name: " . $notif_row["user_one"]. " " . $notif_row["user_two"]. "<br>";
              
           echo "<a href='chat.php?id={$row['id']}' class='button u-full-width'style='background-color:#f6d8ac;color:#2a6592'><i class='far fa-user-circle' style='font-size:15px;'></i>&emsp;{$row['username']}</a><br>";
          }
          else  
          {
            echo "<a href='chat.php?id={$row['id']}' class='button u-full-width'><i class='far fa-user-circle' style='font-size:15px;'></i>&emsp;{$row['username']}</a><br>";
          
          }
        
        }
      }
    }
    ?>
    </div>
  </div>

  <!--Start of main body-->
  <h2 style="text-align: center;">Welcome to our Chat System</h2>
  <p style="text-align: center;">Click on the &#9776; symbol to see who you can chat with.</p>
  <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Who would you like to chat with?</span>

  <!--Chat body-->
  <div class="display-message">
  <fieldset>
    <legend>Your Messages:</legend>
    
    <?php
        //check $_GET['id'] is set  
        if(isset($_GET['id'])){
          $user_two = trim(mysqli_real_escape_string($con, $_GET['id']));
          //check $user_two is valid
          $q = mysqli_query($con, "SELECT id FROM user WHERE id='$user_two' AND id !='$user_id'");
          //valid $user_two
          if(mysqli_num_rows($q) == 1){
            //check $user_id and $user_two has conversation or not if no start one
            $conver = mysqli_query($con, "SELECT * FROM conversation WHERE (user_one='$user_id' AND user_two='$user_two') OR (user_one='$user_two' AND user_two='$user_id')");
            $notified_sender = mysqli_query($con, "UPDATE conversation SET notification_sender = 0 WHERE  (user_one='$user_id' AND user_two='$user_two') OR (user_one='$user_two' AND user_two='$user_id')");
            $notified_receiver = mysqli_query($con, "UPDATE conversation SET notification_receiver = 0 WHERE  (user_one='$user_id' AND user_two='$user_two') OR (user_one='$user_two' AND user_two='$user_id')");

            //they have a conversation
            if(mysqli_num_rows($conver) == 1){
              //fetch the converstaion id
              $fetch = mysqli_fetch_assoc($conver);
             $conversation_id = $fetch['conversation_id'];

            }else{ 
              //they do not have a conversation
              //start a new converstaion and fetch its id
              $q = mysqli_query($con, "INSERT INTO conversation VALUES ('','$user_id','$user_two',0,0)");
              $conversation_id = mysqli_insert_id($con);
            
             
            }
          }else{
            die("Invalid $_GET ID.");
          }
        }else {
          die("<p style='text-align: center;'>Click on the &#9776; symbol to see who you can chat with.</p>");
        }
      ?>
  </fieldset>
  </div>

  <div class="send-message">
  <!-- store conversation_id, user_from, user_to so that we can send send this values to post_message_ajax.php -->
  <input type="hidden" id="conversation_id" value="<?php echo base64_encode($conversation_id); ?>">
  <input type="hidden" id="user_form" value="<?php echo base64_encode($user_id); ?>">
  <input type="hidden" id="user_to" value="<?php echo base64_encode($user_two); ?>">

   <!--Space for user to type message-->
  <label for="msg"><b>Message:</b></label>
  <textarea placeholder="Type message.." name="msg" id="message" class="u-full-width" required></textarea>
  <div class="row">
    <button id="reply" class="six columns u-full-width">Reply</button>
    <button id="voice" class="six columns u-full-width">use your voice</button>
  </div>
  <hr>
  <div class="row">
    <a href="homePage.html" class="twelve columns button u-full-width">return to home page</a>
  </div>
  </div> 
	</body>

</html>