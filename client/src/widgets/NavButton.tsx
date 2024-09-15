import React from 'react';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  text: string;
  display: string;
  bold: boolean;
  paddingX?: string;
  paddingY?: string;
  color: string;
  extra?: string;
  round?: string;
  to: string | undefined | null;
  smallMedia?: string;
  hover?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  text,
  display,
  bold,
  paddingX,
  paddingY,
  color,
  extra,
  round,
  to,
  smallMedia,
  hover,
}) => {
  const redirectUrl = to === "" || to === undefined || to === null ? "/" : `/${to}`;

  return (
    <Link
      to={redirectUrl}
      className={`${display} ${hover} ${extra} ${smallMedia} ${bold ? "font-bold" : ""} ${paddingX} ${paddingY} text-[${color}] ${round}`}
    >
      {text}
    </Link>
  );
};

export default NavButton;