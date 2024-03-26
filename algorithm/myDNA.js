
//generates random char between ASCII values of 63 and 123
function randomChar() {
	let c = floor(random(63, 123))
	if (c === 63) { c = 32;}
	if (c === 64) { c = 46;}
	
	return String.fromCharCode(c);
}

class DNA {
	constructor(_length) {	//
		this.genes = [];	//array of each dna	
		this.fitness = 0;
		
		//fill the DNA gene array with random chars
		for (let i = 0; i < _length; i++) { 
			this.genes[i] = randomChar();	//random char function
		}
	}
	
	//fitness function; compare current gene to the target string
	fitnessCalculation(_target) {
		let score = 0;
		for(let i = 0; i < this.genes.length; i++) {
			if (this.genes[i] == _target.charAt(i)) {
				score++; // if the same character than increase fitness score
			}
		}
		//fitness expressed as a decimal
		this.fitness = score / (this.genes.length);
		//can add the line below to increase the fitness exponentially
		this.fitness = pow(this.fitness, 3);
	}
	
	//mix two parent DNA genes to make child DNA gene 
	crossOver(_parent) {
		let child = new DNA(this.genes.length);			//init child
		
		let midPoint = floor(random(this.genes.length));	//init random midpoint
		
		//loop and anything above midpoint add from this parent
		//anything below midpoint add from passed in parameter parent
		for (let i = 0; i < this.genes.length; i++) {
			if(i < midPoint) {
				child.genes[i] = this.genes[i];
			} else {
				child.genes[i] = _parent.genes[i];
			}
		}
		//return the modified and crossed child DNA gene
		return child;
	}
	
	//in the case that there is not enough variation in the initial population
	//artificial introduction of additional variation via mutation of dna
	mutate(_mutationRate) {
		for(let i = 0; i < this.genes.length; i++) {
			if(random(1) < _mutationRate) {
				this.genes[i] = randomChar();
			}
		}
	}
	
	//converts the array to a string and returns
	getGenes() {
		return this.genes.join("");
	}
}

