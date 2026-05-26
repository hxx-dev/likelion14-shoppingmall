import { useEffect, useState, useMemo, useContext } from "react";
import styled from "styled-components";
import FilterGroup from "../components/common/FilterBar";
import SortOption from "../components/common/SortOption";
import ProductList from "../components/common/ProductList";
import FilterModal from "../components/common/FilterModal";
import { ProductContext } from "../context/ProductContext";
import { getItems } from "../api/shop";

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 160px;
  margin-top: 20px;
`;

const FilterData = {
  gender: { title: "성별", options: [["남성", "여성", "남녀공용"]] },
  color: {
    title: "색상",
    options: [
      ["red", "pink", "blue"],
      ["black", "gray", "denim"],
      ["rainbow", "multi", "holographic"],
    ],
  },
  size: {
    title: "사이즈",
    options: [
      ["9", "10"],
      ["S", "M", "L", "XL"],
    ],
  },
  price: { title: "가격대", options: [["0~30", "31~60", "61~90", "91~"]] },
  category: { title: "종류", options: [["의류", "신발"]] },
};

// 서버 type값 ↔ 한글 변환
const typeToKor = { clothes: "의류", shoes: "신발" };
const genderToKor = { male: "남성", female: "여성", unisex: "남녀공용" };

function matchesPrice(priceNum, selectedPrices) {
  if (selectedPrices.length === 0) return true;
  return selectedPrices.some((range) => {
    if (range === "0~30") return priceNum >= 0 && priceNum <= 30;
    if (range === "31~60") return priceNum >= 31 && priceNum <= 60;
    if (range === "61~90") return priceNum >= 61 && priceNum <= 90;
    if (range === "91~") return priceNum > 90;
    return false;
  });
}

export default function Main() {
  const { products, setProducts } = useContext(ProductContext);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    color: [],
    size: [],
    price: [],
    category: [],
  });

  // API에서 clothes, shoes 모두 불러와서 합치기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [clothes, shoes] = await Promise.all([
          getItems("clothes"),
          getItems("shoes"),
        ]);
        const all = [
          ...clothes.map((item) => ({ ...item, _type: "clothes" })),
          ...shoes.map((item) => ({ ...item, _type: "shoes" })),
        ].map((item) => ({
          productId: `${item._type}-${item.id}`, // ← 중복 key 방지
          imageUrl: item.image,
          title: item.name,
          priceNum: item.price,
          price: `${Number(item.price).toLocaleString()}원`,
          reviewNum: item.reviews,
          review: `리뷰 ${item.reviews}`,
          rating: item.rating,
          gender: genderToKor[item.gender] ?? item.gender,
          color: item.color,
          size: Array.isArray(item.size) ? item.size : [item.size],
          category: typeToKor[item.type] ?? item.type,
          type: item.type,
          originId: item.id, // API 호출 시 실제 숫자 id 필요하므로 보관
        }));
        setProducts(all);
      } catch (e) {
        console.error(
          "데이터 로드 실패 상세:",
          e.message,
          e.response?.status,
          e.response?.data,
        );
      }
    };
    fetchProducts();
  }, []);

  const toggleFilter = (filterKey, option) => {
    setSelectedFilters((prev) => {
      const cur = prev[filterKey];
      return {
        ...prev,
        [filterKey]: cur.includes(option)
          ? cur.filter((o) => o !== option)
          : [...cur, option],
      };
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        selectedFilters.gender.length > 0 &&
        !selectedFilters.gender.includes(p.gender)
      )
        return false;
      if (
        selectedFilters.color.length > 0 &&
        !selectedFilters.color.includes(p.color)
      )
        return false;
      if (
        selectedFilters.size.length > 0 &&
        !selectedFilters.size.some((s) => p.size?.includes(s))
      )
        return false;
      if (
        selectedFilters.price.length > 0 &&
        !matchesPrice(p.priceNum, selectedFilters.price)
      )
        return false;
      if (
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.includes(p.category)
      )
        return false;
      return true;
    });
  }, [products, selectedFilters]);

  return (
    <div>
      <TopSection>
        <FilterGroup
          onOpenGender={() => setActiveModal("gender")}
          onOpenColor={() => setActiveModal("color")}
          onOpenSize={() => setActiveModal("size")}
          onOpenPrice={() => setActiveModal("price")}
          onOpenCategory={() => setActiveModal("category")}
          selectedFilters={selectedFilters}
        />
        <SortOption />
      </TopSection>

      <ProductList products={filteredProducts} />

      {activeModal && FilterData[activeModal] && (
        <FilterModal
          title={FilterData[activeModal].title}
          options={FilterData[activeModal].options}
          selected={selectedFilters[activeModal]}
          onToggle={(val) => toggleFilter(activeModal, val)}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
