# Petrol Filling Puzzle

## Problem

Starting from a start station S we need to reach destination station D.  
On the way between S and D there are N petrol pumps - F1, F2, ..., FN.  
We start at S with our tank full and may fill any amount of petrol at any of the pumps (in multiples of 1l, upto the max capacity of tank) in order to reach the station.  
We need to find the most cost effective way to do so.  

**Input** - all distances, tank capacity, price at each pump, milegage of vehicle (which is constant))  
**Oupt** - Amount of petrol to be bought at each pump to minimize total cost.

## Greedy Strategy

Between two stops we find the pump with the minimum cost and want to reach there with as little petrol left in the tank as possible and then fill as much petrol as possible there (since its cost is lowest).

Formally,  
Starting from pump `i` we want to reach pump `j`.  
If `j` is the next pump (`j = i+1`) how much petrol we should buy at `i` is trivial to solve (this is our base case).  
Otherwise, we find the pump `k` between `i` and `j`, and we want to reach `k` with the minimum amount of petrol possible.  
What is this minimum amount? Compute distance between `i` and `k` and divide that by mileage. Subtract that from the amount of petrol we started with at `i`. If this is positive this is minimum amount of petrol that we can reach `k` (i.e by buying none at any pump between).  
Now we have reduced the problem into two subproblems -
1. start at `i` reach `k`
2. start at `k` reach `j`

Now we apply this greedy strategy recursively on the subproblem 1 & 2 and combine the result.  

### Implementation

The greedy strategy has been implemented in Javascript (node.js) in `greedy.js`. Run using -  
```
node greedy.js
```
and the result will be printed to the console.
