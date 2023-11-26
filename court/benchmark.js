/**
 * @type {[yourName: string, judges: number, otherNames: string][]}
 */

const setup = async () => {
    /*
        test_cases.json contains 10k cases that match the problem description
        test_cases_50.json contains 5k cases with 50 other people instead of 4
        test_cases_100.json contains 5k cases with 100 other people instead of 4

        these extra cases are provided to demonstrate the performance of
        each individual implementation as the number of people grows
    */
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

const runTests = async () => {
    let req = await fetch('test_cases.json')
    let json = await req.json();
    let tests = json.cases;

    document.querySelector(".test-basic .naive-results").innerText = `Implementation 1: ${benchmark(courtNaive, tests)} ms/iteration`;
    document.querySelector(".test-basic .math-results").innerText = `Implementation 2: ${benchmark(courtMath, tests)} ms/iteration`;
    document.querySelector(".test-basic .no-sort-results").innerText = `Implementation 3: ${benchmark(courtNoSort, tests)} ms/iteration`;
    document.querySelector(".test-basic .no-array-results").innerText = `Implementation 4: ${benchmark(courtNoArray, tests)} ms/iteration`;

    req = await fetch('test_cases_50.json')
    json = await req.json();
    tests = json.cases;

    document.querySelector(".test-50 .naive-results").innerText = `Implementation 1: ${benchmark(courtNaive, tests)} ms/iteration`;
    document.querySelector(".test-50 .math-results").innerText = `Implementation 2: ${benchmark(courtMath, tests)} ms/iteration`;
    document.querySelector(".test-50 .no-sort-results").innerText = `Implementation 3: ${benchmark(courtNoSort, tests)} ms/iteration`;
    document.querySelector(".test-50 .no-array-results").innerText = `Implementation 4: ${benchmark(courtNoArray, tests)} ms/iteration`;

    req = await fetch('test_cases_100.json')
    json = await req.json();
    tests = json.cases;

    document.querySelector(".test-100 .naive-results").innerText = `Implementation 1: ${benchmark(courtNaive, tests)} ms/iteration`;
    document.querySelector(".test-100 .math-results").innerText = `Implementation 2: ${benchmark(courtMath, tests)} ms/iteration`;
    document.querySelector(".test-100 .no-sort-results").innerText = `Implementation 3: ${benchmark(courtNoSort, tests)} ms/iteration`;
    document.querySelector(".test-100 .no-array-results").innerText = `Implementation 4: ${benchmark(courtNoArray, tests)} ms/iteration`;

}

