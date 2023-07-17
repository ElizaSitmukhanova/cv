<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";
    require "PHPMailer/src/SMTP.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
    $mail->IsHTML(true); /* Разрешаем работу с HTML */

    $name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
    $email = $_POST["email"]; /* Почту */
    $message = $_POST["text"]; /* Сообщение с формы */

    $email_template = "template_mail.html"; // Считываем файл разметки
    $body = file_get_contents($email_template); // Сохраняем данные в $body
    $body = str_replace('%name%', $name, $body); // Заменяем строку %name% на имя
    $body = str_replace('%email%', $email, $body); // строку %email% на почту
    $body = str_replace('%message%', $message, $body); // строку %message% на сообщение

    $theme = "[заявка с формы]"; 
    
    $mail->isSMTP();                                           //Send using SMTP
    $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'frontendcv@mail.ru';                     //SMTP username
    $mail->Password   = 'xmcNK84e8A4cRNZAGS2w';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
    $mail->setFrom('frontendcv@mail.ru', 'CV');
    $mail->addAddress('elizarabota@mail.ru', 'Joe User');  


    $mail->Subject = $theme; /* Тема письма */
    $mail->MsgHTML($body);
 

/* Проверяем отправлено ли сообщение */
if (!$mail->send()) {
    $message = "Ошибка отправки";
  } else {
    $message = "Данные отправлены!";
  }
  
  /* Возвращаем ответ */	
  $response = ["message" => $message];
  
  /* Ответ в формате JSON */
  header('Content-type: application/json');
  echo json_encode($response);
  
  ?>