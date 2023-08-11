import "../../asset/css/SkeletonProduct.css";
const SkeletonProduct = () => {
  return (
    <div className="skeleton-product">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
    </div>
  );
};

export default SkeletonProduct;
