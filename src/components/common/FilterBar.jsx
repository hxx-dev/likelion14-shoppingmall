import styled from "styled-components";

const GroupContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const FilterBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid ${({ $hasFilter }) => ($hasFilter ? "#111" : "#ddd")};
  background: ${({ $hasFilter }) => ($hasFilter ? "#111" : "#fff")};
  color: ${({ $hasFilter }) => ($hasFilter ? "#fff" : "#555")};
  font-size: 13px;
  font-family: Pretendard, sans-serif;
  font-weight: ${({ $hasFilter }) => ($hasFilter ? "600" : "400")};
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: #111;
    background: ${({ $hasFilter }) => ($hasFilter ? "#333" : "#f5f5f5")};
    color: ${({ $hasFilter }) => ($hasFilter ? "#fff" : "#111")};
  }
`;

export default function FilterGroup({
  onOpenGender,
  onOpenColor,
  onOpenSize,
  onOpenPrice,
  onOpenCategory,
  selectedFilters = {},
}) {
  const hasFilter = (key) => selectedFilters[key]?.length > 0;
  return (
    <GroupContainer>
      <FilterBtn $hasFilter={hasFilter("gender")} onClick={onOpenGender}>
        성별{hasFilter("gender") ? ` (${selectedFilters.gender.length})` : ""}
      </FilterBtn>
      <FilterBtn $hasFilter={hasFilter("color")} onClick={onOpenColor}>
        색상{hasFilter("color") ? ` (${selectedFilters.color.length})` : ""}
      </FilterBtn>
      <FilterBtn $hasFilter={hasFilter("size")} onClick={onOpenSize}>
        사이즈{hasFilter("size") ? ` (${selectedFilters.size.length})` : ""}
      </FilterBtn>
      <FilterBtn $hasFilter={hasFilter("price")} onClick={onOpenPrice}>
        가격대{hasFilter("price") ? ` (${selectedFilters.price.length})` : ""}
      </FilterBtn>
      <FilterBtn $hasFilter={hasFilter("category")} onClick={onOpenCategory}>
        종류
        {hasFilter("category") ? ` (${selectedFilters.category.length})` : ""}
      </FilterBtn>
    </GroupContainer>
  );
}
