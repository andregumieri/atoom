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

		var drawAtom = document.createElement('div');
		drawAtom.className = 'draw';
		atom.appendChild(drawAtom);
		drawAtom.innerHTML = type;

		for(var connType in connections) {
			if(connectionsTypes.indexOf(connType)>=0) {
				var conn = document.createElement('div');
				for(var x=0; x<connections[connType]; x++) {
					var connDraw = document.createElement('div');
					conn.appendChild(connDraw);
				}
				conn.className="conn " + connType.toLowerCase() + " qtd" + connections[connType];
				atom.appendChild(conn);
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