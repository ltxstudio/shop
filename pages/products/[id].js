// pages/products/[id].js
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';
import ProductPage from '../../components/ProductPage';

const ProductDetail = ({ product }) => {
  return <ProductPage product={product} />;
};

export async function getServerSideProps(context) {
  await dbConnect();
  const { id } = context.params;
  const product = await Product.findById(id);
  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default ProductDetail;
