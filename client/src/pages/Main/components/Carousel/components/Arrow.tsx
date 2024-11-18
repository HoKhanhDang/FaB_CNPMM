import React from "react";

type ArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

export const NextArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
}) => (
    <div
        className={`${className} text-red-500 `}
        style={{ ...style, display: "block", right: "5%", zIndex: 1 }}
        onClick={onClick}
    >
        ➔
    </div>
);

export const PrevArrow: React.FC<ArrowProps> = ({
    className,
    style,
    onClick,
}) => (
    <div
        className={`${className} text-red-500`}
        style={{ ...style, display: "block", left: "5%", zIndex: 1}}
        onClick={onClick}
    >
        ←
    </div>
);
