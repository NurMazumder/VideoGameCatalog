import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SearchBar from "../../components/SearchBar/SearchBar";

describe("FilterPanel Component", () => {
  it("Renders filter panel correctly with props", () => {
    const genreList = ["Shooter", "RPG", "MMORPG"];
    const platformList = ["PC", "Mac"];
    render(
      <Router>
        <FilterPanel genreList={genreList} platformList={platformList} />
      </Router>
    );
    genreList.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
    platformList.forEach((platform) => {
      expect(screen.getByText(platform)).toBeInTheDocument();
    });
    expect(screen.getByText("Genres")).toBeInTheDocument();
    expect(screen.getByText("Platforms")).toBeInTheDocument();
  });
  it("Renders filter panel correctly without props", () => {
    render(
      <Router>
        <FilterPanel />
      </Router>
    );
    expect(screen.queryByText("Genres")).toBeNull();
    expect(screen.queryByText("Genres")).toBeNull();
    expect(screen.queryAllByRole("list").length).toBe(0);
  });
  it("Clicking on checkboxs", () => {
    const genreList = ["Shooter", "RPG", "MMORPG"];
    const platformList = ["PC", "Mac"];
    const fetchFilteredGenre = jest.fn();
    const fetchFilteredPlatform = jest.fn();
    render(
      <Router>
        <FilterPanel
          genreList={genreList}
          platformList={platformList}
          genreSelection={fetchFilteredGenre}
          platformSelection={fetchFilteredPlatform}
        />
      </Router>
    );
    genreList.forEach((genre) => {
      const checkbox = screen.getByLabelText(genre);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    platformList.forEach((platform) => {
      const checkbox = screen.getByLabelText(platform);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    expect(fetchFilteredGenre).toHaveBeenCalledTimes(genreList.length);
    expect(fetchFilteredPlatform).toHaveBeenCalledTimes(platformList.length);
    const genreBox = screen.getByLabelText(genreList[1]);
    fireEvent.click(genreBox);
    expect(genreBox).not.toBeChecked();
    expect(fetchFilteredGenre).toHaveBeenCalledTimes(4);
    expect(fetchFilteredPlatform).toHaveBeenCalledTimes(platformList.length);
    const platformBox = screen.getByLabelText(platformList[0]);
    fireEvent.click(platformBox);
    expect(platformBox).not.toBeChecked();
    expect(fetchFilteredGenre).toHaveBeenCalledTimes(4);
    expect(fetchFilteredPlatform).toHaveBeenCalledTimes(3);
  });
  it("Searching will clear up the selections ", () => {
    const genreList = ["Shooter", "RPG", "MMORPG"];
    const platformList = ["PC", "Mac"];
    const fetchFilteredGenre = jest.fn();
    const fetchFilteredPlatform = jest.fn();
    render(
      <Router>
        <FilterPanel
          genreList={genreList}
          platformList={platformList}
          genreSelection={fetchFilteredGenre}
          platformSelection={fetchFilteredPlatform}
        />
        <SearchBar />
      </Router>
    );
    genreList.forEach((genre) => {
      const checkbox = screen.getByLabelText(genre);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });
    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);
    genreList.forEach((genre) => {
      const checkbox = screen.getByLabelText(genre);
      expect(checkbox).not.toBeChecked();
    });
  });
});
