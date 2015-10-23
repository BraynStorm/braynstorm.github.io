<?php

$localeFilePath = 'locale.json';

$localeFile = fopen($localeFilePath, 'r');
$STRINGS = json_decode(fread($localeFile, filesize($localeFilePath)), true);
fclose($localeFile);

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Go 4 Boost</title>
		<script type="text/javascript" src="js/lib/jquery-2.1.3.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<link href="style/main.css" type="text/css" rel="stylesheet"/>
	</head>
<body>
	<?php
	
	if(isset($_SESSION['locale'])){
		$locale = $_SESSION['locale'];
	}else{
		
		?>
		
		<script type="text/javascript"> doBlurBG = true; </script>
		<div id="select-locale" class="popup">
			<?php
			foreach($STRINGS as $k=>$v){
				echo "<img src=\"img/locale-flags/$k.png\" class=\"locale-flag\" onclick=\"setLocale('$k');\"/>";			
			}
			?>
		</div>
	<?php } ?>
	<div id="container">
		<div id="admin-panel-button"></div>
		<div id="admin-panel"></div>
		<div id="menu-ribbon" class="noselect">
			<a href="index.php"><img src="img/logo.png" id="logo"/></a>
			<table>
				<tr>
					<td><div><a href="#menu-ribbon"><?php echo $STRINGS[$locale]['header-index']?></a></div></td>
					<td><div><a href="#crew"><?php echo $STRINGS[$locale]['header-crew']?></a></div></td>
					<td><div><a href="#prices"><?php echo $STRINGS[$locale]['header-prices']?></a></div></td>
					<td><div><a href="#"><?php echo $STRINGS[$locale]['header-done-purchases']?></a></div></td>
					<td><div><a href="#"><?php echo $STRINGS[$locale]['header-rules']?></a></div></td>
					<td><div><a href="#"><?php echo $STRINGS[$locale]['header-faq']?></a></div></td>
				</tr>
			</table>
		</div>