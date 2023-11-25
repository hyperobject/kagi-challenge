/**
 * @type {[yourName: string, judges: number, otherNames: string][]}
 */
window.testCases = [];
window.numCases = 0;
window.loaded = false;

const setup = async () => {
    /*
        test_cases.json contains 10k cases that match the problem description
        test_cases_50.json contains 5k cases with 50 other people instead of 4
        test_cases_100.json contains 5k cases with 100 other people instead of 4

        these extra cases are provided to demonstrate the performance of
        each individual implementation as the number of people grows
    */
    const req = await fetch('test_cases_100.json')
    const json = await req.json();
    window.testCases = json.cases;
    window.numCases = window.testCases.length;
    window.loaded = true;
}

/**
 * Wrapper for running an implementation against our test cases
 * @param {(yourName: string, judges: number, otherNames: string) => number} implementation 
 * @param {[yourName: string, judges: number, otherNames: string][]} tests
 * @returns {number}
 */
const benchmark = (implementation, tests) => {
    performance.mark('impl-start');
    for (const test of tests) {
        implementation(...test);
    }
    performance.mark('impl-end');
    return performance.measure('impl', 'impl-start', 'impl-end').duration/tests.length;
}

const runTests = () => {
    if (!window.loaded) {
        console.error('not loaded yet!');
        return;
    }
    
    document.getElementById("naive-results").innerText = `Implementation 1: ${benchmark(courtNaive, window.testCases)} ms/iteration`
    document.getElementById("math-results").innerText = `Implementation 2: ${benchmark(courtMath, window.testCases)} ms/iteration`
    document.getElementById("no-sort-results").innerText = `Implementation 3: ${benchmark(courtNoSort, window.testCases)} ms/iteration`

}

