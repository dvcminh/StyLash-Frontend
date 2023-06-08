import React from "react";

function ProductImage({ imageUrl }) {
  return (
    <div>
      <img src={imageUrl} alt="Product" />
    </div>
  );
}

export default ProductImage;
