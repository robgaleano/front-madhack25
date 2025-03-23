"use strict";
/**
 * Utility functions for base64 encoding/decoding
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.idToBase64Number = idToBase64Number;
/**
 * Converts a string ID to a base64 encoded number
 * @param id The string ID to convert
 * @returns A number representing the base64 encoded value
 */
function idToBase64Number(id) {
    // Convert string to base64
    var base64 = btoa(id);
    // Convert base64 to number using a simple hash function
    var hash = 0;
    for (var i = 0; i < base64.length; i++) {
        var char = base64.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}
