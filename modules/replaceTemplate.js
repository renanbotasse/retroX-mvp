module.exports = (temp, product) => {
  let output = temp.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%GAMENAME%}/g, product.productName);
  output = output.replace(/{%IMG1%}/g, product.image1);
  output = output.replace(/{%IMG2%}/g, product.image2);
  output = output.replace(/{%IMG3%}/g, product.image3);
  output = output.replace(/{%PLATFORM%}/g, product.platform);
  output = output.replace(/{%GENRE%}/g, product.genre);
  output = output.replace(/{%YEAR%}/g, product.year);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};
