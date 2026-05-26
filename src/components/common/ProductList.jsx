import styled from "styled-components";
import ProductCard from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 20px 160px 60px;
`;

const EmptyMsg = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 0;
  color: #aaa;
  font-size: 15px;
  font-family: Pretendard, sans-serif;
`;

export default function ProductList({ products = [] }) {
  return (
    <Grid>
      {products.length === 0 ? (
        <EmptyMsg>조건에 맞는 상품이 없습니다.</EmptyMsg>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.productId}
            productId={product.productId}
            imageUrl={product.imageUrl} // ← imageUrl로 수정
            title={product.title}
            price={product.price}
            review={product.review}
          />
        ))
      )}
    </Grid>
  );
}
