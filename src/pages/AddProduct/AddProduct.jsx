import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { createItem } from "../../api/shop";
import ProductForm from "../../components/common/ProductForm";

const INITIAL = {
  title: "",
  rating: "",
  reviewNum: "",
  priceNum: "",
  size: [],
  category: "",
  gender: "",
  color: "",
};

// 한글 → 서버값 변환
const korToType = { 의류: "clothes", 신발: "shoes" };
const korToGender = { 남성: "male", 여성: "female", 남녀공용: "unisex" };

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);
  const [formData, setFormData] = useState(INITIAL);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const handleSingleChip = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  const handleImageChange = (_, url) => setPreviewUrl(url);

  const handleSubmit = async () => {
    if (!formData.title || !formData.priceNum) {
      alert("상품명과 가격은 필수입니다.");
      return;
    }

    const type = korToType[formData.category] ?? "clothes";
    const gender = korToGender[formData.gender] ?? formData.gender;
    const priceNum = Number(formData.priceNum);

    const body = {
      image: previewUrl || "",
      name: formData.title,
      rating: Number(formData.rating) || 0,
      reviews: Number(formData.reviewNum) || 0,
      price: priceNum,
      soldout: false,
      color: formData.color,
      size: formData.size.join(", "),
      gender,
      type,
    };

    try {
      const created = await createItem(type, body);
      addProduct({
        productId: created.id ?? created.productId,
        imageUrl: body.image,
        title: body.name,
        priceNum,
        price: `${priceNum.toLocaleString()}원`,
        reviewNum: body.reviews,
        review: `리뷰 ${body.reviews}`,
        rating: body.rating,
        gender: formData.gender,
        color: body.color,
        size: formData.size,
        category: formData.category,
        type,
      });
      navigate("/");
    } catch (e) {
      console.error(
        "등록 실패 상세:",
        e.message,
        e.response?.status,
        e.response?.data,
      );
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <ProductForm
      formData={formData}
      onChange={handleChange}
      onSingleChip={handleSingleChip}
      onImageChange={handleImageChange}
      previewUrl={previewUrl}
      submitLabel="상품 등록 완료"
      onSubmit={handleSubmit}
      isEdit={false}
    />
  );
}
