const ProductCardGrid = ({ title, price, category, slug, image }: any) => (
  <div
    className="col-span-1 relative flex flex-col gap-2 border border-gray-300 p-2 rounded-md shadow"
    key={slug}
  >
    <div className="absolute top-3 left-3 bg-gray-200 px-2 py-1 text-sm rounded-sm">
      SOLD OUT
    </div>
    <div className="aspect-square w-full overflow-hidden">
      <img
        src={image}
        alt={`Product ${title} Image`}
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="flex flex-col items-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600 font-semibold mt-1">
        Rp. {Number(price).toLocaleString("id-ID")},-
      </p>
      <hr className="w-1/4 border-0.5 my-2" />
      <a
        href={`/shop/${category}/${slug}`}
        className="px-4 py-2 bg-dark-green text-gray-100 text-sm font-semibold rounded-md hover:bg-gray-600 hover:text-white transition-all duration-300"
      >
        Detail
      </a>
    </div>
  </div>
);

export default ProductCardGrid;
