# JavaScript Optimization

## Implementation 1: Naive Solution
To start, I took a close look at the problem statement and implemented a quick naive implementation. I find that doing this provides a good framework for optimizations since it makes spotting heavily unoptimized code that much easier. 

## Implementation 2: Mathematical!
The first target I spotted for optimization was [this `for` loop](https://github.com/hyperobject/kagi-challenge/blob/5237677dbac6643c95a5212db3362b0bf755ae7e/court/court.js#L50C1-L56C6). For loops tend to be a pretty good place to look for easy wins, and this was no exception. This loop runs in $O(n)$ time[^1], but after some quick back-of-envelope math[^2] I realized it could be replaced entirely with `Math.ceil((yourPosition + 1)/judges) * 30`, which runs in constant time.

[^1]: All time complexity in this writeup is in terms of the number of total people in line. Although the problem statement only specifies 5 total people in line, it was easier to think about and optimize the problem when generalized to n people in line.

[^2] See [here](https://github.com/hyperobject/kagi-challenge/blob/95ea02eaa6c477cd75f44da2e5bb81432cc927bb/court/court.js#L85C1-L94C62) for an explanation of this expression.

## Implementation 3: Out of Sorts
The next candidate for shortcutting was [this call to `Array.prototype.sort()`](https://github.com/hyperobject/kagi-challenge/blob/5237677dbac6643c95a5212db3362b0bf755ae7e/court/court.js#L46). Although the exact algorithm used for the `sort()` method is [implementation-dependent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), it seemed like a pretty safe assumption that the average case performance would be $O(n \log n)$[^3]. The problem states that hearings will happen in alphabetical order, so initially it seems like a sort would be required. However, a key insight into optimizing this code is that we don't actually care about the position of _anyone but the provided name_. Any names that are alphabetically after `yourName` don't have any bearing on how long the hearing takes, and the names that are before only matter in terms of how many batches the judges must go through before getting to you. If everyone in front of you suddenly decides to swap places with each other, the time it takes for you to get to the front of the line remains the same.

After realizing that shortcut, I was able to replace the $O(n \log n)$ average case sort with a guaranteed $O(n)$ [loop](https://github.com/hyperobject/kagi-challenge/blob/95ea02eaa6c477cd75f44da2e5bb81432cc927bb/court/court.js#L118C1-L125C6) that iterates through the list of other names once and counts how many people are in front of `yourName` in line. After that, we can use the same expression from implementation 2 to calculate the total time.

[^3]: My reasoning wasn't super precise here, mostly just recalling that most commonly used "good" sorting algorithms had O(n log n) average performance. Even if an implementation for `.sort()` had O(n) best-case performance, the shortcut in this section would still be more optimal.

## Implementation 4: Total Disarray

## Epilogue: Benchmarking



