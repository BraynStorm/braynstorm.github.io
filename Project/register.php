<?php 
require 'dbconfig.php';

function validateEmail($email) {
	$re = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';
	return preg_match($pat, $email);
}

if(isset($_POST['registerButton']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])){
	
	if(strlen($_POST['username']) > 5 && strlen($_POST['password']) > 5){
		
		
		$username = addslashes(htmlspecialchars(trim($_POST['username'])));
		$steamlink = addslashes(htmlspecialchars(trim($_POST['steamlink'])));
		
		
		$salt = substr(md5(microtime()),rand(60,69),5); // Salt
		$password = hash('sha256', trim($_POST['password']) . $salt, false);
		
		$statement = $connection->prepare('INSERT INTO users (username, password, salt, email, steamlink) VALUES(?,?,?,?,?)');
		$statement->bind_param('ssss', $username, $password, $salt, $email, $steamlink);
		
	} else 
		echo 'Username or password too short';
}






?>