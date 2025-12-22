function dijkstra(graph, src) {
  const dist = {};
  const visited = {};

  for (let node in graph) {
    dist[node] = Infinity;
    visited[node] = false;
  }

  dist[src] = 0;

  for (let i = 0; i < Object.keys(graph).length; i++) {
    let u = null;
    let min = Infinity;

    for (let node in dist) {
      if (!visited[node] && dist[node] < min) {
        min = dist[node];
        u = node;
      }
    }

    if (u === null) break;
    visited[u] = true;

    for (let v in graph[u]) {
      if (dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }

  return dist;
}

module.exports = dijkstra;
