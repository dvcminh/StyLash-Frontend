import React from 'react';
import { Link } from 'react-router-dom';

import { Crown } from 'phosphor-react';

const TopProductCard = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col items-center -m-4">
          {
            products.map((product, index) => {
              return (
                <Link key={product.id} to={`/api/products/${product.id}`} className="lg:w-[23%] md:w-1/2 p-4 w-full mb-4 cursor-pointer rounded-lg shadow ml-4 contain hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-300">
                <div className="flex flex-col items-center m-4">
                  {index === 0 && <Crown size={60} weight="fill" color="#FFD700" />}
                  {index === 0 && <p className="text-xs text-gray-500">Best Seller</p>}
                  {index === 1 && <Crown size={40} weight="fill" color="#C0C0C0" />}
                  {index === 1 && <p className="text-xs text-gray-500">2nd Best Seller</p>}
                  {index === 2 && <Crown size={32} weight="fill" color="#cd7f32" />}
                  {index === 2 && <p className="text-xs text-gray-500">3rd Best Seller</p>}

                  {index === 3 && <Crown size={24} weight="fill" color="#cd7f32" />}
                  {index === 3 && <p className="text-xs text-gray-500">4th Best Seller</p>}

                  {index === 4 && <Crown size={16} weight="fill" color="#cd7f32" />}
                  {index === 4 && <p className="text-xs text-gray-500">5th Best Seller</p>}
                </div>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="picture" className=" object-contain object-center w-full h-full block" src={product.image_url} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-xs tracking-widest title-font mb-1 uppercase category">{product.category.name}</h3>
                    <h2 className="title-font text-lg font-medium name">{product.name}</h2>
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

export default TopProductCard
