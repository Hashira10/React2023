/**
 * @return {number}
 */
var argumentsLength = function(...args) {
    let arr=[...args]
    let len=arr.length;
    return len
};

/**
 * argumentsLength(1, 2, 3); // 3
 */