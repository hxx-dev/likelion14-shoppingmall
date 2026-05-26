import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const ImageBox = styled.img.attrs({
  referrerPolicy: "no-referrer",
})`
  width: 181px;
  height: 237px;
  object-fit: cover;
`;

const Title = styled.p`
  color: #333;
  align-self: stretch;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Price = styled.p`
  color: #000;
  align-self: stretch;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Review = styled.p`
  align-self: stretch;
  color: #a7a7a7;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default function ProductCard({
  productId,
  imageUrl,
  title,
  price,
  review,
}) {
  const navigate = useNavigate();
  return (
    <CardContainer onClick={() => navigate(`/ProductDetail/${productId}`)}>
      <ImageBox src={imageUrl} referrerPolicy="no-referrer" alt={title} />
      <Title>{title}</Title>
      <Price>{price}</Price>
      <Review>{review}</Review>
    </CardContainer>
  );
}
