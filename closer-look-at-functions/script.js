'use strict';

// ------------------- DEFAULT PARAMETERS ------------------------------

const bookings = []
const createBooking = function (flightNum, numPass = 1, price = 190 * numPass) {
    
    // Default parameters in ES5
    // numPass = numPass || 1;
    // price = price || 190;

    const booking = {
        flightNum,
        numPass,
        price
    }

    bookings.push(booking);
    console.log(bookings);
}

createBooking('LU247'); // {LU247, 1, 190}
createBooking('LU247', 7); // {LU247, 7, 1330}
createBooking('LU247', 7, 1200); // {LU247, 7, 1200}
// It is impossible to skip arguments.
createBooking('LU247', 1200); // {LU247, 1200, 228000}. To skip default parameters, we put undefined in place of the argument to skip as shown below:
createBooking('LU2451', undefined, 1000) // {LU2451, 1, 1000}