<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" type="text/css" href="main.css"/>
		<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
		<script type="text/javascript" src="js/swgDrawing.js"></script>

	</head>
	<body>
		<div id="content">
			<svg width="1000" height="1000">
				<circle id="mainCircle" cx="300" cy="300" r="250" fill="none" stroke="black" />
				<line x1="300" y1="0" x2="300" y2="600" style="stroke:rgb(0,0,0);stroke-width:1;" id="sinLine" />
				<line x1="0" y1="300" x2="600" y2="300" style="stroke:rgb(0,0,0);stroke-width:1;" id="cosLine" />

				<line x1="550" y1="0" x2="550" y2="600" style="stroke:rgb(0,0,0);stroke-width:1;" id="tgLine" />
				<line x1="0" y1="50" x2="600" y2="50" style="stroke:rgb(0,0,0);stroke-width:1;" id="cotgLine" />

				<text x="610" y="304" style="font-size:25px;">cos</text>
				<text x="302" y="40" style="font-size:25px;">sin</text>
				<text x="555" y="150" style="font-size:25px;">tg</text>
				<text x="50" y="40" style="font-size:25px;">cotg</text>


				<!--  THE ANGLE -->

				<line id="angle" x1="300" y1="300" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2;" />


			</svg>

			<input type="text" value="30" id="angleBox" />
		</div>
	</body>
</html>