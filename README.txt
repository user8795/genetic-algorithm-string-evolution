Project name: 
	String evolution genetic algorithm

Description:
	This algorithm is crafted to evolve a population of string elements until 
	it successfully incorporates a target string. 
	Drawing inspiration from the mechanisms of natural selection and genetic 
	evolution, it iteratively enhances the fitness of the population towards 
	the desired target.

Installation:
No installation required:
All code is included in the respository, as well as the p5.js library

Credit:
Credit to the p5.js library

Usage:
To run the program with the default set values open the index.html file in 
a any browser.

To run the program with personal set values:
	Open the sketch.js file in a editor
	Navigate to the setup() function
	Modify the values for:..
		target
		popMax
		mutationRate
							..to the values that you would like to test

HOW IT WORKS:
Initialization:
	Begin by creating a population of random DNA elements (strings) with 
	the same length as the target string. 
	These DNA elements serve as the initial generation.


Genetic Pool Creation:
	A genetic pool is created where DNA elements with higher fitness scores are 
	more frequent in the genetic pool.
	Ex: stringA with fitness of 3 will appear in the genetic pool 3 times
	while stringB with fitness of 8 will appear in the genetic pool 8 times


Natural Selection:
	The next generation is populated by randomly selecting 2 DNA elements from 
	the genetic pool and then crossing them over and mutating the result.
		This selection process is biased towards DNA elements with higher fitness 
		scores, as they apear more frequently in the genetic pool.
		This esures that the fittest individuals have a higher chance of being 
		chosen for the next generation
		
	Crossover:
	Selected DNA elements undergo crossover, where portions of their 
	genetic material (characters in this case) are exchanged to create new 
	offspring DNA elements.
	This step introduces genetic diversity into the population.

    Mutation:
	Occasionally, random mutations are introduced into the offspring DNA elements. 
	These mutations involve changing a character in the DNA element to a different 
	character. 
	Mutation helps explore new regions of the search space and provides variation.
	
	
Fitness calculation:
	Each DNA element's fitness is evaluated based on its similarity to the 
	target string.
	This is measured using a fitness function where the number of matching 
	characters between the string and the target determines its fitness.


Evaluation:
	The process continues iteratively until a DNA element in the population matches
	the target string.
	If the exact target string is not found, the best candiate element is storred.



