/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "576px",
            md: "960px",
            lg: "1440px",
        },
        extend: {
            backgroundColor: {
                main: "#FFF8EE",
                secondary: "#FFD6BA",
          
            },
            fontFamily: { Lexend: ["Lexend Deca", "sans-serif"] },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(50px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fadeDown: {
                    "0%": { opacity: 0, transform: "translateY(-20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                fadeLeft: {
                    "0%": { opacity: 0, transform: "translateX(-20px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                fadeRight: {
                    "0%": { opacity: 0, transform: "translateX(20px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                shake: {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "50%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-5px)" },
                    "100%": { transform: "translateX(0)" },
                }
            },
            animation: {
                fadeIn: "fadeIn 0.5s ease-out",
                fadeDown: "fadeDown 0.5s ease-out",
                fadeLeft: "fadeLeft 0.5s ease-out",
                fadeRight: "fadeRight 0.5s ease-out",
                shake: "shake 1s ease-out infinite",
                transformZ: "transform transition-transform duration-300 hover:scale-105"
            }
        },
    },
    variants: {
        extend: {
            display: [
                "responsive",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
            ],
        },
    },
    plugins: [],
};
