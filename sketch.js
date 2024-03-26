//init values
let CANVAS_WIDTH = 900;
let CANVAS_HEIGHT = 400;


let population;	

//modifiable values
let target;				//target string to achieve
let popMax;				//maximum population
let mutationRate;		//mutation rate



function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	
	//TO DIFFER ALGORITHM CHANGE EHE ELEMENTS BELOW: 
	let target = "whatever you may ask";		//target string
	popMax = 500;								//maximum population
	mutationRate = 0.01;						//mutation rate
	
	//init population with random values
	population = new Population(target, mutationRate, popMax);
}

function draw() {
	//populate the genetic mating pool (based off current population fitness) for 
	//the next generation
	population.createGeneticPool();
	
	//select and generate the next generation by randomly selecting from the 
	//genetic pool 
	//applies cross over between parents and also mutation to child
	population.naturalSelection();

	//calculate the fitness of all elements(DNA genes) in population
	population.fitnessCalculation();

	//find the best attempt at the target
	//also checks for completion; (perfectFit)
	population.evaluate();
	
	//check for completion
	if(population.isComplete()) {
		noLoop();
		console.log("COMPLETED");
		console.log("string when completed: " + population.getBest());
	}
	
	background(200);
	let answer = population.getBest();
	fill(0);
	textSize(12);
	text("best phrase: ", 15, 32);

	text(answer, 15, 55);

	let statsText = 
		"generation count:			" + population.getGenerations() + "\n";
	statsText +=
		"total Population:			" + popMax + "\n";
	statsText +=
		"average fitness:			" + nf(population.getAverageFitness(), 0, 4) + "\n";
	statsText +=
		"mutation rate:				" + floor(mutationRate * 100) + "%";
	
	text(statsText, 15, 96);
	
	text(population.populationGenes(), width / 4, 24);
	
}