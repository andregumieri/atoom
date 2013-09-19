/**
 * Stage
 * 
 * @param ARRAY size - (INT block width, INT block height)
 * @param INT blocksize - Size of each block in pixels
 */
var Stage = function(size, blocksize) {
	this.stageContainer = document.createElement('div');
	this.blocksElements = [];

	/**
	 * Stage.__constructor()
	 * Constructor function of the stage
	 */
	this.__constructor = function(size, blocksize) {
		this.stageContainer.style.position='absolute';
		this.stageContainer.style.width = blocksize*size[0] + "px";
		this.stageContainer.style.height = blocksize*size[1] + "px";


		for(var c = 0; c<size[0]; c++) {
			for(var l = 0; l<size[1]; l++) {
				if(!this.blocksElements[c]) this.blocksElements[c]=[];

				var block = document.createElement('div');
				block.style.position = 'absolute';
				block.style.top = blocksize*l + "px";
				block.style.left = blocksize*c + "px";
				block.style.width = blocksize + "px";
				block.style.height = blocksize + "px";
				block.stageBlockType = "";

				this.blocksElements[c][l] = block;

				this.stageContainer.appendChild(block);
			}
		}
	};


	/**
	 * Stage.putWall()
	 * Set a block as a wall
	 *
	 * @param INT column
	 * @param INT line
	 */
	this.putWall = function(column, line) {
		this.blocksElements[column][line].stageBlockType="wall";
		this.blocksElements[column][line].style.backgroundColor = '#ff9900';
	};


	/**
	 * Stage.addAtom()
	 * Put a atom on a position
	 *
	 * @param ATOM atom 
	 * @param INT column
	 * @param INT line
	 */
	this.addAtom = function(atom, column, line) {
		var self = this;
		var elAtom = atom.getElement();
		elAtom.objAtom = atom;
		elAtom.style.width = blocksize+"px";
		elAtom.style.height = blocksize+"px";
		elAtom.style.zIndex = 10000;
		this.setElementPosition(elAtom, [column, line]);

		var infoTouch = {
			startPos: null,
			startTime: null,
			distance: null,
			axis: null,
			direction: null
		}

		var fnResetTouch = function() {
			infoTouch.startPos = null;
			infoTouch.startTime = null;
			infoTouch.distance = null;
			infoTouch.axis = null;
			infoTouch.direction = null;
		}

		var fnTouchStart = function(e) {
			e.preventDefault();
			infoTouch.startTime = (new Date()).getTime();
			infoTouch.startPos = [e.pageX, e.pageY];
		}

		var fnTouchMove = function(e) {
			e.preventDefault();
			if(!infoTouch.startTime) return;
			var firstMove = (infoTouch.distance===null) ? true : false;

			infoTouch.distance = [infoTouch.startPos[0]-e.pageX, infoTouch.startPos[1]-e.pageY];
			if(firstMove) { // First move event
				infoTouch.axis = Math.abs(infoTouch.distance[0])>=Math.abs(infoTouch.distance[1]) ? 0 : 1; // 0: X (horizontal); 1: Y (vertical)
				var tendency = (infoTouch.distance[infoTouch.axis]>0) ? 0 : 1;
				infoTouch.direction = [['left','right'],['up','down']][infoTouch.axis][tendency];
			}
		}

		var fnTouchEnd = function(e) {
			e.preventDefault();

			// Final position and time
			var endPos = [e.pageX, e.pageY];
			var endTime = (new Date()).getTime();
			var startPos = infoTouch.startPos;
			var startTime = infoTouch.startTime;
			var distance = infoTouch.distance;
			var axis = infoTouch.axis;
			var direction = infoTouch.direction;

			// Check if swipe is OK then execute it
			var swipeOk = (endTime-startTime < CONF.swipeTime) && (Math.abs(startPos[axis]-endPos[axis])>=CONF.swipeDistance);
			if(swipeOk) {
				self.moveAtom(this, direction);
				//alert("Swipe to " + direction);
			}
			fnResetTouch();
		}

		// Add events
		elAtom.addEventListener("touchstart", fnTouchStart, false);
		elAtom.addEventListener("touchmove", fnTouchMove, false);
		elAtom.addEventListener("touchend", fnTouchEnd, false);

		this.stageContainer.appendChild(elAtom);
	};


	/**
	 * Stage.moveAtom()
	 * Move atom to a new position
	 *
	 * @param DOM atom - The DOM element of the Atom
	 * @param STRING direction - left, right, up or down
	 */
	this.moveAtom = function(atom, direction) {
		var self = this;
		var moveTo = [atom.stageColumn, atom.stageLine];
		var directionControl = {
			up: 	{index: 1, diff: -1},
			right: 	{index: 0, diff: +1},
			down: 	{index: 1, diff: +1},
			left: 	{index: 0, diff: -1}
		};

		// Find a wall
		var wall = false;
		while(wall==false) {
			moveTo[directionControl[direction].index]+=directionControl[direction].diff;
			var block = null;

			if(direction=="up" || direction=="down") {
				block = self.blocksElements[atom.stageColumn][moveTo[1]];
			} else if (direction=="left" || direction=="right") {
				block = self.blocksElements[moveTo[0]][atom.stageLine];
			}

			if(block.stageBlockType!='') {
				moveTo[directionControl[direction].index] += (directionControl[direction].diff)*-1;
				wall = true;
			}
		}

		self.setElementPosition(atom, moveTo);
	};



	/**
	 * Stage.setElementPosition
	 * Set position for an element
	 *
	 * @param DOM element
	 * @param ARRAY position - [INT column, INT line]
	 */
	this.setElementPosition = function(element, position) {
		if(element.stageColumn && element.stageLine) {
			this.blocksElements[element.stageColumn][element.stageLine].stageBlockType = '';
		}
		element.stageColumn = position[0];
		element.stageLine = position[1];

		element.style.left = (position[0]*blocksize) + "px";
		element.style.top = (position[1]*blocksize) + "px";

		this.blocksElements[element.stageColumn][element.stageLine].stageBlockType = 'atom';
	};


	/**
	 * Stage.closeWithWalls()
	 * Closes all stage with walls
	 */
	this.closeWithWalls = function() {
		// Upper wall
		for(var x=0; x<this.blocksElements.length; x++) {
			this.putWall(x, 0);
		}

		// Left wall
		for(var x=1; x<this.blocksElements[0].length; x++) {
			this.putWall(0, x);
		}

		// Right wall
		for(var x=1; x<this.blocksElements[this.blocksElements.length-1].length; x++) {
			this.putWall(this.blocksElements.length-1, x);
		}

		// Bottom wall
		for(var x=1; x<this.blocksElements.length; x++) {
			this.putWall(x, this.blocksElements[x].length-1);
		}
	};


	/**
	 * Stage.putWallPattern()
	 * Set a wall pattern where '#' represents a wall and '_' represents a blank space
	 *
	 * @param ARRAY pattern - Each item on array represents a line and each line should have chars # and _
	 */
	this.putWallPattern = function(pattern) {
		for(var l = 0; l<pattern.length; l++) {
			for(var c = 0; c<pattern[l].length; c++) {
				var type = pattern[l].substr(c,1);
				if(type=="#") {
					this.putWall(c, l);
				}
			}
			// console.log();
			//for(var c = 0; c<)
		}
	};


	/**
	 * Stage.getElement()
	 * Returns the Stage's DOM element.
	 */
	this.getElement = function() {
		return this.stageContainer;
	};


	// Constructor
	this.__constructor(size, blocksize);
} 