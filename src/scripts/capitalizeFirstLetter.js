function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return string; // Return the original string if it's empty or not a string
    }

    return string
        .split(' ') // Split the string into words by spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back together with spaces
}
export default capitalizeFirstLetter;