<?php include('server.php'); ?>
<!DOCTYPE html>
<!--
    register.php
    Author: Thomas Brun (A00408432)
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Page</title>
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/skeleton.css">
</head>
<body>
    <h1 style="margin-top: 5%; text-align: center;">Registration</h1>
    <form action="register.php" method="post">
        <?php include('errors.php'); ?>
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <label for="username">Your Username:</label>
                    <input type="text" class="u-full-width" name="username" value="<?php echo $username; ?>" required>
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="password_1">Your Password:</label>
                    <input type="password" class="u-full-width" name="password_1" required>
                </div>
                <div class="six columns">
                    <label for="password_2">Confirm your Password:</label>
                    <input type="password" class="u-full-width" name="password_2" required>
                </div>
            </div>
            <div class="row">
                <div class="twelve columns">
                    <button type="submit" class="u-full-width" name="reg_user">Register</button>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="twelve columns">
                    <p style="text-align: center;">Already a member?</p>
                    <a href="index.php" class="button u-full-width">Sign in here</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>