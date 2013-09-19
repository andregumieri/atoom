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
		atom.innerHTML = type;
		atom.className="atom";
		atom.style.position = 'absolute';
		atom.style.backgroundColor = '#ccc';

		for(var connType in connections) {
			if(connectionsTypes.indexOf(connType)>=0) {
				var conn = document.createElement('div');
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