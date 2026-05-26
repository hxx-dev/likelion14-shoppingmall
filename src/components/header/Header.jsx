import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;
const HomeIcon = styled.img`
  width: 61px;
  height: 24px;
  cursor: pointer;
`;
const HeaderContainer = styled.div`
  padding-right: 160px;
  padding-left: 160px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Button = styled.div`
  color: ${({ $active }) => ($active ? "#000" : "#6c6c6c")};
  font-size: 13px;
  font-family: Pretendard, sans-serif;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition: color 0.15s;
  &:hover {
    color: #000;
  }
`;
const HeaderRight = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  display: inline-flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 9px;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMain = pathname === "/";
  const isAdd = pathname === "/add";
  const isDetail = pathname.startsWith("/ProductDetail/");
  const isEdit = pathname.startsWith("/edit/");
  const detailId = isDetail ? pathname.split("/ProductDetail/")[1] : null;

  return (
    <div>
      <HeaderContainer>
        <LogoImage src={logoUrl} onClick={() => navigate("/")} />
        <HeaderRight>
          <ButtonGroup>
            {isMain && (
              <Button onClick={() => navigate("/add")}>상품등록</Button>
            )}
            {isAdd && (
              <Button $active onClick={() => navigate("/add")}>
                상품등록
              </Button>
            )}
            {isDetail && (
              <>
                <Button onClick={() => navigate("/add")}>상품등록</Button>
                <Button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openDeleteModal"))
                  }
                >
                  상품삭제
                </Button>
                <Button onClick={() => navigate(`/edit/${detailId}`)}>
                  상품수정
                </Button>
              </>
            )}
            {isEdit && (
              <Button onClick={() => navigate("/add")}>상품등록</Button>
            )}
          </ButtonGroup>
          <HomeIcon src={homeUrl} onClick={() => navigate("/")} />
        </HeaderRight>
      </HeaderContainer>
    </div>
  );
}
