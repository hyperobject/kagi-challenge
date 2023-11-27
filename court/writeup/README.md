# JavaScript Optimization

## Implementation 1: Naive solution
To start, I took a close look at the problem statement and implemented a quick naive implementation. I find that doing this provides a good framework for optimizations since it makes spotting heavily unoptimized code that much easier. 

## Implementation 2: Mathematical!
The first target I spotted for optimization was [this `for` loop](https://github.com/hyperobject/kagi-challenge/blob/5237677dbac6643c95a5212db3362b0bf755ae7e/court/court.js#L50C1-L56C6). For loops tend to be a pretty good place to look for easy wins, and this was no exception. This loop runs in $$O(n)$$ time[^1], but after some quick back-of-envelope math I realized it could be replaced entirely with `Math.ceil((yourPosition + 1)/judges) * 30`, which runs in constant time.

[^1]: All time complexity in this writeup is in terms of the number of total people in line. Although the problem statement only specifies 5 total people in line, it was easier to think about and optimize the problem when generalized to $n$ people in line.

## Implementation 3: Out of sorts
The next candidate for shortcutting was [this call to `Array.prototype.sort()`](https://github.com/hyperobject/kagi-challenge/blob/5237677dbac6643c95a5212db3362b0bf755ae7e/court/court.js#L46). Although the exact algorithm used for the `sort()` method is [implementation-dependent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), it seemed like a pretty safe assumption that the average case performance would be $$O(n \log n)$$[^2].

[^2]: My reasoning wasn't super precise here, mostly just recalling that most commonly used "good" sorting algorithms had $$O(n \log n)$$ average performance. Even if an implementation for `.sort()` had $$O(n)$$ best-case performance, the shortcut in this section would still be more optimal.



