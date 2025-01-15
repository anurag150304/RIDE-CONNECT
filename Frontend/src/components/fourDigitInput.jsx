import { useRef } from "react";

export const FourDigitInput = ({ otp = [], setOtp }) => {
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value.length === 1 && index < 3) {
            inputRefs.current[index + 1].focus();
        }
        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").slice(0, 4);
        const newOtp = [...otp];
        for (let i = 0; i < data.length; i++) {
            if (inputRefs.current[i]) {
                newOtp[i] = data[i];
            }
        }
        setOtp(newOtp);
        const lastFilledIndex = Math.min(data.length - 1, 3);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    return (
        <div onPaste={handlePaste} style={{ display: "flex", gap: "10px" }}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={value}
                    maxLength="1"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-[50px] h-[50px] text-center text-lg border-2 border-[#ccc] rounded-lg cursor-pointer"
                />
            ))}
        </div>
    );
};
