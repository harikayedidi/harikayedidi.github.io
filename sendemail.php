<?php
                    $to = "hy837@nyu.edu";  
                    $subject = "New message from your website!";
                    $message = $_POST['name'] . " says ". $_POST['message'] ; 
                    $headers = 'From: '. $_POST["email"] . "\r\n" .
                                'Reply-To: ' . $_POST["email"] . "\r\n" .
                                'X-Mailer: PHP/' . phpversion();
                    mail($to,$subject,$message,$headers);
    ?>