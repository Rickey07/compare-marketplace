import similarity from "string-similarity-js";

// Each Object Response after consolidating the data
interface consolidateProduct {
  name: string;
  amz_price: string;
  flip_price?: string;
  amz_rating?: string;
  flip_rating?: string;
  amz_link?: string;
  flip_link?: string;
  flip_image?: string;
  amz_image?: string;
}

// Each Object Response after scraping the data
interface responseObjectProduct {
  id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
  link: string;
}

// Function to compare the product names
function compareProductNames(
  amazonName: string,
  flipkartName: string
): boolean {
  const similarityScore = similarity(amazonName, flipkartName);
  // Adjust the similarity threshold as per your needs
  return similarityScore >= 0.4; // Consider a match if similarity is 40% or higher
}

const consolidatedData = (
  amazonData: any,
  flipKartData: any
): Array<consolidateProduct> => {
  const comparisonData: Array<consolidateProduct> = [];
  amazonData.forEach((amazonItem: responseObjectProduct) => {
    const comparisonItem: consolidateProduct = {
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

    const matchingItems = flipKartData.filter(
      (flipItem: responseObjectProduct) =>
        compareProductNames(amazonItem.name, flipItem.name)
    );

    if (matchingItems.length > 0) {
      // Find the best matching item based on similarity score
      const bestMatch = matchingItems.reduce(
        (best:any, current: any) => {
          const currentScore = similarity(amazonItem.name, current.name);
          return currentScore > best.score
            ? { item: current, score: currentScore }
            : best;
        },
        { item: null, score: 0 }
      );

      const matchedItem: any = bestMatch.item;
      comparisonItem.flip_price = matchedItem.price;
      comparisonItem.flip_rating = matchedItem.rating;
      comparisonItem.flip_link = matchedItem.link;
      comparisonItem.flip_image = matchedItem.image;
    }

    comparisonData.push(comparisonItem);
  });

  return comparisonData;
};

export { consolidatedData };
