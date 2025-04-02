"use client";

import {
  createContext,
  useContextSelector,
} from "@fewings/react/contextSelector";
import { useState, useEffect } from "react";

// Create a context with some user data
const UserContext = createContext({
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  lastUpdated: new Date(),
});

// Name component that only re-renders when name changes
const NameDisplay = () => {
  const name = useContextSelector(UserContext, (state) => state.name);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [name]);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#374151",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
      }}
    >
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
        Render count: {renderCount}
      </p>
    </div>
  );
};

// Age component that only re-renders when age changes
const AgeDisplay = () => {
  const age = useContextSelector(UserContext, (state) => state.age);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [age]);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#374151",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
      }}
    >
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
        Render count: {renderCount}
      </p>
    </div>
  );
};

// Email component that only re-renders when email changes
const EmailDisplay = () => {
  const email = useContextSelector(UserContext, (state) => state.email);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [email]);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#374151",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
      }}
    >
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
        Render count: {renderCount}
      </p>
    </div>
  );
};

// Date component that re-renders on every context update
const LastUpdatedDisplay = () => {
  const lastUpdated = useContextSelector(
    UserContext,
    (state) => state.lastUpdated
  );
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [lastUpdated]);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#374151",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
      }}
    >
      <p>
        <strong>Last Updated:</strong> {lastUpdated.toLocaleTimeString()}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
        Render count: {renderCount}
      </p>
    </div>
  );
};

const ContextSelectorExample = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    lastUpdated: new Date(),
  });

  // Update functions for each property
  const updateName = () => {
    setUserData((prev) => ({
      ...prev,
      name: prev.name === "John Doe" ? "Jane Smith" : "John Doe",
      lastUpdated: new Date(),
    }));
  };

  const updateAge = () => {
    setUserData((prev) => ({
      ...prev,
      age: prev.age + 1,
      lastUpdated: new Date(),
    }));
  };

  const updateEmail = () => {
    setUserData((prev) => ({
      ...prev,
      email:
        prev.email === "john@example.com"
          ? "jane@example.com"
          : "john@example.com",
      lastUpdated: new Date(),
    }));
  };

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        color: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "#f3f4f6",
          }}
        >
          Context Selector Demo
        </h3>
        <p style={{ marginBottom: "1rem", color: "#d1d5db" }}>
          Each component below only re-renders when its specific data changes.
          Notice how render counts only increase for affected components.
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <button
            onClick={updateName}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Change Name
          </button>
          <button
            onClick={updateAge}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#8b5cf6",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Increment Age
          </button>
          <button
            onClick={updateEmail}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ec4899",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Toggle Email
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px dashed #4b5563",
          padding: "1.5rem",
          borderRadius: "0.375rem",
        }}
      >
        <UserContext.Provider value={userData}>
          <NameDisplay />
          <AgeDisplay />
          <EmailDisplay />
          <LastUpdatedDisplay />
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default ContextSelectorExample;
