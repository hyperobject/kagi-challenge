/*
You are at the court for a traffic ticket
and there are 4 other people with you.
You are told that everyone’s hearing
is in alphabetical order and it takes
30 minutes for each hearing.
All of the judges are free now and
can see one person at a time.
How long will it take for your hearing to end?

Your inputs are:

string - your name
int - number of judges
string - names of four other people separated by space

Example:
court(“Jules", 3, "Adam Betty Frank Mike”)
60

court(“Zane", 1, “Mark Hank Ana Vivian”)
150
*/


/**
 * Naive implementation
 * @param {string} yourName 
 * @param {number} judges 
 * @param {string} otherNames 
 * @returns {number}
 */
const courtNaive = (yourName, judges, otherNames) => {
    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    let names = otherNames.split(' ');
    names.push(yourName); // faster or slower than string concat then sort?

    /*
        probably O(n log n) average case for Array.prototype.sort()
        does the string *need* to be split to an array?
    */
    names.sort();
    const yourPosition = names.indexOf(yourName);
    
    // O(n)
    let iterations = 0;
    for (let nameIndex = 0; nameIndex < names.length; nameIndex += judges) {
        iterations++;
        if (nameIndex >= yourPosition) {
            return iterations * 30;
        }
    }
}

/**
 * Faster solution that eliminates the
 * for loop in favor of some simple arithmetic
 * @param {string} yourName 
 * @param {number} judges 
 * @param {string} otherNames 
 * @returns {number}
 */
const courtMath = (yourName, judges, otherNames) => {

    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    let names = otherNames.split(' ');
    names.push(yourName); // faster or slower than string concat then sort?
    names.sort(); // what's the performance of this sort? 
    /*
    probably O(n log n) average case for Array.prototype.sort()
    does the string *need* to be split to an array?
    */
    const yourPosition = names.indexOf(yourName);

    // not sure what the performance of ceil or division is
    return Math.ceil((yourPosition + 1)/judges) * 30; 
}


/**
 * Solution that eliminates both a call to .sort()
 * (which is likely O(n log n)) and all array manipulation
 * aside from an initial string split.
 * @param {string} yourName 
 * @param {number} judges 
 * @param {string} otherNames 
 * @returns {number}
 */
const courtNoSort = (yourName, judges, otherNames) => {
    /*
        The key insight here is that we don't actually
        care about having the whole array sorted,
        just how many people are in front of us in line.
    */
    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    // O(n)
    const names = otherNames.split(' ');
    let yourPosition = 0;
    for (const name of names) {
        if (name < yourName) {
            yourPosition++;
        }
    }

    // not sure what the performance of ceil or division is
    return Math.ceil((yourPosition + 1)/judges) * 30; 
}


/**
 * Solution that attempts to eliminate the use of arrays
 * by replicating the behavior of String.split() with
 * problem-relevant short-circuiting behavior
 * @param {string} yourName 
 * @param {number} judges 
 * @param {string} otherNames 
 * @returns {number}
 */
const courtNoArray = (yourName, judges, otherNames) => {

    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    /*
        This implementation is still O(n) but should be
        slightly better optimized than courtNoSort since
        the client doesn't need to iterate through otherNames
        twice (once for .split() and again for the actual
        line place logic).

        It's also more space-efficient since we aren't allocating
        an array for the split otherNames.
    */
    let yourPosition = 0;
    let adjustedPosition = false;
    let wordIndex = 0;
    for (const letter of otherNames) {
        if (letter === ' ') {
            isNewWord = true;
            adjustedPosition = false;
            wordIndex = 0;
            continue;
        }

        if (adjustedPosition) {
            /*
                this is basically just fast-forwarding
                until the next word since we've already
                established relative position. No need
                to change wordIndex or anything
            */
            continue;
        }

        if (letter < yourName[wordIndex]) {
            /*
                If the current letter is first alphabetically,
                bump yourPosition in line down by one, and mark
                that we have already adjusted the position
            */
            yourPosition++;
            adjustedPosition = true;
            continue;
        }

        if (letter > yourName[wordIndex]) {
            /*
                If the current letter is later alphabetically,
                yourName will come up in line first, so we don't
                need to adjust our position at all
            */
            adjustedPosition = true;
            continue;
        }

        // this fallthrough only happens when we have a matching letter
        wordIndex++;
        
    }

    // not sure what the performance of ceil or division is
    return Math.ceil((yourPosition + 1)/judges) * 30; 
}