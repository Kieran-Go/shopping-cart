import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";
import { useOutletContext } from "react-router-dom";
import * as useFetchItemsHook from "../hooks/useFetchItems";

// Mock useOutletContext to provide a dummy setCart function
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

// Mock useFetchItems to return test products
vi.mock("../hooks/useFetchItems");

// Test setup function
function setupShopTest(overrides = {}) {
  // Mock context
  useOutletContext.mockReturnValue({ setCart: vi.fn() });

  // Mock API items
  useFetchItemsHook.default.mockReturnValue({
    items: overrides.items || [
      { id: 1, title: "Cool Hat", category: "clothing", price: 19.99, image: "img1" },
      { id: 2, title: "Nice Shoes", category: "clothing", price: 59.99, image: "img2" },
      { id: 3, title: "USB Cable", category: "Electronics", price: 29.99, image: "img3" },
      { id: 4, title: "Diamond Ring", category: "Jewelry", price: 59.99, image: "img4" },
      { id: 5, title: "Earrings", category: "Jewelry", price: 59.99, image: "img5" },
    ],
    loading: overrides.loading ?? false,
    error: overrides.error ?? null,
  });

  // Set up the user instance
  const user = userEvent.setup();

  // Render the shop and return the user instance
  const shop = render(<Shop />);
  return { ...shop, user };
}

// Test handeSearchChange
describe("handleSearchChange", () => {
  it("filters items based on search input", async () => {

    // Run setup function
    const { user } = setupShopTest();

    // Should show both items initially
    expect(screen.getByText("Cool Hat")).toBeInTheDocument();
    expect(screen.getByText("Nice Shoes")).toBeInTheDocument();

    // Type into the search input
    const input = screen.getByRole('textbox', { name: /search products/i });
    await user.type(input, "hat");

    // Should filter to only "Cool Hat"
    expect(screen.getByText("Cool Hat")).toBeInTheDocument();
    expect(screen.queryByText("Nice Shoes")).not.toBeInTheDocument();
  });
});

// Test handleCategoryChange
describe("handleCategoryChange", () => {
    it("filters items based on category dropdown", async () => {

        // Run the setup function
        const { user } = setupShopTest();

        // Simulate user changing category to 'Electronics'
        const dropdown = screen.getByRole('combobox', { name: /search category/i});
        await user.selectOptions(dropdown, "Electronics");

        // Should only show the USB cable
        expect(screen.getByText("USB Cable")).toBeInTheDocument();
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shoes")).not.toBeInTheDocument();
        expect(screen.queryByText("Diamond Ring")).not.toBeInTheDocument();
        expect(screen.queryByText("Earrings")).not.toBeInTheDocument();
    });
});

// Test filterItems
describe("filterItems", () => {
    // Logic for filterItems function
  const filterItems = (item, searchValue, catValue) => {
    const matchesSearch = searchValue === "" || item.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = catValue === "All Categories" || item.category.toLowerCase() === catValue.toLowerCase();
    return matchesSearch && matchesCategory;
  };

  const item = { id: 1, title: "USB Cable", category: "Electronics", price: 29.99, image: "img1" };

  it("returns true when both search and category match", () => {
    expect(filterItems(item, "", "All Categories")).toBe(true);
  });

  it("returns false when search does not match", () => {
    expect(filterItems(item, "Cool Hat", "All Categories")).toBe(false);
  });

  it("returns false when category does not match", () => {
    expect(filterItems(item, "", "Clothing")).toBe(false);
  });

  it("returns true when search does match", () => {
    expect(filterItems(item, "USB Cable", "All Categories")).toBe(true);
  })

  it("returns true when category does match", () => {
    expect(filterItems(item, "", "Electronics")).toBe(true);
  })
});
