import React from "react";

export default function SesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header
        style={{
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        {/* Vous pourriez mettre ici une navigation spécifique à SES */}
        <h2>Navigation SES</h2>
      </header>
      <main>{children}</main>
    </div>
  );
}
