"use client";

import { Popover } from "@fewings/react/components";
import { useState } from "react";

type Anchor =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "left-center"
  | "left-top"
  | "left-bottom"
  | "right-center"
  | "right-top"
  | "right-bottom";

const PopoverExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2.5rem",
        backgroundColor: "#1f2937",
        color: "white",
        borderRadius: "0.5rem",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "#f3f4f6",
          }}
        >
          Basic Click Popover
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popover.Root>
            <Popover.Trigger>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                Click me
              </button>
            </Popover.Trigger>
            <Popover.Panel anchor="bottom-right">
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  width: "13rem",
                  color: "white",
                }}
              >
                <p style={{ marginBottom: "0.75rem" }}>
                  This is a basic click-triggered popover
                </p>
                <button
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "0.375rem",
                    border: "none",
                  }}
                >
                  Action
                </button>
              </div>
            </Popover.Panel>
          </Popover.Root>
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "#f3f4f6",
          }}
        >
          Hover Popover
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popover.Root type="hover">
            <Popover.Trigger>
              <button
                style={{
                  boxSizing: "border-box",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#1e3a8a",
                  border: "1px solid #2563eb",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                Hover me
              </button>
            </Popover.Trigger>
            <Popover.Panel anchor="bottom-right">
              <div
                style={{
                  boxSizing: "border-box",
                  padding: "1rem",
                  backgroundColor: "#111827",
                  border: "1px solid #2563eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  width: "13rem",
                  color: "white",
                }}
              >
                <p>This popover appears on hover</p>
              </div>
            </Popover.Panel>
          </Popover.Root>
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "#f3f4f6",
          }}
        >
          Controlled Popover
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <button
            style={{
              padding: "0.25rem 0.75rem",
              backgroundColor: "#374151",
              border: "1px solid #4b5563",
              borderRadius: "0.375rem",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close Popover" : "Open Popover"}
          </button>

          <Popover.Root open={isOpen}>
            <Popover.Trigger>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4c1d95",
                  border: "1px solid #6d28d9",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                Controlled Popover
              </button>
            </Popover.Trigger>
            <Popover.Panel anchor="bottom-right">
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#111827",
                  border: "1px solid #6d28d9",
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  width: "13rem",
                  color: "white",
                }}
              >
                <p style={{ marginBottom: "0.75rem" }}>
                  This popover&apos;s state is controlled externally
                </p>
                <button
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Popover.Panel>
          </Popover.Root>
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "#f3f4f6",
          }}
        >
          Different Anchor Positions
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {[
            "top-left",
            "top-center",
            "top-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ].map((anchor) => (
            <Popover.Root key={anchor}>
              <Popover.Trigger>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#374151",
                    border: "1px solid #4b5563",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  {anchor}
                </button>
              </Popover.Trigger>
              <Popover.Panel anchor={anchor as Anchor}>
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "#111827",
                    border: "1px solid #4b5563",
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    minWidth: "120px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {anchor}
                </div>
              </Popover.Panel>
            </Popover.Root>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopoverExample;
