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

pos 0 => 30
*/


// naive implementation
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

const courtMath = (yourName, judges, otherNames) => {
    /*
        This solution should be a little faster since it
        eliminates the for loop in favor of some simple
        arithmetic
    */
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


// naive implementation
const courtNoSort = (yourName, judges, otherNames) => {
    /*
        This solution is neat because it eliminates both a
        call to .sort() (which is likely O(n log n)) and 
        array manipulation. The key insight here is that 
        we don't actually care about having the whole array
        sorted, just how many people are in front of us in line.
    */
    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    // O(n)
    const names = otherNames.split(' ');
    for (const name in names) {
        if (name > yourName) {
            yourPosition++;
        }
    }
    let yourPosition = 0;

    // not sure what the performance of ceil or division is
    return Math.ceil((yourPosition + 1)/judges) * 30; 
}