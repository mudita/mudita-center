import styled from "styled-components"

export const ModalWrapper = styled.section`
  position: fixed;
  z-index: ${2 ** 31 - 1};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

export default ModalWrapper
