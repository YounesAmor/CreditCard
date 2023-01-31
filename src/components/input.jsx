import React from "react";

const Input = (props) => {
  const {
    type,
    name,
    placeholder,
    handleChange,
    errors,
    value,
    handleBlur,
    ...reststuff
  } = props;
  return (
    <React.Fragment>
      {!errors[name] && (
        <input
          type={type}
          name={name}
          className="border border-gray-300 rounded-lg lg:w-full p-2 font-spaceGrotesk tracking-widest lg:text-md text-veryDarkViolet focus:border-veryDarkViolet lg:mb-2"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
          placeholder={placeholder}
          value={value}
          required
          {...reststuff}
        />
      )}
      {errors[name] && (
        <div>
          <input
            type={type}
            name={name}
            className="border-2 border-[#DC3545] rounded-lg lg:w-full p-2 font-spaceGrotesk tracking-widest lg:text-md text-veryDarkViolet focus:border-veryDarkViolet lg:mb-2"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            placeholder={placeholder}
            value={value}
            required
            {...reststuff}
          />
          <p className="text-[#DC3545] text-sm mb-2">{errors[name]}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Input;
