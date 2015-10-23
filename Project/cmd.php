<?php
session_start();

if(isset($_POST['locale'])){
	$_SESSION['locale'] = $_POST['locale'];
}


?>