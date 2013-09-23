/**
 * Stage
 * 
 * @param STRING type - Atom type
 * @param OBJECT connections - T: INT, TR: INT, R: INT, BR: INT, B: INT, BL: INT, L: INT, TL: INT
 */
var Atom = function(type, connections) {
	var atom = document.createElement('div');
	var connectionsTypes = ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'];

	/**
	 * Atom.__constructor()
	 * Constructor function of the stage
	 */
	var __constructor = function(type, connections) {
		atom.className="atom";
		atom.style.position = 'absolute';

		var imgAtom = document.createElement('img');
		imgAtom.className = 'atom';
		imgAtom.src = 'skin/atom.svg';
		atom.appendChild(imgAtom);

		for(var connType in connections) {
			if(connectionsTypes.indexOf(connType)>=0) {
				var qtyConnections = (parseInt(connections[connType])>1) ? parseInt(connections[connType]) : '';
				var connImg = document.createElement('img');
				connImg.src = "skin/" + connType.toLowerCase() + qtyConnections + ".svg";
				connImg.className="conn " + connType.toLowerCase() + " qtd" + connections[connType];
				atom.appendChild(connImg);
			}
		}
	};


	/**
	 * Atom.getElement()
	 * Get Atom DOM element
	 */
	this.getElement = function() {
		return atom;
	};

	__constructor(type, connections);
}