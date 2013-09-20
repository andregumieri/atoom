CONF.StageDemo = [{
	size: [10, 10],
	atoms: [{
		type: 'o',
		connections: {r:1},
		column: 1,
		line: 5
	},{
		type: 'o',
		connections: {l:1},
		column: 8,
		line: 5
	}],
	wallPattern: []
}]

CONF.Stages = [{
	size: [11,10],
	atoms: [{
		id: 'h-l1',
		type: "h",
		connections: {l:1},
		conectsTo: {l:'o-l1-r1'},
		column: 2,
		line: 3
	},{
		id: 'h-r1',
		type: "h",
		connections: {r:1},
		conectsTo: {l:'o-l1-r1'},
		column: 7,
		line: 3
	},{
		id: 'o-l1-r1',
		type: "o",
		connections: {l:1,r:1},
		conectsTo: {l:'h-r1', r:'h-l1'},
		column: 8,
		line: 8
	}],
	wallPattern:[
		"#####",
		"#___#",
		"#___######",
		"#__#_____#",
		"#_#______##",
		"#_#__#_##_#",
		"#____#_#__#",
		"###_#__#__#",
		"_#________#",
		"_##########"
	]
},{
	size: [14,11],
	atoms: [{
		type: "h",
		connections: {b:1},
		column: 9,
		line: 4
	},{
		type: "h",
		connections: {l:1},
		column: 2,
		line: 5
	},{
		type: "c",
		connections: {l:1,r:1,t:1,b:1},
		column: 5,
		line: 4
	},{
		type: "h",
		connections: {l:1},
		column: 8,
		line: 8
	},{
		type: "h",
		connections: {t:1},
		column: 3,
		line: 9
	}],
	wallPattern:[
		"#####",
		"#___#",
		"#___##########",
		"#_#_#_#______#",
		"#_#_#_#___#__#",
		"#__#__#####__#",
		"#_______#____#",
		"#_______#____#",
		"#_#####______#",
		"#___#__#######",
		"########"
	]
}];