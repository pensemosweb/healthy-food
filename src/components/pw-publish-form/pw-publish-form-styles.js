import { css } from 'lit';

export default css`
  .publish__viewImage {
    width: 15rem;
  }

  .publish__previewImages,
  .publish__title,
  .publish__description {
    width: 100%;
  }

  .publish__price,
  .publish__selectImage {
    width: auto;
  }

  .publish__description {
    height: 10rem;
  }

  .publish__previewImages {
    margin-top: 0.4rem;
  }

  .publish__viewImage {
    margin-bottom: 2rem;
  }

  .inputfile {
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .iborrainputfile__icon {
    height: 1.4rem;
    margin-top: -0.4rem;
  }

  .flex {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .publish__button {
    width: 100%;
  }

  .btn__container button {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
  }
`;
