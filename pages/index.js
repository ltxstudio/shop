// pages/index.js
import dbConnect from '../utils/dbConnect';
import Product from '../models/Product';
import ProductListing from '../components/ProductListing';

const Home = ({ products }) => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold">Welcome to My E-commerce Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductListing key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const products = await Product.find({});
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}

export default Home;
