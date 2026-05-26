import { useRef } from "react";
import styled from "styled-components";
import uploadIconUrl from "../../assets/icons/uploadicon.svg";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0 80px;
  font-family: Pretendard, sans-serif;
`;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
`;

/* 좌측 영역 */
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 159px;
  padding-top: 115px;
`;

const ImageUploadBox = styled.div`
  display: flex;
  width: 459px;
  height: 602px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  gap: 12px;
  position: relative;
`;
const ImageOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

/* 중앙 세로선 */
const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #d9d9d9;
  flex-shrink: 0;
`;

//우측: 폼 카드
const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding-left: 159px;
  padding-top: 47px;
`;

const FormCard = styled.div`
  display: flex;
  width: 285px;
  padding: 27px 33px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  background: #fff;
`;

const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #111;
  margin: 0 0 4px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const Label = styled.label`
  color: #6c6c6c;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #6c6c6c;
  border-radius: 6px;
  font-size: 13px;
  font-family: Pretendard, sans-serif;
  color: #111;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &:focus {
    border-color: #111;
  }
  &:disabled {
    background: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
`;
// 칩 공통
const Chip = styled.button`
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid ${({ $selected }) => ($selected ? "#D0D0D0;" : "#f2f2f2")};
  background: ${({ $selected }) => ($selected ? "#D0D0D0;" : "#f2f2f2")};
  color: #333333;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 0.15s;
`;

// 종류 2열 그리드
const TwoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  width: 100%;
`;

// 성별 열 그리드
const ThreeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  width: 100%;
`;

const GridChip = styled(Chip)`
  width: 100%;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px 0;
  background: #ebebeb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.15s;
  color: #333;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

//상수
const CATEGORIES = ["의류", "신발"];
const GENDERS = ["남성", "여성", "남녀공용"];
const COLORS = [
  ["red", "pink", "blue"],
  ["gray", "black", "denim"],
  ["multi", "rainbow", "holographic"],
];

export default function ProductForm({
  formData,
  onChange,
  onSingleChip,
  onImageChange,
  previewUrl,
  submitLabel,
  onSubmit,
  isEdit = false,
}) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onImageChange(file, URL.createObjectURL(file));
  };

  return (
    <PageWrapper>
      <Layout>
        {/* 좌측: 이미지 업로드 */}
        <ImageSection>
          <ImageUploadBox onClick={() => fileRef.current?.click()}>
            {previewUrl && <PreviewImg src={previewUrl} alt="preview" />}
            <ImageOverlay>
              <img
                src={uploadIconUrl}
                alt="upload"
                style={{ width: 44, height: 44, opacity: 0.45 }}
              />
            </ImageOverlay>
          </ImageUploadBox>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </ImageSection>

        {/* 중앙 세로선 */}
        <Divider />

        {/* 우측: 폼 카드 */}
        <FormSection>
          <FormCard>
            <PageTitle>상품 정보 등록</PageTitle>

            <FieldGroup>
              <Label>상품명</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="상품명을 입력하세요"
              />
            </FieldGroup>
            <FieldGroup>
              <Label>평점</Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating || ""}
                onChange={(e) => onChange("rating", e.target.value)}
                placeholder="예: 4.5"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>리뷰수</Label>
              <Input
                type="number"
                min="0"
                value={formData.reviewNum || ""}
                onChange={(e) => onChange("reviewNum", e.target.value)}
                placeholder="예: 1561"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>가격</Label>
              <Input
                type="number"
                min="0"
                value={formData.priceNum || ""}
                onChange={(e) => onChange("priceNum", e.target.value)}
                placeholder="예: 145"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>사이즈</Label>
              <Input
                value={formData.size?.join(", ") || ""}
                onChange={(e) =>
                  onChange(
                    "size",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="예: S, M, L"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>종류</Label>
              <TwoGrid>
                {CATEGORIES.map((c) => (
                  <GridChip
                    key={c}
                    type="button"
                    $selected={formData.category === c}
                    onClick={() => onSingleChip("category", c)}
                  >
                    {c}
                  </GridChip>
                ))}
              </TwoGrid>
            </FieldGroup>

            <FieldGroup>
              <Label>성별</Label>
              <ThreeGrid>
                {GENDERS.map((g) => (
                  <GridChip
                    key={g}
                    type="button"
                    $selected={formData.gender === g}
                    onClick={() => onSingleChip("gender", g)}
                  >
                    {g}
                  </GridChip>
                ))}
              </ThreeGrid>
            </FieldGroup>

            <FieldGroup>
              <Label>색상</Label>
              {COLORS.map((row, rowIdx) => (
                <ThreeGrid key={rowIdx}>
                  {row.map((c) => (
                    <GridChip
                      key={c}
                      type="button"
                      $selected={formData.color === c}
                      onClick={() => onSingleChip("color", c)}
                    >
                      {c}
                    </GridChip>
                  ))}
                </ThreeGrid>
              ))}
            </FieldGroup>

            <SubmitBtn onClick={onSubmit}>{submitLabel}</SubmitBtn>
          </FormCard>
        </FormSection>
      </Layout>
    </PageWrapper>
  );
}
