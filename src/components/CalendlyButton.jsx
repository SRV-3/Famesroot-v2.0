import { useState } from "react";
import { PopupModal } from "react-calendly";

export default function CalendlyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative z-10 group-hover:text-white transition-colors duration-500"
      >
        Book Consultation
      </button>

      <PopupModal
        url="https://calendly.com/arnav-famesroot/30min"
        open={open}
        onModalClose={() => setOpen(false)}
        rootElement={document.getElementById("root")}
      />
    </>
  );
}
