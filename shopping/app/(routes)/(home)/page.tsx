import CategoryList from "../_components/CategoryList";
import ProductList from "../_components/Product/ProductList";
import Slider from "../_components/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <div className="items-center justify-center flex flex-col">
        <CategoryList />
        <ProductList />
      </div>
    </>
  );
}
