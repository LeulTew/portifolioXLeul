import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dock } from "./Dock";

describe("Dock", () => {
  const mockNavigate = vi.fn();
  const mockToggleTheme = vi.fn();

  const defaultProps = {
    activeView: "HOME" as const,
    onNavigate: mockNavigate,
    theme: "dark" as const,
    toggleTheme: mockToggleTheme,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all navigation items and accessibility attributes", () => {
    render(<Dock {...defaultProps} />);
    const homeBtn = screen.getByRole("button", { name: /^home$/i });
    const workBtn = screen.getByRole("button", { name: /^work$/i });
    const aboutBtn = screen.getByRole("button", { name: /^about$/i });
    const contactBtn = screen.getByRole("button", { name: /^contact$/i });

    expect(homeBtn).toBeInTheDocument();
    expect(workBtn).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(contactBtn).toBeInTheDocument();

    expect(homeBtn).toHaveAttribute("aria-current", "page");
    expect(workBtn).not.toHaveAttribute("aria-current");
  });

  it("shows active state for current view", () => {
    render(<Dock {...defaultProps} activeView="WORK" />);
    const workButton = screen.getByRole("button", { name: /^work$/i });
    expect(workButton.className).toContain("bg-[var(--text-primary)]");
    expect(workButton).toHaveAttribute("aria-current", "page");
  });

  it("shows active state for WORK when on PROJECT_DETAIL", () => {
    render(<Dock {...defaultProps} activeView="PROJECT_DETAIL" />);
    const workButton = screen.getByRole("button", { name: /^work$/i });
    expect(workButton.className).toContain("bg-[var(--text-primary)]");
    expect(workButton).toHaveAttribute("aria-current", "page");
  });

  it("calls onNavigate when nav button clicked", () => {
    render(<Dock {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /^about$/i }));
    expect(mockNavigate).toHaveBeenCalledWith("ABOUT");
  });

  it("calls toggleTheme when theme button clicked", () => {
    render(<Dock {...defaultProps} />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("renders correctly in light mode", () => {
    render(<Dock {...defaultProps} theme="light" />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("expands button on hover", () => {
    render(<Dock {...defaultProps} />);
    const homeButton = screen.getByRole("button", { name: /^home$/i });
    fireEvent.mouseEnter(homeButton);
    expect(homeButton.className).toContain("px-6");
    fireEvent.mouseLeave(homeButton);
    expect(homeButton.className).toContain("px-4");
  });
});
