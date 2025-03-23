/**
 * Utility functions for base64 encoding/decoding
 */

/**
 * Converts a string ID to a base64 encoded number
 * @param id The string ID to convert
 * @returns A number representing the base64 encoded value
 */
export function idToBase64Number(id: string): number {
    // Convert string to base64
    const base64 = btoa(id);
    // Convert base64 to number using a simple hash function
    let hash = 0;
    for (let i = 0; i < base64.length; i++) {
        const char = base64.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
} 