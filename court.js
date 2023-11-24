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
const court = (yourName, judges, otherNames) => {
    if (judges >= 5) {
        // there are enough judges for everyone
        return 30;
    }

    names = otherNames.split(' ');
    names.push(yourName); // faster or slower than string concat then sort?
    names.sort(); // what's the performance of this sort?
    const yourPosition = names.indexOf(yourName);
    return Math.ceil((yourPosition + 1)/judges) * 30; // not sure what the performance of ceil or division is
}