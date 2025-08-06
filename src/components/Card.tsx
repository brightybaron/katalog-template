const ProductCard = () => {
  return (
    <div className="col-span-1 flex flex-col gap-2 border border-gray-300 p-2 rounded-md shadow">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src="/images/sofa-1.jpg"
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-semibold">Product Name</h3>
        <p className="text-gray-600 font-semibold mt-1">Rp. 1.000.000</p>
        <hr className="w-1/2 border-1 my-2" />
        <a
          href="/shop"
          className="px-4 py-2 bg-dark-green text-gray-100 text-sm font-semibold rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300"
        >
          Description
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
