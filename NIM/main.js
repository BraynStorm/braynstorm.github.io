var player;
$(document).ready(function (){
	var LOG = $("#log");
	var GAME = $('#game');
	
	
	var END_TURN = $('#endTurn');
	var RESET = $('#reset');
	
	var row1 = $('#row1');
	var row3 = $('#row3');
	var row5 = $('#row5');
	var row7 = $('#row7');	
	
	rows = {
		1 : row1,
		3 : row3,
		5 : row5,
		7 : row7
	};
	
	function removeFromRow (player, row, count){
		if(rows[row].children().length < count)
			return false;
		
		for(var i = 0; i < count ; i++){
			rows[row].find(':first-child').remove();
		}
		
		log(player, " removed " + count + " cards from row " + row + ".");
		return true;
	}
	
	player = {
		removedThisTurn_count : 0,
		removedThisTurn_from : 0,
		cpuMakingMove : false,
		
		click: function (row, id){
			if(player.cpuMakingMove) return;
			
			var chldr = rows[row].children();
			
			if(chldr.length < player.removedThisTurn_count || (player.removedThisTurn_from !== row && player.removedThisTurn_from !== 0))
				return;
			
			var currentRowAndCard = rows[row].find(':eq('+ id +')');
			
			
			if(currentRowAndCard.hasClass('selected')){
				currentRowAndCard.removeClass('selected');
				player.removedThisTurn_count--;
				
				if(player.removedThisTurn_count === 0)
					player.removedThisTurn_from = 0;
				
			}else{
				currentRowAndCard.addClass('selected');
				
				player.removedThisTurn_count++;
				player.removedThisTurn_from = row;
			}
		},
		
		endTurn: function (){
			if(player.cpuMakingMove) return;
			
			if(player.removedThisTurn_count === 0 || player.removedThisTurn_from === 0)
				return;
			
			var chldr = rows[player.removedThisTurn_from].children();
			
			chldr.each(function (index){
				$(this).removeClass('selected');
			});
			
			removeFromRow(true, player.removedThisTurn_from, player.removedThisTurn_count);
			
			player.removedThisTurn_from = 0;
			player.removedThisTurn_count = 0;
			
			
			cpuMove();
		}
	};
	
	function cpuMove(){
		player.cpuMakingMove = true;
		var rowSize = {
				1: row1.children().length,
				3: row3.children().length,
				5: row5.children().length,
				7: row7.children().length
		};
		
		
		function checkIfPositionBalanced(column){
			var num = 0;
			
			for(var i in rowSize){
				num += rowSize[i] & Math.pow(2, column-1);
			}
			
			return num % 2 == 0;
		}
		
		function findRowWithPosition(position){
			for(var i in rowSize){
				var k = ((rowSize[i] & Math.pow(2, position-1)) !== 0);
				if( k )
					return i;
			}
		}
		
		// TODO: FIX THE NEXT ~10 lines and especially [1]
		var thirdColumnBalance = checkIfPositionBalanced(3);
		var secondColumnBalance = checkIfPositionBalanced(2);
		var firstColumnBalance = checkIfPositionBalanced(1);
		
		var columnBalance = {};
		
		// [1]
		for(var i = ((rowSize.length * 2) - 1), j = 0; i > 1 ; i-=2, j++){
			columnBalance[i] = checkIfPositionBalanced();
		}
		
		if(!thirdColumnBalance){
			var i = getRowWithPosition(3);
			removeFromRow(false, i, 3);
		}else if(!secondColumnBalance){
			
		}else{
			// Remove the first possible card [FAILSAFE / ENDGAME];
			for(var i in rows){
				if(removeFromRow(false, i, 1))
					break;
			}
		}
		
		
		player.cpuMakingMove = false;
	}
	
	
	$('.card').mouseup(function (){
		var row = parseInt($(this).parent().attr('id').replace('row', ''));
		var id = $(this).index();
		
		player.click(row, id);
	});
	
	
	END_TURN.mouseup(function (){
		player.endTurn();
	})
	
	
	function log(player, text){
		LOG.append((player ? "The Player:" : "The Computer:") + text + "<br/>");
	}
	
	
	
});