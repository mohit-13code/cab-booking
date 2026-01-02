/*
 * Generates an UNDIRECTED graph based on specific numerical rules:
 * 1. Adjacent Evens (e.g., 2-4): distance = 2
 * 2. Adjacent Odds (e.g., 1-3): distance = 1
 * 3. Consecutive (Smaller is Odd, e.g., 1-2): distance = 3
 * 4. Consecutive (Smaller is Even, e.g., 2-3): distance = 4
 */

function generateUndirectedGraph(maxNodes) {
  const graph = {};

  
  for (let i = 0; i < maxNodes; i++) {
    graph[i] = {};
  }

  for (let i = 0; i < maxNodes; i++) {
    
    if (i + 1 < maxNodes) {
      let next = i + 1;
      let weight = (i % 2 !== 0) ? 3 : 4; 
      
      graph[i][next] = weight;
      graph[next][i] = weight; 
    }

    
    if (i + 2 < maxNodes) {
      let jump = i + 2;
      let weight = (i % 2 === 0) ? 2 : 1; 
      
      graph[i][jump] = weight;
      graph[jump][i] = weight; 
    }
  }

  return graph;
}


const graph = generateUndirectedGraph(11);
//Now it Generates graph of 11 nodes(0-10)
// console.log("Undirected Graph Object:");
// console.log(graph);
module.exports = graph;