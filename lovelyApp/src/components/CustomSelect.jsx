import { useState } from "react";

function CustomSelect({value, onChange}) {
  const [open, setOpen] = useState(false);

  const options = ["dark", "light", "colorful"];

  return (
    <div className="selectWrapper">
      <div className="selectBox" onClick={() => setOpen(!open)}>
        {value ? value : "select theme"}
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="selectDropdown">
          {options.map((opt) => (
            <div
              key={opt}
              className="selectOption"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;