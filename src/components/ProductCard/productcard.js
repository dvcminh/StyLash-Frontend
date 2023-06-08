import React from 'react';
import { Link } from 'react-router-dom';

import './productcard.css';

const ProductCard = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
            products.map((product) => {
              return (
                <Link key={product.id} to={`/api/products/${product.id}`} className="lg:w-[23%] md:w-1/2 p-4 w-full mb-4 cursor-pointer rounded-lg shadow ml-4 contain">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="picture" className=" object-contain object-center w-full h-full block" src={product.image_url} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-xs tracking-widest title-font mb-1 uppercase category">{product.category.name}</h3>
                    <h2 className="title-font text-lg font-medium title">{product.name}</h2>
                    <p className="mt-1 text-md font-semibold price">${product.price}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default ProductCard