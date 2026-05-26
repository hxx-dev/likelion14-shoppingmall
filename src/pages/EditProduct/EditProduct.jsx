import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { updateItem } from "../../api/shop";
import ProductForm from "../../components/common/ProductForm";

const korToGender = { 남성: "male", 여성: "female", 남녀공용: "unisex" };

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct } = useContext(ProductContext);
  const product = getProduct(id);

  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    reviewNum: "",
    priceNum: "",
    size: [],
    category: "",
    gender: "",
    color: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        rating: product.rating || "",
        reviewNum: product.reviewNum || "",
        priceNum: product.priceNum || "",
        size: product.size || [],
        category: product.category || "",
        gender: product.gender || "",
        color: product.color || "",
      });
      setPreviewUrl(product.imageUrl || null);
    }
  }, [id]);

  if (!product)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "120px 0",
          fontFamily: "Pretendard",
          color: "#aaa",
        }}
      >
        상품을 찾을 수 없습니다.
      </div>
    );

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const handleSingleChip = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  const handleImageChange = (_, url) => setPreviewUrl(url);

  const handleSubmit = async () => {
    const type = product.type ?? "clothes";
    const gender = korToGender[formData.gender] ?? formData.gender;
    const priceNum = Number(formData.priceNum);

    const body = {
      image: previewUrl || product.imageUrl,
      name: formData.title,
      rating: Number(formData.rating) || 0,
      reviews: Number(formData.reviewNum) || 0,
      price: priceNum,
      soldout: false,
      color: formData.color,
      size: Array.isArray(formData.size)
        ? formData.size.join(", ")
        : formData.size,
      gender,
      type,
    };

    try {
      const originId = product.originId ?? id.split("-")[1] ?? id;
      await updateItem(type, originId, body);
      updateProduct(id, {
        ...formData,
        imageUrl: body.image,
        priceNum,
        price: `${priceNum.toLocaleString()}원`,
        rating: body.rating,
        reviewNum: body.reviews,
        review: `리뷰 ${body.reviews}`,
        type,
      });
      navigate(`/ProductDetail/${id}`);
    } catch {
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <ProductForm
      formData={formData}
      onChange={handleChange}
      onSingleChip={handleSingleChip}
      onImageChange={handleImageChange}
      previewUrl={previewUrl}
      submitLabel="상품 수정 완료"
      onSubmit={handleSubmit}
      isEdit={true}
    />
  );
}
