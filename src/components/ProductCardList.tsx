const ProductCardList = ({
  title,
  description,
  price,
  category,
  slug,
  image,
}: any) => (
  <div
    className="relative flex flex-wrap items-start lg:items-center w-full border border-gray-300 justify-between rounded-md p-2 gap-3 sm:gap-4 shadow 2xl:even:mt-4"
    key={slug}
  >
    <div className="absolute top-3 left-3 bg-gray-200 px-2 py-1 text-sm rounded-sm">
      SOLD OUT
    </div>
    <div className="w-1/3 md:w-1/4 lg:w-1/8 2xl:w-44">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={`Product ${title} Image`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
    <div className="flex-1 flex flex-col lg:flex-row justify-between gap-x-2">
      <div className="lg:w-3/4 2xl:w-3/4 w-full space-y-2 sm:space-y-4">
        <p className="font-semibold text-lg sm:text-2xl">{title}</p>
        <p className="text-gray-600 text-sm sm:text-base hidden md:block">
          {description}
        </p>
      </div>
      <div className="lg:w-1/4 2xl:w-1/4 w-full text-center space-y-0.5 sm:space-y-2 lg:border-l-2 border-l-gray-300">
        <p className="text-gray-600 font-semibold text-lg">
          Rp. {Number(price).toLocaleString("id-ID")},-
        </p>
        <div className="lg:px-2">
          <a
            href={`/shop/${category}/${slug}`}
            className="block px-3 py-2 bg-dark-green text-gray-100 text-sm font-semibold rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCardList;
