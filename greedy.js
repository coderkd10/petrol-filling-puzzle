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
