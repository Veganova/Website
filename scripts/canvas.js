//BUGS
// lOOK AT WHY CANNOT GO PROPERLY INTO THE LEAGUE BRANCH

var canvas;

// Represents a resume canvas
class ResumeCanvas {

	constructor(depth, node, boardId) {
		this.depth = depth; // How many layers of the board that will be displayed at a given time
		this.node = node; // Current node that is being displayed
		this.boardId = boardId; // The id of the board object
	}


	// initialize the text
	initText() {
		var result = this.node.print(1);
		document.getElementById(this.boardId).innerHTML = result;
	}

	// Goes in one level - using the given object's id to go down the correct branch
	// EFFECT: Same as that of printIn(id) - Mutates the document object by changing the board
	goIn(ob) {
		var id = ob.id;
		this.printIn(id);	
	}

	// Replaces the current node with the new selected node
	// EFFECT: Mutates the document object by changing the board with the above
	printIn(idSelected) {
		var n = this.node;
		for (var i = 0; i < n.branches.length; i += 1) {
			var entry = n.branches[i];
			var entryId = entry.getId();

			if (idSelected === entryId) {
				document.getElementById(n.getId()).parentElement.innerHTML = entry.print(this.depth);
				this.node = entry;
				break;
			}
		}
	}

	// Called from the back button - prints the parent of the current node
	// EFFECT: Mutates the document object by changing the board
	printOut() {
		var parent = this.node.parent;
		this.node = parent;
		document.getElementById(this.boardId).innerHTML = parent.print(this.depth);

	}

}

// Represents a node
class Node {
	constructor(current, branches, parent) {
		this.current = current;
		this.branches = branches;
		this.parent = parent;
	}

	// Get the id of this node, like HashCode
	getId() {
		var str = this.current;
		str = str.replace(/\s+/g, '');
		return str.substr(0, 8);
	}

	// Prints at the this node
	print(c) {
		
		var id_main = this.getId(); 
		var result = "<ul id =" + id_main + " " + "class = 'list-group' onclick='event.stopPropagation(); canvas.goIn(this);'>" ;
		
		result += "<li class = 'list-group-item'>" + this.current ;
		console.log(result);
		for (var i =0; i < this.branches.length; i += 1) {
			var entry = this.branches[i];
			if (c > 0) {
				result += entry.print(c - 1);
			}
		}
		result += "</li></ul>";
		return result;
	}

}

// The below will be recieved from the server as a JSON file
// and will be needed to be parsed into the following format..

// Preset constant
var a1, a2, achievements, a2_1, h1, h2, hobbies, goals, root;

	 a1 = new Node("Intership at Ovitas", [], achievements);
	 a2 = new Node("Tutor at RSM", [], achievements);
achievements = new Node("Achievements", [a1, a2], root);


	a2_1 = new Node("League video", [], h1);
 h1 = new Node("Animation", [a2_1], hobbies);
	 h2 = new Node("WebDesign", [], hobbies);
hobbies = new Node("Hobbies", [h1, h2], root);



goals = new Node("Goals", [], root);

// resumeElements = ;
root = new Node("Resume", [achievements, hobbies, goals], root);

achievements.parent = root;
a1.parent = achievements;
a2.parent = achievements;

h1.parent = hobbies;
a2_1.parent = h1;
h2.parent = hobbies;
hobbies.parent = root;

goals.parent = root;
root.parent = root;


// make a init function to initialize the canvas object below?
var canvas = new ResumeCanvas(1, root, "board");


$("#canvas").ready(canvas.initText());