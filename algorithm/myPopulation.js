

class Population{
	
	constructor(_target, _mutationRate, _maxPop) {
		
		this.population; 				//array holding the population
		this.geneticPool;				//array list that holds the mating pool
		this.generationCount = 0;		//keep track of the amount of generations
		this.complete = false;			//track of if finished or notify
		this.target = _target;			//init the target string/gene we want
		this.mutationRate = _mutationRate;	//init the mutation rate
		this.perfectFit = 1;				//value to compare potential DNA genes
		
		this.mostFitGene = "";				//keep track of the best gene available
		
		this.population = [];			//empty 
		
		//initialization of the population
		//populate the array with random dna gene strings
		for(let i = 0; i < _maxPop; i++) {
			this.population[i] = new DNA(this.target.length);
		}
		
		this.geneticPool = [];		//init a empty genetic pool which we will select randomly from; selection is varied based on the fitness of each gene
		
		this.fitnessCalculation();			//calculare the fitness of the population
	}
	
	//calculate fitness of each gene DNA in the population
	fitnessCalculation() {
		//set value for each dna fitness
		for(let i = 0; i < this.population.length; i++) {
			this.population[i].fitnessCalculation(this.target);
		}
	}
	
	//populating the genetic pool with values based on fitness
	createGeneticPool() {
		this.geneticPool = [];		//clear the mating pool
		let maxFitness = 0;
		
		//calculate maxFitness = the highest fitness value in the population
		for (let i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > maxFitness) {
				maxFitness = this.population[i].fitness;
			}
		}
		
		//populating the genetic pool array
		for(let i = 0; i < this.population.length; i++) {
			//how many of this genetic add to the mating pool
			//map fitness to be a value between 0 and 1
			let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
			let quantity = floor(fitness * 100);	
			
			//add it genetics DNA's to genetic pool via for loop
			for(let j = 0; j < quantity; j++) {
				this.geneticPool.push(this.population[i]);
			}
		}
	}
	
	//selecting and genrating the next generation via random selection from genetic pool
	naturalSelection() {
		
		//loop to fill all population
		for(let i = 0; i < this.population.length; i++) {
			//select 2 random indexes to use as parents
			let a = floor(random(0, this.geneticPool.length));
			let b = floor(random(0, this.geneticPool.length));

			//select 2 random parents
			let parentA = this.geneticPool[a];
			let parentB = this.geneticPool[b];
			
			//crossover the parents and also mutate the child
			let child = parentA.crossOver(parentB);
			child.mutate(mutationRate);
			
			this.population[i] = child;
		}
		//increment the generations
		this.generationCount++;
	}
	
	//return the best (most fit) DNA gene
	getBest() {
		return this.mostFitGene;
	}
	
	//find the best attempt at the target
	//also checks for completion; (perfectFit)
	evaluate() {
		let recordFitness = 0.0;
		let index = 0;
		//loop through the population of DNA genes
		for (let i = 0; i < this.population.length; i++) {
			//if greater fitness than record fitness then store the index and the value
			if (this.population[i].fitness > recordFitness) {
				index = i;
				recordFitness = this.population[i].fitness;
			}
		}
		
		//update the most fit DNA gene
		this.mostFitGene = this.population[index].getGenes();
		
		//check if recordFitness is a perfect fit
		if(recordFitness === this.perfectFit) {
			//if so set complete to true and in result will termiate evolution
			this.complete = true;
		}
	}
	
	//calc average fitness of cuurent generation
	getAverageFitness() {
		let totalFitness = 0;
		for (let i = 0; i < this.population.length; i++) {
			totalFitness += this.population[i].fitness;
		}
		
		return totalFitness / (this.population.length);
	}

	//return string value of first (desired display max) amount of DNA genes
	populationGenes() {
		let desiredDisplayMax = 69;
		let everything = "";
		
		let displayLimit = min(this.population.length, desiredDisplayMax);
		
		//loop and populate display string 
		for(let i = 0; i < displayLimit; i++) {
			everything += this.population[i].getGenes();
			if(i % 4 == 3) {
				everything += "\n";
			} else {
				everything += "         ";
			}
		}
		return everything;
	}
	
	//check if should terminate or not
	isComplete() {
		return this.complete;
	}

	//returns current generation count
	getGenerations() {
		return this.generationCount;
	}
}