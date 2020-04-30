
<?php
//Created by John Power
//Notification added by Yusreen Shah (A00415678)
    require_once("connect.php");
     //shop not login  users from entering 
   if(isset($_SESSION['id'])){
    $user_id = $_SESSION['id'];
     }else{
      header("Location: index.php");
  }
    //post message
    if(isset($_POST['message'])){
		console.log("post has been loaded");
        $message = mysqli_real_escape_string($con, $_POST['message']);
        $conversation_id = mysqli_real_escape_string($con, $_POST['conversation_id']);
        $user_form = mysqli_real_escape_string($con, $_POST['user_form']);
        $user_to = mysqli_real_escape_string($con, $_POST['user_to']);
 
        //decrypt the conversation_id,user_from,user_to
        $conversation_id = base64_decode($conversation_id);
        $user_form = base64_decode($user_form);
        $user_to = base64_decode($user_to);

         //flag the sender if message has been sent.
         $notified_sender = mysqli_query($con, "UPDATE conversation SET notification_sender = 0 WHERE  (user_one='$user_form' AND user_two='$user_to') OR (user_one='$user_to' AND user_two='$user_form')");
         
         
        //flag the receiver if message has been read.
         $notified_receiver = mysqli_query($con, "UPDATE conversation SET notification_receiver = 1 WHERE  (user_one='$user_form' AND user_two='$user_to') OR (user_one='$user_to' AND user_two='$user_form')");
      

        
       //insert into `messages`
        $q = mysqli_query($con, "INSERT INTO `messages` VALUES ('','$conversation_id','$user_form','$user_to','$message')");
        if($q){
            echo "Posted";
        }else{
            echo "Error";
        }

        
     

          
    }

?>