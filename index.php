<?php require_once("pages/connect.php"); ?>
<!DOCTYPE html>
<!--
    index.php (login page)
    Author: Thomas Brun
-->
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/skeleton.css">
</head>
<body class="container">
    <h1 style="text-align: center; top-margin: 5%">Login</h1>
    <?php
        /*login script*/
        if(isset($_POST['login'])){
            $username = trim(mysqli_real_escape_string($con, $_POST['username']));
            $password = trim(mysqli_real_escape_string($con, $_POST['password']));
            $md5password = md5($password);
            //check user and password match to the database
            $query = mysqli_query($con,"SELECT * FROM `user` WHERE username='$username' AND password='$md5password'");
            //check how much rows return
            if(mysqli_num_rows($query) == 1){
                //login the user
 
                //get the id of the user
                $fetch = mysqli_fetch_assoc($query);
                //start the session and store user id in the session
                session_start();
                $_SESSION['id'] = $fetch['id'];
                $_SESSION['username'] = $fetch['username'];
                header("Location: pages/homePage.html");
            }else{
                //show error message
                echo "<script>alert('Error: Invalid Username or Password');</script>";
            }
        }
    ?>
    <form action="index.php" method="post">
        <div class="row">
            <div class="twelve columns">
                <label for="username">Enter your username:</label>
                <input type="text" class="u-full-width" name="username" placeholder="Example: ..." required>
            </div>
        </div>
        <div class="row">
            <div class="twelve columns">
                <label for="username">Enter your password:</label>
                <input type="password" class="u-full-width" name="password" required>
            </div>
        </div>
        <div class="row">
            <div class="twelve columns">
                <input type="submit" class="button u-full-width" value="login" name="login">
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="twelve columns">
                <p style="text-align: center;">Or if you are new here, click the button below to register yourself</p>
                <a href="register.php" class="button u-full-width">Register here</a>
            </div>
        </div>
    </form>
</body>
</html>