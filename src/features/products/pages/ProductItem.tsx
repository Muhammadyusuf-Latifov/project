import { memo } from 'react';

const ProductItem = () => {
  return (
    <div className="ProductItem">
      <h2>ProductItem</h2>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Title
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Description
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Price
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Images
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Stock
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">
              Brand
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white hover:bg-green-50 transition-colors duration-300">
            <td className="px-6 py-4 border-b border-gray-200 rounded-l-lg font-semibold">
              Example Title
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              This is a description
            </td>
            <td className="px-6 py-4 border-b border-gray-200">$199</td>
            <td className="px-6 py-4 border-b border-gray-200">
              <img
                src="dd"
                alt="image"
                className="w-10 h-10 rounded-md inline-block mr-1"
              />
            </td>
            <td className="px-6 py-4 border-b border-gray-200">20</td>
            <td className="px-6 py-4 border-b border-gray-200 rounded-r-lg">
              BrandName
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
            <td className="px-6 py-4 border-b border-gray-200 rounded-l-lg font-semibold">
              Another Title
            </td>
            <td className="px-6 py-4 border-b border-gray-200">
              Another description
            </td>
            <td className="px-6 py-4 border-b border-gray-200">$299</td>
            <td className="px-6 py-4 border-b border-gray-200">
              <img
                src="dd"
                alt="image"
                className="w-10 h-10 rounded-md inline-block mr-1"
              />
            </td>
            <td className="px-6 py-4 border-b border-gray-200">15</td>
            <td className="px-6 py-4 border-b border-gray-200 rounded-r-lg">
              AnotherBrand
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default memo(ProductItem);