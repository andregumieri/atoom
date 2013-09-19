// Create container
var container = document.getElementById('container');
var currentStage = CONF.StageDemo[0];

var possibleBlockSize = Math.round(320/currentStage.size[0]);


var stage = new Stage(currentStage.size, possibleBlockSize);
if(currentStage.wallPattern.length==0) {
	stage.closeWithWalls();
} else {
	stage.putWallPattern(currentStage.wallPattern);	
}


for(var a=0; a<currentStage.atoms.length; a++) {
	var atom = new Atom(currentStage.atoms[a].type, currentStage.atoms[a].connections);
	stage.addAtom(atom, currentStage.atoms[a].column, currentStage.atoms[a].line);
}

container.appendChild(stage.getElement());