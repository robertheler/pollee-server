// Fetches url of selected image
const fetchImageLocation = imageFileName => {
  //jpg
  let url = `https://adidasproducts.s3-us-west-1.amazonaws.com/images/${imageFileName}`;

  // remove jpg extension and add webp
  url = url.slice(0, -3) + "webp";
  return url;
};

export default fetchImageLocation;
