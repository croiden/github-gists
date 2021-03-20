// @flow
import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const Image = styled.img`
  vertical-align: middle;
  width: ${(props) => props.sizeWH}px;
  height: ${(props) => props.sizeWH}px;
  border-radius: 50%;
  cursor: pointer;
`;

export const small: 30 = 30;
export const medium: 50 = 50;

type sizeType = typeof small | typeof medium;
type Props = {
  username: string,
  url: string,
  size?: sizeType,
};

const Avatar = ({ username, url, size = medium, ...props }: Props) => {
  return (
    <>
      <Image
        {...props}
        alt={username}
        src={url}
        sizeWH={size}
        data-tip={username}
      />
      <ReactTooltip />
    </>
  );
};
export default Avatar;
