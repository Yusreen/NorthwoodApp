
<?php
//Created by John Power
//Notification added by Yusreen Shah (A00415678)
    require_once("connect.php");
    session_start();
    //shop not login  users from entering 
   if(isset($_SESSION['id'])){
   $user_id = $_SESSION['id'];
    }else{
     header("Location: index.php");
 }
    if(isset($_GET['c_id'])){
        //get the conversation id and
        $conversation_id = base64_decode($_GET['c_id']);
        //fetch all the messages of $user_id(loggedin user) and $user_two from their conversation
        $q = mysqli_query($con, "SELECT * FROM messages WHERE conversation_id='$conversation_id'");
        //check their are any messages
        if(mysqli_num_rows($q) > 0){
            while ($m = mysqli_fetch_assoc($q)) {
                //format the message and display it to the user
                $user_form = $m['user_from'];
                $user_to = $m['user_to'];
                $message = $m['message'];


 
                //get name and image of $user_form from 'user' table
                $user = mysqli_query($con, "SELECT username,img FROM user WHERE id='$user_form'");
                $user_fetch = mysqli_fetch_assoc($user);
                $user_form_username = $user_fetch['username'];
                $user_form_img = $user_fetch['img'];

                // if the receiver has read the message, then update the notification_receiver to 0.
                if ($user_id === '$user_to')
                {
                 $notified_receiver = mysqli_query($con, "UPDATE conversation SET notification_receiver = 0 WHERE  (user_one='$user_form' AND user_two='$user_to') OR (user_one='$user_to' AND user_two='$user_form')");
                 if($notified_receiver){
                   
                   echo "received";
                  }
                }

               
                //display the message
               echo "
                            <div class='message'>
                                <div class='img-con'>
                                    <img src='{$user_form_img}'>
                                </div>
                                <div class='text-con'>
                                    <a href='#''>{$user_form_username}</a>
                                    <p>{$message}</p>
                                </div>
                            </div>
                            <hr>";
 
            }
        }else{
            echo "No Messages";
        }
    }
 
?>