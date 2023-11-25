/**
 * @type {[yourName: string, judges: number, otherNames: string][]}
 */
window.testCases = [];
window.numCases = 0;
window.loaded = false;

const setup = async () => {
    const req = await fetch('test_cases.json')
    const json = await req.json();
    window.testCases = json.cases;
    window.numCases = window.testCases.length;
    window.loaded = true;
}

/**
 * Wrapper for running an implementation against our test cases
 * @param {(yourName: string, judges: number, otherNames: string) => number} implementation 
 * @param {[yourName: string, judges: number, otherNames: string][]} tests
 */
const benchmark = (implementation, tests) => {
    for (const test of tests) {
        implementation(...test);
    }
}

const runTests = () => {
    if (!window.loaded) {
        console.error('not loaded yet!');
        return;
    }
    performance.mark('naive-start');
    benchmark(courtNaive, window.testCases);
    performance.mark('naive-end');

    performance.mark('math-start');
    benchmark(courtMath, window.testCases);
    performance.mark('math-end');

    performance.mark('no-sort-start');
    benchmark(courtNoSort, window.testCases);
    performance.mark('no-sort-end');

    const naivePerf = performance.measure('naive', 'naive-start', 'naive-end');
    const mathPerf = performance.measure('math', 'math-start', 'math-end');
    const noSortPerf = performance.measure('no-sort', 'no-sort-start', 'no-sort-end');
    console.log('naive', naivePerf.duration/window.numCases);
    console.log('math', mathPerf.duration/window.numCases);
    console.log('noSort', noSortPerf.duration/window.numCases);
}

