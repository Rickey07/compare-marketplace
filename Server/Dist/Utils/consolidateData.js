"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consolidatedData = void 0;
const string_similarity_js_1 = __importDefault(require("string-similarity-js"));
// Function to compare the product names
function compareProductNames(amazonName, flipkartName) {
    const similarityScore = (0, string_similarity_js_1.default)(amazonName, flipkartName);
    // Adjust the similarity threshold as per your needs
    return similarityScore >= 0.4; // Consider a match if similarity is 40% or higher
}
const consolidatedData = (amazonData, flipKartData) => {
    const comparisonData = [];
    amazonData.forEach((amazonItem) => {
        const comparisonItem = {
            name: amazonItem.name,
            amz_price: amazonItem.price,
            flip_price: "",
            amz_rating: amazonItem.rating,
            flip_rating: "",
            amz_link: amazonItem.link,
            flip_link: "",
            flip_image: "",
            amz_image: amazonItem.image,
        };
        const matchingItems = flipKartData.filter((flipItem) => compareProductNames(amazonItem.name, flipItem.name));
        if (matchingItems.length > 0) {
            // Find the best matching item based on similarity score
            const bestMatch = matchingItems.reduce((best, current) => {
                const currentScore = (0, string_similarity_js_1.default)(amazonItem.name, current.name);
                return currentScore > best.score
                    ? { item: current, score: currentScore }
                    : best;
            }, { item: null, score: 0 });
            const matchedItem = bestMatch.item;
            comparisonItem.flip_price = matchedItem.price;
            comparisonItem.flip_rating = matchedItem.rating;
            comparisonItem.flip_link = matchedItem.link;
            comparisonItem.flip_image = matchedItem.image;
        }
        comparisonData.push(comparisonItem);
    });
    return comparisonData;
};
exports.consolidatedData = consolidatedData;
