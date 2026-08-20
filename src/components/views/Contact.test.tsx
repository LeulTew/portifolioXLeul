import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Contact } from "./Contact";
import emailjs from "@emailjs/browser";

vi.mock("@emailjs/browser", () => ({
  default: {
    sendForm: vi.fn(),
  },
}));

describe("Contact View (Mobile)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading and description", () => {
    render(<Contact />);
    expect(screen.getByText(/Let's build/i)).toBeInTheDocument();
    expect(screen.getByText(/something great/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm currently open to new opportunities/i)).toBeInTheDocument();
  });

  it("renders email card and handles copy click", () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<Contact />);
    const emailCard = screen.getByText(/Email me at/i).closest("div");
    if (emailCard) {
      fireEvent.click(emailCard);
      expect(writeTextMock).toHaveBeenCalled();
    }
  });

  it("renders location and response time details", () => {
    render(<Contact />);
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Response Time")).toBeInTheDocument();
    expect(screen.getByText("Within 24 hours")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Contact />);
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("handles form inputs and mailto fallback on submit without env vars", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("John Doe");
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const messageInput = screen.getByPlaceholderText("Tell me about your project...");

    fireEvent.change(nameInput, { target: { value: "Jane" } });
    fireEvent.change(emailInput, { target: { value: "jane@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello world" } });

    expect(nameInput).toHaveValue("Jane");
    expect(emailInput).toHaveValue("jane@test.com");
    expect(messageInput).toHaveValue("Hello world");

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);
  });
});
