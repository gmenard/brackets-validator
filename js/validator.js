var bracketsMap = { 
	'(' : ')', 
	'{' : '}', 
	'[' : ']',
	'<' : '>'
};
	
var openings = Object.keys(bracketsMap);
var endings = openings.map(function(v) { return bracketsMap[v]; });

function validator(content) {
		
	var currentRow = 1;
	var currentCol = 0;
	
	var stack = new Array();
	for (var i = 0; i < content.length; i++) {
		if($.inArray(content[i], openings) != -1) {
			stack.push(content[i]);
		}
		else if ($.inArray(content[i], endings) != -1) {
			if(bracketsMap[stack.pop()] != content[i]) {
				return {
					pos : i,
					row : currentRow,
					col : currentCol
				};
			}
		}
		
		if (content[i] == '\n') {
			currentRow++;
			currentCol = 0;
		}
		currentCol++;
	}
	
	if(stack.length > 0) {
		return {
			pos : i,
			row : currentRow,
			col : currentCol
		};
	}
	return null;
}