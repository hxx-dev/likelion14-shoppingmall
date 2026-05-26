import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px 36px;
  min-width: 360px;
  max-width: 480px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  font-family: Pretendard, sans-serif;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin: 0;
`;
const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #888;
  padding: 0;
  &:hover {
    color: #111;
  }
`;
const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;
const OptionBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid ${({ $selected }) => ($selected ? "#111" : "#ddd")};
  background: ${({ $selected }) => ($selected ? "#111" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#555")};
  font-size: 13px;
  font-family: Pretendard, sans-serif;
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: #111;
  }
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 12px 0;
`;

export default function FilterModal({
  title,
  options,
  selected = [],
  onToggle,
  onClose,
}) {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </ModalHeader>
        {options.map((group, gi) => (
          <div key={gi}>
            <OptionGroup>
              {group.map((opt) => (
                <OptionBtn
                  key={opt}
                  $selected={selected.includes(opt)}
                  onClick={() => onToggle(opt)}
                >
                  {opt}
                </OptionBtn>
              ))}
            </OptionGroup>
            {gi < options.length - 1 && <Divider />}
          </div>
        ))}
      </Modal>
    </Overlay>
  );
}
