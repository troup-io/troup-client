import React from 'react';

interface LogoIconProps {
    size?: number | string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 40 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 576 576"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M426 0H150C67.1573 0 0 67.1573 0 150V426C0 508.843 67.1573 576 150 576H426C508.843 576 576 508.843 576 426V150C576 67.1573 508.843 0 426 0Z"
                fill="#4FACFE"
            />
            <path
                d="M426 0H150C67.1573 0 0 67.1573 0 150V426C0 508.843 67.1573 576 150 576H426C508.843 576 576 508.843 576 426V150C576 67.1573 508.843 0 426 0Z"
                fill="url(#paint0_linear)"
            />
            <path
                d="M274.732 231.284C282.377 226.893 294.871 226.917 302.492 231.284L407.16 291.806C414.781 296.213 421.016 307.002 421 315.8V338.762C421 347.56 414.733 351.151 407.104 346.76L302.524 286.295C294.903 281.888 282.41 281.864 274.764 286.255L169.896 346.488C162.251 350.871 156 347.288 156 338.49V315.456C156 306.658 162.251 295.877 169.896 291.462L274.732 231.284Z"
                fill="#FFFFF4"
            />
            <path
                d="M274.732 231.284C282.377 226.893 294.871 226.917 302.492 231.284L407.16 291.806C414.781 296.213 421.016 307.002 421 315.8V338.762C421 347.56 414.733 351.151 407.104 346.76L302.524 286.295C294.903 281.888 282.41 281.864 274.764 286.255L169.896 346.488C162.251 350.871 156 347.288 156 338.49V315.456C156 306.658 162.251 295.877 169.896 291.462L274.732 231.284Z"
                fill="url(#paint1_linear)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="288"
                    y1="0"
                    x2="288"
                    y2="576"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#38F9D7" />
                    <stop offset="1" stopColor="#4FACFE" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear"
                    x1="288.5"
                    y1="228"
                    x2="288.5"
                    y2="348.634"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#FFFFF4" />
                </linearGradient>
            </defs>
        </svg>
    );
};
