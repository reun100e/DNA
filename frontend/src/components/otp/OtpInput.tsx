import React, { useRef } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value];
    newValue[index] = e.target.value.replace(/\D/g, '');

    if (e.target.value && index < value.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, value.length).replace(/\D/g, '');
    const newValue = [...value];

    pasteData.split('').forEach((char, i) => {
      newValue[i] = char;
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });

    onChange(newValue);
    if (inputsRef.current[pasteData.length - 1]) {
      inputsRef.current[pasteData.length - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {value.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el!)}
          disabled={disabled}
          className="w-12 h-12 text-center border rounded-md  text-2xl bg-primary-foreground"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};
