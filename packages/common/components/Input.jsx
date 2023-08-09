import React from "react";

export const Input = ({
    type, value, name, id, className, onChange, ...otherProps
}) => (<input type={type || "number"} value={value} name={name} id={id} className={className} onChange={onChange} {...otherProps} />);