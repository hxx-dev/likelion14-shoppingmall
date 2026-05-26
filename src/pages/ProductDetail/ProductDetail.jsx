import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../../context/ProductContext";
import { getItemById, deleteItem } from "../../api/shop";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 80px;
  font-family: Pretendard, sans-serif;
`;
const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
`;
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 140px;
`;
const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #e0e0e0;
  flex-shrink: 0;
`;
const InfoSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 60px;
`;
const ImageBox = styled.div`
  width: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 12px;
`;
const Price = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #111;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.5;
`;
const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Star = styled.span`
  font-size: 20px;
  color: black;
`;
const RatingNum = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #111;
`;
const ReviewText = styled.span`
  font-size: 13px;
  color: #888;
`;
const NotFound = styled.div`
  text-align: center;
  padding: 120px 0;
  font-size: 20px;
  color: #aaa;
  font-family: Pretendard, sans-serif;
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;
const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 36px 40px;
  width: 360px;
  text-align: center;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  font-family: Pretendard, sans-serif;
`;
const ModalTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #111;
  margin: 0 0 8px;
`;
const ModalDesc = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 28px;
`;
const ModalBtnRow = styled.div`
  display: flex;
  gap: 12px;
`;
const ModalBtn = styled.button`
  flex: 1;
  padding: 13px 0;
  border-radius: 10px;
  font-size: 14px;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  cursor: pointer;
  border: none;
`;
const ConfirmBtn = styled(ModalBtn)`
  background: #f2f2f2;
  color: #333;
`;
const CancelBtn = styled(ModalBtn)`
  background: #d0d0d0;
  color: #333;
`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, deleteProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 헤더 삭제 버튼 이벤트 수신
  useEffect(() => {
    const handler = () => setShowDeleteModal(true);
    window.addEventListener("openDeleteModal", handler);
    return () => window.removeEventListener("openDeleteModal", handler);
  }, []);

  // 상품 데이터 불러오기
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // 1. Context에서 먼저 찾기 (type 정보 필요)
      const cached = getProduct(id);
      if (cached) {
        setProduct(cached);
        setLoading(false);
        return;
      }

      // 2. 없으면 API로 clothes → shoes 순서로 시도
      try {
        const [type, originId] = id.includes("-")
          ? id.split("-")
          : ["clothes", id];
        const item = await getItemById(type, originId);
        setProduct({
          productId: id,
          imageUrl: item.image,
          title: item.name,
          price: `${Number(item.price).toLocaleString()}원`,
          rating: item.rating,
          review: `리뷰 ${item.reviews}`,
          type: item.type,
          originId: item.id,
        });
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    try {
      const type = product?.type ?? "clothes";
      const originId = product?.originId ?? id.split("-")[1] ?? id;
      await deleteItem(type, originId);
      deleteProduct(id);
      navigate("/");
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) return null;
  if (!product) return <NotFound>상품을 찾을 수 없습니다.</NotFound>;

  return (
    <Wrapper>
      <Layout>
        <ImageSection>
          <ImageBox>
            <ProductImage src={product.imageUrl} alt={product.title} />
          </ImageBox>
        </ImageSection>

        <Divider />

        <InfoSection>
          <InfoBox>
            <Price>{product.price}</Price>
            <Title>{product.title}</Title>
            <RatingRow>
              <Star>★</Star>
              <RatingNum>{product.rating?.toFixed(1)}</RatingNum>
              <ReviewText>{product.review}</ReviewText>
            </RatingRow>
          </InfoBox>
        </InfoSection>
      </Layout>

      {showDeleteModal && (
        <Overlay onClick={() => setShowDeleteModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>상품 삭제</ModalTitle>
            <ModalDesc>상품을 삭제하시겠습니까?</ModalDesc>
            <ModalBtnRow>
              <ConfirmBtn onClick={handleDelete}>확인</ConfirmBtn>
              <CancelBtn onClick={() => setShowDeleteModal(false)}>
                취소
              </CancelBtn>
            </ModalBtnRow>
          </ModalBox>
        </Overlay>
      )}
    </Wrapper>
  );
}
