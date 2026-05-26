import { useState } from "react";
import styled from "styled-components";
import sorticonUrl from "../../assets/icons/icon.svg";

const SortWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  color: #6c6c6c;
  font-size: 14px;
  font-family: Pretendard, sans-serif;
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  padding: 8px;
  width: 120px;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #000;
  font-size: 14px;

  &:hover {
    background-color: #f4f4f4;
  }
`;

export default function SortOption() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SortWrapper>
      <SortButton onClick={() => setIsOpen(!isOpen)}>
        정렬순 <SortIcon src={sorticonUrl} alt="sort-arrow" />
      </SortButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => setIsOpen(false)}>
            기본 정렬순
          </DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>
            평점 높은순
          </DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>
            리뷰 많은순
          </DropdownItem>
        </DropdownMenu>
      )}
    </SortWrapper>
  );
}
