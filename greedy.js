// start station s -> fp1 -> fp2 -> ... -> fpN -> dest. station d
// sample inputs:

// capacity of fuel tank in litres
const capacity = 50;
// mileage in km per litre of petrol
const mileage = 10;
// distance array: [d0, d1, d2, d3, ..., dN, d_N+1] where :
// d0 : distance between s -> fp1
// di : distance between fp_i -> fp_i+1 for 1 <= i <= N-1 
// d_N+1 : distance between fpN -> d
const distances = [200, 50, 150, 300, 10, 450, 200, 100, 50, 160];
// cost of petrol array: [c1, c2, c3, ..., cN] where :
// ci : const of petrol in rupees per litre of petrol at fpi
const costs = [70, 40, 50, 45, 20, 100, 55, 35]; // N=8 pumps

// solution

// utility functions
const cost = i => costs[i-1] // 1 <= i <= N
// sum elements of an array
const sum = arr => arr.reduce((total, e) => total + e)
// total distance between petrol pumps -> i, j
// 0 <= i, j <= N+1 (we have allowed 0 & N+1, which are not pumps for sake of convinience later)
const dist = (i,j) => sum(distances.slice(i, j))
// if we start from fp_i with x l of petrol, when we reach fp_j
// what minimum amount of petrol in the tank that we can end up with
const minTank = (i, j, x) => Math.max(0, x - dist(i,j)/mileage)
// given i, j find k, such that fp_k has the cost between
// fp_i+1, fp_i+2, ..., fp_j-1 (i.e, i and j exclusive)
// 0 <= i, j <= N+2
const findMinCost = (i, j) => {
    let minIndex = i+1;
    let minCost = cost(minIndex);
    for (let k = i+2; k <= j-1; k++) {
        if (cost(k) < minCost) {
            minIndex = k;
            minCost = cost(k);
        }
    }
    return minIndex;
}

// get optimal filling amounts when
// we arrive at fp_i with x l in tank, and want to reach fp_j with y l
// 1 <= i <= N, 2 <= j <= N+1, j > i, 0 <= x <= capacity, 0 <= y <= capacity
// returns if solvable ([a_i, a_i+1, a_i+2, ..., a_j-1], totalCost)
// where a_k is the amount of petrol that we buy at fp_k
// if unsolvable returns null
const getOptimalHelper = (i, j, x, y) => {
    if (j === i + 1) {
        // base case
        const petrolSpent = distances[i] / mileage;
        const toBuy = y - (x - petrolSpent);
        if (toBuy < 0 || x + toBuy > capacity)
            return null;
        return [[toBuy], cost(i)*toBuy];
    }

    const k = findMinCost(i, j);
    const tankOnArrivalAtK = minTank(i, k, x);
    const leftOpt = getOptimalHelper(i, k, x, tankOnArrivalAtK);
    if (leftOpt === null)
        return null;
    const rightOpt = getOptimalHelper(k, j, tankOnArrivalAtK, y);
    if (rightOpt === null)
        return null;
    const [ leftAmounts, leftCost] = leftOpt;
    const [ rightAmounts, rightCost] = rightOpt;
    return [leftAmounts.concat(rightAmounts), leftCost + rightCost];
}

// we arrive at fp_i with xl want to reach fp_j
const getOptimal = (i, j, x) => getOptimalHelper(i, j, x, minTank(i, j, x));

// overall optimal ans
// i.e start at s with tank full to capactity, need to reach d
// getOptimal(1, N+1, amount at fp1)
const overallOptimal = getOptimal(1, costs.length + 1, capacity - distances[0]/mileage);
if (overallOptimal === null)
    console.log('It is not possible to reach destination.');
else {
    const [ amounts, totalCost ] = overallOptimal;
    console.log("Total cost = Rs. " + totalCost);
    console.log("Amounts of petrol to be bought:\n" + amounts);
}
