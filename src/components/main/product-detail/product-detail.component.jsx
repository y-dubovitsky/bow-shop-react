import styles from './product-detail.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  productByIdSelector,
  recommendationProductsSelector
} from '../../../redux/features/product/product.slice';
import { useParams, Link } from "react-router-dom";
import Button from '../../common/button/button.component';
import CartIcon from '../../common/cart-icon/cart-icon.component';
import { addProductToCart } from '../../../redux/features/cart/cart.slice';


const ProductDetail = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const productById = useSelector(state => productByIdSelector(state, parseInt(id, 10)));
  const recommendationProducts = useSelector(recommendationProductsSelector);
  const [productCount, setProductCount] = useState(0);

  //TODO Добавить настоящие рейтинг к продукту
  const showRating = () => {
    return new Array(5).fill(null).map(idx => <i className="fas fa-star"></i>)
  }

  //TODO Переработать метод с рекомендациями!
  const showRecommendationProducts = () => {
    return recommendationProducts.map(recProduct => {
      return <Link
        to={`/shop/${recProduct.category.name}/${recProduct.id}`}
        style={{
          backgroundImage: `url(data:image/png;base64,${recProduct.imageByte})`,
        }}>
      </Link>
    })
  }

  const productCountFormHandler = (event) => {
    const count = event.target.value;
    setProductCount(count);
  }

  return (
    <div className={styles.container}>
      <div className={styles.category}>{productById.category.name} {'>'} {productById.name}</div>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(data:image/png;base64,${productById.imageByte})`,
        }}>
      </div>
      <div className={styles.info}>
        <div className={styles.hr}></div>
        <div className={styles.price}>
          <p>{productById.price} р.</p>
        </div>
        <div className={styles.rating}>
          {showRating()}
        </div>
        <div className={styles.count}>
          <p>Product count: {productById.count}</p>
          <div
            className={styles.isAvailable}
            style={productById.count < 0 ? { backgroundColor: 'red' } : null}
          ></div>
        </div>
        <div className={styles.name}>
          <p>{productById.name}</p>
          <CartIcon product={productById} count={productCount} />
        </div>
        <div className={styles.description}>
          <p>{productById.description}</p>
        </div>
        <div className={styles.orderCount}>
          <label htmlFor="count">Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            name="count"
            onChange={productCountFormHandler}
            placeholder="1"
          />
        </div>
        <Button
          name="Add to cart"
          handler={{ onClick: () => dispatch(addProductToCart({ product: productById, count: productCount })) }}
        />
      </div>
      <div className={styles.recommendation}>
        <p>Recommended products:</p>
        <div className={styles.recProducts}>
          {showRecommendationProducts()}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;